# Padrão de Footer | Entregáveis AxiaCare

Este documento define o footer padrão para todos os entregáveis da consultoria AxiaCare exibidos nos hubs de parceiros (Unihealth GV, Unimed GV) e em ferramentas standalone.

---

## Estrutura

O footer é composto por quatro camadas visuais, nesta ordem:

1. **Logo** -- AxiaCare horizontal positiva (full-color sobre fundo claro)
2. **Slogan** -- "Gestão e Consultoria em Saúde"
3. **Links** -- organizados em três linhas hierárquicas
4. **Copyright** -- linha única com ano, empresa e grupo

---

## Conteúdo Exato

### Logo

Arquivo: `/visual-identity/axiacare/logo/png/axiacare_logo_horizontal_full-color_positive.png`

Largura: 140px (desktop), 120px (mobile). Centralizada.

### Slogan

```
Gestão e Consultoria em Saúde
```

Sem prefixo "AxView™" ou qualquer outro. O conceito AxView foi descontinuado.

### Links (3 linhas hierárquicas)

```
Linha 1:  Conheça nossas soluções  |  axcare.com.br
Linha 2:  grupocsv.com  |  medvalor.med.br  |  thera.tech
Linha 3:  guithome.com.br  |  LinkedIn  |  Instagram
```

URLs correspondentes:

| Texto | URL | target |
|-------|-----|--------|
| Conheça nossas soluções | https://linktr.ee/gui.thome | (mesmo tab) |
| axcare.com.br | https://www.axcare.com.br | _blank |
| grupocsv.com | https://grupocsv.com | _blank |
| medvalor.med.br | https://www.medvalor.med.br | _blank |
| thera.tech | https://thera.tech | _blank |
| guithome.com.br | https://guithome.com.br | _blank |
| LinkedIn | https://linkedin.com/in/guithome | _blank |
| Instagram | https://www.instagram.com/gui.thome/ | _blank |

### Copyright

```
Copyright © {ANO} AxiaCare | Todos os direitos reservados | Uma empresa do Grupo CSV
```

Atualizar `{ANO}` para o ano corrente a cada virada.

---

## Estilo Visual

| Propriedade | Valor |
|-------------|-------|
| Background | `#f8f5f0` (light) / `var(--vp-c-bg-soft)` (dark) |
| Border-top | 2px solid (cor do parceiro) |
| Border-radius | 16px |
| Padding | 32px 20px (desktop), 24px 16px (mobile) |
| Font links | 13px, cor `#196396` (light) / `#5da9e0` (dark) |
| Separadores | `|` em `#cbd5e1`, 11px |
| Copyright | 11px, `#94a3b8` |
| Slogan | 14px, font-weight 600, `#2d3445` |

---

## Responsividade Mobile

Em viewports abaixo de 480px:

- Logo reduz para 120px
- Slogan reduz para 13px
- Links reduzem para 12px com gap menor
- Padding interno reduz para 24px 16px

Os links usam `flex-wrap: wrap` para quebrar naturalmente em telas estreitas.

---

## HTML de Referência (VitePress)

```html
<div class="page-foot">
  <img class="foot-logo"
       src="/visual-identity/axiacare/logo/png/axiacare_logo_horizontal_full-color_positive.png"
       alt="AxiaCare">
  <div class="foot-slogan">Gestão e Consultoria em Saúde</div>
  <div class="foot-links">
    <a href="https://linktr.ee/gui.thome">Conheça nossas soluções</a>
    <span class="sep">|</span>
    <a href="https://www.axcare.com.br" target="_blank">axcare.com.br</a>
  </div>
  <div class="foot-links">
    <a href="https://grupocsv.com" target="_blank">grupocsv.com</a>
    <span class="sep">|</span>
    <a href="https://www.medvalor.med.br" target="_blank">medvalor.med.br</a>
    <span class="sep">|</span>
    <a href="https://thera.tech" target="_blank">thera.tech</a>
  </div>
  <div class="foot-links">
    <a href="https://guithome.com.br" target="_blank">guithome.com.br</a>
    <span class="sep">|</span>
    <a href="https://linkedin.com/in/guithome" target="_blank">LinkedIn</a>
    <span class="sep">|</span>
    <a href="https://www.instagram.com/gui.thome/" target="_blank">Instagram</a>
  </div>
  <div class="copyright">Copyright © 2026 AxiaCare | Todos os direitos reservados | Uma empresa do Grupo CSV</div>
</div>
```

---

## Termos Descontinuados

Os seguintes termos **não devem** aparecer em nenhum footer ou entregável:

- "AxView™" (conceito descontinuado)
- "WebApps" (associado ao AxView)
- "GTCorp" (nome anterior do grupo; usar "Grupo CSV")
- Copyright com ano anterior ao corrente

---

## Aplicação

Este footer é obrigatório em:

- Páginas `index.md` dos parceiros (Unihealth GV, Unimed GV)
- Ferramentas HTML standalone entregues aos parceiros
- Qualquer novo entregável da consultoria AxiaCare

Para ferramentas HTML standalone, o footer Grupo CSV (camada externa) e o footer AxiaCare (camada interna) podem coexistir. O footer AxiaCare fica dentro do conteúdo da ferramenta; o footer Grupo CSV fica na camada mais externa do documento.



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
