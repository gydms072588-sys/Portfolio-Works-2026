// URL state survives refresh/history; bare independent URLs always keep Cover.
if(document.documentElement.dataset.projectEntry==='showcase'){
 const cover=document.querySelector('.uxui-cover'),main=document.querySelector('main'),controls=document.createElement('div');controls.className='project-entry-controls';main.prepend(controls);const menu=cover.querySelector('.category-nav');if(menu)controls.append(menu);
 const relocate=()=>{const home=cover.querySelector('.works-home-control');if(home){controls.append(home);observer.disconnect();}};
 const observer=new MutationObserver(relocate);observer.observe(cover,{childList:true});relocate();
 // Ignore the old project's residual gesture only during the new document handoff.
 const nav=performance.getEntriesByType('navigation')[0];
 if(nav?.type==='navigate'&&!location.hash)addEventListener('pageshow',e=>{if(e.persisted)return;scrollTo({top:0,left:0,behavior:'instant'});const stop=e=>e.preventDefault();const release=()=>{removeEventListener('wheel',stop);removeEventListener('touchmove',stop);removeEventListener('pointerdown',release);};addEventListener('wheel',stop,{passive:false});addEventListener('touchmove',stop,{passive:false});addEventListener('pointerdown',release,{once:true});setTimeout(release,350);},{once:true});
}
