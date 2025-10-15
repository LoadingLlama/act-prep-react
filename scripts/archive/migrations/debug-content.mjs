/**
 * Debug script to see what's in the database
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fetching geometry-angles lesson...\n');

const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error fetching lesson:', error);
  process.exit(1);
}

// Save full content to file for inspection
fs.writeFileSync('lesson-content-debug.html', data.content);
console.log('✓ Saved full content to lesson-content-debug.html');

// Check for examples
const exampleMatches = data.content.matchAll(/<h4[^>]*>Example \d+<\/h4>/gi);
let exampleCount = 0;
for (const match of exampleMatches) {
  exampleCount++;
}

console.log(`\nFound ${exampleCount} example titles`);

// Check content length
console.log(`\nContent length: ${data.content.length} characters`);

// Show first 2000 characters
console.log('\n--- FIRST 2000 CHARACTERS ---');
console.log(data.content.substring(0, 2000));

// Look for solution sections
const solutionMatches = data.content.matchAll(/Solution:/gi);
let solutionCount = 0;
for (const match of solutionMatches) {
  solutionCount++;
}

console.log(`\n\nFound ${solutionCount} solution sections`);
