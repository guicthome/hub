# Paginas Publicas (/p/)

Documentacao da infraestrutura de publicacao de paginas publicas do Hub Grupo CSV.

---

## Visao Geral

O Hub Grupo CSV possui portais protegidos por autenticacao (`/unimed/`, `/unihealth/`, `/icds/`, `/axia/`, `/thera/`, `/medvalor/`). Cada portal contem ferramentas, formularios, paineis e relatorios em HTML.

A infraestrutura de **paginas publicas** permite publicar copias dessas paginas em `/p/{slug}/`, tornando-as acessiveis sem login. Isso e necessario quando uma ferramenta precisa ser compartilhada com pessoas externas ao Hub (pacientes, profissionais de outras instituicoes, parceiros).

A autenticacao dos portais e gerenciada pelo Worker `csv-auth`. As paginas publicas em `/p/` nao passam por esse Worker -- sao servidas diretamente pelo GitHub Pages.

---

## Arquitetura

```
hub.grupocsv.com/
  p/
    index.html          <- Redirect de protecao (redireciona para /)
    registry.json       <- Catalogo de todas as paginas publicas
    tea-dataset/
      index.html        <- Primeira pagina publica (referencia)
    {slug}/
      index.html        <- Novas paginas publicas
  scripts/
    public-link-btn.js  <- Botao admin-only para exibir link publico
  admin/
    index.html          <- Aba "Links Publicos" (le registry.json)
  skills/
    public-pages.md     <- Skill operacional para agentes
  docs/
    public-pages.md     <- Este documento
```

---

## Componentes

### 1. Registry (`/p/registry.json`)

Catalogo central de todas as paginas publicas. Lido pelo admin e pelo botao admin-only.

**Schema:**

