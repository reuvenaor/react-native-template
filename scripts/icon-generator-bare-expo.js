const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Theme colors from App.tsx
const colors = {
  primary: '#1976D2',
  background: '#FFFFFF',
};

// Android icon sizes
const androidIcons = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192,
};

// iOS icon sizes
const iosIcons = {
  'Icon-20@2x': 40,
  'Icon-20@3x': 60,
  'Icon-29@2x': 58,
  'Icon-29@3x': 87,
  'Icon-40@2x': 80,
  'Icon-40@3x': 120,
  'Icon-60@2x': 120,
  'Icon-60@3x': 180,
  'Icon-76@2x': 152,
  'Icon-83.5@2x': 167,
  'Icon-1024': 1024,
};

// Splash screen sizes
const splashScreenSizes = {
  'drawable-mdpi': 200,
  'drawable-hdpi': 300,
  'drawable-xhdpi': 400,
  'drawable-xxhdpi': 600,
  'drawable-xxxhdpi': 800,
};

// Generate icon - square with rounded corners
function generateIcon(size, backgroundColor = colors.background, foregroundColor = colors.primary) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);
  
  // Foreground - rounded square
  const margin = size * 0.2;
  const rectSize = size - (margin * 2);
  const cornerRadius = rectSize * 0.2;
  
  ctx.fillStyle = foregroundColor;
  ctx.beginPath();
  ctx.moveTo(margin + cornerRadius, margin);
  ctx.lineTo(margin + rectSize - cornerRadius, margin);
  ctx.arcTo(margin + rectSize, margin, margin + rectSize, margin + cornerRadius, cornerRadius);
  ctx.lineTo(margin + rectSize, margin + rectSize - cornerRadius);
  ctx.arcTo(margin + rectSize, margin + rectSize, margin + rectSize - cornerRadius, margin + rectSize, cornerRadius);
  ctx.lineTo(margin + cornerRadius, margin + rectSize);
  ctx.arcTo(margin, margin + rectSize, margin, margin + rectSize - cornerRadius, cornerRadius);
  ctx.lineTo(margin, margin + cornerRadius);
  ctx.arcTo(margin, margin, margin + cornerRadius, margin, cornerRadius);
  ctx.closePath();
  ctx.fill();
  
  // Add text "ExApp"
  ctx.fillStyle = '#FFFFFF';
  const fontSize = size * 0.2;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ExApp', size / 2, size / 2);
  
  return canvas.toBuffer('image/png');
}

// Generate splash screen
function generateSplash(size, backgroundColor = colors.primary, foregroundColor = colors.background) {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);
  
  // Logo - circle
  const centerX = size / 2;
  const centerY = size / 2;
  const radius = size * 0.25;
  
  ctx.fillStyle = foregroundColor;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.closePath();
  ctx.fill();
  
  // Add text "ExApp"
  ctx.fillStyle = colors.primary;
  const fontSize = size * 0.15;
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

// Generate Android icons
function generateAndroidIcons() {
  console.log('Generating Android icons...');
  
  // Also generate standard assets for expo
  ensureDirectoryExists('./assets');
  fs.writeFileSync('./assets/icon.png', generateIcon(1024));
  fs.writeFileSync('./assets/adaptive-icon.png', generateIcon(1024));
  fs.writeFileSync('./assets/splash.png', generateSplash(1242));
  fs.writeFileSync('./assets/favicon.png', generateIcon(196));
  
  Object.entries(androidIcons).forEach(([folder, size]) => {
    const dirPath = `./android/app/src/main/res/${folder}`;
    ensureDirectoryExists(dirPath);
    
    // Regular icon
    fs.writeFileSync(`${dirPath}/ic_launcher.png`, generateIcon(size));
    
    // Round icon
    const roundCanvas = createCanvas(size, size);
    const roundCtx = roundCanvas.getContext('2d');
    
    // Draw circular background
    roundCtx.fillStyle = colors.primary;
    roundCtx.beginPath();
    roundCtx.arc(size/2, size/2, size/2, 0, Math.PI * 2);
    roundCtx.fill();
    
    // Add text
    roundCtx.fillStyle = '#FFFFFF';
    const fontSize = size * 0.3;
    roundCtx.font = `bold ${fontSize}px Arial`;
    roundCtx.textAlign = 'center';
    roundCtx.textBaseline = 'middle';
    roundCtx.fillText('Ex', size/2, size/2);
    
    fs.writeFileSync(`${dirPath}/ic_launcher_round.png`, roundCanvas.toBuffer('image/png'));
  });
}

