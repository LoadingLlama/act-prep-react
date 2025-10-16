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

// Chapter mapping: TXT file chapters to lesson keys
const MATH_CHAPTER_MAP = {
  'Chapter 1': { key: 'backsolving', title: 'Working Backwards Strategy', searchStart: 'Backsolving is plugging', searchEnd: 'Chapter 2:' },
  'Chapter 2': { key: 'substitution', title: 'Number Substitution Technique', searchStart: 'SuUDStitution', searchEnd: 'Chapter 3:' },
  'Chapter 3': { key: 'geometry-angles', title: 'Geometry: Angles', searchStart: 'Geometry Part 1 - Angles', searchEnd: 'Chapter 4:' },
  // Add more mappings as needed
};

function cleanOCRErrors(text) {
  // Fix common OCR errors
  return text
    .replace(/SuUDStitution/g, 'Substitution')
    .replace(/TYIGONOMELTY/g, 'TRIGONOMETRY')
    .replace(/LOGaritlh/g, 'Logarithms')
    .replace(/QUAI ATICS/g, 'QUADRATICS')
    .replace(/ADSOLUte/g, 'ABSOLUTE')
    .replace(/PeLrCenta@es/g, 'Percentages')
    .replace(/Theor y/g, 'Theory')
    .replace(/SKIIIS/g, 'SKILLS')
    .replace(/\.\.\./g, '')
    .replace(/ccccc+/g, '')
    .replace(/sssss+/g, '')
    .replace(/eeeee+/g, '')
    .replace(/—+/g, '—')
    .replace(/\.{5,}/g, '')
    .trim();
}

function extractChapterContent(fullText, searchStart, searchEnd) {
  const startIdx = fullText.indexOf(searchStart);
  if (startIdx === -1) return null;

  const endIdx = searchEnd ? fullText.indexOf(searchEnd, startIdx) : fullText.length;
  if (endIdx === -1) return null;

  return fullText.substring(startIdx, endIdx);
}

function convertToHTML(rawContent, lessonTitle) {
  // Clean the content
  let content = cleanOCRErrors(rawContent);

  // Start with intro paragraph
  const lines = content.split('\n').map(l => l.trim()).filter(l => l.length > 0);

  let html = '';
  let inExample = false;
  let exampleNum = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect examples
    if (line.match(/^Example \d+:/)) {
      exampleNum++;
      inExample = true;
      html += `\n\n<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">${line}</h4>\n\n`;
      continue;
    }

    // Detect solution
    if (line.match(/^Solution:/)) {
      html += `\n<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
      continue;
    }

    // Regular paragraphs
    if (line.length > 50 && !line.match(/^[A-E]\)/)) {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${line}</p>\n\n`;
    }
  }

  return html;
}

async function processChapter(chapterInfo) {
  console.log(`\n📖 Processing: ${chapterInfo.title}`);

  // Read the Math TXT file
  const mathFile = '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt';
  const fullText = readFileSync(mathFile, 'utf-8');

  // Extract chapter content
  const rawContent = extractChapterContent(fullText, chapterInfo.searchStart, chapterInfo.searchEnd);

  if (!rawContent) {
    console.log(`   ❌ Could not find content for ${chapterInfo.title}`);
    return;
  }

  console.log(`   ✓ Found content (${rawContent.length} chars)`);

  // Convert to HTML
  const htmlContent = convertToHTML(rawContent, chapterInfo.title);

  console.log(`   ✓ Converted to HTML (${htmlContent.length} chars)`);

  // Upload to database
  const { error } = await supabase
    .from('lessons')
    .update({ content: htmlContent })
    .eq('lesson_key', chapterInfo.key);

  if (error) {
    console.log(`   ❌ Error updating: ${error.message}`);
  } else {
    console.log(`   ✅ Uploaded to database`);
  }
}

async function main() {
  console.log('🚀 PARSING AND UPLOADING LESSON CONTENT FROM TXT FILES\n');

  for (const [chapter, info] of Object.entries(MATH_CHAPTER_MAP)) {
    await processChapter(info);
  }

  console.log('\n✅ DONE!');
}

main();
