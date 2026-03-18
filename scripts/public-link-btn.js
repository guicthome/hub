/**
 * Hub CSV - Public Link Button v1.0.0
 * Botao admin-only que exibe o link publico de uma pagina de portal.
 *
 * Uso: Adicionar ao final do <body> de qualquer pagina de portal:
 *   <script src="/scripts/public-link-btn.js" data-page="onco.html"></script>
 *
 * Comportamento:
 *   - Verifica se o usuario e admin (token hub_auth_admin_token no localStorage)
 *   - Se NAO e admin: nao renderiza nada
 *   - Se e admin: renderiza botao fixo no canto superior direito
 *   - Ao clicar: consulta /p/registry.json e exibe link publico ou aviso
 *
 * O atributo data-page deve corresponder ao campo origin_page no registry.json.
 */
(function () {
  'use strict';

  // ===== Detectar pagina =====
  var scriptTag = document.currentScript || document.querySelector('script[data-page]');
  var PAGE = scriptTag ? scriptTag.getAttribute('data-page') : null;

  if (!PAGE) {
    console.warn('[Public Link Btn] Atributo data-page nao definido.');
    return;
  }

  // ===== Verificar admin =====
  var TOKEN_KEY = 'hub_auth_admin_token';
  var EXPIRES_KEY = 'hub_auth_admin_expires';

  function isAdmin() {
    try {
      var token = localStorage.getItem(TOKEN_KEY);
      var expires = localStorage.getItem(EXPIRES_KEY);
      if (!token || !expires) return false;
      return new Date() < new Date(expires);
    } catch (e) {
      return false;
    }
  }

  if (!isAdmin()) return;

  // ===== Injetar CSS =====
  var style = document.createElement('style');
  style.textContent = '\
#plb-trigger {\
  position: fixed; top: 20px; right: 200px; z-index: 99997;\
  display: flex; align-items: center; justify-content: center;\
  width: 36px; height: 36px; border-radius: 10px;\
  background: rgba(255,255,255,0.95); backdrop-filter: blur(12px);\
  -webkit-backdrop-filter: blur(12px);\
  border: 1px solid rgba(0,0,0,0.1);\
  box-shadow: 0 2px 12px rgba(0,0,0,0.08);\
  cursor: pointer; transition: all 0.2s; color: #196396;\
}\
#plb-trigger:hover {\
  background: #196396; color: #fff;\
  box-shadow: 0 4px 20px rgba(25,99,150,0.3); transform: translateY(-1px);\
}\
#plb-trigger svg { width: 18px; height: 18px; }\
#plb-popover {\
  display: none; position: fixed; top: 62px; right: 200px; z-index: 99997;\
  background: #fff; border-radius: 12px; padding: 16px 20px;\
  box-shadow: 0 8px 32px rgba(0,0,0,0.15); border: 1px solid #e5e7eb;\
  min-width: 280px; max-width: 380px;\
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;\
  animation: plbFadeIn 0.2s ease;\
}\
@keyframes plbFadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }\
#plb-popover.visible { display: block; }\
.plb-title {\
  font-size: 13px; font-weight: 700; color: #0f2b46; margin-bottom: 8px;\
}\
.plb-url {\
  font-size: 12px; color: #196396; word-break: break-all;\
  background: #f0f7ff; padding: 8px 10px; border-radius: 8px;\
  border: 1px solid #dbeafe; margin-bottom: 10px;\
}\
.plb-copy {\
  display: inline-flex; align-items: center; gap: 6px;\
  padding: 6px 14px; background: #196396; color: #fff;\
  border: none; border-radius: 8px; font-size: 12px; font-weight: 600;\
  cursor: pointer; transition: all 0.2s;\
}\
.plb-copy:hover { background: #0f2b46; }\
.plb-copy.copied { background: #2DBF7F; }\
.plb-none {\
  font-size: 13px; color: #6b7280; line-height: 1.5;\
}\
@media print { #plb-trigger, #plb-popover { display: none !important; } }\
@media (max-width: 768px) {\
  #plb-trigger { right: auto; left: 60px; top: 16px; width: 32px; height: 32px; }\
  #plb-popover { right: 12px; left: 12px; top: 56px; min-width: auto; }\
}\
';
  document.head.appendChild(style);

  // ===== Criar botao =====
  var trigger = document.createElement('button');
  trigger.id = 'plb-trigger';
  trigger.title = 'Link publico';
  trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
  document.body.appendChild(trigger);

  // ===== Criar popover =====
  var popover = document.createElement('div');
  popover.id = 'plb-popover';
  popover.innerHTML = '<div class="plb-title">Carregando...</div>';
  document.body.appendChild(popover);

  // ===== Estado =====
  var registryLoaded = false;
  var matchedPage = null;

  // ===== Fechar popover ao clicar fora =====
  document.addEventListener('click', function (e) {
    if (!popover.contains(e.target) && e.target !== trigger && !trigger.contains(e.target)) {
      popover.classList.remove('visible');
    }
  });

  // ===== Toggle popover =====
  trigger.addEventListener('click', function (e) {
    e.stopPropagation();

    if (popover.classList.contains('visible')) {
      popover.classList.remove('visible');
      return;
    }

    popover.classList.add('visible');

    if (registryLoaded) return;

    // Carregar registry.json
    fetch('/p/registry.json')
      .then(function (resp) { return resp.json(); })
      .then(function (data) {
        registryLoaded = true;
        var pages = data.pages || [];
        matchedPage = null;

        for (var i = 0; i < pages.length; i++) {
          if (pages[i].origin_page === PAGE && pages[i].status === 'active') {
            matchedPage = pages[i];
            break;
          }
        }

        if (matchedPage) {
          popover.innerHTML = '\
<div class="plb-title">' + escHTML(matchedPage.title) + '</div>\
<div class="plb-url">' + escHTML(matchedPage.public_url) + '</div>\
<button class="plb-copy" id="plb-copy-btn">\
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>\
  Copiar link\
</button>';

          document.getElementById('plb-copy-btn').addEventListener('click', function () {
            var btn = this;
            navigator.clipboard.writeText(matchedPage.public_url).then(function () {
              btn.classList.add('copied');
              btn.innerHTML = '\
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><polyline points="20 6 9 17 4 12"/></svg>\
  Copiado';
              setTimeout(function () {
                btn.classList.remove('copied');
                btn.innerHTML = '\
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>\
  Copiar link';
              }, 2000);
            });
          });
        } else {
          popover.innerHTML = '<div class="plb-none">Sem versao publica registrada para esta pagina.<br><br>Para publicar, crie uma copia em <code>/p/{slug}/</code> e registre no <code>registry.json</code>.</div>';
        }
      })
      .catch(function () {
        popover.innerHTML = '<div class="plb-none">Erro ao carregar registry.json</div>';
      });
  });

  function escHTML(str) {
    if (!str) return '';
    var d = document.createElement('div');
    d.textContent = str;
    return d.innerHTML;
  }
})();
