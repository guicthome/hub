# Signal™ — Boletim Semanal de Inteligência

<style>
.copy-bar {
  position: fixed;
  top: 72px;
  right: 24px;
  z-index: 20;
}
.copy-bar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all .2s ease;
  font-family: inherit;
  line-height: 1.2;
}
.copy-bar-btn:hover { background: #e5e7eb; color: #111827; border-color: #9ca3af; }
.copy-bar-btn.copied { background: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.dark .copy-bar-btn { background: #1f2937; color: #d1d5db; border-color: #4b5563; }
.dark .copy-bar-btn:hover { background: #374151; color: #f3f4f6; border-color: #6b7280; }
.dark .copy-bar-btn.copied { background: #064e3b; color: #6ee7b7; border-color: #065f46; }
</style>

<div class="copy-bar">
<button class="copy-bar-btn" id="copy-page-btn">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const btn = document.getElementById('copy-page-btn')
  if (!btn) return
  btn.addEventListener('click', () => {
    const content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main')
    if (!content) return

    function htmlToMd(el) {
      let md = ''
      function walk(node) {
        if (node.nodeType === 3) { md += node.textContent; return }
        if (node.nodeType !== 1) return
        const tag = node.tagName.toLowerCase()
        if (node.classList && (node.classList.contains('copy-bar-btn') || node.classList.contains('copy-bar'))) return
        if (['style','script','nav','aside'].includes(tag)) return
        if (tag === 'h1') { md += '\n# '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h2') { md += '\n## '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h3') { md += '\n### '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h4') { md += '\n#### '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'br') { md += '\n'; return }
        if (tag === 'strong' || tag === 'b') { md += '**'; node.childNodes.forEach(walk); md += '**'; return }
        if (tag === 'em' || tag === 'i') { md += '*'; node.childNodes.forEach(walk); md += '*'; return }
        if (tag === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
          md += '`' + node.textContent + '`'; return
        }
        if (tag === 'pre') { md += '\n```\n' + node.textContent + '\n```\n\n'; return }
        if (tag === 'a') { md += '['; node.childNodes.forEach(walk); md += '](' + (node.href || '') + ')'; return }
        if (tag === 'li') { md += '- '; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'table') {
          const rows = node.querySelectorAll('tr')
          rows.forEach((row, i) => {
            const cells = row.querySelectorAll('th, td')
            md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\n'
            if (i === 0) md += '|' + Array.from(cells).map(() => '---').join('|') + '|\n'
          })
          md += '\n'
          return
        }
        if (tag === 'hr') { md += '\n---\n\n'; return }
        if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'img') return
        node.childNodes.forEach(walk)
      }
      walk(el)
      return md.replace(/\n{3,}/g, '\n\n').trim()
    }

    const md = htmlToMd(content)
    navigator.clipboard.writeText(md).then(() => {
      btn.classList.add('copied')
      const origHTML = btn.innerHTML
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!'
      setTimeout(() => {
        btn.classList.remove('copied')
        btn.innerHTML = origHTML
      }, 3000)
    }).catch(() => {
      // Fallback para contextos sem clipboard API
      const ta = document.createElement('textarea')
      ta.value = md
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      btn.classList.add('copied')
      const origHTML = btn.innerHTML
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!'
      setTimeout(() => {
        btn.classList.remove('copied')
        btn.innerHTML = origHTML
      }, 3000)
    })
  })
})
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
