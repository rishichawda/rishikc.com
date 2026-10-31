// Reads: the three.js quote-card stage. Runs in a worker on an OffscreenCanvas, or on the main thread when that is unavailable.
import * as THREE from 'three';
import { CW, CH, CR, BGW, BGH, BG_THEMES, clamp, mk, drawBackground, drawNight, drawShadow, photoBackground, blurBg } from './paint.js';

var CAMZ = 24, FOV = 30, TAN = Math.tan(FOV * Math.PI / 360), D2R = Math.PI / 180;

// Cluster slots measured from the 1536×1024 design: x, y (centre, px), card height (px), depth z, rotX, rotY, rotZ (deg).
// Ordered as a loop so each scroll step moves every card one slot along the spiral.
var SLOTS = [
  [760, 478, 390, 5.0, -4, 12, -4],
  [1228, 462, 290, 3.0, -5, -8, 8],
  [1308, 792, 235, 2.4, 6, -12, -10],
  [1196, 962, 150, -1.0, 8, -10, -3],
  [1098, 696, 66, -10, 0, -10, 4],
  [1505, 528, 125, -3.0, 0, -28, -9],
  [1448, 318, 145, -2.0, 4, -22, -5],
  [1130, 215, 165, -3.0, -4, 16, -11],
  [978, 505, 80, -11, 0, 10, -8],
  [745, 755, 62, -11, 0, -8, 4],
  [462, 962, 80, -6, 6, 12, 5],
  [140, 802, 88, -6, 4, 22, -12],
  [460, 556, 92, -8, 0, 14, -5],
  [42, 355, 86, -9, 0, 24, -14],
  [420, 180, 132, -4, -6, 16, -12],
  [105, 596, 185, -1.0, 0, 24, 7],
  [402, 772, 205, 1.5, -8, 16, 7],
  [250, 332, 300, 2.5, -6, 16, -20]
];
// The ring holds one slot per card. The first SLOTS.length - FAR_COUNT slots are the near cluster; the FAR_COUNT
// background slots resample to fit however many quotes there are, so the cluster never changes with the quote count.
var FAR_FROM = 8, FAR_COUNT = 7;

// ---------------------------------------------------------------- shaders
var VS_LIT = [
  'varying vec2 vUv; varying vec3 vW; varying vec3 vN;',
  'void main(){',
  '  vUv = uv;',
  '  vec4 wp = modelMatrix * vec4(position, 1.0);',
  '  vW = wp.xyz;',
  '  vN = normalize(mat3(modelMatrix) * normal);',
  '  gl_Position = projectionMatrix * viewMatrix * wp;',
  '}'
].join('\n');
var VS = 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }';

