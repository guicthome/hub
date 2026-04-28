# Central de Assets e Identidade Visual

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

Repositório oficial de marcas, logotipos, wallpapers e elementos visuais do ecossistema Grupo CSV.

> **Atualizado:** 24/01/2026 - Todos os ZIPs extraídos e organizados

---

## Logos Extraídos (Acesso Direto)

Os logos foram extraídos dos pacotes ZIP e estão disponíveis em:
```
_backup_vitepress/uploads_usuario/upload_001/logos_extraidos/
```

### Grupo CSV
| Arquivo | Descrição |
| :--- | :--- |
| `csv_horizontal_positivo.png` | Logo horizontal, fundo branco |
| `csv_horizontal_positivo_sem_fundo.png` | Logo horizontal, transparente |
| `csv_horizontal_negativo_sem_fundo.png` | Logo horizontal negativo |
| `csv_vertical_positivo.png` | Logo vertical |

**Path:** `logos_extraidos/grupo_csv/Logotipo Grupo CSV/`

### AxiaCare®
| Variação | PNG | SVG | JPG | WebP | AI | PDF |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ | ✓ | ✓ | - | - |
| Horizontal Mono Positivo | ✓ | ✓ | ✓ | ✓ | - | - |
| Horizontal Mono Negativo | ✓ | ✓ | ✓ | ✓ | - | - |
| Vertical Positivo | ✓ | ✓ | ✓ | ✓ | - | - |
| Vertical Negativo | ✓ | ✓ | ✓ | ✓ | - | - |
| Vertical Mono Positivo | ✓ | ✓ | ✓ | ✓ | - | - |
| Vertical Mono Negativo | ✓ | ✓ | ✓ | ✓ | - | - |

**Path:** `logos_extraidos/axiacare/Logotipo AxiaCare/`

### MedValor®
| Variação | Laranja | Azul (Grupo) |
| :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ |
| Vertical Positivo | ✓ | ✓ |
| Vertical Negativo | ✓ | ✓ |
| Mono Positivo | ✓ | ✓ |
| Mono Negativo | ✓ | ✓ |

**Path:** `logos_extraidos/medvalor/Logotipo MedValor/`

### Thera®
| Variação | Roxo | Azul (Grupo) |
| :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ |
| Vertical Positivo | ✓ | ✓ |
| Vertical Negativo | ✓ | ✓ |
| Mono Positivo | ✓ | ✓ |
| Mono Negativo | ✓ | ✓ |

**Path:** `logos_extraidos/thera/Logotipo Thera/`

### Guilherme Thomé
| Variação | PNG | SVG | JPG | WebP |
| :--- | :--- | :--- | :--- | :--- |
| Horizontal Positivo | ✓ | ✓ | ✓ | ✓ |
| Horizontal Negativo | ✓ | ✓ | ✓ | ✓ |
| Vertical Positivo | ✓ | ✓ | ✓ | ✓ |
| Vertical Negativo | ✓ | ✓ | ✓ | ✓ |
| Mono Positivo | ✓ | ✓ | ✓ | ✓ |
| Mono Negativo | ✓ | ✓ | ✓ | ✓ |

**Path:** `logos_extraidos/guilherme_thome/Logotipo Guilherme Thomé/`

---

## Wallpapers Oficiais

| Arquivo | Resolução | Uso |
| :--- | :--- | :--- |
| `csv_ecosystem_wallpaper_final3.png` | Alta | Hero, capas |
| `csv_wallpaper_dark.png` | Alta | Dark mode |
| `csv_wallpaper_light.png` | Alta | Light mode |
| `videocall_4k.png` | 4K | Reuniões virtuais |

**Path:** `_backup_vitepress/public/wallpapers/`

---

## Criativos e Marketing

