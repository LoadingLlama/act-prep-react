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

// 10 questions for sentence-structure
const sentenceStructureQuestions = [
  {
    text: "The research team completed their <u>study, they</u> published the results in a peer-reviewed journal.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "study; they", "study they", "study, and they"],
    correct_answer: 1,
    explanations: [
      "This creates a comma splice - two independent clauses joined with only a comma, which is grammatically incorrect.",
      "Correct! A semicolon properly joins two independent clauses without a conjunction.",
      "This creates a run-on sentence with no punctuation between two independent clauses.",
      "While this fixes the comma splice, the coordinating conjunction 'and' makes the sentence less concise than using a semicolon."
    ]
  },
  {
    text: "<u>Although the weather was terrible,</u> the game continued.<br><br>What type of clause is the underlined portion?",
    options: ["Dependent clause", "Independent clause", "Sentence fragment", "Comma splice"],
    correct_answer: 0,
    explanations: [
      "Correct! 'Although' is a subordinating conjunction that creates a dependent clause, which cannot stand alone as a complete sentence.",
      "'Although the weather was terrible' cannot stand alone - it's dependent on the main clause.",
      "This is not a fragment in this context because it's properly connected to an independent clause.",
      "A comma splice involves two independent clauses; this is a dependent clause."
    ]
  },
  {
    text: "The students studied for hours. <u>And passed</u> the exam with high scores.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "They passed", "and passed", "Passed"],
    correct_answer: 2,
    explanations: [
      "Starting a sentence with a capitalized coordinating conjunction creates a sentence fragment.",
      "This creates two separate sentences, which is grammatically correct but less fluid than joining them.",
      "Correct! Lowercase 'and' properly connects this to the previous sentence, creating one fluid sentence.",
      "Without a subject or conjunction, this remains a fragment."
    ]
  },
  {
    text: "<u>Because she had studied all night.</u><br><br>What is the underlined portion?",
    options: ["Complete sentence", "Sentence fragment", "Comma splice", "Run-on sentence"],
    correct_answer: 1,
    explanations: [
      "This cannot be a complete sentence because it begins with 'Because,' which creates a dependent clause that requires an independent clause.",
      "Correct! This is a sentence fragment - a dependent clause with no independent clause to complete the thought.",
      "A comma splice requires two independent clauses joined by a comma; this is just one dependent clause.",
      "A run-on sentence has two or more independent clauses improperly joined; this is a single dependent clause."
    ]
  },
  {
    text: "The committee met <u>yesterday they</u> discussed the new proposal extensively.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "yesterday; they", "yesterday, they", "yesterday: they"],
    correct_answer: 1,
    explanations: [
      "This creates a run-on sentence with two independent clauses and no punctuation between them.",
      "Correct! A semicolon properly separates two closely related independent clauses.",
      "This creates a comma splice - two independent clauses cannot be joined with only a comma.",
      "A colon is used to introduce a list or explanation, not to join two independent clauses."
    ]
  },
  {
    text: "The artist, who had worked on the sculpture for months, finally revealed it to the public, and critics praised its originality.<br><br>What type of sentence structure is shown above?",
    options: ["Simple", "Compound", "Complex", "Compound-complex"],
    correct_answer: 3,
    explanations: [
      "A simple sentence has only one independent clause; this sentence has two independent clauses and a dependent clause.",
      "A compound sentence has two independent clauses but no dependent clauses; this also has the dependent 'who' clause.",
      "A complex sentence has one independent clause and at least one dependent clause; this has TWO independent clauses.",
      "Correct! This has two independent clauses joined by 'and' (compound) plus a dependent 'who' clause (complex), making it compound-complex."
    ]
  },
  {
    text: "Having finished their homework, the students went to the <u>park, they</u> played basketball until sunset.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "park; they", "park. They", "park and they"],
    correct_answer: 1,
    explanations: [
      "This creates a comma splice - two independent clauses cannot be joined with only a comma.",
      "Correct! A semicolon properly joins two closely related independent clauses.",
      "While grammatically correct, separating into two sentences disrupts the flow; a semicolon better shows the connection.",
      "This works but creates a compound sentence with three clauses, making it overly long and less clear."
    ]
  },
  {
    text: "While walking through the forest, <u>spotted</u> a rare bird.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "I spotted", "was spotted", "spotting"],
    correct_answer: 1,
    explanations: [
      "Without a subject, this creates a sentence fragment - we don't know who spotted the bird.",
      "Correct! Adding the subject 'I' completes the sentence and makes it grammatically correct.",
      "Passive voice is grammatically correct here but less direct and clear than active voice with 'I spotted.'",
      "This creates a fragment with two participial phrases and no main verb."
    ]
  },
  {
    text: "The professor explained the <u>theory however</u> many students remained confused about its practical applications.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "theory; however,", "theory, however", "theory, however,"],
    correct_answer: 1,
    explanations: [
      "Without punctuation before 'however,' this creates a run-on sentence joining two independent clauses.",
      "Correct! When 'however' joins two independent clauses, it requires a semicolon before and a comma after.",
      "A comma before 'however' creates a comma splice; a semicolon is needed to join the independent clauses.",
      "This creates a comma splice - the comma before 'however' is insufficient to join two independent clauses."
    ]
  },
  {
    text: "After reviewing all the <u>evidence. The</u> jury reached a unanimous verdict.<br><br>Which choice best corrects the underlined portion?",
    options: ["NO CHANGE", "evidence, the", "evidence; the", "evidence: the"],
    correct_answer: 1,
    explanations: [
      "Using a period incorrectly separates the dependent clause from the independent clause, creating a fragment.",
      "Correct! A comma properly connects the introductory dependent clause to the independent clause.",
      "A semicolon is used to join independent clauses; 'After reviewing all the evidence' is a dependent clause.",
      "A colon introduces lists or explanations, not dependent clauses; a comma is needed here."
    ]
  }
];

