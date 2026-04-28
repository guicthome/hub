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
.copy-page-wrap { display: flex; justify-content: flex-end; margin-bottom: 8px; }
</style>
<div class="cr-page">
<div class="copy-page-wrap">
<button class="copy-page-btn" id="copy-page-btn" onclick="copyPageAsMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>
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
