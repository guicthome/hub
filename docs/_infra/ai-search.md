---
layout: page
title: AI Search — Ponto Neural do Hub CSV
---

<style scoped>
.VPPage { padding: 0 !important; }
</style>

<style>
.copy-md-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(25, 99, 150, 0.9);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 14px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 14px rgba(0,0,0,.18);
  transition: all 0.2s;
  opacity: 0.7;
}
.copy-md-float:hover { opacity: 1; transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.25); }
.copy-md-float.copied { background: rgba(5, 150, 105, 0.9); opacity: 1; }
.dark .copy-md-float { background: rgba(93, 169, 224, 0.85); color: #0f172a; }
.dark .copy-md-float.copied { background: rgba(52, 211, 153, 0.85); }
</style>


# AI Search — Ponto Neural do Hub CSV

::: tip Ponto Neural
O Hub CSV agora possui uma API de busca semântica que indexa automaticamente todo o conteúdo do repositório. Qualquer agente, automação ou SaaS pode consultar o arsenal completo do Hub em linguagem natural.
:::

## O que é

O **Cloudflare AI Search** transforma o conteúdo estático do Hub CSV (markdown, HTML, JSON, CSV, PDF) em uma base de conhecimento vetorial consultável via API REST. A cada push no repositório, o conteúdo é sincronizado automaticamente para o bucket R2 e re-indexado.

Não é uma interface de chat. É uma **API robusta** projetada para ser o ponto de conexão entre o Hub e o restante do ecossistema digital: agentes, automações, SaaS e, em especial, o **Extensio**.

## Arquitetura

```
Hub CSV (GitHub) → GitHub Actions → R2 (hub-csv-knowledge) → AI Search (hub-csv) → API REST
                                                                                      ↓
                                                              Extensio / LLMs / Make / Agentes
```

| Componente | Recurso | Detalhes |
|---|---|---|
| Repositório | GitHub `grupocsv/hub` | Fonte primária de todo o conteúdo |
| Armazenamento | R2 `hub-csv-knowledge` | 191 objetos sincronizados |
| Instância AI Search | `hub-csv` | 189 arquivos indexados, 384 vetores |
| Embedding | `qwen3-embedding-0.6b` | 2048 tokens por chunk, 10% overlap |
| AI Gateway | `csv_ai_gateway` | Roteamento e observabilidade |
| Vectorize | `ai-search-hub-csv` | Banco vetorial Cloudflare |

## Endpoints

### Endpoint 1 — AI Search (busca + geração)

Recebe uma pergunta em linguagem natural, busca nos vetores, e retorna uma resposta gerada com citações das fontes.

```http
POST /client/v4/accounts/da0c29123f448f3c3892f784cd9f7cac/autorag/rags/hub-csv/ai-search
Host: api.cloudflare.com
Authorization: Bearer SEU_AI_SEARCH_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "query": "Qual o mandato da AxiaCare?",
  "stream": false,
  "rewrite_query": true,
  "max_num_results": 10
}
```

**Resposta:** JSON com `response` (texto gerado), `search_results` (documentos fonte com score e filename).

### Endpoint 2 — Search (busca vetorial pura)

Retorna apenas os documentos mais relevantes, sem geração de texto. Ideal para alimentar agentes que fazem sua própria síntese.

```http
POST /client/v4/accounts/da0c29123f448f3c3892f784cd9f7cac/autorag/rags/hub-csv/search
Host: api.cloudflare.com
Authorization: Bearer SEU_AI_SEARCH_TOKEN
Content-Type: application/json
```

**Body:**

```json
{
  "query": "Signal edição mais recente",
  "max_num_results": 5
}
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `query` | string | Pergunta em linguagem natural |
| `stream` | boolean | Streaming da resposta (SSE) |
| `rewrite_query` | boolean | Reescrever a query para melhorar busca |
| `max_num_results` | integer | Máximo de documentos retornados (1-20) |
| `system_prompt` | string | Prompt de sistema para contextualizar |

## System Prompt Recomendado

Ao usar o endpoint `ai-search`, inclua este `system_prompt` no body para contextualizar as respostas:

```text
Você é o assistente do Hub CSV, a base de conhecimento pessoal
de Guilherme Thomé, médico executivo e fundador do Grupo CSV.
O Hub contém: mandatos institucionais (AxiaCare, Thera, MedValor, ICDS),
boletins estratégicos (Signal, Compass), dashboards operacionais
(Unimed GV, Unihealth), calculadoras clínicas, identidade visual
e documentação técnica. Responda sempre em português do Brasil,
com precisão e citando as fontes quando disponíveis.
```

## Sincronização Automática

O fluxo de atualização é totalmente automatizado:

```
Push no main → deploy.yml (VitePress + Pages) → sync-r2-ai-search.yml → R2 → Re-index
```

O workflow `sync-r2-ai-search.yml` roda automaticamente após cada deploy bem-sucedido. Também pode ser disparado manualmente via `workflow_dispatch`.

**Arquivos sincronizados:** `.md`, `.html`, `.json`, `.csv`, `.txt`, `.pdf` (até 4 MB cada).

**Excluídos:** `.git/`, `node_modules/`, cache do VitePress, `package-lock.json`.

## Pontos de Conexão

O AI Search foi projetado para ser consumido por múltiplos canais:

| Canal | Como conectar |
|---|---|
| LLMs (Manus, Claude, ChatGPT) | Chamar a API REST diretamente como tool/function |
| Make (automações) | Módulo HTTP com POST para o endpoint |
| Agentes | Function calling apontando para `/ai-search` |
| SaaS diversos | Webhook ou integração HTTP |
| Extensio (segundo cérebro) | Ponto neural dedicado — lê Hub via API |
| MCP (Model Context Protocol) | Endpoint `/mcp` quando disponível |

### Extensio

O Extensio é o segundo cérebro digital que concentra diversos pontos neurais. O AI Search do Hub CSV é um desses pontos. O Extensio já lê e-mails, WhatsApp, Notion e GitHub. Com o AI Search, ele passa a ter acesso semântico a todo o conteúdo do Hub: mandatos, boletins, dashboards, identidade visual e documentação técnica.

## Exemplo de Integração (Python)

```python
import requests

ACCOUNT_ID = "da0c29123f448f3c3892f784cd9f7cac"
TOKEN = "SEU_AI_SEARCH_TOKEN"

def ask_hub(query: str) -> dict:
    url = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT_ID}/autorag/rags/hub-csv/ai-search"
    headers = {
        "Authorization": f"Bearer {TOKEN}",
        "Content-Type": "application/json"
    }
    body = {
        "query": query,
        "stream": False,
        "rewrite_query": True
    }
    r = requests.post(url, json=body, headers=headers, timeout=30)
    return r.json()

