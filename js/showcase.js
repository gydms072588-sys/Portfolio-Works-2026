// Renderer and carousel reused from src/js/main.js; screen images intentionally omitted.
const projectAsset = (source) => './assets/showcase' + source;

const screenImage = (source, label) => source ? `<img class="project-site-preview" src="${projectAsset(source)}" alt="${label}" draggable="false" decoding="async" />` : '';
const projectDeviceMockups = (project) => {
  const [, desktop, mobile] = project.images;
  const desktopPreview = project.preview?.desktop || desktop.src;
  const mobilePreview = project.preview?.mobile || mobile.src;

  if (project.deviceMode === 'mobile') {
    return `
      <div class="project-device-stage is-mobile-only" data-number="${project.number}" aria-label="${project.title} 안드로이드 앱 화면 미리보기">
        <div class="project-mobile-mockup">
          <div class="project-mobile-screen">
            ${screenImage(project.preview?.mobile, project.title + ' 모바일 화면')}
          </div>
          <img class="project-device-frame" src="${projectAsset('/assets/images/mockups/android-phone.png')}" alt="" aria-hidden="true" decoding="async" />
        </div>
      </div>`;
  }

  const desktopLeadIn = project.previewLeadIn?.desktop;
  const mobileLeadIn = project.previewLeadIn?.mobile;

  return `
    <div class="project-device-stage" data-number="${project.number}" aria-label="${project.title} PC와 안드로이드 화면 미리보기">
      <div class="project-desktop-mockup">
        <div class="project-desktop-screen"${desktopLeadIn ? ` data-lead-in="${desktopLeadIn}"` : ''}>
          ${screenImage(project.preview?.desktop, project.title + ' PC 화면')}
        </div>
        <img class="project-device-frame" src="${projectAsset('/assets/images/mockups/desktop-monitor.png')}" alt="" aria-hidden="true" decoding="async" />
      </div>
      <div class="project-mobile-mockup">
        <div class="project-mobile-screen"${mobileLeadIn ? ` data-lead-in="${mobileLeadIn}"` : ''}>
          ${screenImage(project.preview?.mobile, project.title + ' 모바일 화면')}
        </div>
        <img class="project-device-frame" src="${projectAsset('/assets/images/mockups/android-phone.png')}" alt="" aria-hidden="true" decoding="async" />
      </div>
    </div>`;
};

const projectProgramLogos = (project) => {
  if (!project.programs?.length) return project.tools;

  return `<span class="project-program-list" aria-label="사용 프로그램: ${project.programs.map(({ name }) => name).join(', ')}">
    ${project.programs.map(({ name, icon, note }) => `
      <span class="project-program" title="${note ? name+' — '+note : name}">
        ${icon ? `<img src="${projectAsset(icon)}" alt="" aria-hidden="true" loading="eager" decoding="async" />` : ''}
        <span>${name}</span>
      </span>`).join('')}
  </span>`;
};

// 프로젝트 카드 CTA 공통 설정.
// showProcessButton: 작업 과정 페이지 정리 후 재노출 예정 — true로 바꾸면 버튼이 그대로 다시 나옵니다.
// (버튼만 렌더링에서 빼둔 상태이고, 상세 데이터(project.sections)·다이얼로그 컴포넌트·
//  열기 핸들러는 모두 그대로 남아 있어 별도 복구 작업이 필요 없습니다.)
export const projectCardConfig = {
  showProcessButton: false,
};

