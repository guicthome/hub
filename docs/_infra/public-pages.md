---
layout: page
title: Páginas Públicas — Infraestrutura Open Pages
---

# Páginas Públicas (Open Pages)

Documentação da infraestrutura de publicação de páginas públicas do Hub Grupo CSV.

---

## Visão Geral

O Hub Grupo CSV possui uma infraestrutura independente para publicação rápida de páginas HTML acessíveis externamente, sem necessidade de autenticação. Esta infraestrutura é chamada de **Open Pages** e opera no subdomínio `open.grupocsv.com`.

**Objetivo:** Permitir o compartilhamento de relatórios, dashboards, propostas e datasets com parceiros externos (hospitais, operadoras, clientes) de forma rápida, segura e com controle de acesso (toggle ativo/inativo instantâneo).

**Arquitetura:**
- **Hospedagem:** Cloudflare R2 (Bucket `csv-open-pages`)
- **Estado (Toggle):** Cloudflare KV (Namespace `csv-open-pages`)
- **Roteamento e API:** Cloudflare Worker (`csv-open-pages`)
- **Domínio:** `open.grupocsv.com`
- **Repositório:** `grupocsv/csv-open-pages` (privado, contém o código do Worker e do painel admin)

---

## Como Funciona

### 1. Painel de Controle
O gerenciamento das páginas é feito através de um painel administrativo isolado, acessível em `https://open.grupocsv.com/_admin/`.

**Funcionalidades:**
- Autenticação por senha fixa (configurada como secret no Worker).
- Upload de arquivos HTML e assets (arrastar e soltar).
- Definição de slug (identificador na URL), título e descrição.
- Listagem de páginas publicadas com status atual.
- Toggle instantâneo (Ativar/Desativar) via Cloudflare KV.
- Cópia rápida do link público.

### 2. Roteamento e Bloqueio (Worker)
O Worker `csv-open-pages` intercepta todas as requisições para `open.grupocsv.com/*`.

**Fluxo de acesso público:**
1. Usuário acessa `https://open.grupocsv.com/{slug}/`.
2. O Worker consulta o status da página no Cloudflare KV (`page:{slug}`).
3. Se o status for `active`, o Worker busca o arquivo correspondente no bucket R2 e o serve ao usuário.
4. Se o status for `inactive` ou a página não existir, o Worker retorna uma página de erro 404 padronizada.

**Vantagem:** O bloqueio é real e ocorre na borda (edge). Uma página desativada não pode ser acessada, mesmo que os arquivos continuem armazenados no R2.

### 3. Legado (Diretório `/p/` no Hub)
Anteriormente, as páginas públicas eram armazenadas no diretório `/p/` do repositório principal do Hub e servidas via GitHub Pages. Este modelo foi descontinuado em favor da arquitetura independente (Open Pages) para permitir toggles instantâneos sem necessidade de novos deploys.

Páginas legadas (como o `tea-dataset`) foram migradas para o R2. O diretório `/p/` no repositório `grupocsv/hub` pode ser mantido temporariamente para fins de histórico ou redirecionamento (301), mas novas publicações devem ser feitas exclusivamente via painel Open Pages.

---

## Padrão HTML de Páginas Públicas

Toda página publicada no Open Pages deve ser autocontida (HTML, CSS inline ou em arquivos relativos, JS) e seguir as diretrizes visuais do Grupo CSV.

### Meta tags OpenGraph

Recomenda-se a inclusão de meta tags para melhorar a apresentação ao compartilhar links no WhatsApp, LinkedIn, etc.

```html
<meta property="og:title" content="{Título} | {Portal}">
<meta property="og:description" content="{Descrição curta}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="https://open.grupocsv.com/{slug}/">
<meta property="og:site_name" content="{Portal} | Grupo CSV">
```

### Autenticação

Páginas públicas **NÃO** devem incluir scripts de autenticação interna do Hub (como `/scripts/hub-auth.js`). Elas são, por definição, abertas a qualquer pessoa com o link, desde que o status no painel esteja como "Ativo".

---

## Histórico

| Data | Descrição |
|---|---|
| 2026-02-15 | Primeira página pública legada: `/p/tea-dataset/` no GitHub Pages |
| 2026-03-06 | Infraestrutura legada formalizada: `registry.json`, admin tab |
| 2026-03-18 | **Migração para Open Pages:** Nova arquitetura independente com Cloudflare Worker, R2 e KV no domínio `open.grupocsv.com`. Painel admin próprio e toggle instantâneo. |

---

## Arquivos e Repositórios Relacionados

| Item | Tipo | Descrição |
|---|---|---|
| `grupocsv/csv-open-pages` | Repositório | Código-fonte do Worker e do painel admin |
| `csv-open-pages` | CF Worker | Roteamento, API e bloqueio na borda |
| `csv-open-pages` | CF R2 | Bucket de armazenamento dos arquivos HTML/assets |
| `csv-open-pages` | CF KV | Armazenamento do estado (ativo/inativo) e metadados |
| `/docs/_infra/public-pages.md` | Docs | Este documento |
