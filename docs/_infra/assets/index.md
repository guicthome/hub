---
layout: page
title: Central de Assets
---

<style scoped>
.VPPage { padding: 0 !important; }

.assets-hub {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  background:
    radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%),
    radial-gradient(1200px 500px at 110% 0%, #e6f4ed 0%, transparent 60%),
    #F6F4EF;
  min-height: calc(100vh - 64px);
}
.dark .assets-hub { background: var(--vp-c-bg); }

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
  color: #196396;
  border: none;
}
.dark .page-title { color: #5da9e0; }
.page-subtitle { font-size: 0.92rem; color: #5b6470; margin: 0 0 8px; line-height: 1.6; }

.section-title {
  margin: 0 0 16px;
  color: #2d3445;
  font-size: clamp(1.15rem, 1.1vw + 0.9rem, 1.35rem);
  border: none;
}
.dark .section-title { color: var(--vp-c-text-1); }

.brand-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr;
}
@media (min-width: 760px) { .brand-grid { grid-template-columns: 1fr 1fr; } }

.brand-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(180deg, #f8f9fa, #f0f2f5);
  border: 1px solid rgba(13,38,76,.06);
  border-radius: 14px;
  text-decoration: none !important;
  color: #2d3445 !important;
  transition: all 0.18s;
}
.brand-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(13,38,76,.12); }
.dark .brand-card { background: linear-gradient(180deg, #1e2a3a, #1a2530); border-color: var(--vp-c-divider); color: var(--vp-c-text-1) !important; }

.brand-card img {
  width: 56px;
  height: 56px;
  border-radius: 12px;
  object-fit: contain;
  border: none;
  flex-shrink: 0;
}

.brand-card-text h3 {
  margin: 0 0 4px;
  font-size: 1rem;
  border: none;
}
.brand-card-text p {
  margin: 0;
  font-size: 0.82rem;
  color: #5b6470;
}

.extras-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
}
@media (min-width: 760px) { .extras-grid { grid-template-columns: 1fr 1fr 1fr; } }

.extras-card {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 20px;
  background: linear-gradient(180deg, #f8f9fa, #f0f2f5);
  border: 1px solid rgba(13,38,76,.06);
  border-radius: 14px;
  text-decoration: none !important;
  color: #2d3445 !important;
  transition: all 0.18s;
}
.extras-card:hover { transform: translateY(-3px); box-shadow: 0 8px 20px rgba(13,38,76,.12); }
.dark .extras-card { background: linear-gradient(180deg, #1e2a3a, #1a2530); border-color: var(--vp-c-divider); color: var(--vp-c-text-1) !important; }
.extras-card h4 { margin: 0; font-size: 0.95rem; border: none; color: #196396; }
.extras-card p { margin: 0; font-size: 0.82rem; color: #5b6470; }

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  border-radius: 10px;
  background: #196396;
  color: white !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
}
.back-link:hover { background: #1d7ab5; transform: translateY(-2px); }

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

<div class="assets-hub">
  <div class="frame">
    <h1 class="page-title">Central de Assets</h1>
    <p class="page-subtitle">
      Repositorio completo de identidade visual do ecossistema Grupo CSV. Todos os logotipos,
      avatares, papelaria, criativos e materiais de marca organizados por empresa.
    </p>
  </div>

  <div class="frame">
    <h2 class="section-title">Assets por Marca</h2>
    <div class="brand-grid">
      <a href="/_infra/assets/grupo-csv" class="brand-card">
        <img src="/visual-identity/grupo-csv/logo/png/grupo-csv_logo_horizontal_full-color_positive_transparent.png" alt="Grupo CSV">
        <div class="brand-card-text">
          <h3>Grupo CSV</h3>
          <p>Holding. Cuidados em Saude com Valor.</p>
        </div>
      </a>
      <a href="/_infra/assets/axiacare" class="brand-card">
        <img src="/visual-identity/axiacare/logo/png/axiacare_logo_horizontal_full-color_positive.png" alt="AxiaCare">
        <div class="brand-card-text">
          <h3>AxiaCare</h3>
          <p>Consultoria e gestao hospitalar.</p>
        </div>
      </a>
      <a href="/_infra/assets/medvalor" class="brand-card">
        <img src="/visual-identity/medvalor/logo/png/medvalor_logo_horizontal_orange_positive.png" alt="MedValor">
        <div class="brand-card-text">
          <h3>MedValor</h3>
          <p>Educacao medica e eventos.</p>
        </div>
      </a>
      <a href="/_infra/assets/thera" class="brand-card">
        <img src="/visual-identity/thera/logo/png/thera_logo_horizontal_purple_positive.png" alt="TheraTech">
        <div class="brand-card-text">
          <h3>Thera</h3>
          <p>Tecnologia e SaaS em saude.</p>
        </div>
      </a>
      <a href="/_infra/assets/guilherme-thome" class="brand-card">
        <img src="/visual-identity/guilherme-thome/avatar/guilherme-thome_avatar_current.png" alt="Dr. Guilherme C. Thomé">
        <div class="brand-card-text">
          <h3>Dr. Guilherme C. Thome</h3>
          <p>Marca pessoal do fundador.</p>
        </div>
      </a>
      <a href="/_infra/assets/icds" class="brand-card">
        <img src="/visual-identity/icds/logo/png/icds_horizontal_fundo_azul.png" alt="ICDS">
        <div class="brand-card-text">
          <h3>ICDS</h3>
          <p>Parceiro. Entidade Filantropica e Gestora Assistencial.</p>
        </div>
      </a>
    </div>
  </div>

  <div class="frame">
    <h2 class="section-title">Recursos Transversais</h2>
    <div class="extras-grid">
      <a href="/_infra/assets/brand-guidelines" class="extras-card">
        <h4>Brand Guidelines</h4>
        <p>Guias de identidade visual, cores, fontes e regras de uso.</p>
      </a>
      <a href="/_infra/assets/creatives" class="extras-card">
        <h4>Criativos</h4>
        <p>Social media, banners, QR codes, thumbnails e backgrounds virtuais.</p>
      </a>
      <a href="/_infra/assets/wallpapers" class="extras-card">
        <h4>Wallpapers</h4>
        <p>Fundos de tela para desktop, celular e videochamadas.</p>
      </a>
    </div>
  </div>

  <div style="text-align:center; margin-bottom:24px;">
    <a href="/_infra/" class="back-link">Voltar a Infraestrutura Cognitiva</a>
  </div>

  <div class="page-footer">
    <strong>Central de Assets — Grupo CSV</strong>
    <div class="small">Identidade visual oficial do ecossistema. Fonte de verdade: _manifest.json</div>
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