| Arquivo | Uso |
| :--- | :--- |
| `linkedin_cover.png` | Banner LinkedIn |
| `linkedin_cover_v2.png` | Banner LinkedIn v2 |
| `triangulo_csv.png` | Elemento gráfico |
| `Powered Thera.png` | Selo |
| `Solução Axia.png` | Selo |
| `Workspace Axia.png` | Imagem |
| `assinatura_email_final_600px.png` | Email |
| Cartões de visita Thera (PDF) | Impressão |
| Timbrado Thera (PDF) | Documentos |
| Investigando Galileu Saúde (PDF) | Case study |

**Path:** `logos_extraidos/criativos/criativos/`

---

## Pacotes ZIP (Originais)

Para backup ou download completo:

| Marca | Arquivo | Tamanho |
| :--- | :--- | :--- |
| Grupo CSV | `Logotipo Grupo CSV.zip` | 286 KB |
| AxiaCare | `Logotipo AxiaCare.zip` | 10.1 MB |
| MedValor | `Logotipo MedValor.zip` | 13.7 MB |
| Thera | `Logotipo Thera.zip` | 12.7 MB |
| Guilherme Thomé | `Logotipo Guilherme Thomé.zip` | 14.5 MB |
| Criativos | `criativos.zip` | 10.5 MB |

**Path:** `_backup_vitepress/uploads_usuario/upload_001/`

---

## Estrutura de Formatos

| Formato | Extensão | Uso |
| :--- | :--- | :--- |
| Adobe Illustrator | `.ai` | Edição vetorial |
| PDF | `.pdf` | Impressão |
| SVG | `.svg` | Web (escalável) |
| PNG | `.png` | Web (transparente) |
| JPG | `.jpg` | Impressão |
| WebP | `.webp` | Web otimizado |

---

## Links Oficiais

| Empresa | Website | Segmento |
| :--- | :--- | :--- |
| **Grupo CSV** | [grupocsv.com](https://grupocsv.com) | Corporativo |
| **Guilherme Thomé** | [guithome.com.br](https://guithome.com.br) | Marca Pessoal |
| **AxiaCare** | [axcare.com.br](https://axcare.com.br) | Gestão em Saúde |
| **Thera** | [thera.tech](https://thera.tech) | Tecnologia |
| **MedValor** | [medvalor.med.br](https://medvalor.med.br) | Educação |

**Contato:** [contato@grupocsv.com](mailto:contato@grupocsv.com)

---

## Dados Estruturados (Para IA)

```json
{
  "updated": "2026-01-24",
  "status": "extracted",
  "assets": {
    "logos_extracted": {
      "base_path": "_backup_vitepress/uploads_usuario/upload_001/logos_extraidos/",
      "brands": {
        "grupo_csv": {
          "path": "grupo_csv/Logotipo Grupo CSV/",
          "files": ["csv_horizontal_positivo.png", "csv_horizontal_positivo_sem_fundo.png", "csv_horizontal_negativo_sem_fundo.png", "csv_vertical_positivo.png"]
        },
        "axiacare": {
          "path": "axiacare/Logotipo AxiaCare/",
          "formats": ["PNG (imagem sem fundo)", "JPG (imagem)", "SVG (vetor)", "WebP (imagem sem fundo)", "Adobe Illustrator (Vetor)", "PDF (vetor)"]
        },
        "medvalor": {
          "path": "medvalor/Logotipo MedValor/",
          "color_versions": ["Laranja", "Azul"]
        },
        "thera": {
          "path": "thera/Logotipo Thera/",
          "color_versions": ["Roxo", "Azul"]
        },
        "guilherme_thome": {
          "path": "guilherme_thome/Logotipo Guilherme Thomé/"
        }
      }
    },
    "wallpapers": {
      "path": "_backup_vitepress/public/wallpapers/",
      "files": ["csv_ecosystem_wallpaper_final3.png", "csv_wallpaper_dark.png", "csv_wallpaper_light.png", "videocall_4k.png"]
    },
    "criativos": {
      "path": "logos_extraidos/criativos/criativos/"
    },
    "zips_original": {
      "path": "_backup_vitepress/uploads_usuario/upload_001/"
    }
  }
}
```
