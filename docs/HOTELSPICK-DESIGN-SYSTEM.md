# HotelsPick 실제 CSS 확인 (2026-10-13)

출처: https://gydms072588-sys.github.io/hotelspick/ 및 css/style.css. 로컬 첨부 PNG는 구현 화면 자료이며, 로컬 호텔스픽 HTML/CSS 원본 프로젝트는 workspace에서 확인되지 않았습니다. 배포 소스를 직접 분석했습니다.

폰트: Pretendard, sans-serif. Paperlogy 정의 없음.
- .section h2: 30px / 700 / 1.38 (41.4px)
- .deal-card h3: 22px / 700 / 1.35 (29.7px), JavaScript 생성 카드
- .hotel-card h3: 15px / 700 / 1.4 (21px)
- body: 15px / 400 / 1.55 (23.25px)
1440px PC 및 390px 모바일에서 위 값 동일. H1/H4는 실행 DOM에도 없음.

Color: --primary #1B4CFE, section background #F6F7FA, tabs/footer #4B5668. 흰 버튼 #FFFFFF, detail text #171A21.

Buttons:
- .search-button: primary / white, border 0, radius 12px, hover filter brightness(.94), 16px/600
- .destination-tabs: #4B5668 container, active primary, white text, border 0, radius 16px, 13px/500(active600). 별도 hover 없음.
- .detail-button: white / #171A21, border 0, radius 20px, 13px/600. 별도 hover 없음. (시안의 아웃라인과 다름)
- .partner-box a: primary / white, border 0, radius 0, 14px/600. 별도 hover 없음.

Mobile: @media(max-width:800px) 검색 폼 2열/체크인·아웃 등의 반응형 실제 적용. 390px 화면 캡처, 문서 scrollWidth385px로 가로 넘침 없음. 이를 실제 구현 상태 그대로 사용하며 별도 모바일 UI를 생성하지 않았습니다.

제외: Paperlogy, H1, H4, 미확인 headline48/36/28/18, QR, HTML Prototype_Layout, wireframe, Forms/Spacing/Tabs 별도 규칙. 확인된 국내/해외 버튼은 Button 샘플에만 포함.
