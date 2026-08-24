(() => {
  'use strict';

  /* ---------- Loading screen ---------- */
  const loadingScreen = document.getElementById('loading-screen');
  window.addEventListener('load', () => {
    setTimeout(() => loadingScreen && loadingScreen.classList.add('is-hidden'), 350);
  });

  /* ---------- Header scroll state ---------- */
  const header = document.getElementById('site-header');
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
    mainNav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- Typewriter ---------- */
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const words = ['Suadero', 'Longaniza', 'Arrachera', 'Chorizo Argentino', 'Alambre', 'Carne Enchilada', 'Burritos'];
    let wordIndex = 0, charIndex = 0, deleting = false;

    const tick = () => {
      const word = words[wordIndex];
      if (!deleting) {
        charIndex++;
        typewriterEl.textContent = word.slice(0, charIndex);
        if (charIndex === word.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typewriterEl.textContent = word.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(tick, deleting ? 45 : 85);
    };
    tick();
  }

  /* ---------- Particles canvas ---------- */
  const canvas = document.getElementById('particles-canvas');
  if (canvas && canvas.getContext) {
    const ctx = canvas.getContext('2d');
    let particles = [];
    let width, height;
    const colors = ['rgba(255,199,44,0.55)', 'rgba(226,49,27,0.4)', 'rgba(255,91,61,0.45)'];

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const createParticles = () => {
      const count = Math.round((width * height) / 22000);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.6,
        speedY: Math.random() * 0.4 + 0.1,
        drift: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speedY;
        p.x += p.drift;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      requestAnimationFrame(draw);
    };

    resize();
    createParticles();
    draw();
    window.addEventListener('resize', () => { resize(); createParticles(); });
  }

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
