import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const styleTerm = (term) => `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}</strong>`;

// Generate formatted lesson content from definitions
function generateLessonContent(title, definitions) {
  const intro = `This lesson covers ${title.toLowerCase()}. Understanding these concepts is essential for success on the ACT ${title.includes('English') || title.includes('Grammar') ? 'English' : title.includes('Reading') ? 'Reading' : title.includes('Science') ? 'Science' : 'Math'} section.`;

  let html = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${intro}</p>\n\n`;

  // Section 1: Core Concepts
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Core Concepts</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Let's start with the fundamental concepts:</p>\n\n`;

  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  definitions.slice(0, Math.ceil(definitions.length / 2)).forEach(def => {
    html += `  <li style="margin: 0.15rem 0;">${styleTerm(def.term)}: ${def.definition}</li>\n`;
  });
  html += `</ul>\n\n`;

  // Section 2: Additional Key Terms
  if (definitions.length > 5) {
    html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Additional Key Terms</h3>\n\n`;
    html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
    definitions.slice(Math.ceil(definitions.length / 2)).forEach(def => {
      html += `  <li style="margin: 0.15rem 0;">${styleTerm(def.term)}: ${def.definition}</li>\n`;
    });
    html += `</ul>\n\n`;
  }

  // Section 3: ACT Application
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. How This Appears on the ACT</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">These concepts appear frequently on the ACT. Make sure you:</p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Understand each concept thoroughly</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Practice applying these ideas to problems</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Review the practice quiz at the end of this lesson</li>\n`;
  html += `</ul>\n\n`;

  // Key Takeaways
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">Key Takeaways</h3>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  definitions.slice(0, Math.min(5, definitions.length)).forEach(def => {
    html += `  <li style="margin: 0.15rem 0;"><strong>${def.term}:</strong> ${def.definition.substring(0, 100)}${def.definition.length > 100 ? '...' : ''}</li>\n`;
  });
  html += `</ul>`;

  return html;
}

async function formatAllLessons() {
  console.log('🎨 FORMATTING ALL 81 LESSON CONTENTS...\n');

  // Get all lessons except gold standard
  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, lesson_key')
    .neq('lesson_key', 'geometry-angles'); // Skip gold standard

  let count = 0;
  for (const lesson of lessons) {
    try {
      // Get definitions for this lesson
      const { data: definitions } = await supabase
        .from('term_definitions')
        .select('*')
        .eq('lesson_key', lesson.lesson_key);

      if (!definitions || definitions.length === 0) {
        console.log(`⚠️  Skipping ${lesson.title} - no definitions found`);
        continue;
      }

      // Generate formatted content
      const content = generateLessonContent(lesson.title, definitions);

      // Update lesson
      await supabase
        .from('lessons')
        .update({ content })
        .eq('lesson_key', lesson.lesson_key);

      count++;
      console.log(`✅ ${count}/81 - ${lesson.title}`);

    } catch (e) {
      console.error(`❌ Error formatting ${lesson.lesson_key}:`, e.message);
    }
  }

  console.log(`\n🎉 COMPLETE! Formatted ${count} lessons with:`);
  console.log('  • Blue underlined key terms');
  console.log('  • Proper bullet point formatting');
  console.log('  • Structured sections');
  console.log('  • Key takeaways');
}

formatAllLessons();
