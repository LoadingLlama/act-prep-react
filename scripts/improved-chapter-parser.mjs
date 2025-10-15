import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const styleTerm = (term) => `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}</strong>`;

// Chapter mappings for each lesson
const CHAPTER_MAP = {
  // Math lessons
  'backsolving': { file: 'math', chapter: 'Chapter 1:' },
  'substitution': { file: 'math', chapter: 'Chapter 2:' },
  'geometry-angles': { file: 'math', chapter: 'Chapter 3:' },
  'geometry-shapes': { file: 'math', chapter: 'Chapter 4:' },
  'lines': { file: 'math', chapter: 'Chapter 5:' },
  'fractions': { file: 'math', chapter: 'Chapter 6:' },
  'algebra-skills': { file: 'math', chapter: 'Chapter 7:' },
  'number-theory': { file: 'math', chapter: 'Chapter 8:' },
  'percentages': { file: 'math', chapter: 'Chapter 9:' },
  'ratios-proportions': { file: 'math', chapter: 'Chapter 10:' },
  'functions': { file: 'math', chapter: 'Chapter 11:' },
  'statistics-basics': { file: 'math', chapter: 'Chapter 34:' },
  'exponents-roots': { file: 'math', chapter: 'Chapter 12:' },
  'logarithms': { file: 'math', chapter: 'Chapter 13:' },
  'systems-equations': { file: 'math', chapter: 'Chapter 14:' },
  'quadratics': { file: 'math', chapter: 'Chapter 15:' },
  'trigonometry': { file: 'math', chapter: 'Chapter 16:' },
  'absolute-value': { file: 'math', chapter: 'Chapter 17:' },
  'matrices': { file: 'math', chapter: 'Chapter 18:' },
  'repeating-patterns': { file: 'math', chapter: 'Chapter 19:' },
  'circles-ellipses': { file: 'math', chapter: 'Chapter 20:' },
  'probability': { file: 'math', chapter: 'Chapter 21:' },
  'permutations-combinations': { file: 'math', chapter: 'Chapter 22:' },
  'sequences': { file: 'math', chapter: 'Chapter 23:' },
  'complex-numbers': { file: 'math', chapter: 'Chapter 25:' },
  'word-problems': { file: 'math', chapter: 'Chapter 26:' },
  'inequalities': { file: 'math', chapter: 'Chapter 27:' },
  'exponential-growth': { file: 'math', chapter: 'Chapter 28:' },
  'unit-conversion': { file: 'math', chapter: 'Chapter 29:' },
  'scientific-notation': { file: 'math', chapter: 'Chapter 30:' },
  'arcs-sectors': { file: 'math', chapter: 'Chapter 31:' },
  'vectors': { file: 'math', chapter: 'Chapter 32:' },
  'transforming-functions': { file: 'math', chapter: 'Chapter 33:' },
  'statistics-advanced': { file: 'math', chapter: 'Chapter 34:' },
  'miscellaneous-topics': { file: 'math', chapter: 'Chapter 35:' },

  // English lessons
  'sentence-structure': { file: 'english', chapter: 'Chapter 1:' },
  'commas': { file: 'english', chapter: 'Chapter 2:' },
  'punctuation': { file: 'english', chapter: 'Chapter 3:' },
  'verbs': { file: 'english', chapter: 'Chapter 4:' },
  'pronouns': { file: 'english', chapter: 'Chapter 5:' },
  'modifiers': { file: 'english', chapter: 'Chapter 6:' },
  'parallel-structure': { file: 'english', chapter: 'Chapter 7:' },
  'misc-topics': { file: 'english', chapter: 'Chapter 8:' },
  'grammar-review': { file: 'english', chapter: 'Part 1: Grammar Questions' },
  'redundancy': { file: 'english', chapter: 'Chapter 9:' },
  'word-choice': { file: 'english', chapter: 'Chapter 10:' },
  'transitions': { file: 'english', chapter: 'Chapter 11:' },
  'which-choice': { file: 'english', chapter: 'Chapter 12:' },
  'adding-deleting': { file: 'english', chapter: 'Chapter 13:' },
  'logical-placement': { file: 'english', chapter: 'Chapter 14:' },

  // Reading lessons
  'reading-intro': { file: 'reading', chapter: 'Introduction to the Reading Test' },
  'core-principles': { file: 'reading', chapter: 'Chapter 1:' },
  'finding-correct-answer': { file: 'reading', chapter: 'Chapter 2:' },
  'reading-approaches': { file: 'reading', chapter: 'Chapter 3:' },
  'pacing-time-management': { file: 'reading', chapter: 'Chapter 4:' },
  'question-types': { file: 'reading', chapter: 'Chapter 5:' },
  'breaking-down-questions': { file: 'reading', chapter: 'Chapter 6:' },
  'answer-choices': { file: 'reading', chapter: 'Chapter 7:' },
  'correct-vs-incorrect': { file: 'reading', chapter: 'Chapter 8:' },
  'words-in-context': { file: 'reading', chapter: 'Chapter 9:' },
  'comparing-passages': { file: 'reading', chapter: 'Chapter 10:' },
  'working-backwards': { file: 'reading', chapter: 'Chapter 11:' },
  'maximizing-score': { file: 'reading', chapter: 'Chapter 12:' },
  'practice-passages': { file: 'reading', chapter: 'Chapter 13:' },

  // Science lessons
  'science-introduction': { file: 'science', chapter: 'Introduction to Science Test' },
  'passage-approach': { file: 'science', chapter: 'Chapter 1: How to Approach the Passages' },
  'question-diagnosis': { file: 'science', chapter: '1) Let the Questions Help You' },
  'specific-data-point': { file: 'science', chapter: '1) Specific Data Point' },
  'trends': { file: 'science', chapter: '2) Trends' },
  'approximation': { file: 'science', chapter: '3) Approximation' },
  'multiple-figures': { file: 'science', chapter: '4) Multiple Figures' },
  'figures-text': { file: 'science', chapter: '5) Figures + Text' },
  'two-part-answers': { file: 'science', chapter: '1) 2-Part Answers' },
  'cannot-be-determined': { file: 'science', chapter: '2) Cannot Be Determined' },
  'equations-as-answers': { file: 'science', chapter: '3) Equations as Answers' },
  'mixing': { file: 'science', chapter: '4) Mixing' },
  'scatter-plots': { file: 'science', chapter: '5) Scatter Plots' },
  'inverse-trends-multiple-axes': { file: 'science', chapter: '6) Inverse Trends and Graphs with Multiple Axes' },
  'math-on-science': { file: 'science', chapter: '5) Math on the Science Test' },
  'water-knowledge': { file: 'science', chapter: '1) Water' },
  'experimental-setup': { file: 'science', chapter: '2) Experimental Setup' },

  // Getting started (intro lesson - may not have source content)
  'getting-started': { file: 'custom', chapter: null },
};

