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

// ONLY highlight terms that exist in term_definitions table for this lesson
// These must match EXACTLY for hover tooltips to work
const KEY_TERMS = [
  'backsolving',
  'working backwards',
  'answer choice testing',
  'strategic starting',
  'elimination',
  'when to backsolve'
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
    .trim();
}

// Smart highlighting: apply to paragraphs and list items, but NOT to headers or Key Takeaways
function highlightKeyTermsInHTML(html) {
  // Split by tags to process text content only
  let result = html;

  // Highlight terms in <p> tags (but not in headers or Key Takeaways section)
  result = result.replace(/<p([^>]*)>(.*?)<\/p>/gs, (match, attrs, content) => {
    let highlightedContent = content;
    for (const term of KEY_TERMS) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(regex, (termMatch) => styleTerm(termMatch));
    }
    return `<p${attrs}>${highlightedContent}</p>`;
  });

  // Highlight terms in <li> tags - only highlight direct text, not nested tags
  result = result.replace(/<li([^>]*)>(.*?)<\/li>/gs, (match, attrs, content) => {
    // Split content into text nodes and tags
    const parts = content.split(/(<[^>]+>)/g);
    const highlightedParts = parts.map(part => {
      // Skip if it's a tag
      if (part.startsWith('<')) return part;

      // Highlight text content
      let highlighted = part;
      for (const term of KEY_TERMS) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        highlighted = highlighted.replace(regex, (termMatch) => styleTerm(termMatch));
      }
      return highlighted;
    });

    return `<li${attrs}>${highlightedParts.join('')}</li>`;
  });

  return result;
}

