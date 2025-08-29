// ====== Service Worker (optional HTTPS/localhost) ======
if ('serviceWorker' in navigator) {
  // navigator.serviceWorker.register('./sw.js'); // uncomment when serving over https/localhost
}

// ====== Theme ======
const THEME_KEY='luna-theme';
const root=document.documentElement;
const savedTheme=localStorage.getItem(THEME_KEY);
const initialTheme=savedTheme || (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches ? 'dark':'light');
root.setAttribute('data-theme', initialTheme);
const themeBtn=document.getElementById('theme-toggle');
if(themeBtn){
  themeBtn.setAttribute('aria-pressed', initialTheme==='dark' ? 'true':'false');
  themeBtn.addEventListener('click',()=>{
    const next=root.getAttribute('data-theme')==='dark'?'light':'dark';
    root.setAttribute('data-theme', next);
    themeBtn.setAttribute('aria-pressed', next==='dark' ? 'true':'false');
    localStorage.setItem(THEME_KEY, next);
  });
}

// ====== i18n ======
const I18N_KEY='luna-lang';
const langSelect = document.getElementById('lang-select');
let bundles = {};
async function loadBundle(lang){
  if(!bundles[lang]){
    const res = await fetch(`./i18n/${lang}.json`);
    bundles[lang] = await res.json();
  }
  return bundles[lang];
}
async function applyI18n(lang){
  const dict = await loadBundle(lang);
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    if(dict[key] !== undefined){
      if(el.firstElementChild && el.id === 'meter-desc'){
        // special case: prefix text before strength label
        el.firstChild.textContent = dict[key];
      }else{
        el.textContent = dict[key];
      }
    }
  });
  localStorage.setItem(I18N_KEY, lang);
}
const initLang = localStorage.getItem(I18N_KEY) || document.documentElement.lang || 'ko';
langSelect.value = initLang;
applyI18n(initLang);
langSelect.addEventListener('change', e => applyI18n(e.target.value));

// ====== Utilities ======
function $(id){ return document.getElementById(id); }
function debounce(fn, ms=300){ let t; let ctrl = {cancel:()=>{clearTimeout(t)}}; const f=(...args)=>{ clearTimeout(t); t=setTimeout(()=>fn(...args, ctrl), ms); }; f.cancel=ctrl.cancel; return f; }
function setError(input, errEl, msg){
  input.setAttribute('aria-invalid', msg ? 'true':'false');
  if(input.setCustomValidity) input.setCustomValidity(msg || '');
  if(errEl) errEl.textContent = msg || '';
}
function anchorTo(el){ el?.focus({preventScroll:true}); el?.scrollIntoView({block:'center'}); }

