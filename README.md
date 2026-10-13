# Portfolio-Works-2026

최신 Works 독립 복사본. 구버전 works 원본과 최신 Portfolio_2026 코드는 수정하지 않습니다.

## 로컬 실행
프로젝트 루트에서 python -m http.server 5514 --bind 127.0.0.1 실행.
- http://127.0.0.1:5514/uxui.html
- http://127.0.0.1:5514/content-design.html
- http://127.0.0.1:5514/visual-design.html
- http://127.0.0.1:5514/motion-video.html

최신 메인은 http://127.0.0.1:5502/ (Portfolio_2026). Search 전용 진입은 ./search-entry.html#main이며 원본 화면/라우터를 재사용하고 오프닝을 건너뜁니다.
node build.mjs로 프로젝트 내부 dist/에 정적 복사 빌드합니다. 자세한 편집법은 EDITING-GUIDE.md 참조.
