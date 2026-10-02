/* Ortomed, interações do site */
(function () {
  'use strict';

  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- ano no rodapé ---- */
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ---- cabeçalho muda ao rolar ---- */
  var header = document.querySelector('.header');
  function onScrollHeader() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

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

  /* ---- contadores ---- */
  function contar(el) {
    var alvo = parseInt(el.getAttribute('data-count'), 10);
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    var pad = parseInt(el.getAttribute('data-pad') || '0', 10);
    var fmt = function (n) {
      var s = String(n);
      while (s.length < pad) s = '0' + s;
      return pre + s + suf;
    };
    if (reduz) { el.textContent = fmt(alvo); return; }
    var dur = 1600, t0 = null;
    function passo(t) {
      if (!t0) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(alvo * e));
      if (p < 1) requestAnimationFrame(passo);
    }
    el.textContent = fmt(0);
    requestAnimationFrame(passo);
  }

  /* ---- revelação ao rolar (com escalonamento) ---- */
  var itens = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    itens.forEach(function (el) { el.classList.add('is-in'); });
    document.querySelectorAll('[data-count]').forEach(contar);
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        var c = entry.target.querySelector('[data-count]');
        if (c) contar(c);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -50px' });

    // atraso em cascata entre irmãos do mesmo grupo
    itens.forEach(function (el) {
      var irmaos = Array.prototype.filter.call(el.parentElement.children, function (n) {
        return n.classList && n.classList.contains('reveal');
      });
      var i = irmaos.indexOf(el);
      el.style.transitionDelay = Math.min(i, 5) * 90 + 'ms';
      io.observe(el);
    });
  }

  /* ---- parallax suave ---- */
  var px = Array.prototype.slice.call(document.querySelectorAll('[data-parallax]'));
  if (!reduz && px.length && window.matchMedia('(min-width: 900px)').matches) {
    var pendente = false;
    function aplicar() {
      pendente = false;
      var vh = window.innerHeight;
      px.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh) return;
        var centro = r.top + r.height / 2 - vh / 2;
        var f = parseFloat(el.getAttribute('data-parallax')) || 0;
        el.style.translate = '0 ' + (centro * -f).toFixed(1) + 'px';
      });
    }
    window.addEventListener('scroll', function () {
      if (!pendente) { pendente = true; requestAnimationFrame(aplicar); }
    }, { passive: true });
    aplicar();
  }

  /* ---- brilho que segue o mouse nos cards ---- */
  if (!reduz && window.matchMedia('(hover: hover)').matches) {
    document.querySelectorAll('.spec').forEach(function (card) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
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
