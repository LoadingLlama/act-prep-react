/**
 * Simulate what the frontend receives
 * This simulates the exact data transformation that happens in practiceTests.service.js
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function getPracticeTestSection(testNumber, section) {
  console.log(`\n🔍 SIMULATING: getPracticeTestSection(${testNumber}, "${section}")\n`);
  console.log('='.repeat(80));

  const tableMap = {
    english: {
      questions: 'practice_test_english_questions',
      passages: 'practice_test_english_passages'
    },
    math: {
      questions: 'practice_test_math_questions',
      passages: null
    },
    reading: {
      questions: 'practice_test_reading_questions',
      passages: 'practice_test_reading_passages'
    },
    science: {
      questions: 'practice_test_science_questions',
      passages: 'practice_test_science_passages'
    }
  };

  const tables = tableMap[section];
  if (!tables) return null;

  // Fetch questions
  const { data: questions, error: questionsError } = await supabase
    .from(tables.questions)
    .select('*')
    .eq('test_number', testNumber)
    .order('question_number', { ascending: true });

  if (questionsError) {
    console.log('❌ Error fetching questions:', questionsError);
    return null;
  }

  console.log(`✓ Fetched ${questions.length} questions`);

  // If section has passages, fetch and merge them
  if (tables.passages) {
    const { data: passages, error: passagesError } = await supabase
      .from(tables.passages)
      .select('*')
      .eq('test_number', testNumber)
      .order('passage_number', { ascending: true });

    if (passagesError) {
      console.log('❌ Error fetching passages:', passagesError);
    } else {
      console.log(`✓ Fetched ${passages.length} passages`);

      // Create passage lookup map
      const passageMap = {};
      passages.forEach((passage) => {
        passageMap[passage.id] = passage;
      });

      // Merge passage text into questions
      let questionsWithPassageImages = 0;
      questions.forEach((question) => {
        if (question.passage_id && passageMap[question.passage_id]) {
          const passage = passageMap[question.passage_id];
          question.passage = passage.passage_text;
          question.passage_type = passage.passage_type;
          question.passage_title = passage.passage_title;
          question.passage_number = passage.passage_number;

          // Collect all image URLs from image_url_1, image_url_2, etc.
          const imageUrls = {};
          for (let i = 1; i <= 5; i++) {
            const urlKey = `image_url_${i}`;
            if (passage[urlKey]) {
              imageUrls[`image${i}`] = passage[urlKey];
            }
          }
          if (Object.keys(imageUrls).length > 0) {
            question.passage_image_urls = imageUrls;
            questionsWithPassageImages++;
          }
        }
      });

      console.log(`✓ ${questionsWithPassageImages} questions have passage_image_urls`);
    }
  }

  // Transform questions
  const transformedQuestions = questions.map((q) => {
    const parsedChoices = typeof q.choices === 'string' ? JSON.parse(q.choices) : q.choices;

    const answers = {};
    parsedChoices.forEach(choice => {
      const match = choice.match(/^([A-K])\.\s*(.+)$/);
      if (match) {
        answers[match[1]] = match[2];
      }
    });

    let correctAnswer = 'A';
    if (q.correct_answer) {
      const answer = String(q.correct_answer).trim();
      if (/^[A-K]$/i.test(answer)) {
        correctAnswer = answer.toUpperCase();
      } else if (/^\d+$/.test(answer)) {
        const numAnswer = parseInt(answer, 10);
        correctAnswer = String.fromCharCode(65 + numAnswer);
      }
    }

    if (!q.question_text || q.question_text.trim().length === 0) {
      return null;
    }

    return {
      id: q.id,
      text: q.question_text,
      passage: q.passage,
      passage_title: q.passage_title,
      passage_image_urls: q.passage_image_urls,
      answers: answers,
      correctAnswer: correctAnswer,
      explanation: q.explanation,
      question_type: q.question_type,
      difficulty: q.difficulty,
      image_url: q.image_url
    };
  }).filter(q => q !== null);

  console.log(`✓ Transformed ${transformedQuestions.length} questions`);

  // Check first few questions for passage_image_urls
  console.log('\n📦 CHECKING FIRST 3 QUESTIONS FOR passage_image_urls:\n');
  transformedQuestions.slice(0, 3).forEach((q, idx) => {
    console.log(`Question ${idx + 1}:`);
    console.log(`  Has passage: ${!!q.passage}`);
    console.log(`  Has passage_image_urls: ${!!q.passage_image_urls}`);
    if (q.passage_image_urls) {
      console.log(`  Image URLs:`, q.passage_image_urls);
    }
    if (q.passage) {
      const placeholders = (q.passage.match(/\{\{image\d+\}\}/g) || []);
      console.log(`  Placeholders in passage: ${placeholders.length > 0 ? placeholders.join(', ') : 'none'}`);
    }
  });

  return transformedQuestions;
}

async function testAll() {
  console.log('🔍 TESTING FRONTEND DATA SIMULATION\n');
  console.log('='.repeat(80));

  // Test Science section (has passages with images)
  const scienceQuestions = await getPracticeTestSection(2, 'science');

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 SUMMARY for Test 2 Science:');
  console.log(`  Total questions: ${scienceQuestions?.length || 0}`);

  const questionsWithPassageImages = scienceQuestions?.filter(q => q.passage_image_urls) || [];
  console.log(`  Questions with passage_image_urls: ${questionsWithPassageImages.length}`);

  const questionsWithPassages = scienceQuestions?.filter(q => q.passage) || [];
  console.log(`  Questions with passages: ${questionsWithPassages.length}`);

  // Check if passages have placeholders but no image URLs
  const passagesWithPlaceholdersNoUrls = questionsWithPassages.filter(q => {
    const hasPlaceholders = q.passage && (q.passage.match(/\{\{image\d+\}\}/g) || []).length > 0;
    return hasPlaceholders && !q.passage_image_urls;
  });

  if (passagesWithPlaceholdersNoUrls.length > 0) {
    console.log(`\n❌ WARNING: ${passagesWithPlaceholdersNoUrls.length} questions have placeholders but NO passage_image_urls!`);
  } else {
    console.log('\n✓ All questions with image placeholders have passage_image_urls');
  }

  console.log('\n' + '='.repeat(80));
  console.log('TEST COMPLETE\n');
}

testAll().catch(console.error);
