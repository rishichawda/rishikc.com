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
  const ascii = (text) => Buffer.from(`${text}\0`, 'latin1');
  // EXIF ASCII is single-byte; keep the copyright sign (U+00A9, one byte in latin1).
  const values = [
    [0x013b, ascii(rights.creator)], // Artist
    [0x8298, ascii(rights.notice)], // Copyright
  ];
  const headerSize = 8;
  const ifdSize = 2 + values.length * 12 + 4;
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
    head.writeUInt32LE(dataOffset, entry + 8);
    // TIFF values start on even offsets.
    const padded = data.length % 2 ? Buffer.concat([data, Buffer.alloc(1)]) : data;
    chunks.push(padded);
    dataOffset += padded.length;
  });
  return Buffer.concat([head, ...chunks]);
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
 * Adds an XMP segment (and an EXIF segment when the file has none) to a JPEG file, and drops the XMP
 * the file already had, so there is one statement of the rights.
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
  const hasExif = rest.some(isExif);
  // New segments go after the leading APP0 and Exif segments, ahead of everything else.
  let insertAt = 0;
  while (insertAt < rest.length && (rest[insertAt].marker === 0xe0 || isExif(rest[insertAt]))) insertAt += 1;
  const added = [];
  if (!hasExif) added.push({ raw: segment(0xe1, Buffer.concat([Buffer.from('Exif\0\0', 'latin1'), exif])) });
  added.push({ raw: segment(0xe1, Buffer.concat([Buffer.from(XMP_NAMESPACE, 'latin1'), Buffer.from(xmp, 'utf8')])) });
  rest.splice(insertAt, 0, ...added);
  return Buffer.concat([file.subarray(0, 2), ...rest.map((s) => s.raw), file.subarray(scan)]);
}
