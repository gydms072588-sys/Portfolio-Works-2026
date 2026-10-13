/* URL is the source of truth; keep Opening only for a fresh navigation. */
(() => {
 const main = document.getElementById('searchMain');
 const profile = document.getElementById('profilePage');
 const skills = document.getElementById('skillsPage');
 const intro = document.getElementById('openingIntro');
 const navigation = performance.getEntriesByType('navigation')[0];
 const isReload = navigation?.type === 'reload';
 // 명시적인 내부 경로(Works 홈 복귀 포함)는 오프닝을 다시 실행하지 않습니다.
 const isInternalEntry = ['#main', '#profile', '#skills', '#works'].includes(location.hash);
 const skipOpening = isReload || isInternalEntry || navigation?.type === 'back_forward';
 const scrollPositions = { main: 0, profile: 0, skills: 0 };
 let openingDone = false;
 let current = null;
 history.scrollRestoration = 'manual';
 function route() { return location.hash === '#profile' ? 'profile' : location.hash === '#skills' ? 'skills' : 'main'; }
 function render(skipReturn = false) {
  if (!openingDone) return;
  const next = route();
  if(skipReturn !== true && next==='main' && location.hash!=='#works' && (current==='skills' || main.querySelector('.search-main').classList.contains('is-works'))){
   const source=current==='skills'?skills.querySelector('.skills-return'):main.querySelector('.search-submit');
   const content=current==='skills'?skills.querySelector('.skills-container'):main.querySelector('.works-categories');
   PortfolioReturn.run(source,content,()=>render(true));return;
  }
  if(skipReturn !== true)PortfolioReturn.cancel();
  if (current && current !== next) scrollPositions[current] = scrollY;
  current = next;
  // Normalize the default route without adding a history entry.
  if (next === 'main' && !['#main','#works'].includes(location.hash)) {
   history.replaceState(history.state, '', location.pathname + location.search + '#main');
  }
  main.hidden = next !== 'main';
  profile.hidden = next !== 'profile';
  skills.hidden = next !== 'skills';
  main.querySelector('.search-main').classList.remove('is-skills-leaving');
  document.title = next === 'profile' ? 'Profile — 박효은' : next === 'skills' ? 'Skills — 박효은' : 'Portfolio 2026 — 박효은';
  const target = next === 'profile' ? document.getElementById('profile-title') : next === 'skills' ? document.getElementById('skills-title') : main;
  target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  scrollTo({ top: next === 'main' ? 0 : scrollPositions[next], left: 0, behavior: 'instant' });
  if (next === 'main') { PortfolioWorks.show(location.hash === '#works', skipReturn !== true); PortfolioRobot.activate(next); PortfolioMain.start(); PortfolioAI.updateSpeech(); }
  else { PortfolioWorks.show(false, false); PortfolioRobot.activate(next); }
  if(next==='skills')PortfolioSkills.show();
 }
 document.querySelector('.profile-home button').addEventListener('click',()=>{location.hash='main';});
 document.querySelector('[data-destination="profile"]').addEventListener('click', () => { location.hash = 'profile'; });
 document.addEventListener('portfolio-ai-select', event => {
  if (event.detail.destination === 'profile') location.hash = 'profile';
  if (event.detail.destination === 'works') location.hash = 'works';
  if (event.detail.destination === 'skills') location.hash = 'skills';
 });
 let skillsTransition=false;
 document.querySelector('[data-destination="skills"]').addEventListener('click',()=>{
  if(skillsTransition)return;skillsTransition=true;
  main.querySelector('.search-main').classList.add('is-skills-leaving');
  setTimeout(()=>{skillsTransition=false;if(!main.hidden)location.hash='skills';},matchMedia('(prefers-reduced-motion: reduce)').matches?0:220);
 });
 addEventListener('hashchange', render);
 addEventListener('pageshow', event => { if (event.persisted) render(); });
 if (skipOpening) {
  intro.hidden = true;
  document.documentElement.classList.remove('intro-active', 'intro-revealing');
  document.body.classList.remove('intro-active');
  openingDone = true;
  render();
 } else {
  PortfolioOpening.start(() => { openingDone = true; render(); });
 }
})();
