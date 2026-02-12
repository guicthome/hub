---
layout: page
title: Unihealth - Hub de Ferramentas
---

<style>
.vp-doc { padding: 0 !important; }
.uh-wrap { max-width: 1200px; margin: 0 auto; padding: 20px; }
.uh-header {
  text-align: center; padding: 50px 20px;
  background: linear-gradient(135deg, rgba(1,61,25,0.04) 0%, rgba(1,61,25,0.02) 100%);
  border-radius: 20px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);
  margin-bottom: 40px; border: 1px solid rgba(1,61,25,0.12);
}
.uh-header .logo { width: 280px; max-width: 90%; margin: 0 auto 20px; display: block; }
.uh-header h2 { color: #013d19; font-size: 36px; font-weight: 700; margin-bottom: 12px; border: none; }
.uh-header .subtitle { color: var(--vp-c-text-2); font-size: 16px; }
.uh-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 50px; }
.uh-card {
  background: linear-gradient(135deg, rgba(1,61,25,0.03) 0%, rgba(1,61,25,0.05) 100%);
  border-radius: 16px; padding: 28px; box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1); border: 1px solid rgba(1,61,25,0.1);
  position: relative; overflow: hidden; display: flex; flex-direction: column;
}
.uh-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg,#013d19 0%,#ec7106 100%); transform: scaleX(0); transform-origin: left; transition: transform 0.3s ease; }
.uh-card:hover::before { transform: scaleX(1); }
.uh-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(1,61,25,0.15); border-color: rgba(1,61,25,0.2); }
.uh-card.featured { background: linear-gradient(135deg, #013d19 0%, #025a27 100%); color: white; border-color: #013d19; }
.uh-card.featured .uh-title { color: white; }
.uh-card.featured .uh-date { color: rgba(255,255,255,0.85); }
.uh-card.featured .uh-link { background: #ec7106; border-color: #ec7106; }
.uh-card.featured .uh-link:hover { background: #ff8519; border-color: #ff8519; }
.uh-card.featured::after { content: 'NOVO'; position: absolute; top: 16px; right: 16px; background: #ec7106; color: white; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: 900; }
.uh-title { color: #013d19; font-size: 18px; font-weight: 600; margin-bottom: 8px; line-height: 1.3; flex-grow: 1; }
.uh-date { color: var(--vp-c-text-2); font-size: 13px; font-weight: 500; margin-bottom: 20px; display: block; }
.uh-link {
  display: inline-block; width: 100%; padding: 14px 24px; background: #013d19; color: white !important;
  text-decoration: none !important; border-radius: 10px; font-weight: 600; font-size: 14px; text-align: center;
  transition: all 0.3s ease; border: 2px solid #013d19;
}
.uh-link:hover { background: #ec7106; border-color: #ec7106; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(236,113,6,0.3); }
.uh-link.disabled { background: #94a3b8; border-color: #94a3b8; opacity: 0.7; cursor: not-allowed; }
.uh-link.disabled:hover { background: #94a3b8; border-color: #94a3b8; transform: none; box-shadow: none; }
.uh-foot { margin-top: 40px; padding: 25px 15px; background-color: #f8f5f0; text-align: center; border-top: 2px solid #006b68; border-radius: 16px; }
.uh-foot .foot-logo { width: 140px; margin: 0 auto 10px; display: block; }
.uh-foot .foot-title { font-size: 15px; font-weight: bold; color: #333; margin: 10px 0 18px; }
.uh-foot .foot-links { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; font-size: 14px; margin-bottom: 10px; }
.uh-foot .foot-links a { color: #004E4C; text-decoration: none; }
.uh-foot .foot-links a:hover { text-decoration: underline; }
.uh-foot .sep { color: #bbb; margin: 0 4px; }
.uh-foot .copyright { margin-top: 18px; font-size: 11px; color: #999; }
@media (max-width: 768px) { .uh-grid { grid-template-columns: 1fr; } .uh-header h2 { font-size: 28px; } }
</style>

<div class="uh-wrap">
  <div class="uh-header">
    <a href="https://icds.org.br/hospital-unimed-governador-valadares/" target="_blank">
      <img src="https://i.imgur.com/ac2rphe.png" alt="Unihealth Logo" class="logo">
    </a>
    <h2>Hub Unihealth</h2>
    <p class="subtitle">Gestão em Saúde Inteligente</p>
  </div>

  <div class="uh-grid">
    <div class="uh-card featured">
      <div class="uh-title">Calculadora Plantões Médicos</div>
      <span class="uh-date">Outubro-25</span>
      <a href="/unihealth/calc-plantao.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">[Desativado] Análise Reprocir</div>
      <span class="uh-date">Setembro-25</span>
      <a href="#" class="uh-link disabled">Desativado</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">Orçamento Médico</div>
      <span class="uh-date">Setembro-25</span>
      <a href="/unihealth/orcamento-medico-ugv.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">Análise Reajuste Suturas</div>
      <span class="uh-date">Julho-25</span>
      <a href="/unihealth/fios.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">Análise Utilização PA</div>
      <span class="uh-date">Março-25</span>
      <a href="/unihealth/retornopa.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">Análise de Indicadores</div>
      <span class="uh-date">Março-25</span>
      <a href="/unihealth/marco25.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">Plano de Ação OPME</div>
      <span class="uh-date">Março-25</span>
      <a href="/unihealth/opme.html" class="uh-link">Acessar</a>
    </div>
    <div class="uh-card">
      <div class="uh-title">ISC Cesarianas</div>
      <span class="uh-date">Maio-25</span>
      <a href="/unihealth/isc-cesarianas.html" class="uh-link">Acessar</a>
    </div>
  </div>

  <div class="uh-foot">
    <img class="foot-logo" src="https://i.imgur.com/yAUQciP.png" alt="AxiaCare Logo">
    <div class="foot-title">AxView™ | WebApps - Gestão e Consultoria em Saúde</div>
    <div class="foot-links">
      <a href="https://linktr.ee/gui.thome">Conheça nossas soluções.</a>
      <span class="sep">|</span>
      <a href="https://www.axcare.com.br">axcare.com.br</a>
      <span class="sep">|</span>
      <a href="https://www.medvalor.med.br">medvalor.med.br</a>
    </div>
    <div class="foot-links">
      <a href="https://guithome.com.br">guithome.com.br</a>
      <span class="sep">|</span>
      <a href="https://linkedin.com/in/guithome">LinkedIn</a>
      <span class="sep">|</span>
      <a href="https://www.instagram.com/gui.thome/">Instagram</a>
    </div>
    <div class="copyright">Copyright © 2025 AxiaCare | Todos os direitos reservados | Uma empresa do Grupo CSV</div>
  </div>
</div>