```json
{
  "version": 1,
  "updated_at": "YYYY-MM-DD",
  "pages": [
    {
      "slug": "tea-dataset",
      "title": "Data Set TEA",
      "description": "Questionario de coleta de dados para TEA",
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

| Campo | Tipo | Obrigatorio | Descricao |
|---|---|---|---|
| slug | string | sim | Identificador unico, corresponde a subpasta em /p/ |
| title | string | sim | Titulo legivel |
| description | string | sim | Descricao curta |
| origin_portal | string | sim | ID do portal: unimed, unihealth, icds, axiacare, thera, medvalor |
| origin_page | string | sim | Nome do arquivo HTML original no portal |
| public_url | string | sim | URL publica completa |
| status | string | sim | "active" ou "inactive" |
| created_at | string | sim | Data de criacao (YYYY-MM-DD) |
| og_image | string | nao | URL da imagem OpenGraph (fallback: og_hub.png) |

**Regras:**
- O campo `slug` deve ser unico
- O campo `origin_page` deve corresponder ao nome real do arquivo no portal
- O campo `status` controla visibilidade no admin (ambos aparecem) e no botao (so "active")
- Ao adicionar ou remover paginas, atualizar `updated_at`

### 2. Botao Admin-Only (`/scripts/public-link-btn.js`)

Script que renderiza um botao fixo nas paginas dos portais, visivel apenas para administradores.

**Inclusao:**
```html
<script src="/scripts/public-link-btn.js" data-page="onco.html"></script>
```

**Comportamento:**
- Verifica `hub_auth_admin_token` e `hub_auth_admin_expires` no localStorage
- Se nao e admin: nao renderiza nada (zero impacto no DOM)
- Se e admin: renderiza botao fixo no canto superior direito (icone de link)
- Ao clicar: faz fetch de `/p/registry.json` (uma vez, cacheado em memoria)
- Se encontra entrada com `origin_page` correspondente e `status === 'active'`: exibe titulo, URL e botao "Copiar link"
- Se nao encontra: exibe mensagem informativa

**Posicionamento:**
- Desktop: `top: 20px; right: 200px` (a esquerda dos botoes do hub-auth.js)
- Mobile: `left: 60px; top: 16px`
- Print: oculto

**Dependencias:** Nenhuma. O script e auto-contido (CSS inline, sem bibliotecas externas).

### 3. Aba no Admin (`/admin/index.html`)

A aba "Links Publicos" no painel administrativo exibe uma tabela com todas as entradas do registry.json.

**Funcionalidades:**
- Contagem de paginas ativas no summary-bar
- Tabela com colunas: Titulo, Portal, URL, Status, Criado em, Acoes
- Botao "Copiar link" com feedback visual (icone fica verde + toast)
- Botao "Abrir em nova aba"
- Carrega automaticamente ao abrir o dashboard (para popular o summary-bar)
- Recarrega ao clicar na aba

**Fonte de dados:** Fetch direto de `/p/registry.json` (nao depende do Worker csv-auth).

---

## Padrao HTML de Paginas Publicas

Toda pagina em `/p/{slug}/index.html` deve seguir este padrao:

### Meta tags OpenGraph

```html
<meta property="og:title" content="{Titulo} | {Portal}">
<meta property="og:description" content="{Descricao curta}">
<meta property="og:type" content="website">
<meta property="og:locale" content="pt_BR">
<meta property="og:image" content="https://hub.grupocsv.com/assets/og/{og_image}">
<meta property="og:url" content="https://hub.grupocsv.com/p/{slug}/">
<meta property="og:site_name" content="{Portal} | Hub Grupo CSV">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="{Titulo}">
<meta name="twitter:description" content="{Descricao curta}">
<meta name="twitter:image" content="https://hub.grupocsv.com/assets/og/{og_image}">
```

**Imagens OG disponiveis:**

| Arquivo | Uso |
|---|---|
| og_hub.png | Fallback generico |
| og_unimed.png | Paginas de origem Unimed |
| og_unihealth.png | Paginas de origem Unihealth |
| og_axiacare.png | Paginas de origem AxiaCare |
| og_thera.png | Paginas de origem Thera |
| og_medvalor.png | Paginas de origem MedValor |
| og_compass.png | Paginas do Compass |
| og_founder.png | Paginas do Founder |

Todas em `/assets/og/`.

### Hub Back Button

CSS (no `<style>`):
```css
.hub-back-btn{position:fixed;top:16px;left:16px;z-index:9999;display:inline-flex;align-items:center;gap:6px;padding:8px 16px;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(0,0,0,0.1);border-radius:10px;box-shadow:0 2px 12px rgba(0,0,0,0.08);color:#1B3A5C;text-decoration:none;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;font-size:13px;font-weight:600;transition:all 0.2s;line-height:1}
@media(max-width:768px){.hub-back-btn{position:relative;top:auto;left:auto;display:flex;width:fit-content;margin:12px auto 0;z-index:1;box-shadow:0 1px 6px rgba(0,0,0,0.06)}}
.hub-back-btn:hover{background:#1B3A5C;color:#fff;box-shadow:0 4px 20px rgba(27,58,92,0.3);transform:translateY(-1px)}
@media print{.hub-back-btn{display:none!important}}
```

HTML (logo apos `<body>`):
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

### Autenticacao

Paginas publicas NAO incluem `/scripts/hub-auth.js`. Se a pagina original usa autenticacao propria (ex: TEA com compartilhamento por hash), adapte o fluxo para funcionar sem hub-auth.js, usando o Worker csv-auth diretamente quando necessario.

---

## Historico

| Data | Descricao |
|---|---|
| 2026-02-15 | Primeira pagina publica: /p/tea-dataset/ |
| 2026-03-06 | Infraestrutura formalizada: registry.json, admin tab, public-link-btn.js, skill, docs |

---

## Arquivos Relacionados

| Arquivo | Tipo | Descricao |
|---|---|---|
| /p/registry.json | Dados | Catalogo de paginas publicas |
| /p/index.html | HTML | Redirect de protecao |
| /p/tea-dataset/index.html | HTML | Primeira pagina publica (referencia) |
| /scripts/public-link-btn.js | JS | Botao admin-only |
| /admin/index.html | HTML | Painel admin com aba Links Publicos |
| /skills/public-pages.md | Skill | Instrucao operacional para agentes |
| /docs/public-pages.md | Docs | Este documento |
