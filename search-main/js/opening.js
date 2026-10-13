/* Original Opening functions and timings; only lifecycle cleanup and completion bridge added. */
(() => {
"use strict";
let started = false;
globalThis.PortfolioOpening = { start(onComplete) {
if (started) return;
started = true;
const nativeWindow = globalThis.window;
const events = new AbortController();
const timeouts = new Set(), frames = new Set();
let disposed = false;
const window = {
 matchMedia: nativeWindow.matchMedia.bind(nativeWindow),
 scrollTo: nativeWindow.scrollTo.bind(nativeWindow),
 get scrollY() { return nativeWindow.scrollY; },
 setTimeout(callback, delay) { if (disposed) return 0; const id = nativeWindow.setTimeout(() => { timeouts.delete(id); if (!disposed) callback(); }, delay); timeouts.add(id); return id; },
 clearInterval: nativeWindow.clearInterval.bind(nativeWindow),
 setInterval: nativeWindow.setInterval.bind(nativeWindow),
 addEventListener(type, callback, options = {}) { nativeWindow.addEventListener(type, callback, { ...options, signal: events.signal }); },
};
const requestAnimationFrame = callback => { if (disposed) return 0; const id = nativeWindow.requestAnimationFrame(time => { frames.delete(id); if (!disposed) callback(time); }); frames.add(id); return id; };
const cancelPending = () => { for (const id of timeouts) nativeWindow.clearTimeout(id); timeouts.clear(); for (const id of frames) nativeWindow.cancelAnimationFrame(id); frames.clear(); };
const finish = () => { disposed = true; events.abort(); cancelPending(); nativeWindow.clearInterval(state.introCycleTimer); document.querySelector('#openingIntro').getAnimations({ subtree: true }).forEach(animation => animation.cancel()); onComplete(); };
const INTRO_PHASE_ONE_ENABLED = true;
const INTRO_SHOW_EVERY_LOAD = true;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const introMobileQuery = window.matchMedia('(max-width: 820px)');
const state = { introCycleTimer: null };
function initIntroShell() {
  const intro = document.querySelector("#openingIntro");
  const skipButton = intro?.querySelector(".opening-intro__skip");

  if (!intro) return;

  if (!INTRO_PHASE_ONE_ENABLED || (!INTRO_SHOW_EVERY_LOAD && getSessionFlag("portfolioIntroPlayed"))) {
    intro.hidden = true;
    window.setTimeout(finish, prefersReducedMotion.matches ? 0 : 260);
    return;
  }

  intro.hidden = false;
  window.scrollTo(0, 0);
  requestAnimationFrame(() => window.scrollTo(0, 0));
  window.setTimeout(() => window.scrollTo(0, 0), 80);
  document.documentElement.classList.add("intro-active");
  document.body.classList.add("intro-active");
  skipButton?.addEventListener("click", () => completeIntro(intro, "skip"), { once: true, signal: events.signal });

  const markReady = () => {
    intro.dataset.ready = "true";
    intro.dataset.readyAt = String(Date.now());
    startIntroImageCycle(intro);
  };

  if (prefersReducedMotion.matches) {
    intro.classList.add("is-squared", "is-aligned", "is-stacked", "is-ready");
    markReady();
  } else {
    window.setTimeout(() => intro.classList.add("is-squared"), 900);
    window.setTimeout(() => intro.classList.add("is-aligned"), 1600);
    window.setTimeout(() => gatherOpeningCards(intro), 3100);
    window.setTimeout(() => {
      intro.classList.add("is-ready");
      markReady();
    }, 5350);
  }

  bindIntroReveal(intro);
}

function completeIntro(intro, reason = "unknown") {
  if (intro.dataset.done === "true") return;
  intro.dataset.done = "true";
  intro.dataset.doneReason = reason;
  cancelPending();
  setSessionFlag("portfolioIntroPlayed");
  if (state.introCycleTimer) {
    window.clearInterval(state.introCycleTimer);
    state.introCycleTimer = null;
  }
  intro.classList.add("is-revealing");
  document.documentElement.classList.add("intro-revealing");
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 80);
  window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 260);
  window.setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }), 620);
  window.setTimeout(() => {
    document.documentElement.classList.remove("intro-active");
    document.body.classList.remove("intro-active");
    intro.classList.add("is-exiting");

  }, prefersReducedMotion.matches ? 0 : 760);
  window.setTimeout(() => {
    document.documentElement.classList.remove("intro-revealing");
    intro.hidden = true;
    finish();
  }, prefersReducedMotion.matches ? 0 : 1420);
}

function gatherOpeningCards(intro) {
  if (introMobileQuery.matches) {
    gatherMobileOpeningCards(intro);
    return;
  }

  const cards = [...intro.querySelectorAll(".opening-card")];
  const stage = intro.querySelector(".opening-intro__stage");
  if (!stage || !cards.length) return;

  const stageRect = stage.getBoundingClientRect();
  const startSlots = cards.map((card) => card.getBoundingClientRect().left - stageRect.left);
  cards.forEach((card, index) => {
    card.style.setProperty("--intro-slot-x", `${startSlots[index]}px`);
  });
  intro.classList.add("is-gathering");

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      intro.classList.add("is-gathered");
    });
    window.setTimeout(() => {
      cards.forEach((card) => {
        card.style.setProperty("--intro-slot-x", "0px");
      });
      intro.classList.add("is-stacked");
    }, 1120);
  });
}

