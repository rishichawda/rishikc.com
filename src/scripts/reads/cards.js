// Reads: card painting. Each quote card is drawn to a 2D canvas on the main thread, where the page fonts are available.
import { TW, TH, TR, clamp, mk, rng, roundRect, rgba, mixc, ridge, cloud } from './paint.js';

// Astro registers the fonts under hashed family names, so the stacks come from the CSS variables it defines.
var SERIF = 'Georgia, "Times New Roman", serif';
var SANS = '"Helvetica Neue", Arial, sans-serif';
function cssFont(name, fallback) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

var DEFAULT_THEME = 'paper';
var THEMES = {
  glass:   { glass: true, edgeA: 0.34, tint: ['rgba(252,251,255,0.46)', 'rgba(238,232,250,0.62)'], text: '#232d58', mark: '#8a85c6', attr: '#4a5378', edge: '#ffffff', gloss: 0.14, rim: 0.55, glow: 0.6, illus: 'lavender' },
  mist:    { glass: true, edgeA: 0.6, tint: ['rgba(234,241,250,0.84)', 'rgba(214,227,244,0.86)'], text: '#26355b', mark: '#4c6a96', attr: '#3e4e72', edge: '#f2f6fc', gloss: 0.1, rim: 0.45, glow: 0.38 },
  slate:   { dark: true, noise: 0.13, tint: ['#37383a', '#28292b'], text: '#f4f1eb', mark: '#cdbfa6', attr: '#e8e4dc', edge: '#2e2f31', gloss: 0.06, rim: 0.12, glow: 0.1, illus: 'leafSlate' },
  books:   { noise: 0.07, tint: ['#f5efe3', '#ebe2d0'], text: '#262b42', mark: '#b88b55', attr: '#363b55', edge: '#eee5d2', gloss: 0.045, rim: 0.2, glow: 0.2, illus: 'books' },
  paper:   { noise: 0.07, tint: ['#f6f1e6', '#ece4d3'], text: '#242a40', mark: '#b88b55', attr: '#373c55', edge: '#eee5d2', gloss: 0.045, rim: 0.2, glow: 0.2, illus: 'sage' },
  cream:   { noise: 0.07, tint: ['#f4eee2', '#eae2d1'], text: '#2a2f45', mark: '#b88b55', attr: '#3c4158', edge: '#eee5d2', gloss: 0.045, rim: 0.2, glow: 0.18 },
  navy:    { dark: true, noise: 0.08, tint: ['#37466a', '#28344f'], text: '#eaeef6', mark: '#c5cde0', attr: '#cbd2e2', edge: '#2c3854', gloss: 0.06, rim: 0.12, glow: 0.1, illus: 'lineMountains' },
  lilac:   { noise: 0.04, tint: ['#e6e0f0', '#d6cee6'], text: '#4a4669', mark: '#8d85b6', attr: '#5b5679', edge: '#dcd4ea', gloss: 0.05, rim: 0.2, glow: 0.16 },
  lilac2:  { noise: 0.04, tint: ['#e9e2f1', '#dcd2ea'], text: '#4f4a70', mark: '#958cc0', attr: '#5f5a7e', edge: '#dfd6ec', gloss: 0.05, rim: 0.2, glow: 0.16 },
  sage:    { dark: true, noise: 0.06, tint: ['#7f9c88', '#6c8a76'], text: '#f2f6f0', mark: '#e3ece0', attr: '#e8efe5', edge: '#718d79', gloss: 0.05, rim: 0.14, glow: 0.12, illus: 'leafSage' },
  green:   { dark: true, noise: 0.05, tint: ['#8fae9a', '#7a9a86'], text: '#f4f8f3', mark: '#e6efe3', attr: '#edf3ea', edge: '#88a693', gloss: 0.05, rim: 0.15, glow: 0.12 },
  pink:    { noise: 0.05, tint: ['#f1e6e3', '#e6d6d3'], text: '#634f52', mark: '#c29276', attr: '#735e61', edge: '#e9dbd8', gloss: 0.05, rim: 0.2, glow: 0.16 },
  fog:     { noise: 0.04, tint: ['#e6eaef', '#d5dbe4'], text: '#435066', mark: '#8593a8', attr: '#526077', edge: '#dbe0e8', gloss: 0.05, rim: 0.2, glow: 0.16 },
  sky:     { noise: 0.04, tint: ['#dbe5f1', '#c8d6e9'], text: '#2f4268', mark: '#5a77a2', attr: '#3e5277', edge: '#cdd9ea', gloss: 0.05, rim: 0.2, glow: 0.16 },
  lavender:{ noise: 0.04, tint: ['#e0dbf1', '#cdc5e6'], text: '#3c3766', mark: '#827abe', attr: '#4d4878', edge: '#d0c8e6', gloss: 0.05, rim: 0.2, glow: 0.16 }
};

// Cluster slots measured from the 1536×1024 design: x, y (centre, px), card height (px), depth z, rotX, rotY, rotZ (deg).

// ---------------------------------------------------------------- card painting
var noiseCanvas = null;
function getNoise() {
  if (noiseCanvas) return noiseCanvas;
  var c = mk(256, 256), g = c.getContext('2d'), img = g.createImageData(256, 256), r = rng(3);
  for (var i = 0; i < img.data.length; i += 4) {
    var v = 128 + (r() - 0.5) * 255 | 0;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v; img.data[i + 3] = 255;
  }
  g.putImageData(img, 0, 0); noiseCanvas = c; return c;
}

function pine(g, x, base, h, col) {
  var tiers = 6, w = h * 0.36, right = [], i;
  for (i = 1; i <= tiers; i++) {
    var ty = base - h + h * (i / tiers) * 0.92, tw = w * (0.18 + 0.82 * i / tiers) * 0.5;
    right.push([x + tw, ty]);
    if (i < tiers) right.push([x + tw * 0.38, ty - h * 0.02]);
  }
  g.fillStyle = col; g.beginPath(); g.moveTo(x, base - h);
  for (i = 0; i < right.length; i++) g.lineTo(right[i][0], right[i][1]);
  g.lineTo(x + h * 0.02, base - h * 0.06); g.lineTo(x + h * 0.02, base + 4); g.lineTo(x - h * 0.02, base + 4); g.lineTo(x - h * 0.02, base - h * 0.06);
  for (i = right.length - 1; i >= 0; i--) g.lineTo(2 * x - right[i][0], right[i][1]);
  g.closePath(); g.fill();
}

