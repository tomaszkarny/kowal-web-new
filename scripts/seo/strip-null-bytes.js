/* Build-time fix: React 18's renderToPipeableStream injects stray NUL (0x00)
 * bytes into streamed HTML around multibyte characters (facebook/react#31134,
 * fixed only in React 19 — Gatsby 5 requires React 18). Strip them post-build
 * so parsers and tooling don't treat the pages as binary. */
const { readFileSync, writeFileSync, readdirSync } = require('fs');
const { join } = require('path');

const walk = dir =>
  readdirSync(dir, { withFileTypes: true }).flatMap(d =>
    d.isDirectory() ? walk(join(dir, d.name)) : join(dir, d.name)
  );

const htmlFiles = walk('public').filter(f => f.endsWith('.html'));
const cleaned = [];

htmlFiles.forEach(f => {
  const buf = readFileSync(f);
  if (buf.includes(0)) {
    const stripped = Buffer.from(buf.filter(byte => byte !== 0));
    writeFileSync(f, stripped);
    cleaned.push({ file: f, count: buf.length - stripped.length });
  }
});

if (cleaned.length) {
  console.log(`🧹 Stripped NUL bytes from ${cleaned.length} HTML file(s):`);
  cleaned.forEach(c => console.log(`  • ${c.file} (${c.count} byte(s))`));
} else {
  console.log('✅ No NUL bytes in built HTML');
}
