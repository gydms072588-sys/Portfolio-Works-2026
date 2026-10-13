// 기존 버튼과 네이티브 HTML 페이지 이동만 사용합니다.
const isYene=location.pathname.endsWith('/yene.html');
const next=document.querySelector('.project-category-arrow-next'),prev=document.querySelector('.project-category-arrow-prev');
// YENE temporarily excluded from navigation; source page remains intact.
if(!isYene&&next){next.hidden=true;next.style.display='none';}
if(isYene){if(prev){prev.disabled=false;prev.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();location.assign('./uxui.html');},true);}if(next)next.hidden=true;}

if(isYene&&prev){new MutationObserver(()=>{if(prev.disabled)prev.disabled=false;}).observe(prev,{attributes:true,attributeFilter:["disabled"]});}if(isYene&&next)next.style.display="none";
