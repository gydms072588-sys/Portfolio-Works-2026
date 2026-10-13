import {visualWorks,visibleVisualFiles} from './visual-gallery-data.js?v=20261013-visual-final-3';
import {openWindow} from './visual-window-manager.js?v=20261013-visual-final-3';
import './works-category-settings.js?v=20261013-motion-hidden-1';
import './visual-dock.js?v=20261013-visual-final-3';
const desktop=document.querySelector('.vg-desktop');
const create=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
function preview(work,source,index){const content=create('div'),title=work.title||work.fileLabel;for(const value of [work.type,work.description])if(value)content.append(create('p','',value));const images=work.detailImages?.length?work.detailImages:work.image?[work.image]:[];for(const src of images){const img=create('img');img.src=src;img.alt=title;content.append(img);}if(!images.length)content.append(create('div','vg-empty-preview','이미지 미등록'));openWindow(work.id,title,content,source);}
const displayWorks=visibleVisualFiles.map(file=>({...visualWorks.find(w=>w.id===file.id),fileKind:file.kind,fileLabel:file.label}));
let iconZ=1;
displayWorks.forEach((work,index)=>{const item=create('article','vg-work');item.dataset.workId=work.id;item.dataset.fileKind=work.fileKind;const button=create('button','vg-file');button.type='button';const thumb=create('span','vg-thumb');if(work.image){const img=create('img');img.src=work.image;img.alt='';img.draggable=false;thumb.append(img);}else{const file=create('span','vg-empty-file');file.dataset.number=String(index+1).padStart(2,'0');thumb.append(file);}button.append(thumb,create('span','vg-file-name',work.title||work.fileLabel));button.append(create('span','vg-file-type',work.fileKind==='video'?'영상':'디자인'));button.setAttribute('aria-label',(work.title||`슬롯 ${index+1}`)+' 작품 보기');item.append(button);desktop.append(item);
 let drag=null,suppress=false;
 button.addEventListener('pointerdown',e=>{if(e.pointerType!=='mouse'||e.button!==0)return;suppress=false;drag={x:e.clientX,y:e.clientY,left:item.offsetLeft,top:item.offsetTop,moved:false};});
 button.addEventListener('pointermove',e=>{if(!drag)return;const dx=e.clientX-drag.x,dy=e.clientY-drag.y;if(Math.hypot(dx,dy)<5&&!drag.moved)return;drag.moved=true;button.setPointerCapture(e.pointerId);item.classList.add('is-dragging');item.style.zIndex=++iconZ;item.style.left=Math.max(0,Math.min(desktop.clientWidth-item.offsetWidth,drag.left+dx))+'px';item.style.top=Math.max(0,Math.min(desktop.clientHeight-item.offsetHeight,drag.top+dy))+'px';});
 const release=()=>{if(drag)suppress=drag.moved;drag=null;item.classList.remove('is-dragging');};button.addEventListener('pointerup',release);button.addEventListener('pointercancel',release);button.addEventListener('pointerleave',()=>{if(drag&&!drag.moved)drag=null;});
 button.addEventListener('click',e=>{if(suppress)return;desktop.querySelectorAll('.is-selected').forEach(n=>n.classList.remove('is-selected'));item.classList.add('is-selected');if(e.pointerType==='touch'||e.pointerType==='pen'||e.detail===0)preview(work,button,index);});button.addEventListener('dblclick',()=>{if(!suppress)preview(work,button,index);});
});
function layout(){const mobile=innerWidth<=700,cols=mobile?3:5,cell=desktop.clientWidth/cols,rowHeight=mobile?200:210,height=Math.max(mobile?420:240,innerHeight-236),rows=mobile?2:1;desktop.style.height=height+'px';[...desktop.children].forEach((el,i)=>{const row=mobile?Math.floor(i/3):0,last=mobile&&row===1;el.style.left=((last?(i-3+.5):i%cols)*cell+(cell-el.offsetWidth)/2)+'px';el.style.top=(Math.max(0,(height-rows*rowHeight)/2)+row*rowHeight)+'px';el.style.zIndex='';});}
layout();addEventListener('resize',layout);
for(const link of document.querySelectorAll('.category-nav a'))link.hidden=!globalThis.PortfolioWorksSettings.motionVideoEnabled&&link.getAttribute('href').endsWith('motion-video.html');
document.querySelector('.works-top').addEventListener('click',()=>location.assign('./search-entry.html#main'));
await import('./home-visibility.js?v=20261012-home-zone-1');
