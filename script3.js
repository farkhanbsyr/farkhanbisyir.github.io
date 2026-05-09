/* ============================================================
   SCRIPT.JS — Portfolio Website
   Fitur: Navbar scroll, Dark mode, Smooth scroll,
          Fade-in animasi, Skill bars, Mobile menu
   ============================================================ */


/* ============================================================
   1. NAVBAR — berubah warna saat scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Fungsi untuk update navbar saat scroll
function handleNavbarScroll() {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

// Update link aktif sesuai section yang terlihat
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  let currentSection = '';

  sections.forEach(section => {
    const sectionTop    = section.offsetTop - 120;
    const sectionBottom = sectionTop + section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Jalankan saat scroll
window.addEventListener('scroll', () => {
  handleNavbarScroll();
  updateActiveNavLink();
});

// Jalankan sekali saat halaman dimuat
handleNavbarScroll();
updateActiveNavLink();


/* ============================================================
   2. MOBILE MENU — hamburger toggle
   ============================================================ */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('open');
});

// Tutup menu saat link diklik
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  });
});

// Tutup menu saat klik di luar area menu
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
    hamburger.classList.remove('active');
    navMenu.classList.remove('open');
  }
});


/* ============================================================
   3. DARK MODE TOGGLE
   ============================================================ */
const themeToggle = document.getElementById('themeToggle');

// Ambil preferensi yang disimpan di localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Toggle tema saat tombol diklik
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme     = currentTheme === 'light' ? 'dark' : 'light';

  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme); // simpan preferensi
});


/* ============================================================
   4. SMOOTH SCROLL — klik navbar link
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    const target   = document.querySelector(targetId);

    if (target) {
      const navHeight = navbar.offsetHeight;
      const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top:      targetTop,
        behavior: 'smooth'
      });
    }
  });
});


/* ============================================================
   5. FADE-IN ANIMASI — elemen muncul saat scroll
      Menggunakan IntersectionObserver (lebih efisien dari scroll event)
   ============================================================ */
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target); // stop observing setelah muncul
      }
    });
  },
  {
    threshold:  0.12,  // trigger saat 12% elemen terlihat
    rootMargin: '0px 0px -50px 0px'
  }
);

fadeElements.forEach(el => fadeObserver.observe(el));


/* ============================================================
   6. SKILL BARS — animasi progress bar
      Dijalankan saat section skills masuk viewport
   ============================================================ */
const skillFills   = document.querySelectorAll('.skill-fill');
const skillSection = document.getElementById('skills');
let   skillsAnimated = false; // flag agar animasi hanya sekali

const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;

        // Animasi setiap bar dengan delay bertingkat
        skillFills.forEach((fill, index) => {
          const targetWidth = fill.getAttribute('data-width');

          setTimeout(() => {
            fill.style.width = targetWidth + '%';
          }, index * 120); // delay 120ms per bar
        });
      }
    });
  },
  { threshold: 0.3 }
);

if (skillSection) {
  skillObserver.observe(skillSection);
}


/* ============================================================
   7. FOOTER — update tahun otomatis
   ============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}


/* ============================================================
   8. TYPING EFFECT — teks tagline di hero (opsional)
      Uncomment jika ingin mengaktifkan efek mengetik
   ============================================================ */
/*
const taglineEl = document.querySelector('.hero-tagline');
const taglines  = [
  'Web Developer',
  'Programmer',
  'UI/UX Enthusiast',
  'Student'
];

let taglineIndex = 0;
let charIndex    = 0;
let isDeleting   = false;

function typeEffect() {
  const current = taglines[taglineIndex];

  if (isDeleting) {
    taglineEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    taglineEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1800);
    return;
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    taglineIndex = (taglineIndex + 1) % taglines.length;
  }

  const speed = isDeleting ? 60 : 90;
  setTimeout(typeEffect, speed);
}

typeEffect();
*/


/* ============================================================
   9. LOADING — sembunyikan jika ada loading screen
   ============================================================ */
window.addEventListener('load', () => {
  // Trigger fade-in untuk elemen yang sudah di viewport
  fadeElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) {
      el.classList.add('visible');
    }
  });
});