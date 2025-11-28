#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

console.log('\n╔═══════════════════════════════════════════════════╗');
console.log('║    Table Renaming Plan for Consistency           ║');
console.log('╚═══════════════════════════════════════════════════╝\n');

console.log('📋 Current Structure:');
console.log('  ✅ lesson_metadata (116 rows)');
console.log('  ✅ lesson_sections (127 rows)');
console.log('  ⚠️  section_content (127 rows) → lesson_section_content');
console.log('  ⚠️  examples (137 rows) → lesson_examples');
console.log('  ⚠️  term_definitions (643 rows) → lesson_term_definitions');
console.log('');

console.log('🔄 Renaming Strategy:');
console.log('  1. section_content → lesson_section_content');
console.log('  2. examples → lesson_examples');
console.log('  3. term_definitions → lesson_term_definitions');
console.log('');

console.log('⚠️  NOTE: This requires ALTER TABLE commands.');
console.log('⚠️  Run these SQL commands in Supabase SQL Editor:');
console.log('');
console.log('```sql');
console.log('-- Rename tables for consistency');
console.log('ALTER TABLE section_content RENAME TO lesson_section_content;');
console.log('ALTER TABLE examples RENAME TO lesson_examples;');
console.log('ALTER TABLE term_definitions RENAME TO lesson_term_definitions;');
console.log('```');
console.log('');

console.log('📝 Files that need updating after rename:');
console.log('  - src/services/api/lessons.service.js');
console.log('  - src/services/api/examples.service.js');
console.log('  - src/services/api/termDefinitions.service.js');
console.log('  - All scripts in scripts/ folder');
console.log('');

console.log('✅ Or run: node scripts/update-all-table-references.mjs');
console.log('');
