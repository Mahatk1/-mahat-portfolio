// =============================================
// AOS INIT
// =============================================
AOS.init({
  duration: 750,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic'
});

// =============================================
// NAVBAR SCROLL EFFECT
// =============================================
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    mainNav.classList.add('scrolled');
  } else {
    mainNav.classList.remove('scrolled');
  }
  updateActiveNav();
  toggleScrollTop();
});

function updateActiveNav() {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// =============================================
// SMOOTH SCROLL FOR NAV LINKS
// =============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    const target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      // Close mobile nav if open
      const navCollapse = document.getElementById('navMenu');
      if (navCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
        if (bsCollapse) bsCollapse.hide();
      }
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// =============================================
// SCROLL TO TOP BUTTON
// =============================================
const scrollTopBtn = document.getElementById('scrollTop');

function toggleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// TYPING EFFECT
// =============================================
const typedEl = document.getElementById('typed-text');
const phrases = [
  "I'm an Informatics Student",
  "I'm Open to Opportunities"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typedEl.textContent = currentPhrase.substring(0, charIndex);

  let delay = isDeleting ? 60 : 100;

  if (!isDeleting && charIndex === currentPhrase.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimeout = setTimeout(typeLoop, delay);
}

// Start typing after a short delay
setTimeout(typeLoop, 800);

// =============================================
// NAVBAR CLOSE ON OUTSIDE CLICK (MOBILE)
// =============================================
document.addEventListener('click', (e) => {
  const navMenu = document.getElementById('navMenu');
  const toggler = document.querySelector('.navbar-toggler');
  if (
    navMenu.classList.contains('show') &&
    !navMenu.contains(e.target) &&
    !toggler.contains(e.target)
  ) {
    const bsCollapse = bootstrap.Collapse.getInstance(navMenu);
    if (bsCollapse) bsCollapse.hide();
  }
});
