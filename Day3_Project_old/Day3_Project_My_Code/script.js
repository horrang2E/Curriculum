const themeBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    menuBtn.setAttribute('aria-label', expanded ? '메뉴 열기' : '메뉴 닫기');

    // 펼침/접힘은 body 클래스 토글로 제어 (CSS와 연동)
    body.classList.toggle('nav-open', !expanded);
  });
}

if (saved === 'dark') {
  document.body.dataset.theme = 'dark';
  themeBtn.textContent = '🌞 Light Mode';
}
themeBtn.addEventListener('click', () => {
  const isDark = document.body.dataset.theme === "dark";
  document.body.dataset.theme = isDark ? "light" : "dark";
  document.documentElement.style.setProperty("--bg-color", isDark ? "#ffffff" : "#000000");
  document.documentElement.style.setProperty("--text-color", isDark ? "#000000" : "#ffffff");
  btn.textContent = isDark ? "🌙 Dark Mode" : "🌞 Light Mode";
  btn.setAttribute("aria-label", isDark ? "다크모드로 전환" : "라이트모드로 전환");
});

demoBtn?.addEventListener("click", () => {
  alert("데모 동작: 이벤트 리스너가 연결돼 있어요!");
});


const menuBtn = document.getElementById('menu-toggle');
const body    = document.body;



filters.forEach(btn => {
  btn.addEventListener('click', () => {
    // pressed 상태 업데이트
    filters.forEach(b => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    applyFilter(btn.dataset.filter);
  });
});

// 초기 상태
applyFilter('all');