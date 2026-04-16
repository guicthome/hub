# Guia Operacional | Produzir e publicar edições do Compass&trade;

Este guia descreve o passo a passo para produzir e publicar novas edições do Compass&trade;, a base de conhecimento corporativa e de educação continuada do Grupo CSV, garantindo consistência editorial e integridade do conteúdo.

---

## Passo 1 — Definir fonte primária

Identificar e obter o documento que será a base da edição. A fonte primária é o único material autorizado para extração de conteúdo. Nenhum fato, argumento, exemplo, número ou referência pode ser adicionado além do que consta na fonte.

---

## Passo 2 — Garantir extração integral do texto

Extrair 100% do texto da fonte primária. Verificar que nenhum parágrafo, tabela, diagrama, citação ou referência foi omitido. Se a fonte for um PDF, confirmar que a extração capturou todas as páginas e todos os elementos textuais.

---

## Passo 3 — Criar pasta da edição

Criar a estrutura de diretórios para a nova edição:

```
/compass/edicoes/AAAA/NNN/
  compass.md
  metadata.yml
  /assets/
    compass_header.png
    compass_letterhead.pdf
```

Onde `AAAA` é o ano e `NNN` é o número sequencial (ex.: 002, 003).

Copiar os assets `compass_header.png` e `compass_letterhead.pdf` para a pasta `/assets/` da edição.

Se o hub utilizar um docs site (VitePress), criar também a versão correspondente em `docs/compass/edicoes/AAAA/NNN/`.

---

## Passo 4 — Aplicar cabeçalho, numeração e título

Usar o template em `/compass/templates/compass_template.md` como base. Preencher:

- Edição (formato NNN/AAAA)
- Título (fiel à fonte primária, tecnicamente preciso, não apelativo)
- Data de publicação (data real do commit, não inventar data histórica)
- Status: Publicado
- Links para assets

Remover o bloco de "Regras do template" antes de publicar.

---

## Passo 5 — Inserir texto integral e preservar referências

Inserir o texto completo da fonte primária no corpo do compass.md. Manter todas as citações e referências exatamente como estão na fonte. A única intervenção permitida é substituir ocorrências de "Parecer técnico executivo" (ou variações) pelo padrão Compass&trade;.

Remover parâmetros de rastreamento de URLs (ex.: `?utm_source=...`).

---

## Passo 6 — Preencher metadados

Criar o arquivo `metadata.yml` usando o template em `/compass/templates/metadata_template.yml`. Preencher apenas com termos que apareçam explicitamente na fonte primária.

---

## Passo 7 — Gerar PDF com timbrado

Gerar o PDF timbrado da edição usando o script automatizado. O script lê o `compass.md` e produz um PDF com capa institucional, header/footer em todas as páginas, tabelas formatadas e nota de escopo.

### Comando

```bash
python3 tools/compass-pdf/compass-pdf-gen.py \
  docs/compass/edicoes/AAAA/NNN/compass.md \
  docs/public/compass/edicoes/AAAA/NNN/compass_NNN_AAAA.pdf
```

### Pré-requisitos

- O pacote `fpdf2` (versão 2.x) deve estar instalado. Se houver erro de `UnicodeDecodeError` ao carregar fontes, remover arquivos `.pkl` da pasta `tools/compass-pdf/_fonts/` e garantir que `fpdf2` (não `fpdf` 1.x) está instalado.
- O diretório de saída (`docs/public/compass/edicoes/AAAA/NNN/`) deve ser criado antes da execução.
- Os assets `compass_header.png` e o logo do Grupo CSV devem existir em `docs/public/`.

### Verificação

Após gerar, confirmar visualmente que o PDF contém: capa com logos e título, header com edição e data em todas as páginas internas, tabelas renderizadas, footer com nota de escopo e paginação.

---

## Passo 8 — Inserir botão de download no compass.md

Adicionar o bloco HTML do botão de download do PDF timbrado no `compass.md`, posicionado entre a `compass-scope` e a `compass-nav`. O bloco segue o padrão visual das demais edições.

### Bloco HTML

```html
<div class="compass-download">
  <a href="/compass/edicoes/AAAA/NNN/compass_NNN_AAAA.pdf" download>
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 16l-5-5h3V4h4v7h3l-5 5zm-7 2h14v2H5v-2z"/></svg>
    Download PDF com timbrado
  </a>
</div>
```

O `href` aponta para o caminho público do PDF (servido pelo VitePress a partir de `docs/public/`). Confirmar que o caminho corresponde ao arquivo gerado no Passo 7.

---

## Passo 9 — Rodar checklist e publicar

Executar o checklist obrigatório abaixo. Todos os itens devem passar antes do commit.

### Checklist obrigatório

- [ ] Texto integral presente (zero omissões)
- [ ] Zero referências ao processo de produção do documento (ferramentas, métodos de autoria)
- [ ] Zero ocorrências de "Parecer técnico executivo" (buscar no repositório)
- [ ] Numeração correta (formato NNN/AAAA)
- [ ] Cabeçalho Compass&trade; completo
- [ ] Links funcionam (Central para edição; edição para assets)
- [ ] Nenhuma adição de conteúdo fora da fonte primária
- [ ] Tom construtivo e não-confrontativo confirmado
- [ ] metadata.yml preenchido corretamente
- [ ] Versão VitePress criada (se aplicável)
- [ ] PDF timbrado gerado e verificado visualmente
- [ ] Botão de download presente no compass.md (entre scope e nav)
- [ ] PDF disponível em `docs/public/compass/edicoes/AAAA/NNN/`

### Comandos de verificação

```bash
# Buscar termos proibidos
grep -rni "parecer técnico" compass/
grep -rni "gerado por" compass/
grep -rni "elaborado com" compass/
grep -rni "auxílio de" compass/

# Verificar links de assets
ls -la compass/edicoes/AAAA/NNN/assets/

# Verificar PDF gerado
ls -la docs/public/compass/edicoes/AAAA/NNN/compass_NNN_AAAA.pdf

# Verificar botão de download no compass.md
grep -n "compass-download" docs/compass/edicoes/AAAA/NNN/compass.md
```

---

## Passo 10 — Atualizar índice da Central

Adicionar a nova edição na tabela de edições em:

- `/compass/README.md` (versão GitHub)
- `/docs/compass/index.md` (versão VitePress, se aplicável)

Incluir: número da edição, título e status.

---

## Passo 11 — Commit e push

Fazer commit com mensagem descritiva:

```
feat(compass): publicar edição NNN/AAAA — [Título]
```

Fazer push para a branch principal.

---

[Voltar para a Central Compass&trade;](/compass/)
