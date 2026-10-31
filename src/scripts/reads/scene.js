// Reads: floating quote-card cluster. The page paints each card face to a 2D canvas (that is where the fonts are) and
// handles input; a worker renders them with three.js to an OffscreenCanvas, so the WebGL start-up and every frame stay off
// the main thread. Where that is unavailable the same renderer runs on the main thread.
import { drawCard, blurCanvas, fontsReady, setFonts, themeOf, look } from './cards.js';

// Card faces cross over as bitmaps that are already flipped and premultiplied, the way the renderer's textures want them.
var BITMAP = { imageOrientation: 'flipY', premultiplyAlpha: 'premultiply', colorSpaceConversion: 'none' };

function siteTheme() {
  return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
}

// Returns { post(msg, transfer), stop() }; messages from the renderer go to onMessage.
function openRenderer(canvas, onMessage) {
  if (typeof Worker !== 'undefined' && canvas.transferControlToOffscreen) {
    var worker = new Worker(new URL('./worker.js', import.meta.url), { type: 'module' });
    worker.onmessage = function (e) { onMessage(e.data); };
    worker.onerror = function () { onMessage({ type: 'failed' }); };
    var offscreen = canvas.transferControlToOffscreen();
    return {
      post: function (msg, transfer) {
        if (msg.type === 'init') { msg.canvas = offscreen; transfer = [offscreen]; }
        worker.postMessage(msg, transfer || []);
      },
      stop: function () { worker.terminate(); }
    };
  }
  var renderer = null, queue = [];
  import('./gl.js').then(function (gl) {
    renderer = gl.createRenderer(onMessage);
    queue.forEach(function (msg) { renderer.handle(msg); });
    queue = null;
  });
  return {
    post: function (msg) {
      if (msg.type === 'init') msg.canvas = canvas;
      if (renderer) renderer.handle(msg); else queue.push(msg);
    },
    stop: function () {}
  };
}

