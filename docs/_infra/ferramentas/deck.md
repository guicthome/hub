# Deck™ — Painel de Contexto Ativo

## Visão Geral

O Deck™ é o painel de contexto ativo do Grupo CSV. Não é um Kanban nem uma lista de tarefas. É um instrumento visual que mostra o que está aberto agora e onde, substituindo post-its e blocos de notas utilizados para rastrear tarefas distribuídas entre múltiplas ferramentas.

| Campo | Valor |
|---|---|
| Marca | Deck™ |
| URL | [deck.grupocsv.com](https://deck.grupocsv.com) |
| Hospedagem | Cloudflare Pages |
| DNS | CNAME `deck.grupocsv.com` (Cloudflare, zone grupocsv.com) |
| Stack | HTML + CSS + JS vanilla (arquivo único) |
| Dependências CDN | Sortable.js (drag-and-drop), html2canvas (captura de tela) |
| Persistência | localStorage (client-side) |
| Autenticação | PIN de 4 dígitos (hash SHA-256 no localStorage) |
| Proprietário | Grupo CSV |

## Funcionalidades

O Deck™ oferece cards visuais com plataforma, título e notas rápidas. As cores são atribuídas automaticamente por plataforma. O usuário pode reordenar cards via drag-and-drop, capturar o quadro inteiro como PNG, enviar a captura por e-mail para `guilherme@grupocsv.com`, e exportar ou importar dados em JSON para backup manual. Plataformas personalizadas podem ser adicionadas com nome e cor.

## Plataformas Pré-cadastradas

| Plataforma | Cor |
|---|---|
| Manus | #6C5CE7 |
| ChatGPT | #10A37F |
| Claude | #D97706 |
| Claude Cowork | #F59E0B |
| Anti-Gravity | #3B82F6 |
| E-mail | #EF4444 |
| Chrome (aba) | #6B7280 |
| WhatsApp | #25D366 |
| Outro | #9CA3AF |

## Deck Vision (Worker)

O Worker `deck-vision` recebe imagens (base64) ou texto via POST, envia para GPT-4o via AI Gateway, e retorna JSON estruturado para criar um card automaticamente no Deck™.

| Campo | Valor |
|---|---|
| Worker | deck-vision |
| Endpoint | `deck-vision.guilherme-thom.workers.dev` |
| Binding | Secret: OPENAI_API_KEY |
| Modelo | GPT-4o (via Cloudflare AI Gateway) |

O worker aceita três modos de entrada: imagem (base64), texto, ou ambos (imagem + contexto textual). A resposta inclui `title`, `platform`, `notes` e `confidence`.

## Envio de E-mail

O Deck™ utiliza o Worker csv-email (`csv-email.guilherme-thom.workers.dev`) para envio de capturas de tela. O fluxo consiste em capturar o quadro como PNG via html2canvas, exibir preview no modal, e disparar o envio. O e-mail chega com assunto "Deck™ — DD/MM/AAAA HH:MM" e a imagem anexada.

## Segurança

A trava por PIN é exclusivamente local (hash SHA-256 no localStorage). Não há backend de autenticação. O objetivo é evitar acesso casual em tela compartilhada. A funcionalidade "Esqueceu o PIN?" envia um PIN temporário por e-mail e exige troca após o uso.
