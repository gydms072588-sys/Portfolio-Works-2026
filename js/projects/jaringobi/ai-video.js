// 자린고비 전용 임시 ABLY 콘텐츠 데이터. 이 파일 수정은 ABLY 모듈에 영향을 주지 않습니다.
// 원본 갤러리 projects.js에서 검증한 영상/스토리보드 매핑. 실제 프롬프트는 미등록.
const section=document.querySelector('.ably-ai-production');
if(section){
 const items=[
  {video:'./assets/projects/jaringobi-template/videos/ably-hero-01.mp4',poster:'./assets/projects/jaringobi-template/images/content-ably/ably-video-poster-01.png',storyboard:'./assets/projects/jaringobi-template/images/ably-hero-video-storyboard.png',concept:'일상 속 모바일 쇼핑 경험을 중심으로 제작한 라이프스타일 콘셉트',story:'탐색 → 선택 → 만족 → 브랜드 인지',label:'라이프스타일'},
  {video:'./assets/projects/jaringobi-template/videos/ably-hero-02.mp4',poster:'./assets/projects/jaringobi-template/images/content-ably/ably-video-poster-02.png',storyboard:'./assets/projects/jaringobi-template/images/ABLY_benefits_hero_storyboard_gray.png',concept:'선물 상자와 패션 아이템을 중심으로 제작한 프로모션 콘셉트',story:'오픈 → 확장 → 누적 → 혜택 인지',label:'프로모션'}
 ];
 const video=section.querySelector('video'),image=section.querySelector('.ai-storyboard-preview img'),preview=section.querySelector('.ai-storyboard-preview'),viewer=document.querySelector('.media-viewer'),buttons=[...section.querySelectorAll('[data-ai-video]')],reduced=matchMedia('(prefers-reduced-motion:reduce)');
 let selected=0,fade;
 const positions=[0,0],toggle=section.querySelector('.ai-storyboard-toggle'),storyboard=section.querySelector('.ai-production-storyboard');
 function fadeContent(){fade?.cancel();if(!reduced.matches)fade=(storyboard.hidden?video:storyboard).animate([{opacity:0},{opacity:1}],{duration:250,easing:'ease-out'});}
 video.addEventListener('loadedmetadata',()=>{const time=positions[selected];if(time>0&&Number.isFinite(video.duration))video.currentTime=Math.min(time,Math.max(0,video.duration-.05));});
 function select(index){
  if(index===selected)return;
  video.pause();positions[selected]=video.currentTime||0;selected=index;const item=items[index],number=String(index+1).padStart(2,'0');
  video.poster=item.poster;video.src=item.video;video.setAttribute('aria-label','ABLY VIDEO '+number+' '+item.label+' 히어로 영상');video.load();
  image.src=item.storyboard;image.alt='ABLY 히어로 VIDEO '+number+' '+item.label+' 스토리보드';
  preview.setAttribute('aria-label','ABLY VIDEO '+number+' 스토리보드 전체 보기');
  section.querySelector('figcaption').textContent='VIDEO '+number+' · STORYBOARD';
  section.querySelector('.ai-selected-concept').textContent=item.concept;section.querySelector('.ai-selected-story').textContent=item.story;
  buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
  fadeContent();
 }
 buttons.forEach((button,i)=>button.addEventListener('click',()=>select(i)));
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));video.pause();positions[selected]=video.currentTime||0;video.hidden=open;storyboard.hidden=!open;toggle.querySelector('.ai-toggle-label').textContent=open?'스토리보드 닫기':'스토리보드 보기';fadeContent();});
 function openStoryboard(){const large=viewer.querySelector('img');large.src=image.src;large.alt=image.alt;viewer.showModal();viewer.scrollTop=0;}
 preview.addEventListener('click',openStoryboard);section.querySelector('.ai-storyboard-enlarge').addEventListener('click',openStoryboard);
 // 사용자 재생을 우선하고, 화면을 벗어나거나 탭을 숨기면 소리와 재생을 중단합니다.
 const visibility=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)video.pause();},{threshold:0});visibility.observe(video);
 addEventListener('pagehide',()=>video.pause());document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();});
}
