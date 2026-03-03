'''
# Skill: Buscar API Key

**Objetivo:** Recuperar uma chave de API específica da página central de credenciais no Notion.

**Uso:** Quando for necessário obter uma API key para serviços como Resend, Cloudflare, OpenAI, etc., para uso em scripts ou outras automações.

**Parâmetros:**
- `service_name`: O nome do serviço para o qual a chave é necessária (ex: "Resend to Manus | Hub CSV", "API Key do Gateway").

**Fluxo de Execução:**

1.  **Buscar a Página de Chaves:**
    - Utilizar a ferramenta `notion-fetch` para ler o conteúdo da página "API Keys | Grupo CSV" (ID: `315dc8a9-3322-81a8-987d-d8e62270be43`).

2.  **Extrair a Tabela e a Chave:**
    - O conteúdo da página é retornado em formato Markdown.
    - Analisar o texto para encontrar a tabela correspondente ao serviço (ex: "## Resend", "## Backend Hub CSV").
    - Dentro da tabela, localizar a linha onde a primeira coluna (`Nome`) corresponde ao `service_name` solicitado.
    - Extrair o valor da segunda coluna (`Chave`) da linha correspondente.

3.  **Retornar a Chave:**
    - A chave extraída é o resultado da skill.

**Exemplo de Implementação (Python):**

```python
import re
import subprocess

def get_api_key(service_name: str) -> str | None:
    # 1. Fetch Notion page content
    page_id = "315dc8a9-3322-81a8-987d-d8e62270be43"
    cmd = f'''manus-mcp-cli tool call notion-fetch --server notion --input '{{"id": "{page_id}"}}''''
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)

    if result.returncode != 0:
        print("Erro ao buscar a página do Notion.")
        return None

    # Extract content from the result file
    output = result.stdout
    match = re.search(r"saved to:\s*(\S+)", output)
    if not match:
        print("Não foi possível encontrar o caminho do arquivo de resultado.")
        return None

    with open(match.group(1), 'r') as f:
        data = json.load(f)
    
    content = data.get('text', '')

    # 2. Parse the content to find the key
    lines = content.split('\n')
    in_table = False
    for line in lines:
        if line.strip().startswith('|'):
            columns = [c.strip() for c in line.strip().split('|') if c.strip()]
            if len(columns) > 1 and columns[0] == service_name:
                return columns[1] # Retorna a chave da segunda coluna
    
    return None

# Exemplo de uso:
# resend_key = get_api_key("Resend to Manus | Hub CSV")
# gateway_key = get_api_key("API Key do Gateway")
```

**Considerações de Segurança:**
- A chave retornada é informação sensível.
- Não a exponha em logs ou outputs de texto. Utilize-a diretamente nas chamadas de API subsequentes.
- Se a skill falhar, o fluxo deve ser interrompido para evitar o uso de chaves incorretas ou nulas.
'''
