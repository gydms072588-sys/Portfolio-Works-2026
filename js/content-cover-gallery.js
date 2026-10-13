// Content Cover만 순환 갤러리를 구성합니다. 이미지 목록은 HTML의 원본 그룹에서 수정합니다.
const cover=document.querySelector('.uxui-cover[data-content-gallery]');
if(cover){
 const track=cover.querySelector('.content-gallery-track'),group=track.querySelector('.content-gallery-group');
 // 동일한 두 그룹이 정확히 이어져 -50% 이동 시 첫 프레임과 일치합니다.
 const duplicate=group.cloneNode(true);duplicate.dataset.galleryDuplicate='';track.append(duplicate);
 const title=cover.querySelector('.uxui-cover-title');
 function alignGallery(){const r=title.getBoundingClientRect(),c=cover.getBoundingClientRect();cover.style.setProperty('--content-gallery-center',(r.top-c.top+r.height/2)+'px');}
 const alignment=new ResizeObserver(alignGallery);alignment.observe(cover);alignment.observe(title);document.fonts.ready.then(alignGallery);alignGallery();
 const lines=[...cover.querySelectorAll('.uxui-cover-line')],motion=matchMedia('(prefers-reduced-motion:reduce)');let finished=false;
 function finish(){finished=true;for(const line of lines)line.style.removeProperty('clip-path');cover.removeAttribute('data-workspace-pending');cover.classList.remove('workspace-running');cover.classList.add('workspace-complete','gallery-ready');}
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function typing(){for(const line of lines){const walker=document.createTreeWalker(line,NodeFilter.SHOW_TEXT);let node;const texts=[];while(node=walker.nextNode())if(node.textContent.trim())texts.push(node);const bounds=line.getBoundingClientRect();for(const text of texts)for(let i=1;i<=text.length;i++){if(finished)return;const range=document.createRange();range.setStart(text,0);range.setEnd(text,i);line.style.clipPath='inset(0 '+Math.max(0,bounds.right-range.getBoundingClientRect().right)+'px 0 0)';await pause(innerWidth<768?45:55);}if(finished)return;line.style.clipPath='inset(0 0 0 0)';await pause(100);}}
 if(motion.matches)finish();else{cover.classList.add('workspace-running');for(const line of lines)line.style.clipPath='inset(0 100% 0 0)';document.fonts.ready.then(async()=>{if(finished)return;cover.classList.add('gallery-ready');await pause(450);await typing();if(!finished){await pause(250);finish();}});}
 // 화면 밖에서는 GPU 이동을 멈추고 다시 Cover에 진입하면 그대로 재개합니다.
 let onScreen=true;
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{onScreen=e.isIntersecting;track.style.animationPlayState=e.isIntersecting?'':'paused';}),{threshold:0});observer.observe(cover);
 addEventListener('resize',finish,{passive:true});motion.addEventListener('change',e=>{if(e.matches)finish();});

}
