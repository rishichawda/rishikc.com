/**
 * Writes rights metadata (EXIF and XMP) into finished JPEG and WebP files by editing their containers.
 * The compressed image data is never decoded or re-encoded, so the pixels and the file's quality are
 * exactly what the build produced. Plain Node, so the build integration can use it.
 */
const escapeXml = (text) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * The XMP packet for a photograph's rights. `rights` holds: creator, notice, usageTerms, webStatement,
 * contactUrl, credit, source, dataMining, digitalSourceType.
 */
export function buildXmp(rights) {
  const seq = (value) => `<rdf:Seq><rdf:li>${escapeXml(value)}</rdf:li></rdf:Seq>`;
  const alt = (value) => `<rdf:Alt><rdf:li xml:lang="x-default">${escapeXml(value)}</rdf:li></rdf:Alt>`;
  const struct = (fields) =>
    `<rdf:Seq><rdf:li rdf:parseType="Resource">${fields.map(([tag, value]) => `<${tag}>${escapeXml(value)}</${tag}>`).join('')}</rdf:li></rdf:Seq>`;
  return `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
<rdf:Description rdf:about=""
 xmlns:dc="http://purl.org/dc/elements/1.1/"
 xmlns:photoshop="http://ns.adobe.com/photoshop/1.0/"
 xmlns:plus="http://ns.useplus.org/ldf/xmp/1.0/"
 xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/"
 xmlns:Iptc4xmpCore="http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/"
 xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/">
<dc:creator>${seq(rights.creator)}</dc:creator>
<dc:rights>${alt(rights.notice)}</dc:rights>
<photoshop:Credit>${escapeXml(rights.credit)}</photoshop:Credit>
<photoshop:Source>${escapeXml(rights.source)}</photoshop:Source>
<xmpRights:Marked>True</xmpRights:Marked>
<xmpRights:UsageTerms>${alt(rights.usageTerms)}</xmpRights:UsageTerms>
<xmpRights:WebStatement>${escapeXml(rights.webStatement)}</xmpRights:WebStatement>
<plus:CopyrightOwner>${struct([['plus:CopyrightOwnerName', rights.creator]])}</plus:CopyrightOwner>
<plus:ImageCreator>${struct([['plus:ImageCreatorName', rights.creator]])}</plus:ImageCreator>
<plus:Licensor>${struct([['plus:LicensorName', rights.creator], ['plus:LicensorURL', rights.contactUrl]])}</plus:Licensor>
<plus:DataMining>http://ns.useplus.org/ldf/vocab/${escapeXml(rights.dataMining)}</plus:DataMining>
<Iptc4xmpCore:CreatorContactInfo rdf:parseType="Resource"><Iptc4xmpCore:CiUrlWork>${escapeXml(rights.contactUrl)}</Iptc4xmpCore:CiUrlWork></Iptc4xmpCore:CreatorContactInfo>
<Iptc4xmpExt:DigitalSourceType>${escapeXml(rights.digitalSourceType)}</Iptc4xmpExt:DigitalSourceType>
</rdf:Description>
</rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;
}

/** A little-endian TIFF block with the Artist and Copyright tags, as EXIF stores them. */
export function buildExif(rights) {
  // Cameras and phones write the copyright sign in UTF-8 (two bytes), and exiftool shows a lone latin1 byte as a
  // broken character, so the text is UTF-8.
  const ascii = (text) => Buffer.from(`${text}\0`, 'utf8');
  const values = [
    [0x013b, ascii(rights.creator)], // Artist
    [0x8298, ascii(rights.notice)], // Copyright
  ];
  const headerSize = 8;
  const ifdSize = 2 + values.length * 12 + 4;
  // TIFF stores a value of four bytes or fewer in the entry itself, and a longer one at an offset.
  const head = Buffer.alloc(headerSize + ifdSize);
  head.write('II', 0, 'latin1');
  head.writeUInt16LE(42, 2);
  head.writeUInt32LE(headerSize, 4);
  head.writeUInt16LE(values.length, headerSize);
  let dataOffset = head.length;
  const chunks = [];
  values.forEach(([tag, data], index) => {
    const entry = headerSize + 2 + index * 12;
    head.writeUInt16LE(tag, entry);
    head.writeUInt16LE(2, entry + 2); // ASCII
    head.writeUInt32LE(data.length, entry + 4);
    if (data.length <= 4) return data.copy(head, entry + 8);
    head.writeUInt32LE(dataOffset, entry + 8);
    // TIFF values start on even offsets.
    const padded = data.length % 2 ? Buffer.concat([data, Buffer.alloc(1)]) : data;
    chunks.push(padded);
    dataOffset += padded.length;
  });
  return Buffer.concat([head, ...chunks]);
}

const TIFF_TYPE_SIZE = { 1: 1, 2: 1, 3: 2, 4: 4, 5: 8, 6: 1, 7: 1, 8: 2, 9: 4, 10: 8, 11: 4, 12: 8 };

/** The entries of IFD0 in a TIFF block (the main tag directory of EXIF), and the offset of the next directory. */
function readIfd0(tiff) {
  const order = tiff.toString('latin1', 0, 2);
  if (order !== 'II' && order !== 'MM') throw new Error('not a TIFF block');
  const little = order === 'II';
  const u16 = (at) => (little ? tiff.readUInt16LE(at) : tiff.readUInt16BE(at));
  const u32 = (at) => (little ? tiff.readUInt32LE(at) : tiff.readUInt32BE(at));
  if (u16(2) !== 42) throw new Error('bad TIFF header');
  const ifd = u32(4);
  const count = u16(ifd);
  const entries = [];
  for (let index = 0; index < count; index += 1) {
    const at = ifd + 2 + index * 12;
    const type = u16(at + 2);
    const size = (TIFF_TYPE_SIZE[type] ?? 1) * u32(at + 4);
    const from = size <= 4 ? at + 8 : u32(at + 8);
    if (from + size > tiff.length) throw new Error('TIFF value is out of range');
    entries.push({ tag: u16(at), type, count: u32(at + 4), value: tiff.subarray(from, from + size), raw: tiff.subarray(at, at + 12) });
  }
  return { little, entries, next: u32(ifd + 2 + count * 12) };
}

/** The TIFF block of a JPEG's Exif segment or a WebP's EXIF chunk, or undefined when the file has none. */
export function extractExif(file) {
  if (file[0] === 0xff && file[1] === 0xd8) {
    for (let at = 2; at + 4 <= file.length && file[at] === 0xff && file[at + 1] !== 0xda; ) {
      const length = file.readUInt16BE(at + 2);
      if (file[at + 1] === 0xe1 && file.toString('latin1', at + 4, at + 10) === 'Exif\0\0') return file.subarray(at + 10, at + 2 + length);
      at += 2 + length;
    }
    return undefined;
  }
  for (let at = 12; at + 8 <= file.length; ) {
    const size = file.readUInt32LE(at + 4);
    if (file.toString('latin1', at, at + 4) === 'EXIF') {
      const data = file.subarray(at + 8, at + 8 + size);
      return data.toString('latin1', 0, 6) === 'Exif\0\0' ? data.subarray(6) : data;
    }
    at += 8 + size + (size % 2);
  }
  return undefined;
}

/** The text of an ASCII tag in IFD0 of a TIFF block, without its terminating NUL, or undefined. */
export function exifAscii(tiff, tag) {
  const entry = readIfd0(tiff).entries.find((e) => e.tag === tag && e.type === 2);
  return entry?.value.toString('utf8').replace(/\0+$/, '');
}

/**
 * `existing` (a TIFF block from a camera or an editor) with the ASCII tags of `ours` in its IFD0, replacing any
 * tag it already had. Nothing already in the block moves: a new IFD0 and the new values are added at the end
 * and the header points to them, so every offset in the other entries stays right.
 */
export function mergeExif(existing, ours) {
  const { little, entries, next } = readIfd0(existing);
  const added = readIfd0(ours).entries;
  if (added.some((e) => e.type !== 2)) throw new Error('only ASCII tags can be merged');
  const w16 = (buffer, value, at) => (little ? buffer.writeUInt16LE(value, at) : buffer.writeUInt16BE(value, at));
  const w32 = (buffer, value, at) => (little ? buffer.writeUInt32LE(value, at) : buffer.writeUInt32BE(value, at));
  const base = existing.length + (existing.length % 2);
  const rows = [...entries.filter((e) => !added.some((a) => a.tag === e.tag)), ...added];
  const ifd = Buffer.alloc(2 + rows.length * 12 + 4);
  const values = [];
  let valueAt = base + ifd.length;
  w16(ifd, rows.length, 0);
  rows
    .sort((a, b) => a.tag - b.tag)
    .forEach((row, index) => {
      const at = 2 + index * 12;
      if (!added.includes(row)) return row.raw.copy(ifd, at);
      w16(ifd, row.tag, at);
      w16(ifd, 2, at + 2);
      w32(ifd, row.value.length, at + 4);
      if (row.value.length <= 4) return row.value.copy(ifd, at + 8);
      w32(ifd, valueAt, at + 8);
      const padded = pad(row.value);
      values.push(padded);
      valueAt += padded.length;
    });
  w32(ifd, next, ifd.length - 4);
  const merged = Buffer.concat([existing, Buffer.alloc(base - existing.length), ifd, ...values]);
  w32(merged, base, 4);
  return merged;
}

const pad = (buffer) => (buffer.length % 2 ? Buffer.concat([buffer, Buffer.alloc(1)]) : buffer);
const riffChunk = (fourcc, data) => {
  const header = Buffer.alloc(8);
  header.write(fourcc, 0, 'latin1');
  header.writeUInt32LE(data.length, 4);
  return pad(Buffer.concat([header, data]));
};

/**
 * Adds EXIF and XMP chunks to a WebP file. `size` is the image's pixel size and `hasAlpha` whether it
 * has transparency; both are needed only when the file is not yet in the extended (VP8X) form.
 */
export function injectWebp(file, exif, xmp, { width, height, hasAlpha }) {
  if (file.toString('latin1', 0, 4) !== 'RIFF' || file.toString('latin1', 8, 12) !== 'WEBP') {
    throw new Error('not a WebP file');
  }
  const chunks = [];
  for (let at = 12; at + 8 <= file.length; ) {
    const fourcc = file.toString('latin1', at, at + 4);
    const size = file.readUInt32LE(at + 4);
    const end = at + 8 + size + (size % 2);
    chunks.push({ fourcc, data: file.subarray(at + 8, at + 8 + size) });
    at = end;
  }
  const kept = chunks.filter((chunk) => chunk.fourcc !== 'EXIF' && chunk.fourcc !== 'XMP ');
  const first = kept[0];
  let flags = 0;
  let vp8x;
  if (first.fourcc === 'VP8X') {
    flags = first.data[0];
    vp8x = first.data;
  } else {
    flags = hasAlpha ? 0x10 : 0;
    vp8x = Buffer.alloc(10);
    vp8x.writeUIntLE(width - 1, 4, 3);
    vp8x.writeUIntLE(height - 1, 7, 3);
    kept.unshift({ fourcc: 'VP8X', data: vp8x });
  }
  vp8x[0] = flags | 0x08 | 0x04; // the file now has EXIF and XMP
  const body = Buffer.concat([
    ...kept.map((chunk) => riffChunk(chunk.fourcc, chunk.data)),
    riffChunk('EXIF', exif),
    riffChunk('XMP ', Buffer.from(xmp, 'utf8')),
  ]);
  const header = Buffer.alloc(12);
  header.write('RIFF', 0, 'latin1');
  header.writeUInt32LE(body.length + 4, 4);
  header.write('WEBP', 8, 'latin1');
  return Buffer.concat([header, body]);
}

const XMP_NAMESPACE = 'http://ns.adobe.com/xap/1.0/\0';
const XMP_EXTENSION_NAMESPACE = 'http://ns.adobe.com/xmp/extension/\0';

/**
 * Adds an XMP segment and the rights tags (Artist, Copyright) of `exif` to a JPEG file. The XMP the file
 * already had is dropped and any Artist and Copyright in its EXIF are replaced, so there is one statement of
 * the rights; the rest of its EXIF (camera, lens and the like) stays.
 */
export function injectJpeg(file, exif, xmp) {
  if (file[0] !== 0xff || file[1] !== 0xd8) throw new Error('not a JPEG file');
  const segment = (marker, payload) => {
    const head = Buffer.alloc(4);
    head[0] = 0xff;
    head[1] = marker;
    head.writeUInt16BE(payload.length + 2, 2);
    return Buffer.concat([head, payload]);
  };
  const segments = [];
  let at = 2;
  let scan = file.length;
  while (at < file.length) {
    if (file[at] !== 0xff) throw new Error('bad JPEG segment');
    const marker = file[at + 1];
    if (marker === 0xda) { scan = at; break; } // start of scan: the rest is image data
    const length = file.readUInt16BE(at + 2);
    segments.push({ marker, payload: file.subarray(at + 4, at + 2 + length), raw: file.subarray(at, at + 2 + length) });
    at += 2 + length;
  }
  const isXmp = (s) =>
    s.marker === 0xe1 &&
    (s.payload.toString('latin1', 0, XMP_NAMESPACE.length) === XMP_NAMESPACE ||
      s.payload.toString('latin1', 0, XMP_EXTENSION_NAMESPACE.length) === XMP_EXTENSION_NAMESPACE);
  const isExif = (s) => s.marker === 0xe1 && s.payload.toString('latin1', 0, 6) === 'Exif\0\0';
  const rest = segments.filter((s) => !isXmp(s));
  const existingExif = rest.find(isExif);
  if (existingExif) {
    // An Exif segment that cannot be read or would not fit is replaced by ours: the rights come first.
    let tiff;
    try {
      tiff = mergeExif(existingExif.payload.subarray(6), exif);
    } catch {
      tiff = undefined;
    }
    const payload = tiff && tiff.length + 6 <= 0xffff - 2 ? Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), tiff]) : Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif]);
    rest[rest.indexOf(existingExif)] = { marker: 0xe1, payload, raw: segment(0xe1, payload) };
  }
  // New segments go after the leading APP0 and Exif segments, ahead of everything else.
  let insertAt = 0;
  while (insertAt < rest.length && (rest[insertAt].marker === 0xe0 || isExif(rest[insertAt]))) insertAt += 1;
  const added = [];
  if (!existingExif) added.push({ raw: segment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif])) });
  added.push({ raw: segment(0xe1, Buffer.concat([Buffer.from(XMP_NAMESPACE, 'latin1'), Buffer.from(xmp, 'utf8')])) });
  rest.splice(insertAt, 0, ...added);
  return Buffer.concat([file.subarray(0, 2), ...rest.map((s) => s.raw), file.subarray(scan)]);
}
