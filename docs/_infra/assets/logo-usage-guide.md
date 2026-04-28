---
outline: deep
---

# Guia de Uso de Logos e Avatares

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

Este documento define as regras de aplicação de cada tipo de imagem da identidade visual do Grupo CSV e suas empresas. Deve ser consultado por agentes de IA e colaboradores antes de inserir qualquer logo ou avatar em materiais, páginas ou documentos.

---

## Conceitos Fundamentais

### Avatar

Imagem quadrada (proporção 1:1) com fundo decorativo (gradiente, glow ou cor sólida), projetada para caber em molduras circulares de redes sociais. O logo da marca aparece dentro de um círculo branco centralizado sobre o fundo colorido. Existem duas versões por marca:

| Versão | Resolução | Uso principal |
|--------|-----------|---------------|
| v1 | 2048 x 2048 | Perfil em redes sociais (Instagram, LinkedIn, YouTube) |
| v2 | 480 x 480 | Versão compacta para redes sociais, favicon |

**Avatar NUNCA substitui logo.** Avatares não devem ser usados em headers, footers, navbars, documentos, apresentações ou qualquer contexto institucional fora de redes sociais.

### Logo

Marca isolada sobre fundo branco (positive) ou escuro (negative), sem decoração. Para uso institucional em sites, documentos, headers, footers, apresentações e materiais impressos. Cada marca possui variantes organizadas por três eixos:

| Eixo | Opções | Descrição |
|------|--------|-----------|
| Orientação | horizontal, vertical | Horizontal (paisagem, ratio ~2.4-3.0) para barras e linhas. Vertical (quase quadrado, ratio ~1.27) para cards e blocos. |
| Cor | full-color, monochrome, ou cor específica | Full-color é a versão principal. Monochrome para contextos neutros. Cor específica (blue, orange, purple) para variantes de marca. |
| Polaridade | positive, negative | Positive para fundo claro. Negative para fundo escuro. |

Formatos disponíveis: PNG (raster) e SVG (vetor). Preferir SVG para web quando disponível; PNG para documentos e contextos que não suportam SVG.

---

## Regras de Aplicação por Contexto

### Contextos Web (Hub, sites, landing pages)

| Contexto | Tipo de logo | Arquivo de referência (Grupo CSV) |
|----------|-------------|-----------------------------------|
| Navbar | Horizontal, positive, transparent | `grupo-csv_logo_horizontal_full-color_positive_transparent.png` |
| Footer (inline, altura pequena) | Horizontal, positive | `{marca}_logo_horizontal_{cor}_positive.png` |
| Hero de página de empresa | Vertical, positive | `{marca}_logo_vertical_{cor}_positive.png` |
| Favicon | Avatar v2 | `{marca}_avatar_v2.png` |
| Dark mode | Horizontal ou vertical, negative | `{marca}_logo_{orientação}_{cor}_negative.png` |

### Contextos Documentais (PDF, Word, apresentações)

| Contexto | Tipo de logo |
|----------|-------------|
| Cabeçalho de documento | Horizontal, positive |
| Capa de documento | Vertical, positive |
| Rodapé de documento | Horizontal, positive (tamanho reduzido) |
| Fundo escuro em slide | Horizontal ou vertical, negative |

### Contextos de Redes Sociais

| Contexto | Tipo de imagem |
|----------|---------------|
| Foto de perfil | Avatar v1 (alta resolução) |
| Ícone em listagens | Avatar v2 (compacto) |

### Compliance (HTMLs standalone)

| Contexto | Tipo de logo | Observação |
|----------|-------------|------------|
| Header da página | Horizontal, positive, transparent | Logo do Grupo CSV |
| Footer da página | Horizontal, positive, transparent | Logo do Grupo CSV (tamanho menor) |
| Favicon (link rel="icon") | Avatar v2 | Único contexto onde avatar é aceitável em compliance |

---

## Inventário por Marca

### Grupo CSV

O Grupo CSV possui um caso especial: o arquivo `grupo-csv_logo_horizontal_full-color_positive.png` tem dimensões 500x500 (quadrado com fundo branco), apesar do nome "horizontal". Para uso web onde transparência é necessária, usar a versão `_transparent`.

| Arquivo | Dimensões | Transparência | Uso recomendado |
|---------|-----------|---------------|-----------------|
| `avatar/grupo-csv_avatar_v1.png` | 2048x2048 | Não | Redes sociais |
| `avatar/grupo-csv_avatar_v2.png` | 480x480 | Não | Redes sociais, favicon |
| `logo/png/grupo-csv_logo_horizontal_full-color_positive.png` | 500x500 | Não | Documentos (fundo branco) |
| `logo/png/grupo-csv_logo_horizontal_full-color_positive_transparent.png` | 1310x539 | Sim | Navbar, headers web, footers web |
| `logo/png/grupo-csv_logo_horizontal_full-color_negative_transparent.png` | 1291x522 | Sim | Headers/footers sobre fundo escuro |
| `logo/png/grupo-csv_logo_vertical_full-color_positive.png` | 500x500 | Não | Cards, blocos, capas |

