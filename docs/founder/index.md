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
  padding: 20px;
  margin-bottom: 25px;
  border: 1px solid rgba(255,255,255,0.06);
}

.contact-box h3 {
  font-size: 1rem;
  margin: 0 0 14px;
  opacity: 0.9;
  color: white;
  border: none;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 8px;
  font-size: 0.85rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.contact-item a { color: white !important; text-decoration: none !important; }
.contact-item a:hover { text-decoration: underline !important; }

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
  .contact-grid { grid-template-columns: 1fr; }
}
</style>

<div class="hero-full">
  <div class="glass-card">
    <img src="https://i.imgur.com/7wYpSaD.png" alt="Guilherme Thomé" class="profile-img">
    <h1 class="founder-name">Guilherme Thomé</h1>
    <p class="founder-title">
      Médico Executivo e Consultor | Especialista em VBHC<br>
      Superintendente Unimed/ICDS | Fundador Grupo CSV
    </p>
    <p class="founder-bio">
      Com mais de 15 anos de experiência em gestão de organizações de saúde, atuo na interseção
      entre estratégia, governança clínica e inovação. Fundei o Grupo CSV para transformar a
      forma como cuidamos da saúde, através das empresas AxiaCare® (consultoria), MedValor®
      (educação) e TheraTech® (tecnologia).
    </p>
    <div class="links-grid">
      <a href="https://hub.guithome.com.br/cv.html" class="link-card" target="_blank">
        <div class="link-icon">📄</div>
        <div class="link-info"><div class="link-name">Currículo Digital</div><div class="link-desc">CV interativo completo</div></div>
      </a>
      <a href="https://www.linkedin.com/in/gui-thome" class="link-card" target="_blank">
        <div class="link-icon">💼</div>
        <div class="link-info"><div class="link-name">LinkedIn</div><div class="link-desc">Perfil profissional</div></div>
      </a>
      <a href="https://guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon">🌐</div>
        <div class="link-info"><div class="link-name">Site Oficial</div><div class="link-desc">guithome.com.br</div></div>
      </a>
      <a href="https://blog.guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon">📝</div>
        <div class="link-info"><div class="link-name">Blog</div><div class="link-desc">Artigos e reflexões</div></div>
      </a>
      <a href="https://link.guithome.com.br" class="link-card" target="_blank">
        <div class="link-icon">🔗</div>
        <div class="link-info"><div class="link-name">Links</div><div class="link-desc">Todos os links</div></div>
      </a>
      <a href="https://hub.guithome.com.br/privacidade.html" class="link-card" target="_blank">
        <div class="link-icon">🔒</div>
        <div class="link-info"><div class="link-name">Privacidade</div><div class="link-desc">Política @guithome</div></div>
      </a>
    </div>
    <div class="contact-box">
      <h3>Contato</h3>
      <div class="contact-grid">
        <div class="contact-item"><span>📧</span> <a href="mailto:guilherme@guithome.com.br">guilherme@guithome.com.br</a></div>
        <div class="contact-item"><span>🏢</span> <a href="mailto:guilherme@axcare.com.br">guilherme@axcare.com.br</a></div>
        <div class="contact-item"><span>🎓</span> <a href="mailto:guilherme@medvalor.com.br">guilherme@medvalor.com.br</a></div>
      </div>
    </div>
  </div>
  <div class="hero-footer">
    <p>Grupo CSV | AxiaCare® · MedValor® · TheraTech® | <a href="/compliance/">Compliance</a></p>
  </div>
</div>
