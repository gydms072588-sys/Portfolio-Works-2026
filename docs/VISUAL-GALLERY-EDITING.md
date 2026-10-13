# Visual Design 최종 데스크톱 UI

## 파일 표시와 원본 보존
js/visual-gallery-data.js의 visualWorks 원본24개를 보존합니다.
visibleVisualFiles가 화면에 표시할5개(디자인3/영상2)의 id/kind/label을 관리합니다.
작품 등록은 해당id의 visualWorks 항목 title/image/type/description/detailImages에서 수정합니다.
실제 작품명/이미지는 아직 빈값입니다. 디자인 파일/영상 파일은 임시 유형명입니다.
PC 아이콘96×120px, 모바일76×96px, 파일명 확대. PC5개1열, 모바일디자인3+영상2 중앙정렬.
기존 더블클릭/터치탭, 다중창, 닫기, 최대화/복원, 드래그, 창순서 유지.

## Dock 설정
js/visual-dock-data.js:
1. 디자인 도구 묶음: 작은 팝오버. Photoshop/Illustrator 기존SVG, After Effects 에셋 미확보로 이름 표시. 도구실행 기능 없음.
2. 온보딩: 느낌표 원형아이콘. 최초세션 자동등장. 시작하기/닫기 후 sessionStorage에 기록, 같은탭새로고침시 반복하지않음. 아이콘으로 재열기.
3. 갤러리: https://gydms072588-sys.github.io/Portfolio-Gallery_2026/index.html 새탭, noopener.
4. 메일: mailto:gydms1413@naver.com, hover title로주소표시.
5. 연락처: 모바일/coarse pointer tel:01049141413. PC팝오버 010-4914-1413 클릭복사.
기존 Notes/Trash/개별프로그램 버튼은 화면에서 제거했습니다.

## 검수
1920×1080 / 1440×900 / 1366×768 / 390×844:
파일5개(3design/2video),Dock5개,가로넘침 없음,JS오류없음.
온보딩 최초자동표시/같은세션재등장안함/수동재열기,팝오버3도구 확인.
창 최대화후 복원시 원래크기위치 일치. 이미지미등록 유지.
전화번호클립보드 복사성공. 메일href확인. 갤러리새탭 실제로드(title Project Archive)확인.
기본메일앱/전화앱의 실행은 사용자기기 설정에 의존하며 메일발송/전화걸기를 실행하지 않았습니다.

## 수정 파일
visual-design.html, css/visual-gallery.css,
js/visual-gallery.js, js/visual-gallery-data.js,
js/visual-dock.js, js/visual-dock-data.js, js/visual-window-manager.js,
docs/VISUAL-GALLERY-EDITING.md.
다른 Works 페이지 및 메인소스 변경 없음. 커밋/푸시/배포 없음.
