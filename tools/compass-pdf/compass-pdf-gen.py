#!/usr/bin/env python3
"""
Compass PDF Generator with Letterhead
Generates a branded PDF from a Compass edition markdown file.
Usage: python3 compass-pdf-gen.py <edition_md_path> <output_pdf_path>
"""
import sys
import re
import os
from fpdf import FPDF

# Paths
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_ROOT = os.path.abspath(os.path.join(SCRIPT_DIR, "..", ".."))
PUBLIC_DIR = os.path.join(REPO_ROOT, "docs", "public")
COMPASS_HEADER = os.path.join(PUBLIC_DIR, "compass_header.png")
GRUPO_CSV_LOGO = os.path.join(PUBLIC_DIR, "visual-identity/grupo-csv/logo/png/grupo-csv_logo_horizontal_full-color_positive_transparent.png")
FONT_DIR = os.path.join(SCRIPT_DIR, "_fonts")


class CompassPDF(FPDF):
    def __init__(self, edition="", date="", title_text=""):
        super().__init__()
        self.edition = edition
        self.date = date
        self.title_text = title_text
        self.set_auto_page_break(auto=True, margin=25)
        # Add Unicode font
        self.add_font("DejaVu", "", os.path.join(FONT_DIR, "DejaVuSans.ttf"))
        self.add_font("DejaVu", "B", os.path.join(FONT_DIR, "DejaVuSans-Bold.ttf"))
        self.add_font("DejaVu", "I", os.path.join(FONT_DIR, "DejaVuSans-Oblique.ttf"))

    def header(self):
        if self.page_no() == 1:
            return  # Title page has custom header
        # Top accent bar
        self.set_fill_color(25, 99, 150)
        self.rect(0, 0, 210, 2.5, "F")
        # Green accent
        self.set_fill_color(45, 191, 127)
        self.rect(140, 0, 70, 2.5, "F")
        # Compass header image
        if os.path.exists(COMPASS_HEADER):
            self.image(COMPASS_HEADER, x=15, y=6, w=55)
        # Edition info right-aligned
        self.set_font("DejaVu", "B", 7.5)
        self.set_text_color(120, 120, 120)
        self.set_xy(130, 8)
        self.cell(65, 4, f"Edi\u00e7\u00e3o {self.edition}", align="R")
        self.set_xy(130, 13)
        self.set_font("DejaVu", "", 7.5)
        self.cell(65, 4, self.date, align="R")
        # Separator
        self.set_draw_color(210, 210, 210)
        self.line(15, 22, 195, 22)
        self.set_y(26)

    def footer(self):
        if self.page_no() == 1:
            return  # Title page has custom footer
        self.set_y(-18)
        self.set_draw_color(210, 210, 210)
        self.line(15, self.get_y(), 195, self.get_y())
        self.ln(2.5)
        self.set_font("DejaVu", "", 6.5)
        self.set_text_color(150, 150, 150)
        self.cell(90, 4, "Compass\u2122 \u2014 Grupo CSV \u00b7 Cuidados em Sa\u00fade com Valor", align="L")
        self.cell(90, 4, f"P\u00e1gina {self.page_no() - 1}", align="R")
        self.ln(4)
        self.set_font("DejaVu", "I", 5.5)
        self.cell(0, 3, "Documento t\u00e9cnico-estrat\u00e9gico. Quando o tema envolver aspectos jur\u00eddicos, regulat\u00f3rios ou contratuais, recomenda-se avalia\u00e7\u00e3o complementar por profissional especializado.", align="C")

    def add_title_page(self):
        self.add_page()
        # Top accent bar
        self.set_fill_color(25, 99, 150)
        self.rect(0, 0, 210, 4, "F")
        self.set_fill_color(45, 191, 127)
        self.rect(140, 0, 70, 4, "F")

        self.ln(35)
        # Compass header centered
        if os.path.exists(COMPASS_HEADER):
            self.image(COMPASS_HEADER, x=35, y=self.get_y(), w=140)
            self.ln(18)

        # Title
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(25, 99, 150)
        self.ln(12)
        self.multi_cell(0, 9, self.title_text, align="C")
        self.ln(10)

        # Metadata line
        self.set_font("DejaVu", "", 10)
        self.set_text_color(100, 100, 100)
        self.cell(0, 7, f"Edi\u00e7\u00e3o {self.edition}  |  {self.date}  |  Publicado", align="C")
        self.ln(15)

        # Thin separator
        self.set_draw_color(200, 200, 200)
        self.line(60, self.get_y(), 150, self.get_y())

        # Grupo CSV logo
        if os.path.exists(GRUPO_CSV_LOGO):
            self.image(GRUPO_CSV_LOGO, x=75, y=225, w=60)

        self.set_y(255)
        self.set_font("DejaVu", "", 7.5)
        self.set_text_color(150, 150, 150)
        self.cell(0, 5, "Grupo CSV \u2014 Cuidados em Sa\u00fade com Valor", align="C")

        # Bottom accent bar
        self.set_fill_color(25, 99, 150)
        self.rect(0, 293, 210, 4, "F")
        self.set_fill_color(45, 191, 127)
        self.rect(140, 293, 70, 4, "F")


