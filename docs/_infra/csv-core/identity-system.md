# Sistema de Identidade Visual: Grupo CSV

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


Este documento define os parâmetros visuais canônicos do ecossistema Grupo CSV. Destinado a **humanos e agentes de IA**.

---

## 1. Marcas do Ecossistema

O ecossistema possui **5 marcas** organizadas em dois níveis:

### Nível Corporativo
| Marca | Tipo | Cores | Uso Principal |
| :--- | :--- | :--- | :--- |
| **Grupo CSV** | Holding | Azul + Verde | Comunicação institucional, documentos legais |
| **Guilherme Thomé** | Marca Pessoal | Azul + Verde | Comunicação B2C, redes sociais, conteúdo online |

### Nível Operacional (Empresas)
| Marca | Segmento | Cor Individual | Cor Grupo |
| :--- | :--- | :--- | :--- |
| **AxiaCare®** | Gestão em Saúde | Azul + Verde | Azul + Verde |
| **MedValor®** | Educação | **Laranja** + Verde | Azul + Verde |
| **Thera®** | Tecnologia | **Roxo** + Verde | Azul + Verde |

---

## 2. Paleta de Cores Canônica

### Cores Primárias (Compartilhadas)
| Token | Hex | RGB | Uso |
| :--- | :--- | :--- | :--- |
| `csv-blue` | `#196396` | `rgb(25,99,150)` | Cor primária corporativa |
| `csv-green` | `#2DBF7F` | `rgb(45,191,127)` | Acento compartilhado |
| `csv-dark` | `#1b1e24` | `rgb(27,30,36)` | Textos, fundos escuros |
| `csv-light` | `#f4f6f8` | `rgb(244,246,248)` | Fundos claros |

### Cores Individuais
| Marca | Token | Hex | RGB |
| :--- | :--- | :--- | :--- |
| **MedValor** | `med-orange` | `#c2410c` | `rgb(194,65,12)` |
| **MedValor** | `med-cream` | `#fff7ed` | `rgb(255,247,237)` |
| **Thera** | `thera-purple` | `#6B5B95` | `rgb(107,91,149)` |
| **Thera** | `thera-dark` | `#0D264C` | `rgb(13,38,76)` |

---

## 3. Tipografia

| Função | Fonte | Pesos | Uso |
| :--- | :--- | :--- | :--- |
| **Primária** | `Inter` | 400, 500, 600, 700, 800 | Interface, textos, títulos |
| **Código** | `JetBrains Mono` | 400, 500 | Blocos de código, dados |

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 4. Sistema de Logos (EXTRAÍDO)

### Localização dos Arquivos
```
_backup_vitepress/uploads_usuario/upload_001/logos_extraidos/
├── grupo_csv/
│   └── Logotipo Grupo CSV/
│       ├── csv_horizontal_positivo.png
│       ├── csv_horizontal_positivo_sem_fundo.png
│       ├── csv_horizontal_negativo_sem_fundo.png
│       └── csv_vertical_positivo.png
├── axiacare/
│   └── Logotipo AxiaCare/
│       ├── Adobe Illustrator (Vetor)/
│       ├── JPG (imagem)/
│       ├── PDF (vetor)/
│       ├── PNG (imagem sem fundo)/
│       ├── SVG (vetor)/
│       └── WebP (imagem sem fundo)/
├── medvalor/
│   └── Logotipo MedValor/
│       └── [mesma estrutura - com versões Azul e Laranja]
├── thera/
│   └── Logotipo Thera/
│       └── [mesma estrutura - com versões Azul e Roxo]
├── guilherme_thome/
│   └── Logotipo Guilherme Thomé/
│       └── [mesma estrutura]
└── criativos/
    └── criativos/
        └── [materiais de marketing]
```

### Variações Disponíveis por Marca

#### Grupo CSV
| Arquivo | Descrição |
| :--- | :--- |
| `csv_horizontal_positivo.png` | Horizontal, fundo branco |
| `csv_horizontal_positivo_sem_fundo.png` | Horizontal, transparente |
| `csv_horizontal_negativo_sem_fundo.png` | Horizontal, versão clara |
| `csv_vertical_positivo.png` | Vertical, fundo branco |

#### AxiaCare® (8 variações × 6 formatos)
| Variação | Formatos |
| :--- | :--- |
| Logotipo Horizontal Positivo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Horizontal Negativo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Horizontal Monocromático Positivo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Horizontal Monocromático Negativo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Vertical Positivo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Vertical Negativo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Vertical Monocromático Positivo | AI, PDF, SVG, PNG, JPG, WebP |
| Logotipo Vertical Monocromático Negativo | AI, PDF, SVG, PNG, JPG, WebP |

#### MedValor® (12 variações × 6 formatos)
| Variação | Cor Laranja | Cor Azul |
| :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ |
| Vertical Positivo | ✓ | ✓ |
| Vertical Negativo | ✓ | ✓ |
| Monocromático Positivo | ✓ | ✓ |
| Monocromático Negativo | ✓ | ✓ |