// Card face: texture (sharp/blurred by depth), frosted glass, gloss sweep, sky reflection, lit rim, haze.
var FS_FACE = [
  'uniform sampler2D map; uniform sampler2D mapB; uniform sampler2D bgMap;',
  'uniform float blur; uniform float fog; uniform float opacity; uniform float glass; uniform float gloss; uniform float rimK; uniform float hover;',
  'uniform vec3 haze; uniform vec3 lightDir; uniform vec3 bgPos; uniform vec2 bgScale; uniform vec2 size; uniform float radius;',
  'varying vec2 vUv; varying vec3 vW; varying vec3 vN;',
  'float sdRR(vec2 p, vec2 b, float r){ vec2 q = abs(p) - b + r; return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r; }',
  'vec3 envAt(vec3 R){ return texture2D(bgMap, clamp(vec2(0.5 + R.x * 0.45, 0.52 + R.y * 0.5), 0.0, 1.0)).rgb; }',
  'void main(){',
  '  vec4 ta = texture2D(map, vUv); vec4 tb = texture2D(mapB, vUv); vec4 t = mix(ta, tb, blur);',
  '  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;',
  '  vec3 V = normalize(cameraPosition - vW); vec3 L = normalize(lightDir);',
  '  float ndv = clamp(dot(N, V), 0.0, 1.0); float fres = pow(1.0 - ndv, 3.0);',
  '  vec2 p = (vUv - 0.5) * size; float sd = sdRR(p, size * 0.5, radius);',
  '  float aa = fwidth(sd) * 1.5 + 1e-4; float mask = 1.0 - smoothstep(-aa, aa * 0.25, sd);',
  '  float inside = max(-sd, 0.0); float px = fwidth(sd);',
  '  float rimW = max(0.022, px * 1.8); float far = clamp(px * 40.0, 0.0, 1.0);',
  '  vec3 R = reflect(-V, N); vec3 env = envAt(R);',
  '  vec3 base; float alpha;',
  '  if (glass > 0.5) {',
  '    vec3 C = cameraPosition; float k = (bgPos.z - C.z) / (vW.z - C.z); vec3 Q = C + (vW - C) * k;',
  '    vec2 buv = (Q.xy - bgPos.xy) / bgScale + 0.5 + N.xy * 0.02;',
  '    vec3 frost = texture2D(bgMap, clamp(buv, 0.0, 1.0)).rgb * 0.96 + 0.07;',
  '    base = t.rgb + frost * (1.0 - t.a);',
  '    alpha = mask * 0.97;',
  '  } else {',
  '    base = t.a > 0.001 ? t.rgb / t.a : vec3(0.0);',
  '    alpha = mix(mask, t.a, blur);',
  '    base *= 0.9 + 0.14 * max(dot(N, L), 0.0);',
  '  }',
  '  float u = dot(vUv - 0.5, vec2(0.7071, -0.7071));',
  '  float bc = -0.34 + (R.x - R.y) * 0.9;',
  '  float band = exp(-pow((u - bc) / 0.17, 2.0)) + 0.5 * exp(-pow((u - bc - 0.3) / 0.06, 2.0));',
  '  base += band * gloss * (1.0 - blur) * (1.0 - far * 0.6);',
  '  base = mix(base, env, clamp((0.03 + fres * 0.6) * (glass > 0.5 ? 1.5 : 0.55), 0.0, 0.55));',
  '  vec2 dir = normalize(p + vec2(1e-5));',
  '  float lit = 0.5 + 0.5 * dot(dir, vec2(-0.5446, 0.8387));',
  '  base += exp(-inside / rimW) * rimK * (0.35 + 0.65 * lit) * (1.0 - blur) * (1.0 - far * 0.8);',
  '  base += exp(-inside / 0.09) * rimK * 0.18 * lit * (1.0 - blur);',
  '  base -= exp(-inside / 0.07) * (1.0 - lit) * 0.05 * (1.0 - glass);',
  '  base += hover * 0.025;',
  '  base = mix(base, haze, fog);',
  '  float o = alpha * opacity;',
  '  gl_FragColor = vec4(base * o, o);',
  '}'
].join('\n');

// Card body (thickness + rounded bevel): lit, glossy, sky reflection; translucent for glass.
var FS_BODY = [
  'uniform vec3 color; uniform float opacity; uniform float fog; uniform float glass; uniform float sparkle;',
  'uniform vec3 haze; uniform vec3 lightDir; uniform sampler2D bgMap;',
  'varying vec2 vUv; varying vec3 vW; varying vec3 vN;',
  'void main(){',
  '  vec3 N = normalize(vN); if (!gl_FrontFacing) N = -N;',
  '  vec3 V = normalize(cameraPosition - vW); vec3 L = normalize(lightDir);',
  '  float ndl = max(dot(N, L), 0.0); float ndv = clamp(dot(N, V), 0.0, 1.0); float fres = pow(1.0 - ndv, 2.0);',
  '  vec3 R = reflect(-V, N);',
  '  vec3 env = texture2D(bgMap, clamp(vec2(0.5 + R.x * 0.45, 0.52 + R.y * 0.5), 0.0, 1.0)).rgb;',
  '  vec3 col = color * (0.6 + 0.5 * ndl);',
  '  col += pow(max(dot(N, normalize(L + V)), 0.0), 36.0) * (glass > 0.5 ? 0.9 : 0.35) * sparkle;',
  '  col = mix(col, env, fres * (glass > 0.5 ? 0.55 : 0.22));',
  '  float a = glass > 0.5 ? clamp(0.5 + 0.4 * fres + 0.3 * ndl, 0.0, 1.0) : 1.0;',
  '  col = mix(col, haze, fog);',
  '  float o = a * opacity;',
  '  gl_FragColor = vec4(col * o, o);',
  '}'
].join('\n');

