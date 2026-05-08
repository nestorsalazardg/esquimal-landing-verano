// ---- NAV SCROLL EFFECT ----
const nav = document.getElementById('mainNav');
const heroCard = document.querySelector('.hero-card');

function updateNav() {
  const scrollY = window.scrollY;
  const navH = nav.offsetHeight;

  if (heroCard) {
    const cardTop = heroCard.getBoundingClientRect().top + scrollY;
    const cardBottom = cardTop + heroCard.offsetHeight;

    const navOverCard = scrollY >= cardTop - navH && scrollY < cardBottom - navH;

    if (navOverCard) {
      nav.classList.add('nav-hero');
    } else {
      nav.classList.remove('nav-hero');
    }
  }

  if (scrollY > 10) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

// ---- MOBILE MENU ----
const hamburger = document.getElementById('navHamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('active');
  document.body.style.overflow = 'hidden';
});

mobileMenuClose.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = '';
}

// ---- PRODUCT SLIDER ----
const slider = document.getElementById('productSlider');
const dotsContainer = document.getElementById('sliderDots');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');

let currentSlide = 0;
let slidesPerView = 3;
let isDragging = false;
let startX = 0;

function getCardsPerView() {
  if (window.innerWidth <= 768) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
}

function getTotalPages() {
  const cards = slider.querySelectorAll('.product-card');
  return Math.max(1, Math.ceil(cards.length / slidesPerView));
}

function buildDots() {
  dotsContainer.innerHTML = '';
  const pages = getTotalPages();
  for (let i = 0; i < pages; i++) {
    const dot = document.createElement('div');
    dot.className = 'slider-dot' + (i === currentSlide ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  }
}

function goToSlide(index) {
  const pages = getTotalPages();
  currentSlide = Math.max(0, Math.min(index, pages - 1));

  const card = slider.querySelector('.product-card');
  if (!card) return;

  const gap = parseFloat(getComputedStyle(slider).gap) || 24;
  const cardWidth = card.offsetWidth + gap;
  const offset = currentSlide * slidesPerView * cardWidth;

  slider.style.transform = `translateX(-${offset}px)`;

  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

// Touch / Drag support
slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.pageX;
  slider.style.transition = 'none';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  e.preventDefault();
});

slider.addEventListener('mouseup', (e) => {
  if (!isDragging) return;
  isDragging = false;
  slider.style.transition = '';
  const diff = e.pageX - startX;
  if (Math.abs(diff) > 60) {
    if (diff < 0) goToSlide(currentSlide + 1);
    else goToSlide(currentSlide - 1);
  }
});

slider.addEventListener('mouseleave', () => {
  if (isDragging) {
    isDragging = false;
    slider.style.transition = '';
  }
});

// Touch events
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX;
  slider.style.transition = 'none';
}, { passive: true });

slider.addEventListener('touchend', (e) => {
  slider.style.transition = '';
  const diff = e.changedTouches[0].pageX - startX;
  if (Math.abs(diff) > 50) {
    if (diff < 0) goToSlide(currentSlide + 1);
    else goToSlide(currentSlide - 1);
  }
});

function handleResize() {
  slidesPerView = getCardsPerView();
  currentSlide = 0;
  buildDots();
  goToSlide(0);
}

window.addEventListener('resize', handleResize);
handleResize();

// ---- SCROLL REVEAL ANIMATIONS ----
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const navHeight = nav.offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});