function leaf(g, x, y, len, ang, col, vein) {
  g.save(); g.translate(x, y); g.rotate(ang);
  g.beginPath(); g.moveTo(0, 0);
  g.bezierCurveTo(len * 0.28, -len * 0.3, len * 0.74, -len * 0.24, len, 0);
  g.bezierCurveTo(len * 0.74, len * 0.22, len * 0.28, len * 0.28, 0, 0);
  g.fillStyle = col; g.fill();
  g.strokeStyle = vein; g.lineWidth = Math.max(1.5, len * 0.018); g.lineCap = 'round';
  g.beginPath(); g.moveTo(len * 0.04, 0); g.quadraticCurveTo(len * 0.5, -len * 0.03, len * 0.94, 0); g.stroke();
  for (var k = 1; k <= 4; k++) {
    var px = len * (0.16 + k * 0.16);
    g.lineWidth = Math.max(1, len * 0.009);
    g.beginPath(); g.moveTo(px, -len * 0.012); g.lineTo(px + len * 0.1, -len * 0.13 * (1 - k * 0.12)); g.stroke();
    g.beginPath(); g.moveTo(px, len * 0.008); g.lineTo(px + len * 0.1, len * 0.12 * (1 - k * 0.12)); g.stroke();
  }
  g.restore();
}

function sprig(g, x, y, height, cols, vein, stem, scale) {
  var cx = x + height * 0.12, cy = y - height * 0.55, ex = x - height * 0.18, ey = y - height;
  g.strokeStyle = stem; g.lineWidth = 6 * scale; g.lineCap = 'round';
  g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(cx, cy, ex, ey); g.stroke();
  var spots = [[0.28, 1, 1.0], [0.42, -1, 1.05], [0.58, 1, 0.95], [0.72, -1, 0.9], [0.86, 1, 0.78]];
  spots.forEach(function (s, i) {
    var t = s[0], it = 1 - t;
    var px = it * it * x + 2 * it * t * cx + t * t * ex, py = it * it * y + 2 * it * t * cy + t * t * ey;
    var dx = 2 * it * (cx - x) + 2 * t * (ex - cx), dy = 2 * it * (cy - y) + 2 * t * (ey - cy);
    var a = Math.atan2(dy, dx) + s[1] * 0.95;
    leaf(g, px, py, 150 * s[2] * scale, a, cols[i % cols.length], vein);
  });
  var tipA = Math.atan2(ey - cy, ex - cx);
  leaf(g, ex, ey, 120 * scale, tipA, cols[0], vein);
}

