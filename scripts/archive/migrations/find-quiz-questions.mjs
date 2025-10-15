/**
 * Find quiz questions for Lesson 2.1
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function findQuizQuestions() {
  console.log('🔍 Finding quiz questions for Lesson 2.1...\n');

  // First, get the lesson ID for geometry-angles
  const { data: lesson } = await supabase
    .from('lessons')
    .select('id, lesson_key, title')
    .eq('lesson_key', 'geometry-angles')
    .single();

  if (!lesson) {
    console.error('❌ Lesson not found');
    return;
  }

  console.log('📖 Lesson 2.1:');
  console.log(`   ID: ${lesson.id}`);
  console.log(`   Key: ${lesson.lesson_key}`);
  console.log(`   Title: ${lesson.title}\n`);

  // Find quizzes for this lesson
  const { data: quizzes } = await supabase
    .from('quizzes')
    .select('*')
    .eq('lesson_id', lesson.id);

  if (!quizzes || quizzes.length === 0) {
    console.log('❌ No quizzes found for this lesson\n');
  } else {
    console.log(`✅ Found ${quizzes.length} quiz(zes) for this lesson:`);
    quizzes.forEach(q => {
      console.log(`   - ${q.title} (ID: ${q.id}, Type: ${q.quiz_type}, Position: ${q.position})`);
    });
    console.log('');
  }

  // Try to find quiz_questions table
  console.log('🔍 Looking for quiz questions table...\n');
  const { data: quizQuestions, error: qqError } = await supabase
    .from('quiz_questions')
    .select('*')
    .limit(3);

  if (!qqError && quizQuestions) {
    console.log(`✅ Found quiz_questions table with ${quizQuestions.length} sample rows:`);
    if (quizQuestions.length > 0) {
      console.log('   Columns:', Object.keys(quizQuestions[0]));
      console.log('\n   Sample question:');
      console.log(JSON.stringify(quizQuestions[0], null, 2));

      // Check for questions related to our lesson's quizzes
      if (quizzes && quizzes.length > 0) {
        console.log('\n🔍 Checking questions for our lesson\'s quizzes...\n');
        for (const quiz of quizzes) {
          const { data: questions } = await supabase
            .from('quiz_questions')
            .select('*')
            .eq('quiz_id', quiz.id);

          console.log(`📝 Quiz "${quiz.title}": ${questions ? questions.length : 0} questions`);

          if (questions && questions.length > 0) {
            fs.writeFileSync(`quiz-${quiz.id}-questions.json`, JSON.stringify(questions, null, 2));
            console.log(`   Saved to: quiz-${quiz.id}-questions.json`);

            // Check for diagrams/SVGs in questions
            const questionsWithSVG = questions.filter(q =>
              (q.question_text && q.question_text.includes('<svg')) ||
              (q.diagram && q.diagram.includes('<svg'))
            );
            console.log(`   Questions with diagrams: ${questionsWithSVG.length}`);
          }
        }
      }
    }
  } else {
    console.log('❌ No quiz_questions table found\n');
  }
}

findQuizQuestions();
