/* Add only verified comparison pairs here. */
globalThis.ProfileComparisons = [
 {id:'ux-ui',label:'UX/UI',templateId:'qa-compare-ux-content',categoryId:'ux-ui',cta:'UX/UI 포트폴리오 보기 →'},
 {id:'content-design',label:'콘텐츠 디자인',templateId:'qa-compare-content-design',categoryId:'design',cta:'콘텐츠 디자인 포트폴리오 보기 →'},
 {id:'visual-design',label:'비주얼 디자인',templateId:'qa-compare-visual-design',categoryId:'indesign',cta:'비주얼 디자인 포트폴리오 보기 →'}
];

// Preserve verified assets and copy from the existing templates as editable tab data.
ProfileComparisons.forEach(data=>{
 // 비교 버튼은 카테고리 선택 화면을 거치지 않고 해당 작업물 페이지로 연결합니다.
 const pages={'ux-ui':'uxui.html','content-design':'content-design.html','visual-design':'https://gydms072588-sys.github.io/Portfolio-Gallery_2026/index.html'};
 data.ctaHref=new URL(pages[data.id],globalThis.PortfolioWorksBase||new URL('./',location.href)).href;
 const figures=document.getElementById(data.templateId)?.content.querySelectorAll('.qa-compare-item');
 ['before','after'].forEach((key,index)=>{
  const figure=figures?.[index];if(!figure){data[key]=null;return;}
  const image=figure.querySelector('img,svg');
  data[key]={image:image.tagName.toLowerCase()==='svg'?image.querySelector('image').getAttribute('href'):image.getAttribute('src'),description:figure.querySelector('p').textContent.trim()};
 });
});

const uxComparison=ProfileComparisons.find(data=>data.id==='ux-ui');
uxComparison.before.points=[
 {tag:'정보우선순위불명확',description:'검색과 추천 정보가 분산된 구성'},
 {tag:'핵심행동분산',description:'검색 기능의 시각적 중요도가 낮은 배치'},
 {tag:'브랜드일관성부족',description:'콘텐츠 구성과 비주얼 톤의 통일감 부족'}
];
uxComparison.after.points=[
 {tag:'정보구조재정리',description:'핵심 정보와 콘텐츠의 위계 구분'},
 {tag:'검색동선개선',description:'검색창을 상단 핵심 액션으로 배치'},
 {tag:'브랜드톤통일',description:'블루 중심의 일관된 비주얼 구성'}
];

const contentComparison=ProfileComparisons.find(data=>data.id==='content-design');
contentComparison.before.points=[
 {tag:'정보우선순위혼재',description:'메인 메시지와 보조 정보가 동시에 강조됨'},
 {tag:'가독성저하',description:'강한 시각 효과와 텍스트 밀도로 핵심 내용 파악이 어려움'},
 {tag:'구매포인트분산',description:'제품 특징과 활용 정보의 전달 흐름이 불명확함'}
];
contentComparison.after.points=[
 {tag:'메인메시지정리',description:'핵심 카피와 대표 제품 이미지를 우선 배치'},
 {tag:'정보구조개선',description:'제품 장점, 비교, 활용 장면, 기능 설명의 흐름 재정리'},
 {tag:'가독성강화',description:'타이포그래피와 강조 요소를 정돈하여 정보 위계 개선'}
];

const visualComparison=ProfileComparisons.find(data=>data.id==='visual-design');
visualComparison.before.points=[
 {tag:'메인주목도분산',description:'인물 이미지와 타이틀, 정보 요소가 동시에 경쟁해 핵심 메시지 집중도가 약합니다.'},
 {tag:'장르무드약화',description:'포스터 전반의 분위기는 전달되지만, 작품의 미스터리하고 몽환적인 인상이 강하게 각인되지는 않습니다.'},
 {tag:'시각위계모호',description:'제목, 인물, 부가 정보의 우선순위가 명확하지 않아 한눈에 읽히는 구조가 부족합니다.'}
];
visualComparison.after.points=[
 {tag:'메인타이틀강조',description:'작품 제목을 중심으로 시선을 집중시키고 핵심 카피의 존재감을 강화했습니다.'},
 {tag:'무드집중강화',description:'컬러와 장면 선택을 통해 영화의 로맨틱하면서도 몽환적인 분위기를 더 인상적으로 전달했습니다.'},
 {tag:'포스터위계정리',description:'타이틀, 카피, 메인 비주얼, 개봉 정보 순으로 정보 흐름을 정리해 가독성과 전달력을 높였습니다.'}
];
