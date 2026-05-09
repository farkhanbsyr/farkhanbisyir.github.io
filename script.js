/* ============================================================
   SCRIPT.JS — Farkhan Bisyir Portfolio
   ============================================================ */

/* ── CURSOR ──────────────────────────────────────────────── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mx = -100, my = -100, cx = -100, cy = -100;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cx += (mx - cx) * 0.12;
  cy += (my - cy) * 0.12;
  if (cursor)    cursor.style.cssText    = `left:${cx}px;top:${cy}px`;
  if (cursorDot) cursorDot.style.cssText = `left:${mx}px;top:${my}px`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

/* Cursor membesar saat hover link/button */
document.querySelectorAll('a, button').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursor) { cursor.style.width='54px'; cursor.style.height='54px'; }
  });
  el.addEventListener('mouseleave', () => {
    if (cursor) { cursor.style.width='36px'; cursor.style.height='36px'; }
  });
});


/* ── NAV — sticky + link aktif ───────────────────────────── */
const nav   = document.getElementById('nav');
const links = document.querySelectorAll('.nl');

window.addEventListener('scroll', () => {
  nav.classList.toggle('stuck', window.scrollY > 60);

  let current = '';
  document.querySelectorAll('section[id]').forEach(s => {
    if (window.scrollY >= s.offsetTop - 140) current = s.id;
  });
  links.forEach(l => {
    l.classList.toggle('on', l.getAttribute('href') === `#${current}`);
  });
});


/* ── HAMBURGER ───────────────────────────────────────────── */
const burger  = document.getElementById('burger');
const navMenu = document.getElementById('navMenu');

burger?.addEventListener('click', () => {
  burger.classList.toggle('on');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

links.forEach(l => l.addEventListener('click', () => {
  burger?.classList.remove('on');
  navMenu.classList.remove('open');
  document.body.style.overflow = '';
}));


/* ── DARK MODE ───────────────────────────────────────────── */
const modeBtn = document.getElementById('modeBtn');
const root    = document.documentElement;

root.setAttribute('data-theme', localStorage.getItem('theme') || 'light');

modeBtn?.addEventListener('click', () => {
  const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});


/* ── SMOOTH SCROLL ───────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 8;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});


/* ── REVEAL ANIMATION ────────────────────────────────────── */
const io = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (!entry.isIntersecting) return;
    /* delay ringan per elemen dalam group */
    setTimeout(() => entry.target.classList.add('on'), i * 60);
    io.unobserve(entry.target);
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.r').forEach(el => io.observe(el));


/* ── FOOTER YEAR ─────────────────────────────────────────── */
const yr = document.getElementById('yr');
if (yr) yr.textContent = new Date().getFullYear();