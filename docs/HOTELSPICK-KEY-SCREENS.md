# HotelsPick Key Screens 확인

확인일: 2026-10-13. 출처: https://gydms072588-sys.github.io/hotelspick/ , css/style.css , js/main.js.
워크스페이스에서 HotelsPick 별도 HTML/CSS 원본 프로젝트는 확인되지 않아 배포 소스를 직접 열어 확인했습니다.

최종 화면 순서: Header → Hero & Search → 특가 호텔 → HOT 여행지 → 평점 높은숙소 → 제휴 문의 → Footer.
PC 1440×1000 브라우저에서 실제 DOM 영역을 그대로 캡처했습니다. 이미지 내용 수정/재생성 없음.

선정:
- Main Visual & Search: 실제 배너와 입력 요소를 함께 확인
- 특가 호텔: 지역/가격/할인 카드와 좌우 슬라이더
- HOT 여행지: 국내·해외 탭, 도시 선택, 프로모션 이미지/도트 슬라이더
- 평점 높은 숙소: 국내·해외 및 지역 필터와 숙소 가격/평점
- 제휴 문의 CTA: 이용자 탐색 이후의 제휴 진입 요소

검증: hero next 클릭 후 transform 변화, 국내/해외 탭 aria-selected 변화 및 카드 변경. 실제 JS에서 특가 호텔 이전/다음, 도시 hover/focus/click, 프로모션 dot, 숙소 탭/지역 필터 핸들러 확인.
검색 form submit은 preventDefault이며 검색 결과/예약 기능을 확인하지 못했습니다. 제휴 버튼 href는 #이며 문의 폼 연결이 확인되지 않았습니다. 사용자 수/전환율/사용자 반응 수치 없음.

이미지 저장: assets/images/hotelspick-key-main.png, hotelspick-key-deals.png, hotelspick-key-destinations.png, hotelspick-key-rated.png, hotelspick-key-partner.png.
HTML: uxui.html 및 ux-ui.html의 06 Key Screens. 기존 레이아웃/CSS/공통 확대 코드를 그대로 사용합니다.