function bird(g, x, y, k, flip) {
  g.save(); g.translate(x, y); g.scale(flip ? -k : k, k);
  g.fillStyle = '#5f6f8c'; g.beginPath(); g.moveTo(-30, -6); g.lineTo(-62, 4); g.lineTo(-58, 14); g.lineTo(-26, 6); g.closePath(); g.fill();
  g.fillStyle = '#6f7f99'; g.beginPath(); g.ellipse(0, -14, 36, 26, -0.15, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#efe4cf'; g.beginPath(); g.ellipse(8, -6, 22, 15, -0.2, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#6f7f99'; g.beginPath(); g.arc(26, -36, 17, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#58698a'; g.beginPath(); g.ellipse(-8, -18, 20, 12, -0.4, 0, Math.PI * 2); g.fill();
  g.fillStyle = '#d6a160'; g.beginPath(); g.moveTo(40, -38); g.lineTo(54, -34); g.lineTo(40, -30); g.closePath(); g.fill();
  g.fillStyle = '#2b2f3c'; g.beginPath(); g.arc(31, -39, 3.2, 0, Math.PI * 2); g.fill();
  g.strokeStyle = '#7a6650'; g.lineWidth = 3; g.beginPath(); g.moveTo(-2, 10); g.lineTo(-4, 20); g.moveTo(8, 10); g.lineTo(8, 20); g.stroke();
  g.restore();
}
function flower(g, x, y, r, petal, petalDark, center) {
  for (var i = 0; i < 5; i++) {
    var a = i / 5 * Math.PI * 2 - Math.PI / 2;
    g.save(); g.translate(x + Math.cos(a) * r * 0.55, y + Math.sin(a) * r * 0.55); g.rotate(a + Math.PI / 2);
    var gr = g.createLinearGradient(0, -r * 0.6, 0, r * 0.6);
    gr.addColorStop(0, petal); gr.addColorStop(1, petalDark);
    g.fillStyle = gr; g.beginPath(); g.ellipse(0, 0, r * 0.42, r * 0.6, 0, 0, Math.PI * 2); g.fill();
    g.restore();
  }
  g.fillStyle = center; g.beginPath(); g.arc(x, y, r * 0.22, 0, Math.PI * 2); g.fill();
}
function sparkle(g, x, y, r, col) {
  g.fillStyle = col; g.beginPath();
  g.moveTo(x, y - r); g.quadraticCurveTo(x, y, x + r, y); g.quadraticCurveTo(x, y, x, y + r);
  g.quadraticCurveTo(x, y, x - r, y); g.quadraticCurveTo(x, y, x, y - r); g.fill();
}
function softCloud(g, x, y, w, col) {
  g.fillStyle = col; g.beginPath();
  g.ellipse(x, y, w, w * 0.28, 0, 0, Math.PI * 2);
  g.ellipse(x - w * 0.3, y - w * 0.18, w * 0.38, w * 0.3, 0, 0, Math.PI * 2);
  g.ellipse(x + w * 0.22, y - w * 0.24, w * 0.44, w * 0.36, 0, 0, Math.PI * 2);
  g.fill();
}

var ILLUS = {
  lavender: function (g) {
    var r = rng(11);
    var wash = g.createLinearGradient(0, TH * 0.5, 0, TH);
    wash.addColorStop(0, 'rgba(250,226,232,0)'); wash.addColorStop(0.5, 'rgba(250,226,232,0.35)'); wash.addColorStop(1, 'rgba(240,226,240,0.2)');
    g.fillStyle = wash; g.fillRect(0, 0, TW, TH);
    var sx = TW * 0.67, sy = TH * 0.69;
    var sg = g.createRadialGradient(sx, sy, 0, sx, sy, 120);
    sg.addColorStop(0, 'rgba(255,250,246,0.95)'); sg.addColorStop(0.35, 'rgba(255,246,244,0.8)'); sg.addColorStop(0.45, 'rgba(255,240,240,0.35)'); sg.addColorStop(1, 'rgba(255,240,240,0)');
    g.fillStyle = sg; g.fillRect(0, 0, TW, TH);
    var L = [
      { base: 0.83, amp: 0.2, top: 'rgba(206,194,229,0.88)', bot: 'rgba(236,226,243,0.7)', lift: function (u) { return 0.25 * Math.exp(-Math.pow((u - 0.22) / 0.14, 2)); } },
      { base: 0.88, amp: 0.17, top: 'rgba(178,165,214,0.92)', bot: 'rgba(222,212,238,0.8)', lift: function (u) { return 0.3 * Math.exp(-Math.pow((u - 0.85) / 0.12, 2)); } },
      { base: 0.95, amp: 0.13, top: 'rgba(146,136,196,0.96)', bot: 'rgba(196,186,226,0.9)', lift: function (u) { return -0.4 * Math.exp(-Math.pow((u - 0.58) / 0.12, 2)); } },
      { base: 1.02, amp: 0.12, top: 'rgba(117,110,172,1)', bot: 'rgba(150,140,200,1)', lift: function (u) { return -0.5 * Math.exp(-Math.pow((u - 0.55) / 0.14, 2)); } }
    ];
    L.forEach(function (o, i) {
      var top = ridge(g, TW, TH, r, o);
      var gr = g.createLinearGradient(0, top, 0, TH);
      gr.addColorStop(0, o.top); gr.addColorStop(1, o.bot); g.fillStyle = gr; g.fill();
      if (i === 1) {
        // misty lake in the valley
        var lk = g.createLinearGradient(0, TH * 0.86, 0, TH * 0.93);
        lk.addColorStop(0, 'rgba(246,240,250,0)'); lk.addColorStop(0.5, 'rgba(246,240,250,0.75)'); lk.addColorStop(1, 'rgba(246,240,250,0)');
        g.fillStyle = lk; g.beginPath(); g.ellipse(TW * 0.6, TH * 0.895, TW * 0.24, TH * 0.035, 0, 0, Math.PI * 2); g.fill();
      }
    });
  },
  sage: function (g) {
    var r = rng(21);
    var L = [
      { base: 0.82, amp: 0.24, col: [205, 214, 194], a: 0.95, lift: function (u) { return 0.3 * Math.exp(-Math.pow((u - 0.72) / 0.14, 2)); } },
      { base: 0.89, amp: 0.17, col: [172, 188, 158], a: 0.97, lift: function (u) { return 0.25 * Math.exp(-Math.pow((u - 0.25) / 0.16, 2)); } },
      { base: 0.96, amp: 0.12, col: [136, 160, 125], a: 1 }
    ];
    L.forEach(function (o) {
      var top = ridge(g, TW, TH, r, o);
      var gr = g.createLinearGradient(0, top, 0, TH);
      gr.addColorStop(0, rgba(o.col, o.a)); gr.addColorStop(1, rgba(mixc(o.col, [240, 236, 222], 0.35), o.a));
      g.fillStyle = gr; g.fill();
    });
    var trees = [
      [0.80, 0.99, 250, '#4f6d4a'], [0.86, 1.0, 300, '#3f5d3d'], [0.92, 0.99, 230, '#4a6846'], [0.97, 1.0, 330, '#395636'],
      [0.75, 1.0, 170, '#5b7853'], [0.89, 1.02, 190, '#466443'], [1.0, 0.99, 260, '#41603f'],
      [0.04, 1.0, 120, '#6a8762'], [0.09, 1.0, 95, '#738f69'], [0.14, 1.01, 140, '#5f7d58'], [0.2, 1.0, 85, '#7a956f']
    ];
    trees.forEach(function (t) { pine(g, t[0] * TW, t[1] * TH, t[2], t[3]); });
  },
  leafSlate: function (g) {
    g.save(); g.globalAlpha = 0.95;
    sprig(g, TW * 0.9, TH * 1.03, 360, ['#6f7f4c', '#7d8c57', '#66763f'], 'rgba(205,214,165,0.55)', '#59653a', 1);
    g.restore();
  },
  leafSage: function (g) {
    g.save(); g.globalAlpha = 0.85;
    sprig(g, TW * 0.88, TH * 1.03, 330, ['#c9dac5', '#b9cdb6', '#d3e2cf'], 'rgba(110,140,115,0.45)', '#a9bfa6', 0.95);
    g.restore();
  },
  books: function (g) {
    var books = [
      { w: 300, h: 58, x: 0, col: '#36506c', band: '#c9a76b' },
      { w: 318, h: 50, x: -14, col: '#c25f3d', band: '#e8c48c' },
      { w: 306, h: 54, x: 10, col: '#e2d5b8', band: '#a67c4b' },
      { w: 276, h: 52, x: 6, col: '#3f617f', band: '#d1b27a' }
    ];
    var bx = TW * 0.66, by = TH * 0.975;
    g.save();
    g.fillStyle = 'rgba(70,55,35,0.18)'; g.beginPath(); g.ellipse(bx + 160, by + 4, 190, 16, 0, 0, Math.PI * 2); g.fill();
    var y = by;
    books.forEach(function (b, i) {
      y -= b.h;
      var x = bx + b.x + (i === 3 ? 4 : 0);
      // pages (right end)
      g.fillStyle = '#f3ead6'; roundRect(g, x + b.w - 34, y + 6, 34, b.h - 12, 4); g.fill();
      g.strokeStyle = 'rgba(160,140,100,0.5)'; g.lineWidth = 1.5;
      for (var k = 1; k < 5; k++) { g.beginPath(); g.moveTo(x + b.w - 32, y + 6 + k * (b.h - 12) / 5); g.lineTo(x + b.w - 2, y + 6 + k * (b.h - 12) / 5); g.stroke(); }
      // cover / spine
      var gr = g.createLinearGradient(0, y, 0, y + b.h);
      gr.addColorStop(0, b.col); gr.addColorStop(1, shade(b.col, -0.18));
      g.fillStyle = gr; roundRect(g, x, y, b.w - 30, b.h, 7); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.14)'; g.fillRect(x + 6, y + 4, b.w - 44, 4);
      g.fillStyle = b.band; g.fillRect(x + 26, y + 8, 6, b.h - 16); g.fillRect(x + 40, y + 8, 3, b.h - 16);
      g.fillRect(x + b.w - 72, y + 8, 3, b.h - 16);
    });
    g.restore();
  },
  // Be here now — still water, a low sun and its broken reflection
  ripple: function (g) {
    var r = rng(31), sx = TW * 0.76, hy = TH * 0.76;
    var glow = g.createRadialGradient(sx, hy - 40, 0, sx, hy - 40, 260);
    glow.addColorStop(0, 'rgba(250,252,240,0.35)'); glow.addColorStop(1, 'rgba(250,252,240,0)');
    g.fillStyle = glow; g.fillRect(0, 0, TW, TH);
    g.fillStyle = 'rgba(246,249,238,0.82)'; g.beginPath(); g.arc(sx, hy - 46, 62, 0, Math.PI * 2); g.fill();
    ridge(g, TW, TH, r, { base: hy / TH + 0.004, amp: 0.06, lift: function (u) { return 0.6 * Math.exp(-Math.pow((u - 0.62) / 0.12, 2)) - 0.6 * (1 - u); } });
    g.fillStyle = 'rgba(66,98,80,0.42)'; g.fill();
    var wg = g.createLinearGradient(0, hy, 0, TH);
    wg.addColorStop(0, 'rgba(120,152,132,0.35)'); wg.addColorStop(1, 'rgba(96,128,110,0.15)');
    g.fillStyle = wg; g.fillRect(0, hy, TW, TH - hy);
    g.lineCap = 'round';
    for (var i = 0; i < 9; i++) {
      var y = hy + 16 + i * 22, w = 150 - i * 10 + r() * 30;
      g.strokeStyle = 'rgba(246,250,240,' + (0.75 - i * 0.06) + ')'; g.lineWidth = 6 - i * 0.35;
      g.beginPath(); g.moveTo(sx - w * 0.5 + (r() - 0.5) * 30, y); g.lineTo(sx + w * 0.5 + (r() - 0.5) * 30, y); g.stroke();
    }
    g.strokeStyle = 'rgba(236,244,234,0.32)'; g.lineWidth = 3;
    for (var j = 0; j < 12; j++) {
      var yy = hy + 20 + r() * (TH - hy - 30), xx = TW * (0.1 + r() * 0.5), ww = 40 + r() * 90;
      g.beginPath(); g.moveTo(xx, yy); g.lineTo(xx + ww, yy); g.stroke();
    }
  },

  // So it goes — two small birds on a branch, a third in flight
  birds: function (g) {
    g.lineCap = 'round'; g.lineJoin = 'round';
    g.strokeStyle = '#7a6650'; g.lineWidth = 9;
    g.beginPath(); g.moveTo(TW * 1.02, TH * 0.74); g.quadraticCurveTo(TW * 0.78, TH * 0.8, TW * 0.5, TH * 0.86); g.stroke();
    g.lineWidth = 5;
    g.beginPath(); g.moveTo(TW * 0.62, TH * 0.835); g.quadraticCurveTo(TW * 0.58, TH * 0.9, TW * 0.53, TH * 0.93); g.stroke();
    [[0.92, 0.755, 0.5], [0.7, 0.815, -0.4], [0.56, 0.86, 0.8], [0.55, 0.915, -0.6], [0.83, 0.79, -0.9]].forEach(function (l) {
      leaf(g, l[0] * TW, l[1] * TH, 70, l[2] + (l[2] > 0 ? 0.6 : -2.2), '#9aa77a', 'rgba(240,236,214,0.6)');
    });
    bird(g, TW * 0.76, TH * 0.785, 1.35, false);
    bird(g, TW * 0.63, TH * 0.818, 1.1, true);
    g.strokeStyle = '#6f7f99'; g.lineWidth = 5;
    g.beginPath(); g.moveTo(TW * 0.82, TH * 0.6); g.quadraticCurveTo(TW * 0.845, TH * 0.575, TW * 0.865, TH * 0.6);
    g.quadraticCurveTo(TW * 0.885, TH * 0.572, TW * 0.91, TH * 0.592); g.stroke();
  },

  // Hope is the thing with feathers — a single soft feather
  feather: function (g) {
    g.save(); g.translate(TW * 0.8, TH * 0.83); g.rotate(-0.62);
    var L = 420, i;
    for (i = 0; i <= 120; i++) {
      var t = i / 120, x = -L / 2 + t * L, bend = Math.sin(t * Math.PI) * 18;
      var wTop = Math.sin(Math.pow(t, 0.75) * Math.PI) * 74 * (t > 0.06 ? 1 : t / 0.06);
      var wBot = wTop * 0.82;
      var gap = (i > 46 && i < 50) || (i > 84 && i < 87);
      var a = t < 0.14 ? 0.35 : 0.75;
      g.strokeStyle = 'rgba(141,133,182,' + a + ')'; g.lineWidth = 2.4;
      if (!(gap && i % 2)) { g.beginPath(); g.moveTo(x, -bend); g.quadraticCurveTo(x + 12, -bend - wTop * 0.6, x + 26, -bend - wTop); g.stroke(); }
      g.strokeStyle = 'rgba(176,168,214,' + a + ')';
      g.beginPath(); g.moveTo(x, -bend); g.quadraticCurveTo(x + 12, -bend + wBot * 0.6, x + 26, -bend + wBot); g.stroke();
    }
    g.strokeStyle = 'rgba(110,102,156,0.9)'; g.lineWidth = 5; g.lineCap = 'round';
    g.beginPath(); g.moveTo(-L / 2 - 50, 6); g.quadraticCurveTo(0, -24, L / 2 + 20, 0); g.stroke();
    // a few loose down wisps near the quill
    g.strokeStyle = 'rgba(176,168,214,0.45)'; g.lineWidth = 2;
    for (i = 0; i < 7; i++) { g.beginPath(); g.moveTo(-L / 2 + i * 8, 0); g.quadraticCurveTo(-L / 2 - 20 + i * 6, 30 + i * 4, -L / 2 - 6 + i * 10, 50 + i * 3); g.stroke(); }
    g.restore();
  },

  // Kindness changes everything — a small cluster of blossoms
  blossoms: function (g) {
    var stems = [[0.78, 0.6, 0.86, 1.02], [0.88, 0.68, 0.9, 1.02], [0.68, 0.72, 0.8, 1.02], [0.95, 0.56, 0.95, 1.02]];
    g.lineCap = 'round';
    stems.forEach(function (s) {
      g.strokeStyle = '#8fa48b'; g.lineWidth = 5;
      g.beginPath(); g.moveTo(s[2] * TW, s[3] * TH); g.quadraticCurveTo((s[0] + s[2]) / 2 * TW + 20, (s[1] + s[3]) / 2 * TH, s[0] * TW, s[1] * TH); g.stroke();
    });
    leaf(g, TW * 0.83, TH * 0.9, 90, -2.3, '#a3b79c', 'rgba(240,244,236,0.6)');
    leaf(g, TW * 0.89, TH * 0.86, 80, -0.9, '#98ad92', 'rgba(240,244,236,0.6)');
    leaf(g, TW * 0.75, TH * 0.95, 70, -2.7, '#a3b79c', 'rgba(240,244,236,0.6)');
    flower(g, TW * 0.78, TH * 0.6, 52, '#d9aecb', '#c48fb2', '#f0d08a');
    flower(g, TW * 0.88, TH * 0.68, 44, '#e6c3d8', '#cf9fbe', '#f0d08a');
    flower(g, TW * 0.68, TH * 0.72, 38, '#c9b6e2', '#a995cf', '#f2d896');
    flower(g, TW * 0.95, TH * 0.56, 30, '#e6c3d8', '#cf9fbe', '#f0d08a');
    [[0.72, 0.64], [0.84, 0.57], [0.93, 0.76]].forEach(function (b) {
      g.fillStyle = '#d9aecb'; g.beginPath(); g.ellipse(b[0] * TW, b[1] * TH, 9, 13, 0.3, 0, Math.PI * 2); g.fill();
    });
  },

  // Begin anywhere — a dotted trail winding over soft hills
  trail: function (g) {
    var r = rng(41);
    [[0.8, 0.12, 'rgba(176,188,206,0.7)'], [0.87, 0.1, 'rgba(148,163,186,0.8)'], [0.95, 0.08, 'rgba(120,138,164,0.9)']].forEach(function (h) {
      ridge(g, TW, TH, r, { base: h[0], amp: h[1] }); g.fillStyle = h[2]; g.fill();
    });
    g.fillStyle = 'rgba(244,246,250,0.9)';
    var pts = [[0.3, 1.0], [0.42, 0.95], [0.58, 0.93], [0.62, 0.88], [0.54, 0.84], [0.62, 0.8], [0.74, 0.77]];
    for (var i = 0; i < pts.length - 1; i++) {
      for (var k = 0; k < 6; k++) {
        var t = k / 6, x = (pts[i][0] + (pts[i + 1][0] - pts[i][0]) * t) * TW, y = (pts[i][1] + (pts[i + 1][1] - pts[i][1]) * t) * TH;
        var sz = 3 + (y / TH - 0.75) * 30;
        g.beginPath(); g.arc(x, y, Math.max(2, sz), 0, Math.PI * 2); g.fill();
      }
    }
    pine(g, TW * 0.79, TH * 0.79, 80, 'rgba(96,114,140,0.9)');
    pine(g, TW * 0.83, TH * 0.8, 56, 'rgba(110,128,154,0.9)');
    g.fillStyle = 'rgba(250,236,214,0.9)'; g.beginPath(); g.arc(TW * 0.9, TH * 0.6, 26, 0, Math.PI * 2); g.fill();
  },

  // The best way out is always through — a road through a lavender forest, light at the end
  forest: function (g) {
    var vx = TW * 0.7, vy = TH * 0.74;
    var glow = g.createRadialGradient(vx, vy, 0, vx, vy, 220);
    glow.addColorStop(0, 'rgba(255,246,236,0.95)'); glow.addColorStop(0.4, 'rgba(252,236,232,0.5)'); glow.addColorStop(1, 'rgba(252,236,232,0)');
    g.fillStyle = glow; g.fillRect(0, 0, TW, TH);
    var rows = [
      { y: 0.78, h: 120, c: 'rgba(170,160,210,0.75)', xs: [0.42, 0.48, 0.54, 0.6, 0.79, 0.85, 0.91, 0.97] },
      { y: 0.88, h: 200, c: 'rgba(140,130,190,0.85)', xs: [0.36, 0.44, 0.52, 0.9, 0.98] },
      { y: 1.0, h: 300, c: 'rgba(112,104,168,0.95)', xs: [0.3, 0.42, 1.0] }
    ];
    rows.forEach(function (row, ri) {
      row.xs.forEach(function (x, i) { pine(g, x * TW, row.y * TH, row.h * (0.85 + (i % 3) * 0.1), row.c); });
      if (ri === 0) {
        var rd = g.createLinearGradient(0, vy, 0, TH);
        rd.addColorStop(0, 'rgba(255,246,240,0.95)'); rd.addColorStop(1, 'rgba(226,214,240,0.9)');
        g.fillStyle = rd;
        g.beginPath(); g.moveTo(vx - 4, vy); g.lineTo(vx + 4, vy);
        g.quadraticCurveTo(TW * 0.74, TH * 0.88, TW * 0.8, TH * 1.02); g.lineTo(TW * 0.58, TH * 1.02);
        g.quadraticCurveTo(TW * 0.66, TH * 0.86, vx - 4, vy); g.closePath(); g.fill();
      }
    });
  },

  // It does not do to dwell on dreams — a crescent moon and quiet stars
  moon: function (g) {
    var mx = TW * 0.8, my = TH * 0.76;
    var halo = g.createRadialGradient(mx, my, 40, mx, my, 220);
    halo.addColorStop(0, 'rgba(214,180,120,0.22)'); halo.addColorStop(1, 'rgba(214,180,120,0)');
    g.fillStyle = halo; g.fillRect(0, 0, TW, TH);
    g.save(); g.beginPath(); g.rect(0, 0, TW, TH); g.arc(mx + 36, my - 24, 70, 0, Math.PI * 2, true); g.clip('evenodd');
    g.fillStyle = '#d4ad6c'; g.beginPath(); g.arc(mx, my, 78, 0, Math.PI * 2); g.fill();
    g.restore();
    [[0.64, 0.7, 13], [0.92, 0.62, 10], [0.7, 0.88, 8], [0.95, 0.86, 12], [0.58, 0.82, 6], [0.86, 0.94, 6]].forEach(function (s) { sparkle(g, s[0] * TW, s[1] * TH, s[2], 'rgba(196,158,96,0.9)'); });
    g.fillStyle = 'rgba(214,190,150,0.35)';
    [[0.68, 0.93, 90], [0.76, 0.95, 70]].forEach(function (c) { g.beginPath(); g.ellipse(c[0] * TW, c[1] * TH, c[2], 22, 0, 0, Math.PI * 2); g.fill(); });
  },

  // One day at a time — a rising sun in line, warm wash
  sunrise: function (g) {
    var cx = TW * 0.78, hy = TH * 0.86;
    var w = g.createRadialGradient(cx, hy, 10, cx, hy, 240);
    w.addColorStop(0, 'rgba(240,196,170,0.55)'); w.addColorStop(1, 'rgba(240,196,170,0)');
    g.fillStyle = w; g.fillRect(0, 0, TW, TH);
    g.save(); g.beginPath(); g.rect(0, 0, TW, hy); g.clip();
    g.fillStyle = 'rgba(236,178,150,0.85)'; g.beginPath(); g.arc(cx, hy, 86, 0, Math.PI * 2); g.fill();
    g.restore();
    g.strokeStyle = 'rgba(141,133,182,0.75)'; g.lineWidth = 4; g.lineCap = 'round';
    for (var i = 0; i < 9; i++) {
      var a = Math.PI + (i + 0.5) / 9 * Math.PI;
      g.beginPath(); g.moveTo(cx + Math.cos(a) * 112, hy + Math.sin(a) * 112); g.lineTo(cx + Math.cos(a) * (150 + (i % 2) * 22), hy + Math.sin(a) * (150 + (i % 2) * 22)); g.stroke();
    }
    g.strokeStyle = 'rgba(141,133,182,0.65)'; g.lineWidth = 4;
    g.beginPath(); g.moveTo(TW * 0.5, hy); g.lineTo(TW * 1.02, hy); g.stroke();
    g.lineWidth = 3;
    [[0.58, 0.9, 0.7], [0.68, 0.93, 0.92], [0.82, 0.96, 0.97]].forEach(function (l) { g.beginPath(); g.moveTo(l[0] * TW, l[1] * TH); g.lineTo(l[2] * TW, l[1] * TH); g.stroke(); });
  },

  // Small steps every day — stepping stones climbing to a small flag
  steps: function (g) {
    var st = [[0.5, 0.96, 70], [0.6, 0.91, 62], [0.69, 0.855, 56], [0.77, 0.8, 50], [0.845, 0.75, 44], [0.91, 0.70, 40]];
    st.forEach(function (s, i) {
      var x = s[0] * TW, y = s[1] * TH, w = s[2];
      g.fillStyle = 'rgba(70,90,130,0.15)'; g.beginPath(); g.ellipse(x + 6, y + 10, w, w * 0.32, 0, 0, Math.PI * 2); g.fill();
      var gr = g.createLinearGradient(0, y - w * 0.3, 0, y + w * 0.3);
      gr.addColorStop(0, i % 2 ? '#a9bcd8' : '#b8c8e0'); gr.addColorStop(1, i % 2 ? '#7f97bb' : '#8ea4c6');
      g.fillStyle = gr; g.beginPath(); g.ellipse(x, y, w, w * 0.32, 0, 0, Math.PI * 2); g.fill();
      g.fillStyle = 'rgba(255,255,255,0.35)'; g.beginPath(); g.ellipse(x - w * 0.2, y - w * 0.1, w * 0.45, w * 0.1, 0, 0, Math.PI * 2); g.fill();
    });
    var fx = 0.915 * TW, fy = 0.69 * TH;
    g.strokeStyle = '#4c5f86'; g.lineWidth = 5; g.lineCap = 'round';
    g.beginPath(); g.moveTo(fx, fy); g.lineTo(fx, fy - 120); g.stroke();
    g.fillStyle = '#e0a37a'; g.beginPath(); g.moveTo(fx + 2, fy - 120); g.quadraticCurveTo(fx + 40, fy - 112, fx + 74, fy - 100); g.quadraticCurveTo(fx + 40, fy - 90, fx + 2, fy - 80); g.closePath(); g.fill();
  },

  // Stay curious — a paper plane looping on a dashed trail
  plane: function (g) {
    g.strokeStyle = 'rgba(110,126,152,0.6)'; g.lineWidth = 4; g.setLineDash([14, 14]); g.lineCap = 'round';
    g.beginPath(); g.moveTo(TW * 0.42, TH * 0.96);
    g.bezierCurveTo(TW * 0.6, TH * 0.86, TW * 0.7, TH * 1.0, TW * 0.66, TH * 0.86);
    g.bezierCurveTo(TW * 0.62, TH * 0.74, TW * 0.76, TH * 0.72, TW * 0.82, TH * 0.68);
    g.stroke(); g.setLineDash([]);
    g.save(); g.translate(TW * 0.86, TH * 0.65); g.rotate(-0.42);
    g.fillStyle = '#f8f9fb'; g.beginPath(); g.moveTo(90, 0); g.lineTo(-70, -46); g.lineTo(-30, 4); g.closePath(); g.fill();
    g.fillStyle = '#d3dae5'; g.beginPath(); g.moveTo(90, 0); g.lineTo(-30, 4); g.lineTo(-52, 46); g.closePath(); g.fill();
    g.fillStyle = '#b8c2d1'; g.beginPath(); g.moveTo(90, 0); g.lineTo(-30, 4); g.lineTo(-40, 18); g.closePath(); g.fill();
    g.strokeStyle = 'rgba(100,114,140,0.5)'; g.lineWidth = 2; g.beginPath(); g.moveTo(90, 0); g.lineTo(-70, -46); g.lineTo(-30, 4); g.lineTo(-52, 46); g.closePath(); g.stroke();
    g.restore();
  },

  // Trust the journey — a striped hot-air balloon among soft clouds
  balloon: function (g) {
    var bx = TW * 0.79, by = TH * 0.66, R = 100;
    softCloud(g, TW * 0.62, TH * 0.9, 110, 'rgba(255,255,255,0.75)');
    softCloud(g, TW * 0.95, TH * 0.8, 80, 'rgba(255,255,255,0.7)');
    g.save();
    g.beginPath(); g.moveTo(bx, by + R * 1.3); g.bezierCurveTo(bx - R * 1.35, by + R * 0.3, bx - R * 1.1, by - R * 1.05, bx, by - R * 1.05);
    g.bezierCurveTo(bx + R * 1.1, by - R * 1.05, bx + R * 1.35, by + R * 0.3, bx, by + R * 1.3); g.closePath();
    g.clip();
    var cols = ['#e2a588', '#f6ebe2', '#c98f8a', '#f6ebe2', '#e2a588'];
    for (var i = 0; i < 5; i++) { g.fillStyle = cols[i]; g.beginPath(); g.ellipse(bx, by, R * (1.2 - i * 0.26), R * 1.4, 0, 0, Math.PI * 2); g.fill(); }
    var sh = g.createLinearGradient(bx - R, 0, bx + R, 0);
    sh.addColorStop(0, 'rgba(255,255,255,0.25)'); sh.addColorStop(0.6, 'rgba(0,0,0,0)'); sh.addColorStop(1, 'rgba(90,50,50,0.18)');
    g.fillStyle = sh; g.fillRect(bx - R * 1.5, by - R * 1.5, R * 3, R * 3);
    g.restore();
    g.strokeStyle = '#8a6a5c'; g.lineWidth = 2.5;
    g.beginPath(); g.moveTo(bx - 26, by + R * 1.22); g.lineTo(bx - 18, by + R * 1.62); g.moveTo(bx + 26, by + R * 1.22); g.lineTo(bx + 18, by + R * 1.62); g.stroke();
    g.fillStyle = '#9b7356'; roundRect(g, bx - 22, by + R * 1.6, 44, 32, 6); g.fill();
    softCloud(g, TW * 0.7, TH * 0.98, 90, 'rgba(255,255,255,0.8)');
  },

  // A little progress each day — three sprouts, each a little taller
  sprouts: function (g) {
    var base = TH * 0.95;
    g.fillStyle = 'rgba(160,140,120,0.35)';
    g.beginPath(); g.ellipse(TW * 0.79, base + 6, 230, 26, 0, 0, Math.PI * 2); g.fill();
    [[0.64, 60, 0.6], [0.78, 110, 0.85], [0.92, 170, 1.1]].forEach(function (s) {
      var x = s[0] * TW, h = s[1], k = s[2];
      g.strokeStyle = '#7f9d78'; g.lineWidth = 6 * k; g.lineCap = 'round';
      g.beginPath(); g.moveTo(x, base); g.quadraticCurveTo(x + 10, base - h * 0.5, x, base - h); g.stroke();
      leaf(g, x, base - h, 70 * k, -2.5, '#94b38b', 'rgba(236,244,232,0.7)');
      leaf(g, x, base - h, 64 * k, -0.6, '#a8c49f', 'rgba(236,244,232,0.7)');
      if (k > 1) leaf(g, x + 4, base - h * 0.55, 50, -0.4, '#a8c49f', 'rgba(236,244,232,0.7)');
    });
  },

  lineMountains: function (g) {
    g.save(); g.strokeStyle = 'rgba(226,232,244,0.62)'; g.lineWidth = 4; g.lineJoin = 'round'; g.lineCap = 'round';
    var P = function (x, y) { return [x * TW, y * TH]; };
    var path = [P(0.52, 0.97), P(0.63, 0.84), P(0.68, 0.88), P(0.79, 0.72), P(0.88, 0.85), P(0.92, 0.81), P(1.02, 0.95)];
    g.beginPath(); g.moveTo(path[0][0], path[0][1]); for (var i = 1; i < path.length; i++) g.lineTo(path[i][0], path[i][1]); g.stroke();
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(TW * 0.755, TH * 0.765); g.lineTo(TW * 0.775, TH * 0.78); g.lineTo(TW * 0.79, TH * 0.765); g.lineTo(TW * 0.81, TH * 0.785); g.lineTo(TW * 0.825, TH * 0.775); g.stroke();
    g.restore();
  }
};

