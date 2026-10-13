# Works 카테고리 템플릿 관리

2026-10-13 기준 독립 프로젝트의 최신 uxui.html을 로컬 서버 응답과 비교한 뒤 세 분야를 복제했습니다. UX/UI의 확정 HTML은 변경하지 않았습니다.

## 실행 및 편집 파일

- Content Design: content-design.html — http://127.0.0.1:5514/content-design.html
- UX/UI & Web Design: uxui.html — http://127.0.0.1:5514/uxui.html
- Visual Design: visual-design.html — http://127.0.0.1:5514/visual-design.html
- Motion & Video Editing: motion-video.html — http://127.0.0.1:5514/motion-video.html

VS Code에서는 C:/Users/User/Desktop/Portfolio _2/Portfolio-Works-2026을 루트로 열고 위 HTML을 직접 수정합니다. Live Server에서는 같은 파일명을 5500 포트로 실행할 수 있습니다.

## 콘텐츠 독립성

각 카테고리의 문구와 HTML 구조는 해당 HTML에 있습니다. main 시작 부분에 HotelsPick 임시 템플릿이며 해당 분야의 실제 작업이 아니라는 한글 주석을 표시했습니다. 화면에 별도의 새 콘텐츠나 라벨은 추가하지 않았습니다.

자주 수정할 위치:
- Cover: uxui-cover-title의 두 줄
- Showcase: project-summary의 제목, 소개, DESIGN INTENT, dl 정보와 LIVE SITE 링크
- Problem: hotels-problem-copy와 Before 이미지
- Design Direction: hotels-direction-cards와 Point
- Key Screens: ks-row 내부 이미지와 ks-copy
- Design System: ds-header / ds-grid
- Before & After: data-pair-slides JSON의 6개 문구와 이미지 경로. 처음 표시되는 figure도 동일하게 맞춥니다.
- Design Outcome: do-item 내부 문구

프로젝트 이미지 22개씩을 각 카테고리 전용 폴더에 복사하고 해당 HTML의 이미지 링크를 바꿨습니다.
- assets/images/templates/content-design/
- assets/images/templates/visual-design/
- assets/images/templates/motion-video/

각 카테고리에서는 이 전용 이미지 파일을 교체하거나 새로운 파일을 추가해 HTML의 src/data-full-image/data-pair-slides를 수정하세요. UX/UI 원본 assets/images 파일은 건드리지 않아도 됩니다.

공통 CSS와 JS는 레이아웃과 인터랙션을 공유합니다. 이 파일을 바꾸면 여러 카테고리에 영향을 줍니다. 카테고리별 콘텐츠는 공통 데이터 파일이 아니라 각 HTML에서 수정합니다. 장치 프레임, 도구 아이콘, 배경 그래픽은 레이아웃 자원으로 공유합니다.

## 통일된 구조

Cover → Project Showcase → Problem → Design Direction → Key Screens → Design System → Before & After → Design Outcome

상단 메뉴: Content Design → UX/UI & Web Design → Visual Design → Motion & Video Editing

현재 HotelsPick 정보와 이미지는 임시 템플릿으로 복제한 내용입니다. 분야별 실제 내용 작성은 이번 작업에서 진행하지 않았습니다. Works AI 챗봇은 최신 UX/UI에서 제거된 기존 상태를 그대로 복제했습니다.

## 수정 파일

content-design.html, visual-design.html, motion-video.html
css/hotelspick-problem.css: UX/UI에만 한정됐던 동일 템플릿 간격 규칙을 복제 페이지에도 적용. UX/UI 렌더링 규칙은 유지.
assets/images/templates/<category>/ : 22개 이미지씩 독립 복사.

구버전 Works 및 Portfolio_2026 소스와 메인 Works 진입 링크는 변경하지 않았습니다. GitHub 커밋·푸시·배포 없음.

## 브라우저 검수 결과

Chrome에서 네 페이지 모두 1920×1080 / 1440×900 / 1366×768 / 390×844 / 375×812를 점검했습니다. 8개 섹션 순서와 Cover 이후 각 섹션의 실제 높이가 UX/UI와 일치했습니다. 가로 넘침, 로딩 실패한 표시 이미지, 페이지 JavaScript 오류 및 로컬 리소스 HTTP 오류가 없었습니다. 6개 비교 슬라이드의 선택과 Before 이미지 확대·닫기를 각 페이지에서 확인했습니다.

Cover는 기존 공유 타이핑/선택 모듈을 그대로 사용합니다. 각 카테고리 제목의 실제 경계를 감싸는 범위와 종료 후 가상 커서·선택 박스 제거 및 Scroll 표시를 확인했습니다. 모눈 배경과 제목 스타일을 유지했습니다.

UX/UI 원본 HTML의 SHA256 접두사 d8849ed6da72a27a는 작업 전후 동일합니다. 카테고리별 이미지 22개씩은 원본과 바이트 단위로 동일합니다.
