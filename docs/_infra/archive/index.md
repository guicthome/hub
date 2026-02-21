# Arquivo de Páginas Desativadas

Este diretório centraliza todas as páginas, ferramentas e entregáveis que foram retirados do frontend dos parceiros. O objetivo é manter um registro organizado e rastreável, sem excluir o conteúdo original.

---

## Estrutura

Cada item arquivado é armazenado como arquivo HTML neste diretório, mantendo o nome original. A organização por parceiro é feita exclusivamente pela tabela de registro abaixo, sem necessidade de subpastas.

```
docs/_infra/archive/
  index.md           ← este arquivo (registro e documentação)
  {nome-arquivo}.html  ← páginas arquivadas
```

---

## Registro de Itens Arquivados

| # | Parceiro | Nome Original | Arquivo | Data de Arquivamento | Motivo |
|---|----------|---------------|---------|---------------------|--------|
| 1 | Unihealth GV | [Desativado] Análise Reprocir | `reprocir_fechado.html` | 2026-02-21 | Ferramenta desativada; análise concluída e sem uso recorrente |

---

## Procedimento de Arquivamento

O processo de arquivamento segue um pipeline padronizado:

1. **Localizar** a página a ser arquivada no frontend do parceiro (Unihealth ou Unimed).
2. **Remover** o card/link da página no `index.md` do parceiro correspondente.
3. **Revisar** o layout do `index.md` do parceiro para garantir que nenhum elemento visual foi quebrado.
4. **Mover** o arquivo HTML para `docs/_infra/archive/`.
5. **Registrar** o item na tabela acima com parceiro, nome, arquivo, data e motivo.
6. **Commitar** com mensagem descritiva: `chore(archive): arquivar {nome} de {parceiro}`.

Para executar esse processo de forma automatizada, utilize a skill `archive-page` disponível em `/home/ubuntu/skills/archive-page/SKILL.md`.

---

## Observações

Os arquivos aqui depositados permanecem acessíveis via URL direta (ex.: `hub.grupocsv.com/_infra/archive/reprocir_fechado.html`) mas não aparecem em nenhum menu ou listagem do frontend. Isso permite consulta futura sem poluir a interface dos parceiros.
