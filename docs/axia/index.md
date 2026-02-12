---
layout: page
title: AxiaCare®
---

<style scoped>
.VPPage { padding: 0 !important; }
.VPFooter { display: none !important; }

.hero-full {
  background: linear-gradient(135deg, #196396 0%, #2DBF7F 100%);
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
  max-width: 280px;
  max-height: 200px;
  margin: 0 auto 30px;
  display: block;
  filter: drop-shadow(0 4px 20px rgba(0,0,0,0.2));
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
  margin-top: 40px;
  font-size: 0.85rem;
  opacity: 0.7;
}
.hero-footer a { color: white; text-decoration: none; }
.hero-footer a:hover { text-decoration: underline; }

@media (max-width: 640px) {
  .glass-card { padding: 40px 24px; }
  .glass-card .brand-logo { max-width: 200px; }
}
</style>

<div class="hero-full">
  <div class="glass-card">
    <img src="/logos/axia_vertical_negativo.png" alt="AxiaCare" class="brand-logo">
    <p class="brand-desc">
      Transformamos organizações de saúde através de governança clínica,
      eficiência operacional e implementação de modelos de cuidado baseado em valor.
    </p>
    <div class="badge-wip">Em Breve</div>
  </div>
  <a href="/" class="back-btn" data-direct>← Voltar ao Hub</a>
  <div class="hero-footer">
    <p>Grupo CSV | <a href="/compliance/">Compliance</a> | <a href="mailto:contato@axcare.com.br">contato@axcare.com.br</a></p>
  </div>
</div>
