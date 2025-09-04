# PJT.LUNA Day7 ENTERPRISE+ — Responsive Design ①

## Coverage (Visibility Guarantee)
- 모바일 퍼스트 + 미디어 쿼리(모바일/태블릿/데스크탑)
- 반응형 내비게이션: **햄버거(모바일) ↔ 가로 메뉴(데스크탑)**
- 접근성: `aria-expanded`, `aria-controls`, **focus trap**, **ESC 닫기**, **scroll lock**
- 카드 그리드: 1열 → 2열 → 3열
- 성능: `loading="lazy"`, `srcset/sizes`, `content-visibility: auto`
- 공통: i18n(ko/en), 다크모드, data-testid

## Run
```bash
python -m http.server
# visit http://localhost:8000
```

## DoD Checklist
- [ ] 모바일에서 햄버거 버튼이 보이고, 탭/ESC로 열고 닫을 수 있다
- [ ] 드로어 열리면 배경이 `aria-hidden` 되고 스크롤이 잠긴다
- [ ] Tab/Shift+Tab이 드로어 내부에서만 순환한다
- [ ] 태블릿/데스크탑에서 가로 메뉴로 자동 전환되고 드로어 상태가 초기화된다
- [ ] 카드 그리드는 모바일 1열 → 태블릿 2열 → 데스크탑 3열로 변경된다
- [ ] 이미지가 `srcset/sizes` + `loading=lazy` 를 사용한다
- [ ] i18n 전환과 다크모드 토글이 동작한다
