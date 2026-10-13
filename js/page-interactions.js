// 화면 구조와 문구는 각 HTML에서 수정합니다. 이 파일은 동작만 연결합니다.
import {setupProjectCategoryCarousels,applyProjectCardsMobileState,setupProjectInfoAccordion,setupProjectCardReveal,PROJECTS_MOBILE_QUERY,isProjectsMobile} from './showcase.js?v=20261013-mobile-parity-1';
import {mountWorksNavigation} from './works-navigation.js?v=20261013-overlap-1';


import './works-category-settings.js?v=20261013-motion-hidden-1';
const categorySettings=globalThis.PortfolioWorksSettings;
for(const nav of document.querySelectorAll('.category-nav')){const links=[...nav.querySelectorAll('a')];links.sort((a,b)=>categorySettings.categoryFiles.indexOf(a.getAttribute('href').split('/').pop())-categorySettings.categoryFiles.indexOf(b.getAttribute('href').split('/').pop()));for(const link of links){link.hidden=!categorySettings.motionVideoEnabled&&link.getAttribute('href').endsWith('motion-video.html');nav.append(link);}}

// 01 커버: 제목에 맞춰 기존 카테고리 간격 유지
const menu=document.querySelector('.uxui-cover .category-nav'),title=document.querySelector('.uxui-cover-title');
const align=()=>{if(!menu||!title)return;const cover=title.closest('.uxui-cover'),top=title.getBoundingClientRect().top-cover.getBoundingClientRect().top,gap=innerWidth<768?40:innerHeight<=900?50:70;menu.style.top=Math.max(88,top-menu.offsetHeight-gap)+'px';};align();document.fonts.ready.then(align);new ResizeObserver(align).observe(title);addEventListener('resize',align);

// 02 작품 쇼케이스: 원본 슬라이더와 모바일 정보 펼치기 재사용
setupProjectCategoryCarousels();applyProjectCardsMobileState();setupProjectInfoAccordion();setupProjectCardReveal();matchMedia(PROJECTS_MOBILE_QUERY).addEventListener('change',()=>{applyProjectCardsMobileState();if(!isProjectsMobile())document.querySelectorAll('.project-category-nav-item.is-active').forEach(n=>n.click());});
const showcase=document.querySelector('.works-showcase');if(showcase.querySelector('.project-subtitle')){const fit=()=>{const card=showcase.querySelector('.project-card[data-current]');if(!isProjectsMobile()&&card?.querySelector('.project-subtitle'))showcase.style.height=Math.max(innerHeight,card.querySelector('.project-card-inner').offsetHeight)+'px';else showcase.style.removeProperty('height');};const ro=new ResizeObserver(fit);showcase.querySelectorAll('.project-card-inner').forEach(n=>ro.observe(n));new MutationObserver(fit).observe(showcase,{subtree:true,attributes:true,attributeFilter:['data-current']});fit();}

// 03 문제 정의: 기존 페이드 등장
if(!matchMedia('(prefers-reduced-motion:reduce)').matches){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}}),{threshold:.12});document.querySelectorAll('.ed-strategy-why,.ed-strategy-direction>header,.ed-strategy-card').forEach(n=>{n.classList.add('has-fade');io.observe(n);});}

// 04 주요 작업: HTML 카드의 이미지, 제목, 설명을 그대로 확대
const workDialog=document.querySelector('.mw-dialog');if(workDialog){const workContent=workDialog.querySelector('.mw-dialog-content');let oldOverflow='';document.querySelectorAll('.mw-card').forEach(card=>card.addEventListener('click',()=>{const heading=document.createElement('h2');heading.id='mw-dialog-title';heading.textContent=card.querySelector('h4').textContent;workContent.replaceChildren(card.querySelector('.mw-preview').cloneNode(true),heading,card.querySelector('.mw-description').cloneNode(true));oldOverflow=document.documentElement.style.overflow;document.documentElement.style.overflow='hidden';workDialog.showModal();workDialog.querySelector('.mw-close').focus();}));workDialog.querySelector('.mw-close').addEventListener('click',()=>workDialog.close());workDialog.addEventListener('click',e=>{if(e.target===workDialog)workDialog.close();});workDialog.addEventListener('close',()=>document.documentElement.style.overflow=oldOverflow);}

// 05 주요 화면: 원본 이미지 확대. 실제 이미지는 HTML img 또는 SVG image에서 수정
const viewer=document.querySelector('.media-viewer'),large=viewer.querySelector('img');document.querySelectorAll('.ks-browser .media-button').forEach(button=>button.addEventListener('click',()=>{const image=button.querySelector('img,image');if(!image)return;large.src=image.getAttribute('src')||image.getAttribute('href');large.alt=button.getAttribute('aria-label')||'';viewer.showModal();}));viewer.querySelector('button').addEventListener('click',()=>viewer.close());viewer.addEventListener('click',e=>{if(e.target===viewer)viewer.close();});

