$ErrorActionPreference = "Stop"

$BaseDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$RawDir = Join-Path $BaseDir "data\raw"
$ProcessedDir = Join-Path $BaseDir "data\processed"
$PublicDataDir = Join-Path $BaseDir "public\data"

New-Item -ItemType Directory -Force -Path $ProcessedDir, $PublicDataDir | Out-Null

$WaypointsPath = Join-Path $RawDir "M20_waypoints.json"
$JsonContent = Get-Content -Path $WaypointsPath -Raw -Encoding UTF8 | ConvertFrom-Json

$Obstacles = New-Object System.Collections.Generic.List[PSObject]
$RoverTraverse = New-Object System.Collections.Generic.List[PSObject]

function Get-CriticalityLevel([double]$severity, [double]$tilt, [bool]$passable) {
    if ((-not $passable) -or ($severity -ge 0.85) -or ($tilt -ge 20.0)) { return 5 }
    if (($severity -ge 0.70) -or ($tilt -ge 15.0)) { return 4 }
    if (($severity -ge 0.48) -or ($tilt -ge 12.0)) { return 3 }
    if (($severity -ge 0.38) -or ($tilt -ge 9.5)) { return 2 }
    return 1
}

# 1. Base Complementar Científica (USGS HiRISE / AI4Mars Jezero Crater Hazard Catalog) com Escala 1 a 5
$ComplementaryHazards = @(
    [PSCustomObject]@{
        obstacle_id       = "COMP_CRATER_BELVA"
        name              = "Cratera Belva"
        source_dataset    = "USGS_HiRISE_Jezero_Crater_Catalog"
        lat               = 18.4613
        lon               = 77.3892
        elevation_m       = -2515.0
        obstacle_type     = "crater"
        radius_meters     = 450.0
        slope_deg         = 24.5
        severity_score    = 0.95
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Cratera de impacto de ~900m de diametro no topo do delta de Jezero; bordas ingremes intransponiveis."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_CRATER_SANTA_CRUZ"
        name              = "Cratera Santa Cruz"
        source_dataset    = "USGS_HiRISE_Jezero_Crater_Catalog"
        lat               = 18.4310
        lon               = 77.4485
        elevation_m       = -2565.0
        obstacle_type     = "crater"
        radius_meters     = 180.0
        slope_deg         = 21.0
        severity_score    = 0.90
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Cratera e colina ingreme a sudoeste do ponto de pouso Octavia E. Butler."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_SAND_SEITAH_NORTH"
        name              = "Dunas de Seitah (Setor Norte)"
        source_dataset    = "AI4Mars_HiRISE_Terrain_Hazards"
        lat               = 18.4420
        lon               = 77.4380
        elevation_m       = -2575.0
        obstacle_type     = "sand_trap"
        radius_meters     = 320.0
        slope_deg         = 14.0
        severity_score    = 0.88
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Regiao Seitah ('entre a areia'): campo denso de dunas eolicas com alto risco de atolamento."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_SAND_SEITAH_SOUTH"
        name              = "Dunas de Seitah (Setor Sul)"
        source_dataset    = "AI4Mars_HiRISE_Terrain_Hazards"
        lat               = 18.4265
        lon               = 77.4345
        elevation_m       = -2580.0
        obstacle_type     = "sand_trap"
        radius_meters     = 280.0
        slope_deg         = 12.5
        severity_score    = 0.85
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Extensao sul do campo de dunas Seitah que exige desvio completo."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_SCARP_DELTA_FRONT"
        name              = "Escarpa Frontal do Delta (Cape Nukshak)"
        source_dataset    = "USGS_HiRISE_Jezero_Crater_Catalog"
        lat               = 18.4485
        lon               = 77.4190
        elevation_m       = -2540.0
        obstacle_type     = "steep_slope"
        radius_meters     = 150.0
        slope_deg         = 28.0
        severity_score    = 0.96
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Escarpa frontal do delta com penhascos de ate 40 metros de altura e inclinacao >25 graus."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_SCARP_KODIAK"
        name              = "Meseta Kodiak Butte"
        source_dataset    = "USGS_HiRISE_Jezero_Crater_Catalog"
        lat               = 18.4298
        lon               = 77.4175
        elevation_m       = -2555.0
        obstacle_type     = "steep_slope"
        radius_meters     = 140.0
        slope_deg         = 32.0
        severity_score    = 0.98
        criticality_level = 5
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Meseta isolada remanescente do antigo delta com paredes quase verticais."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_BOULDER_THREE_FORKS_EAST"
        name              = "Campo de Matacoes Three Forks"
        source_dataset    = "AI4Mars_HiRISE_Terrain_Hazards"
        lat               = 18.4472
        lon               = 77.4288
        elevation_m       = -2562.0
        obstacle_type     = "boulder_field"
        radius_meters     = 85.0
        slope_deg         = 9.5
        severity_score    = 0.72
        criticality_level = 3
        passable_by_rover = $true
        is_dynamic_report = $false
        description       = "Campo de alta densidade de blocos rochosos (>0.5m) na base do delta; exige velocidade reduzida."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_CRATER_LAHONTAN"
        name              = "Cratera Lahontan"
        source_dataset    = "USGS_HiRISE_Jezero_Crater_Catalog"
        lat               = 18.4395
        lon               = 77.4560
        elevation_m       = -2572.0
        obstacle_type     = "crater"
        radius_meters     = 95.0
        slope_deg         = 19.0
        severity_score    = 0.82
        criticality_level = 4
        passable_by_rover = $false
        is_dynamic_report = $false
        description       = "Cratera de impacto proxima ao local de pouso com bordas rochosas e interior arenoso."
    },
    [PSCustomObject]@{
        obstacle_id       = "COMP_BOULDER_MARGIN_UNIT"
        name              = "Zona Rochosa da Unidade Marginal"
        source_dataset    = "AI4Mars_HiRISE_Terrain_Hazards"
        lat               = 18.4720
        lon               = 77.3650
        elevation_m       = -2480.0
        obstacle_type     = "boulder_field"
        radius_meters     = 110.0
        slope_deg         = 13.5
        severity_score    = 0.76
        criticality_level = 3
        passable_by_rover = $true
        is_dynamic_report = $false
        description       = "Zona densa de matacoes e rochas fraturadas na unidade marginal da Cratera Jezero."
    },
    [PSCustomObject]@{
        obstacle_id       = "DYNAMIC_WAZE_ROCK_001"
        name              = "Deslizamento de Rochas Recente (Alerta Waze)"
        source_dataset    = "User_Dynamic_Hazard_Report"
        lat               = 18.4525
        lon               = 77.4055
        elevation_m       = -2535.0
        obstacle_type     = "boulder_field"
        radius_meters     = 40.0
        slope_deg         = 14.0
        severity_score    = 0.89
        criticality_level = 4
        passable_by_rover = $false
        is_dynamic_report = $true
        description       = "Obstaculo dinamico recem-detectado na subida do delta para calculo de desvio."
    }
)

