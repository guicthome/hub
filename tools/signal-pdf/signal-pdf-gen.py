#!/usr/bin/env python3
"""
Signal™ PDF Generator
Resumo Semanal Estratégico | Grupo CSV
Template v1.0
"""

import os
from fpdf import FPDF

# ── PATHS ───────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
FONT_DIR = os.path.join(SCRIPT_DIR, "fonts")
LOGO_PATH = os.path.join(SCRIPT_DIR, "grupo_csv_logo.png")

# ── PALETA CANÔNICA GRUPO CSV ───────────────────────────
CSV_BLUE    = (25, 99, 150)     # #196396
CSV_GREEN   = (45, 191, 127)    # #2DBF7F
CSV_DARK    = (27, 30, 36)      # #1b1e24
CSV_LIGHT   = (244, 246, 248)   # #f4f6f8
DARK_TEXT   = (55, 55, 55)
MID_TEXT    = (100, 110, 120)
LIGHT_LINE  = (210, 218, 226)
CARD_BG     = (249, 250, 252)
WHITE       = (255, 255, 255)
TAG_COLORS  = {
    "NOVA PARCERIA":    (25, 99, 150),    # csv-blue
    "IMUNOBIOLÓGICOS":  (45, 191, 127),   # csv-green
    "LINHAS DE CUIDADO":(25, 99, 150),
    "ANALYTICS":        (45, 191, 127),
    "QUALIDADE CLÍNICA":(25, 99, 150),
    "OPERAÇÕES":        (45, 191, 127),
}

# ── DADOS DA SEMANA 07 ──────────────────────────────────
SEMANA = "07"
PERIODO = "16 a 23 de fevereiro de 2026"
DATA_GERACAO = "24/02/2026"
EXECUTIVO = "Guilherme Thomé, MD, MBA"
CARGO_EXECUTIVO = "Superintendente Médico | Fundador Grupo CSV"

METRICAS = [
    ("8", "Páginas\nNotion"),
    ("50", "Threads\nGmail"),
    ("100+", "Mensagens\nanalisadas"),
    ("35", "Novos termos\nsugeridos"),
    ("8", "Atualizações\nsugeridas"),
]

FATOS = [
    {
        "tag": "NOVA PARCERIA",
        "titulo": "Assessoria Oncológica Atrys",
        "resumo": (
            "Reunião com a Atrys Health (empresa espanhola que adquiriu "
            "AxisMed e ITMS) para avaliação de PoC de assessoria oncológica. "
            "Modelo inclui segunda opinião médica, board de especialistas e "
            "suporte à decisão clínica. Próximo passo: definição de escopo "
            "e critérios do piloto com a Diretoria."
        ),
    },
    {
        "tag": "IMUNOBIOLÓGICOS",
        "titulo": "RPI-E e Monitoramento de Biossimilares",
        "resumo": (
            "Lançamento do RPI-E (Registro Prospectivo de Imunobiológicos "
            "Estratégicos) com automação via Apps Script para notificação de "
            "novos registros. Avanço na troca de Humira por Yuflyma "
            "(biossimilar Celltrion) e estruturação do Monitoramento Ativo "
            "de Próximas Compras."
        ),
    },
    {
        "tag": "LINHAS DE CUIDADO",
        "titulo": "EVA-Domiciliar e Expansão do Cuidado em Casa",
        "resumo": (
            "Estruturação do EVA-D (Experiência e Valor na Atenção "
            "Domiciliar), instrumento PREM para mensurar a experiência do "
            "paciente em atenção domiciliar. Discussão sobre busca ativa de "
            "candidatos e futuro piloto de Monitoramento Ativo Domiciliar "
            "para DM2."
        ),
    },
    {
        "tag": "ANALYTICS",
        "titulo": "PoC HI Healthcare Intelligence para LC Oncologia",
        "resumo": (
            "Avaliação da plataforma HI Healthcare Intelligence para suporte "
            "à Linha de Cuidado de Oncologia. Foco em antineoplásicos orais "
            "e integração com dados assistenciais. Pauta encaminhada à "
            "Diretoria Executiva para deliberação."
        ),
    },
    {
        "tag": "QUALIDADE CLÍNICA",
        "titulo": "Protocolo Controle Glicêmico Hospitalar",
        "resumo": (
            "Apresentação pela Dra. Kelly (endocrinologista) do Protocolo "
            "de Controle Glicêmico do Paciente Internado. Iniciativa "
            "alinhada à governança clínica e à redução de variabilidade no "
            "manejo de hiperglicemia intra-hospitalar."
        ),
    },
    {
        "tag": "OPERAÇÕES",
        "titulo": "Projeto Axys-Teller e Jornada Cirúrgica",
        "resumo": (
            "Avanço no Projeto Axys-Teller (Jornada Cirúrgica) com duas "
            "frentes: contato médico direto pelo Dr. Fabrício Portilho com "
            "cirurgiões selecionados, e estruturação operacional de "
            "agendamento e fluxo. Consignação de materiais OitoPharma/"
            "ImunoBR autorizada pela Diretoria."
        ),
    },
]

