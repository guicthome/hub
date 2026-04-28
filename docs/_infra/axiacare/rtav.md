# RTAV™ — Referencial Técnico de Avaliação por Valor

<style>
.copy-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 0;
  margin-bottom: 12px;
  border-bottom: 1px solid #e5e7eb;
}
.dark .copy-bar { border-bottom-color: #374151; }
.copy-bar-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: 8px;
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all .2s ease;
  font-family: inherit;
  line-height: 1.2;
}
.copy-bar-btn:hover { background: #e5e7eb; color: #111827; border-color: #9ca3af; }
.copy-bar-btn.copied { background: #d1fae5; color: #065f46; border-color: #6ee7b7; }
.dark .copy-bar-btn { background: #1f2937; color: #d1d5db; border-color: #4b5563; }
.dark .copy-bar-btn:hover { background: #374151; color: #f3f4f6; border-color: #6b7280; }
.dark .copy-bar-btn.copied { background: #064e3b; color: #6ee7b7; border-color: #065f46; }
</style>

<div class="copy-bar">
<button class="copy-bar-btn" id="copy-page-btn">
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar página
</button>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const btn = document.getElementById('copy-page-btn')
  if (!btn) return
  btn.addEventListener('click', () => {
    const content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main')
    if (!content) return

    function htmlToMd(el) {
      let md = ''
      function walk(node) {
        if (node.nodeType === 3) { md += node.textContent; return }
        if (node.nodeType !== 1) return
        const tag = node.tagName.toLowerCase()
        if (node.classList && (node.classList.contains('copy-bar-btn') || node.classList.contains('copy-bar'))) return
        if (['style','script','nav','aside'].includes(tag)) return
        if (tag === 'h1') { md += '\n# '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h2') { md += '\n## '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h3') { md += '\n### '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'h4') { md += '\n#### '; node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n'; return }
        if (tag === 'br') { md += '\n'; return }
        if (tag === 'strong' || tag === 'b') { md += '**'; node.childNodes.forEach(walk); md += '**'; return }
        if (tag === 'em' || tag === 'i') { md += '*'; node.childNodes.forEach(walk); md += '*'; return }
        if (tag === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
          md += '`' + node.textContent + '`'; return
        }
        if (tag === 'pre') { md += '\n```\n' + node.textContent + '\n```\n\n'; return }
        if (tag === 'a') { md += '['; node.childNodes.forEach(walk); md += '](' + (node.href || '') + ')'; return }
        if (tag === 'li') { md += '- '; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'table') {
          const rows = node.querySelectorAll('tr')
          rows.forEach((row, i) => {
            const cells = row.querySelectorAll('th, td')
            md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\n'
            if (i === 0) md += '|' + Array.from(cells).map(() => '---').join('|') + '|\n'
          })
          md += '\n'
          return
        }
        if (tag === 'hr') { md += '\n---\n\n'; return }
        if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return }
        if (tag === 'img') return
        node.childNodes.forEach(walk)
      }
      walk(el)
      return md.replace(/\n{3,}/g, '\n\n').trim()
    }

    const md = htmlToMd(content)
    navigator.clipboard.writeText(md).then(() => {
      btn.classList.add('copied')
      const origHTML = btn.innerHTML
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!'
      setTimeout(() => {
        btn.classList.remove('copied')
        btn.innerHTML = origHTML
      }, 3000)
    }).catch(() => {
      // Fallback para contextos sem clipboard API
      const ta = document.createElement('textarea')
      ta.value = md
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      btn.classList.add('copied')
      const origHTML = btn.innerHTML
      btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Copiado!'
      setTimeout(() => {
        btn.classList.remove('copied')
        btn.innerHTML = origHTML
      }, 3000)
    })
  })
})
</script>


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
