# Guia Operacional: Gerar Signal™

> **Propósito:** Gerar e publicar uma nova edição do Signal™, o resumo semanal de inteligência estratégica do Grupo CSV.

---

## Workflow de Geração

Este processo é executado semanalmente, tipicamente às segundas-feiras, para cobrir a semana anterior (D-7 a D-1).

### Fase 1: Coleta de Sinais

1.  **Varredura Notion:** Buscar por todas as páginas criadas ou editadas na última semana que contenham palavras-chave relevantes (`RADAR`, `EVS`, `Axys`, `decisão`, `estratégia`, `projeto`, etc.).
2.  **Varredura Gmail:** Buscar por todas as threads de e-mail no mesmo período com os mesmos critérios de palavra-chave.
3.  **Consolidação Bruta:** Agregar todo o conteúdo textual (páginas do Notion e corpos de e-mail) em um único arquivo de trabalho (e.g., `analise_comparativa.md`).

### Fase 2: Análise e Síntese

1.  **Identificação de Fatos:** Ler o conteúdo consolidado e identificar os 5 a 7 acontecimentos mais relevantes da semana. Um "fato" pode ser uma reunião importante, uma decisão tomada, o avanço de um projeto, uma nova parceria, ou uma movimentação de mercado.
2.  **Categorização:** Atribuir a cada fato uma tag de categoria, conforme o `padrão-editorial.md`.
3.  **Síntese:** Para cada fato, escrever um título claro e um resumo de 2 a 4 frases que capture o essencial do acontecimento.
4.  **Outras Movimentações:** Listar outros pontos relevantes, mas de menor impacto estratégico, em formato de bullet points.

### Fase 3: Criação da Edição

1.  **Criar Estrutura de Pastas:** No diretório `signal/edicoes/AAAA/`, criar uma nova pasta `SNN` (e.g., `S08`). Dentro dela, criar a subpasta `assets`.
2.  **Criar `signal.md`:** Usar o `templates/signal_template.md` para criar o arquivo `signal/edicoes/AAAA/SNN/signal.md`. Preencher com os fatos e movimentações sintetizados na Fase 2.
3.  **Criar `metadata.yml`:** Usar o `templates/metadata_template.yml` para criar o arquivo `signal/edicoes/AAAA/SNN/metadata.yml`. Preencher todos os campos.

### Fase 4: Geração do PDF

1.  **Atualizar Script:** Opcionalmente, se os dados da semana estiverem hard-coded no script `tools/signal-pdf/signal-pdf-gen.py`, atualizá-lo com o conteúdo da nova edição.
2.  **Executar Script:** Rodar o script para gerar o PDF.
    ```bash
    python3 tools/signal-pdf/signal-pdf-gen.py
    ```
3.  **Mover PDF:** Mover o arquivo PDF gerado (e.g., `Signal_S08_2026.pdf`) para a pasta `signal/edicoes/AAAA/SNN/assets/`.

### Fase 5: Publicação no Hub

1.  **Espelhar Arquivos:** Copiar a pasta da nova edição (`signal/edicoes/AAAA/SNN/`) para o diretório `docs/signal/edicoes/AAAA/SNN/`.
2.  **Atualizar Índice:** Editar o arquivo `signal/README.md` e `docs/signal/index.md`, adicionando a nova edição à tabela de "Edições publicadas".
3.  **Atualizar Sidebar:** Editar o arquivo `docs/.vitepress/config.mts` para adicionar a nova edição na barra lateral do Signal™.
4.  **Commit & Push:** Fazer o commit de todas as alterações com uma mensagem padronizada.
    ```bash
    git add .
    git commit -m "feat(signal): ✨ Publica edição SNN/AAAA"
    git push
    ```

---

## Checklist de Qualidade

- [ ] O PDF foi gerado em alta qualidade e revisado visualmente?
- [ ] O nome do arquivo PDF segue o padrão `Signal_SNN_AAAA.pdf`?
- [ ] O arquivo `signal.md` está preenchido e formatado corretamente?
- [ ] O arquivo `metadata.yml` está completo e válido?
- [ ] A nova edição foi adicionada aos dois arquivos de índice (`README.md` e `index.md`)?
- [ ] A sidebar do VitePress (`config.mts`) foi atualizada?
- [ ] Todos os links funcionam como esperado?
