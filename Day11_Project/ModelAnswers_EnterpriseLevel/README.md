# PJT.LUNA — Day11 (Enterprise+)
**주제:** Landing Page 클론코딩① — 시맨틱 구조 · 반응형 · 다크모드 통합

## 실행
1. 폴더를 VS Code로 열기
2. 간단 서버 실행: `python -m http.server 8000`
3. 브라우저: http://localhost:8000/PJT_LUNA_Day11_LandingClone/index.html

## 체크리스트 (DoD)
- [x] 시맨틱 구조(header/nav/main/section/footer, 계층적 heading)
- [x] 반응형 레이아웃(Grid/Flex, Mobile→Desktop)
- [x] 다크/라이트 모드 (CSS 변수 + JS 전환, localStorage 저장)
- [x] CTA 폼 (필수 입력, a11y 라이브 영역 안내)
- [x] 이미지 lazy loading + width/height 지정(CLS 방지)
- [x] QA hooks (`data-testid` 속성)
- [x] 접근성: skip-link, aria-live

## 확장 아이디어(Day11-2)
- Form 검증 강화 + 모달로 약관 안내
- Hero 이미지에 `picture`/`srcset` 도입
- Lighthouse/WAVE 점검 표 추가
