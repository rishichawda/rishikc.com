// Reads: the fonts the card faces are painted with. The page reads which faces it has, and whoever paints the cards (the
// worker, or the page when it has to) loads them.

// [stack, weight] pairs the card painting uses
var NEEDS = [['serif', '400'], ['serif', '600'], ['sans', '400']];

function cssFont(name) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function primary(stack) {
  return stack.split(',')[0].trim().replace(/^["']|["']$/g, '');
}

// "U+0000-00FF,U+0131" covers a code point?
function covers(range, cp) {
  return range.split(',').some(function (r) {
    var m = /U\+([0-9a-f]+)(?:-([0-9a-f]+))?/i.exec(r);
    return !!m && cp >= parseInt(m[1], 16) && cp <= parseInt(m[2] || m[1], 16);
  });
}

// Page side. Astro registers the fonts under hashed family names, so the stacks come from the CSS variables it defines, and
// the sources from the @font-face rules it writes. Only the faces a card needs are listed, in the subset that holds a space.
export function readFonts() {
  var stacks = { serif: cssFont('--font-source-serif-4'), sans: cssFont('--font-jost') }, faces = [];
  Array.prototype.forEach.call(document.styleSheets, function (sheet) {
    var rules;
    try { rules = sheet.cssRules; } catch (e) { return; }
    Array.prototype.forEach.call(rules, function (rule) {
      if (!(rule instanceof CSSFontFaceRule)) return;
      var st = rule.style, family = st.getPropertyValue('font-family').replace(/^["']|["']$/g, '');
      var src = /url\(["']?([^"')]+)["']?\)/.exec(st.getPropertyValue('src')), range = st.getPropertyValue('unicode-range');
      var weight = st.getPropertyValue('font-weight') || '400';
      var wanted = NEEDS.some(function (n) { return primary(stacks[n[0]]) === family && n[1] === weight; });
      if (!wanted || !src || (range && !covers(range, 32))) return;
      faces.push({ family: family, src: new URL(src[1], location.href).href, weight: weight, style: st.getPropertyValue('font-style') || 'normal' });
    });
  });
  return { serif: stacks.serif, sans: stacks.sans, faces: faces };
}

// Page side, for a worker: the face files as bytes, since a worker has no use for the page's @font-face rules and would
// download them a second time. Faces that fail to download are left out.
export function fetchFonts(fonts) {
  return Promise.all(fonts.faces.map(function (f) {
    return fetch(f.src).then(function (r) { return r.arrayBuffer(); }).then(function (data) {
      return { family: f.family, weight: f.weight, style: f.style, data: data };
    }).catch(function () { return null; });
  })).then(function (faces) {
    return { serif: fonts.serif, sans: fonts.sans, faces: faces.filter(Boolean) };
  });
}

// Resolves once the faces are loaded, or after a few seconds so a slow font never holds the cards back. On the page that
// means the page's own faces; in a worker it means the ones fetchFonts sent over.
export function loadFonts(fonts) {
  var loads, onPage = typeof document !== 'undefined';
  if (onPage ? !document.fonts || !document.fonts.load : !self.fonts || typeof FontFace === 'undefined') return Promise.resolve();
  if (onPage) {
    loads = NEEDS.map(function (n) { return document.fonts.load(n[1] + ' 16px ' + fonts[n[0]]); });
  } else {
    loads = fonts.faces.map(function (f) {
      var face = new FontFace(f.family, f.data, { weight: f.weight, style: f.style });
      self.fonts.add(face);
      return face.load();
    });
  }
  return Promise.race([Promise.all(loads).catch(function () {}), new Promise(function (res) { setTimeout(res, 3000); })]);
}
