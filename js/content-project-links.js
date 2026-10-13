// ABLY ↔ 자린고비. 새 라우터 없이 기존 버튼과 네이티브 페이지 이동을 사용합니다.
const isJaringobi=document.body.dataset.project==='jaringobi';
const next=document.querySelector('.project-category-arrow-next'),prev=document.querySelector('.project-category-arrow-prev');
if(!isJaringobi&&next)next.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();location.assign('./jaringobi.html');},true);
if(isJaringobi&&prev){const enable=()=>{if(prev.disabled)prev.disabled=false;};enable();new MutationObserver(enable).observe(prev,{attributes:true,attributeFilter:['disabled']});prev.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();location.assign('./content-design.html');},true);}
if(isJaringobi&&next){next.hidden=true;next.style.display='none';}
