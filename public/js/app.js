/**
 * Martian Atlas - Main Application Controller
 * Integrates NASA Mars Trek WMTS layers, ETL obstacle & science databases,
 * multi-route pathfinding (A*), real-time traverse simulation, and Waze-like hazard logging.
 */

(function () {
  const CRIT_COLORS = {
    1: "#22c55e",
    2: "#06b6d4",
    3: "#eab308",
    4: "#f97316",
    5: "#ef4444",
  };

  const CRIT_LABELS = {
    1: "Nível 1 • Muito Baixo",
    2: "Nível 2 • Leve",
    3: "Nível 3 • Moderado",
    4: "Nível 4 • Alto Risco",
    5: "Nível 5 • Crítico / Bloqueio",
  };

  const OBSTACLE_TYPE_NAMES = {
    crater: "Cratera / Buraco de Impacto",
    sand_trap: "Areia Densa / Duna Eólica",
    steep_slope: "Inclinação Severa / Escarpa",
    boulder_field: "Campo Denso de Rochas",
    rough_terrain: "Terreno Irregular (IMU NASA)",
  };

  // Application State
  const state = {
    operationMode: "route", // "route" | "explore"
    mapLayerMode: "satellite", // "satellite" | "relief"
    criticalityFilter: "ALL",
    placementMode: null, // null | "science" | "obstacle"
    tempClickLatLon: { lat: 18.4480, lon: 77.4150 },
    newObstacleCrit: 4,

    baseStation: null,
    scienceTargets: [],
    obstacles: [],
    roverTraverse: [],
    referenceElevationPoints: [],

    // Route Planning State
    originId: "BASE_ARES_ALPHA",
    destinationId: "SCI_004",
    intermediateStopIds: [],
    candidateRoutes: [],
    selectedRouteId: "route_safe",

    // Saved Past Routes
    savedRoutes: [
      {
        id: "SAVED_01",
        title: "Expedição Base Ares → Depósito Three Forks",
        timestamp: "Sol 1102 • 14:20 LMST",
        originId: "BASE_ARES_ALPHA",
        stopIds: ["SCI_002"],
        destinationId: "SCI_003",
        distanceKm: "4.18 km",
        durationMin: "62 min",
        riskLabel: "Baixo (Nível 1/5)",
      },
      {
        id: "SAVED_02",
        title: "Missão Astrobiologia Delta → Canal Neretva Vallis",
        timestamp: "Sol 1103 • 09:45 LMST",
        originId: "SCI_003",
        stopIds: ["SCI_004", "SCI_005"],
        destinationId: "SCI_006",
        distanceKm: "6.85 km",
        durationMin: "98 min",
        riskLabel: "Baixo-Moderado (Nível 2/5)",
      },
    ],

    // Active Navigation / Traverse Simulation State
    traverse: {
      active: false,
      paused: false,
      timerId: null,
      speedMultiplier: 5,
      currentCoordIndex: 0,
      segmentProgress: 0,
      currentLat: 18.4447,
      currentLon: 77.4508,
      remainingDistMeters: 0,
      totalDistMeters: 0,
    },
  };

  let map = null;
  let tileLayerSatellite = null;
  let tileLayerRelief = null;
  let proceduralDetailLayer = null;
  let markersLayerGroup = null;
  let routesLayerGroup = null;
  let contoursLayerGroup = null;
  let explorerLiveMarker = null;

  function init() {
    const cid = AtlasLogger.generateCorrelationId();
    const rawData = window.MARS_ATLAS_DATA || {};

    state.baseStation = rawData.base_station || {
      base_id: "BASE_ARES_ALPHA",
      name: "Estação Base Ares Alpha (Habitat Principal)",
      category: "Habitat & Command Base",
      lat: 18.4447,
      lon: 77.4508,
      elevation_m: -2570.0,
      description: "Base central dos exploradores na Cratera Jezero.",
    };
    state.scienceTargets = (rawData.science_targets || []).slice();
    state.obstacles = (rawData.obstacles || []).slice();
    state.roverTraverse = (rawData.rover_traverse || []).slice();

    // Combine points with known elevation for IDW elevation interpolation
    state.referenceElevationPoints = [
      ...state.roverTraverse,
      ...state.scienceTargets,
      ...state.obstacles.slice(0, 40),
    ];

    initMap();
    initLoggerSubscription();

    AtlasLogger.record(
      "INFO",
      "etl_database_loaded",
      {
        obstacles_count: state.obstacles.length,
        science_targets_count: state.scienceTargets.length,
        nasa_waypoints_count: state.roverTraverse.length,
      },
      cid
    );

    populateWaypointSelectors();
    renderMapMarkers();
    renderExploreCatalogs();
    renderSavedRoutes();
    calculateAllRoutes();
  }

  function initMap() {
    map = L.map("mars-map", {
      center: [18.4455, 77.4250],
      zoom: 14,
      minZoom: 4,
      maxZoom: 18,
      zoomControl: false,
    });

    L.control.zoom({ position: "bottomright" }).addTo(map);

    // 1. Official NASA Mars Trek Satellite Layer (Viking / CTX Color Mosaic)
    tileLayerSatellite = L.tileLayer(
      "https://trek.nasa.gov/tiles/Mars/EQ/Mars_Viking_MDIM21_ClrMosaic_global_232m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
      {
        maxNativeZoom: 7,
        maxZoom: 18,
        attribution: "NASA Mars Trek / USGS Astrogeology / JPL-Caltech",
      }
    );

    // 2. Official NASA Mars Trek MOLA Elevation Hillshade Layer
    tileLayerRelief = L.tileLayer(
      "https://trek.nasa.gov/tiles/Mars/EQ/Mars_MGS_MOLA_ClrShade_merge_global_463m/1.0.0//default/default028mm/{z}/{y}/{x}.jpg",
      {
        maxNativeZoom: 6,
        maxZoom: 18,
        attribution: "NASA MGS MOLA Topographic Relief / Mars Trek",
      }
    );

    // 3. High-Zoom Procedural Jezero Micro-Terrain Grid Overlay (ensures crisp visual detail at z=12..18)
    const JezeroDetailGrid = L.GridLayer.extend({
      createTile: function (coords) {
        const tile = document.createElement("canvas");
        const size = this.getTileSize();
        tile.width = size.x;
        tile.height = size.y;
        const ctx = tile.getContext("2d");

        // Subtle coordinate grid + regolith micro-texture at local zoom
        ctx.strokeStyle =
          state.mapLayerMode === "relief"
            ? "rgba(56, 189, 248, 0.08)"
            : "rgba(255, 180, 140, 0.06)";
        ctx.lineWidth = 1;
        ctx.strokeRect(0, 0, size.x, size.y);

        // Deterministic micro-craters/rocks texture seed per tile
        const seed = coords.x * 374761393 + coords.y * 668265263 + coords.z * 13;
        for (let i = 0; i < 18; i++) {
          const h = Math.abs(Math.sin(seed + i * 71.3));
          const px = (h * 997) % size.x;
          const py = (h * 4999) % size.y;
          const r = 1 + (i % 3);
          ctx.fillStyle =
            state.mapLayerMode === "relief"
              ? "rgba(14, 165, 233, 0.06)"
              : "rgba(40, 18, 10, 0.14)";
          ctx.beginPath();
          ctx.arc(px, py, r, 0, Math.PI * 2);
          ctx.fill();
        }
        return tile;
      },
    });
    proceduralDetailLayer = new JezeroDetailGrid({ opacity: 0.85 });

    tileLayerSatellite.addTo(map);
    proceduralDetailLayer.addTo(map);

    contoursLayerGroup = L.layerGroup().addTo(map);
    routesLayerGroup = L.layerGroup().addTo(map);
    markersLayerGroup = L.layerGroup().addTo(map);

    // Map click handler for placing new Scientific Points or Obstacles
    map.on("click", function (e) {
      const lat = Math.round(e.latlng.lat * 100000) / 100000;
      const lon = Math.round(e.latlng.lng * 100000) / 100000;
      state.tempClickLatLon = { lat, lon };

      const latInput = document.getElementById("form-lat");
      const lonInput = document.getElementById("form-lon");
      if (latInput && lonInput) {
        latInput.value = lat;
        lonInput.value = lon;
      }

      if (state.placementMode === "science" || state.placementMode === "obstacle") {
        openCreateModal(state.placementMode, { lat, lon });
      }
    });
  }

  function setMapLayer(mode) {
    state.mapLayerMode = mode;
    document.body.className = mode === "relief" ? "map-mode-relief" : "map-mode-satellite";

    document.getElementById("btn-layer-sat").className =
      mode === "satellite" ? "pill-btn active-emerald" : "pill-btn";
    document.getElementById("btn-layer-relief").className =
      mode === "relief" ? "pill-btn active-emerald" : "pill-btn";

    if (mode === "relief") {
      if (map.hasLayer(tileLayerSatellite)) map.removeLayer(tileLayerSatellite);
      tileLayerRelief.addTo(map);
    } else {
      if (map.hasLayer(tileLayerRelief)) map.removeLayer(tileLayerRelief);
      tileLayerSatellite.addTo(map);
    }
    proceduralDetailLayer.redraw();
    renderMapMarkers();

    AtlasLogger.record("DEBUG", "map_layer_switched", { layer_mode: mode });
  }

  function setOperationMode(mode) {
    state.operationMode = mode;
    document.getElementById("btn-mode-route").className =
      mode === "route" ? "pill-btn active" : "pill-btn";
    document.getElementById("btn-mode-explore").className =
      mode === "explore" ? "pill-btn active" : "pill-btn";

    if (mode === "explore") {
      switchTab("tab-explore");
      routesLayerGroup.clearLayers();
      document.getElementById("hud-nav-badge").textContent = "MODO EXPLORAÇÃO LIVRE";
      document.getElementById("hud-nav-badge").className = "live-pill idle";
      map.flyTo([18.4480, 77.4180], 13, { duration: 0.9 });
    } else {
      switchTab("tab-routes");
      drawCandidateRoutesOnMap();
    }

    AtlasLogger.record("INFO", "operation_mode_changed", { mode });
  }

  function switchTab(tabId) {
    document.querySelectorAll(".dock-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".tab-pane").forEach((pane) => {
      pane.classList.toggle("active", pane.id === tabId);
    });
  }

  function getAllSelectableLocations() {
    const list = [
      {
        id: state.baseStation.base_id,
        label: `🏠 [Base] ${state.baseStation.name}`,
        lat: state.baseStation.lat,
        lon: state.baseStation.lon,
        elevation_m: state.baseStation.elevation_m,
      },
    ];
    state.scienceTargets.forEach((s) => {
      list.push({
        id: s.target_id,
        label: `🔬 [${s.target_id}] ${s.name}`,
        lat: s.lat,
        lon: s.lon,
        elevation_m: s.elevation_m,
      });
    });
    return list;
  }

  function populateWaypointSelectors() {
    const locations = getAllSelectableLocations();
    const originSel = document.getElementById("select-origin");
    const destSel = document.getElementById("select-destination");

    const buildOptions = (selectedId) =>
      locations
        .map(
          (loc) =>
            `<option value="${loc.id}" ${loc.id === selectedId ? "selected" : ""}>${loc.label}</option>`
        )
        .join("");

    originSel.innerHTML = buildOptions(state.originId);
    destSel.innerHTML = buildOptions(state.destinationId);

    renderIntermediateStopsUI();
  }

  function renderIntermediateStopsUI() {
    const container = document.getElementById("stops-container");
    const locations = getAllSelectableLocations();
    container.innerHTML = state.intermediateStopIds
      .map((stopId, idx) => {
        const opts = locations
          .map(
            (loc) =>
              `<option value="${loc.id}" ${loc.id === stopId ? "selected" : ""}>Parada ${idx + 1}: ${loc.label}</option>`
          )
          .join("");
        return `
          <div class="wp-row">
            <span class="wp-dot stop" title="Parada Intermediária ${idx + 1}"></span>
            <select class="wp-select" onchange="AtlasApp.updateIntermediateStop(${idx}, this.value)">
              ${opts}
            </select>
            <button class="btn-icon-small" title="Remover Parada" onclick="AtlasApp.removeIntermediateStop(${idx})">✕</button>
          </div>
        `;
      })
      .join("");
  }

  function addIntermediateStop(specificId = null) {
    const locations = getAllSelectableLocations();
    const defaultStop =
      specificId ||
      (locations.find((l) => l.id !== state.originId && l.id !== state.destinationId) || locations[0]).id;
    state.intermediateStopIds.push(defaultStop);
    renderIntermediateStopsUI();
    calculateAllRoutes();
    AtlasLogger.record("INFO", "intermediate_stop_added", {
      stop_id: defaultStop,
      total_stops: state.intermediateStopIds.length,
    });
  }

  function updateIntermediateStop(index, newId) {
    state.intermediateStopIds[index] = newId;
    calculateAllRoutes();
  }

  function removeIntermediateStop(index) {
    const removed = state.intermediateStopIds.splice(index, 1);
    renderIntermediateStopsUI();
    calculateAllRoutes();
    AtlasLogger.record("INFO", "intermediate_stop_removed", { removed_stop: removed[0] });
  }

  function onWaypointsChanged() {
    state.originId = document.getElementById("select-origin").value;
    state.destinationId = document.getElementById("select-destination").value;
    calculateAllRoutes();
  }

  function resolveWaypointById(id) {
    const all = getAllSelectableLocations();
    return all.find((x) => x.id === id) || all[0];
  }

  /**
   * Renders Topographic Contours, Base Station, Science Points, NASA Rover Trail, and 325 Obstacles.
   */
  function renderMapMarkers() {
    markersLayerGroup.clearLayers();
    contoursLayerGroup.clearLayers();

    const showBase = document.getElementById("chk-show-base")?.checked ?? true;
    const showScience = document.getElementById("chk-show-science")?.checked ?? true;
    const showObstacles = document.getElementById("chk-show-obstacles")?.checked ?? true;
    const showNasaTrail = document.getElementById("chk-show-nasa-trail")?.checked ?? true;
    const showContours = document.getElementById("chk-show-contours")?.checked ?? true;

    document.getElementById("count-science-lbl").textContent = state.scienceTargets.length;
    document.getElementById("count-obstacles-lbl").textContent = state.obstacles.length;

    // 1. Topographic Elevation Contour Lines & Delta Rim Visualization
    if (showContours) {
      const contourBands = [
        {
          elev: "-2565m (Assoalho da Cratera)",
          coords: [
            [18.415, 77.435],
            [18.435, 77.442],
            [18.455, 77.438],
            [18.470, 77.430],
          ],
        },
        {
          elev: "-2540m (Base da Escarpa do Delta)",
          coords: [
            [18.420, 77.416],
            [18.438, 77.419],
            [18.452, 77.417],
            [18.468, 77.405],
          ],
        },
        {
          elev: "-2515m (Platô Superior do Delta)",
          coords: [
            [18.428, 77.392],
            [18.448, 77.398],
            [18.465, 77.388],
            [18.482, 77.372],
          ],
        },
        {
          elev: "-2480m (Unidade Marginal / Canal Neretva)",
          coords: [
            [18.445, 77.365],
            [18.468, 77.368],
            [18.488, 77.350],
          ],
        },
      ];

      contourBands.forEach((band) => {
        const line = L.polyline(band.coords, {
          color: state.mapLayerMode === "relief" ? "#38bdf8" : "#fdba74",
          weight: 1.4,
          dashArray: "6, 6",
          opacity: state.mapLayerMode === "relief" ? 0.65 : 0.32,
        }).bindTooltip(`Isolinha MOLA: ${band.elev}`, { sticky: true });
        contoursLayerGroup.addLayer(line);
      });
    }

    // 2. Historical NASA Perseverance Traverse Trail
    if (showNasaTrail && state.roverTraverse.length > 1) {
      const trailCoords = state.roverTraverse.map((p) => [p.lat, p.lon]);
      const nasaLine = L.polyline(trailCoords, {
        color: "#cbd5e1",
        weight: 2,
        dashArray: "3, 5",
        opacity: 0.55,
      }).bindTooltip("Trilha Histórica Real Rover Perseverance (NASA MMGIS)", { sticky: true });
      markersLayerGroup.addLayer(nasaLine);
    }

    // 3. Obstacles (with 1 to 5 Criticality Filter)
    if (showObstacles) {
      state.obstacles.forEach((obs) => {
        const crit = Number(obs.criticality_level) || 3;
        if (state.criticalityFilter !== "ALL") {
          if (state.criticalityFilter === 1 && crit > 2) return;
          if (state.criticalityFilter !== 1 && crit !== Number(state.criticalityFilter)) return;
        }

        const color = CRIT_COLORS[crit] || "#f59e0b";
        const radiusM = Number(obs.radius_meters) || 20;

        // Draw geographical hazard radius circle
        const circle = L.circle([obs.lat, obs.lon], {
          radius: radiusM,
          color: color,
          weight: crit >= 4 ? 2 : 1.2,
          fillColor: color,
          fillOpacity: obs.is_dynamic_report ? 0.48 : crit >= 4 ? 0.32 : 0.20,
        });

        circle.bindTooltip(
          `<strong>⚠️ ${obs.name}</strong><br/>` +
            `Tipo: ${OBSTACLE_TYPE_NAMES[obs.obstacle_type] || obs.obstacle_type}<br/>` +
            `Criticidade: <b>${crit}/5</b> • Raio: ${radiusM}m • Inclinação: ${obs.slope_deg}°`,
          { direction: "top" }
        );

        circle.on("click", function (ev) {
          L.DomEvent.stopPropagation(ev);
          inspectItem("obstacle", obs);
        });

        markersLayerGroup.addLayer(circle);
      });
    }

    // 4. Scientific Points of Interest
    if (showScience) {
      state.scienceTargets.forEach((sci) => {
        const iconHtml = `
          <div style="
            background: rgba(168, 85, 247, 0.92);
            border: 2px solid #f3e8ff;
            color: #fff;
            padding: 3px 8px;
            border-radius: 999px;
            font-size: 11px;
            font-weight: 700;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(168, 85, 247, 0.55);
          ">🔬 ${sci.name.split("(")[0].trim()}</div>
        `;
        const marker = L.marker([sci.lat, sci.lon], {
          icon: L.divIcon({
            className: "science-div-icon",
            html: iconHtml,
            iconSize: [140, 26],
            iconAnchor: [70, 13],
          }),
        });

        marker.bindTooltip(
          `<strong>🔬 Ponto Científico: ${sci.name}</strong><br/>` +
            `Categoria: ${sci.category}<br/>` +
            `Elevação: ${sci.elevation_m}m • Interesse: ${Math.round((sci.scientific_interest_score || 0.9) * 100)}%<br/>` +
            `<em>Clique para ver detalhes, usar na rota ou remover</em>`,
          { direction: "top" }
        );

        marker.on("click", function (ev) {
          L.DomEvent.stopPropagation(ev);
          inspectItem("science", sci);
        });

        markersLayerGroup.addLayer(marker);
      });
    }

    // 5. Fictional Fixed Base Station (Estação Base Ares Alpha)
    if (showBase && state.baseStation) {
      const baseHtml = `
        <div style="
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 2px solid #d1fae5;
          color: #031c14;
          padding: 4px 10px;
          border-radius: 999px;
          font-size: 11.5px;
          font-weight: 800;
          white-space: nowrap;
          box-shadow: 0 0 18px rgba(16, 185, 129, 0.75);
        ">🏠 BASE ARES ALPHA</div>
      `;
      const baseMarker = L.marker([state.baseStation.lat, state.baseStation.lon], {
        icon: L.divIcon({
          className: "base-div-icon",
          html: baseHtml,
          iconSize: [150, 28],
          iconAnchor: [75, 14],
        }),
      });

      baseMarker.bindTooltip(
        `<strong>🏠 ${state.baseStation.name}</strong><br/>` +
          `Coordenadas: ${state.baseStation.lat}° N, ${state.baseStation.lon}° E<br/>` +
          `Altitude: ${state.baseStation.elevation_m}m • Ponto de Partida Padrão`,
        { direction: "top" }
      );

      baseMarker.on("click", function (ev) {
        L.DomEvent.stopPropagation(ev);
        inspectItem("base", state.baseStation);
      });

      markersLayerGroup.addLayer(baseMarker);
    }
  }

  /**
   * Computes all 3 route alternatives across [Origin, ...Stops, Destination] and renders them.
   */
  function calculateAllRoutes(customStartCoord = null) {
    const cid = AtlasLogger.generateCorrelationId();
    const originPt = customStartCoord || resolveWaypointById(state.originId);
    const stopPts = state.intermediateStopIds.map((id) => resolveWaypointById(id));
    const destPt = resolveWaypointById(state.destinationId);

    const sequence = [originPt, ...stopPts, destPt];

    state.candidateRoutes = AtlasRouter.computeMultiRoutes(
      sequence,
      state.obstacles,
      state.scienceTargets,
      state.referenceElevationPoints
    );

    if (!state.candidateRoutes.find((r) => r.id === state.selectedRouteId)) {
      state.selectedRouteId = "route_safe";
    }

    renderCandidateRoutesCards();
    if (state.operationMode === "route") {
      drawCandidateRoutesOnMap();
    }
    updateBottomHudForSelectedRoute();

    AtlasLogger.record(
      "INFO",
      "multi_routes_calculated",
      {
        origin: originPt.id || "LIVE_POS",
        stops: state.intermediateStopIds,
        destination: destPt.id,
        routes_generated: state.candidateRoutes.map((r) => ({
          id: r.id,
          distance_m: r.totalDistanceMeters,
          duration_min: r.durationMinutes,
          avoided_hazards: r.avoidedObstaclesCount,
        })),
      },
      cid
    );
  }

  function renderCandidateRoutesCards() {
    const listEl = document.getElementById("candidate-routes-list");
    listEl.innerHTML = state.candidateRoutes
      .map((route) => {
        const isSelected = route.id === state.selectedRouteId;
        const distKm = (route.totalDistanceMeters / 1000).toFixed(2);
        return `
          <div class="route-card ${isSelected ? "selected" : ""}" onclick="AtlasApp.selectRoute('${route.id}')">
            <div class="route-card-header">
              <div class="route-name">
                <span style="width:10px;height:10px;border-radius:50%;background:${route.color};display:inline-block;"></span>
                ${route.name}
              </div>
              <span class="route-badge" style="color:${route.color};">${route.badge}</span>
            </div>

            <div class="route-metrics">
              <div class="metric-item">
                <span class="metric-label">Distância Total</span>
                <span class="metric-val">${distKm} km</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Tempo Estimado</span>
                <span class="metric-val">${route.durationMinutes} min</span>
              </div>
              <div class="metric-item">
                <span class="metric-label">Desvios / Risco</span>
                <span class="metric-val">${route.avoidedObstaclesCount} desvios</span>
              </div>
            </div>

            <div class="route-desc">
              ${route.description} <br/>
              <strong style="color:var(--text-main);">Risco: ${route.riskLabel} • Incl. Máx: ${route.maxSlopeDeg}° • +${route.detourMeters}m desvio seguro</strong>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function selectRoute(routeId) {
    state.selectedRouteId = routeId;
    renderCandidateRoutesCards();
    drawCandidateRoutesOnMap();
    updateBottomHudForSelectedRoute();
    AtlasLogger.record("DEBUG", "candidate_route_selected", { selected_route_id: routeId });
  }

  function drawCandidateRoutesOnMap() {
    routesLayerGroup.clearLayers();
    if (!state.candidateRoutes || state.candidateRoutes.length === 0) return;

    // Draw non-selected candidate routes first so the selected route is on top
    const ordered = state.candidateRoutes
      .slice()
      .sort((a, b) => (a.id === state.selectedRouteId ? 1 : b.id === state.selectedRouteId ? -1 : 0));

    ordered.forEach((route) => {
      const isSel = route.id === state.selectedRouteId;
      const poly = L.polyline(route.coords, {
        color: route.color,
        weight: isSel ? 5.5 : 3.2,
        opacity: isSel ? 0.95 : 0.55,
        dashArray: isSel ? null : "8, 8",
      });

      poly.bindTooltip(
        `<strong>${route.name}</strong><br/>` +
          `Distância: ${(route.totalDistanceMeters / 1000).toFixed(2)} km • Tempo: ${route.durationMinutes} min<br/>` +
          `<em>Clique para selecionar esta rota</em>`,
        { sticky: true }
      );

      poly.on("click", function () {
        selectRoute(route.id);
      });

      routesLayerGroup.addLayer(poly);
    });
  }

  function getSelectedRoute() {
    return (
      state.candidateRoutes.find((r) => r.id === state.selectedRouteId) || state.candidateRoutes[0]
    );
  }

  function updateBottomHudForSelectedRoute() {
    const route = getSelectedRoute();
    if (!route) return;

    document.getElementById("hud-route-title").textContent = route.name;
    document.getElementById("hud-dist-remaining").textContent =
      (route.totalDistanceMeters / 1000).toFixed(2) + " km";
    document.getElementById("hud-time-remaining").textContent = route.durationMinutes + " min";
    document.getElementById("hud-slope-live").textContent = `${route.maxSlopeDeg}° (${route.riskLabel.split(" ")[0]})`;
    document.getElementById("hud-progress-bar").style.width = "0%";

    renderElevationProfileSvg(route.elevationProfile, 0);
  }

  function renderElevationProfileSvg(profile, activeIndex = 0) {
    const svg = document.getElementById("elevation-svg");
    if (!profile || profile.length < 2) {
      svg.innerHTML = "";
      return;
    }

    const elevs = profile.map((p) => p.elevation_m);
    const minE = Math.min(...elevs) - 5;
    const maxE = Math.max(...elevs) + 5;
    const spanE = Math.max(10, maxE - minE);

    const W = 500;
    const H = 68;

    const pts = profile.map((p, idx) => {
      const x = (idx / (profile.length - 1)) * W;
      const y = H - 8 - ((p.elevation_m - minE) / spanE) * (H - 18);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const areaPts = `0,${H} ` + pts.join(" ") + ` ${W},${H}`;
    const startE = profile[0].elevation_m;
    const endE = profile[profile.length - 1].elevation_m;
    const deltaE = Math.round(endE - startE);

    document.getElementById("elev-summary-lbl").textContent =
      `Início: ${startE}m → Fim: ${endE}m (Δ ${deltaE >= 0 ? "+" : ""}${deltaE}m)`;

    const activeIdxClamped = Math.min(profile.length - 1, Math.max(0, activeIndex));
    const [ax, ay] = pts[activeIdxClamped].split(",");

    svg.innerHTML = `
      <defs>
        <linearGradient id="elevGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.55"/>
          <stop offset="100%" stop-color="#10b981" stop-opacity="0.05"/>
        </linearGradient>
      </defs>
      <polygon points="${areaPts}" fill="url(#elevGrad)" />
      <polyline fill="none" stroke="#38bdf8" stroke-width="2.2" points="${pts.join(" ")}" />
      <circle cx="${ax}" cy="${ay}" r="4.5" fill="#10b981" stroke="#fff" stroke-width="1.5" />
    `;
  }

  /**
   * Inspector Panel (Hover/Click info for Obstacles, Science Targets, and Base + Removal)
   */
  function inspectItem(type, item) {
    const panel = document.getElementById("right-panel");
    const content = document.getElementById("right-panel-content");
    panel.classList.add("visible");

    if (type === "obstacle") {
      const crit = Number(item.criticality_level) || 3;
      content.innerHTML = `
        <div class="panel-header">
          <div>
            <span class="crit-badge crit-${crit}">${CRIT_LABELS[crit]}</span>
            <h3 style="font-size: 15px; margin-top: 6px;">⚠️ ${item.name}</h3>
          </div>
          <button class="close-btn" onclick="AtlasApp.closeRightPanel()">✕</button>
        </div>

        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45;">
          ${item.description}
        </p>

        <div class="info-grid">
          <div class="info-box">
            <span>ID do Empecilho</span>
            <strong>${item.obstacle_id}</strong>
          </div>
          <div class="info-box">
            <span>Tipo de Perigo</span>
            <strong>${OBSTACLE_TYPE_NAMES[item.obstacle_type] || item.obstacle_type}</strong>
          </div>
          <div class="info-box">
            <span>Raio de Bloqueio</span>
            <strong>${item.radius_meters} metros</strong>
          </div>
          <div class="info-box">
            <span>Inclinação Local</span>
            <strong>${item.slope_deg}°</strong>
          </div>
          <div class="info-box">
            <span>Coordenadas</span>
            <strong>${item.lat}° N, ${item.lon}° E</strong>
          </div>
          <div class="info-box">
            <span>Elevação (MOLA)</span>
            <strong>${item.elevation_m} m</strong>
          </div>
          <div class="info-box">
            <span>Fonte / Base</span>
            <strong>${item.source_dataset}</strong>
          </div>
          <div class="info-box">
            <span>Transponível?</span>
            <strong>${item.passable_by_rover ? "Sim (Cautela)" : "Não (Desvio Obrigatório)"}</strong>
          </div>
        </div>

        <div class="btn-row" style="margin-top: 12px; margin-bottom: 0;">
          <button class="btn-secondary" onclick="AtlasApp.flyToCoord(${item.lat}, ${item.lon})">
            🎯 Centralizar Mapa
          </button>
          <button class="btn-stop-nav" onclick="AtlasApp.deleteObstacle('${item.obstacle_id}')">
            🗑️ Remover Empecilho
          </button>
        </div>
      `;
    } else if (type === "science") {
      content.innerHTML = `
        <div class="panel-header">
          <div>
            <span class="crit-badge crit-2">🔬 Ponto Científico de Interesse</span>
            <h3 style="font-size: 15px; margin-top: 6px;">${item.name}</h3>
          </div>
          <button class="close-btn" onclick="AtlasApp.closeRightPanel()">✕</button>
        </div>

        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45;">
          ${item.description}
        </p>

        <div class="info-grid">
          <div class="info-box">
            <span>Código ID</span>
            <strong>${item.target_id}</strong>
          </div>
          <div class="info-box">
            <span>Categoria Científica</span>
            <strong>${item.category}</strong>
          </div>
          <div class="info-box">
            <span>Coordenadas</span>
            <strong>${item.lat}° N, ${item.lon}° E</strong>
          </div>
          <div class="info-box">
            <span>Altitude MOLA</span>
            <strong>${item.elevation_m} m</strong>
          </div>
        </div>

        <div class="btn-row" style="margin-top: 10px;">
          <button class="btn-secondary" onclick="AtlasApp.setAsDestination('${item.target_id}')">
            🏁 Definir Destino
          </button>
          <button class="btn-secondary" onclick="AtlasApp.addIntermediateStop('${item.target_id}')">
            ➕ Adicionar Parada
          </button>
        </div>
        <button class="btn-stop-nav" style="width: 100%;" onclick="AtlasApp.deleteSciencePoint('${item.target_id}')">
          🗑️ Remover Ponto Científico
        </button>
      `;
    } else if (type === "base") {
      content.innerHTML = `
        <div class="panel-header">
          <div>
            <span class="crit-badge crit-1">🏠 Habitat & Centro de Comando</span>
            <h3 style="font-size: 15px; margin-top: 6px;">${item.name}</h3>
          </div>
          <button class="close-btn" onclick="AtlasApp.closeRightPanel()">✕</button>
        </div>
        <p style="font-size: 12.5px; color: var(--text-secondary); line-height: 1.45;">
          ${item.description}
        </p>
        <div class="info-grid">
          <div class="info-box"><span>Coordenadas</span><strong>${item.lat}° N, ${item.lon}° E</strong></div>
          <div class="info-box"><span>Elevação</span><strong>${item.elevation_m} m</strong></div>
        </div>
      `;
    }
  }

  function closeRightPanel() {
    state.placementMode = null;
    document.getElementById("btn-add-science").classList.remove("active-placement");
    document.getElementById("btn-add-obstacle").classList.remove("active-placement");
    document.getElementById("right-panel").classList.remove("visible");
  }

  /**
   * Modal / Drawer to Add New Scientific Point or New Obstacle (Waze Report)
   */
  function openCreateModal(kind, coordsOverride = null) {
    state.placementMode = kind;
    const panel = document.getElementById("right-panel");
    const content = document.getElementById("right-panel-content");
    panel.classList.add("visible");

    document
      .getElementById("btn-add-science")
      .classList.toggle("active-placement", kind === "science");
    document
      .getElementById("btn-add-obstacle")
      .classList.toggle("active-placement", kind === "obstacle");

    const lat = coordsOverride ? coordsOverride.lat : state.tempClickLatLon.lat;
    const lon = coordsOverride ? coordsOverride.lon : state.tempClickLatLon.lon;

    if (kind === "obstacle") {
      content.innerHTML = `
        <div class="panel-header">
          <div>
            <span class="crit-badge crit-5">⚠️ Registro Dinâmico Waze</span>
            <h3 style="font-size: 15px; margin-top: 6px;">Adicionar Novo Empecilho</h3>
          </div>
          <button class="close-btn" onclick="AtlasApp.closeRightPanel()">✕</button>
        </div>

        <p style="font-size: 11.5px; color: #fca5a5; margin-bottom: 10px;">
          💡 Dica: Clique em qualquer ponto do mapa (inclusive em cima de uma rota ativa!) para preencher as coordenadas automaticamente.
        </p>

        <div class="form-group">
          <label>Nome / Identificação do Empecilho</label>
          <input id="form-obs-name" class="form-input" value="Rocha Solta / Bloqueio na Trilha" />
        </div>

        <div class="form-group">
          <label>Tipo de Empecilho</label>
          <select id="form-obs-type" class="wp-select" style="width: 100%;">
            <option value="boulder_field">Campo de Rochas / Pedra no Caminho</option>
            <option value="crater">Cratera / Buraco Profundo</option>
            <option value="sand_trap">Areia Densa / Armadilha de Duna</option>
            <option value="steep_slope">Inclinação Severa / Escarpa</option>
          </select>
        </div>

        <div class="form-group">
          <label>Escala de Criticidade (1 a 5)</label>
          <div class="crit-selector" id="modal-crit-selector">
            ${[1, 2, 3, 4, 5]
              .map(
                (lvl) => `
              <button type="button" class="crit-option crit-${lvl} ${
                  state.newObstacleCrit === lvl ? "active" : ""
                }" onclick="AtlasApp.selectModalCrit(${lvl})">${lvl}</button>
            `
              )
              .join("")}
          </div>
        </div>

        <div class="info-grid">
          <div class="form-group">
            <label>Latitude (°N)</label>
            <input id="form-lat" type="number" step="0.0001" class="form-input" value="${lat}" />
          </div>
          <div class="form-group">
            <label>Longitude (°E)</label>
            <input id="form-lon" type="number" step="0.0001" class="form-input" value="${lon}" />
          </div>
          <div class="form-group">
            <label>Raio de Risco (m)</label>
            <input id="form-obs-radius" type="number" class="form-input" value="95" />
          </div>
          <div class="form-group">
            <label>Inclinação (°)</label>
            <input id="form-obs-slope" type="number" step="0.5" class="form-input" value="18.5" />
          </div>
        </div>

        <div class="form-group">
          <label>Observações de Campo</label>
          <textarea id="form-obs-desc" class="form-textarea" rows="2">Obstáculo identificado durante exploração; registrado para desvio automático de rotas.</textarea>
        </div>

        <button class="btn-primary" style="margin-bottom: 0;" onclick="AtlasApp.submitNewObstacle()">
          ⚠️ Registrar Empecilho e Recalcular Rotas
        </button>
      `;
    } else {
      content.innerHTML = `
        <div class="panel-header">
          <div>
            <span class="crit-badge crit-2">🔬 Catalogação Científica</span>
            <h3 style="font-size: 15px; margin-top: 6px;">Novo Ponto Científico</h3>
          </div>
          <button class="close-btn" onclick="AtlasApp.closeRightPanel()">✕</button>
        </div>

        <p style="font-size: 11.5px; color: #67e8f9; margin-bottom: 10px;">
          💡 Clique em qualquer local da Cratera Jezero no mapa para capturar as coordenadas do ponto científico.
        </p>

        <div class="form-group">
          <label>Nome do Ponto Científico</label>
          <input id="form-sci-name" class="form-input" value="Afloramento Carbonático Hidrotermal" />
        </div>

        <div class="form-group">
          <label>Categoria de Pesquisa</label>
          <select id="form-sci-cat" class="wp-select" style="width: 100%;">
            <option value="Astrobiologia / Bioassinatura">Astrobiologia / Bioassinatura</option>
            <option value="Sedimentos Lacustres (Delta)">Sedimentos Lacustres (Delta)</option>
            <option value="Mineralogia / Carbonatos">Mineralogia / Carbonatos</option>
            <option value="Geologia Ígnea / Coleta">Geologia Ígnea / Coleta</option>
          </select>
        </div>

        <div class="info-grid">
          <div class="form-group">
            <label>Latitude (°N)</label>
            <input id="form-lat" type="number" step="0.0001" class="form-input" value="${lat}" />
          </div>
          <div class="form-group">
            <label>Longitude (°E)</label>
            <input id="form-lon" type="number" step="0.0001" class="form-input" value="${lon}" />
          </div>
        </div>

        <div class="form-group">
          <label>Descrição Científica</label>
          <textarea id="form-sci-desc" class="form-textarea" rows="2">Formação rochosa de alto interesse para coleta de amostras e análise espectrométrica.</textarea>
        </div>

        <button class="btn-primary" style="margin-bottom: 0;" onclick="AtlasApp.submitNewSciencePoint()">
          🔬 Salvar Ponto Científico no Mapa
        </button>
      `;
    }
  }

  function selectModalCrit(level) {
    state.newObstacleCrit = Number(level);
    document.querySelectorAll("#modal-crit-selector .crit-option").forEach((btn) => {
      btn.classList.toggle("active", Number(btn.textContent) === state.newObstacleCrit);
    });
  }

  function submitNewObstacle() {
    const cid = AtlasLogger.generateCorrelationId();
    const name = document.getElementById("form-obs-name").value.trim() || "Obstáculo Reportado";
    const obsType = document.getElementById("form-obs-type").value;
    const lat = parseFloat(document.getElementById("form-lat").value);
    const lon = parseFloat(document.getElementById("form-lon").value);
    const radius = parseFloat(document.getElementById("form-obs-radius").value) || 80;
    const slope = parseFloat(document.getElementById("form-obs-slope").value) || 16.0;
    const desc = document.getElementById("form-obs-desc").value.trim();
    const crit = state.newObstacleCrit;

    const elev = AtlasRouter.estimateElevation(lat, lon, state.referenceElevationPoints);
    const newObs = {
      obstacle_id: "WAZE_OBS_" + Date.now().toString().slice(-5),
      name,
      source_dataset: "User_Dynamic_Hazard_Report",
      lat,
      lon,
      elevation_m: elev,
      obstacle_type: obsType,
      radius_meters: radius,
      slope_deg: slope,
      severity_score: Math.round((crit / 5) * 100) / 100,
      criticality_level: crit,
      passable_by_rover: crit <= 2,
      is_dynamic_report: true,
      description: desc,
    };

    state.obstacles.unshift(newObs);

    AtlasLogger.record("CRITICAL", "dynamic_obstacle_registered", newObs, cid);

    closeRightPanel();
    renderMapMarkers();
    renderExploreCatalogs();

    // Check if the active route is impacted by this new obstacle
    const activeRoute = getSelectedRoute();
    const impacted = activeRoute
      ? AtlasRouter.doesObstacleImpactRoute(activeRoute.coords, newObs)
      : true;

    if (state.traverse.active) {
      // Reroute dynamically from current live rover/explorer coordinate!
      showWazeToast(
        `⚠️ Alerta Waze: "${newObs.name}" (Criticidade ${crit}/5) detectado à frente! Recalculando desvio em tempo real...`
      );
      calculateAllRoutes({
        id: "LIVE_EXPLORER_POS",
        lat: state.traverse.currentLat,
        lon: state.traverse.currentLon,
        elevation_m: elev,
      });
      state.traverse.currentCoordIndex = 0;
      state.traverse.segmentProgress = 0;
    } else {
      if (impacted) {
        showWazeToast(
          `⚠️ Novo empecilho "${newObs.name}" (Nível ${crit}/5) registrado na rota! Desvio seguro recalculado automaticamente.`
        );
      } else {
        showWazeToast(
          `✅ Empecilho "${newObs.name}" (Nível ${crit}/5) registrado na base e rotas atualizadas!`
        );
      }
      calculateAllRoutes();
    }
  }

  function submitNewSciencePoint() {
    const cid = AtlasLogger.generateCorrelationId();
    const name = document.getElementById("form-sci-name").value.trim() || "Novo Ponto Científico";
    const category = document.getElementById("form-sci-cat").value;
    const lat = parseFloat(document.getElementById("form-lat").value);
    const lon = parseFloat(document.getElementById("form-lon").value);
    const desc = document.getElementById("form-sci-desc").value.trim();

    const elev = AtlasRouter.estimateElevation(lat, lon, state.referenceElevationPoints);
    const newSci = {
      target_id: "SCI_" + (state.scienceTargets.length + 1).toString().padStart(3, "0"),
      name,
      category,
      lat,
      lon,
      elevation_m: elev,
      scientific_interest_score: 0.95,
      priority_level: 5,
      description: desc,
    };

    state.scienceTargets.push(newSci);
    AtlasLogger.record("INFO", "science_target_registered", newSci, cid);

    closeRightPanel();
    populateWaypointSelectors();
    renderMapMarkers();
    renderExploreCatalogs();
    calculateAllRoutes();
    showWazeToast(`🔬 Ponto Científico "${newSci.name}" adicionado ao mapa e às opções de rota!`);
  }

  function deleteObstacle(obstacleId) {
    state.obstacles = state.obstacles.filter((o) => o.obstacle_id !== obstacleId);
    AtlasLogger.record("WARN", "obstacle_removed", { obstacle_id: obstacleId });
    closeRightPanel();
    renderMapMarkers();
    renderExploreCatalogs();
    calculateAllRoutes();
  }

  function deleteSciencePoint(targetId) {
    if (state.scienceTargets.length <= 1) return;
    state.scienceTargets = state.scienceTargets.filter((s) => s.target_id !== targetId);
    state.intermediateStopIds = state.intermediateStopIds.filter((id) => id !== targetId);
    if (state.originId === targetId) state.originId = state.baseStation.base_id;
    if (state.destinationId === targetId) state.destinationId = state.scienceTargets[0].target_id;

    AtlasLogger.record("WARN", "science_target_removed", { target_id: targetId });
    closeRightPanel();
    populateWaypointSelectors();
    renderMapMarkers();
    renderExploreCatalogs();
    calculateAllRoutes();
  }

  function setAsDestination(targetId) {
    state.destinationId = targetId;
    document.getElementById("select-destination").value = targetId;
    setOperationMode("route");
    calculateAllRoutes();
  }

  function setCriticalityFilter(filterVal) {
    state.criticalityFilter = filterVal;
    document.querySelectorAll("#tab-explore .crit-option").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-crit") === String(filterVal));
    });
    renderMapMarkers();
  }

  function renderExploreCatalogs() {
    const sciContainer = document.getElementById("catalog-science-list");
    sciContainer.innerHTML = state.scienceTargets
      .map(
        (s) => `
        <div class="route-card" style="padding: 9px 11px; margin-bottom: 6px;" onclick="AtlasApp.flyToAndInspect('science', '${s.target_id}')">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <strong style="font-size: 12px;">🔬 ${s.name}</strong>
            <span style="font-size: 10.5px; color: var(--accent-primary);">${s.elevation_m}m</span>
          </div>
          <div style="font-size: 11px; color: var(--text-secondary);">${s.category}</div>
        </div>
      `
      )
      .join("");

    const obsContainer = document.getElementById("catalog-obstacles-list");
    const topObstacles = state.obstacles.slice(0, 12);
    obsContainer.innerHTML = topObstacles
      .map((o) => {
        const crit = Number(o.criticality_level) || 3;
        return `
          <div class="route-card" style="padding: 9px 11px; margin-bottom: 6px;" onclick="AtlasApp.flyToAndInspect('obstacle', '${o.obstacle_id}')">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="font-size: 12px;">⚠️ ${o.name}</strong>
              <span class="crit-badge crit-${crit}" style="font-size:10px; padding:1px 6px;">Nív. ${crit}/5</span>
            </div>
            <div style="font-size: 11px; color: var(--text-secondary);">
              Raio: ${o.radius_meters}m • Inclinação: ${o.slope_deg}° • ${o.source_dataset}
            </div>
          </div>
        `;
      })
      .join("");
  }

  function flyToAndInspect(type, id) {
    if (type === "science") {
      const item = state.scienceTargets.find((s) => s.target_id === id);
      if (item) {
        map.flyTo([item.lat, item.lon], 15, { duration: 0.7 });
        inspectItem("science", item);
      }
    } else {
      const item = state.obstacles.find((o) => o.obstacle_id === id);
      if (item) {
        map.flyTo([item.lat, item.lon], 15, { duration: 0.7 });
        inspectItem("obstacle", item);
      }
    }
  }

  function flyToCoord(lat, lon) {
    map.flyTo([lat, lon], 16, { duration: 0.7 });
  }

  function flyToBaseStation() {
    map.flyTo([state.baseStation.lat, state.baseStation.lon], 15, { duration: 0.8 });
    inspectItem("base", state.baseStation);
  }

  /**
   * Saved Past Routes Management
   */
  function saveCurrentRoute() {
    const route = getSelectedRoute();
    if (!route) return;
    const originPt = resolveWaypointById(state.originId);
    const destPt = resolveWaypointById(state.destinationId);

    const savedEntry = {
      id: "SAVED_" + (state.savedRoutes.length + 1).toString().padStart(2, "0"),
      title: `${originPt.label.replace(/^[^\]]+\]\s*/, "")} → ${destPt.label.replace(/^[^\]]+\]\s*/, "")}`,
      timestamp: `Salva em ${new Date().toLocaleTimeString("pt-BR")}`,
      originId: state.originId,
      stopIds: [...state.intermediateStopIds],
      destinationId: state.destinationId,
      distanceKm: (route.totalDistanceMeters / 1000).toFixed(2) + " km",
      durationMin: route.durationMinutes + " min",
      riskLabel: route.riskLabel,
    };

    state.savedRoutes.unshift(savedEntry);
    renderSavedRoutes();
    AtlasLogger.record("INFO", "route_saved_to_history", savedEntry);
    showWazeToast(`💾 Rota "${savedEntry.title}" salva no histórico!`);
  }

  function renderSavedRoutes() {
    document.getElementById("saved-count").textContent = state.savedRoutes.length;
    const container = document.getElementById("saved-routes-container");
    container.innerHTML = state.savedRoutes
      .map(
        (sr, idx) => `
        <div class="route-card">
          <div class="route-card-header">
            <strong style="font-size: 12.5px;">🧭 ${sr.title}</strong>
            <span style="font-size: 10px; color: var(--text-secondary);">${sr.timestamp}</span>
          </div>
          <div style="font-size: 11.5px; color: var(--text-secondary); margin: 6px 0;">
            Distância: <b>${sr.distanceKm}</b> • Tempo: <b>${sr.durationMin}</b> • Paradas: <b>${sr.stopIds.length}</b><br/>
            Segurança: ${sr.riskLabel}
          </div>
          <div class="btn-row" style="margin-bottom: 0; margin-top: 8px;">
            <button class="btn-secondary" onclick="AtlasApp.loadSavedRoute(${idx})">
              📂 Carregar no Mapa
            </button>
            <button class="btn-icon-small" style="width: auto; padding: 0 10px;" onclick="AtlasApp.deleteSavedRoute(${idx})">
              Excluir
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  function loadSavedRoute(idx) {
    const sr = state.savedRoutes[idx];
    if (!sr) return;
    state.originId = sr.originId;
    state.intermediateStopIds = [...sr.stopIds];
    state.destinationId = sr.destinationId;

    setOperationMode("route");
    populateWaypointSelectors();
    calculateAllRoutes();
    AtlasLogger.record("INFO", "saved_route_loaded", { route_id: sr.id });
  }

  function deleteSavedRoute(idx) {
    state.savedRoutes.splice(idx, 1);
    renderSavedRoutes();
  }

  /**
   * Real-Time Traverse Navigation Simulation (Start, Pause, Stop, Remaining Distance & Time)
   */
  function startTraverse() {
    const route = getSelectedRoute();
    if (!route || !route.coords || route.coords.length < 2) return;

    if (state.traverse.active && state.traverse.paused) {
      state.traverse.paused = false;
      document.getElementById("hud-nav-badge").textContent = "EM PERCURSO ATIVO";
      document.getElementById("hud-nav-badge").className = "live-pill";
      AtlasLogger.record("INFO", "traverse_resumed", { route_id: route.id });
      return;
    }

    stopTraverse(false);

    state.traverse.active = true;
    state.traverse.paused = false;
    state.traverse.currentCoordIndex = 0;
    state.traverse.segmentProgress = 0;
    state.traverse.currentLat = route.coords[0][0];
    state.traverse.currentLon = route.coords[0][1];
    state.traverse.totalDistMeters = route.totalDistanceMeters;
    state.traverse.remainingDistMeters = route.totalDistanceMeters;

    document.getElementById("hud-nav-badge").textContent = "EM PERCURSO ATIVO";
    document.getElementById("hud-nav-badge").className = "live-pill";

    const explorerHtml = `
      <div style="
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: #38bdf8;
        border: 3px solid #fff;
        box-shadow: 0 0 18px #38bdf8;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
      ">🧑‍🚀</div>
    `;
    explorerLiveMarker = L.marker([state.traverse.currentLat, state.traverse.currentLon], {
      icon: L.divIcon({
        className: "explorer-live-icon",
        html: explorerHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      }),
      zIndexOffset: 1000,
    }).addTo(map);

    AtlasLogger.record("INFO", "traverse_started", {
      route_id: route.id,
      total_distance_m: route.totalDistanceMeters,
    });

    state.traverse.timerId = setInterval(stepTraverseSimulation, 120);
  }

  function stepTraverseSimulation() {
    if (!state.traverse.active || state.traverse.paused) return;
    const route = getSelectedRoute();
    if (!route || !route.coords) return;

    const coords = route.coords;
    const idx = state.traverse.currentCoordIndex;
    if (idx >= coords.length - 1) {
      finishTraverse();
      return;
    }

    const [lat1, lon1] = coords[idx];
    const [lat2, lon2] = coords[idx + 1];
    const segLen = Math.max(1, AtlasRouter.marsDistanceMeters(lat1, lon1, lat2, lon2));

    const stepMeters = 3.8 * state.traverse.speedMultiplier;
    state.traverse.segmentProgress += stepMeters / segLen;

    if (state.traverse.segmentProgress >= 1.0) {
      state.traverse.currentCoordIndex++;
      state.traverse.segmentProgress = 0;
    }

    const currIdx = Math.min(coords.length - 2, state.traverse.currentCoordIndex);
    const t = state.traverse.segmentProgress;
    const cLat = coords[currIdx][0] + (coords[currIdx + 1][0] - coords[currIdx][0]) * t;
    const cLon = coords[currIdx][1] + (coords[currIdx + 1][1] - coords[currIdx][1]) * t;

    state.traverse.currentLat = cLat;
    state.traverse.currentLon = cLon;

    if (explorerLiveMarker) {
      explorerLiveMarker.setLatLng([cLat, cLon]);
    }

    // Compute remaining distance from current position to end of route
    let remDist = AtlasRouter.marsDistanceMeters(
      cLat,
      cLon,
      coords[currIdx + 1][0],
      coords[currIdx + 1][1]
    );
    for (let k = currIdx + 1; k < coords.length - 1; k++) {
      remDist += AtlasRouter.marsDistanceMeters(
        coords[k][0],
        coords[k][1],
        coords[k + 1][0],
        coords[k + 1][1]
      );
    }
    state.traverse.remainingDistMeters = Math.max(0, Math.round(remDist));

    const pct = Math.min(
      100,
      Math.max(
        0,
        ((route.totalDistanceMeters - state.traverse.remainingDistMeters) /
          Math.max(1, route.totalDistanceMeters)) *
          100
      )
    );
    const remMin = Math.max(0, Math.ceil(state.traverse.remainingDistMeters / (route.speedMps * 60)));
    const elev = AtlasRouter.estimateElevation(cLat, cLon, state.referenceElevationPoints);

    document.getElementById("hud-dist-remaining").textContent =
      (state.traverse.remainingDistMeters / 1000).toFixed(2) + " km";
    document.getElementById("hud-time-remaining").textContent = remMin + " min";
    document.getElementById("hud-progress-bar").style.width = pct.toFixed(1) + "%";
    document.getElementById("hud-coords-live").textContent =
      `${cLat.toFixed(4)}° N, ${cLon.toFixed(4)}° E • ${elev}m`;

    renderElevationProfileSvg(route.elevationProfile, currIdx);
  }

  function pauseTraverse() {
    if (!state.traverse.active) return;
    state.traverse.paused = !state.traverse.paused;
    document.getElementById("hud-nav-badge").textContent = state.traverse.paused
      ? "PERCURSO PAUSADO"
      : "EM PERCURSO ATIVO";
    AtlasLogger.record("INFO", "traverse_pause_toggled", { paused: state.traverse.paused });
  }

  function stopTraverse(logEvent = true) {
    if (state.traverse.timerId) {
      clearInterval(state.traverse.timerId);
      state.traverse.timerId = null;
    }
    const wasActive = state.traverse.active;
    state.traverse.active = false;
    state.traverse.paused = false;

    if (explorerLiveMarker && map.hasLayer(explorerLiveMarker)) {
      map.removeLayer(explorerLiveMarker);
      explorerLiveMarker = null;
    }

    document.getElementById("hud-nav-badge").textContent = "TRAJETO INTERROMPIDO / PRONTO";
    document.getElementById("hud-nav-badge").className = "live-pill idle";
    updateBottomHudForSelectedRoute();

    if (logEvent && wasActive) {
      AtlasLogger.record("WARN", "traverse_stopped_by_user", {
        stopped_at_lat: state.traverse.currentLat,
        stopped_at_lon: state.traverse.currentLon,
        remaining_distance_m: state.traverse.remainingDistMeters,
      });
      showWazeToast("⏹️ Trajeto interrompido pelo explorador. Posição registrada nos logs.");
    }
  }

  function finishTraverse() {
    if (state.traverse.timerId) {
      clearInterval(state.traverse.timerId);
      state.traverse.timerId = null;
    }
    state.traverse.active = false;
    document.getElementById("hud-nav-badge").textContent = "DESTINO ALCANÇADO ✅";
    document.getElementById("hud-dist-remaining").textContent = "0.00 km";
    document.getElementById("hud-time-remaining").textContent = "0 min";
    document.getElementById("hud-progress-bar").style.width = "100%";

    AtlasLogger.record("INFO", "traverse_completed_successfully", {
      destination_id: state.destinationId,
    });
    showWazeToast("🏁 Destino científico alcançado com segurança!");
  }

  function changeTraverseSpeed(val) {
    state.traverse.speedMultiplier = Number(val) || 5;
  }

  /**
   * Logger UI & CSV Export
   */
  function initLoggerSubscription() {
    AtlasLogger.onLog((entry, allLogs) => {
      document.getElementById("log-counter").textContent = `${allLogs.length} eventos`;
      const container = document.getElementById("logs-list-container");
      container.innerHTML = allLogs
        .slice(0, 40)
        .map(
          (l) => `
          <div class="log-item ${l.level}">
            <div style="display:flex; justify-content:space-between; color:var(--text-secondary);">
              <span>[${l.level}] ${l.event}</span>
              <span>${l.timestamp.slice(11, 19)}</span>
            </div>
            <div style="color:#38bdf8; font-size:10px; margin: 2px 0;">cid: ${l.correlation_id}</div>
            <div style="color:var(--text-main); word-break:break-all;">${JSON.stringify(l.payload)}</div>
          </div>
        `
        )
        .join("");
    });
  }

  function exportCsv(kind) {
    const rows = kind === "obstacles" ? state.obstacles : state.scienceTargets;
    if (!rows || rows.length === 0) return;
    const headers = Object.keys(rows[0]);
    const csvLines = [
      headers.join(","),
      ...rows.map((r) =>
        headers.map((h) => `"${String(r[h] ?? "").replace(/"/g, '""')}"`).join(",")
      ),
    ];
    const blob = new Blob([csvLines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jezero_${kind}_updated.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  let toastTimeout = null;
  function showWazeToast(msg) {
    const toast = document.getElementById("waze-toast");
    document.getElementById("waze-toast-text").textContent = msg;
    toast.classList.add("show");
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove("show");
    }, 5200);
  }

  window.addEventListener("DOMContentLoaded", init);

  window.AtlasApp = {
    setOperationMode,
    setMapLayer,
    switchTab,
    addIntermediateStop,
    updateIntermediateStop,
    removeIntermediateStop,
    onWaypointsChanged,
    calculateAllRoutes,
    selectRoute,
    openCreateModal,
    closeRightPanel,
    selectModalCrit,
    submitNewObstacle,
    submitNewSciencePoint,
    deleteObstacle,
    deleteSciencePoint,
    setAsDestination,
    setCriticalityFilter,
    flyToAndInspect,
    flyToCoord,
    flyToBaseStation,
    saveCurrentRoute,
    loadSavedRoute,
    deleteSavedRoute,
    startTraverse,
    pauseTraverse,
    stopTraverse,
    changeTraverseSpeed,
    exportCsv,
    renderMapMarkers,
  };
})();
