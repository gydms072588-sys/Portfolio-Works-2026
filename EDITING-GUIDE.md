# VS Code 수정 안내

실제 실행 폴더: `C:/Users/User/Desktop/Portfolio _2/Portfolio-Works-2026/`. 초기 버전은 형제 폴더 Portfolio-Works-2026-backup에 보존되어 있습니다.

## 파일 구조
- index.html: 분야 선택 페이지
- uxui.html (ux-ui.html: 기존 별칭), content-design.html, visual-design.html, motion-video.html: 7개 섹션 구조와 화면 문구를 직접 편집
- css/works.css: 기본 스타일
- css/uxui-editorial.css: 4개 분야 공통 7개 섹션 디자인
- css/showcase.css: 원본 목업/슬라이더
- css/works-responsive.css: 공통 크기·간격·반응형
- css/works-home.css, works-navigation.css: 홈 버튼/섹션 내비게이션
- js/page-interactions.js: 카드 모달, 이미지 확대, 비교 전환과 원본 슬라이더 연결
- js/showcase.js: 원본 쇼케이스 인터랙션
- js/home-visibility.js, works-navigation.js: 홈 버튼 및 Scroll Spy
- assets/: 기존 이미지, 영상, 목업, 아이콘

## 자주 수정하는 위치
각 HTML에서 `02 작품 쇼케이스`를 검색합니다. h3=PROJECT, project-subtitle=SUBTITLE, project-summary-text=DESCRIPTION, project-intent=DESIGN INTENT, dt/dd=TYPE/SCOPE/ROLE/FOCUS/TOOLS, project-actions a=CTA 링크입니다.
Main Works의 mw-card 제목/설명을 수정하면 모달에도 동일하게 표시됩니다.
Before/After 설명은 ba-comparison의 `data-comparison-copy` JSON 두 상태를 함께 수정합니다. SVG image href/src 및 viewBox는 원본 비율을 유지하세요.

기존 main.js, works-data.js 및 섹션 생성 모듈은 이전 데이터/구조 보존용입니다. 분야 상세 HTML은 이제 main.js를 실행하지 않습니다. index.html의 분야 목록은 기존 데이터 기반 방식을 유지합니다.

저장 후 브라우저 새로고침. 로컬 URL: http://127.0.0.1:5514/uxui.html
정적 빌드: node build.mjs (Works 루트 기준).
