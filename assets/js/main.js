/* Marketbase homepage — vanilla, geen dependencies.
   Bevat alleen wat écht interactie nodig heeft:
   mega-menu, mobiele drawer, mobiele zoekbalk, "toon meer" bij reviews,
   en het openzetten van de footer-accordeons op desktop.               */
(function () {
  'use strict';

  var mq = window.matchMedia('(min-width: 900px)');

  /* ---------- 0. Live Marketbase images ------------------------------ */
  /* Gebruik publieke Marketbase-media zodat de afbeeldingen ook op Vercel laden. */
  var approvedImages = [
    ['cat-vouwtenten.svg', 'https://marketbase.be/wp-content/uploads/2025/02/7da294a15a675269a8a4ab560e648783.avif'],
    ['cat-stretchtenten.svg', 'https://marketbase.be/wp-content/uploads/2026/02/Stretchtent-render-1.avif'],
    ['cat-pagodetenten.svg', 'https://marketbase.be/wp-content/uploads/2025/02/b3da592a22f18f32a82f578c251fab7e.avif'],
    ['cat-marktmateriaal.svg', 'https://marketbase.be/wp-content/uploads/2026/02/fidji-300-rood.webp'],
    ['cat-schaduwdoeken.svg', 'https://marketbase.be/wp-content/uploads/2025/02/New-Project-13.webp'],
    ['cat-accessoires.svg', 'https://marketbase.be/wp-content/uploads/2025/02/New-Project-15.webp']
  ];

  approvedImages.forEach(function (pair) {
    document.querySelectorAll('img').forEach(function (img) {
      var src = img.getAttribute('src') || '';
      if (src.indexOf(pair[0]) !== -1) {
        img.setAttribute('src', pair[1]);
        img.removeAttribute('srcset');
      }
    });
  });

  /* Officieel Marketbase-logo. */
  var officialLogo = document.querySelector('.mb-logo img');
  if (officialLogo) {
    officialLogo.setAttribute('src', 'https://marketbase.nl/wp-content/uploads/2025/02/logomarket.png');
    officialLogo.removeAttribute('srcset');
    officialLogo.removeAttribute('height');
  }

  /* ---------- 1. Mega-menu (desktop) --------------------------------- */
  var items = Array.prototype.slice.call(document.querySelectorAll('[data-mega]'));

  function closeMega(item) {
    item.classList.remove('is-open');
    item.querySelector('[aria-expanded]').setAttribute('aria-expanded', 'false');
  }
  function closeAllMega() { items.forEach(closeMega); }

  items.forEach(function (item) {
    var trigger = item.querySelector('[aria-expanded]');

    trigger.addEventListener('click', function (e) {
      if (!mq.matches) return;
      e.preventDefault();
      var open = item.classList.contains('is-open');
      closeAllMega();
      if (!open) {
        item.classList.add('is-open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });

    item.addEventListener('mouseenter', function () {
      if (!mq.matches) return;
      closeAllMega();
      item.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    });
    item.addEventListener('mouseleave', function () { if (mq.matches) closeMega(item); });

    item.addEventListener('focusout', function (e) {
      if (!mq.matches) return;
      if (!item.contains(e.relatedTarget)) closeMega(item);
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    var open = document.querySelector('[data-mega].is-open');
    if (open) {
      closeMega(open);
      open.querySelector('[aria-expanded]').focus();
    }
    if (drawer && drawer.classList.contains('is-open')) closeDrawer();
  });

  /* ---------- 2. Mobiele drawer -------------------------------------- */
  var drawer = document.getElementById('mb-drawer');
  var scrim = document.getElementById('mb-scrim');
  var burger = document.getElementById('mb-burger');
  var drawerClose = document.getElementById('mb-drawer-close');
  var lastFocus = null;

  function focusables(root) {
    return Array.prototype.filter.call(
      root.querySelectorAll('a[href],button:not([disabled]),input,summary,[tabindex]:not([tabindex="-1"])'),
      function (el) { return el.offsetParent !== null; }
    );
  }

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.classList.add('is-open');
    scrim.classList.add('is-open');
    drawer.removeAttribute('inert');
    burger.setAttribute('aria-expanded', 'true');
    document.body.classList.add('mb-locked');
    var f = focusables(drawer);
    if (f.length) f[0].focus();
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    scrim.classList.remove('is-open');
    drawer.setAttribute('inert', '');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('mb-locked');
    if (lastFocus) lastFocus.focus();
  }

  if (burger && drawer && scrim) {
    drawer.setAttribute('inert', '');
    burger.addEventListener('click', function () {
      drawer.classList.contains('is-open') ? closeDrawer() : openDrawer();
    });
    scrim.addEventListener('click', closeDrawer);
    if (drawerClose) drawerClose.addEventListener('click', closeDrawer);

    drawer.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = focusables(drawer);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
  }

  /* ---------- 3. Accordeons in de drawer ------------------------------ */
  document.querySelectorAll('[data-acc]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var panel = document.getElementById(btn.getAttribute('aria-controls'));
      var open = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!open));
      panel.classList.toggle('is-open', !open);
    });
  });

  /* ---------- 4. Mobiele zoekbalk ------------------------------------- */
  var searchToggle = document.getElementById('mb-search-toggle');
  var mobileSearch = document.getElementById('mb-search-mobile');
  if (searchToggle && mobileSearch) {
    searchToggle.addEventListener('click', function () {
      var open = mobileSearch.classList.toggle('is-open');
      searchToggle.setAttribute('aria-expanded', String(open));
      if (open) mobileSearch.querySelector('input').focus();
    });
  }

  /* ---------- 5. Reviews: toon meer (alleen mobiel) -------------------- */
  var moreBtn = document.querySelector('[data-reviews-more]');
  if (moreBtn) {
    moreBtn.addEventListener('click', function () {
      document.getElementById('mb-reviews').classList.add('is-expanded');
      moreBtn.remove();
    });
  }

  /* ---------- 6. Footer: kolommen open op desktop --------------------- */
  var footMq = window.matchMedia('(min-width: 1024px)');
  var cols = document.querySelectorAll('.mb-footer__col');
  function syncFooter() {
    cols.forEach(function (c) {
      if (footMq.matches) c.setAttribute('open', '');
      else c.removeAttribute('open');
    });
  }
  syncFooter();
  footMq.addEventListener ? footMq.addEventListener('change', syncFooter)
                          : footMq.addListener(syncFooter);

  /* ---------- 7. Jaartal in de footer -------------------------------- */
  var year = document.getElementById('mb-year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- 8. Van mobiel naar desktop: alles opruimen -------------- */
  function syncViewport() {
    if (mq.matches && drawer && drawer.classList.contains('is-open')) closeDrawer();
    if (!mq.matches) closeAllMega();
  }
  mq.addEventListener ? mq.addEventListener('change', syncViewport)
                      : mq.addListener(syncViewport);
})();