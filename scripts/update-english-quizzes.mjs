import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  progress: (current, total, item) => console.log(`📝 [${current}/${total}] ${item}`)
};

// Question bank for sentence-structure lesson only (testing)
const sentenceStructureQuestions = [
  {
    text: "The research team completed their study, they published the results in a peer-reviewed journal.\n\nWhich choice best corrects the comma splice in this sentence?",
    options: [
      "NO CHANGE",
      "study; they",
      "study they",
      "study, and they"
    ],
    correct_answer: 1,
    explanation: "Option B correctly uses a semicolon to join two independent clauses. Option A creates a comma splice. Option C creates a run-on sentence. Option D unnecessarily adds 'and' when a semicolon alone is sufficient."
  },
  {
    text: "Although the weather was terrible, the game continued.\n\nWhich choice correctly identifies the sentence structure?",
    options: [
      "This is a dependent clause",
      "This is an independent clause",
      "This is a sentence fragment",
      "This is a comma splice"
    ],
    correct_answer: 0,
    explanation: "Option A is correct because 'Although' makes this a dependent clause that cannot stand alone. It requires the independent clause 'the game continued' to form a complete sentence."
  },
  {
    text: "The students studied for hours. And passed the exam with high scores.\n\nWhich choice best corrects the sentence fragment?",
    options: [
      "NO CHANGE",
      "They passed the exam with high scores.",
      "and passed the exam with high scores.",
      "Passed the exam with high scores."
    ],
    correct_answer: 2,
    explanation: "Option C is correct. The fragment should be joined to the previous sentence with a lowercase 'and'. Option A and D leave it as a fragment. Option B creates two short, choppy sentences when they should be combined."
  },
  {
    text: "Because she had studied all night.\n\nWhich best describes this sentence?",
    options: [
      "This is a complete sentence",
      "This is a sentence fragment",
      "This is a comma splice",
      "This is a run-on sentence"
    ],
    correct_answer: 1,
    explanation: "Option B is correct. This is a dependent clause beginning with 'Because' and lacks an independent clause to complete the thought. It's a classic sentence fragment."
  },
  {
    text: "The committee met yesterday they discussed the new proposal extensively.\n\nWhich choice best corrects the run-on sentence?",
    options: [
      "NO CHANGE",
      "yesterday; they",
      "yesterday, they",
      "yesterday: they"
    ],
    correct_answer: 1,
    explanation: "Option B correctly uses a semicolon to join two independent clauses. Option A is a run-on sentence. Option C creates a comma splice. Option D incorrectly uses a colon (which requires an explanation or list to follow)."
  }
];

async function updateSentenceStructureQuiz() {
  log.info('🚀 Starting to update sentence-structure quiz\n');

  try {
    // Find lesson
    const { data: lesson, error: lessonError } = await supabase
      .from('lessons')
      .select('id, title, lesson_key')
      .eq('lesson_key', 'sentence-structure')
      .single();

    if (lessonError) throw lessonError;
    if (!lesson) {
      log.error('Could not find sentence-structure lesson');
      return;
    }

    log.success(`Found lesson: ${lesson.title}\n`);

    // Find or create mastery quiz
    let { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'mastery')
      .single();

    if (quizError && quizError.code !== 'PGRST116') {
      throw quizError;
    }

    if (!quiz) {
      log.info('Creating new mastery quiz...');
      const { data: newQuiz, error: createError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: lesson.id,
          title: 'Sentence Structure Mastery Quiz',
          intro: 'Test your understanding of sentence structure and grammar.',
          quiz_type: 'mastery',
          position: 1,
          is_required: true
        })
        .select()
        .single();

      if (createError) throw createError;
      quiz = newQuiz;
      log.success('Created new quiz\n');
    } else {
      log.info('Found existing mastery quiz\n');
    }

    // Delete existing questions
    const { error: deleteQError } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('quiz_id', quiz.id);

    if (deleteQError) throw deleteQError;
    log.info('Deleted old questions\n');

    // Insert new questions
    const quizQuestions = sentenceStructureQuestions.map((q, idx) => ({
      quiz_id: quiz.id,
      question_text: q.text,
      question_order: idx
    }));

    const { data: questionsData, error: qError } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions)
      .select();

    if (qError) throw qError;
    log.success(`Created ${questionsData.length} questions\n`);

    // Insert options
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

    log.success('✅ Successfully updated sentence-structure quiz!');

  } catch (error) {
    log.error(`Failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

updateSentenceStructureQuiz();
