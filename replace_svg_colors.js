const fs = require('fs');
const path = require('path');

const dirPath = path.join(__dirname, 'profile-3d-contrib');
if (!fs.existsSync(dirPath)) {
  console.error('Directory does not exist:', dirPath);
  process.exit(1);
}

const files = fs.readdirSync(dirPath);
let modifiedCount = 0;

files.forEach(file => {
  if (path.extname(file).toLowerCase() === '.svg') {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    let original = content;
    
    // Replace TypeScript color #3178c6 -> #9b5de5 (Vibrant Violet/Purple)
    content = content.replace(/#3178c6/gi, '#9b5de5');
    
    // Replace Vue color #41b883 -> #00c2a8 (Vibrant Mint/Teal)
    content = content.replace(/#41b883/gi, '#00c2a8');
    
    // Hide the language donut chart and legend entirely to prevent recruiter confusion
    content = content.replace(/<g transform="translate\(40, 520\)">/gi, '<g transform="translate(40, 520)" display="none">');
    
    // Replace the standard GitHub activity green (#47a042) with a premium Deep Indigo (#4f46e5)
    content = content.replace(/#47a042/gi, '#4f46e5');
    
    // --- 3D GRASS PILLARS COLOR REPLACEMENT (Green -> Premium Indigo/Violet Gradient) ---
    
    // Level 1: light yellow-green -> light indigo
    content = content.replace(/rgb\(216,\s*232,\s*135\)/gi, 'rgb(199, 210, 254)'); // top
    content = content.replace(/rgb\(181,\s*194,\s*113\)/gi, 'rgb(165, 180, 252)'); // left
    content = content.replace(/rgb\(151,\s*162,\s*95\)/gi, 'rgb(129, 140, 248)'); // right

    // Level 2: medium-light green -> medium indigo
    content = content.replace(/rgb\(140,\s*197,\s*105\)/gi, 'rgb(129, 140, 248)'); // top
    content = content.replace(/rgb\(117,\s*165,\s*88\)/gi, 'rgb(99, 102, 241)'); // left
    content = content.replace(/rgb\(98,\s*138,\s*74\)/gi, 'rgb(79, 70, 229)'); // right

    // Level 3: medium green -> deep indigo
    content = content.replace(/rgb\(71,\s*160,\s*66\)/gi, 'rgb(79, 70, 229)'); // top
    content = content.replace(/rgb\(59,\s*134,\s*55\)/gi, 'rgb(67, 56, 202)'); // left
    content = content.replace(/rgb\(50,\s*112,\s*46\)/gi, 'rgb(55, 48, 163)'); // right

    // Level 4: dark green -> vibrant violet/purple
    content = content.replace(/rgb\(29,\s*106,\s*35\)/gi, 'rgb(139, 92, 246)'); // top
    content = content.replace(/rgb\(24,\s*89,\s*29\)/gi, 'rgb(109, 40, 217)'); // left
    content = content.replace(/rgb\(20,\s*74,\s*25\)/gi, 'rgb(91, 33, 182)'); // right
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully modified colors and layout in ${file}`);
      modifiedCount++;
    }
  }
});

console.log(`Replacement complete. Modified ${modifiedCount} files.`);
