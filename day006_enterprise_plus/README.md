# PJT.LUNA Day6 ENTERPRISE+ — CSS Animation & Modal

## Curriculum coverage (Visibility Guarantee)
- Animation basics: **hover, transition, keyframes** visibly demonstrated.
- Apply animations: **modal fade-in/out**, **button/CTA transitions**.
- Final page: **accessible modal** (focus trap, ESC, aria-hidden) + **i18n** + **dark mode**.

## Run
```bash
python -m http.server
# open http://localhost:8000
```

## DoD Checklist
- [ ] Hover card lifts with transform/transition
- [ ] CTA button animates on hover/focus
- [ ] Pulsate badge uses @keyframes and is reduced under prefers-reduced-motion
- [ ] Modal opens with fade+slide and closes with fade-only
- [ ] Keyboard-only: Tab/Shift+Tab trapped, ESC closes, focus returns
- [ ] i18n ko↔en runtime switch works; dark mode persists