const renderProjectCard = (project, category, localIndex, isCurrent) => {
  const [background] = project.images;
  const backgroundSource = project.background || background.src;
  const externalAttrs = 'target="_blank" rel="noopener noreferrer"';
  const projectActions = project.actions || [];
  return `
    <article class="project-card ${localIndex % 2 ? 'project-card-reverse' : ''}" id="project-${project.id}" data-number="${project.number}" data-category="${project.category}" data-preview-style="${project.previewStyle || 'cover'}" style="--accent:${project.color};--card-index:${localIndex}"${isCurrent ? ' data-current' : ''} aria-hidden="${isCurrent ? 'false' : 'true'}"${isCurrent ? '' : ' inert'}>
      <div class="project-card-background" aria-hidden="true">${project.backgroundVideo
        ? `<video src="${projectAsset(project.backgroundVideo)}"${project.backgroundVideoPoster ? ` poster="${projectAsset(project.backgroundVideoPoster)}"` : ''} autoplay muted loop playsinline disablepictureinpicture${project.backgroundPosition ? ` style="object-position:${project.backgroundPosition}"` : ''}></video>`
        : backgroundSource ? `<img src="${projectAsset(backgroundSource)}" alt="" decoding="async"${project.backgroundPosition ? ` style="object-position:${project.backgroundPosition}"` : ''} />` : ''}</div>
      <div class="project-card-inner">
        <div class="project-cover">
          ${projectDeviceMockups(project)}
        </div>
        <div class="project-summary${project.mobileSummary || project.mobileIntent ? ' project-summary--has-mobile-copy' : ''}" data-number="${project.number}">
          <p class="eyebrow">${project.number} · ${category.label}</p>
          <h3>${project.title}</h3>
          ${project.subtitle ? `<p class="project-subtitle">${project.subtitle}</p>` : ''}
          <p class="project-summary-text">${project.summary}</p>
          ${project.mobileSummary ? `<p class="project-summary-text project-summary-text--mobile">${project.mobileSummary}</p>` : ''}
          <p class="project-intent"><strong>DESIGN INTENT</strong>${project.intent}</p>
          ${project.mobileIntent ? `<p class="project-intent project-intent--mobile"><strong>DESIGN INTENT</strong>${project.mobileIntent}</p>` : ''}
          <dl class="project-facts">
            <div><dt>TYPE</dt><dd>${project.detailType}</dd></div>
            ${project.focus ? `<div><dt>FOCUS</dt><dd>${project.focus}</dd></div>` : ''}
            ${project.scope ? `<div><dt>SCOPE</dt><dd>${project.scope}</dd></div>` : ''}
            ${project.role ? `<div><dt>ROLE</dt><dd>${project.role}</dd></div>` : ''}
          </dl>
          <!-- TOOLS는 모바일에서 아코디언 안으로 통째로 옮겨야 하므로 별도 dl로 분리했습니다.
               데스크톱에서는 위 목록에 이어 붙어 기존과 동일한 한 덩어리로 보입니다. -->
          <dl class="project-facts project-facts--tools">
            <div><dt>TOOLS</dt><dd>${projectProgramLogos(project)}</dd></div>
          </dl>
          <div class="project-actions">
            ${projectActions.length
              ? projectActions.map(({ label, url }) => `<a class="text-link" href="${url}" ${externalAttrs}>${label}</a>`).join('')
              : `<button class="text-link" type="button" aria-disabled="true">View Project</button>`}
            ${projectCardConfig.showProcessButton && project.sections?.length
              ? `<button class="text-link project-process-trigger" type="button" data-project-id="${project.id}">작업 과정</button>`
              : ''}
          </div>
          <!-- 모바일 전용 아코디언. 데스크톱에서는 버튼이 hidden이고 DESIGN INTENT·TOOLS는
               위쪽 원래 자리에 그대로 남습니다(setupProjectInfoAccordion). -->
          <button class="project-info-toggle" type="button" aria-expanded="false" aria-controls="project-info-${project.id}" hidden>
            <span class="project-info-toggle-text">프로젝트 정보 보기</span>
            <span class="project-info-toggle-icon" aria-hidden="true"></span>
          </button>
          <div class="project-info-panel" id="project-info-${project.id}" hidden>
            
          </div>
        </div>
      </div>
    </article>`;
};