resultado = ask_hub("Quais são os portais do Hub CSV?")
print(resultado["result"]["response"])
```

## Exemplo de Integração (cURL)

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/da0c29123f448f3c3892f784cd9f7cac/autorag/rags/hub-csv/ai-search" \
  -H "Authorization: Bearer SEU_AI_SEARCH_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query": "O que é o Signal?", "stream": false, "rewrite_query": true}'
```

## Exemplo de Integração (Make)

Para conectar no Make, use o módulo **HTTP > Make a request**:

- **URL:** `https://api.cloudflare.com/client/v4/accounts/da0c29123f448f3c3892f784cd9f7cac/autorag/rags/hub-csv/ai-search`
- **Method:** POST
- **Headers:** `Authorization: Bearer SEU_TOKEN` e `Content-Type: application/json`
- **Body type:** Raw (JSON)
- **Body:** conforme exemplos acima

## Infraestrutura e Credenciais

| Recurso | Valor |
|---|---|
| Account ID | `da0c29123f448f3c3892f784cd9f7cac` |
| Instância | `hub-csv` |
| Bucket R2 | `hub-csv-knowledge` |
| AI Gateway | `csv_ai_gateway` |
| Token API | Armazenado no Notion (Guia Técnico) e GitHub Secrets |
| Endpoint base | `https://api.cloudflare.com/client/v4/accounts/.../autorag/rags/hub-csv/` |

## Testes Realizados

