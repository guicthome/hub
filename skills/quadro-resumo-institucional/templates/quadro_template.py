"""
Quadro Resumo Institucional -- Template de geracao de imagem HD
Skill: quadro-resumo-institucional
Hub: grupocsv/hub

Uso:
  1. Copiar este arquivo para o diretorio de trabalho
  2. Preencher a secao CONFIG com os dados do quadro
  3. Executar: python3 quadro_template.py

Dependencias: Pillow (pre-instalada)
Fontes: Noto Sans (pre-instaladas em /usr/share/fonts/truetype/noto/)
"""

import json
import os
import sys
from PIL import Image, ImageDraw, ImageFont

# ============================================================
# CONFIG -- Preencher com os dados do quadro
# ============================================================

# Caminhos
LOGO_PATH = ""          # Ex: "/home/ubuntu/hub/icds/logo_unimed_govvaladares.png"
OUTPUT_PATH = ""        # Ex: "/home/ubuntu/quadro_output.png"

# Paleta de cores (padrao Unimed -- ajustar conforme entidade)
CORES = {
    "verde_principal": "#00995D",
    "verde_escuro": "#004E4C",
    "verde_claro": "#8BAF1F",
    "laranja": "#F47920",
    "fundo_claro": "#F7FAF5",
    "fundo_header": "#00995D",
    "fundo_subheader": "#004E4C",
    "fundo_row_alt": "#EDF5E8",
    "fundo_row": "#FFFFFF",
    "fundo_total": "#E0F0D8",
    "texto_escuro": "#1A1A1A",
    "texto_branco": "#FFFFFF",
    "texto_cinza": "#555555",
    "linha_cor": "#B0D4A0",
    "destaque_total": "#004E4C",
}

# Cores dos cards do total geral (do mais caro ao mais barato)
CORES_CARDS = ["#00995D", "#2E7D52", "#004E4C"]

# Dados do quadro (preencher ou carregar de JSON)
DADOS = {
    "titulo": "",
    "subtitulo": "",
    "info_linha": "",
    "colunas_header": [],       # Lista de strings para o cabecalho (com \n para quebras)
    "secoes": [],               # Lista de dicts: {"titulo": str, "linhas": [[str, ...]]}
    "total_geral": None,        # Dict: {"labels": [str], "valores": [str]} ou None
    "rodape_nota": "",
    "rodape_assinatura": "",
}

# ============================================================
# LAYOUT -- Ajustar conforme numero de colunas
# ============================================================

WIDTH = 2400
MARGIN_X = 80
COL_WIDTHS = [620, 520, 560, 520]   # Soma deve caber em WIDTH - 2*MARGIN_X
ROW_HEIGHT = 60
HEADER_HEIGHT = 100
SECTION_HEIGHT = 56

# ============================================================
# FONTES
# ============================================================

FONT_DIR = "/usr/share/fonts/truetype/noto"

def load_fonts():
    return {
        "title": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Bold.ttf", 48),
        "subtitle": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Medium.ttf", 28),
        "section": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Bold.ttf", 32),
        "header": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Bold.ttf", 26),
        "cell": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Regular.ttf", 26),
        "cell_bold": ImageFont.truetype(f"{FONT_DIR}/NotoSans-SemiBold.ttf", 26),
        "total_label": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Bold.ttf", 28),
        "total_val": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Bold.ttf", 30),
        "footer": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Regular.ttf", 22),
        "nota": ImageFont.truetype(f"{FONT_DIR}/NotoSans-Regular.ttf", 20),
    }

# ============================================================
# FUNCOES AUXILIARES
# ============================================================

TABLE_LEFT = MARGIN_X + 10

def get_table_width():
    return sum(COL_WIDTHS)

def get_col_x(col_idx):
    x = TABLE_LEFT
    for i in range(col_idx):
        x += COL_WIDTHS[i]
    return x

def calc_height(dados):
    """Calcula a altura total da imagem com base nos dados."""
    header_area = 260
    table_area_per_section = SECTION_HEIGHT + HEADER_HEIGHT + len(dados["secoes"][0]["linhas"]) * ROW_HEIGHT + 20 if dados["secoes"] else 0
    total_tables = sum(
        SECTION_HEIGHT + HEADER_HEIGHT + len(s["linhas"]) * ROW_HEIGHT + 20
        for s in dados["secoes"]
    )
    total_geral_area = (SECTION_HEIGHT + 130 + 40) if dados.get("total_geral") else 0
    footer_area = 80
    return header_area + total_tables + total_geral_area + footer_area + 40

