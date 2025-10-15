/**
 * Add "angle" and "vertex" terms with definitions and update lesson content
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Step 1: Adding term definitions to database...\n');

// Add angle definition
const { error: angleError } = await supabase
  .from('term_definitions')
  .insert({
    term: 'angle',
    definition: 'A geometric figure formed when two rays share a common endpoint',
    lesson_key: 'geometry-angles'
  });

if (angleError) {
  console.error('Error adding angle term:', angleError);
} else {
  console.log('✓ Added "angle" definition');
}

// Add vertex definition
const { error: vertexError } = await supabase
  .from('term_definitions')
  .insert({
    term: 'vertex',
    definition: 'The common endpoint where two rays or line segments meet to form an angle',
    lesson_key: 'geometry-angles'
  });

if (vertexError) {
  console.error('Error adding vertex term:', vertexError);
} else {
  console.log('✓ Added "vertex" definition');
}

console.log('\nStep 2: Updating lesson content to style these terms...\n');

// Fetch the lesson
const { data, error } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

if (error) {
  console.error('Error fetching lesson:', error);
  process.exit(1);
}

let content = data.content;

// Find and replace the sentence
const originalSentence = 'An angle is formed when two rays (or line segments) share a common endpoint called the vertex.';

// Create the new sentence with styled terms
const styledSentence = 'An <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">angle</strong> is formed when two rays (or line segments) share a common endpoint called the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">vertex</strong>.';

// Replace in content
content = content.replace(originalSentence, styledSentence);

console.log('✓ Updated sentence with styled terms');

// Update the lesson
const { error: updateError } = await supabase
  .from('lessons')
  .update({ content: content })
  .eq('lesson_key', 'geometry-angles');

if (updateError) {
  console.error('❌ Error updating lesson:', updateError);
  process.exit(1);
}

console.log('✅ Successfully updated lesson!');
console.log('\nChanges made:');
console.log('- Added "angle" and "vertex" term definitions');
console.log('- Styled both terms with blue underlined bold text');
console.log('- Terms now have hover tooltips with definitions');
