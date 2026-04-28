---
layout: page
title: Criativos
---

<style scoped>
.VPPage { padding: 0 !important; }

.cr-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  background:
    radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%),
    radial-gradient(1200px 500px at 110% 0%, #e6f4ed 0%, transparent 60%),
    #F6F4EF;
  min-height: calc(100vh - 64px);
}
.dark .cr-page { background: var(--vp-c-bg); }

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

.creative-grid {
  display: grid;
  gap: 14px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}

.creative-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.creative-preview {
  background: #f0f2f5;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.creative-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.creative-label {
  font-size: 0.75rem;
  color: #5b6470;
  text-align: center;
  line-height: 1.3;
  word-break: break-all;
}

.dl-link {
  display: block;
  text-align: center;
  font-size: 0.78rem;
  color: #196396;
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

.note { font-size: 0.82rem; color: #94a3b8; font-style: italic; margin-bottom: 16px; }
</style>

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


<div class="cr-page">
  <div class="frame">
    <h1 class="page-title">Criativos e Wallpapers</h1>
    <p class="page-subtitle">
      Pecas criativas para social media, banners, QR codes, thumbnails, backgrounds virtuais
      e wallpapers do ecossistema Grupo CSV.
    </p>
  </div>

  <div class="frame">
    <h2 class="section-title">Acesso aos Arquivos</h2>
    <p class="page-subtitle">
      Os criativos e wallpapers estao disponiveis diretamente no repositorio. Navegue pelas pastas
      abaixo para visualizar e baixar os arquivos.
    </p>
    <div style="display:flex; flex-direction:column; gap:8px; margin-top:16px;">
      <a href="https://github.com/grupocsv/hub/tree/main/assets/visual-identity/_creatives" target="_blank" style="display:flex; align-items:center; gap:12px; padding:14px 18px; background:#f8f9fa; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; color:#2d3445; transition:all 0.15s;">
        <span style="display:inline-flex; align-items:center; justify-content:center; width:42px; height:28px; background:#196396; color:white; border-radius:6px; font-size:0.7rem; font-weight:700; flex-shrink:0;">DIR</span>
        <span style="font-size:0.9rem;"><strong>_creatives/</strong> — Social media, banners, QR codes, thumbnails, backgrounds virtuais</span>
      </a>
      <a href="https://github.com/grupocsv/hub/tree/main/assets/visual-identity/_wallpapers" target="_blank" style="display:flex; align-items:center; gap:12px; padding:14px 18px; background:#f8f9fa; border:1px solid #e5e7eb; border-radius:10px; text-decoration:none; color:#2d3445; transition:all 0.15s;">
        <span style="display:inline-flex; align-items:center; justify-content:center; width:42px; height:28px; background:#196396; color:white; border-radius:6px; font-size:0.7rem; font-weight:700; flex-shrink:0;">DIR</span>
        <span style="font-size:0.9rem;"><strong>_wallpapers/</strong> — Wallpapers desktop, celular e videochamadas (ate 8K)</span>
      </a>
    </div>
  </div>

  <div style="text-align:center; margin-bottom:24px;">
    <a href="/_infra/assets/" class="back-link">Voltar a Central de Assets</a>
  </div>

  <div class="page-footer">
    <strong>Criativos e Wallpapers — Grupo CSV</strong>
    <div class="small">Materiais de marketing e comunicacao visual do ecossistema.</div>
  </div>
</div>


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
