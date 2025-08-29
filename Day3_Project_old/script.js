// script.js

// ---------- 헬퍼 ----------
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// ---------- 다크 모드 ----------
(() => {
  const btn = $('#theme-toggle');
  if (!btn) return;

  // 초기 상태: 저장된 테마 우선, 없으면 OS 선호도 사용
  const saved = localStorage.getItem('theme');
  const preferDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  const initialDark = saved ? saved === 'dark' : preferDark;

  const apply = (isDark) => {
    document.body.classList.toggle('dark', isDark);
    btn.setAttribute('aria-pressed', String(isDark));
    btn.textContent = isDark ? '🌞 Light Mode' : '🌛 Dark Mode';
  };

  apply(initialDark);

  btn.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('dark');
    apply(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
})();

// ---------- 카드 필터 ----------
(() => {
  const grid = $('#card-grid');           // <ul id="card-grid">
  const status = $('#card-status');       // <div id="card-status" aria-live="polite">
  const buttons = $$('.btn-filter');      // data-filter = all | ui | ux | code
  const cards = $$('.card', grid);        // <li class="card" data-tags="ui|ux|code">

  if (!grid || !buttons.length || !cards.length) return;

  const setPressed = (activeBtn) => {
    buttons.forEach(b => b.setAttribute('aria-pressed', String(b === activeBtn)));
  };

  const show = (filter) => {
    let count = 0;
    cards.forEach(card => {
      const tag = (card.getAttribute('data-tags') || '').trim().toLowerCase();
      const visible = filter === 'all' || tag === filter;
      card.hidden = !visible;             // CSS의 [hidden]{display:none} 사용
      if (visible) count++;
    });
    if (status) status.textContent = `총 ${count}개 카드 표시`;
  };

  // 초기: '전체'가 aria-pressed="true"로 되어 있음 (HTML 참고)
  const active = buttons.find(b => b.getAttribute('aria-pressed') === 'true') || buttons[0];
  setPressed(active);
  show(active.dataset.filter || 'all');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      setPressed(btn);
      show(btn.dataset.filter || 'all');
    });
  });
})();

// ---------- (옵션) 모바일 메뉴 토글 ----------
(() => {
  const toggle = $('#menu-toggle');
  const nav = $('#site-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.hidden = open;                    // 토글 시 표시/숨김
  });

  // 초기에는 메뉴 보이도록
  nav.hidden = false;
})();