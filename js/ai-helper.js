/* Pointer movement and speech positioning; replace the handle's visual freely. */
(() => {
  const helper = document.querySelector('.ai-helper');
  const handle = helper.querySelector('.ai-helper__handle');
  const bubble = helper.querySelector('.ai-helper__message');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  let x = 0, y = 0, ready = false, placed = false, drag = null, travel = null, userPlaced = false;
  const view = () => ({ width: document.documentElement.clientWidth, height: innerHeight });
  const clamp = (n, min, max) => Math.max(min, Math.min(n, Math.max(min, max)));
  const bounds = () => {
    const v = view();
    return { maxX: v.width - helper.offsetWidth - 8, maxY: v.height - helper.offsetHeight - 8 };
  };
  const home = () => {
    const b = bounds();
    const position = globalThis.PortfolioRobot?.config?.position;
    if (typeof position === "function") return position({ ...view(), robotWidth: helper.offsetWidth, robotHeight: helper.offsetHeight });
    if (position && typeof position === "object") return position;
    if (globalThis.PortfolioRobot?.config?.position === "bottom-right") return {x:b.maxX-16,y:b.maxY-14};
    const suggestions = document.querySelector(".search-suggestions");
    if (!suggestions.getClientRects().length) return placed ? {x,y} : {x:(view().width-helper.offsetWidth)/2,y:b.maxY-14};
    const bottom = suggestions.getBoundingClientRect().bottom;
    return { x: (view().width - helper.offsetWidth) / 2, y: Math.min(b.maxY - 50, bottom + 54) };
  };
  const overlaps = (a, b) => a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
  function speech() {
    const v = view(), w = bubble.offsetWidth, h = bubble.offsetHeight;
    const size = helper.getBoundingClientRect();
    const candidates = [
      ['left', x - w - 10, y + size.height - h - 8],
      ['right', x + size.width + 10, y + size.height - h - 8],
      ['above', clamp(x + size.width / 2 - w / 2, 8, v.width - w - 8), y - h - 10],
      ['below', clamp(x + size.width / 2 - w / 2, 8, v.width - w - 8), y + size.height + 10],
    ];
    if(globalThis.PortfolioRobot?.config?.preferBelow){
      const title=document.querySelector('.uxui-cover-title')?.getBoundingClientRect();
      const below=candidates.find(c=>c[0]==='below');
      if(title&&overlaps({left:below[1],top:below[2],right:below[1]+w,bottom:below[2]+h},title)&&title.bottom+h+20<v.height)below[2]=title.bottom+12;else if(title&&overlaps({left:below[1],top:below[2],right:below[1]+w,bottom:below[2]+h},title)){if(title.left>w+20)below[1]=8;else if(v.width-title.right>w+20)below[1]=v.width-w-8;}
      candidates.sort((a,b)=>(a[0]==='below'?-1:0)-(b[0]==='below'?-1:0));
    }
    const protectedAreas = [...document.querySelectorAll(globalThis.PortfolioRobot?.config?.protectedAreas || '.search-main__heading, .hero-search, .search-suggestions')].map(e => e.getBoundingClientRect());
    let candidate = candidates.find(([, left, top]) => left >= 8 && top >= 8 && left + w <= v.width - 8 && top + h <= v.height - 8 && !protectedAreas.some(r => overlaps({ left, top, right: left + w, bottom: top + h }, r)));
    if (!candidate && ['menu-open', 'onboarding'].includes(helper.dataset.state)) {
      const safe = candidates.find(([, left, top]) => left >= 8 && top >= 8 && left + w <= v.width - 8 && top + h <= v.height - 8);
      candidate = safe || ['below', clamp(x, 8, v.width - w - 8), clamp(y + size.height + 10, 8, v.height - h - 8)];
    }
    helper.dataset.speech = candidate?.[0] || 'hidden';
    if (candidate) { bubble.style.left = `${candidate[1] - x}px`; bubble.style.top = `${candidate[2] - y}px`; bubble.style.right = 'auto'; bubble.style.bottom = 'auto'; }
  }
  function place(nx, ny) {
    const b = bounds();
    x = clamp(nx, 8, b.maxX); y = clamp(ny, 8, b.maxY);
    helper.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    speech();
  }
  function cancelTravel() { if (travel) { travel.cancel(); travel = null; } }
  function settle() {
    cancelTravel();
    if (!ready) { const p = home(); place(p.x, p.y); }
    ready = placed = true;
  }
  handle.addEventListener('pointerdown', event => {
    if (!ready || !event.isPrimary || event.button !== 0) return;
    drag = { id: event.pointerId, px: event.clientX, py: event.clientY, x, y, moved: false };
    handle.setPointerCapture(event.pointerId);
    event.preventDefault();
  });
  handle.addEventListener('pointermove', event => {
    if (!drag || drag.id !== event.pointerId) return;
    if (globalThis.PortfolioRobot?.config?.draggable === false) return;
    const dx = event.clientX - drag.px, dy = event.clientY - drag.py;
    if (Math.hypot(dx, dy) > 6) drag.moved = true;
    if (!drag.moved) return;
    if (!drag.movedState) { drag.movedState = true; PortfolioOnboarding.beginDrag(); }
    userPlaced = true;
    helper.classList.add('is-dragging');
    place(drag.x + dx, drag.y + dy);
    event.preventDefault();
  });
  function end(event) {
    if (!drag || drag.id !== event.pointerId) return;
    handle.dataset.lastInteraction = drag.moved ? 'drag' : 'click';
    if (drag.moved) PortfolioOnboarding.finish();
    const clicked = !drag.moved && event.type === 'pointerup';
    drag = null;
    helper.classList.remove('is-dragging');
    if (handle.hasPointerCapture(event.pointerId)) handle.releasePointerCapture(event.pointerId);
    speech();
    // Future Q&A can listen here; no navigation or dialog is opened now.
    if (clicked) handle.dispatchEvent(new CustomEvent('portfolio-ai-activate', { bubbles: true }));
  }
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => handle.addEventListener(type, end));
  handle.addEventListener('keydown', event => {
    if (!ready) return;
    const steps = { ArrowLeft: [-16, 0], ArrowRight: [16, 0], ArrowUp: [0, -16], ArrowDown: [0, 16] };
    if (event.key === 'Home') { userPlaced = false; event.preventDefault(); const p = home(); place(p.x, p.y); }
    else if (steps[event.key] && globalThis.PortfolioRobot?.config?.draggable !== false) { userPlaced = true; PortfolioOnboarding.finish(); event.preventDefault(); const [dx, dy] = steps[event.key]; place(x + dx, y + dy); }
    else if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handle.dispatchEvent(new CustomEvent('portfolio-ai-activate', { bubbles: true })); }
  });
  const resize = () => {
    if (!placed || helper.hidden) return;
    if (travel) settle();
    const p = userPlaced ? {x, y} : home();
    place(p.x, p.y);
    if (drag) { handle.releasePointerCapture(drag.id); drag = null; helper.classList.remove('is-dragging'); }
  };
  addEventListener('resize', resize);
  visualViewport?.addEventListener('resize', resize);
  motion.addEventListener('change', () => { if (motion.matches && travel) settle(); });
  globalThis.PortfolioAI = {
    center() { placed = true; const p = home(); place(p.x, p.y); },
    async arrive() {
      if (ready) return;
      const p = home();
      if (motion.matches) { settle(); return; }
      travel = helper.animate([{ transform: `translate3d(${x}px, ${y}px, 0)` }, { transform: `translate3d(${p.x}px, ${p.y}px, 0)` }], { duration: 620, easing: 'cubic-bezier(.22,.8,.25,1)', fill: 'forwards' });
      try { await travel.finished; } catch { return; }
      place(p.x, p.y); cancelTravel(); ready = true;
    },
    settle,
    updateSpeech: speech,
    refreshPosition: resize,
    deactivate() { if (drag) { const id=drag.id; drag=null; if(handle.hasPointerCapture(id))handle.releasePointerCapture(id); } helper.classList.remove("is-dragging"); cancelTravel(); },
    capturePosition() { return {x,y,userPlaced}; },
    restorePosition(saved) { userPlaced=saved.userPlaced; place(saved.x,saved.y); ready=placed=true; },
    screenPosition(reset) { if(reset) { userPlaced=false; const p=home(); place(p.x,p.y); } else place(x,y); ready=placed=true; },
  };
})();