def draw_table_section(draw, img, y, titulo, linhas, colunas_header, fonts, cores):
    """Desenha uma secao completa: titulo + header + linhas de dados."""
    tw = get_table_width()

    # Titulo da secao
    draw.rounded_rectangle(
        [TABLE_LEFT - 10, y, TABLE_LEFT + tw + 10, y + SECTION_HEIGHT],
        radius=8, fill=cores["fundo_subheader"]
    )
    draw.text((TABLE_LEFT + 20, y + 12), titulo, fill=cores["texto_branco"], font=fonts["section"])
    y += SECTION_HEIGHT + 6

    # Header da tabela
    draw.rounded_rectangle(
        [TABLE_LEFT - 2, y, TABLE_LEFT + tw + 2, y + HEADER_HEIGHT],
        radius=6, fill=cores["fundo_header"]
    )
    for ci, ht in enumerate(colunas_header):
        cx = get_col_x(ci)
        lines = ht.split("\n")
        line_h = 24
        total_text_h = len(lines) * line_h
        start_y = y + (HEADER_HEIGHT - total_text_h) // 2
        for li, line in enumerate(lines):
            if ci == 0:
                draw.text((cx + 16, start_y + li * line_h), line, fill=cores["texto_branco"], font=fonts["header"])
            else:
                bbox = draw.textbbox((0, 0), line, font=fonts["header"])
                lw = bbox[2] - bbox[0]
                draw.text((cx + (COL_WIDTHS[ci] - lw) // 2, start_y + li * line_h), line, fill=cores["texto_branco"], font=fonts["header"])
    y += HEADER_HEIGHT

    # Linhas de dados
    for ri, row in enumerate(linhas):
        is_total = (row[0] == "Total")
        if is_total:
            bg = cores["fundo_total"]
        elif ri % 2 == 0:
            bg = cores["fundo_row"]
        else:
            bg = cores["fundo_row_alt"]

        draw.rectangle([TABLE_LEFT - 2, y, TABLE_LEFT + tw + 2, y + ROW_HEIGHT], fill=bg)
        draw.line([TABLE_LEFT - 2, y + ROW_HEIGHT, TABLE_LEFT + tw + 2, y + ROW_HEIGHT], fill=cores["linha_cor"], width=1)

        for ci, cell in enumerate(row):
            cx = get_col_x(ci)
            if is_total:
                f = fonts["cell_bold"] if ci == 0 else fonts["total_label"]
                color = cores["destaque_total"]
            else:
                f = fonts["cell"]
                color = cores["texto_escuro"]

            if ci == 0:
                draw.text((cx + 16, y + (ROW_HEIGHT - 28) // 2), cell, fill=color, font=f)
            else:
                bbox = draw.textbbox((0, 0), cell, font=f)
                cw = bbox[2] - bbox[0]
                draw.text((cx + (COL_WIDTHS[ci] - cw) // 2, y + (ROW_HEIGHT - 28) // 2), cell, fill=color, font=f)
        y += ROW_HEIGHT

    # Borda inferior
    draw.rectangle([TABLE_LEFT - 2, y, TABLE_LEFT + tw + 2, y + 3], fill=cores["verde_principal"])
    y += 20
    return y

def draw_total_geral(draw, y, total_geral, fonts, cores):
    """Desenha a secao de total geral com cards coloridos."""
    tw = get_table_width()

    # Titulo
    draw.rounded_rectangle(
        [TABLE_LEFT - 10, y, TABLE_LEFT + tw + 10, y + SECTION_HEIGHT],
        radius=8, fill=cores["fundo_subheader"]
    )
    draw.text((TABLE_LEFT + 20, y + 12), "Total Geral", fill=cores["texto_branco"], font=fonts["section"])
    y += SECTION_HEIGHT + 6

    # Cards
    labels = total_geral["labels"]
    vals = total_geral["valores"]
    n = len(vals)
    box_w = tw // n - 10
    for i in range(n):
        bx = TABLE_LEFT + i * (box_w + 15)
        box_color = CORES_CARDS[i] if i < len(CORES_CARDS) else cores["verde_principal"]
        draw.rounded_rectangle([bx, y, bx + box_w, y + 110], radius=10, fill=box_color)

        # Label
        lbl_bbox = draw.textbbox((0, 0), labels[i], font=fonts["cell"])
        lbl_w = lbl_bbox[2] - lbl_bbox[0]
        draw.text((bx + (box_w - lbl_w) // 2, y + 14), labels[i], fill=cores["texto_branco"], font=fonts["cell"])

        # Valor
        val_bbox = draw.textbbox((0, 0), vals[i], font=fonts["total_val"])
        val_w = val_bbox[2] - val_bbox[0]
        draw.text((bx + (box_w - val_w) // 2, y + 58), vals[i], fill=cores["texto_branco"], font=fonts["total_val"])

    y += 130
    return y

# ============================================================
# FUNCAO PRINCIPAL
# ============================================================

def gerar_quadro(dados, logo_path, output_path, cores):
    fonts = load_fonts()
    total_height = calc_height(dados)

    img = Image.new("RGB", (WIDTH, total_height), cores["fundo_claro"])
    draw = ImageDraw.Draw(img)

    # Barra superior
    draw.rectangle([0, 0, WIDTH, 8], fill=cores["verde_principal"])

    # Logo
    if logo_path and os.path.exists(logo_path):
        logo = Image.open(logo_path).convert("RGBA")
        logo_h = 90
        logo_w = int(logo.width * logo_h / logo.height)
        logo = logo.resize((logo_w, logo_h), Image.LANCZOS)
        img.paste(logo, (WIDTH - MARGIN_X - logo_w, 30), logo)

    # Titulo e subtitulo
    y = 40
    draw.text((MARGIN_X, y), dados["titulo"], fill=cores["verde_escuro"], font=fonts["title"])
    y += 60
    draw.text((MARGIN_X, y), dados["subtitulo"], fill=cores["texto_cinza"], font=fonts["subtitle"])
    y += 36
    if dados.get("info_linha"):
        draw.text((MARGIN_X, y), dados["info_linha"], fill=cores["texto_cinza"], font=fonts["subtitle"])
        y += 50
    else:
        y += 14

    # Separador
    draw.rectangle([MARGIN_X, y, WIDTH - MARGIN_X, y + 3], fill=cores["verde_principal"])
    y += 20

    # Secoes (tabelas)
    for secao in dados["secoes"]:
        y = draw_table_section(
            draw, img, y,
            secao["titulo"],
            secao["linhas"],
            dados["colunas_header"],
            fonts, cores
        )

    # Total geral
    if dados.get("total_geral"):
        y = draw_total_geral(draw, y, dados["total_geral"], fonts, cores)

    # Rodape
    y += 10
    if dados.get("rodape_nota"):
        draw.text((MARGIN_X, y), dados["rodape_nota"], fill=cores["texto_cinza"], font=fonts["nota"])
        y += 30
    if dados.get("rodape_assinatura"):
        draw.text((MARGIN_X, y), dados["rodape_assinatura"], fill=cores["verde_escuro"], font=fonts["footer"])

    # Barra inferior
    draw.rectangle([0, total_height - 8, WIDTH, total_height], fill=cores["verde_principal"])

    # Salvar
    img.save(output_path, "PNG", dpi=(300, 300))
    print(f"Imagem salva: {output_path}")
    print(f"Dimensoes: {img.size}")

# ============================================================
# EXECUCAO
# ============================================================

if __name__ == "__main__":
    # Se um arquivo JSON for passado como argumento, carregar dados dele
    if len(sys.argv) > 1 and sys.argv[1].endswith(".json"):
        with open(sys.argv[1], "r", encoding="utf-8") as f:
            config = json.load(f)
        DADOS = config.get("dados", DADOS)
        LOGO_PATH = config.get("logo_path", LOGO_PATH)
        OUTPUT_PATH = config.get("output_path", OUTPUT_PATH)

    if not LOGO_PATH or not OUTPUT_PATH or not DADOS.get("titulo"):
        print("Erro: preencher CONFIG no script ou passar arquivo JSON como argumento.")
        print("Uso: python3 quadro_template.py config.json")
        sys.exit(1)

    gerar_quadro(DADOS, LOGO_PATH, OUTPUT_PATH, CORES)
