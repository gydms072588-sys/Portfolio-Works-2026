# Visual Design 작품 뷰어 및 커서 가이드

## 변경 파일
visual-design.html / css/visual-gallery.css / js/visual-gallery.js / js/visual-dock.js / js/visual-window-manager.js
추가: css/visual-guide.css / js/visual-guide.js / assets/images/visual-guide/cursor-white.png

## 뷰어
PC 기본 너비 1000px, 높이 80vh(내비게이션·Dock을 제외한 영역에 맞춰 제한), 처음부터 최대화하지 않습니다. 처음 열리는 작품 창은 사용 가능 영역 중앙에 배치합니다.
내용 컨테이너는 max-width 820px로 별도 제한하고 중앙 정렬합니다. 이미지 width/max-width 100%, height:auto. 명함은 실제 별도 앞면·뒷면 파일을 PC에서 나란히, 모바일에서 세로로 표시하며 기존 캔버스 크롭 스타일은 해제했습니다.
이미지 클릭은 새 탭 대신 native dialog 확대 보기로 변경했습니다. 원본 이미지 전체 비율을 유지하며 내부 스크롤, 닫기, ESC, 배경 클릭 지원. 모바일에서는 history state로 확대→작품→데스크톱 순서의 뒤로가기 지원.
모바일 작품 창은 화면 전체(100% 너비·높이), 드래그·자유 크기 조절과 최대화 버튼을 비활성화합니다. PC 창 조작은 기존 관리자를 사용합니다.

## 참고 소스 재사용 범위
원본: C:/Users/User/Desktop/Portfolio _2/자료/portfolio-hero
- assets/images/cursor-white.png를 바이트 그대로 복사했습니다.
- assets/css/style.css의 .cursor-pointer--author, .cursor-pointer__arrow, .cursor-pointer__arrow img, .cursor-pointer__bubble의 표현을 Visual 전용 selector로 적용했습니다. 42×56px 커서, drop-shadow, 파란 필터, left 62px/top 32px의 말풍선 관계, 0 8px 8px 8px 라운드, 작성자 말풍선 색 #245f93을 재사용했습니다. 안내용 글자 크기와 조작 버튼은 페이지와 모바일에 맞춰 조정했습니다.
- index.html의 커서 img + 말풍선 span 구조를 안내 dialog에 적용했습니다.
- main.js의 bindVisitorCursor는 실제 사용자 pointermove를 따라갑니다. 이번 가이드는 대상 요소를 가리키는 장식 커서여야 하므로 해당 추적 함수를 그대로 실행하지 않습니다. 원본에는 3단계 tour나 순차 설명 엔진이 없어서 새 controller는 기존 Visual 창/Dock API를 호출하는 작은 연결 모듈로 구현했습니다.
- 원본의 cursor:none 규칙은 복사하지 않았습니다. OS 커서를 숨기거나 이동하지 않습니다. prefers-reduced-motion에서는 위치 이동 transition 없음.

## 가이드
기존 안내창 이벤트와 자동 실행을 제거했습니다. 기존 sessionStorage key visual-design-onboarding-seen을 재사용하고 cursor-guide-v1 값으로 새 안내를 구분합니다. 기존 창 안내만 본 세션에서도 새 커서 가이드를 한 번 보여주며, 이후 같은 세션에서는 반복하지 않습니다.
1 파일: 첫 번째 디자인 아이콘을 강조하고 더블클릭/탭 안내.
2 창: 실제 기존 작품 창 재사용. 사용자 창이 있으면 그대로 사용하고, 없을 때만 첫 작품을 자동으로 엽니다.
3 Dock: 갤러리/연락처 안내. 열린 Dock 팝오버도 강조 영역에 포함해 주소/연락처 조작 가능.
다음·건너뛰기·시작하기, ESC 종료, Dock 안내 아이콘 다시 보기. 자동 소유 표시가 있는 예시 창만 정리하며 직접 열린 창은 보존합니다.
오버레이는 4개 직사각형 rgba(0,0,0,.5)로 대상 주변만 어둡게 하고 대상은 실제 클릭 가능하게 둡니다. 고정 말풍선 좌표는 화면 안으로 제한합니다. 모바일 2단계는 창 타이틀 바를 강조합니다.

다른 카테고리, 작품 데이터, 원본 참고 파일은 변경하지 않았습니다. 커밋·푸시·배포하지 않습니다.
