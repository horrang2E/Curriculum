export function setupCardFilters() {
  const buttons = Array.from(document.querySelectorAll('.btn.btn-filter'));
  const grid = document.getElementById('card-grid');
  const status = document.getElementById('card-status');
  if (!buttons.length || !grid) return;

  let current = 'all';

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter || 'all';
      if (filter === current) return;
      current = filter;

      // aria-pressed 업데이트
      buttons.forEach(b => b.setAttribute('aria-pressed', String(b === btn)));

      // 카드 show/hide
      const items = Array.from(grid.querySelectorAll('.card'));
      let shown = 0;
      items.forEach((item) => {
        const tags = (item.dataset.tags || '')
          .split(',')
          .map(s => s.trim().toLowerCase());
        const show = filter === 'all' || tags.includes(filter);
        item.hidden = !show;                        // CSS: [hidden]{display:none} (:contentReference[oaicite:3]{index=3})
        if (show) shown++;
      });

      // 라이브 리전 상태 메시지
      if (status) {
        status.textContent =
          filter === 'all'
            ? `전체 카드 ${shown}개를 표시했습니다.`
            : `${filter.toUpperCase()} 카드 ${shown}개를 표시했습니다.`;
      }
    });
  });

  // 초기 상태: HTML에서 aria-pressed="true"인 버튼을 클릭해 동기화
  const pressed = buttons.find(b => b.getAttribute('aria-pressed') === 'true') || buttons[0];
  pressed.click();
}