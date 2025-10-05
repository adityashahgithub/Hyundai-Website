// Navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

// Intro overlay hide on load
window.addEventListener('load', () => {
  const overlay = document.querySelector('.intro-overlay');
  if (overlay) {
    setTimeout(() => overlay.classList.add('hide'), 900);
  }
  // Initialize progress bar
  updateProgress();
});

// Simple slider
const slider = document.querySelector('[data-slider]');
const slidesTrack = slider?.querySelector('[data-slides]');
const slideEls = slidesTrack ? Array.from(slidesTrack.children) : [];
let currentIndex = 0;

function goToSlide(index) {
  if (!slidesTrack) return;
  currentIndex = (index + slideEls.length) % slideEls.length;
  slidesTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
  slideEls.forEach((el, i) => el.classList.toggle('is-active', i === currentIndex));
  updateDots();
}

const prevBtn = slider?.querySelector('[data-prev]');
const nextBtn = slider?.querySelector('[data-next]');
prevBtn?.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn?.addEventListener('click', () => goToSlide(currentIndex + 1));

// Dots
const dotsRoot = slider?.querySelector('[data-dots]');
let dots = [];
if (dotsRoot && slideEls.length) {
  dotsRoot.innerHTML = '';
  dots = slideEls.map((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', `Go to slide ${i + 1}`);
    b.addEventListener('click', () => goToSlide(i));
    dotsRoot.appendChild(b);
    return b;
  });
}
function updateDots() {
  dots.forEach((d, i) => d.setAttribute('aria-current', String(i === currentIndex)));
}
goToSlide(0);

// Auto-play with pause on hover
let autoTimer = null;
function startAuto() {
  stopAuto();
  autoTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
}
function stopAuto() {
  if (autoTimer) clearInterval(autoTimer);
}
if (slider) {
  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);
  startAuto();
}

// Reveal on scroll
const revealEls = document.querySelectorAll('[data-reveal], .card, .cta, .highlight-inner');
const io = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 }) : null;

revealEls.forEach((el) => {
  el.setAttribute('data-reveal', '');
  if (io) io.observe(el);
});

// Scroll progress bar
const progressFill = document.querySelector('.progress-bar__fill');
function updateProgress() {
  if (!progressFill) return;
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressFill.style.width = `${progress}%`;
}
window.addEventListener('scroll', updateProgress, { passive: true });

// Parallax effect for hero media
const parallaxEls = document.querySelectorAll('[data-parallax]');
function updateParallax() {
  const viewportH = window.innerHeight;
  parallaxEls.forEach((el) => {
    const speed = parseFloat(el.getAttribute('data-parallax') || '0.1');
    const rect = el.getBoundingClientRect();
    const isVisible = rect.bottom > 0 && rect.top < viewportH;
    if (!isVisible) return;
    const translate = (rect.top - viewportH / 2) * speed;
    el.style.transform = `translateY(${translate}px) scale(1.02)`;
  });
}
window.addEventListener('scroll', () => { updateParallax(); }, { passive: true });
window.addEventListener('resize', () => { updateParallax(); updateProgress(); });
updateParallax();


