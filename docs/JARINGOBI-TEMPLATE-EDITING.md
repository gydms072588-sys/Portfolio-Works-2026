# 자린고비 상세 페이지 템플릿

- 실행: http://127.0.0.1:5514/jaringobi.html (검수 서버:5521)
- 프로젝트명: 자린고비 / TEAM PROJECT.
- 최신 content-design.html(ABLY)의 10개 섹션을 그대로 복제했습니다.
- 프로젝트명과 유형 외 나머지 내용은 ABLY 임시 콘텐츠이며 자린고비의 실제 작업/성과/기능이 아닙니다.

## 독립 수정 위치
- 텍스트·섹션·이미지 연결: jaringobi.html. data-template-content와 섹션별 주석으로 임시 상태 표시.
- 프로젝트 이미지/영상: assets/projects/jaringobi-template/ (참조 파일 64개 독립 복사).
- 프로젝트 스타일: css/projects/jaringobi/ (ABLY 전용 CSS 독립 복사).
- AI 영상 및 스토리보드 데이터: js/projects/jaringobi/ai-video.js
- 배너 슬라이드 데이터: js/projects/jaringobi/banner-slider.js
- 쇼케이스 동작: js/projects/jaringobi/showcases.js / showcase-video.js

공통 css 및 page-interactions.js, scroll-content-reveal.js, content-cover-gallery.js, showcase.js, works-navigation.js 등의 인터랙션은 재사용합니다.
자린고비에만 적용할 CSS 변경은 css/projects/jaringobi/에서 진행합니다. 공통 파일을 직접 변경하지 않습니다.

## 연결
기존 team-projects.html의 팀 프로젝트 목록에 자린고비 링크를 추가했습니다.
기존 works-data.js의 자린고비는 type=팀 프로젝트/category=visual-design으로 기록되어 있으나 group=team이 없어 기존 팀 목록에는 표시되지 않았습니다.
원본 프로젝트 분류/데이터와 메인 Works 카테고리는 변경하지 않았습니다. 기존 자린고비 썸네일만 목록에 사용합니다.

## 임시 사이트 링크
복제된 LIVE SITE는 ABLY 사이트를 가리키며 data-template-link=ably로 표시했습니다. 자린고비 실제 사이트로 오해하지 않도록 교체 단계에서 수정해야 합니다.

## 섹션
Cover / Project Showcase / Overview / Design Direction / Key Screens / Design System / AI Video Production / Banner / Product Detail / Design Outcome.

ABLY 원본 HTML·CSS·JS 및 UX/UI·Visual Design 페이지는 변경하지 않았습니다.

## Content 프로젝트 직접 이동 (추가)
- content-design.html 마지막 Design Outcome: 다음 프로젝트 · 02 자린고비 → jaringobi.html.
- jaringobi.html 마지막 Design Outcome: 이전 프로젝트 · 01 ABLY → content-design.html.
- 기존 쇼케이스 화살표가 존재하면 같은 프로젝트 URL로 연결합니다.
- 기존 UX/UI .do-next 컴포넌트 사용. 기본 콘텐츠·섹션·인터랙션은 덮어쓰지 않으며 이동 링크만 추가했습니다.
