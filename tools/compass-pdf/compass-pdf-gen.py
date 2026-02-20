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

# Colors
BLUE = (25, 99, 150)
GREEN = (45, 191, 127)
DARK_TEXT = (55, 55, 55)
LIGHT_GRAY = (150, 150, 150)
TABLE_HEADER_BG = (240, 245, 250)
TABLE_BORDER = (200, 210, 220)
QUOTE_BG = (248, 250, 252)
QUOTE_BORDER = (25, 99, 150)


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
            return
        # Top accent bar
        self.set_fill_color(*BLUE)
        self.rect(0, 0, 210, 2.5, "F")
        self.set_fill_color(*GREEN)
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
            return
        self.set_y(-18)
        self.set_draw_color(210, 210, 210)
        self.line(15, self.get_y(), 195, self.get_y())
        self.ln(2.5)
        self.set_font("DejaVu", "", 6.5)
        self.set_text_color(*LIGHT_GRAY)
        self.cell(90, 4, "Compass\u2122 \u2014 Grupo CSV \u00b7 Cuidados em Sa\u00fade com Valor", align="L")
        self.cell(90, 4, f"P\u00e1gina {self.page_no() - 1}", align="R")
        self.ln(4)
        self.set_font("DejaVu", "I", 5.5)
        self.cell(0, 3, "Documento t\u00e9cnico-estrat\u00e9gico. Quando o tema envolver aspectos jur\u00eddicos, regulat\u00f3rios ou contratuais, recomenda-se avalia\u00e7\u00e3o complementar por profissional especializado.", align="C")

    def add_title_page(self):
        self.add_page()
        # Top accent bar
        self.set_fill_color(*BLUE)
        self.rect(0, 0, 210, 4, "F")
        self.set_fill_color(*GREEN)
        self.rect(140, 0, 70, 4, "F")

        self.ln(35)
        if os.path.exists(COMPASS_HEADER):
            self.image(COMPASS_HEADER, x=35, y=self.get_y(), w=140)
            self.ln(18)

        # Title
        self.set_font("DejaVu", "B", 18)
        self.set_text_color(*BLUE)
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
        self.set_text_color(*LIGHT_GRAY)
        self.cell(0, 5, "Grupo CSV \u2014 Cuidados em Sa\u00fade com Valor", align="C")

        # Bottom accent bar
        self.set_fill_color(*BLUE)
        self.rect(0, 293, 210, 4, "F")
        self.set_fill_color(*GREEN)
        self.rect(140, 293, 70, 4, "F")

    def render_table(self, headers, rows, col_widths=None):
        """Render an HTML table with headers and rows."""
        usable_w = 180  # 210 - 15 - 15 margins
        if col_widths is None:
            n_cols = len(headers)
            col_widths = [usable_w / n_cols] * n_cols

        # Check if table fits on current page; if not, add new page
        estimated_height = (len(rows) + 1) * 12
        if self.get_y() + min(estimated_height, 40) > 270:
            self.add_page()

        x_start = 15
        cell_padding = 1.5
        line_height = 4.2

        # Header row
        self.set_font("DejaVu", "B", 7)
        self.set_fill_color(*TABLE_HEADER_BG)
        self.set_draw_color(*TABLE_BORDER)
        self.set_text_color(*DARK_TEXT)

        # Calculate header row height
        max_lines = 1
        for i, h in enumerate(headers):
            n_lines = self._count_lines(h, col_widths[i] - 2 * cell_padding, "DejaVu", "B", 7)
            max_lines = max(max_lines, n_lines)
        header_h = max_lines * line_height + 2 * cell_padding

        x = x_start
        for i, h in enumerate(headers):
            self.set_xy(x, self.get_y())
            y_before = self.get_y()
            self.rect(x, y_before, col_widths[i], header_h, "DF")
            self.set_xy(x + cell_padding, y_before + cell_padding)
            self.multi_cell(col_widths[i] - 2 * cell_padding, line_height, h, align="L")
            x += col_widths[i]
        self.set_y(self.get_y() + header_h - (self.get_y() - (self.get_y() - header_h + cell_padding + max_lines * line_height)))
        # Reset Y to after header
        header_bottom = self.get_y()
        # Actually, let's track Y properly
        y_after_header = self.get_y()

        # Recalculate: set Y to top of header + header_h
        # We need to find the top of the header row
        self.set_y(self.get_y())

        # Simpler approach: track y manually
        return self._render_table_simple(headers, rows, col_widths, x_start)

    def _count_lines(self, text, width, family, style, size):
        """Count how many lines a text will take in a given width."""
        self.set_font(family, style, size)
        words = text.split(' ')
        line = ''
        count = 1
        for word in words:
            test = line + (' ' if line else '') + word
            if self.get_string_width(test) > width:
                count += 1
                line = word
            else:
                line = test
        return max(count, 1)

    def _render_table_simple(self, headers, rows, col_widths, x_start):
        """Render table row by row, handling page breaks."""
        padding = 1.5
        font_size_header = 7
        font_size_body = 6.5
        line_h = 3.8

        def render_row(cells, is_header=False):
            if is_header:
                self.set_font("DejaVu", "B", font_size_header)
                self.set_fill_color(*TABLE_HEADER_BG)
            else:
                self.set_font("DejaVu", "", font_size_body)
                self.set_fill_color(255, 255, 255)

            self.set_draw_color(*TABLE_BORDER)
            self.set_text_color(*DARK_TEXT)

            # Calculate row height
            max_lines = 1
            style = "B" if is_header else ""
            sz = font_size_header if is_header else font_size_body
            for i, cell in enumerate(cells):
                n = self._count_lines(cell, col_widths[i] - 2 * padding, "DejaVu", style, sz)
                max_lines = max(max_lines, n)
            row_h = max_lines * line_h + 2 * padding

            # Page break check
            if self.get_y() + row_h > 270:
                self.add_page()
                # Re-render header on new page
                if not is_header:
                    render_row(headers, is_header=True)

            y_top = self.get_y()
            x = x_start
            for i, cell in enumerate(cells):
                # Draw cell background and border
                fill_style = "DF" if is_header else "D"
                if is_header:
                    self.rect(x, y_top, col_widths[i], row_h, "DF")
                else:
                    self.rect(x, y_top, col_widths[i], row_h, "D")

                # Write text
                if is_header:
                    self.set_font("DejaVu", "B", font_size_header)
                else:
                    self.set_font("DejaVu", "", font_size_body)
                self.set_xy(x + padding, y_top + padding)
                self.multi_cell(col_widths[i] - 2 * padding, line_h, cell, align="L")
                x += col_widths[i]

            self.set_y(y_top + row_h)

        # Render header
        render_row(headers, is_header=True)
        # Render body rows
        for row in rows:
            render_row(row, is_header=False)

        self.ln(4)

    def render_quote(self, text):
        """Render a blockquote-style paragraph."""
        # Check space
        if self.get_y() + 15 > 270:
            self.add_page()

        x_start = 15
        quote_x = x_start + 4
        quote_w = 176  # 180 - 4 indent

        self.set_font("DejaVu", "I", 8.5)
        self.set_text_color(80, 80, 80)

        # Calculate height
        n_lines = self._count_lines(text, quote_w - 4, "DejaVu", "I", 8.5)
        block_h = n_lines * 4.5 + 4

        y_top = self.get_y()

        # Left border accent
        self.set_fill_color(*QUOTE_BORDER)
        self.rect(x_start, y_top, 2, block_h, "F")

        # Background
        self.set_fill_color(*QUOTE_BG)
        self.rect(x_start + 2, y_top, quote_w + 2, block_h, "F")

        # Text
        self.set_xy(quote_x + 2, y_top + 2)
        self.multi_cell(quote_w - 4, 4.5, text, align="L")
        self.set_y(y_top + block_h + 2)


