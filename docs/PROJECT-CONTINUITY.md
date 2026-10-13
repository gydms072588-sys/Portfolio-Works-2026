# 프로젝트 연속 스크롤과 Contact

- 독립 HTML을 유지합니다. 각 문서의 원래 ID, 미디어 및 초기화 코드를 재사용하므로 두 프로젝트를 하나의 DOM에 합칠 때 발생하는 ID와 이벤트 충돌을 피합니다.
- 첫 프로젝트의 Outcome 다음에 전환 영역을 둡니다. 실제 아래 방향 문서 스크롤과 전환 영역 끝 도달을 모두 확인한 뒤 네이티브 페이지 이동으로 다음 Cover를 표시합니다. 휠/터치 이벤트 자체로 이동하지 않습니다.
- 뒤로가기 복원 및 새로고침만으로 자동 이동하지 않도록 pageshow에서 전환 진행 상태를 초기화합니다.
- 마지막 프로젝트에 Contact를 정적 HTML로 추가하여 기존 Scroll Spy가 초기화할 때 함께 인식합니다.
- Contact는 기존 홈 버튼과 같은 search-entry.html#main으로 돌아갑니다. 최신 메인 원본을 수정하거나 로컬 경로로 참조하지 않습니다.
- 이메일/전화 앱 실행은 운영체제에 위임하며 자동 실행하지 않습니다.

연결: uxui.html → yene.html → Contact / content-design.html → jaringobi.html → Contact.
공통 전환 코드: js/project-continuity.js 및 css/project-continuity.css.
