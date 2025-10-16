/**
 * Regenerate English Mastery Quizzes - Direct Generation
 * Generates questions directly without API calls
 *
 * Usage: node scripts/regenerate-english-quizzes-direct.mjs
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  progress: (current, total, item) => console.log(`📝 [${current}/${total}] ${item}`)
};

/**
 * Question bank for each English lesson
 * Each lesson gets 10 carefully crafted ACT-style questions
 */
const questionBank = {
  'sentence-structure': [
    {
      sentence: "The research team completed their study, they published the results in a peer-reviewed journal.",
      question_text: "Which choice best corrects the comma splice in this sentence?",
      underlined: "study, they",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "study; they", is_correct: true },
        { letter: "C", text: "study they", is_correct: false },
        { letter: "D", text: "study, and they", is_correct: false }
      ],
      explanation: "Option B correctly uses a semicolon to join two independent clauses. Option A creates a comma splice. Option C creates a run-on sentence. Option D unnecessarily adds 'and' when a semicolon alone is sufficient."
    },
    {
      sentence: "Although the weather was terrible, the game continued.",
      question_text: "Which choice correctly identifies the sentence structure?",
      underlined: "Although the weather was terrible",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "This is a dependent clause", is_correct: true },
        { letter: "B", text: "This is an independent clause", is_correct: false },
        { letter: "C", text: "This is a sentence fragment", is_correct: false },
        { letter: "D", text: "This is a comma splice", is_correct: false }
      ],
      explanation: "Option A is correct because 'Although' makes this a dependent clause that cannot stand alone. It requires the independent clause 'the game continued' to form a complete sentence."
    },
    {
      sentence: "The students studied for hours. And passed the exam with high scores.",
      question_text: "Which choice best corrects the sentence fragment?",
      underlined: "And passed the exam with high scores.",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "They passed the exam with high scores.", is_correct: false },
        { letter: "C", text: "and passed the exam with high scores.", is_correct: true },
        { letter: "D", text: "Passed the exam with high scores.", is_correct: false }
      ],
      explanation: "Option C is correct. The fragment should be joined to the previous sentence with a lowercase 'and'. Option A and D leave it as a fragment. Option B creates two short, choppy sentences when they should be combined."
    },
    {
      sentence: "Because she had studied all night.",
      question_text: "Which best describes this sentence?",
      underlined: "Because she had studied all night.",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "This is a complete sentence", is_correct: false },
        { letter: "B", text: "This is a sentence fragment", is_correct: true },
        { letter: "C", text: "This is a comma splice", is_correct: false },
        { letter: "D", text: "This is a run-on sentence", is_correct: false }
      ],
      explanation: "Option B is correct. This is a dependent clause beginning with 'Because' and lacks an independent clause to complete the thought. It's a classic sentence fragment."
    },
    {
      sentence: "The committee met yesterday they discussed the new proposal extensively.",
      question_text: "Which choice best corrects the run-on sentence?",
      underlined: "yesterday they",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "yesterday; they", is_correct: true },
        { letter: "C", text: "yesterday, they", is_correct: false },
        { letter: "D", text: "yesterday: they", is_correct: false }
      ],
      explanation: "Option B correctly uses a semicolon to join two independent clauses. Option A is a run-on sentence. Option C creates a comma splice. Option D incorrectly uses a colon (which requires an explanation or list to follow)."
    },
    {
      sentence: "The artist, who had worked on the sculpture for months, finally revealed it to the public, and critics praised its originality.",
      question_text: "This sentence is an example of which structure?",
      underlined: "entire sentence",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "Simple sentence", is_correct: false },
        { letter: "B", text: "Compound sentence", is_correct: false },
        { letter: "C", text: "Complex sentence", is_correct: false },
        { letter: "D", text: "Compound-complex sentence", is_correct: true }
      ],
      explanation: "Option D is correct. The sentence contains two independent clauses joined by 'and' (compound) and includes a dependent clause 'who had worked on the sculpture for months' (complex), making it compound-complex."
    },
    {
      sentence: "Having finished their homework, the students went to the park, they played basketball until sunset.",
      question_text: "Which choice best corrects the sentence error?",
      underlined: "park, they",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "park; they", is_correct: true },
        { letter: "C", text: "park. They", is_correct: false },
        { letter: "D", text: "park and they", is_correct: false }
      ],
      explanation: "Option B correctly uses a semicolon to connect two closely related independent clauses. Option A creates a comma splice. Option C is grammatically correct but the semicolon better shows the close relationship. Option D creates awkward phrasing."
    },
    {
      sentence: "While walking through the forest, spotted a rare bird.",
      question_text: "Which choice best corrects the sentence fragment?",
      underlined: "spotted a rare bird",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "I spotted a rare bird", is_correct: true },
        { letter: "C", text: "a rare bird was spotted", is_correct: false },
        { letter: "D", text: "spotting a rare bird", is_correct: false }
      ],
      explanation: "Option B is correct because it adds a subject to complete the sentence. The original lacks a subject for the verb 'spotted'. Option C changes the meaning (passive voice). Option D doesn't add a main verb."
    },
    {
      sentence: "The professor explained the theory however many students remained confused about its practical applications.",
      question_text: "Which choice best corrects the punctuation error?",
      underlined: "theory however",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "theory; however,", is_correct: true },
        { letter: "C", text: "theory, however", is_correct: false },
        { letter: "D", text: "theory, however,", is_correct: false }
      ],
      explanation: "Option B is correct. When 'however' joins two independent clauses, it requires a semicolon before and comma after. Option A creates a run-on. Options C and D create comma splices."
    },
    {
      sentence: "After reviewing all the evidence. The jury reached a unanimous verdict.",
      question_text: "Which choice best corrects the error?",
      underlined: "evidence. The",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "evidence, the", is_correct: true },
        { letter: "C", text: "evidence; the", is_correct: false },
        { letter: "D", text: "evidence: the", is_correct: false }
      ],
      explanation: "Option B is correct. The dependent clause 'After reviewing all the evidence' should be joined to the independent clause with a comma, not a period. Option A incorrectly separates the clauses. Options C and D use inappropriate punctuation."
    }
  ],

  'commas': [
    {
      sentence: "My friend Sarah who lives in Boston is visiting this weekend.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "Sarah who lives in Boston",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "Sarah, who lives in Boston,", is_correct: true },
        { letter: "C", text: "Sarah who lives in Boston,", is_correct: false },
        { letter: "D", text: "Sarah, who lives in Boston", is_correct: false }
      ],
      explanation: "Option B is correct. The clause 'who lives in Boston' is unnecessary information about Sarah and requires commas on both sides. This is the 'unnecessary information' comma rule."
    },
    {
      sentence: "The scientist studied the results carefully precisely and thoroughly.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "carefully precisely and thoroughly",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "carefully, precisely, and thoroughly", is_correct: true },
        { letter: "C", text: "carefully, precisely and thoroughly", is_correct: false },
        { letter: "D", text: "carefully precisely, and thoroughly", is_correct: false }
      ],
      explanation: "Option B correctly uses commas to separate items in a list of three or more (listing commas rule). Each adverb should be separated by commas."
    },
    {
      sentence: "The tall, brick, building housed the university's main offices.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "tall, brick, building",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "tall, brick building", is_correct: true },
        { letter: "C", text: "tall brick, building", is_correct: false },
        { letter: "D", text: "tall brick building", is_correct: false }
      ],
      explanation: "Option B is correct. Use commas between coordinate adjectives (adjectives that could be reordered). 'Tall' and 'brick' are coordinate, but 'brick' and 'building' form a compound noun, so no comma after 'brick'."
    },
    {
      sentence: "Dr. Johnson the renowned physicist gave a lecture on quantum mechanics.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "Johnson the renowned physicist gave",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "Johnson, the renowned physicist, gave", is_correct: true },
        { letter: "C", text: "Johnson the renowned physicist, gave", is_correct: false },
        { letter: "D", text: "Johnson, the renowned physicist gave", is_correct: false }
      ],
      explanation: "Option B correctly uses the 'names rule' - unnecessary information about a name requires commas on both sides. 'The renowned physicist' provides extra information about Dr. Johnson."
    },
    {
      sentence: "The conference will be held in Chicago Illinois on March 15 2024.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "Chicago Illinois on March 15 2024",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "Chicago, Illinois, on March 15, 2024", is_correct: true },
        { letter: "C", text: "Chicago, Illinois on March 15, 2024", is_correct: false },
        { letter: "D", text: "Chicago Illinois, on March 15, 2024", is_correct: false }
      ],
      explanation: "Option B is correct. Cities and states require a comma between them AND after the state. Dates require commas between day and year AND after the year if the sentence continues."
    },
    {
      sentence: "After studying all night, the student felt prepared, confident, and ready to take the exam.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "prepared, confident, and ready",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "prepared confident and ready", is_correct: false },
        { letter: "C", text: "prepared, confident and ready", is_correct: false },
        { letter: "D", text: "prepared confident, and ready", is_correct: false }
      ],
      explanation: "Option A is correct. This properly uses listing commas with the Oxford comma before 'and'. All three adjectives are separated correctly."
    },
    {
      sentence: "The museum, which recently underwent renovations reopened to the public last week.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "renovations reopened",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "renovations, reopened", is_correct: true },
        { letter: "C", text: "renovations; reopened", is_correct: false },
        { letter: "D", text: "renovations. Reopened", is_correct: false }
      ],
      explanation: "Option B is correct. The nonrestrictive clause 'which recently underwent renovations' requires closing comma before continuing the main sentence. This completes the 'unnecessary information' rule."
    },
    {
      sentence: "The enthusiastic young talented musician performed at Carnegie Hall.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "enthusiastic young talented",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "enthusiastic, young, talented", is_correct: true },
        { letter: "C", text: "enthusiastic young, talented", is_correct: false },
        { letter: "D", text: "enthusiastic, young talented", is_correct: false }
      ],
      explanation: "Option B is correct. All three adjectives are coordinate (you could reorder them) and modify 'musician' equally, so commas are needed between each pair."
    },
    {
      sentence: "Having finished the assignment the students submitted it online before the midnight deadline.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "assignment the",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "assignment, the", is_correct: true },
        { letter: "C", text: "assignment; the", is_correct: false },
        { letter: "D", text: "assignment. The", is_correct: false }
      ],
      explanation: "Option B is correct. An introductory participial phrase like 'Having finished the assignment' requires a comma before the main clause begins."
    },
    {
      sentence: "The award was given to Maria Rodriguez the top student in her graduating class not to her rival.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "Rodriguez the top student in her graduating class not",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "Rodriguez, the top student in her graduating class, not", is_correct: true },
        { letter: "C", text: "Rodriguez the top student in her graduating class, not", is_correct: false },
        { letter: "D", text: "Rodriguez, the top student in her graduating class not", is_correct: false }
      ],
      explanation: "Option B correctly uses commas around the unnecessary descriptive phrase 'the top student in her graduating class.' This follows the names rule - extra information about a person needs commas on both sides."
    }
  ],

  'punctuation': [
    {
      sentence: "The team worked hard; they achieved their goal.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "hard; they",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "hard, they", is_correct: false },
        { letter: "C", text: "hard: they", is_correct: false },
        { letter: "D", text: "hard they", is_correct: false }
      ],
      explanation: "Option A is correct. A semicolon properly joins two closely related independent clauses. Option B creates a comma splice. Option C incorrectly uses a colon (which requires explanation to follow). Option D creates a run-on."
    },
    {
      sentence: "The professor made one thing clear: students must submit assignments on time.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "clear: students",
      difficulty_level: 1,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "clear; students", is_correct: false },
        { letter: "C", text: "clear, students", is_correct: false },
        { letter: "D", text: "clear students", is_correct: false }
      ],
      explanation: "Option A is correct. A colon properly introduces an explanation or clarification of what was made 'clear.' The colon signals that what follows explains the preceding statement."
    },
    {
      sentence: "The students' grades improved significantly after the tutoring sessions.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "students'",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "student's", is_correct: false },
        { letter: "C", text: "students", is_correct: false },
        { letter: "D", text: "students's", is_correct: false }
      ],
      explanation: "Option A is correct. The apostrophe after 's' indicates plural possession (multiple students own the grades). Option B would mean only one student. Option C lacks possession. Option D is not a valid form."
    },
    {
      sentence: "The company's main goals include the following—increasing revenue, expanding markets, and improving customer satisfaction.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "following—increasing",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "following: increasing", is_correct: true },
        { letter: "C", text: "following; increasing", is_correct: false },
        { letter: "D", text: "following, increasing", is_correct: false }
      ],
      explanation: "Option B is correct. A colon is the proper punctuation to introduce a list. An em dash can emphasize but is less formal. A semicolon cannot introduce a list. A comma alone is insufficient."
    },
    {
      sentence: "She needed three items for the experiment: test tubes, a microscope, and safety goggles.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "experiment: test tubes",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "experiment; test tubes", is_correct: false },
        { letter: "C", text: "experiment—test tubes", is_correct: false },
        { letter: "D", text: "experiment, test tubes", is_correct: false }
      ],
      explanation: "Option A is correct. A colon properly introduces a list after a complete independent clause. The other punctuation marks are incorrect for introducing lists in this context."
    },
    {
      sentence: "The novel—which took ten years to write—became an instant bestseller.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "novel—which took ten years to write—became",
      difficulty_level: 2,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "novel, which took ten years to write, became", is_correct: true },
        { letter: "C", text: "novel: which took ten years to write: became", is_correct: false },
        { letter: "D", text: "novel; which took ten years to write; became", is_correct: false }
      ],
      explanation: "Option A is correct (em dashes emphasize the interruption). Option B also works (commas are acceptable for nonrestrictive clauses). Options C and D incorrectly use colons and semicolons for this purpose."
    },
    {
      sentence: "The childrens' playground was renovated last summer.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "childrens'",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: false },
        { letter: "B", text: "children's", is_correct: true },
        { letter: "C", text: "childrens", is_correct: false },
        { letter: "D", text: "children's'", is_correct: false }
      ],
      explanation: "Option B is correct. 'Children' is already plural, so the possessive is formed by adding apostrophe-s, not s-apostrophe. Option A incorrectly treats it as a regular plural. Options C and D are not valid forms."
    },
    {
      sentence: "The reporter asked a difficult question; however, the politician answered it skillfully.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "question; however,",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "question, however,", is_correct: false },
        { letter: "C", text: "question: however,", is_correct: false },
        { letter: "D", text: "question however,", is_correct: false }
      ],
      explanation: "Option A is correct. Conjunctive adverbs like 'however' joining independent clauses require a semicolon before and comma after. Option B creates a comma splice. Options C and D use incorrect punctuation."
    },
    {
      sentence: "The exhibition featured three artists' works: Picasso's cubist paintings, Monet's impressionist landscapes, and Warhol's pop art prints.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "artists' works",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "artist's works", is_correct: false },
        { letter: "C", text: "artists works", is_correct: false },
        { letter: "D", text: "artists's works", is_correct: false }
      ],
      explanation: "Option A is correct. The apostrophe after 's' indicates plural possession (works belonging to three artists). The colon then properly introduces the list. Option B would indicate one artist. Option C lacks possession."
    },
    {
      sentence: "The scientist concluded—after years of research—that the hypothesis was correct.",
      question_text: "Which choice provides the best punctuation?",
      underlined: "concluded—after years of research—that",
      difficulty_level: 3,
      options: [
        { letter: "A", text: "NO CHANGE", is_correct: true },
        { letter: "B", text: "concluded: after years of research: that", is_correct: false },
        { letter: "C", text: "concluded; after years of research; that", is_correct: false },
        { letter: "D", text: "concluded (after years of research) that", is_correct: true }
      ],
      explanation: "Option A is correct (em dashes emphasize the interrupting phrase). Option D also works (parentheses de-emphasize the interruption). Options B and C incorrectly use colons and semicolons for interrupting phrases."
    }
  ]
};

