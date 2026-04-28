# Deck™ — Painel de Contexto Ativo

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

## Visão Geral

O Deck™ é o painel de contexto ativo do Grupo CSV. Não é um Kanban nem uma lista de tarefas. É um instrumento visual que mostra o que está aberto agora e onde, substituindo post-its e blocos de notas utilizados para rastrear tarefas distribuídas entre múltiplas ferramentas.

| Campo | Valor |
|---|---|
| Marca | Deck™ |
| URL | [deck.grupocsv.com](https://deck.grupocsv.com) |
| Hospedagem | Cloudflare Pages |
| DNS | CNAME `deck.grupocsv.com` (Cloudflare, zone grupocsv.com) |
| Stack | HTML + CSS + JS vanilla (arquivo único) |
| Dependências CDN | Sortable.js (drag-and-drop), html2canvas (captura de tela) |
| Persistência | localStorage (client-side) |
| Autenticação | PIN de 4 dígitos (hash SHA-256 no localStorage) |
| Proprietário | Grupo CSV |

## Funcionalidades

O Deck™ oferece cards visuais com plataforma, título e notas rápidas. As cores são atribuídas automaticamente por plataforma. O usuário pode reordenar cards via drag-and-drop, capturar o quadro inteiro como PNG, enviar a captura por e-mail para `guilherme@grupocsv.com`, e exportar ou importar dados em JSON para backup manual. Plataformas personalizadas podem ser adicionadas com nome e cor.

## Plataformas Pré-cadastradas

| Plataforma | Cor |
|---|---|
| Manus | #6C5CE7 |
| ChatGPT | #10A37F |
| Claude | #D97706 |
| Claude Cowork | #F59E0B |
| Anti-Gravity | #3B82F6 |
| E-mail | #EF4444 |
| Chrome (aba) | #6B7280 |
| WhatsApp | #25D366 |
| Outro | #9CA3AF |

## Deck Vision (Worker)

O Worker `deck-vision` recebe imagens (base64) ou texto via POST, envia para GPT-4o via AI Gateway, e retorna JSON estruturado para criar um card automaticamente no Deck™.

| Campo | Valor |
|---|---|
| Worker | deck-vision |
| Endpoint | `deck-vision.guilherme-thom.workers.dev` |
| Binding | Secret: OPENAI_API_KEY |
| Modelo | GPT-4o (via Cloudflare AI Gateway) |

O worker aceita três modos de entrada: imagem (base64), texto, ou ambos (imagem + contexto textual). A resposta inclui `title`, `platform`, `notes` e `confidence`.

## Envio de E-mail

O Deck™ utiliza o Worker csv-email (`csv-email.guilherme-thom.workers.dev`) para envio de capturas de tela. O fluxo consiste em capturar o quadro como PNG via html2canvas, exibir preview no modal, e disparar o envio. O e-mail chega com assunto "Deck™ — DD/MM/AAAA HH:MM" e a imagem anexada.

## Segurança

A trava por PIN é exclusivamente local (hash SHA-256 no localStorage). Não há backend de autenticação. O objetivo é evitar acesso casual em tela compartilhada. A funcionalidade "Esqueceu o PIN?" envia um PIN temporário por e-mail e exige troca após o uso.
