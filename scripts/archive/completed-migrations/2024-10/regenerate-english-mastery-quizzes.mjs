/**
 * Regenerate English Mastery Quizzes
 * Uses Claude API to generate 10 authentic ACT-style questions per English lesson
 *
 * Usage: node scripts/regenerate-english-mastery-quizzes.mjs
 *
 * Environment variables required:
 * - SUPABASE_SERVICE_KEY
 * - ANTHROPIC_API_KEY
 */

import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

// Validate environment variables
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

if (!ANTHROPIC_API_KEY) {
  console.error('❌ Missing ANTHROPIC_API_KEY');
  process.exit(1);
}

// Initialize Supabase with service role key
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

/**
 * Logger utility
 */
const log = {
  info: (msg, data = {}) => console.log(`ℹ️  ${msg}`, data),
  success: (msg, data = {}) => console.log(`✅ ${msg}`, data),
  warn: (msg, data = {}) => console.warn(`⚠️  ${msg}`, data),
  error: (msg, error = {}) => console.error(`❌ ${msg}`, error),
  progress: (current, total, item) => console.log(`📝 [${current}/${total}] ${item}`)
};

/**
 * Sleep utility for rate limiting
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Call Claude API to generate 10 questions
 */
async function generateQuestionsWithClaude(lesson) {
  const { title, lesson_key, content } = lesson;

  // Truncate content to first 2000 characters
  const lessonContent = content ? content.substring(0, 2000) : '';

  const prompt = `You are an expert ACT English test writer. Create 10 SHORT, QUICK grammar questions for this lesson.

Lesson: ${title}
Concept: ${lesson_key}
Content: ${lessonContent}

CRITICAL REQUIREMENTS:
- Each question is 1-2 sentences MAX (NOT full passages)
- One underlined portion that needs correction
- 4 answer choices (A, B, C, D)
- Use "NO CHANGE" as option A when appropriate
- Test ONLY this lesson's specific grammar concept
- Questions 1-3: Easy difficulty
- Questions 4-7: Medium difficulty
- Questions 8-10: Hard difficulty
- Use realistic academic tone
- Create plausible distractors (common student errors)

QUESTION FORMAT:
- Present a sentence with an underlined portion
- Ask "Which choice provides the best [punctuation/grammar/etc.]?"
- Each question tests the lesson concept in different ways

Return valid JSON with this EXACT structure:
{
  "questions": [
    {
      "sentence": "The complete sentence with the underlined portion indicated.",
      "question_text": "Which choice provides the best punctuation?",
      "underlined_portion": "the exact underlined text",
      "difficulty_level": 1,
      "options": [
        {"letter": "A", "text": "NO CHANGE", "is_correct": false},
        {"letter": "B", "text": "the corrected version", "is_correct": true},
        {"letter": "C", "text": "plausible wrong option 1", "is_correct": false},
        {"letter": "D", "text": "plausible wrong option 2", "is_correct": false}
      ],
      "explanation": "Brief explanation: Why B is correct (cite the grammar rule from the lesson). Why the others are wrong."
    }
  ]
}

Generate exactly 10 questions. Return ONLY valid JSON, no other text.`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 4096,
        messages: [{
          role: 'user',
          content: prompt
        }]
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Claude API error: ${response.status} - ${errorData}`);
    }

    const data = await response.json();
    const content = data.content[0].text;

    // Parse JSON response
    const parsed = JSON.parse(content);

    if (!parsed.questions || !Array.isArray(parsed.questions)) {
      throw new Error('Invalid response format: missing questions array');
    }

    if (parsed.questions.length !== 10) {
      throw new Error(`Expected 10 questions, got ${parsed.questions.length}`);
    }

    // Validate each question
    for (let i = 0; i < parsed.questions.length; i++) {
      const q = parsed.questions[i];
      if (!q.sentence || !q.question_text || !q.options || q.options.length !== 4) {
        throw new Error(`Question ${i + 1} has invalid format`);
      }

      const correctCount = q.options.filter(opt => opt.is_correct).length;
      if (correctCount !== 1) {
        throw new Error(`Question ${i + 1} must have exactly 1 correct answer, has ${correctCount}`);
      }
    }

    return parsed.questions;
  } catch (error) {
    log.error(`Failed to generate questions for ${lesson_key}:`, error);
    throw error;
  }
}

/**
 * Update quiz questions and options in database
 */
async function updateQuizQuestions(lessonId, lessonKey, generatedQuestions) {
  try {
    // Fetch existing quiz questions for this lesson
    const { data: existingQuestions, error: fetchError } = await supabase
      .from('quiz_questions')
      .select('id, order_index')
      .eq('lesson_id', lessonId)
      .eq('quiz_type', 'mastery')
      .order('order_index');

    if (fetchError) {
      throw new Error(`Failed to fetch existing questions: ${fetchError.message}`);
    }

    if (!existingQuestions || existingQuestions.length === 0) {
      log.warn(`No existing mastery questions found for ${lessonKey}, creating new ones`);

      // Create new questions
      for (let i = 0; i < generatedQuestions.length; i++) {
        const q = generatedQuestions[i];
        await createNewQuestion(lessonId, q, i + 1);
      }

      return;
    }

    // Update existing questions (or create if we need more)
    for (let i = 0; i < generatedQuestions.length; i++) {
      const q = generatedQuestions[i];

      if (i < existingQuestions.length) {
        // Update existing question
        const questionId = existingQuestions[i].id;
        await updateExistingQuestion(questionId, q);
      } else {
        // Create new question if we need more than exist
        await createNewQuestion(lessonId, q, i + 1);
      }
    }

    // Delete extra questions if generated fewer than exist
    if (existingQuestions.length > generatedQuestions.length) {
      const extraQuestions = existingQuestions.slice(generatedQuestions.length);
      for (const q of extraQuestions) {
        await deleteQuestion(q.id);
      }
    }

  } catch (error) {
    log.error(`Failed to update questions for lesson ${lessonKey}:`, error);
    throw error;
  }
}

/**
 * Create a new question with options
 */
async function createNewQuestion(lessonId, questionData, orderIndex) {
  // Format question text
  const fullQuestionText = `${questionData.sentence}\n\n${questionData.question_text}`;

  // Insert question
  const { data: newQuestion, error: insertError } = await supabase
    .from('quiz_questions')
    .insert({
      lesson_id: lessonId,
      quiz_type: 'mastery',
      question_text: fullQuestionText,
      difficulty_level: questionData.difficulty_level || Math.ceil(orderIndex / 3.33),
      explanation: questionData.explanation,
      order_index: orderIndex
    })
    .select()
    .single();

  if (insertError) {
    throw new Error(`Failed to insert question: ${insertError.message}`);
  }

  // Insert options
  const options = questionData.options.map((opt, idx) => ({
    question_id: newQuestion.id,
    option_text: opt.text,
    is_correct: opt.is_correct,
    order_index: idx
  }));

  const { data: insertedOptions, error: optionsError } = await supabase
    .from('quiz_options')
    .insert(options)
    .select();

  if (optionsError) {
    throw new Error(`Failed to insert options: ${optionsError.message}`);
  }

  // Set correct_answer_id
  const correctOption = insertedOptions.find(opt => opt.is_correct);
  if (correctOption) {
    const { error: updateError } = await supabase
      .from('quiz_questions')
      .update({ correct_answer_id: correctOption.id })
      .eq('id', newQuestion.id);

    if (updateError) {
      throw new Error(`Failed to set correct_answer_id: ${updateError.message}`);
    }
  }
}

/**
 * Update existing question and its options
 */
async function updateExistingQuestion(questionId, questionData) {
  // Format question text
  const fullQuestionText = `${questionData.sentence}\n\n${questionData.question_text}`;

  // Update question
  const { error: updateError } = await supabase
    .from('quiz_questions')
    .update({
      question_text: fullQuestionText,
      difficulty_level: questionData.difficulty_level || 1,
      explanation: questionData.explanation,
      updated_at: new Date().toISOString()
    })
    .eq('id', questionId);

  if (updateError) {
    throw new Error(`Failed to update question: ${updateError.message}`);
  }

  // Delete old options
  const { error: deleteError } = await supabase
    .from('quiz_options')
    .delete()
    .eq('question_id', questionId);

  if (deleteError) {
    throw new Error(`Failed to delete old options: ${deleteError.message}`);
  }

  // Insert new options
  const options = questionData.options.map((opt, idx) => ({
    question_id: questionId,
    option_text: opt.text,
    is_correct: opt.is_correct,
    order_index: idx
  }));

  const { data: insertedOptions, error: optionsError } = await supabase
    .from('quiz_options')
    .insert(options)
    .select();

  if (optionsError) {
    throw new Error(`Failed to insert new options: ${optionsError.message}`);
  }

  // Set correct_answer_id
  const correctOption = insertedOptions.find(opt => opt.is_correct);
  if (correctOption) {
    const { error: updateError } = await supabase
      .from('quiz_questions')
      .update({ correct_answer_id: correctOption.id })
      .eq('id', questionId);

    if (updateError) {
      throw new Error(`Failed to set correct_answer_id: ${updateError.message}`);
    }
  }
}

/**
 * Delete a question (cascades to options)
 */
async function deleteQuestion(questionId) {
  const { error } = await supabase
    .from('quiz_questions')
    .delete()
    .eq('id', questionId);

  if (error) {
    throw new Error(`Failed to delete question: ${error.message}`);
  }
}

/**
 * Main execution
 */
async function main() {
  log.info('🚀 Starting English Mastery Quiz Regeneration');
  log.info('');

  try {
    // Fetch all English lessons
    log.info('📚 Fetching English lessons from database...');

    const { data: lessons, error: fetchError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title, subject')
      .eq('subject', 'english')
      .order('order_index');

    if (fetchError) {
      throw new Error(`Failed to fetch lessons: ${fetchError.message}`);
    }

    if (!lessons || lessons.length === 0) {
      log.warn('No English lessons found in database');
      return;
    }

    log.success(`Found ${lessons.length} English lessons`);
    log.info('');

    // Fetch content from lessons table (old structure) or lesson_sections
    log.info('📖 Fetching lesson content...');

    const lessonsWithContent = [];
    for (const lesson of lessons) {
      // Try old lessons table first
      const { data: oldLesson } = await supabase
        .from('lessons')
        .select('content')
        .eq('lesson_key', lesson.lesson_key)
        .single();

      lessonsWithContent.push({
        ...lesson,
        content: oldLesson?.content || ''
      });
    }

    log.success(`Loaded content for ${lessonsWithContent.length} lessons`);
    log.info('');

    // Process each lesson
    let successCount = 0;
    let failureCount = 0;

    for (let i = 0; i < lessonsWithContent.length; i++) {
      const lesson = lessonsWithContent[i];
      log.progress(i + 1, lessonsWithContent.length, lesson.title);

      try {
        // Generate questions with Claude
        log.info(`  🤖 Calling Claude API...`);
        const generatedQuestions = await generateQuestionsWithClaude(lesson);

        log.success(`  ✅ Generated ${generatedQuestions.length} questions`);

        // Update database
        log.info(`  💾 Updating database...`);
        await updateQuizQuestions(lesson.id, lesson.lesson_key, generatedQuestions);

        log.success(`  ✅ Database updated for ${lesson.lesson_key}`);
        successCount++;

        // Rate limiting: wait 2 seconds before next API call
        if (i < lessonsWithContent.length - 1) {
          log.info(`  ⏳ Waiting 2 seconds (rate limiting)...`);
          await sleep(2000);
        }

        log.info('');
      } catch (error) {
        log.error(`  ❌ Failed to process ${lesson.lesson_key}:`, error.message);
        failureCount++;
        log.info('');

        // Continue to next lesson even if one fails
        continue;
      }
    }

    // Summary
    log.info('═══════════════════════════════════════════');
    log.info('📊 SUMMARY');
    log.info('═══════════════════════════════════════════');
    log.success(`✅ Successfully processed: ${successCount} lessons`);

    if (failureCount > 0) {
      log.error(`❌ Failed to process: ${failureCount} lessons`);
    }

    log.info(`📝 Total lessons: ${lessonsWithContent.length}`);
    log.info('');

    // Verification query
    log.info('🔍 Running verification query...');
    const { data: verification, error: verifyError } = await supabase
      .from('lesson_metadata')
      .select(`
        title,
        lesson_key,
        quiz_questions (
          id,
          quiz_type,
          updated_at
        )
      `)
      .eq('subject', 'english');

    if (verifyError) {
      log.warn('Could not run verification query:', verifyError.message);
    } else {
      log.info('');
      log.info('📋 Verification Results:');
      verification.forEach(lesson => {
        const masteryQuestions = lesson.quiz_questions?.filter(q => q.quiz_type === 'mastery') || [];
        const status = masteryQuestions.length === 10 ? '✅' : '⚠️';
        log.info(`${status} ${lesson.title}: ${masteryQuestions.length} mastery questions`);
      });
    }

    log.info('');
    log.success('🎉 English Mastery Quiz Regeneration Complete!');

  } catch (error) {
    log.error('💥 Fatal error:', error);
    process.exit(1);
  }
}

// Run main function
main();
