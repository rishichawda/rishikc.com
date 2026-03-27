/**
 * Easter Eggs — discoverable delights tucked into natural interactions.
 * Rules: additive only, no external libs, respect prefers-reduced-motion, lightweight.
 */

const REDUCED_MOTION = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ─────────────────────────────────────────────────
 * Tier 1 #3: Article Completion Celebration
 * Trigger: Reading progress hits 100% on articles ≥ 8 min
 * Effect: CSS confetti dots + "🎉 You made it!" text
 * ───────────────────────────────────────────────── */
function initArticleCelebration(): void {
  const bar = document.getElementById('reading-progress-bar');
  if (!bar) return;

  // Parse reading time from the meta — looks for "X min read"
  const metaEl = document.querySelector('.article-meta');
  if (!metaEl) return;
  const metaText = metaEl.textContent || '';
  const match = metaText.match(/(\d+)\s*min/);
  if (!match || parseInt(match[1], 10) < 8) return;

  let celebrated = false;

  const observer = new MutationObserver(() => {
    if (celebrated) return;
    const value = parseInt(bar.getAttribute('aria-valuenow') || '0', 10);
    if (value >= 98) {
      celebrated = true;
      observer.disconnect();
      showCelebration();
    }
  });

  observer.observe(bar, { attributes: true, attributeFilter: ['aria-valuenow'] });
}

function showCelebration(): void {
  const articleBody = document.getElementById('article-body');
  if (!articleBody) return;

  // Create celebration container
  const container = document.createElement('div');
  container.className = 'article-celebration';
  container.setAttribute('aria-live', 'polite');

  // "You made it!" text
  const text = document.createElement('p');
  text.className = 'celebration-text';
  text.textContent = '🎉 You made it!';
  container.appendChild(text);

  // Confetti dots (CSS-only animation)
  if (!REDUCED_MOTION) {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'celebration-confetti';
    confettiContainer.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 12; i++) {
      const dot = document.createElement('span');
      dot.className = 'confetti-dot';
      dot.style.setProperty('--i', String(i));
      confettiContainer.appendChild(dot);
    }
    container.appendChild(confettiContainer);
  }

  articleBody.insertAdjacentElement('afterend', container);

  // Fade out after 3s
  setTimeout(() => {
    container.style.opacity = '0';
    setTimeout(() => container.remove(), 500);
  }, 3000);
}

/* ─────────────────────────────────────────────────
 * Tier 2 #4: Logo Click Sequence
 * Trigger: Click logo 5 times rapidly
 * Effect: 360° spin + tooltip
 * ───────────────────────────────────────────────── */
function initLogoClickSequence(): void {
  const logo = document.querySelector<HTMLElement>('.nav-logo');
  if (!logo) return;

  let clickCount = 0;
  let resetTimer: number;

  logo.addEventListener('click', (e) => {
    clickCount++;
    clearTimeout(resetTimer);
    resetTimer = window.setTimeout(() => { clickCount = 0; }, 1200);

    if (clickCount >= 5) {
      e.preventDefault();
      clickCount = 0;

      // Spin animation
      logo.style.transition = 'transform 800ms cubic-bezier(0.34, 1.56, 0.64, 1)';
      logo.style.transform = 'rotate(360deg)';

      setTimeout(() => {
        logo.style.transition = 'transform 400ms ease';
        logo.style.transform = '';
      }, 900);

      // Tooltip
      const tooltip = document.createElement('span');
      tooltip.className = 'logo-easter-tooltip';
      tooltip.textContent = 'You found something! 🎉';
      tooltip.setAttribute('role', 'status');
      logo.style.position = 'relative';
      logo.appendChild(tooltip);

      setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => tooltip.remove(), 300);
      }, 2000);
    }
  });
}

/* ─────────────────────────────────────────────────
 * Tier 2 #5: Console Greeting
 * Trigger: Opening the browser console
 * Effect: Styled ASCII art + message
 * ───────────────────────────────────────────────── */
function initConsoleGreeting(): void {
  const styles = [
    'color: #9aa7d7; font-size: 14px; font-weight: bold; line-height: 1.4;',
    'color: #6b7280; font-size: 12px; line-height: 1.6;',
    'color: #9aa7d7; font-size: 11px;',
  ];

  console.log(
    '%c✦ rishikc.com %c\n\nHey, curious one! 👀\nLooking under the hood? I respect that.\n\n%cSource → github.com/rishichawda/rishikc.com\n— Rishi',
    styles[0],
    styles[1],
    styles[2],
  );
}

/* ─────────────────────────────────────────────────
 * Tier 2 #6: "I'm Feeling Curious" in Search
 * Trigger: Submit empty search or click ghost text
 * Effect: Navigate to random content page
 * ───────────────────────────────────────────────── */
function initFeelingCurious(): void {
  const form = document.getElementById('search-form') as HTMLFormElement | null;
  const input = document.getElementById('search-input') as HTMLInputElement | null;
  if (!form || !input) return;

  // Add ghost text below input
  const ghost = document.createElement('button');
  ghost.type = 'button';
  ghost.className = 'feeling-curious-btn';
  ghost.textContent = "I'm feeling curious";
  form.insertAdjacentElement('afterend', ghost);

  const navigateRandom = () => {
    // Pick from known content paths
    const paths = [
      '/articles/', '/bits/', '/gallery/', '/reads/',
    ];
    const randomPath = paths[Math.floor(Math.random() * paths.length)];

    // Show toast
    showToast('Here\'s something interesting...');
    setTimeout(() => {
      window.location.href = randomPath;
    }, 600);
  };

  ghost.addEventListener('click', navigateRandom);

  // Intercept empty form submit
  form.addEventListener('submit', (e) => {
    if (input.value.trim() === '') {
      e.preventDefault();
      navigateRandom();
    }
  }, true); // capture phase so it fires before search handler
}

