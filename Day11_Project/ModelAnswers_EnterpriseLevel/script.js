/* Day11 — Landing Page Clone (Enterprise+) */
const themeBtn = document.getElementById('themeToggle');
const srStatus = document.getElementById('srStatus');

(function initTheme(){
  const saved = localStorage.getItem('theme');
  if(saved){ setTheme(saved, false); }
  else if(window.matchMedia('(prefers-color-scheme: dark)').matches){ setTheme('dark', false); }
  else { setTheme('light', false); }
})();

themeBtn.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  setTheme(next, true);
});

function setTheme(mode, announce){
  document.documentElement.dataset.theme = mode;
  themeBtn.setAttribute('aria-pressed', mode === 'dark');
  localStorage.setItem('theme', mode);
  if(announce){
    srStatus.textContent = mode === 'dark' ? '다크 모드로 전환됨' : '라이트 모드로 전환됨';
  }
}

const form = document.querySelector('.cta-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = form.email.value.trim();
  if(!email){
    srStatus.textContent = '이메일을 입력하세요.';
    form.email.focus();
    return;
  }
  srStatus.textContent = '가입 요청을 전송했습니다. 확인 메일을 확인해 주세요.';
  form.reset();
});
