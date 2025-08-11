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

// Share buttons
const shareData = {
  url: window.location.href,
  title: document.title,
  text: 'Добрые лесные истории про Пенька и его друзей'
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
