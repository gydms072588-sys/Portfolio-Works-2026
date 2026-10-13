# 자린고비 원본 조사 및 섹션 매핑 — 2026-10-14

이번 적용 범위는 01 Cover / 02 Project Showcase입니다. 03~10은 사용자 지시대로 수정하지 않았습니다. 그 구간에는 아직 ABLY 임시 콘텐츠가 남아 있으며 자린고비 완성 페이지로 확정하지 않습니다.

## 확인한 원본

로컬 자료 루트: `C:/Users/User/Desktop/Portfolio _2/자료/2026 년 메인포트폴리오 제작하기`

- `src/js/projects.js`: 팀 앱, 절약 기록·보상·습관 형성, 서비스 의도, 라이브 링크. 프로그램 목록은 공통 자동 배정이므로 자린고비 사용 도구 증거로 사용하지 않았습니다.
- `public/assets/images/projects/jaringobi-mobile-new.png`: 실제 내용을 열어 확인한 앱 홈 화면(오늘의 절약미션, 캐릭터와 방 배경, 수다방·챌린지·카메라 버튼). 원본 코드의 로그인 화면 alt는 이미지 내용과 달라 사용하지 않았습니다.
- `public/assets/images/projects/jaringobi-bg-new.mp4`: 720×1280, 약 20.20초. 실제 2초 장면의 '자린이의 하루' 문구와 일상 장면 확인. AI 모델, 프롬프트 원문, 개인 영상 제작 기여는 확인되지 않았습니다.
- `works/assets/images/jaringobi-main.jpg`: 아래 갤러리 캐릭터 시트와 SHA-256 동일, 중복 자료입니다.

갤러리 로컬: `C:/Users/User/Desktop/Portfolio _2/자료/Portfolio-Gallery_2026`

- `assets/images/character/jaringobi/jaringobi-main.jpg`: 정면·측면·후면, 표정·동작 시트. 이미지 안의 크레딧에 외관 디자인 박효은, 캐릭터 설정·세계관 팀 공동 참여 명시.
- `assets/images/character/jaringobi/jaringobi-thumbnail.jpg`: 같은 캐릭터의 대표 썸네일. 별개의 작품으로 계산하지 않습니다.
- 원격 최신 `js/projects.js`의 `asset-jarigobbi-character`: 개인 캐릭터 기획·디자인·일러스트 에셋, Illustrator / Photoshop 확인. 방 꾸미기와 보상 콘텐츠는 활용 의도에 언급되어 있으나 해당 UI·가구 원본 파일까지 증명하지 않습니다.

원격 확인:
- https://github.com/gydms072588-sys/2026-portfolio (master 트리와 src/js/projects.js 확인)
- https://gydms072588-sys.github.io/2026-portfolio/#projects (일반 웹 도구에서는 접근 실패, 실제 브라우저에서는 정상 접근)
- https://github.com/gydms072588-sys/Portfolio-Gallery_2026 (main js/projects.js 확인)
- https://1team-jaringobi.vercel.app/ (로그인 화면까지만 확인. 계정 생성·로그인 없이 인증 이후 화면 확인 불가)

## 잘못 복제된 콘텐츠

Cover: ABLY 배너·블라우스 및 다른 브랜드 패널.
Showcase: ABLY 영상, PC·모바일 쇼핑몰 화면, 상품 탐색·혜택·구매 흐름, 공통 도구 6종, ABLY LIVE SITE.
03~10: ABLY Overview, 커머스 Design Direction, 메인·카테고리·상품 상세 Key Screens, ABLY 색상·폰트·버튼, AI 영상 2개/스토리보드, PC·모바일 배너, 블라우스 상세페이지, 커머스 제작 Outcome. 이번 범위 밖이므로 보존하고 아래와 같이 매핑만 제안합니다.

## 매핑

