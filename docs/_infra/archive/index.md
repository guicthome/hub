# Arquivo de Páginas Desativadas

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

Este diretório centraliza todas as páginas, ferramentas e entregáveis que foram retirados do frontend dos parceiros. O objetivo é manter um registro organizado e rastreável, sem excluir o conteúdo original.

---

## Estrutura

Cada item arquivado é armazenado como arquivo HTML neste diretório, mantendo o nome original. A organização por parceiro é feita exclusivamente pela tabela de registro abaixo, sem necessidade de subpastas.

```
docs/_infra/archive/
  index.md           ← este arquivo (registro e documentação)
  {nome-arquivo}.html  ← páginas arquivadas
```

---

## Registro de Itens Arquivados

| # | Parceiro | Nome Original | Arquivo | Data de Arquivamento | Motivo |
|---|----------|---------------|---------|---------------------|--------|
| 1 | Unihealth GV | [Desativado] Análise Reprocir | `reprocir_fechado.html` | 2026-02-21 | Ferramenta desativada; análise concluída e sem uso recorrente |
| 2 | Unihealth GV | Orçamento Médico | `orcamento-medico-ugv.html` | 2026-02-21 | Arquivado a pedido do gestor |
| 3 | Unihealth GV | Análise de Indicadores | `marco25.html` | 2026-02-21 | Arquivado a pedido do gestor |

---

## Procedimento de Arquivamento

O processo de arquivamento segue um pipeline padronizado:

1. **Localizar** a página a ser arquivada no frontend do parceiro (Unihealth ou Unimed).
2. **Remover** o card/link da página no `index.md` do parceiro correspondente.
3. **Revisar** o layout do `index.md` do parceiro para garantir que nenhum elemento visual foi quebrado.
4. **Mover** o arquivo HTML para `docs/_infra/archive/`.
5. **Registrar** o item na tabela acima com parceiro, nome, arquivo, data e motivo.
6. **Commitar** com mensagem descritiva: `chore(archive): arquivar {nome} de {parceiro}`.

Para executar esse processo de forma automatizada, utilize a skill `archive-page` disponível em `/home/ubuntu/skills/archive-page/SKILL.md`.

---

## Observações

Os arquivos aqui depositados permanecem acessíveis via URL direta (ex.: `hub.grupocsv.com/_infra/archive/reprocir_fechado.html`) mas não aparecem em nenhum menu ou listagem do frontend. Isso permite consulta futura sem poluir a interface dos parceiros.