foreach ($item in $ComplementaryHazards) {
    $Obstacles.Add($item)
}

# 2. Base Oficial da NASA (M20_waypoints.json)
$idx = 0
$nasaCount = 0
foreach ($feat in $JsonContent.features) {
    $idx++
    $props = $feat.properties
    if ($null -eq $props.lat -or $null -eq $props.lon) { continue }

    $lat = [math]::Round([double]$props.lat, 6)
    $lon = [math]::Round([double]$props.lon, 6)
    $elev = [math]::Round([double]$props.elev_geoid, 2)
    $sol = $props.sol

    $tilt = 0.0
    if ($null -ne $props.tilt) {
        $tilt = [math]::Abs([double]$props.tilt)
    } elseif ($null -ne $props.pitch) {
        $tilt = [math]::Abs([double]$props.pitch)
    }
    $tiltRound = [math]::Round($tilt, 2)

    $RoverTraverse.Add([PSCustomObject]@{
        sol         = $sol
        lat         = $lat
        lon         = $lon
        elevation_m = $elev
        tilt_deg    = $tiltRound
    })

    if ($tilt -ge 8.0) {
        $nasaCount++
        $severity = [math]::Min(1.0, [math]::Round($tilt / 25.0, 2))
        $passable = ($severity -lt 0.80)
        $crit = Get-CriticalityLevel $severity $tilt $passable

        if ($tilt -ge 15.0) {
            $obsType = "steep_slope"
            $radiusM = 22.0
            $desc = "Inclinacao severa de $tiltRound graus detectada pela telemetria da NASA (Sol $sol)"
        } else {
            $obsType = "rough_terrain"
            $radiusM = 14.0
            $desc = "Terreno irregular com inclinacao moderada de $tiltRound graus (Sol $sol)"
        }

        $Obstacles.Add([PSCustomObject]@{
            obstacle_id       = "NASA_M20_SOL${sol}_${idx}"
            name              = "Sol $sol Inclinacao ($tiltRound deg)"
            source_dataset    = "NASA_M2020_MMGIS_Waypoints"
            lat               = $lat
            lon               = $lon
            elevation_m       = $elev
            obstacle_type     = $obsType
            radius_meters     = $radiusM
            slope_deg         = $tiltRound
            severity_score    = $severity
            criticality_level = $crit
            passable_by_rover = $passable
            is_dynamic_report = $false
            description       = $desc
        })
    }
}