| 번호 / 현재 섹션 | 실제 자료 / 제안 | 상태 |
|---|---|---|
| 01 Cover | 캐릭터 썸네일·앱 홈·캐릭터 시트 | 적용. 원래 패널 크기·각도·순환·타이핑 유지 |
| 02 Showcase | 개인 캐릭터 시트 + 팀 앱 홈 + 원본 자린이 영상 배경 | 적용. 팀 결과물과 개인 담당을 구분 |
| 03 Overview | 팀 앱 설명, 절약 미션 홈, 친근한 캐릭터 방향 | 다음 지시 후 적용 |
| 04 Design Direction | 단순한 캐릭터 형태·외곽선·표정의 일관성 | 갤러리 기획 문구 확인. 컬러 규칙은 별도 원본 추가 확인 필요 |
| 05 Key Screens | 앱 홈 1개 확인. 미션 인증·보상·커뮤니티 화면 별도 자료 필요 | 3개 화면을 임의로 만들지 않음 |
| 06 Design System | 실제 앱의 폰트·버튼·색상 규칙 원본 필요 | 구 포트폴리오 테마 #ab7045는 앱 디자인 시스템 컬러의 증거가 아님 |
| 07 AI Video Production | 원본 '자린이의 하루' 영상 1개 있음 | AI 제작/개인 역할/프롬프트/스토리보드 확인 전에는 AI 제작 섹션으로 단정 불가. 영상 소개로 변경 여부 승인 필요 |
| 08 Banner | 별도 자린고비 배너 제작물 미확인 | 캐릭터 에셋 소개로 전환할지 승인 필요. 원본 표정·동작 시트는 있음 |
| 09 Product Detail | 상품 상세페이지 없음 | 캐릭터 시트 상세 소개로 전환할지 승인 필요. 방·가구·칭호 원본은 추가 자료 필요 |
| 10 Design Outcome | 확인된 개인 캐릭터 결과물과 팀 앱 기여 구분 | 다음 지시 후 적용. 성과 수치 및 단독 앱 제작 주장 제외 |

포인트·칭호·경험치, 의상·가구, 인증/보상 시스템의 상세 동작은 현재 자료에서 화면·코드까지 확인되지 않았으므로 Showcase에 추가하지 않았습니다. 앱 홈에 숫자 0이 있지만 이를 포인트나 경험치라고 추정하지 않았습니다.

## 이번 적용 문구

소개: 절약 습관을 게임처럼 경험하도록 기획한 팀 앱 프로젝트입니다. / 개인 담당은 캐릭터 기획·디자인과 일러스트 에셋 제작입니다.
의도: 절약을 친근하게 느낄 수 있도록 단순한 캐릭터를 구성했습니다. / 작은 화면에서도 표정과 동작이 명확하게 보이도록 형태를 정리했습니다.
TYPE: TEAM PROJECT · 게이미피케이션 앱
FOCUS: 절약 기록 · 보상 · 습관 형성
ROLE: 개인 담당 · 캐릭터 기획·디자인 · 일러스트 에셋 제작
TOOLS: Illustrator / Photoshop (캐릭터 제작 도구만)

모니터 프레임에는 PC 앱 화면을 임의 생성하지 않고 개인 캐릭터 시트를 보여주며, '캐릭터 시트 · 개인 작업 / 앱 홈 화면 · 팀 결과물' 라벨로 구분합니다.

## Cover 겹침 원인

실제 브라우저에서 동일 라벨이 1개임을 확인했습니다. `.uxui-cover-title`의 음수 letter-spacing 계산값이 작은 `.jaringobi-project-label`에 상속되어 글자가 겹쳤습니다. 프로젝트 전환 모듈은 텍스트를 생성하거나 다음 문서로 전달하지 않습니다. 전용 CSS에서 라벨의 font-size, line-height, letter-spacing, margin을 독립 지정했습니다. 대형 Content / Design 타이포그래피와 순환 애니메이션 코드는 수정하지 않았습니다.

복사한 실제 파일은 `assets/projects/jaringobi/`에서 독립 관리합니다. ABLY와 다른 카테고리 및 원본 자료는 수정하지 않습니다.