/* ─────────────────────────────────────────────────
 * Tier 3 #7: Konami Code
 * Trigger: ↑ ↑ ↓ ↓ ← → ← → B A
 * Effect: Brief color invert + CSS confetti + toast
 * ───────────────────────────────────────────────── */
function initKonamiCode(): void {
  const sequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a',
  ];
  let position = 0;

  document.addEventListener('keydown', (e) => {
    // Don't capture if user is typing in input
    if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

    const expected = sequence[position];
    if (e.key === expected || e.key.toLowerCase() === expected) {
      position++;
      if (position === sequence.length) {
        position = 0;
        triggerKonami();
      }
    } else {
      position = 0;
    }
  });
}

function triggerKonami(): void {
  // Brief invert
  document.documentElement.style.filter = 'invert(1)';
  setTimeout(() => {
    document.documentElement.style.filter = '';
  }, 500);

  // CSS confetti
  if (!REDUCED_MOTION) {
    const confetti = document.createElement('div');
    confetti.className = 'konami-confetti';
    confetti.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('span');
      piece.className = 'konami-piece';
      piece.style.setProperty('--x', String(Math.random()));
      piece.style.setProperty('--delay', `${Math.random() * 0.5}s`);
      piece.style.setProperty('--color', ['#9aa7d7', '#e2e8f0', '#f59e0b', '#10b981', '#ef4444'][Math.floor(Math.random() * 5)]);
      confetti.appendChild(piece);
    }
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2500);
  }

  showToast('Achievement unlocked: Retro Gamer 🕹️');
}

/* ─────────────────────────────────────────────────
 * Tier 3 #9: Highlight-to-Share
 * Trigger: Selecting text in article body
 * Effect: Floating toolbar with Share/Copy
 * ───────────────────────────────────────────────── */
function initHighlightShare(): void {
  const articleBody = document.querySelector('.prose');
  if (!articleBody) return;

  let toolbar: HTMLElement | null = null;

  const removeToolbar = () => {
    if (toolbar) {
      toolbar.remove();
      toolbar = null;
    }
  };

  document.addEventListener('selectionchange', () => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed || !selection.toString().trim()) {
      removeToolbar();
      return;
    }

    // Only trigger for selections within article body
    const anchor = selection.anchorNode;
    if (!anchor || !articleBody.contains(anchor)) {
      removeToolbar();
      return;
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    if (!toolbar) {
      toolbar = document.createElement('div');
      toolbar.className = 'highlight-toolbar';
      toolbar.setAttribute('role', 'toolbar');
      toolbar.setAttribute('aria-label', 'Selection actions');
      document.body.appendChild(toolbar);
    }

    const selectedText = selection.toString().trim();

    toolbar.innerHTML = '';

    // Copy button
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'ht-btn';
    copyBtn.setAttribute('aria-label', 'Copy selected text');
    copyBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg><span>Copy</span>';
    copyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(selectedText);
      copyBtn.querySelector('span')!.textContent = 'Copied!';
      setTimeout(removeToolbar, 1000);
    });
    toolbar.appendChild(copyBtn);

    // Share button (only if Web Share API available)
    if (navigator.share) {
      const shareBtn = document.createElement('button');
      shareBtn.type = 'button';
      shareBtn.className = 'ht-btn';
      shareBtn.setAttribute('aria-label', 'Share selected text');
      shareBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg><span>Share</span>';
      shareBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navigator.share({
          title: document.title,
          text: `"${selectedText}" — ${document.title}`,
          url: window.location.href,
        }).catch(() => {});
        removeToolbar();
      });
      toolbar.appendChild(shareBtn);
    }

    // Position toolbar above selection
    const top = rect.top + window.scrollY - toolbar.offsetHeight - 8;
    const left = rect.left + window.scrollX + rect.width / 2;
    toolbar.style.top = `${Math.max(0, top)}px`;
    toolbar.style.left = `${left}px`;
    toolbar.style.transform = 'translateX(-50%)';
  });

  // Clean up on click outside
  document.addEventListener('mousedown', (e) => {
    if (toolbar && !toolbar.contains(e.target as Node)) {
      // Let selection clear naturally, toolbar removed by selectionchange
    }
  });
}

/* ─────────────────────────────────────────────────
 * Toast utility
 * ───────────────────────────────────────────────── */
function showToast(message: string): void {
  const existing = document.querySelector('.ee-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'ee-toast';
  toast.setAttribute('role', 'status');
  toast.setAttribute('aria-live', 'polite');
  toast.textContent = message;
  document.body.appendChild(toast);

  // Force reflow then show
  toast.offsetHeight;
  toast.classList.add('visible');

  setTimeout(() => {
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ─────────────────────────────────────────────────
 * Initialize all easter eggs
 * ───────────────────────────────────────────────── */
let consoleGreetingDone = false;

export function initEasterEggs(): void {
  // Console greeting — once per session
  if (!consoleGreetingDone) {
    initConsoleGreeting();
    consoleGreetingDone = true;
  }

  // Per-page initializations
  initArticleCelebration();
  initLogoClickSequence();
  initKonamiCode();
  initFeelingCurious();
  initHighlightShare();
}
