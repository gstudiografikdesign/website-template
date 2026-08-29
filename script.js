(() => {
  'use strict';

  /* ---------------------------------------------------------------------
     Header: elevate on scroll
  --------------------------------------------------------------------- */
  const header = document.getElementById('site-header');
  const onHeaderScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  onHeaderScroll();
  window.addEventListener('scroll', onHeaderScroll, { passive: true });

  /* ---------------------------------------------------------------------
     Mobile nav toggle
  --------------------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  const closeMobileNav = () => {
    mobileNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMobileNav));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMobileNav(); });

  /* ---------------------------------------------------------------------
     Scroll-reveal animation (mirrors reference: fade + blur + translateY)
     Add data-animate to any element. Optional:
       data-animate="blur" | "scale"   -> starting style variant
       data-delay="150"                -> ms delay before revealing
       data-once="false"               -> re-animate every time it (re)enters view
  --------------------------------------------------------------------- */
  const animatedEls = document.querySelectorAll('[data-animate]');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      const once = el.dataset.once !== 'false';

      if (entry.isIntersecting) {
        const delay = parseInt(el.dataset.delay || '0', 10);
        window.setTimeout(() => el.classList.add('is-visible'), delay);
        if (once) revealObserver.unobserve(el);
      } else if (!once) {
        el.classList.remove('is-visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  animatedEls.forEach(el => revealObserver.observe(el));

  /* ---------------------------------------------------------------------
     Integrations section: scroll-pinned parallax logo reveal.
     The section is 300vh tall with a sticky 100vh viewport inside it.
     As the user scrolls through that 300vh, each logo fades/scales in
     once the scroll progress passes its own threshold.

     EDIT: adjust positions (x/y in %) and thresholds (0..1) per logo,
     or add/remove entries — the DOM nodes are created to match this array.
  --------------------------------------------------------------------- */
  const INTEGRATION_LOGOS = [
    { x: 15, y: 18, threshold: 0.15, label: 'A' },
    { x: 85, y: 18, threshold: 0.30, label: 'B' },
    { x: 15, y: 78, threshold: 0.45, label: 'C' },
    { x: 50, y: 85, threshold: 0.60, label: 'D' },
    { x: 85, y: 78, threshold: 0.75, label: 'E' },
  ];
  const INTEGRATION_LOGOS_MOBILE = [
    { x: 20, y: 15 }, { x: 80, y: 15 }, { x: 20, y: 70 }, { x: 50, y: 75 }, { x: 80, y: 70 },
  ];

  const integrationsSection = document.getElementById('integrations');
  const logoEls = Array.from(document.querySelectorAll('#integrations-logos .integrations__logo'));

  const layoutIntegrationLogos = () => {
    const isMobile = window.innerWidth < 768;
    const positions = isMobile ? INTEGRATION_LOGOS_MOBILE : INTEGRATION_LOGOS;
    logoEls.forEach((el, i) => {
      const pos = positions[i] || positions[positions.length - 1];
      el.style.left = pos.x + '%';
      el.style.top = pos.y + '%';
    });
  };
  layoutIntegrationLogos();
  window.addEventListener('resize', layoutIntegrationLogos);

  if (integrationsSection && logoEls.length) {
    let ticking = false;

    const updateIntegrations = () => {
      ticking = false;
      const rect = integrationsSection.getBoundingClientRect();
      const total = rect.height - window.innerHeight; // scrollable distance while pinned
      if (total <= 0) return;

      // 0 at section start, 1 once fully scrolled through
      let progress = (-rect.top) / total;
      progress = Math.min(1, Math.max(0, progress));

      logoEls.forEach((el, i) => {
        const threshold = INTEGRATION_LOGOS[i]?.threshold ?? 0;
        const start = Math.max(0, threshold - 0.15);
        let local = (progress - start) / (threshold - start || 1);
        local = Math.min(1, Math.max(0, local));
        el.style.opacity = String(local);
        el.style.transform = `translate(-50%, -50%) scale(${0.8 + local * 0.2})`;
      });
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateIntegrations);
        ticking = true;
      }
    }, { passive: true });

    window.addEventListener('resize', updateIntegrations);
    updateIntegrations();
  }

  /* ---------------------------------------------------------------------
     Newsletter form (front-end only placeholder — wire up to your
     backend / email provider before going live)
  --------------------------------------------------------------------- */
  const newsletterForm = document.getElementById('newsletter-form');
  const newsletterMsg = document.getElementById('newsletter-msg');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      newsletterMsg.classList.add('is-visible');
      newsletterForm.reset();
    });
  }

  /* ---------------------------------------------------------------------
     Footer year
  --------------------------------------------------------------------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
