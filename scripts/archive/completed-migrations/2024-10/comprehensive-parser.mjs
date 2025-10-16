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

// Key terms to highlight in blue (we'll build this list as we parse)
const KEY_TERMS = [
  'backsolving', 'answer choices', 'plug in', 'plugging in', 'guess-and-check',
  'ascending order', 'descending order', 'working backwards', 'substitution',
  'number substitution'
];

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
    // Don't normalize whitespace here - preserve line structure
    .trim();
}

function highlightKeyTerms(text) {
  let result = text;
  for (const term of KEY_TERMS) {
    const regex = new RegExp(`\\b${term}\\b`, 'gi');
    result = result.replace(regex, (match) => styleTerm(match));
  }
  return result;
}

function joinBrokenLines(lines) {
  // Join lines that were split mid-sentence
  const joined = [];
  let currentParagraph = '';

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.length === 0) {
      if (currentParagraph) {
        joined.push(currentParagraph);
        currentParagraph = '';
      }
      continue;
    }

    // Special case: numbered list item on its own line - join with next content
    if (line.match(/^\d+\.$/) && i + 1 < lines.length) {
      // Skip empty lines and find the actual content
      let nextIdx = i + 1;
      while (nextIdx < lines.length && lines[nextIdx].trim().length === 0) {
        nextIdx++;
      }
      if (nextIdx < lines.length) {
        const nextContent = lines[nextIdx].trim();
        if (currentParagraph) {
          joined.push(currentParagraph);
        }
        joined.push(line + ' ' + nextContent);
        currentParagraph = '';
        i = nextIdx; // Skip to the line we just consumed
        continue;
      }
    }

    // Check if this is a special line (heading, list item, etc.)
    if (line.match(/^(Example \d+:|Solution:|Chapter \d+:|^\d+\.\s|^[A-E]\)|^[A-E]\.)/)) {
      if (currentParagraph) {
        joined.push(currentParagraph);
      }
      joined.push(line);
      currentParagraph = '';
    } else {
      // Continue the paragraph
      if (currentParagraph) {
        currentParagraph += ' ' + line;
      } else {
        currentParagraph = line;
      }
    }
  }

  if (currentParagraph) {
    joined.push(currentParagraph);
  }

  return joined;
}

function parseChapterToHTML(rawText, lessonTitle, debug = false) {
  const cleaned = cleanOCRErrors(rawText);
  const rawLines = cleaned.split('\n');
  const lines = joinBrokenLines(rawLines);

  if (debug) {
    console.log(`\nDEBUG: Joined into ${lines.length} lines`);
    console.log('First 10 joined lines:');
    lines.slice(0, 10).forEach((l, i) => console.log(`  ${i}: "${l.substring(0, 80)}..."`));
    console.log('');
  }

  let html = '';
  let sectionNumber = 0;
  let inExample = false;
  let inAnswerChoices = false;
  let answerChoices = [];
  let inBulletList = false;

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    if (!line) continue;

    // Skip practice problems section
    if (line.includes('Practice:') || line.includes('Answers on page')) {
      break;
    }

    // Detect subsection headings (like "Backsolving With Points")
    // Exclude math equations, "For answer choice" lines, and lines with lots of symbols
    const looksLikeMath = line.match(/[=+\-×÷√²³\(\)]+/) || line.match(/^(V|For answer|The answer)/);
    if (line.length < 50 && !line.match(/^Example/) && !line.match(/^Solution/) &&
        line.match(/^[A-Z]/) && !line.match(/^[A-E][\)\.]/) && i > 5 && !looksLikeMath) {

      sectionNumber++;
      html += `\n\n<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">${sectionNumber}. ${line}</h3>\n\n`;
      continue;
    }

    // Detect examples
    if (line.match(/^Example \d+:/)) {
      inExample = true;
      inAnswerChoices = false;
      answerChoices = [];
      html += `\n\n<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">${line}</h4>\n\n`;
      continue;
    }

    // Detect solution
    if (line.match(/^Solution:/)) {
      // Output answer choices if we have them
      if (answerChoices.length > 0) {
        html += `\n<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
        answerChoices.forEach(choice => {
          html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">${choice}</span><br>\n`;
        });
        html += `</p>\n\n`;
        answerChoices = [];
        inAnswerChoices = false;
      }

      html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
      continue;
    }

    // Detect answer choices
    if (line.match(/^[A-E][\)\.]/) && inExample) {
      inAnswerChoices = true;
      answerChoices.push(line);
      continue;
    }

    // Detect numbered list items (like the 5 steps)
    if (line.match(/^\d+\./)) {
      if (!inBulletList) {
        html += `\n<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
        inBulletList = true;
      }
      const content = line.replace(/^\d+\./, '').trim();
      html += `  <li style="margin: 0.15rem 0;">${highlightKeyTerms(content)}</li>\n`;
      continue;
    } else if (inBulletList && !line.match(/^\d+\./)) {
      html += `</ul>\n\n`;
      inBulletList = false;
    }

    // Regular paragraphs
    if (line.length > 30) {
      // Skip if it's part of answer choices
      if (inAnswerChoices) continue;

      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${highlightKeyTerms(line)}</p>\n\n`;
    }
  }

  // Close any open lists
  if (inBulletList) {
    html += `</ul>\n\n`;
  }

  // Add Key Takeaways section
  html += `\n<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>${styleTerm(lessonTitle)} is a powerful ACT test-taking strategy\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Understanding these concepts is essential for ACT Math success\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Practice with real ACT-style problems to master this technique\n`;
  html += `  </li>\n`;
  html += `</ul>`;

  return html;
}

