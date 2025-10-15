import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
};

// Questions for sentence-structure
const sentenceStructureQuestions = [
  {
    text: "The research team completed their study, they published the results in a peer-reviewed journal.\n\nWhich choice best corrects the comma splice in this sentence?",
    options: ["NO CHANGE", "study; they", "study they", "study, and they"],
    correct_answer: 1,
    explanation: "Option B correctly uses a semicolon to join two independent clauses. A comma splice occurs when two independent clauses are joined with only a comma."
  },
  {
    text: "Although the weather was terrible, the game continued.\n\nWhich describes the underlined portion 'Although the weather was terrible'?",
    options: ["Dependent clause", "Independent clause", "Sentence fragment", "Comma splice"],
    correct_answer: 0,
    explanation: "'Although' creates a dependent clause that cannot stand alone. It needs the independent clause to form a complete sentence."
  },
  {
    text: "The students studied for hours. And passed the exam with high scores.\n\nWhich best corrects the fragment?",
    options: ["NO CHANGE", "They passed the exam", "and passed the exam", "Passed the exam"],
    correct_answer: 2,
    explanation: "The fragment should be joined to the previous sentence with lowercase 'and' to form one complete sentence."
  },
  {
    text: "Because she had studied all night.\n\nWhich best describes this?",
    options: ["Complete sentence", "Sentence fragment", "Comma splice", "Run-on sentence"],
    correct_answer: 1,
    explanation: "This is a dependent clause beginning with 'Because' that lacks an independent clause to complete it."
  },
  {
    text: "The committee met yesterday they discussed the new proposal extensively.\n\nWhich corrects the run-on?",
    options: ["NO CHANGE", "yesterday; they", "yesterday, they", "yesterday: they"],
    correct_answer: 1,
    explanation: "A semicolon correctly joins two independent clauses. A comma would create a comma splice."
  },
  {
    text: "The artist, who had worked on the sculpture for months, finally revealed it to the public, and critics praised its originality.\n\nThis sentence is:",
    options: ["Simple", "Compound", "Complex", "Compound-complex"],
    correct_answer: 3,
    explanation: "The sentence has two independent clauses (compound) and includes a dependent 'who' clause (complex), making it compound-complex."
  },
  {
    text: "Having finished their homework, the students went to the park, they played basketball until sunset.\n\nWhich corrects the error?",
    options: ["NO CHANGE", "park; they", "park. They", "park and they"],
    correct_answer: 1,
    explanation: "A semicolon correctly connects two closely related independent clauses, fixing the comma splice."
  },
  {
    text: "While walking through the forest, spotted a rare bird.\n\nWhich corrects the fragment?",
    options: ["NO CHANGE", "I spotted a rare bird", "a rare bird was spotted", "spotting a rare bird"],
    correct_answer: 1,
    explanation: "The sentence needs a subject. Adding 'I' before 'spotted' completes the sentence."
  },
  {
    text: "The professor explained the theory however many students remained confused about its practical applications.\n\nWhich corrects the error?",
    options: ["NO CHANGE", "theory; however,", "theory, however", "theory, however,"],
    correct_answer: 1,
    explanation: "When 'however' joins independent clauses, it requires a semicolon before and comma after."
  },
  {
    text: "After reviewing all the evidence. The jury reached a unanimous verdict.\n\nWhich corrects the error?",
    options: ["NO CHANGE", "evidence, the", "evidence; the", "evidence: the"],
    correct_answer: 1,
    explanation: "The dependent clause should be joined to the independent clause with a comma, not separated by a period."
  }
];