#### Thera® (12 variações × 6 formatos)
| Variação | Cor Roxo | Cor Azul |
| :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ |
| Vertical Positivo | ✓ | ✓ |
| Vertical Negativo | ✓ | ✓ |
| Monocromático Positivo | ✓ | ✓ |
| Monocromático Negativo | ✓ | ✓ |

#### Guilherme Thomé (8 variações × 6 formatos)
| Variação | Formatos |
| :--- | :--- |
| Horizontal Positivo/Negativo | AI, PDF, SVG, PNG, JPG, WebP |
| Vertical Positivo/Negativo | AI, PDF, SVG, PNG, JPG, WebP |
| Monocromático Positivo/Negativo | AI, PDF, SVG, PNG, JPG, WebP |

### Formatos Disponíveis
| Formato | Extensão | Uso Recomendado |
| :--- | :--- | :--- |
| Adobe Illustrator | `.ai` | Edição vetorial profissional |
| PDF | `.pdf` | Impressão, documentos |
| SVG | `.svg` | Web, aplicações, escalável |
| PNG | `.png` | Web, apresentações (transparente) |
| JPG | `.jpg` | Impressão, fundos sólidos |
| WebP | `.webp` | Web otimizado |

---

## 5. Regras de Uso

### Quando usar cada versão
| Contexto | Versão | Orientação |
| :--- | :--- | :--- |
| Materiais corporativos | Cor Grupo (Azul) | Horizontal |
| Site/app específico | Cor Individual | Qualquer |
| Fundo claro (#fff) | Positivo | Qualquer |
| Fundo escuro | Negativo | Qualquer |
| Espaço reduzido | Monocromático | Vertical |
| Assinatura email | - | Horizontal |

### Proibições Estritas
- **NUNCA** distorcer proporções
- **NUNCA** aplicar sombras/efeitos 3D
- **NUNCA** usar cores fora da paleta
- **NUNCA** misturar versões de cor
- **NUNCA** usar positivo em fundo escuro

---

## 6. Wallpapers Oficiais

| Arquivo | Uso |
| :--- | :--- |
| `csv_ecosystem_wallpaper_final3.png` | Hero, capas |
| `csv_wallpaper_dark.png` | Dark mode |
| `csv_wallpaper_light.png` | Light mode |
| `videocall_4k.png` | Reuniões virtuais |

**Path:** `_backup_vitepress/public/wallpapers/`

---

## 7. Criativos e Marketing

| Arquivo | Uso |
| :--- | :--- |
| `linkedin_cover.png` / `linkedin_cover_v2.png` | Banner LinkedIn |
| `triangulo_csv.png` | Elemento gráfico |
| `Powered Thera.png` | Selo Thera |
| `Solução Axia.png` | Selo AxiaCare |
| `Workspace Axia.png` | Imagem workspace |
| `assinatura_email_final_600px.png` | Email |
| Cartões Thera (PDF) | Impressão |
| Timbrado Thera (PDF) | Documentos |

**Path:** `_backup_vitepress/uploads_usuario/upload_001/logos_extraidos/criativos/`

---

## 8. Dados Estruturados (Para IA)

```json
{
  "ecosystem": "Grupo CSV",
  "domain": "hub.grupocsv.com",
  "updated": "2026-01-24",
  "brands": [
    {
      "name": "Grupo CSV",
      "type": "corporate",
      "colors": {"primary": "#196396", "accent": "#2DBF7F"},
      "logos_path": "logos_extraidos/grupo_csv/Logotipo Grupo CSV/"
    },
    {
      "name": "Guilherme Thomé",
      "type": "personal",
      "colors": {"primary": "#196396", "accent": "#2DBF7F"},
      "logos_path": "logos_extraidos/guilherme_thome/Logotipo Guilherme Thomé/"
    },
    {
      "name": "AxiaCare",
      "type": "business",
      "segment": "healthcare-management",
      "colors": {"primary": "#196396", "accent": "#2DBF7F"},
      "logos_path": "logos_extraidos/axiacare/Logotipo AxiaCare/",
      "formats": ["ai", "pdf", "svg", "png", "jpg", "webp"]
    },
    {
      "name": "MedValor",
      "type": "business",
      "segment": "education",
      "colors": {"individual": "#c2410c", "group": "#196396", "accent": "#2DBF7F"},
      "logos_path": "logos_extraidos/medvalor/Logotipo MedValor/",
      "color_versions": ["Laranja", "Azul"]
    },
    {
      "name": "Thera",
      "type": "business",
      "segment": "technology",
      "colors": {"individual": "#6B5B95", "group": "#196396", "accent": "#2DBF7F"},
      "logos_path": "logos_extraidos/thera/Logotipo Thera/",
      "color_versions": ["Roxo", "Azul"]
    }
  ],
  "assets": {
    "wallpapers": "_backup_vitepress/public/wallpapers/",
    "criativos": "_backup_vitepress/uploads_usuario/upload_001/logos_extraidos/criativos/",
    "logos_zip": "_backup_vitepress/uploads_usuario/upload_001/"
  }
}
```

---

**Última atualização:** 24/01/2026
**Versão:** 2.0 (pós-extração completa de ZIPs)
