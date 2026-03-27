// Magnetic hover effect utility
// Elements subtly attract toward the cursor when nearby
import gsap from 'gsap';

export function initMagneticElements() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const elements = document.querySelectorAll<HTMLElement>('[data-magnetic]');

  elements.forEach((el) => {
    const strength = parseFloat(el.dataset.magneticStrength || '6');
    const quickX = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power4.out' });
    const quickY = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power4.out' });

    el.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const maxDistance = 80;

      if (distance < maxDistance) {
        const factor = (1 - distance / maxDistance) * strength;
        quickX((dx * factor) / maxDistance);
        quickY((dy * factor) / maxDistance);
      }
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: 'back.out(1.7)' });
    });
  });
}
