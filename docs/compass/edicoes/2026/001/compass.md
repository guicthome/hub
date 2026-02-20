---
title: "001/2026 — Metas quantitativas de produção em contratos ACO com orçamento global"
---

<style>
/* ── Compass Edition Layout ── */
.compass-page {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 0 2rem;
}

.compass-hero {
  border-radius: 20px;
  margin-bottom: 2rem;
  overflow: hidden;
  border: 1px solid rgba(0,0,0,0.08);
  box-shadow: 0 4px 20px rgba(13,38,76,0.08);
}
.compass-hero-logos {
  background: #fff;
  padding: 1.5rem 2.5rem;
  border-bottom: 1px solid rgba(0,0,0,0.06);
}
.compass-hero-logos img {
  max-width: 480px;
  width: 100%;
  height: auto;
}
.dark .compass-hero-logos {
  background: var(--vp-c-bg-soft);
  border-bottom-color: var(--vp-c-divider);
}
.compass-hero-content {
  background: linear-gradient(135deg, #0d264c 0%, #196396 60%, #1a7a5a 100%);
  padding: 2rem 2.5rem 1.8rem;
  position: relative;
}
.compass-hero-content::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: radial-gradient(ellipse at 80% 0%, rgba(62,207,142,0.1) 0%, transparent 50%);
  pointer-events: none;
}
.compass-hero-inner {
  position: relative;
}
.compass-hero h1 {
  color: #fff;
  font-size: clamp(1.4rem, 2.5vw, 1.8rem);
  font-weight: 700;
  margin: 0 0 1.2rem;
  line-height: 1.3;
  border: none;
}
.compass-hero-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}
.compass-hero-meta-item {
  color: rgba(255,255,255,0.8);
  font-size: 0.82rem;
}
.compass-hero-meta-item strong {
  display: block;
  color: rgba(255,255,255,0.5);
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: 0.1rem;
}

