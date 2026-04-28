# Playbook do Hub Central
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



<style>
.copy-md-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(25, 99, 150, 0.9);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.18);
  transition: all 0.2s;
  opacity: 0.7;
}
.copy-md-float:hover { opacity: 1; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.25); }
.copy-md-float.copied { background: rgba(5, 150, 105, 0.9); opacity: 1; }
.dark .copy-md-float { background: rgba(93, 169, 224, 0.85); color: #0f172a; }
.dark .copy-md-float.copied { background: rgba(52, 211, 153, 0.85); }
</style>


<button class="copy-md-float" id="copy-md-float" onclick="copyPageMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar em Markdown
</button>

<script>
function copyPageMd() {
  // Extrai o conteúdo Markdown renderizado da página
  const content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main');
  if (!content) return;

  // Converte o HTML visível para texto limpo (pseudo-Markdown)
  function htmlToMd(el) {
    let md = '';
    const walk = (node) => {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      // Pular botões de cópia e nav
      if (node.classList.contains('copy-md-float') || node.classList.contains('copy-btn')) return;
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
        const rows = node.querySelectorAll('tr');
        rows.forEach((row, i) => {
          const cells = row.querySelectorAll('th, td');
          md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\n';
          if (i === 0) md += '|' + Array.from(cells).map(() => '---').join('|') + '|\n';
        });
        md += '\n';
        return;
      }
      if (tag === 'hr') { md += '\n---\n\n'; return; }
      if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'img') return; // pular imagens
      if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main' || tag === 'span') {
        node.childNodes.forEach(walk);
        return;
      }
      node.childNodes.forEach(walk);
    };
    walk(el);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }

  const md = htmlToMd(content);
  navigator.clipboard.writeText(md).then(() => {
    const btn = document.getElementById('copy-md-float');
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado!';
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2500);
  });
}
</script>
