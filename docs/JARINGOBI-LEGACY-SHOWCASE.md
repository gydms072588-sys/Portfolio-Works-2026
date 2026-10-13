# 자린고비 이전 Showcase 복원

참고 원본 루트: C:/Users/User/Desktop/Portfolio _2/자료/2026 년 메인포트폴리오 제작하기

실제 사용 코드:
- src/js/projects.js: projectCatalog의 자린고비 항목, slideDetails의 jaringobi, sharedPrograms.
- src/js/main.js: projectDeviceMockups(모바일 전용 분기), projectProgramLogos, renderProjectCard, setupProjectCardReveal.
- src/js/project-actions.js: 상세보기 / 플레이스토어 / LIVE SITE 연결.
- src/css/style.css 및 responsive.css: 역방향 2열, 모바일 전용 스마트폰, 타이포·정보 목록·버튼·배경.

원본 데이터와 렌더 함수를 그대로 실행해 생성한 자린고비 article HTML을 사용했습니다. 표시 번호만 이전 포트폴리오의 09에서 현재 Works의 02로 변경했습니다. PC 모니터·새 캡션·기존 하단 슬라이드 목록/컨트롤을 가져오지 않았습니다.

복원된 문구:
제목: 자린고비 게임형 절약 관리 앱
요약: 게임 요소를 활용해 절약 과정을 관리하는 팀 앱 프로젝트입니다.
의도: 절약 행동을 기록하고 보상으로 이어지는 과정을 게임처럼 이해할 수 있도록 핵심 경험을 구성했습니다.
TYPE: Gamified Saving App
FOCUS: 절약 기록 · 보상 · 습관 형성
TOOLS: ChatGPT / Figma / Gemini / HTML / JavaScript / VS Code (원본에서 모든 프로젝트에 배정된 공통 프로그램 표시를 요청에 따라 복원. 개별 사용 증빙으로 새로 확정한 정보는 아닙니다.)
개인 ROLE은 원본 자린고비 카드에 없으므로 추가하지 않았습니다.

연결:
상세보기 https://app.notion.com/p/da5a90bb4a5083609f26017769dacc65
플레이스토어 https://play.google.com/store/apps/details?id=jaringobi.myapp&pli=1
LIVE SITE https://1team-jaringobi.vercel.app/

원본 이미지/영상/아이콘 9개를 assets/projects/jaringobi-legacy/에 독립 복사했습니다. 파일 이름과 바이트는 원본 그대로입니다.

수정: jaringobi.html의 Project Showcase만 교체하고 legacy-showcase.css 로드 추가.
추가: css/projects/jaringobi/legacy-showcase.css, 위 에셋, 이 문서.
기존 창 높이/확대, 모바일 정보 아코디언 및 등장 효과, 배경 영상의 가시성 재생 제어는 현재 Works 모듈을 재사용합니다. 원본 가로 슬라이드/다른 프로젝트 라우팅은 실행하지 않습니다.

검수: 1920×1080 / 1440×900 / 1366×768 / 390×844에서 PC 목업 없음, 원본 이미지 로드, 가로 넘침 없음 확인. 낮은 PC 화면에서는 내용 높이에 따른 세로 스크롤 허용. 모바일은 설명 뒤 스마트폰 배치 및 서로 겹치지 않음 확인. Cover와 03 이후 HTML은 작업 전 스냅샷과 동일함을 비교했습니다.
