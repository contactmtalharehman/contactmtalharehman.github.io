/* ============================================================
   script.js  -  Muhammad Talha Rehman Portfolio
   Search for "@@" to jump between sections.
   Content (text, clients, reviews) is NOT here: edit content.js
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var body = document.body;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  /* @@ JS-01  SMALL HELPERS */
  function $(id) { return document.getElementById(id); }

  function esc(text) {
    return String(text == null ? '' : text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function tagsHtml(list) {
    return '<ul class="tags">' + (list || []).map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>';
  }

  function logoImg(src, fallback, alt) {
    return '<img src="' + esc(src) + '" alt="' + esc(alt) + ' logo" data-fallback="' + esc(fallback) + '">';
  }


  /* @@ JS-02  ICONS (small pictures used in Contact, Footer and Reviews) */
  var ICONS = {
    email: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    whatsapp: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.9 7L4 20l1.5-4A8 8 0 1 1 20 11.5z"/><path d="M9 9c0 3 3 6 6 6l1-1.5-2-1-1 .8c-.8-.4-1.7-1.3-2.1-2.1l.8-1-1-2z"/></svg>',
    linkedin: '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 10v7M8 7v.01M12 17v-7M12 13a3 3 0 0 1 6 0v4"/></svg>',
    left: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
    right: '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>'
  };


  /* @@ JS-03  LOADER AND PAGE-OPEN ANIMATION */
  var loader = $('loader');
  var opened = false;

  function openPage() {
    if (opened) return;
    opened = true;
    if (loader) loader.classList.add('is-hidden');
    body.classList.add('is-ready');
  }

  window.addEventListener('load', function () { setTimeout(openPage, 1100); });
  setTimeout(openPage, 3000); // safety: never get stuck on the loader


  /* @@ JS-04  THEME SWITCHER (4 single colors + 4 combinations) */
  var themeBtn = $('themeBtn');
  var themeMenu = $('themeMenu');
  var themeOptions = document.querySelectorAll('[data-theme-choice]');

  function markTheme(theme) {
    themeOptions.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-theme-choice') === theme));
    });
  }

  function setTheme(theme) {
    root.setAttribute('data-theme', theme);
    markTheme(theme);
    try { localStorage.setItem('mtr-theme', theme); } catch (e) {}
  }

  function closeThemeMenu() {
    if (!themeMenu) return;
    themeMenu.hidden = true;
    if (themeBtn) themeBtn.setAttribute('aria-expanded', 'false');
  }

  markTheme(root.getAttribute('data-theme'));

  if (themeBtn && themeMenu) {
    themeBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var willOpen = themeMenu.hidden;
      themeMenu.hidden = !willOpen;
      themeBtn.setAttribute('aria-expanded', String(willOpen));
    });
    themeOptions.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(btn.getAttribute('data-theme-choice'));
        closeThemeMenu();
      });
    });
    document.addEventListener('click', function (e) {
      if (!themeMenu.contains(e.target)) closeThemeMenu();
    });
  }


  /* @@ JS-05  MOBILE MENU */
  var nav = $('nav');
  var navBtn = $('navToggle');

  function setMenu(open) {
    if (!nav || !navBtn) return;
    nav.classList.toggle('is-open', open);
    navBtn.setAttribute('aria-expanded', String(open));
    navBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  if (navBtn) {
    navBtn.addEventListener('click', function () { setMenu(!nav.classList.contains('is-open')); });
  }
  if (nav) {
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { setMenu(false); closeThemeMenu(); }
  });


  /* @@ JS-06  HEADER ON SCROLL + PROGRESS LINE */
  var header = $('siteHeader');
  var progress = $('progress');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('is-scrolled', y > 24);
    if (progress) progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) { window.requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();


  /* @@ JS-07  BUILD PAGE FROM content.js (skills, clients, work, contact, footer) */
  function renderSkills() {
    var el = $('skillsList');
    if (!el || typeof SKILLS === 'undefined') return;
    el.innerHTML = SKILLS.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('');
  }

  // Moving strip: each box has the logo AND the brand name together.
  // The list is written twice so the loop never has a gap.
  function renderClientStrip() {
    var track = $('clientsTrack');
    if (!track) return;
    var all = [FEATURED].concat(PROJECTS).filter(function (p) { return p.showInStrip !== false; });
    var chips = all.map(function (p) {
      return '<li class="client-chip">' +
        '<span class="chip-logo">' + logoImg(p.logo, p.fallback, p.name) + '</span>' +
        '<span class="chip-name">' + esc(p.name) + '</span>' +
      '</li>';
    }).join('');
    track.innerHTML =
      '<ul class="marquee-group">' + chips + '</ul>' +
      '<ul class="marquee-group" aria-hidden="true">' + chips + '</ul>';
  }

  function renderFeatured() {
    var el = $('featuredWork');
    if (!el || typeof FEATURED === 'undefined') return;
    var f = FEATURED;
    var stats = (f.stats || []).map(function (s) {
      return '<li><strong>' + esc(s.value) + '</strong><span>' + esc(s.label) + '</span></li>';
    }).join('');
    el.innerHTML =
      '<article class="featured" data-reveal>' +
        '<div class="featured-head">' +
          '<span class="featured-logo">' + logoImg(f.logo, f.fallback, f.name) + '</span>' +
          '<div><h3>' + esc(f.name) + '</h3><p class="featured-role">' + esc(f.role) + '</p></div>' +
        '</div>' +
        '<p class="featured-text">' + esc(f.text) + '</p>' +
        (stats ? '<ul class="featured-stats" aria-label="' + esc(f.name) + ' highlights">' + stats + '</ul>' : '') +
        tagsHtml(f.tools) +
        (f.url ? '<a class="featured-link" href="' + esc(f.url) + '" target="_blank" rel="noopener">' + esc(f.linkText || f.url) + '</a>' : '') +
      '</article>';
  }

  function renderProjects() {
    var el = $('workList');
    if (!el || typeof PROJECTS === 'undefined') return;
    el.innerHTML = PROJECTS.map(function (p) {
      var nameHtml = p.url
        ? '<a class="work-link" href="' + esc(p.url) + '" target="_blank" rel="noopener">' + esc(p.name) +
          '<svg class="work-link-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></a>'
        : esc(p.name);
      return '<article class="work-item" data-reveal>' +
        '<span class="client-logo work-logo">' + logoImg(p.logo, p.fallback, p.name) + '</span>' +
        '<div class="work-body"><h3>' + nameHtml + '</h3><p>' + esc(p.text) + '</p>' + tagsHtml(p.tools) + '</div>' +
      '</article>';
    }).join('');
  }
  
  function renderContact() {
    var items = [
      { icon: ICONS.email, title: 'Send an email', sub: PROFILE.email, href: 'mailto:' + PROFILE.email, ext: false, label: 'Email' },
      { icon: ICONS.whatsapp, title: 'Message on WhatsApp', sub: 'Chat directly', href: PROFILE.whatsapp, ext: true, label: 'WhatsApp' },
      { icon: ICONS.linkedin, title: 'Connect on LinkedIn', sub: PROFILE.name, href: PROFILE.linkedin, ext: true, label: 'LinkedIn' }
    ];
    var list = $('contactList');
    var foot = $('footerContact');
    if (list) {
      list.innerHTML = items.map(function (i) {
        return '<li><a class="contact-link" href="' + esc(i.href) + '"' + (i.ext ? ' target="_blank" rel="noopener"' : '') + '>' +
          '<span class="contact-icon">' + i.icon + '</span>' +
          '<span><strong>' + esc(i.title) + '</strong><small>' + esc(i.sub) + '</small></span></a></li>';
      }).join('');
    }
    if (foot) {
      foot.innerHTML = items.map(function (i) {
        return '<a class="footer-icon" href="' + esc(i.href) + '"' + (i.ext ? ' target="_blank" rel="noopener"' : '') + ' aria-label="' + esc(i.label) + '">' + i.icon + '</a>';
      }).join('');
    }
  }

  renderSkills();
  renderClientStrip();
  renderFeatured();
  renderProjects();
  renderContact();


  /* @@ JS-08  CLIENT REVIEWS (section stays hidden until REVIEWS has items) */
  function initials(name) {
    return String(name || '').split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) { return w.charAt(0).toUpperCase(); }).join('');
  }

  function renderReviews() {
    var section = $('reviews');
    var navLink = $('navReviews');
    var track = $('reviewsTrack');
    if (!section || !track || typeof REVIEWS === 'undefined' || !REVIEWS.length) return;

    section.hidden = false;
    if (navLink) navLink.hidden = false;

    track.innerHTML = REVIEWS.map(function (r) {
      var photo = r.photo
        ? '<img src="' + esc(r.photo) + '" alt="' + esc(r.name) + '" data-fallback="' + esc(initials(r.name)) + '">'
        : '<span class="img-fallback">' + esc(initials(r.name)) + '</span>';
      var who = [r.role, r.company].filter(Boolean).join(', ');
      return '<figure class="review">' +
        '<blockquote class="review-quote">&ldquo;' + esc(r.quote) + '&rdquo;</blockquote>' +
        '<figcaption class="review-author"><span class="review-photo">' + photo + '</span>' +
        '<div><strong>' + esc(r.name) + '</strong><span>' + esc(who) + '</span></div></figcaption>' +
      '</figure>';
    }).join('');

    var prev = $('reviewPrev');
    var next = $('reviewNext');
    var dots = $('reviewsDots');
    var controls = $('reviewsControls');
    prev.innerHTML = ICONS.left;
    next.innerHTML = ICONS.right;

    if (REVIEWS.length < 2) { controls.hidden = true; return; }

    dots.innerHTML = REVIEWS.map(function (r, i) {
      return '<button type="button" class="dot' + (i === 0 ? ' is-active' : '') + '" aria-label="Show review ' + (i + 1) + '"></button>';
    }).join('');
    var dotEls = dots.querySelectorAll('.dot');

    function go(i) { track.scrollTo({ left: i * track.clientWidth, behavior: reduceMotion ? 'auto' : 'smooth' }); }
    function current() { return Math.round(track.scrollLeft / track.clientWidth); }

    prev.addEventListener('click', function () { go(Math.max(0, current() - 1)); });
    next.addEventListener('click', function () { go(Math.min(REVIEWS.length - 1, current() + 1)); });
    dotEls.forEach(function (d, i) { d.addEventListener('click', function () { go(i); }); });
    track.addEventListener('scroll', function () {
      var c = current();
      dotEls.forEach(function (d, i) { d.classList.toggle('is-active', i === c); });
    }, { passive: true });
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') go(Math.min(REVIEWS.length - 1, current() + 1));
      if (e.key === 'ArrowLeft') go(Math.max(0, current() - 1));
    });
  }

  renderReviews();


  /* @@ JS-09  MISSING IMAGE FALLBACK
     If a photo or logo file is not found, first try data-alt-src (if the image has one),
     otherwise show a text mark. Add the real file later and it appears automatically. */
  document.querySelectorAll('img[data-fallback]').forEach(function (img) {
    function swap() {
      var mark = document.createElement('span');
      var alt = img.getAttribute('alt') || '';
      mark.className = 'img-fallback';
      mark.textContent = img.getAttribute('data-fallback') || '';
      if (alt) { mark.setAttribute('role', 'img'); mark.setAttribute('aria-label', alt); }
      else { mark.setAttribute('aria-hidden', 'true'); }
      img.replaceWith(mark);
    }
    function handleError() {
      var altSrc = img.getAttribute('data-alt-src');
      if (altSrc) {
        img.removeAttribute('data-alt-src');
        img.addEventListener('error', handleError, { once: true });
        img.src = altSrc;
      } else {
        swap();
      }
    }
    if (img.complete && img.naturalWidth === 0) { handleError(); }
    else { img.addEventListener('error', handleError, { once: true }); }
  });


  /* @@ JS-10  SCROLL REVEAL (items fade in when you scroll to them) */
  (function () {
    var els = document.querySelectorAll('[data-reveal]');
    if (!els.length) return;
    if (!('IntersectionObserver' in window) || reduceMotion) {
      els.forEach(function (el) { el.classList.add('in-view'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  })();


  /* @@ JS-11  ACTIVE MENU LINK (highlights the section you are viewing) */
  (function () {
    var links = document.querySelectorAll('.nav a');
    var pairs = [];
    links.forEach(function (link) {
      var sec = document.getElementById(link.getAttribute('href').slice(1));
      if (sec) pairs.push({ link: link, sec: sec });
    });
    if (!('IntersectionObserver' in window) || !pairs.length) return;

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (l) { l.classList.remove('is-active'); });
        pairs.forEach(function (p) { if (p.sec === entry.target) p.link.classList.add('is-active'); });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    pairs.forEach(function (p) { io.observe(p.sec); });
  })();


  /* @@ JS-12  FOOTER YEAR */
  var year = $('year');
  if (year) year.textContent = new Date().getFullYear();

})();