// ABLY 모바일 배너 전용. 기존 Works처럼 transform 기반으로 구현하고 새 라이브러리는 추가하지 않습니다.
const slider=document.querySelector('.ably-banner-slider');
if(slider){
 const stage=slider.closest('.ably-banner-mobile'),track=slider.querySelector('.ably-banner-track'),slides=[...track.children],button=slider.querySelector('button'),viewer=document.querySelector('.media-viewer'),reduced=matchMedia('(prefers-reduced-motion:reduce)'),hoverMedia=matchMedia('(hover:hover) and (pointer:fine)');
 const items=[{key:'mom',label:'엄마를 자랑하고 100만원 받아가세요!'},{key:'snack',label:'믿고 먹는 찐맛템 GET!'},{key:'brand',label:'브랜드 블프 OPEN 타임어택 최저가'}];
 const path=i=>'./assets/images/content-ably/banner-responsive/section3-'+items[i].key+'-mobile.png';
 let physical=1,current=0,timer,settleTimer,visible=false,hovered=false,busy=false,start=null,suppressClickUntil=0;
 const canAuto=()=>visible&&!hovered&&!document.hidden&&!viewer.open&&!reduced.matches;
 function stop(){clearTimeout(timer);timer=null;}
 function schedule(){stop();if(canAuto())timer=setTimeout(()=>move(1),3000);}
 function update(){current=(physical-1+3)%3;slider.dataset.bannerActive=String(current);button.setAttribute('aria-label','모바일 배너 '+String(current+1).padStart(2,'0')+' '+items[current].label+' 원본 확대 보기');slides.forEach((slide,i)=>slide.setAttribute('aria-hidden',String(i!==physical)));}
 function finish(){if(!busy)return;clearTimeout(settleTimer);if(physical===4||physical===0){physical=physical===4?1:3;track.style.transition='none';track.style.transform='translateX('+(-physical*100)+'%)';void track.offsetWidth;track.style.removeProperty('transition');}busy=false;update();schedule();}
 function move(direction){if(busy)return;stop();busy=true;physical+=direction;update();track.style.transform='translateX('+(-physical*100)+'%)';if(reduced.matches)finish();else settleTimer=setTimeout(finish,550);}
 track.addEventListener('transitionend',e=>{if(e.target===track&&e.propertyName==='transform')finish();});
 stage.addEventListener('mouseenter',()=>{if(hoverMedia.matches){hovered=true;stop();}});stage.addEventListener('mouseleave',()=>{hovered=false;schedule();});
 slider.addEventListener('touchstart',e=>{const t=e.touches[0];start={x:t.clientX,y:t.clientY};stop();},{passive:true});
 slider.addEventListener('touchend',e=>{if(!start)return;const t=e.changedTouches[0],dx=t.clientX-start.x,dy=t.clientY-start.y;start=null;if(Math.abs(dx)>35&&Math.abs(dx)>Math.abs(dy)){suppressClickUntil=performance.now()+600;move(dx<0?1:-1);}else schedule();},{passive:true});
 slider.addEventListener('touchcancel',()=>{start=null;schedule();},{passive:true});
 button.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();move(e.key==='ArrowRight'?1:-1);}});
 button.addEventListener('click',e=>{if(performance.now()<suppressClickUntil){e.preventDefault();return;}stop();const image=viewer.querySelector('img');image.src=path(current);image.alt=items[current].label;viewer.classList.add('ably-showcase-viewer');viewer.showModal();viewer.scrollTop=0;});
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();},{threshold:.2});observer.observe(slider);
 const modalObserver=new MutationObserver(schedule);modalObserver.observe(viewer,{attributes:true,attributeFilter:['open']});
 document.addEventListener('visibilitychange',schedule);reduced.addEventListener('change',()=>{finish();schedule();});addEventListener('pagehide',stop);
 update();
}
