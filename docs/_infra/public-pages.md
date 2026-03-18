---
layout: page
title: Páginas Públicas — Infraestrutura /p/
---

# Páginas Públicas (/p/)

Documentação da infraestrutura de publicação de páginas públicas do Hub Grupo CSV.

---

## Visão Geral

O Hub Grupo CSV possui portais protegidos por autenticação (`/unimed/`, `/unihealth/`, `/icds/`, `/axia/`, `/thera/`, `/medvalor/`). Cada portal contém ferramentas, formulários, painéis e relatórios em HTML.

A infraestrutura de **páginas públicas** permite publicar cópias dessas páginas em `/p/{slug}/`, tornando-as acessíveis sem login. Isso é necessário quando uma ferramenta precisa ser compartilhada com pessoas externas ao Hub (pacientes, profissionais de outras instituições, parceiros).

A autenticação dos portais é gerenciada pelo Worker `csv-auth`. As páginas públicas em `/p/` não passam por esse Worker — são servidas diretamente pelo GitHub Pages.

---

## Arquitetura

```
hub.grupocsv.com/
  p/
    index.html          <- Redirect de proteção (redireciona para /)
    registry.json       <- Catálogo de todas as páginas públicas
    tea-dataset/
      index.html        <- Primeira página pública (referência)
    {slug}/
      index.html        <- Novas páginas públicas
  scripts/
    public-link-btn.js  <- Botão admin-only para exibir link público
  admin/
    index.html          <- Aba "Links Públicos" (lê registry.json)
  skills/
    public-pages.md     <- Skill operacional para agentes
  docs/_infra/
    public-pages.md     <- Este documento
```

---

## Componentes

### 1. Registry (`/p/registry.json`)

Catálogo central de todas as páginas públicas. Lido pelo admin e pelo botão admin-only.

**Schema:**

```json
{
  "version": 1,
  "updated_at": "YYYY-MM-DD",
  "pages": [
    {
      "slug": "tea-dataset",
      "title": "Data Set TEA",
      "description": "Questionário de coleta de dados para TEA",
      "origin_portal": "icds",
      "origin_page": "tea.html",
      "public_url": "https://hub.grupocsv.com/p/tea-dataset/",
      "status": "active",
      "created_at": "2026-02-15",
      "og_image": "https://hub.grupocsv.com/assets/og/og_hub.png"
    }
  ]
}
```

**Campos:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| slug | string | sim | Identificador único, corresponde à subpasta em /p/ |
| title | string | sim | Título legível |
| description | string | sim | Descrição curta |
| origin_portal | string | sim | ID do portal: unimed, unihealth, icds, axiacare, thera, medvalor |
| origin_page | string | sim | Nome do arquivo HTML original no portal |
| public_url | string | sim | URL pública completa |
| status | string | sim | "active" ou "inactive" |
| created_at | string | sim | Data de criação (YYYY-MM-DD) |
| og_image | string | não | URL da imagem OpenGraph (fallback: og_hub.png) |

**Regras:**
- O campo `slug` deve ser único
- O campo `origin_page` deve corresponder ao nome real do arquivo no portal
- O campo `status` controla visibilidade no admin (ambos aparecem) e no botão (só "active")
- Ao adicionar ou remover páginas, atualizar `updated_at`

### 2. Botão Admin-Only (`/scripts/public-link-btn.js`)

Script que renderiza um botão fixo nas páginas dos portais, visível apenas para administradores.

**Inclusão:**
```html
<script src="/scripts/public-link-btn.js" data-page="onco.html"></script>
```

**Comportamento:**
- Verifica `hub_auth_admin_token` e `hub_auth_admin_expires` no localStorage
- Se não é admin: não renderiza nada (zero impacto no DOM)
- Se é admin: renderiza botão fixo no canto superior direito (ícone de link)
- Ao clicar: faz fetch de `/p/registry.json` (uma vez, cacheado em memória)
- Se encontra entrada com `origin_page` correspondente e `status === 'active'`: exibe título, URL e botão "Copiar link"
- Se não encontra: exibe mensagem informativa

**Posicionamento:**
- Desktop: `top: 20px; right: 200px` (à esquerda dos botões do hub-auth.js)
- Mobile: `left: 60px; top: 16px`
- Print: oculto

