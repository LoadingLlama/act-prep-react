import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

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

// Parse text file to extract chapters
function parseChapters(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  // Find where actual content starts (after line 3343)
  const contentStart = 3344;

  const chapters = [];
  const seenChapters = new Set();
  let currentChapter = null;
  let chapterContentLines = 0;

  for (let i = contentStart; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this is a chapter heading
    const chapterMatch = line.match(/^Chapter (\d+):\s*(.+)/);

    if (chapterMatch) {
      const chapterNum = chapterMatch[1];
      const chapterTitle = chapterMatch[2].trim();
      const chapterKey = `${chapterNum}-${chapterTitle}`;

      // Only process if we haven't seen this chapter before
      if (!seenChapters.has(chapterKey)) {
        // Save previous chapter if it has substantial content
        if (currentChapter && currentChapter.number !== '1' && chapterContentLines > 10) {
          chapters.push(currentChapter);
        }

        // Start new chapter
        seenChapters.add(chapterKey);
        chapterContentLines = 0;

        currentChapter = {
          number: chapterNum,
          title: chapterTitle,
          content: [],
          startLine: i
        };
      }
    } else if (currentChapter) {
      // Add content to current chapter
      currentChapter.content.push(lines[i]);
      if (line.length > 10) chapterContentLines++; // Track substantial lines
    }

    // Stop at a reasonable point
    if (chapters.length >= 25) break;
  }

  // Add last chapter if it has substantial content
  if (currentChapter && currentChapter.number !== '1' && chapterContentLines > 10) {
    chapters.push(currentChapter);
  }

  log.info(`Extracted ${chapters.length} unique chapters`);
  chapters.forEach(ch => log.info(`  - Chapter ${ch.number}: ${ch.title}`));

  return chapters;
}

// Convert raw text content to HTML matching backsolving structure
function formatChapterHTML(chapter) {
  const rawContent = chapter.content.join('\n');

  let html = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This lesson covers <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${chapter.title}</strong>, an essential topic for the ACT Math section.</p>\n\n`;

  // Parse content sections
  const sections = parseContentSections(rawContent);

  sections.forEach(section => {
    if (section.type === 'heading') {
      html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">${section.text}</h3>\n\n`;
    } else if (section.type === 'subheading') {
      html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">${section.text}</h4>\n\n`;
    } else if (section.type === 'paragraph') {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${section.text}</p>\n\n`;
    } else if (section.type === 'list') {
      html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
      section.items.forEach(item => {
        html += `  <li style="margin: 0.15rem 0;">${item}</li>\n`;
      });
      html += `</ul>\n\n`;
    } else if (section.type === 'example') {
      html += formatExample(section);
    }
  });

  // Add key takeaways
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  const takeaways = extractKeyTakeaways(chapter);
  takeaways.forEach(takeaway => {
    html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
    html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${takeaway}\n`;
    html += `  </li>\n`;
  });
  html += `</ul>\n`;

  return html;
}

// Parse content into structured sections
function parseContentSections(rawContent) {
  // This is a simplified parser - would need to be enhanced for full parsing
  const sections = [];
  const lines = rawContent.split('\n');

  let currentSection = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Detect headings, examples, etc.
    if (trimmed.match(/^Example \d+:/)) {
      if (currentSection) sections.push(currentSection);
      currentSection = { type: 'example', text: trimmed, content: [] };
    } else if (currentSection && currentSection.type === 'example') {
      currentSection.content.push(line);
    } else {
      // Regular paragraph
      if (currentSection && currentSection.type === 'paragraph') {
        currentSection.text += ' ' + trimmed;
      } else {
        if (currentSection) sections.push(currentSection);
        currentSection = { type: 'paragraph', text: trimmed };
      }
    }
  }

  if (currentSection) sections.push(currentSection);

  return sections;
}

