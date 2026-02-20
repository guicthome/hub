---
outline: deep
---

# Guia de Uso de Logos e Avatares

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

---

## Erros Comuns a Evitar

1. **Usar avatar como logo em header/footer.** O avatar tem fundo decorativo e moldura circular que não pertencem a contextos institucionais.

2. **Usar logo positive sobre fundo escuro.** O texto ficará invisível. Usar variante negative.

3. **Usar logo negative sobre fundo claro.** O texto ficará invisível. Usar variante positive.

4. **Confundir o arquivo `grupo-csv_logo_horizontal_full-color_positive.png` (500x500) com uma logo quadrada.** Apesar das dimensões, é uma logo horizontal com padding branco. Para web, preferir a versão `_transparent`.

5. **Usar logos de alta resolução (3000px+) sem redimensionamento.** Em contextos web, definir height/width via CSS para evitar carregamento desnecessário.

6. **Misturar variantes de cor entre marcas.** Cada marca tem sua cor primária. AxiaCare = azul, MedValor = laranja, TheraTech = roxo.
