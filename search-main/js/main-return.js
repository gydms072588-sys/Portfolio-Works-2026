/* Shared return transaction. Targets are measured only after restoring Main flow. */
(() => {
 const main=document.getElementById('searchMain'),scene=main.querySelector('.search-main'),search=main.querySelector('.hero-search');
 let revision=0,animations=[];
 function cancel(){revision++;animations.forEach(a=>a.cancel());animations=[];scene.classList.remove('is-main-returning');}
 globalThis.PortfolioReturn={cancel,async run(source,content,prepare){
  cancel();const token=revision;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const from=source.getBoundingClientRect();
  if(!reduced&&content){const fade=content.animate([{opacity:1},{opacity:0}],{duration:200,easing:'ease',fill:'forwards'});animations.push(fade);try{await fade.finished;}catch{return false;}}
  if(token!==revision)return false;
  scene.classList.add('is-main-returning');prepare();
  await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
  if(token!==revision)return false;
  scrollTo({top:0,left:0,behavior:'instant'});
  const target=search.getBoundingClientRect();
  if(!reduced){
   const movement=search.animate([{transform:'translate('+(from.left+from.width/2-target.left-target.width/2)+'px,'+(from.top+from.height/2-target.top-target.height/2)+'px)'},{transform:'none'}],{duration:560,easing:'cubic-bezier(.22,.8,.25,1)'});animations.push(movement);try{await movement.finished;}catch{return false;}
  }
  if(token!==revision)return false;
  animations.forEach(a=>a.cancel());animations=[];search.style.removeProperty('transform');
  scene.classList.remove('is-main-returning');
  return true;
 }};
})();
