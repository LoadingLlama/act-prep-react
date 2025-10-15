/**
 * Script to add final mastery quizzes to all lessons
 * This will create a final quiz at the end of each lesson that doesn't have one
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Generic quiz questions by subject
const quizTemplates = {
  english: {
    title: 'Mastery Check',
    intro: 'Test your understanding of this lesson. Answer all questions to complete the lesson.',
    questions: [
      {
        text: 'Which of the following demonstrates correct usage of the concepts taught in this lesson?',
        options: [
          { text: 'Option A', isCorrect: true, explanation: 'This correctly applies the rules taught in this lesson.' },
          { text: 'Option B', isCorrect: false, explanation: 'This violates the key principle covered in this lesson.' },
          { text: 'Option C', isCorrect: false, explanation: 'This is incorrect based on what you learned.' },
          { text: 'Option D', isCorrect: false, explanation: 'This misapplies the concepts from the lesson.' }
        ]
      },
      {
        text: 'Identify the error in the following example:',
        options: [
          { text: 'No error', isCorrect: false, explanation: 'There is an error present.' },
          { text: 'Error type A', isCorrect: true, explanation: 'Correct! This is the exact type of error we studied.' },
          { text: 'Error type B', isCorrect: false, explanation: 'This is not the primary issue here.' },
          { text: 'Error type C', isCorrect: false, explanation: 'This error type was not present in the example.' }
        ]
      },
      {
        text: 'Which strategy from this lesson would be most effective here?',
        options: [
          { text: 'Strategy A', isCorrect: false, explanation: 'This strategy doesn\'t apply in this context.' },
          { text: 'Strategy B', isCorrect: true, explanation: 'Excellent! This is the best approach based on the lesson.' },
          { text: 'Strategy C', isCorrect: false, explanation: 'This would not be the most efficient choice.' },
          { text: 'Strategy D', isCorrect: false, explanation: 'This strategy wasn\'t covered in this lesson.' }
        ]
      }
    ]
  },
  math: {
    title: 'Mastery Check',
    intro: 'Test your understanding of this lesson. Answer all questions to complete the lesson.',
    questions: [
      {
        text: 'Apply the formula or technique from this lesson:',
        options: [
          { text: 'Result A', isCorrect: true, explanation: 'Correct! This correctly applies the method taught in the lesson.' },
          { text: 'Result B', isCorrect: false, explanation: 'This makes a calculation error.' },
          { text: 'Result C', isCorrect: false, explanation: 'This uses the wrong approach for this problem type.' },
          { text: 'Result D', isCorrect: false, explanation: 'This answer doesn\'t follow the steps covered in the lesson.' }
        ]
      },
      {
        text: 'Which approach is most efficient for solving this type of problem?',
        options: [
          { text: 'Method A', isCorrect: false, explanation: 'This works but is more time-consuming.' },
          { text: 'Method B', isCorrect: true, explanation: 'Perfect! This is the most efficient method from the lesson.' },
          { text: 'Method C', isCorrect: false, explanation: 'This method doesn\'t apply to this problem type.' },
          { text: 'Method D', isCorrect: false, explanation: 'This approach wasn\'t covered in this lesson.' }
        ]
      },
      {
        text: 'Identify the first step in solving this problem:',
        options: [
          { text: 'Step A', isCorrect: false, explanation: 'This should come later in the solution process.' },
          { text: 'Step B', isCorrect: true, explanation: 'Exactly! This is the correct first step as taught in the lesson.' },
          { text: 'Step C', isCorrect: false, explanation: 'This step is not necessary for this problem type.' },
          { text: 'Step D', isCorrect: false, explanation: 'This would lead to an incorrect solution path.' }
        ]
      }
    ]
  },
  reading: {
    title: 'Mastery Check',
    intro: 'Test your understanding of this lesson. Answer all questions to complete the lesson.',
    questions: [
      {
        text: 'Which reading strategy from this lesson is most applicable here?',
        options: [
          { text: 'Strategy A', isCorrect: true, explanation: 'Correct! This strategy directly addresses this question type.' },
          { text: 'Strategy B', isCorrect: false, explanation: 'This strategy is less effective for this situation.' },
          { text: 'Strategy C', isCorrect: false, explanation: 'This approach doesn\'t match what we learned.' },
          { text: 'Strategy D', isCorrect: false, explanation: 'This wasn\'t a strategy covered in this lesson.' }
        ]
      },
      {
        text: 'Based on the passage approach taught in this lesson, what should you do first?',
        options: [
          { text: 'Action A', isCorrect: false, explanation: 'This comes later in the process.' },
          { text: 'Action B', isCorrect: true, explanation: 'Perfect! This is the first step in the approach we learned.' },
          { text: 'Action C', isCorrect: false, explanation: 'This skips an important preliminary step.' },
          { text: 'Action D', isCorrect: false, explanation: 'This wasn\'t part of the recommended approach.' }
        ]
      },
      {
        text: 'Which type of incorrect answer is this an example of?',
        options: [
          { text: 'Too extreme', isCorrect: false, explanation: 'The language is not overly extreme here.' },
          { text: 'Out of scope', isCorrect: true, explanation: 'Exactly! This introduces information not in the passage.' },
          { text: 'Opposite', isCorrect: false, explanation: 'This doesn\'t contradict the passage.' },
          { text: 'Distortion', isCorrect: false, explanation: 'The information isn\'t twisted, it\'s just not there.' }
        ]
      }
    ]
  },
  science: {
    title: 'Mastery Check',
    intro: 'Test your understanding of this lesson. Answer all questions to complete the lesson.',
    questions: [
      {
        text: 'Based on the data interpretation technique from this lesson, what is the trend?',
        options: [
          { text: 'Increasing', isCorrect: true, explanation: 'Correct! The data shows a clear upward trend as taught.' },
          { text: 'Decreasing', isCorrect: false, explanation: 'The data actually moves in the opposite direction.' },
          { text: 'No change', isCorrect: false, explanation: 'There is a clear pattern in the data.' },
          { text: 'Fluctuating', isCorrect: false, explanation: 'The trend is more consistent than this suggests.' }
        ]
      },
      {
        text: 'Where should you look first to answer this question type?',
        options: [
          { text: 'The passage text', isCorrect: false, explanation: 'For this question type, the figures are more important.' },
          { text: 'The figure caption', isCorrect: false, explanation: 'While helpful, this isn\'t the first place to look.' },
          { text: 'The axis labels', isCorrect: true, explanation: 'Perfect! Always check axes first as we learned in the lesson.' },
          { text: 'The answer choices', isCorrect: false, explanation: 'Check the data before looking at answer choices.' }
        ]
      },
      {
        text: 'Which concept from the lesson applies to this experimental setup?',
        options: [
          { text: 'Control variable', isCorrect: false, explanation: 'This isn\'t about what stays constant.' },
          { text: 'Independent variable', isCorrect: true, explanation: 'Exactly! This is what the experimenter changes.' },
          { text: 'Dependent variable', isCorrect: false, explanation: 'This is what gets measured, not manipulated.' },
          { text: 'Confounding variable', isCorrect: false, explanation: 'No confounding factors are described here.' }
        ]
      }
    ]
  },
  all: {
    title: 'Mastery Check',
    intro: 'Test your understanding of this lesson. Answer all questions to complete the lesson.',
    questions: [
      {
        text: 'Which key concept from this lesson is most important?',
        options: [
          { text: 'Concept A', isCorrect: true, explanation: 'Correct! This is the foundational concept of the lesson.' },
          { text: 'Concept B', isCorrect: false, explanation: 'While mentioned, this wasn\'t the main focus.' },
          { text: 'Concept C', isCorrect: false, explanation: 'This is a supporting detail, not the main concept.' },
          { text: 'Concept D', isCorrect: false, explanation: 'This wasn\'t covered in this lesson.' }
        ]
      },
      {
        text: 'How would you apply this lesson\'s strategy?',
        options: [
          { text: 'Approach A', isCorrect: false, explanation: 'This doesn\'t follow the lesson\'s recommendations.' },
          { text: 'Approach B', isCorrect: true, explanation: 'Perfect! This correctly applies what you learned.' },
          { text: 'Approach C', isCorrect: false, explanation: 'This is not the most effective approach.' },
          { text: 'Approach D', isCorrect: false, explanation: 'This contradicts the lesson\'s guidance.' }
        ]
      },
      {
        text: 'What is the main takeaway from this lesson?',
        options: [
          { text: 'Takeaway A', isCorrect: false, explanation: 'This is too narrow for the lesson\'s scope.' },
          { text: 'Takeaway B', isCorrect: true, explanation: 'Excellent! This captures the essential message.' },
          { text: 'Takeaway C', isCorrect: false, explanation: 'This misinterprets the lesson\'s purpose.' },
          { text: 'Takeaway D', isCorrect: false, explanation: 'This wasn\'t the main focus of the lesson.' }
        ]
      }
    ]
  }
};

async function addFinalQuizToLesson(lesson) {
  console.log(`\n📚 Processing: ${lesson.title}`);
  console.log(`   Section: ${lesson.subject}`);

  // Check if lesson already has a final quiz
  const { data: existingQuizzes, error: checkError } = await supabase
    .from('quizzes')
    .select('id, quiz_type, position')
    .eq('lesson_id', lesson.id);

  if (checkError) {
    console.error(`   ❌ Error checking quizzes:`, checkError.message);
    return;
  }

  const hasFinalQuiz = existingQuizzes?.some(q => q.quiz_type === 'final');

  if (hasFinalQuiz) {
    console.log(`   ✓ Already has final quiz - skipping`);
    return;
  }

  // Select appropriate quiz template based on subject
  const subject = lesson.subject || 'all';
  const template = quizTemplates[subject] || quizTemplates.all;

  // Create the final quiz
  const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      lesson_id: lesson.id,
      title: template.title,
      intro: template.intro,
      quiz_type: 'final',
      position: 999, // At the end
      is_required: true
    })
    .select()
    .single();

  if (quizError) {
    console.error(`   ❌ Error creating quiz:`, quizError.message);
    return;
  }

  console.log(`   ✓ Created quiz (ID: ${quiz.id})`);

  // Add questions and options
  for (let qIndex = 0; qIndex < template.questions.length; qIndex++) {
    const questionData = template.questions[qIndex];

    const { data: question, error: questionError } = await supabase
      .from('quiz_questions')
      .insert({
        quiz_id: quiz.id,
        question_text: questionData.text,
        question_order: qIndex
      })
      .select()
      .single();

    if (questionError) {
      console.error(`   ❌ Error creating question ${qIndex + 1}:`, questionError.message);
      continue;
    }

    // Add options for this question
    for (let oIndex = 0; oIndex < questionData.options.length; oIndex++) {
      const optionData = questionData.options[oIndex];

      const { error: optionError } = await supabase
        .from('quiz_options')
        .insert({
          question_id: question.id,
          option_text: optionData.text,
          is_correct: optionData.isCorrect,
          explanation: optionData.explanation,
          option_order: oIndex
        });

      if (optionError) {
        console.error(`   ❌ Error creating option ${oIndex + 1}:`, optionError.message);
      }
    }
  }

  console.log(`   ✓ Added ${template.questions.length} questions with options`);
}

async function main() {
  console.log('🚀 Starting to add final quizzes to all lessons...\n');

  // Fetch all lessons from database
  const { data: lessons, error: lessonsError } = await supabase
    .from('lessons')
    .select('id, title, lesson_key, subject')
    .order('id');

  if (lessonsError) {
    console.error('❌ Error fetching lessons:', lessonsError.message);
    return;
  }

  if (!lessons || lessons.length === 0) {
    console.log('⚠️  No lessons found in database');
    return;
  }

  console.log(`Found ${lessons.length} lessons in database\n`);
  console.log('=' .repeat(60));

  // Process each lesson
  let added = 0;
  let skipped = 0;
  let errors = 0;

  for (const lesson of lessons) {
    try {
      await addFinalQuizToLesson(lesson);
      added++;
    } catch (error) {
      console.error(`   ❌ Unexpected error:`, error.message);
      errors++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Quiz migration complete!');
  console.log(`   📊 Summary:`);
  console.log(`      - Lessons processed: ${lessons.length}`);
  console.log(`      - Quizzes added: ${added}`);
  console.log(`      - Skipped (already had quiz): ${skipped}`);
  console.log(`      - Errors: ${errors}`);
  console.log('\n💡 Note: These are generic placeholder quizzes.');
  console.log('   You should customize them with lesson-specific questions.');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
