/* Onboarding state is independent from the robot visual and pointer movement. */
(() => {
  const helper = document.querySelector('.ai-helper');
  const bubble = helper.querySelector('.ai-helper__message');
  const text = helper.querySelector('.ai-helper__text');
  const handle = helper.querySelector('.ai-helper__handle');
  const menu = helper.querySelector('.ai-helper__menu');
  const actions = helper.querySelector('.ai-helper__actions');
  const destinations = [
    { id: 'profile', label: '프로필 보기', icon: 'person' },
    { id: 'skills', label: '스킬 살펴보기', icon: 'auto_awesome' },
    { id: 'works', label: '작업물 보기', icon: 'work' },
    { id: 'help', label: 'AI 로봇 사용방법', icon: 'help' },
  ];
  function configureMenu(items = destinations) {
  menu.querySelector("ul").replaceChildren();
  items.forEach(item => {
    const li = document.createElement('li');
    if (item.id === 'help') li.className = 'ai-helper__help-item';
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.aiDestination = item.id;
    const icon = document.createElement('span');
    icon.className = 'material-symbol';
    icon.dataset.symbol = item.icon;
    icon.setAttribute('aria-hidden', 'true');
    button.append(icon, document.createTextNode(item.label));
    button.addEventListener('click', () => {
      if (item.id === 'help') {
        closeMenu();
        show(1);
        handle.focus();
        return;
      }
      helper.dispatchEvent(new CustomEvent('portfolio-ai-select', { bubbles: true, detail: { destination: item.id } }));
      closeMenu(true);
    });
    li.append(button);
    menu.querySelector('ul').append(li);
  });
  }
  configureMenu();
  const messages = ['', '안녕하세요! 포트폴리오에 오신 걸 환영해요.', '프로필, 스킬, 작업물 중 골라보세요!', '저를 드래그해서 원하는 곳에 놓아보세요!'];
  let step = 0, timer = null;
  let completed = false;
  helper.dataset.onboarding = '0';
  helper.dataset.state = 'idle';
  function closeMenu(restoreFocus = false) {
    if (helper.dataset.state !== 'menu-open') return;
    bubble.hidden = bubble.inert = true;
    helper.dataset.state = 'ready';
    handle.setAttribute('aria-expanded', 'false');
    if (restoreFocus) handle.focus();
  }
  function openMenu() {
    helper.dataset.state = 'menu-open';
    menu.hidden = false;
    text.hidden = actions.hidden = true;
    bubble.hidden = bubble.inert = false;
    bubble.classList.add('is-visible');
    handle.setAttribute('aria-expanded', 'true');
    globalThis.PortfolioAI?.updateSpeech();
  }
  function show(next, markCompletion = true) {
    clearTimeout(timer);
    step = next;
    if (step === 4 && markCompletion) completed = true;
    helper.dataset.onboardingCompleted = String(completed);
    helper.dataset.onboarding = String(step);
    helper.dataset.state = step === 0 ? 'idle' : step === 4 ? 'ready' : 'onboarding';
    menu.hidden = true;
    text.hidden = actions.hidden = false;
    handle.setAttribute('aria-expanded', String(step > 0 && step < 4));
    bubble.hidden = step === 0 || step === 4;
    bubble.inert = bubble.hidden;
    if (!bubble.hidden) {
      text.textContent = messages[step];
      bubble.classList.remove('is-visible');
      requestAnimationFrame(() => {
        if (bubble.hidden) return;
        bubble.classList.add('is-visible');
        globalThis.PortfolioAI?.updateSpeech();
      });
    }
    if (step === 1) timer = setTimeout(() => show(2), 3500);
  }
  handle.addEventListener('portfolio-ai-activate', () => {
    if (step < 4) show(step + 1);
    else if (helper.dataset.state === 'menu-open') closeMenu();
    else if (helper.dataset.state === 'ready') openMenu();
  });
  helper.querySelector('[data-ai-next]').addEventListener('click', () => {
    if (step < 4) show(step + 1);
    if (bubble.hidden) handle.focus();
  });
  helper.querySelector('[data-ai-skip]').addEventListener('click', () => { show(4); handle.focus(); });
  helper.querySelector('[data-ai-close]').addEventListener('click', () => closeMenu(true));
  document.addEventListener('pointerdown', event => {
    if (!helper.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && helper.dataset.state === 'menu-open') {
      event.preventDefault();
      closeMenu(true);
    } else if (event.key === 'Escape' && helper.dataset.state === 'onboarding') {
      event.preventDefault();
      show(4);
      handle.focus();
    }
  });
  globalThis.PortfolioOnboarding = {
    finish() { show(4); },
    configureMenu,
    prepareAutomatic(enabled) { show(enabled && !completed ? 0 : 4, false); },
    deactivate() { clearTimeout(timer); if (step > 0) show(4, false); else show(0); },
    beginDrag() {
      clearTimeout(timer);
      helper.dataset.state = 'dragging';
      bubble.hidden = bubble.inert = true;
      handle.setAttribute('aria-expanded', 'false');
    },
  };
})();
