/**
 * deck-vision — Processador de Prints e Texto para o Deck™
 * Hub CSV Backend | Cloudflare Worker (ES Module)
 *
 * Recebe imagem (base64) OU texto via POST, envia para GPT-4o
 * via AI Gateway, e retorna JSON estruturado para criar um card no Deck.
 *
 * POST /
 * Body: { image: string (base64) }          — modo imagem
 * Body: { text: string }                    — modo texto
 * Body: { image: string, text: string }     — ambos (imagem + contexto)
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

const SYSTEM_PROMPT = `Você é um assistente que transforma informações brutas (textos copiados de chats, e-mails, relatórios, ou capturas de tela) em cards de monitoramento ativo para um painel executivo chamado Deck™.

Regras para gerar o card:

TÍTULO (campo "title"):
- Máximo 60 caracteres.
- Formato: "{Contexto/Plataforma} — {estado real da situação}".
- Identifique a plataforma ou projeto mencionado e o estado atual (pendente, em andamento, aguardando revisão, concluído, etc.).
- NÃO copie texto literalmente. Interprete e resuma.
- Use português do Brasil com acentuação correta.

DESCRIÇÃO (campo "notes"):
- Máximo 280 caracteres.
- Separe o que já foi feito do que está pendente.
- Registre o estado crítico: o que precisa de ação do usuário.
- Seja objetivo e direto. Sem introduções, sem floreios.
- Use português do Brasil com acentuação correta.

PLATAFORMA (campo "platform"):
- Identifique de onde veio o conteúdo ou qual ferramenta está envolvida.
- Escolha EXATAMENTE uma: ${PLATFORMS.join(', ')}.
- Se não reconhecer, use "outro".

CONFIANÇA (campo "confidence"):
- De 0.0 a 1.0, quão confiante você está na interpretação.

Responda APENAS com JSON válido, sem markdown, sem explicações:
{"title": "...", "platform": "...", "notes": "...", "confidence": 0.0}`;

const IMAGE_INSTRUCTION = `Analise esta captura de tela e gere um card de monitoramento ativo seguindo as regras do sistema.`;

const TEXT_INSTRUCTION = `Analise o texto a seguir (copiado de um chat, e-mail ou relatório) e gere um card de monitoramento ativo seguindo as regras do sistema.

Texto:
`;

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
      const hasImage = !!body.image;
      const hasText = !!body.text;

      if (!hasImage && !hasText) {
        return jsonResponse(400, { error: 'Envie "image" (base64) e/ou "text" (string).' });
      }

      // Construir mensagem do usuário
      const userContent = [];

      if (hasText) {
        userContent.push({
          type: 'text',
          text: hasImage
            ? `${IMAGE_INSTRUCTION}\n\nContexto adicional:\n${body.text.substring(0, 4000)}`
            : `${TEXT_INSTRUCTION}${body.text.substring(0, 4000)}`
        });
      }

      if (hasImage) {
        let imageUrl = body.image;
        if (!imageUrl.startsWith('data:')) {
          imageUrl = `data:image/png;base64,${imageUrl}`;
        }

        const base64Part = imageUrl.split(',')[1] || imageUrl;
        const approxBytes = (base64Part.length * 3) / 4;
        if (approxBytes > 4 * 1024 * 1024) {
          return jsonResponse(400, { error: 'Imagem excede 4MB. Reduza a resolução.' });
        }

        if (!hasText) {
          userContent.push({ type: 'text', text: IMAGE_INSTRUCTION });
        }

        userContent.push({
          type: 'image_url',
          image_url: { url: imageUrl, detail: 'low' }
        });
      }

      const aiResponse = await fetch(
        'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: SYSTEM_PROMPT },
              { role: 'user', content: userContent }
            ],
            max_tokens: 400,
            temperature: 0.15
          })
        }
      );

      if (!aiResponse.ok) {
        const errData = await aiResponse.text();
        return jsonResponse(502, { error: 'Falha na API.', details: errData });
      }

      const aiData = await aiResponse.json();
      const content = aiData.choices?.[0]?.message?.content;

      if (!content) {
        return jsonResponse(502, { error: 'Resposta vazia da API.' });
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
        const detectSource = (body.text || '') + ' ' + (parsed.title || '') + ' ' + (parsed.notes || '');
        parsed.platform = detectPlatformFromText(detectSource);
      }

      const result = {
        title: (parsed.title || 'Sem título').substring(0, 80),
        platform: parsed.platform || 'outro',
        notes: (parsed.notes || '').substring(0, 400),
        confidence: Math.min(1, Math.max(0, parsed.confidence || 0.5))
      };

      return jsonResponse(200, result);

    } catch (err) {
      return jsonResponse(500, { error: 'Erro interno do servidor.', message: err.message });
    }
  }
};