export function renderProjects(target, projects, categories) {
  const groups = categories
    .map((category) => ({ category, items: projects.filter((project) => project.category === category.id) }))
    .filter((group) => group.items.length);

  target.innerHTML = groups.map(({ category, items }, categoryIndex) => {
    const cardsMarkup = items.map((project, localIndex) => renderProjectCard(project, category, localIndex, localIndex === 0)).join('');
    const navMarkup = items.map((project, localIndex) => `
      <button type="button" class="project-category-nav-item${localIndex === 0 ? ' is-active' : ''}" data-project-index="${localIndex}" aria-current="${localIndex === 0 ? 'true' : 'false'}">
        <span class="project-category-nav-number">${String(localIndex + 1).padStart(2, '0')}</span>
        <span class="project-category-nav-name">${project.title}</span>
      </button>`).join('<span class="project-category-nav-sep" aria-hidden="true">/</span>');

    return `
      <section class="project-category" data-category="${category.id}" aria-label="${category.label} 프로젝트" style="--category-index:${categoryIndex};--project-category-current:0"${categoryIndex === 0 ? ' data-current' : ''}>
        <h3 class="project-category-title" aria-hidden="true">${category.label}</h3>
        <div class="project-category-viewport">
          ${cardsMarkup}
        </div>
        ${items.length > 1 ? `<div class="project-category-controls"><button type="button" class="project-category-arrow project-category-arrow-prev" aria-label="이전 프로젝트" disabled></button><nav class="project-category-nav" aria-label="작품 전환">${navMarkup}</nav><span class="project-category-compact-count">01 / ${String(items.length).padStart(2,'0')}</span><button type="button" class="project-category-arrow project-category-arrow-next" aria-label="다음 프로젝트"></button></div>` : ''}

      </section>`;
  }).join('');
}

// =========================================================
// 모바일(≤767px) 프로젝트 영역 = 일반 세로 카드 목록
// 데스크톱/태블릿의 슬라이더(카드 가로 전환 + 카테고리 세로 전환 + 스크롤 핀)는 그대로 두고,
// 모바일에서만 아래 헬퍼로 전환 로직을 무력화한 뒤 모든 카드를 문서 흐름에 노출합니다.
// =========================================================
export const PROJECTS_MOBILE_QUERY = '(max-width: 767px)';
export const isProjectsMobile = () => window.matchMedia(PROJECTS_MOBILE_QUERY).matches;

// 모바일에서는 "현재 카드 하나만 보이는" 상태 속성(data-current/aria-hidden/inert)을 모두 풀어
// 전 프로젝트가 스크린리더와 키보드에도 정상 노출되게 합니다.
export function applyProjectCardsMobileState() {
  // 독립 Works 상세 페이지는 모바일에서도 PC의 현재 프로젝트 상태를 유지합니다.
  if(document.body.hasAttribute("data-mobile-pc-content"))return;
  const mobile = isProjectsMobile();
  document.querySelectorAll('.project-category').forEach((categoryEl) => {
    if (mobile) {
      categoryEl.setAttribute('aria-hidden', 'false');
      categoryEl.removeAttribute('inert');
      categoryEl.setAttribute('data-current', '');
    }
    categoryEl.querySelectorAll('.project-card').forEach((card) => {
      if (!mobile) return;
      card.setAttribute('aria-hidden', 'false');
      card.removeAttribute('inert');
      card.setAttribute('data-current', '');
    });
  });
}

// 모바일 카드 진입 시 가벼운 fade-up. 한 번 보이면 다시 숨기지 않으므로
// 위로 되돌아가도 프로젝트가 사라지지 않습니다. 축소 모션 환경에서는 즉시 표시합니다.
export function setupProjectCardReveal() {
  if (!isProjectsMobile()) return;
  const cards = [...document.querySelectorAll('.project-card')];
  if (!cards.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    cards.forEach((card) => card.classList.add('is-revealed'));
    return;
  }

  // fade-up은 어디까지나 장식이므로, 어떤 이유로든 리빌이 동작하지 않아도
  // 콘텐츠가 보이지 않는 상태로 남지 않는 것을 우선합니다.
  // 1) 처음부터 화면에 들어와 있는 카드는 아예 숨기지 않습니다.
  // 2) 스크롤 시점의 실제 좌표로 노출합니다(한 번 보이면 다시 숨기지 않음).
  // 3) 스크롤 이벤트가 오지 않는 환경(프레임 정지 등)을 대비해 안전 타이머로 전부 노출합니다.
  const inView = (card) => {
    const rect = card.getBoundingClientRect();
    return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
  };

  cards.forEach((card) => {
    card.classList.add('has-reveal');
    if (inView(card)) card.classList.add('is-revealed');
  });

  const cleanup = () => {
    window.removeEventListener('scroll', revealVisible);
    window.removeEventListener('resize', revealVisible);
    window.clearTimeout(safetyTimer);
  };

  function revealVisible() {
    let remaining = false;
    cards.forEach((card) => {
      if (card.classList.contains('is-revealed')) return;
      if (inView(card)) card.classList.add('is-revealed');
      else remaining = true;
    });
    if (!remaining) cleanup();
  }

  const safetyTimer = window.setTimeout(() => {
    cards.forEach((card) => card.classList.add('is-revealed'));
    cleanup();
  }, 2500);

  window.addEventListener('scroll', revealVisible, { passive: true });
  window.addEventListener('resize', revealVisible, { passive: true });
}

