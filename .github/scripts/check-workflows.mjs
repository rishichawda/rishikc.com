import { readdir, readFile } from 'node:fs/promises';

// Owners whose actions the workflows may use: GitHub itself and Astro (withastro/action).
const ALLOWED_OWNERS = new Set(['actions', 'withastro']);
const dir = new URL('../workflows/', import.meta.url);
const problems = [];

for (const name of (await readdir(dir)).filter((file) => /\.ya?ml$/.test(file))) {
  const text = await readFile(new URL(name, dir), 'utf8');
  if (!/^permissions:/m.test(text)) problems.push(`${name}: no top-level permissions block`);
  text.split('\n').forEach((line, index) => {
    const match = line.match(/^\s*(?:-\s*)?uses:\s*(\S+)/);
    if (!match || match[1].startsWith('./')) return;
    const [action, revision = ''] = match[1].split('@');
    if (!/^[0-9a-f]{40}$/.test(revision)) problems.push(`${name}:${index + 1}: ${match[1]} is not pinned to a full commit SHA`);
    if (!ALLOWED_OWNERS.has(action.split('/')[0])) problems.push(`${name}:${index + 1}: ${action} is not from an allowed owner`);
  });
}

for (const problem of problems) console.log(`::error title=Workflow policy::${problem}`);
console.log(problems.length ? `${problems.length} workflow policy problem(s).` : 'All workflows pass the policy check.');
process.exitCode = problems.length ? 1 : 0;
