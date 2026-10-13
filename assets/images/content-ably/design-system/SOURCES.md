# ABLY Design System 근거

원본: https://github.com/gydms072588-sys/caffe_24_a-bly_re-design_18
확인 파일: css/style.css, css/home.css, index.html, category.html, product-detail.html (2026-10-14)

- style.css :root: white #fff, ink #161313, pink #ff4f87, pink-dark #e83770, pink-soft #fff0f5.
- 폰트: CSS 등록명 Paperozi; 원본 @font-face가 Paperlogy WOFF2 파일을 사용. 표시용 샘플만 ABLYPaperozi 별칭 사용.
- home.css .home-hero__content h1/h2: clamp(44px,4.1vw,66px), 700.
- style.css .products-page .products-section-head h2: clamp(24px,2.5vw,34px), 700.
- style.css .products-page .product-card h3: 17px, 600.
- style.css body: 16px, 400 (개별 본문의 공통 규칙으로 확대 해석하지 않고 Body 기본값으로 표시).
- home.css .home-hero__cta: min-height48px, radius3px, 14px/700, pink/white.
- style.css .category-filter a: min-height38px, radius999px, 14px/500, #f6f6f6/#777; active #686868/white.
- style.css .product-detail-button: height56px, radius8px, 16px/800, pink border; primary pink/white, secondary white/pink.

main-pc-preview.png: index.html Chrome1440×900 첫 화면.
main-pc-full.png: 동일 페이지 PC 전체 캡처.
main-mobile.png: 동일 페이지 390×844 반응형 전체 캡처.

원본 규칙에 없는 Pretendard 및 HotelsPick 버튼/폰트 규칙은 ABLY 샘플에서 제외.
