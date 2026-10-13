// 기존 섹션 애니메이션과 슬라이드 이미지 전환에는 추가 효과를 적용하지 않습니다.
const motion=matchMedia('(prefers-reduced-motion: reduce)');
if(!motion.matches){
 const selectors='.key-screens .ks-heading,.key-screens .ks-row .ks-visual,.key-screens .ks-row .ks-copy,.hotels-pair-comparison .pair-header,.hotels-pair-comparison figcaption,.ba-comparison .ed-section-heading,.ba-comparison .ba-copy,.ably-ai-production .ai-production-header,.ably-ai-production .ai-production-info,.ably-ai-production .ai-production-player,.ably-ai-production .ai-production-storyboard:not(.ai-storyboard-inplace),.ably-art-showcase .showcase-heading,.ably-art-showcase [data-art-reveal]';
 const pending=new Set(document.querySelectorAll(selectors));
 const animations=new Set();
 function reveal(node,immediate=false){if(!pending.delete(node))return;observer.unobserve(node);node.classList.remove('scroll-content-pending');if(immediate)return;
  const delay=node.matches('.ks-copy')?120:0;
  const animation=node.animate([{opacity:0,transform:'translateY(20px)'},{opacity:1,transform:'translateY(0)'}],{duration:600,delay,easing:'ease-out',fill:'backwards'});
  animations.add(animation);animation.finished.then(()=>animations.delete(animation),()=>animations.delete(animation));
 }
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)reveal(entry.target);}),{threshold:0.01,rootMargin:'0px 0px -5% 0px'});
 for(const node of pending){node.classList.add('scroll-content-pending');observer.observe(node);}
 // 빠른 스크롤로 화면을 통째로 지나친 콘텐츠는 숨김 상태를 남기지 않습니다.
 let scheduled=false;
 function checkPassed(){scheduled=false;for(const node of pending)if(node.getBoundingClientRect().bottom<=0)reveal(node,true);if(!pending.size){observer.disconnect();removeEventListener('scroll',onScroll);}}
 function onScroll(){if(!scheduled){scheduled=true;requestAnimationFrame(checkPassed);}}
 addEventListener('scroll',onScroll,{passive:true});checkPassed();
 motion.addEventListener('change',event=>{if(event.matches){for(const node of [...pending])reveal(node,true);for(const animation of animations)animation.cancel();observer.disconnect();removeEventListener('scroll',onScroll);}});
}
