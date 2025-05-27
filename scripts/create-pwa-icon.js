const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function createPWAIcons() {
  const sourceIcon = path.join(__dirname, '../src/assets/images/anvil_2.webp');
  const iconDir = path.join(__dirname, '../static/icons');
  
  // Create icons directory if it doesn't exist
  await fs.mkdir(iconDir, { recursive: true });
  
  // Icon sizes for PWA
  const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
  
  // Create a base icon with padding for better appearance
  const baseIcon = await sharp(sourceIcon)
    .resize(512, 512, {
      fit: 'contain',
      background: { r: 82, g: 95, b: 196, alpha: 1 } // #525fc4
    })
    .toBuffer();
  
  // Generate all icon sizes
  for (const size of sizes) {
    await sharp(baseIcon)
      .resize(size, size)
      .png()
      .toFile(path.join(iconDir, `icon-${size}x${size}.png`));
    
    console.log(`Created icon-${size}x${size}.png`);
  }
  
  // Create Apple touch icon
  await sharp(baseIcon)
    .resize(180, 180)
    .png()
    .toFile(path.join(iconDir, 'apple-touch-icon.png'));
  
  console.log('Created apple-touch-icon.png');
  
  // Create favicon
  await sharp(baseIcon)
    .resize(32, 32)
    .png()
    .toFile(path.join(__dirname, '../static/favicon-32x32.png'));
    
  await sharp(baseIcon)
    .resize(16, 16)
    .png()
    .toFile(path.join(__dirname, '../static/favicon-16x16.png'));
  
  console.log('All PWA icons created successfully!');
}

createPWAIcons().catch(console.error);