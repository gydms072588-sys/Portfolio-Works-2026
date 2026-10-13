/* One active turn; changing the question cancels the previous pending answer. */
(() => {
 const page = document.getElementById('profilePage');
 const log = page.querySelector('.profile-chat');
 const questions = page.querySelector('.profile-questions');
 const details = page.querySelector('.profile-qa-details');
 let disposeComparison=()=>{};
 function clearDetails(){disposeComparison();disposeComparison=()=>{};details.getAnimations({subtree:true}).forEach(a=>a.cancel());details.classList.remove('is-awaiting','is-entering');details.replaceChildren();details.hidden=true;}
 function renderDetails(id){clearDetails();const templateId=globalThis.ProfileQuestionDetails?.[id];const template=templateId&&document.getElementById(templateId);if(template){details.append(template.content.cloneNode(true));details.hidden=false;disposeComparison=globalThis.ProfileComparison?.mount(details.querySelector('.qa-comparison-detail'))||(()=>{});}}
 const avatar = page.querySelector('.profile-qa-avatar');
 const motion = matchMedia('(prefers-reduced-motion: reduce)');
 const viewed = new Set();
 let selectedId = null;
 let nextObserver=null,nextTimer=null,nextEnd=null;
 function clearNext(){nextObserver?.disconnect();nextObserver=null;clearTimeout(nextTimer);nextTimer=null;nextEnd?.remove();nextEnd=null;questions.inert=false;questions.classList.remove('is-next-pending','is-next-visible');}
 function revealNext(){nextObserver?.disconnect();nextObserver=null;clearTimeout(nextTimer);nextTimer=null;nextEnd?.remove();nextEnd=null;questions.inert=false;questions.classList.remove('is-next-pending');questions.classList.add('is-next-visible');}
 function watchNext(token){
  if(motion.matches||!('IntersectionObserver' in window)){revealNext();return;}
  let ready=false,near=false;
  nextEnd=document.createElement('div');nextEnd.className='qa-content-end';nextEnd.setAttribute('aria-hidden','true');
  (details.hidden?log:details).append(nextEnd);
  nextObserver=new IntersectionObserver(entries=>{near=entries[0].isIntersecting;if(ready&&near&&token===revision)revealNext();},{rootMargin:'0px 0px -10% 0px',threshold:1});
  nextObserver.observe(nextEnd);
  nextTimer=setTimeout(()=>{if(token!==revision)return;ready=true;if(near)revealNext();},details.hidden?350:Number(details.firstElementChild?.dataset.nextRevealDelay||950));
 }
 let selected = null, timer = null, revision = 0, measuredWidth = 0, reservedHeight = 0;
 function answerRow(content) {
  const row = document.createElement('div'); row.className = 'chat-ai-row';
  const message = document.createElement('p'); message.className = 'chat-answer';
  content.split(/\n\s*\n/).forEach(text=>{const paragraph=document.createElement('span');paragraph.className='qa-answer-paragraph';paragraph.textContent=text;message.append(paragraph);});
  row.append(avatar.cloneNode(true), message); return row;
 }
 function questionBubble(content) {
  const message = document.createElement('p'); message.className = 'chat-question'; message.textContent = content; return message;
 }
 const greeting = log.querySelector('.chat-answer');
 const greetingText = greeting.textContent;
 log.replaceChildren(answerRow(greetingText));
 function showAnswer(token) {
  if (token !== revision || selected === null) return;
  timer = null;
  log.append(answerRow(ProfileQuestions[selected].answer));
  details.classList.remove('is-awaiting');if(!details.hidden)details.classList.add('is-entering');
  log.setAttribute('aria-busy', 'false');
  renderQuestions();watchNext(token);
 }
 function scrollToConversation(token) {
  requestAnimationFrame(() => requestAnimationFrame(() => {
   if(token!==revision||page.hidden)return;
   const header=page.querySelector('.profile-qa > header');
   const top=Math.max(0,header.getBoundingClientRect().top+scrollY-20);
   scrollTo({top,left:0,behavior:motion.matches?'instant':'smooth'});
  }));
 }
 function restart() {
  clearNext();clearDetails();
  clearTimeout(timer);timer=null;revision++;selected=null;selectedId=null;viewed.clear();
  log.removeAttribute('data-question-index');log.removeAttribute('data-question-id');
  log.style.minHeight='0px';log.setAttribute('aria-busy','false');log.replaceChildren(answerRow(greetingText));
  renderQuestions();scrollToConversation(revision);
 }
 function choose(item,index) {
  if(viewed.has(item.id))return;
  clearNext();clearDetails();
  clearTimeout(timer);selected=index;selectedId=item.id;viewed.add(item.id);const token=++revision;
  log.dataset.questionIndex=String(index);log.dataset.questionId=selectedId;measuredWidth=0;reserveSpace();
  log.replaceChildren(questionBubble(item.question));log.setAttribute('aria-busy','true');
  renderDetails(selectedId);if(!details.hidden)details.classList.add('is-awaiting');
  renderQuestions();questions.classList.add('is-next-pending');questions.inert=true;
  const question=log.firstElementChild;question.tabIndex=-1;question.focus({preventScroll:true});
  scrollToConversation(token);
  if(motion.matches)showAnswer(token);else timer=setTimeout(()=>showAnswer(token),300);
 }
 function renderQuestions() {
  questions.replaceChildren();
  questions.classList.toggle('is-follow-up',selectedId!==null);
  const remaining=ProfileQuestions.filter(item=>!viewed.has(item.id));
  for(const item of remaining){
   const button=document.createElement('button');button.type='button';button.textContent=item.question;button.dataset.questionId=item.id;
   button.addEventListener('click',()=>choose(item,ProfileQuestions.indexOf(item)));questions.append(button);
  }
  if(!remaining.length){
   const completed=document.createElement('p');completed.className='qa-next-prompt';completed.setAttribute('role','status');completed.textContent='모든 이야기를 살펴보셨어요!';
   const reset=document.createElement('button');reset.type='button';reset.dataset.qaRestart='';reset.textContent='처음부터 다시 보기';reset.disabled=log.getAttribute('aria-busy')==='true';reset.addEventListener('click',restart);questions.append(completed,reset);
  }
 }
 renderQuestions();
 // Reserve the tallest actual turn at the current width, without clipping text.
 function reserveSpace() {
  const width = log.getBoundingClientRect().width;
  if (!width || width === measuredWidth) return;
  measuredWidth = width;
  const measure = log.cloneNode(false);
  measure.removeAttribute('role'); measure.setAttribute('aria-hidden', 'true'); measure.removeAttribute('aria-live');
  measure.style.cssText = 'position:absolute;visibility:hidden;pointer-events:none;height:auto;min-height:0;width:' + width + 'px;';
  log.parentElement.append(measure);
  let height = 0;
  for (const item of (selected===null?ProfileQuestions:[ProfileQuestions[selected]])) {
   measure.replaceChildren(questionBubble(item.question), answerRow(item.answer));
   height = Math.max(height, measure.getBoundingClientRect().height);
  }
  measure.remove(); reservedHeight = Math.ceil(height);
  log.style.minHeight = (selected === null ? 0 : reservedHeight) + 'px';
 }
 const observer = new ResizeObserver(reserveSpace); observer.observe(log);
 document.fonts.ready.then(() => { measuredWidth = 0; reserveSpace(); });
 motion.addEventListener('change', () => { if(motion.matches){if(timer!==null){clearTimeout(timer);showAnswer(revision);}revealNext();} });
})();
