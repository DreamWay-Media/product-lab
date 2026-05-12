/**
 * DreamWay Product Lab — static site behavior (no build step).
 * Edit site settings and gallery data at the top of this file.
 */
(function () {
  'use strict';

  /* ── Gallery images (set src to image paths like "images/photo.jpg") ── */
  var galleries = {
    'trail-chews': {
      title: 'Trail Chews',
      images: [
        {
          src: 'images/trail-chews/slide-1-24-variety-pack.jpg',
          caption: 'Trail Chews — 24-count variety pack',
        },
        {
          src: 'images/trail-chews/slide-2-orange.jpg',
          caption: 'Trail Chews — Orange flavor',
        },
        {
          src: 'images/trail-chews/slide-3-strawberry.jpg',
          caption: 'Trail Chews — Strawberry flavor',
        },
        {
          src: 'images/trail-chews/trail-chews-strawberry.jpg',
          caption: 'Trail Chews — Strawberry presentation',
        },
        {
          src: 'images/trail-chews/trail-chews-01.JPG',
          caption: 'Trail Chews — Product photography (1)',
        },
        {
          src: 'images/trail-chews/trail-chews-02.JPG',
          caption: 'Trail Chews — Product photography (2)',
        },
        {
          src: 'images/trail-chews/trail-chews-03.JPG',
          caption: 'Trail Chews — Product photography (3)',
        },
      ],
    },
    'food-bev': {
      title: 'Specialty Food Products',
      images: [
        {
          src: 'images/food/Premium-bakery-Julienne-cups-packaging.jpg',
          caption: 'Premium Bakery — Julienne cups packaging',
        },
        {
          src: 'images/food/Indianos-tequila-gift-set-presentation.jpg',
          caption: 'Indianos — Tequila gift set presentation',
        },
        {
          src: 'images/food/margarita-mix.jpg',
          caption: 'Margarita mix — Packaging',
        },
        {
          src: 'images/food/belizimo-peppers.jpg',
          caption: 'Belizimo — Peppers',
        },
        {
          src: 'images/food/ani-preserves.jpg',
          caption: 'Ani Preserves — Packaging',
        },
        {
          src: 'images/food/Golden-Harvest-organic-sunflower-oil.jpg',
          caption: 'Golden Harvest — Organic sunflower oil',
        },
        {
          src: 'images/food/Whole-green-olives-in-brine-jar.jpg',
          caption: 'Whole green olives in brine — Jar',
        },
        {
          src: 'images/food/peas-n-tomato.jpg',
          caption: 'Peas & tomato — Packaging',
        },
        {
          src: 'images/food/Wafer-rolls-with-hazelnut-and-cocoa.jpg',
          caption: 'Wafer rolls — Hazelnut and cocoa',
        },
      ],
    },
    'clean-torch': {
      title: 'Clean Torch',
      images: [
        {
          src: 'images/clean-torch/Clean-Torch-product-showcase-on-white.jpg',
          caption: 'Clean Torch — Product showcase',
        },
        {
          src: 'images/clean-torch/Clean-Torch-product-packaging-display.jpg',
          caption: 'Clean Torch — Packaging display',
        },
        {
          src: 'images/clean-torch/Clean-Torch-instruction-manual-mockup.jpg',
          caption: 'Clean Torch — Insert design',
        },
        {
          src: 'images/clean-torch/Clean-torch-product-presentation-grid.jpg',
          caption: 'Clean Torch — Product presentation grid',
        },
      ],
    },
  };

  /* ── Footer year ─────────────────────────────────────────────────────── */
  var footerYear = document.getElementById('footer-year');
  if (footerYear) footerYear.textContent = String(new Date().getFullYear());

  /* ── Lightbox ─────────────────────────────────────────────────────────── */
  var currentGallery = null;
  var currentIndex = 0;

  function esc(s) {
    var d = document.createElement('div');
    d.textContent = s;
    return d.innerHTML;
  }

  /** Left swipe → next, right swipe → prev (touch; keeps vertical scroll when gesture is mostly vertical). */
  function bindTouchSwipe(el, onPrev, onNext) {
    if (!el || typeof el.addEventListener !== 'function') return;
    var startX = 0;
    var startY = 0;
    var active = false;

    el.addEventListener(
      'touchstart',
      function (e) {
        if (e.touches.length !== 1) return;
        active = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    el.addEventListener(
      'touchcancel',
      function () {
        active = false;
      },
      { passive: true }
    );

    el.addEventListener(
      'touchend',
      function (e) {
        if (!active) return;
        active = false;
        var t = e.changedTouches[0];
        if (!t) return;
        var dx = t.clientX - startX;
        var dy = t.clientY - startY;
        var threshold = 45;
        if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy)) return;
        if (dx > 0) onPrev();
        else onNext();
      },
      { passive: true }
    );
  }

  function applyMainImage(mainImg, item) {
    if (!mainImg) return;

    if (!item.src) {
      mainImg.hidden = true;
      mainImg.classList.remove('lb-fade-out');
      mainImg.removeAttribute('src');
      return;
    }

    mainImg.hidden = false;

    var src = item.src;
    var caption = item.caption;

    function revealNew() {
      var settled = false;
      function settle() {
        if (settled) return;
        settled = true;
        mainImg.removeEventListener('load', settle);
        mainImg.removeEventListener('error', settle);
        mainImg.classList.remove('lb-fade-out');
      }

      mainImg.alt = caption;
      if (mainImg.getAttribute('src') === src) {
        mainImg.classList.remove('lb-fade-out');
        return;
      }

      mainImg.addEventListener('load', settle);
      mainImg.addEventListener('error', settle);
      mainImg.src = src;
      if (mainImg.complete && mainImg.naturalWidth > 0) {
        settle();
      }
    }

    if (!mainImg.getAttribute('src')) {
      mainImg.alt = caption;
      mainImg.src = src;
      mainImg.classList.remove('lb-fade-out');
      return;
    }

    if (mainImg.getAttribute('src') === src) {
      mainImg.alt = caption;
      mainImg.classList.remove('lb-fade-out');
      return;
    }

    var reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      mainImg.alt = caption;
      mainImg.src = src;
      mainImg.classList.remove('lb-fade-out');
      return;
    }

    mainImg.classList.add('lb-fade-out');
    var faded = false;
    var fadeFallbackTimer = null;

    function afterFade(e) {
      if (e && e.propertyName !== 'opacity') return;
      if (faded) return;
      faded = true;
      if (fadeFallbackTimer !== null) {
        window.clearTimeout(fadeFallbackTimer);
        fadeFallbackTimer = null;
      }
      mainImg.removeEventListener('transitionend', afterFade);
      revealNew();
    }

    mainImg.addEventListener('transitionend', afterFade);
    fadeFallbackTimer = window.setTimeout(function () {
      fadeFallbackTimer = null;
      afterFade({ propertyName: 'opacity' });
    }, 360);
  }

  function renderLightbox() {
    if (!currentGallery) return;
    var g = galleries[currentGallery];
    if (!g) return;
    var img = g.images[currentIndex];
    var titleEl = document.getElementById('lb-title');
    var counterEl = document.getElementById('lb-counter');
    var captionEl = document.getElementById('lb-caption');
    var prevBtn = document.getElementById('lb-prev');
    var nextBtn = document.getElementById('lb-next');
    var mainImg = document.getElementById('lb-main-img');
    var thumbs = document.getElementById('lb-thumbnails');
    if (!titleEl || !counterEl || !captionEl || !prevBtn || !nextBtn || !mainImg || !thumbs) return;

    titleEl.textContent = g.title;
    counterEl.textContent = currentIndex + 1 + ' / ' + g.images.length;
    captionEl.textContent = img.caption;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === g.images.length - 1;

    applyMainImage(mainImg, img);

    thumbs.innerHTML = g.images
      .map(function (im, i) {
        var active = i === currentIndex ? ' active' : '';
        if (im.src) {
          if (i === currentIndex) {
            return (
              '<button type="button" class="lb-thumb' +
              active +
              '" data-lb-go="' +
              i +
              '" aria-current="true" aria-label="' +
              esc(im.caption) +
              '"><span class="lb-thumb-current" aria-hidden="true">✓</span></button>'
            );
          }
          return (
            '<button type="button" class="lb-thumb' +
            active +
            '" data-lb-go="' +
            i +
            '" aria-label="' +
            esc(im.caption) +
            '"><img src="' +
            esc(im.src) +
            '" alt="" loading="lazy" decoding="async" /></button>'
          );
        }
        return (
          '<button type="button" class="lb-thumb' +
          active +
          '" data-lb-go="' +
          i +
          '" aria-label="' +
          esc(im.caption) +
          '"><span style="font-family:monospace;font-size:9px;color:rgba(200,240,49,0.4);letter-spacing:0.05em;">' +
          (i + 1) +
          '</span></button>'
        );
      })
      .join('');
  }

  (function bindLbThumbClicks() {
    var bar = document.getElementById('lb-thumbnails');
    if (!bar) return;
    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-lb-go]');
      if (!btn || !bar.contains(btn)) return;
      var i = Number(btn.getAttribute('data-lb-go'));
      if (isNaN(i) || !currentGallery) return;
      currentIndex = i;
      renderLightbox();
    });
  })();

  function syncBodyScrollLock() {
    var lb = document.getElementById('lightbox');
    var legal = document.getElementById('legal-modal');
    var locked =
      (lb && lb.classList.contains('open')) || (legal && legal.classList.contains('is-open'));
    document.body.style.overflow = locked ? 'hidden' : '';
  }

  function openGallery(id) {
    if (!galleries[id]) return;
    currentGallery = id;
    currentIndex = 0;
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.add('open');
    syncBodyScrollLock();
    renderLightbox();
  }

  function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    syncBodyScrollLock();
  }

  function navLightbox(dir) {
    if (!currentGallery) return;
    var g = galleries[currentGallery];
    currentIndex = Math.max(0, Math.min(g.images.length - 1, currentIndex + dir));
    renderLightbox();
  }

  document.querySelectorAll('[data-open-gallery]').forEach(function (el) {
    el.addEventListener('click', function () {
      var id = el.getAttribute('data-open-gallery');
      if (id) openGallery(id);
    });
  });

  var lbClose = document.getElementById('lb-close');
  var lbPrev = document.getElementById('lb-prev');
  var lbNext = document.getElementById('lb-next');
  var lightbox = document.getElementById('lightbox');
  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', function () { navLightbox(-1); });
  if (lbNext) lbNext.addEventListener('click', function () { navLightbox(1); });

  var legalModalLastTrigger = null;

  function closeLegalModal() {
    var modal = document.getElementById('legal-modal');
    var bodyEl = document.getElementById('legal-modal-body');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.hidden = true;
    if (bodyEl) bodyEl.innerHTML = '';
    syncBodyScrollLock();
    if (legalModalLastTrigger && typeof legalModalLastTrigger.focus === 'function') {
      legalModalLastTrigger.focus();
    }
    legalModalLastTrigger = null;
  }

  function openLegalModal(key, trigger) {
    var modal = document.getElementById('legal-modal');
    var titleEl = document.getElementById('legal-modal-title');
    var bodyEl = document.getElementById('legal-modal-body');
    if (!modal || !titleEl || !bodyEl) return;

    var tplId = key === 'privacy' ? 'legal-content-privacy' : key === 'terms' ? 'legal-content-terms' : '';
    if (!tplId) return;
    var tpl = document.getElementById(tplId);
    if (!tpl || !tpl.content) return;

    var titleHtml =
      key === 'privacy'
        ? 'Privacy <span>Policy</span>'
        : 'Terms <span>&amp; Conditions</span>';
    titleEl.innerHTML = titleHtml;
    bodyEl.innerHTML = '';
    bodyEl.appendChild(document.importNode(tpl.content, true));

    legalModalLastTrigger = trigger || null;
    modal.hidden = false;
    modal.classList.add('is-open');
    syncBodyScrollLock();

    var closeBtn = modal.querySelector('.legal-modal-close');
    if (closeBtn) closeBtn.focus();
  }

  document.querySelectorAll('[data-legal-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var key = btn.getAttribute('data-legal-modal');
      if (key) openLegalModal(key, btn);
    });
  });

  var legalModalEl = document.getElementById('legal-modal');
  if (legalModalEl) {
    legalModalEl.addEventListener('click', function (e) {
      if (e.target.closest('[data-legal-close]')) closeLegalModal();
    });
  }

  document.addEventListener('keydown', function (e) {
    var legal = document.getElementById('legal-modal');
    if (legal && legal.classList.contains('is-open')) {
      if (e.key === 'Escape') closeLegalModal();
      return;
    }
    var lb = document.getElementById('lightbox');
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navLightbox(-1);
    if (e.key === 'ArrowRight') navLightbox(1);
  });

  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === e.currentTarget) closeLightbox();
    });
  }

  var lbStage = document.querySelector('.lb-stage');
  if (lbStage) {
    lbStage.addEventListener('click', function (e) {
      if (e.target === lbStage) closeLightbox();
    });
  }

  var lbImgWrapSwipe = document.getElementById('lb-img-wrap');
  bindTouchSwipe(
    lbImgWrapSwipe,
    function () {
      if (lightbox && lightbox.classList.contains('open')) navLightbox(-1);
    },
    function () {
      if (lightbox && lightbox.classList.contains('open')) navLightbox(1);
    }
  );

  /* ── Testimonials carousel ─────────────────────────────────────────────── */
  (function carousel() {
    var track = document.getElementById('tc-track');
    var counter = document.getElementById('tc-counter');
    var prevBtn = document.getElementById('tc-prev');
    var nextBtn = document.getElementById('tc-next');
    var dotsWrap = document.getElementById('tc-dots');
    if (!track || !counter || !prevBtn || !nextBtn || !dotsWrap) return;

    var trackEl = track;
    var counterEl = counter;
    var prevBtnEl = prevBtn;
    var nextBtnEl = nextBtn;
    var dotsWrapEl = dotsWrap;

    var cards = trackEl.querySelectorAll('.testimonial');
    var total = cards.length;

    function getVisible() {
      return window.matchMedia('(max-width: 768px)').matches ? 1 : 3;
    }

    var visible = getVisible();
    var pages = Math.max(1, Math.ceil(total / visible));
    var current = 0;

    function cardWidth() {
      var first = cards[0];
      return first instanceof HTMLElement ? first.offsetWidth + 2 : 0;
    }

    function render() {
      var offset = current * visible * cardWidth();
      trackEl.style.transform = 'translateX(-' + offset + 'px)';
      counterEl.textContent = current + 1 + ' / ' + pages;
      prevBtnEl.disabled = current === 0;
      nextBtnEl.disabled = current >= pages - 1;
      dotsWrapEl.querySelectorAll('.carousel-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === current);
      });
    }

    function buildDots() {
      dotsWrapEl.innerHTML = '';
      for (var i = 0; i < pages; i++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function (idx) {
          d.addEventListener('click', function () {
            current = idx;
            render();
          });
        })(i);
        dotsWrapEl.appendChild(d);
      }
    }

    function recalc() {
      var nextVis = getVisible();
      if (nextVis !== visible) {
        visible = nextVis;
        pages = Math.max(1, Math.ceil(total / visible));
        current = Math.min(current, Math.max(0, pages - 1));
        buildDots();
      }
      render();
    }

    function goPrev() {
      current = Math.max(0, current - 1);
      render();
    }

    function goNext() {
      current = Math.min(pages - 1, current + 1);
      render();
    }

    prevBtnEl.addEventListener('click', goPrev);
    nextBtnEl.addEventListener('click', goNext);

    var trackWrapEl = document.querySelector('#testimonials .carousel-track-wrap');
    bindTouchSwipe(trackWrapEl, goPrev, goNext);

    buildDots();
    render();
    window.addEventListener('resize', recalc);
  })();

  /* ── Primary navigation: mobile toggle + scroll-spy ─────────────────────── */
  (function primaryNav() {
    if (!document.querySelector('.site-nav')) return;
    var toggle = document.getElementById('nav-toggle');
    var menu = document.getElementById('primary-nav');
    var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-link[data-nav-target]'));

    var mobileMq = window.matchMedia('(max-width: 880px)');

    function closeMenu() {
      if (!toggle || !menu) return;
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.classList.remove('is-open');
      document.body.classList.remove('nav-open');
    }

    function openMenu() {
      if (!toggle || !menu) return;
      toggle.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
      menu.classList.add('is-open');
      document.body.classList.add('nav-open');
    }

    if (toggle && menu) {
      toggle.addEventListener('click', function () {
        if (menu.classList.contains('is-open')) closeMenu();
        else openMenu();
      });

      menu.addEventListener('click', function (e) {
        var link = e.target.closest('a');
        if (link && menu.classList.contains('is-open')) closeMenu();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) {
          closeMenu();
          toggle.focus();
        }
      });

      function handleMqChange() {
        if (!mobileMq.matches) closeMenu();
      }
      if (typeof mobileMq.addEventListener === 'function') {
        mobileMq.addEventListener('change', handleMqChange);
      } else if (typeof mobileMq.addListener === 'function') {
        mobileMq.addListener(handleMqChange);
      }
    }

    /* Scroll-spy: highlight the link whose section is closest to top of viewport */
    if (navLinks.length && 'IntersectionObserver' in window) {
      var sections = navLinks
        .map(function (link) {
          var id = link.getAttribute('data-nav-target');
          var section = id ? document.getElementById(id) : null;
          return section ? { id: id, el: section, link: link } : null;
        })
        .filter(Boolean);

      var visibleIds = {};

      function updateActive() {
        var bestId = null;
        var bestRatio = 0;
        sections.forEach(function (s) {
          var ratio = visibleIds[s.id] || 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = s.id;
          }
        });
        navLinks.forEach(function (link) {
          var id = link.getAttribute('data-nav-target');
          link.classList.toggle('is-active', id === bestId);
        });
      }

      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            var id = entry.target.id;
            if (entry.isIntersecting) visibleIds[id] = entry.intersectionRatio;
            else visibleIds[id] = 0;
          });
          updateActive();
        },
        {
          root: null,
          rootMargin: '-40% 0px -50% 0px',
          threshold: [0, 0.01, 0.1, 0.25, 0.5, 0.75, 1],
        }
      );

      sections.forEach(function (s) {
        spy.observe(s.el);
      });
    }
  })();

  /* ── Scroll reveals, parallax, nav, hero tilt ──────────────────────────── */
  (function motion() {
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var hero = document.querySelector('.hero-section');
    var backdropInner = document.querySelector('.hero-backdrop-inner');
    var ctaWatermark = document.querySelector('.cta-watermark');
    var parallaxNodes = document.querySelectorAll('[data-parallax]');
    var scrollTicking = false;

    function setNavScrolled() {
      document.documentElement.setAttribute('data-nav-scrolled', window.scrollY > 48 ? 'true' : 'false');
    }

    function revealInit() {
      var singles = document.querySelectorAll('[data-reveal]');
      var groups = document.querySelectorAll('[data-reveal-group]');

      if (reduce) {
        singles.forEach(function (el) {
          el.classList.add('is-visible');
        });
        groups.forEach(function (el) {
          el.classList.add('is-visible');
        });
        return;
      }

      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );

      singles.forEach(function (el) {
        io.observe(el);
      });
      groups.forEach(function (el) {
        io.observe(el);
      });
    }

    function parallaxTick() {
      if (reduce) return;

      var vh = window.innerHeight;

      parallaxNodes.forEach(function (el) {
        var speed = parseFloat(el.getAttribute('data-parallax') || '0.12');
        var maxPx = parseFloat(el.getAttribute('data-parallax-max') || '10');
        var rect = el.getBoundingClientRect();
        var center = rect.top + rect.height * 0.5;
        var offset = (center - vh * 0.5) * speed;
        var y = Math.round(offset * -1);
        if (y > maxPx) y = maxPx;
        if (y < -maxPx) y = -maxPx;
        el.style.transform = 'translate3d(0, ' + y + 'px, 0)';
      });

      if (ctaWatermark) {
        var ctaSection = document.getElementById('cta');
        if (ctaSection) {
          var r = ctaSection.getBoundingClientRect();
          var progress = (vh * 0.5 - (r.top + r.height * 0.5)) * 0.05;
          if (progress > 10) progress = 10;
          if (progress < -10) progress = -10;
          ctaWatermark.style.transform =
            'translate3d(-50%, calc(-50% + ' + Math.round(progress) + 'px), 0)';
        }
      }
    }

    function onScroll() {
      setNavScrolled();
      if (reduce) return;
      if (!scrollTicking) {
        scrollTicking = true;
        window.requestAnimationFrame(function () {
          parallaxTick();
          scrollTicking = false;
        });
      }
    }

    function heroPointer(e) {
      if (reduce || !backdropInner || !hero) return;
      if (window.matchMedia('(pointer: coarse)').matches) return;

      var rect = hero.getBoundingClientRect();
      var nx = (e.clientX - rect.left) / rect.width;
      var ny = (e.clientY - rect.top) / rect.height;
      hero.style.setProperty('--hero-x', Math.max(0, Math.min(100, nx * 100)) + '%');
      hero.style.setProperty('--hero-y', Math.max(0, Math.min(100, ny * 100)) + '%');

      var x = (nx - 0.5) * 2;
      var y = (ny - 0.5) * 2;
      var max = 18;
      backdropInner.style.transform =
        'translate3d(' + Math.round(x * max) + 'px, ' + Math.round(y * max * 0.6) + 'px, 0)';
    }

    function heroPointerLeave() {
      if (!backdropInner || reduce) return;
      hero.style.setProperty('--hero-x', '58%');
      hero.style.setProperty('--hero-y', '40%');
      backdropInner.style.transform = 'translate3d(0, 0, 0)';
    }

    revealInit();
    setNavScrolled();
    parallaxTick();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', function () {
      setNavScrolled();
      parallaxTick();
    });

    if (hero && backdropInner) {
      hero.addEventListener('mousemove', heroPointer);
      hero.addEventListener('mouseleave', heroPointerLeave);
    }

    if (reduce && hero) {
      hero.classList.add('motion-disabled');
    }
  })();

  /* ── Calendly popup + campaign tracking (UTM + GA4) ─────────────────────── */
  var CALENDLY_BOOKING_BASE =
    'https://calendly.com/dreamwaymedia/free-30-minute-fit-check-no-obligation-call';

  var CAMPAIGN_DEFAULTS = {
    utm_source: 'dreamway_product_lab_site',
    utm_medium: 'organic',
    utm_campaign: 'dwmpl_booking',
  };

  function gaEvent(eventName, params) {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params || {});
      }
    } catch (err) {
      /* ignore */
    }
  }

  /** Nearest section slug for UTM content + GA (nav/footer/modals use fixed slugs). */
  function calendlyCampaignSlug(anchor) {
    if (!anchor || typeof anchor.closest !== 'function') return 'other';
    if (anchor.closest('.site-nav')) return 'nav';
    if (anchor.closest('footer')) return 'footer';
    var sec = anchor.closest('section[data-campaign]');
    if (sec) {
      var slug = sec.getAttribute('data-campaign');
      if (slug) return slug;
    }
    return 'other';
  }

  function calendlyBookingUrl(campaignContent) {
    var q = [];
    q.push('utm_source=' + encodeURIComponent(CAMPAIGN_DEFAULTS.utm_source));
    q.push('utm_medium=' + encodeURIComponent(CAMPAIGN_DEFAULTS.utm_medium));
    q.push('utm_campaign=' + encodeURIComponent(CAMPAIGN_DEFAULTS.utm_campaign));
    q.push('utm_content=' + encodeURIComponent(campaignContent || 'other'));
    return CALENDLY_BOOKING_BASE + '?' + q.join('&');
  }

  document.querySelectorAll('.js-calendly').forEach(function (el) {
    var slug = calendlyCampaignSlug(el);
    var bookingUrl = calendlyBookingUrl(slug);
    el.setAttribute('href', bookingUrl);

    el.addEventListener('click', function (e) {
      var s = calendlyCampaignSlug(el);
      var url = calendlyBookingUrl(s);
      gaEvent('calendly_book_click', {
        cta_placement: s,
        utm_source: CAMPAIGN_DEFAULTS.utm_source,
        utm_medium: CAMPAIGN_DEFAULTS.utm_medium,
        utm_campaign: CAMPAIGN_DEFAULTS.utm_campaign,
        utm_content: s,
      });
      e.preventDefault();
      if (window.Calendly && typeof Calendly.initPopupWidget === 'function') {
        Calendly.initPopupWidget({ url: url });
      } else {
        window.location.href = url;
      }
    });
  });

  /* One-time GA4 section impressions (pairs with data-campaign on each section). */
  if ('IntersectionObserver' in window) {
    var sectionSeen = {};
    var sectionIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var sec = entry.target;
          var slug = sec.getAttribute('data-campaign');
          if (!slug || sectionSeen[slug]) return;
          sectionSeen[slug] = true;
          sectionIo.unobserve(sec);
          gaEvent('section_view', {
            section_id: slug,
            utm_source: CAMPAIGN_DEFAULTS.utm_source,
            utm_medium: CAMPAIGN_DEFAULTS.utm_medium,
            utm_campaign: CAMPAIGN_DEFAULTS.utm_campaign,
            utm_content: slug,
          });
        });
      },
      { root: null, rootMargin: '0px 0px -12% 0px', threshold: 0.2 }
    );
    document.querySelectorAll('section[data-campaign]').forEach(function (sec) {
      sectionIo.observe(sec);
    });
  }

  document.querySelectorAll('a.hero-secondary-cta').forEach(function (el) {
    el.addEventListener('click', function () {
      gaEvent('hero_view_work_click', { link_url: el.getAttribute('href') || '#work' });
    });
  });
})();