function shade(hex, amt) {
  var n = parseInt(hex.slice(1), 16), r = n >> 16, gg = n >> 8 & 255, b = n & 255;
  var f = function (v) { return clamp(Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt), 0, 255); };
  return 'rgb(' + f(r) + ',' + f(gg) + ',' + f(b) + ')';
}

function wrap(g, text, maxW) {
  var out = [];
  text.split('\n').forEach(function (par) {
    var words = par.split(' '), line = '';
    words.forEach(function (w) {
      var t = line ? line + ' ' + w : w;
      if (g.measureText(t).width > maxW && line) { out.push(line); line = w; } else line = t;
    });
    out.push(line);
  });
  return out;
}

export function drawCard(def) {
  var th = THEMES[def.t], c = mk(TW, TH), g = c.getContext('2d');
  g.save();
  roundRect(g, 0, 0, TW, TH, TR); g.clip();
  var bg = g.createLinearGradient(0, 0, TW * 0.35, TH);
  bg.addColorStop(0, th.tint[0]); bg.addColorStop(1, th.tint[1]);
  g.fillStyle = bg; g.fillRect(0, 0, TW, TH);
  if (th.noise) {
    g.globalAlpha = th.noise; g.globalCompositeOperation = 'overlay';
    g.fillStyle = g.createPattern(getNoise(), 'repeat'); g.fillRect(0, 0, TW, TH);
    g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
  }
  if (th.dark && th.noise > 0.1) {
    var rr = rng(5);
    for (var b = 0; b < 26; b++) {
      var x = rr() * TW, y = rr() * TH, rad = 80 + rr() * 200;
      var mg = g.createRadialGradient(x, y, 0, x, y, rad);
      mg.addColorStop(0, 'rgba(255,255,255,' + (0.015 + rr() * 0.03) + ')'); mg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = mg; g.fillRect(x - rad, y - rad, rad * 2, rad * 2);
    }
  }
  if (!th.glass && !th.dark) {
    var fr = rng(def.q.length * 13 + 7);
    g.lineCap = 'round';
    for (var f = 0; f < 420; f++) {
      var fx = fr() * TW, fy = fr() * TH, fl = 6 + fr() * 22, fa = fr() * Math.PI;
      g.strokeStyle = fr() < 0.5 ? 'rgba(120,98,64,0.05)' : 'rgba(255,255,255,0.22)';
      g.lineWidth = 1 + fr() * 1.2;
      g.beginPath(); g.moveTo(fx, fy); g.quadraticCurveTo(fx + Math.cos(fa) * fl * 0.5 + 3, fy + Math.sin(fa) * fl * 0.5 - 3, fx + Math.cos(fa) * fl, fy + Math.sin(fa) * fl); g.stroke();
    }
  }
  if (!th.glass) {
    var vg = g.createRadialGradient(TW * 0.45, TH * 0.4, TW * 0.25, TW * 0.5, TH * 0.5, TW * 0.78);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, th.dark ? 'rgba(0,0,0,0.22)' : 'rgba(120,96,60,0.1)');
    g.fillStyle = vg; g.fillRect(0, 0, TW, TH);
  } else {
    var sh = g.createLinearGradient(0, 0, TW, TH);
    sh.addColorStop(0, 'rgba(255,255,255,0.3)'); sh.addColorStop(0.45, 'rgba(255,255,255,0.05)'); sh.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = sh; g.fillRect(0, 0, TW, TH);
  }
  var art = def.art || th.illus; if (art && ILLUS[art]) { g.save(); ILLUS[art](g); g.restore(); }

  // quote mark
  var padX = 134;
  g.textBaseline = 'alphabetic';
  g.fillStyle = th.mark; g.font = '600 200px ' + SERIF;
  g.fillText('“', padX - 8, 262);
  // quote
  // shrink until the quote fits above the attribution
  var size = 78, lines, maxW = TW - padX - 86;
  for (;;) {
    g.font = '400 ' + size + 'px ' + SERIF;
    lines = wrap(g, def.q, maxW);
    if (lines.length * size * 1.2 <= 300 || size <= 30) break;
    size -= 2;
  }
  var lh = size * 1.2, y0 = 336;
  g.fillStyle = th.text;
  lines.forEach(function (l, i) { g.fillText(l, padX, y0 + i * lh); });
  // attribution
  var ay = y0 + (lines.length - 1) * lh + 98;
  if (def.a) {
    g.fillStyle = th.attr;
    g.fillRect(padX + 2, ay - 12, 38, 3);
    var asize = 35;
    for (; asize > 24; asize -= 1) {
      g.font = '400 ' + asize + 'px ' + SANS;
      if (g.measureText(def.a).width <= maxW - 62) break;
    }
    g.fillText(def.a, padX + 62, ay);
  }
  g.restore();

  // rims
  if (th.glass) {
    g.strokeStyle = 'rgba(255,255,255,0.9)'; g.lineWidth = 6; roundRect(g, 3, 3, TW - 6, TH - 6, TR - 3); g.stroke();
    g.strokeStyle = 'rgba(255,255,255,0.45)'; g.lineWidth = 2; roundRect(g, 14, 14, TW - 28, TH - 28, TR - 12); g.stroke();
  }
  return c;
}

