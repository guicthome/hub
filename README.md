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
- **Infraestrutura Cognitiva** - Documentação técnica para desenvolvedores e AI

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

---

## Contato

- **Grupo CSV:** contato@grupocsv.com
- **Compliance:** compliance@grupocsv.com
- **Guilherme Thomé:** guilherme@guithome.com.br

---

## Licença

© 2026 Grupo CSV. Todos os direitos reservados.

**AxiaCare®**, **MedValor®** e **TheraTech®** são marcas registradas do Grupo CSV.