// 06 비교: 두 상태의 문구는 해당 HTML의 data-comparison-copy에서 수정
const comparison=document.querySelector('.ba-comparison');if(comparison){const initialStates=JSON.parse(comparison.dataset.comparisonCopy);let states=initialStates,current=0,lastSwipeAt=0;
const regions=comparison.dataset.comparisonRegions?JSON.parse(comparison.dataset.comparisonRegions):null;
function selectRegion(index){const region=regions[index];states=region.copy;comparison.querySelectorAll(".ba-layer img").forEach((img,i)=>{img.src=region.images[i];img.alt=region.name+" "+region.copy[i].state;});comparison.querySelectorAll("[data-region-index]").forEach((tab,i)=>tab.setAttribute("aria-pressed",String(i===index)));setComparison(0);}
if(regions){comparison.querySelectorAll("[data-region-index]").forEach(tab=>tab.addEventListener("click",()=>selectRegion(Number(tab.dataset.regionIndex))));selectRegion(0);}
function setComparison(index){current=(index+states.length)%states.length;comparison.querySelectorAll('.ba-layer').forEach((layer,i)=>{layer.classList.toggle('is-current',i===current);layer.setAttribute('aria-hidden',String(i!==current));});const text=states[current];comparison.querySelector('.ba-state').textContent=text.state;comparison.querySelector('.ba-copy h4').textContent=text.title;if(comparison.querySelector('.ba-copy p'))comparison.querySelector('.ba-copy p').textContent=text.description;comparison.querySelector('.ba-toggle').setAttribute('aria-label',text.state+' 이미지. 클릭해서 비교하기');comparison.querySelectorAll('.ba-state-tab').forEach((tab,i)=>{tab.classList.toggle('is-selected',i===current);tab.setAttribute('aria-pressed',String(i===current));});}
comparison.querySelector('.ba-toggle').addEventListener('click',()=>{if(performance.now()-lastSwipeAt>500)setComparison(current+1);});comparison.querySelector('.ba-prev')?.addEventListener('click',()=>setComparison(current-1));comparison.querySelector('.ba-next')?.addEventListener('click',()=>setComparison(current+1));comparison.querySelectorAll('.ba-state-tab').forEach(tab=>tab.addEventListener('click',()=>setComparison(Number(tab.dataset.stateIndex))));comparison.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();setComparison(current+(event.key==='ArrowRight'?1:-1));}});
let touchStart=null;comparison.querySelector('.ba-stage').addEventListener('touchstart',event=>{const t=event.touches[0];touchStart={x:t.clientX,y:t.clientY};},{passive:true});comparison.querySelector('.ba-stage').addEventListener('touchend',event=>{if(!touchStart)return;const t=event.changedTouches[0],dx=t.clientX-touchStart.x,dy=t.clientY-touchStart.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy)){lastSwipeAt=performance.now();setComparison(current+(dx<0?1:-1));}touchStart=null;},{passive:true});
comparison.querySelector('.ba-original')?.addEventListener('click',()=>{const img=comparison.querySelector('.ba-layer.is-current img');if(img){large.src=img.src;large.alt=img.alt;viewer.showModal();}});


}
// 공통 홈 버튼, 섹션 위치 표시. AI 챗봇은 이전 요청대로 제거 상태 유지
mountWorksNavigation();

// 이미지 로딩 실패 시 빈 프레임 유지
document.querySelectorAll('.ba-layer img,.ba-layer image').forEach(image=>image.addEventListener('error',()=>{image.remove();}));

// HotelsPick: 긴 원본 화면은 목업 안에서 스크롤, 클릭하면 원본 비율로 확대
 document.querySelectorAll('.hotelspick-screen-preview').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');large.src=img.src;large.alt=img.alt;viewer.showModal();}));

// HotelsPick Problem: 섹션 진입 시 요청 순서로 한 번만 등장
const problem=document.querySelector('.hotels-problem');
if(problem&&!matchMedia('(prefers-reduced-motion:reduce)').matches){
 problem.classList.add('has-message-sequence');
 const title=problem.querySelector('h3'),feedback=problem.querySelector('.hotels-feedback:not(.hotels-feedback-response)'),response=problem.querySelector('.hotels-feedback-response'),image=problem.querySelector('.hotels-before-frame'),cards=[...problem.querySelectorAll('.hotels-problem-list li')];
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function reveal(node,duration=380){if(!node){await pause(duration);return;}const animation=node.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration,easing:'ease-out',fill:'forwards'});await animation.finished;node.style.opacity='1';node.style.transform='none';animation.cancel();}
 const observer=new IntersectionObserver(async entries=>{if(!entries.some(e=>e.isIntersecting))return;observer.disconnect();
  await reveal(title);await pause(180);await reveal(feedback,400);await pause(220);await reveal(response,400);await pause(250);
  const actual=image.querySelector('img');if(actual)await actual.decode().catch(()=>{});await reveal(image,450);await pause(220);
  for(const card of cards){await reveal(card,350);await pause(140);}
 },{threshold:.6,rootMargin:'0px 0px -10% 0px'});observer.observe(title);
}