// ====== Password strength/checklist ======
const strengthLevels = ['매우 약함','약함','보통','강함','매우 강함'];
const strengthLevelsEN = ['Very Weak','Weak','Fair','Strong','Very Strong'];
function evalPassword(pw){
  // heuristics: length, cases, digits, symbols, penalties for repeats/sequences
  let score = 0;
  if(pw.length >= 8) score++;
  if(/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if(/\d/.test(pw)) score++;
  if(/[^\w\s]/.test(pw)) score++;
  if(pw.length >= 12) score++;

  // penalty for repeats or sequences
  if(/(.)\1{2,}/.test(pw)) score = Math.max(0, score-1);
  if('abcdefghijklmnopqrstuvwxyz'.includes(pw.toLowerCase()) || '0123456789'.includes(pw)) score = Math.max(0, score-1);

  return Math.max(0, Math.min(score, 4));
}
function updatePwUI(score){
  const bar = $('pw-meter-bar'); const label = $('pw-strength-label'); const meter = bar?.parentElement;
  const widths = ['20%','35%','55%','75%','95%'];
  const colors = ['#d92d20','#f59e0b','#10b981','#22c55e','#16a34a'];
  if(bar){ bar.style.width = widths[score]; bar.style.background = colors[score]; }
  if(meter){ meter.setAttribute('aria-valuenow', String(score)); }
  const lang = localStorage.getItem(I18N_KEY) || 'ko';
  const sets = lang==='en' ? strengthLevelsEN : strengthLevels;
  if(label){ label.textContent = sets[score]; }
}
function updateChecklist(pw){
  const rules = {
    len: pw.length >= 8,
    mix: /[A-Z]/.test(pw) && /[a-z]/.test(pw),
    num: /\d/.test(pw),
    sym: /[^\w\s]/.test(pw)
  };
  document.querySelectorAll('#checklist [data-rule]').forEach(li=>{
    const key = li.getAttribute('data-rule');
    li.classList.toggle('valid', !!rules[key]);
  });
}

// ====== Async email check (mock with cancel) ======
let emailCheckController = null;
async function mockCheckEmail(email, signal){
  // emulate latency
  await new Promise((r)=>setTimeout(r, 500));
  if(signal?.aborted) throw new DOMException('Aborted','AbortError');
  const taken = /@taken\.com$/i.test(email) || /^test@/i.test(email);
  return !taken;
}

// ====== Phone mask by country code ======
function formatPhone(value, cc){
  const digits = value.replace(/\D/g,'');
  switch(cc){
    case '+82': // KR
      if(digits.startsWith('02')){ // seoul
        if(digits.length<=2) return digits;
        if(digits.length<=5) return digits.replace(/(\d{2})(\d{1,3})/,'$1-$2');
        if(digits.length<=9) return digits.replace(/(\d{2})(\d{3,4})(\d{1,4})/,'$1-$2-$3');
        return digits.slice(0,10).replace(/(\d{2})(\d{4})(\d{4})/,'$1-$2-$3');
      } else {
        if(digits.length<=3) return digits;
        if(digits.length<=7) return digits.replace(/(\d{3})(\d{1,4})/,'$1-$2');
        return digits.slice(0,11).replace(/(\d{3})(\d{3,4})(\d{1,4})/,'$1-$2-$3');
      }
    case '+1': // US (simple)
      if(digits.length<=3) return digits;
      if(digits.length<=6) return digits.replace(/(\d{3})(\d{1,3})/,'($1) $2');
      return digits.slice(0,10).replace(/(\d{3})(\d{3})(\d{1,4})/,'($1) $2-$3');
    case '+81': // JP (very simplified)
      if(digits.length<=3) return digits;
      if(digits.length<=7) return digits.replace(/(\d{2,3})(\d{1,4})/,'$1-$2');
      return digits.slice(0,11).replace(/(\d{2,4})(\d{2,4})(\d{1,4})/,'$1-$2-$3');
    case '+44': // GB (simplified)
      if(digits.length<=5) return digits;
      if(digits.length<=9) return digits.replace(/(\d{5})(\d{1,4})/,'$1 $2');
      return digits.slice(0,11).replace(/(\d{5})(\d{3})(\d{1,3})/,'$1 $2 $3');
    default:
      return digits;
  }
}

// ====== Autosave with TTL ======
const DRAFT_KEY='luna-signup-draft';
const DRAFT_TTL=1000*60*30; // 30 minutes
function loadDraft(){
  try{
    const raw = localStorage.getItem(DRAFT_KEY);
    if(!raw) return null;
    const obj = JSON.parse(raw);
    if(Date.now() - obj._ts > DRAFT_TTL) { localStorage.removeItem(DRAFT_KEY); return null; }
    return obj.data || null;
  }catch{ return null; }
}
function saveDraft(form){
  const data = Object.fromEntries(new FormData(form).entries());
  localStorage.setItem(DRAFT_KEY, JSON.stringify({_ts: Date.now(), data}));
}

// ====== Form Enhancements ======
(function initForm(){
  const form = $('signup-form'); if(!form) return;

  // restore draft
  const draft = loadDraft();
  if(draft){
    for(const [k,v] of Object.entries(draft)){
      if(form[k] && typeof form[k].value !== 'undefined') form[k].value = v;
    }
  }
  form.addEventListener('input', debounce(()=>saveDraft(form), 250));
  $('clear-draft')?.addEventListener('click', ()=> localStorage.removeItem(DRAFT_KEY));

  const fields = {
    name: { el: $('name'), err: $('err-name'), rules: [(v)=> v.trim()?true:'이름을 입력하세요.'] },
    email:{ el: $('email'), err: $('err-email'), rules: [
      (v)=> v.trim()?true:'이메일을 입력하세요.',
      (v)=> /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? true : '이메일 형식을 확인하세요.'
    ]},
    password:{ el: $('password'), err: $('err-password'), rules: [
      (v)=> v.length>=8 ? true : '비밀번호는 8자 이상이어야 합니다.',
      (v)=> /[A-Za-z]/.test(v) ? true : '영문자를 포함하세요.',
      (v)=> /\d/.test(v) ? true : '숫자를 포함하세요.'
    ]},
    confirm:{ el: $('confirm'), err: $('err-confirm'), rules: [
      (v)=> v.length>0 ? true : '비밀번호 확인을 입력하세요.',
      (v)=> v === $('password').value ? true : '비밀번호가 일치하지 않습니다.'
    ]},
    agree:{ el: $('agree'), err: $('err-agree'), rules: [(checked)=> checked ? true : '약관에 동의해야 가입할 수 있습니다.'] }
  };

  // i18n validation messages update when language changes
  async function localizeValidationMessages(){
    const lang = localStorage.getItem(I18N_KEY) || 'ko';
    // For brevity, we keep Korean messages in rules; in production, map via bundles[lang].
  }
  langSelect.addEventListener('change', localizeValidationMessages);

  function validateField(key){
    const f = fields[key]; if(!f) return true;
    const el = f.el;
    const value = el.type === 'checkbox' ? el.checked : el.value;
    let firstError = '';
    for(const rule of f.rules){
      const res = rule(value);
      if(res !== true){ firstError = res; break; }
    }
    setError(el, f.err, firstError);
    return !firstError;
  }

  // attach realtime
  Object.keys(fields).forEach(k=>{
    const f=fields[k]; if(!f||!f.el) return;
    const ev=f.el.type==='checkbox'?'change':'input';
    f.el.addEventListener(ev, ()=>validateField(k));
    f.el.addEventListener('blur', ()=>validateField(k));
  });

  // password UI
  $('password')?.addEventListener('input', e=>{
    const val = e.target.value;
    updatePwUI(evalPassword(val));
    updateChecklist(val);
  });
  $('pw-toggle')?.addEventListener('click', ()=>{
    const pw=$('password'); const isText=pw.type==='text';
    pw.type = isText ? 'password' : 'text';
    const btn=$('pw-toggle'); btn.setAttribute('aria-pressed', (!isText) ? 'true':'false');
    btn.textContent = isText ? '보기' : '숨기기';
  });

  // phone mask
  const tel = $('tel'); const cc = $('cc');
  tel?.addEventListener('input', ()=>{ tel.value = formatPhone(tel.value, cc.value); });
  cc?.addEventListener('change', ()=>{ tel.value = formatPhone(tel.value, cc.value); });

  // email async check with cancel
  const emailStatus = $('email-status');
  const debouncedCheck = debounce(async (_ignored, ctrl)=>{
    const email = fields.email.el.value.trim();
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { emailStatus.textContent=''; return; }
    // cancel previous
    if(emailCheckController){ emailCheckController.abort(); }
    emailCheckController = new AbortController();
    emailStatus.textContent='검사 중...';
    try{
      const ok = await mockCheckEmail(email, emailCheckController.signal);
      emailStatus.textContent = ok ? '사용 가능' : '이미 사용 중';
      emailStatus.className = ok ? 'status ok' : 'status bad';
    }catch(e){
      if(e.name!=='AbortError'){ emailStatus.textContent='오류'; }
    }
  }, 500);
  $('email')?.addEventListener('input', debouncedCheck);

  function buildErrorSummary(keys){
    const list = $('error-list'); list.innerHTML='';
    keys.forEach(k=>{
      const f=fields[k]; if(!f) return;
      const msg = f.err?.textContent;
      if(msg){
        const fieldId = f.el.id;
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${fieldId}`; a.textContent = msg;
        a.addEventListener('click', (e)=>{ e.preventDefault(); anchorTo(f.el); });
        li.appendChild(a); list.appendChild(li);
      }
    });
    const summary = $('error-summary');
    summary.hidden = list.children.length === 0;
  }

  // submit flow
  form.addEventListener('submit', async (e)=>{
    const keys = Object.keys(fields);
    let allValid = true, firstInvalid=null;
    keys.forEach(k=>{
      const ok = validateField(k);
      if(!ok){ allValid=false; if(!firstInvalid) firstInvalid=fields[k].el; }
    });
    buildErrorSummary(keys);
    if(!allValid){ e.preventDefault(); anchorTo(firstInvalid); return; }

    e.preventDefault();
    // lock & aria-busy
    const submitBtn = $('submit-btn');
    submitBtn.disabled = true; submitBtn.textContent='전송 중...';
    form.setAttribute('aria-busy','true');

    // simulate server
    await new Promise(r=>setTimeout(r, 900));
    form.removeAttribute('aria-busy');
    localStorage.removeItem(DRAFT_KEY);
    submitBtn.textContent='완료!';
  });

  // Terms modal
  const modal = $('terms-modal'); const openBtn = $('open-terms'); const closeBtn=$('close-terms'); const agreeBtn=$('agree-terms');
  let lastFocused = null;
  function openModal(){
    lastFocused = document.activeElement;
    modal.hidden = false;
    // focus trap start
    const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    focusable[0]?.focus();
    function trap(e){
      if(e.key === 'Tab'){
        const elements = Array.from(focusable);
        const first = elements[0], last = elements[elements.length-1];
        if(e.shiftKey && document.activeElement === first){ e.preventDefault(); last.focus(); }
        else if(!e.shiftKey && document.activeElement === last){ e.preventDefault(); first.focus(); }
      } else if(e.key === 'Escape'){ closeModal(); }
    }
    modal.addEventListener('keydown', trap);
    modal.dataset.trap = 'on';
  }
  function closeModal(){
    modal.hidden = true;
    if(modal.dataset.trap === 'on'){ modal.removeAttribute('data-trap'); }
    lastFocused?.focus();
  }
  openBtn?.addEventListener('click', openModal);
  closeBtn?.addEventListener('click', closeModal);
  modal.querySelector('[data-close]')?.addEventListener('click', closeModal);
  agreeBtn?.addEventListener('click', ()=>{
    $('agree').checked = true;
    validateField('agree');
    closeModal();
  });
})();