// quotes: [{ quote, info, theme, art }]; theme names a card theme, art an illustration. Returns a handle, or null when
// there is nothing to show. opts: backgrounds { light, dark } (photo urls), onChange(card, index), onBuilt(), onFailed().
export function mount(root, canvas, quotes, opts) {
  if (!quotes.length) return null;
  opts = opts || {};
  setFonts();
  var defs = quotes.map(function (q) {
    return { q: q.quote, a: q.info || '', t: themeOf(q.theme), art: q.art };
  });
  var N = defs.length, disposed = false;

  var renderer = openRenderer(canvas, function (msg) {
    if (msg.type === 'change') { if (opts.onChange) opts.onChange(defs[msg.idx], msg.idx); }
    else if (msg.type === 'cursor') root.style.cursor = msg.pointer ? 'pointer' : '';
    else if (msg.type === 'built') { if (opts.onBuilt) opts.onBuilt(); }
    else if (msg.type === 'failed') { if (opts.onFailed) opts.onFailed(); }
  });
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var backgrounds = {};
  Object.keys(opts.backgrounds || {}).forEach(function (k) { backgrounds[k] = new URL(opts.backgrounds[k], location.href).href; });
  function size() {
    return { w: root.clientWidth, h: root.clientHeight, dpr: window.devicePixelRatio || 1 };
  }
  var s = size();
  renderer.post({
    type: 'init', cards: defs.map(function (d) { return look(d.t); }), theme: siteTheme(), backgrounds: backgrounds,
    reduced: !!reduced, w: s.w, h: s.h, dpr: s.dpr
  });

  var ro = window.ResizeObserver ? new ResizeObserver(function () { var z = size(); z.type = 'size'; renderer.post(z); }) : null;
  if (ro) ro.observe(root);
  var themeObserver = new MutationObserver(function () { renderer.post({ type: 'theme', name: siteTheme() }); });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  // ---------------------------------------------------------------- input
  function onWheel(e) {
    e.preventDefault();
    var dy = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
    if (e.deltaMode === 1) dy *= 18; else if (e.deltaMode === 2) dy *= 400;
    renderer.post({ type: 'nudge', amount: Math.max(-140, Math.min(140, dy)) * 0.0034 });
  }
  // Swipe sideways: the next card sits to the right, so a swipe left brings it in. Vertical drags are left to the browser
  // to scroll the page, and touches starting on a [data-edge] strip are left to the browser's back gesture.
  var tx = null, t0 = null, horizontal = false;
  function onTouchStart(e) {
    var t = e.touches[0];
    if (e.touches.length !== 1 || e.target.closest('[data-edge]')) { tx = null; return; }
    tx = t.clientX; t0 = { x: t.clientX, y: t.clientY }; horizontal = false;
  }
  function onTouchMove(e) {
    if (tx == null) return;
    var t = e.touches[0];
    if (!horizontal) {
      var dx = Math.abs(t.clientX - t0.x), dy = Math.abs(t.clientY - t0.y);
      if (dx + dy < 8) return;
      if (dy > dx) { tx = null; return; }
      horizontal = true;
    }
    e.preventDefault();
    renderer.post({ type: 'nudge', amount: (tx - t.clientX) * 0.008 }); tx = t.clientX;
  }
  function onTouchEnd() { tx = null; }
  function toNdc(e) {
    var r = root.getBoundingClientRect();
    return { x: (e.clientX - r.left) / r.width * 2 - 1, y: (e.clientY - r.top) / r.height * 2 - 1 };
  }
  function onPointer(e) {
    if (e.pointerType && e.pointerType !== 'mouse') return;
    var n = toNdc(e);
    renderer.post({ type: 'hover', x: n.x, y: n.y });
  }
  function onLeave() { renderer.post({ type: 'leave' }); }
  var down = null;
  function onDown(e) { down = { x: e.clientX, y: e.clientY }; }
  function onUp(e) {
    if (!down) return;
    var moved = Math.abs(e.clientX - down.x) + Math.abs(e.clientY - down.y); down = null;
    if (moved > 8) return;
    var n = toNdc(e);
    renderer.post({ type: 'tap', x: n.x, y: n.y });
  }
  function key(e) {
    var k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowRight' || k === 'PageDown' || k === ' ') { e.preventDefault(); renderer.post({ type: 'step', d: 1 }); }
    else if (k === 'ArrowUp' || k === 'ArrowLeft' || k === 'PageUp') { e.preventDefault(); renderer.post({ type: 'step', d: -1 }); }
  }
  root.addEventListener('keydown', key);
  root.addEventListener('wheel', onWheel, { passive: false });
  root.addEventListener('touchstart', onTouchStart, { passive: true });
  root.addEventListener('touchmove', onTouchMove, { passive: false });
  root.addEventListener('touchend', onTouchEnd);
  root.addEventListener('touchcancel', onTouchEnd);
  root.addEventListener('pointermove', onPointer);
  root.addEventListener('pointerleave', onLeave);
  root.addEventListener('pointerdown', onDown);
  root.addEventListener('pointerup', onUp);

  // paint the card faces once the fonts are in, one per frame so no single task runs long
  function send(i) {
    var face = drawCard(defs[i]);
    Promise.all([createImageBitmap(face, BITMAP), createImageBitmap(blurCanvas(face), BITMAP)]).then(function (b) {
      if (!disposed) renderer.post({ type: 'card', i: i, face: b[0], blur: b[1] }, b);
    });
  }
  fontsReady().then(function () {
    var i = 0;
    (function next() {
      if (disposed) return;
      send(i++);
      if (i < N) requestAnimationFrame(next);
    })();
  });

  return {
    dispose: function () {
      disposed = true;
      themeObserver.disconnect();
      if (ro) ro.disconnect();
      root.removeEventListener('keydown', key);
      root.removeEventListener('wheel', onWheel);
      root.removeEventListener('touchstart', onTouchStart);
      root.removeEventListener('touchmove', onTouchMove);
      root.removeEventListener('touchend', onTouchEnd);
      root.removeEventListener('touchcancel', onTouchEnd);
      root.removeEventListener('pointermove', onPointer);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointerup', onUp);
      root.style.cursor = '';
      renderer.post({ type: 'dispose' });
      renderer.stop();
    }
  };
}
