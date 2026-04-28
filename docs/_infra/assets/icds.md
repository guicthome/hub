---
layout: page
title: "Assets ICDS"
---
<style scoped>
.VPPage { padding: 0 !important; }
.assets-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  background: radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%), radial-gradient(1200px 500px at 110% 0%, #e6f4ed 0%, transparent 60%), #F6F4EF;
  min-height: calc(100vh - 64px);
}
.dark .assets-page { background: var(--vp-c-bg); }
.frame {
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(13,38,76,.06);
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(13,38,76,.14);
  padding: clamp(18px, 4vw, 28px);
  margin-bottom: 24px;
}
.dark .frame { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }
.page-title {
  margin: 0 0 6px;
  font-size: clamp(1.6rem, 2.3vw + 1rem, 2rem);
  color: #1B3A5C;
  border: none;
}
.dark .page-title { color: #1B3A5C; filter: brightness(1.4); }
.page-subtitle { font-size: 0.92rem; color: #5b6470; margin: 0 0 8px; line-height: 1.6; }
.section-title {
  margin: 0 0 16px;
  color: #2d3445;
  font-size: clamp(1.15rem, 1.1vw + 0.9rem, 1.35rem);
  border: none;
}
.dark .section-title { color: var(--vp-c-text-1); }
.logo-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}
.logo-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.preview-light {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}
.preview-dark {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 120px;
}
.logo-item img {
  max-width: 100%;
  max-height: 100px;
  object-fit: contain;
}
.logo-label {
  font-size: 0.78rem;
  color: #5b6470;
  text-align: center;
  line-height: 1.4;
}
.dl-link {
  display: block;
  text-align: center;
  font-size: 0.78rem;
  color: #1B3A5C;
  text-decoration: none;
  font-weight: 600;
}
.dl-link:hover { text-decoration: underline; }
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 10px;
  background: #1B3A5C;
  color: white !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.back-link:hover { background: #2C5F8A; transform: translateY(-2px); }
.page-footer {
  background: #fff;
  border: 1px solid rgba(0,0,0,.06);
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(13,38,76,.10);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 16px;
  text-align: center;
}
.dark .page-footer { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }
.page-footer .small { font-size: 0.85rem; color: #5b6470; }
.rules-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin-top: 12px;
}
.rules-table th, .rules-table td {
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  text-align: left;
}
.rules-table th {
  background: #f0f2f5;
  font-weight: 600;
  color: #2d3445;
}
.dark .rules-table th { background: var(--vp-c-bg-alt); color: var(--vp-c-text-1); }
.dark .rules-table td { border-color: var(--vp-c-divider); }

.dark .dark .copy-bar-btn {
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

<div class="assets-page">
<div class="frame">
    <h1 class="page-title">Assets ICDS</h1>
    <p class="page-subtitle">
      Instituto de Cooperacao para o Desenvolvimento da Saude. Entidade Filantropica e Gestora Assistencial.<br>
      Cor primaria: azul marinho (#1B3A5C). Cor secundaria: azul medio (#2C5F8A).
    </p>
  </div>

  <div class="frame">
    <h2 class="section-title">Logotipos</h2>
    <p class="page-subtitle">Tres variantes oficiais do logo horizontal ICDS.</p>
    <div class="logo-grid">
      <div class="logo-item">
        <div class="preview-dark" style="background:#1B3A5C;">
          <img src="/visual-identity/icds/logo/png/icds_horizontal_fundo_azul.png" alt="ICDS Horizontal Fundo Azul" loading="lazy">
        </div>
        <div class="logo-label">Horizontal / Fundo azul institucional</div>
        <a href="/visual-identity/icds/logo/png/icds_horizontal_fundo_azul.png" download class="dl-link">Download PNG</a>
      </div>
      <div class="logo-item">
        <div class="preview-light">
          <img src="/visual-identity/icds/logo/png/icds_horizontal_sem_fundo_positivo.png" alt="ICDS Horizontal Positivo" loading="lazy">
        </div>
        <div class="logo-label">Horizontal / Sem fundo / Positivo (fundo claro)</div>
        <a href="/visual-identity/icds/logo/png/icds_horizontal_sem_fundo_positivo.png" download class="dl-link">Download PNG</a>
      </div>
      <div class="logo-item">
        <div class="preview-dark">
          <img src="/visual-identity/icds/logo/png/icds_horizontal_sem_fundo_negativo.png" alt="ICDS Horizontal Negativo" loading="lazy">
        </div>
        <div class="logo-label">Horizontal / Sem fundo / Negativo (fundo escuro)</div>
        <a href="/visual-identity/icds/logo/png/icds_horizontal_sem_fundo_negativo.png" download class="dl-link">Download PNG</a>
      </div>
    </div>
  </div>

  <div class="frame">
    <h2 class="section-title">Regras de Aplicacao</h2>
    <p class="page-subtitle">Seguem as mesmas regras de aplicacao das demais marcas do ecossistema Grupo CSV.</p>
    <table class="rules-table">
      <thead>
        <tr>
          <th>Contexto</th>
          <th>Variante recomendada</th>
          <th>Arquivo</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Navbar / Header web</td>
          <td>Horizontal, fundo azul</td>
          <td>icds_horizontal_fundo_azul.png</td>
        </tr>
        <tr>
          <td>Footer (inline, fundo claro)</td>
          <td>Horizontal, positivo</td>
          <td>icds_horizontal_sem_fundo_positivo.png</td>
        </tr>
        <tr>
          <td>Hero de pagina</td>
          <td>Horizontal, fundo azul</td>
          <td>icds_horizontal_fundo_azul.png</td>
        </tr>
        <tr>
          <td>Cabecalho de documento</td>
          <td>Horizontal, positivo</td>
          <td>icds_horizontal_sem_fundo_positivo.png</td>
        </tr>
        <tr>
          <td>Fundo escuro (dark mode, slide)</td>
          <td>Horizontal, negativo</td>
          <td>icds_horizontal_sem_fundo_negativo.png</td>
        </tr>
        <tr>
          <td>Card na homepage (fundo claro)</td>
          <td>Horizontal, fundo azul</td>
          <td>icds_horizontal_fundo_azul.png</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div style="text-align:center; margin-bottom:24px;">
    <a href="/_infra/assets/" class="back-link">Voltar a Central de Assets</a>
  </div>
  <div class="page-footer">
    <strong>ICDS — Parceiro Grupo CSV</strong>
    <div class="small">Identidade visual oficial. Uso conforme brand guidelines.</div>
  </div>
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