**Dependências:** Nenhuma. O script é auto-contido (CSS inline, sem bibliotecas externas).

### 3. Aba no Admin (`/admin/index.html`)

A aba "Links Públicos" no painel administrativo exibe uma tabela com todas as entradas do registry.json.

**Funcionalidades:**
- Contagem de páginas ativas no summary-bar
- Tabela com colunas: Título, Portal, URL, Status, Criado em, Ações
- Botão "Copiar link" com feedback visual (ícone fica verde + toast)
- Botão "Abrir em nova aba"
- Carrega automaticamente ao abrir o dashboard (para popular o summary-bar)
- Recarrega ao clicar na aba

**Fonte de dados:** Fetch direto de `/p/registry.json` (não depende do Worker csv-auth).

---

## Padrão HTML de Páginas Públicas

Toda página em `/p/{slug}/index.html` deve seguir este padrão:

### Meta tags OpenGraph

```html
<meta property="og:title" content="{Título} | {Portal}">
<meta property="og:description" content="{Descrição curta}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="https://hub.grupocsv.com/assets/og/{og_image}">
<meta property="og:url" content="https://hub.grupocsv.com/p/{slug}/">
<meta property="og:site_name" content="{Portal} | Hub Grupo CSV">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Título}">
<meta name="twitter:description" content="{Descrição curta}">
<meta name="twitter:image" content="https://hub.grupocsv.com/assets/og/{og_image}">
```

**Imagens OG disponíveis:**

| Arquivo | Uso |
|---|---|
| og_hub.png | Fallback genérico |
| og_unimed.png | Páginas de origem Unimed |
| og_unihealth.png | Páginas de origem Unihealth |
| og_axiacare.png | Páginas de origem AxiaCare |
| og_thera.png | Páginas de origem Thera |
| og_medvalor.png | Páginas de origem MedValor |
| og_compass.png | Páginas do Compass |
| og_founder.png | Páginas do Founder |

Todas em `/assets/og/`.

### Hub Back Button

CSS (no `<style>`):
```css
.hub-back-btn{position:fixed;top:16px;left:16px;z-index:9999;display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(0,0,0,0.1);border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);color:#1B3A5C;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;font-weight:600;transition:all 0.2s;line-height:1}
@media(max-width:768px){.hub-back-btn{position:relative;top:auto;left:auto;display:flex;width:fit-content;margin:12px auto 0;z-index:1;box-shadow:0 1px 6px rgba(0,0,0,0.06)}}
.hub-back-btn:hover{background:#1B3A5C;color:#fff;box-shadow:0 4px 20px rgba(27,58,92,0.3);transform:translateY(-1px)}
@media print{.hub-back-btn{display:none!important}}
```

HTML (logo após `<body>`):
```html
<a href="https://hub.grupocsv.com" class="hub-back-btn">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px"><polyline points="15 18 9 12 15 6"/></svg>
  Hub CSV
</a>
```

### Favicons

```html
<link rel="icon" href="/assets/favicons/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicons/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicons/apple-touch-icon.png">
```

### Autenticação

Páginas públicas NÃO incluem `/scripts/hub-auth.js`. Se a página original usa autenticação própria (ex: TEA com compartilhamento por hash), adapte o fluxo para funcionar sem hub-auth.js, usando o Worker csv-auth diretamente quando necessário.

---

## Histórico

| Data | Descrição |
|---|---|
| 2026-02-15 | Primeira página pública: /p/tea-dataset/ |
| 2026-03-06 | Infraestrutura formalizada: registry.json, admin tab, public-link-btn.js, skill, docs |

---

## Arquivos Relacionados

| Arquivo | Tipo | Descrição |
|---|---|---|
| /p/registry.json | Dados | Catálogo de páginas públicas |
| /p/index.html | HTML | Redirect de proteção |
| /p/tea-dataset/index.html | HTML | Primeira página pública (referência) |
| /scripts/public-link-btn.js | JS | Botão admin-only |
| /admin/index.html | HTML | Painel admin com aba Links Públicos |
| /skills/public-pages.md | Skill | Instrução operacional para agentes |
| /docs/_infra/public-pages.md | Docs | Este documento |
