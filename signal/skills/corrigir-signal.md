# Guia Operacional: Corrigir Edição do Signal™

> **Propósito:** Definir o fluxo padronizado para correção e reenvio de uma edição do Signal™ que contenha erro de formato, conteúdo ou grafia.

---

## Quando Usar

Este fluxo deve ser acionado sempre que uma edição já publicada do Signal™ precisar de correção, independentemente da natureza do erro (formato, conteúdo factual, grafia, acentuação, diagramação, número de páginas, etc.).

---

## Workflow de Correção

### Fase 1: Identificação e Correção

1.  **Identificar o erro** reportado pelo executivo ou detectado em revisão.
2.  **Corrigir o conteúdo** no script de geração do PDF (`tools/signal-pdf/signal-pdf-gen.py`) e/ou no `signal.md`.
3.  **Regerar o PDF** e validar:
    -   O PDF tem exatamente 1 (uma) página? (regra inviolável)
    -   Acentuação e cedilha estão corretas?
    -   O conteúdo corrigido está preciso?

### Fase 2: Substituição no Repositório

1.  **Substituir** o PDF e o `signal.md` nos dois diretórios:
    -   `signal/edicoes/AAAA/SNN/assets/Signal_SNN_AAAA.pdf`
    -   `docs/signal/edicoes/AAAA/SNN/assets/Signal_SNN_AAAA.pdf`
2.  **Não versionar** a versão incorreta. A correção substitui diretamente a versão anterior.
3.  **Commit** com mensagem padronizada:
    ```bash
    git commit -m "fix(signal): corrige edição SNN/AAAA — [descrição breve]"
    git push
    ```

### Fase 3: Reenvio por E-mail

1.  **Assunto do e-mail:** `Signal™ SNN/AAAA — Versão pós-correção`
2.  **Corpo do e-mail:** Segue o padrão normal de envio (layout HTML + PDF anexo). Não mencionar explicitamente a natureza do erro no assunto ou no corpo.
3.  **Lista de distribuição:** Mesma da publicação original:
    -   `guilherme@grupocsv.com`
    -   `guilherme.thome@unimedgv.com.br`
    -   `naline@grupocsv.com`
    -   `naline.rocha@unimedgv.com.br`

### Fase 4: Entrega

1.  **Disponibilizar** o PDF corrigido ao usuário para download.
2.  **Confirmar** que o repositório foi atualizado e o e-mail foi enviado.

---

## Checklist de Correção

- [ ] O erro foi identificado e corrigido?
- [ ] O PDF corrigido tem exatamente 1 (uma) página?
- [ ] Acentuação e cedilha estão corretas?
- [ ] A versão anterior foi substituída (não versionada)?
- [ ] O commit segue o padrão `fix(signal): ...`?
- [ ] O e-mail foi reenviado com assunto `Signal™ SNN/AAAA — Versão pós-correção`?
- [ ] O PDF corrigido foi entregue ao usuário?
