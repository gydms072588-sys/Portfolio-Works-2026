// The cover is correctly positioned at scrollY=0. Absorb only the tail of the
// preceding project's scroll gesture during a fresh HotelsPick → YENE handoff.
const navigation=performance.getEntriesByType('navigation')[0];
const fromHotelsPick=document.referrer&&new URL(document.referrer).pathname.endsWith('/uxui.html');
if(fromHotelsPick&&navigation?.type==='navigate'&&!location.hash&&document.documentElement.dataset.projectEntry!=='showcase'){
 addEventListener('pageshow',event=>{
  if(event.persisted)return;
  scrollTo({top:0,left:0,behavior:'instant'});
  const stop=event=>event.preventDefault();
  const release=()=>{removeEventListener('wheel',stop);removeEventListener('touchmove',stop);removeEventListener('pointerdown',release);};
  addEventListener('wheel',stop,{passive:false});addEventListener('touchmove',stop,{passive:false});
  addEventListener('pointerdown',release,{once:true});
  setTimeout(release,350);
 },{once:true});
}
