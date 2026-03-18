# Deck -- Legado (Inativo)

> Esta versão do Deck está **inativa**. O acesso via `hub.grupocsv.com/deck` redireciona automaticamente para o deploy ativo.

**Deploy ativo:** [deck.grupocsv.com](https://deck.grupocsv.com) (Cloudflare Pages)

Este diretório é mantido apenas como referência histórica. Qualquer alteração no Deck deve ser feita no projeto Cloudflare Pages correspondente.

---

## Referência histórica

Painel visual de contexto ativo para rastrear tarefas em andamento, onde cada card representa uma conversa, aba ou janela aberta no momento.

---

## Visao geral

O Deck nao e um Kanban nem um to-do list. E um **painel de contexto ativo** — mostra o que esta aberto agora e onde. Substitui post-its e blocos de notas usados para rastrear tarefas distribuidas entre multiplas ferramentas.

---

## Funcionalidades

- **Cards visuais** com plataforma, titulo e notas rapidas
- **Cores automaticas** por plataforma (Manus, ChatGPT, Claude, WhatsApp, etc.)
- **Drag-and-drop** para reordenar cards
- **PIN de 4 digitos** como trava local (sem backend de auth)
- **Persistencia total** em localStorage — sobrevive ao fechamento do navegador
- **Captura de tela** do quadro inteiro (PNG via html2canvas)
- **Envio por e-mail** da captura para guilherme@grupocsv.com
- **Exportar/Importar JSON** para backup manual
- **Plataformas personalizadas** com nome e cor

---

## Plataformas pre-cadastradas

| Plataforma     | Cor       |
|----------------|-----------|
| Manus          | #6C5CE7   |
| ChatGPT        | #10A37F   |
| Claude         | #D97706   |
| Claude Cowork  | #F59E0B   |
| Anti-Gravity   | #3B82F6   |
| E-mail         | #EF4444   |
| Chrome (aba)   | #6B7280   |
| WhatsApp       | #25D366   |
| Outro          | #9CA3AF   |

### Adicionar plataforma personalizada

1. Clique no icone de engrenagem (canto superior direito)
2. Selecione "Nova plataforma"
3. Informe nome e cor
4. A plataforma ficara disponivel no seletor de todos os cards

---

## Envio de e-mail

O Deck utiliza o worker generico de e-mail do Hub (`csv-email.guilherme-thom.workers.dev`) que opera via Resend com o dominio `mail.grupocsv.com`.

### Fluxo

1. Clique em "Screenshot" na barra superior
2. O quadro e capturado como imagem PNG
3. Visualize o preview no modal
4. Clique em "Enviar por e-mail" para disparar o envio
5. O e-mail chega com assunto "Deck™ — DD/MM/AAAA HH:MM" e a imagem anexada

### Configuracao do worker

O worker ja esta deployado e funcional. Caso precise redeploya-lo:

- Codigo-fonte: `/workers/csv-email/index.js`
- Endpoint: `https://csv-email.guilherme-thom.workers.dev`
- Variavel de ambiente necessaria no Cloudflare: `RESEND_API_KEY`
- Dominio de envio: `mail.grupocsv.com` (configurado no Resend)

---

## Estrutura de arquivos

```
deck/
  index.html    # Aplicacao completa (HTML + CSS + JS)
  README.md     # Este arquivo
```

---

## Stack

- HTML + CSS + JS vanilla (arquivo unico, sem framework)
- [Sortable.js](https://sortablejs.github.io/Sortable/) via CDN (drag-and-drop)
- [html2canvas](https://html2canvas.hertzen.com/) via CDN (captura de tela)
- localStorage para persistencia
- Cloudflare Worker + Resend para envio de e-mail

---

## Seguranca

A trava por PIN e exclusivamente local (hash SHA-256 no localStorage). Nao ha backend de autenticacao. O objetivo e apenas evitar acesso casual em tela compartilhada.

Para redefinir o PIN em caso de esquecimento, clique em "Esqueceu o PIN?" na tela de lock. Essa acao apaga todos os dados locais.
