// Reads: 2D painting shared by the card art and the scene. Draws on a canvas element when a document exists, else on an OffscreenCanvas (worker).

// Card geometry (world units) and texture size
export var CW = 4.3, CH = 3.9, CR = 0.2;
export var TW = 1024, TH = Math.round(TW * CH / CW);
export var TR = Math.round(CR / CW * TW);
export var BGW = 2048, BGH = 1280;

// ---------------------------------------------------------------- helpers
export function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
export function mk(w, h) {
  if (typeof document === 'undefined') return new OffscreenCanvas(w, h);
  var c = document.createElement('canvas'); c.width = w; c.height = h; return c;
}
export function rng(seed) {
  return function () {
    seed |= 0; seed = seed + 0x6D2B79F5 | 0;
    var t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
export function noise1D(r, octaves, base) {
  var layers = [];
  for (var o = 0; o < octaves; o++) {
    var n = (base || 4) * Math.pow(2, o), pts = [];
    for (var i = 0; i <= n + 1; i++) pts.push(r() * 2 - 1);
    layers.push({ n: n, pts: pts, amp: Math.pow(0.5, o) });
  }
  return function (x) {
    var s = 0, tot = 0;
    for (var k = 0; k < layers.length; k++) {
      var L = layers[k], f = clamp(x, 0, 1) * L.n, i = Math.floor(f), t = f - i;
      t = t * t * (3 - 2 * t);
      s += L.amp * (L.pts[i] * (1 - t) + L.pts[Math.min(i + 1, L.n + 1)] * t); tot += L.amp;
    }
    return s / tot;
  };
}
export function roundRect(g, x, y, w, h, r) {
  g.beginPath();
  g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath();
}
export function rgba(c, a) { return 'rgba(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ',' + a + ')'; }
export function mixc(a, b, t) { return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]; }

// A filled ridge line from x0..x1 down to the bottom of the canvas.
export function ridge(g, w, h, r, o) {
  var n1 = noise1D(r, 4, o.freq || 3), n2 = noise1D(r, 3, o.freq2 || 2), n3 = noise1D(r, 2, 40);
  var x0 = o.x0 || 0, x1 = o.x1 == null ? w : o.x1, step = Math.max(2, w / 400);
  g.beginPath(); g.moveTo(x0, h + 2);
  var top = h;
  for (var x = x0; x <= x1 + step; x += step) {
    var u = (x - x0) / (x1 - x0);
    var k = 0.62 * (0.5 + 0.5 * n1(u)) + 0.38 * (1 - Math.abs(n2(u)));
    if (o.lift) k += o.lift(u);
    var y = h * (o.base - o.amp * k) + (o.detail ? h * o.detail * n3(u) : 0);
    top = Math.min(top, y);
    g.lineTo(Math.min(x, x1), y);
  }
  g.lineTo(x1, h + 2); g.closePath();
  return top;
}

// ---------------------------------------------------------------- background painting
export function cloud(g, r, cx, cy, w, hh, n, alpha, stretch) {
  for (var i = 0; i < n; i++) {
    var dx = (r() - 0.5) * w;
    var fall = 1 - Math.min(1, Math.abs(dx) / (w * 0.55));
    var x = cx + dx, y = cy + (r() - 0.5) * hh * (0.4 + fall);
    var rad = (0.3 + r() * 0.7) * hh * (0.45 + fall * 0.55);
    g.save(); g.translate(x, y); g.scale(stretch || 1.6, 1);
    var gr = g.createRadialGradient(0, 0, 0, 0, 0, rad);
    gr.addColorStop(0, 'rgba(255,255,255,' + alpha + ')');
    gr.addColorStop(0.55, 'rgba(255,255,255,' + alpha * 0.45 + ')');
    gr.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = gr; g.fillRect(-rad, -rad, rad * 2, rad * 2);
    g.restore();
  }
}

export function drawShadow() {
  var c = mk(256, 256), g = c.getContext('2d'), w = 256 / 1.5, h = 256 / 1.5;
  g.shadowColor = 'rgba(0,0,0,1)'; g.shadowBlur = 24; g.shadowOffsetX = 1000; g.fillStyle = '#000';
  roundRect(g, (256 - w) / 2 - 1000, (256 - h) / 2, w, h, 12); g.fill();
  return c;
}

// What changes with the site theme: the tint the photo's top edge is extended with, the veil over the photo, and the fog
// colour distant cards fade into.
export var BG_THEMES = {
  light: { lift: [176, 196, 228], skyTop: [150, 176, 218], veil: ['rgba(206,218,240,0.62)', 'rgba(214,224,242,0.38)', 'rgba(190,204,228,0.22)'], haze: [0.86, 0.88, 0.94] },
  dark: { lift: [12, 18, 34], skyTop: [6, 10, 22], veil: ['rgba(8,12,28,0.5)', 'rgba(10,16,34,0.28)', 'rgba(8,12,26,0.18)'], haze: [0.1, 0.13, 0.2] }
};

// Cover-fit a photo into the background canvas, set lower so its top edge clears the title area. The gap above it is
// filled with a sky tinted from the photo's own top edge, which fades into the photo.
export function photoBackground(img, th) {
  var c = mk(BGW, BGH), g = c.getContext('2d');
  var k = Math.max(BGW / img.width, BGH / img.height);
  var w = img.width * k, h = img.height * k, top = Math.round(BGH * 0.12);
  g.imageSmoothingQuality = 'high';
  g.drawImage(img, (BGW - w) / 2, top, w, h);
  var d = g.getImageData(0, top + 2, BGW, 6).data, sum = [0, 0, 0], n = d.length / 4;
  for (var i = 0; i < d.length; i += 4) { sum[0] += d[i]; sum[1] += d[i + 1]; sum[2] += d[i + 2]; }
  var edge = mixc([sum[0] / n, sum[1] / n, sum[2] / n], th.lift, 0.35);
  var sky = g.createLinearGradient(0, 0, 0, top + h * 0.16);
  sky.addColorStop(0, rgba(mixc(edge, th.skyTop, 0.5), 1)); sky.addColorStop(top / (top + h * 0.16), rgba(edge, 1)); sky.addColorStop(1, rgba(edge, 0));
  g.fillStyle = sky; g.fillRect(0, 0, BGW, top + h * 0.16);
  // a veil keeps the title and nav readable and the photo soft rather than busy
  var veil = g.createLinearGradient(0, 0, 0, BGH);
  veil.addColorStop(0, th.veil[0]); veil.addColorStop(0.5, th.veil[1]); veil.addColorStop(1, th.veil[2]);
  g.fillStyle = veil; g.fillRect(0, 0, BGW, BGH);
  return c;
}

export function blurBg(src) {
  var s = mk(96, 60), gs = s.getContext('2d'); gs.imageSmoothingQuality = 'high';
  var m = mk(384, 240), gm = m.getContext('2d'); gm.imageSmoothingQuality = 'high';
  gm.drawImage(src, 0, 0, 384, 240); gs.drawImage(m, 0, 0, 96, 60);
  var o = mk(512, 320), go = o.getContext('2d'); go.imageSmoothingQuality = 'high'; go.drawImage(s, 0, 0, 512, 320);
  return o;
}