def extract_content(md_path):
    """Extract text content from the compass markdown file."""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove YAML frontmatter
    content = re.sub(r'^---.*?---\s*', '', content, flags=re.DOTALL)
    # Remove style blocks
    content = re.sub(r'<style>.*?</style>', '', content, flags=re.DOTALL)
    # Remove HTML div wrappers but keep content
    content = re.sub(r'<div[^>]*>', '', content)
    content = re.sub(r'</div>', '', content)
    # Remove img tags
    content = re.sub(r'<img[^>]*>', '', content)
    # Remove table HTML (we'll handle tables separately)
    content = re.sub(r'<table[^>]*>.*?</table>', '', content, flags=re.DOTALL)
    # Extract text from <p> tags
    content = re.sub(r'<p>(.*?)</p>', r'\1\n\n', content, flags=re.DOTALL)
    # Extract text from <h1> tags
    content = re.sub(r'<h1>(.*?)</h1>', r'# \1\n\n', content, flags=re.DOTALL)
    # Extract text from <h2> tags
    content = re.sub(r'<h2>(.*?)</h2>', r'## \1\n\n', content, flags=re.DOTALL)
    # Extract text from <strong> tags
    content = re.sub(r'<strong>(.*?)</strong>', r'\1', content, flags=re.DOTALL)
    # Extract text from <a> tags
    content = re.sub(r'<a[^>]*>(.*?)</a>', r'\1', content, flags=re.DOTALL)
    # Remove remaining HTML tags
    content = re.sub(r'<[^>]+>', '', content)
    # Decode HTML entities
    content = content.replace('&trade;', '\u2122')
    content = content.replace('&mdash;', '\u2014')
    content = content.replace('&middot;', '\u00b7')
    content = content.replace('&larr;', '\u2190')
    content = content.replace('&amp;', '&')
    content = content.replace('&nbsp;', ' ')
    # Remove metadata lines that leak from hero section
    content = re.sub(r'Edi[çc][ãa]o\d{3}/\d{4}', '', content)
    content = re.sub(r'Data\d{1,2}\s+de\s+\w+\s+de\s+\d{4}', '', content)
    content = re.sub(r'StatusPublicado', '', content)
    # Clean up whitespace
    content = re.sub(r'\n{3,}', '\n\n', content)
    return content.strip()


def extract_metadata(md_path):
    """Extract edition number, date, and title from the markdown."""
    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    edition = "001/2026"
    date = "19 de fevereiro de 2026"
    title = "Compass\u2122"

    title_match = re.search(r'title:\s*"?([^"\n]+)"?', content)
    if title_match:
        raw_title = title_match.group(1).strip()
        title = re.sub(r'^\d{3}/\d{4}\s*[—–\-]\s*', '', raw_title)

    ed_match = re.search(r'Edi[çc][ãa]o.*?(\d{3}/\d{4})', content)
    if ed_match:
        edition = ed_match.group(1)

    date_match = re.search(r'Data.*?(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})', content)
    if date_match:
        date = date_match.group(1)

    return edition, date, title


def generate_pdf(md_path, output_path):
    edition, date, title = extract_metadata(md_path)
    content = extract_content(md_path)

    pdf = CompassPDF(edition=edition, date=date, title_text=title)

    # Title page
    pdf.add_title_page()

    # Content pages
    pdf.add_page()

    lines = content.split('\n')
    skip_first_h1 = True
    for line in lines:
        line = line.strip()
        if not line:
            pdf.ln(2)
            continue

        if line.startswith('## '):
            pdf.ln(4)
            pdf.set_font("DejaVu", "B", 11)
            pdf.set_text_color(25, 99, 150)
            heading = line[3:].strip()
            pdf.multi_cell(0, 6, heading)
            # Underline
            pdf.set_draw_color(45, 191, 127)
            pdf.set_line_width(0.4)
            pdf.line(15, pdf.get_y() + 0.5, 100, pdf.get_y() + 0.5)
            pdf.set_line_width(0.2)
            pdf.ln(4)
        elif line.startswith('# '):
            if skip_first_h1:
                skip_first_h1 = False
                continue
            pdf.ln(6)
            pdf.set_font("DejaVu", "B", 14)
            pdf.set_text_color(25, 99, 150)
            pdf.multi_cell(0, 8, line[2:].strip())
            pdf.ln(4)
        else:
            pdf.set_font("DejaVu", "", 9)
            pdf.set_text_color(55, 55, 55)
            pdf.multi_cell(0, 4.8, line)
            pdf.ln(1)

    pdf.output(output_path)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 compass-pdf-gen.py <edition_md_path> <output_pdf_path>")
        sys.exit(1)
    generate_pdf(sys.argv[1], sys.argv[2])
