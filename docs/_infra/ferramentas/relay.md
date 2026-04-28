# Relay™ — Mensagens Institucionais Padronizadas

## Visão Geral

O Relay™ é a plataforma de mensagens institucionais padronizadas do Grupo CSV. Permite que unidades parceiras (operadoras, hospitais) acessem templates de mensagem pré-aprovados para comunicação institucional, garantindo consistência de tom, conteúdo e conformidade regulatória.

| Campo | Valor |
|---|---|
| Marca | Relay™ |
| URL | [relay.axcare.com.br](https://relay.axcare.com.br) |
| Hospedagem | Manus (webapp React + TypeScript + Tailwind) |
| DNS | CNAME `relay.axcare.com.br` → `cname.manus.space` (Cloudflare, zone axcare.com.br) |
| Proprietário | AxiaCare / Grupo CSV |

## Funcionamento

O usuário acessa a plataforma e seleciona a unidade institucional (ex.: Unimed Governador Valadares). Após a seleção, são exibidos os templates de mensagem disponíveis para aquela unidade, organizados por categoria e contexto de uso.

## Unidades Disponíveis

| Unidade | Tipo |
|---|---|
| Unimed Governador Valadares | Operadora de Planos de Saúde |

## Integração no Hub

O Relay™ está acessível via navbar do Hub (dropdown "Ferramentas") e via card no portal AxiaCare. O link aponta diretamente para o domínio externo `relay.axcare.com.br`.