/* ── Content Sections ── */
.compass-section {
  background: rgba(255,255,255,0.95);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 16px;
  padding: 2rem 2.2rem;
  margin-bottom: 1.2rem;
  box-shadow: 0 4px 16px rgba(13,38,76,0.06);
}
.dark .compass-section {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
  box-shadow: none;
}
.compass-section h2 {
  color: #196396;
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0 0 1rem;
  padding-bottom: 0.6rem;
  border-bottom: 2px solid rgba(25,99,150,0.12);
  border-top: none;
}
.dark .compass-section h2 { color: #5da9e0; }
.compass-section p {
  color: #334155;
  line-height: 1.75;
  margin: 0 0 0.9rem;
  font-size: 0.93rem;
}
.dark .compass-section p { color: var(--vp-c-text-2); }
.compass-section strong {
  color: #1e293b;
}
.dark .compass-section strong { color: var(--vp-c-text-1); }

/* ── Tables ── */
.ref-table, .comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin: 1rem 0;
}
.ref-table th, .comparison-table th {
  text-align: left;
  padding: 0.6rem 0.8rem;
  background: linear-gradient(180deg, #f1f5f9, #e8edf3);
  color: #196396;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}
.dark .ref-table th, .dark .comparison-table th {
  background: var(--vp-c-bg-alt);
  color: #5da9e0;
}
.ref-table td, .comparison-table td {
  padding: 0.6rem 0.8rem;
  border-bottom: 1px solid #e2e8f0;
  color: #334155;
  vertical-align: top;
  line-height: 1.5;
}
.dark .ref-table td, .dark .comparison-table td {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-2);
}
.ref-table td a, .comparison-table td a {
  color: #196396;
  text-decoration: none;
  word-break: break-all;
}
.ref-table td a:hover, .comparison-table td a:hover {
  text-decoration: underline;
}

/* ── Scope Note ── */
.compass-scope {
  background: linear-gradient(135deg, #f8fafc, #eef3f8);
  border: 1px solid rgba(25,99,150,0.1);
  border-radius: 12px;
  padding: 1.2rem 1.5rem;
  margin-top: 1.5rem;
  color: #475569;
  font-size: 0.88rem;
  line-height: 1.6;
}
.dark .compass-scope {
  background: var(--vp-c-bg-alt);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-3);
}

/* ── Download Button ── */
.compass-download {
  text-align: center;
  margin-top: 2rem;
}
.compass-download a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.7rem 2rem;
  border-radius: 10px;
  background: linear-gradient(135deg, #196396, #2980b9);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  text-decoration: none;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(25,99,150,0.2);
}
.compass-download a:hover {
  background: linear-gradient(135deg, #134b73, #196396);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(25,99,150,0.3);
}
.compass-download a svg {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

/* ── Navigation ── */
.compass-nav {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 1.5rem;
}
.compass-nav a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.88rem;
  text-decoration: none;
  transition: all 0.2s;
}
.compass-nav .nav-primary {
  background: #196396;
  color: #fff;
}
.compass-nav .nav-primary:hover {
  background: #134b73;
  transform: translateY(-2px);
}
.compass-nav .nav-secondary {
  background: #f1f5f9;
  color: #334155;
  border: 1px solid #cbd5e1;
}
.compass-nav .nav-secondary:hover {
  background: #e2e8f0;
  color: #1e293b;
  transform: translateY(-2px);
}

/* ── Footer ── */
.compass-edition-footer {
  text-align: center;
  padding: 1.5rem 0 0;
  color: #94a3b8;
  font-size: 0.82rem;
}
</style>

<div class="compass-page">

<div class="compass-hero">
  <div class="compass-hero-logos">
    <img src="/compass_header.png" alt="Compass™ — Grupo CSV" />
  </div>
  <div class="compass-hero-content">
  <div class="compass-hero-inner">
    <h1>Metas quantitativas de produção em contratos ACO com orçamento global</h1>
    <div class="compass-hero-meta">
      <div class="compass-hero-meta-item"><strong>Edição</strong>001/2026</div>
      <div class="compass-hero-meta-item"><strong>Data</strong>19 de fevereiro de 2026</div>
      <div class="compass-hero-meta-item"><strong>Status</strong>Publicado</div>
    </div>
  </div>
  </div>
</div>

<div class="compass-section">
<h2>Resumo executivo</h2>

<p>Em contratos no modelo de Accountable Care Organization (ACO), a literatura descreve que o foco do arranjo é tornar a organização prestadora responsável por custo e qualidade de uma população definida, por meio de incentivos que favoreçam coordenação do cuidado e redução de desperdício, e não o aumento de produção assistencial per se. [1]</p>

<p>Nesse contexto, quando há orçamento global (global budget/cap de receita), a função econômica central do componente "global" é desacoplar (ao menos parcialmente) a receita do prestador do volume de serviços, para que decisões clínicas e operacionais possam priorizar valor e estabilidade financeira sob regras prospectivas. [2]</p>

<p>Metas contratuais quantitativas de produção (ex.: volumes médios mensais de procedimentos/exames/atendimentos/saídas) são, em geral, mais bem justificadas como "guardrails" (travas) e referência do perfil assistencial esperado: delimitam condições mínimas de acesso e evitam suboferta ("stinting") típica de modelos com orçamento fixo/capitação, além de oferecerem um referencial operacional para interpretar indicadores de eficiência e qualidade. [3]</p>

<p>A revisão do orçamento global, quando necessária e contratualmente prevista, tende a ser tecnicamente mais defensável quando decorre de mudanças estruturais (capacidade instalada), mudanças relevantes e sustentadas na população atribuída/risco/case-mix, ou mecanismos formais de ajuste/reopção (reopener clause) previamente pactuados. Reindexar automaticamente o global ao volume reintroduz incentivos de fee-for-service (FFS) e reforça risco de indução de demanda e desalinhamento com o racional ACO. [4]</p>
</div>

<div class="compass-section">
<h2>Fundamentos do orçamento global e diferença para fee-for-service</h2>

<p>O pagamento tradicional por fee-for-service (FFS) remunera serviços individualmente (consulta, exame, procedimento, internação), de modo que a receita marginal tende a crescer com o volume produzido, o que pode incentivar atividade adicional mesmo quando o ganho de valor é limitado, exigindo mecanismos de controle de utilização a posteriori. [5]</p>

<p>O orçamento global (global budget / global payment) é descrito na literatura de payment reform como um arranjo em que se define ex ante um teto de receita ou um orçamento prospectivo para um período (tipicamente anual), deslocando o incentivo de "produzir mais para receber mais" para "entregar mais valor dentro de um envelope financeiro". [6]</p>

<p>Duas referências frequentemente citadas para ilustrar esse racional são:</p>

<p>A experiência de orçamento global hospitalar em Maryland [7], sob supervisão da Maryland Health Services Cost Review Commission [8], é apresentada como um modelo que impõe uma restrição de receita anual e incorpora desenho voltado a melhoria de qualidade e estabilidade, explicitamente orientado a "desacoplar" receita de volume. [9]</p>

<p>No âmbito de pagamentos globais populacionais, o contrato comercial "Alternative Quality Contract" (AQC), implementado pela Blue Cross Blue Shield of Massachusetts [10] em Massachusetts [11], é descrito como um modelo com orçamento global por paciente e incentivos de desempenho em qualidade; sua evolução foi reportada em periódico revisado por pares como o New England Journal of Medicine [12]. [13]</p>

<p>Em operações reais, muitos modelos permanecem "híbridos", isto é, combinam orçamento global (para componentes estruturais/facility) com FFS para alguns componentes (especialmente profissionais), e usam métricas de qualidade/acesso como condição para pagamentos de desempenho e/ou elegibilidade a bônus e economia compartilhada. [14]</p>
</div>

<div class="compass-section">
<h2>Função das metas quantitativas como guardrails e mecanismo anti-suboferta</h2>

<p>Modelos com orçamento fixo, capitação e/ou risco financeiro introduzem um trade-off conhecido: o mesmo mecanismo que reduz incentivo a excesso de volume pode criar incentivo a suboferta ("stinting") ou a reduzir responsividade/acesso, exigindo "checks and balances" (medidas de qualidade, auditoria, monitoramento de subutilização). [3]</p>

<p>A literatura aplicada a capitação enfatiza explicitamente a necessidade de salvaguardas para proteger paciente e provedor em sistemas pré-pagos, apontando que mecanismos de controle e monitoramento são parte constitutiva do desenho. [15]</p>

<p>Sob a ótica de contratos incompletos, há também uma justificativa teórica adicional: é impraticável especificar ex ante todas as contingências e todos os aspectos não "contratáveis" da qualidade. Assim, contratos utilizam uma combinação de (i) termos mais rígidos e observáveis (ex.: pisos/corredores de produção, SLAs de acesso) e (ii) termos de desempenho que tentam aproximar qualidade/resultado por métricas disponíveis, reconhecendo limites de mensuração e necessidade de governança e renegociação. [16]</p>

<p>Dentro desse enquadramento, metas quantitativas de produção podem ser tecnicamente defendidas como:</p>

<p><strong>Referência de perfil assistencial:</strong> um "espelho" do mix esperado de serviços, útil para calibrar capacidade, interpretar produtividade e comparar desempenho sob um mesmo contexto operacional. [17]</p>

<p><strong>Guardrails de acesso e responsividade:</strong> pisos mínimos, tempos de resposta e outros limites objetivamente verificáveis que reduzem o risco de suboferta e de deslocamento indevido de demanda. [18]</p>

<p><strong>Mecanismo anti-suboferta como condição de elegibilidade/avaliação:</strong> em vez de "dirigir orçamento", a produção mínima atua como condição de conformidade (compliance) para que o prestador seja avaliado em eficiência/qualidade em um patamar mínimo de pressão assistencial. [19]</p>

<p>Essa lógica é consistente com a prática de atrelar ganhos financeiros (bônus, shared savings) ao atingimento de metas de qualidade e de experiência do paciente, como forma de mitigar risco de "stinting" e proteger o objetivo assistencial do contrato. [20]</p>
</div>

<div class="compass-section">
<h2>Distinção entre custos fixos, custos variáveis e componentes fora do global</h2>

<p>A economia hospitalar descreve que hospitais têm estrutura de custos com alta parcela fixa no curto prazo e custos conjuntos ("joint costs"), de modo que reduções marginais de utilização (e.g., pequenas variações de volume) frequentemente geram "ociosidade" mais do que redução real de orçamento/custo estrutural, a menos que se desmobilize capacidade (fechar leitos, reduzir turnos, encerrar serviço). [21]</p>

<p>Essa distinção é central para contratos com orçamento global porque ajuda a separar:</p>

<p><strong>Custos fixos (curto prazo):</strong> disponibilidade de infraestrutura, equipe mínima, plantões, manutenção, utilidades, depreciação, sistemas e funções de suporte que não variam proporcionalmente com poucos pontos percentuais de produção. [22]</p>

<p><strong>Custos variáveis (por caso):</strong> insumos, materiais e medicamentos que acompanham a produção assistencial, com elasticidade maior ao volume. [23]</p>

<p><strong>Componentes profissionais frequentemente fora do global:</strong> em modelos de orçamento global voltados a "facility services", é comum que o escopo exclua serviços profissionais (honorários), preservando fluxos FFS para parte relevante do custo/receita total. Essa separação é explicitada em especificações de modelos recentes do CMS, nos quais orçamentos globais hospitalares substituem pagamentos de serviços hospitalares (inpatient/outpatient facility), mas não substituem pagamentos profissionais. [24]</p>

<p>O ponto contratual prático é: quando o global cobre predominantemente "capacidade/custo fixo" e outros componentes seguem em FFS fora do global, metas quantitativas de produção (derivadas de histórico) não devem ser tratadas como fórmula direta de cálculo do orçamento, mas como referência operacional e salvaguarda de entrega assistencial mínima, salvo previsão expressa diferente. [25]</p>
</div>

<div class="compass-section">
<h2>Quando variações de volume justificam revisão do orçamento</h2>

<p>A literatura sobre orçamento global enfatiza que ajustes de orçamento são parte do desenho (para inflação/fatores de custo; demografia; deslocamentos de mercado; mudanças populacionais), mas tipicamente via regras formais e transparentes — não por reindexação ad hoc do orçamento a variações marginais de volume. [26]</p>

<p>Do ponto de vista técnico-contratual, gatilhos mais defensáveis para revisão do orçamento global incluem:</p>

<p><strong>Reequilíbrio econômico-financeiro por mudança estrutural:</strong> investimentos e expansão/redução de capacidade instalada (ativos físicos e força de trabalho estrutural) que alterem persistentemente o custo fixo e o padrão de disponibilidade contratada. [27]</p>

<p><strong>Ajuste por risco/case-mix e população atribuída:</strong> mudança relevante na composição de risco, severidade e complexidade (ou no tamanho da população atribuída) que altere o custo esperado por beneficiário, exigindo mecanismo de ajuste para evitar penalizar indevidamente o prestador por "piora" de risco ou incentivar seleção de risco. [28]</p>

<p><strong>Cláusulas de ajuste por variações sustentadas e não transitórias:</strong> ajustes por deslocamento de mercado/demografia são exemplos de mecanismos formais em modelos de orçamento global hospitalar (p.ex., regras de "market shift" e ajustes demográficos), desenhados para lidar com mudanças estruturais de demanda sem dissolver o princípio de orçamento. [29]</p>

<p><strong>Cláusula de reopção/reabertura ("reopener clause"):</strong> uma cláusula contratual que define objetivamente condições, janelas e métricas para renegociação do orçamento, reconhecendo que contratos são incompletos e que renegociação estruturada reduz conflito e oportunismo. [30]</p>

<p>Como princípio de boa prática, a revisão do orçamento deve ser acionada por evidência de mudança estrutural (capacidade, população/risco, mix de serviços) e não por variações pequenas e esperadas dentro da oscilação operacional normal, pois o orçamento global busca justamente reduzir a dependência da receita ao volume. [31]</p>
</div>

<div class="compass-section">
<h2>Riscos de reindexar o orçamento ao volume</h2>

<p>Reindexar o orçamento global ao volume (mesmo que implicitamente, por "metas quantitativas que viram base de orçamento") tende a reintroduzir o incentivo central do FFS: produzir mais para proteger ou elevar receita, o que é conceitualmente oposto ao objetivo do orçamento global e do accountability populacional. [32]</p>

<p>Esse redesenho implícito cria três efeitos indesejáveis documentados/reconhecidos na literatura de payment reform:</p>

<p><strong>Incentivo perverso à manutenção de volume:</strong> hospitais com alto custo fixo podem ter menor apetite por reduzir utilização "desnecessária" se a sua receita estrutural também cair com o volume, reduzindo colaboração com iniciativas ACO de desospitalização e coordenação do cuidado. [33]</p>

<p><strong>Risco de "FFS disfarçado":</strong> um contrato que se apresenta como orçamento global, mas cujo orçamento é recalculado proporcionalmente ao volume, preserva a lógica de preço por unidade, apenas com uma "roupagem" de orçamento. Isso enfraquece o sinal econômico para redesenho assistencial (redução de baixo valor, prevenção, transição de cuidados). [17]</p>

<p><strong>Aumento da necessidade de controle de utilização:</strong> ao recolocar o volume como driver de receita, tende-se a reintroduzir camadas de auditoria e restrição típicas do FFS (autorização, glosas, revisões), com custo transacional e desgaste de relacionamento, o oposto do que os modelos globais pretendem reduzir. [34]</p>

<p>Uma formulação executiva (não confrontadora) que costuma funcionar é: "se o orçamento variar automaticamente com variações marginais de produção, o contrato passa a ter incentivos predominantemente de volume; se o orçamento é estável e ajustado por risco/mudança estrutural, os incentivos favorecem valor". Essa é uma síntese fiel do racional econômico descrito em fontes de desenho de orçamento global/diferença versus FFS. [35]</p>
</div>

<div class="compass-section">
<h2>Recomendações práticas para redação contratual e governança</h2>

<p>A seguir, recomendações alinhadas a literatura de payment reform e a mecanismos observados em programas de orçamento global e ACO, com foco em reduzir ambiguidades e risco de interpretações "volume-indexadas". [36]</p>

<p><strong>Definir explicitamente a população atribuída e o perímetro do orçamento global:</strong> declarar (i) população/escopo (quem está coberto), (ii) quais componentes entram no global (facility/estrutura) e (iii) quais ficam fora (p.ex., profissionais; materiais/medicamentos quando for o caso), evitando inferências de que "produção recalcula orçamento". [37]</p>

<p><strong>Descrever metas quantitativas como guardrails, não como fórmula de orçamento:</strong> redigir que metas de volume são pisos/corredores de conformidade (para evitar suboferta e preservar acesso) e referência de perfil assistencial para leitura de performance; se existir qualquer ajuste financeiro associado, explicitar que é excepcional, não automático, e sob gatilhos definidos. [38]</p>

<p><strong>Implementar ajuste por case-mix/risco e zona de neutralidade (corredor):</strong> (i) ajustar indicadores de desempenho por risco e complexidade, e (ii) prever faixa de variação operacional (zona de neutralidade) na qual o orçamento não é reaberto, para preservar o princípio do global e reduzir disputa por variação normal. [39]</p>

<p><strong>Estabelecer mecanismo formal de reequilíbrio e reopção:</strong> definir gatilhos (mudança estrutural de capacidade; mudança sustentada de população/risco; mudança regulatória relevante), prazos, governança decisória e evidências exigidas. A lógica é reduzir "renegociação por percepção" e tratar o contrato como deliberadamente incompleto, com janelas estruturadas de ajuste. [40]</p>

<p><strong>Auditoria e monitoramento orientados a risco de suboferta e qualidade:</strong> incorporar rotinas de auditoria clínica/codificação, monitoramento de acesso (tempos, negativas, filas) e indicadores de subutilização, pois a literatura destaca que medidas explícitas de qualidade e acesso são necessárias sob orçamento global e risco. [41]</p>

<p><strong>Limitadores para o componente variável e para qualquer métrica de produção ligada a pagamento:</strong> como referência prudencial, a literatura sobre contratos globais frequentemente usa bônus de qualidade em torno de "até 10%" do orçamento global (ex.: AQC), e o restante do envelope é tratado como orçamento prospectivo; nesse espírito, recomenda-se que qualquer componente variável ligado a metas quantitativas, se existir, seja pequeno, não linear e desenhado para proteger acesso, não para "pagar produção". [42]</p>

<p><strong>Governança conjunta com trilhas técnica e financeira:</strong> instituir comitê paritário (operadora e gestão hospitalar) com rito mensal de acompanhamento de guardrails (produção/acesso) e rito trimestral/semestral de revisão de risco/case-mix e de premissas do envelope global. Isso reduz a probabilidade de "explicar orçamento por produção" e mantém a conversa no nível correto (risco, capacidade, qualidade e custo total). [43]</p>

<p><strong>Argumentos técnicos prontos (linguagem executiva, sem confronto), consistentes com a literatura:</strong></p>

<p>"Orçamento global é um teto prospectivo para financiar capacidade e responsabilidade assistencial; produção é monitorada como acesso e perfil, não como fórmula de repasse." [44]</p>

<p>"Se o repasse global variar automaticamente com produção marginal, o incentivo volta a ser de volume, típico de FFS; e a coordenação ACO perde força." [45]</p>

<p>"Revisão do global deve ser acionada por mudança estrutural (capacidade/risco/população), com mecanismo objetivo de reequilíbrio; variação normal deve ficar dentro de corredor." [46]</p>
</div>

<div class="compass-section">
<h2>Tabela comparativa</h2>

<table class="comparison-table">
<thead>
<tr>
<th>Papel da meta quantitativa</th>
<th>Evidência teórica (síntese)</th>
<th>Implicação contratual</th>
<th>Recomendação prática</th>
</tr>
</thead>
<tbody>
<tr>
<td>Referência de perfil assistencial (baseline)</td>
<td>"Global payment/budget" usa população definida e metas para interpretar utilização e performance sob um contexto; contratos globais são frequentemente híbridos. [47]</td>
<td>Meta não deve ser confundida com fórmula do orçamento; funciona como referência operacional.</td>
<td>Explicitar em contrato que metas quantitativas são "referência de perfil" (não indexador de repasse). [48]</td>
</tr>
<tr>
<td>Guardrail de acesso / anti-suboferta</td>
<td>Modelos pré-pagos/capitação reconhecem risco de "stinting" e recomendam salvaguardas de qualidade/acesso. [49]</td>
<td>Metas de produção podem ser cláusulas de conformidade (piso/corredor), não "meta de receita".</td>
<td>Definir pisos/corredores e SLAs de acesso; atrelar a planos de ação, não a recalcular global automaticamente. [50]</td>
</tr>
<tr>
<td>Instrumento de interpretação da eficiência</td>
<td>Hospitais têm alto custo fixo no curto prazo; variação marginal de volume gera ociosidade mais do que economia real. [51]</td>
<td>Comparações de eficiência devem considerar se o prestador operou sob pressão assistencial mínima.</td>
<td>Manter metas quantitativas como contexto para leitura de LOS/qualidade, evitando "eficiência" sobre base ociosa. [52]</td>
</tr>
<tr>
<td>Mecanismo de ajuste do global (quando explícito)</td>
<td>Ajustes de orçamento global são parte do desenho, mas via regras formais (risco, capacidade, mercado), não por reindexação ad hoc ao volume. [53]</td>
<td>Ajuste do global deve ter gatilho explícito, não ser automático por variação de produção.</td>
<td>Prever cláusula de reopção com gatilhos objetivos (capacidade, risco, regulação); zona de neutralidade para variação normal. [30]</td>
</tr>
<tr>
<td>Proteção contra reindexação ao volume (integridade do global)</td>
<td>FFS remunera por serviço e incentiva atividade; global budgets buscam reverter incentivos de volume; reindexação ao volume desfaz o racional. [54]</td>
<td>Se metas quantitativas determinam repasse, o contrato se aproxima de FFS e exige novos controles.</td>
<td>Proibir no texto contratual a "indexação automática do global ao volume", salvo gatilho contratual explícito e excepcional. [55]</td>
</tr>
<tr>
<td>Base para governança e auditoria</td>
<td>"Safeguards" e monitoramento são recomendados para mitigar risco de suboferta e preservar qualidade sob risco financeiro. [56]</td>
<td>Necessidade de comitês, rotinas e critérios de auditoria.</td>
<td>Instituir governança conjunta com auditoria clínica e de acesso (incluindo indicadores de subutilização). [57]</td>
</tr>
</tbody>
</table>
</div>

<div class="compass-section">
<h2>Notas e fontes principais</h2>

<p>A definição de "accountable care" e a caracterização de ACO como arranjo que busca melhorar qualidade, coordenação e resultados para um grupo definido, reduzindo custos desnecessários, está descrita em páginas conceituais do CMS e materiais de referência do MedPAC. [58]</p>

<p>A distinção entre FFS (pagamento por serviço individual) e modelos alternativos é documentada pelo CMS e pela OECD, incluindo a observação de que FFS tende a incentivar maior atividade clínica/volume. [5]</p>

<p>A lógica do orçamento global como restrição de receita anual e instrumento para deslocar incentivos de volume para valor é descrita em documentos de desenho e sínteses (p.ex., SHVS, Commonwealth Fund), em documentação e acordos do modelo de Maryland e em literatura revisada por pares sobre GBR. [59]</p>

<p>A necessidade de salvaguardas explícitas de qualidade e acesso sob global budgets e risco financeiro (para mitigar "stinting"/suboferta) aparece em sínteses do Urban Institute e em fontes institucionais/analíticas que discutem risco e monitoramento em modelos de capitação/risco. [60]</p>

<p>Como precedente prático de "global budget + incentivos de qualidade", a literatura sobre o AQC (BCBSMA) descreve bônus de qualidade de até 10% do orçamento global e um conjunto amplo de medidas, publicado e acompanhado em periódicos e relatórios de policy. [61]</p>

<p>A distinção entre custos fixos e variáveis em hospitais e o risco de confundir "redução de utilização" com "economia orçamentária" no curto prazo é discutida na literatura de custos hospitalares e em análises específicas sobre a predominância de custos fixos e custos conjuntos. [62]</p>

<p>A justificativa teórica para cláusulas objetivas, guardrails e mecanismos de renegociação em contratos complexos (incompletos) é sustentada pela teoria de contratos incompletos, incluindo trabalhos clássicos de Oliver Hart [63] e coautores. [16]</p>
</div>

<div class="compass-section">
<h2>Referências</h2>

<table class="ref-table">
<thead>
<tr><th>Notas</th><th>Fonte</th><th>URL</th></tr>
</thead>
<tbody>
<tr><td>[1] [10] [37] [58]</td><td>Accountable Care and Accountable Care Organizations</td><td><a href="https://www.cms.gov/priorities/innovation/key-concepts/accountable-care-and-accountable-care-organizations">cms.gov</a></td></tr>
<tr><td>[2] [17] [31] [33] [36] [44] [55] [59]</td><td>Toward Hospital Global Budgeting: State Considerations</td><td><a href="https://www.shvs.org/wp-content/uploads/2018/05/SHVS_-Global-Hospital-Budgets_FINAL.pdf">shvs.org</a></td></tr>
<tr><td>[3] [11] [15] [49]</td><td>The Future of Capitation: The Physician Role in Managing...</td><td><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC1495203/">pmc.ncbi.nlm.nih.gov</a></td></tr>
<tr><td>[4] [26] [29] [46] [52]</td><td>HSCRC GBR Adjustments</td><td><a href="https://hscrc.maryland.gov/pages/gbr-adjustments.aspx">hscrc.maryland.gov</a></td></tr>
<tr><td>[5] [32] [35] [45] [54]</td><td>CMS Innovation Center: Alternative Payment Models</td><td><a href="https://www.cms.gov/priorities/innovation/key-concepts/alternative-payment-models">cms.gov</a></td></tr>
<tr><td>[6] [9]</td><td>Global Budget Revenue Agreement</td><td><a href="https://hscrc.maryland.gov/documents/global-budgets/global-budget-revenue-agreement-fwmc-7-16-14.pdf">hscrc.maryland.gov</a></td></tr>
<tr><td>[7] [14] [24]</td><td>AHEAD Model Financial Specifications</td><td><a href="https://www.cms.gov/files/document/ahead-tech-specs-v30.pdf">cms.gov</a></td></tr>
<tr><td>[8] [21] [22] [27] [51] [62] [63]</td><td>The Fixed-Cost Dilemma</td><td><a href="https://www.microsoft.com/en-us/research/wp-content/uploads/2020/12/The-fixed-cost-dilemma.pdf">microsoft.com/research</a></td></tr>
<tr><td>[12] [42] [61]</td><td>The 'Alternative Quality Contract' in Massachusetts</td><td><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3548447/">pmc.ncbi.nlm.nih.gov</a></td></tr>
<tr><td>[13]</td><td>Health Care Spending and Quality in Year 1</td><td><a href="https://www.nejm.org/doi/full/10.1056/NEJMsa1101416">nejm.org</a></td></tr>
<tr><td>[16] [30] [40] [53]</td><td>Incomplete Contracts and Renegotiation</td><td><a href="https://www.jstor.org/stable/1912698">jstor.org</a></td></tr>
<tr><td>[18] [19] [34] [38] [41] [50] [57] [60]</td><td>Global Budgets for Hospitals</td><td><a href="https://www.urban.org/sites/default/files/2016/05/03/05_global_budgets_for_hospitals.pdf">urban.org</a></td></tr>
<tr><td>[20]</td><td>Program Guidance &amp; Specifications</td><td><a href="https://www.cms.gov/medicare/payment/fee-for-service-providers/shared-savings-program-ssp-acos/guidance-regulations">cms.gov</a></td></tr>
<tr><td>[23]</td><td>End-of-Life Care in the Intensive Care Unit</td><td><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC3480521/">pmc.ncbi.nlm.nih.gov</a></td></tr>
<tr><td>[25] [48]</td><td>What's in a Name: A Primer on Global Budget Models</td><td><a href="https://hcttf.org/wp-content/uploads/2019/09/HCTTF-Whats-in-a-Name-A-Primer-on-Global-Budget-Models-1.pdf">hcttf.org</a></td></tr>
<tr><td>[28]</td><td>Accountable Care Organizations in the U.S. Health Care System</td><td><a href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4422096/">pmc.ncbi.nlm.nih.gov</a></td></tr>
<tr><td>[39]</td><td>Accountable Care Organization Payment...</td><td><a href="https://www.medpac.gov/wp-content/uploads/2024/10/MedPAC_Payment_Basics_25_ACOs_FINAL_SEC.pdf">medpac.gov</a></td></tr>
<tr><td>[43]</td><td>Price Setting and Price Regulation in Health Care</td><td><a href="https://www.oecd.org/content/dam/oecd/en/publications/reports/2019/06/price-setting-and-price-regulation-in-health-care_1c38bffd/ed3c16ff-en.pdf">oecd.org</a></td></tr>
<tr><td>[47]</td><td>Health Care Spending, Utilization, and Quality 8 Years into...</td><td><a href="https://www.nejm.org/doi/full/10.1056/NEJMsa1813621">nejm.org</a></td></tr>
<tr><td>[56]</td><td>December 20, 2019 Ms. Joanne Chiedi Acting Inspector...</td><td><a href="https://downloads.regulations.gov/HHSIG-2019-0002-0063/attachment_1.pdf">regulations.gov</a></td></tr>
</tbody>
</table>
</div>

<div class="compass-scope">
  <strong>Nota de escopo.</strong> Cada edição do Compass&trade; é um documento técnico-estratégico de uso interno, destinado à educação continuada e ao apoio à tomada de decisão dos integrantes do Grupo CSV. Quando o tema envolver aspectos jurídicos, regulatórios ou contratuais, recomenda-se avaliação complementar por profissional especializado.
</div>

<div class="compass-download">
  <a href="/compass/edicoes/2026/001/compass_001_2026.pdf" download>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
    Download PDF com timbrado
  </a>
</div>

<div class="compass-nav">
  <a href="/compass/" class="nav-primary">&larr; Central Compass&trade;</a>
  <a href="/" class="nav-secondary">&larr; Voltar ao Hub</a>
</div>

<div class="compass-edition-footer">
  Compass&trade; &mdash; Grupo CSV &middot; Cuidados em Saúde com Valor
</div>

</div>
