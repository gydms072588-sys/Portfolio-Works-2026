/* One persistent helper instance; modules retain existing pointer/onboarding behavior. */
(() => {
 if (globalThis.PortfolioRobot) return;
 const helper=document.querySelector('.ai-helper');
 const face=helper.querySelector('.ai-helper__handle');
 const bubble=helper.querySelector('.ai-helper__message');
 const main=document.getElementById('searchMain');
 const profilePage=document.getElementById('profilePage');
 const configs={
  main:{visible:true,position:'search-bottom',draggable:true,speech:true,onboarding:true,protectedAreas:'.search-main__heading, .hero-search, .search-suggestions'},
  skills:{visible:true,position:'bottom-right',draggable:true,speech:true,onboarding:false,protectedAreas:'.skills-header, .skills-cards, .skills-detail'},
  profile:{visible:true,position:({width,height,robotWidth,robotHeight})=>({x:(width-robotWidth)/2,y:height-robotHeight-24}),draggable:true,speech:true,onboarding:false,protectedAreas:'.profile-qa > header, .profile-questions'},
 };
 const positions=new Map();
 let screen=null,profileActivated=false,checkFrame=0;
 const syncVisibility=()=>{
  const config=configs[screen];
  const visible=Boolean(config?.visible && (screen!=='profile'||profileActivated));
  if(!visible && !helper.hidden) { PortfolioOnboarding.deactivate(); PortfolioAI.deactivate(); }
  helper.hidden=!visible;
  if(visible) { PortfolioAI.refreshPosition(); PortfolioAI.updateSpeech(); }
 };
 const stageObserver=new MutationObserver(()=>{
  if(screen==='main')helper.dataset.motion=main.dataset.motion;
 });
 stageObserver.observe(main,{attributes:true,attributeFilter:['data-motion']});
 // Latch activation for this visit, based on actual page/visual viewport geometry.
 const checkBottom=()=>{
  checkFrame=0;
  if(screen!=='profile'||profileActivated||profilePage.hidden)return;
  const viewport=window.visualViewport;
  const visibleBottom=scrollY+(viewport?.offsetTop||0)+(viewport?.height||innerHeight);
  const pageBottom=profilePage.getBoundingClientRect().bottom+scrollY;
  if(visibleBottom>=pageBottom-2){
   profileActivated=true;
   helper.classList.remove('ai-profile-arrival');
   syncVisibility();
   void helper.offsetWidth;
   helper.classList.add('ai-profile-arrival');
  }
 };
 const scheduleCheck=()=>{if(!checkFrame)checkFrame=requestAnimationFrame(checkBottom);};
 addEventListener('scroll',scheduleCheck,{passive:true});
 addEventListener('resize',scheduleCheck);
 window.visualViewport?.addEventListener('resize',scheduleCheck);
 window.visualViewport?.addEventListener('scroll',scheduleCheck);
 const pageObserver=new ResizeObserver(scheduleCheck);
 pageObserver.observe(profilePage);
 globalThis.PortfolioRobot={
  get screen(){return screen;},
  get config(){return configs[screen];},
  configure(name,values){ configs[name]={visible:true,draggable:true,speech:true,onboarding:false,...configs[name],...values}; if(screen===name)this.activate(name,true); },
  activate(name,force=false){
   if(screen===name&&!force){syncVisibility();return;}
   if(screen)positions.set(screen,PortfolioAI.capturePosition());
   PortfolioOnboarding.deactivate();PortfolioAI.deactivate();
   screen=name;
   profileActivated=false;
   helper.classList.remove("ai-profile-arrival");
   const config=configs[name];
   helper.dataset.screen=name;
   helper.dataset.motion=name==='main'?main.dataset.motion:'complete';
   helper.dataset.interactive=String(config?.draggable!==false);
   helper.dataset.speechAllowed=String(config?.speech!==false);
   PortfolioOnboarding.configureMenu(config?.menu);
   PortfolioOnboarding.prepareAutomatic(config?.onboarding===true);
   helper.hidden=false;
   if(positions.has(name))PortfolioAI.restorePosition(positions.get(name));
   else if(name!=='main')PortfolioAI.screenPosition(true);
   if(name!=='main'){face.classList.add('is-visible');face.inert=false;}
   bubble.hidden=true;
   syncVisibility();
   if(name==='profile')scheduleCheck();
  },
 };
})();