function gatherMobileOpeningCards(intro) {
  const cards = [...intro.querySelectorAll(".opening-card")];
  const stage = intro.querySelector(".opening-intro__stage");
  if (!stage || !cards.length) return;

  const stageRect = stage.getBoundingClientRect();
  const cardRects = cards.map((card) => card.getBoundingClientRect());
  const cardSize = cardRects[0]?.width ?? 0;
  const targetX = (stageRect.width - cardSize) / 2;
  const targetY = (stageRect.height - cardSize) / 2;

  intro.style.setProperty("--opening-card-size", `${cardSize}px`);
  intro.style.setProperty("--intro-stage-width", `${stageRect.width}px`);
  intro.style.setProperty("--intro-stage-height", `${stageRect.height}px`);
  cards.forEach((card, index) => {
    const rect = cardRects[index];
    const slotX = rect.left - stageRect.left;
    const slotY = rect.top - stageRect.top;
    card.style.setProperty("--intro-slot-x", `${slotX}px`);
    card.style.setProperty("--intro-slot-y", `${slotY}px`);
    card.style.setProperty("--intro-target-x", `${targetX}px`);
    card.style.setProperty("--intro-target-y", `${targetY}px`);
    card.style.transition = "none";
    card.style.transform = `translate(${slotX}px, ${slotY}px)`;
  });
  intro.classList.add("is-mobile-gathering");
  void stage.offsetWidth;

  window.setTimeout(() => {
    intro.classList.add("is-mobile-gathered");
    const animations = cards.map((card, index) => {
      const rect = cardRects[index];
      const slotX = rect.left - stageRect.left;
      const slotY = rect.top - stageRect.top;
      return card.animate(
        [
          { transform: `translate(${slotX}px, ${slotY}px)` },
          { transform: `translate(${targetX}px, ${targetY}px)` },
        ],
        {
          duration: 1040,
          easing: "cubic-bezier(0.76, 0, 0.24, 1)",
          fill: "forwards",
        },
      );
    });

    Promise.allSettled(animations.map((animation) => animation.finished)).then(() => {
      animations.forEach((animation) => animation.cancel());
      cards.forEach((card) => {
        card.style.transition = "transform 900ms cubic-bezier(0.76, 0, 0.24, 1), opacity 520ms ease";
        card.style.transform = `translate(${targetX}px, ${targetY}px)`;
      });
      window.setTimeout(() => {
        cards.forEach((card) => {
          card.style.setProperty("--intro-slot-x", `${targetX}px`);
          card.style.setProperty("--intro-slot-y", `${targetY}px`);
          card.style.transform = "translate(0px, 0px)";
        });
        intro.classList.add("is-stacked");
      }, 40);
    });

    window.setTimeout(() => {
      if (!intro.classList.contains("is-stacked")) {
        animations.forEach((animation) => animation.cancel());
        cards.forEach((card) => {
          card.style.setProperty("--intro-slot-x", `${targetX}px`);
          card.style.setProperty("--intro-slot-y", `${targetY}px`);
          card.style.transform = "translate(0px, 0px)";
        });
        intro.classList.add("is-stacked");
      }
    }, 1240);
  }, 40);
}

function startIntroImageCycle(intro) {
  const cards = [...intro.querySelectorAll(".opening-card")];
  if (!cards.length) return;

  let activeIndex = 0;
  const setActiveCard = () => {
    cards.forEach((card, index) => {
      card.classList.toggle("is-active", index === activeIndex);
    });
    activeIndex = (activeIndex + 1) % cards.length;
  };

  setActiveCard();
  if (state.introCycleTimer) window.clearInterval(state.introCycleTimer);
  state.introCycleTimer = window.setInterval(setActiveCard, 1500);
}

function bindIntroReveal(intro) {
  let touchStartY = 0;
  const canReveal = () => {
    const readyAt = Number(intro.dataset.readyAt ?? 0);
    return intro.dataset.ready === "true" && Date.now() - readyAt > 360;
  };
  const reveal = (event) => {
    if (!canReveal()) return;
    if ("deltaY" in event && event.deltaY < 10) return;
    event.preventDefault();
    completeIntro(intro, event.type);
  };

  intro.addEventListener("wheel", reveal, { passive: false, signal: events.signal });
  intro.addEventListener("touchstart", (event) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
  }, { passive: true, signal: events.signal });
  intro.addEventListener("touchmove", (event) => {
    const currentY = event.touches[0]?.clientY ?? touchStartY;
    if (touchStartY - currentY > 20) reveal(event);
  }, { passive: false, signal: events.signal });
  window.addEventListener("scroll", () => {
    if (intro.dataset.done === "true") return;
    if (!canReveal()) {
      window.scrollTo(0, 0);
      return;
    }
    if (window.scrollY > 2) completeIntro(intro, "scroll");
  }, { passive: true, signal: events.signal });
  window.addEventListener("keydown", (event) => {
    if (!canReveal()) return;
    const revealKeys = ["ArrowDown", "PageDown", " ", "Enter"];
    if (revealKeys.includes(event.key)) reveal(event);
  });
}

function getSessionFlag(key) {
  try {
    return sessionStorage.getItem(key) === "true";
  } catch {
    return false;
  }
}

function setSessionFlag(key) {
  try {
    sessionStorage.setItem(key, "true");
  } catch {
    return false;
  }
}


initIntroShell();
} };
})();
