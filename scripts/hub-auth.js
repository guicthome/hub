/**
 * Hub CSV - Portal Authentication System v1.1.0
 * Protege portais de clientes com autenticação por senha.
 * Inclui blur overlay, modal de login, gestão de sessão, toggle de senha.
 *
 * Uso: Adicionar ao final do <body> de cada portal protegido:
 *   <script src="/scripts/hub-auth.js" data-portal="unimed"></script>
 *
 * O atributo data-portal define qual portal está sendo protegido.
 * Portais válidos: unimed, unihealth, icds
 */
(function () {
  'use strict';

  const AUTH_API = 'https://csv-auth.guilherme-thom.workers.dev';
  const STORAGE_PREFIX = 'hub_auth_';

  // Detectar portal a partir do atributo data-portal do script
  const scriptTag = document.currentScript || document.querySelector('script[data-portal]');
  const PORTAL = scriptTag ? scriptTag.getAttribute('data-portal') : null;

  if (!PORTAL) {
    console.warn('[Hub Auth] Atributo data-portal não definido. Autenticação desativada.');
    return;
  }

  const TOKEN_KEY = STORAGE_PREFIX + PORTAL + '_token';
  const EMAIL_KEY = STORAGE_PREFIX + PORTAL + '_email';
  const EXPIRES_KEY = STORAGE_PREFIX + PORTAL + '_expires';

  // ===== Verificar sessão existente =====
  function getStoredSession() {
    try {
      // Tentar localStorage primeiro, depois sessionStorage
      var token = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
      var email = localStorage.getItem(EMAIL_KEY) || sessionStorage.getItem(EMAIL_KEY);
      var expires = localStorage.getItem(EXPIRES_KEY) || sessionStorage.getItem(EXPIRES_KEY);
      if (!token || !expires) return null;
      if (new Date() > new Date(expires)) {
        clearSession();
        return null;
      }
      return { token: token, email: email, expires: expires };
    } catch (e) {
      return null;
    }
  }

  function saveSession(token, email, expiresAt) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(EMAIL_KEY, email);
      localStorage.setItem(EXPIRES_KEY, expiresAt);
    } catch (e) {
      // Fallback: sessionStorage
      sessionStorage.setItem(TOKEN_KEY, token);
      sessionStorage.setItem(EMAIL_KEY, email);
      sessionStorage.setItem(EXPIRES_KEY, expiresAt);
    }
  }

  function clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(EMAIL_KEY);
    localStorage.removeItem(EXPIRES_KEY);
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(EMAIL_KEY);
    sessionStorage.removeItem(EXPIRES_KEY);
  }

  // ===== Verificar token no servidor =====
  async function verifyToken(token) {
    try {
      var resp = await fetch(AUTH_API + '/verify', {
        headers: { 'X-Auth-Token': token },
      });
      var data = await resp.json();
      return data.valid === true;
    } catch (e) {
      // Em caso de erro de rede, permitir acesso se token existe localmente
      return true;
    }
  }

  // ===== Login =====
  async function doLogin(email, password) {
    var resp = await fetch(AUTH_API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ portal: PORTAL, email: email, password: password }),
    });
    var data = await resp.json();
    if (data.success && data.token) {
      saveSession(data.token, email, data.expires_at);
      return { success: true };
    }
    return { success: false, error: data.error || 'Erro ao autenticar' };
  }

  // ===== Logout =====
  async function doLogout() {
    var session = getStoredSession();
    if (session && session.token) {
      try {
        await fetch(AUTH_API + '/logout', {
          method: 'POST',
          headers: { 'X-Auth-Token': session.token },
        });
      } catch (e) { /* ignore */ }
    }
    clearSession();
    showAuthOverlay();
  }

  // ===== Cores por portal =====
  var PORTAL_COLORS = {
    unimed: { primary: '#00995d', gradient: 'linear-gradient(135deg, #00995d, #8baf1f)', light: '#e8f4ee' },
    unihealth: { primary: '#013d19', gradient: 'linear-gradient(135deg, #013d19, #ec7106)', light: '#e8eef5' },
    icds: { primary: '#1B3A5C', gradient: 'linear-gradient(135deg, #1B3A5C, #2a6496)', light: '#e8f0f8' },
  };

  var colors = PORTAL_COLORS[PORTAL] || PORTAL_COLORS.unimed;

  var PORTAL_NAMES = {
    unimed: 'Unimed Governador Valadares',
    unihealth: 'Unihealth Governador Valadares',
    icds: 'ICDS',
  };

  // ===== Criar overlay de autenticação =====
  function showAuthOverlay() {
    // Remover overlay existente se houver
    var existing = document.getElementById('hub-auth-overlay');
    if (existing) existing.remove();

    // Aplicar blur no conteúdo
    document.body.style.overflow = 'hidden';

    var overlay = document.createElement('div');
    overlay.id = 'hub-auth-overlay';
    overlay.innerHTML = '\
      <style>\
        #hub-auth-overlay {\
          position: fixed;\
          top: 0; left: 0; right: 0; bottom: 0;\
          z-index: 99999;\
          display: flex;\
          align-items: center;\
          justify-content: center;\
          backdrop-filter: blur(12px);\
          -webkit-backdrop-filter: blur(12px);\
          background: rgba(255,255,255,0.7);\
          animation: hubAuthFadeIn 0.3s ease;\
        }\
        @keyframes hubAuthFadeIn {\
          from { opacity: 0; }\
          to { opacity: 1; }\
        }\
        .hub-auth-modal {\
          background: white;\
          border-radius: 20px;\
          box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05);\
          width: 100%;\
          max-width: 400px;\
          margin: 20px;\
          overflow: hidden;\
          animation: hubAuthSlideUp 0.4s ease;\
        }\
        @keyframes hubAuthSlideUp {\
          from { opacity: 0; transform: translateY(20px); }\
          to { opacity: 1; transform: translateY(0); }\
        }\
        .hub-auth-header {\
          background: ' + colors.gradient + ';\
          padding: 32px 28px 24px;\
          text-align: center;\
        }\
        .hub-auth-header svg {\
          width: 48px;\
          height: 48px;\
          margin-bottom: 12px;\
        }\
        .hub-auth-header h2 {\
          color: white;\
          font-size: 20px;\
          font-weight: 700;\
          margin: 0 0 4px;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-header p {\
          color: rgba(255,255,255,0.8);\
          font-size: 13px;\
          margin: 0;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-body {\
          padding: 28px;\
        }\
        .hub-auth-field {\
          margin-bottom: 16px;\
        }\
        .hub-auth-field label {\
          display: block;\
          font-size: 13px;\
          font-weight: 600;\
          color: #374151;\
          margin-bottom: 6px;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-field input {\
          width: 100%;\
          padding: 12px 14px;\
          border: 1.5px solid #e5e7eb;\
          border-radius: 10px;\
          font-size: 15px;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
          transition: border-color 0.2s, box-shadow 0.2s;\
          outline: none;\
          box-sizing: border-box;\
        }\
        .hub-auth-field input:focus {\
          border-color: ' + colors.primary + ';\
          box-shadow: 0 0 0 3px ' + colors.primary + '22;\
        }\
        .hub-auth-pw-wrapper {\
          position: relative;\
          display: flex;\
          align-items: center;\
        }\
        .hub-auth-pw-wrapper input {\
          padding-right: 44px;\
        }\
        .hub-auth-pw-toggle {\
          position: absolute;\
          right: 12px;\
          top: 50%;\
          transform: translateY(-50%);\
          background: none;\
          border: none;\
          cursor: pointer;\
          padding: 4px;\
          display: flex;\
          align-items: center;\
          justify-content: center;\
          color: #9ca3af;\
          transition: color 0.2s;\
        }\
        .hub-auth-pw-toggle:hover {\
          color: #374151;\
        }\
        .hub-auth-pw-toggle svg {\
          width: 20px;\
          height: 20px;\
        }\
        .hub-auth-error {\
          display: none;\
          color: #dc2626;\
          font-size: 13px;\
          margin-bottom: 12px;\
          padding: 10px 14px;\
          background: #fef2f2;\
          border-radius: 8px;\
          border: 1px solid #fecaca;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-btn {\
          width: 100%;\
          padding: 13px;\
          background: ' + colors.primary + ';\
          color: white;\
          border: none;\
          border-radius: 10px;\
          font-size: 15px;\
          font-weight: 600;\
          cursor: pointer;\
          transition: all 0.2s;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-btn:hover {\
          filter: brightness(1.1);\
          transform: translateY(-1px);\
          box-shadow: 0 4px 16px ' + colors.primary + '44;\
        }\
        .hub-auth-btn:disabled {\
          opacity: 0.6;\
          cursor: not-allowed;\
          transform: none;\
          box-shadow: none;\
        }\
        .hub-auth-footer {\
          text-align: center;\
          padding: 0 28px 24px;\
          font-size: 12px;\
          color: #9ca3af;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
        }\
        .hub-auth-footer a {\
          color: ' + colors.primary + ';\
          text-decoration: none;\
        }\
        .hub-auth-footer a:hover {\
          text-decoration: underline;\
        }\
        .hub-auth-spinner {\
          display: none;\
          width: 18px;\
          height: 18px;\
          border: 2px solid rgba(255,255,255,0.3);\
          border-top-color: white;\
          border-radius: 50%;\
          animation: hubAuthSpin 0.6s linear infinite;\
          margin: 0 auto;\
        }\
        @keyframes hubAuthSpin {\
          to { transform: rotate(360deg); }\
        }\
      </style>\
      <div class="hub-auth-modal">\
        <div class="hub-auth-header">\
          <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">\
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>\
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>\
            <circle cx="12" cy="16" r="1"/>\
          </svg>\
          <h2>Acesso Restrito</h2>\
          <p>' + (PORTAL_NAMES[PORTAL] || PORTAL) + '</p>\
        </div>\
        <div class="hub-auth-body">\
          <div class="hub-auth-error" id="hub-auth-error"></div>\
          <form id="hub-auth-form" autocomplete="on">\
            <div class="hub-auth-field">\
              <label for="hub-auth-email">E-mail</label>\
              <input type="email" id="hub-auth-email" name="email" placeholder="seu@email.com" required autocomplete="email">\
            </div>\
            <div class="hub-auth-field">\
              <label for="hub-auth-password">Senha de acesso</label>\
              <div class="hub-auth-pw-wrapper">\
                <input type="password" id="hub-auth-password" name="password" placeholder="Senha do portal" required autocomplete="current-password">\
                <button type="button" class="hub-auth-pw-toggle" id="hub-auth-pw-toggle" tabindex="-1" aria-label="Mostrar senha">\
                  <svg id="hub-auth-eye-off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/></svg>\
                  <svg id="hub-auth-eye-on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\
                </button>\
              </div>\
            </div>\
            <button type="submit" class="hub-auth-btn" id="hub-auth-submit">\
              <span id="hub-auth-btn-text">Entrar</span>\
              <div class="hub-auth-spinner" id="hub-auth-spinner"></div>\
            </button>\
          </form>\
        </div>\
        <div class="hub-auth-footer">\
          <a href="/">Voltar ao Hub CSV</a>\
        </div>\
      </div>\
    ';

    document.body.appendChild(overlay);

    // Toggle senha
    var pwToggle = document.getElementById('hub-auth-pw-toggle');
    var pwInput = document.getElementById('hub-auth-password');
    var eyeOff = document.getElementById('hub-auth-eye-off');
    var eyeOn = document.getElementById('hub-auth-eye-on');

    pwToggle.addEventListener('click', function () {
      if (pwInput.type === 'password') {
        pwInput.type = 'text';
        eyeOff.style.display = 'none';
        eyeOn.style.display = 'block';
        pwToggle.setAttribute('aria-label', 'Ocultar senha');
      } else {
        pwInput.type = 'password';
        eyeOff.style.display = 'block';
        eyeOn.style.display = 'none';
        pwToggle.setAttribute('aria-label', 'Mostrar senha');
      }
    });

    // Form handler
    var form = document.getElementById('hub-auth-form');
    var errorEl = document.getElementById('hub-auth-error');
    var submitBtn = document.getElementById('hub-auth-submit');
    var btnText = document.getElementById('hub-auth-btn-text');
    var spinner = document.getElementById('hub-auth-spinner');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var email = document.getElementById('hub-auth-email').value.trim();
      var password = document.getElementById('hub-auth-password').value;

      if (!email || !password) {
        errorEl.textContent = 'Preencha todos os campos.';
        errorEl.style.display = 'block';
        return;
      }

      // Loading state
      submitBtn.disabled = true;
      btnText.style.display = 'none';
      spinner.style.display = 'block';
      errorEl.style.display = 'none';

      try {
        var result = await doLogin(email, password);
        if (result.success) {
          removeAuthOverlay();
        } else {
          errorEl.textContent = result.error;
          errorEl.style.display = 'block';
        }
      } catch (err) {
        errorEl.textContent = 'Erro de conexão. Tente novamente.';
        errorEl.style.display = 'block';
      } finally {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        spinner.style.display = 'none';
      }
    });

    // Focus email field
    setTimeout(function () {
      var emailInput = document.getElementById('hub-auth-email');
      if (emailInput) emailInput.focus();
    }, 400);
  }

  function removeAuthOverlay() {
    var overlay = document.getElementById('hub-auth-overlay');
    if (overlay) {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.3s ease';
      setTimeout(function () {
        overlay.remove();
        document.body.style.overflow = '';
      }, 300);
    }
  }

  // ===== Adicionar botão de logout =====
  function addLogoutButton() {
    var session = getStoredSession();
    if (!session) return;

    // Não duplicar
    if (document.getElementById('hub-auth-logout')) return;

    var btn = document.createElement('div');
    btn.id = 'hub-auth-logout';
    btn.innerHTML = '\
      <style>\
        #hub-auth-logout {\
          position: fixed;\
          top: 16px;\
          right: 16px;\
          z-index: 9998;\
          display: flex;\
          align-items: center;\
          gap: 8px;\
        }\
        @media(max-width:768px) {\
          #hub-auth-logout {\
            position: relative;\
            top: auto;\
            right: auto;\
            justify-content: center;\
            margin: 8px auto 0;\
            z-index: 1;\
          }\
        }\
        .hub-auth-user-badge {\
          display: inline-flex;\
          align-items: center;\
          gap: 6px;\
          padding: 6px 12px;\
          background: rgba(255,255,255,0.95);\
          backdrop-filter: blur(12px);\
          -webkit-backdrop-filter: blur(12px);\
          border: 1px solid rgba(0,0,0,0.1);\
          border-radius: 8px;\
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
          font-size: 12px;\
          color: #6b7280;\
        }\
        .hub-auth-logout-btn {\
          display: inline-flex;\
          align-items: center;\
          gap: 4px;\
          padding: 6px 12px;\
          background: rgba(255,255,255,0.95);\
          backdrop-filter: blur(12px);\
          -webkit-backdrop-filter: blur(12px);\
          border: 1px solid rgba(220,38,38,0.2);\
          border-radius: 8px;\
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);\
          color: #dc2626;\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
          font-size: 12px;\
          font-weight: 600;\
          cursor: pointer;\
          transition: all 0.2s;\
          text-decoration: none;\
        }\
        .hub-auth-logout-btn:hover {\
          background: #dc2626;\
          color: white;\
          border-color: #dc2626;\
        }\
        @media print { #hub-auth-logout { display: none !important; } }\
      </style>\
      <span class="hub-auth-user-badge">\
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>\
        ' + session.email + '\
      </span>\
      <a class="hub-auth-logout-btn" id="hub-auth-logout-btn">\
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>\
        Sair\
      </a>\
    ';
    document.body.appendChild(btn);

    document.getElementById('hub-auth-logout-btn').addEventListener('click', function (e) {
      e.preventDefault();
      doLogout();
      var logoutEl = document.getElementById('hub-auth-logout');
      if (logoutEl) logoutEl.remove();
    });
  }

  // ===== Inicialização =====
  async function init() {
    var session = getStoredSession();

    if (session && session.token) {
      // Verificar token no servidor (em background, não bloquear)
      verifyToken(session.token).then(function (valid) {
        if (!valid) {
          clearSession();
          showAuthOverlay();
          var logoutEl = document.getElementById('hub-auth-logout');
          if (logoutEl) logoutEl.remove();
        }
      });
      // Sessão existe e não expirou localmente: liberar acesso imediato
      addLogoutButton();
      return;
    }

    // Sem sessão válida: mostrar overlay
    showAuthOverlay();
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
