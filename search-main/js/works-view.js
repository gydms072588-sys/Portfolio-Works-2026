/* Works is a view of Search Main, using its single existing search element. */
(() => {
 const main=document.getElementById('searchMain');
 const scene=main.querySelector('.search-main');
 const content=main.querySelector('.search-main__content');
 const home=main.querySelector('.search-main__index');
 const search=main.querySelector('.hero-search');
 const view=main.querySelector('.works-view');
 const slot=view.querySelector('.works-search-slot');
 const grid=view.querySelector('.works-category-grid');
 const returnButton=search.querySelector('.search-submit');
 const tooltip=document.createElement('span');tooltip.className='works-return-tooltip';tooltip.id='works-return-tooltip';tooltip.setAttribute('role','tooltip');tooltip.textContent='메인으로 돌아가기';search.append(tooltip);
 const originalLabel=returnButton.getAttribute('aria-label');
 function buttonMode(works){
  returnButton.setAttribute('aria-label',works?'메인으로 돌아가기':originalLabel);
  if(works){returnButton.removeAttribute('aria-disabled');returnButton.setAttribute('aria-describedby',tooltip.id);}
  else {returnButton.setAttribute('aria-disabled','true');returnButton.removeAttribute('aria-describedby');}
 }
 const motion=matchMedia('(prefers-reduced-motion: reduce)');
 const localWorks=globalThis.PortfolioWorksBase||new URL('./',location.href).href;
 const categories=[
  {id:'ux-ui',label:'UX/UI',visual:'ux',url:localWorks?localWorks+'uxui.html':null},
  {id:'design',label:'Design',visual:'design',url:localWorks?localWorks+'content-design.html':null},
  {id:'video-editing',label:'Video Editing',visual:'video',url:localWorks?localWorks+'motion-video.html':null},
  {id:'indesign',label:'InDesign',visual:'indesign',url:'https://gydms072588-sys.github.io/Portfolio-Gallery_2026/index.html'},
 ];
 // 원본 데이터는 보존하고 설정에 따라 표시할 카테고리만 선택합니다.
 const settings=globalThis.PortfolioWorksSettings;
 const categoryOrder=['design','ux-ui','indesign','video-editing'];
 const visibleCategories=categories.filter(c=>settings.motionVideoEnabled||c.id!=='video-editing').sort((a,b)=>categoryOrder.indexOf(a.id)-categoryOrder.indexOf(b.id));
 grid.dataset.visibleCount=String(visibleCategories.length);
 grid.style.setProperty('--visible-categories',String(visibleCategories.length));
 for(const category of visibleCategories){
  const button=document.createElement('button');button.type='button';button.className='works-category opening-card opening-card--'+category.visual;button.dataset.categoryId=category.id;button.setAttribute('aria-pressed','false');
  const visual=document.createElement('span');visual.className='opening-card__visual';visual.setAttribute('aria-hidden','true');
  const covers={'design':'content-design','ux-ui':'uxui','indesign':'visual-design'};if(covers[category.id]){const cover=document.createElement('img');cover.className='works-category-cover';cover.src='./assets/images/opening-covers/'+covers[category.id]+'-opening.png';cover.alt='';visual.append(cover);}
  const label=document.createElement('span');label.className='opening-card__label';label.textContent=({'design':'Content Design','ux-ui':'UX/UI','indesign':'Visual Design'})[category.id]||category.label;button.append(visual,label);
  button.addEventListener('click',()=>{if(grid.inert)return;if(category.url){const link=document.createElement('a');link.href=category.url;link.target='_blank';link.rel='noopener noreferrer';link.click();}grid.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));main.dispatchEvent(new CustomEvent('portfolio-works-category-select',{bubbles:true,detail:{categoryId:category.id,url:category.url}}));});grid.append(button);
 }
 let desired=false,active=false,revision=0,animation=null,cardAnimations=[];
 function clearCards(){cardAnimations.forEach(a=>a.cancel());cardAnimations=[];grid.classList.remove("is-spreading");grid.inert=false;grid.querySelectorAll("button").forEach(b=>b.style.removeProperty("transform"));}
 const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function enter(token){
  if(main.dataset.motion!=='complete'){
   await new Promise(resolve=>{const observer=new MutationObserver(()=>{if(main.dataset.motion==='complete'){observer.disconnect();resolve();}});observer.observe(main,{attributes:true,attributeFilter:['data-motion']});});
  }
  if(token!==revision||!desired||main.hidden)return;
  scene.classList.add('is-works-leaving');
  if(!motion.matches)await wait(220);
  if(token!==revision||!desired||main.hidden)return;
  const before=search.getBoundingClientRect();
  slot.append(search);content.hidden=true;view.hidden=false;scene.classList.add('is-works');active=true;
  const after=search.getBoundingClientRect();
  if(!motion.matches){
   animation=search.animate([{transform:'translate('+ (before.left+before.width/2-after.left-after.width/2)+'px,'+(before.top-after.top)+'px)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.22,.8,.25,1)'});
   try{await animation.finished;}catch{return;}
  }
  if(token!==revision||!desired||main.hidden)return;
  const buttons=[...grid.querySelectorAll('button')];
  grid.inert=true;grid.classList.add('is-spreading');
  const bounds=buttons.map(button=>button.getBoundingClientRect());
  const columns=getComputedStyle(grid).gridTemplateColumns.split(' ').filter(Boolean).length;
  const duration=columns>=3?1400:800;
  const centerX=(Math.min(...bounds.map(r=>r.left))+Math.max(...bounds.map(r=>r.right)))/2;
  const centerY=(Math.min(...bounds.map(r=>r.top))+Math.max(...bounds.map(r=>r.bottom)))/2;
  buttons.forEach(button=>button.classList.add('is-visible'));
  if(!motion.matches){
   const commonStart=document.timeline.currentTime;
   cardAnimations=buttons.map((button,index)=>{
    const rect=bounds[index];const dx=centerX-(rect.left+rect.width/2),dy=centerY-(rect.top+rect.height/2);
    const effect=button.animate([{transform:'translate('+dx+'px,'+dy+'px)',opacity:1},{transform:'translate(0,0)',opacity:1}],{duration,delay:0,easing:'cubic-bezier(.22,1,.36,1)',fill:'both'});
    effect.startTime=commonStart;return effect;
   });
   try{await Promise.all(cardAnimations.map(a=>a.finished));}catch{return;}
  }
  if(token!==revision||!desired||main.hidden)return;
  clearCards();
  view.querySelector('h2').focus({preventScroll:true});
 }
 async function leave(token,animate){
  grid.querySelectorAll('button').forEach(b=>b.classList.remove('is-visible'));
  if(active&&animate&&!motion.matches&&!main.hidden)await wait(220);
  if(token!==revision||desired)return;
  const before=search.getBoundingClientRect();
  home.insertBefore(search,home.firstChild);content.hidden=false;view.hidden=true;scene.classList.remove('is-works');buttonMode(false);active=false;
  const after=search.getBoundingClientRect();
  if(animate&&!motion.matches&&!main.hidden){
   animation=search.animate([{transform:'translate('+(before.left-after.left)+'px,'+(before.top-after.top)+'px)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.22,.8,.25,1)'});
   try{await animation.finished;}catch{return;}
  }
  if(token!==revision||desired)return;
  scene.classList.remove('is-works-leaving');
  buttonMode(false);
 }
 globalThis.PortfolioWorks={
  categories,
  show(enabled,animate=true){
   if(enabled===desired&&(active||!enabled))return;
   desired=enabled;const token=++revision;
   clearCards();
   if(animation){animation.cancel();animation=null;}
   if(!enabled){leave(token,animate);return;}
   buttonMode(true);
   enter(token);
  },
 };
 returnButton.addEventListener('click',()=>{if(desired)location.hash='main';});
 addEventListener('resize',()=>{if(cardAnimations.length){clearCards();if(desired&&active){grid.querySelectorAll('button').forEach(b=>b.classList.add('is-visible'));}}});
 motion.addEventListener('change',()=>{if(motion.matches&&cardAnimations.length)clearCards();});
 main.querySelector('[data-destination="works"]').addEventListener('click',()=>{location.hash='works';});
 document.addEventListener('keydown',event=>{if(event.key==='Escape'&&desired&&!main.hidden&&document.querySelector('.ai-helper').dataset.state!=='menu-open'){location.hash='main';}});
})();
