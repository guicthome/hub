
<style>
.copy-md-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(25, 99, 150, 0.9);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.18);
  transition: all 0.2s;
  opacity: 0.7;
}
.copy-md-float:hover { opacity: 1; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.25); }
.copy-md-float.copied { background: rgba(5, 150, 105, 0.9); opacity: 1; }
.dark .copy-md-float { background: rgba(93, 169, 224, 0.85); color: #0f172a; }
.dark .copy-md-float.copied { background: rgba(52, 211, 153, 0.85); }
</style>

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


<button class="copy-md-float" id="copy-md-float" onclick="copyPageMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar em Markdown
</button>

<script>
function copyPageMd() {
  // Extrai o conteúdo Markdown renderizado da página
  const content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main');
  if (!content) return;

  // Converte o HTML visível para texto limpo (pseudo-Markdown)
  function htmlToMd(el) {
    let md = '';
    const walk = (node) => {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      // Pular botões de cópia e nav
      if (node.classList.contains('copy-md-float') || node.classList.contains('copy-btn')) return;
      if (tag === 'style' || tag === 'script' || tag === 'nav' || tag === 'aside') return;

      if (tag === 'h1') { md += '\n# '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h2') { md += '\n## '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h3') { md += '\n### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h4') { md += '\n#### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'br') { md += '\n'; return; }
      if (tag === 'strong' || tag === 'b') { md += '**'; node.childNodes.forEach(walk); md += '**'; return; }
      if (tag === 'em' || tag === 'i') { md += '*'; node.childNodes.forEach(walk); md += '*'; return; }
      if (tag === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
        md += '`' + node.textContent + '`'; return;
      }
      if (tag === 'pre') { md += '\n```\n' + node.textContent + '\n```\n\n'; return; }
      if (tag === 'a') { md += '['; node.childNodes.forEach(walk); md += '](' + (node.href || '') + ')'; return; }
      if (tag === 'li') { md += '- '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'table') {
        const rows = node.querySelectorAll('tr');
        rows.forEach((row, i) => {
          const cells = row.querySelectorAll('th, td');
          md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\n';
          if (i === 0) md += '|' + Array.from(cells).map(() => '---').join('|') + '|\n';
        });
        md += '\n';
        return;
      }
      if (tag === 'hr') { md += '\n---\n\n'; return; }
      if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'img') return; // pular imagens
      if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main' || tag === 'span') {
        node.childNodes.forEach(walk);
        return;
      }
      node.childNodes.forEach(walk);
    };
    walk(el);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }

  const md = htmlToMd(content);
  navigator.clipboard.writeText(md).then(() => {
    const btn = document.getElementById('copy-md-float');
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado!';
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2500);
  });
}
</script>