async function main() {
  log.info('🚀 Starting database fix and quiz update\n');

  try {
    // Step 1: Fix the foreign key constraint
    log.info('Step 1: Fixing foreign key constraint...');
    
    const { error: dropError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE quizzes DROP CONSTRAINT IF EXISTS quizzes_lesson_id_fkey'
    });

    if (dropError) {
      log.info('Note: Could not drop constraint via RPC (this is okay if it needs manual fix)');
    }

    const { error: addError } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE quizzes ADD CONSTRAINT quizzes_lesson_id_fkey FOREIGN KEY (lesson_id) REFERENCES lesson_metadata(id) ON DELETE CASCADE'
    });

    if (addError) {
      log.info('Note: Could not add constraint via RPC (will try direct approach)');
    }

    log.success('Constraint fix attempted\n');

    // Step 2: Get lesson from lesson_metadata
    log.info('Step 2: Finding sentence-structure lesson...');
    
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('lesson_key', 'sentence-structure')
      .single();

    if (lessonError) throw lessonError;
    log.success(`Found: ${lesson.title}\n`);

    // Step 3: Check for existing quiz
    log.info('Step 3: Checking for existing quiz...');
    
    const { data: existingQuiz } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'mastery')
      .maybeSingle();

    let quizId;
    
    if (existingQuiz) {
      log.success(`Found existing quiz: ${existingQuiz.title}`);
      quizId = existingQuiz.id;
      
      // Delete old questions
      await supabase.from('quiz_questions').delete().eq('quiz_id', quizId);
      log.success('Cleared old questions\n');
    } else {
      log.info('No existing quiz found, will create new one...\n');
      
      const { data: newQuiz, error: createError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: lesson.id,
          title: 'Sentence Structure Mastery Quiz',
          intro: 'Test your understanding with these 10 ACT-style questions.',
          quiz_type: 'mastery',
          position: 1,
          is_required: true
        })
        .select()
        .single();

      if (createError) {
        log.error(`Could not create quiz: ${createError.message}`);
        log.info('\n⚠️  The foreign key constraint needs manual fixing.');
        log.info('Please run this SQL in Supabase SQL Editor:');
        log.info('');
        log.info('ALTER TABLE quizzes DROP CONSTRAINT IF EXISTS quizzes_lesson_id_fkey;');
        log.info('ALTER TABLE quizzes ADD CONSTRAINT quizzes_lesson_id_fkey');
        log.info('  FOREIGN KEY (lesson_id) REFERENCES lesson_metadata(id) ON DELETE CASCADE;');
        log.info('');
        log.info('Then run this script again.');
        process.exit(1);
      }
      
      quizId = newQuiz.id;
      log.success(`Created new quiz\n`);
    }

    // Step 4: Insert questions
    log.info('Step 4: Inserting 10 questions...');
    
    const quizQuestions = sentenceStructureQuestions.map((q, idx) => ({
      quiz_id: quizId,
      question_text: q.text,
      question_order: idx
    }));

    const { data: questionsData, error: qError } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions)
      .select();

    if (qError) throw qError;
    log.success(`Created ${questionsData.length} questions\n`);

    // Step 5: Insert options
    log.info('Step 5: Inserting 40 options...');
    
    const quizOptions = [];
    questionsData.forEach((dbQuestion, qIdx) => {
      const originalQuestion = sentenceStructureQuestions[qIdx];
      originalQuestion.options.forEach((optionText, optIdx) => {
        quizOptions.push({
          question_id: dbQuestion.id,
          option_text: optionText,
          option_order: optIdx,
          is_correct: optIdx === originalQuestion.correct_answer,
          explanation: optIdx === originalQuestion.correct_answer ? originalQuestion.explanation : null
        });
      });
    });

    const { error: optionsError } = await supabase
      .from('quiz_options')
      .insert(quizOptions);

    if (optionsError) throw optionsError;
    log.success(`Created ${quizOptions.length} options\n`);

    // Success!
    log.info('═══════════════════════════════════════════');
    log.success('🎉 Successfully updated sentence-structure quiz!');
    log.info('═══════════════════════════════════════════');
    log.info('\n📊 Summary:');
    log.info(`   Lesson: ${lesson.title}`);
    log.info(`   Quiz Type: Mastery`);
    log.info(`   Questions: 10`);
    log.info(`   Options: 40`);
    log.info(`   Format: ACT-style multiple choice`);
    log.info('');

  } catch (error) {
    log.error(`\n💥 Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

main();
