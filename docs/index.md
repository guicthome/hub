---
layout: page
title: Hub Grupo CSV
---

<style scoped>
.VPPage { padding: 0 !important; }

/* ── Hero ── */
.hub-hero {
  background: linear-gradient(135deg, #0f2b46 0%, #196396 40%, #2DBF7F 100%);
  padding: 80px 24px 60px;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}
.hub-hero::before {
  content: '';
  position: absolute;
  top: -60%; left: -20%;
  width: 140%; height: 200%;
  background: radial-gradient(ellipse at 30% 20%, rgba(45,191,127,0.15) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 80%, rgba(25,99,150,0.2) 0%, transparent 50%);
  pointer-events: none;
}
.hub-hero .inner { position: relative; max-width: 800px; margin: 0 auto; }
.hub-hero .logo { width: 120px; margin-bottom: 20px; filter: drop-shadow(0 4px 20px rgba(0,0,0,0.3)); }
.hub-hero h1 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; margin: 0 0 8px; border: none; color: white; letter-spacing: -1px; }
.hub-hero .tagline { font-size: 1.15rem; opacity: 0.9; margin: 0 0 32px; font-weight: 300; }
.hub-hero .hero-actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
.hub-hero .hero-btn {
  padding: 12px 28px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: all 0.2s;
}
.hub-hero .hero-btn.primary { background: white; color: #196396; }
.hub-hero .hero-btn.primary:hover { background: #e8f4fc; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.2); }
.hub-hero .hero-btn.secondary { background: rgba(255,255,255,0.15); color: white; border: 1px solid rgba(255,255,255,0.3); }
.hub-hero .hero-btn.secondary:hover { background: rgba(255,255,255,0.25); transform: translateY(-2px); }

/* ── Layout ── */
.hub-body {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 60px;
  background:
    radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%),
    radial-gradient(1200px 500px at 110% 0%, #ebf7f1 0%, transparent 60%),
    #F6F4EF;
}
.dark .hub-body { background: var(--vp-c-bg); }

.section { padding: 48px 0 0; }
.section-header { margin-bottom: 24px; }
.section-title { font-size: 1.6rem; font-weight: 700; margin: 0 0 6px; color: #1a2b3c; border: none; }
.dark .section-title { color: var(--vp-c-text-1); }
.section-desc { color: #5b6470; font-size: 0.95rem; margin: 0; }

.divider { height: 1px; background: linear-gradient(90deg, transparent, rgba(0,0,0,0.08), transparent); margin: 48px 0 0; }
.dark .divider { background: linear-gradient(90deg, transparent, var(--vp-c-divider), transparent); }

/* ── Empresas Grid ── */
.empresas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
@media (max-width: 768px) { .empresas-grid { grid-template-columns: 1fr; } }

.empresa-card {
  background: white;
  border-radius: 16px;
  padding: 28px 24px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: all 0.3s;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.dark .empresa-card { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }
.empresa-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.12); }
.empresa-card .top-bar { position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.empresa-card .card-logo { height: 48px; margin-bottom: 16px; object-fit: contain; }
.empresa-card .card-name { font-size: 1.15rem; font-weight: 700; margin: 0 0 8px; color: #1a2b3c; }
.dark .empresa-card .card-name { color: var(--vp-c-text-1); }
.empresa-card .card-desc { font-size: 0.88rem; color: #5b6470; line-height: 1.5; margin: 0; flex-grow: 1; }

/* ── Partner Sections ── */
.partner-section {
  background: white;
  border-radius: 20px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 8px 32px rgba(0,0,0,0.06);
  overflow: hidden;
  margin-bottom: 24px;
}
.dark .partner-section { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }

.partner-header {
  padding: 28px 28px 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.dark .partner-header { border-color: var(--vp-c-divider); }
.partner-header .p-logo { height: 52px; object-fit: contain; }
.partner-header .p-info { flex-grow: 1; }
.partner-header .p-name { font-size: 1.2rem; font-weight: 700; margin: 0 0 2px; color: #1a2b3c; }
.dark .partner-header .p-name { color: var(--vp-c-text-1); }
.partner-header .p-sub { font-size: 0.85rem; color: #5b6470; margin: 0; }

.partner-tools {
  padding: 20px 28px 28px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 12px;
}

.tool-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border-radius: 12px;
  text-decoration: none !important;
  color: #1a2b3c !important;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  border: 1px solid rgba(0,0,0,0.06);
  background: #fafbfc;
}
.dark .tool-item { background: var(--vp-c-bg-alt); border-color: var(--vp-c-divider); color: var(--vp-c-text-1) !important; }
.tool-item:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08); }
.tool-item .dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.tool-item .arrow { margin-left: auto; opacity: 0.4; font-size: 0.85rem; flex-shrink: 0; }
.tool-item.disabled { opacity: 0.45; pointer-events: none; }

/* ── Governance Cards ── */
.gov-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 16px; }

.gov-card {
  background: white;
  border-radius: 14px;
  padding: 24px;
  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  text-decoration: none;
  color: inherit;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
}
.dark .gov-card { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }
.gov-card:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.gov-card .gc-title { font-size: 1.05rem; font-weight: 700; margin: 0 0 8px; color: #1a2b3c; }
.dark .gov-card .gc-title { color: var(--vp-c-text-1); }
.gov-card .gc-desc { font-size: 0.88rem; color: #5b6470; line-height: 1.5; margin: 0; }

/* ── Footer Elegante ── */
.hub-footer {
  text-align: center;
  padding: 48px 24px 56px;
  margin-top: 48px;
  border-top: 1px solid rgba(0,0,0,0.06);
  background: linear-gradient(180deg, transparent 0%, rgba(25,99,150,0.03) 100%);
}
.dark .hub-footer {
  border-color: var(--vp-c-divider);
  background: linear-gradient(180deg, transparent 0%, rgba(25,99,150,0.06) 100%);
}
.hub-footer .footer-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-bottom: 20px;
}
.hub-footer .footer-logos img {
  height: 28px;
  width: auto;
  opacity: 0.55;
  transition: opacity 0.3s;
  filter: grayscale(30%);
}
.hub-footer .footer-logos img:hover {
  opacity: 1;
  filter: grayscale(0%);
}
.hub-footer .footer-logos .logo-divider {
  width: 1px;
  height: 20px;
  background: rgba(0,0,0,0.12);
}
.dark .hub-footer .footer-logos .logo-divider {
  background: var(--vp-c-divider);
}
.hub-footer .footer-contacts {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  font-size: 0.85rem;
  flex-wrap: wrap;
}
.hub-footer .footer-contacts a {
  color: #196396;
  text-decoration: none;
  transition: color 0.2s;
}
.hub-footer .footer-contacts a:hover {
  color: #0f2b46;
  text-decoration: underline;
}
.dark .hub-footer .footer-contacts a { color: #5da9e0; }
.dark .hub-footer .footer-contacts a:hover { color: #8ec8f0; }
.hub-footer .footer-contacts .contact-sep {
  color: rgba(0,0,0,0.2);
  font-size: 0.7rem;
}
.dark .hub-footer .footer-contacts .contact-sep { color: var(--vp-c-divider); }
.hub-footer .footer-copy {
  font-size: 0.78rem;
  color: #94a3b8;
  letter-spacing: 0.02em;
}
.dark .hub-footer .footer-copy { color: var(--vp-c-text-3); }
</style>

<div class="hub-hero">
  <div class="inner">
    <img src="/logos/marca_csv_neg.png" alt="Grupo CSV" class="logo">
    <h1>Hub Grupo CSV</h1>
    <p class="tagline">Cuidados em Saúde com Valor — Portal central do ecossistema</p>
    <div class="hero-actions">
      <a href="#parceiros" class="hero-btn primary">Dashboards e Ferramentas</a>
      <a href="/compliance/" class="hero-btn secondary">Compliance</a>
      <a href="/_infra/" class="hero-btn secondary">Infraestrutura</a>
    </div>
  </div>
</div>

<div class="hub-body">

  <!-- ═══ EMPRESAS ═══ -->
  <div class="section">
    <div class="section-header">
      <h2 class="section-title">Empresas do Grupo</h2>
      <p class="section-desc">Três empresas especializadas, cada uma focada em uma dimensão da transformação em saúde.</p>
    </div>
    <div class="empresas-grid">
      <a href="/axia/" class="empresa-card">
        <div class="top-bar" style="background: linear-gradient(90deg, #196396, #2DBF7F);"></div>
        <img src="/logos/marca_axia.png" alt="AxiaCare" class="card-logo">
        <div class="card-name">AxiaCare®</div>
        <div class="card-desc">Consultoria estratégica, governança clínica e operações de saúde.</div>
      </a>
      <a href="/medvalor/" class="empresa-card">
        <div class="top-bar" style="background: linear-gradient(90deg, #ea580c, #f97316);"></div>
        <img src="/logos/marca_medvalor.png" alt="MedValor" class="card-logo">
        <div class="card-name">MedValor®</div>
        <div class="card-desc">Educação executiva e capacitação estratégica para líderes em saúde.</div>
      </a>
      <a href="/thera/" class="empresa-card">
        <div class="top-bar" style="background: linear-gradient(90deg, #6B5B95, #7c3aed);"></div>
        <img src="/logos/marca_thera.png" alt="TheraTech" class="card-logo">
        <div class="card-name">TheraTech®</div>
        <div class="card-desc">Desenvolvimento de software, IA e plataformas SaaS para saúde.</div>
      </a>
    </div>
  </div>

  <div class="divider"></div>

  <!-- ═══ PARCEIROS ═══ -->
  <div class="section" id="parceiros">
    <div class="section-header">
      <h2 class="section-title">Instituições Parceiras</h2>
      <p class="section-desc">Dashboards, ferramentas e entregáveis desenvolvidos para nossos parceiros.</p>
    </div>
    <!-- Unimed -->
    <div class="partner-section">
      <div class="partner-header">
        <img src="https://i.imgur.com/prZGWXK.png" alt="Unimed GV" class="p-logo">
        <div class="p-info">
          <div class="p-name">Unimed Governador Valadares</div>
          <div class="p-sub">Operadora de Planos de Saúde</div>
        </div>
      </div>
      <div class="partner-tools">
        <a href="/unimed/especialidades.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Variabilidade por Especialidade
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/cuidadocoordenado.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Coordenação do Cuidado
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/onco.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Oncologia: Painel Populacional
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/ped-amb.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Pediatria Ambulatorial
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/vivapleno.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Viva Pleno: Cuidados aos Idosos
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/gce.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          GCE: Acompanhamento
          <span class="arrow">›</span>
        </a>
        <a href="/unimed/tea.html" data-direct class="tool-item">
          <span class="dot" style="background:#00995d;"></span>
          Psicologia ABA: Análise de Rede
          <span class="arrow">›</span>
        </a>
      </div>
    </div>
    <!-- Unihealth -->
    <div class="partner-section">
      <div class="partner-header">
        <img src="https://i.imgur.com/ac2rphe.png" alt="Unihealth" class="p-logo">
        <div class="p-info">
          <div class="p-name">Unihealth</div>
          <div class="p-sub">Hospital de Média/Alta Complexidade</div>
        </div>
      </div>
      <div class="partner-tools">
        <a href="/unihealth/calc-plantao.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Calculadora Plantões Médicos
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/orcamento-medico-ugv.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Orçamento Médico
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/fios.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Análise Reajuste Suturas
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/retornopa.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Análise Utilização PA
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/marco25.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Análise de Indicadores
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/opme.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          Plano de Ação OPME
          <span class="arrow">›</span>
        </a>
        <a href="/unihealth/isc-cesarianas.html" data-direct class="tool-item">
          <span class="dot" style="background:#013d19;"></span>
          ISC Cesarianas
          <span class="arrow">›</span>
        </a>
        <a href="#" class="tool-item disabled">
          <span class="dot" style="background:#94a3b8;"></span>
          [Desativado] Análise Reprocir
          <span class="arrow">›</span>
        </a>
      </div>
    </div>
  </div>

  <div class="divider"></div>

  <!-- ═══ GOVERNANÇA ═══ -->
  <div class="section">
    <div class="section-header">
      <h2 class="section-title">Compliance, Fundador e Infraestrutura</h2>
    </div>
    <div class="gov-grid">
      <a href="/compliance/" class="gov-card">
        <div class="gc-title">Central de Compliance</div>
        <div class="gc-desc">Políticas de privacidade, termos de uso, código de conduta e documentação de integridade.</div>
      </a>
      <a href="/founder/" class="gov-card">
        <div class="gc-title">Guilherme Thomé</div>
        <div class="gc-desc">Médico executivo, Superintendente Unimed/ICDS, especialista em VBHC. Fundador do Grupo CSV.</div>
      </a>
      <a href="/_infra/" class="gov-card">
        <div class="gc-title">Infraestrutura Cognitiva</div>
        <div class="gc-desc">Playbooks, system identity, definições canônicas e mandates para integração com AI.</div>
      </a>
      <a href="https://github.com/grupocsv/hub" class="gov-card" target="_blank">
        <div class="gc-title">Repositório GitHub</div>
        <div class="gc-desc">Código fonte, assets e documentação completa do ecossistema Grupo CSV.</div>
      </a>
    </div>
  </div>

  <!-- ═══ FOOTER ═══ -->
  <div class="hub-footer">
    <div class="footer-logos">
      <img src="/logos/logo_csv.png" alt="Grupo CSV" title="Grupo CSV">
      <span class="logo-divider"></span>
      <img src="/logos/logo_axia.png" alt="AxiaCare" title="AxiaCare®">
      <img src="/logos/logo_medvalor.png" alt="MedValor" title="MedValor®">
      <img src="/logos/logo_thera.png" alt="TheraTech" title="TheraTech®">
    </div>
    <div class="footer-contacts">
      <a href="mailto:contato@grupocsv.com">contato@grupocsv.com</a>
      <span class="contact-sep">|</span>
      <a href="mailto:compliance@grupocsv.com">compliance@grupocsv.com</a>
    </div>
    <div class="footer-copy">© 2026 Grupo CSV. Todos os direitos reservados.</div>
  </div>

</div>