### AxiaCare

Cor primária: azul (#196396). Símbolo: estrela estilizada com gradiente azul-verde.

| Tipo | Arquivo principal (positive) | Dimensões |
|------|------------------------------|-----------|
| Horizontal full-color | `axiacare_logo_horizontal_full-color_positive.png` | 3299x1357 |
| Vertical full-color | `axiacare_logo_vertical_full-color_positive.png` | 2554x2016 |
| Horizontal monochrome | `axiacare_logo_horizontal_monochrome_positive.png` | 3299x1357 |
| Vertical monochrome | `axiacare_logo_vertical_monochrome_positive.png` | 2554x2015 |

### MedValor

Cor primária: laranja (#ea580c / #c2410c). Variante secundária: azul.

| Tipo | Arquivo principal (positive) | Dimensões |
|------|------------------------------|-----------|
| Horizontal orange | `medvalor_logo_horizontal_orange_positive.png` | 4098x1357 |
| Horizontal blue | `medvalor_logo_horizontal_blue_positive.png` | 4098x1357 |
| Vertical orange | `medvalor_logo_vertical_orange_positive.png` | 2738x1413 |
| Vertical blue | `medvalor_logo_vertical_blue_positive.png` | 2738x1413 |

### TheraTech

Cor primária: roxo. Variante secundária: azul.

| Tipo | Arquivo principal (positive) | Dimensões |
|------|------------------------------|-----------|
| Horizontal purple | `thera_logo_horizontal_purple_positive.png` | 3299x1357 |
| Horizontal blue | `thera_logo_horizontal_blue_positive.png` | 3299x1357 |
| Vertical purple | `thera_logo_vertical_purple_positive.png` | 2554x2016 |
| Vertical blue | `thera_logo_vertical_blue_positive.png` | 2554x2015 |

### Guilherme Thomé

| Tipo | Arquivo | Dimensões | Uso |
|------|---------|-----------|-----|
| Avatar (atual) | `guilherme-thome_avatar_current.png` | 2048x2048 | Seção Fundador, redes sociais |
| Avatar low-res | `guilherme-thome_avatar_current_low-res.png` | 1024x1024 | Web otimizado |
| Avatar com nome | `guilherme-thome_avatar_with-name.png` | 4096x4096 | Materiais específicos |
| Logo horizontal | `guilherme-thome_logo_horizontal_full-color_positive.png` | 3299x1357 | Documentos, assinaturas |
| Logo vertical | `guilherme-thome_logo_vertical_full-color_positive.png` | 2554x2016 | Cards, blocos |
| Rubrica | `guilherme-thome_rubrica.png` | 3130x1313 | Documentos formais |
| Assinatura completa | `guilherme-thome_signature_full.png` | 3319x1043 | Documentos formais |

### ICDS (Parceiro)

Cor primaria: azul marinho (#1B3A5C). Cor secundaria: azul medio (#2C5F8A). Entidade Filantropica e Gestora Assistencial.

| Tipo | Arquivo | Dimensoes | Uso |
|------|---------|-----------|-----|
| Horizontal fundo azul | `icds_horizontal_fundo_azul.png` | 404x156 | Navbar, hero, cards (fundo claro ou escuro) |
| Horizontal positivo | `icds_horizontal_sem_fundo_positivo.png` | 500x178 | Documentos, footers, fundo claro |
| Horizontal negativo | `icds_horizontal_sem_fundo_negativo.png` | 600x214 | Fundo escuro, dark mode |

---

## Erros Comuns a Evitar

1. **Usar avatar como logo em header/footer.** O avatar tem fundo decorativo e moldura circular que não pertencem a contextos institucionais.

2. **Usar logo positive sobre fundo escuro.** O texto ficará invisível. Usar variante negative.

3. **Usar logo negative sobre fundo claro.** O texto ficará invisível. Usar variante positive.

4. **Confundir o arquivo `grupo-csv_logo_horizontal_full-color_positive.png` (500x500) com uma logo quadrada.** Apesar das dimensões, é uma logo horizontal com padding branco. Para web, preferir a versão `_transparent`.

5. **Usar logos de alta resolução (3000px+) sem redimensionamento.** Em contextos web, definir height/width via CSS para evitar carregamento desnecessário.

6. **Misturar variantes de cor entre marcas.** Cada marca tem sua cor primária. AxiaCare = azul, MedValor = laranja, TheraTech = roxo.
