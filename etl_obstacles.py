"""
ETL de Obstáculos, Pontos Científicos e Base Marciana - Cratera Jezero (Martian Atlas)
======================================================================================
Extrai, limpa e padroniza os dados abertos da NASA (Mars 2020 MMGIS Waypoints) e
bases complementares (USGS Astrogeology / HiRISE / AI4Mars), classificando todos
os pontos críticos em uma escala de 1 a 5 de criticidade (`criticality_level`).
"""

import os
import json
import csv
import math

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
RAW_DIR = os.path.join(BASE_DIR, "data", "raw")
PROCESSED_DIR = os.path.join(BASE_DIR, "data", "processed")
PUBLIC_DATA_DIR = os.path.join(BASE_DIR, "public", "data")

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(PROCESSED_DIR, exist_ok=True)
os.makedirs(PUBLIC_DATA_DIR, exist_ok=True)


def compute_criticality_level(severity_score: float, tilt_deg: float, passable: bool) -> int:
    """Converte o score de severidade e inclinação para a escala inteira de 1 a 5."""
    if not passable or severity_score >= 0.85 or tilt_deg >= 20.0:
        return 5
    if severity_score >= 0.70 or tilt_deg >= 15.0:
        return 4
    if severity_score >= 0.48 or tilt_deg >= 12.0:
        return 3
    if severity_score >= 0.38 or tilt_deg >= 9.5:
        return 2
    return 1


