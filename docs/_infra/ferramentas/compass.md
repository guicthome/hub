# Compass™ — Publicações Estratégicas

## Visão Geral

O Compass™ é a linha editorial estratégica do Grupo CSV. Produz documentos técnico-estratégicos de alta densidade para tomada de decisão em saúde suplementar, combinando evidência científica, análise de dados e contexto regulatório brasileiro.

| Campo | Valor |
|---|---|
| Marca | Compass™ |
| URL | [hub.grupocsv.com/compass/](https://hub.grupocsv.com/compass/) |
| Hospedagem | GitHub Pages (VitePress) |
| Repositório | `grupocsv/hub` — `docs/compass/` |
| Formato | Markdown (VitePress) + PDF timbrado |
| Proprietário | Grupo CSV |

## Estrutura de Diretórios

```
compass/
  index.md                    Central Compass (índice de edições)
  edicoes/
    2026/
      001/compass.md           Edição 001 — Metas ACO
      001/assets/              PDF e recursos da edição
      002/compass.md           Edição 002 — Prostatectomia Robótica
      003/compass.md           Edição 003 — Fototerapia Neonatal
  policies/                    Políticas editoriais
  skills/                      Guias operacionais
  templates/                   Templates de edição
```

## Edições Publicadas

| Edição | Título | Período |
|---|---|---|
| 001/2026 | Metas quantitativas de produção em contratos ACO com orçamento global | 2026 |
| 002/2026 | O impacto da prostatectomia radical assistida por robô na saúde suplementar brasileira | 2025–2026 |
| 003/2026 | Fototerapia Neonatal | 2026 |

## Pipeline de Publicação

O pipeline completo envolve sete etapas: extração integral do texto-fonte, criação da estrutura de diretórios, redação do Markdown, geração do PDF timbrado via script Python (`tools/compass-pdf/compass-pdf-gen.py`), atualização da sidebar no `config.mts`, atualização do índice em `docs/compass/index.md`, e commit seguido de push na branch `main`.

O PDF é gerado com o pacote `fpdf2` (versão 2.x), utiliza fontes DejaVu e inclui cabeçalho institucional (`docs/public/compass_header.png`) e logo do Grupo CSV.

## Integração no Ecossistema

O Compass™ é indexado automaticamente pelo AI Search (Cloudflare AutoRAG) após cada deploy, tornando seu conteúdo consultável via API semântica por agentes e automações.
