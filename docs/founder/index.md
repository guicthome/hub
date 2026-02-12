---
layout: page
title: Guilherme Thomé
---

<style scoped>
.VPPage { padding: 0 !important; }
.VPFooter { display: none !important; }

.hero-full {
  background: linear-gradient(135deg, #1e3a5f 0%, #196396 50%, #2DBF7F 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 60px 24px;
  min-height: calc(100vh - 64px);
}

.glass-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 50px 40px;
  max-width: 700px;
  width: 100%;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.profile-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid rgba(255,255,255,0.3);
  margin: 0 auto 20px;
  display: block;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
}

.founder-name {
  font-size: 2.2rem;
  font-weight: 700;
  margin: 0 0 8px;
  color: white;
  border: none;
}

.founder-title {
  font-size: 1.05rem;
  opacity: 0.9;
  margin: 0 0 25px;
  line-height: 1.5;
}

.founder-bio {
  font-size: 0.95rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0 0 35px;
  text-align: left;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.12);
  border-radius: 12px;
  text-decoration: none !important;
  color: white !important;
  transition: all 0.3s ease;
  border: 1px solid rgba(255,255,255,0.08);
}
.link-card:hover {
  background: rgba(255,255,255,0.22);
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.link-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  font-size: 1.2rem;
  flex-shrink: 0;
}

.link-info { text-align: left; }
.link-name { font-weight: 600; font-size: 0.9rem; }
.link-desc { font-size: 0.75rem; opacity: 0.7; }

.contact-box {
  background: rgba(255,255,255,0.08);
  border-radius: 14px;
  padding: 24px;
  margin-bottom: 25px;
  border: 1px solid rgba(255,255,255,0.06);
}

.contact-box h3 {
  font-size: 1rem;
  margin: 0 0 18px;
  opacity: 0.9;
  color: white;
  border: none;
  letter-spacing: 0.5px;
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
}

.contact-row .c-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  flex-shrink: 0;
}

.contact-row .c-info { display: flex; flex-direction: column; gap: 2px; }
.contact-row .c-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 1px; opacity: 0.6; }
.contact-row a { color: white !important; text-decoration: none !important; font-weight: 500; }
.contact-row a:hover { text-decoration: underline !important; }

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 10px 24px;
  border-radius: 10px;
  background: rgba(255,255,255,0.15);
  color: white !important;
  text-decoration: none !important;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.2s;
}
.back-btn:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }

.hero-footer {
  margin-top: 30px;
  font-size: 0.8rem;
  opacity: 0.6;
}
.hero-footer a { color: white; text-decoration: none; }

@media (max-width: 640px) {
  .glass-card { padding: 35px 20px; }
  .founder-name { font-size: 1.8rem; }
  .links-grid { grid-template-columns: 1fr; }
}
</style>

<div class="hero-full">
  <div class="glass-card">
    <img src="/logos/avatar_guilherme.png" alt="Guilherme Thomé" class="profile-img">
    <h1 class="founder-name">Guilherme Thomé</h1>
    <p class="founder-title">
      Médico Executivo e Consultor | Especialista em VBHC<br>
      Superintendente Unimed/ICDS | Fundador Grupo CSV
    </p>
    <p class="founder-bio">
      Atuo na interseção entre estratégia, governança clínica e inovação. Fundei o Grupo CSV para
      transformar a forma como cuidamos da saúde, através das empresas AxiaCare® (consultoria),
      MedValor® (educação) e TheraTech® (tecnologia).
    </p>
    <div class="links-grid">
      <a href="https://hub.guithome.com.br/cv.html" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
        <div class="link-info"><div class="link-name">Currículo Digital</div><div class="link-desc">CV interativo completo</div></div>
      </a>
      <a href="https://www.linkedin.com/in/gui-thome" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/></svg></div>
        <div class="link-info"><div class="link-name">LinkedIn</div><div class="link-desc">Perfil profissional</div></div>
      </a>
      <a href="https://guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg></div>
        <div class="link-info"><div class="link-name">Site Oficial</div><div class="link-desc">guithome.com.br</div></div>
      </a>
      <a href="https://blog.guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
        <div class="link-info"><div class="link-name">Blog</div><div class="link-desc">Artigos e reflexões</div></div>
      </a>
      <a href="https://link.guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg></div>
        <div class="link-info"><div class="link-name">Links</div><div class="link-desc">Todos os links</div></div>
      </a>
      <a href="https://hub.guithome.com.br/privacidade.html" class="link-card" target="_blank">
        <div class="link-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg></div>
        <div class="link-info"><div class="link-name">Privacidade</div><div class="link-desc">Política @guithome</div></div>
      </a>
    </div>
    <div class="contact-box">
      <h3>Contato</h3>
      <div class="contact-grid">
        <div class="contact-row">
          <div class="c-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <div class="c-info">
            <span class="c-label">B2B</span>
            <a href="mailto:guilherme@grupocsv.com">guilherme@grupocsv.com</a>
          </div>
        </div>
        <div class="contact-row">
          <div class="c-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg></div>
          <div class="c-info">
            <span class="c-label">B2C</span>
            <a href="mailto:guilherme@guithome.com.br">guilherme@guithome.com.br</a>
          </div>
        </div>
        <div class="contact-row">
          <div class="c-icon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg></div>
          <div class="c-info">
            <span class="c-label">Telefone</span>
            <a href="tel:+5533999399959">+55 33 9 9939 9959</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <a href="/" class="back-btn" data-direct>← Voltar ao Hub</a>
  <div class="hero-footer">
    <p>Grupo CSV | AxiaCare® · MedValor® · TheraTech® | <a href="/compliance/">Compliance</a></p>
  </div>
</div>
