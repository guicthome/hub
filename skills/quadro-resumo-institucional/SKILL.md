---
name: quadro-resumo-institucional
description: Gera imagens HD institucionais com quadros resumo de custos, orçamentos ou comparativos, aplicando branding corporativo (cores, logo, fontes). Uso principal para envio a diretorias e conselhos. Suporta múltiplas entidades (Unimed, Grupo CSV, ICDS).
---

# Quadro Resumo Institucional -- Gerador de Imagens HD

## Quando usar

Usar esta skill quando for necessario gerar uma **imagem em alta definicao** contendo quadros, tabelas ou comparativos de custos/orcamentos para envio a diretorias, conselhos ou stakeholders. O resultado e uma imagem PNG pronta para compartilhar via e-mail, WhatsApp ou apresentacao, com branding institucional aplicado.

Casos tipicos:
- Comparativo de cenarios de custo (transporte, hospedagem, eventos)
- Resumo orcamentario para aprovacao
- Quadro de investimentos por participante ou projeto
- Qualquer tabela que precise de apresentacao visual institucional

## Estrutura de arquivos

```
skills/quadro-resumo-institucional/
  SKILL.md                          # Este guia
  templates/
    quadro_template.py              # Script Python parametrizado (Pillow)
    config_exemplo.json             # Exemplo de configuracao de dados
  assets/
    (vazio -- logos sao buscados no hub conforme a entidade)
```

## Passo 1 -- Identificar a entidade e buscar assets

Determinar qual entidade institucional sera usada no branding. Buscar logo e cores no hub:

| Entidade | Logo | Cores |
| :--- | :--- | :--- |
| Unimed Gov. Valadares | `icds/logo_unimed_govvaladares.png` | `unimed/assets/cores_unimed.txt` |
| Unimed (generica) | `unimed/assets/logo_unimed.png` | `unimed/assets/cores_unimed.txt` |
| Grupo CSV | `_infra/uploads_usuario/upload_001/logos_extraidos/grupo_csv/` | Consultar brand guide |
| AxiaCare | `_infra/uploads_usuario/upload_001/logos_extraidos/axiacare/` | Consultar brand guide |

**Paleta Unimed de referencia:**
- Principais: `#00995D`, `#8BAF1F`, `#004E4C`, `#F47920`
- Secundarias: `#CDE3BB`, `#ECE3D9`

**Mapeamento de cores para elementos visuais:**

| Elemento | Cor | Hex |
| :--- | :--- | :--- |
| Barra superior/inferior | Verde principal | `#00995D` |
| Titulo | Verde escuro | `#004E4C` |
| Cabecalho de secao (nome do participante) | Verde escuro | `#004E4C` |
| Cabecalho da tabela | Verde principal | `#00995D` |
| Linha alternada | Verde palido | `#EDF5E8` |
| Linha total | Verde claro | `#E0F0D8` |
| Texto total | Verde escuro | `#004E4C` |
| Fundo geral | Off-white | `#F7FAF5` |
| Separadores | Verde suave | `#B0D4A0` |

## Passo 2 -- Estruturar os dados

Montar os dados em formato estruturado antes de gerar a imagem. O formato padrao e:

```json
{
  "titulo": "Convencao Tecnica Unimed 2026",
  "subtitulo": "Quadro resumo de custos por participante e modalidade de transporte",
  "info_linha": "29 e 30 de abril  |  Sao Paulo  |  Presencial  |  18h",
  "entidade": "unimed_gv",
  "colunas": ["Item", "Aereo (GVR-CGH)", "Misto (onibus GV-BH + aereo CNF-CGH)", "Terrestre (onibus GV-SP)"],
  "secoes": [
    {
      "titulo_secao": "Dr. Guilherme Camargo Thome -- Superintendente Medico",
      "linhas": [
        ["Inscricao", "R$ 1.100,00", "R$ 1.100,00", "R$ 1.100,00"],
        ["Hospedagem (single, 3 noites)", "R$ 2.800,00", "R$ 2.800,00", "R$ 2.800,00"],
        ["Alimentacao", "---", "---", "---"],
        ["Transporte", "R$ 2.807,27", "R$ 995,18", "R$ 850,76"],
        ["Total", "R$ 6.707,27", "R$ 4.895,18", "R$ 4.750,76"]
      ]
    }
  ],
  "total_geral": {
    "labels": ["Aereo (GVR-CGH)", "Misto", "Terrestre"],
    "valores": ["R$ 14.414,54", "R$ 10.790,36", "R$ 10.501,52"]
  },
  "rodape": "Valores consultados em 05/03/2026. Hospedagem: quarto individual (single) para ambos os participantes.",
  "assinatura": "Escritorio de Valor  |  Unimed Governador Valadares"
}
```

## Passo 3 -- Validar numeros

**Regra inviolavel:** todos os valores numericos devem ser validados por pelo menos dois metodos antes de renderizar. Usar Python para conferir somas e cruzar com o documento-fonte.

```python
# Exemplo de validacao
total_por_pessoa = inscricao + hospedagem + alimentacao + transporte
total_geral = total_pessoa_1 + total_pessoa_2
assert total_geral == valor_documento, f"Divergencia: {total_geral} vs {valor_documento}"
```

## Passo 4 -- Gerar a imagem

Usar o template Python em `templates/quadro_template.py` como base. O script utiliza Pillow e aceita os dados estruturados do Passo 2.

**Especificacoes tecnicas da imagem:**
- Largura: 2400px (ajustavel conforme numero de colunas)
- DPI: 300
- Formato: PNG
- Fontes: Noto Sans (Regular, Medium, SemiBold, Bold) -- pre-instaladas no sistema
- Logo: redimensionada proporcionalmente para altura de 90px no canto superior direito

**Regras de layout:**
1. Barra verde superior (8px) e inferior (8px)
2. Logo no canto superior direito, titulo no canto superior esquerdo
3. Linha separadora verde apos subtitulo
4. Cada secao: barra de titulo em verde escuro + tabela com header verde + linhas alternadas
5. Linha "Total" com fundo destacado e fonte bold
6. Secao "Total Geral" com cards coloridos (um por opcao)
7. Rodape com nota e assinatura institucional

**Regras de texto:**
- Acentuacao completa em PT-BR (usar caracteres Unicode diretamente)
- Travessao (--) no lugar de hifens duplos em separadores
- Valores monetarios centralizados nas colunas; labels alinhados a esquerda
- Sem emojis em nenhuma circunstancia

## Passo 5 -- Revisar e entregar

Apos gerar a imagem:
1. Visualizar a imagem para conferir acentuacao, alinhamento e legibilidade
2. Verificar se a logo esta nitida e proporcional
3. Confirmar que todos os numeros estao corretos comparando com os dados validados
4. Entregar ao usuario como anexo

## Checklist obrigatorio

- [ ] Logo da entidade correta carregada do hub
- [ ] Paleta de cores institucional aplicada
- [ ] Todos os valores numericos validados por 2 metodos
- [ ] Acentuacao PT-BR completa
- [ ] Sem emojis
- [ ] Sem mencao a ferramentas ou autoria automatizada
- [ ] Imagem em alta definicao (minimo 2400px largura, 300 DPI)
- [ ] Fontes Noto Sans utilizadas (nao fontes genericas)
- [ ] Layout limpo, institucional, nao promocional

## Adaptacoes possiveis

- **Numero de colunas:** ajustar `COL_WIDTHS` e `WIDTH` proporcionalmente
- **Numero de secoes:** o script aceita N secoes; a altura e calculada dinamicamente
- **Entidade diferente:** trocar logo e paleta de cores conforme tabela do Passo 1
- **Sem total geral:** omitir a secao de cards no final
- **Orientacao paisagem vs. retrato:** ajustar `WIDTH` e layout conforme necessidade