/**
 * Update quiz questions for a specific lesson
 */
async function updateLessonQuiz(lesson, questions) {
  const { id: lessonId, lesson_key, title } = lesson;

  try {
    // Fetch existing mastery quiz questions
    const { data: existingQuestions, error: fetchError } = await supabase
      .from('quiz_questions')
      .select('id')
      .eq('lesson_id', lessonId)
      .eq('quiz_type', 'mastery')
      .order('order_index');

    if (fetchError) throw fetchError;

    if (!existingQuestions || existingQuestions.length === 0) {
      log.info(`  Creating new questions for ${lesson_key}`);
      // Create new questions
      for (let i = 0; i < questions.length; i++) {
        await createQuestion(lessonId, questions[i], i + 1);
      }
    } else {
      log.info(`  Updating ${existingQuestions.length} existing questions`);
      // Update existing questions
      for (let i = 0; i < Math.min(questions.length, existingQuestions.length); i++) {
        await updateQuestion(existingQuestions[i].id, questions[i]);
      }

      // Create additional questions if needed
      if (questions.length > existingQuestions.length) {
        for (let i = existingQuestions.length; i < questions.length; i++) {
          await createQuestion(lessonId, questions[i], i + 1);
        }
      }

      // Delete extra questions if we have fewer
      if (existingQuestions.length > questions.length) {
        for (let i = questions.length; i < existingQuestions.length; i++) {
          await deleteQuestion(existingQuestions[i].id);
        }
      }
    }

    log.success(`  ✅ Updated quiz for ${title}`);
  } catch (error) {
    log.error(`  ❌ Failed to update ${lesson_key}: ${error.message}`);
    throw error;
  }
}

