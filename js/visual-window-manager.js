// Visual Design 전용 비모달 창 관리자. 작품 데이터 및 다른 Works에는 접근하지 않습니다.
const host=document.querySelector('.vg-windows');
const windows=new Map();let front=100;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
export function availableArea(){const dock=document.querySelector('.vg-dock'),top=126,bottom=dock.getBoundingClientRect().top-14;return{x:12,y:top,w:innerWidth-24,h:Math.max(120,bottom-top)};}
function fit(r){const a=availableArea(),w=Math.min(r.w,a.w),h=Math.min(r.h,a.h);return{x:clamp(r.x,a.x,a.x+a.w-w),y:clamp(r.y,a.y,a.y+a.h-h),w,h};}
function draw(win,r){win.rect=r;Object.assign(win.el.style,{left:r.x+'px',top:r.y+'px',width:r.w+'px',height:r.h+'px'});}
function activate(win){for(const w of windows.values())w.el.classList.toggle('is-active',w===win);win.el.style.zIndex=++front;}
function close(win){windows.delete(win.key);win.el.dispatchEvent(new Event("windowclosed"));win.el.remove();document.querySelector(`[data-dock-key="${win.key}"]`)?.classList.remove('is-open');const remaining=[...windows.values()].sort((a,b)=>Number(b.el.style.zIndex)-Number(a.el.style.zIndex));if(remaining[0]){activate(remaining[0]);remaining[0].el.focus({preventScroll:true});}else win.source?.focus({preventScroll:true});}
export function openWindow(key,title,content,source){if(windows.has(key)){const w=windows.get(key);activate(w);w.el.focus({preventScroll:true});return w.el;}
 const el=document.createElement('section');el.className='vg-window';el.setAttribute('role','dialog');el.setAttribute('aria-label',title);el.tabIndex=-1;
 const bar=document.createElement('div');bar.className='vg-window-bar';const name=document.createElement('h2');name.className='vg-window-title';name.textContent=title;
 const max=document.createElement('button');max.type='button';max.className='vg-window-control vg-window-max';max.textContent='□';max.setAttribute('aria-label','창 최대화');max.setAttribute('aria-pressed','false');
 const exit=document.createElement('button');exit.type='button';exit.className='vg-window-control vg-window-close';exit.textContent='×';exit.setAttribute('aria-label','창 닫기');bar.append(name,max,exit);
 const body=document.createElement('div');body.className='vg-window-content';body.append(content);el.append(bar,body);host.append(el);
 const a=availableArea(),offset=(windows.size%5)*22,w=Math.min(600,a.w),h=Math.min(460,a.h);const win={key,el,source,maximized:false,rect:null,restore:null};windows.set(key,win);draw(win,fit({x:a.x+(a.w-w)/2+offset,y:a.y+(a.h-h)/2+offset,w,h}));activate(win);el.focus({preventScroll:true});document.querySelector(`[data-dock-key="${key}"]`)?.classList.add('is-open');
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches)el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:180,easing:'ease-out'});
 el.addEventListener('pointerdown',()=>activate(win));el.addEventListener('focusin',()=>{if(!el.classList.contains('is-active'))activate(win);});
 exit.addEventListener('click',()=>close(win));max.addEventListener('click',()=>{if(win.maximized){draw(win,fit(win.restore));}else{win.restore={...win.rect};draw(win,availableArea());}win.maximized=!win.maximized;max.textContent=win.maximized?'❐':'□';max.setAttribute('aria-label',win.maximized?'창 복원':'창 최대화');max.setAttribute('aria-pressed',String(win.maximized));});
 let drag;bar.addEventListener('pointerdown',e=>{if(e.target.closest('button')||e.button!==0||win.maximized)return;drag={x:e.clientX,y:e.clientY,rect:{...win.rect}};bar.setPointerCapture(e.pointerId);});bar.addEventListener('pointermove',e=>{if(!drag)return;draw(win,fit({...drag.rect,x:drag.rect.x+e.clientX-drag.x,y:drag.rect.y+e.clientY-drag.y}));});const end=()=>{drag=null;};bar.addEventListener('pointerup',end);bar.addEventListener('pointercancel',end);el.addEventListener('keydown',e=>{if(e.key==='Escape'){e.stopPropagation();close(win);}});return el;
}
addEventListener('resize',()=>{for(const w of windows.values())draw(w,w.maximized?availableArea():fit(w.rect));});

export function closeWindow(key){const win=windows.get(key);if(win)close(win);}
