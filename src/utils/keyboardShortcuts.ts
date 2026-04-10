// Global keyboard shortcuts
// vim-style navigation with two-key sequences

const shortcuts: Record<string, () => void> = {
  t: () => {
    const toggle = document.querySelector<HTMLElement>('[data-theme-toggle]');
    toggle?.click();
  },
  h: () => window.location.assign('/'),
  '?': () => {
    document.dispatchEvent(new CustomEvent('toggle-shortcuts-modal'));
  },
  j: () => scrollToAdjacentSection('next'),
  k: () => scrollToAdjacentSection('prev'),
  arrowleft: () => navigateArticle('prev'),
  arrowright: () => navigateArticle('next'),
};

const twoKeyShortcuts: Record<string, Record<string, () => void>> = {
  g: {
    a: () => window.location.assign('/articles/'),
    p: () => window.location.assign('/projects/'),
    g: () => window.location.assign('/gallery/'),
    c: () => window.location.assign('/contact/'),
    b: () => window.location.assign('/bits/'),
    q: () => window.location.assign('/reads/'),
  },
};

/** Scroll to the next or previous heading section on the page */
function scrollToAdjacentSection(direction: 'next' | 'prev') {
  const headings = Array.from(document.querySelectorAll<HTMLElement>('h2[id], h3[id]'));
  if (!headings.length) return;

  const scrollY = window.scrollY;
  const offset = 100; // account for sticky header

  if (direction === 'next') {
    const next = headings.find(h => h.getBoundingClientRect().top > offset + 10);
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    const prev = [...headings].reverse().find(h => h.getBoundingClientRect().top < offset - 10);
    if (prev) prev.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Navigate to prev/next article using rel links or data attributes */
function navigateArticle(direction: 'prev' | 'next') {
  // Only activate on article pages
  if (!document.querySelector('.article-layout')) return;

  const link = document.querySelector<HTMLAnchorElement>(
    `a[data-article-${direction}], link[rel="${direction}"]`
  );
  if (link?.href) window.location.assign(link.href);
}

let pendingPrefix: string | null = null;
let prefixTimeout: number | null = null;

function handleKeydown(e: KeyboardEvent) {
  const tag = (e.target as HTMLElement).tagName;
  if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;
  if ((e.target as HTMLElement).isContentEditable) return;

  // Cmd+K / Ctrl+K for search (needs meta/ctrl check before we bail)
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault();
    document.dispatchEvent(new CustomEvent('open-search'));
    window.location.assign('/search/');
  }

  if (e.metaKey || e.ctrlKey || e.altKey) return;

  // Use e.key directly for special keys (?, ArrowLeft, ArrowRight), lowercase for letters
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key.toLowerCase();

  // Two-key sequences
  if (pendingPrefix && twoKeyShortcuts[pendingPrefix]?.[key]) {
    e.preventDefault();
    twoKeyShortcuts[pendingPrefix][key]();
    pendingPrefix = null;
    if (prefixTimeout) clearTimeout(prefixTimeout);
    return;
  }

  // Start two-key sequence
  if (twoKeyShortcuts[key]) {
    pendingPrefix = key;
    prefixTimeout = window.setTimeout(() => {
      pendingPrefix = null;
    }, 500);
    return;
  }

  // Single-key shortcuts
  if (shortcuts[key]) {
    e.preventDefault();
    shortcuts[key]();
  }
}

let initialized = false;

function showFirstUseTip() {
  if (localStorage.getItem('kb-shortcuts-tip-shown')) return;
  localStorage.setItem('kb-shortcuts-tip-shown', '1');

  const toast = document.createElement('div');
  toast.className = 'kb-tip-toast';
  toast.textContent = 'Tip: Press ⌘K to search or ? for all shortcuts.';
  toast.setAttribute('role', 'status');
  document.body.appendChild(toast);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    // Skip animations — show immediately, then remove after delay
    toast.classList.add('visible');
    setTimeout(() => {
      toast.remove();
    }, 4000);
  } else {
    // Force reflow then animate in
    requestAnimationFrame(() => { toast.classList.add('visible'); });
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

function injectTipStyles() {
  if (document.getElementById('kb-tip-styles')) return;
  const style = document.createElement('style');
  style.id = 'kb-tip-styles';
  style.textContent = `
    .kb-tip-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(10px);
      background: var(--color-surface);
      color: var(--color-text-secondary);
      font-family: var(--font-ui);
      font-size: 13px;
      padding: 10px 20px;
      border-radius: 8px;
      border: 1px solid var(--color-border);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      opacity: 0;
      transition: opacity 300ms, transform 300ms;
      z-index: 9999;
      pointer-events: none;
    }
    .kb-tip-toast.visible {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    @media (prefers-reduced-motion: reduce) {
      .kb-tip-toast {
        transition: none;
        transform: translateX(-50%) translateY(0);
      }
      .kb-tip-toast.visible {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

export function initKeyboardShortcuts() {
  if (initialized) return;
  initialized = true;
  document.addEventListener('keydown', handleKeydown);
  injectTipStyles();

  // Show first-use tip after a short delay on first keypress
  const onFirstKey = () => {
    showFirstUseTip();
    document.removeEventListener('keydown', onFirstKey);
  };
  document.addEventListener('keydown', onFirstKey);
}