export function blurCanvas(src) {
  var mw = 256, mh = Math.round(256 * TH / TW), sw = 56, sh = Math.round(56 * TH / TW);
  var m = mk(mw, mh), gm = m.getContext('2d'); gm.imageSmoothingQuality = 'high'; gm.drawImage(src, 0, 0, mw, mh);
  var s = mk(sw, sh), gs = s.getContext('2d'); gs.imageSmoothingQuality = 'high'; gs.drawImage(m, 0, 0, sw, sh);
  var o = mk(mw, mh), go = o.getContext('2d'); go.imageSmoothingQuality = 'high'; go.drawImage(s, 0, 0, mw, mh);
  return o;
}

export function fontsReady() {
  if (!document.fonts || !document.fonts.load) return Promise.resolve();
  var loads = Promise.all([
    document.fonts.load('400 78px ' + SERIF),
    document.fonts.load('600 200px ' + SERIF),
    document.fonts.load('400 35px ' + SANS)
  ]).catch(function () {});
  return Promise.race([loads, new Promise(function (res) { setTimeout(res, 3000); })]);
}

export function setFonts() {
  SERIF = cssFont('--font-source-serif-4', SERIF);
  SANS = cssFont('--font-jost', SANS);
}

export function themeOf(name) { return THEMES[name] ? name : DEFAULT_THEME; }

// What the renderer needs to light a card of this theme.
export function look(name) {
  var th = THEMES[name];
  return { glass: !!th.glass, gloss: th.gloss, rim: th.rim, glow: th.glow, edge: th.edge };
}
