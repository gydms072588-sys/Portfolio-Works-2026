/* Shared top-hover navigation; touch and keyboard remain usable. */
(() => {
 const search=document.querySelector('.hero-search');
 const fixed=[...document.querySelectorAll('.skills-return-wrapper')];
 const states=new Map();
 const hover=matchMedia('(hover: hover) and (pointer: fine)');
 let frame=0,nearTop=false,keyboard=false;
 function update(){
  frame=0;
  const works=Boolean(search?.closest('.works-search-slot'));
  const controls=works?[...fixed,search]:fixed;
  if(!works&&states.has(search)){search.classList.remove('return-scroll-control','is-at-top');search.inert=false;search.removeAttribute('aria-hidden');search.querySelector('button').classList.remove('return-scroll-bounce');states.delete(search);}
  for(const control of controls){
   const page=control.closest('main');
   const visible=Boolean(page&&!page.hidden&&(!hover.matches||nearTop||keyboard||control.contains(document.activeElement)));
   // Keep enabled controls available to Tab even while visually hidden.
   control.inert=Boolean(!page||page.hidden);
   control.removeAttribute('aria-hidden');
   if(states.get(control)===visible)continue;
   states.set(control,visible);control.classList.add('return-scroll-control');control.classList.toggle('is-at-top',visible);
   const button=control.querySelector('button');button.classList.remove('return-scroll-bounce');
   if(visible){void button.offsetWidth;button.classList.add('return-scroll-bounce');}
  }
 }
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
 addEventListener('pointermove',event=>{
  keyboard=false;
  const onControl=fixed.some(e=>e.contains(event.target))||(search?.closest('.works-search-slot')&&search.contains(event.target));
  const menu=document.querySelector('.uxui-cover .category-nav');const bottom=menu?menu.getBoundingClientRect().top-24:120;nearTop=event.clientY>=0&&event.clientY<=bottom||Boolean(onControl);
  schedule();
 },{passive:true});
 document.documentElement.addEventListener('pointerleave',()=>{nearTop=false;schedule();});
 addEventListener('keydown',event=>{if(event.key==='Tab'){keyboard=true;schedule();}});
 addEventListener('focusin',schedule);addEventListener('focusout',schedule);addEventListener('resize',schedule);hover.addEventListener('change',schedule);
 const observer=new MutationObserver(schedule);observer.observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','class'],childList:true});
 update();
})();