def decode_html(text):
    """Decode HTML entities and clean up text."""
    text = text.replace('&trade;', '\u2122')
    text = text.replace('&mdash;', '\u2014')
    text = text.replace('&middot;', '\u00b7')
    text = text.replace('&larr;', '\u2190')
    text = text.replace('&amp;', '&')
    text = text.replace('&nbsp;', ' ')
    text = text.replace('&bull;', '\u2022')
    text = text.replace('&#8220;', '\u201c')
    text = text.replace('&#8221;', '\u201d')
    # Remove remaining HTML tags
    text = re.sub(r'<[^>]+>', '', text)
    return text.strip()


def parse_table(table_html):
    """Parse an HTML table into headers and rows."""
    headers = []
    rows = []

    # Extract header cells
    thead = re.search(r'<thead>(.*?)</thead>', table_html, re.DOTALL)
    if thead:
        th_cells = re.findall(r'<th[^>]*>(.*?)</th>', thead.group(1), re.DOTALL)
        headers = [decode_html(c) for c in th_cells]

    # Extract body rows
    tbody = re.search(r'<tbody>(.*?)</tbody>', table_html, re.DOTALL)
    if tbody:
        tr_matches = re.findall(r'<tr>(.*?)</tr>', tbody.group(1), re.DOTALL)
        for tr in tr_matches:
            td_cells = re.findall(r'<td[^>]*>(.*?)</td>', tr, re.DOTALL)
            rows.append([decode_html(c) for c in td_cells])

    return headers, rows