def extract_nasa_waypoint_hazards(waypoints_path: str) -> tuple[list, list]:
    """
    Lê M20_waypoints.json e retorna:
    - obstacles: lista de empecilhos com criticality_level (1 a 5)
    - rover_traverse: trilha histórica real do Perseverance para referência no mapa
    """
    obstacles = []
    rover_traverse = []
    if not os.path.exists(waypoints_path):
        return obstacles, rover_traverse

    with open(waypoints_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    features = data.get("features", [])
    for idx, feat in enumerate(features):
        props = feat.get("properties", {})
        lat = props.get("lat")
        lon = props.get("lon")
        if lat is None or lon is None:
            continue
        lat, lon = float(lat), float(lon)
        elev = float(props.get("elev_geoid") or -2565.0)
        sol = props.get("sol", idx)
        tilt = abs(float(props.get("tilt") or props.get("pitch") or 0.0))

        rover_traverse.append({
            "sol": sol,
            "lat": round(lat, 6),
            "lon": round(lon, 6),
            "elevation_m": round(elev, 2),
            "tilt_deg": round(tilt, 2),
        })

        if tilt >= 8.0:
            severity = min(1.0, round(tilt / 25.0, 2))
            passable = severity < 0.80
            crit = compute_criticality_level(severity, tilt, passable)
            obs_type = "steep_slope" if tilt >= 15.0 else "rough_terrain"
            radius_m = 22.0 if tilt >= 15.0 else 14.0
            obstacles.append({
                "obstacle_id": f"NASA_M20_SOL{sol}_{idx}",
                "name": f"Inclinacao Sol {sol} ({tilt:.1f}°)",
                "source_dataset": "NASA_M2020_MMGIS_Waypoints",
                "lat": round(lat, 6),
                "lon": round(lon, 6),
                "elevation_m": round(elev, 2),
                "obstacle_type": obs_type,
                "radius_meters": radius_m,
                "slope_deg": round(tilt, 2),
                "severity_score": severity,
                "criticality_level": crit,
                "passable_by_rover": passable,
                "is_dynamic_report": False,
                "description": f"Obstaculo topografico detectado pelos sensores IMU do Perseverance no Sol {sol} (inclinacao de {tilt:.1f}°, elevacao {elev:.1f}m).",
            })

    return obstacles, rover_traverse


def get_complementary_hazards() -> list:
    """Retorna os obstáculos mapeados por satélite (USGS HiRISE & AI4Mars) com criticidade de 1 a 5."""
    return [
        {
            "obstacle_id": "COMP_CRATER_BELVA",
            "name": "Cratera Belva",
            "source_dataset": "USGS_HiRISE_Jezero_Crater_Catalog",
            "lat": 18.4613,
            "lon": 77.3892,
            "elevation_m": -2515.0,
            "obstacle_type": "crater",
            "radius_meters": 450.0,
            "slope_deg": 24.5,
            "severity_score": 0.95,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Cratera de impacto de ~900m de diametro no topo do delta de Jezero; paredes ingremes intransponiveis.",
        },
        {
            "obstacle_id": "COMP_CRATER_SANTA_CRUZ",
            "name": "Cratera Santa Cruz",
            "source_dataset": "USGS_HiRISE_Jezero_Crater_Catalog",
            "lat": 18.4310,
            "lon": 77.4485,
            "elevation_m": -2565.0,
            "obstacle_type": "crater",
            "radius_meters": 180.0,
            "slope_deg": 21.0,
            "severity_score": 0.90,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Cratera e colina ingreme a sudoeste do ponto de pouso Octavia E. Butler.",
        },
        {
            "obstacle_id": "COMP_SAND_SEITAH_NORTH",
            "name": "Dunas de Seitah (Setor Norte)",
            "source_dataset": "AI4Mars_HiRISE_Terrain_Hazards",
            "lat": 18.4420,
            "lon": 77.4380,
            "elevation_m": -2575.0,
            "obstacle_type": "sand_trap",
            "radius_meters": 320.0,
            "slope_deg": 14.0,
            "severity_score": 0.88,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Regiao Seitah ('entre a areia'): campo denso de dunas eolicas com alto risco de atolamento.",
        },
        {
            "obstacle_id": "COMP_SAND_SEITAH_SOUTH",
            "name": "Dunas de Seitah (Setor Sul)",
            "source_dataset": "AI4Mars_HiRISE_Terrain_Hazards",
            "lat": 18.4265,
            "lon": 77.4345,
            "elevation_m": -2580.0,
            "obstacle_type": "sand_trap",
            "radius_meters": 280.0,
            "slope_deg": 12.5,
            "severity_score": 0.85,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Extensao sul do campo de dunas Seitah que exige desvio de contorno completo.",
        },
        {
            "obstacle_id": "COMP_SCARP_DELTA_FRONT",
            "name": "Escarpa Frontal do Delta (Cape Nukshak)",
            "source_dataset": "USGS_HiRISE_Jezero_Crater_Catalog",
            "lat": 18.4485,
            "lon": 77.4190,
            "elevation_m": -2540.0,
            "obstacle_type": "steep_slope",
            "radius_meters": 150.0,
            "slope_deg": 28.0,
            "severity_score": 0.96,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Penhasco frontal do delta com desnivel de ate 40m e inclinacao superior a 25 graus.",
        },
        {
            "obstacle_id": "COMP_SCARP_KODIAK",
            "name": "Meseta Kodiak Butte",
            "source_dataset": "USGS_HiRISE_Jezero_Crater_Catalog",
            "lat": 18.4298,
            "lon": 77.4175,
            "elevation_m": -2555.0,
            "obstacle_type": "steep_slope",
            "radius_meters": 140.0,
            "slope_deg": 32.0,
            "severity_score": 0.98,
            "criticality_level": 5,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Formacao isolada remanescente do antigo delta com paredes quase verticais.",
        },
        {
            "obstacle_id": "COMP_BOULDER_THREE_FORKS_EAST",
            "name": "Campo de Matacoes Three Forks",
            "source_dataset": "AI4Mars_HiRISE_Terrain_Hazards",
            "lat": 18.4472,
            "lon": 77.4288,
            "elevation_m": -2562.0,
            "obstacle_type": "boulder_field",
            "radius_meters": 85.0,
            "slope_deg": 9.5,
            "severity_score": 0.72,
            "criticality_level": 4,
            "passable_by_rover": True,
            "is_dynamic_report": False,
            "description": "Alta densidade de blocos rochosos (>0.5m) na base do delta; reduz velocidade de caminhada em 60%.",
        },
        {
            "obstacle_id": "COMP_CRATER_LAHONTAN",
            "name": "Cratera Lahontan",
            "source_dataset": "USGS_HiRISE_Jezero_Crater_Catalog",
            "lat": 18.4395,
            "lon": 77.4560,
            "elevation_m": -2572.0,
            "obstacle_type": "crater",
            "radius_meters": 95.0,
            "slope_deg": 19.0,
            "severity_score": 0.82,
            "criticality_level": 4,
            "passable_by_rover": False,
            "is_dynamic_report": False,
            "description": "Cratera de impacto proxima ao ponto de pouso com bordas rochosas e interior arenoso.",
        },
        {
            "obstacle_id": "COMP_BOULDER_MARGIN_UNIT",
            "name": "Zona Rochosa da Unidade Marginal",
            "source_dataset": "AI4Mars_HiRISE_Terrain_Hazards",
            "lat": 18.4720,
            "lon": 77.3650,
            "elevation_m": -2480.0,
            "obstacle_type": "boulder_field",
            "radius_meters": 110.0,
            "slope_deg": 13.5,
            "severity_score": 0.76,
            "criticality_level": 4,
            "passable_by_rover": True,
            "is_dynamic_report": False,
            "description": "Zona densa de rochas carbonaticas fraturadas na borda interna da Cratera Jezero.",
        },
        {
            "obstacle_id": "DYNAMIC_WAZE_ROCK_001",
            "name": "Deslizamento de Rochas Recente (Alerta Waze)",
            "source_dataset": "User_Dynamic_Hazard_Report",
            "lat": 18.4525,
            "lon": 77.4055,
            "elevation_m": -2535.0,
            "obstacle_type": "boulder_field",
            "radius_meters": 40.0,
            "slope_deg": 14.0,
            "severity_score": 0.89,
            "criticality_level": 4,
            "passable_by_rover": False,
            "is_dynamic_report": True,
            "description": "Obstaculo registrado em campo na subida do delta; exige recalculo imediato de desvio.",
        },
    ]
