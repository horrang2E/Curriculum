// Keep same logic but force two rAF to ensure transition kicks in
const root=document.documentElement;
const THEME='luna-theme';
const saved=localStorage.getItem(THEME);
const start=saved || (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
root.setAttribute('data-theme', start);
document.getElementById('theme-toggle')?.addEventListener('click', ()=>{
  const next = root.getAttribute('data-theme')==='dark'?'light':'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem(THEME, next);
});

// i18n safe
const LANG='luna-lang';
const langSel=document.getElementById('lang');
const initLang=localStorage.getItem(LANG) || document.documentElement.lang || 'ko';
langSel && (langSel.value=initLang);
async function dict(code){ try{ const r=await fetch(`./i18n/${code}.json`); return await r.json(); } catch(e){ return {}; } }
async function applyLang(code){
  const d=await dict(code);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key=el.getAttribute('data-i18n');
    if(d[key]!==undefined) el.textContent=d[key];
  });
  localStorage.setItem(LANG, code);
}
applyLang(initLang);
langSel?.addEventListener('change', e=>applyLang(e.target.value));

// Modal
const modal=document.getElementById('modal');
const openBtn=document.getElementById('open-modal');
const closeBtn=document.getElementById('close-modal');
const okBtn=document.getElementById('ok-modal');
let lastFocused=null;
function focusables(c){ return Array.from(c.querySelectorAll('a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])')).filter(el=>!el.disabled && el.offsetParent!==null); }
function setOutsideHidden(h){
  Array.from(document.body.children).forEach(el=>{ if(el===modal) return; h?el.setAttribute('aria-hidden','true'):el.removeAttribute('aria-hidden'); });
}
function openModal(){
  lastFocused=document.activeElement;
  setOutsideHidden(true);
  modal.hidden=false;
  // Force double rAF to ensure starting styles apply before toggling data-open
  requestAnimationFrame(()=> requestAnimationFrame(()=> modal.setAttribute('data-open','true')));
  const els=focusables(modal); els[0]?.focus();
}
function closeModal(){
  modal.removeAttribute('data-open');
  setOutsideHidden(false);
  setTimeout(()=>{ modal.hidden=true; lastFocused?.focus(); }, 340); // match --dur
}
modal.addEventListener('keydown', e=>{
  if(e.key==='Escape') return closeModal();
  if(e.key==='Tab'){
    const els=focusables(modal); if(els.length===0) return;
    const first=els[0], last=els[els.length-1];
    if(e.shiftKey && document.activeElement===first){ e.preventDefault(); last.focus(); }
    else if(!e.shiftKey && document.activeElement===last){ e.preventDefault(); first.focus(); }
  }
});
openBtn?.addEventListener('click', openModal);
closeBtn?.addEventListener('click', closeModal);
okBtn?.addEventListener('click', closeModal);
modal.querySelector('.backdrop')?.addEventListener('click', closeModal);
