// 자린고비 상단: 안내를 먼저 보여주고 다음 위쪽 제스처에서 이전 Cover로 이동.
(()=>{let readyAt=performance.now()+700,leaving=false,amount=0,touchY=null,shown=false,shownAt=0,lastWheel=0;
const notice=document.createElement('div');notice.className='jaringobi-previous-notice';notice.setAttribute('role','status');notice.textContent='↑ 이전 프로젝트 보기';notice.hidden=true;document.body.append(notice);
const reset=()=>{leaving=false;amount=0;shown=false;notice.hidden=true;readyAt=performance.now()+700;};addEventListener('pageshow',reset);
const eligible=target=>scrollY<=2&&performance.now()>readyAt&&!leaving&&!document.querySelector('dialog[open]')&&!target?.closest('input,textarea,select,.jaringobi-screen-flow');
const show=()=>{shown=true;shownAt=performance.now();amount=0;notice.hidden=false;};
const go=()=>{leaving=true;location.assign('./content-design.html#top');};
addEventListener('scroll',()=>{if(scrollY>20){shown=false;amount=0;notice.hidden=true;}},{passive:true});
addEventListener('wheel',e=>{const now=performance.now(),gap=now-lastWheel;lastWheel=now;if(e.deltaY>=0||!eligible(e.target)){amount=0;return;}if(e.defaultPrevented)return;if(!shown){show();return;}if(now-shownAt<700)return;if(gap>220)amount=0;amount+=Math.abs(e.deltaY);if(amount>=100)go();},{passive:true});
addEventListener('touchstart',e=>{touchY=e.touches.length===1?e.touches[0].clientY:null;},{passive:true});
addEventListener('touchmove',e=>{if(touchY===null||!eligible(e.target))return;if(e.touches[0].clientY-touchY>80){touchY=null;if(!shown)show();else if(performance.now()-shownAt>=700)go();}},{passive:true});
addEventListener('keydown',e=>{if(eligible(e.target)&&['ArrowUp','PageUp'].includes(e.key)&&!e.defaultPrevented&&!e.repeat){if(!shown)show();else if(performance.now()-shownAt>=700)go();}});
})();
