import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_ID = 'b699563d-216b-477f-aa3f-fe7b6f6afd80';

const questionsData = [
  {
    text: 'If 5x - 3 = 17, what is the value of x?',
    options: [
      { text: '2', isCorrect: false, explanation: 'Not quite. Try plugging 2 back into the equation: 5(2) - 3 = 10 - 3 = 7, not 17.' },
      { text: '3', isCorrect: false, explanation: 'Not quite. Try plugging 3 back into the equation: 5(3) - 3 = 15 - 3 = 12, not 17.' },
      { text: '4', isCorrect: true, explanation: 'Correct! Let\'s backsolve: 5(4) - 3 = 20 - 3 = 17 ✓' },
      { text: '5', isCorrect: false, explanation: 'Not quite. Try plugging 5 back into the equation: 5(5) - 3 = 25 - 3 = 22, not 17.' }
    ]
  },
  {
    text: 'Maria has twice as many books as her brother. If Maria has 24 books, how many books does her brother have?',
    options: [
      { text: '8', isCorrect: false, explanation: 'Not quite. If her brother had 8 books, Maria would have 2(8) = 16 books, not 24.' },
      { text: '10', isCorrect: false, explanation: 'Not quite. If her brother had 10 books, Maria would have 2(10) = 20 books, not 24.' },
      { text: '12', isCorrect: true, explanation: 'Correct! If her brother has 12 books, then Maria has 2(12) = 24 books ✓' },
      { text: '14', isCorrect: false, explanation: 'Not quite. If her brother had 14 books, Maria would have 2(14) = 28 books, not 24.' }
    ]
  },
  {
    text: 'If 3(n + 2) = 21, what is the value of n?',
    options: [
      { text: '3', isCorrect: false, explanation: 'Not quite. Let\'s check: 3(3 + 2) = 3(5) = 15, not 21.' },
      { text: '5', isCorrect: true, explanation: 'Correct! Let\'s backsolve: 3(5 + 2) = 3(7) = 21 ✓' },
      { text: '6', isCorrect: false, explanation: 'Not quite. Let\'s check: 3(6 + 2) = 3(8) = 24, not 21.' },
      { text: '7', isCorrect: false, explanation: 'Not quite. Let\'s check: 3(7 + 2) = 3(9) = 27, not 21.' }
    ]
  },
  {
    text: 'Which of the following points lies on the line y = 2x - 1?',
    options: [
      { text: '(2, 2)', isCorrect: false, explanation: 'Not quite. When x = 2, y = 2(2) - 1 = 3, not 2.' },
      { text: '(3, 5)', isCorrect: true, explanation: 'Correct! When x = 3, y = 2(3) - 1 = 5 ✓ The point (3, 5) satisfies the equation.' },
      { text: '(4, 6)', isCorrect: false, explanation: 'Not quite. When x = 4, y = 2(4) - 1 = 7, not 6.' },
      { text: '(5, 10)', isCorrect: false, explanation: 'Not quite. When x = 5, y = 2(5) - 1 = 9, not 10.' }
    ]
  },
  {
    text: 'The sum of three consecutive integers is 24. What is the smallest of these integers?',
    options: [
      { text: '6', isCorrect: false, explanation: 'Not quite. If the smallest is 6, the three integers are 6, 7, 8. Their sum is 6 + 7 + 8 = 21, not 24.' },
      { text: '7', isCorrect: true, explanation: 'Correct! If the smallest is 7, the three integers are 7, 8, 9. Their sum is 7 + 8 + 9 = 24 ✓' },
      { text: '8', isCorrect: false, explanation: 'Not quite. If the smallest is 8, the three integers are 8, 9, 10. Their sum is 8 + 9 + 10 = 27, not 24.' },
      { text: '9', isCorrect: false, explanation: 'Not quite. If the smallest is 9, the three integers are 9, 10, 11. Their sum is 9 + 10 + 11 = 30, not 24.' }
    ]
  }
];

async function addCheckpointQuiz() {
  console.log('📝 Adding Checkpoint Quiz to Lesson 1...\n');

  try {
    // 1. Check if quiz already exists at this position
    const { data: existingQuiz } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', LESSON_ID)
      .eq('position', 5)
      .single();

    let quizId;

    if (existingQuiz) {
      console.log('⚠️  Quiz already exists. Deleting and recreating...');
      quizId = existingQuiz.id;

      // Delete existing questions and options (cascade should handle this)
      await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
    } else {
      // 2. Create the quiz
      const { data: newQuiz, error: quizError } = await supabase
        .from('quizzes')
        .insert([{
          lesson_id: LESSON_ID,
          title: 'Checkpoint: Working Backwards Strategy',
          intro: 'Test your understanding of backsolving!',
          quiz_type: 'practice',
          position: 5,
          is_required: false
        }])
        .select()
        .single();

      if (quizError) {
        console.log('❌ Error creating quiz:', quizError.message);
        return;
      }

      quizId = newQuiz.id;
      console.log('✅ Quiz created with ID:', quizId);
    }

    // 3. Add questions
    for (let i = 0; i < questionsData.length; i++) {
      const questionData = questionsData[i];

      const { data: question, error: questionError } = await supabase
        .from('quiz_questions')
        .insert([{
          quiz_id: quizId,
          question_text: questionData.text,
          question_order: i + 1
        }])
        .select()
        .single();

      if (questionError) {
        console.log(`❌ Error creating question ${i + 1}:`, questionError.message);
        continue;
      }

      // 4. Add options for this question
      for (let j = 0; j < questionData.options.length; j++) {
        const optionData = questionData.options[j];

        const { error: optionError } = await supabase
          .from('quiz_options')
          .insert([{
            question_id: question.id,
            option_text: optionData.text,
            is_correct: optionData.isCorrect,
            explanation: optionData.explanation,
            option_order: j + 1
          }]);

        if (optionError) {
          console.log(`❌ Error creating option ${j + 1} for question ${i + 1}:`, optionError.message);
        }
      }

      console.log(`   ✓ Question ${i + 1} added with ${questionData.options.length} options`);
    }

    console.log('\n✅ Checkpoint quiz complete!');
    console.log('   - 5 beginner-friendly questions');
    console.log('   - Positioned at end of lesson (position 5)');
    console.log('   - Title: "Checkpoint: Working Backwards Strategy"');
  } catch (error) {
    console.log('❌ Unexpected error:', error.message);
  }
}

addCheckpointQuiz();
