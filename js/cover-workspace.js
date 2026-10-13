// 전체 Cover 제목을 하나의 오브젝트로 선택한 뒤 가상 UI를 제거합니다.
const cover=document.querySelector('.uxui-cover');
if(cover&&!cover.hasAttribute('data-visual-board')&&!cover.hasAttribute('data-content-gallery')){
 const motion=matchMedia('(prefers-reduced-motion:reduce)');
 let completed=false;const animations=[];let box,cursor;
 const lines=[...cover.querySelectorAll('.uxui-cover-line')];
 function finish(){if(completed)return;completed=true;for(const animation of animations)animation.cancel();box?.remove();cursor?.remove();for(const line of lines)line.style.removeProperty('clip-path');cover.removeAttribute('data-workspace-pending');cover.classList.remove('workspace-running');cover.classList.add('workspace-complete');removeEventListener('resize',finish);}
 if(motion.matches)finish();else{
  cover.classList.add('workspace-running');for(const line of lines)line.style.clipPath='inset(0 100% 0 0)';addEventListener('resize',finish,{once:true});motion.addEventListener('change',e=>{if(e.matches)finish();});
  async function animate(node,keyframes,options){const animation=node.animate(keyframes,{fill:'forwards',easing:'ease-in-out',...options});animations.push(animation);await animation.finished;}
  const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
  async function typeTitle(){
   for(const line of lines){
    const walker=document.createTreeWalker(line,NodeFilter.SHOW_TEXT);const textNodes=[];let node;
    while(node=walker.nextNode())if(node.textContent.trim())textNodes.push(node);
    const bounds=line.getBoundingClientRect();
    for(const text of textNodes){
     for(let offset=1;offset<=text.textContent.length;offset++){
      if(completed)return;
      const range=document.createRange();range.setStart(text,0);range.setEnd(text,offset);
      const right=range.getBoundingClientRect().right;
      line.style.clipPath='inset(0 '+Math.max(0,bounds.right-right)+'px 0 0)';
      await pause(innerWidth<768?45:55);
     }
    }
    line.style.clipPath='inset(0 0 0 0)';await pause(120);
   }
  }
  document.fonts.ready.then(async()=>{if(completed)return;
   const titleNode=cover.querySelector('.uxui-cover-title'),frame=cover.getBoundingClientRect(),title=titleNode.getBoundingClientRect();
   const pad=innerWidth<768?6:12;
   const start={x:Math.max(4,title.left-frame.left-pad),y:title.top-frame.top-pad};
   const end={x:Math.min(frame.width-4,title.right-frame.left+pad),y:title.bottom-frame.top+pad};
   cursor=document.createElement('span');cursor.className='uxui-cover-cursor workspace-cursor';cursor.setAttribute('aria-hidden','true');Object.assign(cursor.style,{left:start.x+'px',top:start.y+'px',opacity:'0'});cover.append(cursor);
   box=document.createElement('div');box.className='workspace-marquee';box.setAttribute('aria-hidden','true');Object.assign(box.style,{left:start.x+'px',top:start.y+'px',width:'0px',height:'0px',opacity:'0'});cover.append(box);
   try{
    await typeTitle();if(completed)return;
    await animate(cursor,[{opacity:0,transform:'translate(40px,-20px)'},{opacity:1,transform:'translate(0,0)'}],{duration:450});
    await Promise.all([animate(box,[{opacity:1,width:'0px',height:'0px'},{opacity:1,width:(end.x-start.x)+'px',height:(end.y-start.y)+'px'}],{duration:1050,delay:150}),animate(cursor,[{transform:'translate(0,0)'},{transform:'translate('+(end.x-start.x)+'px,'+(end.y-start.y)+'px)'}],{duration:1050,delay:150})]);
    await animate(box,[{opacity:1},{opacity:1}],{duration:400});
    await Promise.all([animate(box,[{opacity:1},{opacity:0}],{duration:350}),animate(cursor,[{opacity:1},{opacity:0}],{duration:350})]);
   }catch{}finally{finish();}
  });
 }
}
