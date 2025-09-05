# PJT.LUNA — Day12 (Enterprise+)
**주제:** Day11 Landing Refactor — BEM · 변수 · 분리 CSS · 접근성/성능 점검

## 실행
1. VS Code로 폴더 열기
2. 간단 서버 실행: `python -m http.server 8000`
3. 브라우저: http://localhost:8000/PJT_LUNA_Day12_LandingRefactor/index.html

## 리팩토링 포인트
- BEM 네이밍: `.header__nav`, `.card__title`, `.btn--primary` 등
- CSS 분리: `base.css`(토큰/리셋/유틸) → `components/` → `pages/`
- 토큰화: 색상/간격/테마 변수 일원화, 다크모드 `data-theme` 기반
- Dead CSS 제거, 컴포넌트 재사용성 향상

## 접근성 체크
- 키보드 네비게이션 & 포커스 링(`--ring`)
- `aria-live`로 상태 알림, skip-link 제공
- 이미지 `alt`, width/height 명시(CLS 방지)

## 성능 체크 (목표)
- LCP < 2.5s (Hero 이미지 `picture` + 적절한 크기)
- CLS < 0.1 (width/height 지정)
- Lighthouse Performance/Accessibility ≥ 95

## DoD
- [x] BEM 네이밍이 주요 섹션에 적용됨
- [x] CSS가 base/components/pages로 분리됨
- [x] 다크/라이트 모드 버튼 + localStorage
- [x] 이미지 lazy + picture/srcset
- [x] README에 점검 항목 기록

## 확장 아이디어
- 컴포넌트 더 세분화(button variants, nav responsive)
- 아이콘 스프라이트/SVG 최적화
- i18n 구조(문구 분리) 추가