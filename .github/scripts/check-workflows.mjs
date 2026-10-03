import { readdir, readFile } from 'node:fs/promises';

// Owners whose actions the workflows may use: GitHub itself and Astro (withastro/action).
const ALLOWED_OWNERS = new Set(['actions', 'withastro']);
const dir = new URL('../workflows/', import.meta.url);
const problems = [];

for (const name of (await readdir(dir)).filter((file) => /\.ya?ml$/.test(file))) {
  const text = await readFile(new URL(name, dir), 'utf8');
  if (!/^permissions:/m.test(text)) problems.push(`${name}: no top-level permissions block`);
  if (/^\s*permissions:\s*write-all/m.test(text)) problems.push(`${name}: permissions must not be write-all`);
  // Match every `uses` key wherever it appears (block, flow mapping, quoted key, value on the next line).
  const uses = /["']?\buses["']?\s*:\s*(["']?)([^\s"',}\]#]*)/g;
  for (const match of text.matchAll(uses)) {
    const line = text.slice(0, match.index).split('\n').length;
    const lineText = text.split('\n')[line - 1];
    if (lineText.trimStart().startsWith('#')) continue;
    const value = match[2] || (text.slice(match.index + match[0].length).match(/^\s*\n\s*([^\s"',}\]#]+)/)?.[1] ?? '');
    if (!value) {
      problems.push(`${name}:${line}: uses has no value the policy check can read`);
      continue;
    }
    if (value.startsWith('./')) continue;
    const [action, revision = ''] = value.split('@');
    if (!/^[0-9a-f]{40}$/.test(revision)) problems.push(`${name}:${line}: ${value} is not pinned to a full commit SHA`);
    if (!ALLOWED_OWNERS.has(action.split('/')[0])) problems.push(`${name}:${line}: ${action} is not from an allowed owner`);
  }
}

for (const problem of problems) console.log(`::error title=Workflow policy::${problem}`);
console.log(problems.length ? `${problems.length} workflow policy problem(s).` : 'All workflows pass the policy check.');
process.exitCode = problems.length ? 1 : 0;
