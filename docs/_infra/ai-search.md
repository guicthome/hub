---
layout: page
title: AI Search — Ponto Neural do Hub CSV
---

<style scoped>
.VPPage { padding: 0 !important; }

.ai-page {
  max-width: 1040px;
  margin: 0 auto;
  padding: 32px 24px 48px;
  background:
    radial-gradient(1400px 600px at -10% -20%, #e8f0f6 0%, transparent 60%),
    radial-gradient(1200px 500px at 110% 0%, #ebf7f1 0%, transparent 60%),
    #F6F4EF;
  min-height: calc(100vh - 64px);
}
.dark .ai-page { background: var(--vp-c-bg); }

.frame {
  background: rgba(255,255,255,0.92);
  border: 1px solid rgba(13,38,76,.06);
  border-radius: 18px;
  box-shadow: 0 10px 28px rgba(13,38,76,.14);
  padding: clamp(18px, 4vw, 28px);
  margin-bottom: 24px;
}
.dark .frame { background: var(--vp-c-bg-soft); border-color: var(--vp-c-divider); box-shadow: none; }

/* Hero */
.hero-banner {
  background: linear-gradient(135deg, #0d264c 0%, #196396 40%, #1d8a6a 100%);
  border-radius: 18px;
  padding: clamp(28px, 5vw, 48px) clamp(20px, 4vw, 36px);
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
}
.hero-banner::before {
  content: '';
  position: absolute;
  top: -40%;
  right: -20%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}
.hero-banner h1 {
  margin: 0 0 8px;
  font-size: clamp(1.6rem, 2.5vw + 1rem, 2.2rem);
  color: #fff;
  border: none;
  letter-spacing: -0.02em;
}
.hero-banner .tagline {
  color: rgba(255,255,255,0.85);
  font-size: clamp(0.95rem, 1vw + 0.5rem, 1.1rem);
  line-height: 1.65;
  max-width: 680px;
}
.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255,255,255,0.12);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 8px;
  padding: 6px 14px;
  font-size: 0.8rem;
  color: rgba(255,255,255,0.9);
  font-weight: 600;
  margin-bottom: 16px;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Section titles */
.section-title {
  margin: 0 0 8px;
  color: #0d264c;
  font-size: clamp(1.15rem, 1.1vw + 0.9rem, 1.35rem);
  border: none;
  display: flex;
  align-items: center;
  gap: 10px;
}
.dark .section-title { color: var(--vp-c-text-1); }
.section-title .icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  font-size: 1rem;
  flex-shrink: 0;
}
.icon-blue { background: #e8f4fd; color: #196396; }
.icon-green { background: #e6f7ef; color: #1d8a6a; }
.icon-purple { background: #f0ecf7; color: #6B5B95; }
.icon-orange { background: #fef3e8; color: #ea580c; }
.icon-dark { background: #ebeef3; color: #0d264c; }
.dark .icon-blue { background: #1a3a5c; } .dark .icon-green { background: #1a3c2e; }
.dark .icon-purple { background: #2e2840; } .dark .icon-orange { background: #3c2a1a; }
.dark .icon-dark { background: #2a2e38; }

.section-desc { color: #5b6470; font-size: 0.92rem; margin-bottom: 16px; line-height: 1.65; }

/* Architecture diagram */
.arch-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
  padding: 20px 0;
}
.arch-node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 14px 16px;
  border-radius: 12px;
  text-align: center;
  min-width: 110px;
}
.arch-node .node-icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
}
.arch-node .node-label { font-size: 0.78rem; font-weight: 600; color: #2d3445; line-height: 1.3; }
.arch-node .node-sub { font-size: 0.68rem; color: #8b95a5; }
.dark .arch-node .node-label { color: #ccc; }
.dark .arch-node .node-sub { color: #888; }
.arch-arrow {
  font-size: 1.2rem;
  color: #b0bec5;
  padding: 0 4px;
  flex-shrink: 0;
}
@media (max-width: 640px) {
  .arch-flow { flex-direction: column; gap: 4px; }
  .arch-arrow { transform: rotate(90deg); }
}

.n-source .node-icon { background: #e8f4fd; color: #196396; }
.n-r2 .node-icon { background: #fff3e0; color: #f57c00; }
.n-vec .node-icon { background: #e6f7ef; color: #1d8a6a; }
.n-llm .node-icon { background: #f0ecf7; color: #6B5B95; }
.n-api .node-icon { background: #ebeef3; color: #0d264c; }

/* Stats grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 4px;
}
@media (max-width: 640px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
.stat-card {
  background: linear-gradient(180deg, #f8fafc, #f1f5f9);
  border: 1px solid rgba(13,38,76,.06);
  border-radius: 12px;
  padding: 16px;
  text-align: center;
}
.dark .stat-card { background: var(--vp-c-bg-alt); border-color: var(--vp-c-divider); }
.stat-card .stat-value { font-size: 1.6rem; font-weight: 800; color: #196396; }
.dark .stat-card .stat-value { color: #5da9e0; }
.stat-card .stat-label { font-size: 0.78rem; color: #8b95a5; margin-top: 2px; }

/* Connection grid */
.conn-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 640px) { .conn-grid { grid-template-columns: 1fr; } }
.conn-card {
  border: 1px solid rgba(13,38,76,.08);
  border-radius: 14px;
  padding: 18px;
  display: flex;
  gap: 14px;
  align-items: flex-start;
  transition: transform .15s ease, box-shadow .15s ease;
}
.conn-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(13,38,76,.10); }
.dark .conn-card { border-color: var(--vp-c-divider); }
.conn-card .cc-icon {
  width: 38px;
  height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  flex-shrink: 0;
}
.conn-card .cc-title { font-weight: 700; font-size: 0.9rem; color: #2d3445; margin-bottom: 3px; }
.dark .conn-card .cc-title { color: var(--vp-c-text-1); }
.conn-card .cc-desc { font-size: 0.82rem; color: #6b7585; line-height: 1.5; }

/* Code blocks */
.code-frame {
  background: #0d1117;
  border-radius: 12px;
  padding: 0;
  margin: 14px 0;
  overflow: hidden;
}
.code-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 16px;
  background: rgba(255,255,255,0.04);
  border-bottom: 1px solid rgba(255,255,255,0.06);
}
.code-header .lang { font-size: 0.72rem; color: #8b949e; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
.code-header .method { font-size: 0.72rem; color: #58a6ff; font-weight: 700; }
.code-body {
  padding: 16px;
  overflow-x: auto;
  font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', monospace;
  font-size: 0.82rem;
  line-height: 1.65;
  color: #c9d1d9;
}
.code-body .kw { color: #ff7b72; }
.code-body .str { color: #a5d6ff; }
.code-body .cmt { color: #8b949e; font-style: italic; }
.code-body .fn { color: #d2a8ff; }
.code-body .num { color: #79c0ff; }

/* Table */
.spec-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  margin: 14px 0;
}
.spec-table th {
  background: #f1f5f9;
  padding: 10px 14px;
  text-align: left;
  font-weight: 700;
  color: #2d3445;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.8rem;
}
.dark .spec-table th { background: var(--vp-c-bg-alt); color: var(--vp-c-text-1); border-color: var(--vp-c-divider); }
.spec-table td {
  padding: 10px 14px;
  border-bottom: 1px solid #eef1f5;
  color: #4a5568;
  vertical-align: top;
}
.dark .spec-table td { border-color: var(--vp-c-divider); color: var(--vp-c-text-2); }
.spec-table code {
  background: #eef1f5;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-family: 'SF Mono', monospace;
}
.dark .spec-table code { background: var(--vp-c-bg-alt); }

/* Sync flow */
.sync-flow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  flex-wrap: wrap;
  padding: 16px 0;
}
.sync-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 12px 14px;
  text-align: center;
}
.sync-step .step-num {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #196396;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 800;
}
.sync-step .step-label { font-size: 0.78rem; font-weight: 600; color: #2d3445; }
.sync-step .step-sub { font-size: 0.68rem; color: #8b95a5; }
.dark .sync-step .step-label { color: #ccc; }
.sync-arrow { font-size: 1.2rem; color: #b0bec5; padding: 0 4px; }
@media (max-width: 640px) {
  .sync-flow { flex-direction: column; gap: 4px; }
  .sync-arrow { transform: rotate(90deg); }
}

/* Extensio highlight */
.extensio-banner {
  background: linear-gradient(135deg, #0d264c 0%, #1a4a7a 50%, #6B5B95 100%);
  border-radius: 14px;
  padding: 24px;
  margin: 14px 0 0;
  color: #fff;
  position: relative;
  overflow: hidden;
}
.extensio-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -30%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%);
  pointer-events: none;
}
.extensio-banner h3 { color: #fff; margin: 0 0 8px; font-size: 1.1rem; border: none; }
.extensio-banner p { color: rgba(255,255,255,0.85); font-size: 0.88rem; line-height: 1.6; margin: 0; }

/* Footer */
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
</style>

<div class="ai-page">

  <!-- Hero -->
  <div class="hero-banner">
    <div class="hero-badge">Ponto Neural</div>
    <h1>AI Search</h1>
    <p class="tagline">
      Motor de busca semântica com geração de respostas em linguagem natural sobre todo o conteúdo do Hub CSV.
      Uma API que transforma 189 documentos indexados em conhecimento acessível por qualquer agente, automação ou sistema conectado ao ecossistema.
    </p>
  </div>

  <!-- O que é -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-blue">&#9670;</span> O que é</h2>
    <p class="section-desc">
      O AI Search é uma camada de inteligência que permite consultar todo o arsenal do Hub CSV em linguagem natural.
      Dashboards, relatórios, calculadoras, mandatos, edições do Signal e do Compass, dados clínicos, identidade visual
      e documentos estratégicos: tudo indexado, vetorizado e pronto para ser consumido por qualquer sistema que faça uma chamada HTTP.
    </p>
    <p class="section-desc">
      Não é uma interface de chat. É uma <strong>API robusta</strong> projetada para ser o ponto de conexão entre o Hub
      e o restante do ecossistema digital: agentes de IA, automações, SaaS e, em especial, o <strong>Extensio</strong>.
    </p>
  </div>

  <!-- Arquitetura -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-green">&#9674;</span> Arquitetura</h2>
    <p class="section-desc">O fluxo de dados segue cinco estágios, do repositório até a resposta final.</p>

    <div class="arch-flow">
      <div class="arch-node n-source">
        <div class="node-icon">G</div>
        <div class="node-label">GitHub</div>
        <div class="node-sub">grupocsv/hub</div>
      </div>
      <div class="arch-arrow">&#8594;</div>
      <div class="arch-node n-r2">
        <div class="node-icon">R2</div>
        <div class="node-label">Cloudflare R2</div>
        <div class="node-sub">hub-csv-knowledge</div>
      </div>
      <div class="arch-arrow">&#8594;</div>
      <div class="arch-node n-vec">
        <div class="node-icon">V</div>
        <div class="node-label">Vectorize</div>
        <div class="node-sub">ai-search-hub-csv</div>
      </div>
      <div class="arch-arrow">&#8594;</div>
      <div class="arch-node n-llm">
        <div class="node-icon">AI</div>
        <div class="node-label">Workers AI</div>
        <div class="node-sub">Geração + Embedding</div>
      </div>
      <div class="arch-arrow">&#8594;</div>
      <div class="arch-node n-api">
        <div class="node-icon">{ }</div>
        <div class="node-label">API REST</div>
        <div class="node-sub">ai-search / search</div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">189</div>
        <div class="stat-label">Documentos indexados</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">384</div>
        <div class="stat-label">Vetores no banco</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">2048</div>
        <div class="stat-label">Tokens por chunk</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">0</div>
        <div class="stat-label">Custo mensal (USD)</div>
      </div>
    </div>
  </div>

  <!-- Endpoints -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-purple">&#9672;</span> Endpoints</h2>
    <p class="section-desc">Dois endpoints disponíveis. O primeiro gera respostas em linguagem natural; o segundo retorna apenas os documentos relevantes.</p>

    <h3 style="font-size: 1rem; color: #196396; margin: 18px 0 8px; border: none;">Endpoint 1: AI Search (busca + geração)</h3>

    <div class="code-frame">
      <div class="code-header">
        <span class="method">POST</span>
        <span class="lang">HTTP</span>
      </div>
      <div class="code-body">
<span class="kw">POST</span> /client/v4/accounts/<span class="str">{account_id}</span>/autorag/rags/<span class="str">hub-csv</span>/ai-search<br/>
<span class="kw">Host:</span> api.cloudflare.com<br/>
<span class="kw">Authorization:</span> Bearer <span class="str">{AI_SEARCH_TOKEN}</span><br/>
<span class="kw">Content-Type:</span> application/json
      </div>
    </div>

    <div class="code-frame">
      <div class="code-header">
        <span class="method">Body</span>
        <span class="lang">JSON</span>
      </div>
      <div class="code-body">
{<br/>
&nbsp;&nbsp;<span class="str">"query"</span>: <span class="str">"Qual o mandato da AxiaCare?"</span>,<br/>
&nbsp;&nbsp;<span class="str">"system_prompt"</span>: <span class="str">"Assistente do Hub CSV. Responda em PT-BR, direto e preciso. Cite fontes."</span>,<br/>
&nbsp;&nbsp;<span class="str">"stream"</span>: <span class="num">false</span>,<br/>
&nbsp;&nbsp;<span class="str">"rewrite_query"</span>: <span class="num">true</span>,<br/>
&nbsp;&nbsp;<span class="str">"max_num_results"</span>: <span class="num">10</span><br/>
}
      </div>
    </div>

    <h3 style="font-size: 1rem; color: #196396; margin: 18px 0 8px; border: none;">Endpoint 2: Search (busca vetorial pura)</h3>

    <div class="code-frame">
      <div class="code-header">
        <span class="method">POST</span>
        <span class="lang">HTTP</span>
      </div>
      <div class="code-body">
<span class="kw">POST</span> /client/v4/accounts/<span class="str">{account_id}</span>/autorag/rags/<span class="str">hub-csv</span>/search<br/>
<span class="kw">Host:</span> api.cloudflare.com<br/>
<span class="cmt">// Mesmos headers. Retorna apenas documentos, sem geração LLM.</span>
      </div>
    </div>

    <h3 style="font-size: 1rem; color: #196396; margin: 18px 0 8px; border: none;">Parâmetros</h3>

    <table class="spec-table">
      <thead>
        <tr>
          <th>Parâmetro</th>
          <th>Tipo</th>
          <th>Padrão</th>
          <th>Descrição</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>query</code></td><td>string</td><td>-</td><td>Pergunta em linguagem natural</td></tr>
        <tr><td><code>system_prompt</code></td><td>string</td><td>-</td><td>Instrução para o LLM (recomendado sempre)</td></tr>
        <tr><td><code>rewrite_query</code></td><td>boolean</td><td>false</td><td>Reescreve a query para melhorar a busca</td></tr>
        <tr><td><code>max_num_results</code></td><td>number</td><td>10</td><td>Documentos retornados (1-50)</td></tr>
        <tr><td><code>stream</code></td><td>boolean</td><td>false</td><td>Resposta em streaming</td></tr>
        <tr><td><code>score_threshold</code></td><td>number</td><td>0</td><td>Score mínimo para considerar resultado (0-1)</td></tr>
      </tbody>
    </table>
  </div>

  <!-- System Prompt -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-dark">&#9671;</span> System Prompt Recomendado</h2>
    <p class="section-desc">O system prompt não é persistido na instância. Deve ser enviado em cada requisição para contextualizar o LLM.</p>

    <div class="code-frame">
      <div class="code-header">
        <span class="method">Prompt</span>
        <span class="lang">Texto</span>
      </div>
      <div class="code-body">
Você é o assistente de conhecimento do Hub CSV, o arsenal digital de<br/>
Guilherme Thomé, médico executivo e fundador do Grupo CSV. O Hub<br/>
centraliza dashboards, relatórios, calculadoras, dados clínicos,<br/>
mandatos, documentos estratégicos e ferramentas operacionais das<br/>
empresas AxiaCare, Thera, MedValor, e das instituições Unimed GV,<br/>
Unihealth GV e ICDS. Responda sempre em português do Brasil, de<br/>
forma direta e precisa. Cite os documentos-fonte quando relevante.<br/>
Se não encontrar a informação nos documentos indexados, diga<br/>
explicitamente que não há dados disponíveis.
      </div>
    </div>
  </div>

  <!-- Sync automático -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-green">&#9670;</span> Sincronização Automática</h2>
    <p class="section-desc">O ciclo de atualização é totalmente automatizado. A cada push no repositório, o conteúdo é sincronizado com o R2 e o índice vetorial é reconstruído.</p>

    <div class="sync-flow">
      <div class="sync-step">
        <div class="step-num">1</div>
        <div class="step-label">Push no main</div>
        <div class="step-sub">Commit no repositório</div>
      </div>
      <div class="sync-arrow">&#8594;</div>
      <div class="sync-step">
        <div class="step-num">2</div>
        <div class="step-label">Deploy VitePress</div>
        <div class="step-sub">GitHub Pages</div>
      </div>
      <div class="sync-arrow">&#8594;</div>
      <div class="sync-step">
        <div class="step-num">3</div>
        <div class="step-label">Sync R2</div>
        <div class="step-sub">rclone via Actions</div>
      </div>
      <div class="sync-arrow">&#8594;</div>
      <div class="sync-step">
        <div class="step-num">4</div>
        <div class="step-label">Re-index</div>
        <div class="step-sub">Vetorização automática</div>
      </div>
      <div class="sync-arrow">&#8594;</div>
      <div class="sync-step">
        <div class="step-num">5</div>
        <div class="step-label">API atualizada</div>
        <div class="step-sub">Respostas com dados novos</div>
      </div>
    </div>

    <p class="section-desc" style="margin-top: 12px;">
      <strong>Ciclo virtuoso:</strong> quanto mais conteúdo entra no Hub, mais inteligente a API se torna.
      Quanto mais inteligente a API, mais valor em alimentar o Hub. Sem intervenção manual.
    </p>
  </div>

  <!-- Pontos de Conexão -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-orange">&#9672;</span> Pontos de Conexão</h2>
    <p class="section-desc">O AI Search foi projetado para ser consumido por qualquer sistema que faça chamadas HTTP. Estes são os cenários de uso primários.</p>

    <div class="conn-grid">
      <div class="conn-card">
        <div class="cc-icon icon-blue">L</div>
        <div>
          <div class="cc-title">LLMs no dia a dia</div>
          <div class="cc-desc">Manus, Claude, ChatGPT, Antigravity. Basta chamar a API como tool/function para dar contexto do Hub a qualquer conversa.</div>
        </div>
      </div>
      <div class="conn-card">
        <div class="cc-icon icon-orange">M</div>
        <div>
          <div class="cc-title">Make (Automações)</div>
          <div class="cc-desc">Módulo HTTP no Make para consultar o Hub dentro de cenários automatizados. Disparo por webhook, Slack, email ou agendamento.</div>
        </div>
      </div>
      <div class="conn-card">
        <div class="cc-icon icon-purple">A</div>
        <div>
          <div class="cc-title">APIs de Agentes</div>
          <div class="cc-desc">Qualquer framework de agentes (LangChain, CrewAI, AutoGen) pode usar o endpoint como ferramenta de busca contextual.</div>
        </div>
      </div>
      <div class="conn-card">
        <div class="cc-icon icon-green">S</div>
        <div>
          <div class="cc-title">SaaS e Integrações</div>
          <div class="cc-desc">Zapier, n8n, Retool, ou qualquer plataforma com suporte a chamadas REST. O Hub vira uma fonte de dados viva.</div>
        </div>
      </div>
    </div>

    <div class="extensio-banner">
      <h3>Extensio: O Segundo Cérebro</h3>
      <p>
        O AI Search é um dos pontos neurais do Extensio, o sistema que concentra a inteligência distribuída
        do ecossistema. Junto com Gmail, WhatsApp, Notion e GitHub, o Hub CSV agora alimenta o "eu digital"
        com conhecimento estruturado sobre mandatos, dados clínicos, ferramentas operacionais e toda a base
        estratégica do Grupo CSV. Cada documento adicionado ao Hub fortalece automaticamente o Extensio.
      </p>
    </div>
  </div>

  <!-- Infraestrutura Cloudflare -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-dark">&#9670;</span> Infraestrutura Cloudflare</h2>
    <p class="section-desc">Todos os componentes rodam na edge da Cloudflare, sem servidores dedicados e dentro dos free tiers.</p>

    <table class="spec-table">
      <thead>
        <tr>
          <th>Componente</th>
          <th>Recurso</th>
          <th>Identificador</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>Fonte de dados</td><td>R2 Bucket</td><td><code>hub-csv-knowledge</code></td></tr>
        <tr><td>Motor de busca</td><td>AI Search (AutoRAG)</td><td><code>hub-csv</code></td></tr>
        <tr><td>Banco vetorial</td><td>Vectorize</td><td><code>ai-search-hub-csv</code></td></tr>
        <tr><td>Gateway de IA</td><td>AI Gateway</td><td><code>csv_ai_gateway</code></td></tr>
        <tr><td>Modelo de embedding</td><td>Workers AI</td><td><code>qwen3-embedding-0.6b</code></td></tr>
        <tr><td>Sync automático</td><td>GitHub Actions</td><td><code>sync-r2-ai-search.yml</code></td></tr>
      </tbody>
    </table>
  </div>

  <!-- Exemplo Python -->
  <div class="frame">
    <h2 class="section-title"><span class="icon icon-blue">&#9672;</span> Exemplo de Integração (Python)</h2>

    <div class="code-frame">
      <div class="code-header">
        <span class="method">Python</span>
        <span class="lang">requests</span>
      </div>
      <div class="code-body">
<span class="kw">import</span> requests<br/><br/>
<span class="fn">ACCOUNT_ID</span> = <span class="str">"da0c29123f448f3c3892f784cd9f7cac"</span><br/>
<span class="fn">TOKEN</span> = <span class="str">"seu_ai_search_token"</span><br/><br/>
<span class="kw">def</span> <span class="fn">hub_search</span>(query, system_prompt=<span class="num">None</span>):<br/>
&nbsp;&nbsp;&nbsp;&nbsp;url = <span class="str">f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/hub-csv/ai-search"</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;headers = {<span class="str">"Authorization"</span>: <span class="str">f"Bearer {TOKEN}"</span>, <span class="str">"Content-Type"</span>: <span class="str">"application/json"</span>}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;body = {<span class="str">"query"</span>: query, <span class="str">"stream"</span>: <span class="num">False</span>, <span class="str">"rewrite_query"</span>: <span class="num">True</span>}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">if</span> system_prompt:<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;body[<span class="str">"system_prompt"</span>] = system_prompt<br/>
&nbsp;&nbsp;&nbsp;&nbsp;r = requests.post(url, headers=headers, json=body)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span class="kw">return</span> r.json()[<span class="str">"result"</span>][<span class="str">"response"</span>]<br/><br/>
<span class="cmt"># Uso</span><br/>
<span class="fn">print</span>(hub_search(<span class="str">"Qual o mandato da AxiaCare?"</span>))
      </div>
    </div>
  </div>

  <div style="text-align:center; margin-bottom:24px;">
    <a href="/_infra/" style="display:inline-flex; align-items:center; gap:8px; padding:10px 24px; border-radius:10px; background:#196396; color:white; text-decoration:none; font-weight:600; font-size:0.9rem; transition:all 0.2s;">&#8592; Voltar à Infraestrutura</a>
  </div>

  <div class="page-footer">
    <strong>Grupo CSV — Infraestrutura Cognitiva</strong>
    <div class="small">© 2026 Grupo CSV. Cuidados em Saúde com Valor. Todos os direitos reservados.</div>
  </div>
</div>
