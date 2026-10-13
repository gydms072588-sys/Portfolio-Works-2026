# 다음 프로젝트의 연속 진입 상태

일반 독립 주소 `jaringobi.html`, `yene.html`은 Cover를 유지합니다.
실제 스크롤 전환만 `?entry=showcase`를 붙여 이동합니다. URL이 상태의 기준이므로 해당 상태에서 새로고침해도 Cover가 다시 나타나지 않습니다. 주소의 query를 제거하고 직접 접속하면 Cover가 표시됩니다.

첫 페인트 전에 문서 root에 data-project-entry=showcase를 설정하고 전용 CSS에서 Cover를 display:none 처리합니다. HTML 원본은 삭제하지 않습니다. 다른 페이지/직접 진입에는 이 규칙이 적용되지 않습니다.

Scroll Spy는 연속 진입 상태에서만 Cover를 대상 목록에서 제외합니다. 표시 번호는 원래 전체 섹션 인덱스를 사용해 02 Project Showcase부터 시작합니다. 기존 Showcase 등장 모듈은 수정하지 않습니다.

기존 Cover에 속해 있던 카테고리 메뉴와 홈 제어는 같은 DOM을 고정 탐색 영역으로 옮겨 계속 사용할 수 있게 했습니다. 다음 프로젝트의 초기 문서 이동에만 350ms 이전 스크롤 입력 보호를 적용하고 reload/back_forward에는 적용하지 않습니다.

수정 파일: jaringobi.html / yene.html / js/project-continuity.js / js/works-navigation.js / js/projects/yene/verified-entry.js
추가 파일: css/project-entry.css / js/project-entry.js

기존 첫 번째 프로젝트 Cover와 작품 콘텐츠, Contact는 그대로 유지합니다. 커밋·푸시·배포하지 않습니다.
