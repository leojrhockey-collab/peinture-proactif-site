/* Privacy notice — Loi 25 / PIPEDA compliance
   Dismissible bar. Language detected from the page's lang attribute (fr-CA / en-CA). */
(function () {
  'use strict';

  var DISMISSED_KEY = 'pp-privacy-ok';

  var copy = {
    fr: {
      msg: 'Les informations soumises via formulaire servent exclusivement à répondre à votre demande. Ce site n\'utilise aucun témoin de traçage.',
      btn: 'Compris'
    },
    en: {
      msg: 'Information submitted via form is used solely to respond to your request. This site uses no tracking cookies.',
      btn: 'Got it'
    }
  };

  function getLang() {
    var lang = document.documentElement.getAttribute('lang') || 'fr';
    return lang.toLowerCase().startsWith('en') ? 'en' : 'fr';
  }

  function isDismissed() {
    try { return localStorage.getItem(DISMISSED_KEY) === '1'; } catch (e) { return false; }
  }

  function dismiss() {
    try { localStorage.setItem(DISMISSED_KEY, '1'); } catch (e) {}
    var bar = document.getElementById('pp-privacy-bar');
    if (bar) {
      bar.style.transform = 'translateY(100%)';
      setTimeout(function () { if (bar.parentNode) bar.parentNode.removeChild(bar); }, 300);
    }
  }

  function createBar() {
    var lang = getLang();
    var t = copy[lang];

    var style = document.createElement('style');
    style.textContent = [
      '#pp-privacy-bar{',
        'position:fixed;bottom:0;left:0;right:0;',
        'background:#0e1f3d;color:rgba(255,255,255,0.86);',
        'font-size:0.80rem;font-family:inherit;',
        'padding:12px 24px;',
        'display:flex;align-items:center;justify-content:space-between;gap:20px;',
        'z-index:9999;',
        'box-shadow:0 -2px 16px rgba(0,0,0,0.25);',
        'transition:transform 0.3s ease;',
      '}',
      '#pp-privacy-btn{',
        'background:transparent;',
        'border:1px solid rgba(255,255,255,0.45);',
        'color:rgba(255,255,255,0.9);',
        'padding:6px 18px;border-radius:4px;',
        'cursor:pointer;font-size:0.80rem;',
        'white-space:nowrap;flex-shrink:0;',
        'font-family:inherit;',
        'transition:background 0.2s;',
      '}',
      '#pp-privacy-btn:hover{background:rgba(255,255,255,0.12);}'
    ].join('');
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.id = 'pp-privacy-bar';
    bar.setAttribute('role', 'region');
    bar.setAttribute('aria-label', lang === 'en' ? 'Privacy notice' : 'Avis de confidentialité');

    var msg = document.createElement('p');
    msg.id = 'pp-privacy-msg';
    msg.style.cssText = 'margin:0;line-height:1.55;flex:1;';
    msg.textContent = t.msg;

    var btn = document.createElement('button');
    btn.id = 'pp-privacy-btn';
    btn.type = 'button';
    btn.textContent = t.btn;
    btn.addEventListener('click', dismiss);

    bar.appendChild(msg);
    bar.appendChild(btn);
    document.body.appendChild(bar);
  }

  function init() {
    if (isDismissed()) return;
    createBar();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
}());
