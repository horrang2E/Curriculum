# PJT.LUNA — Day9 (Enterprise+)
**주제:** CSS Variables & Multi Theme (Light/Dark/Contrast/Colorful)

## 실행 방법
1. VS Code에서 폴더 열기
2. 간단 서버 실행 (예: `python -m http.server 8000`)
3. 브라우저에서 `http://localhost:8000/PJT_LUNA_Day9_MultiTheme/index.html` 접속

## 데모 포인트
- [x] CSS Custom Properties 정의 (`--bg`, `--fg`, `--accent`)
- [x] 다크/라이트/고대비/컬러풀 테마 지원
- [x] 버튼 클릭 시 JS로 테마 변경
- [x] localStorage 저장 → 새로고침 후 유지
- [x] 시스템 테마 감지 (prefers-color-scheme)
- [x] 스크린리더 알림 (aria-live)

## 접근성
- `aria-live="polite"` 영역을 통한 테마 전환 알림
- Skip link 제공
- 색 대비 고려(고대비 모드)

## DoD (Definition of Done)
- 최소 3개 이상 테마 존재 ✅
- 버튼으로 전환 가능 ✅
- 상태가 localStorage에 저장 ✅
- 시스템 기본 테마 감지 ✅
- 스크린리더 알림 동작 ✅