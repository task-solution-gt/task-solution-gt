/* ===== Task Solution - Main Script ===== */
(function () {
  'use strict';

  /* ---------- Theme ---------- */
  var html = document.documentElement;
  var themeKey = 'ts-theme';

  function setTheme(pref) {
    var effective = pref === 'system'
      ? (window.matchMedia('(prefers-color-scheme:light)').matches ? 'light' : 'dark')
      : pref;
    html.setAttribute('data-ts-pref', pref);
    html.setAttribute('data-theme', effective);
    try { localStorage.setItem(themeKey, pref); } catch (_) {}

    var darkIcon = document.getElementById('theme-icon-dark');
    var lightIcon = document.getElementById('theme-icon-light');
    var systemIcon = document.getElementById('theme-icon-system');
    if (!darkIcon) return;
    darkIcon.classList.add('hidden');
    lightIcon.classList.add('hidden');
    systemIcon.classList.add('hidden');
    if (pref === 'light') lightIcon.classList.remove('hidden');
    else if (pref === 'system') systemIcon.classList.remove('hidden');
    else darkIcon.classList.remove('hidden');
  }

  var saved = (function () {
    try { return localStorage.getItem(themeKey); } catch (_) { return null; }
  })();
  if (!saved) saved = 'dark';
  setTheme(saved);

  window.tsToggleTheme = function () {
    var cur = html.getAttribute('data-ts-pref') || 'dark';
    var next = cur === 'dark' ? 'light' : cur === 'light' ? 'system' : 'dark';
    setTheme(next);
  };

  window.matchMedia('(prefers-color-scheme:light)').addEventListener('change', function () {
    if (html.getAttribute('data-ts-pref') === 'system') {
      setTheme('system');
    }
  });

  /* ---------- Preloader ---------- */
  window.addEventListener('load', function () {
    var el = document.getElementById('preloader');
    if (el) { el.classList.add('preloader--hidden'); }
  });

  /* ---------- DOM ready ---------- */
  document.addEventListener('DOMContentLoaded', function () {

    /* Year */
    var yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* Navbar scroll */
    var navbar = document.getElementById('header');
    if (navbar) {
      function onScroll() {
        if (window.scrollY > 50) {
          navbar.classList.add('bg-brand-900/90', 'shadow-lg', 'shadow-black/10', 'backdrop-blur-xl');
          navbar.classList.remove('bg-transparent');
        } else {
          navbar.classList.remove('bg-brand-900/90', 'shadow-lg', 'shadow-black/10', 'backdrop-blur-xl');
          navbar.classList.add('bg-transparent');
        }
      }
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    /* Mobile menu */
    var burger = document.getElementById('mobile-toggle');
    var menu = document.getElementById('mobile-menu');
    if (burger && menu) {
      burger.addEventListener('click', function () {
        menu.classList.toggle('open');
        burger.setAttribute('aria-expanded', menu.classList.contains('open'));
      });
      menu.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          menu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        });
      });
      document.addEventListener('click', function (e) {
        if (!burger.contains(e.target) && !menu.contains(e.target)) {
          menu.classList.remove('open');
          burger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* Back-to-top */
    var btt = document.getElementById('back-to-top');
    if (btt) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 400) {
          btt.classList.remove('opacity-0', 'invisible');
          btt.classList.add('opacity-100', 'visible');
        } else {
          btt.classList.add('opacity-0', 'invisible');
          btt.classList.remove('opacity-100', 'visible');
        }
      }, { passive: true });
      btt.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    /* AOS */
    if (typeof AOS !== 'undefined') {
      AOS.init({ duration: 800, once: true, offset: 60 });
    }

  });

})();
