# PJT.LUNA — Day10 (Enterprise+)
**주제:** Advanced Animations — Spinner · Skeleton · Fade/Slide + 성능 최적화 & 접근성

## 실행
1. VS Code로 폴더 열기
2. 간단 서버 실행: `python -m http.server 8000`
3. 브라우저: http://localhost:8000/PJT_LUNA_Day10_Animations/index.html

## 데모 시나리오 (Visibility Guarantee 🔒)
- [x] 버튼 클릭 → **Spinner → Skeleton → 실제 콘텐츠** 단계적 전환
- [x] **Fade + Slide** 전환 드롭다운
- [x] **모달**: 포커스 트랩, ESC 닫기, 스크롤 락
- [x] **GPU 친화 속성** 중심 애니메이션 (transform, opacity)
- [x] `will-change` 사용 (modal-panel)
- [x] **prefers-reduced-motion** 및 사용자 토글 제공
- [x] `role="status"`, `aria-live` 등 접근성 준수
- [x] 테스트 편의: `data-testid` 속성 포함

## 파일 구조
```
PJT_LUNA_Day10_Animations/
├─ images/
│  ├─ hero.jpg
│  └─ card.jpg
├─ index.html
├─ styles.css
├─ script.js
└─ README.md
```

## 체크리스트 (DoD)
- 성능: transform/opacity 위주, layout thrash 없음 ✅
- 접근성: 스크린리더 안내, 모달 포커스 트랩 ✅
- 모션 대응: prefers-reduced-motion + 수동 토글 ✅
- QA: 상태 전환에 data-testid 제공 ✅

## 확장 아이디어
- 모달/드롭다운 애니메이션 매니저로 우선순위와 z-index, inert 패턴 추가
- Skeleton에 블러 플래스홀더(blur-up) 효과
- 비동기 fetch로 실제 데이터 바인딩
