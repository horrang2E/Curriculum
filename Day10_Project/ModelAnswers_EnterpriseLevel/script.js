document.addEventListener('DOMContentLoaded', () => {
  // Force-hide in case any resets/extensions broke the [hidden] default
  document.getElementById('modal')?.setAttribute('hidden','');
  document.getElementById('dropdown')?.setAttribute('hidden','');
  document.getElementById('spinner')?.setAttribute('hidden','');
  document.getElementById('skeleton')?.setAttribute('hidden','');
  document.getElementById('contentCard')?.setAttribute('hidden','');
});

/* Day10 — Advanced Animations with performance & a11y */
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const modalPanel = document.querySelector('.modal-panel');
const backdrop = document.querySelector('.modal-backdrop');
const confirmBtn = document.getElementById('confirmBtn');

const loadBtn = document.getElementById('loadData');
const spinner = document.getElementById('spinner');
const skeleton = document.getElementById('skeleton');
const contentCard = document.getElementById('contentCard');
const srStatus = document.getElementById('srStatus');

const toggleDropdownBtn = document.getElementById('toggleDropdown');
const dropdown = document.getElementById('dropdown');

const reduceMotionToggle = document.getElementById('reduceMotionToggle');

reduceMotionToggle.addEventListener('change', () => {
  document.documentElement.dataset.reduceMotion = reduceMotionToggle.checked ? 'true' : 'false';
});

loadBtn.addEventListener('click', () => {
  srStatus.textContent = '데이터 로딩을 시작합니다.';
  spinner.hidden = false; spinner.setAttribute('aria-hidden', 'false');
  skeleton.hidden = true; skeleton.setAttribute('aria-hidden', 'true');
  contentCard.hidden = true; contentCard.classList.remove('show');
  setTimeout(() => {
    spinner.hidden = true; spinner.setAttribute('aria-hidden', 'true');
    skeleton.hidden = false; skeleton.setAttribute('aria-hidden', 'false');
    srStatus.textContent = '로딩 중…';
    setTimeout(() => {
      skeleton.hidden = true; skeleton.setAttribute('aria-hidden', 'true');
      contentCard.hidden = false;
      requestAnimationFrame(() => contentCard.classList.add('show'));
      srStatus.textContent = '콘텐츠가 로드되었습니다.';
    }, 1200);
  }, 800);
});

toggleDropdownBtn.addEventListener('click', () => {
  const show = dropdown.hasAttribute('hidden');
  if(show){
    dropdown.removeAttribute('hidden');
    requestAnimationFrame(() => dropdown.classList.add('fade-slide','show'));
  }else{
    dropdown.classList.remove('show');
    dropdown.addEventListener('transitionend', () => dropdown.setAttribute('hidden',''), { once:true });
  }
});

let lastFocused = null;
openModalBtn.addEventListener('click', () => {
  lastFocused = document.activeElement;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modalPanel.classList.add('show'));
  setTimeout(() => modalPanel.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')?.focus(), 0);
});
function closeModal(){
  modalPanel.classList.remove('show');
  modal.addEventListener('transitionend', () => {
    modal.setAttribute('hidden','');
    document.body.style.overflow = '';
    lastFocused?.focus();
  }, { once:true });
}
closeModalBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
confirmBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', (e)=>{
  if(!modal.hasAttribute('hidden') && e.key === 'Escape') closeModal();
});

document.addEventListener('keydown', (e)=>{
  if(modal.hasAttribute('hidden')) return;
  if(e.key !== 'Tab') return;
  const focusables = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if(focusables.length === 0) return;
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if(e.shiftKey && document.activeElement === first){ last.focus(); e.preventDefault(); }
  else if(!e.shiftKey && document.activeElement === last){ first.focus(); e.preventDefault(); }
});
