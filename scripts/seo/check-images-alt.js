/* Simple build-time guard: exit code 1 if any <img> is missing alt */
const { readFileSync, readdirSync } = require('fs');
const { join } = require('path');

const walk = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(d =>
    d.isDirectory() ? walk(join(dir, d.name)) : join(dir, d.name)
  );

const htmlFiles = walk('public').filter(f => f.endsWith('.html'));
const offenders = [];

htmlFiles.forEach(f => {
  const html = readFileSync(f, 'utf8');
  // crude regex is OK here (post-build)
  const imgs = html.match(/<img\s+[^>]*>/g) || [];
  imgs.forEach(tag => {
    if (!/alt\s*=/.test(tag)) offenders.push({ file: f, tag });
  });
});

if (offenders.length) {
  console.error('❌ Images without alt text:');
  offenders.slice(0, 20).forEach(o => console.error(`  • ${o.file}: ${o.tag}`));
  process.exit(1);
} else {
  console.log('✅ All images include alt text');
}
