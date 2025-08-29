# PJT.LUNA Day4 ENTERPRISE
Enterprise‑level accessible sign-up form with i18n, advanced validation UX, async checks, modal, offline‑ready skeleton.

## Highlights
- Runtime i18n (ko/en)
- Anchored error summary, first-error focus
- Password meter + checklist, accessible announcements
- Async email availability (mock) with debounce + cancel
- Country-aware phone mask
- Accessible Terms modal with focus trap & ESC
- Autosave with TTL + clear
- Submit lock, aria-busy
- Service Worker skeleton (for HTTPS/localhost)

## Usage
Serve over a local server (e.g., `python -m http.server`) for best results.
Uncomment Service Worker registration in `script.js` when on HTTPS/localhost.
