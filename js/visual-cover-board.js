// Visual Design Cover만 SVG 작업 가이드 → 타이핑 → Scroll 순서로 연출합니다.
const cover=document.querySelector('.uxui-cover[data-visual-board]');
if(cover){
 const lines=[...cover.querySelectorAll('.uxui-cover-line')],motion=matchMedia('(prefers-reduced-motion:reduce)');
 let finished=false,graphic;const animations=[];
 function buildBoard(){graphic?.remove();const c=cover.getBoundingClientRect(),t=cover.querySelector('h1').getBoundingClientRect();const w=c.width,h=c.height;
  const left=Math.max(60,t.left-c.left-36),right=Math.min(w-60,t.right-c.left+36),top=t.top-c.top-28,bottom=t.bottom-c.top+28;
  const shapeWidth=Math.max(36,Math.min(240,left-32)),shapeHeight=Math.min(200,h*.22),shapeTop=bottom-shapeHeight*.65;
  const circleSize=Math.max(36,Math.min(220,w-right-32));
  graphic=document.createElementNS('http://www.w3.org/2000/svg','svg');graphic.classList.add('visual-board-graphic');graphic.setAttribute('viewBox','0 0 '+w+' '+h);graphic.setAttribute('aria-hidden','true');
  graphic.innerHTML='<path class="board-guide" pathLength="1" d="M'+left+' 0V'+h+'M'+right+' 0V'+h+'M0 '+top+'H'+w+'M0 '+bottom+'H'+w+'"/>'+
   '<rect class="board-frame" pathLength="1" x="16" y="'+shapeTop+'" width="'+shapeWidth+'" height="'+shapeHeight+'"/>'+
   [0,1,2].map(i=>'<rect class="board-shape board-fill" pathLength="1" x="'+(16+i*shapeWidth/3)+'" y="'+shapeTop+'" width="'+shapeWidth/3+'" height="'+shapeHeight+'" rx="'+shapeWidth/6+'"/>').join('')+
   '<rect class="board-frame" pathLength="1" x="'+(right+16)+'" y="'+top+'" width="'+circleSize+'" height="'+circleSize+'"/>'+
   '<circle class="board-shape board-fill" pathLength="1" cx="'+(right+16+circleSize/2)+'" cy="'+(top+circleSize/2)+'" r="'+circleSize/2+'"/>';
  cover.prepend(graphic);return [...graphic.children];
 }
 function finish(){finished=true;for(const a of animations)a.cancel();for(const line of lines)line.style.removeProperty('clip-path');cover.classList.remove('workspace-running');cover.classList.add('workspace-complete');cover.removeAttribute('data-workspace-pending');if(graphic)for(const node of graphic.children){node.style.strokeDashoffset='0';node.style.removeProperty('opacity');}}
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function typing(){for(const line of lines){const walker=document.createTreeWalker(line,NodeFilter.SHOW_TEXT);let node;const nodes=[];while(node=walker.nextNode())if(node.textContent.trim())nodes.push(node);const rect=line.getBoundingClientRect();for(const text of nodes)for(let i=1;i<=text.length;i++){if(finished)return;const range=document.createRange();range.setStart(text,0);range.setEnd(text,i);line.style.clipPath='inset(0 '+Math.max(0,rect.right-range.getBoundingClientRect().right)+'px 0 0)';await pause(innerWidth<768?45:55);}if(finished)return;line.style.clipPath='inset(0 0 0 0)';await pause(100);}}
 if(!motion.matches){cover.classList.add('workspace-running');for(const line of lines)line.style.clipPath='inset(0 100% 0 0)';}else finish();
 document.fonts.ready.then(async()=>{const nodes=buildBoard();if(finished)return;try{const draws=nodes.map((node,i)=>{node.style.strokeDasharray='1';node.style.strokeDashoffset='1';const animation=node.animate([{strokeDashoffset:1,opacity:0},{strokeDashoffset:0,opacity:1}],{duration:800,delay:i===0?0:100,easing:'ease-out',fill:'forwards'});animations.push(animation);return animation.finished;});await Promise.all(draws);if(finished)return;await pause(100);await typing();if(finished)return;await pause(180);}catch{}finally{finish();}});
 let frame=0;addEventListener('resize',()=>{finish();if(!frame)frame=requestAnimationFrame(()=>{frame=0;buildBoard();});},{passive:true});motion.addEventListener('change',e=>{if(e.matches)finish();});
}
