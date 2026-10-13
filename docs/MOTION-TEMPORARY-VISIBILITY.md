# Motion 카테고리 임시 숨김 — 2026-10-13

## 실제 도형 링크 확인

Portfolio_2026/js/works-view.js 원본 categories 데이터 기준:
- design / 회색·노란 원형 → content-design.html
- ux-ui / 블루 사각형 → uxui.html
- indesign / 분홍색 원형 → visual-design.html
- video-editing / 줄무늬 사각형 → motion-video.html

따라서 분홍색 도형은 보존했고 실제 Motion에 연결된 video-editing 도형만 표시 목록에서 제외했습니다. 원본 categories 배열은 4개 모두 유지합니다. 메인 Opening의 도형이나 다른 섹션은 변경하지 않았습니다.

## 표시 순서

Content Design → UX/UI & Web Design → Visual Design

메인의 기존 도형 라벨·디자인·URL은 유지하고 실제 링크 기준으로 정렬했습니다. PC는 3열 중앙, 모바일은 2열 + 마지막 항목 중앙입니다.

## 재활성화

두 독립 프로젝트는 자체 실행이 가능하도록 각각 설정을 가집니다. 다음 두 파일의 motionVideoEnabled를 false에서 true로 바꾸세요.

1. Portfolio-Works-2026/js/works-category-settings.js
2. Portfolio_2026/js/works-category-settings.js

공통 categoryFiles 배열에 Motion의 원래 위치를 보존했습니다. true로 바꾸면 Works 4개 페이지의 링크와 메인 Works의 도형이 다시 나타납니다. Works의 search-entry.html도 메인 설정을 로드합니다. 두 파일을 저장한 뒤 브라우저를 새로고침하세요. dist를 실행할 때는 node Portfolio-Works-2026/build.mjs로 로컬 빌드를 갱신합니다.

브라우저 네트워크 응답을 테스트에서만 true로 바꿔 메뉴/도형 4개 복구를 확인했고 실제 소스는 false로 유지했습니다.

## 보존 여부

motion-video.html과 전용 이미지 22개, CSS, JS, 콘텐츠 데이터는 보존했습니다. 직접 URL 접속도 계속 가능합니다. 링크와 도형 노출만 임시 비활성화했습니다.

## 검수

- 메인 5502/index.html#works 및 Works 5514/search-entry.html#works: PC 1440×900 / 모바일 390×844 도형 3개, 중앙 배치, 가로 넘침 없음.
- 모든 표시 도형의 클릭 목적지 확인: content-design.html, uxui.html, visual-design.html.
- 개별 Works 4개 페이지: 메뉴 3개 동일 순서.
- JavaScript 오류 없음.
- 구버전 프로젝트 변경 없음. 커밋·푸시·배포 없음.

## 변경 파일

Portfolio-Works-2026:
- js/works-category-settings.js — 표시 여부/순서
- js/page-interactions.js — 상세 페이지 메뉴 표시 설정
- js/main.js — 독립 Works 선택 화면 표시 설정
- css/works.css — hidden 링크 공간 제거
- uxui.html / ux-ui.html / content-design.html / visual-design.html / motion-video.html / index.html — 초기 Motion 숨김과 캐시 버전
- search-entry.html — 메인 표시 설정 연결
- search-main/css/works-view.css — 돌아온 메인 Works 3개 중앙 배치

Portfolio_2026:
- js/works-category-settings.js — 표시 여부/순서
- js/works-view.js — 표시 데이터만 필터/정렬, 원본 데이터 유지
- css/works-view.css — 표시 개수에 따른 그리드
- index.html — 설정 스크립트 및 캐시 버전
