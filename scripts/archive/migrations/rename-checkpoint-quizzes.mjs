import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const LESSON_1_1_ID = 'b699563d-216b-477f-aa3f-fe7b6f6afd80';
const LESSON_1_2_ID = '84020949-093d-4d24-8aa1-7dc985581e48';

async function renameQuizzes() {
  console.log('📝 Renaming checkpoint quizzes to more engaging titles...\n');

  // Update Lesson 1.1 quiz
  const { data: quiz1, error: error1 } = await supabase
    .from('quizzes')
    .update({
      title: 'Practice What You\'ve Learned',
      intro: 'Let\'s see how well you understand backsolving! Try these practice problems.',
      updated_at: new Date().toISOString()
    })
    .eq('lesson_id', LESSON_1_1_ID)
    .select();

  if (error1) {
    console.log('❌ Error updating Lesson 1.1 quiz:', error1.message);
  } else if (quiz1 && quiz1.length > 0) {
    console.log('✅ Lesson 1.1 quiz updated!');
    console.log('   - New title: "Practice What You\'ve Learned"');
    console.log('   - New intro: "Let\'s see how well you understand backsolving! Try these practice problems."');
  }

  // Update Lesson 1.2 quiz
  const { data: quiz2, error: error2 } = await supabase
    .from('quizzes')
    .update({
      title: 'Practice What You\'ve Learned',
      intro: 'Let\'s see how well you understand substitution! Try these practice problems.',
      updated_at: new Date().toISOString()
    })
    .eq('lesson_id', LESSON_1_2_ID)
    .select();

  if (error2) {
    console.log('❌ Error updating Lesson 1.2 quiz:', error2.message);
  } else if (quiz2 && quiz2.length > 0) {
    console.log('✅ Lesson 1.2 quiz updated!');
    console.log('   - New title: "Practice What You\'ve Learned"');
    console.log('   - New intro: "Let\'s see how well you understand substitution! Try these practice problems."');
  }

  console.log('\n✅ All checkpoint quizzes renamed!');
  console.log('   - More engaging and friendly');
  console.log('   - Removed "Checkpoint" terminology');
}

renameQuizzes();