// Source files
const SOURCE_FILES = {
  math: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt',
  english: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt',
  reading: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros - ACT Reading Book (For New Enhanced ACT).txt',
  science: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT Science Guide.txt'
};

// Smart highlighting: apply to paragraphs and list items, but NOT to headers or Key Takeaways
function highlightKeyTermsInHTML(html, keyTerms) {
  if (!keyTerms || keyTerms.length === 0) return html;

  let result = html;

  // Highlight terms in <p> tags
  result = result.replace(/<p([^>]*)>(.*?)<\/p>/gs, (match, attrs, content) => {
    let highlightedContent = content;
    for (const term of keyTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(regex, (termMatch) => styleTerm(termMatch));
    }
    return `<p${attrs}>${highlightedContent}</p>`;
  });

  // Highlight terms in <li> tags
  result = result.replace(/<li([^>]*)>(.*?)<\/li>/gs, (match, attrs, content) => {
    const parts = content.split(/(<[^>]+>)/g);
    const highlightedParts = parts.map(part => {
      if (part.startsWith('<')) return part;
      let highlighted = part;
      for (const term of keyTerms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        highlighted = highlighted.replace(regex, (termMatch) => styleTerm(termMatch));
      }
      return highlighted;
    });
    return `<li${attrs}>${highlightedParts.join('')}</li>`;
  });

  return result;
}

// Fetch term definitions for a lesson
async function getTermDefinitions(lessonKey) {
  const { data, error } = await supabase
    .from('term_definitions')
    .select('term')
    .eq('lesson_key', lessonKey);

  if (error || !data) return [];
  return data.map(d => d.term);
}

