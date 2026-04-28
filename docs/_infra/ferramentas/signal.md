# Signal™ — Boletim Semanal de Inteligência

## Visão Geral

O Signal™ é o resumo semanal de inteligência estratégica do Grupo CSV. Cada edição sintetiza os cinco a sete fatos mais relevantes da semana para gestores e líderes em saúde suplementar, com foco em regulação, mercado, tecnologia e operações.

| Campo | Valor |
|---|---|
| Marca | Signal™ |
| URL | [hub.grupocsv.com/signal/](https://hub.grupocsv.com/signal/) |
| Hospedagem | GitHub Pages (VitePress) |
| Repositório | `grupocsv/hub` — `docs/signal/` |
| Formato | Markdown (VitePress) + PDF (exatamente 1 página A4) |
| Distribuição | E-mail via csv-mail (Resend) |
| Proprietário | Grupo CSV |

## Estrutura de Diretórios

```
signal/
  index.md                    Central Signal (índice de edições)
  edicoes/
    2026/
      S07/signal.md            Edição S07
      S07/metadata.yml         Metadados da edição
      S07/assets/              PDF da edição
      ...
      S16/signal.md            Edição S16
  policies/
    padrao-editorial.md        Padrão editorial
  skills/
    gerar-signal.md            Guia operacional
  templates/
    signal_template.md         Template de edição
```

## Edições Publicadas

| Edição | Período |
|---|---|
| S07/2026 | 16–20 Fev |
| S08/2026 | 23–27 Fev |
| S09/2026 | 2–6 Mar |
| S10/2026 | 9–13 Mar |
| S11/2026 | 16–20 Mar |
| S12/2026 | 23–27 Mar |
| S13/2026 | 30 Mar–05 Abr |
| S14/2026 | 06–12 Abr |
| S15/2026 | 13–19 Abr |
| S16/2026 | 20–26 Abr |

## Regras Críticas

A **fonte única da numeração** é a Central Signal no Hub (`docs/signal/index.md`). Nunca utilizar Gmail, Notion ou qualquer outra fonte para determinar o número da próxima edição.

O **envio por e-mail** é feito exclusivamente via skill `csv-mail` com endpoint `/send-template`. Nunca utilizar Gmail MCP para envio do Signal.

O **PDF** deve ter exatamente uma página A4, gerado com script em `tools/signal-pdf/`.

## Pipeline de Publicação

O pipeline completo envolve doze etapas: determinar número da edição (fonte: `docs/signal/index.md`), gerar PDF, criar estrutura de diretórios da edição, criar `signal.md` e `metadata.yml`, copiar PDF para assets, atualizar `docs/signal/index.md`, atualizar `config.mts` (sidebar), atualizar `signal/README.md`, commit, push, e envio do e-mail via csv-mail com PDF em anexo.

## Integração no Ecossistema

O Signal™ é indexado automaticamente pelo AI Search após cada deploy. O envio por e-mail utiliza o Worker csv-mail (`mail-api.grupocsv.com`) com autenticação via Bearer token e templates HTML institucionais.
