const fs = require('fs');
const path = require('path');

const imgPath = "C:\\Users\\진준영\\.gemini\\antigravity\\brain\\578935e2-7ab4-473a-a196-c07ecd85bda8\\rpg_dragon_hero_banner_1784527120829.png";
const destPath = path.join(__dirname, 'components/bannerData.ts');

try {
  if (fs.existsSync(imgPath)) {
    const buffer = fs.readFileSync(imgPath);
    const base64 = buffer.toString('base64');
    const dataUri = `data:image/png;base64,${base64}`;
    
    const content = `export const dragonBannerDataUri = "${dataUri}";\n`;
    fs.writeFileSync(destPath, content);
    console.log('Successfully wrote bannerData.ts!');
  }
} catch (e) {
  console.error('Error generating bannerData.ts:', e);
}
