# Content Design Cover 갤러리

## 적용 범위

content-design.html의 Cover만 변경했습니다. UX/UI 선택 연출 및 Visual 도형/그리드 연출은 그대로 분리되어 있습니다. 메인 Portfolio_2026과 다른 섹션은 변경하지 않았습니다.

## 이미지 교체

content-design.html에서 `Content Cover 갤러리` 주석 또는 `.content-gallery-group`을 검색하세요. 이 원본 그룹의 6개 img src를 바꾸면 JS가 복제하는 두 번째 그룹도 자동으로 동일하게 구성됩니다. 복제 그룹 HTML은 별도로 작성하지 않습니다.

현재 기존 works-data.js에서 category: content-design으로 확인된 본인 프로젝트 에셋만 사용합니다.

- assets/images/banner-ably-01.png
- assets/images/banner-ably-02.png
- assets/images/banner-ably-03.png
- assets/images/banner-ably-04.png
- assets/images/banner-ably-05.png
- assets/images/product-tube-heater-detail.png

참고 사이트의 이미지나 디자인 파일은 가져오지 않았습니다. 일반 배너는 object-fit:contain으로 전체 비율을 유지합니다. 긴 상세페이지는 폭에 맞춰 자연 비율로 표시하고 카드 뷰포트에서 상단을 미리 보여줍니다. 전체 프로젝트 이미지 원본은 변경하지 않았습니다. 다른 작업에도 쓰이는 원본 이미지 파일을 덮어쓰기보다 새 파일을 추가하고 Cover의 src만 바꾸는 편이 독립적으로 관리하기 쉽습니다.

## 인터랙션

- 두 동일 그룹의 합계 너비에서 translateX(-50%)까지 이동하여 루프 경계를 맞춥니다.
- PC 루프 78초, 모바일 62초. CSS 애니메이션으로 천천히 이동합니다.
- 카드 자체는 별도 transform으로 작은 Y 회전/깊이를 적용합니다.
- 포인터 호버: 트랙 정지, 해당 카드만 translateY(-50px) / rotateY(0) / scale(1.05), 400ms ease-out. 벗어나면 기존 위치와 이동 복귀.
- 카드가 화면 밖으로 나가면 IntersectionObserver로 이동을 정지해 불필요한 렌더링을 줄입니다.
- 타입 연출 완료 후 Scroll 등장. Content에서는 가상 선택 박스/커서를 생성하지 않습니다.
- 모션 감소 환경에서는 움직임 없이 갤러리·완성 제목·Scroll을 표시합니다.

## 검수

1920×1080, 1440×900, 1366×768, 390×844에서 100svh, 이미지 로딩, 제목·Scroll 표시, 가로 넘침 없음, 선택 박스 없음 및 콘솔 오류 없음을 확인했습니다. 실제 호버 상승·정지·재개, 루프 경계 위치 일치와 홈 버튼 Search 이동을 확인했습니다. UX/UI와 Visual의 전용 Cover 구분도 확인했습니다.

## 수정 파일

- content-design.html — 전용 Cover 속성과 이미지 목록
- css/content-cover-gallery.css — 검은 배경, 흰 타이틀, 트랙/원근/호버/모바일 스타일
- js/content-cover-gallery.js — 반복 그룹, 타입 연출, 화면 밖 정지, 모션 감소 처리
- js/cover-workspace.js — Content 전용 Cover는 UX/UI 선택 연출에서 제외
- js/page-interactions.js — 전용 모듈 연결 및 캐시 버전

커밋·푸시·배포 없음.

## 큰 파일철 연출 보완

카드 폭을 PC 330~460px, 높이를 380~540px로 확대했습니다. 모바일은 240×340px입니다. 폭을 일부 겹치고 항목별 높이를 조금씩 바꿔 종이 묶음 느낌을 냅니다. ::after 상단 탭, ::before 뒤 종이층, content-file-sheet 반투명 앞 커버와 얇은 테두리/빛 반사로 클리어 파일을 표현합니다. 원본 이미지는 수정하지 않았습니다.

PC에서 중심에 가까운 파일은 최대 7% 크게, 양쪽은 소폭 Y 회전합니다. 두 반복 그룹의 대응 항목에 같은 값을 적용해 루프 경계의 모양이 유지됩니다. 모바일과 모션 감소 설정에서는 이 계산을 생략합니다. 호버는 50px 상승, 정면 회전, 8% 확대, 흐름 일시 정지 후 정상 복귀합니다.
