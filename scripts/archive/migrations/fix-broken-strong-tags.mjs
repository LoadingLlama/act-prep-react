/**
 * Fix broken strong tags that aren't properly closed
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('Fixing broken strong tags...\n');

// Get geometry-angles lesson
const { data: lessonData } = await supabase
  .from('lessons')
  .select('content')
  .eq('lesson_key', 'geometry-angles')
  .single();

let content = lessonData.content;

// Find the broken paragraph and fix it
// The issue: unclosed <strong> tags
// Remove the incorrect blue bold styling from "angle" and "vertex" since they're not key terms

// Find and fix the broken paragraph
const brokenParagraph = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">An <strong style="color: #2563eb; text-decoration: underline;">angle is formed when two rays (or line segments) share a common endpoint called the <strong style="color: #2563eb; text-decoration: underline;">vertex.</p>`;

const fixedParagraph = `<p style="font-size: 0.9rem; line-height: 1.6; margin: 0.5rem 0 1rem 0;">An angle is formed when two rays (or line segments) share a common endpoint called the vertex.</p>`;

if (content.includes(brokenParagraph)) {
  content = content.replace(brokenParagraph, fixedParagraph);
  console.log('✅ Fixed broken paragraph with unclosed <strong> tags');
} else {
  console.log('⚠️  Broken paragraph not found, searching for similar patterns...');

  // More flexible search
  const pattern = /An <strong[^>]*>angle[^<]*<strong[^>]*>vertex\.<\/p>/;
  if (pattern.test(content)) {
    content = content.replace(pattern, 'An angle is formed when two rays (or line segments) share a common endpoint called the vertex.</p>');
    console.log('✅ Fixed using pattern matching');
  }
}

// Update in database
const { error } = await supabase
  .from('lessons')
  .update({
    content: content,
    updated_at: new Date().toISOString()
  })
  .eq('lesson_key', 'geometry-angles');

if (error) {
  console.error('❌ Error:', error);
} else {
  console.log('💾 Successfully fixed broken tags!');
}
