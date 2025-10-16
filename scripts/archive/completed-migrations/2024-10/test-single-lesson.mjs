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

  console.log(`Found ${allOccurrences.length} occurrences of "${chapterMarker}"`);

  // Find the right occurrence: not TOC, not answer key, but actual content
  let startIdx = -1;

  for (let i = allOccurrences.length - 1; i >= 0; i--) {
    const idx = allOccurrences[i];
    const preview = cleaned.substring(idx, Math.min(idx + 1000, cleaned.length));

    // Check if this looks like an answer key section
    const answerKeyPattern = /\n\d+\.\s+[A-E]\s*\n/g;
    const matches = preview.match(answerKeyPattern);
    if (matches && matches.length > 3) {
      console.log(`Skipping occurrence at ${idx} (looks like answer key)`);
      continue;
    }

    // Check if this has actual teaching content
    if (preview.match(/\n[A-Z][a-z]{2,}\s+.{100,}/)) {
      console.log(`Using occurrence at ${idx} (has teaching content)`);
      startIdx = idx;
      break;
    }
  }

  if (startIdx === -1 && allOccurrences.length > 1) {
    startIdx = allOccurrences[allOccurrences.length - 2];
    console.log(`Using second-to-last occurrence at ${startIdx}`)  ;
  } else if (startIdx === -1) {
    startIdx = allOccurrences[0];
    console.log(`Using first occurrence at ${startIdx}`);
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

async function testLesson() {
  const sourceFile = '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt';
  const fullText = readFileSync(sourceFile, 'utf-8');

  console.log('Testing fractions chapter extraction...\n');

  const rawContent = extractChapterContent(fullText, 'Chapter 6:');

  if (!rawContent) {
    console.log('❌ Could not extract content');
    return;
  }

  console.log(`Extracted ${rawContent.length} chars`);
  console.log('\n' + '='.repeat(80));
  console.log('EXTRACTED CONTENT:');
  console.log('='.repeat(80));
  console.log(rawContent);
  console.log('='.repeat(80));
}

testLesson();