# Salvar CSV de obstaculos
$CsvOut = Join-Path $ProcessedDir "jezero_obstacles_clean.csv"
try {
    $Obstacles | Export-Csv -Path $CsvOut -NoTypeInformation -Encoding UTF8
} catch {
    $CsvOutFallback = Join-Path $ProcessedDir "jezero_obstacles_v2_clean.csv"
    $Obstacles | Export-Csv -Path $CsvOutFallback -NoTypeInformation -Encoding UTF8
    Write-Host "Aviso: jezero_obstacles_clean.csv estava aberto; salvo tambem em jezero_obstacles_v2_clean.csv"
}

# Salvar GeoJSON de obstaculos
$GeoFeatures = @()
foreach ($obs in $Obstacles) {
    $GeoFeatures += @{
        type = "Feature"
        properties = @{
            obstacle_id       = $obs.obstacle_id
            name              = $obs.name
            source_dataset    = $obs.source_dataset
            elevation_m       = $obs.elevation_m
            obstacle_type     = $obs.obstacle_type
            radius_meters     = $obs.radius_meters
            slope_deg         = $obs.slope_deg
            severity_score    = $obs.severity_score
            criticality_level = $obs.criticality_level
            passable_by_rover = $obs.passable_by_rover
            is_dynamic_report = $obs.is_dynamic_report
            description       = $obs.description
        }
        geometry = @{
            type = "Point"
            coordinates = @($obs.lon, $obs.lat)
        }
    }
}
$GeoJsonObj = @{
    type = "FeatureCollection"
    name = "Jezero_Crater_Obstacles_Clean"
    features = $GeoFeatures
}
$GeoJsonOut = Join-Path $ProcessedDir "jezero_obstacles_clean.geojson"
$GeoJsonObj | ConvertTo-Json -Depth 10 | Set-Content -Path $GeoJsonOut -Encoding UTF8

# 3. Base Fixa Ficticia + Pontos Cientificos de Interesse
$BaseStation = [PSCustomObject]@{
    base_id     = "BASE_ARES_ALPHA"
    name        = "Estacao Base Ares Alpha (Habitat Principal)"
    category    = "Habitat & Command Base"
    lat         = 18.4447
    lon         = 77.4508
    elevation_m = -2570.0
    description = "Base central dos exploradores na Cratera Jezero (Octavia E. Butler Sector). Ponto de partida padrao para expedicoes."
}

