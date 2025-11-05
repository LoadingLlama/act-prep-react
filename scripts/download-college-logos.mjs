/**
 * Download and process college logos to black and white
 * Sources logos from Wikimedia Commons and official university sites
 */

import https from 'https';
import http from 'http';
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

// College logo sources - using Wikimedia Commons and university sites
const collegeLogos = {
  'rice': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Rice_University_logo.svg/800px-Rice_University_logo.svg.png',
  'usc': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/University_of_Southern_California_seal.svg/600px-University_of_Southern_California_seal.svg.png',
  'ucla': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/The_University_of_California_UCLA.svg/800px-The_University_of_California_UCLA.svg.png',
  'uc-berkeley': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Seal_of_University_of_California%2C_Berkeley.svg/600px-Seal_of_University_of_California%2C_Berkeley.svg.png',
  'uchicago': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/University_of_Chicago_shield.svg/600px-University_of_Chicago_shield.svg.png',
  'carnegie-mellon': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Carnegie_Mellon_University_seal.svg/600px-Carnegie_Mellon_University_seal.svg.png',
  'notre-dame': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Notre_Dame_Fighting_Irish_logo.svg/600px-Notre_Dame_Fighting_Irish_logo.svg.png',
  'georgetown': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Georgetown_Hoyas_logo.svg/600px-Georgetown_Hoyas_logo.svg.png',
  'caltech': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Caltech_Logo.svg/800px-Caltech_Logo.svg.png',
  'emory': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Emory_University_Seal.svg/600px-Emory_University_Seal.svg.png',
  'washington-university': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Washington_University_in_St_Louis_seal.svg/600px-Washington_University_in_St_Louis_seal.svg.png',
  'michigan': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Michigan_Wolverines_logo.svg/600px-Michigan_Wolverines_logo.svg.png',
};

/**
 * Download a file from URL
 */
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(dest);

    console.log(`📥 Downloading: ${path.basename(dest)}`);

    protocol.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        file.close();
        fs.unlinkSync(dest);
        downloadFile(response.headers.location, dest).then(resolve).catch(reject);
        return;
      }

      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`✅ Downloaded: ${path.basename(dest)}`);
        resolve(dest);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

/**
 * Download all missing college logos
 */
async function downloadAllLogos() {
  console.log('🎓 Downloading college logos...\n');

  for (const [name, url] of Object.entries(collegeLogos)) {
    const destPath = path.join(LOGOS_DIR, `${name}.png`);

    // Skip if already exists
    if (fs.existsSync(destPath)) {
      console.log(`⏭️  Skipping ${name} (already exists)`);
      continue;
    }

    try {
      await downloadFile(url, destPath);
      // Small delay to be respectful to servers
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`❌ Error downloading ${name}:`, error.message);
    }
  }

  console.log('\n✅ All downloads complete!');
  console.log('\n📊 Logo inventory:');
  const files = fs.readdirSync(LOGOS_DIR).filter(f => f.endsWith('.png'));
  console.log(`   Total logos: ${files.length}`);
  files.forEach(f => console.log(`   - ${f}`));
}

// Run the script
downloadAllLogos().catch(console.error);
