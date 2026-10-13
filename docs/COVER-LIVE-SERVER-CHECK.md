# Cover 및 Live Server 점검 — 2026-10-13

## 원인 및 수정

전체 제목을 기준으로 가상 드래그 범위를 계산했지만 종료 처리에서 workspace-running을 제거하면서 기존 두 번째 줄의 영구 선택 테두리, 핸들 및 커서가 다시 나타났습니다. 기존 장식은 항상 숨기고 실제 h1 전체의 경계로 임시 선택 박스를 생성합니다. 선택 후 400ms 정지하고 박스와 가상 커서를 350ms Fade Out하여 제거한 뒤 Scroll을 표시합니다. 실제 사용자 포인터는 변경하지 않습니다.

HTML 초기 data-workspace-pending 상태에서 Scroll을 숨겨 모듈 로딩 전 노출도 방지합니다. 축소 모션 설정 및 화면 리사이즈 시 잔여 UI를 정리하고 Scroll을 표시합니다.

메뉴 순서: Content Design → UX/UI & Web Design → Visual Design → Motion & Video Editing. 활성 링크와 원래 목적지를 유지합니다.

## 실행 환경의 확인된 사실

- code --status: 현재 창 visual-design.html - Portfolio-Works-2026, 해당 프로젝트 폴더가 열려 있음.
- Live Server ritwickdey.liveserver-5.7.10 설치됨.
- 5500은 VS Code extension-host 프로세스가 수신 중이며 /uxui.html이 최신 HTML + Live Server reload 스크립트를 정상 제공합니다.
- 5514는 독립 Portfolio-Works-2026 폴더를 명시해 실행한 Python http.server이며 최신 HTML을 제공합니다.
- 5502는 메인 포트폴리오 서버, 5513/works/uxui.html은 구버전 Works입니다. 해당 서버를 수정하거나 종료하지 않았습니다.
- 현재 각 포트는 별도 프로세스가 정상 수신 중입니다. 같은 포트를 두 프로세스가 차지하는 충돌은 확인되지 않았습니다.
- 프로젝트별 Live Server 설정 파일은 없습니다. 사용자 설정에는 알림 숨김 항목만 확인됐습니다.
- 현재 Live Server 확장 자체의 실행 오류는 재현되지 않았습니다. 재설치나 설정 변경을 수행하지 않았습니다.

## VS Code 실행 방법

1. 파일 > 폴더 열기: C:\Users\User\Desktop\Portfolio _2\Portfolio-Works-2026
2. 루트의 uxui.html, content-design.html, visual-design.html, motion-video.html 중 하나를 엽니다.
3. HTML 편집기에서 우클릭 > Open with Live Server. 현재 포트에서는 http://127.0.0.1:5500/uxui.html 입니다.
4. 구버전 주소의 /works/uxui.html 대신 독립 프로젝트 루트의 /uxui.html을 사용합니다.
5. 문제가 다시 발생하면 VS Code 출력 > Live Server 로그로 오류를 확인합니다. 포트 점유 오류인 경우 Go Live를 다시 누르기 전에 기존 Live Server를 Stop Live Server로 종료하고 다시 실행합니다.

## 변경 파일

uxui.html, ux-ui.html(별칭), content-design.html, visual-design.html, motion-video.html
js/cover-workspace.js, js/page-interactions.js(버전 경로)
css/cover-workspace.css

현재 프로젝트 dist 빌드만 갱신. 구버전 및 최신 메인 소스 변경 없음. 커밋·푸시·배포 없음.
