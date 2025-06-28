const fs = require('fs');
const { createCanvas } = require('canvas');

// App icon dimensions
const sizes = {
  icon: 1024,
  adaptiveIcon: 1024,
  splash: 1242,
  favicon: 196
};

// Theme colors from App.tsx
const colors = {
  primary: '#1976D2',
  background: '#FFFFFF',
};

// Generate icon - simple square with rounded corners
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
function generateSplash(size, backgroundColor = colors.background, foregroundColor = colors.primary) {
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
  ctx.fillStyle = '#FFFFFF';
  const fontSize = size * 0.15;
  ctx.font = `bold ${fontSize}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('ExApp', centerX, centerY);
  
  return canvas.toBuffer('image/png');
}

// Save the generated images
try {
  fs.writeFileSync('./assets/icon.png', generateIcon(sizes.icon));
  fs.writeFileSync('./assets/adaptive-icon.png', generateIcon(sizes.adaptiveIcon));
  fs.writeFileSync('./assets/splash.png', generateSplash(sizes.splash));
  fs.writeFileSync('./assets/favicon.png', generateIcon(sizes.favicon));
  
  console.log('App icons and splash screen generated successfully!');
} catch (error) {
  console.error('Error generating icons:', error);
} 