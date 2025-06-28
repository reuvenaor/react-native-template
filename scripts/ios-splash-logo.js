const fs = require('fs');
const { createCanvas } = require('canvas');

// Theme colors from App.tsx
const colors = {
  primary: '#1976D2',
  background: '#FFFFFF',
};

// Generate splash screen logo
function generateSplashLogo(size) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Logo - circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.4;
  
  ctx.fillStyle = colors.primary;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  
  // Add text "ExApp"
  ctx.fillStyle = '#FFFFFF';
  const fontSize = size * 0.2;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ExApp', centerX, centerY);
  
  return canvas.toBuffer('image/png');
}

// Ensure directory exists
function ensureDirectoryExists(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Generate iOS splash screen logo
try {
  const dirPath = './ios/ExApp/Images.xcassets/SplashScreenLogo.imageset';
  ensureDirectoryExists(dirPath);
  
  // Generate logos at different scales
  fs.writeFileSync(`${dirPath}/splash-logo.png`, generateSplashLogo(100));
  fs.writeFileSync(`${dirPath}/splash-logo@2x.png`, generateSplashLogo(200));
  fs.writeFileSync(`${dirPath}/splash-logo@3x.png`, generateSplashLogo(300));
  
  // Create Contents.json
  const contentsJson = {
    "images": [
      {
        "idiom": "universal",
        "filename": "splash-logo.png",
        "scale": "1x"
      },
      {
        "idiom": "universal",
        "filename": "splash-logo@2x.png",
        "scale": "2x"
      },
      {
        "idiom": "universal",
        "filename": "splash-logo@3x.png",
        "scale": "3x"
      }
    ],
    "info": {
      "version": 1,
      "author": "xcode"
    }
  };
  
  fs.writeFileSync(`${dirPath}/Contents.json`, JSON.stringify(contentsJson, null, 2));
  
  console.log('iOS splash screen logo generated successfully!');
} catch (error) {
  console.error('Error generating iOS splash screen logo:', error);
} 