// "프로젝트 정보 보기" 아코디언(모바일 전용).
// DESIGN INTENT / TOOLS / SCOPE는 데스크톱 레이아웃에 필요한 위치에 렌더링해 두고,
// 모바일에서만 패널 안으로 옮깁니다(원래 위치를 기억해 데스크톱 복귀 시 되돌립니다).
export function setupProjectInfoAccordion() {
  const groups = [...document.querySelectorAll('.project-summary')].map((summary) => {
    const panel = summary.querySelector('.project-info-panel');
    const toggle = summary.querySelector('.project-info-toggle');
    if (!panel || !toggle) return null;
    const movable = [...summary.querySelectorAll('.project-intent, .project-facts--tools')]
      .map((el) => ({ el, parent: el.parentElement, next: el.nextElementSibling }));
    return { panel, toggle, movable };
  }).filter(Boolean);
  if (!groups.length) return;

  const setOpen = (toggle, panel, open) => {
    toggle.setAttribute('aria-expanded', String(open));
    panel.hidden = !open;
    const label = toggle.querySelector('.project-info-toggle-text');
    if (label) label.textContent = open ? '프로젝트 정보 접기' : '프로젝트 정보 보기';
  };

  const applyLayout = () => {
    const mobile = isProjectsMobile()&&!document.body.hasAttribute("data-mobile-pc-content");
    groups.forEach(({ panel, toggle, movable }) => {
      if (mobile) {
        movable.forEach(({ el }) => {
          if (el.parentElement !== panel) panel.appendChild(el);
        });
      } else {
        // 복귀는 문서 역순으로 처리합니다. 앞 요소의 기준점(next)이 뒤 요소인 경우가 있어
        // 정순으로 되돌리면 기준점이 아직 패널에 남아 있어 insertBefore가 실패합니다.
        [...movable].reverse().forEach(({ el, parent, next }) => {
          if (el.parentElement === parent) return;
          if (next && next.parentElement === parent) parent.insertBefore(el, next);
          else parent.appendChild(el);
        });
      }
      toggle.hidden = !mobile;
      // 데스크톱에서는 패널이 빈 껍데기이므로 항상 닫아 둡니다(내용은 원래 자리로 복귀).
      setOpen(toggle, panel, false);
    });
  };

  groups.forEach(({ panel, toggle }) => {
    toggle.addEventListener('click', () => {
      setOpen(toggle, panel, toggle.getAttribute('aria-expanded') !== 'true');
    });
  });

  applyLayout();
  window.matchMedia(PROJECTS_MOBILE_QUERY).addEventListener('change', applyLayout);
}

