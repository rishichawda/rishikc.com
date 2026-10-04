// GitHub workflow commands end at a newline and treat % as an escape, so encode both in messages.
// Properties such as title also end at ":" and ",", so those are encoded too.
const escapeData = (text) => String(text).replace(/%/g, '%25').replace(/\r/g, '%0D').replace(/\n/g, '%0A');
const escapeProperty = (text) => escapeData(text).replace(/:/g, '%3A').replace(/,/g, '%2C');

export const annotate = (level, title, message) => `::${level} title=${escapeProperty(title)}::${escapeData(message)}`;