// Format an example problem
function formatExample(section) {
  let html = `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">${section.text}</h4>\n\n`;

  section.content.forEach(line => {
    html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n`;
  });

  return html + '\n';
}

// Extract key takeaways from chapter
function extractKeyTakeaways(chapter) {
  // Basic implementation - could be enhanced
  return [
    `Understand the core concepts of ${chapter.title}`,
    `Practice applying these techniques to ACT-style problems`,
    `Memorize key formulas and rules covered in this lesson`,
    `Know when to use ${chapter.title} strategies on test day`
  ];
}

// Generate quiz questions for a chapter
function generateQuizQuestions(chapter) {
  // For demonstration, creating template questions
  // In a full implementation, these would be carefully crafted ACT-style questions

  const questions = [];

  for (let i = 1; i <= 10; i++) {
    const difficulty = i <= 3 ? 'easy' : i <= 7 ? 'medium' : 'hard';

    questions.push({
      text: `Question ${i} for ${chapter.title}<br><br>Which of the following is correct?`,
      options: ['A', 'B', 'C', 'D', 'E'],
      correct_answer: 1,
      explanations: [
        `Option A is incorrect because...`,
        `Correct! Option B is right because...`,
        `Option C is incorrect because...`,
        `Option D is incorrect because...`,
        `Option E is incorrect because...`
      ],
      difficulty
    });
  }

  return questions;
}

// Insert lesson into database
async function insertLesson(chapter, html) {
  try {
    // Generate lesson key
    const lessonKey = chapter.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .substring(0, 50);

    // Check if lesson already exists
    const { data: existing } = await supabase
      .from('lesson_metadata')
      .select('id')
      .eq('lesson_key', lessonKey)
      .maybeSingle();

    if (existing) {
      return { success: false, error: 'already exists', lessonKey };
    }

    // Insert lesson metadata
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .insert({
        lesson_key: lessonKey,
        title: `Chapter ${chapter.number}: ${chapter.title}`,
        subject: 'math',
        category: 'Math Skills',
        difficulty_level: 1,
        duration_minutes: 30,
        order_index: parseInt(chapter.number) * 10,
        is_published: true
      })
      .select()
      .single();

    if (lessonError) throw lessonError;

    // Insert section
    const { data: section, error: sectionError } = await supabase
      .from('lesson_sections')
      .insert({
        lesson_id: lesson.id,
        section_key: `${lessonKey}-main`,
        title: 'Main Content',
        section_type: 'content',
        order_index: 0
      })
      .select()
      .single();

    if (sectionError) throw sectionError;

    // Insert content
    const { error: contentError } = await supabase
      .from('section_content')
      .insert({
        section_id: section.id,
        content_type: 'html',
        content: html,
        order_index: 0
      });

    if (contentError) throw contentError;

    // Generate and insert quiz
    const questions = generateQuizQuestions(chapter);

    // Create quiz
    const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .insert({
        lesson_id: lesson.id,
        title: `${chapter.title} - Mastery Quiz`,
        intro: 'Test your understanding with these 10 ACT-style questions.',
        quiz_type: 'mastery',
        position: 9999,
        is_required: true
      })
      .select()
      .single();

    if (quizError) throw quizError;

    // Insert questions
    const quizQuestions = questions.map((q, idx) => ({
      quiz_id: quiz.id,
      question_text: q.text,
      question_order: idx
    }));

    const { data: questionsData, error: questionsError } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions)
      .select();

    if (questionsError) throw questionsError;

    // Insert options
    const quizOptions = [];
    questionsData.forEach((dbQuestion, qIdx) => {
      const originalQuestion = questions[qIdx];
      originalQuestion.options.forEach((letter, optIdx) => {
        quizOptions.push({
          question_id: dbQuestion.id,
          option_text: letter,
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

    return { success: true, lessonKey };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Main function
async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.error('Usage: node import-math-lessons.mjs <path-to-txt-file>');
    process.exit(1);
  }

  log.info(`📚 Importing Math Lessons from: ${filePath}\n`);

  // Parse chapters
  log.info('Parsing chapters from text file...');
  const chapters = parseChapters(filePath);
  log.success(`Found ${chapters.length} chapters (skipped Chapter 1)\n`);

  // Process each chapter
  let successCount = 0;
  let skipped = 1; // Chapter 1

  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    log.progress(i + 1, chapters.length, `Chapter ${chapter.number}: ${chapter.title}`);

    // Format HTML
    const html = formatChapterHTML(chapter);

    // Insert into database
    const result = await insertLesson(chapter, html);

    if (result.success) {
      log.success(`  ✓ Imported: ${result.lessonKey}`);
      successCount++;
    } else {
      log.error(`  ✗ Failed: ${result.error}`);
    }

    // Small delay to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  log.info(`\n📊 Summary:`);
  log.success(`Successfully imported ${successCount}/${chapters.length} chapters`);
  log.info(`Skipped ${skipped} chapter (Chapter 1: Backsolving)`);
  log.info(`Total quiz questions created: ${successCount * 10}`);
}

main();
