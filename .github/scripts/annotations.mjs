// GitHub workflow commands end at a newline and treat % as an escape, so encode both in messages.
const escapeData = (text) => String(text).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');

export const annotate = (level, title, message) => `::${level} title=${escapeData(title)}::${escapeData(message)}`;
