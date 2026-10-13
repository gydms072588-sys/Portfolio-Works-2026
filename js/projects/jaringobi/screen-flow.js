/* 04 only: continuous scroll, native touch/keyboard access and reduced-motion support. */
(()=>{const viewport=document.querySelector('.jaringobi-screen-flow');if(!viewport)return;const track=viewport.querySelector('.jaringobi-screen-track');const originals=[...track.children];for(const card of originals){const clone=card.cloneNode(true);clone.setAttribute('aria-hidden','true');track.append(clone);}const motion=matchMedia('(prefers-reduced-motion: reduce)');let visible=false,until=0,last=0,drag=null;
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;},{threshold:.05}).observe(viewport);

viewport.addEventListener('pointerdown',e=>{until=performance.now()+4000;if(e.pointerType==='mouse'){drag={x:e.clientX,scroll:viewport.scrollLeft};viewport.setPointerCapture(e.pointerId);e.preventDefault();}});
viewport.addEventListener('pointermove',e=>{if(drag)viewport.scrollLeft=drag.scroll+drag.x-e.clientX;});
const end=()=>{drag=null;until=performance.now()+3000;};viewport.addEventListener('pointerup',end);viewport.addEventListener('pointercancel',end);viewport.addEventListener('wheel',e=>{if(Math.abs(e.deltaX)>Math.abs(e.deltaY))until=performance.now()+1500;},{passive:true});viewport.addEventListener('keydown',()=>until=performance.now()+3000);
function tick(now){const dt=Math.min(now-last,50);last=now;const distance=track.children[originals.length].offsetLeft-track.children[0].offsetLeft;if(visible&&!document.hidden&&!drag&&!motion.matches&&now>until){viewport.scrollLeft+=dt*.08;if(viewport.scrollLeft>=distance)viewport.scrollLeft-=distance;}requestAnimationFrame(tick);}requestAnimationFrame(tick);
})();

