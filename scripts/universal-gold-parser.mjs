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
    .trim();
}

// Parse and format lesson to gold standard
async function parseLesson(rawText, lessonKey, lessonTitle) {
  const cleaned = cleanOCRErrors(rawText);
  const lines = cleaned.split('\n').map(l => l.trim()).filter(l => l.length > 0);

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
    if (!introAdded && line.length > 50 && !line.match(/^(Chapter|Example|Solution|[A-E][\)\.])/)) {
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
  console.log('🚀 UNIVERSAL GOLD PARSER - Processing All Lessons\n');

  // Source files
  const sources = {
    math: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt',
    english: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT English Book (For New Enhanced ACT).txt',
    reading: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros - ACT Reading Book (For New Enhanced ACT).txt',
    science: '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros ACT Science Guide.txt'
  };

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

  for (const lesson of lessons) {
    // Skip backsolving (already gold standard)
    if (lesson.lesson_key === 'backsolving') {
      console.log(`⏭️  Skipping ${lesson.lesson_key} (already gold standard)`);
      continue;
    }

    console.log(`Processing: ${lesson.lesson_key} - ${lesson.title}`);

    try {
      // Determine source file
      const subject = lesson.subject.toLowerCase();
      const sourceFile = sources[subject];

      if (!sourceFile) {
        console.log(`  ⚠️  Unknown subject: ${subject}`);
        errors++;
        continue;
      }

      // Read source content
      const fullText = readFileSync(sourceFile, 'utf-8');

      // Extract lesson content (simple approach - find by title or chapter)
      // This needs to be improved based on actual structure
      const searchTerm = lesson.title.split('-')[0].trim();
      const startIdx = fullText.indexOf(searchTerm);

      if (startIdx === -1) {
        console.log(`  ⚠️  Could not find content for: ${searchTerm}`);
        errors++;
        continue;
      }

      // Extract content (simple - take next 5000 chars, refine later)
      const rawContent = fullText.substring(startIdx, startIdx + 5000);

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
  console.log(`  Total: ${lessons.length}`);
}

processAllLessons();
