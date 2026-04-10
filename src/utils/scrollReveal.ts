// Scroll-triggered animation utility
// Uses GSAP ScrollTrigger for performant scroll reveals
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Scroll velocity tracker — shortens animation duration for fast scrollers
let scrollVelocity = 0;
let lastScrollY = 0;
let lastScrollTime = 0;
let velocityRaf = 0;

function trackScrollVelocity() {
  const now = performance.now();
  const dt = now - lastScrollTime;
  if (dt > 0) {
    scrollVelocity = Math.abs(window.scrollY - lastScrollY) / dt * 1000; // px/s
  }
  lastScrollY = window.scrollY;
  lastScrollTime = now;
}

/** Returns a duration multiplier: 1.0 at rest, clamped down to 0.3 for fast scrolling */
function velocityDurationScale(): number {
  // > 2000 px/s is very fast scrolling → use 0.3x duration
  // < 500 px/s is normal → use 1.0x
  return Math.max(0.3, 1 - (scrollVelocity - 500) / 2500);
}

/** Disable all scroll reveals — show elements immediately */
function disableReveals() {
  ScrollTrigger.getAll().forEach(t => t.kill());
  cancelAnimationFrame(velocityRaf);
  gsap.killTweensOf('[data-reveal], [data-reveal-item], [data-reveal-heading]');
  gsap.set('[data-reveal]', { clearProps: 'all', opacity: 1, y: 0, x: 0, filter: 'blur(0px)' });
  gsap.set('[data-reveal-item]', { clearProps: 'all', opacity: 1, y: 0 });
  gsap.set('[data-reveal-heading]', { clearProps: 'all', opacity: 1, y: 0, clipPath: 'none' });
}

export function initScrollReveals() {
  // Listen for runtime changes to the reduced-motion preference
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  motionQuery.addEventListener('change', () => {
    if (motionQuery.matches) {
      disableReveals();
    } else {
      // Re-initialize reveals when user switches back to full motion
      initScrollReveals();
    }
  });

  if (prefersReducedMotion()) {
    gsap.set('[data-reveal]', { opacity: 1, y: 0, x: 0, filter: 'blur(0px)' });
    gsap.set('[data-reveal-item]', { opacity: 1, y: 0 });
    return;
  }

  // Kill existing ScrollTrigger instances to prevent duplicates on SPA nav
  ScrollTrigger.getAll().forEach(t => t.kill());
  cancelAnimationFrame(velocityRaf);

  // Start velocity tracking
  function tick() {
    trackScrollVelocity();
    velocityRaf = requestAnimationFrame(tick);
  }
  tick();

  const viewportH = window.innerHeight;

  // Position-based stagger: elements higher on the page animate sooner.
  // Delay is proportional to how far below the current viewport an element is.
  function positionDelay(el: Element): number {
    const top = el.getBoundingClientRect().top;
    // Elements in the viewport get near-zero delay;
    // elements further below get progressively longer delay, capped at 1s.
    return Math.min(1.0, Math.max(0, (top - viewportH * 0.5) / viewportH) * 0.25);
  }

  // Elements beyond this distance (in px) from the viewport still use
  // ScrollTrigger so very-long pages don't fire hundreds of tweens at once.
  const scrollTriggerThreshold = document.documentElement.scrollHeight;

  function useScrollTrigger(el: Element): boolean {
    return el.getBoundingClientRect().top > scrollTriggerThreshold;
  }

  // Basic fade-up reveal
  gsap.utils.toArray<Element>('[data-reveal]').forEach((el) => {
    const blur = el.getAttribute('data-reveal') === 'blur';
    const fromVars = {
      opacity: 0,
      y: 30,
      ...(blur ? { filter: 'blur(8px)' } : {}),
      duration: 0.6,
      ease: 'power2.out' as const,
    };

    if (useScrollTrigger(el)) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: (self) => {
            const scale = velocityDurationScale();
            if (self.animation) self.animation.duration(0.6 * scale);
          },
        },
        ...fromVars,
      });
    } else {
      gsap.from(el, { ...fromVars, delay: positionDelay(el) });
    }
  });

  // Staggered group reveal
  gsap.utils.toArray<Element>('[data-reveal-group]').forEach((group) => {
    const children = group.querySelectorAll('[data-reveal-item]');
    if (!children.length) return;
    const fromVars = {
      opacity: 0,
      y: 30,
      stagger: 0.06,
      duration: 0.5,
      ease: 'power2.out' as const,
    };

    if (useScrollTrigger(group)) {
      gsap.from(children, {
        scrollTrigger: {
          trigger: group,
          start: 'top 85%',
          once: true,
          onEnter: (self) => {
            const scale = velocityDurationScale();
            if (self.animation) self.animation.duration(0.5 * scale * children.length);
          },
        },
        ...fromVars,
      });
    } else {
      gsap.from(children, { ...fromVars, delay: positionDelay(group) });
    }
  });

  // Heading reveal (clip-path wipe-up)
  gsap.utils.toArray<Element>('[data-reveal-heading]').forEach((el) => {
    const fromVars = {
      opacity: 0,
      y: 20,
      clipPath: 'inset(0 0 100% 0)',
      duration: 0.7,
      ease: 'power2.out' as const,
    };

    if (useScrollTrigger(el)) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
          onEnter: (self) => {
            const scale = velocityDurationScale();
            if (self.animation) self.animation.duration(0.7 * scale);
          },
        },
        ...fromVars,
      });
    } else {
      gsap.from(el, { ...fromVars, delay: positionDelay(el) });
    }
  });
}
