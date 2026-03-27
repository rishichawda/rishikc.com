/**
 * Spatial tooltips — tooltips that enter from the cursor's direction.
 * Add [data-spatial-tooltip="Tooltip text"] to any element.
 */

let initialized = false;
let tooltipEl: HTMLElement | null = null;
let showTimeout: number | null = null;

function getEntryDirection(el: HTMLElement, e: MouseEvent): 'top' | 'bottom' | 'left' | 'right' {
  const rect = el.getBoundingClientRect();
  const x = e.clientX - rect.left - rect.width / 2;
  const y = e.clientY - rect.top - rect.height / 2;
  // Compare absolute distances to determine closest edge
  if (Math.abs(x) > Math.abs(y)) {
    return x > 0 ? 'right' : 'left';
  }
  return y > 0 ? 'bottom' : 'top';
}

function getTransform(dir: 'top' | 'bottom' | 'left' | 'right', initial: boolean): string {
  const d = initial ? 10 : 0;
  switch (dir) {
    case 'top':    return `translateY(${initial ? -d : 0}px)`;
    case 'bottom': return `translateY(${initial ? d : 0}px)`;
    case 'left':   return `translateX(${initial ? -d : 0}px)`;
    case 'right':  return `translateX(${initial ? d : 0}px)`;
  }
}

function ensureTooltipEl(): HTMLElement {
  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.className = 'spatial-tooltip';
    tooltipEl.setAttribute('role', 'tooltip');
    tooltipEl.setAttribute('aria-hidden', 'true');
    document.body.appendChild(tooltipEl);
  }
  return tooltipEl;
}

function showTooltip(el: HTMLElement, e: MouseEvent) {
  const text = el.getAttribute('data-spatial-tooltip');
  if (!text) return;

  const dir = getEntryDirection(el, e);
  const tip = ensureTooltipEl();
  tip.textContent = text;
  tip.style.opacity = '0';
  tip.style.transform = getTransform(dir, true);
  tip.style.display = 'block';

  // Position above the element
  const rect = el.getBoundingClientRect();
  const tipRect = tip.getBoundingClientRect();
  let top = rect.top - tipRect.height - 8 + window.scrollY;
  let left = rect.left + rect.width / 2 - tipRect.width / 2;

  // Keep within viewport
  left = Math.max(8, Math.min(left, window.innerWidth - tipRect.width - 8));
  if (top < window.scrollY + 8) {
    top = rect.bottom + 8 + window.scrollY;
  }

  tip.style.top = `${top}px`;
  tip.style.left = `${left}px`;

  requestAnimationFrame(() => {
    tip.style.opacity = '1';
    tip.style.transform = getTransform(dir, false);
  });
}

function hideTooltip() {
  if (showTimeout) {
    clearTimeout(showTimeout);
    showTimeout = null;
  }
  if (tooltipEl) {
    tooltipEl.style.opacity = '0';
    setTimeout(() => {
      if (tooltipEl) tooltipEl.style.display = 'none';
    }, 200);
  }
}

export function initSpatialTooltips() {
  if (initialized) return;
  initialized = true;

  // Inject minimal styles
  if (!document.getElementById('spatial-tooltip-styles')) {
    const style = document.createElement('style');
    style.id = 'spatial-tooltip-styles';
    style.textContent = `
      .spatial-tooltip {
        position: absolute;
        z-index: 90;
        display: none;
        padding: 6px 12px;
        font-family: var(--font-mono);
        font-size: 12px;
        color: var(--color-bg);
        background: var(--color-text);
        border-radius: 6px;
        pointer-events: none;
        white-space: nowrap;
        transition: opacity 200ms ease, transform 200ms ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      }
    `;
    document.head.appendChild(style);
  }

  document.addEventListener('mouseenter', (e) => {
    const target = (e.target as HTMLElement).closest?.('[data-spatial-tooltip]') as HTMLElement | null;
    if (!target) return;
    showTimeout = window.setTimeout(() => showTooltip(target, e), 300);
  }, true);

  document.addEventListener('mouseleave', (e) => {
    const target = (e.target as HTMLElement).closest?.('[data-spatial-tooltip]') as HTMLElement | null;
    if (target) hideTooltip();
  }, true);
}
