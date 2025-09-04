# PJT.LUNA — Day8 (Enterprise+)
**주제:** Responsive Images (`picture` / `srcset` / `sizes`) + **Lazy Loading** + **Lighthouse 성능 점검**

## 실행
1. 폴더를 VS Code로 열기
2. 간단 서버 실행 (예: `python -m http.server 8000`)
3. 브라우저에서 `http://localhost:8000/PJT_LUNA_Day8_ResponsiveImages/index.html` 방문

## 데모 포인트 (Visibility Guarantee)
- [x] `picture` 요소 + 포맷 우선순위(WebP → JPG)
- [x] `srcset` + `sizes`로 **뷰포트별 최적 크기** 선택
- [x] `loading="lazy"` + **IntersectionObserver** 폴백
- [x] **Skeleton UI** → 로딩 완료 시 페이드인
- [x] **i18n 배너**: 언어 선택에 따라 이미지 교체
- [x] `width/height` 명시로 CLS 방지
- [x] `prefers-reduced-data` 대응

## 접근성
- 모든 이미지 `alt` 제공
- 시각적 변화를 스크린리더에 알리기 위한 `aria-live="polite"` 영역 포함
- 키보드 탐색을 위한 Skip-link 제공

## Lighthouse 체크리스트 (DoD)
- Serve images in next-gen formats (WebP 제공, JPG fallback)
- Properly sized images via `srcset`/`sizes`
- Lazy loading 적용 여부
- 이미지 차원 명시로 CLS 방지
- 적절한 캐시 정책(운영시): `Cache-Control`, immutable 파일명
- 필요 시 `prefers-reduced-data` 대응

## 폴더 구조
```
PJT_LUNA_Day8_ResponsiveImages/
├─ images/
│  ├─ hero-*.jpg/webp
│  ├─ banner-(ko|en)-*.jpg/webp
│  └─ gallery-*-*.jpg/webp
├─ index.html
├─ styles.css
├─ script.js
└─ README.md
```

## 학습 연결 (Day1~Day7 누적)
- Day1~6의 다크모드, 상태저장, 시맨틱 구조 등 반영
- Day7의 반응형 네비게이션은 **이 프로젝트에 최소 구성으로 포함하지 않았습니다.**
  - Day8의 초점은 이미지 최적화이므로 헤더를 간소화했습니다.
  - 이후 통합 프로젝트에서 Day7 네비게이션과 병합합니다.

## 참고
- 실제 제품에서는 AVIF도 함께 제공하세요. (본 샘플은 빌드 의존성을 줄이기 위해 WebP만 포함)