// Test on Backsolving chapter
async function test() {
  console.log('🧪 TESTING PARSER ON BACKSOLVING CHAPTER\n');

  const mathFile = '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt';
  const fullText = readFileSync(mathFile, 'utf-8');

  // Find backsolving chapter
  const startIdx = fullText.indexOf('Backsolving is plugging');
  // Find next chapter (Chapter 2) as end marker
  const ch2Idx = fullText.indexOf('Chapter 2:', startIdx);
  const endIdx = ch2Idx > -1 ? ch2Idx : fullText.indexOf('Want video explanation', startIdx + 100);

  if (startIdx === -1 || endIdx === -1) {
    console.log(`❌ Could not find chapter bounds (start: ${startIdx}, end: ${endIdx})`);
    return;
  }

  const chapterText = fullText.substring(startIdx, endIdx);
  console.log(`✓ Extracted chapter: ${chapterText.length} characters\n`);

  // Debug: Show first 500 chars of raw text
  console.log('RAW TEXT (first 500 chars):');
  console.log(chapterText.substring(0, 500));
  console.log('\n');

  const html = parseChapterToHTML(chapterText, 'Working Backwards Strategy', false);
  console.log(`✓ Generated HTML: ${html.length} characters\n`);

  console.log('FIRST 1000 CHARACTERS OF OUTPUT:');
  console.log('='.repeat(80));
  console.log(html.substring(0, 1000));
  console.log('='.repeat(80));

  // Show structure
  const h3Count = (html.match(/<h3/g) || []).length;
  const h4Count = (html.match(/<h4/g) || []).length;
  const pCount = (html.match(/<p/g) || []).length;
  const ulCount = (html.match(/<ul/g) || []).length;
  const blueTermsCount = (html.match(/color: #2563eb/g) || []).length;

  console.log('\n\nSTRUCTURE ANALYSIS:');
  console.log(`  H3 headings: ${h3Count}`);
  console.log(`  H4 (examples): ${h4Count}`);
  console.log(`  Paragraphs: ${pCount}`);
  console.log(`  Lists: ${ulCount}`);
  console.log(`  Blue underlined terms: ${blueTermsCount}`);

  // Save to file for review
  const fs = await import('fs');
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/scripts/test-output.html', html);
  console.log('\n💾 Full HTML saved to: scripts/test-output.html');

  // Upload to database
  const { error } = await supabase
    .from('lessons')
    .update({ content: html })
    .eq('lesson_key', 'backsolving');

  if (error) {
    console.log(`\n❌ Upload error: ${error.message}`);
  } else {
    console.log('\n✅ Successfully uploaded Backsolving lesson to database!');
    console.log('📱 Check your app to see how it looks!');
  }
}

test();