def parse_content(md_path):
    """Parse the markdown file into structured content blocks."""
    with open(md_path, 'r', encoding='utf-8') as f:
        raw = f.read()

    # Remove YAML frontmatter
    raw = re.sub(r'^---.*?---\s*', '', raw, flags=re.DOTALL)
    # Remove style blocks
    raw = re.sub(r'<style>.*?</style>', '', raw, flags=re.DOTALL)

    blocks = []

    # Remove the hero section (compass-hero div)
    raw = re.sub(r'<div class="compass-hero">.*?</div>\s*</div>\s*</div>', '', raw, flags=re.DOTALL)

    # Remove nav, download, footer sections
    raw = re.sub(r'<div class="compass-download">.*?</div>', '', raw, flags=re.DOTALL)
    raw = re.sub(r'<div class="compass-nav">.*?</div>', '', raw, flags=re.DOTALL)
    raw = re.sub(r'<div class="compass-edition-footer">.*?</div>', '', raw, flags=re.DOTALL)
    raw = re.sub(r'<div class="compass-scope">.*?</div>', '', raw, flags=re.DOTALL)

    # Process section by section
    # Split by compass-section divs
    sections = re.split(r'<div class="compass-section">', raw)

    for section in sections:
        section = section.replace('</div>', '').strip()
        if not section:
            continue

        # Extract tables first
        table_matches = list(re.finditer(r'<table[^>]*>(.*?)</table>', section, re.DOTALL))

        if table_matches:
            # Process content before, between, and after tables
            last_end = 0
            for tm in table_matches:
                # Content before this table
                before = section[last_end:tm.start()].strip()
                if before:
                    _parse_text_blocks(before, blocks)

                # The table itself
                headers, rows = parse_table(tm.group(0))
                if headers and rows:
                    # Detect if it's a reference table
                    is_ref = 'ref-table' in tm.group(0) or (headers and 'Fonte' in headers)
                    blocks.append({
                        'type': 'table',
                        'headers': headers,
                        'rows': rows,
                        'is_ref': is_ref
                    })

                last_end = tm.end()

            # Content after last table
            after = section[last_end:].strip()
            if after:
                _parse_text_blocks(after, blocks)
        else:
            _parse_text_blocks(section, blocks)

    return blocks


