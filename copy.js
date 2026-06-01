const fs = require('fs');
const path = require('path');

const srcDir = 'c:\\Users\\SSAFY\\Desktop\\취업준비\\뽀뽀\\Web-Hacking-Pjt';
const destDir = 'c:\\Users\\SSAFY\\Desktop\\취업준비\\뽀뽀\\portpolio\\public';

const files = [
  { src: '관리자 계정 복호화.png', dest: 'admin_decrypt.png' },
  { src: '버퍼 오버 플로우.png', dest: 'buffer_overflow.png' },
  { src: '불충분한 인증.png', dest: 'broken_auth.png' },
  { src: '불충분한 인증2.png', dest: 'broken_auth2.png' },
  { src: '약한 문자열 강도.png', dest: 'weak_password.png' }
];

files.forEach(f => {
  const srcPath = path.join(srcDir, f.src);
  const destPath = path.join(destDir, f.dest);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${f.src} to ${f.dest}`);
  } else {
    console.log(`File not found: ${srcPath}`);
  }
});
