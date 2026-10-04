import { appendFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { annotate } from './annotations.mjs';
import { sitePaths } from './urls.mjs';

const baseUrl = process.env.BASE_URL ?? 'http://localhost:4321';
const outDir = process.env.REPORT_DIR ?? join(tmpdir(), 'rishikc-audit-reports');
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
// Violations that exist today, as { ruleId: [paths] }. Only these rule and page pairs warn;
// the same rule on any other page fails, so the list can only shrink.
const known = JSON.parse(await readFile(new URL('./a11y-known-issues.json', import.meta.url), 'utf8'));
const isKnown = (id, path) => known[id]?.includes(path) ?? false;

// The sitemap leaves out /search/ on purpose, but it is a real page visitors reach.
const paths = [...new Set([...(await sitePaths(baseUrl)), '/search/'])];
if (paths.length === 0) throw new Error(`No pages found in the sitemap for ${baseUrl}`);
const browser = await chromium.launch({ channel: 'chrome' });
const rules = new Map();

try {
  const page = await (await browser.newContext()).newPage();
  for (const path of paths) {
    const response = await page.goto(new URL(path, baseUrl).href, { waitUntil: 'load' });
    if (!response?.ok()) throw new Error(`${path} returned ${response?.status() ?? 'no response'}`);
    // 'networkidle' never settles here (analytics requests keep the network busy), so wait for 'load'.
    // Expressive Code adds tabindex to scrollable code blocks from an idle callback and a debounced
    // resize observer, so let both run before axe reads the page.
    await page.evaluate(() => new Promise((resolve) => requestIdleCallback(() => setTimeout(resolve, 400))));
    const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
    for (const violation of violations) {
      const rule = rules.get(violation.id) ?? {
        id: violation.id,
        impact: violation.impact,
        help: violation.help,
        pages: new Set(),
        newPages: new Set(),
        nodes: 0,
        example: '',
      };
      const example = `${path} ${violation.nodes[0].target.join(' ')}`;
      rule.pages.add(path);
      rule.nodes += violation.nodes.length;
      if (!isKnown(violation.id, path)) {
        // Show an example from a page that fails the check, not from a known one.
        if (rule.newPages.size === 0) rule.example = example;
        rule.newPages.add(path);
      }
      rule.example ||= example;
      rules.set(violation.id, rule);
    }
  }
} finally {
  await browser.close();
}

const rows = [...rules.values()].map((rule) => ({
  id: rule.id,
  impact: rule.impact,
  help: rule.help,
  pages: rule.pages.size,
  newPages: rule.newPages.size,
  nodes: rule.nodes,
  example: rule.example,
  paths: [...rule.pages].sort(),
}));

for (const row of rows) {
  const level = row.newPages === 0 ? 'warning' : 'error';
  console.log(
    annotate(level, `axe ${row.id}`, `${row.help} (${row.impact}): ${row.pages} page(s) (${row.newPages} not in the known list), ${row.nodes} node(s), e.g. ${row.example}`),
  );
}
// A known entry whose page now passes is dead weight and would hide a regression there.
const audited = new Set(paths);
for (const [id, knownPaths] of Object.entries(known)) {
  for (const path of knownPaths.filter((knownPath) => audited.has(knownPath) && !rules.get(id)?.pages.has(knownPath))) {
    console.log(annotate('notice', `axe ${id}`, `${path} no longer fails ${id}; remove it from a11y-known-issues.json`));
  }
}
console.log(`Checked ${paths.length} pages: ${rows.length} rule(s) with violations.`);

await mkdir(outDir, { recursive: true });
await writeFile(`${outDir}/a11y-report.json`, JSON.stringify({ baseUrl, pages: paths.length, rules: rows }, null, 2));

if (process.env.GITHUB_STEP_SUMMARY) {
  const lines = [
    '## Accessibility (axe)',
    '',
    `${paths.length} pages checked against ${baseUrl}.`,
    '',
    '| Rule | Impact | Pages | Pages not in known list | Nodes | Status |',
    '|---|---|---|---|---|---|',
    ...rows.map((row) => `| ${row.id} | ${row.impact} | ${row.pages} | ${row.newPages} | ${row.nodes} | ${row.newPages === 0 ? 'known (warning)' : 'new (failing)'} |`),
  ];
  if (rows.length === 0) lines.push('| none | | | | | clean |');
  await appendFile(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
}

process.exitCode = rows.some((row) => row.newPages > 0) ? 1 : 0;
