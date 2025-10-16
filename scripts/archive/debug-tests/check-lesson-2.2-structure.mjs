import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function checkLesson22() {
  console.log('\n🔍 ANALYZING LESSON 2.2 STRUCTURE');
  console.log('='.repeat(80));

  // Get lesson 2.2
  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id, title, lesson_key')
    .eq('lesson_key', '2.2')
    .single();

  console.log(`\nLesson: ${lesson.title} (${lesson.lesson_key})`);

  // Get all sections for lesson 2.2
  const { data: sections } = await supabase
    .from('lesson_sections')
    .select('id, section_key, title, section_type, order_index')
    .eq('lesson_id', lesson.id)
    .order('order_index');

  console.log(`\n📁 Sections (${sections.length} total):`);
  sections.forEach(s => {
    console.log(`  ${s.order_index}. ${s.section_key} - "${s.title}" (${s.section_type})`);
  });

  // Check for quiz
  const { data: quiz } = await supabase
    .from('quizzes')
    .select('id, title, lesson_key')
    .eq('lesson_key', '2.2')
    .single();

  if (quiz) {
    console.log(`\n📝 Quiz: "${quiz.title}"`);

    // Get quiz questions
    const { data: questions } = await supabase
      .from('quiz_questions')
      .select('id, question_text')
      .eq('quiz_id', quiz.id)
      .order('order_index');

    console.log(`  Questions: ${questions.length}`);
    questions.forEach((q, i) => {
      console.log(`    ${i + 1}. ${q.question_text.substring(0, 60)}...`);
    });
  } else {
    console.log('\n❌ No quiz found');
  }

  // Get content from main section to see HTML structure
  const mainSection = sections.find(s => s.section_key.includes('-main') || s.section_type === 'content');
  if (mainSection) {
    const { data: content } = await supabase
      .from('section_content')
      .select('content')
      .eq('section_id', mainSection.id)
      .eq('content_type', 'html')
      .single();

    if (content) {
      const html = content.content;
      console.log(`\n📄 Main Content Analysis:`);
      console.log(`  Length: ${html.length} chars`);
      console.log(`  Has <!DOCTYPE>: ${html.includes('<!DOCTYPE') ? 'YES ❌ (should be NO)' : 'NO ✓'}`);
      console.log(`  Has <html>: ${html.includes('<html') ? 'YES ❌ (should be NO)' : 'NO ✓'}`);
      console.log(`  Has <body>: ${html.includes('<body') ? 'YES ❌ (should be NO)' : 'NO ✓'}`);
      console.log(`  First 100 chars: ${html.substring(0, 100)}`);
    }
  }

  console.log('\n' + '='.repeat(80));
}

checkLesson22();
