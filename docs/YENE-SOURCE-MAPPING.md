# YENE 원본 조사 및 섹션 매핑 — 2026-10-14

적용 범위: Cover 진입 오류와 Project Showcase. 기존 8개 프로젝트 섹션을 유지하며 03~08은 사용자 추가 지시 전까지 변경하지 않았습니다. 따라서 해당 구간에는 HotelsPick 임시 자료가 남아 있습니다.

## 원본 자료

로컬 원본 루트: C:/Users/User/Desktop/Portfolio _2/자료/2026 년 메인포트폴리오 제작하기

- src/js/projects.js: YENE 팀 리디자인 소개, 기업 정보·서비스 탐색·문의 흐름, 실제 팀 사이트 https://stella0526.github.io/yene/.
- public/assets/images/projects/yene-hero-new.png: 난방기와 생활 공간 비주얼(1920×781).
- public/assets/images/projects/yene-desktop-new.jpg: 실제 PC 메인 리디자인(2560×4334). 제품 소개, 시공사례, 대리점/상담·설치·사후관리, 공지·견적 영역 확인.
- public/assets/images/projects/yene-mobile-new.jpg: 같은 팀 리디자인의 모바일 결과물(412×6457). 같은 콘텐츠가 세로로 재배치된 화면 확인.
- works/assets/images/yene-* 및 현재 Works/assets/images/yene-*는 위 결과물과 중복 자료입니다. 이번에는 현재 Works에 이미 복사된 3개 파일을 assets/projects/yene/로 독립 복사했습니다.
- 이전 yene-desktop.webp / yene-mobile.webp / yene-hero.webp도 존재하지만 이번에는 원본 프로젝트 데이터가 지정한 *-new 파일을 사용했습니다.

원격 자료 확인:
- https://github.com/gydms072588-sys/2026-portfolio : master의 프로젝트 데이터/미디어 경로 확인.
- https://gydms072588-sys.github.io/2026-portfolio/#projects : 일반 웹 도구 실패, 이전 실제 브라우저 조사에서 정상 접근 확인.
- https://yene.co.kr/ : 일반 웹 도구는 403, 실제 브라우저에서는 정상 접근. 기존 기업 서비스 참고 자료로만 사용하며 팀 결과물로 소개하지 않음.
- https://stella0526.github.io/yene/ : 실제 팀 리디자인 사이트 정상 접근.
- https://github.com/stella0526/yene : README, index.html, css/style.css와 파일 트리 확인. README에는 개인 역할 정보가 없음.

개인 담당: 현재 원본에 개인별 담당을 확정할 자료가 없어 '개인 담당 범위 미확인'으로 표시. 팀 결과물을 개인 단독 제작으로 표현하지 않습니다.
사용 도구: 팀 소스에서 실제 확인한 HTML/CSS·JavaScript만 표시. Figma, VS Code, Codex, Claude 사용 여부는 개별 증빙이 없으므로 삭제.

## 잘못 복제된 내용

Showcase: 호텔스픽 PC/모바일 이미지, 호텔 검색·추천 설명, Hotels Pick 메인페이지 TYPE, PC 메인페이지 SCOPE, 호텔스픽 제작 역할, 도구 목록, 기존 라이브 링크.
Problem: 호텔 정보 우선순위와 검색 행동.
Design Direction: 정보 재정리/검색 탐색/블루 브랜드 문구.
Key Screens: 호텔 예약·숙소 관련 화면.
Design System: HotelsPick 블루 컬러·타이포·버튼·PC/모바일 이미지.
Before & After: 호텔스픽 6개 비교 이미지와 설명.
Design Outcome: 호텔 정보 인지/탐색/브랜드 결과.

## 현재 8개 섹션 및 매핑

| 번호 | 섹션 | 자료 및 적용 판단 |
|---|---|---|
| 01 | Cover | 기존 UX/UI / Web Design 타이포 및 애니메이션 유지. 전환 직후 스크롤 입력 잔류만 YENE 전용 코드로 보정 |
| 02 | Project Showcase | 실제 PC·모바일 메인 화면과 hero-new 배경 적용. 소개·의도·유형·팀 역할·도구·팀 LIVE 링크 교체 |
| 03 | Problem | 기존 서비스 구조를 조사했으나 사용자 문제 검증/정식 기획서가 없음. 기업·제품·시공·문의 정보 구분 관점으로 정리 가능하나 확정 지시 필요 |
| 04 | Design Direction | 구 포트폴리오의 기업 핵심 정보·서비스 탐색·문의 흐름 의도 활용 가능 |
| 05 | Key Screens | PC·모바일 메인 화면 확인. 팀 원본에 product-ceiling / product-heater / product-slim / product-general.html 있음. 상세 화면을 실제 추가 검수·캡처 후 적용 가능 |
| 06 | Design System | 팀 css/style.css 확인. Paperlogy 폰트, #0f223d / #142946 / #214da3 / #2d8cff / #ffc400 / #182235 / #737b8a / #dfe5ef / #f4f6fa 사용. 상세 폰트 크기·버튼 규칙 추출은 다음 단계 |
| 07 | Before & After | 동일 구간·동일 기준의 원본 비교 이미지 없음. 현재 기업 사이트를 리디자인 당시 Before로 단정하지 않음. 추가 원본 또는 구성 변경 승인 필요 |
| 08 | Design Outcome | 확인된 팀 PC/모바일 결과와 정보 구성 중심으로 정리 가능. 개인 기여/측정 성과는 추가 자료 필요 |

## 이번 적용 정보

소개: 난방·생활가전 기업의 제품과 시공 정보를 정리한 팀 리디자인입니다. / 메인 화면에 제품 소개·시공사례·대리점·문의 정보를 구성했습니다.
의도: 기업과 제품 정보를 구분하고 주요 화면의 역할을 정리했습니다. / 제품 확인에서 시공사례와 문의로 이어지도록 구성했습니다.
TYPE: TEAM PROJECT · 기업 웹사이트 리디자인
FOCUS: 제품 정보 · 시공사례 · 문의 흐름
ROLE: 팀 작업 · 기업 웹사이트 리디자인 / 개인 담당 범위 미확인
TOOLS: HTML/CSS / JavaScript (팀 구현 소스 기준)

## Cover 잘림 재현 및 해결

1440×900 직접 진입에서는 scrollY=0, 제목 top 약297px, transform:none로 정상. HotelsPick에서 넘어간 직후 같은 스크롤 흐름의 입력 800px을 추가 전달하면 YENE scrollY=800, 제목 top 약-503px로 잘림 재현. 제목 위치나 CSS transform 문제가 아니라 네이티브 문서 전환 직후 남은 스크롤 입력이 새 문서에도 전달되는 조건입니다.

YENE 전용 verified-entry.js: HotelsPick에서 온 새로운 navigate이고 hash가 없는 경우에만 pageshow에서 Cover 상단을 표시하고 350ms 동안 이전 스크롤 입력의 꼬리를 흡수합니다. 새 pointerdown은 즉시 보호를 해제합니다. reload/back_forward 및 Contact 직접 주소에는 적용하지 않습니다. 기존 Cover 위치·높이·타이포·애니메이션 및 다른 프로젝트 코드는 변경하지 않았습니다.
