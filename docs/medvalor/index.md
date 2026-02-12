---
layout: page
title: MedValor®
---

<style scoped>
.VPPage { padding: 0 !important; }
.VPFooter { display: none !important; }

.hero-full {
  background: linear-gradient(135deg, #c2410c 0%, #ea580c 50%, #f97316 100%);
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 60px 24px;
}

.glass-card {
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 60px 40px;
  max-width: 600px;
  width: 100%;
  border: 1px solid rgba(255,255,255,0.2);
  box-shadow: 0 20px 60px rgba(0,0,0,0.15);
}

.glass-card .brand-logo {
  width: 200px;
  margin: 0 auto 30px;
  display: block;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.2));
}

.glass-card .brand-name {
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 10px;
  color: white;
  border: none;
  letter-spacing: -0.5px;
}

.glass-card .brand-tagline {
  font-size: 1.2rem;
  opacity: 0.9;
  margin: 0 0 30px;
}

.glass-card .brand-desc {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.85;
  margin: 0 0 40px;
}

.badge-wip {
  background: rgba(255,255,255,0.2);
  padding: 16px 32px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  display: inline-block;
  letter-spacing: 0.5px;
}

.hero-footer {
  margin-top: 40px;
  font-size: 0.85rem;
  opacity: 0.7;
}
.hero-footer a { color: white; text-decoration: none; }
.hero-footer a:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .glass-card { padding: 40px 24px; }
  .glass-card .brand-name { font-size: 2rem; }
  .glass-card .brand-logo { width: 160px; }
}
</style>

<div class="hero-full">
  <div class="glass-card">
    <img src="/logos/marca_medvalor.png" alt="MedValor" class="brand-logo">
    <h1 class="brand-name">MedValor®</h1>
    <p class="brand-tagline">Educação Executiva para Líderes em Saúde</p>
    <p class="brand-desc">
      Capacitação estratégica, desenvolvimento de lideranças e metodologias
      práticas para transformar a gestão em saúde.
    </p>
    <div class="badge-wip">Em construção</div>
  </div>
  <div class="hero-footer">
    <p>Grupo CSV | <a href="/compliance/">Compliance</a> | <a href="mailto:contato@medvalor.com.br">contato@medvalor.com.br</a></p>
  </div>
</div>