def _parse_text_blocks(html, blocks):
    """Parse HTML text into heading, paragraph, and quote blocks."""
    # Extract headings
    parts = re.split(r'(<h[12][^>]*>.*?</h[12]>)', html, flags=re.DOTALL)

    for part in parts:
        part = part.strip()
        if not part:
            continue

        h2_match = re.match(r'<h2[^>]*>(.*?)</h2>', part, re.DOTALL)
        h1_match = re.match(r'<h1[^>]*>(.*?)</h1>', part, re.DOTALL)

        if h2_match:
            text = decode_html(h2_match.group(1))
            if text:
                blocks.append({'type': 'h2', 'text': text})
        elif h1_match:
            text = decode_html(h1_match.group(1))
            if text:
                blocks.append({'type': 'h1', 'text': text})
        else:
            # Split into paragraphs
            paragraphs = re.findall(r'<p>(.*?)</p>', part, re.DOTALL)
            if not paragraphs:
                # Try plain text
                clean = decode_html(part)
                if clean and len(clean) > 5:
                    blocks.append({'type': 'paragraph', 'text': clean})
            else:
                for p in paragraphs:
                    # Check if it's a quote (starts with " or ")
                    clean = decode_html(p)
                    if not clean:
                        continue

                    # Detect bold-lead paragraphs (strong at start)
                    strong_match = re.match(r'<strong>(.*?)</strong>(.*)', p, re.DOTALL)
                    if strong_match:
                        bold_part = decode_html(strong_match.group(1))
                        rest_part = decode_html(strong_match.group(2))
                        full_text = bold_part + rest_part
                        # Check if it's a quote
                        if full_text.startswith('\u201c') or full_text.startswith('"'):
                            blocks.append({'type': 'quote', 'text': full_text})
                        else:
                            blocks.append({'type': 'bold_paragraph', 'bold': bold_part, 'text': rest_part})
                    elif clean.startswith('\u201c') or clean.startswith('"') or (clean.startswith('"') and clean.endswith('"')):
                        blocks.append({'type': 'quote', 'text': clean})
                    else:
                        blocks.append({'type': 'paragraph', 'text': clean})


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
        title = re.sub(r'^\d{3}/\d{4}\s*[\u2014\u2013\-]\s*', '', raw_title)

    ed_match = re.search(r'Edi[\u00e7c][\u00e3a]o.*?(\d{3}/\d{4})', content)
    if ed_match:
        edition = ed_match.group(1)

    date_match = re.search(r'Data.*?(\d{1,2}\s+de\s+\w+\s+de\s+\d{4})', content)
    if date_match:
        date = date_match.group(1)

    return edition, date, title


def generate_pdf(md_path, output_path):
    edition, date, title = extract_metadata(md_path)
    blocks = parse_content(md_path)

    pdf = CompassPDF(edition=edition, date=date, title_text=title)

    # Title page
    pdf.add_title_page()

    # Content pages
    pdf.add_page()

    skip_first_h1 = True

    for block in blocks:
        btype = block['type']

        if btype == 'h1':
            if skip_first_h1:
                skip_first_h1 = False
                continue
            if pdf.get_y() + 20 > 270:
                pdf.add_page()
            pdf.ln(6)
            pdf.set_font("DejaVu", "B", 14)
            pdf.set_text_color(*BLUE)
            pdf.multi_cell(0, 8, block['text'])
            pdf.ln(4)

        elif btype == 'h2':
            if pdf.get_y() + 20 > 270:
                pdf.add_page()
            pdf.ln(4)
            pdf.set_font("DejaVu", "B", 11)
            pdf.set_text_color(*BLUE)
            pdf.multi_cell(0, 6, block['text'])
            # Underline accent
            pdf.set_draw_color(*GREEN)
            pdf.set_line_width(0.4)
            pdf.line(15, pdf.get_y() + 0.5, 100, pdf.get_y() + 0.5)
            pdf.set_line_width(0.2)
            pdf.ln(4)

        elif btype == 'paragraph':
            pdf.set_font("DejaVu", "", 9)
            pdf.set_text_color(*DARK_TEXT)
            pdf.multi_cell(0, 4.8, block['text'])
            pdf.ln(1.5)

        elif btype == 'bold_paragraph':
            pdf.set_font("DejaVu", "B", 9)
            pdf.set_text_color(*DARK_TEXT)
            # Write bold part inline, then regular
            bold_text = block['bold']
            rest_text = block['text']
            full = bold_text + rest_text
            # For simplicity, render as one paragraph with bold prefix
            pdf.multi_cell(0, 4.8, full)
            pdf.ln(1.5)

        elif btype == 'quote':
            pdf.render_quote(block['text'])

        elif btype == 'table':
            headers = block['headers']
            rows = block['rows']
            is_ref = block.get('is_ref', False)

            if is_ref:
                # Reference table: 3 columns (Notas, Fonte, URL)
                col_widths = [35, 95, 50]
            else:
                # Comparison table: equal widths
                n_cols = len(headers)
                if n_cols == 4:
                    col_widths = [38, 52, 45, 45]
                else:
                    col_widths = [180 / n_cols] * n_cols

            pdf._render_table_simple(headers, rows, col_widths, 15)

    pdf.output(output_path)
    print(f"PDF generated: {output_path}")


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python3 compass-pdf-gen.py <edition_md_path> <output_pdf_path>")
        sys.exit(1)
    generate_pdf(sys.argv[1], sys.argv[2])
