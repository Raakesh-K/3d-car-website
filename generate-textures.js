const fs = require('fs');
const path = require('path');

const base64Png = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
const buffer = Buffer.from(base64Png, 'base64');

const texturesDir = path.join(__dirname, 'public', 'scene.gltf', 'textures');

const files = [
  'logo_baseColor.png',
  'interior_metallicRoughness.png',
  'MOTOR1_baseColor.png',
  'LICHTER1_baseColor.png'
];

files.forEach(file => {
  fs.writeFileSync(path.join(texturesDir, file), buffer);
});
console.log('Dummy textures generated successfully.');