async function createQuestion(lessonId, questionData, orderIndex) {
  const fullText = `${questionData.sentence}\n\n${questionData.question_text}`;

  const { data: question, error: qError } = await supabase
    .from('quiz_questions')
    .insert({
      lesson_id: lessonId,
      quiz_type: 'mastery',
      question_text: fullText,
      difficulty_level: questionData.difficulty_level,
      explanation: questionData.explanation,
      order_index: orderIndex
    })
    .select()
    .single();

  if (qError) throw qError;

  // Insert options
  const options = questionData.options.map((opt, idx) => ({
    question_id: question.id,
    option_text: opt.text,
    is_correct: opt.is_correct,
    order_index: idx
  }));

  const { data: insertedOptions, error: oError } = await supabase
    .from('quiz_options')
    .insert(options)
    .select();

  if (oError) throw oError;

  // Set correct answer
  const correctOption = insertedOptions.find(o => o.is_correct);
  if (correctOption) {
    await supabase
      .from('quiz_questions')
      .update({ correct_answer_id: correctOption.id })
      .eq('id', question.id);
  }
}

async function updateQuestion(questionId, questionData) {
  const fullText = `${questionData.sentence}\n\n${questionData.question_text}`;

  // Update question
  const { error: updateError } = await supabase
    .from('quiz_questions')
    .update({
      question_text: fullText,
      difficulty_level: questionData.difficulty_level,
      explanation: questionData.explanation,
      updated_at: new Date().toISOString()
    })
    .eq('id', questionId);

  if (updateError) throw updateError;

  // Delete old options
  await supabase.from('quiz_options').delete().eq('question_id', questionId);

  // Insert new options
  const options = questionData.options.map((opt, idx) => ({
    question_id: questionId,
    option_text: opt.text,
    is_correct: opt.is_correct,
    order_index: idx
  }));

  const { data: insertedOptions, error: optError } = await supabase
    .from('quiz_options')
    .insert(options)
    .select();

  if (optError) throw optError;

  // Set correct answer
  const correctOption = insertedOptions.find(o => o.is_correct);
  if (correctOption) {
    await supabase
      .from('quiz_questions')
      .update({ correct_answer_id: correctOption.id })
      .eq('id', questionId);
  }
}

