// Mobile sidebar toggle
const sidebar = document.getElementById('sidebar');
const hamburger = document.getElementById('hamburger');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const open = sidebar.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(open));
  });
}

// Smooth active nav highlighting
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

const byId = id => document.getElementById(id);
const setActive = id => {
  navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${id}`));
};

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12 });

sections.forEach(sec => io.observe(sec));

const spy = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setActive(entry.target.id);
    }
  });
}, { rootMargin: "-40% 0px -55% 0px", threshold: 0.01 });

sections.forEach(sec => spy.observe(sec));

// Close sidebar on nav click (mobile)
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 860px)').matches) {
      sidebar.classList.remove('open');
      hamburger.setAttribute('aria-expanded','false');
    }
  });
});

// Hero Slider Implementation
class HeroSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.slides = this.container.querySelectorAll('.slide');
    this.dots = this.container.querySelectorAll('.dot');
    this.prevBtn = this.container.querySelector('.slider-btn.prev');
    this.nextBtn = this.container.querySelector('.slider-btn.next');
    
    this.currentSlide = 0;
    this.init();
  }
  
  init() {
    this.showSlide(0);
    this.bindEvents();
    this.startAutoSlide();
  }
  
  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => this.goToSlide(index));
    });
  }
  
  showSlide(index) {
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
    
    this.currentSlide = index;
  }
  
  nextSlide() {
    const next = (this.currentSlide + 1) % this.slides.length;
    this.showSlide(next);
  }
  
  previousSlide() {
    const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.showSlide(prev);
  }
  
  goToSlide(index) {
    this.showSlide(index);
  }
  
  startAutoSlide() {
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }
}

// Gallery Slider Implementation  
class GallerySlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.track = this.container.querySelector('.gallery-track');
    this.slides = this.container.querySelectorAll('.gallery-slide');
    this.prevBtn = this.container.querySelector('.gallery-btn.prev');
    this.nextBtn = this.container.querySelector('.gallery-btn.next');
    this.counter = this.container.querySelector('.gallery-counter');
    
    this.currentSlide = 0;
    this.init();
  }
  
  init() {
    this.updateSlider();
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Touch/swipe support
    let startX = 0;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
      }
    });
  }
  
  updateSlider() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    if (this.counter) {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
    }
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }
  
  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }
}

// Coloring Slider Implementation
class ColoringSlider {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;
    
    this.track = this.container.querySelector('.coloring-track');
    this.slides = this.container.querySelectorAll('.coloring-slide');
    this.prevBtn = this.container.querySelector('.coloring-nav-btn.prev');
    this.nextBtn = this.container.querySelector('.coloring-nav-btn.next');
    this.counter = this.container.querySelector('.coloring-counter');
    
    this.currentSlide = 0;
    this.init();
  }
  
  init() {
    this.updateSlider();
    this.bindEvents();
  }
  
  bindEvents() {
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.previousSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Print functionality
    this.container.addEventListener('click', (e) => {
      if (e.target.closest('.coloring-btn.print')) {
        e.preventDefault();
        this.printColoring(e.target.closest('.coloring-slide'));
      }
    });
  }
  
  updateSlider() {
    const translateX = -this.currentSlide * 100;
    this.track.style.transform = `translateX(${translateX}%)`;
    
    if (this.counter) {
      this.counter.textContent = `${this.currentSlide + 1} / ${this.slides.length}`;
    }
  }
  
  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.updateSlider();
  }
  
  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.updateSlider();
  }
  
  printColoring(slide) {
    const img = slide.querySelector('img');
    if (!img) return;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Раскраска - ${img.alt || 'Саня'}</title>
          <style>
            body { margin: 0; padding: 20px; text-align: center; }
            img { max-width: 100%; height: auto; }
            @media print {
              body { margin: 0; padding: 0; }
              img { width: 100%; page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <img src="${img.src}" alt="${img.alt || 'Раскраска'}" />
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  }
}

// Share buttons
const shareData = {
  url: window.location.href,
  title: document.title,
  text: 'Добрые лесные истории про Саню и его друзей'
};

function openShare(network){
  const url = encodeURIComponent(shareData.url);
  const title = encodeURIComponent(shareData.title);
  const text = encodeURIComponent(shareData.text);

  let shareUrl = '';
  switch(network){
    case 'vk':
      shareUrl = `https://vk.com/share.php?url=${url}&title=${text}`;
      break;
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      break;
    case 'telegram':
      shareUrl = `https://t.me/share/url?url=${url}&text=${text}`;
      break;
    case 'ok':
      shareUrl = `https://connect.ok.ru/offer?url=${url}&title=${title}`;
      break;
    case 'mailru':
      shareUrl = `https://connect.mail.ru/share?url=${url}&title=${title}&description=${text}`;
      break;
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`;
      break;
    default: return;
  }
  window.open(shareUrl, '_blank', 'noopener,noreferrer,width=720,height=540');
}

document.querySelectorAll('.btn-share').forEach(btn => {
  btn.addEventListener('click', () => {
    const net = btn.getAttribute('data-network');
    if (net) openShare(net);
  });
});

// Native share
const shareNative = document.getElementById('shareNative');
if (shareNative) {
  shareNative.addEventListener('click', async () => {
    if (navigator.share) {
      try { await navigator.share(shareData); } catch {}
    } else {
      openShare('vk'); // fallback
    }
  });
}

// Share popover
const shareMore = document.getElementById('shareMore');
const sharePopover = document.getElementById('sharePopover');
if (shareMore && sharePopover) {
  shareMore.addEventListener('click', (e) => {
    const expanded = sharePopover.classList.toggle('open');
    shareMore.setAttribute('aria-expanded', String(expanded));
    e.stopPropagation();
  });
  document.addEventListener('click', (e) => {
    if (!sharePopover.contains(e.target) && e.target !== shareMore) {
      sharePopover.classList.remove('open');
      shareMore.setAttribute('aria-expanded', 'false');
    }
  });
}

// Lightbox for gallery
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, caption){
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = caption || '';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden','false');
}

function closeLightbox(){
  if (!lightbox) return;
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden','true');
  lightboxImg.src = '';
  lightboxCaption.textContent = '';
}

document.querySelectorAll('.gallery .thumb').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    openLightbox(a.getAttribute('href'), a.dataset.caption);
  });
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox();
  });
}

// Contact form (client-side validation + demo submission)
const form = document.getElementById('contactForm');
const formNote = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = data.get('name')?.toString().trim();
    const email = data.get('email')?.toString().trim();
    const message = data.get('message')?.toString().trim();
    const agree = data.get('agree');

    if (!name || !email || !message || !agree) {
      formNote.textContent = 'Пожалуйста, заполните все поля и подтвердите согласие.';
      formNote.style.color = '#c0392b';
      return;
    }

    // Demo success
    form.reset();
    formNote.textContent = 'Спасибо! Ваше сообщение отправлено. Мы ответим в ближайшее время.';
    formNote.style.color = 'var(--primary-600)';
  });
}

// Audio player for books
let currentAudio = null;

function playAudio(bookId) {
  // Stop current audio if playing
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }

  // Map book IDs to audio files
  const audioFiles = {
    book1: 'assets/audio/book-1.mp3',
    book2: 'assets/audio/book-2.mp3',
    book3: 'assets/audio/book-3.mp3'
  };

  const audioSrc = audioFiles[bookId];
  if (!audioSrc) {
    alert('Аудиозапись скоро будет доступна!');
    return;
  }

  currentAudio = new Audio(audioSrc);
  
  currentAudio.addEventListener('loadstart', () => {
    console.log('Загрузка аудио...');
  });
  
  currentAudio.addEventListener('error', () => {
    alert('Аудиозапись скоро будет доступна!');
  });
  
  currentAudio.play().catch(() => {
    alert('Аудиозапись скоро будет доступна!');
  });
}

// Stop audio when page unloads
window.addEventListener('beforeunload', () => {
  if (currentAudio) {
    currentAudio.pause();
  }
});

// Initialize sliders when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Hero Slider
  new HeroSlider('.hero-slider');
  
  // Initialize Gallery Slider
  new GallerySlider('.gallery-slider');
  
  // Initialize Coloring Slider
  new ColoringSlider('.coloring-slider');
  
  console.log('🌳 Все слайдеры инициализированы!');
});
