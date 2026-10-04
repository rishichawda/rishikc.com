import { spawnSync } from 'node:child_process';
import { appendFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { annotate } from './annotations.mjs';
import { sitePaths } from './urls.mjs';

const baseUrl = process.env.BASE_URL ?? 'http://localhost:4321';
const outDir = process.env.REPORT_DIR ?? join(tmpdir(), 'rishikc-audit-reports');
const config = JSON.parse(await readFile(new URL('./lighthouse-budgets.json', import.meta.url), 'utf8'));
const runs = Number(process.env.LH_RUNS ?? config.runs);
if (!Number.isInteger(runs) || runs < 1) throw new Error(`LH_RUNS must be a positive integer, got ${process.env.LH_RUNS ?? config.runs}`);
// Budget misses warn by default; the scheduled production audit sets this to fail on them.
const failOnMiss = process.env.FAIL_ON_BUDGET_MISS === 'true';
// One article stands in for every article page. Taking it from the sitemap keeps the audit
// working when articles in the content repository are renamed or removed.
const sampleArticle = (await sitePaths(baseUrl)).find((path) => /^\/articles\/[^/]+\/$/.test(path));
if (!sampleArticle) throw new Error(`No article page found in the sitemap for ${baseUrl}`);
const paths = [...config.paths, sampleArticle];

const LABELS = {
  performance: 'Performance',
  accessibility: 'Accessibility',
  'best-practices': 'Best practices',
  seo: 'SEO',
  lcp: 'LCP (ms)',
  tbt: 'TBT (ms)',
  cls: 'CLS',
  kb: 'Transfer (KB)',
};

const median = (values) => [...values].sort((a, b) => a - b)[Math.floor(values.length / 2)];
function score(lhr, category) {
  const value = lhr.categories[category].score;
  if (value === null) throw new Error(`Lighthouse returned no ${category} score for ${lhr.finalDisplayedUrl}`);
  return Math.round(value * 100);
}

function metrics(lhr) {
  return {
    performance: score(lhr, 'performance'),
    accessibility: score(lhr, 'accessibility'),
    'best-practices': score(lhr, 'best-practices'),
    seo: score(lhr, 'seo'),
    lcp: lhr.audits['largest-contentful-paint'].numericValue,
    tbt: lhr.audits['total-blocking-time'].numericValue,
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
    kb: lhr.audits['total-byte-weight'].numericValue / 1024,
  };
}

async function runOnce(url, file) {
  const result = spawnSync(
    'lighthouse',
    [
      url,
      '--quiet',
      '--output=json',
      `--output-path=${file}`,
      '--only-categories=performance,accessibility,best-practices,seo',
      '--chrome-flags=--headless=new --no-sandbox',
    ],
    { stdio: ['ignore', 'ignore', 'inherit'], timeout: 180_000 },
  );
  if (result.status !== 0) throw new Error(`lighthouse exited with ${result.status} for ${url}`);
  return JSON.parse(await readFile(file, 'utf8'));
}

const fmt = (key, value) => (key === 'cls' ? value.toFixed(3) : Math.round(value));

await mkdir(outDir, { recursive: true });
const results = [];
for (const path of paths) {
  const url = new URL(path, baseUrl).href;
  const lhrs = [];
  for (let run = 1; run <= runs; run += 1) {
    lhrs.push(await runOnce(url, `${outDir}/lh-run.json`));
  }
  const all = lhrs.map(metrics);
  const med = Object.fromEntries(Object.keys(LABELS).map((key) => [key, median(all.map((m) => m[key]))]));
  const medianRun = lhrs.find((lhr) => score(lhr, 'performance') === med.performance) ?? lhrs[0];
  const slug = path.replace(/^\/|\/$/g, '').replace(/\//g, '_') || 'home';
  await writeFile(`${outDir}/lighthouse-${slug}.json`, JSON.stringify(medianRun));

  const misses = [];
  for (const [key, limit] of Object.entries(config.budgets)) {
    if ('min' in limit && med[key] < limit.min) misses.push(`${LABELS[key]} ${fmt(key, med[key])} is below ${limit.min}`);
    if ('max' in limit && med[key] > limit.max) misses.push(`${LABELS[key]} ${fmt(key, med[key])} is above ${limit.max}`);
  }
  for (const miss of misses) console.log(annotate('warning', `Lighthouse ${path}`, `${miss} (median of ${runs})`));
  console.log(`${path}: ${Object.keys(LABELS).map((key) => `${LABELS[key]} ${fmt(key, med[key])}`).join(', ')}`);
  results.push({ path, median: med, misses });
}

await rm(`${outDir}/lh-run.json`, { force: true });
await writeFile(`${outDir}/lighthouse-summary.json`, JSON.stringify({ baseUrl, runs, results }, null, 2));

if (process.env.GITHUB_STEP_SUMMARY) {
  const keys = Object.keys(LABELS);
  const lines = [
    `## Lighthouse (${failOnMiss ? 'enforced' : 'warn-only'})`,
    '',
    `Median of ${runs} run(s) per page against ${baseUrl}, mobile defaults.`,
    '',
    `| Page | ${keys.map((key) => LABELS[key]).join(' | ')} | Over budget |`,
    `|---|${keys.map(() => '---').join('|')}|---|`,
    ...results.map((r) => `| ${r.path} | ${keys.map((key) => fmt(key, r.median[key])).join(' | ')} | ${r.misses.length} |`),
  ];
  await appendFile(process.env.GITHUB_STEP_SUMMARY, `${lines.join('\n')}\n`);
}

process.exitCode = failOnMiss && results.some((r) => r.misses.length > 0) ? 1 : 0;
