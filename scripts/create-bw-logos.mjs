/**
 * Create clean black and white SVG logos for all colleges
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LOGOS_DIR = path.join(__dirname, '../public/images/schools');

// Ensure directory exists
if (!fs.existsSync(LOGOS_DIR)) {
  fs.mkdirSync(LOGOS_DIR, { recursive: true });
}

// All schools with their display names
const schools = [
  { file: 'harvard', name: 'HARVARD' },
  { file: 'yale', name: 'YALE' },
  { file: 'princeton', name: 'PRINCETON' },
  { file: 'columbia', name: 'COLUMBIA' },
  { file: 'cornell', name: 'CORNELL' },
  { file: 'upenn', name: 'PENN' },
  { file: 'brown', name: 'BROWN' },
  { file: 'dartmouth', name: 'DARTMOUTH' },
  { file: 'stanford', name: 'STANFORD' },
  { file: 'mit', name: 'MIT' },
  { file: 'duke', name: 'DUKE' },
  { file: 'northwestern', name: 'NORTHWESTERN' },
  { file: 'johns-hopkins', name: 'JOHNS HOPKINS' },
  { file: 'vanderbilt', name: 'VANDERBILT' },
  { file: 'rice', name: 'RICE' },
  { file: 'usc', name: 'USC' },
  { file: 'ucla', name: 'UCLA' },
  { file: 'uc-berkeley', name: 'UC BERKELEY' },
  { file: 'uchicago', name: 'CHICAGO' },
  { file: 'carnegie-mellon', name: 'CARNEGIE MELLON' },
  { file: 'notre-dame', name: 'NOTRE DAME' },
  { file: 'georgetown', name: 'GEORGETOWN' },
  { file: 'caltech', name: 'CALTECH' },
  { file: 'emory', name: 'EMORY' },
  { file: 'washington-university', name: 'WASH U' },
  { file: 'michigan', name: 'MICHIGAN' },
];

/**
 * Create a clean SVG logo for a school
 */
function createSVGLogo(schoolName) {
  // Calculate width based on text length
  const charWidth = 14;
  const padding = 40;
  const width = Math.max(schoolName.length * charWidth + padding, 120);
  const height = 60;

  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="none"/>
  <text x="50%" y="50%"
        font-family="Georgia, serif"
        font-size="16"
        font-weight="700"
        fill="#2d2d2d"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="0.5">
    ${schoolName}
  </text>
</svg>`;
}

/**
 * Generate all SVG logos
 */
function generateAllLogos() {
  console.log('🎨 Generating black and white college logos...\n');

  schools.forEach(({ file, name }) => {
    const svgContent = createSVGLogo(name);
    const destPath = path.join(LOGOS_DIR, `${file}.svg`);

    fs.writeFileSync(destPath, svgContent);
    console.log(`✅ Created: ${file}.svg (${name})`);
  });

  console.log('\n✅ All logos generated!');
  console.log(`📁 Location: ${LOGOS_DIR}`);
  console.log(`📊 Total: ${schools.length} logos`);
}

// Run the script
generateAllLogos();
