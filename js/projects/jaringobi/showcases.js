// 자린고비 전용 임시 ABLY 콘텐츠 데이터. 이 파일 수정은 ABLY 모듈에 영향을 주지 않습니다.
// ABLY 독립 쇼케이스: 공통 이미지 뷰어와 기본 video controls만 사용합니다.
const sections=[...document.querySelectorAll('.ably-art-showcase')];
if(sections.length){
 const viewer=document.querySelector('.media-viewer'),image=viewer.querySelector('img');
 for(const button of document.querySelectorAll('.ably-art-preview'))button.addEventListener('click',()=>{image.src=button.dataset.showcaseFull;image.alt=button.querySelector('img').alt;viewer.classList.add('ably-showcase-viewer');viewer.showModal();viewer.scrollTop=0;});
 viewer.addEventListener('close',()=>viewer.classList.remove('ably-showcase-viewer'));
 for(const video of document.querySelectorAll('.ably-art-showcase video')){
  const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)video.pause();},{threshold:0});observer.observe(video);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});addEventListener('pagehide',()=>video.pause());
 }
}
