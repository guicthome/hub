# RTAV™ — Referencial Técnico de Avaliação por Valor

## Visão Geral

O RTAV™ é um instrumento de triagem e priorização técnica desenvolvido pela AxiaCare para avaliar propostas recebidas por operadoras de saúde suplementar sob a ótica do valor em saúde. Integra conceitos de Health Technology Assessment (HTA), Value-Based Healthcare (VBHC) e análise de viabilidade operacional.

| Campo | Valor |
|---|---|
| Marca | RTAV™ |
| Nome completo | Referencial Técnico de Avaliação por Valor — Saúde Suplementar |
| Domínio | [rtav.axcare.app](https://rtav.axcare.app) |
| Hospedagem | Manus (webapp React + TypeScript + Tailwind) |
| DNS | CNAME `rtav.axcare.app` → `cname.manus.space` (Cloudflare, zone axcare.app) |
| Persistência | localStorage (client-side) — migração para Supabase planejada |
| Proprietário | AxiaCare / Grupo CSV |

## Estrutura da Avaliação

A avaliação é composta por três blocos sequenciais:

### Bloco 0 — Enquadramento da Demanda (Peso 2x)

Três campos descritivos obrigatórios: A Proposta, O Problema, Análise de Causa Raiz. Seguidos de score 0–3 que avalia se a proposta endereça a causa raiz.

### Bloco 1 — Quatro Eixos de Avaliação (Peso 1x cada)

- **Eixo 1 — Importância:** Centralidade no paciente (PROMs, PREMs, CROMs). Score 0–3.
- **Eixo 2 — Pertinência:** O problema existe nesta realidade com tamanho suficiente? Score 0–3.
- **Eixo 3 — Sustentação:** Grau de embasamento (evidência + cases em realidade compatível). Score 0–3.
- **Eixo 4 — Eficiência:** Custo da proposta versus economia gerada. Score 0–3.

### Bloco 2 — Viabilidade (Peso 2x negativo)

Quatro dimensões de barreira: Regulatória (ANS), Jurídica, Contratual, Operacional. Cada barreira identificada subtrai pontos com peso dobrado.

## Fórmula do Score

```
Bruto = (Enquadramento x 2) + E1 + E2 + E3 + E4 + (Barreiras x -1 x 2)
Score = ((Bruto + 8) / 26) x 100
```

| Faixa | Score | Parecer |
|---|---|---|
| Verde | 75–100 | Recomendada |
| Azul | 50–74 | Recomendada com ressalvas |
| Âmbar | 25–49 | Não prioritária |
| Vermelho | 0–24 | Não recomendada |

## Fundamentação

- Porter ME, Teisberg EO. *Redefining Health Care.* Harvard Business Press, 2006.
- EUnetHTA. *HTA Core Model. Version 3.0.* 2016.
- Kristensen FB, Sigmund H. *Health Technology Assessment Handbook.* Danish Centre for HTA, 2007.
- Drummond MF et al. *Methods for the Economic Evaluation of Health Care Programmes.* 4th ed. Oxford, 2015.
- Ehlers L et al. *Doing mini-health technology assessments in hospitals.* Int J Technol Assess Health Care, 2006.

## Integração no Hub

- **Hub principal** (`docs/index.md`): Botão no grupo "Corporativo" apontando para `https://rtav.axcare.app`
- **Portal AxiaCare** (`docs/axia/index.md`): Card na seção "Ferramentas"
- **Sidebar _infra** (`config.mts`): Link em AxiaCare → RTAV™



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
