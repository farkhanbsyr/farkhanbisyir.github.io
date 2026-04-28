/* ============================================================
   SCRIPT.JS — Portfolio v2
   ============================================================ */


/* ── NAVBAR scroll ──────────────────────────────────────── */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nl');

window.addEventListener('scroll', () => {
  // Tambah class scrolled setelah scroll 60px
  navbar.classList.toggle('scrolled', window.scrollY > 60);

  // Highlight nav link aktif berdasarkan section
  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${current}`);
  });
});


/* ── HAMBURGER (mobile) ─────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
  // Cegah scroll body saat menu terbuka
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

// Tutup menu saat link diklik
navLinks.forEach(l => l.addEventListener('click', () => {
  hamburger.classList.remove('active');
  navMenu.classList.remove('open');
  document.body.style.overflow = '';
}));


/* ── DARK MODE ──────────────────────────────────────────── */
const toggle = document.getElementById('themeToggle');
const root   = document.documentElement;

// Load preferensi tersimpan
root.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

toggle.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


/* ── SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    const offset = navbar.offsetHeight + 8;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});


/* ── REVEAL ANIMATION (IntersectionObserver) ────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));


/* ── FOOTER YEAR ────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ── FOTO tilt on mousemove (fun detail kecil) ──────────── */
const photo = document.querySelector('.hero-photo');
if (photo) {
  document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth  - 0.5) * 5;
    const y = (e.clientY / window.innerHeight - 0.5) * 3;
    photo.style.transform = `rotate(${-1.5 + x * 0.3}deg) perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  document.addEventListener('mouseleave', () => {
    photo.style.transform = '';
  });
}