// Design Direction: 제목 → 화살표 → 세 카드 → Point, 최초 진입 1회
const direction=document.querySelector('.hotels-direction');if(direction&&!matchMedia('(prefers-reduced-motion:reduce)').matches){direction.classList.add('is-animated');const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){direction.classList.add('is-revealed');observer.disconnect();}},{threshold:.15});observer.observe(direction);}

// Problem Before 이미지: 원본 비율 유지, ESC/닫기/배경 클릭은 공통 뷰어 사용
 document.querySelectorAll('.hotels-before-preview').forEach(button=>button.addEventListener('click',()=>{const img=button.querySelector('img');large.src=img.src;large.alt=img.alt;viewer.classList.toggle('ably-overview-viewer',Boolean(button.closest('.ably-overview')));viewer.showModal();viewer.scrollTop=0;}));
viewer.addEventListener('close',()=>viewer.classList.remove('ably-overview-viewer'));

// Problem의 왼쪽 묶음을 실제 Before 이미지 표시 높이에 맞춰 정렬
const problemGrid=document.querySelector('.hotels-problem-grid'),beforeImage=document.querySelector('.hotels-before-preview img');if(problemGrid&&beforeImage){const alignProblem=()=>{if(innerWidth<768){problemGrid.style.removeProperty('height');return;}const frame=document.querySelector('.hotels-before-frame');const imageHeight=beforeImage.naturalHeight/beforeImage.naturalWidth*frame.clientWidth;if(Number.isFinite(imageHeight))problemGrid.style.height=Math.max(650,Math.min(imageHeight,innerHeight-(innerHeight<=900?64:96)))+'px';};beforeImage.addEventListener('load',alignProblem);addEventListener('resize',alignProblem);if(beforeImage.complete)alignProblem();}

// 검증된 디자인 시스템 화면: 영역 순차 등장 및 실제 캡처 원본 확대
const ds=document.querySelector('.hotels-design-system');if(ds){if(!matchMedia('(prefers-reduced-motion:reduce)').matches){ds.classList.add('is-animated');const io=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){ds.classList.add('is-revealed');io.disconnect();}},{threshold:.12});io.observe(ds);}ds.querySelectorAll('.ds-layout-preview').forEach(button=>button.addEventListener('click',()=>{large.src=button.dataset.fullImage;large.alt=button.querySelector('img').alt;viewer.showModal();}));}

// 08 기대효과: 최초 진입 시 제목, 카드, 경험 문장, CTA 순서로 표시
const outcome=document.querySelector('.hotels-outcome');
if(outcome&&!matchMedia('(prefers-reduced-motion:reduce)').matches){outcome.classList.add('has-outcome-motion');const observer=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){outcome.classList.add('is-outcome-visible');observer.disconnect();}},{threshold:.6});observer.observe(outcome.querySelector('header'));}


// HotelsPick 07: 기획서 페이지에 대응하는 6개 동시 비교 슬라이드
const pair=document.querySelector('.hotels-pair-comparison');
if(pair){const slides=JSON.parse(pair.dataset.pairSlides);let index=0;const images=pair.querySelector('.pair-images');const reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;function showPair(next){index=(next+slides.length)%slides.length;const slide=slides[index];for(const state of ['before','after']){const img=pair.querySelector('.pair-'+state+'-image');img.src=slide[state];img.alt=slide.name+' '+(state==='before'?'Before':'After');const copy=pair.querySelector('.pair-'+state+'-copy'),text=slide[state+'Copy'],phrase=state==='after'?slide.afterHighlight:'';copy.replaceChildren();const start=phrase?text.indexOf(phrase):-1;if(start<0){copy.textContent=text;}else{const mark=document.createElement('span');mark.className='pair-highlight';mark.textContent=phrase;copy.append(document.createTextNode(text.slice(0,start)),mark,document.createTextNode(text.slice(start+phrase.length)));}}pair.querySelectorAll('[data-pair-index]').forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===index)));if(!reduced)images.animate([{opacity:.25,transform:'translateY(5px)'},{opacity:1,transform:'translateY(0)'}],{duration:300,easing:'ease-out'});}
pair.querySelector('.pair-prev').addEventListener('click',()=>showPair(index-1));pair.querySelector('.pair-next').addEventListener('click',()=>showPair(index+1));pair.querySelectorAll('[data-pair-index]').forEach(dot=>dot.addEventListener('click',()=>showPair(Number(dot.dataset.pairIndex))));pair.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();showPair(index+(e.key==='ArrowRight'?1:-1));}});let touch;images.addEventListener('touchstart',e=>{touch={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});images.addEventListener('touchend',e=>{if(!touch)return;const dx=e.changedTouches[0].clientX-touch.x,dy=e.changedTouches[0].clientY-touch.y;if(Math.abs(dx)>45&&Math.abs(dx)>Math.abs(dy))showPair(index+(dx<0?1:-1));touch=null;},{passive:true});}

// 기존 효과가 없는 콘텐츠만 스크롤 등장 효과 연결
import './scroll-content-reveal.js?v=20261014-ai-inplace-4';

import './cover-workspace.js?v=20261013-content-gallery-6';

import './visual-cover-board.js?v=20261013-visual-board-1';

import './content-cover-gallery.js?v=20261013-content-centered-4';