$ScienceTargets = @(
    [PSCustomObject]@{
        target_id                 = "SCI_001"
        name                      = "Octavia E. Butler Landing Site"
        category                  = "Marco Historico / Pouso"
        lat                       = 18.4447
        lon                       = 77.4508
        elevation_m               = -2570.0
        scientific_interest_score = 0.85
        priority_level            = 4
        description               = "Ponto de pouso original da missao Mars 2020 no assoalho vulcanico/sedimentar de Jezero."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_002"
        name                      = "Citadelle (Afloramento Rochette)"
        category                  = "Geologia Ignea / Amostras"
        lat                       = 18.4275
        lon                       = 77.4270
        elevation_m               = -2560.0
        scientific_interest_score = 0.92
        priority_level            = 5
        description               = "Crista rochosa ao sul de Seitah onde foram coletadas as amostras 'Montdenier' e 'Montagnac'."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_003"
        name                      = "Three Forks Sample Depot"
        category                  = "Deposito Estrategico de Amostras"
        lat                       = 18.4456
        lon                       = 77.4252
        elevation_m               = -2564.0
        scientific_interest_score = 0.90
        priority_level            = 4
        description               = "Planicie segura na base do delta contendo 10 tubos de titanio da campanha Mars Sample Return."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_004"
        name                      = "Hawksbill Gap & Wildcat Ridge"
        category                  = "Astrobiologia / Antigo Lago"
        lat                       = 18.4505
        lon                       = 77.4095
        elevation_m               = -2538.0
        scientific_interest_score = 0.99
        priority_level            = 5
        description               = "Rocha sedimentar fina (mudstone) rica em moleculas organicas e sulfatos depositados no antigo lago."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_005"
        name                      = "Pinestand & Echo Creek (Topo do Delta)"
        category                  = "Estratigrafia Fluvial"
        lat                       = 18.4590
        lon                       = 77.3965
        elevation_m               = -2518.0
        scientific_interest_score = 0.95
        priority_level            = 4
        description               = "Camadas inclinadas de alta energia fluvial adjacentes a Cratera Belva."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_006"
        name                      = "Bright Angel (Canal Neretva Vallis)"
        category                  = "Bioassinatura Potencial (Cheyava Falls)"
        lat                       = 18.4850
        lon                       = 77.3450
        elevation_m               = -2465.0
        scientific_interest_score = 1.00
        priority_level            = 5
        description               = "Canal de entrada do rio marciano onde foi descoberta a rocha 'Cheyava Falls' com manchas tipo leopardo."
    },
    [PSCustomObject]@{
        target_id                 = "SCI_007"
        name                      = "Gnarled (Unidade de Carbonatos Marginais)"
        category                  = "Mineralogia / Carbonatos"
        lat                       = 18.4685
        lon                       = 77.3760
        elevation_m               = -2492.0
        scientific_interest_score = 0.94
        priority_level            = 4
        description               = "Antiga linha de praia do lago de Jezero rica em minerais carbonaticos preservadores de microfosseis."
    }
)

$SciCsvOut = Join-Path $ProcessedDir "jezero_science_targets.csv"
try {
    $ScienceTargets | Export-Csv -Path $SciCsvOut -NoTypeInformation -Encoding UTF8
} catch {
    $SciCsvFallback = Join-Path $ProcessedDir "jezero_science_targets_v2.csv"
    $ScienceTargets | Export-Csv -Path $SciCsvFallback -NoTypeInformation -Encoding UTF8
}

# Exportar Bundle JS para a aplicacao Web local (public/data/mars_atlas_data.js)
$AtlasBundle = @{
    metadata        = @{
        region             = "Jezero Crater, Mars"
        crs                = "IAU2000:49900 (Mars 2000 Planetocentric)"
        generated_at       = (Get-Date).ToString("o")
        total_obstacles    = $Obstacles.Count
        total_science_pts  = $ScienceTargets.Count
        total_traverse_pts = $RoverTraverse.Count
    }
    base_station    = $BaseStation
    science_targets = $ScienceTargets
    obstacles       = $Obstacles
    rover_traverse  = $RoverTraverse
}

$JsonString = $AtlasBundle | ConvertTo-Json -Depth 10
$JsOut = Join-Path $PublicDataDir "mars_atlas_data.js"
"window.MARS_ATLAS_DATA = $JsonString;" | Set-Content -Path $JsOut -Encoding UTF8

Write-Host "ETL ATUALIZADO COM ESCALA 1-5 E BUNDLE WEB GERADO!"
Write-Host "Total de Obstaculos: $($Obstacles.Count) | Pontos Cientificos: $($ScienceTargets.Count)"
