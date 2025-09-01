# PJT.LUNA 인수인계 (Enterprise+ Level 기준, 최종판)

## 0. 학습자 프로필 & 목표
- 나는 **컴퓨터 관련 지식이 전혀 없는 일반인**에서 시작한다.
- 목표는 **업계 최정상급 웹 풀스택 개발자**가 되는 것이다.
- 따라서 모든 교육은 **기초부터 차근차근**, 그러나 항상 **최정상 실무자(Enterprise+ Level)** 기준으로 진행한다.

## 1. 학습 진행 방식
- Day별 **새로운 레이아웃/홈페이지** 제작 (기존 코드 재활용 금지).
- **누적 반영 원칙**: 이전 Day에서 배운 개념은 이후 Day에도 반드시 반영.
- **Enterprise+ Level**: 단순 교육용 예제가 아닌, 실무 배포 가능한 수준 + 엔터프라이즈 기준을 초과하는 심화 기능까지 포함.
- **이론 → 실습 → 프로젝트 → 리뷰** 순서로 진행.
- **결과물**: 항상 완성형 HTML/CSS/JS 코드와 zip 파일 제공.
- **Git/GitHub 관리**: Day별 폴더 구조 정리(`Day1_Project`, `Day2_Project`, …), `git init → add → commit → push`.

## 2. 레벨 규칙
- Day0: 기초/중급 (시맨틱 구조, 다크모드, Grid/Flex, 접근성, 반응형, 필터링, lazy loading 등).
- **Day1 ~ Day365**: 무조건 **엔터프라이즈 플러스 레벨(Enterprise+)**.  
  - Enterprise 수준(i18n, 오류 요약, 강도 체크리스트, async 검증, 포커스 트랩, 오프라인 준비 등)에 더해  
  - 스크롤 락, 스택 컨텍스트/z-index 랩, inert fallback, reduce-motion 대응, Modal Manager, data-testid hooks 등 **상위 난이도 심화 패턴** 포함.

## 3. 커리큘럼 연동 (중요 규칙)
- 매일의 **이론 교육 주제**는 반드시 `FullStack_1Year_Detailed_Final.xlsx` 커리큘럼의 Day별 항목과 직접적으로 일치해야 한다.
- 실습/프로젝트는 해당 Day 주제와 **1:1 매칭된 Enterprise+ Level 예제**로 작성한다.
- 단순히 유사하거나 임의의 예제가 아니라, 커리큘럼 표에 기재된 **키워드/학습 주제**를 포함해야 한다.
- ⚠️ **반드시 준수**: 커리큘럼에 명시된 모든 Day별 학습 키워드(예: Day:5 - relative, absolute, fixed, sticky 등)는 최종 결과 홈페이지에 **실제로 눈으로 확인할 수 있는 예시**로 구현되어야 한다.
- 예시:  
  - Day4의 주제가 *Form & 접근성*이라면 → Enterprise+ 레벨 회원가입 폼(i18n, 오류 요약, 모달, async 검증, 오프라인 준비, 추가 심화 기능 포함)  
  - Day5의 주제가 *Position & Modal*이라면 → `relative/absolute/fixed/sticky` **모두 시각적으로 확인 가능**한 포지셔닝 실습 + 접근성 모달 매니저(포커스 트랩, z-index 관리, 스크롤 락, inert fallback) 예제 작성.

## 3-1. **커리큘럼 가시화 보증(Visibility Guarantee)**  🔒
- **규칙**: “**내가 교육받는 커리큘럼에 있는 모든 내용은 반드시 당일의 홈페이지 화면에 ‘직접 눈으로 보이도록’ 예시로 구현한다.**”  
- **적용 범위**: Day1부터 **마지막 날짜(Day365)** 까지 전체 기간.  
- **실패 조건(빌드 금지)**: 아래 항목 중 하나라도 누락 시 산출물(zip)을 제출하지 않는다.
  1) 커리큘럼의 **모든 키워드/개념이 UI에 드러남**
  2) 각 키워드마다 **캡션/라벨/주석**으로 무엇을 보여주는지 명시
  3) 데모가 **상호 비교 가능**(예: relative vs absolute vs fixed vs sticky를 한 화면에서)
  4) README에 **체크리스트(DoD)** 포함 → 검증 항목을 사람이 재현 가능
- **예시**: Day5라면 “relative/absolute/fixed/sticky + z-index/모달 접근성”이 **한 화면**에 가시화되어야 함.
- **애니메이션 주제**: fade-in/slide-up, fade-out 효과가 **눈에 분명히 보이도록** 구현. reduce-motion 설정도 반영.

## 4. 산출물 규칙
- Day별 프로젝트는 **동작 가능한 예제** 제공.
- 반드시 **zip 파일 다운로드 링크** 제공.
- 코드 품질: 시맨틱, 접근성(ARIA/WCAG), 성능, 보안, 유지보수, 테스트, UX 모두 고려.
- README 포함 → 실무 문서화 훈련.

## 5. 코드 품질 원칙
- **접근성(WCAG/ARIA)** 최우선.
- **보안 UX**: CSRF, 비밀번호 UX, 중복 제출 방지, HTTPS 전제.
- **성능 최적화**: lazy loading, responsive 이미지, local/session Storage 관리.
- **유지보수성**: CSS 변수(token), BEM/Utility 혼합, 모듈형 JS.
- **테스트 가능성**: data-testid 속성, QA 시나리오 포함.

## 6. 누적 학습 심화
- 기능만 추가하지 않고, **실무적 고민 포인트**까지 다룸.
  - i18n → 번역 번들 관리 전략.
  - 비밀번호 UX → OWASP Top10 연계.
  - 모달 → 포커스 트랩/aria-hidden 패턴, 스크롤 락, inert fallback.

## 7. 확장 트랙
- **프런트엔드 심화**: React/Next.js + TypeScript + Tailwind 확장.
- **백엔드 연동**: Node.js/Go Fiber → 실제 회원가입 API 연계.
- **DevOps**: CI/CD 파이프라인 + 접근성 테스트(aXe, Lighthouse).

## 8. 커리큘럼 진행 합의
- **Day1 ~ Day365** 무조건 **엔터프라이즈 플러스 레벨(Enterprise+)** 난이도로 진행.
- 매일 산출물은 커리큘럼 Day 주제와 반드시 매칭된 예제여야 한다.
- 커리큘럼에 기재된 모든 키워드와 기능은 최종 결과물에 반드시 포함되어야 하며, 누락 없이 홈페이지에 나타나야 한다.
- 새로운 채팅에서도 본 규칙 유지 (메모리에 저장됨).
- “PJT.LUNA DayX 시작”이라고 요청 시 → 자동으로 커리큘럼 기반 Enterprise+ Level 예제(zip 포함) 제공.

---

📌 이 문서를 로컬/GitHub에 두고, 새로운 채팅 시작 시 그대로 복붙하면 인수인계 가능.