// Soft shapes (drop shadow, halo glow) from one blurred rounded-rect texture.
var FS_SOFT = 'uniform sampler2D map; uniform float opacity; uniform vec3 color; varying vec2 vUv; void main(){ float a = texture2D(map, vUv).a * opacity; gl_FragColor = vec4(color * a, a); }';
var FS_BG = 'uniform sampler2D map; varying vec2 vUv; void main(){ gl_FragColor = texture2D(map, vUv); }';

// Catmull-Rom across the looped slot list
function cr(a, b, c, d, t) {
  var t2 = t * t, t3 = t2 * t;
  return 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
}
function interp(p0, p1, p2, p3, t, out) {
  out.x = cr(p0[0], p1[0], p2[0], p3[0], t);
  out.y = cr(p0[1], p1[1], p2[1], p3[1], t);
  out.h = Math.max(30, cr(p0[2], p1[2], p2[2], p3[2], t));
  out.z = cr(p0[3], p1[3], p2[3], p3[3], t);
  out.rx = cr(p0[4], p1[4], p2[4], p3[4], t);
  out.ry = cr(p0[5], p1[5], p2[5], p3[5], t);
  out.rz = cr(p0[6], p1[6], p2[6], p3[6], t);
  return out;
}

function sampleSlots(slots, d, out) {
  var n = slots.length, i = Math.floor(d);
  return interp(slots[(i - 1 + n) % n], slots[i % n], slots[(i + 1) % n], slots[(i + 2) % n], d - i, out);
}

function buildSlots(n) {
  var count = n - (SLOTS.length - FAR_COUNT), s = {}, resampled = [];
  if (count < 1) return SLOTS.slice(0, n);
  for (var k = 0; k < count; k++) {
    var u = count > 1 ? k * (FAR_COUNT - 1) / (count - 1) : 0, i = Math.min(Math.floor(u), FAR_COUNT - 2);
    var p0 = SLOTS[FAR_FROM + Math.max(i - 1, -1)], p1 = SLOTS[FAR_FROM + i], p2 = SLOTS[FAR_FROM + i + 1], p3 = SLOTS[FAR_FROM + Math.min(i + 2, FAR_COUNT)];
    interp(p0, p1, p2, p3, u - i, s);
    resampled.push([s.x, s.y, s.h, s.z, s.rx, s.ry, s.rz]);
  }
  return SLOTS.slice(0, FAR_FROM).concat(resampled, SLOTS.slice(FAR_FROM + FAR_COUNT));
}

function hexVec(hex) {
  var n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3((n >> 16) / 255, (n >> 8 & 255) / 255, (n & 255) / 255);
}

// Bevel / thickness of the card stock (world units)
var BS = 0.04, BT = 0.035, BD = 0.05;
var FW = CW - 2 * BS, FH = CH - 2 * BS;

var nextFrame = typeof requestAnimationFrame === 'function' ? function (f) { return requestAnimationFrame(f); } : function (f) { return setTimeout(function () { f(performance.now()); }, 16); };
var cancelFrame = typeof cancelAnimationFrame === 'function' ? function (id) { cancelAnimationFrame(id); } : function (id) { clearTimeout(id); };

// ---------------------------------------------------------------- renderer
// The page (or the worker's host) drives this with messages, and gets messages back through post:
//   in:  init { canvas, cards: [look], theme, backgrounds: { light, dark }, reduced, w, h, dpr }, size { w, h, dpr }, theme { name },
//        card { i, face, blur } (ImageBitmaps, flipped), nudge { amount }, step { d }, hover { x, y } (-1..1, y down), leave, tap { x, y }, dispose
//   out: failed (no WebGL), built (every card is in and fading up), change { idx }, cursor { pointer }
export function createRenderer(post) {
  var run = null;
  return {
    handle: function (m) {
      if (m.type === 'init') run = start(m, post);
      else if (run && run[m.type]) run[m.type](m);
    }
  };
}

