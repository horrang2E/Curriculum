    const btn = document.querySelector('.nav-toggle');
    const nav = document.getElementById('site-nav');
    if (btn && nav) {
        btn.addEventListener('click', () => {
            const expanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', String(!expanded));
            nav.hidden = !expanded; 
        });
        nav.hidden = false;
    }