// Clean OCR errors from source text
function cleanOCRErrors(text) {
  return text
    .replace(/SuUDStitution/g, 'Substitution')
    .replace(/TYIGONOMELTY/g, 'Trigonometry')
    .replace(/LOGaritlh/g, 'Logarithms')
    .replace(/QUAI ATICS/g, 'Quadratics')
    .replace(/ADSOLUte/g, 'Absolute')
    .replace(/PeLrCenta@es/g, 'Percentages')
    .replace(/Theor y/g, 'Theory')
    .replace(/SKIIIS/g, 'Skills')
    .replace(/PLromouns/g, 'Pronouns')
    .replace(/Lime/g, 'Lines')
    .trim();
}

// Extract chapter content from source file
function extractChapterContent(fullText, chapterMarker) {
  const cleaned = cleanOCRErrors(fullText);

  // Find ALL occurrences of the chapter marker
  const allOccurrences = [];
  let searchIdx = 0;
  while (true) {
    const idx = cleaned.indexOf(chapterMarker, searchIdx);
    if (idx === -1) break;
    allOccurrences.push(idx);
    searchIdx = idx + 1;
  }

  if (allOccurrences.length === 0) return null;

  // Find the right occurrence: not TOC, not answer key, but actual content
  // Answer keys have patterns like "44. D\n45. C" - short lines with numbers and letters
  // Actual content has substantial paragraphs starting with words like "For", "The", "In", etc.
  let startIdx = -1;

  for (let i = allOccurrences.length - 1; i >= 0; i--) {
    const idx = allOccurrences[i];
    const preview = cleaned.substring(idx, Math.min(idx + 1000, cleaned.length));

    // Check if this looks like an answer key section (lots of short "X. Y" patterns)
    const answerKeyPattern = /\n\d+\.\s+[A-E]\s*\n/g;
    const matches = preview.match(answerKeyPattern);
    if (matches && matches.length > 3) {
      // This is likely an answer key section, skip it
      continue;
    }

    // Check if this has actual teaching content (substantial paragraphs)
    if (preview.match(/\n[A-Z][a-z]{2,}\s+.{100,}/)) {
      startIdx = idx;
      break;
    }
  }

  // If no good occurrence found, use the second-to-last (avoiding answer key which is usually last)
  if (startIdx === -1 && allOccurrences.length > 1) {
    startIdx = allOccurrences[allOccurrences.length - 2];
  } else if (startIdx === -1) {
    startIdx = allOccurrences[0];
  }

  // Look for the next "Chapter" marker to know where this chapter ends
  let endIdx = cleaned.indexOf('\nChapter ', startIdx + chapterMarker.length);

  // If no next chapter found, look for common end markers
  if (endIdx === -1) {
    const practiceIdx = cleaned.indexOf('\nPractice:', startIdx + chapterMarker.length);
    const answersIdx = cleaned.indexOf('\nAnswers on page', startIdx + chapterMarker.length);

    if (practiceIdx !== -1) {
      endIdx = practiceIdx;
    } else if (answersIdx !== -1) {
      endIdx = answersIdx;
    } else {
      // If no markers found, take a reasonable amount of content (6000 chars)
      endIdx = startIdx + 6000;
    }
  }

  // Extract the content
  return cleaned.substring(startIdx + chapterMarker.length, endIdx).trim();
}

