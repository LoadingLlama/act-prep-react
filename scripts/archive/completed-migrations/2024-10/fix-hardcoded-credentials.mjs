/**
 * Automated Script to Fix Hardcoded Credentials
 * Replaces hardcoded Supabase keys with config import
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Keys to replace (from .env file)
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk3NjU0NzgsImV4cCI6MjA3NTM0MTQ3OH0.z_1N3TG-cS9Bc1s7UAif91PkIjhBKvicrUqupiNP80Y';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';
const SUPABASE_URL = 'https://rabavobdklnwvwsldbix.supabase.co';

function fixScriptFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Check if file contains hardcoded keys
  const hasAnonKey = content.includes(ANON_KEY);
  const hasServiceKey = content.includes(SERVICE_KEY);

  if (!hasAnonKey && !hasServiceKey) {
    return { modified: false, reason: 'no hardcoded keys' };
  }

  // Check if already using config
  if (content.includes("from './config.mjs'") || content.includes('from "../scripts/config.mjs"')) {
    return { modified: false, reason: 'already using config' };
  }

  // Determine which key is used
  const usesServiceKey = hasServiceKey;
  const usesAnonKey = hasAnonKey;

  // Add import statement at the top (after other imports)
  const importStatement = usesServiceKey
    ? "import { supabaseUrl, supabaseServiceKey } from './config.mjs';"
    : "import { supabaseUrl, supabaseAnonKey } from './config.mjs';";

  // Find the position to insert import (after existing imports or at top)
  const lines = content.split('\n');
  let insertIndex = 0;

  // Find last import statement
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith('import ')) {
      insertIndex = i + 1;
    }
  }

  // Insert import
  lines.splice(insertIndex, 0, importStatement);
  content = lines.join('\n');

  // Replace hardcoded URL
  content = content.replace(
    new RegExp(`const supabaseUrl = ['"\`]${SUPABASE_URL}['"\`];?`, 'g'),
    '// supabaseUrl imported from config.mjs'
  );

  // Replace hardcoded anon key
  if (usesAnonKey) {
    content = content.replace(
      new RegExp(`const supabaseKey = ['"\`]${ANON_KEY}['"\`];?`, 'g'),
      '// supabaseAnonKey imported from config.mjs'
    );
    content = content.replace(
      /createClient\(supabaseUrl, supabaseKey\)/g,
      'createClient(supabaseUrl, supabaseAnonKey)'
    );
  }

  // Replace hardcoded service key
  if (usesServiceKey) {
    content = content.replace(
      new RegExp(`const supabaseServiceKey = ['"\`]${SERVICE_KEY}['"\`];?`, 'g'),
      '// supabaseServiceKey imported from config.mjs'
    );
  }

  // Write back
  fs.writeFileSync(filePath, content);
  modified = true;

  return {
    modified: true,
    usesServiceKey,
    usesAnonKey
  };
}

function scanAndFixDirectory(dirPath, relativeTo = '') {
  const files = fs.readdirSync(dirPath);
  const results = {
    fixed: [],
    skipped: [],
    errors: []
  };

  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recurse into subdirectories
      const subResults = scanAndFixDirectory(filePath, path.join(relativeTo, file));
      results.fixed.push(...subResults.fixed);
      results.skipped.push(...subResults.skipped);
      results.errors.push(...subResults.errors);
    } else if (file.endsWith('.mjs') || file.endsWith('.js')) {
      // Skip the config file itself
      if (file === 'config.mjs' || file === 'fix-hardcoded-credentials.mjs') {
        continue;
      }

      try {
        const result = fixScriptFile(filePath);
        const relativePath = path.join(relativeTo, file);

        if (result.modified) {
          results.fixed.push({
            file: relativePath,
            serviceKey: result.usesServiceKey,
            anonKey: result.usesAnonKey
          });
        } else {
          results.skipped.push({
            file: relativePath,
            reason: result.reason
          });
        }
      } catch (error) {
        results.errors.push({
          file: path.join(relativeTo, file),
          error: error.message
        });
      }
    }
  }

  return results;
}

console.log('🔐 FIXING HARDCODED CREDENTIALS\n');
console.log('=====================================\n');

// Fix scripts in /scripts directory
console.log('Scanning /scripts directory...\n');
const scriptsDir = path.join(__dirname);
const results = scanAndFixDirectory(scriptsDir, 'scripts');

// Also check root directory scripts
console.log('\nScanning root directory...\n');
const rootDir = path.join(__dirname, '..');
const rootFiles = fs.readdirSync(rootDir);

for (const file of rootFiles) {
  const filePath = path.join(rootDir, file);
  const stat = fs.statSync(filePath);

  if (stat.isFile() && (file.endsWith('.mjs') || file.endsWith('.js'))) {
    try {
      const result = fixScriptFile(filePath);
      if (result.modified) {
        results.fixed.push({
          file: file,
          serviceKey: result.usesServiceKey,
          anonKey: result.usesAnonKey
        });
      } else {
        results.skipped.push({
          file: file,
          reason: result.reason
        });
      }
    } catch (error) {
      results.errors.push({
        file: file,
        error: error.message
      });
    }
  }
}

console.log('\n=====================================');
console.log('📊 RESULTS:\n');
console.log(`✅ Fixed: ${results.fixed.length} files`);
console.log(`⏭️  Skipped: ${results.skipped.length} files`);
console.log(`❌ Errors: ${results.errors.length} files`);

if (results.fixed.length > 0) {
  console.log('\n✅ FIXED FILES:');
  results.fixed.forEach(({ file, serviceKey, anonKey }) => {
    const keyType = serviceKey ? '[SERVICE KEY]' : '[ANON KEY]';
    console.log(`   ${keyType} ${file}`);
  });
}

if (results.errors.length > 0) {
  console.log('\n❌ ERRORS:');
  results.errors.forEach(({ file, error }) => {
    console.log(`   ${file}: ${error}`);
  });
}

console.log('\n=====================================');
console.log('✅ SECURITY FIX COMPLETE\n');
console.log('Next steps:');
console.log('1. Test scripts to ensure they still work');
console.log('2. Commit changes');
console.log('3. Rotate API keys in Supabase dashboard');
console.log('4. Update .env with new keys');