OBSERVACOES = [
    "Convenção Técnica Unimed 2026 (ConTec): inscrições confirmadas para 29 e 30/03.",
    "Implantação do SGU (Sistema de Gestão Unimed) em andamento com apoio da TI.",
    "Comitê ESG realizou primeira reunião com pauta de Política de Sustentabilidade.",
    "Plataforma TEAjudo apresentada ao EVS como solução para gestão de beneficiários TEA.",
]


class SignalPDF(FPDF):
    def __init__(self):
        super().__init__()
        self.set_auto_page_break(auto=True, margin=20)

        # Register Inter fonts (Unicode TTF)
        self.add_font("Inter", "", os.path.join(FONT_DIR, "Inter-Regular.ttf"))
        self.add_font("Inter", "B", os.path.join(FONT_DIR, "Inter-Bold.ttf"))
        self.add_font("InterLight", "", os.path.join(FONT_DIR, "Inter-Light.ttf"))
        self.add_font("InterMedium", "", os.path.join(FONT_DIR, "Inter-Medium.ttf"))

    def header(self):
        if self.page_no() == 1:
            self._draw_cover_header()
        else:
            self._draw_inner_header()

    def _draw_cover_header(self):
        w = self.w

        # ── Top accent bar ──
        self.set_fill_color(*CSV_BLUE)
        self.rect(0, 0, w, 3, "F")
        self.set_fill_color(*CSV_GREEN)
        self.rect(w * 0.7, 0, w * 0.3, 3, "F")

        # ── Logo Grupo CSV (left) ──
        logo_w = 46
        self.image(LOGO_PATH, 15, 9, logo_w)

        # ── Signal™ title (right) ──
        self.set_font("Inter", "B", 30)
        self.set_text_color(*CSV_BLUE)
        title_text = "Signal"
        title_w = self.get_string_width(title_text)
        # Position Signal text
        signal_x = w - 15 - title_w - 12
        self.set_xy(signal_x, 10)
        self.cell(title_w, 12, title_text, align="L")
        # ™ superscript
        self.set_font("InterLight", "", 10)
        self.set_xy(signal_x + title_w + 1, 9)
        self.cell(10, 6, "\u2122", align="L")

        # Subtitle
        self.set_font("InterLight", "", 9)
        self.set_text_color(*MID_TEXT)
        self.set_xy(w - 15 - 85, 22)
        self.cell(85, 5, "Resumo Semanal Estratégico", align="R")

        # ── Thin separator ──
        self.set_draw_color(*LIGHT_LINE)
        self.set_line_width(0.3)
        self.line(15, 33, w - 15, 33)

        # ── Info row: badge + periodo (left) | executivo (right) ──
        badge_w = 22
        badge_h = 7
        info_y = 37

        # Semana badge
        self.set_fill_color(*CSV_BLUE)
        self.rect(15, info_y, badge_w, badge_h, "F")
        self.set_font("Inter", "B", 8.5)
        self.set_text_color(*WHITE)
        self.set_xy(15, info_y)
        self.cell(badge_w, badge_h, f"S{SEMANA}", align="C")

        # Período
        self.set_font("Inter", "", 8.5)
        self.set_text_color(*DARK_TEXT)
        self.set_xy(15 + badge_w + 4, info_y)
        self.cell(80, badge_h, PERIODO, align="L")

        # Executivo (right)
        self.set_font("InterMedium", "", 7.5)
        self.set_text_color(*CSV_BLUE)
        self.set_xy(w - 15 - 85, info_y)
        self.cell(85, 3.5, EXECUTIVO, align="R")
        self.set_font("InterLight", "", 6.5)
        self.set_text_color(*MID_TEXT)
        self.set_xy(w - 15 - 85, info_y + 3.5)
        self.cell(85, 3.5, CARGO_EXECUTIVO, align="R")

        self.set_y(49)

    def _draw_inner_header(self):
        w = self.w
        # Thin accent bars
        self.set_fill_color(*CSV_BLUE)
        self.rect(0, 0, w, 2, "F")
        self.set_fill_color(*CSV_GREEN)
        self.rect(w * 0.7, 0, w * 0.3, 2, "F")

        # Signal™ small (left)
        self.set_font("Inter", "B", 8)
        self.set_text_color(*CSV_BLUE)
        self.set_xy(15, 5)
        sw = self.get_string_width("Signal")
        self.cell(sw, 5, "Signal")
        self.set_font("InterLight", "", 5)
        self.cell(8, 5, "\u2122")

        # Semana (right)
        self.set_font("InterLight", "", 7.5)
        self.set_text_color(*MID_TEXT)
        self.set_xy(w - 15 - 70, 5)
        self.cell(70, 5, f"Semana {SEMANA}  |  {PERIODO}", align="R")

        self.set_y(14)

    def footer(self):
        self.set_y(-14)
        w = self.w
        # Separator
        self.set_draw_color(*LIGHT_LINE)
        self.set_line_width(0.2)
        self.line(15, self.get_y(), w - 15, self.get_y())

        # Footer text
        self.set_font("InterLight", "", 6)
        self.set_text_color(*MID_TEXT)
        self.set_y(-11)
        self.cell(0, 4,
                  f"Grupo CSV  |  Signal\u2122  |  Gerado em {DATA_GERACAO}  |  Documento de uso interno",
                  align="L")
        self.cell(0, 4, f"Página {self.page_no()}", align="R")

    # ── SECTION TITLE ──
    def section_title(self, text, y_offset=0):
        y = self.get_y() + y_offset
        # Green accent bar
        self.set_fill_color(*CSV_GREEN)
        self.rect(15, y + 1, 2.5, 5, "F")
        # Title
        self.set_font("Inter", "B", 9.5)
        self.set_text_color(*CSV_DARK)
        self.set_xy(20, y)
        self.cell(0, 7, text)
        self.ln(9)

    # ── METRICS BAR ──
    def draw_metrics_bar(self):
        avail_w = self.w - 30
        col_w = avail_w / len(METRICAS)
        sx = 15
        y = self.get_y()

        # Background
        self.set_fill_color(*CARD_BG)
        self.rect(sx, y, avail_w, 20, "F")

        # Top green accent
        self.set_fill_color(*CSV_GREEN)
        self.rect(sx, y, avail_w, 0.7, "F")

        for i, (valor, label) in enumerate(METRICAS):
            cx = sx + i * col_w
            # Value
            self.set_font("Inter", "B", 17)
            self.set_text_color(*CSV_BLUE)
            self.set_xy(cx, y + 2)
            self.cell(col_w, 7, valor, align="C")
            # Label lines
            lines = label.split("\n")
            self.set_font("InterLight", "", 6)
            self.set_text_color(*MID_TEXT)
            for li, line in enumerate(lines):
                self.set_xy(cx, y + 10 + li * 3.2)
                self.cell(col_w, 3.2, line, align="C")
            # Separator
            if i < len(METRICAS) - 1:
                self.set_draw_color(*LIGHT_LINE)
                self.set_line_width(0.15)
                self.line(cx + col_w, y + 3, cx + col_w, y + 17)

        self.set_y(y + 23)

    # ── FACT CARD ──
    def draw_fact_card(self, fato, x, y, card_w, card_h):
        # Card background
        self.set_fill_color(*WHITE)
        self.rect(x, y, card_w, card_h, "F")

        # Left accent bar
        tag_color = TAG_COLORS.get(fato["tag"], CSV_BLUE)
        self.set_fill_color(*tag_color)
        self.rect(x, y, 1.5, card_h, "F")

        # Border
        self.set_draw_color(*LIGHT_LINE)
        self.set_line_width(0.15)
        self.rect(x, y, card_w, card_h, "D")

        inner_x = x + 5
        inner_w = card_w - 10

        # Tag pill
        tag_text = fato["tag"]
        self.set_font("Inter", "B", 5)
        tag_tw = self.get_string_width(tag_text) + 4
        self.set_fill_color(*tag_color)
        self.rect(inner_x, y + 3, tag_tw, 4, "F")
        self.set_text_color(*WHITE)
        self.set_xy(inner_x + 2, y + 3)
        self.cell(tag_tw - 4, 4, tag_text, align="L")

        # Title
        self.set_font("Inter", "B", 8)
        self.set_text_color(*CSV_DARK)
        self.set_xy(inner_x, y + 9)
        self.multi_cell(inner_w, 4, fato["titulo"])

        # Body text
        body_y = self.get_y() + 0.5
        self.set_font("Inter", "", 6.8)
        self.set_text_color(*DARK_TEXT)
        self.set_xy(inner_x, body_y)
        self.multi_cell(inner_w, 3.3, fato["resumo"])

    # ── FACTS GRID ──
    def draw_facts_grid(self):
        avail_w = self.w - 30
        gap = 4
        card_w = (avail_w - gap) / 2
        card_h = 40
        sx = 15
        y = self.get_y()

        for i in range(0, len(FATOS), 2):
            if y + card_h > self.h - 30:
                self.add_page()
                y = self.get_y()

            for j in range(2):
                if i + j < len(FATOS):
                    cx = sx + j * (card_w + gap)
                    self.draw_fact_card(FATOS[i + j], cx, y, card_w, card_h)

            y += card_h + 3
            self.set_y(y)

    # ── OBSERVATIONS ──
    def draw_observations(self):
        y = self.get_y()
        avail_w = self.w - 30
        item_h = 5.5
        box_h = 6 + len(OBSERVACOES) * item_h

        # Background
        self.set_fill_color(*CARD_BG)
        self.rect(15, y, avail_w, box_h, "F")

        # Left accent
        self.set_fill_color(*CSV_BLUE)
        self.rect(15, y, 1.5, box_h, "F")

        # Items
        self.set_font("Inter", "", 7)
        self.set_text_color(*DARK_TEXT)
        for i, obs in enumerate(OBSERVACOES):
            iy = y + 4 + i * item_h
            # Bullet dot
            self.set_fill_color(*CSV_GREEN)
            self.ellipse(20, iy + 1.2, 1.3, 1.3, "F")
            self.set_xy(23, iy)
            self.cell(avail_w - 12, item_h, obs)

        self.set_y(y + box_h + 4)


# ── BUILD ──────────────────────────────────────────────
def build_signal_pdf(output_path):
    pdf = SignalPDF()
    pdf.add_page()

    # Métricas da Varredura
    pdf.section_title("MÉTRICAS DA VARREDURA")
    pdf.draw_metrics_bar()

    # Fatos Estratégicos da Semana
    pdf.section_title("FATOS ESTRATÉGICOS DA SEMANA", y_offset=2)
    pdf.draw_facts_grid()

    # Demais Movimentações
    pdf.section_title("DEMAIS MOVIMENTAÇÕES", y_offset=2)
    pdf.draw_observations()

    pdf.output(output_path)
    print(f"PDF gerado: {output_path}")


if __name__ == "__main__":
    build_signal_pdf("/home/ubuntu/Signal_S07_2026.pdf")