// Restructure backsolving content into gold-standard format
function restructureBacksolving(rawText) {
  let html = '';

  // Introduction
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The working backwards strategy, also known as backsolving, is one of the most powerful time-saving techniques on the ACT Math section. Instead of solving a problem algebraically from scratch, you test the answer choices to see which one works. This strategy is especially useful when the algebra looks complicated, but answer choice testing makes solving easy.</p>\n\n`;

  // Section 1: What is Backsolving?
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Backsolving?</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Backsolving means plugging in the answer choices to solve the problem. Instead of setting up equations and solving for x, you test each choice until you find the one that satisfies the conditions in the problem.</p>\n\n`;

  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Key advantages:\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>Faster than traditional algebra on many problems</li>\n`;
  html += `      <li>Less chance of making algebraic mistakes</li>\n`;
  html += `      <li>Works great when answer choices are concrete numbers</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `  <li style="margin: 0.15rem 0;">When to Backsolve:\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>The problem asks for a specific value</li>\n`;
  html += `      <li>Answer choices are numbers (not expressions)</li>\n`;
  html += `      <li>The algebra looks messy or time-consuming</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `</ul>\n\n`;

  // Section 2: The Backsolving Process
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The Backsolving Process</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Follow these five steps to backsolve efficiently:</p>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Strategic Starting</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">On the ACT, answer choices are always listed in ascending order (smallest to largest) or descending order (largest to smallest)\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>Start with B or C (the middle value) - you can often eliminate 2-3 choices with one test</li>\n`;
  html += `      <li>If C is too big, you know D and E are also too big</li>\n`;
  html += `      <li>If C is too small, you know A and B are also too small</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 2: Test the Choice</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Substitute the answer choice into the problem conditions\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>Does it make the equation true?</li>\n`;
  html += `      <li>Does it satisfy all the constraints?</li>\n`;
  html += `      <li>Does it produce the correct result?</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 3: If It Works, You're Done!</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">If this answer choice works correctly, bubble it in and move on to the next question</li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 4: Elimination and Adjustment</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">If the answer doesn't work, cross it off\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>Determine if you need a larger or smaller value</li>\n`;
  html += `      <li>Cross off any other choices you can eliminate</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 5: Repeat</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Pick one of the remaining answer choices and plug it back into the question\n`;
  html += `    <ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;">\n`;
  html += `      <li>Continue until you find the correct answer</li>\n`;
  html += `      <li>Remember: one of the 5 answer choices must work!</li>\n`;
  html += `    </ul>\n`;
  html += `  </li>\n`;
  html += `</ul>\n\n`;

  // Section 3: Examples
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Classic Backsolving Problems</h3>\n\n`;

  // Example 1
  html += `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Basic Backsolving</h4>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If √x + 10 − 2√x − 2 = 0, what is the value of x?</p>\n\n`;
  html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 2</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 6</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 14</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 18</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">E. 22</span>\n`;
  html += `</p>\n\n`;
  html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Start with C (14): √14 + 10 − 2√14 − 2 = √24 − 2√12 ≈ 4.9 − 6.9 ≠ 0 (doesn't work)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Try B (6): √6 + 10 − 2√6 − 2 = √16 − 2√4 = 4 − 2(2) = 4 − 4 = 0 ✓</li>\n`;
  html += `</ul>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: B</p>\n\n`;

  // Section 4: When NOT to Backsolve
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. When NOT to Backsolve</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Backsolving isn't always the best strategy. Avoid it when:</p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Answer choices are algebraic expressions (not numbers)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The traditional algebra is very simple</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Testing answer choices would be more work than solving directly</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The problem has multiple variables and complex relationships</li>\n`;
  html += `</ul>\n\n`;

  // Key Takeaways
  html += `<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Backsolving means using answer choices to solve instead of traditional algebra\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always start with choice B or C since answers are ordered by value\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use backsolving when answer choices are concrete numbers and algebra looks messy\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Avoid backsolving when choices are expressions or when algebra is simple\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Testing one choice can often eliminate 2-3 other choices simultaneously\n`;
  html += `  </li>\n`;
  html += `</ul>`;

  // Apply smart highlighting to main content, but exclude Key Takeaways section
  const keyTakeawaysMarker = '<h3 style="color: #2e7d32';
  const keyTakeawaysIndex = html.indexOf(keyTakeawaysMarker);

  if (keyTakeawaysIndex !== -1) {
    const mainContent = html.substring(0, keyTakeawaysIndex);
    const keyTakeawaysSection = html.substring(keyTakeawaysIndex);

    // Apply highlighting only to main content
    const highlightedMainContent = highlightKeyTermsInHTML(mainContent);

    return highlightedMainContent + keyTakeawaysSection;
  }

  // If no Key Takeaways found, highlight everything
  return highlightKeyTermsInHTML(html);
}

async function test() {
  console.log('🔨 TESTING SMART RESTRUCTURING PARSER\n');

  const mathFile = '/Volumes/IMPORTANT/actprep copy/actclass.org/packets/PrepPros Complete Guide to ACT Math.txt';
  const fullText = readFileSync(mathFile, 'utf-8');

  const startIdx = fullText.indexOf('Backsolving is plugging');
  const ch2Idx = fullText.indexOf('Chapter 2:', startIdx);
  const chapterText = fullText.substring(startIdx, ch2Idx);

  console.log(`✓ Extracted chapter: ${chapterText.length} characters\n`);

  // Use smart restructuring
  const html = restructureBacksolving(chapterText);

  console.log(`✓ Generated restructured HTML: ${html.length} characters\n`);

  // Show structure
  const h3Count = (html.match(/<h3/g) || []).length;
  const h4Count = (html.match(/<h4/g) || []).length;
  const pCount = (html.match(/<p/g) || []).length;
  const ulCount = (html.match(/<ul/g) || []).length;
  const liCount = (html.match(/<li/g) || []).length;
  const blueTermsCount = (html.match(/color: #2563eb/g) || []).length;

  console.log('STRUCTURE ANALYSIS:');
  console.log(`  H3 headings: ${h3Count}`);
  console.log(`  H4 (subsections): ${h4Count}`);
  console.log(`  Paragraphs: ${pCount}`);
  console.log(`  Lists: ${ulCount}`);
  console.log(`  List items: ${liCount}`);
  console.log(`  Blue underlined terms: ${blueTermsCount}`);

  // Save for review
  const fs = await import('fs');
  fs.writeFileSync('/Users/cadenchiang/Desktop/act-prep-react/scripts/restructured-output.html', html);
  console.log('\n💾 Full HTML saved to: scripts/restructured-output.html');

  // Upload
  const { error } = await supabase
    .from('lessons')
    .update({ content: html })
    .eq('lesson_key', 'backsolving');

  if (error) {
    console.log(`\n❌ Upload error: ${error.message}`);
  } else {
    console.log('\n✅ Successfully uploaded restructured Backsolving lesson!');
    console.log('📱 Refresh your app and check how it looks now!');
  }
}

test();