| Query | Qualidade | Observação |
|---|---|---|
| Quais são os portais do Hub CSV? | Boa | Listou corretamente os 6 portais com URLs |
| Qual o mandato da AxiaCare? | Excelente | Resposta completa com missão, valores e escopo |
| O que é o Signal? | Boa | Identificou como boletim estratégico do Grupo CSV |
| Neurodesenvolvimento | Ruim | Termo ambíguo, sem contexto suficiente |

## Ciclo Virtuoso

O design do sistema cria um ciclo de retroalimentação positiva:

1. Quanto mais conteúdo é adicionado ao Hub, mais rica fica a base vetorial.
2. Quanto mais rica a base, mais útil é a API para os agentes e automações.
3. Quanto mais útil a API, maior o incentivo para alimentar o Hub.

O Hub deixa de ser apenas um repositório de páginas e se torna o **núcleo de conhecimento operacional** do Grupo CSV.


<button class="copy-md-float" id="copy-md-float" onclick="copyPageMd()">
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
Copiar em Markdown
</button>

<script>
function copyPageMd() {
  // Extrai o conteúdo Markdown renderizado da página
  const content = document.querySelector('.vp-doc') || document.querySelector('.VPPage') || document.querySelector('main');
  if (!content) return;

  // Converte o HTML visível para texto limpo (pseudo-Markdown)
  function htmlToMd(el) {
    let md = '';
    const walk = (node) => {
      if (node.nodeType === 3) { md += node.textContent; return; }
      if (node.nodeType !== 1) return;
      const tag = node.tagName.toLowerCase();
      // Pular botões de cópia e nav
      if (node.classList.contains('copy-md-float') || node.classList.contains('copy-btn')) return;
      if (tag === 'style' || tag === 'script' || tag === 'nav' || tag === 'aside') return;

      if (tag === 'h1') { md += '\n# '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h2') { md += '\n## '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h3') { md += '\n### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'h4') { md += '\n#### '; node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'p') { node.childNodes.forEach(walk); md += '\n\n'; return; }
      if (tag === 'br') { md += '\n'; return; }
      if (tag === 'strong' || tag === 'b') { md += '**'; node.childNodes.forEach(walk); md += '**'; return; }
      if (tag === 'em' || tag === 'i') { md += '*'; node.childNodes.forEach(walk); md += '*'; return; }
      if (tag === 'code' && node.parentElement.tagName.toLowerCase() !== 'pre') {
        md += '`' + node.textContent + '`'; return;
      }
      if (tag === 'pre') { md += '\n```\n' + node.textContent + '\n```\n\n'; return; }
      if (tag === 'a') { md += '['; node.childNodes.forEach(walk); md += '](' + (node.href || '') + ')'; return; }
      if (tag === 'li') { md += '- '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'ul' || tag === 'ol') { md += '\n'; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'table') {
        const rows = node.querySelectorAll('tr');
        rows.forEach((row, i) => {
          const cells = row.querySelectorAll('th, td');
          md += '| ' + Array.from(cells).map(c => c.textContent.trim()).join(' | ') + ' |\n';
          if (i === 0) md += '|' + Array.from(cells).map(() => '---').join('|') + '|\n';
        });
        md += '\n';
        return;
      }
      if (tag === 'hr') { md += '\n---\n\n'; return; }
      if (tag === 'blockquote') { md += '> '; node.childNodes.forEach(walk); md += '\n'; return; }
      if (tag === 'img') return; // pular imagens
      if (tag === 'div' || tag === 'section' || tag === 'article' || tag === 'main' || tag === 'span') {
        node.childNodes.forEach(walk);
        return;
      }
      node.childNodes.forEach(walk);
    };
    walk(el);
    return md.replace(/\n{3,}/g, '\n\n').trim();
  }

  const md = htmlToMd(content);
  navigator.clipboard.writeText(md).then(() => {
    const btn = document.getElementById('copy-md-float');
    btn.classList.add('copied');
    const orig = btn.innerHTML;
    btn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copiado!';
    setTimeout(() => { btn.classList.remove('copied'); btn.innerHTML = orig; }, 2500);
  });
}
</script>
