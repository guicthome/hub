# Signal™ — Boletim Semanal de Inteligência

<style>
.copy-page-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 8px;
  background: #f1f5f9;
  color: #64748b;
  border: 1px solid #e2e8f0;
  cursor: pointer;
  font-weight: 500;
  font-size: 0.8rem;
  transition: all .15s ease;
  font-family: inherit;
  line-height: 1;
}
.copy-page-btn:hover { background: #e2e8f0; color: #475569; border-color: #cbd5e1; }
.copy-page-btn.copied { background: #dcfce7; color: #166534; border-color: #bbf7d0; }
.dark .copy-page-btn { background: #1e293b; color: #94a3b8; border-color: #334155; }
.dark .copy-page-btn:hover { background: #334155; color: #cbd5e1; border-color: #475569; }
.dark .copy-page-btn.copied { background: #14532d; color: #86efac; border-color: #166534; }
.copy-page-wrap { display: flex; justify-content: flex-end; margin-bottom: 16px; }
</style>
<div class="copy-page-wrap">
<button class="copy-page-btn" id="copy-page-btn" onclick="copyPageAsMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>

<script>
function copyPageAsMd() {
  var content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main');
  if (!content) return;
  function htmlToMd(el) {
    var md = '';
    function walk(node) {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      var tag = node.tagName.toLowerCase();
      if (node.classList && (node.classList.contains('copy-page-btn') || node.classList.contains('copy-page-wrap'))) return;
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
        var rows = node.querySelectorAll('tr');
        rows.forEach(function(row, i) {
          var cells = row.querySelectorAll('th, td');
          md += '| ' + Array.from(cells).map(function(c) { return c.textContent.trim(); }).join(' | ') + ' |\n';
          if (i === 0) md += '|' + Array.from(cells).map(function() { return '---'; }).join('|') + '|\n';
        });
        md += '\n';
        return;
      }
      if (tag === 'hr') { md += '\n---\n\n'; return; }
      if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'img') return;
      node.childNodes.forEach(walk);
    }
    walk(el);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }
  var md = htmlToMd(content);
  navigator.clipboard.writeText(md).then(function() {
    var btn = document.getElementById('copy-page-btn');
    btn.classList.add('copied');
    var orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado!';
    setTimeout(function() { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2500);
  });
}
</script>

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
