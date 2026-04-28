---
layout: page
title: Wallpapers
---

<script setup>
</script>

<style scoped>
.VPPage { padding: 0 !important; }

.wp-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  background:
    radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%),
    radial-gradient(1200px 500px at 110% 0%, #e6f4ed 0%, transparent 60%),
    #F6F4EF;
  min-height: calc(100vh - 64px);
}
.dark .wp-page { background: var(--vp-c-bg); }

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

.wp-grid {
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

.wp-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.wp-preview {
  background: #1a1a2e;
  border: 1px solid #2d2d44;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 16/9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wp-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.wp-label {
  font-size: 0.82rem;
  color: #5b6470;
  text-align: center;
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
<div class="wp-page">
<div class="copy-page-wrap">
<button class="copy-page-btn" id="copy-page-btn" onclick="copyPageAsMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>
  <div class="frame">
    <h1 class="page-title">Wallpapers</h1>
    <p class="page-subtitle">
      Fundos de tela para desktop, celular e videochamadas. Disponíveis em alta resolucao (ate 8K).
    </p>
  </div>

  <div class="frame">
    <h2 class="section-title">Grupo CSV</h2>
    <div class="wp-grid">
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_light.png" alt="Light" loading="lazy">
        </div>
        <div class="wp-label">Light</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_light.png" download class="dl-link">Download</a>
      </div>
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_dark.png" alt="Dark" loading="lazy">
        </div>
        <div class="wp-label">Dark</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_dark.png" download class="dl-link">Download</a>
      </div>
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_ecosystem.png" alt="Ecosystem" loading="lazy">
        </div>
        <div class="wp-label">Ecosystem</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_ecosystem.png" download class="dl-link">Download</a>
      </div>
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_videocall-4k.png" alt="Videocall 4K" loading="lazy">
        </div>
        <div class="wp-label">Videocall 4K</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_videocall-4k.png" download class="dl-link">Download</a>
      </div>
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_ultrawide-8k.png" alt="Ultrawide 8K" loading="lazy">
        </div>
        <div class="wp-label">Ultrawide 8K</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_ultrawide-8k.png" download class="dl-link">Download</a>
      </div>
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/grupo-csv_wallpaper_spectra.png" alt="Spectra" loading="lazy">
        </div>
        <div class="wp-label">Spectra</div>
        <a href="/visual-identity/_wallpapers/grupo-csv_wallpaper_spectra.png" download class="dl-link">Download</a>
      </div>
    </div>
  </div>

  <div class="frame">
    <h2 class="section-title">Thera</h2>
    <div class="wp-grid">
      <div class="wp-item">
        <div class="wp-preview">
          <img src="/visual-identity/_wallpapers/thera_wallpaper_8k.png" alt="Thera 8K" loading="lazy">
        </div>
        <div class="wp-label">Thera 8K</div>
        <a href="/visual-identity/_wallpapers/thera_wallpaper_8k.png" download class="dl-link">Download</a>
      </div>
    </div>
  </div>

  <div style="text-align:center; margin-bottom:24px;">
    <a href="/_infra/assets/" class="back-link">Voltar a Central de Assets</a>
  </div>

  <div class="page-footer">
    <strong>Wallpapers — Grupo CSV</strong>
    <div class="small">Fundos de tela oficiais do ecossistema.</div>
  </div>
</div>
