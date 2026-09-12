/* Ortomed, interações do site */
(function () {
  'use strict';

  /* ---- ano no rodapé ---- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---- menu mobile ---- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- reveal ao rolar ---- */
  var itens = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    itens.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px' });

    itens.forEach(function (el, i) {
      el.style.transitionDelay = (i % 4) * 80 + 'ms';
      io.observe(el);
    });
  }

  /* ---- copiar código Pix ---- */
  var btnPix = document.getElementById('pix-copy');
  var msgPix = document.getElementById('pix-msg');

  if (btnPix) {
    var textoPadrao = msgPix ? msgPix.textContent : '';

    btnPix.addEventListener('click', function () {
      var codigo = btnPix.getAttribute('data-pix') || '';

      function ok() {
        btnPix.classList.add('is-copied');
        if (msgPix) msgPix.textContent = 'Código Pix copiado. Cole no app do seu banco.';
        setTimeout(function () {
          btnPix.classList.remove('is-copied');
          if (msgPix) msgPix.textContent = textoPadrao;
        }, 3200);
      }

      function fallback() {
        var ta = document.createElement('textarea');
        ta.value = codigo;
        ta.setAttribute('readonly', '');
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); ok(); }
        catch (err) { if (msgPix) msgPix.textContent = 'Não foi possível copiar. Use o QR Code ao lado.'; }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(codigo).then(ok).catch(fallback);
      } else {
        fallback();
      }
    });
  }
})();
