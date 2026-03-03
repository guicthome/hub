/**
 * csv-email - Endpoint Genérico de E-mail
 * Hub CSV Backend | Cloudflare Worker
 *
 * Envia e-mails via Resend para qualquer ferramenta do Hub.
 * Suporta texto simples, HTML e anexos em base64.
 *
 * POST /
 * Body: {
 *   to: string | string[],
 *   subject: string,
 *   html?: string,
 *   text?: string,
 *   from_name?: string,
 *   from_email?: string,
 *   reply_to?: string,
 *   cc?: string | string[],
 *   bcc?: string | string[],
 *   tags?: {name: string, value: string}[],
 *   attachments?: {
 *     filename: string,
 *     content: string,   // base64
 *     content_type?: string
 *   }[]
 * }
 */

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400'
};

const ALLOWED_FROM_DOMAINS = ['mail.grupocsv.com'];
const MAX_RECIPIENTS = 10;
const MAX_ATTACHMENT_SIZE_MB = 10;

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: CORS_HEADERS });
  }
  if (request.method !== 'POST') {
    return jsonResponse(405, { error: 'Método não permitido. Use POST.' });
  }

  try {
    const body = await request.json();

    if (!body.to) return jsonResponse(400, { error: 'Campo "to" é obrigatório.' });
    if (!body.subject) return jsonResponse(400, { error: 'Campo "subject" é obrigatório.' });
    if (!body.html && !body.text) return jsonResponse(400, { error: 'É necessário informar "html" ou "text".' });

    const to = Array.isArray(body.to) ? body.to : [body.to];
    const cc = body.cc ? (Array.isArray(body.cc) ? body.cc : [body.cc]) : undefined;
    const bcc = body.bcc ? (Array.isArray(body.bcc) ? body.bcc : [body.bcc]) : undefined;

    const totalRecipients = to.length + (cc ? cc.length : 0) + (bcc ? bcc.length : 0);
    if (totalRecipients > MAX_RECIPIENTS) {
      return jsonResponse(400, { error: `Limite de ${MAX_RECIPIENTS} destinatários excedido (${totalRecipients}).` });
    }

    const allEmails = [...to, ...(cc || []), ...(bcc || [])];
    for (const email of allEmails) {
      if (!isValidEmail(email)) return jsonResponse(400, { error: `E-mail inválido: ${email}` });
    }

    const fromName = body.from_name || 'Hub CSV';
    const fromEmail = body.from_email || 'hub@mail.grupocsv.com';
    const fromDomain = fromEmail.split('@')[1];
    if (!ALLOWED_FROM_DOMAINS.includes(fromDomain)) {
      return jsonResponse(400, { error: `Domínio "${fromDomain}" não autorizado.` });
    }

    // Validar anexos
    if (body.attachments && Array.isArray(body.attachments)) {
      for (const att of body.attachments) {
        if (!att.filename) return jsonResponse(400, { error: 'Cada anexo precisa de "filename".' });
        if (!att.content) return jsonResponse(400, { error: `Anexo "${att.filename}" sem "content" (base64).` });
        // Verificar tamanho aproximado (base64 ~= 4/3 do binário)
        const approxBytes = (att.content.length * 3) / 4;
        if (approxBytes > MAX_ATTACHMENT_SIZE_MB * 1024 * 1024) {
          return jsonResponse(400, { error: `Anexo "${att.filename}" excede ${MAX_ATTACHMENT_SIZE_MB}MB.` });
        }
      }
    }

    const resendPayload = {
      from: `${fromName} <${fromEmail}>`,
      to,
      subject: body.subject
    };

    if (body.html) resendPayload.html = body.html;
    if (body.text) resendPayload.text = body.text;
    if (body.reply_to) resendPayload.reply_to = body.reply_to;
    if (cc) resendPayload.cc = cc;
    if (bcc) resendPayload.bcc = bcc;
    if (body.tags) resendPayload.tags = body.tags;
    if (body.attachments && body.attachments.length > 0) {
      resendPayload.attachments = body.attachments.map(att => ({
        filename: att.filename,
        content: att.content,
        ...(att.content_type ? { content_type: att.content_type } : {})
      }));
    }

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(resendPayload)
    });

    const resendData = await resendResponse.json();

    if (!resendResponse.ok) {
      return jsonResponse(502, { error: 'Falha no envio do e-mail.', details: resendData });
    }

    return jsonResponse(200, {
      success: true,
      message: `E-mail enviado com sucesso para ${to.length} destinatário(s).`,
      id: resendData.id,
      to,
      subject: body.subject,
      attachments: body.attachments ? body.attachments.length : 0
    });

  } catch (err) {
    return jsonResponse(500, { error: 'Erro interno do servidor.', message: err.message });
  }
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function jsonResponse(status, data) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' }
  });
}