function start(m, post) {
  var N = m.cards.length, slots = buildSlots(N), renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas: m.canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
  } catch (e) {
    post({ type: 'failed' });
    return null;
  }
  renderer.setClearColor(0xc3d3ea, 1);
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(FOV, 1, 1, 200);
  camera.position.set(0, 0, CAMZ);
  var maxAniso = renderer.capabilities.getMaxAnisotropy();
  var textures = [], geos = [], mats = [];
  var reduced = m.reduced;
  var HAZE = new THREE.Vector3(0.86, 0.88, 0.94);
  var LIGHT = new THREE.Vector3(-0.45, 0.75, 0.9).normalize();
  var BG_POS = new THREE.Vector3(0, 0, -70);
  var BG_SCALE = new THREE.Vector2(1, 1);
  var FACE_SIZE = new THREE.Vector2(FW, FH);
  var disposed = false;

  // src is a canvas, or an ImageBitmap that was already flipped and premultiplied when it was made
  function tex(src, mip) {
    var t = new THREE.CanvasTexture(src), bitmap = typeof ImageBitmap !== 'undefined' && src instanceof ImageBitmap;
    t.premultiplyAlpha = !bitmap;
    t.flipY = !bitmap;
    t.generateMipmaps = mip !== false;
    t.minFilter = mip === false ? THREE.LinearFilter : THREE.LinearMipmapLinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.anisotropy = maxAniso;
    t.needsUpdate = true;
    textures.push(t); return t;
  }

  // background + its blurred twin (frosted glass and sky reflections)
  var bgTex = tex(mk(BGW, BGH)), frostTex = tex(blurBg(mk(BGW, BGH)), false);
  function setBackground(c) {
    bgTex.image = c; bgTex.needsUpdate = true;
    frostTex.image = blurBg(c); frostTex.needsUpdate = true;
  }
  // the background follows the site theme: a photo per theme, with the drawn sky or night until it loads
  var themeName = '';
  function applyTheme(name) {
    if (name === themeName) return;
    themeName = name;
    var th = BG_THEMES[name], url = m.backgrounds && m.backgrounds[name];
    HAZE.set(th.haze[0], th.haze[1], th.haze[2]);
    setBackground(name === 'dark' ? drawNight() : drawBackground());
    if (!url) return;
    fetch(url).then(function (r) { return r.blob(); }).then(createImageBitmap).then(function (photo) {
      if (!disposed && themeName === name) setBackground(photoBackground(photo, th));
      photo.close();
    }).catch(function () {});
  }
  applyTheme(m.theme);
  var bgMat = new THREE.ShaderMaterial({ uniforms: { map: { value: bgTex } }, vertexShader: VS, fragmentShader: FS_BG, depthWrite: false, depthTest: false });
  var bgGeo = new THREE.PlaneGeometry(1, 1);
  var bg = new THREE.Mesh(bgGeo, bgMat); bg.position.copy(BG_POS); bg.renderOrder = -10;
  scene.add(bg); geos.push(bgGeo); mats.push(bgMat);

  // shared card geometry
  var bodyGeo = (function () {
    var w = CW - 2 * BS, h = CH - 2 * BS, r = CR - BS, s = new THREE.Shape(), x = -w / 2, y = -h / 2;
    s.moveTo(x + r, y); s.lineTo(x + w - r, y); s.absarc(x + w - r, y + r, r, -Math.PI / 2, 0, false);
    s.lineTo(x + w, y + h - r); s.absarc(x + w - r, y + h - r, r, 0, Math.PI / 2, false);
    s.lineTo(x + r, y + h); s.absarc(x + r, y + h - r, r, Math.PI / 2, Math.PI, false);
    s.lineTo(x, y + r); s.absarc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
    var gg = new THREE.ExtrudeGeometry(s, { depth: BD, bevelEnabled: true, bevelThickness: BT, bevelSize: BS, bevelSegments: 5, curveSegments: 12 });
    gg.translate(0, 0, -(BD + BT));
    return gg;
  })();
  var faceGeo = new THREE.PlaneGeometry(FW, FH);
  var softGeo = new THREE.PlaneGeometry(CW * 1.5, CH * 1.5);
  geos.push(bodyGeo, faceGeo, softGeo);
  var softTex = tex(drawShadow(), false);
  var WHITE = new THREE.Vector3(1, 1, 1), SHADOW = new THREE.Vector3(0.1, 0.14, 0.24);

  var cards = m.cards.map(function (th, i) {
    var group = new THREE.Group();
    var faceU = {
      map: { value: null }, mapB: { value: null }, bgMap: { value: frostTex },
      blur: { value: 0 }, fog: { value: 0 }, opacity: { value: 0 }, hover: { value: 0 },
      glass: { value: th.glass ? 1 : 0 }, gloss: { value: th.gloss }, rimK: { value: th.rim },
      haze: { value: HAZE }, lightDir: { value: LIGHT }, bgPos: { value: BG_POS }, bgScale: { value: BG_SCALE },
      size: { value: FACE_SIZE }, radius: { value: CR - BS }
    };
    var faceMat = new THREE.ShaderMaterial({ uniforms: faceU, vertexShader: VS_LIT, fragmentShader: FS_FACE, transparent: true, premultipliedAlpha: true, depthWrite: false, depthTest: false, extensions: { derivatives: true } });
    var face = new THREE.Mesh(faceGeo, faceMat); face.position.z = 0.002;
    var bodyU = { sparkle: { value: 1 }, color: { value: hexVec(th.edge) }, opacity: { value: 0 }, fog: { value: 0 }, glass: { value: th.glass ? 1 : 0 }, haze: { value: HAZE }, lightDir: { value: LIGHT }, bgMap: { value: frostTex } };
    var bodyMat = new THREE.ShaderMaterial({ uniforms: bodyU, vertexShader: VS_LIT, fragmentShader: FS_BODY, transparent: true, premultipliedAlpha: true, depthWrite: false, depthTest: false });
    var body = new THREE.Mesh(bodyGeo, bodyMat);
    var shU = { map: { value: softTex }, opacity: { value: 0 }, color: { value: SHADOW } };
    var sh = new THREE.Mesh(softGeo, new THREE.ShaderMaterial({ uniforms: shU, vertexShader: VS, fragmentShader: FS_SOFT, transparent: true, premultipliedAlpha: true, depthWrite: false, depthTest: false }));
    sh.position.set(0.22, -0.5, -0.75); sh.scale.set(1.04, 1.04, 1);
    var glU = { map: { value: softTex }, opacity: { value: 0 }, color: { value: WHITE } };
    var gl = new THREE.Mesh(softGeo, new THREE.ShaderMaterial({ uniforms: glU, vertexShader: VS, fragmentShader: FS_SOFT, transparent: true, premultipliedAlpha: true, depthWrite: false, depthTest: false }));
    gl.position.set(0, 0, -0.16); gl.scale.set(1.12, 1.14, 1);
    group.add(sh); group.add(gl); group.add(body); group.add(face);
    group.visible = false;
    scene.add(group);
    mats.push(faceMat, bodyMat, sh.material, gl.material);
    face.userData.card = i;
    return {
      th: th, group: group, face: face, body: body, sh: sh, gl: gl,
      faceU: faceU, bodyU: bodyU, shU: shU, glU: glU, phase: i * 1.73, z: 0, hov: 0,
      p: null, v: { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 0 }
    };
  });
  var faces = cards.map(function (c) { return c.face; });

  // layout
  var spreadX = 1, spreadY = 1, sizeK = 1, focusDrop = 0;
  function resize(s) {
    var w = s.w || 1, h = s.h || 1, a = w / h;
    renderer.setPixelRatio(Math.min(s.dpr || 1, 2));
    renderer.setSize(w, h, false);
    camera.aspect = a; camera.updateProjectionMatrix();
    spreadX = clamp(a / 1.5, 0.4, 1.3);
    spreadY = a < 1 ? 1.06 : 1;
    sizeK = clamp(0.33 + a * 0.45, 0.6, 1);
    // on wide, large stages the title leaves room: sit the current card lower (design px)
    focusDrop = 64 * clamp((a - 1.35) / 0.5, 0, 1) * clamp((w - 900) / 500, 0, 1);
    var hh = (CAMZ + 70) * TAN * 1.1, hw = hh * a, imgA = BGW / BGH;
    var ph = Math.max(2 * hh, 2 * hw / imgA);
    bg.scale.set(ph * imgA, ph, 1);
    BG_SCALE.set(ph * imgA, ph);
  }
  resize(m);

  // ---------------------------------------------------------------- input
  var current = -1.6, cvel = 0, target = 0, lastInput = -1e9, lastDir = 1;
  var mx = 0, my = 0, smx = 0, smy = 0, ndc = new THREE.Vector2(9, 9), hovered = -1, pointer = false;
  var raycaster = new THREE.Raycaster();
  function nudge(amount) {
    target = clamp(target + amount, current - 2.4, current + 2.4);
    if (amount) lastDir = amount > 0 ? 1 : -1;
    lastInput = performance.now();
  }
  function pick(nx, ny) {
    ndc.set(nx, -ny);
    raycaster.setFromCamera(ndc, camera);
    var hits = raycaster.intersectObjects(faces, false);
    for (var i = 0; i < hits.length; i++) {
      var c = cards[hits[i].object.userData.card];
      if (c.faceU.opacity.value > 0.35) return hits[i].object.userData.card;
    }
    return -1;
  }
  function focusCard(i) {
    var base = Math.round(target);
    var delta = ((i - base) % N + N) % N;
    if (delta > N / 2) delta -= N;
    if (!delta) return;
    target = base + delta; lastDir = delta > 0 ? 1 : -1; lastInput = -1e9;
  }
  function step(d) {
    target = Math.round(target) + d; lastDir = d > 0 ? 1 : -1; lastInput = -1e9;
  }

  // card faces arrive from the page once its fonts are in
  var readyAt = 0, built = false, got = 0;
  function addCard(c) {
    var card = cards[c.i];
    card.faceU.map.value = tex(c.face);
    card.faceU.mapB.value = tex(c.blur);
    if (++got < N) return;
    cards.forEach(function (k) { k.group.visible = true; });
    built = true; readyAt = performance.now();
    post({ type: 'built' });
  }

  // ---------------------------------------------------------------- physics
  var KEYS = ['x', 'y', 'z', 'rx', 'ry', 'rz', 's'];
  function springTo(c, tg, dt, k, zeta) {
    if (!c.p) { c.p = {}; for (var j = 0; j < KEYS.length; j++) c.p[KEYS[j]] = tg[KEYS[j]]; return; }
    var damp = 2 * zeta * Math.sqrt(k);
    for (var sub = 0; sub < 2; sub++) {
      var h = dt / 2;
      for (var q = 0; q < KEYS.length; q++) {
        var key = KEYS[q];
        var acc = k * (tg[key] - c.p[key]) - damp * c.v[key];
        c.v[key] += acc * h; c.p[key] += c.v[key] * h;
      }
    }
  }

  var tmp = {}, tg = {}, lastT = 0, lastIdx = -1, raf = 0;
  function frame(now) {
    raf = nextFrame(frame);
    var dt = Math.min(0.04, lastT ? (now - lastT) / 1000 : 0.016); lastT = now;
    var t = now / 1000;

    if (built) {
      // once input pauses, glide on to the nearest card in the scroll direction
      if (now - lastInput > 160) target = lastDir > 0 ? Math.ceil(target - 0.16) : Math.floor(target + 0.16);
      // scroll position rides a slightly under-damped spring: inertia without snapping
      var ks = reduced ? 120 : 24, cs = 2 * 0.86 * Math.sqrt(ks);
      for (var sub = 0; sub < 2; sub++) {
        var a = ks * (target - current) - cs * cvel;
        cvel += a * dt / 2; current += cvel * dt / 2;
      }
      if (Math.abs(target - current) < 1e-4 && Math.abs(cvel) < 1e-4) { current = target; cvel = 0; }
    }
    smx += (mx - smx) * (1 - Math.exp(-dt * 2.5));
    smy += (my - smy) * (1 - Math.exp(-dt * 2.5));
    camera.position.x = smx * 0.6; camera.position.y = -smy * 0.4;
    camera.lookAt(0, 0, 0);
    camera.updateMatrixWorld();

    hovered = built && ndc.x < 2 ? pick(ndc.x, -ndc.y) : -1;
    var overCard = hovered >= 0 && hovered !== lastIdx;
    if (overCard !== pointer) { pointer = overCard; post({ type: 'cursor', pointer: pointer }); }

    var fl = reduced ? 0 : 1;
    var appearT = built ? clamp((now - readyAt) / 1500, 0, 1) : 0;
    for (var i = 0; i < N; i++) {
      var c = cards[i];
      var d = ((i - current) % N + N) % N;
      sampleSlots(slots, d, tmp);
      c.hov += ((i === hovered ? 1 : 0) - c.hov) * (1 - Math.exp(-dt * 9));
      var z = tmp.z;
      var D = CAMZ - tmp.z, hh = D * TAN;
      var focus = Math.max(0, 1 - Math.min(d, N - d));
      tg.x = (tmp.x - 768) / 512 * hh * spreadX + Math.cos(t * 0.37 + c.phase) * 0.06 * fl;
      tg.y = -(tmp.y + focus * focusDrop - 512) / 512 * hh * spreadY + Math.sin(t * 0.53 + c.phase) * 0.1 * fl;
      tg.z = z;
      tg.s = Math.max(0.04, tmp.h / 512 * hh * sizeK / CH) * (1 + c.hov * 0.035);
      tg.rx = (tmp.rx - smy * 6 * focus) * D2R + Math.sin(t * 0.41 + c.phase) * 0.022 * fl;
      tg.ry = (tmp.ry - smx * 8 * focus) * D2R + Math.cos(t * 0.33 + c.phase) * 0.028 * fl;
      tg.rz = tmp.rz * D2R + Math.sin(t * 0.29 + c.phase) * 0.015 * fl;
      // nearer cards are stiffer; far ones trail a little, which reads as depth
      var k = tmp.z > 0 ? 90 : 55;
      springTo(c, tg, dt, reduced ? 400 : k, 0.72);
      var P = c.p, Vv = c.v;
      c.group.position.set(P.x, P.y, P.z);
      // bank into the direction of travel
      c.group.rotation.set(
        P.rx + clamp(-Vv.y * 0.045, -0.3, 0.3),
        P.ry + clamp(Vv.x * 0.045, -0.35, 0.35),
        P.rz + clamp(-Vv.x * 0.012, -0.12, 0.12)
      );
      c.group.scale.setScalar(Math.max(0.03, P.s));

      var zz = P.z;
      var blur = Math.pow(clamp((2.2 - zz) / 12, 0, 1), 0.7);
      var fog = clamp((3 - zz) / 16, 0, 0.6);
      var stagger = clamp(appearT * 1.6 - (i / N) * 0.6, 0, 1);
      var op = (1 - clamp((1.5 - zz) / 14, 0, 0.42)) * stagger * stagger * (3 - 2 * stagger);
      c.faceU.blur.value = blur; c.faceU.fog.value = fog; c.faceU.opacity.value = op; c.faceU.hover.value = c.hov;
      c.bodyU.opacity.value = op * (1 - blur); c.bodyU.fog.value = fog; c.bodyU.sparkle.value = clamp((tmp.h - 90) / 140, 0, 1);
      c.shU.opacity.value = 0.3 * op * (1 - blur * 0.85);
      c.glU.opacity.value = op * (1 - blur) * (c.th.glow * (0.35 + 0.65 * focus) + 0.25 * c.hov);
      c.z = Math.round(zz * 200) / 200 + i * 1e-4; c.idx = i;
    }
    var order = cards.slice().sort(function (a, b) { return (a.z - b.z) || (a.idx - b.idx); });
    for (var r = 0; r < order.length; r++) {
      order[r].sh.renderOrder = r * 4; order[r].gl.renderOrder = r * 4 + 1;
      order[r].body.renderOrder = r * 4 + 2; order[r].face.renderOrder = r * 4 + 3;
    }
    renderer.render(scene, camera);

    if (built) {
      var idx = ((Math.round(current) % N) + N) % N;
      if (idx !== lastIdx) { lastIdx = idx; post({ type: 'change', idx: idx }); }
    }
  }
  raf = nextFrame(frame);

  return {
    size: resize,
    theme: function (s) { applyTheme(s.name); },
    card: addCard,
    nudge: function (s) { nudge(s.amount); },
    step: function (s) { step(s.d); },
    hover: function (s) { mx = clamp(s.x, -1, 1); my = clamp(s.y, -1, 1); ndc.set(s.x, -s.y); },
    leave: function () { mx = 0; my = 0; ndc.set(9, 9); },
    tap: function (s) { var i = pick(s.x, s.y); if (i >= 0) focusCard(i); },
    dispose: function () {
      disposed = true;
      cancelFrame(raf);
      textures.forEach(function (x) { x.dispose(); });
      geos.forEach(function (x) { x.dispose(); });
      mats.forEach(function (x) { x.dispose(); });
      renderer.dispose();
    }
  };
}
