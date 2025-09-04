// Theme toggle
const root=document.documentElement;
const THEME='luna-theme';
const saved=localStorage.getItem(THEME);
const start=saved || (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
root.setAttribute('data-theme', start);
document.getElementById('theme-toggle')?.addEventListener('click', ()=>{
  const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME, next);
});

// i18n (safe for file://)
const LANG='luna-lang';
const langSel=document.getElementById('lang');
const initLang=localStorage.getItem(LANG) || document.documentElement.lang || 'ko';
langSel.value=initLang;
async function dict(code){ try{ const r=await fetch(`./i18n/${code}.json`); return await r.json(); } catch(e){ console.warn('i18n load fail', e); return {}; } }
async function applyLang(code){
  const d=await dict(code);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(d[key]!==undefined) el.textContent=d[key];
  });
  localStorage.setItem(LANG, code);
}
applyLang(initLang);
langSel.addEventListener('change', e=>applyLang(e.target.value));

// Responsive Drawer Nav (A11y: aria-expanded, focus trap, ESC, scroll lock)
const drawer = document.getElementById('mobile-nav');
const toggle = document.getElementById('menu-toggle');
const closeBtn = document.getElementById('close-drawer');
let lastFocused = null;

function focusables(c){ return Array.from(c.querySelectorAll('a,button,select,input,[tabindex]:not([tabindex="-1"])')).filter(el=>!el.disabled && el.offsetParent!==null); }
function setOutsideHidden(h){
  // Hide everything except drawer for SR when open
  Array.from(document.body.children).forEach(el=>{ if(el===drawer) return; h?el.setAttribute('aria-hidden','true'):el.removeAttribute('aria-hidden'); });
}
function lockScroll(lock){
  document.body.style.overflow = lock ? 'hidden' : '';
}
function openDrawer(){
  lastFocused = document.activeElement;
  toggle.setAttribute('aria-expanded','true');
  drawer.hidden = false;
  requestAnimationFrame(()=> drawer.setAttribute('data-open','true'));
  setOutsideHidden(true);
  lockScroll(true);
  focusables(drawer)[0]?.focus();
}
function closeDrawer(){
  toggle.setAttribute('aria-expanded','false');
  drawer.removeAttribute('data-open');
  setOutsideHidden(false);
  lockScroll(false);
  setTimeout(()=>{ drawer.hidden = true; lastFocused?.focus(); }, 200);
}
toggle?.addEventListener('click', ()=>{
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  expanded ? closeDrawer() : openDrawer();
});
closeBtn?.addEventListener('click', closeDrawer);
drawer.querySelector('.backdrop')?.addEventListener('click', closeDrawer);
drawer.addEventListener('keydown', e=>{
  if(e.key==='Escape') return closeDrawer();
  if(e.key==='Tab'){
    const els=focusables(drawer); if(els.length===0) return;
    const first=els[0], last=els[els.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
});

// On resize to desktop, ensure drawer closed & a11y reset
const mqDesktop = window.matchMedia('(min-width: 768px)');
mqDesktop.addEventListener('change', e=>{
  if(e.matches){ // tablet/desktop
    if(drawer && !drawer.hidden) closeDrawer();
    toggle.setAttribute('aria-expanded','false');
    setOutsideHidden(false);
    lockScroll(false);
  }
});

// Images: If example images are missing, create placeholders programmatically (optional dev aid)
