# Martian Atlas — Navegação & Cartografia Científica na Cratera Jezero

O **Martian Atlas** é um sistema inteligente de navegação e mapeamento de superfície para Marte (inspirado no Google Maps / Waze), focado na região da **Cratera Jezero**.

Enquanto ferramentas globais como o *NASA Mars Trek* exigem análise manual por especialistas, o **Martian Atlas** transforma dados brutos abertos da **NASA (Mars 2020 / Perseverance MMGIS & MOLA)** e **USGS / AI4Mars** em alertas visuais de obstáculos (com escala de criticidade de **1 a 5**) e calcula automaticamente as rotas mais seguras entre a base dos exploradores e pontos de interesse científico.

---

## Principais Funcionalidades

- **Cálculo de Múltiplas Rotas (Algoritmo A\* Espacial):**
  - **Rota Mais Segura (Recomendada):** Desvia com margem de segurança de todos os obstáculos críticos (níveis 3 a 5), dunas e escarpas íngremes.
  - **Corredor Científico Exploratório:** Otimiza o trajeto passando próximo a afloramentos e pontos de interesse científico mantendo a segurança.
  - **Rota Direta / Mais Curta:** Menor distância física, desviando apenas de barreiras intransponíveis (nível 5).
- **Adição de Paradas Intermediárias:** Planeje expedições completas (`Origem` $\rightarrow$ `Parada 1` $\rightarrow$ `Parada N` $\rightarrow$ `Destino Final`).
- **Gestão Dinâmica Estilo "Waze" (Pontos Científicos e Empecilhos):**
  - Adicione **novos pontos científicos** ou **novos empecilhos** clicando diretamente no mapa.
  - Todos os empecilhos contam com **Escala de Criticidade de 1 a 5**, raio de bloqueio em metros e inclinação.
  - Se um novo empecilho for reportado sobre uma rota ativa, o sistema emite um alerta e **recalcula o desvio automaticamente em tempo real**.
  - Inspecione detalhes completos (passando o mouse ou clicando) e **remova** pontos ou empecilhos quando necessário.
- **Modo Exploração Livre & Estação Base Fixa:**
  - Visualize toda a Cratera Jezero fora de rota a partir da **Estação Base Ares Alpha (Habitat Principal)**.
  - Alterne entre a **Camada de Satélite (NASA Orbital)** e a **Camada de Relevo / Topografia (MOLA)** com isolinhas de elevação.
- **Acompanhamento de Trajeto em Tempo Real:**
  - Simule o percurso com indicadores ao vivo de **Distância Restante**, **Tempo Restante**, barra de progresso, **Perfil Topográfico de Elevação (MOLA Datum)** e botão para **Parar/Pausar Trajeto** a qualquer momento.
- **Histórico de Rotas Salvas & Auditoria ETL:**
  - Salve e recarregue rotas passadas na aba **Salvas**.
  - Acompanhe todos os eventos estruturados com `correlation_id` na aba **Logs ETL** e exporte os CSVs/JSON atualizados.

---

## Pré-requisitos

A interface web do **Martian Atlas** não exige instalação de pacotes pesados de terceiros (`zero-build`). Para rodá-la localmente, basta ter **qualquer um** dos ambientes abaixo:
- **Node.js** (v18+ recomendado), **ou**
- **Python 3**, **ou**
- **Java JDK 18+** (utilizando a ferramenta nativa `jwebserver`).

---

## Como Rodar o Projeto (Aplicação Web)

Abra o terminal na pasta raiz do projeto e escolha **uma** das opções abaixo:

### Opção 1: Rodando com Node.js (Recomendado)
```bash
npm start
# ou diretamente:
node server.js
```
Acesse no navegador: **http://localhost:8080**

### Opção 2: Rodando com Python
```bash
python -m http.server 8080 --directory public
```
Acesse no navegador: **http://localhost:8080**

### Opção 3: Rodando no Windows sem Node/Python (via Java `jwebserver`)
Caso esteja no Windows com JDK instalado:
```powershell
jwebserver -b 127.0.0.1 -p 8080 -d .\public
```
Acesse no navegador: **http://localhost:8080**

---

## Como Rodar o Pipeline de ETL (Dados da NASA & USGS)

Os dados já vêm pré-processados e prontos para uso nas pastas `data/processed/` e `public/data/mars_atlas_data.js`. Caso queira executar novamente a extração e limpeza a partir dos dados brutos da NASA (`data/raw/M20_waypoints.json`):

### Via Python:
```bash
# (Opcional) Baixar novamente os dados brutos da API MMGIS da NASA:
python download_datasets.py

# Executar a limpeza e geração dos arquivos CSV, GeoJSON e bundle Web:
python etl_obstacles.py
```

### Via PowerShell (Windows):
```powershell
powershell -ExecutionPolicy Bypass -File .\run_etl.ps1
```

### Arquivos Gerados pelo ETL (`data/processed/`):
| Arquivo | Descrição |
| :--- | :--- |
| `jezero_obstacles_clean.csv` | Base tabular com **325 obstáculos** reais na Cratera Jezero, incluindo coordenadas, raio (`radius_meters`), inclinação (`slope_deg`) e escala de criticidade (`criticality_level` de `1` a `5`). |
| `jezero_obstacles_clean.geojson` | Camada geoespacial no padrão GeoJSON (`FeatureCollection`) pronta para sistemas GIS. |
| `jezero_science_targets.csv` | Base de pontos científicos reais da missão Mars 2020 na Cratera Jezero. |
| `public/data/mars_atlas_data.js` | Bundle unificado consumido automaticamente pelo front-end (obstáculos, pontos científicos, estação base fixa e trilha histórica de 708 waypoints do Perseverance). |

---

## Estrutura de Pastas

```text
├── data/
│   ├── raw/                        # Dados brutos oficiais da NASA (M20_waypoints.json)
│   └── processed/                  # CSVs e GeoJSON limpos gerados pelo ETL
├── public/                         # Aplicação Web Front-end (Martian Atlas)
│   ├── css/styles.css              # Estilização da interface e filtros de camadas
│   ├── data/mars_atlas_data.js     # Bundle de dados espaciais carregado no cliente
│   ├── js/
│   │   ├── app.js                  # Controlador principal, mapa Leaflet e simulação de rota
│   │   ├── router.js               # Motor de cálculo de múltiplas rotas (A* espacial em Marte)
│   │   └── logger.js               # Sistema de logging estruturado com correlation_id
│   └── index.html                  # Página principal da aplicação
├── download_datasets.py            # Script para download das bases da NASA/USGS
├── etl_obstacles.py                # Pipeline ETL em Python
├── run_etl.ps1                     # Pipeline ETL alternativo em PowerShell
├── server.js                       # Servidor HTTP local Node.js com logs estruturados
└── package.json                    # Configuração de scripts do projeto
```