async function deleteQuestion(questionId) {
  await supabase.from('quiz_questions').delete().eq('id', questionId);
}

/**
 * Main execution
 */
async function main() {
  log.info('🚀 Starting English Quiz Regeneration (Direct Generation)');
  log.info('');

  try {
    // Fetch English lessons
    const { data: lessons, error } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('subject', 'english')
      .order('order_index');

    if (error) throw error;

    log.success(`Found ${lessons.length} English lessons`);
    log.info('');

    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < lessons.length; i++) {
      const lesson = lessons[i];
      log.progress(i + 1, lessons.length, lesson.title);

      // Check if we have questions for this lesson
      if (!questionBank[lesson.lesson_key]) {
        log.info(`  ⚠️  No question bank for ${lesson.lesson_key}, skipping`);
        failureCount++;
        continue;
      }

      try {
        await updateLessonQuiz(lesson, questionBank[lesson.lesson_key]);
        successCount++;
      } catch (error) {
        log.error(`  ❌ Failed: ${error.message}`);
        failureCount++;
      }

      log.info('');
    }

    log.info('═══════════════════════════════════════════');
    log.info('📊 SUMMARY');
    log.info('═══════════════════════════════════════════');
    log.success(`✅ Successfully updated: ${successCount} lessons`);
    if (failureCount > 0) {
      log.error(`❌ Failed: ${failureCount} lessons`);
    }
    log.info('');
    log.success('🎉 Quiz Regeneration Complete!');

  } catch (error) {
    log.error(`💥 Fatal error: ${error.message}`);
    process.exit(1);
  }
}

main();
