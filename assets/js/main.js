/* ─── Nav: scroll + mobile toggle ─────────────────────────────────────────── */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');

  if (nav) {
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
  }

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      const open = links.classList.toggle('open');
      toggle.classList.toggle('open', open);
      toggle.setAttribute('aria-expanded', open);
    });

    // Close on link click (mobile)
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
})();

/* ─── Active nav link (anchor tracking) ────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  if (!sections.length) return;

  const navLinks = document.querySelectorAll('.nav__links a[href^="#"], .nav__links a[href*="#"]');

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navLinks.forEach(function (link) {
          const href = link.getAttribute('href');
          const target = '#' + entry.target.id;
          link.classList.toggle('active', href === target || href.endsWith(target));
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();

/* ─── Typewriter effect (hero) ──────────────────────────────────────────────── */
(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'whoami',
    'cat research_interests.txt',
    'ls publications/ | wc -l',
    './red-team --target=supply-chain',
    'grep -r "0day" ./findings/',
    'ssh pl@world',
  ];

  let phraseIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let paused = false;

  const TYPING_SPEED  = 70;
  const DELETE_SPEED  = 35;
  const PAUSE_END     = 1600;
  const PAUSE_START   = 300;

  function tick() {
    const phrase = phrases[phraseIdx];

    if (paused) return;

    if (!deleting) {
      charIdx++;
      el.textContent = phrase.slice(0, charIdx);

      if (charIdx === phrase.length) {
        paused = true;
        setTimeout(function () {
          deleting = true;
          paused = false;
          requestAnimationFrame(loop);
        }, PAUSE_END);
        return;
      }
    } else {
      charIdx--;
      el.textContent = phrase.slice(0, charIdx);

      if (charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        paused = true;
        setTimeout(function () {
          paused = false;
          requestAnimationFrame(loop);
        }, PAUSE_START);
        return;
      }
    }

    requestAnimationFrame(loop);
  }

  let lastTime = 0;

  function loop(ts) {
    if (!ts) { requestAnimationFrame(loop); return; }
    const speed = deleting ? DELETE_SPEED : TYPING_SPEED;
    if (ts - lastTime >= speed) {
      lastTime = ts;
      tick();
    } else {
      requestAnimationFrame(loop);
    }
  }

  requestAnimationFrame(loop);
})();

/* ─── Scroll reveal ─────────────────────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -60px 0px' });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ─── Blog tag filter ───────────────────────────────────────────────────────── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-tag');
  const postCards  = document.querySelectorAll('.post-card[data-tags]');

  if (!filterBtns.length || !postCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      const tag = btn.dataset.tag;

      postCards.forEach(function (card) {
        if (tag === 'all') {
          card.style.display = '';
        } else {
          const tags = (card.dataset.tags || '').split(',').map(function (t) { return t.trim(); });
          card.style.display = tags.includes(tag) ? '' : 'none';
        }
      });
    });
  });
})();

/* ─── Reading time estimator ────────────────────────────────────────────────── */
(function () {
  const body = document.querySelector('.post-page__body');
  const rtEl = document.getElementById('reading-time');
  if (!body || !rtEl) return;

  const words = body.innerText.trim().split(/\s+/).length;
  const mins  = Math.max(1, Math.round(words / 200));
  rtEl.textContent = mins + ' min read';
})();
