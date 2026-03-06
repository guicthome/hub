/**
 * deck-vision — Processador de Prints para o Deck™
 * Hub CSV Backend | Cloudflare Worker (ES Module)
 *
 * Recebe uma imagem (base64) via POST, envia para a API de visão
 * do OpenAI (GPT-4o) via AI Gateway, e retorna um JSON estruturado
 * com título, plataforma provável e descrição para criar um card no Deck.
 *
 * POST /
 * Body: { image: string (base64 data URL ou raw base64) }
 *
 * Response: {
 *   title: string,
 *   platform: string,
 *   notes: string,
 *   confidence: number
 * }
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400'
};

const PLATFORMS = [
  'manus', 'chatgpt', 'claude', 'claude-cowork', 'anti-gravity',
  'chrome', 'email', 'whatsapp', 'outro'
];

const PLATFORM_HINTS = {
  'manus': ['manus', 'manus.im'],
  'chatgpt': ['chatgpt', 'openai', 'gpt'],
  'claude': ['claude', 'anthropic', 'claude.ai'],
  'claude-cowork': ['claude cowork', 'cowork'],
  'anti-gravity': ['antigravity', 'anti-gravity', 'anti gravity'],
  'chrome': ['chrome', 'google', 'navegador', 'browser', 'aba', 'tab'],
  'email': ['email', 'e-mail', 'gmail', 'outlook', 'inbox', 'caixa de entrada'],
  'whatsapp': ['whatsapp', 'wpp', 'zap', 'mensagem']
};

function detectPlatformFromText(text) {
  const lower = text.toLowerCase();
  for (const [platform, keywords] of Object.entries(PLATFORM_HINTS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) return platform;
    }
  }
  return 'outro';
}

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}

export default {
  async fetch(request, env) {
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }
    if (request.method !== 'POST') {
      return jsonResponse(405, { error: 'Método não permitido. Use POST.' });
    }

    try {
      const body = await request.json();

      if (!body.image) {
        return jsonResponse(400, { error: 'Campo "image" é obrigatório (base64).' });
      }

      let imageUrl = body.image;
      if (!imageUrl.startsWith('data:')) {
        imageUrl = `data:image/png;base64,${imageUrl}`;
      }

      const base64Part = imageUrl.split(',')[1] || imageUrl;
      const approxBytes = (base64Part.length * 3) / 4;
      if (approxBytes > 4 * 1024 * 1024) {
        return jsonResponse(400, { error: 'Imagem excede 4MB. Reduza a resolução.' });
      }

      const prompt = `Analise esta captura de tela e extraia as seguintes informações para criar um card de contexto ativo:

1. **title**: Um título curto e claro (máximo 60 caracteres) que descreva o que está acontecendo na tela. Não copie texto literalmente — interprete e resuma o contexto principal. Use português do Brasil.

2. **platform**: Identifique a plataforma/ferramenta visível na tela. Escolha EXATAMENTE uma destas opções: ${PLATFORMS.join(', ')}. Se não reconhecer, use "outro".

3. **notes**: Uma descrição breve (máximo 200 caracteres) do contexto visível. O que o usuário estava fazendo? Qual o estado atual? Use português do Brasil.

4. **confidence**: De 0.0 a 1.0, quão confiante você está na interpretação.

Responda APENAS com JSON válido, sem markdown, sem explicações:
{"title": "...", "platform": "...", "notes": "...", "confidence": 0.0}`;

      const aiResponse = await fetch(
        'https://gateway.ai.cloudflare.com/v1/da0c29123f448f3c3892f784cd9f7cac/csv_ai_gateway/openai/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              {
                role: 'user',
                content: [
                  { type: 'text', text: prompt },
                  {
                    type: 'image_url',
                    image_url: { url: imageUrl, detail: 'low' }
                  }
                ]
              }
            ],
            max_tokens: 300,
            temperature: 0.2
          })
        }
      );

      if (!aiResponse.ok) {
        const errData = await aiResponse.text();
        return jsonResponse(502, { error: 'Falha na API de visão.', details: errData });
      }

      const aiData = await aiResponse.json();
      const content = aiData.choices?.[0]?.message?.content;

      if (!content) {
        return jsonResponse(502, { error: 'Resposta vazia da API de visão.' });
      }

      let parsed;
      try {
        const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
        parsed = JSON.parse(cleaned);
      } catch (e) {
        return jsonResponse(502, {
          error: 'Resposta da API não é JSON válido.',
          raw: content
        });
      }

      if (!PLATFORMS.includes(parsed.platform)) {
        parsed.platform = detectPlatformFromText(parsed.title + ' ' + parsed.notes);
      }

      const result = {
        title: (parsed.title || 'Sem título').substring(0, 80),
        platform: parsed.platform || 'outro',
        notes: (parsed.notes || '').substring(0, 300),
        confidence: Math.min(1, Math.max(0, parsed.confidence || 0.5))
      };

      return jsonResponse(200, result);

    } catch (err) {
      return jsonResponse(500, { error: 'Erro interno do servidor.', message: err.message });
    }
  }
};