// Parse and format lesson to gold standard
async function parseLesson(rawText, lessonKey, lessonTitle) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let html = '';
  let sectionNumber = 0;
  let inExample = false;
  let inList = false;
  let answerChoices = [];

  // Introduction paragraph (first substantial paragraph)
  let introAdded = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip practice problems section
    if (line.includes('Practice:') || line.includes('Answers on page')) break;

    // Add introduction
    if (!introAdded && line.length > 50 && !line.match(/^(Chapter|Example|Solution|[A-E][\)\.])/) && !line.match(/^[A-Z\s]+$/)) {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n\n`;
      introAdded = true;
      continue;
    }

    // Detect section headings
    if (line.length < 60 && line.match(/^[A-Z]/) && !line.match(/^[A-E][\)\.]/) && !line.match(/[=+\-×÷√]/)) {
      if (inList) {
        html += `</ul>\n\n`;
        inList = false;
      }
      sectionNumber++;
      html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">${sectionNumber}. ${line}</h3>\n\n`;
      continue;
    }

    // Detect examples
    if (line.match(/^Example \d+:/)) {
      if (inList) {
        html += `</ul>\n\n`;
        inList = false;
      }
      inExample = true;
      answerChoices = [];
      html += `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">${line}</h4>\n\n`;
      continue;
    }

    // Detect solution
    if (line.match(/^Solution:/)) {
      // Output answer choices if any
      if (answerChoices.length > 0) {
        html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
        answerChoices.forEach(choice => {
          html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">${choice}</span><br>\n`;
        });
        html += `</p>\n\n`;
        answerChoices = [];
      }
      html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
      inExample = false;
      continue;
    }

    // Detect answer choices
    if (line.match(/^[A-E][\)\.]/) && inExample) {
      answerChoices.push(line);
      continue;
    }

    // Detect numbered list items
    if (line.match(/^\d+\./)) {
      if (!inList) {
        html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
        inList = true;
      }
      const content = line.replace(/^\d+\./, '').trim();
      html += `  <li style="margin: 0.15rem 0;">${content}</li>\n`;
      continue;
    } else if (inList) {
      html += `</ul>\n\n`;
      inList = false;
    }

    // Regular paragraphs
    if (line.length > 30) {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n\n`;
    }
  }

  // Close any open lists
  if (inList) html += `</ul>\n\n`;

  // Add Key Takeaways section (NO blue highlighting here)
  html += `<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master these concepts for ACT success\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice with ACT-style problems to build confidence\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Apply these strategies on test day\n`;
  html += `  </li>\n`;
  html += `</ul>`;

  // Apply smart term highlighting (excluding Key Takeaways)
  const keyTakeawaysMarker = '<h3 style="color: #2e7d32';
  const keyTakeawaysIndex = html.indexOf(keyTakeawaysMarker);

  if (keyTakeawaysIndex !== -1) {
    const mainContent = html.substring(0, keyTakeawaysIndex);
    const keyTakeawaysSection = html.substring(keyTakeawaysIndex);

    // Fetch and apply term highlighting
    const keyTerms = await getTermDefinitions(lessonKey);
    const highlightedMainContent = highlightKeyTermsInHTML(mainContent, keyTerms);

    return highlightedMainContent + keyTakeawaysSection;
  }

  return html;
}

// Process all lessons systematically
async function processAllLessons() {
  console.log('🚀 IMPROVED CHAPTER PARSER - Processing All Lessons\n');

  // Get all lessons from database
  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, subject')
    .order('subject', { ascending: true })
    .order('order_index', { ascending: true });

  if (!lessons) {
    console.log('❌ Could not fetch lessons');
    return;
  }

  console.log(`Found ${lessons.length} total lessons\n`);
  console.log('Starting systematic processing...\n');

  let processed = 0;
  let errors = 0;
  let skipped = 0;

  for (const lesson of lessons) {
    // Skip backsolving (already gold standard)
    if (lesson.lesson_key === 'backsolving') {
      console.log(`⏭️  Skipping ${lesson.lesson_key} (already gold standard)`);
      skipped++;
      continue;
    }

    console.log(`Processing: ${lesson.lesson_key} - ${lesson.title}`);

    try {
      // Get chapter mapping
      const mapping = CHAPTER_MAP[lesson.lesson_key];

      if (!mapping) {
        console.log(`  ⚠️  No chapter mapping for: ${lesson.lesson_key}`);
        errors++;
        continue;
      }

      // Read source file
      const sourceFile = SOURCE_FILES[mapping.file];
      if (!sourceFile) {
        console.log(`  ⚠️  Unknown source file: ${mapping.file}`);
        errors++;
        continue;
      }

      const fullText = readFileSync(sourceFile, 'utf-8');

      // Extract chapter content
      const rawContent = extractChapterContent(fullText, mapping.chapter);

      if (!rawContent) {
        console.log(`  ⚠️  Could not extract content for chapter: ${mapping.chapter}`);
        errors++;
        continue;
      }

      // Parse to gold standard
      const html = await parseLesson(rawContent, lesson.lesson_key, lesson.title);

      // Upload to database
      const { error } = await supabase
        .from('lessons')
        .update({ content: html })
        .eq('lesson_key', lesson.lesson_key);

      if (error) {
        console.log(`  ❌ Upload error: ${error.message}`);
        errors++;
      } else {
        console.log(`  ✅ Success (${html.length} chars)`);
        processed++;
      }

    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
      errors++;
    }
  }

  console.log(`\n\n📊 FINAL RESULTS:`);
  console.log(`  Processed: ${processed}`);
  console.log(`  Errors: ${errors}`);
  console.log(`  Skipped: ${skipped}`);
  console.log(`  Total: ${lessons.length}`);
}

processAllLessons();
