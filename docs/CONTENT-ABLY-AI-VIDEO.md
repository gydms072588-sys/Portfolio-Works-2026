# ABLY AI VIDEO PRODUCTION

원본 프로젝트는 변경하지 않습니다.
원본 근거: 자료/Portfolio-Gallery_2026/js/projects.js video-ably-hero, 공개 GitHub 동일 항목.
실제 영상 검수: 각 1280×720, 10초. 인물·모바일 쇼핑 / 선물 상자·의류·가방·신발.

## 영상과 스토리보드 매핑
- VIDEO01: assets/videos/ably-hero-01.mp4 + assets/images/ably-hero-video-storyboard.png
- VIDEO02: assets/videos/ably-hero-02.mp4 + assets/images/ABLY_benefits_hero_storyboard_gray.png

현재 Works에 이미 독립 복사된 네 파일은 갤러리 원본과 SHA256이 동일합니다. 재인코딩 없음.

## 프롬프트
기존 갤러리/구버전/Works/메인 프로젝트의 기획 문서 후보와 텍스트 자료를 검색했으나 원문 미확보.
기존 projects.js에는 프롬프트 설계 역할만 확인되며 원문 및 구체적인 생성 AI 모델은 확인되지 않았습니다.
임의의 원문·AI 서비스명은 표시하지 않습니다.

## 수정 위치
- HTML: content-design.html .ably-ai-production
- 문구/영상별 데이터/전환: js/content-ably-ai-video.js
- 전용 스타일: css/content-ably-ai-video.css
- 기존 Before & After: content-design.html template#ably-before-after-preserved에 6개 데이터와 구조 보존.
- 등장: js/scroll-content-reveal.js 기존 20px / 600ms / ease-out 규칙 재사용. 영상 전환 fade300ms.

재생 전 poster 2장은 원본 MP4의 첫 프레임을 브라우저에서 캡처했습니다. 영상 파일은 변경하지 않았습니다.
