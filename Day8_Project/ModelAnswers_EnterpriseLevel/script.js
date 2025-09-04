/* Day8 — Responsive Images & Lazy Loading (Enterprise+) */
const themeBtn = document.getElementById('themeToggle');
const langSelect = document.getElementById('langSelect');
const bannerPicture = document.getElementById('bannerPicture');
const bannerImg = document.getElementById('bannerImg');
const srStatus = document.getElementById('srStatus');

// Theme toggle with persistence
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
applyTheme(savedTheme);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});
function applyTheme(mode){
  document.documentElement.dataset.theme = mode;
  themeBtn.setAttribute('aria-pressed', mode === 'dark');
  localStorage.setItem('theme', mode);
}

// i18n banner switcher using <picture>
function setBanner(lang){
  const map = {
    ko: {
      webp: './images/banner-ko-1200.webp',
      jpg: './images/banner-ko-1200.jpg',
      alt: '한국어 프로모션 배너'
    },
    en: {
      webp: './images/banner-en-1200.webp',
      jpg: './images/banner-en-1200.jpg',
      alt: 'English promotion banner'
    }
  };
  const item = map[lang] || map.ko;
  bannerPicture.innerHTML = `
    <source type="image/webp" srcset="${item.webp}">
    <img id="bannerImg" src="${item.jpg}" alt="${item.alt}" width="1200" height="400" loading="lazy">
  `;
  srStatus.textContent = (lang === 'en' ? 'Banner switched to English.' : '배너가 한국어로 변경되었습니다.');
}
langSelect.addEventListener('change', e => setBanner(e.target.value));
setBanner(langSelect.value);

// Build gallery cards dynamically
const cardsEl = document.querySelector('.cards');
for(let i=1;i<=9;i++){
  const li = document.createElement('li');
  li.className = 'card';
  li.innerHTML = `
    <div class="media">
      <div class="skeleton" aria-hidden="true"></div>
      <picture>
        <source type="image/webp" data-srcset="./images/gallery-${i}-large.webp" media="(min-width: 700px)">
        <source type="image/webp" data-srcset="./images/gallery-${i}-small.webp">
        <img data-src="./images/gallery-${i}-large.jpg"
             alt="갤러리 이미지 ${i}"
             width="900" height="600" loading="lazy" decoding="async">
      </picture>
    </div>
    <div class="body">
      <h3>갤러리 카드 ${i}</h3>
      <p>lazy loading + skeleton UI 데모</p>
    </div>
  `;
  cardsEl.appendChild(li);
}

// Lazy loading fallback with IntersectionObserver
const ioSupported = 'IntersectionObserver' in window;
if(ioSupported){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        hydrate(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });
  document.querySelectorAll('.card').forEach(card => io.observe(card));
}else{
  // Fallback: hydrate immediately for browsers without IO
  document.querySelectorAll('.card').forEach(hydrate);
}

function hydrate(card){
  const pic = card.querySelector('picture');
  const img = pic.querySelector('img');
  const sources = pic.querySelectorAll('source');
  sources.forEach(s => { if(s.dataset.srcset) s.srcset = s.dataset.srcset; });
  if(img.dataset.src) img.src = img.dataset.src;
  img.addEventListener('load', () => {
    card.classList.add('loaded');
    const sk = card.querySelector('.skeleton');
    if(sk) sk.remove();
  }, { once: true });
}

// Reduced motion: fade-in handled in CSS via opacity transition (honors prefers-reduced-motion)