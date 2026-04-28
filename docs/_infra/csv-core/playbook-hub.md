# Playbook do Hub Central

<style>
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
.copy-page-wrap { display: flex; justify-content: flex-end; margin-bottom: 16px; }
</style>
<div class="copy-page-wrap">
<button class="copy-page-btn" id="copy-page-btn" onclick="copyPageAsMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>

<script>
function copyPageAsMd() {
  var content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main');
  if (!content) return;
  function htmlToMd(el) {
    var md = '';
    function walk(node) {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      var tag = node.tagName.toLowerCase();
      if (node.classList && (node.classList.contains('copy-page-btn') || node.classList.contains('copy-page-wrap'))) return;
      if (tag === 'style' || tag === 'script' || tag === 'nav' || tag === 'aside') return;
      if (tag === 'h1') { md += '\n# '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h2') { md += '\n## '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h3') { md += '\n### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h4') { md += '\n#### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'br') { md += '\n'; return; }
      if (tag === 'strong' || tag === 'b') { md += '**'; node.childNodes.forEach(walk); md += '**'; return; }
      if (tag === 'em' || tag === 'i') { md += '*'; node.childNodes.forEach(walk); md += '*'; return; }
      if (tag === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
        md += '`' + node.textContent + '`'; return;
      }
      if (tag === 'pre') { md += '\n```\n' + node.textContent + '\n```\n\n'; return; }
      if (tag === 'a') { md += '['; node.childNodes.forEach(walk); md += '](' + (node.href || '') + ')'; return; }
      if (tag === 'li') { md += '- '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'table') {
        var rows = node.querySelectorAll('tr');
        rows.forEach(function(row, i) {
          var cells = row.querySelectorAll('th, td');
          md += '| ' + Array.from(cells).map(function(c) { return c.textContent.trim(); }).join(' | ') + ' |\n';
          if (i === 0) md += '|' + Array.from(cells).map(function() { return '---'; }).join('|') + '|\n';
        });
        md += '\n';
        return;
      }
      if (tag === 'hr') { md += '\n---\n\n'; return; }
      if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'img') return;
      node.childNodes.forEach(walk);
    }
    walk(el);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }
  var md = htmlToMd(content);
  navigator.clipboard.writeText(md).then(function() {
    var btn = document.getElementById('copy-page-btn');
    btn.classList.add('copied');
    var orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado!';
    setTimeout(function() { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2500);
  });
}
</script>
**Infraestrutura Cognitiva e Operacional do Grupo CSV**

## 1. O Conceito
O **Hub Central** (`hub.grupocsv.com`) não é apenas um site de documentação. É a **Fonte Única da Verdade (SSOT)** para todo o ecossistema do Grupo CSV.

Ele serve a dois mestres simultaneamente:
1.  **Humanos:** Executivos, colaboradores e parceiros que precisam acessar políticas, assets e diretrizes de forma rápida e visual.
2.  **Máquinas (IA):** Agentes autônomos que consomem a estrutura de pastas e arquivos Markdown para entender "quem somos", "o que fazemos" e "quais são as regras".

## 2. Arquitetura da Informação
A estrutura de pastas reflete a organização jurídica e operacional:

*   `/csv-core`: O "cérebro". Contém definições canônicas, compliance, identidade visual e assets. É o que une todas as empresas.
*   `/axiacare`: Mandatos e documentos específicos da operação de consultoria e gestão.
*   `/medvalor`: Conteúdo educacional e diretrizes da escola de negócios.
*   `/thera`: Documentação técnica e de produto da fábrica de software.

## 3. Tecnologia (VitePress)
Escolhemos o **VitePress** por ser:
*   **Static-First:** Gera HTML puro, extremamente rápido e seguro.
*   **Markdown-Based:** Todo o conteúdo é escrito em texto simples (`.md`), garantindo portabilidade e leitura por IA.
*   **Git-Driven:** A atualização é feita via commit no GitHub, garantindo versionamento e auditoria de cada mudança.

## 4. Como Operar
### Adicionar Novo Documento
1.  Crie um arquivo `.md` na pasta correspondente (ex: `/axiacare/novo-processo.md`).
2.  Adicione o link no arquivo de configuração `.vitepress/config.mts` (se quiser que apareça no menu lateral).
3.  Faça o commit e push para a branch `main`.
4.  O deploy é automático (1-2 minutos).

### Atualizar Assets
1.  Adicione a imagem na pasta `/public/assets/`.
2.  Referencie no Markdown usando o caminho absoluto (ex: `![Logo](/assets/logo.png)`).

## 5. Governança
*   **Owner:** Guilherme Thomé (@guithome).
*   **Acesso:** Público para leitura (transparência radical), restrito para escrita (governança).
*   **Manutenção:** Revisão trimestral dos mandatos e compliance.
