/* ============================================================
   Portfolio — vanilla JavaScript
   ============================================================ */

(() => {
  const html = document.documentElement;
  const navbar = document.getElementById('navbar');
  const themeToggle = document.getElementById('themeToggle');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const copyBtn = document.getElementById('copyEmail');
  const emailLink = document.getElementById('emailLink');
  const toast = document.getElementById('toast');
  const yearEl = document.getElementById('year');

  /* ---------- THEME ---------- */
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = stored || (prefersDark ? 'dark' : 'light');
  html.setAttribute('data-theme', initialTheme);

  themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });

  /* ---------- MOBILE MENU ---------- */
  menuToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
  });
  // Close menu when a link is tapped
  navLinks.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => document.body.classList.remove('nav-open'));
  });

  /* ---------- NAVBAR SCROLL STYLE ---------- */
  const onScroll = () => {
    if (window.scrollY > 8) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- COPY EMAIL ---------- */
  if (copyBtn && emailLink) {
    copyBtn.addEventListener('click', async () => {
      const email = emailLink.textContent.trim();
      try {
        await navigator.clipboard.writeText(email);
      } catch {
        // Fallback for older browsers
        const ta = document.createElement('textarea');
        ta.value = email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      copyBtn.classList.add('copied');
      showToast('Email copied!');
      setTimeout(() => copyBtn.classList.remove('copied'), 1800);
    });
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => toast.classList.remove('show'), 1800);
  }

  /* ---------- REVEAL ON SCROLL ---------- */
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  /* ---------- YEAR ---------- */
  yearEl.textContent = new Date().getFullYear();
})();
