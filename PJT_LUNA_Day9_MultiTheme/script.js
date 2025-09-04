const buttons = document.querySelectorAll('button[data-theme]');
const srStatus = document.getElementById('srStatus');

// 초기 테마: localStorage → prefers-color-scheme → default light
const saved = localStorage.getItem('theme');
if(saved){
  setTheme(saved, false);
}else if(window.matchMedia('(prefers-color-scheme: dark)').matches){
  setTheme('dark', false);
}else{
  setTheme('light', false);
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const mode = btn.dataset.theme;
    setTheme(mode, true);
  });
});

function setTheme(mode, announce){
  document.documentElement.setAttribute('data-theme', mode);
  localStorage.setItem('theme', mode);
  if(announce){
    let msg = '';
    switch(mode){
      case 'dark': msg = '다크 테마로 변경됨'; break;
      case 'contrast': msg = '고대비 테마로 변경됨'; break;
      case 'colorful': msg = '컬러풀 테마로 변경됨'; break;
      default: msg = '라이트 테마로 변경됨';
    }
    srStatus.textContent = msg;
  }
}