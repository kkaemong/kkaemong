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
    
    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Successfully modified colors in ${file}`);
      modifiedCount++;
    }
  }
});

console.log(`Replacement complete. Modified ${modifiedCount} files.`);
