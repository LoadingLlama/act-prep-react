/**
 * Test how many sections are created from the lesson content
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

// Import the splitIntoTextSections function
const splitFunctionCode = fs.readFileSync('./src/utils/splitIntoTextSections.js', 'utf8');

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Get lesson content
const { data } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

console.log('Lesson content length:', data.content.length);

// Remove h2 tags like the function does
let cleanContent = data.content.trim();
cleanContent = cleanContent.replace(/<h2[^>]*>.*?<\/h2>/gi, '');

// Count H3 sections
const h3Sections = cleanContent.split(/(?=<h3[^>]*>)/);
console.log('H3 sections:', h3Sections.length);

// Find where Key Takeaways is
let sectionNum = 0;
for (let i = 0; i < h3Sections.length; i++) {
  if (h3Sections[i].includes('key-takeaway-box')) {
    sectionNum = i;
    break;
  }
}

console.log('Key Takeaways is in H3 section:', sectionNum);
console.log('\nQuiz is at position: 100');
console.log('Key Takeaways section index:', sectionNum);
console.log('Key Takeaways comes BEFORE quiz?', sectionNum < 100);
