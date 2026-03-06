/**
 * Hub CSV - Portal Authentication System v2.0.0
 * Suporta autenticação individual (parceiros) e fixa (empresas)
 * Inclui blur overlay, modal de login/registro, gestão de sessão, toggle de senha
 *
 * Uso: Adicionar ao final do <body> de cada portal protegido:
 *   <script src="/scripts/hub-auth-v2.js" data-portal="unimed"></script>
 *
 * Portais de Parceiros (autenticação individual):
 *   - unimed, unihealth, icds
 *
 * Portais de Empresas (senha fixa compartilhada):
 *   - axiacare, thera, medvalor
 */
(function () {
  'use strict';

  const AUTH_API = 'https://csv-auth.guilherme-thom.workers.dev';
  const STORAGE_PREFIX = 'hub_auth_';

  // Detectar portal a partir do atributo data-portal do script
  const scriptTag = document.currentScript || document.querySelector('script[data-portal]');
  const PORTAL = scriptTag ? scriptTag.getAttribute('data-portal') : null;

  if (!PORTAL) {
    console.warn('[Hub Auth v2] Atributo data-portal não definido. Autenticação desativada.');
    return;
  }

  const TOKEN_KEY = STORAGE_PREFIX + PORTAL + '_token';
  const EMAIL_KEY = STORAGE_PREFIX + PORTAL + '_email';
  const EXPIRES_KEY = STORAGE_PREFIX + PORTAL + '_expires';

  // Tenants de parceiros (autenticação individual)
  const PARTNER_TENANTS = ['unimed', 'unihealth', 'icds'];
  // Tenants de empresas (senha fixa)
  const COMPANY_TENANTS = ['axiacare', 'thera', 'medvalor'];

  const IS_PARTNER = PARTNER_TENANTS.includes(PORTAL);
  const IS_COMPANY = COMPANY_TENANTS.includes(PORTAL);

  // ===== Verificar sessão existente =====
  function getStoredSession() {
    try {
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
      return true; // Em caso de erro de rede, permitir acesso
    }
  }

  // ===== Login (Individual ou Fixa) =====
  async function doLogin(email, password) {
    var payload = { portal: PORTAL };
    
    if (IS_PARTNER) {
      payload.email = email;
      payload.password = password;
    } else if (IS_COMPANY) {
      payload.email = 'shared_' + PORTAL; // Email fictício para empresas
      payload.password = password;
    }

    var resp = await fetch(AUTH_API + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    var data = await resp.json();
    if (data.success && data.token) {
      saveSession(data.token, email || 'shared_' + PORTAL, data.expires_at);
      return { success: true };
    }
    return { success: false, error: data.error || 'Erro ao autenticar' };
  }

  // ===== Request Access (Apenas Parceiros) =====
  async function doRequestAccess(email, name, tenant_id) {
    var resp = await fetch(AUTH_API + '/request-access', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, name: name, tenant_id: tenant_id }),
    });
    var data = await resp.json();
    if (data.success) {
      return { success: true };
    }
    return { success: false, error: data.error || 'Erro ao solicitar acesso' };
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
    axiacare: { primary: '#196396', gradient: 'linear-gradient(135deg, #196396, #2DBF7F)', light: '#e8f4fc' },
    thera: { primary: '#6B5B95', gradient: 'linear-gradient(135deg, #6B5B95, #7c3aed)', light: '#f3e8ff' },
    medvalor: { primary: '#ea580c', gradient: 'linear-gradient(135deg, #ea580c, #f97316)', light: '#fff7ed' },
  };

  var colors = PORTAL_COLORS[PORTAL] || PORTAL_COLORS.unimed;

  var PORTAL_NAMES = {
    unimed: 'Unimed Governador Valadares',
    unihealth: 'Unihealth Governador Valadares',
    icds: 'ICDS',
    axiacare: 'AxiaCare',
    thera: 'TheraTech',
    medvalor: 'MedValor',
  };

  // ===== Criar overlay de autenticação =====
  function showAuthOverlay() {
    var existing = document.getElementById('hub-auth-overlay');
    if (existing) existing.remove();

    document.body.style.overflow = 'hidden';

    var overlay = document.createElement('div');
    overlay.id = 'hub-auth-overlay';
    
    var loginMode = 'login'; // 'login' ou 'request'

    var htmlContent = '\
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
        .hub-auth-success {\
          display: none;\
          color: #059669;\
          font-size: 13px;\
          margin-bottom: 12px;\
          padding: 10px 14px;\
          background: #f0fdf4;\
          border-radius: 8px;\
          border: 1px solid #86efac;\
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
        .hub-auth-tabs {\
          display: flex;\
          gap: 12px;\
          margin-bottom: 20px;\
          border-bottom: 1px solid #e5e7eb;\
        }\
        .hub-auth-tab {\
          flex: 1;\
          padding: 12px;\
          background: none;\
          border: none;\
          border-bottom: 2px solid transparent;\
          color: #6b7280;\
          font-weight: 600;\
          cursor: pointer;\
          font-size: 14px;\
          transition: all 0.2s;\
        }\
        .hub-auth-tab.active {\
          color: ' + colors.primary + ';\
          border-bottom-color: ' + colors.primary + ';\
        }\
        .hub-auth-tab-content {\
          display: none;\
        }\
        .hub-auth-tab-content.active {\
          display: block;\
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
          cursor: pointer;\
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
          animation: hubAuthSpin 0.8s linear infinite;\
          margin-right: 8px;\
        }\
        @keyframes hubAuthSpin {\
          to { transform: rotate(360deg); }\
        }\
        .hub-auth-btn.loading {\
          display: flex;\
          align-items: center;\
          justify-content: center;\
        }\
        .hub-auth-btn.loading .hub-auth-spinner {\
          display: inline-block;\
        }\
        @media print { #hub-auth-overlay { display: none !important; } }\
      </style>\
      <div class="hub-auth-modal">\
        <div class="hub-auth-header">\
          <h2>Acesso Restrito</h2>\
          <p>' + PORTAL_NAMES[PORTAL] + '</p>\
        </div>\
        <div class="hub-auth-body">' + (IS_PARTNER ? '\
          <div class="hub-auth-tabs">\
            <button class="hub-auth-tab active" data-tab="login">Login</button>\
            <button class="hub-auth-tab" data-tab="request">Solicitar Acesso</button>\
          </div>\
          <div class="hub-auth-tab-content active" data-tab="login">\
            <div class="hub-auth-error" id="hub-auth-error"></div>\
            <div class="hub-auth-field">\
              <label>E-mail</label>\
              <input type="email" id="hub-auth-email" placeholder="seu@email.com">\
            </div>\
            <div class="hub-auth-field">\
              <label>Senha</label>\
              <div class="hub-auth-pw-wrapper">\
                <input type="password" id="hub-auth-password" placeholder="••••••••">\
                <button class="hub-auth-pw-toggle" id="hub-auth-pw-toggle" type="button">\
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\
                </button>\
              </div>\
            </div>\
            <button class="hub-auth-btn" id="hub-auth-login-btn">\
              <span class="hub-auth-spinner"></span>\
              <span>Entrar</span>\
            </button>\
          </div>\
          <div class="hub-auth-tab-content" data-tab="request">\
            <div class="hub-auth-error" id="hub-auth-error-request"></div>\
            <div class="hub-auth-success" id="hub-auth-success-request"></div>\
            <div class="hub-auth-field">\
              <label>Nome Completo</label>\
              <input type="text" id="hub-auth-request-name" placeholder="Seu Nome">\
            </div>\
            <div class="hub-auth-field">\
              <label>E-mail</label>\
              <input type="email" id="hub-auth-request-email" placeholder="seu@email.com">\
            </div>\
            <button class="hub-auth-btn" id="hub-auth-request-btn">\
              <span class="hub-auth-spinner"></span>\
              <span>Solicitar Acesso</span>\
            </button>\
          </div>\
        ' : '\
          <div class="hub-auth-error" id="hub-auth-error"></div>\
          <div class="hub-auth-field">\
            <label>Senha</label>\
            <div class="hub-auth-pw-wrapper">\
              <input type="password" id="hub-auth-password" placeholder="••••••••">\
              <button class="hub-auth-pw-toggle" id="hub-auth-pw-toggle" type="button">\
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>\
              </button>\
            </div>\
          </div>\
          <button class="hub-auth-btn" id="hub-auth-login-btn">\
            <span class="hub-auth-spinner"></span>\
            <span>Entrar</span>\
          </button>\
        ') + '\
        </div>\
      </div>\
    ';

    overlay.innerHTML = htmlContent;
    document.body.appendChild(overlay);

    // Event listeners para tabs (apenas parceiros)
    if (IS_PARTNER) {
      var tabs = overlay.querySelectorAll('.hub-auth-tab');
      tabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
          var tabName = this.getAttribute('data-tab');
          tabs.forEach(function(t) { t.classList.remove('active'); });
          overlay.querySelectorAll('.hub-auth-tab-content').forEach(function(c) { c.classList.remove('active'); });
          this.classList.add('active');
          overlay.querySelector('[data-tab="' + tabName + '"]').classList.add('active');
        });
      });
    }

    // Toggle de senha
    var pwToggle = overlay.querySelector('#hub-auth-pw-toggle');
    var pwInput = overlay.querySelector('#hub-auth-password');
    if (pwToggle && pwInput) {
      pwToggle.addEventListener('click', function(e) {
        e.preventDefault();
        pwInput.type = pwInput.type === 'password' ? 'text' : 'password';
      });
    }

    // Login
    var loginBtn = overlay.querySelector('#hub-auth-login-btn');
    if (loginBtn) {
      loginBtn.addEventListener('click', async function() {
        var errorEl = overlay.querySelector('#hub-auth-error');
        errorEl.style.display = 'none';
        errorEl.textContent = '';

        var email = overlay.querySelector('#hub-auth-email');
        var password = overlay.querySelector('#hub-auth-password');

        if (IS_PARTNER && !email.value) {
          errorEl.textContent = 'Por favor, preencha o e-mail';
          errorEl.style.display = 'block';
          return;
        }

        if (!password.value) {
          errorEl.textContent = 'Por favor, preencha a senha';
          errorEl.style.display = 'block';
          return;
        }

        loginBtn.disabled = true;
        loginBtn.classList.add('loading');

        var result = await doLogin(email ? email.value : 'shared_' + PORTAL, password.value);
        if (result.success) {
          overlay.remove();
          document.body.style.overflow = 'auto';
          addLogoutButton();
        } else {
          errorEl.textContent = result.error;
          errorEl.style.display = 'block';
          loginBtn.disabled = false;
          loginBtn.classList.remove('loading');
        }
      });
    }

    // Request Access (apenas parceiros)
    if (IS_PARTNER) {
      var requestBtn = overlay.querySelector('#hub-auth-request-btn');
      if (requestBtn) {
        requestBtn.addEventListener('click', async function() {
          var errorEl = overlay.querySelector('#hub-auth-error-request');
          var successEl = overlay.querySelector('#hub-auth-success-request');
          errorEl.style.display = 'none';
          successEl.style.display = 'none';

          var name = overlay.querySelector('#hub-auth-request-name');
          var email = overlay.querySelector('#hub-auth-request-email');

          if (!name.value) {
            errorEl.textContent = 'Por favor, preencha o nome';
            errorEl.style.display = 'block';
            return;
          }

          if (!email.value) {
            errorEl.textContent = 'Por favor, preencha o e-mail';
            errorEl.style.display = 'block';
            return;
          }

          requestBtn.disabled = true;
          requestBtn.classList.add('loading');

          var result = await doRequestAccess(email.value, name.value, PORTAL);
          if (result.success) {
            successEl.innerHTML = 'Solicitação enviada com sucesso! Você receberá um e-mail quando sua solicitação for aprovada.<br><a href="#" id="hub-auth-back-to-login" style="display:inline-block;margin-top:10px;color:' + colors.primary + ';font-weight:600;text-decoration:none;font-size:14px;">Voltar ao Login</a>';
            successEl.style.display = 'block';
            name.value = '';
            email.value = '';
            requestBtn.style.display = 'none';
            overlay.querySelectorAll('#hub-auth-request-name, #hub-auth-request-email').forEach(function(el) { el.closest('.hub-auth-field').style.display = 'none'; });
            var backLink = overlay.querySelector('#hub-auth-back-to-login');
            if (backLink) {
              backLink.addEventListener('click', function(e) {
                e.preventDefault();
                successEl.style.display = 'none';
                requestBtn.style.display = '';
                requestBtn.disabled = false;
                requestBtn.classList.remove('loading');
                overlay.querySelectorAll('#hub-auth-request-name, #hub-auth-request-email').forEach(function(el) { el.closest('.hub-auth-field').style.display = ''; });
                var loginTab = overlay.querySelector('.hub-auth-tab[data-tab="login"]');
                if (loginTab) loginTab.click();
              });
            }
            setTimeout(function() {
              requestBtn.disabled = false;
              requestBtn.classList.remove('loading');
            }, 2000);
          } else {
            errorEl.textContent = result.error;
            errorEl.style.display = 'block';
            requestBtn.disabled = false;
            requestBtn.classList.remove('loading');
          }
        });
      }
    }

    // Enter key para login
    var passwordInput = overlay.querySelector('#hub-auth-password');
    if (passwordInput) {
      passwordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
          loginBtn.click();
        }
      });
    }
  }

  function addLogoutButton() {
    var session = getStoredSession();
    if (!session) return;

    var existing = document.getElementById('hub-auth-logout');
    if (existing) return;

    var btn = document.createElement('div');
    btn.id = 'hub-auth-logout';
    btn.innerHTML = '\
      <style>\
        #hub-auth-logout {\
          position: fixed;\
          top: 20px;\
          right: 20px;\
          z-index: 99998;\
          display: flex;\
          align-items: center;\
          gap: 12px;\
          padding: 8px 16px;\
          background: white;\
          border-radius: 10px;\
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);\
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
          font-size: 13px;\
        }\
        .hub-auth-user-badge {\
          display: flex;\
          align-items: center;\
          gap: 6px;\
          color: #374151;\
          font-weight: 500;\
        }\
        .hub-auth-logout-btn {\
          display: flex;\
          align-items: center;\
          gap: 6px;\
          padding: 6px 12px;\
          background: white;\
          border: 1px solid #e5e7eb;\
          border-radius: 6px;\
          color: #6b7280;\
          cursor: pointer;\
          transition: all 0.2s;\
          text-decoration: none;\
          font-size: 13px;\
          font-weight: 500;\
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
      verifyToken(session.token).then(function (valid) {
        if (!valid) {
          clearSession();
          showAuthOverlay();
          var logoutEl = document.getElementById('hub-auth-logout');
          if (logoutEl) logoutEl.remove();
        }
      });
      addLogoutButton();
      return;
    }

    showAuthOverlay();
  }

  // Executar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
