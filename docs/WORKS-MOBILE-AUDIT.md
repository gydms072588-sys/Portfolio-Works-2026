# Works 모바일 PC 콘텐츠 일치 검수 — 2026-10-13

## 발견 및 수정

- 모바일 JS가 모든 프로젝트에 data-current를 부여해 PC 슬라이더의 비활성 임시 카드까지 세로로 노출했습니다. 독립 Works 상세 HTML에 data-mobile-pc-content를 지정하고 현재 프로젝트 상태를 PC와 동일하게 유지했습니다.
- 모바일 전용 프로젝트 정보 보기 버튼과 정보 이동 패널로 PC와 읽기 흐름이 달랐습니다. 해당 상세 페이지는 PC의 DESIGN INTENT 및 TOOLS 위치를 유지하고 버튼을 숨깁니다.
- 모바일도 기존 프로젝트 전환 컨트롤 및 스와이프를 사용합니다. HotelsPick에서 PC에 삭제된 컨트롤은 다시 추가하지 않습니다.
- 20px 좌우 여백, 16px 본문, 48px CTA, 도구 글자와 페이지네이션 터치 영역을 보완했습니다.
- PC 스타일은 모바일 미디어쿼리 밖에서 변경하지 않았습니다. 기존 이미지, 링크, 콘텐츠 및 섹션 순서를 유지했습니다.

## 실제 브라우저 검수

Chrome 터치 에뮬레이션: 390×844 / 375×812 / 430×932. 네 페이지의 모든 섹션을 스크롤했습니다.

| 페이지 | 모바일 3개 크기 | PC 1366×768 / 1440×900 / 1920×1080 |
|---|---|---|
| uxui.html | 가로 넘침 없음, 활성 프로젝트 1개, 정보 버튼 없음, 이미지 로딩 정상 | 2열 쇼케이스, 활성 프로젝트 1개, 가로 넘침 없음 |
| content-design.html | 동일 | 동일 |
| visual-design.html | 동일 | 동일 |
| motion-video.html | 동일 | 동일 |

- 프로젝트 전환 이벤트: 네 페이지 모두 다음 프로젝트 활성 상태를 확인했습니다.
- Key Screens 이미지 확대 및 닫기: 네 페이지 확인했습니다.
- HotelsPick Before 이미지 확대, 비교 페이지네이션 터치: 정상 확인했습니다.
- 모바일 홈 버튼 터치: 같은 Works 실행 주소의 search-entry.html#main 진입 확인했습니다.
- 검수 중 페이지 JavaScript 오류 없음.
- 전체 모바일 캡처: Windows Temp의 uxui-mobile-full.png / content-design-mobile-full.png / visual-design-mobile-full.png / motion-video-mobile-full.png.

## 그대로 보존한 미완성 PC 콘텐츠

- UX/UI 쇼케이스의 Project Title 2 / Project Title 3는 PC 슬라이더에도 존재합니다. 임의 삭제하지 않았습니다. 모바일 첫 진입에서 일괄 노출되지 않으며 사용자가 프로젝트를 전환하면 PC와 동일하게 표시됩니다.
- Content / Visual / Motion 페이지의 Project Title, View Project, 빈 목업 및 일부 Key Screens 플레이스홀더는 PC에도 존재합니다. 콘텐츠를 새로 작성하지 않았습니다.
- 다른 세 카테고리는 현재 PC에 7개 섹션을 가지고 있습니다. UX/UI의 새 8개 섹션을 복제하거나 새 Design System을 만들지 않았습니다.
- Works AI 챗봇은 앞선 요청에 따라 제거된 기존 상태를 유지합니다.

## 변경 파일

uxui.html, ux-ui.html(동일 페이지 별칭), content-design.html, visual-design.html, motion-video.html
js/showcase.js, js/page-interactions.js
css/works-mobile-parity.css

독립 Works dist 빌드 갱신. 구버전 Works와 Portfolio_2026은 변경하지 않았습니다. 커밋·푸시·배포 없음.