async function updateSentenceStructureQuiz() {
  log.info('🚀 Updating Sentence Structure Mastery Quiz\n');

  try {
    // Get lesson from lesson_metadata
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('lesson_key', 'sentence-structure')
      .single();

    if (lessonError) throw lessonError;
    log.success(`Found lesson: ${lesson.title} (ID: ${lesson.id})\n`);

    // Check for existing quiz
    const { data: existingQuiz, error: quizFetchError } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'mastery')
      .maybeSingle();

    if (quizFetchError) throw quizFetchError;

    let quizId;
    
    if (existingQuiz) {
      log.info(`Found existing quiz: ${existingQuiz.title}`);
      quizId = existingQuiz.id;

      // Update position to ensure it's at the bottom
      const { error: updateError } = await supabase
        .from('quizzes')
        .update({ position: 9999 })
        .eq('id', quizId);

      if (updateError) throw updateError;
      log.success('Updated quiz position to bottom\n');

      // Delete existing questions
      const { error: deleteError } = await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quizId);

      if (deleteError) throw deleteError;
      log.success('Deleted old questions\n');
    } else {
      log.info('Creating new mastery quiz...');
      const { data: newQuiz, error: createError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: lesson.id,
          title: 'Sentence Structure Mastery Quiz',
          intro: 'Test your understanding with these 10 ACT-style questions.',
          quiz_type: 'mastery',
          position: 9999,
          is_required: true
        })
        .select()
        .single();

      if (createError) throw createError;
      quizId = newQuiz.id;
      log.success(`Created new quiz (ID: ${quizId})\n`);
    }

    // Insert questions
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
          explanation: originalQuestion.explanations[optIdx]
        });
      });
    });

    const { error: optionsError } = await supabase
      .from('quiz_options')
      .insert(quizOptions);

    if (optionsError) throw optionsError;
    log.success(`Created ${quizOptions.length} options\n`);

    log.success('✅ Successfully updated sentence-structure mastery quiz!');
    log.info('\n📊 Summary:');
    log.info(`   - Lesson: ${lesson.title}`);
    log.info(`   - Quiz Type: mastery`);
    log.info(`   - Questions: 10`);
    log.info(`   - Options: 40`);

  } catch (error) {
    log.error(`💥 Failed: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
}

updateSentenceStructureQuiz();
