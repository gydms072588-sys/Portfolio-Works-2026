import {visualWorks,visibleVisualFiles,visualToolAssets} from './visual-gallery-data.js?v=20261014-guide-6';
import {openWindow} from './visual-window-manager.js?v=20261014-guide-6';
import './works-category-settings.js?v=20261013-motion-hidden-1';
import './visual-dock.js?v=20261014-guide-6';
const desktop=document.querySelector('.vg-desktop');
const create=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;};
function preview(work,source,index,guideOwned=false){
 const content=create('div','vg-artwork'),title=work.title||work.fileLabel;
 if(work.sourceId==='editorial-business-card')content.classList.add('vg-artwork-business-card');
 content.append(create('h3','vg-artwork-title',title));
 if(work.type)content.append(create('p','vg-artwork-type',work.type));
 if(work.tools?.length){const block=create('div','vg-artwork-tools');block.append(create('span','vg-artwork-tools-label','사용 도구'));for(const tool of work.tools){const item=create('span','vg-artwork-tool');if(visualToolAssets[tool]){const icon=create('img');icon.src=visualToolAssets[tool];icon.alt='';item.append(icon);}item.append(create('span','',tool));block.append(item);}content.append(block);}
 if(work.description)content.append(create('p','vg-artwork-description',work.description));
 if(work.result)content.append(create('p','vg-artwork-result',work.result));
 const images=work.detailImages?.length?work.detailImages:work.image?[work.image]:[];
 const imageGroup=create('div','vg-artwork-images');content.append(imageGroup);
 for(const entry of images){const src=typeof entry==='string'?entry:entry.src,label=typeof entry==='string'?title:entry.label;const figure=create('figure','vg-artwork-figure');figure.append(create('figcaption','',label));const link=create('a');link.href=src;link.addEventListener('click',e=>{e.preventDefault();showImage(src,label,link);});link.setAttribute('aria-label',label+' 원본 보기');const img=create('img');img.src=src;img.alt=label;link.append(img);figure.append(link);imageGroup.append(figure);}
 if(!images.length)content.append(create('div','vg-empty-preview','이미지 미등록'));
 const win=openWindow(work.id,title,content,source,{artwork:true,width:1000,height:innerHeight*.8});win.classList.add('vg-artwork-window');if(guideOwned)win.dataset.guideOwned='true';else{delete win.dataset.guideOwned;trackMobileViewer(work.id,win);}
}

const displayWorks=visibleVisualFiles.map(file=>({...visualWorks.find(w=>w.id===file.id),fileKind:file.kind,fileLabel:file.label}));
export function openVisualWork(id,guideOwned=false){const work=displayWorks.find(w=>w.id===id);if(work)preview(work,desktop.querySelector(`[data-work-id="${id}"] .vg-file`),0,guideOwned);return document.querySelector(`[data-window-key="${id}"]`);}

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

// Reuse a native image dialog with scrolling. Mobile back closes the top layer.
const imageDialog=document.querySelector('.vg-image-viewer'),zoomImage=imageDialog.querySelector('img');let imageSource,historyClosing=false;
function trackMobileViewer(id,win){if(innerWidth>700)return;if(!history.state?.visualViewer)history.pushState({...history.state,visualViewer:id},'');else history.replaceState({...history.state,visualViewer:id},'');if(!win.dataset.historyBound){win.dataset.historyBound='true';win.addEventListener('windowclosed',()=>{if(!historyClosing&&history.state?.visualViewer===id)history.back();});}}
function showImage(src,label,source){imageSource=source;zoomImage.src=src;zoomImage.alt=label;imageDialog.showModal();imageDialog.querySelector('button').focus();if(innerWidth<=700)history.pushState({...history.state,visualZoom:true},'');}
imageDialog.querySelector('button').addEventListener('click',()=>imageDialog.close());imageDialog.addEventListener('click',e=>{if(e.target===imageDialog)imageDialog.close();});imageDialog.addEventListener('close',()=>{imageSource?.focus({preventScroll:true});if(!historyClosing&&history.state?.visualZoom)history.back();});
addEventListener('popstate',()=>{historyClosing=true;if(imageDialog.open&&!history.state?.visualZoom)imageDialog.close();if(!history.state?.visualViewer)document.querySelectorAll('.vg-artwork-window:not([data-guide-owned]) .vg-window-close').forEach(b=>b.click());historyClosing=false;});
const {mountVisualGuide}=await import('./visual-guide.js?v=20261014-guide-6');mountVisualGuide(openVisualWork);
