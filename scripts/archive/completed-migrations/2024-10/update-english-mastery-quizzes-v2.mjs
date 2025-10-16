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
  progress: (current, total, item) => console.log(`📝 [${current}/${total}] ${item}`)
};

// Question bank - 10 questions for sentence-structure
const questionBank = {
  'sentence-structure': [
    {
      text: "The research team completed their study, they published the results in a peer-reviewed journal.\n\nWhich choice best corrects the comma splice in this sentence?",
      options: ["NO CHANGE", "study; they", "study they", "study, and they"],
      correct_answer: 1,
      explanation: "Option B correctly uses a semicolon to join two independent clauses. A comma splice occurs when two independent clauses are joined with only a comma."
    },
    {
      text: "Although the weather was terrible, the game continued.\n\nWhich describes the underlined portion?",
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
  ]
};

async function updateEnglishQuizzes() {
  log.info('🚀 Starting English Mastery Quiz Update\n');

  try {
    // Fetch English lessons from lesson_metadata
    const { data: lessons, error: lessonsError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .order('order_index');

    if (lessonsError) throw lessonsError;
    log.success(`Found ${lessons.length} English lessons\n`);

    let successCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      log.progress(i + 1, lessons.length, lesson.title);

      // Check if we have questions for this lesson
      if (!questionBank[lesson.lesson_key]) {
        log.info(`  ⚠️  No questions for ${lesson.lesson_key}, skipping\n`);
        skippedCount++;
        continue;
      }

      const questions = questionBank[lesson.lesson_key];

      // Find or create mastery quiz
      let { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .select('id')
        .eq('lesson_id', lesson.id)
        .eq('quiz_type', 'mastery')
        .maybeSingle();

      if (quizError) throw quizError;

      if (!quiz) {
        log.info('  Creating new mastery quiz...');
        const { data: newQuiz, error: createError } = await supabase
          .from('quizzes')
          .insert({
            lesson_id: lesson.id,
            title: `${lesson.title} - Mastery Quiz`,
            intro: 'Test your understanding with these ACT-style questions.',
            quiz_type: 'mastery',
            position: 1,
            is_required: true
          })
          .select()
          .single();

        if (createError) throw createError;
        quiz = newQuiz;
      }

      // Delete existing questions
      await supabase.from('quiz_questions').delete().eq('quiz_id', quiz.id);

      // Insert new questions
      const quizQuestions = questions.map((q, idx) => ({
        quiz_id: quiz.id,
        question_text: q.text,
        question_order: idx
      }));

      const { data: questionsData, error: qError } = await supabase
        .from('quiz_questions')
        .insert(quizQuestions)
        .select();

      if (qError) throw qError;

      // Insert options
      const quizOptions = [];
      questionsData.forEach((dbQuestion, qIdx) => {
        const originalQuestion = questions[qIdx];
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

      await supabase.from('quiz_options').insert(quizOptions);

      log.success(`  ✅ Updated ${questions.length} questions\n`);
      successCount++;
    }

    log.info('═══════════════════════════════════════');
    log.info('📊 SUMMARY');
    log.info('═══════════════════════════════════════');
    log.success(`✅ Successfully updated: ${successCount} lessons`);
    log.info(`⚠️  Skipped: ${skippedCount} lessons (no questions)`);
    log.info('');
    log.success('🎉 Quiz Update Complete!');

  } catch (error) {
    log.error(`💥 Fatal error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

updateEnglishQuizzes();
