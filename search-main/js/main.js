/* Visuals live in HTML/CSS; this controller only sequences Search Main. */
(() => {
  'use strict';
  const main = document.getElementById('searchMain');
  const copies = [...main.querySelectorAll('[data-copy]')];
  const suggestions = [...main.querySelectorAll('.search-suggestions li')];
  const face = document.querySelector('.ai-helper__handle');
  const bubble = document.querySelector('.ai-helper__message');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const waits = new Map();
  let started = false;
  let finished = false;
  [...suggestions, face, bubble].forEach(element => { element.inert = true; });
  const wait = ms => new Promise(resolve => {
    const id = setTimeout(() => { waits.delete(id); resolve(); }, ms);
    waits.set(id, resolve);
  });
  const reveal = element => { element.classList.add('is-visible'); element.inert = false; };
  const complete = () => {
    finished = true;
    if (PortfolioRobot.screen === "main") PortfolioAI.settle();
    copies.forEach(element => { element.textContent = element.dataset.copy; });
    [...suggestions, face].forEach(reveal);
    main.dataset.motion = 'complete';
    waits.forEach((resolve, id) => { clearTimeout(id); resolve(); });
    waits.clear();
    motion.removeEventListener('change', onMotionChange);
  };
  const onMotionChange = () => { if (motion.matches) complete(); };
  globalThis.PortfolioMain = { async start() {
    if (started) return;
    started = true;
    if (motion.matches) { complete(); return; }
    motion.addEventListener('change', onMotionChange);
    await document.fonts.ready;
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    if (finished) return;
    main.dataset.motion = 'search';
    await wait(240);
    for (const element of copies) {
      if (finished) return;
      main.dataset.motion = 'typing';
      for (const character of element.dataset.copy) {
        if (finished) return;
        element.textContent += character;
        await wait(28);
      }
    }
    if (finished) return;
    main.dataset.motion = 'suggestions';
    for (const element of suggestions) {
      if (finished) return;
      reveal(element);
      await wait(140);
    }
    await wait(100);
    if (finished) return;
    main.dataset.motion = 'robot';
    if (PortfolioRobot.screen !== 'main') { complete(); return; }
    PortfolioAI.center();
    reveal(face);
    await wait(240);
    if (finished) return;
    PortfolioAI.settle();
    if (!finished) complete();
  } };
})();