// Generate Android splash screen
function generateAndroidSplashScreen() {
  console.log('Generating Android splash screen...');
  
  Object.entries(splashScreenSizes).forEach(([folder, size]) => {
    const dirPath = `./android/app/src/main/res/${folder}`;
    ensureDirectoryExists(dirPath);
    fs.writeFileSync(`${dirPath}/splashscreen_logo.png`, generateSplash(size));
  });
  
  // Update colors.xml for splash screen background
  const colorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="splashscreen_background">${colors.primary}</color>
  <color name="iconBackground">${colors.background}</color>
</resources>`;

  const nightColorsXml = `<?xml version="1.0" encoding="utf-8"?>
<resources>
  <color name="splashscreen_background">${colors.primary}</color>
  <color name="iconBackground">${colors.background}</color>
</resources>`;

  ensureDirectoryExists('./android/app/src/main/res/values');
  ensureDirectoryExists('./android/app/src/main/res/values-night');
  fs.writeFileSync('./android/app/src/main/res/values/colors.xml', colorsXml);
  fs.writeFileSync('./android/app/src/main/res/values-night/colors.xml', nightColorsXml);
}

// Generate iOS icons
function generateIOSIcons() {
  console.log('Generating iOS icons...');
  
  const dirPath = './ios/ExApp/Images.xcassets/AppIcon.appiconset';
  ensureDirectoryExists(dirPath);
  
  Object.entries(iosIcons).forEach(([name, size]) => {
    fs.writeFileSync(`${dirPath}/${name}.png`, generateIcon(size));
  });
  
  // Update Contents.json
  const contentsJson = {
    "images": [
      { "size": "20x20", "idiom": "iphone", "filename": "Icon-20@2x.png", "scale": "2x" },
      { "size": "20x20", "idiom": "iphone", "filename": "Icon-20@3x.png", "scale": "3x" },
      { "size": "29x29", "idiom": "iphone", "filename": "Icon-29@2x.png", "scale": "2x" },
      { "size": "29x29", "idiom": "iphone", "filename": "Icon-29@3x.png", "scale": "3x" },
      { "size": "40x40", "idiom": "iphone", "filename": "Icon-40@2x.png", "scale": "2x" },
      { "size": "40x40", "idiom": "iphone", "filename": "Icon-40@3x.png", "scale": "3x" },
      { "size": "60x60", "idiom": "iphone", "filename": "Icon-60@2x.png", "scale": "2x" },
      { "size": "60x60", "idiom": "iphone", "filename": "Icon-60@3x.png", "scale": "3x" },
      { "size": "20x20", "idiom": "ipad", "filename": "Icon-20@2x.png", "scale": "2x" },
      { "size": "29x29", "idiom": "ipad", "filename": "Icon-29@2x.png", "scale": "2x" },
      { "size": "40x40", "idiom": "ipad", "filename": "Icon-40@2x.png", "scale": "2x" },
      { "size": "76x76", "idiom": "ipad", "filename": "Icon-76@2x.png", "scale": "2x" },
      { "size": "83.5x83.5", "idiom": "ipad", "filename": "Icon-83.5@2x.png", "scale": "2x" },
      { "size": "1024x1024", "idiom": "ios-marketing", "filename": "Icon-1024.png", "scale": "1x" }
    ],
    "info": {
      "version": 1,
      "author": "xcode"
    }
  };
  
  fs.writeFileSync(`${dirPath}/Contents.json`, JSON.stringify(contentsJson, null, 2));
}

// Generate iOS splash screen
function generateIOSSplashScreen() {
  console.log('Generating iOS splash screen background color...');
  
  const dirPath = './ios/ExApp/Images.xcassets/SplashScreenBackground.colorset';
  ensureDirectoryExists(dirPath);
  
  // Update Contents.json for splash screen color
  const contentsJson = {
    "colors": [
      {
        "idiom": "universal",
        "color": {
          "color-space": "srgb",
          "components": {
            "red": "0.098",
            "green": "0.463",
            "blue": "0.824",
            "alpha": "1.000"
          }
        }
      },
      {
        "idiom": "universal",
        "appearances": [
          {
            "appearance": "luminosity",
            "value": "dark"
          }
        ],
        "color": {
          "color-space": "srgb",
          "components": {
            "red": "0.098",
            "green": "0.463",
            "blue": "0.824",
            "alpha": "1.000"
          }
        }
      }
    ],
    "info": {
      "version": 1,
      "author": "xcode"
    }
  };
  
  fs.writeFileSync(`${dirPath}/Contents.json`, JSON.stringify(contentsJson, null, 2));
}

// Run all generators
try {
  generateAndroidIcons();
  generateAndroidSplashScreen();
  generateIOSIcons();
  generateIOSSplashScreen();
  
  console.log('App icons and splash screens generated successfully!');
} catch (error) {
  console.error('Error generating assets:', error);
} 