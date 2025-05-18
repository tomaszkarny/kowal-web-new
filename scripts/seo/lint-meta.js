#!/usr/bin/env node
/**
 * Simple meta validator for SEO translation files.
 *  – Ensures titles ≤ 60 chars and descriptions ≤ 160 chars.
 *  – Fails (exit 1) if any string is too long or empty.
 *
 * Run with:  node scripts/seo/lint-meta.js
 * Or via npm script "seo:lint".
 */

const fs = require('fs');
const path = require('path');
const colors = {
  red: t => `\x1b[31m${t}\x1b[0m`,
  green: t => `\x1b[32m${t}\x1b[0m`,
  yellow: t => `\x1b[33m${t}\x1b[0m`,
  bold: t => `\x1b[1m${t}\x1b[0m`,
};

const LOCALES_DIR = path.join(process.cwd(), 'locales');
const LANGS = ['pl', 'en'];
const TITLE_MAX = 60;
const DESC_MAX = 160;

let problems = 0;

console.log(colors.bold('\n🔎  SEO meta-lint\n'));

for (const lang of LANGS) {
  const seoPath = path.join(LOCALES_DIR, lang, 'seo.json');
  if (!fs.existsSync(seoPath)) {
    console.error(colors.red(`❌  Missing ${seoPath}`));
    problems++;
    continue;
  }
  const json = JSON.parse(fs.readFileSync(seoPath, 'utf8'));

  Object.entries(json).forEach(([pageKey, obj]) => {
    const title = obj.title || '';
    const desc  = obj.description || '';

    const pageLabel = `${lang}/${pageKey}`;

    if (!title) {
      console.error(colors.red(`❌  [${pageKey}] empty title`));
      problems++;
    } else if (title.length > TITLE_MAX) {
      console.error(colors.yellow(`⚠️   [${pageKey}] title ${title.length} chars (max ${TITLE_MAX})`));
      problems++;
    }

    if (!desc) {
      console.error(colors.red(`❌  [${pageKey}] empty description`));
      problems++;
    } else if (desc.length > DESC_MAX) {
      console.error(colors.yellow(`⚠️   [${pageKey}] description ${desc.length} chars (max ${DESC_MAX})`));
      problems++;
    }
  });
}

if (problems === 0) {
  console.log(colors.green('\n✅  All titles & descriptions within limits.\n'));
  process.exit(0);
} else {
  console.error(colors.red(`\n✖  ${problems} problem${problems !== 1 ? 's' : ''} found.\n`));
  process.exit(1);
}
