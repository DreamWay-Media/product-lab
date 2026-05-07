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
        { src: null, caption: 'Trail Chews — Packaging Front' },
        { src: null, caption: 'Trail Chews — Packaging Detail' },
        { src: null, caption: 'Trail Chews — Product Shot' },
        { src: null, caption: 'Trail Chews — Lifestyle' },
        { src: null, caption: 'Trail Chews — Brand System' },
        { src: null, caption: 'Trail Chews — Label Design' },
        { src: null, caption: 'Trail Chews — Manufacturing' },
        { src: null, caption: 'Trail Chews — Final Product' },
      ],
    },
    'food-bev': {
      title: 'Specialty Food Products',
      images: [
        { src: null, caption: 'Olives — Packaging' },
        { src: null, caption: 'Preserves — Label Design' },
        { src: null, caption: 'Wafer Rolls — Product Shot' },
        { src: null, caption: 'Canned Goods — Range' },
        { src: null, caption: 'Beverage Mixes — Brand' },
      ],
    },
    'clean-torch': {
      title: 'Clean Torch',
      images: [
        { src: null, caption: 'Clean Torch — Product Shot' },
        { src: null, caption: 'Clean Torch — Packaging' },
        { src: null, caption: 'Clean Torch — Lifestyle' },
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
    var wrap = document.getElementById('lb-img-wrap');
    var thumbs = document.getElementById('lb-thumbnails');
    if (!titleEl || !counterEl || !captionEl || !prevBtn || !nextBtn || !wrap || !thumbs) return;

    titleEl.textContent = g.title;
    counterEl.textContent = currentIndex + 1 + ' / ' + g.images.length;
    captionEl.textContent = img.caption;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex === g.images.length - 1;

    if (img.src) {
      wrap.innerHTML = '<img src="' + esc(img.src) + '" alt="' + esc(img.caption) + '" />';
    } else {
      wrap.innerHTML =
        '<div class="lb-img-placeholder"><div class="icon">⊕</div><div class="lbl">' +
        esc(img.caption) +
        '</div></div>';
    }

    thumbs.innerHTML = g.images
      .map(function (im, i) {
        var active = i === currentIndex ? ' active' : '';
        if (im.src) {
          return (
            '<button type="button" class="lb-thumb' +
            active +
            '" data-lb-go="' +
            i +
            '" aria-label="' +
            esc(im.caption) +
            '"><img src="' +
            esc(im.src) +
            '" alt="' +
            esc(im.caption) +
            '" /></button>'
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

    thumbs.querySelectorAll('[data-lb-go]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var i = Number(btn.getAttribute('data-lb-go'));
        if (!isNaN(i)) {
          currentIndex = i;
          renderLightbox();
        }
      });
    });
  }

  function openGallery(id) {
    if (!galleries[id]) return;
    currentGallery = id;
    currentIndex = 0;
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderLightbox();
  }

  function closeLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
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

  document.addEventListener('keydown', function (e) {
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

    prevBtnEl.addEventListener('click', function () {
      current = Math.max(0, current - 1);
      render();
    });
    nextBtnEl.addEventListener('click', function () {
      current = Math.min(pages - 1, current + 1);
      render();
    });

    buildDots();
    render();
    window.addEventListener('resize', recalc);
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
      var x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      var y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      var max = 18;
      backdropInner.style.transform =
        'translate3d(' + Math.round(x * max) + 'px, ' + Math.round(y * max * 0.6) + 'px, 0)';
    }

    function heroPointerLeave() {
      if (!backdropInner || reduce) return;
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
})();
