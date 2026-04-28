# RTAV™ — Referencial Técnico de Avaliação por Valor

## Visão Geral

O RTAV™ é um instrumento de triagem e priorização técnica desenvolvido pela AxiaCare para avaliar propostas recebidas por operadoras de saúde suplementar sob a ótica do valor em saúde. Integra conceitos de Health Technology Assessment (HTA), Value-Based Healthcare (VBHC) e análise de viabilidade operacional.

| Campo | Valor |
|---|---|
| Marca | RTAV™ |
| Nome completo | Referencial Técnico de Avaliação por Valor — Saúde Suplementar |
| URL | [rtav.axcare.app](https://rtav.axcare.app) |
| Hospedagem | Manus (webapp React + TypeScript + Tailwind) |
| DNS | CNAME `rtav.axcare.app` → `cname.manus.space` (Cloudflare, zone axcare.app) |
| Persistência | localStorage (client-side) |
| Proprietário | AxiaCare / Grupo CSV |

## Estrutura da Avaliação

A avaliação é composta por três blocos sequenciais, cada um com função específica no processo de triagem.

### Bloco 0 — Enquadramento da Demanda (Peso 2x)

Três campos descritivos obrigatórios (A Proposta, O Problema, Análise de Causa Raiz), seguidos de score 0–3 que avalia se a proposta endereça a causa raiz. Peso dobrado porque uma proposta que não endereça a causa raiz tem valor limitado independentemente de sua qualidade técnica.

### Bloco 1 — Quatro Eixos de Avaliação (Peso 1x cada)

| Eixo | Avalia | Score |
|---|---|---|
| Importância | Centralidade no paciente (PROMs, PREMs, CROMs) | 0–3 |
| Pertinência | O problema existe nesta realidade com tamanho suficiente? | 0–3 |
| Sustentação | Grau de embasamento (evidência + cases em realidade compatível) | 0–3 |
| Eficiência | Custo da proposta versus economia gerada | 0–3 |

### Bloco 2 — Viabilidade (Peso 2x negativo)

Quatro dimensões de barreira: Regulatória (ANS), Jurídica, Contratual e Operacional. Cada barreira identificada subtrai pontos com peso dobrado.

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

O RTAV™ integra três campos complementares: a estrutura de eixos inspirada no HTA Core Model da EUnetHTA, a hierarquia de desfechos (PROMs, PREMs, CROMs) do modelo VBHC de Michael Porter, e elementos do mini-HTA dinamarquês para triagem rápida. O Enquadramento da Demanda com análise de causa raiz é contribuição original do RTAV™.

## Referências Bibliográficas

- Porter ME, Teisberg EO. *Redefining Health Care.* Harvard Business Press, 2006.
- EUnetHTA. *HTA Core Model. Version 3.0.* 2016.
- Kristensen FB, Sigmund H. *Health Technology Assessment Handbook.* Danish Centre for HTA, 2007.
- Drummond MF et al. *Methods for the Economic Evaluation of Health Care Programmes.* 4th ed. Oxford, 2015.
- Ehlers L et al. *Doing mini-health technology assessments in hospitals.* Int J Technol Assess Health Care, 2006.
