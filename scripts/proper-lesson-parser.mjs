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

// Chapter mappings - same as before
const CHAPTER_MAP = {
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
  'getting-started': { file: 'custom', chapter: null },
};

// Source files
const SOURCE_FILES = {
  math: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt',
  english: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt',
  reading: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros - ACT Reading Book (For New Enhanced ACT).txt',
  science: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT Science Guide.txt'
};

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

// Smart term highlighting
function highlightKeyTermsInHTML(html, keyTerms) {
  if (!keyTerms || keyTerms.length === 0) return html;
  let result = html;
  result = result.replace(/<p([^>]*)>(.*?)<\/p>/gs, (match, attrs, content) => {
    let highlightedContent = content;
    for (const term of keyTerms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(regex, (termMatch) => styleTerm(termMatch));
    }
    return `<p${attrs}>${highlightedContent}</p>`;
  });
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

async function getTermDefinitions(lessonKey) {
  const { data, error } = await supabase.from('term_definitions').select('term').eq('lesson_key', lessonKey);
  if (error || !data) return [];
  return data.map(d => d.term);
}

// Extract the ACTUAL teaching content from source
function extractTeachingContent(fullText, chapterMarker) {
  const cleaned = cleanOCRErrors(fullText);

  // Find all occurrences of the chapter marker
  const pattern = new RegExp(`^${chapterMarker.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*$`, 'gm');
  const matches = [...cleaned.matchAll(pattern)];

  if (matches.length === 0) return null;

  console.log(`  Found ${matches.length} occurrences of "${chapterMarker}"`);

  // Find the occurrence with actual teaching content (has introduction paragraph)
  let startIdx = -1;
  for (const match of matches) {
    const idx = match.index;
    const preview = cleaned.substring(idx, idx + 800);

    // Skip answer keys (have patterns like "44. D\n45. C")
    const answerKeyPattern = /\n\d+\.\s+[A-E]\s*\n/g;
    if ((preview.match(answerKeyPattern) || []).length > 3) {
      console.log(`  Skipping occurrence at ${idx} (answer key)`);
      continue;
    }

    // Skip study guides (have patterns like "understand example X" or "memorize")
    if (preview.match(/understand example|memorize|know how to/i)) {
      console.log(`  Skipping occurrence at ${idx} (study guide)`);
      continue;
    }

    // Skip TOC (has dots like ".....")
    if (preview.includes('.....')) {
      console.log(`  Skipping occurrence at ${idx} (TOC)`);
      continue;
    }

    // Look for actual teaching content - starts with substantial introduction paragraph
    // Teaching content has sentences like "For success on...", "In this chapter...", "The...strategy..."
    if (preview.match(/\n[A-Z][a-z]{2,}\s+.{80,}\./)) {
      console.log(`  Using occurrence at ${idx} (has teaching content)`);
      startIdx = idx;
      break;
    }
  }

  if (startIdx === -1) {
    console.log(`  No valid teaching content found`);
    return null;
  }

  // Find the end of the chapter
  let endIdx = cleaned.indexOf('\nPractice:', startIdx + 100);
  if (endIdx === -1) endIdx = cleaned.indexOf('\nAnswers on page', startIdx + 100);
  if (endIdx === -1) endIdx = cleaned.indexOf('\n\nChapter ' + (parseInt(chapterMarker.match(/\d+/)[0]) + 1), startIdx + 100);
  if (endIdx === -1) endIdx = startIdx + 8000;

  return cleaned.substring(startIdx, endIdx);
}

// Parse content into gold standard HTML
async function parseToGoldStandard(rawText, lessonKey, lessonTitle) {
  const lines = rawText.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let html = '';
  let sectionNumber = 0;
  let inExample = false;
  let inList = false;
  let answerChoices = [];
  let introAdded = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Skip chapter title line
    if (i === 0 && line.match(/^Chapter \d+:/)) continue;

    // Add introduction (first substantial paragraph after chapter title)
    if (!introAdded && line.length > 60 && !line.match(/^(Chapter|Example|Solution|[A-E][\)\.])/) && !line.match(/^\d+\./)) {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n\n`;
      introAdded = true;
      continue;
    }

    // Detect section headings (numbered like "1. Combining Fractions")
    if (line.match(/^\d+\.\s+[A-Z]/)) {
      if (inList) {
        html += `</ul>\n\n`;
        inList = false;
      }
      sectionNumber++;
      const sectionTitle = line.replace(/^\d+\.\s*/, '');
      html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">${sectionNumber}. ${sectionTitle}</h3>\n\n`;
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

    // Detect solutions
    if (line.match(/^Solution:/)) {
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
    if (line.match(/^[A-E][\)\.]\s/) && inExample) {
      answerChoices.push(line);
      continue;
    }

    // Regular paragraphs
    if (line.length > 30 && !line.match(/^[\d]+$/)) {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n\n`;
    }
  }

  if (inList) html += `</ul>\n\n`;

  // Add Key Takeaways
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

  // Apply term highlighting
  const keyTakeawaysMarker = '<h3 style="color: #2e7d32';
  const keyTakeawaysIndex = html.indexOf(keyTakeawaysMarker);

  if (keyTakeawaysIndex !== -1) {
    const mainContent = html.substring(0, keyTakeawaysIndex);
    const keyTakeawaysSection = html.substring(keyTakeawaysIndex);
    const keyTerms = await getTermDefinitions(lessonKey);
    const highlightedMainContent = highlightKeyTermsInHTML(mainContent, keyTerms);
    return highlightedMainContent + keyTakeawaysSection;
  }

  return html;
}

// Main processing function
async function processAllLessons() {
  console.log('🚀 PROPER LESSON PARSER - Re-extracting All Content\n');

  const { data: lessons } = await supabase
    .from('lessons')
    .select('lesson_key, title, subject')
    .order('subject')
    .order('order_index');

  if (!lessons) {
    console.log('❌ Could not fetch lessons');
    return;
  }

  console.log(`Found ${lessons.length} total lessons\n`);

  let processed = 0;
  let errors = 0;
  let skipped = 0;

  for (const lesson of lessons) {
    if (lesson.lesson_key === 'backsolving') {
      console.log(`⏭️  Skipping ${lesson.lesson_key} (already gold standard)`);
      skipped++;
      continue;
    }

    console.log(`\nProcessing: ${lesson.lesson_key} - ${lesson.title}`);

    try {
      const mapping = CHAPTER_MAP[lesson.lesson_key];

      if (!mapping) {
        console.log(`  ⚠️  No mapping for: ${lesson.lesson_key}`);
        errors++;
        continue;
      }

      const sourceFile = SOURCE_FILES[mapping.file];
      if (!sourceFile) {
        console.log(`  ⚠️  Unknown source file: ${mapping.file}`);
        errors++;
        continue;
      }

      const fullText = readFileSync(sourceFile, 'utf-8');
      const rawContent = extractTeachingContent(fullText, mapping.chapter);

      if (!rawContent) {
        console.log(`  ⚠️  Could not extract teaching content`);
        errors++;
        continue;
      }

      const html = await parseToGoldStandard(rawContent, lesson.lesson_key, lesson.title);

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
