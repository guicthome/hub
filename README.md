# Hub Grupo CSV

Portal central do ecossistema **Grupo CSV** - Cuidados em Saúde com Valor.

**URL:** [hub.grupocsv.com](https://hub.grupocsv.com)

---

## Sobre

Este repositório contém o Hub Central do Grupo CSV, construído com [VitePress](https://vitepress.dev/), servindo como ponto de entrada unificado para:

- **Empresas do Grupo** - AxiaCare®, MedValor®, TheraTech®
- **Instituições Parceiras** - Entregáveis para Unimed GV e Unihealth
- **Governança e Compliance** - Políticas, termos e documentação de integridade
- **Fundador** - Informações sobre Guilherme Thomé
- **Infraestrutura Cognitiva** - Documentação técnica para desenvolvedores e agentes
- **Compass™** - Linha editorial estratégica do Grupo CSV
- **Signal™** - Resumo semanal de inteligência estratégica

---

## Estrutura

```
grupocsv/hub/
├── docs/                    # VitePress source
│   ├── .vitepress/
│   │   └── config.mts       # Configuração VitePress
│   ├── public/              # Assets estáticos
│   └── index.md             # Página inicial
├── assets/                  # Assets fonte (logos, favicons)
│   ├── logos/
│   └── favicons/
│
├── axia/                    # Módulo 1: AxiaCare (placeholder)
├── medvalor/                # Módulo 1: MedValor (placeholder)
├── thera/                   # Módulo 1: Thera (placeholder)
│
├── unimed/                  # Módulo 2: Entregáveis Unimed
├── unihealth/               # Módulo 2: Entregáveis Unihealth
│
├── compliance/              # Módulo 3: Central de Compliance
│   ├── index.html
│   ├── axiacare/
│   ├── medvalor/
│   └── thera/
│
├── founder/                 # Módulo 4: Guilherme Thomé
│
├── compass/                 # Módulo 6: Compass — Linha editorial estratégica
│   ├── edicoes/             # Edições publicadas
│   ├── templates/           # Templates editoriais
│   ├── policies/            # Padrão editorial
│   └── skills/              # Guia operacional
│
├── signal/                  # Módulo 7: Signal — Resumo semanal estratégico
│   ├── edicoes/             # Edições semanais (SNN/AAAA)
│   ├── templates/           # Templates editoriais
│   ├── policies/            # Padrão editorial
│   └── skills/              # Guia operacional
│
├── _infra/                  # Módulo 5: Infraestrutura Cognitiva
│   ├── csv-core/            # Definições canônicas
│   ├── axiacare/            # Mandate AxiaCare
│   ├── medvalor/            # Mandate MedValor
│   ├── thera/               # Mandate Thera
│   └── uploads_usuario/     # Logos extraídos
│
├── package.json             # Dependências
└── CNAME                    # Domínio customizado
```

---

## Módulos

### Módulo 1 - Empresas do Grupo
| Empresa | Cor | Status |
|---------|-----|--------|
| **AxiaCare®** | Azul/Verde (#196396 + #2DBF7F) | Placeholder |
| **MedValor®** | Laranja (#c2410c) | Placeholder |
| **TheraTech®** | Roxo (#6B5B95) | Placeholder |

### Módulo 2 - Instituições Parceiras
- **Unimed Governador Valadares** - Dashboards, relatórios, ferramentas
- **Unihealth** - Calculadoras, indicadores, ferramentas

### Módulo 3 - Governança e Compliance
Central unificada de políticas, termos de uso, código de conduta e documentação de integridade.

### Módulo 4 - Fundador
Página com informações, links e contatos de Guilherme Thomé.

### Módulo 6 - Compass™
Linha editorial estratégica do Grupo CSV. Documentos técnico-estratégicos para tomada de decisão em organizações de saúde.

- **Central Compass:** [compass/README.md](compass/README.md)
- **Edição 001/2026:** [Metas quantitativas de produção em contratos ACO com orçamento global](compass/edicoes/2026/001/compass.md)

### Módulo 7 - Signal™
Resumo semanal de inteligência estratégica do Grupo CSV. Sintetiza os 5 a 7 fatos mais relevantes da semana, extraídos da varredura contínua de fontes internas.

- **Central Signal:** [signal/README.md](signal/README.md)
- **Edição S07/2026:** [16 a 23 de fevereiro de 2026](signal/edicoes/2026/S07/signal.md)

### Módulo 5 - Infraestrutura Cognitiva
Documentação técnica pensada para:
- Desenvolvedores humanos
- Agentes de IA
- Integração contínua

---

## Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run docs:dev

# Build para produção
npm run docs:build

# Preview do build
npm run docs:preview
```

---

## Deploy

O deploy é automático via GitHub Actions quando há push na branch `main`.

O workflow:
1. Faz build do VitePress
2. Copia módulos estáticos (axia, medvalor, compliance, etc.)
3. Deploy para GitHub Pages

---

## Ecossistema Digital

| Portal | URL | Função |
|--------|-----|--------|
| **Hub CSV** | [hub.grupocsv.com](https://hub.grupocsv.com) | Este portal (empresarial) |
| **Hub Pessoal** | [hub.guithome.com.br](https://hub.guithome.com.br) | Portal pessoal Guilherme |
| **Site CSV** | [grupocsv.com](https://grupocsv.com) | Site institucional |
| **Site Pessoal** | [guithome.com.br](https://guithome.com.br) | Site Guilherme Thomé |
| **Blog** | [blog.guithome.com.br](https://blog.guithome.com.br) | Artigos e conteúdo |
| **Links** | [link.guithome.com.br](https://link.guithome.com.br) | Linktree |

---

## Histórico de Migração

| Data | Evento |
|------|--------|
| 24/01/2026 | Migração de `guicthome/guilherme` para `grupocsv/hub` |
| 24/01/2026 | Implementação da Central de Compliance |
| 24/01/2026 | Renomeação `_backup_vitepress` → `_infra` |
| 24/01/2026 | Reestruturação completa em módulos |
| 24/01/2026 | Migração para VitePress |
| 24/01/2026 | Criação do módulo Founder |
| 24/01/2026 | Limpeza de arquivos desnecessários |
| 19/02/2026 | Implementação da Central Compass™ e publicação da edição 001/2026 |
| 19/02/2026 | Limpeza de avatares: manter apenas 3 oficiais (current, current_low-res, with-name) |
| 19/02/2026 | Footer com logos reais clicáveis; navbar com logo transparente; Compass™ TM global |
| 19/02/2026 | Redesign da publicação Compass™ 001/2026 com layout elegante |
| 24/02/2026 | Implementação da Central Signal™ e publicação da edição S07/2026 |

---

## Contato

- **Grupo CSV:** contato@grupocsv.com
- **Compliance:** compliance@grupocsv.com
- **Guilherme Thomé:** guilherme@guithome.com.br

---

## Licença

© 2026 Grupo CSV. Todos os direitos reservados.

**AxiaCare®**, **MedValor®** e **TheraTech®** são marcas registradas do Grupo CSV.
