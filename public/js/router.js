/**
 * Martian Atlas - Spatial Multi-Route Pathfinding Engine (A* on Martian Ellipsoid)
 * Computes optimal routes across Jezero Crater considering terrain elevation,
 * obstacle criticality (1-5 scale), obstacle radius, and scientific waypoints.
 */

(function () {
  const MARS_RADIUS_M = 3396190.0; // Equatorial radius of Mars in meters

  function toRad(deg) {
    return (deg * Math.PI) / 180.0;
  }

  /**
   * Computes surface distance in meters between two Mars lat/lon coordinates.
   */
  function marsDistanceMeters(lat1, lon1, lat2, lon2) {
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return MARS_RADIUS_M * c;
  }

  /**
   * Estimates terrain elevation (MOLA datum in meters) at any (lat, lon) in Jezero Crater
   * using Inverse Distance Weighting (IDW) over known NASA waypoints + science targets.
   */
  function estimateElevation(lat, lon, referencePoints) {
    if (!referencePoints || referencePoints.length === 0) {
      return -2555.0;
    }
    let num = 0;
    let den = 0;
    for (let i = 0; i < referencePoints.length; i += 3) {
      const p = referencePoints[i];
      const d = marsDistanceMeters(lat, lon, p.lat, p.lon);
      if (d < 5.0) return p.elevation_m;
      const w = 1.0 / Math.pow(d, 2);
      num += w * p.elevation_m;
      den += w;
    }
    return den > 0 ? Math.round((num / den) * 10) / 10 : -2555.0;
  }

  /**
   * Runs A* pathfinding on an adaptive grid between point A and point B.
   * mode: "SAFE" | "FAST" | "SCIENCE"
   */
  function findLegPath(startPt, endPt, obstacles, scienceTargets, refPoints, mode) {
    const directDist = marsDistanceMeters(startPt.lat, startPt.lon, endPt.lat, endPt.lon);
    if (directDist < 15) {
      return {
        coords: [
          [startPt.lat, startPt.lon],
          [endPt.lat, endPt.lon],
        ],
        avoidedCount: 0,
        nearHazards: [],
      };
    }

    // Bounding box with padding for detours around large craters/dunes (like Seitah or Belva)
    const padLat = Math.max(0.014, Math.abs(endPt.lat - startPt.lat) * 0.45);
    const padLon = Math.max(0.016, Math.abs(endPt.lon - startPt.lon) * 0.45);

    const minLat = Math.min(startPt.lat, endPt.lat) - padLat;
    const maxLat = Math.max(startPt.lat, endPt.lat) + padLat;
    const minLon = Math.min(startPt.lon, endPt.lon) - padLon;
    const maxLon = Math.max(startPt.lon, endPt.lon) + padLon;

    const GRID_N = 46;
    const dLat = (maxLat - minLat) / GRID_N;
    const dLon = (maxLon - minLon) / GRID_N;

    function toGrid(lat, lon) {
      const r = Math.max(0, Math.min(GRID_N, Math.round((lat - minLat) / dLat)));
      const c = Math.max(0, Math.min(GRID_N, Math.round((lon - minLon) / dLon)));
      return { r, c };
    }

    function toLatLon(r, c) {
      return {
        lat: minLat + r * dLat,
        lon: minLon + c * dLon,
      };
    }

    const startNode = toGrid(startPt.lat, startPt.lon);
    const goalNode = toGrid(endPt.lat, endPt.lon);

    // Pre-filter relevant obstacles within bounding box
    const activeObstacles = obstacles.filter(
      (o) =>
        o.lat >= minLat - 0.01 &&
        o.lat <= maxLat + 0.01 &&
        o.lon >= minLon - 0.01 &&
        o.lon <= maxLon + 0.01
    );

    const avoidedSet = new Set();
    const nearHazardsMap = new Map();

    function getCellRiskCost(lat, lon) {
      let penalty = 0;

      for (let i = 0; i < activeObstacles.length; i++) {
        const obs = activeObstacles[i];
        const dist = marsDistanceMeters(lat, lon, obs.lat, obs.lon);
        const radius = Number(obs.radius_meters) || 25.0;
        const crit = Number(obs.criticality_level) || 3;
        const impassable = obs.passable_by_rover === false || crit >= 5;

        // Buffer zone around obstacle
        const safetyMargin = mode === "SAFE" ? radius * 1.45 + 45 : mode === "SCIENCE" ? radius * 1.25 + 25 : radius * 1.05 + 10;

        if (dist <= radius) {
          avoidedSet.add(obs.obstacle_id);
          if (impassable || (mode === "SAFE" && crit >= 3) || (mode === "SCIENCE" && crit >= 4)) {
            penalty += 150000 * crit; // Effectively blocks entry into critical zone
          } else {
            penalty += 2500 * crit;
          }
        } else if (dist <= safetyMargin) {
          avoidedSet.add(obs.obstacle_id);
          const factor = 1.0 - (dist - radius) / Math.max(1, safetyMargin - radius);
          if (mode === "SAFE") {
            penalty += factor * factor * 4500 * crit;
          } else if (mode === "SCIENCE") {
            penalty += factor * 2000 * crit;
          } else {
            // FAST mode cuts closer to moderate obstacles
            if (crit >= 5) penalty += factor * 2200 * crit;
            else penalty += factor * 280 * crit;
          }
        }
      }

      // In SCIENCE mode, slightly reward proximity to scientific targets
      if (mode === "SCIENCE" && scienceTargets && scienceTargets.length > 0) {
        for (let j = 0; j < scienceTargets.length; j++) {
          const sci = scienceTargets[j];
          const dSci = marsDistanceMeters(lat, lon, sci.lat, sci.lon);
          if (dSci < 650) {
            penalty -= (650 - dSci) * 0.42;
          }
        }
      }

      return penalty;
    }

    const key = (r, c) => `${r},${c}`;
    const openSet = new Map();
    const gScore = new Map();
    const cameFrom = new Map();
    const closedSet = new Set();

    const startKey = key(startNode.r, startNode.c);
    gScore.set(startKey, 0);
    openSet.set(startKey, {
      r: startNode.r,
      c: startNode.c,
      f: marsDistanceMeters(startPt.lat, startPt.lon, endPt.lat, endPt.lon),
    });

    // 8-directional movement
    const dirs = [
      [-1, 0],
      [1, 0],
      [0, -1],
      [0, 1],
      [-1, -1],
      [-1, 1],
      [1, -1],
      [1, 1],
    ];

    let iterations = 0;
    const MAX_ITER = 4500;

    while (openSet.size > 0 && iterations < MAX_ITER) {
      iterations++;
      // Find lowest f in openSet
      let currentKey = null;
      let currentNode = null;
      for (const [k, v] of openSet.entries()) {
        if (!currentNode || v.f < currentNode.f) {
          currentNode = v;
          currentKey = k;
        }
      }

      if (currentNode.r === goalNode.r && currentNode.c === goalNode.c) {
        break;
      }

      openSet.delete(currentKey);
      closedSet.add(currentKey);

      const currPos = toLatLon(currentNode.r, currentNode.c);

      for (let d = 0; d < dirs.length; d++) {
        const nr = currentNode.r + dirs[d][0];
        const nc = currentNode.c + dirs[d][1];
        if (nr < 0 || nr > GRID_N || nc < 0 || nc > GRID_N) continue;

        const nKey = key(nr, nc);
        if (closedSet.has(nKey)) continue;

        const nextPos = toLatLon(nr, nc);
        const stepDist = marsDistanceMeters(currPos.lat, currPos.lon, nextPos.lat, nextPos.lon);
        const riskPenalty = getCellRiskCost(nextPos.lat, nextPos.lon);
        const tentativeG = (gScore.get(currentKey) || 0) + stepDist + Math.max(0, riskPenalty);

        if (!gScore.has(nKey) || tentativeG < gScore.get(nKey)) {
          cameFrom.set(nKey, currentKey);
          gScore.set(nKey, tentativeG);
          const h = marsDistanceMeters(nextPos.lat, nextPos.lon, endPt.lat, endPt.lon);
          openSet.set(nKey, { r: nr, c: nc, f: tentativeG + h * (mode === "FAST" ? 1.25 : 1.0) });
        }
      }
    }

    // Reconstruct path
    const rawCoords = [[endPt.lat, endPt.lon]];
    let currK = key(goalNode.r, goalNode.c);
    if (!cameFrom.has(currK)) {
      // Fallback interpolation if goal wasn't reached
      rawCoords.unshift([startPt.lat, startPt.lon]);
    } else {
      while (cameFrom.has(currK)) {
        const [rStr, cStr] = currK.split(",");
        const pt = toLatLon(Number(rStr), Number(cStr));
        rawCoords.unshift([pt.lat, pt.lon]);
        currK = cameFrom.get(currK);
      }
      rawCoords[0] = [startPt.lat, startPt.lon];
      rawCoords[rawCoords.length - 1] = [endPt.lat, endPt.lon];
    }

    // Smooth path (moving average pass while respecting critical obstacles)
    const smoothed = smoothCoordinates(rawCoords, activeObstacles);

    // Count hazards near the final route
    for (let i = 0; i < smoothed.length; i++) {
      const [plat, plon] = smoothed[i];
      for (let j = 0; j < activeObstacles.length; j++) {
        const obs = activeObstacles[j];
        const d = marsDistanceMeters(plat, plon, obs.lat, obs.lon);
        if (d <= (Number(obs.radius_meters) || 25) + 60) {
          nearHazardsMap.set(obs.obstacle_id, obs);
        }
      }
    }

    return {
      coords: smoothed,
      avoidedCount: avoidedSet.size,
      nearHazards: Array.from(nearHazardsMap.values()),
    };
  }

  function smoothCoordinates(coords, obstacles) {
    if (coords.length <= 3) return coords;
    const out = [coords[0]];
    for (let i = 1; i < coords.length - 1; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const next = coords[i + 1];
      const candLat = prev[0] * 0.25 + curr[0] * 0.5 + next[0] * 0.25;
      const candLon = prev[1] * 0.25 + curr[1] * 0.5 + next[1] * 0.25;

      // Ensure smoothed point doesn't enter an impassable obstacle
      let safe = true;
      for (let j = 0; j < obstacles.length; j++) {
        const o = obstacles[j];
        if ((Number(o.criticality_level) || 3) >= 4) {
          const d = marsDistanceMeters(candLat, candLon, o.lat, o.lon);
          if (d < (Number(o.radius_meters) || 25) * 1.05) {
            safe = false;
            break;
          }
        }
      }
      out.push(safe ? [candLat, candLon] : curr);
    }
    out.push(coords[coords.length - 1]);
    return out;
  }

  /**
   * Computes all 3 route alternatives across multiple waypoints [Origin, ...Stops, Destination].
   */
  function computeMultiRoutes(waypointList, obstacles, scienceTargets, refPoints) {
    if (!waypointList || waypointList.length < 2) return [];

    const profiles = [
      {
        id: "route_safe",
        mode: "SAFE",
        name: "Rota Mais Segura (Recomendada)",
        badge: "RECOMENDADA",
        color: "#10b981", // Emerald
        speedMps: 1.15, // Astronaut EVA safe walk / pressurised rover speed m/s
        description: "Desvia com folga de todos os obstáculos críticos (níveis 3 a 5), dunas e escarpas íngremes.",
      },
      {
        id: "route_science",
        mode: "SCIENCE",
        name: "Corredor Científico Exploratório",
        badge: "ALTO VALOR CIENTÍFICO",
        color: "#38bdf8", // Cyan
        speedMps: 1.0,
        description: "Otimiza o trajeto passando próximo a afloramentos e pontos de interesse científico mantendo segurança.",
      },
      {
        id: "route_fast",
        mode: "FAST",
        name: "Rota Direta / Mais Curta",
        badge: "MAIOR ATENÇÃO",
        color: "#f59e0b", // Amber
        speedMps: 1.25,
        description: "Menor distância física; desvia apenas de bloqueios nível 5, tangenciando terrenos irregulares.",
      },
    ];

    const directTotalMeters = waypointList.reduce((acc, pt, i) => {
      if (i === 0) return 0;
      return acc + marsDistanceMeters(waypointList[i - 1].lat, waypointList[i - 1].lon, pt.lat, pt.lon);
    }, 0);

    return profiles.map((prof) => {
      let fullCoords = [];
      let totalAvoided = 0;
      const nearHazardsAll = new Map();

      for (let i = 0; i < waypointList.length - 1; i++) {
        const leg = findLegPath(
          waypointList[i],
          waypointList[i + 1],
          obstacles,
          scienceTargets,
          refPoints,
          prof.mode
        );
        if (i > 0 && leg.coords.length > 0) {
          fullCoords.push(...leg.coords.slice(1));
        } else {
          fullCoords.push(...leg.coords);
        }
        totalAvoided += leg.avoidedCount;
        leg.nearHazards.forEach((h) => nearHazardsAll.set(h.obstacle_id, h));
      }

      // Compute total path distance and elevation profile
      let totalDistM = 0;
      let maxSlopeDeg = 2.5;
      const elevationProfile = [];

      for (let i = 0; i < fullCoords.length; i++) {
        const [lat, lon] = fullCoords[i];
        const elev = estimateElevation(lat, lon, refPoints);
        if (i > 0) {
          const segM = marsDistanceMeters(fullCoords[i - 1][0], fullCoords[i - 1][1], lat, lon);
          totalDistM += segM;
          const dElev = Math.abs(elev - elevationProfile[i - 1].elevation_m);
          if (segM > 2) {
            const slope = (Math.atan(dElev / segM) * 180) / Math.PI;
            if (slope > maxSlopeDeg && slope < 35) maxSlopeDeg = slope;
          }
        }
        elevationProfile.push({
          distance_m: Math.round(totalDistM),
          lat,
          lon,
          elevation_m: elev,
        });
      }

      const detourMeters = Math.max(0, Math.round(totalDistM - directTotalMeters));
      const durationSec = Math.round(totalDistM / prof.speedMps);
      const durationMin = Math.max(1, Math.round(durationSec / 60));

      const riskLabel =
        prof.mode === "SAFE"
          ? "Baixo (Nível 1/5)"
          : prof.mode === "SCIENCE"
          ? "Baixo-Moderado (Nível 2/5)"
          : "Moderado-Alto (Nível 3/5)";

      return {
        ...prof,
        coords: fullCoords,
        totalDistanceMeters: Math.round(totalDistM),
        detourMeters,
        durationSeconds: durationSec,
        durationMinutes: durationMin,
        maxSlopeDeg: Math.round(maxSlopeDeg * 10) / 10,
        avoidedObstaclesCount: Math.max(totalAvoided, nearHazardsAll.size),
        riskLabel,
        elevationProfile,
      };
    });
  }

  /**
   * Checks if a newly added obstacle intersects or threatens a route's coordinates.
   */
  function doesObstacleImpactRoute(routeCoords, obstacle) {
    if (!routeCoords || routeCoords.length === 0) return false;
    const threshold = (Number(obstacle.radius_meters) || 35) + 45;
    for (let i = 0; i < routeCoords.length; i++) {
      const [lat, lon] = routeCoords[i];
      const dist = marsDistanceMeters(lat, lon, obstacle.lat, obstacle.lon);
      if (dist <= threshold) {
        return true;
      }
    }
    return false;
  }

  window.AtlasRouter = {
    marsDistanceMeters,
    estimateElevation,
    computeMultiRoutes,
    doesObstacleImpactRoute,
  };
})();
