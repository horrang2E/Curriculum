export function setupResponsiveNav() {
  const toggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('site-nav');
  const DESKTOP_MIN = 768;

  const isDesktop = () =>
    window.matchMedia(`(min-width:${DESKTOP_MIN}px)`).matches;

  function applyLayout() {
    if (!toggle || !nav) return;

    if (isDesktop()) {
      toggle.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      nav.hidden = false;
    } else {
      toggle.hidden = false;
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      nav.hidden = !expanded;
    }
  }

  toggle?.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.hidden = expanded;
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !isDesktop() && !nav.hidden) {
      toggle.setAttribute('aria-expanded', 'false');
      nav.hidden = true;
      toggle.focus();
    }
  });

  window.addEventListener('resize', applyLayout);
  applyLayout();
}