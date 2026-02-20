const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const INPUT = path.join(__dirname, '..', 'src', 'assets', 'images', 'Hero_image.webp')
const OUTPUT = path.join(__dirname, '..', 'static', 'og-default.jpg')

const WIDTH = 1200
const HEIGHT = 630

// SVG text overlay with gradient background
const svgOverlay = `
<svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(0,0,0,0)" />
      <stop offset="50%" stop-color="rgba(0,0,0,0)" />
      <stop offset="100%" stop-color="rgba(0,0,0,0.7)" />
    </linearGradient>
  </defs>
  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#grad)" />
  <text x="60" y="${HEIGHT - 90}" font-family="Georgia, serif" font-size="52" font-weight="bold" fill="white" letter-spacing="2">
    Tadeusz Karny
  </text>
  <text x="60" y="${HEIGHT - 40}" font-family="Georgia, serif" font-size="28" fill="rgba(255,255,255,0.9)" letter-spacing="3">
    KOWALSTWO ARTYSTYCZNE
  </text>
</svg>
`

async function generate() {
  // Ensure static directory exists
  const staticDir = path.dirname(OUTPUT)
  if (!fs.existsSync(staticDir)) {
    fs.mkdirSync(staticDir, { recursive: true })
  }

  await sharp(INPUT)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .composite([
      {
        input: Buffer.from(svgOverlay),
        top: 0,
        left: 0,
      },
    ])
    .jpeg({ quality: 85 })
    .toFile(OUTPUT)

  const stats = fs.statSync(OUTPUT)
  const sizeKB = Math.round(stats.size / 1024)
  console.log(`Generated: ${OUTPUT}`)
  console.log(`Size: ${sizeKB}KB`)
}

generate().catch((err) => {
  console.error('Failed to generate OG image:', err)
  process.exit(1)
})
