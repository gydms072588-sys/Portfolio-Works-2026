// Independent documents preserve their existing players, IDs and Scroll Spy.
// A full transition region must be traversed downwards; wheel/touch events do not navigate.
const bridge=document.querySelector('[data-next-project]');
if(bridge){
 let lastY=scrollY,progress=0,leaving=false,frame=0;
 const reset=()=>{lastY=scrollY;progress=0;leaving=false;};
 addEventListener('pageshow',reset);
 const update=()=>{
  frame=0;const delta=scrollY-lastY;lastY=scrollY;
  const rect=bridge.getBoundingClientRect();
  if(delta<0)progress=0;
  if(delta>0&&rect.top<innerHeight&&rect.bottom>0)progress+=Math.min(delta,innerHeight*.075);
  if(!leaving&&delta>0&&progress+1>=innerHeight*.15&&rect.bottom<=innerHeight+2&&!document.querySelector('dialog[open]')){
   leaving=true;const destination=new URL(bridge.dataset.nextProject,location.href);destination.searchParams.set('entry','showcase');location.assign(destination.href);
  }
 };
 addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(update);},{passive:true});
 const preload=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){
  const link=document.createElement('link');link.rel='prefetch';link.href=bridge.dataset.nextProject;document.head.append(link);preload.disconnect();
 }},{rootMargin:'100% 0px'});preload.observe(bridge);
}

const copy=document.querySelector('.contact-copy-text');
if(copy)copy.addEventListener('click',async()=>{
 const value='gydms1413@naver.com';let ok=false;
 try{await navigator.clipboard.writeText(value);ok=true;}catch{const field=document.createElement('textarea');field.value=value;field.style.cssText='position:fixed;opacity:0';document.body.append(field);field.select();ok=document.execCommand('copy');field.remove();copy.focus();}
 const message=ok?'이메일을 복사했습니다.':'주소를 선택하여 복사해주세요.';copy.textContent=ok?'복사 완료':'복사';document.querySelector('.contact-copy-feedback').textContent=message;
});