export function setupProjectCategoryCarousels() {
  const controllers = [];

  document.querySelectorAll('.project-category').forEach((categoryEl) => {
    const cards = [...categoryEl.querySelectorAll('.project-card')];
    if (cards.length < 2) {
      controllers.push({ el: categoryEl, cards, getIndex: () => 0, goTo: () => {} });
      return;
    }

    const prevButton = categoryEl.querySelector('.project-category-arrow-prev');
    const nextButton = categoryEl.querySelector('.project-category-arrow-next');
    const navButtons = [...categoryEl.querySelectorAll('.project-category-nav-item')];
    const compactCountEl = categoryEl.querySelector('.project-category-compact-count');
    let currentIndex = 0;
    let touchStartX = 0;
    let touchStartY = 0;

    const goTo = (nextIndex) => {
      // 기본 렌더러의 모바일 목록은 유지하며 독립 Works 상세 페이지에서는 전환합니다.
      if (isProjectsMobile()&&!document.body.hasAttribute("data-mobile-pc-content")) return;
      currentIndex = Math.min(cards.length - 1, Math.max(0, nextIndex));
      categoryEl.style.setProperty('--project-category-current', String(currentIndex));
      cards.forEach((card, index) => {
        const isCurrent = index === currentIndex;
        card.toggleAttribute('data-current', isCurrent);
        card.setAttribute('aria-hidden', String(!isCurrent));
        card.toggleAttribute('inert', !isCurrent);
        card.scrollTop = 0;
      });
      navButtons.forEach((button, index) => {
        const isCurrent = index === currentIndex;
        button.classList.toggle('is-active', isCurrent);
        button.setAttribute('aria-current', String(isCurrent));
      });
      if (prevButton) prevButton.disabled = currentIndex === 0;
      if (nextButton) nextButton.disabled = currentIndex === cards.length - 1;
      if (compactCountEl) compactCountEl.textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    };

    prevButton?.addEventListener('click', () => goTo(currentIndex - 1));
    nextButton?.addEventListener('click', () => goTo(currentIndex + 1));
    navButtons.forEach((button) => {
      button.addEventListener('click', () => goTo(Number(button.dataset.projectIndex)));
    });

    // 독립 Works 상세 페이지는 모바일에서도 같은 프로젝트를 좌우 스와이프로 전환합니다.
    // 기본 렌더러의 기존 모바일 세로 목록 동작은 유지합니다.
    const viewport = categoryEl.querySelector('.project-category-viewport');
    viewport?.addEventListener('touchstart', (event) => {
      touchStartX = event.touches[0]?.clientX ?? 0;
      touchStartY = event.touches[0]?.clientY ?? 0;
    }, { passive: true });
    viewport?.addEventListener('touchend', (event) => {
      if (isProjectsMobile()&&!document.body.hasAttribute("data-mobile-pc-content")) return;
      const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX;
      const touchEndY = event.changedTouches[0]?.clientY ?? touchStartY;
      const deltaX = touchStartX - touchEndX;
      const deltaY = touchStartY - touchEndY;
      if (Math.abs(deltaX) <= Math.abs(deltaY) || Math.abs(deltaX) < 40) return;
      if (deltaX > 0) goTo(currentIndex + 1);
      else goTo(currentIndex - 1);
    }, { passive: true });

    goTo(0);
    controllers.push({ el: categoryEl, cards, getIndex: () => currentIndex, goTo });
  });

  return controllers;
}


export function mountShowcase(parent,items){const section=document.createElement('section');section.className='works-showcase projects';section.setAttribute('aria-label','작품 쇼케이스');const target=document.createElement('div');target.className='project-list';section.append(target);parent.append(section);renderProjects(target,items,[{id:'placeholder',label:'WEB DESIGN'}]);setupProjectCategoryCarousels();applyProjectCardsMobileState();setupProjectInfoAccordion();setupProjectCardReveal();if(items[0]?.subtitle){const fit=()=>{const card=section.querySelector('.project-card[data-current]');if(!isProjectsMobile()&&card?.querySelector('.project-subtitle'))section.style.height=Math.max(innerHeight,card.querySelector('.project-card-inner').offsetHeight)+'px';else section.style.removeProperty('height');};const resize=new ResizeObserver(fit);section.querySelectorAll('.project-card-inner').forEach(n=>resize.observe(n));new MutationObserver(fit).observe(target,{subtree:true,attributes:true,attributeFilter:['data-current']});fit();}window.matchMedia(PROJECTS_MOBILE_QUERY).addEventListener('change',()=>{applyProjectCardsMobileState();if(!isProjectsMobile())section.querySelectorAll('.project-category-nav-item.is-active').forEach(b=>b.click());});}

