window.MARS_ATLAS_DATA = {
    "base_station":  {
                         "base_id":  "BASE_ARES_ALPHA",
                         "name":  "Estacao Base Ares Alpha (Habitat Principal)",
                         "category":  "Habitat \u0026 Command Base",
                         "lat":  18.4447,
                         "lon":  77.4508,
                         "elevation_m":  -2570,
                         "description":  "Base central dos exploradores na Cratera Jezero (Octavia E. Butler Sector). Ponto de partida padrao para expedicoes."
                     },
    "science_targets":  [
                            {
                                "target_id":  "SCI_001",
                                "name":  "Octavia E. Butler Landing Site",
                                "category":  "Marco Historico / Pouso",
                                "lat":  18.4447,
                                "lon":  77.4508,
                                "elevation_m":  -2570,
                                "scientific_interest_score":  0.85,
                                "priority_level":  4,
                                "description":  "Ponto de pouso original da missao Mars 2020 no assoalho vulcanico/sedimentar de Jezero."
                            },
                            {
                                "target_id":  "SCI_002",
                                "name":  "Citadelle (Afloramento Rochette)",
                                "category":  "Geologia Ignea / Amostras",
                                "lat":  18.4275,
                                "lon":  77.427,
                                "elevation_m":  -2560,
                                "scientific_interest_score":  0.92,
                                "priority_level":  5,
                                "description":  "Crista rochosa ao sul de Seitah onde foram coletadas as amostras \u0027Montdenier\u0027 e \u0027Montagnac\u0027."
                            },
                            {
                                "target_id":  "SCI_003",
                                "name":  "Three Forks Sample Depot",
                                "category":  "Deposito Estrategico de Amostras",
                                "lat":  18.4456,
                                "lon":  77.4252,
                                "elevation_m":  -2564,
                                "scientific_interest_score":  0.9,
                                "priority_level":  4,
                                "description":  "Planicie segura na base do delta contendo 10 tubos de titanio da campanha Mars Sample Return."
                            },
                            {
                                "target_id":  "SCI_004",
                                "name":  "Hawksbill Gap \u0026 Wildcat Ridge",
                                "category":  "Astrobiologia / Antigo Lago",
                                "lat":  18.4505,
                                "lon":  77.4095,
                                "elevation_m":  -2538,
                                "scientific_interest_score":  0.99,
                                "priority_level":  5,
                                "description":  "Rocha sedimentar fina (mudstone) rica em moleculas organicas e sulfatos depositados no antigo lago."
                            },
                            {
                                "target_id":  "SCI_005",
                                "name":  "Pinestand \u0026 Echo Creek (Topo do Delta)",
                                "category":  "Estratigrafia Fluvial",
                                "lat":  18.459,
                                "lon":  77.3965,
                                "elevation_m":  -2518,
                                "scientific_interest_score":  0.95,
                                "priority_level":  4,
                                "description":  "Camadas inclinadas de alta energia fluvial adjacentes a Cratera Belva."
                            },
                            {
                                "target_id":  "SCI_006",
                                "name":  "Bright Angel (Canal Neretva Vallis)",
                                "category":  "Bioassinatura Potencial (Cheyava Falls)",
                                "lat":  18.485,
                                "lon":  77.345,
                                "elevation_m":  -2465,
                                "scientific_interest_score":  1,
                                "priority_level":  5,
                                "description":  "Canal de entrada do rio marciano onde foi descoberta a rocha \u0027Cheyava Falls\u0027 com manchas tipo leopardo."
                            },
                            {
                                "target_id":  "SCI_007",
                                "name":  "Gnarled (Unidade de Carbonatos Marginais)",
                                "category":  "Mineralogia / Carbonatos",
                                "lat":  18.4685,
                                "lon":  77.376,
                                "elevation_m":  -2492,
                                "scientific_interest_score":  0.94,
                                "priority_level":  4,
                                "description":  "Antiga linha de praia do lago de Jezero rica em minerais carbonaticos preservadores de microfosseis."
                            }
                        ],
    "obstacles":  [
                      {
                          "obstacle_id":  "COMP_CRATER_BELVA",
                          "name":  "Cratera Belva",
                          "source_dataset":  "USGS_HiRISE_Jezero_Crater_Catalog",
                          "lat":  18.4613,
                          "lon":  77.3892,
                          "elevation_m":  -2515,
                          "obstacle_type":  "crater",
                          "radius_meters":  450,
                          "slope_deg":  24.5,
                          "severity_score":  0.95,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Cratera de impacto de ~900m de diametro no topo do delta de Jezero; bordas ingremes intransponiveis."
                      },
                      {
                          "obstacle_id":  "COMP_CRATER_SANTA_CRUZ",
                          "name":  "Cratera Santa Cruz",
                          "source_dataset":  "USGS_HiRISE_Jezero_Crater_Catalog",
                          "lat":  18.431,
                          "lon":  77.4485,
                          "elevation_m":  -2565,
                          "obstacle_type":  "crater",
                          "radius_meters":  180,
                          "slope_deg":  21,
                          "severity_score":  0.9,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Cratera e colina ingreme a sudoeste do ponto de pouso Octavia E. Butler."
                      },
                      {
                          "obstacle_id":  "COMP_SAND_SEITAH_NORTH",
                          "name":  "Dunas de Seitah (Setor Norte)",
                          "source_dataset":  "AI4Mars_HiRISE_Terrain_Hazards",
                          "lat":  18.442,
                          "lon":  77.438,
                          "elevation_m":  -2575,
                          "obstacle_type":  "sand_trap",
                          "radius_meters":  320,
                          "slope_deg":  14,
                          "severity_score":  0.88,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Regiao Seitah (\u0027entre a areia\u0027): campo denso de dunas eolicas com alto risco de atolamento."
                      },
                      {
                          "obstacle_id":  "COMP_SAND_SEITAH_SOUTH",
                          "name":  "Dunas de Seitah (Setor Sul)",
                          "source_dataset":  "AI4Mars_HiRISE_Terrain_Hazards",
                          "lat":  18.4265,
                          "lon":  77.4345,
                          "elevation_m":  -2580,
                          "obstacle_type":  "sand_trap",
                          "radius_meters":  280,
                          "slope_deg":  12.5,
                          "severity_score":  0.85,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Extensao sul do campo de dunas Seitah que exige desvio completo."
                      },
                      {
                          "obstacle_id":  "COMP_SCARP_DELTA_FRONT",
                          "name":  "Escarpa Frontal do Delta (Cape Nukshak)",
                          "source_dataset":  "USGS_HiRISE_Jezero_Crater_Catalog",
                          "lat":  18.4485,
                          "lon":  77.419,
                          "elevation_m":  -2540,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  150,
                          "slope_deg":  28,
                          "severity_score":  0.96,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Escarpa frontal do delta com penhascos de ate 40 metros de altura e inclinacao \u003e25 graus."
                      },
                      {
                          "obstacle_id":  "COMP_SCARP_KODIAK",
                          "name":  "Meseta Kodiak Butte",
                          "source_dataset":  "USGS_HiRISE_Jezero_Crater_Catalog",
                          "lat":  18.4298,
                          "lon":  77.4175,
                          "elevation_m":  -2555,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  140,
                          "slope_deg":  32,
                          "severity_score":  0.98,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Meseta isolada remanescente do antigo delta com paredes quase verticais."
                      },
                      {
                          "obstacle_id":  "COMP_BOULDER_THREE_FORKS_EAST",
                          "name":  "Campo de Matacoes Three Forks",
                          "source_dataset":  "AI4Mars_HiRISE_Terrain_Hazards",
                          "lat":  18.4472,
                          "lon":  77.4288,
                          "elevation_m":  -2562,
                          "obstacle_type":  "boulder_field",
                          "radius_meters":  85,
                          "slope_deg":  9.5,
                          "severity_score":  0.72,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Campo de alta densidade de blocos rochosos (\u003e0.5m) na base do delta; exige velocidade reduzida."
                      },
                      {
                          "obstacle_id":  "COMP_CRATER_LAHONTAN",
                          "name":  "Cratera Lahontan",
                          "source_dataset":  "USGS_HiRISE_Jezero_Crater_Catalog",
                          "lat":  18.4395,
                          "lon":  77.456,
                          "elevation_m":  -2572,
                          "obstacle_type":  "crater",
                          "radius_meters":  95,
                          "slope_deg":  19,
                          "severity_score":  0.82,
                          "criticality_level":  4,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Cratera de impacto proxima ao local de pouso com bordas rochosas e interior arenoso."
                      },
                      {
                          "obstacle_id":  "COMP_BOULDER_MARGIN_UNIT",
                          "name":  "Zona Rochosa da Unidade Marginal",
                          "source_dataset":  "AI4Mars_HiRISE_Terrain_Hazards",
                          "lat":  18.472,
                          "lon":  77.365,
                          "elevation_m":  -2480,
                          "obstacle_type":  "boulder_field",
                          "radius_meters":  110,
                          "slope_deg":  13.5,
                          "severity_score":  0.76,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Zona densa de matacoes e rochas fraturadas na unidade marginal da Cratera Jezero."
                      },
                      {
                          "obstacle_id":  "DYNAMIC_WAZE_ROCK_001",
                          "name":  "Deslizamento de Rochas Recente (Alerta Waze)",
                          "source_dataset":  "User_Dynamic_Hazard_Report",
                          "lat":  18.4525,
                          "lon":  77.4055,
                          "elevation_m":  -2535,
                          "obstacle_type":  "boulder_field",
                          "radius_meters":  40,
                          "slope_deg":  14,
                          "severity_score":  0.89,
                          "criticality_level":  4,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  true,
                          "description":  "Obstaculo dinamico recem-detectado na subida do delta para calculo de desvio."
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL168_52",
                          "name":  "Sol 168 Inclinacao (8.41 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427253,
                          "lon":  77.451607,
                          "elevation_m":  -2582.79,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.41,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.41 graus (Sol 168)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL170_54",
                          "name":  "Sol 170 Inclinacao (8.13 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.42844,
                          "lon":  77.449202,
                          "elevation_m":  -2585.78,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.13,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.13 graus (Sol 170)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL171_55",
                          "name":  "Sol 171 Inclinacao (8.33 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429548,
                          "lon":  77.447677,
                          "elevation_m":  -2583.67,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.33,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.33 graus (Sol 171)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL173_56",
                          "name":  "Sol 173 Inclinacao (10.17 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429612,
                          "lon":  77.447046,
                          "elevation_m":  -2581.39,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.17,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.17 graus (Sol 173)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL175_57",
                          "name":  "Sol 175 Inclinacao (19.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429662,
                          "lon":  77.446793,
                          "elevation_m":  -2579.6,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  19.83,
                          "severity_score":  0.79,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 19.83 graus detectada pela telemetria da NASA (Sol 175)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL177_58",
                          "name":  "Sol 177 Inclinacao (8.55 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.430514,
                          "lon":  77.445455,
                          "elevation_m":  -2579.37,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.55,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.55 graus (Sol 177)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL238_69",
                          "name":  "Sol 238 Inclinacao (12.31 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.433866,
                          "lon":  77.44296,
                          "elevation_m":  -2568.98,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.31,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.31 graus (Sol 238)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL286_77",
                          "name":  "Sol 286 Inclinacao (8.78 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.432661,
                          "lon":  77.441373,
                          "elevation_m":  -2574.44,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.78,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.78 graus (Sol 286)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL328_78",
                          "name":  "Sol 328 Inclinacao (13.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.432602,
                          "lon":  77.441411,
                          "elevation_m":  -2574.3,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.63,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.63 graus (Sol 328)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL341_86",
                          "name":  "Sol 341 Inclinacao (11.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.42977,
                          "lon":  77.446748,
                          "elevation_m":  -2580.7,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.23,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.23 graus (Sol 341)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL342_87",
                          "name":  "Sol 342 Inclinacao (12.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429678,
                          "lon":  77.446953,
                          "elevation_m":  -2581.13,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.83,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.83 graus (Sol 342)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL343_88",
                          "name":  "Sol 343 Inclinacao (9.4 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429517,
                          "lon":  77.447102,
                          "elevation_m":  -2580.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.4,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.4 graus (Sol 343)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL343_89",
                          "name":  "Sol 343 Inclinacao (9.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429456,
                          "lon":  77.44704,
                          "elevation_m":  -2579.96,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.83,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.83 graus (Sol 343)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL441_160",
                          "name":  "Sol 441 Inclinacao (12.09 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457638,
                          "lon":  77.408907,
                          "elevation_m":  -2536.41,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.09,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.09 graus (Sol 441)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL441_161",
                          "name":  "Sol 441 Inclinacao (12.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457643,
                          "lon":  77.408814,
                          "elevation_m":  -2536,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.57,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.57 graus (Sol 441)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL441_162",
                          "name":  "Sol 441 Inclinacao (13.59 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457665,
                          "lon":  77.408664,
                          "elevation_m":  -2535.61,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.59,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.59 graus (Sol 441)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL441_163",
                          "name":  "Sol 441 Inclinacao (11.88 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457661,
                          "lon":  77.40858,
                          "elevation_m":  -2535.63,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.88,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.88 graus (Sol 441)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL443_164",
                          "name":  "Sol 443 Inclinacao (11.47 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457589,
                          "lon":  77.408101,
                          "elevation_m":  -2536.15,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.47,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.47 graus (Sol 443)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL443_165",
                          "name":  "Sol 443 Inclinacao (11.9 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457527,
                          "lon":  77.40747,
                          "elevation_m":  -2536,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.9,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.9 graus (Sol 443)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL448_166",
                          "name":  "Sol 448 Inclinacao (11.19 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457619,
                          "lon":  77.407141,
                          "elevation_m":  -2534.59,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.19,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.19 graus (Sol 448)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL448_167",
                          "name":  "Sol 448 Inclinacao (12.31 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457445,
                          "lon":  77.406338,
                          "elevation_m":  -2535.58,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.31,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.31 graus (Sol 448)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL449_168",
                          "name":  "Sol 449 Inclinacao (10.9 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.45751,
                          "lon":  77.406301,
                          "elevation_m":  -2534.78,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.9,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.9 graus (Sol 449)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL455_169",
                          "name":  "Sol 455 Inclinacao (13.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.45789,
                          "lon":  77.406277,
                          "elevation_m":  -2530.03,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.89,
                          "severity_score":  0.56,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.89 graus (Sol 455)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL456_170",
                          "name":  "Sol 456 Inclinacao (17.96 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457957,
                          "lon":  77.406503,
                          "elevation_m":  -2528.7,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.96,
                          "severity_score":  0.72,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.96 graus detectada pela telemetria da NASA (Sol 456)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL456_171",
                          "name":  "Sol 456 Inclinacao (15.95 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458017,
                          "lon":  77.406498,
                          "elevation_m":  -2527.39,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.95,
                          "severity_score":  0.64,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.95 graus detectada pela telemetria da NASA (Sol 456)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL460_172",
                          "name":  "Sol 460 Inclinacao (10.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458096,
                          "lon":  77.406443,
                          "elevation_m":  -2526.65,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.23,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.23 graus (Sol 460)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL461_175",
                          "name":  "Sol 461 Inclinacao (9.25 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458692,
                          "lon":  77.406145,
                          "elevation_m":  -2523.3,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.25,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.25 graus (Sol 461)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL464_176",
                          "name":  "Sol 464 Inclinacao (9.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458719,
                          "lon":  77.405974,
                          "elevation_m":  -2522.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.36,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.36 graus (Sol 464)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL464_177",
                          "name":  "Sol 464 Inclinacao (12.32 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458794,
                          "lon":  77.406013,
                          "elevation_m":  -2522.08,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.32,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.32 graus (Sol 464)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL474_178",
                          "name":  "Sol 474 Inclinacao (16.02 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458856,
                          "lon":  77.4061,
                          "elevation_m":  -2521.59,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.02,
                          "severity_score":  0.64,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.02 graus detectada pela telemetria da NASA (Sol 474)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL477_179",
                          "name":  "Sol 477 Inclinacao (13.95 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458895,
                          "lon":  77.406168,
                          "elevation_m":  -2520.85,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.95,
                          "severity_score":  0.56,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.95 graus (Sol 477)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL501_180",
                          "name":  "Sol 501 Inclinacao (8.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458727,
                          "lon":  77.40603,
                          "elevation_m":  -2522.76,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.84,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.84 graus (Sol 501)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL501_181",
                          "name":  "Sol 501 Inclinacao (9.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458695,
                          "lon":  77.405952,
                          "elevation_m":  -2522.83,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.44,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.44 graus (Sol 501)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL502_182",
                          "name":  "Sol 502 Inclinacao (14.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458647,
                          "lon":  77.405925,
                          "elevation_m":  -2523.17,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.36,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.36 graus (Sol 502)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL536_184",
                          "name":  "Sol 536 Inclinacao (8.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458216,
                          "lon":  77.408576,
                          "elevation_m":  -2526.47,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.46,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.46 graus (Sol 536)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL537_185",
                          "name":  "Sol 537 Inclinacao (8.52 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.45821,
                          "lon":  77.408849,
                          "elevation_m":  -2526.74,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.52,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.52 graus (Sol 537)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL538_186",
                          "name":  "Sol 538 Inclinacao (15.91 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457958,
                          "lon":  77.408677,
                          "elevation_m":  -2531.44,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.91,
                          "severity_score":  0.64,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.91 graus detectada pela telemetria da NASA (Sol 538)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL548_192",
                          "name":  "Sol 548 Inclinacao (12.16 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.450091,
                          "lon":  77.404773,
                          "elevation_m":  -2540.1,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.16,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.16 graus (Sol 548)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL551_193",
                          "name":  "Sol 551 Inclinacao (10.41 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.450091,
                          "lon":  77.404765,
                          "elevation_m":  -2540,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.41,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.41 graus (Sol 551)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL555_195",
                          "name":  "Sol 555 Inclinacao (8.06 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.450324,
                          "lon":  77.4018,
                          "elevation_m":  -2527.36,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.06,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.06 graus (Sol 555)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL629_208",
                          "name":  "Sol 629 Inclinacao (12.76 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.451625,
                          "lon":  77.401437,
                          "elevation_m":  -2523.83,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.76,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.76 graus (Sol 629)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL632_209",
                          "name":  "Sol 632 Inclinacao (13.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.451619,
                          "lon":  77.401437,
                          "elevation_m":  -2523.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.14,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.14 graus (Sol 632)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL645_215",
                          "name":  "Sol 645 Inclinacao (8.19 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.450176,
                          "lon":  77.402935,
                          "elevation_m":  -2532.09,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.19,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.19 graus (Sol 645)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL698_247",
                          "name":  "Sol 698 Inclinacao (12.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457887,
                          "lon":  77.40863,
                          "elevation_m":  -2532.34,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.84,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.84 graus (Sol 698)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL698_248",
                          "name":  "Sol 698 Inclinacao (17.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457964,
                          "lon":  77.408643,
                          "elevation_m":  -2531.42,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.36,
                          "severity_score":  0.69,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.36 graus detectada pela telemetria da NASA (Sol 698)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL700_249",
                          "name":  "Sol 700 Inclinacao (20.33 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458109,
                          "lon":  77.408763,
                          "elevation_m":  -2528.16,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.33,
                          "severity_score":  0.81,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.33 graus detectada pela telemetria da NASA (Sol 700)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL702_250",
                          "name":  "Sol 702 Inclinacao (10.52 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458214,
                          "lon":  77.408696,
                          "elevation_m":  -2526.58,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.52,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.52 graus (Sol 702)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL706_251",
                          "name":  "Sol 706 Inclinacao (10.73 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458219,
                          "lon":  77.408694,
                          "elevation_m":  -2526.41,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.73,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.73 graus (Sol 706)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL707_252",
                          "name":  "Sol 707 Inclinacao (8.2 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458622,
                          "lon":  77.408544,
                          "elevation_m":  -2522.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.2,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.2 graus (Sol 707)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL707_253",
                          "name":  "Sol 707 Inclinacao (8.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458642,
                          "lon":  77.408457,
                          "elevation_m":  -2522.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.93,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.93 graus (Sol 707)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL708_254",
                          "name":  "Sol 708 Inclinacao (9.51 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460075,
                          "lon":  77.405842,
                          "elevation_m":  -2509.57,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.51,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.51 graus (Sol 708)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL719_262",
                          "name":  "Sol 719 Inclinacao (8.12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.475636,
                          "lon":  77.390367,
                          "elevation_m":  -2462.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.12,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.12 graus (Sol 719)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL721_263",
                          "name":  "Sol 721 Inclinacao (9.49 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.474442,
                          "lon":  77.389816,
                          "elevation_m":  -2459.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.49,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.49 graus (Sol 721)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL726_264",
                          "name":  "Sol 726 Inclinacao (9.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.474442,
                          "lon":  77.389816,
                          "elevation_m":  -2459.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.57,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.57 graus (Sol 726)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL727_265",
                          "name":  "Sol 727 Inclinacao (9.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.474442,
                          "lon":  77.389816,
                          "elevation_m":  -2459.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.46,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.46 graus (Sol 727)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL755_274",
                          "name":  "Sol 755 Inclinacao (9.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471346,
                          "lon":  77.377372,
                          "elevation_m":  -2436.93,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.14,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.14 graus (Sol 755)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL763_277",
                          "name":  "Sol 763 Inclinacao (14.29 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.475497,
                          "lon":  77.373643,
                          "elevation_m":  -2422.17,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.29,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.29 graus (Sol 763)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL784_285",
                          "name":  "Sol 784 Inclinacao (8.65 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482797,
                          "lon":  77.368694,
                          "elevation_m":  -2422.62,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.65,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.65 graus (Sol 784)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL784_286",
                          "name":  "Sol 784 Inclinacao (11.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482727,
                          "lon":  77.368632,
                          "elevation_m":  -2421.57,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.14,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.14 graus (Sol 784)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL793_287",
                          "name":  "Sol 793 Inclinacao (13.61 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.48256,
                          "lon":  77.36868,
                          "elevation_m":  -2421.66,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.61,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.61 graus (Sol 793)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL795_288",
                          "name":  "Sol 795 Inclinacao (18.28 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482641,
                          "lon":  77.368645,
                          "elevation_m":  -2421.21,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.28,
                          "severity_score":  0.73,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.28 graus detectada pela telemetria da NASA (Sol 795)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL797_289",
                          "name":  "Sol 797 Inclinacao (15.09 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482666,
                          "lon":  77.368616,
                          "elevation_m":  -2421.07,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.09,
                          "severity_score":  0.6,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.09 graus detectada pela telemetria da NASA (Sol 797)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL816_290",
                          "name":  "Sol 816 Inclinacao (9.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.483052,
                          "lon":  77.368622,
                          "elevation_m":  -2422.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.36,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.36 graus (Sol 816)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL821_295",
                          "name":  "Sol 821 Inclinacao (9.53 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482988,
                          "lon":  77.368194,
                          "elevation_m":  -2420.79,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.53,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.53 graus (Sol 821)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL907_319",
                          "name":  "Sol 907 Inclinacao (8.08 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.482525,
                          "lon":  77.357647,
                          "elevation_m":  -2414.29,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.08,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.08 graus (Sol 907)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL994_342",
                          "name":  "Sol 994 Inclinacao (8.51 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.499663,
                          "lon":  77.351307,
                          "elevation_m":  -2419.2,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.51,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.51 graus (Sol 994)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL998_345",
                          "name":  "Sol 998 Inclinacao (10.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.498036,
                          "lon":  77.349066,
                          "elevation_m":  -2411.33,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.93,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.93 graus (Sol 998)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1000_347",
                          "name":  "Sol 1000 Inclinacao (8.34 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.495396,
                          "lon":  77.346647,
                          "elevation_m":  -2398.47,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.34,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.34 graus (Sol 1000)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1001_348",
                          "name":  "Sol 1001 Inclinacao (8.51 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49522,
                          "lon":  77.346371,
                          "elevation_m":  -2400.62,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.51,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.51 graus (Sol 1001)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1006_351",
                          "name":  "Sol 1006 Inclinacao (9.76 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.494854,
                          "lon":  77.344338,
                          "elevation_m":  -2408,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.76,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.76 graus (Sol 1006)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1018_353",
                          "name":  "Sol 1018 Inclinacao (8.06 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49271,
                          "lon":  77.339556,
                          "elevation_m":  -2407.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.06,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.06 graus (Sol 1018)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1042_357",
                          "name":  "Sol 1042 Inclinacao (9.12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.492921,
                          "lon":  77.336127,
                          "elevation_m":  -2402.31,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.12,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.12 graus (Sol 1042)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1059_368",
                          "name":  "Sol 1059 Inclinacao (12.29 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491512,
                          "lon":  77.326986,
                          "elevation_m":  -2380.33,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.29,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.29 graus (Sol 1059)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1068_371",
                          "name":  "Sol 1068 Inclinacao (8.52 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491821,
                          "lon":  77.327217,
                          "elevation_m":  -2382.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.52,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.52 graus (Sol 1068)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1084_372",
                          "name":  "Sol 1084 Inclinacao (9.22 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491833,
                          "lon":  77.327203,
                          "elevation_m":  -2383.03,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.22,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.22 graus (Sol 1084)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1092_373",
                          "name":  "Sol 1092 Inclinacao (9.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.4918,
                          "lon":  77.32718,
                          "elevation_m":  -2382.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.93,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.93 graus (Sol 1092)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1096_374",
                          "name":  "Sol 1096 Inclinacao (13.21 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.492122,
                          "lon":  77.326535,
                          "elevation_m":  -2381.97,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.21,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.21 graus (Sol 1096)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1100_375",
                          "name":  "Sol 1100 Inclinacao (8.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49198,
                          "lon":  77.326246,
                          "elevation_m":  -2379.52,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.89,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.89 graus (Sol 1100)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1103_378",
                          "name":  "Sol 1103 Inclinacao (8.06 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490865,
                          "lon":  77.324588,
                          "elevation_m":  -2372.85,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.06,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.06 graus (Sol 1103)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1106_379",
                          "name":  "Sol 1106 Inclinacao (10.55 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49087,
                          "lon":  77.324571,
                          "elevation_m":  -2372.67,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.55,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.55 graus (Sol 1106)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1116_386",
                          "name":  "Sol 1116 Inclinacao (12.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490493,
                          "lon":  77.321404,
                          "elevation_m":  -2366.89,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.93,
                          "severity_score":  0.52,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.93 graus (Sol 1116)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1117_387",
                          "name":  "Sol 1117 Inclinacao (8.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489529,
                          "lon":  77.321502,
                          "elevation_m":  -2362.47,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.23,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.23 graus (Sol 1117)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1124_392",
                          "name":  "Sol 1124 Inclinacao (10.87 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489514,
                          "lon":  77.320221,
                          "elevation_m":  -2356.1,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.87,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.87 graus (Sol 1124)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1129_393",
                          "name":  "Sol 1129 Inclinacao (12.07 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489512,
                          "lon":  77.320215,
                          "elevation_m":  -2356.1,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.07,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.07 graus (Sol 1129)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1131_394",
                          "name":  "Sol 1131 Inclinacao (8.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489386,
                          "lon":  77.320064,
                          "elevation_m":  -2354.68,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.84,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.84 graus (Sol 1131)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1137_400",
                          "name":  "Sol 1137 Inclinacao (8.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490002,
                          "lon":  77.318482,
                          "elevation_m":  -2354.19,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.83,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.83 graus (Sol 1137)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1138_401",
                          "name":  "Sol 1138 Inclinacao (8.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489919,
                          "lon":  77.318056,
                          "elevation_m":  -2352.59,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.93,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.93 graus (Sol 1138)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1138_402",
                          "name":  "Sol 1138 Inclinacao (12.31 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489899,
                          "lon":  77.318008,
                          "elevation_m":  -2352.06,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.31,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.31 graus (Sol 1138)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1142_405",
                          "name":  "Sol 1142 Inclinacao (15.75 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490003,
                          "lon":  77.316079,
                          "elevation_m":  -2352.57,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.75,
                          "severity_score":  0.63,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.75 graus detectada pela telemetria da NASA (Sol 1142)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1145_409",
                          "name":  "Sol 1145 Inclinacao (11.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490202,
                          "lon":  77.314438,
                          "elevation_m":  -2350.14,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.57,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.57 graus (Sol 1145)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1145_410",
                          "name":  "Sol 1145 Inclinacao (11.05 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490276,
                          "lon":  77.314316,
                          "elevation_m":  -2350.7,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.05,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.05 graus (Sol 1145)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1145_411",
                          "name":  "Sol 1145 Inclinacao (14.49 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490317,
                          "lon":  77.314235,
                          "elevation_m":  -2350.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.49,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.49 graus (Sol 1145)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1148_412",
                          "name":  "Sol 1148 Inclinacao (14.41 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49051,
                          "lon":  77.313742,
                          "elevation_m":  -2351.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.41,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.41 graus (Sol 1148)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1148_413",
                          "name":  "Sol 1148 Inclinacao (14.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490566,
                          "lon":  77.313672,
                          "elevation_m":  -2352.25,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.36,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.36 graus (Sol 1148)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1150_414",
                          "name":  "Sol 1150 Inclinacao (14.55 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490711,
                          "lon":  77.31359,
                          "elevation_m":  -2353.78,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.55,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.55 graus (Sol 1150)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1154_415",
                          "name":  "Sol 1154 Inclinacao (17.88 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490711,
                          "lon":  77.313597,
                          "elevation_m":  -2353.78,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.88,
                          "severity_score":  0.72,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.88 graus detectada pela telemetria da NASA (Sol 1154)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1156_416",
                          "name":  "Sol 1156 Inclinacao (15.7 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490801,
                          "lon":  77.313333,
                          "elevation_m":  -2353.77,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.7,
                          "severity_score":  0.63,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.7 graus detectada pela telemetria da NASA (Sol 1156)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1157_417",
                          "name":  "Sol 1157 Inclinacao (14.18 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490958,
                          "lon":  77.313158,
                          "elevation_m":  -2356.09,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.18,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.18 graus (Sol 1157)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1158_418",
                          "name":  "Sol 1158 Inclinacao (10.51 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491286,
                          "lon":  77.312809,
                          "elevation_m":  -2362.29,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.51,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.51 graus (Sol 1158)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1158_419",
                          "name":  "Sol 1158 Inclinacao (11.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491349,
                          "lon":  77.312746,
                          "elevation_m":  -2362.87,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.44,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.44 graus (Sol 1158)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1159_420",
                          "name":  "Sol 1159 Inclinacao (11.18 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491532,
                          "lon":  77.312643,
                          "elevation_m":  -2364.18,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.18,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.18 graus (Sol 1159)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1182_434",
                          "name":  "Sol 1182 Inclinacao (10.11 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497182,
                          "lon":  77.305358,
                          "elevation_m":  -2357.7,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.11,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.11 graus (Sol 1182)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1183_435",
                          "name":  "Sol 1183 Inclinacao (14.31 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497348,
                          "lon":  77.305322,
                          "elevation_m":  -2355.7,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.31,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.31 graus (Sol 1183)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1185_436",
                          "name":  "Sol 1185 Inclinacao (13.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497402,
                          "lon":  77.305203,
                          "elevation_m":  -2355.02,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.23,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.23 graus (Sol 1185)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1185_437",
                          "name":  "Sol 1185 Inclinacao (14.8 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.49747,
                          "lon":  77.305188,
                          "elevation_m":  -2354.31,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.8,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.8 graus (Sol 1185)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1189_438",
                          "name":  "Sol 1189 Inclinacao (10.43 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497394,
                          "lon":  77.305113,
                          "elevation_m":  -2355.1,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.43,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.43 graus (Sol 1189)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1189_439",
                          "name":  "Sol 1189 Inclinacao (12.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497449,
                          "lon":  77.305135,
                          "elevation_m":  -2354.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.23,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.23 graus (Sol 1189)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1195_440",
                          "name":  "Sol 1195 Inclinacao (12.41 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497443,
                          "lon":  77.305133,
                          "elevation_m":  -2354.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.41,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.41 graus (Sol 1195)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1204_441",
                          "name":  "Sol 1204 Inclinacao (12.33 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497598,
                          "lon":  77.305129,
                          "elevation_m":  -2352.18,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.33,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.33 graus (Sol 1204)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1206_442",
                          "name":  "Sol 1206 Inclinacao (10.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497527,
                          "lon":  77.305257,
                          "elevation_m":  -2353.29,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.89,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.89 graus (Sol 1206)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1206_443",
                          "name":  "Sol 1206 Inclinacao (10.27 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497545,
                          "lon":  77.305425,
                          "elevation_m":  -2352.93,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.27,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.27 graus (Sol 1206)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1210_444",
                          "name":  "Sol 1210 Inclinacao (8.35 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497514,
                          "lon":  77.305274,
                          "elevation_m":  -2353.65,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.35,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.35 graus (Sol 1210)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1210_445",
                          "name":  "Sol 1210 Inclinacao (17.01 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.497484,
                          "lon":  77.305191,
                          "elevation_m":  -2354.03,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.01,
                          "severity_score":  0.68,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.01 graus detectada pela telemetria da NASA (Sol 1210)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1230_452",
                          "name":  "Sol 1230 Inclinacao (8.7 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491903,
                          "lon":  77.30104,
                          "elevation_m":  -2347.36,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.7,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.7 graus (Sol 1230)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1245_455",
                          "name":  "Sol 1245 Inclinacao (10.92 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.491086,
                          "lon":  77.300675,
                          "elevation_m":  -2338.08,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.92,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.92 graus (Sol 1245)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1246_456",
                          "name":  "Sol 1246 Inclinacao (13.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.490338,
                          "lon":  77.29992,
                          "elevation_m":  -2324.67,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.83,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.83 graus (Sol 1246)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1247_457",
                          "name":  "Sol 1247 Inclinacao (16.6 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.489335,
                          "lon":  77.299193,
                          "elevation_m":  -2305.7,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.6,
                          "severity_score":  0.66,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.6 graus detectada pela telemetria da NASA (Sol 1247)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1250_458",
                          "name":  "Sol 1250 Inclinacao (15.87 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.488917,
                          "lon":  77.298874,
                          "elevation_m":  -2297.73,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.87,
                          "severity_score":  0.63,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.87 graus detectada pela telemetria da NASA (Sol 1250)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1251_459",
                          "name":  "Sol 1251 Inclinacao (17.22 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.488469,
                          "lon":  77.298597,
                          "elevation_m":  -2288.48,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.22,
                          "severity_score":  0.69,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.22 graus detectada pela telemetria da NASA (Sol 1251)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1252_460",
                          "name":  "Sol 1252 Inclinacao (17.76 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.487792,
                          "lon":  77.298379,
                          "elevation_m":  -2275.24,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.76,
                          "severity_score":  0.71,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.76 graus detectada pela telemetria da NASA (Sol 1252)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1253_461",
                          "name":  "Sol 1253 Inclinacao (16.64 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.48774,
                          "lon":  77.29837,
                          "elevation_m":  -2274.28,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.64,
                          "severity_score":  0.67,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.64 graus detectada pela telemetria da NASA (Sol 1253)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1254_462",
                          "name":  "Sol 1254 Inclinacao (17.86 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.487812,
                          "lon":  77.298497,
                          "elevation_m":  -2276.46,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.86,
                          "severity_score":  0.71,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.86 graus detectada pela telemetria da NASA (Sol 1254)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1254_463",
                          "name":  "Sol 1254 Inclinacao (18.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.48773,
                          "lon":  77.298521,
                          "elevation_m":  -2275.01,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.83,
                          "severity_score":  0.75,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.83 graus detectada pela telemetria da NASA (Sol 1254)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1264_464",
                          "name":  "Sol 1264 Inclinacao (17.69 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.487234,
                          "lon":  77.298264,
                          "elevation_m":  -2264.55,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.69,
                          "severity_score":  0.71,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.69 graus detectada pela telemetria da NASA (Sol 1264)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1265_465",
                          "name":  "Sol 1265 Inclinacao (13.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.486472,
                          "lon":  77.30001,
                          "elevation_m":  -2267.03,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.63,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.63 graus (Sol 1265)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1266_466",
                          "name":  "Sol 1266 Inclinacao (12.77 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.486245,
                          "lon":  77.300225,
                          "elevation_m":  -2265.25,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.77,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.77 graus (Sol 1266)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1266_467",
                          "name":  "Sol 1266 Inclinacao (10.42 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.484194,
                          "lon":  77.300604,
                          "elevation_m":  -2246.67,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.42,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.42 graus (Sol 1266)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1268_468",
                          "name":  "Sol 1268 Inclinacao (13.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.481457,
                          "lon":  77.300262,
                          "elevation_m":  -2220.27,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.14,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.14 graus (Sol 1268)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1270_469",
                          "name":  "Sol 1270 Inclinacao (13.24 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.479952,
                          "lon":  77.300379,
                          "elevation_m":  -2211.2,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.24,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.24 graus (Sol 1270)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1271_470",
                          "name":  "Sol 1271 Inclinacao (11.62 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.478598,
                          "lon":  77.30052,
                          "elevation_m":  -2204.58,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.62,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.62 graus (Sol 1271)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1274_471",
                          "name":  "Sol 1274 Inclinacao (15.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.476535,
                          "lon":  77.299194,
                          "elevation_m":  -2180.52,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.23,
                          "severity_score":  0.61,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.23 graus detectada pela telemetria da NASA (Sol 1274)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1278_472",
                          "name":  "Sol 1278 Inclinacao (10.78 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473983,
                          "lon":  77.299581,
                          "elevation_m":  -2171.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.78,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.78 graus (Sol 1278)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1279_473",
                          "name":  "Sol 1279 Inclinacao (10.78 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473983,
                          "lon":  77.299581,
                          "elevation_m":  -2171.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.78,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.78 graus (Sol 1279)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1280_474",
                          "name":  "Sol 1280 Inclinacao (14.67 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473615,
                          "lon":  77.299145,
                          "elevation_m":  -2163.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.67,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.67 graus (Sol 1280)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1280_475",
                          "name":  "Sol 1280 Inclinacao (16.25 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473547,
                          "lon":  77.299099,
                          "elevation_m":  -2162.8,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.25,
                          "severity_score":  0.65,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.25 graus detectada pela telemetria da NASA (Sol 1280)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1281_476",
                          "name":  "Sol 1281 Inclinacao (15.61 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473442,
                          "lon":  77.299099,
                          "elevation_m":  -2162.07,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.61,
                          "severity_score":  0.62,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.61 graus detectada pela telemetria da NASA (Sol 1281)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1281_477",
                          "name":  "Sol 1281 Inclinacao (18.27 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.473419,
                          "lon":  77.29901,
                          "elevation_m":  -2160.36,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.27,
                          "severity_score":  0.73,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.27 graus detectada pela telemetria da NASA (Sol 1281)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1283_478",
                          "name":  "Sol 1283 Inclinacao (13.69 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.47185,
                          "lon":  77.300274,
                          "elevation_m":  -2165.16,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.69,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.69 graus (Sol 1283)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1284_479",
                          "name":  "Sol 1284 Inclinacao (14.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471611,
                          "lon":  77.299815,
                          "elevation_m":  -2157.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.46,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.46 graus (Sol 1284)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1285_480",
                          "name":  "Sol 1285 Inclinacao (14.95 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471794,
                          "lon":  77.299204,
                          "elevation_m":  -2151.62,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.95,
                          "severity_score":  0.6,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.95 graus (Sol 1285)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1286_481",
                          "name":  "Sol 1286 Inclinacao (14.93 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471772,
                          "lon":  77.298859,
                          "elevation_m":  -2146.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.93,
                          "severity_score":  0.6,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.93 graus (Sol 1286)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1288_482",
                          "name":  "Sol 1288 Inclinacao (13.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471737,
                          "lon":  77.298184,
                          "elevation_m":  -2138.08,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.57,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.57 graus (Sol 1288)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1292_483",
                          "name":  "Sol 1292 Inclinacao (14.76 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.471406,
                          "lon":  77.297039,
                          "elevation_m":  -2121.61,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.76,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.76 graus (Sol 1292)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1293_484",
                          "name":  "Sol 1293 Inclinacao (13.71 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.470531,
                          "lon":  77.295135,
                          "elevation_m":  -2089.19,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.71,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.71 graus (Sol 1293)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1294_485",
                          "name":  "Sol 1294 Inclinacao (18.28 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.470675,
                          "lon":  77.294889,
                          "elevation_m":  -2086.38,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.28,
                          "severity_score":  0.73,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.28 graus detectada pela telemetria da NASA (Sol 1294)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1295_486",
                          "name":  "Sol 1295 Inclinacao (17.02 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.470317,
                          "lon":  77.294718,
                          "elevation_m":  -2081.75,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.02,
                          "severity_score":  0.68,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.02 graus detectada pela telemetria da NASA (Sol 1295)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1298_487",
                          "name":  "Sol 1298 Inclinacao (11.05 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469217,
                          "lon":  77.293201,
                          "elevation_m":  -2059.05,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.05,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.05 graus (Sol 1298)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1299_488",
                          "name":  "Sol 1299 Inclinacao (11.3 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469001,
                          "lon":  77.293014,
                          "elevation_m":  -2055.64,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.3,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.3 graus (Sol 1299)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1301_489",
                          "name":  "Sol 1301 Inclinacao (10.97 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469058,
                          "lon":  77.293072,
                          "elevation_m":  -2056.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.97,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.97 graus (Sol 1301)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1301_490",
                          "name":  "Sol 1301 Inclinacao (17.56 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469387,
                          "lon":  77.29303,
                          "elevation_m":  -2055.55,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.56,
                          "severity_score":  0.7,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.56 graus detectada pela telemetria da NASA (Sol 1301)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1301_491",
                          "name":  "Sol 1301 Inclinacao (16.87 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469467,
                          "lon":  77.293047,
                          "elevation_m":  -2055.82,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.87,
                          "severity_score":  0.67,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.87 graus detectada pela telemetria da NASA (Sol 1301)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1302_492",
                          "name":  "Sol 1302 Inclinacao (17.7 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.469477,
                          "lon":  77.293055,
                          "elevation_m":  -2056.1,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.7,
                          "severity_score":  0.71,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.7 graus detectada pela telemetria da NASA (Sol 1302)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1305_493",
                          "name":  "Sol 1305 Inclinacao (9.47 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467707,
                          "lon":  77.291437,
                          "elevation_m":  -2037.97,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.47,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.47 graus (Sol 1305)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1307_494",
                          "name":  "Sol 1307 Inclinacao (12.4 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467921,
                          "lon":  77.291163,
                          "elevation_m":  -2035.29,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.4,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.4 graus (Sol 1307)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1307_495",
                          "name":  "Sol 1307 Inclinacao (17.34 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.46786,
                          "lon":  77.291101,
                          "elevation_m":  -2033.99,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.34,
                          "severity_score":  0.69,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.34 graus detectada pela telemetria da NASA (Sol 1307)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1308_496",
                          "name":  "Sol 1308 Inclinacao (12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467968,
                          "lon":  77.29117,
                          "elevation_m":  -2035.76,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12 graus (Sol 1308)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1308_497",
                          "name":  "Sol 1308 Inclinacao (18.37 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467961,
                          "lon":  77.291067,
                          "elevation_m":  -2033.6,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.37,
                          "severity_score":  0.73,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.37 graus detectada pela telemetria da NASA (Sol 1308)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1313_499",
                          "name":  "Sol 1313 Inclinacao (9.42 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.468805,
                          "lon":  77.291764,
                          "elevation_m":  -2040.24,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.42,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.42 graus (Sol 1313)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1318_500",
                          "name":  "Sol 1318 Inclinacao (9.65 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467373,
                          "lon":  77.291091,
                          "elevation_m":  -2033.55,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.65,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.65 graus (Sol 1318)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1320_501",
                          "name":  "Sol 1320 Inclinacao (12.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467763,
                          "lon":  77.291008,
                          "elevation_m":  -2032.26,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.63,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.63 graus (Sol 1320)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1320_502",
                          "name":  "Sol 1320 Inclinacao (14.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467843,
                          "lon":  77.29098,
                          "elevation_m":  -2031.93,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.14,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.14 graus (Sol 1320)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1321_503",
                          "name":  "Sol 1321 Inclinacao (20.1 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.467911,
                          "lon":  77.29094,
                          "elevation_m":  -2031.31,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.1,
                          "severity_score":  0.8,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.1 graus detectada pela telemetria da NASA (Sol 1321)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1324_506",
                          "name":  "Sol 1324 Inclinacao (9.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.464896,
                          "lon":  77.289241,
                          "elevation_m":  -2015.23,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.84,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.84 graus (Sol 1324)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1326_507",
                          "name":  "Sol 1326 Inclinacao (9.09 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.464886,
                          "lon":  77.289067,
                          "elevation_m":  -2013.62,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.09,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.09 graus (Sol 1326)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1326_508",
                          "name":  "Sol 1326 Inclinacao (10.62 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.46455,
                          "lon":  77.287624,
                          "elevation_m":  -1998.72,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.62,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.62 graus (Sol 1326)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1327_509",
                          "name":  "Sol 1327 Inclinacao (11.53 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.464596,
                          "lon":  77.287477,
                          "elevation_m":  -1997.3,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.53,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.53 graus (Sol 1327)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1338_512",
                          "name":  "Sol 1338 Inclinacao (10.03 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.463168,
                          "lon":  77.284733,
                          "elevation_m":  -1970.07,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.03,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.03 graus (Sol 1338)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1347_516",
                          "name":  "Sol 1347 Inclinacao (9.21 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462077,
                          "lon":  77.28071,
                          "elevation_m":  -1932.95,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.21,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.21 graus (Sol 1347)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1348_517",
                          "name":  "Sol 1348 Inclinacao (11.78 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.461469,
                          "lon":  77.278041,
                          "elevation_m":  -1901.53,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.78,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.78 graus (Sol 1348)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1349_518",
                          "name":  "Sol 1349 Inclinacao (11.03 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460086,
                          "lon":  77.274662,
                          "elevation_m":  -1860.23,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.03,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.03 graus (Sol 1349)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1351_519",
                          "name":  "Sol 1351 Inclinacao (11.08 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459383,
                          "lon":  77.272319,
                          "elevation_m":  -1832.25,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.08,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.08 graus (Sol 1351)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1354_520",
                          "name":  "Sol 1354 Inclinacao (9.06 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457528,
                          "lon":  77.268527,
                          "elevation_m":  -1786,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.06,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.06 graus (Sol 1354)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1359_522",
                          "name":  "Sol 1359 Inclinacao (12.49 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458752,
                          "lon":  77.264912,
                          "elevation_m":  -1811.55,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.49,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.49 graus (Sol 1359)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1362_523",
                          "name":  "Sol 1362 Inclinacao (15.13 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460153,
                          "lon":  77.264689,
                          "elevation_m":  -1819.69,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.13,
                          "severity_score":  0.61,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.13 graus detectada pela telemetria da NASA (Sol 1362)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1363_524",
                          "name":  "Sol 1363 Inclinacao (14.48 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460463,
                          "lon":  77.264737,
                          "elevation_m":  -1819.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.48,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.48 graus (Sol 1363)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1363_525",
                          "name":  "Sol 1363 Inclinacao (17.92 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460547,
                          "lon":  77.264739,
                          "elevation_m":  -1820.03,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.92,
                          "severity_score":  0.72,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.92 graus detectada pela telemetria da NASA (Sol 1363)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1380_526",
                          "name":  "Sol 1380 Inclinacao (12.06 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459999,
                          "lon":  77.262481,
                          "elevation_m":  -1848.93,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.06,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.06 graus (Sol 1380)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1381_527",
                          "name":  "Sol 1381 Inclinacao (12.6 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459869,
                          "lon":  77.262417,
                          "elevation_m":  -1849.56,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.6,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.6 graus (Sol 1381)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1381_528",
                          "name":  "Sol 1381 Inclinacao (13.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459828,
                          "lon":  77.26249,
                          "elevation_m":  -1848.41,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.36,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.36 graus (Sol 1381)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1397_529",
                          "name":  "Sol 1397 Inclinacao (13.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460569,
                          "lon":  77.264638,
                          "elevation_m":  -1821.41,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.57,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.57 graus (Sol 1397)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1400_530",
                          "name":  "Sol 1400 Inclinacao (16.73 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460553,
                          "lon":  77.264745,
                          "elevation_m":  -1820.03,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.73,
                          "severity_score":  0.67,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.73 graus detectada pela telemetria da NASA (Sol 1400)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1403_531",
                          "name":  "Sol 1403 Inclinacao (14.11 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460482,
                          "lon":  77.264706,
                          "elevation_m":  -1820.44,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.11,
                          "severity_score":  0.56,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.11 graus (Sol 1403)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1403_532",
                          "name":  "Sol 1403 Inclinacao (11.5 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460558,
                          "lon":  77.264671,
                          "elevation_m":  -1820.96,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.5,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.5 graus (Sol 1403)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1407_533",
                          "name":  "Sol 1407 Inclinacao (10.22 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458848,
                          "lon":  77.264934,
                          "elevation_m":  -1811.63,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.22,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.22 graus (Sol 1407)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1408_534",
                          "name":  "Sol 1408 Inclinacao (11.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458752,
                          "lon":  77.26488,
                          "elevation_m":  -1812.01,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.84,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.84 graus (Sol 1408)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1411_535",
                          "name":  "Sol 1411 Inclinacao (12.96 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.458706,
                          "lon":  77.264932,
                          "elevation_m":  -1811.25,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.96,
                          "severity_score":  0.52,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.96 graus (Sol 1411)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1415_536",
                          "name":  "Sol 1415 Inclinacao (11.4 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460499,
                          "lon":  77.264667,
                          "elevation_m":  -1820.99,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.4,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.4 graus (Sol 1415)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1416_537",
                          "name":  "Sol 1416 Inclinacao (13.24 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460622,
                          "lon":  77.264644,
                          "elevation_m":  -1821.24,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.24,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.24 graus (Sol 1416)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1429_538",
                          "name":  "Sol 1429 Inclinacao (14.61 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460211,
                          "lon":  77.261624,
                          "elevation_m":  -1860.48,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.61,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.61 graus (Sol 1429)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1431_539",
                          "name":  "Sol 1431 Inclinacao (16.94 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.461407,
                          "lon":  77.2592,
                          "elevation_m":  -1906.71,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.94,
                          "severity_score":  0.68,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.94 graus detectada pela telemetria da NASA (Sol 1431)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1435_540",
                          "name":  "Sol 1435 Inclinacao (15.6 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.461727,
                          "lon":  77.258503,
                          "elevation_m":  -1918.45,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.6,
                          "severity_score":  0.62,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.6 graus detectada pela telemetria da NASA (Sol 1435)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1445_541",
                          "name":  "Sol 1445 Inclinacao (16.17 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.461749,
                          "lon":  77.258425,
                          "elevation_m":  -1919.33,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.17,
                          "severity_score":  0.65,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.17 graus detectada pela telemetria da NASA (Sol 1445)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1451_542",
                          "name":  "Sol 1451 Inclinacao (15.03 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.46223,
                          "lon":  77.257809,
                          "elevation_m":  -1926.96,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.03,
                          "severity_score":  0.6,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.03 graus detectada pela telemetria da NASA (Sol 1451)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1452_543",
                          "name":  "Sol 1452 Inclinacao (11.39 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462339,
                          "lon":  77.257768,
                          "elevation_m":  -1926.36,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.39,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.39 graus (Sol 1452)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1454_544",
                          "name":  "Sol 1454 Inclinacao (17.21 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462305,
                          "lon":  77.257668,
                          "elevation_m":  -1927.18,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.21,
                          "severity_score":  0.69,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.21 graus detectada pela telemetria da NASA (Sol 1454)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1461_545",
                          "name":  "Sol 1461 Inclinacao (12.03 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462305,
                          "lon":  77.25774,
                          "elevation_m":  -1927.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.03,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.03 graus (Sol 1461)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1463_546",
                          "name":  "Sol 1463 Inclinacao (10.39 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462346,
                          "lon":  77.257736,
                          "elevation_m":  -1926.56,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.39,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.39 graus (Sol 1463)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1468_547",
                          "name":  "Sol 1468 Inclinacao (16.15 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.4612,
                          "lon":  77.258371,
                          "elevation_m":  -1920.51,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.15,
                          "severity_score":  0.65,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.15 graus detectada pela telemetria da NASA (Sol 1468)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1470_548",
                          "name":  "Sol 1470 Inclinacao (15.4 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460885,
                          "lon":  77.257529,
                          "elevation_m":  -1933.8,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.4,
                          "severity_score":  0.62,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.4 graus detectada pela telemetria da NASA (Sol 1470)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1472_549",
                          "name":  "Sol 1472 Inclinacao (15.13 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460889,
                          "lon":  77.257271,
                          "elevation_m":  -1938.1,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.13,
                          "severity_score":  0.61,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.13 graus detectada pela telemetria da NASA (Sol 1472)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1477_550",
                          "name":  "Sol 1477 Inclinacao (14.37 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.462179,
                          "lon":  77.257858,
                          "elevation_m":  -1926.59,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.37,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.37 graus (Sol 1477)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1478_551",
                          "name":  "Sol 1478 Inclinacao (13.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.46223,
                          "lon":  77.257928,
                          "elevation_m":  -1925.48,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.46,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.46 graus (Sol 1478)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1502_552",
                          "name":  "Sol 1502 Inclinacao (12.08 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460791,
                          "lon":  77.255666,
                          "elevation_m":  -1959.42,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.08,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.08 graus (Sol 1502)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1503_553",
                          "name":  "Sol 1503 Inclinacao (13.17 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460505,
                          "lon":  77.25398,
                          "elevation_m":  -1975,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.17,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.17 graus (Sol 1503)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1509_554",
                          "name":  "Sol 1509 Inclinacao (10.2 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.457277,
                          "lon":  77.255489,
                          "elevation_m":  -1947.52,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.2,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.2 graus (Sol 1509)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1510_555",
                          "name":  "Sol 1510 Inclinacao (12.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.454103,
                          "lon":  77.255759,
                          "elevation_m":  -1940.57,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.89,
                          "severity_score":  0.52,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.89 graus (Sol 1510)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1511_556",
                          "name":  "Sol 1511 Inclinacao (13.45 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453914,
                          "lon":  77.255872,
                          "elevation_m":  -1939.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.45,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.45 graus (Sol 1511)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1511_557",
                          "name":  "Sol 1511 Inclinacao (8.96 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.452677,
                          "lon":  77.254648,
                          "elevation_m":  -1955.24,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.96,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.96 graus (Sol 1511)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1518_559",
                          "name":  "Sol 1518 Inclinacao (8.66 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.452622,
                          "lon":  77.254577,
                          "elevation_m":  -1956.1,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.66,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.66 graus (Sol 1518)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1519_560",
                          "name":  "Sol 1519 Inclinacao (16.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453011,
                          "lon":  77.256961,
                          "elevation_m":  -1928.08,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  16.84,
                          "severity_score":  0.67,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 16.84 graus detectada pela telemetria da NASA (Sol 1519)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1520_561",
                          "name":  "Sol 1520 Inclinacao (20.24 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.4542,
                          "lon":  77.257227,
                          "elevation_m":  -1916.44,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.24,
                          "severity_score":  0.81,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.24 graus detectada pela telemetria da NASA (Sol 1520)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1523_562",
                          "name":  "Sol 1523 Inclinacao (13.58 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453942,
                          "lon":  77.256015,
                          "elevation_m":  -1937.74,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.58,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.58 graus (Sol 1523)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1524_563",
                          "name":  "Sol 1524 Inclinacao (13.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453905,
                          "lon":  77.255917,
                          "elevation_m":  -1939.09,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.23,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.23 graus (Sol 1524)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1540_564",
                          "name":  "Sol 1540 Inclinacao (11.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460621,
                          "lon":  77.255683,
                          "elevation_m":  -1958.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.46,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.46 graus (Sol 1540)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1542_565",
                          "name":  "Sol 1542 Inclinacao (12.14 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460754,
                          "lon":  77.255635,
                          "elevation_m":  -1959.75,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.14,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.14 graus (Sol 1542)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1549_566",
                          "name":  "Sol 1549 Inclinacao (14.88 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460933,
                          "lon":  77.257227,
                          "elevation_m":  -1938.68,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.88,
                          "severity_score":  0.6,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.88 graus (Sol 1549)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1551_567",
                          "name":  "Sol 1551 Inclinacao (14.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460917,
                          "lon":  77.257218,
                          "elevation_m":  -1938.95,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.44,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.44 graus (Sol 1551)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1556_568",
                          "name":  "Sol 1556 Inclinacao (9.49 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.460105,
                          "lon":  77.254579,
                          "elevation_m":  -1967.37,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.49,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.49 graus (Sol 1556)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1560_570",
                          "name":  "Sol 1560 Inclinacao (13.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459467,
                          "lon":  77.254585,
                          "elevation_m":  -1962.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.89,
                          "severity_score":  0.56,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.89 graus (Sol 1560)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1563_571",
                          "name":  "Sol 1563 Inclinacao (14.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459509,
                          "lon":  77.254503,
                          "elevation_m":  -1963.85,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.83,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.83 graus (Sol 1563)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1570_572",
                          "name":  "Sol 1570 Inclinacao (12.97 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459533,
                          "lon":  77.254545,
                          "elevation_m":  -1963.68,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.97,
                          "severity_score":  0.52,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.97 graus (Sol 1570)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1570_573",
                          "name":  "Sol 1570 Inclinacao (14.1 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459467,
                          "lon":  77.254582,
                          "elevation_m":  -1962.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.1,
                          "severity_score":  0.56,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.1 graus (Sol 1570)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1576_574",
                          "name":  "Sol 1576 Inclinacao (13.85 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.459265,
                          "lon":  77.254244,
                          "elevation_m":  -1965.61,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.85,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.85 graus (Sol 1576)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1576_575",
                          "name":  "Sol 1576 Inclinacao (12.15 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.455991,
                          "lon":  77.255541,
                          "elevation_m":  -1944.75,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.15,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.15 graus (Sol 1576)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1577_576",
                          "name":  "Sol 1577 Inclinacao (18.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453014,
                          "lon":  77.25734,
                          "elevation_m":  -1921.95,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.63,
                          "severity_score":  0.75,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.63 graus detectada pela telemetria da NASA (Sol 1577)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1578_577",
                          "name":  "Sol 1578 Inclinacao (20.68 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.45301,
                          "lon":  77.257976,
                          "elevation_m":  -1910.54,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.68,
                          "severity_score":  0.83,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.68 graus detectada pela telemetria da NASA (Sol 1578)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1579_578",
                          "name":  "Sol 1579 Inclinacao (19.48 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.453015,
                          "lon":  77.257982,
                          "elevation_m":  -1910.54,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  19.48,
                          "severity_score":  0.78,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 19.48 graus detectada pela telemetria da NASA (Sol 1579)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1584_579",
                          "name":  "Sol 1584 Inclinacao (20.12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.452782,
                          "lon":  77.257907,
                          "elevation_m":  -1913.8,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.12,
                          "severity_score":  0.8,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.12 graus detectada pela telemetria da NASA (Sol 1584)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1590_580",
                          "name":  "Sol 1590 Inclinacao (20.51 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.452723,
                          "lon":  77.258118,
                          "elevation_m":  -1910.57,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  20.51,
                          "severity_score":  0.82,
                          "criticality_level":  5,
                          "passable_by_rover":  false,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 20.51 graus detectada pela telemetria da NASA (Sol 1590)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1592_581",
                          "name":  "Sol 1592 Inclinacao (8.82 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.451131,
                          "lon":  77.256021,
                          "elevation_m":  -1950.05,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.82,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.82 graus (Sol 1592)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1593_582",
                          "name":  "Sol 1593 Inclinacao (11.09 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.450762,
                          "lon":  77.255623,
                          "elevation_m":  -1955,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.09,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.09 graus (Sol 1593)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1595_583",
                          "name":  "Sol 1595 Inclinacao (11.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44903,
                          "lon":  77.25819,
                          "elevation_m":  -1933.63,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.44,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.44 graus (Sol 1595)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1597_584",
                          "name":  "Sol 1597 Inclinacao (9.28 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.446525,
                          "lon":  77.26097,
                          "elevation_m":  -1911.23,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.28,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.28 graus (Sol 1597)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1601_585",
                          "name":  "Sol 1601 Inclinacao (15.02 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447588,
                          "lon":  77.263883,
                          "elevation_m":  -1880.59,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.02,
                          "severity_score":  0.6,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.02 graus detectada pela telemetria da NASA (Sol 1601)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1606_586",
                          "name":  "Sol 1606 Inclinacao (14.86 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44754,
                          "lon":  77.264188,
                          "elevation_m":  -1877.29,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.86,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.86 graus (Sol 1606)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1606_587",
                          "name":  "Sol 1606 Inclinacao (13.22 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447558,
                          "lon":  77.264276,
                          "elevation_m":  -1876,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.22,
                          "severity_score":  0.53,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.22 graus (Sol 1606)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1608_588",
                          "name":  "Sol 1608 Inclinacao (12.28 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44758,
                          "lon":  77.264334,
                          "elevation_m":  -1875.2,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.28,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.28 graus (Sol 1608)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1615_589",
                          "name":  "Sol 1615 Inclinacao (13.68 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447641,
                          "lon":  77.264358,
                          "elevation_m":  -1874.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.68,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.68 graus (Sol 1615)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1622_590",
                          "name":  "Sol 1622 Inclinacao (13.86 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44769,
                          "lon":  77.26422,
                          "elevation_m":  -1875.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.86,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.86 graus (Sol 1622)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1627_591",
                          "name":  "Sol 1627 Inclinacao (13.42 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44743,
                          "lon":  77.264361,
                          "elevation_m":  -1875.8,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.42,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.42 graus (Sol 1627)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1627_592",
                          "name":  "Sol 1627 Inclinacao (14.76 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447418,
                          "lon":  77.264449,
                          "elevation_m":  -1874.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.76,
                          "severity_score":  0.59,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.76 graus (Sol 1627)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1629_593",
                          "name":  "Sol 1629 Inclinacao (15.34 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447486,
                          "lon":  77.264536,
                          "elevation_m":  -1873.13,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.34,
                          "severity_score":  0.61,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.34 graus detectada pela telemetria da NASA (Sol 1629)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1635_594",
                          "name":  "Sol 1635 Inclinacao (13.84 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.447688,
                          "lon":  77.264219,
                          "elevation_m":  -1875.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.84,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.84 graus (Sol 1635)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1642_595",
                          "name":  "Sol 1642 Inclinacao (14.21 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44742,
                          "lon":  77.264558,
                          "elevation_m":  -1873.39,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.21,
                          "severity_score":  0.57,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.21 graus (Sol 1642)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1646_596",
                          "name":  "Sol 1646 Inclinacao (15.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44808,
                          "lon":  77.264641,
                          "elevation_m":  -1867.68,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.23,
                          "severity_score":  0.61,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.23 graus detectada pela telemetria da NASA (Sol 1646)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1646_597",
                          "name":  "Sol 1646 Inclinacao (13.74 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448151,
                          "lon":  77.264688,
                          "elevation_m":  -1866.42,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.74,
                          "severity_score":  0.55,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.74 graus (Sol 1646)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1647_598",
                          "name":  "Sol 1647 Inclinacao (15.52 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448197,
                          "lon":  77.264705,
                          "elevation_m":  -1865.74,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.52,
                          "severity_score":  0.62,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.52 graus detectada pela telemetria da NASA (Sol 1647)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1647_599",
                          "name":  "Sol 1647 Inclinacao (14.62 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448315,
                          "lon":  77.264781,
                          "elevation_m":  -1863.76,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.62,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.62 graus (Sol 1647)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1661_600",
                          "name":  "Sol 1661 Inclinacao (17.33 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448931,
                          "lon":  77.264818,
                          "elevation_m":  -1856.25,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.33,
                          "severity_score":  0.69,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.33 graus detectada pela telemetria da NASA (Sol 1661)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1661_601",
                          "name":  "Sol 1661 Inclinacao (18.7 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.449003,
                          "lon":  77.264861,
                          "elevation_m":  -1854.53,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  18.7,
                          "severity_score":  0.75,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 18.7 graus detectada pela telemetria da NASA (Sol 1661)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1662_602",
                          "name":  "Sol 1662 Inclinacao (17.02 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.449065,
                          "lon":  77.264849,
                          "elevation_m":  -1854.08,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  17.02,
                          "severity_score":  0.68,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 17.02 graus detectada pela telemetria da NASA (Sol 1662)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1668_603",
                          "name":  "Sol 1668 Inclinacao (15.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448475,
                          "lon":  77.264784,
                          "elevation_m":  -1862.2,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.44,
                          "severity_score":  0.62,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.44 graus detectada pela telemetria da NASA (Sol 1668)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1668_604",
                          "name":  "Sol 1668 Inclinacao (15.99 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.44839,
                          "lon":  77.264785,
                          "elevation_m":  -1862.83,
                          "obstacle_type":  "steep_slope",
                          "radius_meters":  22,
                          "slope_deg":  15.99,
                          "severity_score":  0.64,
                          "criticality_level":  4,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Inclinacao severa de 15.99 graus detectada pela telemetria da NASA (Sol 1668)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1669_605",
                          "name":  "Sol 1669 Inclinacao (14.89 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.448312,
                          "lon":  77.264762,
                          "elevation_m":  -1863.98,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.89,
                          "severity_score":  0.6,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.89 graus (Sol 1669)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1674_606",
                          "name":  "Sol 1674 Inclinacao (9.57 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.444824,
                          "lon":  77.262394,
                          "elevation_m":  -1902.8,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.57,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.57 graus (Sol 1674)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1675_607",
                          "name":  "Sol 1675 Inclinacao (10.35 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.444405,
                          "lon":  77.262132,
                          "elevation_m":  -1904.37,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.35,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.35 graus (Sol 1675)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1676_609",
                          "name":  "Sol 1676 Inclinacao (12.55 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.441905,
                          "lon":  77.259659,
                          "elevation_m":  -1909.75,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.55,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.55 graus (Sol 1676)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1687_611",
                          "name":  "Sol 1687 Inclinacao (11.99 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.434002,
                          "lon":  77.256117,
                          "elevation_m":  -1881.76,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.99,
                          "severity_score":  0.48,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.99 graus (Sol 1687)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1688_612",
                          "name":  "Sol 1688 Inclinacao (14.42 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.430119,
                          "lon":  77.253172,
                          "elevation_m":  -1862.87,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.42,
                          "severity_score":  0.58,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.42 graus (Sol 1688)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1690_613",
                          "name":  "Sol 1690 Inclinacao (12.15 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.42951,
                          "lon":  77.252535,
                          "elevation_m":  -1863.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.15,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.15 graus (Sol 1690)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1698_614",
                          "name":  "Sol 1698 Inclinacao (12.22 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.428625,
                          "lon":  77.249957,
                          "elevation_m":  -1890.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.22,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.22 graus (Sol 1698)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1699_615",
                          "name":  "Sol 1699 Inclinacao (12.18 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.428625,
                          "lon":  77.249957,
                          "elevation_m":  -1890.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.18,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.18 graus (Sol 1699)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1700_616",
                          "name":  "Sol 1700 Inclinacao (12.18 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.428625,
                          "lon":  77.249957,
                          "elevation_m":  -1890.04,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.18,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.18 graus (Sol 1700)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1701_617",
                          "name":  "Sol 1701 Inclinacao (10.52 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.428328,
                          "lon":  77.245364,
                          "elevation_m":  -1943.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.52,
                          "severity_score":  0.42,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.52 graus (Sol 1701)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1762_629",
                          "name":  "Sol 1762 Inclinacao (8.03 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.429911,
                          "lon":  77.229692,
                          "elevation_m":  -1957.46,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.03,
                          "severity_score":  0.32,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.03 graus (Sol 1762)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1775_632",
                          "name":  "Sol 1775 Inclinacao (8.64 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427418,
                          "lon":  77.227294,
                          "elevation_m":  -1962.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.64,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.64 graus (Sol 1775)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1775_633",
                          "name":  "Sol 1775 Inclinacao (10.12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427419,
                          "lon":  77.227204,
                          "elevation_m":  -1962.63,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.12,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.12 graus (Sol 1775)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1779_634",
                          "name":  "Sol 1779 Inclinacao (9.11 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427438,
                          "lon":  77.227,
                          "elevation_m":  -1962.59,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.11,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.11 graus (Sol 1779)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1779_635",
                          "name":  "Sol 1779 Inclinacao (11.44 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427519,
                          "lon":  77.227024,
                          "elevation_m":  -1961.76,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.44,
                          "severity_score":  0.46,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.44 graus (Sol 1779)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1781_636",
                          "name":  "Sol 1781 Inclinacao (9.68 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427709,
                          "lon":  77.22686,
                          "elevation_m":  -1959.5,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.68,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.68 graus (Sol 1781)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1783_637",
                          "name":  "Sol 1783 Inclinacao (11.02 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427754,
                          "lon":  77.226855,
                          "elevation_m":  -1959.17,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.02,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.02 graus (Sol 1783)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1790_638",
                          "name":  "Sol 1790 Inclinacao (10.04 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427653,
                          "lon":  77.226789,
                          "elevation_m":  -1959.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.04,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.04 graus (Sol 1790)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1790_639",
                          "name":  "Sol 1790 Inclinacao (11.69 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427663,
                          "lon":  77.226731,
                          "elevation_m":  -1959.2,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.69,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.69 graus (Sol 1790)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1790_640",
                          "name":  "Sol 1790 Inclinacao (10.82 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427682,
                          "lon":  77.226629,
                          "elevation_m":  -1958.48,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.82,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.82 graus (Sol 1790)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1792_641",
                          "name":  "Sol 1792 Inclinacao (11.19 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427725,
                          "lon":  77.22666,
                          "elevation_m":  -1958.19,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.19,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.19 graus (Sol 1792)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1805_642",
                          "name":  "Sol 1805 Inclinacao (12.81 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427658,
                          "lon":  77.22674,
                          "elevation_m":  -1959.46,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.81,
                          "severity_score":  0.51,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.81 graus (Sol 1805)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1805_643",
                          "name":  "Sol 1805 Inclinacao (10.37 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427682,
                          "lon":  77.226775,
                          "elevation_m":  -1959.22,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.37,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.37 graus (Sol 1805)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1812_644",
                          "name":  "Sol 1812 Inclinacao (9.19 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.427622,
                          "lon":  77.226855,
                          "elevation_m":  -1960.47,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.19,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.19 graus (Sol 1812)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1819_648",
                          "name":  "Sol 1819 Inclinacao (11.05 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.43182,
                          "lon":  77.218409,
                          "elevation_m":  -1976.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.05,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.05 graus (Sol 1819)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1819_649",
                          "name":  "Sol 1819 Inclinacao (9.32 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431801,
                          "lon":  77.218315,
                          "elevation_m":  -1977.51,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.32,
                          "severity_score":  0.37,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.32 graus (Sol 1819)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1825_650",
                          "name":  "Sol 1825 Inclinacao (8.21 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431854,
                          "lon":  77.218303,
                          "elevation_m":  -1977.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.21,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.21 graus (Sol 1825)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1829_651",
                          "name":  "Sol 1829 Inclinacao (8.25 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431854,
                          "lon":  77.218303,
                          "elevation_m":  -1977.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.25,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.25 graus (Sol 1829)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1830_652",
                          "name":  "Sol 1830 Inclinacao (8.3 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431854,
                          "lon":  77.218302,
                          "elevation_m":  -1977.82,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.3,
                          "severity_score":  0.33,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.3 graus (Sol 1830)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1835_654",
                          "name":  "Sol 1835 Inclinacao (8.46 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.432604,
                          "lon":  77.219797,
                          "elevation_m":  -1972.25,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.46,
                          "severity_score":  0.34,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.46 graus (Sol 1835)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1842_658",
                          "name":  "Sol 1842 Inclinacao (9.47 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.432462,
                          "lon":  77.220272,
                          "elevation_m":  -1968.49,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.47,
                          "severity_score":  0.38,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.47 graus (Sol 1842)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1856_660",
                          "name":  "Sol 1856 Inclinacao (10.81 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.432063,
                          "lon":  77.220123,
                          "elevation_m":  -1966.18,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.81,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.81 graus (Sol 1856)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1859_661",
                          "name":  "Sol 1859 Inclinacao (10.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431575,
                          "lon":  77.220558,
                          "elevation_m":  -1960.54,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.36,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.36 graus (Sol 1859)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1859_662",
                          "name":  "Sol 1859 Inclinacao (10.83 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431509,
                          "lon":  77.220613,
                          "elevation_m":  -1959.34,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.83,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.83 graus (Sol 1859)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1863_664",
                          "name":  "Sol 1863 Inclinacao (9.85 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431032,
                          "lon":  77.220458,
                          "elevation_m":  -1957.97,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.85,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.85 graus (Sol 1863)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1866_665",
                          "name":  "Sol 1866 Inclinacao (14.99 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431069,
                          "lon":  77.220446,
                          "elevation_m":  -1957.91,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  14.99,
                          "severity_score":  0.6,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 14.99 graus (Sol 1866)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1867_666",
                          "name":  "Sol 1867 Inclinacao (11.34 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.431065,
                          "lon":  77.220431,
                          "elevation_m":  -1958.07,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.34,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.34 graus (Sol 1867)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1880_670",
                          "name":  "Sol 1880 Inclinacao (10.1 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.430455,
                          "lon":  77.221047,
                          "elevation_m":  -1953.14,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.1,
                          "severity_score":  0.4,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.1 graus (Sol 1880)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1883_671",
                          "name":  "Sol 1883 Inclinacao (12.31 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.430537,
                          "lon":  77.221167,
                          "elevation_m":  -1952.08,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.31,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.31 graus (Sol 1883)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1883_672",
                          "name":  "Sol 1883 Inclinacao (13.43 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.43047,
                          "lon":  77.221173,
                          "elevation_m":  -1951.77,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.43,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.43 graus (Sol 1883)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1890_673",
                          "name":  "Sol 1890 Inclinacao (9.74 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.428132,
                          "lon":  77.2179,
                          "elevation_m":  -1966.64,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.74,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.74 graus (Sol 1890)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1893_674",
                          "name":  "Sol 1893 Inclinacao (13.45 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.426029,
                          "lon":  77.217933,
                          "elevation_m":  -1958.92,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  13.45,
                          "severity_score":  0.54,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 13.45 graus (Sol 1893)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1896_675",
                          "name":  "Sol 1896 Inclinacao (10.32 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.424382,
                          "lon":  77.219123,
                          "elevation_m":  -1968.22,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.32,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.32 graus (Sol 1896)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1897_676",
                          "name":  "Sol 1897 Inclinacao (8.67 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.421964,
                          "lon":  77.220732,
                          "elevation_m":  -1973.63,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.67,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.67 graus (Sol 1897)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1917_683",
                          "name":  "Sol 1917 Inclinacao (10.72 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.424818,
                          "lon":  77.218531,
                          "elevation_m":  -1966.79,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.72,
                          "severity_score":  0.43,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.72 graus (Sol 1917)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1921_684",
                          "name":  "Sol 1921 Inclinacao (12.34 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.425761,
                          "lon":  77.218347,
                          "elevation_m":  -1956.95,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.34,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.34 graus (Sol 1921)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1922_685",
                          "name":  "Sol 1922 Inclinacao (8.9 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.426168,
                          "lon":  77.218059,
                          "elevation_m":  -1958.17,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.9,
                          "severity_score":  0.36,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.9 graus (Sol 1922)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1922_686",
                          "name":  "Sol 1922 Inclinacao (11.36 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.426167,
                          "lon":  77.21806,
                          "elevation_m":  -1958,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.36,
                          "severity_score":  0.45,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.36 graus (Sol 1922)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1935_688",
                          "name":  "Sol 1935 Inclinacao (11.73 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.42491,
                          "lon":  77.218554,
                          "elevation_m":  -1965.86,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.73,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.73 graus (Sol 1935)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1947_695",
                          "name":  "Sol 1947 Inclinacao (8.73 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435468,
                          "lon":  77.232909,
                          "elevation_m":  -1938.31,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.73,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.73 graus (Sol 1947)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1955_696",
                          "name":  "Sol 1955 Inclinacao (9.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435492,
                          "lon":  77.232869,
                          "elevation_m":  -1938.12,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.63,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.63 graus (Sol 1955)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1955_697",
                          "name":  "Sol 1955 Inclinacao (10.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435599,
                          "lon":  77.232871,
                          "elevation_m":  -1937.45,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  10.23,
                          "severity_score":  0.41,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 10.23 graus (Sol 1955)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1962_698",
                          "name":  "Sol 1962 Inclinacao (12.23 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.436835,
                          "lon":  77.231927,
                          "elevation_m":  -1931.18,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.23,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.23 graus (Sol 1962)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1965_699",
                          "name":  "Sol 1965 Inclinacao (12.58 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.437169,
                          "lon":  77.231952,
                          "elevation_m":  -1927.26,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.58,
                          "severity_score":  0.5,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.58 graus (Sol 1965)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1965_700",
                          "name":  "Sol 1965 Inclinacao (12.17 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.437146,
                          "lon":  77.231867,
                          "elevation_m":  -1927.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  12.17,
                          "severity_score":  0.49,
                          "criticality_level":  3,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 12.17 graus (Sol 1965)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1979_701",
                          "name":  "Sol 1979 Inclinacao (11.72 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.437148,
                          "lon":  77.231893,
                          "elevation_m":  -1927.66,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.72,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.72 graus (Sol 1979)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1980_702",
                          "name":  "Sol 1980 Inclinacao (11.12 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.436951,
                          "lon":  77.232019,
                          "elevation_m":  -1929.47,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.12,
                          "severity_score":  0.44,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.12 graus (Sol 1980)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL1980_703",
                          "name":  "Sol 1980 Inclinacao (11.65 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.436874,
                          "lon":  77.232054,
                          "elevation_m":  -1930.19,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  11.65,
                          "severity_score":  0.47,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 11.65 graus (Sol 1980)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL2009_705",
                          "name":  "Sol 2009 Inclinacao (8.68 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435598,
                          "lon":  77.232809,
                          "elevation_m":  -1937.69,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.68,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.68 graus (Sol 2009)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL2009_706",
                          "name":  "Sol 2009 Inclinacao (9.63 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435595,
                          "lon":  77.232875,
                          "elevation_m":  -1937.45,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  9.63,
                          "severity_score":  0.39,
                          "criticality_level":  2,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 9.63 graus (Sol 2009)"
                      },
                      {
                          "obstacle_id":  "NASA_M20_SOL2022_707",
                          "name":  "Sol 2022 Inclinacao (8.78 deg)",
                          "source_dataset":  "NASA_M2020_MMGIS_Waypoints",
                          "lat":  18.435603,
                          "lon":  77.233134,
                          "elevation_m":  -1936.73,
                          "obstacle_type":  "rough_terrain",
                          "radius_meters":  14,
                          "slope_deg":  8.78,
                          "severity_score":  0.35,
                          "criticality_level":  1,
                          "passable_by_rover":  true,
                          "is_dynamic_report":  false,
                          "description":  "Terreno irregular com inclinacao moderada de 8.78 graus (Sol 2022)"
                      }
                  ],
    "rover_traverse":  [
                           {
                               "sol":  13,
                               "lat":  18.444627,
                               "lon":  77.450886,
                               "elevation_m":  -2569.91,
                               "tilt_deg":  1.18
                           },
                           {
                               "sol":  14,
                               "lat":  18.444543,
                               "lon":  77.450947,
                               "elevation_m":  -2569.86,
                               "tilt_deg":  1.01
                           },
                           {
                               "sol":  15,
                               "lat":  18.445135,
                               "lon":  77.451034,
                               "elevation_m":  -2569.94,
                               "tilt_deg":  2.39
                           },
                           {
                               "sol":  16,
                               "lat":  18.44528,
                               "lon":  77.451497,
                               "elevation_m":  -2569.29,
                               "tilt_deg":  1.92
                           },
                           {
                               "sol":  20,
                               "lat":  18.445148,
                               "lon":  77.451856,
                               "elevation_m":  -2568.93,
                               "tilt_deg":  1.16
                           },
                           {
                               "sol":  23,
                               "lat":  18.445202,
                               "lon":  77.451777,
                               "elevation_m":  -2568.97,
                               "tilt_deg":  1.51
                           },
                           {
                               "sol":  29,
                               "lat":  18.445164,
                               "lon":  77.451822,
                               "elevation_m":  -2568.93,
                               "tilt_deg":  1.33
                           },
                           {
                               "sol":  31,
                               "lat":  18.44518,
                               "lon":  77.451332,
                               "elevation_m":  -2569.6,
                               "tilt_deg":  1.6
                           },
                           {
                               "sol":  32,
                               "lat":  18.4447,
                               "lon":  77.451197,
                               "elevation_m":  -2569.81,
                               "tilt_deg":  0.97
                           },
                           {
                               "sol":  33,
                               "lat":  18.444752,
                               "lon":  77.451024,
                               "elevation_m":  -2569.99,
                               "tilt_deg":  1.59
                           },
                           {
                               "sol":  34,
                               "lat":  18.444863,
                               "lon":  77.451022,
                               "elevation_m":  -2569.99,
                               "tilt_deg":  0.88
                           },
                           {
                               "sol":  43,
                               "lat":  18.44494,
                               "lon":  77.451025,
                               "elevation_m":  -2570.02,
                               "tilt_deg":  1.12
                           },
                           {
                               "sol":  44,
                               "lat":  18.444943,
                               "lon":  77.45102,
                               "elevation_m":  -2570.02,
                               "tilt_deg":  0.12
                           },
                           {
                               "sol":  47,
                               "lat":  18.444779,
                               "lon":  77.45153,
                               "elevation_m":  -2569.54,
                               "tilt_deg":  2.36
                           },
                           {
                               "sol":  48,
                               "lat":  18.444871,
                               "lon":  77.451819,
                               "elevation_m":  -2569.04,
                               "tilt_deg":  1.29
                           },
                           {
                               "sol":  49,
                               "lat":  18.444796,
                               "lon":  77.452019,
                               "elevation_m":  -2568.98,
                               "tilt_deg":  0.13
                           },
                           {
                               "sol":  52,
                               "lat":  18.444752,
                               "lon":  77.45214,
                               "elevation_m":  -2569.05,
                               "tilt_deg":  0.25
                           },
                           {
                               "sol":  65,
                               "lat":  18.444666,
                               "lon":  77.452226,
                               "elevation_m":  -2569,
                               "tilt_deg":  1.6
                           },
                           {
                               "sol":  66,
                               "lat":  18.444529,
                               "lon":  77.452298,
                               "elevation_m":  -2569.32,
                               "tilt_deg":  1.13
                           },
                           {
                               "sol":  72,
                               "lat":  18.444278,
                               "lon":  77.452517,
                               "elevation_m":  -2569.14,
                               "tilt_deg":  1.53
                           },
                           {
                               "sol":  73,
                               "lat":  18.444126,
                               "lon":  77.452587,
                               "elevation_m":  -2568.81,
                               "tilt_deg":  2.6
                           },
                           {
                               "sol":  84,
                               "lat":  18.444219,
                               "lon":  77.452277,
                               "elevation_m":  -2569.3,
                               "tilt_deg":  1.52
                           },
                           {
                               "sol":  86,
                               "lat":  18.44416,
                               "lon":  77.452219,
                               "elevation_m":  -2569.2,
                               "tilt_deg":  0.68
                           },
                           {
                               "sol":  91,
                               "lat":  18.44388,
                               "lon":  77.452207,
                               "elevation_m":  -2569.23,
                               "tilt_deg":  1.23
                           },
                           {
                               "sol":  99,
                               "lat":  18.443763,
                               "lon":  77.452162,
                               "elevation_m":  -2569.2,
                               "tilt_deg":  1.21
                           },
                           {
                               "sol":  102,
                               "lat":  18.443255,
                               "lon":  77.451527,
                               "elevation_m":  -2568.95,
                               "tilt_deg":  2.73
                           },
                           {
                               "sol":  103,
                               "lat":  18.442998,
                               "lon":  77.451194,
                               "elevation_m":  -2568.86,
                               "tilt_deg":  0.54
                           },
                           {
                               "sol":  104,
                               "lat":  18.442423,
                               "lon":  77.450864,
                               "elevation_m":  -2568.93,
                               "tilt_deg":  1.6
                           },
                           {
                               "sol":  105,
                               "lat":  18.442008,
                               "lon":  77.450697,
                               "elevation_m":  -2568.51,
                               "tilt_deg":  1.66
                           },
                           {
                               "sol":  107,
                               "lat":  18.441878,
                               "lon":  77.45068,
                               "elevation_m":  -2568.52,
                               "tilt_deg":  3.47
                           },
                           {
                               "sol":  108,
                               "lat":  18.441778,
                               "lon":  77.450318,
                               "elevation_m":  -2568.67,
                               "tilt_deg":  1
                           },
                           {
                               "sol":  109,
                               "lat":  18.44112,
                               "lon":  77.449725,
                               "elevation_m":  -2568.71,
                               "tilt_deg":  1.67
                           },
                           {
                               "sol":  110,
                               "lat":  18.440199,
                               "lon":  77.449644,
                               "elevation_m":  -2568.9,
                               "tilt_deg":  0.68
                           },
                           {
                               "sol":  113,
                               "lat":  18.439611,
                               "lon":  77.449538,
                               "elevation_m":  -2569.14,
                               "tilt_deg":  1.14
                           },
                           {
                               "sol":  116,
                               "lat":  18.439069,
                               "lon":  77.449402,
                               "elevation_m":  -2568.07,
                               "tilt_deg":  4.45
                           },
                           {
                               "sol":  122,
                               "lat":  18.439571,
                               "lon":  77.449411,
                               "elevation_m":  -2568.96,
                               "tilt_deg":  2.37
                           },
                           {
                               "sol":  123,
                               "lat":  18.438459,
                               "lon":  77.449635,
                               "elevation_m":  -2568.48,
                               "tilt_deg":  0.99
                           },
                           {
                               "sol":  124,
                               "lat":  18.438341,
                               "lon":  77.44956,
                               "elevation_m":  -2568.21,
                               "tilt_deg":  2.63
                           },
                           {
                               "sol":  126,
                               "lat":  18.438041,
                               "lon":  77.44982,
                               "elevation_m":  -2568.58,
                               "tilt_deg":  5.11
                           },
                           {
                               "sol":  127,
                               "lat":  18.437381,
                               "lon":  77.449959,
                               "elevation_m":  -2569.11,
                               "tilt_deg":  4.64
                           },
                           {
                               "sol":  128,
                               "lat":  18.437429,
                               "lon":  77.449965,
                               "elevation_m":  -2569.18,
                               "tilt_deg":  0.55
                           },
                           {
                               "sol":  129,
                               "lat":  18.437044,
                               "lon":  77.450411,
                               "elevation_m":  -2569.24,
                               "tilt_deg":  1.32
                           },
                           {
                               "sol":  130,
                               "lat":  18.435755,
                               "lon":  77.451725,
                               "elevation_m":  -2570.63,
                               "tilt_deg":  1.15
                           },
                           {
                               "sol":  131,
                               "lat":  18.434032,
                               "lon":  77.452047,
                               "elevation_m":  -2573.35,
                               "tilt_deg":  4
                           },
                           {
                               "sol":  134,
                               "lat":  18.432475,
                               "lon":  77.452294,
                               "elevation_m":  -2575.16,
                               "tilt_deg":  2.71
                           },
                           {
                               "sol":  135,
                               "lat":  18.431137,
                               "lon":  77.452149,
                               "elevation_m":  -2580.24,
                               "tilt_deg":  7.27
                           },
                           {
                               "sol":  136,
                               "lat":  18.430565,
                               "lon":  77.452044,
                               "elevation_m":  -2582.63,
                               "tilt_deg":  6.25
                           },
                           {
                               "sol":  137,
                               "lat":  18.429979,
                               "lon":  77.452151,
                               "elevation_m":  -2583.79,
                               "tilt_deg":  4.78
                           },
                           {
                               "sol":  153,
                               "lat":  18.428372,
                               "lon":  77.452029,
                               "elevation_m":  -2585.87,
                               "tilt_deg":  3.85
                           },
                           {
                               "sol":  155,
                               "lat":  18.427777,
                               "lon":  77.451576,
                               "elevation_m":  -2585.09,
                               "tilt_deg":  3.34
                           },
                           {
                               "sol":  157,
                               "lat":  18.427695,
                               "lon":  77.45165,
                               "elevation_m":  -2584.92,
                               "tilt_deg":  1.98
                           },
                           {
                               "sol":  168,
                               "lat":  18.427253,
                               "lon":  77.451607,
                               "elevation_m":  -2582.79,
                               "tilt_deg":  8.41
                           },
                           {
                               "sol":  169,
                               "lat":  18.427642,
                               "lon":  77.450806,
                               "elevation_m":  -2585.46,
                               "tilt_deg":  3.16
                           },
                           {
                               "sol":  170,
                               "lat":  18.42844,
                               "lon":  77.449202,
                               "elevation_m":  -2585.78,
                               "tilt_deg":  8.13
                           },
                           {
                               "sol":  171,
                               "lat":  18.429548,
                               "lon":  77.447677,
                               "elevation_m":  -2583.67,
                               "tilt_deg":  8.33
                           },
                           {
                               "sol":  173,
                               "lat":  18.429612,
                               "lon":  77.447046,
                               "elevation_m":  -2581.39,
                               "tilt_deg":  10.17
                           },
                           {
                               "sol":  175,
                               "lat":  18.429662,
                               "lon":  77.446793,
                               "elevation_m":  -2579.6,
                               "tilt_deg":  19.83
                           },
                           {
                               "sol":  177,
                               "lat":  18.430514,
                               "lon":  77.445455,
                               "elevation_m":  -2579.37,
                               "tilt_deg":  8.55
                           },
                           {
                               "sol":  178,
                               "lat":  18.430826,
                               "lon":  77.444311,
                               "elevation_m":  -2574.37,
                               "tilt_deg":  0.66
                           },
                           {
                               "sol":  180,
                               "lat":  18.430739,
                               "lon":  77.444366,
                               "elevation_m":  -2574.52,
                               "tilt_deg":  1.98
                           },
                           {
                               "sol":  199,
                               "lat":  18.43123,
                               "lon":  77.443324,
                               "elevation_m":  -2574.19,
                               "tilt_deg":  3.27
                           },
                           {
                               "sol":  200,
                               "lat":  18.432548,
                               "lon":  77.440687,
                               "elevation_m":  -2571.84,
                               "tilt_deg":  4.37
                           },
                           {
                               "sol":  201,
                               "lat":  18.432702,
                               "lon":  77.441287,
                               "elevation_m":  -2574.25,
                               "tilt_deg":  5.62
                           },
                           {
                               "sol":  202,
                               "lat":  18.433273,
                               "lon":  77.441761,
                               "elevation_m":  -2575.19,
                               "tilt_deg":  3.71
                           },
                           {
                               "sol":  203,
                               "lat":  18.433334,
                               "lon":  77.442248,
                               "elevation_m":  -2574.43,
                               "tilt_deg":  3.33
                           },
                           {
                               "sol":  204,
                               "lat":  18.433398,
                               "lon":  77.44241,
                               "elevation_m":  -2573.58,
                               "tilt_deg":  7.38
                           },
                           {
                               "sol":  210,
                               "lat":  18.433785,
                               "lon":  77.442121,
                               "elevation_m":  -2573.32,
                               "tilt_deg":  6.89
                           },
                           {
                               "sol":  237,
                               "lat":  18.433912,
                               "lon":  77.442663,
                               "elevation_m":  -2571.05,
                               "tilt_deg":  4.49
                           },
                           {
                               "sol":  238,
                               "lat":  18.433866,
                               "lon":  77.44296,
                               "elevation_m":  -2568.98,
                               "tilt_deg":  12.31
                           },
                           {
                               "sol":  239,
                               "lat":  18.433961,
                               "lon":  77.443012,
                               "elevation_m":  -2569.15,
                               "tilt_deg":  7.82
                           },
                           {
                               "sol":  248,
                               "lat":  18.433964,
                               "lon":  77.443019,
                               "elevation_m":  -2569.15,
                               "tilt_deg":  6.4
                           },
                           {
                               "sol":  278,
                               "lat":  18.433926,
                               "lon":  77.443059,
                               "elevation_m":  -2568.71,
                               "tilt_deg":  7.05
                           },
                           {
                               "sol":  280,
                               "lat":  18.433875,
                               "lon":  77.442435,
                               "elevation_m":  -2572.03,
                               "tilt_deg":  7.09
                           },
                           {
                               "sol":  281,
                               "lat":  18.433442,
                               "lon":  77.442025,
                               "elevation_m":  -2574.43,
                               "tilt_deg":  0.4
                           },
                           {
                               "sol":  283,
                               "lat":  18.433462,
                               "lon":  77.442081,
                               "elevation_m":  -2574.3,
                               "tilt_deg":  5.67
                           },
                           {
                               "sol":  285,
                               "lat":  18.432771,
                               "lon":  77.441448,
                               "elevation_m":  -2574.9,
                               "tilt_deg":  3.6
                           },
                           {
                               "sol":  286,
                               "lat":  18.432661,
                               "lon":  77.441373,
                               "elevation_m":  -2574.44,
                               "tilt_deg":  8.78
                           },
                           {
                               "sol":  328,
                               "lat":  18.432602,
                               "lon":  77.441411,
                               "elevation_m":  -2574.3,
                               "tilt_deg":  13.63
                           },
                           {
                               "sol":  333,
                               "lat":  18.432606,
                               "lon":  77.441348,
                               "elevation_m":  -2574.26,
                               "tilt_deg":  3
                           },
                           {
                               "sol":  335,
                               "lat":  18.432609,
                               "lon":  77.441314,
                               "elevation_m":  -2574.22,
                               "tilt_deg":  0.81
                           },
                           {
                               "sol":  340,
                               "lat":  18.432676,
                               "lon":  77.440996,
                               "elevation_m":  -2573.41,
                               "tilt_deg":  5.99
                           },
                           {
                               "sol":  340,
                               "lat":  18.431125,
                               "lon":  77.441625,
                               "elevation_m":  -2573.96,
                               "tilt_deg":  1.59
                           },
                           {
                               "sol":  340,
                               "lat":  18.430713,
                               "lon":  77.443187,
                               "elevation_m":  -2574.64,
                               "tilt_deg":  0.8
                           },
                           {
                               "sol":  341,
                               "lat":  18.430895,
                               "lon":  77.444461,
                               "elevation_m":  -2574.82,
                               "tilt_deg":  6.64
                           },
                           {
                               "sol":  341,
                               "lat":  18.430383,
                               "lon":  77.445504,
                               "elevation_m":  -2579.29,
                               "tilt_deg":  6.41
                           },
                           {
                               "sol":  341,
                               "lat":  18.42977,
                               "lon":  77.446748,
                               "elevation_m":  -2580.7,
                               "tilt_deg":  11.23
                           },
                           {
                               "sol":  342,
                               "lat":  18.429678,
                               "lon":  77.446953,
                               "elevation_m":  -2581.13,
                               "tilt_deg":  12.83
                           },
                           {
                               "sol":  343,
                               "lat":  18.429517,
                               "lon":  77.447102,
                               "elevation_m":  -2580.73,
                               "tilt_deg":  9.4
                           },
                           {
                               "sol":  343,
                               "lat":  18.429456,
                               "lon":  77.44704,
                               "elevation_m":  -2579.96,
                               "tilt_deg":  9.83
                           },
                           {
                               "sol":  350,
                               "lat":  18.428975,
                               "lon":  77.448408,
                               "elevation_m":  -2584.67,
                               "tilt_deg":  6.56
                           },
                           {
                               "sol":  351,
                               "lat":  18.429209,
                               "lon":  77.452363,
                               "elevation_m":  -2585.35,
                               "tilt_deg":  2.44
                           },
                           {
                               "sol":  352,
                               "lat":  18.430214,
                               "lon":  77.452307,
                               "elevation_m":  -2581.98,
                               "tilt_deg":  4.75
                           },
                           {
                               "sol":  353,
                               "lat":  18.431385,
                               "lon":  77.452593,
                               "elevation_m":  -2577.26,
                               "tilt_deg":  1.81
                           },
                           {
                               "sol":  353,
                               "lat":  18.432853,
                               "lon":  77.452113,
                               "elevation_m":  -2575,
                               "tilt_deg":  3.38
                           },
                           {
                               "sol":  354,
                               "lat":  18.434297,
                               "lon":  77.452153,
                               "elevation_m":  -2573.03,
                               "tilt_deg":  5.62
                           },
                           {
                               "sol":  354,
                               "lat":  18.435544,
                               "lon":  77.451882,
                               "elevation_m":  -2570.85,
                               "tilt_deg":  2.55
                           },
                           {
                               "sol":  354,
                               "lat":  18.435927,
                               "lon":  77.451776,
                               "elevation_m":  -2570.81,
                               "tilt_deg":  0.39
                           },
                           {
                               "sol":  355,
                               "lat":  18.440088,
                               "lon":  77.451463,
                               "elevation_m":  -2569.76,
                               "tilt_deg":  2.06
                           },
                           {
                               "sol":  358,
                               "lat":  18.440688,
                               "lon":  77.451896,
                               "elevation_m":  -2569.72,
                               "tilt_deg":  1.97
                           },
                           {
                               "sol":  359,
                               "lat":  18.44069,
                               "lon":  77.451893,
                               "elevation_m":  -2569.72,
                               "tilt_deg":  1.97
                           },
                           {
                               "sol":  360,
                               "lat":  18.44213,
                               "lon":  77.451769,
                               "elevation_m":  -2569.21,
                               "tilt_deg":  2.13
                           },
                           {
                               "sol":  360,
                               "lat":  18.443856,
                               "lon":  77.452171,
                               "elevation_m":  -2569.22,
                               "tilt_deg":  3.11
                           },
                           {
                               "sol":  361,
                               "lat":  18.443894,
                               "lon":  77.452438,
                               "elevation_m":  -2568.72,
                               "tilt_deg":  4.23
                           },
                           {
                               "sol":  362,
                               "lat":  18.443902,
                               "lon":  77.452434,
                               "elevation_m":  -2568.72,
                               "tilt_deg":  2.83
                           },
                           {
                               "sol":  379,
                               "lat":  18.446228,
                               "lon":  77.451474,
                               "elevation_m":  -2568.83,
                               "tilt_deg":  3.5
                           },
                           {
                               "sol":  380,
                               "lat":  18.448995,
                               "lon":  77.454325,
                               "elevation_m":  -2569.76,
                               "tilt_deg":  0.46
                           },
                           {
                               "sol":  381,
                               "lat":  18.448996,
                               "lon":  77.454325,
                               "elevation_m":  -2569.76,
                               "tilt_deg":  0.46
                           },
                           {
                               "sol":  382,
                               "lat":  18.4512,
                               "lon":  77.45894,
                               "elevation_m":  -2571.2,
                               "tilt_deg":  1.16
                           },
                           {
                               "sol":  383,
                               "lat":  18.453671,
                               "lon":  77.461859,
                               "elevation_m":  -2570.64,
                               "tilt_deg":  3.08
                           },
                           {
                               "sol":  384,
                               "lat":  18.45707,
                               "lon":  77.462005,
                               "elevation_m":  -2568.77,
                               "tilt_deg":  3.82
                           },
                           {
                               "sol":  385,
                               "lat":  18.457289,
                               "lon":  77.461937,
                               "elevation_m":  -2568.82,
                               "tilt_deg":  2.1
                           },
                           {
                               "sol":  386,
                               "lat":  18.460791,
                               "lon":  77.463133,
                               "elevation_m":  -2567.89,
                               "tilt_deg":  1.23
                           },
                           {
                               "sol":  387,
                               "lat":  18.464476,
                               "lon":  77.461579,
                               "elevation_m":  -2567.74,
                               "tilt_deg":  1.23
                           },
                           {
                               "sol":  388,
                               "lat":  18.467198,
                               "lon":  77.458351,
                               "elevation_m":  -2564.69,
                               "tilt_deg":  1.74
                           },
                           {
                               "sol":  389,
                               "lat":  18.468297,
                               "lon":  77.454441,
                               "elevation_m":  -2563.19,
                               "tilt_deg":  0.89
                           },
                           {
                               "sol":  394,
                               "lat":  18.468208,
                               "lon":  77.452158,
                               "elevation_m":  -2562.12,
                               "tilt_deg":  1.13
                           },
                           {
                               "sol":  395,
                               "lat":  18.467845,
                               "lon":  77.448695,
                               "elevation_m":  -2556.35,
                               "tilt_deg":  3.59
                           },
                           {
                               "sol":  396,
                               "lat":  18.467371,
                               "lon":  77.445952,
                               "elevation_m":  -2557.74,
                               "tilt_deg":  3.02
                           },
                           {
                               "sol":  397,
                               "lat":  18.466787,
                               "lon":  77.445152,
                               "elevation_m":  -2557.78,
                               "tilt_deg":  1.07
                           },
                           {
                               "sol":  398,
                               "lat":  18.465584,
                               "lon":  77.442504,
                               "elevation_m":  -2558.5,
                               "tilt_deg":  1.24
                           },
                           {
                               "sol":  399,
                               "lat":  18.464058,
                               "lon":  77.439074,
                               "elevation_m":  -2556.99,
                               "tilt_deg":  1.58
                           },
                           {
                               "sol":  400,
                               "lat":  18.461944,
                               "lon":  77.436105,
                               "elevation_m":  -2555.17,
                               "tilt_deg":  2.87
                           },
                           {
                               "sol":  401,
                               "lat":  18.461596,
                               "lon":  77.432978,
                               "elevation_m":  -2551.93,
                               "tilt_deg":  2.52
                           },
                           {
                               "sol":  402,
                               "lat":  18.460616,
                               "lon":  77.429997,
                               "elevation_m":  -2552.06,
                               "tilt_deg":  3.92
                           },
                           {
                               "sol":  404,
                               "lat":  18.459318,
                               "lon":  77.425757,
                               "elevation_m":  -2547.73,
                               "tilt_deg":  0.51
                           },
                           {
                               "sol":  405,
                               "lat":  18.457078,
                               "lon":  77.421782,
                               "elevation_m":  -2549.87,
                               "tilt_deg":  1.8
                           },
                           {
                               "sol":  407,
                               "lat":  18.455395,
                               "lon":  77.418584,
                               "elevation_m":  -2551.55,
                               "tilt_deg":  0.78
                           },
                           {
                               "sol":  408,
                               "lat":  18.453833,
                               "lon":  77.414136,
                               "elevation_m":  -2549.27,
                               "tilt_deg":  0.75
                           },
                           {
                               "sol":  409,
                               "lat":  18.45386,
                               "lon":  77.413528,
                               "elevation_m":  -2548.6,
                               "tilt_deg":  0.86
                           },
                           {
                               "sol":  409,
                               "lat":  18.453946,
                               "lon":  77.410419,
                               "elevation_m":  -2545.6,
                               "tilt_deg":  0.81
                           },
                           {
                               "sol":  413,
                               "lat":  18.454203,
                               "lon":  77.409009,
                               "elevation_m":  -2544.53,
                               "tilt_deg":  0.63
                           },
                           {
                               "sol":  413,
                               "lat":  18.453934,
                               "lon":  77.408808,
                               "elevation_m":  -2544.77,
                               "tilt_deg":  0.96
                           },
                           {
                               "sol":  413,
                               "lat":  18.45364,
                               "lon":  77.408646,
                               "elevation_m":  -2545.01,
                               "tilt_deg":  0.7
                           },
                           {
                               "sol":  413,
                               "lat":  18.453161,
                               "lon":  77.408552,
                               "elevation_m":  -2545.27,
                               "tilt_deg":  0.79
                           },
                           {
                               "sol":  414,
                               "lat":  18.453033,
                               "lon":  77.408468,
                               "elevation_m":  -2545.13,
                               "tilt_deg":  0.62
                           },
                           {
                               "sol":  414,
                               "lat":  18.451942,
                               "lon":  77.40605,
                               "elevation_m":  -2544.79,
                               "tilt_deg":  1.22
                           },
                           {
                               "sol":  415,
                               "lat":  18.449405,
                               "lon":  77.405186,
                               "elevation_m":  -2540.28,
                               "tilt_deg":  5.41
                           },
                           {
                               "sol":  416,
                               "lat":  18.448306,
                               "lon":  77.404827,
                               "elevation_m":  -2534.68,
                               "tilt_deg":  6.07
                           },
                           {
                               "sol":  418,
                               "lat":  18.44894,
                               "lon":  77.402103,
                               "elevation_m":  -2523.86,
                               "tilt_deg":  7.06
                           },
                           {
                               "sol":  419,
                               "lat":  18.448788,
                               "lon":  77.401642,
                               "elevation_m":  -2520.91,
                               "tilt_deg":  6.63
                           },
                           {
                               "sol":  420,
                               "lat":  18.449825,
                               "lon":  77.401363,
                               "elevation_m":  -2523.07,
                               "tilt_deg":  0.63
                           },
                           {
                               "sol":  421,
                               "lat":  18.450496,
                               "lon":  77.401439,
                               "elevation_m":  -2526.4,
                               "tilt_deg":  4.24
                           },
                           {
                               "sol":  422,
                               "lat":  18.450566,
                               "lon":  77.401422,
                               "elevation_m":  -2526.46,
                               "tilt_deg":  4.23
                           },
                           {
                               "sol":  426,
                               "lat":  18.450177,
                               "lon":  77.403438,
                               "elevation_m":  -2534.62,
                               "tilt_deg":  6.8
                           },
                           {
                               "sol":  427,
                               "lat":  18.449999,
                               "lon":  77.404499,
                               "elevation_m":  -2539.1,
                               "tilt_deg":  6.99
                           },
                           {
                               "sol":  428,
                               "lat":  18.451531,
                               "lon":  77.405294,
                               "elevation_m":  -2543.98,
                               "tilt_deg":  1.84
                           },
                           {
                               "sol":  430,
                               "lat":  18.451532,
                               "lon":  77.405294,
                               "elevation_m":  -2543.98,
                               "tilt_deg":  1.51
                           },
                           {
                               "sol":  432,
                               "lat":  18.452875,
                               "lon":  77.407539,
                               "elevation_m":  -2545.06,
                               "tilt_deg":  0.22
                           },
                           {
                               "sol":  433,
                               "lat":  18.45288,
                               "lon":  77.407644,
                               "elevation_m":  -2545.07,
                               "tilt_deg":  1.01
                           },
                           {
                               "sol":  433,
                               "lat":  18.452868,
                               "lon":  77.408138,
                               "elevation_m":  -2545.15,
                               "tilt_deg":  1.58
                           },
                           {
                               "sol":  433,
                               "lat":  18.453321,
                               "lon":  77.408355,
                               "elevation_m":  -2545.18,
                               "tilt_deg":  0.84
                           },
                           {
                               "sol":  433,
                               "lat":  18.453648,
                               "lon":  77.40842,
                               "elevation_m":  -2545,
                               "tilt_deg":  1.03
                           },
                           {
                               "sol":  434,
                               "lat":  18.453741,
                               "lon":  77.408389,
                               "elevation_m":  -2544.81,
                               "tilt_deg":  1.13
                           },
                           {
                               "sol":  434,
                               "lat":  18.454105,
                               "lon":  77.40851,
                               "elevation_m":  -2544.69,
                               "tilt_deg":  1.09
                           },
                           {
                               "sol":  434,
                               "lat":  18.454105,
                               "lon":  77.408512,
                               "elevation_m":  -2544.69,
                               "tilt_deg":  1.19
                           },
                           {
                               "sol":  436,
                               "lat":  18.455981,
                               "lon":  77.408464,
                               "elevation_m":  -2543.23,
                               "tilt_deg":  1.89
                           },
                           {
                               "sol":  437,
                               "lat":  18.457102,
                               "lon":  77.408746,
                               "elevation_m":  -2540,
                               "tilt_deg":  5.54
                           },
                           {
                               "sol":  439,
                               "lat":  18.457312,
                               "lon":  77.408851,
                               "elevation_m":  -2539.06,
                               "tilt_deg":  5.5
                           },
                           {
                               "sol":  439,
                               "lat":  18.457389,
                               "lon":  77.408881,
                               "elevation_m":  -2538.76,
                               "tilt_deg":  4.66
                           },
                           {
                               "sol":  441,
                               "lat":  18.457638,
                               "lon":  77.408907,
                               "elevation_m":  -2536.41,
                               "tilt_deg":  12.09
                           },
                           {
                               "sol":  441,
                               "lat":  18.457643,
                               "lon":  77.408814,
                               "elevation_m":  -2536,
                               "tilt_deg":  12.57
                           },
                           {
                               "sol":  441,
                               "lat":  18.457665,
                               "lon":  77.408664,
                               "elevation_m":  -2535.61,
                               "tilt_deg":  13.59
                           },
                           {
                               "sol":  441,
                               "lat":  18.457661,
                               "lon":  77.40858,
                               "elevation_m":  -2535.63,
                               "tilt_deg":  11.88
                           },
                           {
                               "sol":  443,
                               "lat":  18.457589,
                               "lon":  77.408101,
                               "elevation_m":  -2536.15,
                               "tilt_deg":  11.47
                           },
                           {
                               "sol":  443,
                               "lat":  18.457527,
                               "lon":  77.40747,
                               "elevation_m":  -2536,
                               "tilt_deg":  11.9
                           },
                           {
                               "sol":  448,
                               "lat":  18.457619,
                               "lon":  77.407141,
                               "elevation_m":  -2534.59,
                               "tilt_deg":  11.19
                           },
                           {
                               "sol":  448,
                               "lat":  18.457445,
                               "lon":  77.406338,
                               "elevation_m":  -2535.58,
                               "tilt_deg":  12.31
                           },
                           {
                               "sol":  449,
                               "lat":  18.45751,
                               "lon":  77.406301,
                               "elevation_m":  -2534.78,
                               "tilt_deg":  10.9
                           },
                           {
                               "sol":  455,
                               "lat":  18.45789,
                               "lon":  77.406277,
                               "elevation_m":  -2530.03,
                               "tilt_deg":  13.89
                           },
                           {
                               "sol":  456,
                               "lat":  18.457957,
                               "lon":  77.406503,
                               "elevation_m":  -2528.7,
                               "tilt_deg":  17.96
                           },
                           {
                               "sol":  456,
                               "lat":  18.458017,
                               "lon":  77.406498,
                               "elevation_m":  -2527.39,
                               "tilt_deg":  15.95
                           },
                           {
                               "sol":  460,
                               "lat":  18.458096,
                               "lon":  77.406443,
                               "elevation_m":  -2526.65,
                               "tilt_deg":  10.23
                           },
                           {
                               "sol":  460,
                               "lat":  18.458514,
                               "lon":  77.406093,
                               "elevation_m":  -2524.21,
                               "tilt_deg":  4.67
                           },
                           {
                               "sol":  461,
                               "lat":  18.458608,
                               "lon":  77.406147,
                               "elevation_m":  -2523.91,
                               "tilt_deg":  3.31
                           },
                           {
                               "sol":  461,
                               "lat":  18.458692,
                               "lon":  77.406145,
                               "elevation_m":  -2523.3,
                               "tilt_deg":  9.25
                           },
                           {
                               "sol":  464,
                               "lat":  18.458719,
                               "lon":  77.405974,
                               "elevation_m":  -2522.73,
                               "tilt_deg":  9.36
                           },
                           {
                               "sol":  464,
                               "lat":  18.458794,
                               "lon":  77.406013,
                               "elevation_m":  -2522.08,
                               "tilt_deg":  12.32
                           },
                           {
                               "sol":  474,
                               "lat":  18.458856,
                               "lon":  77.4061,
                               "elevation_m":  -2521.59,
                               "tilt_deg":  16.02
                           },
                           {
                               "sol":  477,
                               "lat":  18.458895,
                               "lon":  77.406168,
                               "elevation_m":  -2520.85,
                               "tilt_deg":  13.95
                           },
                           {
                               "sol":  501,
                               "lat":  18.458727,
                               "lon":  77.40603,
                               "elevation_m":  -2522.76,
                               "tilt_deg":  8.84
                           },
                           {
                               "sol":  501,
                               "lat":  18.458695,
                               "lon":  77.405952,
                               "elevation_m":  -2522.83,
                               "tilt_deg":  9.44
                           },
                           {
                               "sol":  502,
                               "lat":  18.458647,
                               "lon":  77.405925,
                               "elevation_m":  -2523.17,
                               "tilt_deg":  14.36
                           },
                           {
                               "sol":  535,
                               "lat":  18.45835,
                               "lon":  77.407328,
                               "elevation_m":  -2525.52,
                               "tilt_deg":  5.78
                           },
                           {
                               "sol":  536,
                               "lat":  18.458216,
                               "lon":  77.408576,
                               "elevation_m":  -2526.47,
                               "tilt_deg":  8.46
                           },
                           {
                               "sol":  537,
                               "lat":  18.45821,
                               "lon":  77.408849,
                               "elevation_m":  -2526.74,
                               "tilt_deg":  8.52
                           },
                           {
                               "sol":  538,
                               "lat":  18.457958,
                               "lon":  77.408677,
                               "elevation_m":  -2531.44,
                               "tilt_deg":  15.91
                           },
                           {
                               "sol":  538,
                               "lat":  18.456828,
                               "lon":  77.408651,
                               "elevation_m":  -2540.95,
                               "tilt_deg":  2.57
                           },
                           {
                               "sol":  539,
                               "lat":  18.455319,
                               "lon":  77.407909,
                               "elevation_m":  -2543.65,
                               "tilt_deg":  1
                           },
                           {
                               "sol":  541,
                               "lat":  18.453807,
                               "lon":  77.406896,
                               "elevation_m":  -2543.4,
                               "tilt_deg":  2.07
                           },
                           {
                               "sol":  542,
                               "lat":  18.451925,
                               "lon":  77.405682,
                               "elevation_m":  -2544.45,
                               "tilt_deg":  0.25
                           },
                           {
                               "sol":  543,
                               "lat":  18.450275,
                               "lon":  77.404911,
                               "elevation_m":  -2541.16,
                               "tilt_deg":  5.12
                           },
                           {
                               "sol":  548,
                               "lat":  18.450091,
                               "lon":  77.404773,
                               "elevation_m":  -2540.1,
                               "tilt_deg":  12.16
                           },
                           {
                               "sol":  551,
                               "lat":  18.450091,
                               "lon":  77.404765,
                               "elevation_m":  -2540,
                               "tilt_deg":  10.41
                           },
                           {
                               "sol":  555,
                               "lat":  18.450197,
                               "lon":  77.402633,
                               "elevation_m":  -2530.6,
                               "tilt_deg":  3
                           },
                           {
                               "sol":  555,
                               "lat":  18.450324,
                               "lon":  77.4018,
                               "elevation_m":  -2527.36,
                               "tilt_deg":  8.06
                           },
                           {
                               "sol":  556,
                               "lat":  18.450763,
                               "lon":  77.401589,
                               "elevation_m":  -2527.13,
                               "tilt_deg":  7.97
                           },
                           {
                               "sol":  556,
                               "lat":  18.450755,
                               "lon":  77.401498,
                               "elevation_m":  -2526.71,
                               "tilt_deg":  3.2
                           },
                           {
                               "sol":  557,
                               "lat":  18.450743,
                               "lon":  77.401443,
                               "elevation_m":  -2526.52,
                               "tilt_deg":  2.28
                           },
                           {
                               "sol":  565,
                               "lat":  18.450726,
                               "lon":  77.40144,
                               "elevation_m":  -2526.53,
                               "tilt_deg":  4.4
                           },
                           {
                               "sol":  592,
                               "lat":  18.451012,
                               "lon":  77.401345,
                               "elevation_m":  -2526.17,
                               "tilt_deg":  6.42
                           },
                           {
                               "sol":  592,
                               "lat":  18.451361,
                               "lon":  77.401331,
                               "elevation_m":  -2525.38,
                               "tilt_deg":  5.87
                           },
                           {
                               "sol":  593,
                               "lat":  18.45133,
                               "lon":  77.401258,
                               "elevation_m":  -2525.28,
                               "tilt_deg":  5.77
                           },
                           {
                               "sol":  606,
                               "lat":  18.453532,
                               "lon":  77.399147,
                               "elevation_m":  -2517.54,
                               "tilt_deg":  7.93
                           },
                           {
                               "sol":  609,
                               "lat":  18.453644,
                               "lon":  77.399154,
                               "elevation_m":  -2517.29,
                               "tilt_deg":  5.37
                           },
                           {
                               "sol":  629,
                               "lat":  18.452926,
                               "lon":  77.399186,
                               "elevation_m":  -2518.3,
                               "tilt_deg":  6.28
                           },
                           {
                               "sol":  629,
                               "lat":  18.45255,
                               "lon":  77.39956,
                               "elevation_m":  -2518.23,
                               "tilt_deg":  7.57
                           },
                           {
                               "sol":  629,
                               "lat":  18.452405,
                               "lon":  77.400343,
                               "elevation_m":  -2521.07,
                               "tilt_deg":  4.49
                           },
                           {
                               "sol":  629,
                               "lat":  18.451625,
                               "lon":  77.401437,
                               "elevation_m":  -2523.83,
                               "tilt_deg":  12.76
                           },
                           {
                               "sol":  632,
                               "lat":  18.451619,
                               "lon":  77.401437,
                               "elevation_m":  -2523.92,
                               "tilt_deg":  13.14
                           },
                           {
                               "sol":  632,
                               "lat":  18.451455,
                               "lon":  77.401441,
                               "elevation_m":  -2525.2,
                               "tilt_deg":  7.43
                           },
                           {
                               "sol":  632,
                               "lat":  18.451356,
                               "lon":  77.401342,
                               "elevation_m":  -2525.48,
                               "tilt_deg":  6.17
                           },
                           {
                               "sol":  632,
                               "lat":  18.451331,
                               "lon":  77.401257,
                               "elevation_m":  -2525.28,
                               "tilt_deg":  6.15
                           },
                           {
                               "sol":  641,
                               "lat":  18.450072,
                               "lon":  77.401762,
                               "elevation_m":  -2525.91,
                               "tilt_deg":  5.13
                           },
                           {
                               "sol":  641,
                               "lat":  18.450037,
                               "lon":  77.401831,
                               "elevation_m":  -2526.25,
                               "tilt_deg":  5.16
                           },
                           {
                               "sol":  645,
                               "lat":  18.450176,
                               "lon":  77.402935,
                               "elevation_m":  -2532.09,
                               "tilt_deg":  8.19
                           },
                           {
                               "sol":  646,
                               "lat":  18.450301,
                               "lon":  77.404738,
                               "elevation_m":  -2540.68,
                               "tilt_deg":  2.88
                           },
                           {
                               "sol":  647,
                               "lat":  18.451193,
                               "lon":  77.405124,
                               "elevation_m":  -2543.43,
                               "tilt_deg":  3.82
                           },
                           {
                               "sol":  648,
                               "lat":  18.452516,
                               "lon":  77.407202,
                               "elevation_m":  -2545.16,
                               "tilt_deg":  1.59
                           },
                           {
                               "sol":  652,
                               "lat":  18.452554,
                               "lon":  77.407713,
                               "elevation_m":  -2545.52,
                               "tilt_deg":  1.42
                           },
                           {
                               "sol":  652,
                               "lat":  18.452627,
                               "lon":  77.407756,
                               "elevation_m":  -2545.26,
                               "tilt_deg":  1.23
                           },
                           {
                               "sol":  654,
                               "lat":  18.452584,
                               "lon":  77.407731,
                               "elevation_m":  -2545.38,
                               "tilt_deg":  1.48
                           },
                           {
                               "sol":  654,
                               "lat":  18.452523,
                               "lon":  77.407847,
                               "elevation_m":  -2545.48,
                               "tilt_deg":  0.61
                           },
                           {
                               "sol":  658,
                               "lat":  18.4525,
                               "lon":  77.407892,
                               "elevation_m":  -2545.59,
                               "tilt_deg":  0.89
                           },
                           {
                               "sol":  658,
                               "lat":  18.45267,
                               "lon":  77.408056,
                               "elevation_m":  -2545.31,
                               "tilt_deg":  0.97
                           },
                           {
                               "sol":  663,
                               "lat":  18.452684,
                               "lon":  77.408105,
                               "elevation_m":  -2545.3,
                               "tilt_deg":  0.58
                           },
                           {
                               "sol":  663,
                               "lat":  18.452722,
                               "lon":  77.408073,
                               "elevation_m":  -2545.24,
                               "tilt_deg":  0.94
                           },
                           {
                               "sol":  663,
                               "lat":  18.452766,
                               "lon":  77.408078,
                               "elevation_m":  -2545.18,
                               "tilt_deg":  0.63
                           },
                           {
                               "sol":  667,
                               "lat":  18.452718,
                               "lon":  77.408073,
                               "elevation_m":  -2545.24,
                               "tilt_deg":  0.85
                           },
                           {
                               "sol":  667,
                               "lat":  18.452724,
                               "lon":  77.4082,
                               "elevation_m":  -2545.27,
                               "tilt_deg":  0.67
                           },
                           {
                               "sol":  670,
                               "lat":  18.452728,
                               "lon":  77.408251,
                               "elevation_m":  -2545.27,
                               "tilt_deg":  0.9
                           },
                           {
                               "sol":  670,
                               "lat":  18.452813,
                               "lon":  77.408244,
                               "elevation_m":  -2545.1,
                               "tilt_deg":  0.27
                           },
                           {
                               "sol":  674,
                               "lat":  18.452765,
                               "lon":  77.408246,
                               "elevation_m":  -2545.24,
                               "tilt_deg":  1.21
                           },
                           {
                               "sol":  674,
                               "lat":  18.452728,
                               "lon":  77.408336,
                               "elevation_m":  -2545.44,
                               "tilt_deg":  0.63
                           },
                           {
                               "sol":  678,
                               "lat":  18.452709,
                               "lon":  77.408383,
                               "elevation_m":  -2545.27,
                               "tilt_deg":  0.28
                           },
                           {
                               "sol":  678,
                               "lat":  18.452927,
                               "lon":  77.408472,
                               "elevation_m":  -2545.22,
                               "tilt_deg":  0.98
                           },
                           {
                               "sol":  678,
                               "lat":  18.453005,
                               "lon":  77.408505,
                               "elevation_m":  -2545.09,
                               "tilt_deg":  0.61
                           },
                           {
                               "sol":  681,
                               "lat":  18.45296,
                               "lon":  77.408486,
                               "elevation_m":  -2545.12,
                               "tilt_deg":  0.64
                           },
                           {
                               "sol":  681,
                               "lat":  18.453066,
                               "lon":  77.408601,
                               "elevation_m":  -2545.28,
                               "tilt_deg":  0.9
                           },
                           {
                               "sol":  684,
                               "lat":  18.453113,
                               "lon":  77.408592,
                               "elevation_m":  -2545.27,
                               "tilt_deg":  0.66
                           },
                           {
                               "sol":  684,
                               "lat":  18.453365,
                               "lon":  77.408448,
                               "elevation_m":  -2545.2,
                               "tilt_deg":  1.19
                           },
                           {
                               "sol":  686,
                               "lat":  18.453372,
                               "lon":  77.408447,
                               "elevation_m":  -2545.2,
                               "tilt_deg":  1.2
                           },
                           {
                               "sol":  693,
                               "lat":  18.45342,
                               "lon":  77.408438,
                               "elevation_m":  -2545.13,
                               "tilt_deg":  1.03
                           },
                           {
                               "sol":  693,
                               "lat":  18.45342,
                               "lon":  77.408438,
                               "elevation_m":  -2545.14,
                               "tilt_deg":  0.82
                           },
                           {
                               "sol":  693,
                               "lat":  18.454176,
                               "lon":  77.408448,
                               "elevation_m":  -2544.49,
                               "tilt_deg":  0.77
                           },
                           {
                               "sol":  694,
                               "lat":  18.457224,
                               "lon":  77.408784,
                               "elevation_m":  -2539.44,
                               "tilt_deg":  5.53
                           },
                           {
                               "sol":  695,
                               "lat":  18.457391,
                               "lon":  77.408804,
                               "elevation_m":  -2538.49,
                               "tilt_deg":  6.45
                           },
                           {
                               "sol":  698,
                               "lat":  18.457887,
                               "lon":  77.40863,
                               "elevation_m":  -2532.34,
                               "tilt_deg":  12.84
                           },
                           {
                               "sol":  698,
                               "lat":  18.457964,
                               "lon":  77.408643,
                               "elevation_m":  -2531.42,
                               "tilt_deg":  17.36
                           },
                           {
                               "sol":  700,
                               "lat":  18.458109,
                               "lon":  77.408763,
                               "elevation_m":  -2528.16,
                               "tilt_deg":  20.33
                           },
                           {
                               "sol":  702,
                               "lat":  18.458214,
                               "lon":  77.408696,
                               "elevation_m":  -2526.58,
                               "tilt_deg":  10.52
                           },
                           {
                               "sol":  706,
                               "lat":  18.458219,
                               "lon":  77.408694,
                               "elevation_m":  -2526.41,
                               "tilt_deg":  10.73
                           },
                           {
                               "sol":  707,
                               "lat":  18.458622,
                               "lon":  77.408544,
                               "elevation_m":  -2522.91,
                               "tilt_deg":  8.2
                           },
                           {
                               "sol":  707,
                               "lat":  18.458642,
                               "lon":  77.408457,
                               "elevation_m":  -2522.82,
                               "tilt_deg":  8.93
                           },
                           {
                               "sol":  708,
                               "lat":  18.460075,
                               "lon":  77.405842,
                               "elevation_m":  -2509.57,
                               "tilt_deg":  9.51
                           },
                           {
                               "sol":  709,
                               "lat":  18.461671,
                               "lon":  77.402934,
                               "elevation_m":  -2496.77,
                               "tilt_deg":  6.45
                           },
                           {
                               "sol":  713,
                               "lat":  18.46404,
                               "lon":  77.402097,
                               "elevation_m":  -2491.25,
                               "tilt_deg":  4.4
                           },
                           {
                               "sol":  714,
                               "lat":  18.465519,
                               "lon":  77.400638,
                               "elevation_m":  -2490.44,
                               "tilt_deg":  2.35
                           },
                           {
                               "sol":  715,
                               "lat":  18.468606,
                               "lon":  77.399879,
                               "elevation_m":  -2486.95,
                               "tilt_deg":  1.34
                           },
                           {
                               "sol":  716,
                               "lat":  18.471477,
                               "lon":  77.399063,
                               "elevation_m":  -2483.15,
                               "tilt_deg":  3.82
                           },
                           {
                               "sol":  717,
                               "lat":  18.474369,
                               "lon":  77.397434,
                               "elevation_m":  -2478.15,
                               "tilt_deg":  5.99
                           },
                           {
                               "sol":  718,
                               "lat":  18.475371,
                               "lon":  77.394098,
                               "elevation_m":  -2474.94,
                               "tilt_deg":  6.68
                           },
                           {
                               "sol":  719,
                               "lat":  18.475636,
                               "lon":  77.390367,
                               "elevation_m":  -2462.92,
                               "tilt_deg":  8.12
                           },
                           {
                               "sol":  721,
                               "lat":  18.474442,
                               "lon":  77.389816,
                               "elevation_m":  -2459.04,
                               "tilt_deg":  9.49
                           },
                           {
                               "sol":  726,
                               "lat":  18.474442,
                               "lon":  77.389816,
                               "elevation_m":  -2459.04,
                               "tilt_deg":  9.57
                           },
                           {
                               "sol":  727,
                               "lat":  18.474442,
                               "lon":  77.389816,
                               "elevation_m":  -2459.04,
                               "tilt_deg":  9.46
                           },
                           {
                               "sol":  731,
                               "lat":  18.474607,
                               "lon":  77.388808,
                               "elevation_m":  -2462.44,
                               "tilt_deg":  2.07
                           },
                           {
                               "sol":  731,
                               "lat":  18.472929,
                               "lon":  77.386751,
                               "elevation_m":  -2455.25,
                               "tilt_deg":  3.5
                           },
                           {
                               "sol":  732,
                               "lat":  18.470368,
                               "lon":  77.384292,
                               "elevation_m":  -2449.14,
                               "tilt_deg":  1.54
                           },
                           {
                               "sol":  736,
                               "lat":  18.470196,
                               "lon":  77.384074,
                               "elevation_m":  -2449.05,
                               "tilt_deg":  4.54
                           },
                           {
                               "sol":  736,
                               "lat":  18.470212,
                               "lon":  77.383988,
                               "elevation_m":  -2449.08,
                               "tilt_deg":  3.43
                           },
                           {
                               "sol":  736,
                               "lat":  18.470212,
                               "lon":  77.383988,
                               "elevation_m":  -2449.08,
                               "tilt_deg":  3.45
                           },
                           {
                               "sol":  753,
                               "lat":  18.470388,
                               "lon":  77.379312,
                               "elevation_m":  -2442.58,
                               "tilt_deg":  7.49
                           },
                           {
                               "sol":  755,
                               "lat":  18.471355,
                               "lon":  77.377606,
                               "elevation_m":  -2437.56,
                               "tilt_deg":  7.37
                           },
                           {
                               "sol":  755,
                               "lat":  18.471346,
                               "lon":  77.377372,
                               "elevation_m":  -2436.93,
                               "tilt_deg":  9.14
                           },
                           {
                               "sol":  759,
                               "lat":  18.473682,
                               "lon":  77.379889,
                               "elevation_m":  -2441.55,
                               "tilt_deg":  1.83
                           },
                           {
                               "sol":  762,
                               "lat":  18.473931,
                               "lon":  77.37705,
                               "elevation_m":  -2433.39,
                               "tilt_deg":  5.3
                           },
                           {
                               "sol":  763,
                               "lat":  18.475497,
                               "lon":  77.373643,
                               "elevation_m":  -2422.17,
                               "tilt_deg":  14.29
                           },
                           {
                               "sol":  764,
                               "lat":  18.477013,
                               "lon":  77.371323,
                               "elevation_m":  -2420.71,
                               "tilt_deg":  1.06
                           },
                           {
                               "sol":  765,
                               "lat":  18.479061,
                               "lon":  77.369507,
                               "elevation_m":  -2420.49,
                               "tilt_deg":  1.4
                           },
                           {
                               "sol":  766,
                               "lat":  18.479855,
                               "lon":  77.369255,
                               "elevation_m":  -2419.93,
                               "tilt_deg":  3.53
                           },
                           {
                               "sol":  766,
                               "lat":  18.479893,
                               "lon":  77.36927,
                               "elevation_m":  -2419.89,
                               "tilt_deg":  2.05
                           },
                           {
                               "sol":  768,
                               "lat":  18.481268,
                               "lon":  77.369104,
                               "elevation_m":  -2421.32,
                               "tilt_deg":  1.7
                           },
                           {
                               "sol":  770,
                               "lat":  18.482929,
                               "lon":  77.369008,
                               "elevation_m":  -2423.83,
                               "tilt_deg":  2.83
                           },
                           {
                               "sol":  775,
                               "lat":  18.482912,
                               "lon":  77.369004,
                               "elevation_m":  -2423.85,
                               "tilt_deg":  4.4
                           },
                           {
                               "sol":  784,
                               "lat":  18.482797,
                               "lon":  77.368694,
                               "elevation_m":  -2422.62,
                               "tilt_deg":  8.65
                           },
                           {
                               "sol":  784,
                               "lat":  18.482727,
                               "lon":  77.368632,
                               "elevation_m":  -2421.57,
                               "tilt_deg":  11.14
                           },
                           {
                               "sol":  793,
                               "lat":  18.48256,
                               "lon":  77.36868,
                               "elevation_m":  -2421.66,
                               "tilt_deg":  13.61
                           },
                           {
                               "sol":  795,
                               "lat":  18.482641,
                               "lon":  77.368645,
                               "elevation_m":  -2421.21,
                               "tilt_deg":  18.28
                           },
                           {
                               "sol":  797,
                               "lat":  18.482666,
                               "lon":  77.368616,
                               "elevation_m":  -2421.07,
                               "tilt_deg":  15.09
                           },
                           {
                               "sol":  816,
                               "lat":  18.483052,
                               "lon":  77.368622,
                               "elevation_m":  -2422.77,
                               "tilt_deg":  9.36
                           },
                           {
                               "sol":  816,
                               "lat":  18.483441,
                               "lon":  77.368548,
                               "elevation_m":  -2422.19,
                               "tilt_deg":  4.33
                           },
                           {
                               "sol":  818,
                               "lat":  18.483155,
                               "lon":  77.36821,
                               "elevation_m":  -2421.21,
                               "tilt_deg":  5.83
                           },
                           {
                               "sol":  818,
                               "lat":  18.483037,
                               "lon":  77.368192,
                               "elevation_m":  -2421.01,
                               "tilt_deg":  4.1
                           },
                           {
                               "sol":  821,
                               "lat":  18.483012,
                               "lon":  77.368285,
                               "elevation_m":  -2421.18,
                               "tilt_deg":  5.24
                           },
                           {
                               "sol":  821,
                               "lat":  18.482988,
                               "lon":  77.368194,
                               "elevation_m":  -2420.79,
                               "tilt_deg":  9.53
                           },
                           {
                               "sol":  836,
                               "lat":  18.482509,
                               "lon":  77.366697,
                               "elevation_m":  -2416.35,
                               "tilt_deg":  4.02
                           },
                           {
                               "sol":  838,
                               "lat":  18.481268,
                               "lon":  77.36581,
                               "elevation_m":  -2415.56,
                               "tilt_deg":  2.33
                           },
                           {
                               "sol":  843,
                               "lat":  18.481429,
                               "lon":  77.365726,
                               "elevation_m":  -2415.46,
                               "tilt_deg":  1.56
                           },
                           {
                               "sol":  843,
                               "lat":  18.481442,
                               "lon":  77.365828,
                               "elevation_m":  -2415.2,
                               "tilt_deg":  6.36
                           },
                           {
                               "sol":  848,
                               "lat":  18.481378,
                               "lon":  77.365749,
                               "elevation_m":  -2415.5,
                               "tilt_deg":  1
                           },
                           {
                               "sol":  848,
                               "lat":  18.481415,
                               "lon":  77.365845,
                               "elevation_m":  -2415.19,
                               "tilt_deg":  4.35
                           },
                           {
                               "sol":  854,
                               "lat":  18.481149,
                               "lon":  77.364942,
                               "elevation_m":  -2415.9,
                               "tilt_deg":  3.32
                           },
                           {
                               "sol":  856,
                               "lat":  18.481134,
                               "lon":  77.364781,
                               "elevation_m":  -2415.89,
                               "tilt_deg":  1.01
                           },
                           {
                               "sol":  856,
                               "lat":  18.481089,
                               "lon":  77.364706,
                               "elevation_m":  -2415.7,
                               "tilt_deg":  4.93
                           },
                           {
                               "sol":  866,
                               "lat":  18.481028,
                               "lon":  77.362993,
                               "elevation_m":  -2415.35,
                               "tilt_deg":  3.09
                           },
                           {
                               "sol":  868,
                               "lat":  18.481135,
                               "lon":  77.361561,
                               "elevation_m":  -2416.88,
                               "tilt_deg":  6.72
                           },
                           {
                               "sol":  870,
                               "lat":  18.482561,
                               "lon":  77.360571,
                               "elevation_m":  -2418.54,
                               "tilt_deg":  1.23
                           },
                           {
                               "sol":  871,
                               "lat":  18.482848,
                               "lon":  77.360574,
                               "elevation_m":  -2418.1,
                               "tilt_deg":  2.03
                           },
                           {
                               "sol":  871,
                               "lat":  18.483747,
                               "lon":  77.360509,
                               "elevation_m":  -2417.8,
                               "tilt_deg":  3.6
                           },
                           {
                               "sol":  872,
                               "lat":  18.483805,
                               "lon":  77.36051,
                               "elevation_m":  -2418,
                               "tilt_deg":  4.72
                           },
                           {
                               "sol":  884,
                               "lat":  18.483092,
                               "lon":  77.360196,
                               "elevation_m":  -2417.45,
                               "tilt_deg":  1.48
                           },
                           {
                               "sol":  885,
                               "lat":  18.480807,
                               "lon":  77.360101,
                               "elevation_m":  -2420.58,
                               "tilt_deg":  0.8
                           },
                           {
                               "sol":  886,
                               "lat":  18.480793,
                               "lon":  77.360086,
                               "elevation_m":  -2420.6,
                               "tilt_deg":  0.92
                           },
                           {
                               "sol":  896,
                               "lat":  18.482615,
                               "lon":  77.35836,
                               "elevation_m":  -2414.7,
                               "tilt_deg":  1.62
                           },
                           {
                               "sol":  897,
                               "lat":  18.482615,
                               "lon":  77.358361,
                               "elevation_m":  -2414.7,
                               "tilt_deg":  1.62
                           },
                           {
                               "sol":  899,
                               "lat":  18.482646,
                               "lon":  77.358464,
                               "elevation_m":  -2414.79,
                               "tilt_deg":  2.1
                           },
                           {
                               "sol":  903,
                               "lat":  18.482501,
                               "lon":  77.358235,
                               "elevation_m":  -2414.73,
                               "tilt_deg":  3.72
                           },
                           {
                               "sol":  905,
                               "lat":  18.482603,
                               "lon":  77.35777,
                               "elevation_m":  -2414.45,
                               "tilt_deg":  5.18
                           },
                           {
                               "sol":  907,
                               "lat":  18.482525,
                               "lon":  77.357647,
                               "elevation_m":  -2414.29,
                               "tilt_deg":  8.08
                           },
                           {
                               "sol":  907,
                               "lat":  18.482463,
                               "lon":  77.35771,
                               "elevation_m":  -2414.78,
                               "tilt_deg":  2.64
                           },
                           {
                               "sol":  907,
                               "lat":  18.482377,
                               "lon":  77.357718,
                               "elevation_m":  -2414.92,
                               "tilt_deg":  3.46
                           },
                           {
                               "sol":  909,
                               "lat":  18.483218,
                               "lon":  77.352829,
                               "elevation_m":  -2415.88,
                               "tilt_deg":  6.64
                           },
                           {
                               "sol":  909,
                               "lat":  18.483288,
                               "lon":  77.350704,
                               "elevation_m":  -2422.61,
                               "tilt_deg":  2.25
                           },
                           {
                               "sol":  911,
                               "lat":  18.483439,
                               "lon":  77.350783,
                               "elevation_m":  -2423.55,
                               "tilt_deg":  1.18
                           },
                           {
                               "sol":  911,
                               "lat":  18.483443,
                               "lon":  77.350694,
                               "elevation_m":  -2423.31,
                               "tilt_deg":  0.28
                           },
                           {
                               "sol":  925,
                               "lat":  18.48342,
                               "lon":  77.350551,
                               "elevation_m":  -2423.27,
                               "tilt_deg":  6.33
                           },
                           {
                               "sol":  926,
                               "lat":  18.485232,
                               "lon":  77.350589,
                               "elevation_m":  -2420.8,
                               "tilt_deg":  2.42
                           },
                           {
                               "sol":  927,
                               "lat":  18.488038,
                               "lon":  77.349633,
                               "elevation_m":  -2413.14,
                               "tilt_deg":  3.16
                           },
                           {
                               "sol":  929,
                               "lat":  18.486993,
                               "lon":  77.349124,
                               "elevation_m":  -2415.49,
                               "tilt_deg":  1.33
                           },
                           {
                               "sol":  931,
                               "lat":  18.487151,
                               "lon":  77.347995,
                               "elevation_m":  -2413.6,
                               "tilt_deg":  5.64
                           },
                           {
                               "sol":  932,
                               "lat":  18.488701,
                               "lon":  77.346925,
                               "elevation_m":  -2407.81,
                               "tilt_deg":  2.61
                           },
                           {
                               "sol":  933,
                               "lat":  18.488715,
                               "lon":  77.347043,
                               "elevation_m":  -2407.66,
                               "tilt_deg":  1.75
                           },
                           {
                               "sol":  950,
                               "lat":  18.489649,
                               "lon":  77.347221,
                               "elevation_m":  -2406.68,
                               "tilt_deg":  2.8
                           },
                           {
                               "sol":  950,
                               "lat":  18.492202,
                               "lon":  77.348353,
                               "elevation_m":  -2403.96,
                               "tilt_deg":  6.29
                           },
                           {
                               "sol":  952,
                               "lat":  18.49432,
                               "lon":  77.347704,
                               "elevation_m":  -2399.79,
                               "tilt_deg":  5.14
                           },
                           {
                               "sol":  957,
                               "lat":  18.494332,
                               "lon":  77.347838,
                               "elevation_m":  -2399.61,
                               "tilt_deg":  7.8
                           },
                           {
                               "sol":  958,
                               "lat":  18.495513,
                               "lon":  77.347153,
                               "elevation_m":  -2397.25,
                               "tilt_deg":  4.83
                           },
                           {
                               "sol":  959,
                               "lat":  18.496502,
                               "lon":  77.351624,
                               "elevation_m":  -2408.57,
                               "tilt_deg":  2.2
                           },
                           {
                               "sol":  960,
                               "lat":  18.49651,
                               "lon":  77.352337,
                               "elevation_m":  -2407.28,
                               "tilt_deg":  3.44
                           },
                           {
                               "sol":  991,
                               "lat":  18.49655,
                               "lon":  77.352211,
                               "elevation_m":  -2407.49,
                               "tilt_deg":  6.38
                           },
                           {
                               "sol":  993,
                               "lat":  18.497549,
                               "lon":  77.351413,
                               "elevation_m":  -2410.61,
                               "tilt_deg":  0.54
                           },
                           {
                               "sol":  994,
                               "lat":  18.499663,
                               "lon":  77.351307,
                               "elevation_m":  -2419.2,
                               "tilt_deg":  8.51
                           },
                           {
                               "sol":  997,
                               "lat":  18.498788,
                               "lon":  77.350831,
                               "elevation_m":  -2418.28,
                               "tilt_deg":  2.61
                           },
                           {
                               "sol":  997,
                               "lat":  18.498453,
                               "lon":  77.349399,
                               "elevation_m":  -2414.63,
                               "tilt_deg":  6.38
                           },
                           {
                               "sol":  998,
                               "lat":  18.498036,
                               "lon":  77.349066,
                               "elevation_m":  -2411.33,
                               "tilt_deg":  10.93
                           },
                           {
                               "sol":  999,
                               "lat":  18.495486,
                               "lon":  77.346877,
                               "elevation_m":  -2396.85,
                               "tilt_deg":  3.52
                           },
                           {
                               "sol":  1000,
                               "lat":  18.495396,
                               "lon":  77.346647,
                               "elevation_m":  -2398.47,
                               "tilt_deg":  8.34
                           },
                           {
                               "sol":  1001,
                               "lat":  18.49522,
                               "lon":  77.346371,
                               "elevation_m":  -2400.62,
                               "tilt_deg":  8.51
                           },
                           {
                               "sol":  1002,
                               "lat":  18.494223,
                               "lon":  77.34474,
                               "elevation_m":  -2409.94,
                               "tilt_deg":  5.27
                           },
                           {
                               "sol":  1004,
                               "lat":  18.494295,
                               "lon":  77.344629,
                               "elevation_m":  -2409.45,
                               "tilt_deg":  7.01
                           },
                           {
                               "sol":  1006,
                               "lat":  18.494854,
                               "lon":  77.344338,
                               "elevation_m":  -2408,
                               "tilt_deg":  9.76
                           },
                           {
                               "sol":  1007,
                               "lat":  18.492692,
                               "lon":  77.342179,
                               "elevation_m":  -2409.58,
                               "tilt_deg":  3.46
                           },
                           {
                               "sol":  1018,
                               "lat":  18.49271,
                               "lon":  77.339556,
                               "elevation_m":  -2407.91,
                               "tilt_deg":  8.06
                           },
                           {
                               "sol":  1019,
                               "lat":  18.492662,
                               "lon":  77.340046,
                               "elevation_m":  -2407.92,
                               "tilt_deg":  4.66
                           },
                           {
                               "sol":  1021,
                               "lat":  18.492448,
                               "lon":  77.33954,
                               "elevation_m":  -2405.97,
                               "tilt_deg":  5.51
                           },
                           {
                               "sol":  1041,
                               "lat":  18.492584,
                               "lon":  77.337284,
                               "elevation_m":  -2407.7,
                               "tilt_deg":  1.6
                           },
                           {
                               "sol":  1042,
                               "lat":  18.492921,
                               "lon":  77.336127,
                               "elevation_m":  -2402.31,
                               "tilt_deg":  9.12
                           },
                           {
                               "sol":  1043,
                               "lat":  18.493005,
                               "lon":  77.335929,
                               "elevation_m":  -2401.71,
                               "tilt_deg":  3.15
                           },
                           {
                               "sol":  1043,
                               "lat":  18.493005,
                               "lon":  77.335877,
                               "elevation_m":  -2401.19,
                               "tilt_deg":  5.75
                           },
                           {
                               "sol":  1045,
                               "lat":  18.492746,
                               "lon":  77.335108,
                               "elevation_m":  -2401.17,
                               "tilt_deg":  4
                           },
                           {
                               "sol":  1045,
                               "lat":  18.493099,
                               "lon":  77.333158,
                               "elevation_m":  -2399.12,
                               "tilt_deg":  0.32
                           },
                           {
                               "sol":  1046,
                               "lat":  18.491118,
                               "lon":  77.331012,
                               "elevation_m":  -2391.03,
                               "tilt_deg":  5.82
                           },
                           {
                               "sol":  1047,
                               "lat":  18.490915,
                               "lon":  77.329518,
                               "elevation_m":  -2384.83,
                               "tilt_deg":  5.02
                           },
                           {
                               "sol":  1049,
                               "lat":  18.491312,
                               "lon":  77.328812,
                               "elevation_m":  -2382.28,
                               "tilt_deg":  7.04
                           },
                           {
                               "sol":  1052,
                               "lat":  18.491493,
                               "lon":  77.327847,
                               "elevation_m":  -2382.07,
                               "tilt_deg":  5.41
                           },
                           {
                               "sol":  1052,
                               "lat":  18.491523,
                               "lon":  77.327034,
                               "elevation_m":  -2380.77,
                               "tilt_deg":  7.14
                           },
                           {
                               "sol":  1055,
                               "lat":  18.491523,
                               "lon":  77.327034,
                               "elevation_m":  -2380.77,
                               "tilt_deg":  7.1
                           },
                           {
                               "sol":  1059,
                               "lat":  18.491512,
                               "lon":  77.326986,
                               "elevation_m":  -2380.33,
                               "tilt_deg":  12.29
                           },
                           {
                               "sol":  1063,
                               "lat":  18.491648,
                               "lon":  77.327363,
                               "elevation_m":  -2383.08,
                               "tilt_deg":  4.13
                           },
                           {
                               "sol":  1066,
                               "lat":  18.491771,
                               "lon":  77.327215,
                               "elevation_m":  -2382.64,
                               "tilt_deg":  2.9
                           },
                           {
                               "sol":  1068,
                               "lat":  18.491821,
                               "lon":  77.327217,
                               "elevation_m":  -2382.91,
                               "tilt_deg":  8.52
                           },
                           {
                               "sol":  1084,
                               "lat":  18.491833,
                               "lon":  77.327203,
                               "elevation_m":  -2383.03,
                               "tilt_deg":  9.22
                           },
                           {
                               "sol":  1092,
                               "lat":  18.4918,
                               "lon":  77.32718,
                               "elevation_m":  -2382.77,
                               "tilt_deg":  9.93
                           },
                           {
                               "sol":  1096,
                               "lat":  18.492122,
                               "lon":  77.326535,
                               "elevation_m":  -2381.97,
                               "tilt_deg":  13.21
                           },
                           {
                               "sol":  1100,
                               "lat":  18.49198,
                               "lon":  77.326246,
                               "elevation_m":  -2379.52,
                               "tilt_deg":  8.89
                           },
                           {
                               "sol":  1101,
                               "lat":  18.490843,
                               "lon":  77.325614,
                               "elevation_m":  -2374.63,
                               "tilt_deg":  1.21
                           },
                           {
                               "sol":  1102,
                               "lat":  18.490812,
                               "lon":  77.325374,
                               "elevation_m":  -2375.04,
                               "tilt_deg":  3.2
                           },
                           {
                               "sol":  1103,
                               "lat":  18.490865,
                               "lon":  77.324588,
                               "elevation_m":  -2372.85,
                               "tilt_deg":  8.06
                           },
                           {
                               "sol":  1106,
                               "lat":  18.49087,
                               "lon":  77.324571,
                               "elevation_m":  -2372.67,
                               "tilt_deg":  10.55
                           },
                           {
                               "sol":  1108,
                               "lat":  18.4908,
                               "lon":  77.32417,
                               "elevation_m":  -2370.8,
                               "tilt_deg":  4.81
                           },
                           {
                               "sol":  1108,
                               "lat":  18.490598,
                               "lon":  77.324074,
                               "elevation_m":  -2369.99,
                               "tilt_deg":  4.47
                           },
                           {
                               "sol":  1109,
                               "lat":  18.490989,
                               "lon":  77.323543,
                               "elevation_m":  -2369.41,
                               "tilt_deg":  6.82
                           },
                           {
                               "sol":  1110,
                               "lat":  18.490964,
                               "lon":  77.323211,
                               "elevation_m":  -2368.71,
                               "tilt_deg":  5.21
                           },
                           {
                               "sol":  1114,
                               "lat":  18.491134,
                               "lon":  77.322787,
                               "elevation_m":  -2370.79,
                               "tilt_deg":  3.19
                           },
                           {
                               "sol":  1115,
                               "lat":  18.490481,
                               "lon":  77.322294,
                               "elevation_m":  -2369.96,
                               "tilt_deg":  7.19
                           },
                           {
                               "sol":  1116,
                               "lat":  18.490493,
                               "lon":  77.321404,
                               "elevation_m":  -2366.89,
                               "tilt_deg":  12.93
                           },
                           {
                               "sol":  1117,
                               "lat":  18.489529,
                               "lon":  77.321502,
                               "elevation_m":  -2362.47,
                               "tilt_deg":  8.23
                           },
                           {
                               "sol":  1118,
                               "lat":  18.48896,
                               "lon":  77.321448,
                               "elevation_m":  -2359.54,
                               "tilt_deg":  3.81
                           },
                           {
                               "sol":  1120,
                               "lat":  18.488754,
                               "lon":  77.320907,
                               "elevation_m":  -2357.18,
                               "tilt_deg":  3.94
                           },
                           {
                               "sol":  1120,
                               "lat":  18.48854,
                               "lon":  77.320586,
                               "elevation_m":  -2355.17,
                               "tilt_deg":  7.07
                           },
                           {
                               "sol":  1122,
                               "lat":  18.48934,
                               "lon":  77.320273,
                               "elevation_m":  -2356.22,
                               "tilt_deg":  7.83
                           },
                           {
                               "sol":  1124,
                               "lat":  18.489514,
                               "lon":  77.320221,
                               "elevation_m":  -2356.1,
                               "tilt_deg":  10.87
                           },
                           {
                               "sol":  1129,
                               "lat":  18.489512,
                               "lon":  77.320215,
                               "elevation_m":  -2356.1,
                               "tilt_deg":  12.07
                           },
                           {
                               "sol":  1131,
                               "lat":  18.489386,
                               "lon":  77.320064,
                               "elevation_m":  -2354.68,
                               "tilt_deg":  8.84
                           },
                           {
                               "sol":  1134,
                               "lat":  18.489854,
                               "lon":  77.319699,
                               "elevation_m":  -2356.85,
                               "tilt_deg":  4.53
                           },
                           {
                               "sol":  1134,
                               "lat":  18.489938,
                               "lon":  77.319693,
                               "elevation_m":  -2357.12,
                               "tilt_deg":  5.91
                           },
                           {
                               "sol":  1136,
                               "lat":  18.490035,
                               "lon":  77.319152,
                               "elevation_m":  -2356.3,
                               "tilt_deg":  5.96
                           },
                           {
                               "sol":  1136,
                               "lat":  18.490058,
                               "lon":  77.319054,
                               "elevation_m":  -2355.97,
                               "tilt_deg":  4.1
                           },
                           {
                               "sol":  1137,
                               "lat":  18.490054,
                               "lon":  77.318603,
                               "elevation_m":  -2354.86,
                               "tilt_deg":  6.69
                           },
                           {
                               "sol":  1137,
                               "lat":  18.490002,
                               "lon":  77.318482,
                               "elevation_m":  -2354.19,
                               "tilt_deg":  8.83
                           },
                           {
                               "sol":  1138,
                               "lat":  18.489919,
                               "lon":  77.318056,
                               "elevation_m":  -2352.59,
                               "tilt_deg":  8.93
                           },
                           {
                               "sol":  1138,
                               "lat":  18.489899,
                               "lon":  77.318008,
                               "elevation_m":  -2352.06,
                               "tilt_deg":  12.31
                           },
                           {
                               "sol":  1140,
                               "lat":  18.489897,
                               "lon":  77.317431,
                               "elevation_m":  -2351.3,
                               "tilt_deg":  4.67
                           },
                           {
                               "sol":  1140,
                               "lat":  18.489878,
                               "lon":  77.317222,
                               "elevation_m":  -2350.54,
                               "tilt_deg":  3.57
                           },
                           {
                               "sol":  1142,
                               "lat":  18.490003,
                               "lon":  77.316079,
                               "elevation_m":  -2352.57,
                               "tilt_deg":  15.75
                           },
                           {
                               "sol":  1143,
                               "lat":  18.489801,
                               "lon":  77.31551,
                               "elevation_m":  -2349.28,
                               "tilt_deg":  7.59
                           },
                           {
                               "sol":  1144,
                               "lat":  18.490128,
                               "lon":  77.314987,
                               "elevation_m":  -2350.54,
                               "tilt_deg":  3.89
                           },
                           {
                               "sol":  1144,
                               "lat":  18.490175,
                               "lon":  77.31491,
                               "elevation_m":  -2350.28,
                               "tilt_deg":  2.75
                           },
                           {
                               "sol":  1145,
                               "lat":  18.490202,
                               "lon":  77.314438,
                               "elevation_m":  -2350.14,
                               "tilt_deg":  11.57
                           },
                           {
                               "sol":  1145,
                               "lat":  18.490276,
                               "lon":  77.314316,
                               "elevation_m":  -2350.7,
                               "tilt_deg":  11.05
                           },
                           {
                               "sol":  1145,
                               "lat":  18.490317,
                               "lon":  77.314235,
                               "elevation_m":  -2350.77,
                               "tilt_deg":  14.49
                           },
                           {
                               "sol":  1148,
                               "lat":  18.49051,
                               "lon":  77.313742,
                               "elevation_m":  -2351.91,
                               "tilt_deg":  14.41
                           },
                           {
                               "sol":  1148,
                               "lat":  18.490566,
                               "lon":  77.313672,
                               "elevation_m":  -2352.25,
                               "tilt_deg":  14.36
                           },
                           {
                               "sol":  1150,
                               "lat":  18.490711,
                               "lon":  77.31359,
                               "elevation_m":  -2353.78,
                               "tilt_deg":  14.55
                           },
                           {
                               "sol":  1154,
                               "lat":  18.490711,
                               "lon":  77.313597,
                               "elevation_m":  -2353.78,
                               "tilt_deg":  17.88
                           },
                           {
                               "sol":  1156,
                               "lat":  18.490801,
                               "lon":  77.313333,
                               "elevation_m":  -2353.77,
                               "tilt_deg":  15.7
                           },
                           {
                               "sol":  1157,
                               "lat":  18.490958,
                               "lon":  77.313158,
                               "elevation_m":  -2356.09,
                               "tilt_deg":  14.18
                           },
                           {
                               "sol":  1158,
                               "lat":  18.491286,
                               "lon":  77.312809,
                               "elevation_m":  -2362.29,
                               "tilt_deg":  10.51
                           },
                           {
                               "sol":  1158,
                               "lat":  18.491349,
                               "lon":  77.312746,
                               "elevation_m":  -2362.87,
                               "tilt_deg":  11.44
                           },
                           {
                               "sol":  1159,
                               "lat":  18.491532,
                               "lon":  77.312643,
                               "elevation_m":  -2364.18,
                               "tilt_deg":  11.18
                           },
                           {
                               "sol":  1159,
                               "lat":  18.491615,
                               "lon":  77.312646,
                               "elevation_m":  -2364.8,
                               "tilt_deg":  6.21
                           },
                           {
                               "sol":  1162,
                               "lat":  18.494086,
                               "lon":  77.314026,
                               "elevation_m":  -2371.05,
                               "tilt_deg":  4.21
                           },
                           {
                               "sol":  1168,
                               "lat":  18.494527,
                               "lon":  77.313944,
                               "elevation_m":  -2371.26,
                               "tilt_deg":  1.95
                           },
                           {
                               "sol":  1168,
                               "lat":  18.496073,
                               "lon":  77.313807,
                               "elevation_m":  -2371.28,
                               "tilt_deg":  5.27
                           },
                           {
                               "sol":  1170,
                               "lat":  18.495703,
                               "lon":  77.31278,
                               "elevation_m":  -2368.33,
                               "tilt_deg":  1.9
                           },
                           {
                               "sol":  1170,
                               "lat":  18.495497,
                               "lon":  77.311731,
                               "elevation_m":  -2366.2,
                               "tilt_deg":  1.34
                           },
                           {
                               "sol":  1171,
                               "lat":  18.495201,
                               "lon":  77.308325,
                               "elevation_m":  -2361.26,
                               "tilt_deg":  0.36
                           },
                           {
                               "sol":  1174,
                               "lat":  18.495001,
                               "lon":  77.306281,
                               "elevation_m":  -2360.11,
                               "tilt_deg":  2.99
                           },
                           {
                               "sol":  1175,
                               "lat":  18.495206,
                               "lon":  77.303913,
                               "elevation_m":  -2359.79,
                               "tilt_deg":  6.08
                           },
                           {
                               "sol":  1176,
                               "lat":  18.495595,
                               "lon":  77.30382,
                               "elevation_m":  -2361.65,
                               "tilt_deg":  4.81
                           },
                           {
                               "sol":  1176,
                               "lat":  18.495677,
                               "lon":  77.303809,
                               "elevation_m":  -2361.97,
                               "tilt_deg":  2.62
                           },
                           {
                               "sol":  1177,
                               "lat":  18.496003,
                               "lon":  77.30386,
                               "elevation_m":  -2363.06,
                               "tilt_deg":  1.36
                           },
                           {
                               "sol":  1177,
                               "lat":  18.496112,
                               "lon":  77.303836,
                               "elevation_m":  -2362.85,
                               "tilt_deg":  2.35
                           },
                           {
                               "sol":  1182,
                               "lat":  18.497182,
                               "lon":  77.305358,
                               "elevation_m":  -2357.7,
                               "tilt_deg":  10.11
                           },
                           {
                               "sol":  1183,
                               "lat":  18.497348,
                               "lon":  77.305322,
                               "elevation_m":  -2355.7,
                               "tilt_deg":  14.31
                           },
                           {
                               "sol":  1185,
                               "lat":  18.497402,
                               "lon":  77.305203,
                               "elevation_m":  -2355.02,
                               "tilt_deg":  13.23
                           },
                           {
                               "sol":  1185,
                               "lat":  18.49747,
                               "lon":  77.305188,
                               "elevation_m":  -2354.31,
                               "tilt_deg":  14.8
                           },
                           {
                               "sol":  1189,
                               "lat":  18.497394,
                               "lon":  77.305113,
                               "elevation_m":  -2355.1,
                               "tilt_deg":  10.43
                           },
                           {
                               "sol":  1189,
                               "lat":  18.497449,
                               "lon":  77.305135,
                               "elevation_m":  -2354.49,
                               "tilt_deg":  12.23
                           },
                           {
                               "sol":  1195,
                               "lat":  18.497443,
                               "lon":  77.305133,
                               "elevation_m":  -2354.49,
                               "tilt_deg":  12.41
                           },
                           {
                               "sol":  1204,
                               "lat":  18.497598,
                               "lon":  77.305129,
                               "elevation_m":  -2352.18,
                               "tilt_deg":  12.33
                           },
                           {
                               "sol":  1206,
                               "lat":  18.497527,
                               "lon":  77.305257,
                               "elevation_m":  -2353.29,
                               "tilt_deg":  10.89
                           },
                           {
                               "sol":  1206,
                               "lat":  18.497545,
                               "lon":  77.305425,
                               "elevation_m":  -2352.93,
                               "tilt_deg":  10.27
                           },
                           {
                               "sol":  1210,
                               "lat":  18.497514,
                               "lon":  77.305274,
                               "elevation_m":  -2353.65,
                               "tilt_deg":  8.35
                           },
                           {
                               "sol":  1210,
                               "lat":  18.497484,
                               "lon":  77.305191,
                               "elevation_m":  -2354.03,
                               "tilt_deg":  17.01
                           },
                           {
                               "sol":  1219,
                               "lat":  18.495985,
                               "lon":  77.303698,
                               "elevation_m":  -2362.93,
                               "tilt_deg":  1.06
                           },
                           {
                               "sol":  1220,
                               "lat":  18.495296,
                               "lon":  77.303723,
                               "elevation_m":  -2360.05,
                               "tilt_deg":  3.78
                           },
                           {
                               "sol":  1224,
                               "lat":  18.494817,
                               "lon":  77.303782,
                               "elevation_m":  -2360.07,
                               "tilt_deg":  0.84
                           },
                           {
                               "sol":  1224,
                               "lat":  18.492999,
                               "lon":  77.303238,
                               "elevation_m":  -2353.77,
                               "tilt_deg":  3.52
                           },
                           {
                               "sol":  1226,
                               "lat":  18.493393,
                               "lon":  77.301093,
                               "elevation_m":  -2355.04,
                               "tilt_deg":  3.7
                           },
                           {
                               "sol":  1227,
                               "lat":  18.493046,
                               "lon":  77.301003,
                               "elevation_m":  -2353.05,
                               "tilt_deg":  6.15
                           },
                           {
                               "sol":  1230,
                               "lat":  18.491903,
                               "lon":  77.30104,
                               "elevation_m":  -2347.36,
                               "tilt_deg":  8.7
                           },
                           {
                               "sol":  1231,
                               "lat":  18.49195,
                               "lon":  77.301089,
                               "elevation_m":  -2347.83,
                               "tilt_deg":  7.46
                           },
                           {
                               "sol":  1244,
                               "lat":  18.49114,
                               "lon":  77.300928,
                               "elevation_m":  -2338.71,
                               "tilt_deg":  7.88
                           },
                           {
                               "sol":  1245,
                               "lat":  18.491086,
                               "lon":  77.300675,
                               "elevation_m":  -2338.08,
                               "tilt_deg":  10.92
                           },
                           {
                               "sol":  1246,
                               "lat":  18.490338,
                               "lon":  77.29992,
                               "elevation_m":  -2324.67,
                               "tilt_deg":  13.83
                           },
                           {
                               "sol":  1247,
                               "lat":  18.489335,
                               "lon":  77.299193,
                               "elevation_m":  -2305.7,
                               "tilt_deg":  16.6
                           },
                           {
                               "sol":  1250,
                               "lat":  18.488917,
                               "lon":  77.298874,
                               "elevation_m":  -2297.73,
                               "tilt_deg":  15.87
                           },
                           {
                               "sol":  1251,
                               "lat":  18.488469,
                               "lon":  77.298597,
                               "elevation_m":  -2288.48,
                               "tilt_deg":  17.22
                           },
                           {
                               "sol":  1252,
                               "lat":  18.487792,
                               "lon":  77.298379,
                               "elevation_m":  -2275.24,
                               "tilt_deg":  17.76
                           },
                           {
                               "sol":  1253,
                               "lat":  18.48774,
                               "lon":  77.29837,
                               "elevation_m":  -2274.28,
                               "tilt_deg":  16.64
                           },
                           {
                               "sol":  1254,
                               "lat":  18.487812,
                               "lon":  77.298497,
                               "elevation_m":  -2276.46,
                               "tilt_deg":  17.86
                           },
                           {
                               "sol":  1254,
                               "lat":  18.48773,
                               "lon":  77.298521,
                               "elevation_m":  -2275.01,
                               "tilt_deg":  18.83
                           },
                           {
                               "sol":  1264,
                               "lat":  18.487234,
                               "lon":  77.298264,
                               "elevation_m":  -2264.55,
                               "tilt_deg":  17.69
                           },
                           {
                               "sol":  1265,
                               "lat":  18.486472,
                               "lon":  77.30001,
                               "elevation_m":  -2267.03,
                               "tilt_deg":  13.63
                           },
                           {
                               "sol":  1266,
                               "lat":  18.486245,
                               "lon":  77.300225,
                               "elevation_m":  -2265.25,
                               "tilt_deg":  12.77
                           },
                           {
                               "sol":  1266,
                               "lat":  18.484194,
                               "lon":  77.300604,
                               "elevation_m":  -2246.67,
                               "tilt_deg":  10.42
                           },
                           {
                               "sol":  1268,
                               "lat":  18.481457,
                               "lon":  77.300262,
                               "elevation_m":  -2220.27,
                               "tilt_deg":  13.14
                           },
                           {
                               "sol":  1270,
                               "lat":  18.479952,
                               "lon":  77.300379,
                               "elevation_m":  -2211.2,
                               "tilt_deg":  13.24
                           },
                           {
                               "sol":  1271,
                               "lat":  18.478598,
                               "lon":  77.30052,
                               "elevation_m":  -2204.58,
                               "tilt_deg":  11.62
                           },
                           {
                               "sol":  1274,
                               "lat":  18.476535,
                               "lon":  77.299194,
                               "elevation_m":  -2180.52,
                               "tilt_deg":  15.23
                           },
                           {
                               "sol":  1278,
                               "lat":  18.473983,
                               "lon":  77.299581,
                               "elevation_m":  -2171.49,
                               "tilt_deg":  10.78
                           },
                           {
                               "sol":  1279,
                               "lat":  18.473983,
                               "lon":  77.299581,
                               "elevation_m":  -2171.49,
                               "tilt_deg":  10.78
                           },
                           {
                               "sol":  1280,
                               "lat":  18.473615,
                               "lon":  77.299145,
                               "elevation_m":  -2163.91,
                               "tilt_deg":  14.67
                           },
                           {
                               "sol":  1280,
                               "lat":  18.473547,
                               "lon":  77.299099,
                               "elevation_m":  -2162.8,
                               "tilt_deg":  16.25
                           },
                           {
                               "sol":  1281,
                               "lat":  18.473442,
                               "lon":  77.299099,
                               "elevation_m":  -2162.07,
                               "tilt_deg":  15.61
                           },
                           {
                               "sol":  1281,
                               "lat":  18.473419,
                               "lon":  77.29901,
                               "elevation_m":  -2160.36,
                               "tilt_deg":  18.27
                           },
                           {
                               "sol":  1283,
                               "lat":  18.47185,
                               "lon":  77.300274,
                               "elevation_m":  -2165.16,
                               "tilt_deg":  13.69
                           },
                           {
                               "sol":  1284,
                               "lat":  18.471611,
                               "lon":  77.299815,
                               "elevation_m":  -2157.69,
                               "tilt_deg":  14.46
                           },
                           {
                               "sol":  1285,
                               "lat":  18.471794,
                               "lon":  77.299204,
                               "elevation_m":  -2151.62,
                               "tilt_deg":  14.95
                           },
                           {
                               "sol":  1286,
                               "lat":  18.471772,
                               "lon":  77.298859,
                               "elevation_m":  -2146.69,
                               "tilt_deg":  14.93
                           },
                           {
                               "sol":  1288,
                               "lat":  18.471737,
                               "lon":  77.298184,
                               "elevation_m":  -2138.08,
                               "tilt_deg":  13.57
                           },
                           {
                               "sol":  1292,
                               "lat":  18.471406,
                               "lon":  77.297039,
                               "elevation_m":  -2121.61,
                               "tilt_deg":  14.76
                           },
                           {
                               "sol":  1293,
                               "lat":  18.470531,
                               "lon":  77.295135,
                               "elevation_m":  -2089.19,
                               "tilt_deg":  13.71
                           },
                           {
                               "sol":  1294,
                               "lat":  18.470675,
                               "lon":  77.294889,
                               "elevation_m":  -2086.38,
                               "tilt_deg":  18.28
                           },
                           {
                               "sol":  1295,
                               "lat":  18.470317,
                               "lon":  77.294718,
                               "elevation_m":  -2081.75,
                               "tilt_deg":  17.02
                           },
                           {
                               "sol":  1298,
                               "lat":  18.469217,
                               "lon":  77.293201,
                               "elevation_m":  -2059.05,
                               "tilt_deg":  11.05
                           },
                           {
                               "sol":  1299,
                               "lat":  18.469001,
                               "lon":  77.293014,
                               "elevation_m":  -2055.64,
                               "tilt_deg":  11.3
                           },
                           {
                               "sol":  1301,
                               "lat":  18.469058,
                               "lon":  77.293072,
                               "elevation_m":  -2056.92,
                               "tilt_deg":  10.97
                           },
                           {
                               "sol":  1301,
                               "lat":  18.469387,
                               "lon":  77.29303,
                               "elevation_m":  -2055.55,
                               "tilt_deg":  17.56
                           },
                           {
                               "sol":  1301,
                               "lat":  18.469467,
                               "lon":  77.293047,
                               "elevation_m":  -2055.82,
                               "tilt_deg":  16.87
                           },
                           {
                               "sol":  1302,
                               "lat":  18.469477,
                               "lon":  77.293055,
                               "elevation_m":  -2056.1,
                               "tilt_deg":  17.7
                           },
                           {
                               "sol":  1305,
                               "lat":  18.467707,
                               "lon":  77.291437,
                               "elevation_m":  -2037.97,
                               "tilt_deg":  9.47
                           },
                           {
                               "sol":  1307,
                               "lat":  18.467921,
                               "lon":  77.291163,
                               "elevation_m":  -2035.29,
                               "tilt_deg":  12.4
                           },
                           {
                               "sol":  1307,
                               "lat":  18.46786,
                               "lon":  77.291101,
                               "elevation_m":  -2033.99,
                               "tilt_deg":  17.34
                           },
                           {
                               "sol":  1308,
                               "lat":  18.467968,
                               "lon":  77.29117,
                               "elevation_m":  -2035.76,
                               "tilt_deg":  12
                           },
                           {
                               "sol":  1308,
                               "lat":  18.467961,
                               "lon":  77.291067,
                               "elevation_m":  -2033.6,
                               "tilt_deg":  18.37
                           },
                           {
                               "sol":  1311,
                               "lat":  18.468727,
                               "lon":  77.291729,
                               "elevation_m":  -2040.37,
                               "tilt_deg":  7.92
                           },
                           {
                               "sol":  1313,
                               "lat":  18.468805,
                               "lon":  77.291764,
                               "elevation_m":  -2040.24,
                               "tilt_deg":  9.42
                           },
                           {
                               "sol":  1318,
                               "lat":  18.467373,
                               "lon":  77.291091,
                               "elevation_m":  -2033.55,
                               "tilt_deg":  9.65
                           },
                           {
                               "sol":  1320,
                               "lat":  18.467763,
                               "lon":  77.291008,
                               "elevation_m":  -2032.26,
                               "tilt_deg":  12.63
                           },
                           {
                               "sol":  1320,
                               "lat":  18.467843,
                               "lon":  77.29098,
                               "elevation_m":  -2031.93,
                               "tilt_deg":  14.14
                           },
                           {
                               "sol":  1321,
                               "lat":  18.467911,
                               "lon":  77.29094,
                               "elevation_m":  -2031.31,
                               "tilt_deg":  20.1
                           },
                           {
                               "sol":  1322,
                               "lat":  18.465914,
                               "lon":  77.290794,
                               "elevation_m":  -2029.26,
                               "tilt_deg":  5.97
                           },
                           {
                               "sol":  1324,
                               "lat":  18.465586,
                               "lon":  77.290804,
                               "elevation_m":  -2028.57,
                               "tilt_deg":  6
                           },
                           {
                               "sol":  1324,
                               "lat":  18.464896,
                               "lon":  77.289241,
                               "elevation_m":  -2015.23,
                               "tilt_deg":  9.84
                           },
                           {
                               "sol":  1326,
                               "lat":  18.464886,
                               "lon":  77.289067,
                               "elevation_m":  -2013.62,
                               "tilt_deg":  9.09
                           },
                           {
                               "sol":  1326,
                               "lat":  18.46455,
                               "lon":  77.287624,
                               "elevation_m":  -1998.72,
                               "tilt_deg":  10.62
                           },
                           {
                               "sol":  1327,
                               "lat":  18.464596,
                               "lon":  77.287477,
                               "elevation_m":  -1997.3,
                               "tilt_deg":  11.53
                           },
                           {
                               "sol":  1332,
                               "lat":  18.465046,
                               "lon":  77.286724,
                               "elevation_m":  -1988.42,
                               "tilt_deg":  2.03
                           },
                           {
                               "sol":  1333,
                               "lat":  18.46511,
                               "lon":  77.286718,
                               "elevation_m":  -1988.45,
                               "tilt_deg":  2.27
                           },
                           {
                               "sol":  1338,
                               "lat":  18.463168,
                               "lon":  77.284733,
                               "elevation_m":  -1970.07,
                               "tilt_deg":  10.03
                           },
                           {
                               "sol":  1339,
                               "lat":  18.462901,
                               "lon":  77.284294,
                               "elevation_m":  -1966.46,
                               "tilt_deg":  7.31
                           },
                           {
                               "sol":  1342,
                               "lat":  18.462779,
                               "lon":  77.283528,
                               "elevation_m":  -1959.86,
                               "tilt_deg":  7.88
                           },
                           {
                               "sol":  1343,
                               "lat":  18.462779,
                               "lon":  77.283528,
                               "elevation_m":  -1959.86,
                               "tilt_deg":  7.88
                           },
                           {
                               "sol":  1347,
                               "lat":  18.462077,
                               "lon":  77.28071,
                               "elevation_m":  -1932.95,
                               "tilt_deg":  9.21
                           },
                           {
                               "sol":  1348,
                               "lat":  18.461469,
                               "lon":  77.278041,
                               "elevation_m":  -1901.53,
                               "tilt_deg":  11.78
                           },
                           {
                               "sol":  1349,
                               "lat":  18.460086,
                               "lon":  77.274662,
                               "elevation_m":  -1860.23,
                               "tilt_deg":  11.03
                           },
                           {
                               "sol":  1351,
                               "lat":  18.459383,
                               "lon":  77.272319,
                               "elevation_m":  -1832.25,
                               "tilt_deg":  11.08
                           },
                           {
                               "sol":  1354,
                               "lat":  18.457528,
                               "lon":  77.268527,
                               "elevation_m":  -1786,
                               "tilt_deg":  9.06
                           },
                           {
                               "sol":  1358,
                               "lat":  18.45894,
                               "lon":  77.267317,
                               "elevation_m":  -1793.89,
                               "tilt_deg":  1.49
                           },
                           {
                               "sol":  1359,
                               "lat":  18.458752,
                               "lon":  77.264912,
                               "elevation_m":  -1811.55,
                               "tilt_deg":  12.49
                           },
                           {
                               "sol":  1362,
                               "lat":  18.460153,
                               "lon":  77.264689,
                               "elevation_m":  -1819.69,
                               "tilt_deg":  15.13
                           },
                           {
                               "sol":  1363,
                               "lat":  18.460463,
                               "lon":  77.264737,
                               "elevation_m":  -1819.82,
                               "tilt_deg":  14.48
                           },
                           {
                               "sol":  1363,
                               "lat":  18.460547,
                               "lon":  77.264739,
                               "elevation_m":  -1820.03,
                               "tilt_deg":  17.92
                           },
                           {
                               "sol":  1380,
                               "lat":  18.459999,
                               "lon":  77.262481,
                               "elevation_m":  -1848.93,
                               "tilt_deg":  12.06
                           },
                           {
                               "sol":  1381,
                               "lat":  18.459869,
                               "lon":  77.262417,
                               "elevation_m":  -1849.56,
                               "tilt_deg":  12.6
                           },
                           {
                               "sol":  1381,
                               "lat":  18.459828,
                               "lon":  77.26249,
                               "elevation_m":  -1848.41,
                               "tilt_deg":  13.36
                           },
                           {
                               "sol":  1397,
                               "lat":  18.460569,
                               "lon":  77.264638,
                               "elevation_m":  -1821.41,
                               "tilt_deg":  13.57
                           },
                           {
                               "sol":  1400,
                               "lat":  18.460553,
                               "lon":  77.264745,
                               "elevation_m":  -1820.03,
                               "tilt_deg":  16.73
                           },
                           {
                               "sol":  1403,
                               "lat":  18.460482,
                               "lon":  77.264706,
                               "elevation_m":  -1820.44,
                               "tilt_deg":  14.11
                           },
                           {
                               "sol":  1403,
                               "lat":  18.460558,
                               "lon":  77.264671,
                               "elevation_m":  -1820.96,
                               "tilt_deg":  11.5
                           },
                           {
                               "sol":  1407,
                               "lat":  18.458848,
                               "lon":  77.264934,
                               "elevation_m":  -1811.63,
                               "tilt_deg":  10.22
                           },
                           {
                               "sol":  1408,
                               "lat":  18.458752,
                               "lon":  77.26488,
                               "elevation_m":  -1812.01,
                               "tilt_deg":  11.84
                           },
                           {
                               "sol":  1411,
                               "lat":  18.458706,
                               "lon":  77.264932,
                               "elevation_m":  -1811.25,
                               "tilt_deg":  12.96
                           },
                           {
                               "sol":  1415,
                               "lat":  18.460499,
                               "lon":  77.264667,
                               "elevation_m":  -1820.99,
                               "tilt_deg":  11.4
                           },
                           {
                               "sol":  1416,
                               "lat":  18.460622,
                               "lon":  77.264644,
                               "elevation_m":  -1821.24,
                               "tilt_deg":  13.24
                           },
                           {
                               "sol":  1429,
                               "lat":  18.460211,
                               "lon":  77.261624,
                               "elevation_m":  -1860.48,
                               "tilt_deg":  14.61
                           },
                           {
                               "sol":  1431,
                               "lat":  18.461407,
                               "lon":  77.2592,
                               "elevation_m":  -1906.71,
                               "tilt_deg":  16.94
                           },
                           {
                               "sol":  1435,
                               "lat":  18.461727,
                               "lon":  77.258503,
                               "elevation_m":  -1918.45,
                               "tilt_deg":  15.6
                           },
                           {
                               "sol":  1445,
                               "lat":  18.461749,
                               "lon":  77.258425,
                               "elevation_m":  -1919.33,
                               "tilt_deg":  16.17
                           },
                           {
                               "sol":  1451,
                               "lat":  18.46223,
                               "lon":  77.257809,
                               "elevation_m":  -1926.96,
                               "tilt_deg":  15.03
                           },
                           {
                               "sol":  1452,
                               "lat":  18.462339,
                               "lon":  77.257768,
                               "elevation_m":  -1926.36,
                               "tilt_deg":  11.39
                           },
                           {
                               "sol":  1454,
                               "lat":  18.462305,
                               "lon":  77.257668,
                               "elevation_m":  -1927.18,
                               "tilt_deg":  17.21
                           },
                           {
                               "sol":  1461,
                               "lat":  18.462305,
                               "lon":  77.25774,
                               "elevation_m":  -1927.04,
                               "tilt_deg":  12.03
                           },
                           {
                               "sol":  1463,
                               "lat":  18.462346,
                               "lon":  77.257736,
                               "elevation_m":  -1926.56,
                               "tilt_deg":  10.39
                           },
                           {
                               "sol":  1468,
                               "lat":  18.4612,
                               "lon":  77.258371,
                               "elevation_m":  -1920.51,
                               "tilt_deg":  16.15
                           },
                           {
                               "sol":  1470,
                               "lat":  18.460885,
                               "lon":  77.257529,
                               "elevation_m":  -1933.8,
                               "tilt_deg":  15.4
                           },
                           {
                               "sol":  1472,
                               "lat":  18.460889,
                               "lon":  77.257271,
                               "elevation_m":  -1938.1,
                               "tilt_deg":  15.13
                           },
                           {
                               "sol":  1477,
                               "lat":  18.462179,
                               "lon":  77.257858,
                               "elevation_m":  -1926.59,
                               "tilt_deg":  14.37
                           },
                           {
                               "sol":  1478,
                               "lat":  18.46223,
                               "lon":  77.257928,
                               "elevation_m":  -1925.48,
                               "tilt_deg":  13.46
                           },
                           {
                               "sol":  1502,
                               "lat":  18.460791,
                               "lon":  77.255666,
                               "elevation_m":  -1959.42,
                               "tilt_deg":  12.08
                           },
                           {
                               "sol":  1503,
                               "lat":  18.460505,
                               "lon":  77.25398,
                               "elevation_m":  -1975,
                               "tilt_deg":  13.17
                           },
                           {
                               "sol":  1509,
                               "lat":  18.457277,
                               "lon":  77.255489,
                               "elevation_m":  -1947.52,
                               "tilt_deg":  10.2
                           },
                           {
                               "sol":  1510,
                               "lat":  18.454103,
                               "lon":  77.255759,
                               "elevation_m":  -1940.57,
                               "tilt_deg":  12.89
                           },
                           {
                               "sol":  1511,
                               "lat":  18.453914,
                               "lon":  77.255872,
                               "elevation_m":  -1939.73,
                               "tilt_deg":  13.45
                           },
                           {
                               "sol":  1511,
                               "lat":  18.452677,
                               "lon":  77.254648,
                               "elevation_m":  -1955.24,
                               "tilt_deg":  8.96
                           },
                           {
                               "sol":  1512,
                               "lat":  18.452484,
                               "lon":  77.252956,
                               "elevation_m":  -1964.36,
                               "tilt_deg":  6.32
                           },
                           {
                               "sol":  1518,
                               "lat":  18.452622,
                               "lon":  77.254577,
                               "elevation_m":  -1956.1,
                               "tilt_deg":  8.66
                           },
                           {
                               "sol":  1519,
                               "lat":  18.453011,
                               "lon":  77.256961,
                               "elevation_m":  -1928.08,
                               "tilt_deg":  16.84
                           },
                           {
                               "sol":  1520,
                               "lat":  18.4542,
                               "lon":  77.257227,
                               "elevation_m":  -1916.44,
                               "tilt_deg":  20.24
                           },
                           {
                               "sol":  1523,
                               "lat":  18.453942,
                               "lon":  77.256015,
                               "elevation_m":  -1937.74,
                               "tilt_deg":  13.58
                           },
                           {
                               "sol":  1524,
                               "lat":  18.453905,
                               "lon":  77.255917,
                               "elevation_m":  -1939.09,
                               "tilt_deg":  13.23
                           },
                           {
                               "sol":  1540,
                               "lat":  18.460621,
                               "lon":  77.255683,
                               "elevation_m":  -1958.82,
                               "tilt_deg":  11.46
                           },
                           {
                               "sol":  1542,
                               "lat":  18.460754,
                               "lon":  77.255635,
                               "elevation_m":  -1959.75,
                               "tilt_deg":  12.14
                           },
                           {
                               "sol":  1549,
                               "lat":  18.460933,
                               "lon":  77.257227,
                               "elevation_m":  -1938.68,
                               "tilt_deg":  14.88
                           },
                           {
                               "sol":  1551,
                               "lat":  18.460917,
                               "lon":  77.257218,
                               "elevation_m":  -1938.95,
                               "tilt_deg":  14.44
                           },
                           {
                               "sol":  1556,
                               "lat":  18.460105,
                               "lon":  77.254579,
                               "elevation_m":  -1967.37,
                               "tilt_deg":  9.49
                           },
                           {
                               "sol":  1558,
                               "lat":  18.459756,
                               "lon":  77.254407,
                               "elevation_m":  -1966.26,
                               "tilt_deg":  6.72
                           },
                           {
                               "sol":  1560,
                               "lat":  18.459467,
                               "lon":  77.254585,
                               "elevation_m":  -1962.77,
                               "tilt_deg":  13.89
                           },
                           {
                               "sol":  1563,
                               "lat":  18.459509,
                               "lon":  77.254503,
                               "elevation_m":  -1963.85,
                               "tilt_deg":  14.83
                           },
                           {
                               "sol":  1570,
                               "lat":  18.459533,
                               "lon":  77.254545,
                               "elevation_m":  -1963.68,
                               "tilt_deg":  12.97
                           },
                           {
                               "sol":  1570,
                               "lat":  18.459467,
                               "lon":  77.254582,
                               "elevation_m":  -1962.77,
                               "tilt_deg":  14.1
                           },
                           {
                               "sol":  1576,
                               "lat":  18.459265,
                               "lon":  77.254244,
                               "elevation_m":  -1965.61,
                               "tilt_deg":  13.85
                           },
                           {
                               "sol":  1576,
                               "lat":  18.455991,
                               "lon":  77.255541,
                               "elevation_m":  -1944.75,
                               "tilt_deg":  12.15
                           },
                           {
                               "sol":  1577,
                               "lat":  18.453014,
                               "lon":  77.25734,
                               "elevation_m":  -1921.95,
                               "tilt_deg":  18.63
                           },
                           {
                               "sol":  1578,
                               "lat":  18.45301,
                               "lon":  77.257976,
                               "elevation_m":  -1910.54,
                               "tilt_deg":  20.68
                           },
                           {
                               "sol":  1579,
                               "lat":  18.453015,
                               "lon":  77.257982,
                               "elevation_m":  -1910.54,
                               "tilt_deg":  19.48
                           },
                           {
                               "sol":  1584,
                               "lat":  18.452782,
                               "lon":  77.257907,
                               "elevation_m":  -1913.8,
                               "tilt_deg":  20.12
                           },
                           {
                               "sol":  1590,
                               "lat":  18.452723,
                               "lon":  77.258118,
                               "elevation_m":  -1910.57,
                               "tilt_deg":  20.51
                           },
                           {
                               "sol":  1592,
                               "lat":  18.451131,
                               "lon":  77.256021,
                               "elevation_m":  -1950.05,
                               "tilt_deg":  8.82
                           },
                           {
                               "sol":  1593,
                               "lat":  18.450762,
                               "lon":  77.255623,
                               "elevation_m":  -1955,
                               "tilt_deg":  11.09
                           },
                           {
                               "sol":  1595,
                               "lat":  18.44903,
                               "lon":  77.25819,
                               "elevation_m":  -1933.63,
                               "tilt_deg":  11.44
                           },
                           {
                               "sol":  1597,
                               "lat":  18.446525,
                               "lon":  77.26097,
                               "elevation_m":  -1911.23,
                               "tilt_deg":  9.28
                           },
                           {
                               "sol":  1601,
                               "lat":  18.447588,
                               "lon":  77.263883,
                               "elevation_m":  -1880.59,
                               "tilt_deg":  15.02
                           },
                           {
                               "sol":  1606,
                               "lat":  18.44754,
                               "lon":  77.264188,
                               "elevation_m":  -1877.29,
                               "tilt_deg":  14.86
                           },
                           {
                               "sol":  1606,
                               "lat":  18.447558,
                               "lon":  77.264276,
                               "elevation_m":  -1876,
                               "tilt_deg":  13.22
                           },
                           {
                               "sol":  1608,
                               "lat":  18.44758,
                               "lon":  77.264334,
                               "elevation_m":  -1875.2,
                               "tilt_deg":  12.28
                           },
                           {
                               "sol":  1615,
                               "lat":  18.447641,
                               "lon":  77.264358,
                               "elevation_m":  -1874.49,
                               "tilt_deg":  13.68
                           },
                           {
                               "sol":  1622,
                               "lat":  18.44769,
                               "lon":  77.26422,
                               "elevation_m":  -1875.73,
                               "tilt_deg":  13.86
                           },
                           {
                               "sol":  1627,
                               "lat":  18.44743,
                               "lon":  77.264361,
                               "elevation_m":  -1875.8,
                               "tilt_deg":  13.42
                           },
                           {
                               "sol":  1627,
                               "lat":  18.447418,
                               "lon":  77.264449,
                               "elevation_m":  -1874.77,
                               "tilt_deg":  14.76
                           },
                           {
                               "sol":  1629,
                               "lat":  18.447486,
                               "lon":  77.264536,
                               "elevation_m":  -1873.13,
                               "tilt_deg":  15.34
                           },
                           {
                               "sol":  1635,
                               "lat":  18.447688,
                               "lon":  77.264219,
                               "elevation_m":  -1875.73,
                               "tilt_deg":  13.84
                           },
                           {
                               "sol":  1642,
                               "lat":  18.44742,
                               "lon":  77.264558,
                               "elevation_m":  -1873.39,
                               "tilt_deg":  14.21
                           },
                           {
                               "sol":  1646,
                               "lat":  18.44808,
                               "lon":  77.264641,
                               "elevation_m":  -1867.68,
                               "tilt_deg":  15.23
                           },
                           {
                               "sol":  1646,
                               "lat":  18.448151,
                               "lon":  77.264688,
                               "elevation_m":  -1866.42,
                               "tilt_deg":  13.74
                           },
                           {
                               "sol":  1647,
                               "lat":  18.448197,
                               "lon":  77.264705,
                               "elevation_m":  -1865.74,
                               "tilt_deg":  15.52
                           },
                           {
                               "sol":  1647,
                               "lat":  18.448315,
                               "lon":  77.264781,
                               "elevation_m":  -1863.76,
                               "tilt_deg":  14.62
                           },
                           {
                               "sol":  1661,
                               "lat":  18.448931,
                               "lon":  77.264818,
                               "elevation_m":  -1856.25,
                               "tilt_deg":  17.33
                           },
                           {
                               "sol":  1661,
                               "lat":  18.449003,
                               "lon":  77.264861,
                               "elevation_m":  -1854.53,
                               "tilt_deg":  18.7
                           },
                           {
                               "sol":  1662,
                               "lat":  18.449065,
                               "lon":  77.264849,
                               "elevation_m":  -1854.08,
                               "tilt_deg":  17.02
                           },
                           {
                               "sol":  1668,
                               "lat":  18.448475,
                               "lon":  77.264784,
                               "elevation_m":  -1862.2,
                               "tilt_deg":  15.44
                           },
                           {
                               "sol":  1668,
                               "lat":  18.44839,
                               "lon":  77.264785,
                               "elevation_m":  -1862.83,
                               "tilt_deg":  15.99
                           },
                           {
                               "sol":  1669,
                               "lat":  18.448312,
                               "lon":  77.264762,
                               "elevation_m":  -1863.98,
                               "tilt_deg":  14.89
                           },
                           {
                               "sol":  1674,
                               "lat":  18.444824,
                               "lon":  77.262394,
                               "elevation_m":  -1902.8,
                               "tilt_deg":  9.57
                           },
                           {
                               "sol":  1675,
                               "lat":  18.444405,
                               "lon":  77.262132,
                               "elevation_m":  -1904.37,
                               "tilt_deg":  10.35
                           },
                           {
                               "sol":  1675,
                               "lat":  18.442043,
                               "lon":  77.260054,
                               "elevation_m":  -1906.65,
                               "tilt_deg":  1.54
                           },
                           {
                               "sol":  1676,
                               "lat":  18.441905,
                               "lon":  77.259659,
                               "elevation_m":  -1909.75,
                               "tilt_deg":  12.55
                           },
                           {
                               "sol":  1686,
                               "lat":  18.437827,
                               "lon":  77.257254,
                               "elevation_m":  -1901.03,
                               "tilt_deg":  4.9
                           },
                           {
                               "sol":  1687,
                               "lat":  18.434002,
                               "lon":  77.256117,
                               "elevation_m":  -1881.76,
                               "tilt_deg":  11.99
                           },
                           {
                               "sol":  1688,
                               "lat":  18.430119,
                               "lon":  77.253172,
                               "elevation_m":  -1862.87,
                               "tilt_deg":  14.42
                           },
                           {
                               "sol":  1690,
                               "lat":  18.42951,
                               "lon":  77.252535,
                               "elevation_m":  -1863.69,
                               "tilt_deg":  12.15
                           },
                           {
                               "sol":  1698,
                               "lat":  18.428625,
                               "lon":  77.249957,
                               "elevation_m":  -1890.04,
                               "tilt_deg":  12.22
                           },
                           {
                               "sol":  1699,
                               "lat":  18.428625,
                               "lon":  77.249957,
                               "elevation_m":  -1890.04,
                               "tilt_deg":  12.18
                           },
                           {
                               "sol":  1700,
                               "lat":  18.428625,
                               "lon":  77.249957,
                               "elevation_m":  -1890.04,
                               "tilt_deg":  12.18
                           },
                           {
                               "sol":  1701,
                               "lat":  18.428328,
                               "lon":  77.245364,
                               "elevation_m":  -1943.82,
                               "tilt_deg":  10.52
                           },
                           {
                               "sol":  1703,
                               "lat":  18.427609,
                               "lon":  77.241724,
                               "elevation_m":  -1974.14,
                               "tilt_deg":  4.42
                           },
                           {
                               "sol":  1704,
                               "lat":  18.427893,
                               "lon":  77.24168,
                               "elevation_m":  -1973.89,
                               "tilt_deg":  3.63
                           },
                           {
                               "sol":  1704,
                               "lat":  18.428023,
                               "lon":  77.241664,
                               "elevation_m":  -1974,
                               "tilt_deg":  5.02
                           },
                           {
                               "sol":  1704,
                               "lat":  18.428103,
                               "lon":  77.241632,
                               "elevation_m":  -1973.88,
                               "tilt_deg":  4.75
                           },
                           {
                               "sol":  1707,
                               "lat":  18.429633,
                               "lon":  77.239215,
                               "elevation_m":  -1981.33,
                               "tilt_deg":  2.44
                           },
                           {
                               "sol":  1709,
                               "lat":  18.427719,
                               "lon":  77.236591,
                               "elevation_m":  -1979.79,
                               "tilt_deg":  7.58
                           },
                           {
                               "sol":  1710,
                               "lat":  18.427599,
                               "lon":  77.235154,
                               "elevation_m":  -1974.63,
                               "tilt_deg":  0.92
                           },
                           {
                               "sol":  1756,
                               "lat":  18.429735,
                               "lon":  77.232471,
                               "elevation_m":  -1960.3,
                               "tilt_deg":  5.12
                           },
                           {
                               "sol":  1758,
                               "lat":  18.429729,
                               "lon":  77.232428,
                               "elevation_m":  -1960.36,
                               "tilt_deg":  3.87
                           },
                           {
                               "sol":  1760,
                               "lat":  18.429732,
                               "lon":  77.23241,
                               "elevation_m":  -1960.43,
                               "tilt_deg":  4.97
                           },
                           {
                               "sol":  1761,
                               "lat":  18.429732,
                               "lon":  77.23241,
                               "elevation_m":  -1960.43,
                               "tilt_deg":  3.03
                           },
                           {
                               "sol":  1762,
                               "lat":  18.429911,
                               "lon":  77.229692,
                               "elevation_m":  -1957.46,
                               "tilt_deg":  8.03
                           },
                           {
                               "sol":  1765,
                               "lat":  18.427034,
                               "lon":  77.227702,
                               "elevation_m":  -1965.22,
                               "tilt_deg":  3.36
                           },
                           {
                               "sol":  1767,
                               "lat":  18.427081,
                               "lon":  77.227629,
                               "elevation_m":  -1964.99,
                               "tilt_deg":  3.95
                           },
                           {
                               "sol":  1775,
                               "lat":  18.427418,
                               "lon":  77.227294,
                               "elevation_m":  -1962.92,
                               "tilt_deg":  8.64
                           },
                           {
                               "sol":  1775,
                               "lat":  18.427419,
                               "lon":  77.227204,
                               "elevation_m":  -1962.63,
                               "tilt_deg":  10.12
                           },
                           {
                               "sol":  1779,
                               "lat":  18.427438,
                               "lon":  77.227,
                               "elevation_m":  -1962.59,
                               "tilt_deg":  9.11
                           },
                           {
                               "sol":  1779,
                               "lat":  18.427519,
                               "lon":  77.227024,
                               "elevation_m":  -1961.76,
                               "tilt_deg":  11.44
                           },
                           {
                               "sol":  1781,
                               "lat":  18.427709,
                               "lon":  77.22686,
                               "elevation_m":  -1959.5,
                               "tilt_deg":  9.68
                           },
                           {
                               "sol":  1783,
                               "lat":  18.427754,
                               "lon":  77.226855,
                               "elevation_m":  -1959.17,
                               "tilt_deg":  11.02
                           },
                           {
                               "sol":  1790,
                               "lat":  18.427653,
                               "lon":  77.226789,
                               "elevation_m":  -1959.69,
                               "tilt_deg":  10.04
                           },
                           {
                               "sol":  1790,
                               "lat":  18.427663,
                               "lon":  77.226731,
                               "elevation_m":  -1959.2,
                               "tilt_deg":  11.69
                           },
                           {
                               "sol":  1790,
                               "lat":  18.427682,
                               "lon":  77.226629,
                               "elevation_m":  -1958.48,
                               "tilt_deg":  10.82
                           },
                           {
                               "sol":  1792,
                               "lat":  18.427725,
                               "lon":  77.22666,
                               "elevation_m":  -1958.19,
                               "tilt_deg":  11.19
                           },
                           {
                               "sol":  1805,
                               "lat":  18.427658,
                               "lon":  77.22674,
                               "elevation_m":  -1959.46,
                               "tilt_deg":  12.81
                           },
                           {
                               "sol":  1805,
                               "lat":  18.427682,
                               "lon":  77.226775,
                               "elevation_m":  -1959.22,
                               "tilt_deg":  10.37
                           },
                           {
                               "sol":  1812,
                               "lat":  18.427622,
                               "lon":  77.226855,
                               "elevation_m":  -1960.47,
                               "tilt_deg":  9.19
                           },
                           {
                               "sol":  1814,
                               "lat":  18.427455,
                               "lon":  77.223171,
                               "elevation_m":  -1954.34,
                               "tilt_deg":  6.19
                           },
                           {
                               "sol":  1815,
                               "lat":  18.430347,
                               "lon":  77.219612,
                               "elevation_m":  -1963.17,
                               "tilt_deg":  7.13
                           },
                           {
                               "sol":  1817,
                               "lat":  18.431648,
                               "lon":  77.218342,
                               "elevation_m":  -1976.93,
                               "tilt_deg":  6.54
                           },
                           {
                               "sol":  1819,
                               "lat":  18.43182,
                               "lon":  77.218409,
                               "elevation_m":  -1976.92,
                               "tilt_deg":  11.05
                           },
                           {
                               "sol":  1819,
                               "lat":  18.431801,
                               "lon":  77.218315,
                               "elevation_m":  -1977.51,
                               "tilt_deg":  9.32
                           },
                           {
                               "sol":  1825,
                               "lat":  18.431854,
                               "lon":  77.218303,
                               "elevation_m":  -1977.82,
                               "tilt_deg":  8.21
                           },
                           {
                               "sol":  1829,
                               "lat":  18.431854,
                               "lon":  77.218303,
                               "elevation_m":  -1977.82,
                               "tilt_deg":  8.25
                           },
                           {
                               "sol":  1830,
                               "lat":  18.431854,
                               "lon":  77.218302,
                               "elevation_m":  -1977.82,
                               "tilt_deg":  8.3
                           },
                           {
                               "sol":  1833,
                               "lat":  18.431831,
                               "lon":  77.218308,
                               "elevation_m":  -1977.78,
                               "tilt_deg":  7.91
                           },
                           {
                               "sol":  1835,
                               "lat":  18.432604,
                               "lon":  77.219797,
                               "elevation_m":  -1972.25,
                               "tilt_deg":  8.46
                           },
                           {
                               "sol":  1840,
                               "lat":  18.432517,
                               "lon":  77.220062,
                               "elevation_m":  -1969.98,
                               "tilt_deg":  7.56
                           },
                           {
                               "sol":  1840,
                               "lat":  18.432523,
                               "lon":  77.220149,
                               "elevation_m":  -1969.77,
                               "tilt_deg":  7.24
                           },
                           {
                               "sol":  1842,
                               "lat":  18.432518,
                               "lon":  77.220319,
                               "elevation_m":  -1968.69,
                               "tilt_deg":  7.75
                           },
                           {
                               "sol":  1842,
                               "lat":  18.432462,
                               "lon":  77.220272,
                               "elevation_m":  -1968.49,
                               "tilt_deg":  9.47
                           },
                           {
                               "sol":  1849,
                               "lat":  18.433256,
                               "lon":  77.220021,
                               "elevation_m":  -1973.79,
                               "tilt_deg":  5.22
                           },
                           {
                               "sol":  1856,
                               "lat":  18.432063,
                               "lon":  77.220123,
                               "elevation_m":  -1966.18,
                               "tilt_deg":  10.81
                           },
                           {
                               "sol":  1859,
                               "lat":  18.431575,
                               "lon":  77.220558,
                               "elevation_m":  -1960.54,
                               "tilt_deg":  10.36
                           },
                           {
                               "sol":  1859,
                               "lat":  18.431509,
                               "lon":  77.220613,
                               "elevation_m":  -1959.34,
                               "tilt_deg":  10.83
                           },
                           {
                               "sol":  1863,
                               "lat":  18.430918,
                               "lon":  77.220383,
                               "elevation_m":  -1958.75,
                               "tilt_deg":  7.4
                           },
                           {
                               "sol":  1863,
                               "lat":  18.431032,
                               "lon":  77.220458,
                               "elevation_m":  -1957.97,
                               "tilt_deg":  9.85
                           },
                           {
                               "sol":  1866,
                               "lat":  18.431069,
                               "lon":  77.220446,
                               "elevation_m":  -1957.91,
                               "tilt_deg":  14.99
                           },
                           {
                               "sol":  1867,
                               "lat":  18.431065,
                               "lon":  77.220431,
                               "elevation_m":  -1958.07,
                               "tilt_deg":  11.34
                           },
                           {
                               "sol":  1877,
                               "lat":  18.430987,
                               "lon":  77.220594,
                               "elevation_m":  -1956.95,
                               "tilt_deg":  7.85
                           },
                           {
                               "sol":  1877,
                               "lat":  18.43091,
                               "lon":  77.220633,
                               "elevation_m":  -1956.62,
                               "tilt_deg":  6.81
                           },
                           {
                               "sol":  1880,
                               "lat":  18.430509,
                               "lon":  77.220977,
                               "elevation_m":  -1953.78,
                               "tilt_deg":  7.87
                           },
                           {
                               "sol":  1880,
                               "lat":  18.430455,
                               "lon":  77.221047,
                               "elevation_m":  -1953.14,
                               "tilt_deg":  10.1
                           },
                           {
                               "sol":  1883,
                               "lat":  18.430537,
                               "lon":  77.221167,
                               "elevation_m":  -1952.08,
                               "tilt_deg":  12.31
                           },
                           {
                               "sol":  1883,
                               "lat":  18.43047,
                               "lon":  77.221173,
                               "elevation_m":  -1951.77,
                               "tilt_deg":  13.43
                           },
                           {
                               "sol":  1890,
                               "lat":  18.428132,
                               "lon":  77.2179,
                               "elevation_m":  -1966.64,
                               "tilt_deg":  9.74
                           },
                           {
                               "sol":  1893,
                               "lat":  18.426029,
                               "lon":  77.217933,
                               "elevation_m":  -1958.92,
                               "tilt_deg":  13.45
                           },
                           {
                               "sol":  1896,
                               "lat":  18.424382,
                               "lon":  77.219123,
                               "elevation_m":  -1968.22,
                               "tilt_deg":  10.32
                           },
                           {
                               "sol":  1897,
                               "lat":  18.421964,
                               "lon":  77.220732,
                               "elevation_m":  -1973.63,
                               "tilt_deg":  8.67
                           },
                           {
                               "sol":  1900,
                               "lat":  18.420577,
                               "lon":  77.219031,
                               "elevation_m":  -1983.96,
                               "tilt_deg":  4.14
                           },
                           {
                               "sol":  1904,
                               "lat":  18.419975,
                               "lon":  77.220116,
                               "elevation_m":  -1979.55,
                               "tilt_deg":  7.36
                           },
                           {
                               "sol":  1906,
                               "lat":  18.420009,
                               "lon":  77.22017,
                               "elevation_m":  -1979.45,
                               "tilt_deg":  5.22
                           },
                           {
                               "sol":  1906,
                               "lat":  18.41997,
                               "lon":  77.220129,
                               "elevation_m":  -1979.5,
                               "tilt_deg":  7.16
                           },
                           {
                               "sol":  1910,
                               "lat":  18.422747,
                               "lon":  77.220734,
                               "elevation_m":  -1972.57,
                               "tilt_deg":  2.75
                           },
                           {
                               "sol":  1913,
                               "lat":  18.422737,
                               "lon":  77.220635,
                               "elevation_m":  -1973.05,
                               "tilt_deg":  5
                           },
                           {
                               "sol":  1917,
                               "lat":  18.424818,
                               "lon":  77.218531,
                               "elevation_m":  -1966.79,
                               "tilt_deg":  10.72
                           },
                           {
                               "sol":  1921,
                               "lat":  18.425761,
                               "lon":  77.218347,
                               "elevation_m":  -1956.95,
                               "tilt_deg":  12.34
                           },
                           {
                               "sol":  1922,
                               "lat":  18.426168,
                               "lon":  77.218059,
                               "elevation_m":  -1958.17,
                               "tilt_deg":  8.9
                           },
                           {
                               "sol":  1922,
                               "lat":  18.426167,
                               "lon":  77.21806,
                               "elevation_m":  -1958,
                               "tilt_deg":  11.36
                           },
                           {
                               "sol":  1927,
                               "lat":  18.426205,
                               "lon":  77.21798,
                               "elevation_m":  -1958.95,
                               "tilt_deg":  6.77
                           },
                           {
                               "sol":  1935,
                               "lat":  18.42491,
                               "lon":  77.218554,
                               "elevation_m":  -1965.86,
                               "tilt_deg":  11.73
                           },
                           {
                               "sol":  1939,
                               "lat":  18.425058,
                               "lon":  77.222465,
                               "elevation_m":  -1964.4,
                               "tilt_deg":  5.15
                           },
                           {
                               "sol":  1940,
                               "lat":  18.426389,
                               "lon":  77.224557,
                               "elevation_m":  -1963.64,
                               "tilt_deg":  2.96
                           },
                           {
                               "sol":  1941,
                               "lat":  18.428034,
                               "lon":  77.227943,
                               "elevation_m":  -1960.68,
                               "tilt_deg":  4.63
                           },
                           {
                               "sol":  1946,
                               "lat":  18.430266,
                               "lon":  77.231108,
                               "elevation_m":  -1960.98,
                               "tilt_deg":  0.98
                           },
                           {
                               "sol":  1947,
                               "lat":  18.431506,
                               "lon":  77.231736,
                               "elevation_m":  -1959.65,
                               "tilt_deg":  2.17
                           },
                           {
                               "sol":  1947,
                               "lat":  18.434298,
                               "lon":  77.232342,
                               "elevation_m":  -1948.42,
                               "tilt_deg":  5.52
                           },
                           {
                               "sol":  1947,
                               "lat":  18.435468,
                               "lon":  77.232909,
                               "elevation_m":  -1938.31,
                               "tilt_deg":  8.73
                           },
                           {
                               "sol":  1955,
                               "lat":  18.435492,
                               "lon":  77.232869,
                               "elevation_m":  -1938.12,
                               "tilt_deg":  9.63
                           },
                           {
                               "sol":  1955,
                               "lat":  18.435599,
                               "lon":  77.232871,
                               "elevation_m":  -1937.45,
                               "tilt_deg":  10.23
                           },
                           {
                               "sol":  1962,
                               "lat":  18.436835,
                               "lon":  77.231927,
                               "elevation_m":  -1931.18,
                               "tilt_deg":  12.23
                           },
                           {
                               "sol":  1965,
                               "lat":  18.437169,
                               "lon":  77.231952,
                               "elevation_m":  -1927.26,
                               "tilt_deg":  12.58
                           },
                           {
                               "sol":  1965,
                               "lat":  18.437146,
                               "lon":  77.231867,
                               "elevation_m":  -1927.69,
                               "tilt_deg":  12.17
                           },
                           {
                               "sol":  1979,
                               "lat":  18.437148,
                               "lon":  77.231893,
                               "elevation_m":  -1927.66,
                               "tilt_deg":  11.72
                           },
                           {
                               "sol":  1980,
                               "lat":  18.436951,
                               "lon":  77.232019,
                               "elevation_m":  -1929.47,
                               "tilt_deg":  11.12
                           },
                           {
                               "sol":  1980,
                               "lat":  18.436874,
                               "lon":  77.232054,
                               "elevation_m":  -1930.19,
                               "tilt_deg":  11.65
                           },
                           {
                               "sol":  2006,
                               "lat":  18.435563,
                               "lon":  77.232811,
                               "elevation_m":  -1937.83,
                               "tilt_deg":  7.75
                           },
                           {
                               "sol":  2009,
                               "lat":  18.435598,
                               "lon":  77.232809,
                               "elevation_m":  -1937.69,
                               "tilt_deg":  8.68
                           },
                           {
                               "sol":  2009,
                               "lat":  18.435595,
                               "lon":  77.232875,
                               "elevation_m":  -1937.45,
                               "tilt_deg":  9.63
                           },
                           {
                               "sol":  2022,
                               "lat":  18.435603,
                               "lon":  77.233134,
                               "elevation_m":  -1936.73,
                               "tilt_deg":  8.78
                           },
                           {
                               "sol":  2022,
                               "lat":  18.435594,
                               "lon":  77.233223,
                               "elevation_m":  -1936.37,
                               "tilt_deg":  7.29
                           }
                       ],
    "metadata":  {
                     "generated_at":  "2026-11-14T16:54:20.8316763-03:00",
                     "region":  "Jezero Crater, Mars",
                     "total_obstacles":  325,
                     "crs":  "IAU2000:49900 (Mars 2000 Planetocentric)",
                     "total_traverse_pts":  708,
                     "total_science_pts":  7
                 }
};
