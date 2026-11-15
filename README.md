# Martian_Atlas

**Contexto.** Exploradores de Marte precisam chegar a pontos científicos e estar preparados para
imprevistos no caminho.
**Problema.** Empecilhos que surgem de surpresa podem atrasar ou impedir um percurso.
**Solução.** Uma visão em camadas da Cratera Jezero que guia o percurso até pontos científicos já
explorados por missões anteriores e desvia dos empecilhos, inclusive dos reportados durante o trajeto.

## Como rodar

Requer Node.js 20+ (sem dependências externas).

```bash
npm start      # http://127.0.0.1:8080
npm test       # modelo de dados, pathfinding, rotas e simulação do trajeto
```

## Dados (`data/`)

| Arquivo | Conteúdo | Origem |
|---|---|---|
| `M2020_amostras_armazenadas.csv` | 21 pontos científicos (amostras do Perseverance) | fornecido pela equipe |
| `jezero_obstacles_v2_clean.csv` | 325 empecilhos com criticidade 1–5 | fornecido pela equipe |
| `satellite_jezero.png` + `.json` | imagem orbital 47 m/px, georreferenciada pelo `.vrt` | export QuickMap fornecido |
| `dem_jezero_200m.bin` + `.json` | elevação real (int16, 364×186) | recorte do *Mars HRSC-MOLA Blended DEM 200 m v2* (USGS) |

Os dois CSVs são **o modelo de dados**: `js/model/obstacles.js` e `js/model/samples.js` validam cada
linha, e todo registro novo é criado, salvo e salvo com as mesmas colunas e convenções
(aspas/BOM/CRLF no de empecilhos; `sample_id` `M2020-SSSSS-NN`, easting/northing na mesma projeção
equiretangular com latitude de escala 18,4663°).

## Funcionalidades

| Requisito | Onde |
|---|---|
| Adicionar parada | Aba **Rotas** → “+ Parada”, ou botão direito → “Adicionar parada aqui” |
| Novos pontos científicos | “+ Ponto científico” ou botão direito → formulário no modelo de amostras |
| Novos empecilhos (criticidade 1–5) | “+ Empecilho” ou botão direito → formulário no modelo de empecilhos |
| Informações do empecilho | Clique no círculo no mapa ou na lista |
| Todas as rotas possíveis | Até 3 alternativas distintas (mais rápida / mais curta / menos exposta) |
| Tempo de trajeto e distância restante | Painel de acompanhamento, atualizado em tempo real |
| Acompanhar o trajeto | “Iniciar trajeto”: rover simulado, câmera segue, velocidade ajustável |
| Parar o trajeto | “Pausar” / “Parar” (com confirmação) |
| Empecilho surpresa | Registrar durante o trajeto → verificação imediata → “Recalcular rota a partir daqui” |
| Salvar rotas passadas | Aba **Histórico** (concluídas, interrompidas e planejadas): ver no mapa, refazer |
| Camadas relevo / satélite | Botão de camadas: mapa base + empecilhos, amostras, declividade, grade |

Pontos, empecilhos e histórico ficam no `localStorage` do navegador.

## Como a rota é calculada

1. **Grade de custo** de 50 m (1340 × 703 células) sobre a área da imagem:
   - `passable_by_rover = False` → bloqueado no raio + folga por criticidade (10–50 m);
   - `passable_by_rover = True` → custo × `(1 + 4 · severity_score)` dentro do raio;
   - declividade do DEM: custo `1 + 0,5·(declive/8)²`, bloqueado acima de 25°.
2. **A\*** 8-conectado + suavização por linha de visada (`js/core/pathfinding.js`).
3. **Alternativas**: o corredor da rota encontrada é penalizado e o A\* roda de novo; rotas que repetem
   mais de 60% de outra são descartadas.
4. **Tempo**: 150 m/h × custo do terreno; 4,5 h de condução por sol.

## Limitações conhecidas

- A imagem de satélite tem 47 m/px e o DEM 200 m/px: o relevo fino (blocos, dunas) **não** aparece
  neles; quem representa esses riscos são os empecilhos do dataset.
- O acompanhamento do trajeto é **simulado** (não há telemetria real do rover).
- Os dados ficam só no navegador de quem os criou; para uso em equipe é preciso um backend.
