export function setupThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const STORAGE_KEY = 'prefers-dark';
  const root = document.body;

  // 초기 상태: 저장된 값 > 시스템 선호도
  const initial = (() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'true') return true;
    if (saved === 'false') return false;
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  })();

  apply(initial);

  btn.addEventListener('click', () => {
    const next = !root.classList.contains('dark');
    apply(next);
  });

  function apply(isDark) {
    root.classList.toggle('dark', isDark);          // CSS: body.dark 토큰 적용 (:contentReference[oaicite:2]{index=2})
    btn.setAttribute('aria-pressed', String(isDark));
    btn.textContent = isDark ? '🌞 Light Mode' : '🌛 Dark Mode';
    btn.setAttribute('aria-label', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    localStorage.setItem(STORAGE_KEY, String(isDark));
  }
}