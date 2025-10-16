import { readFileSync } from 'fs';
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Simplified version of splitIntoTextSections for debugging
const isExampleSection = (content) => {
  return content.includes('<h4') &&
         /Example \d+/i.test(content) &&
         /Solution:/i.test(content);
};

const extractExamples = (content) => {
  const exampleParts = content.split(/(?=<h4[^>]*>Example)/i);
  const examples = [];

  console.log(`\n📊 Split into ${exampleParts.length} parts by Example H4:`);

  for (let i = 0; i < exampleParts.length; i++) {
    const part = exampleParts[i];
    const preview = part.substring(0, 200).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
    console.log(`\nPart ${i}: ${preview}...`);
    console.log(`  Has "Example \\d+": ${/Example \d+/i.test(part)}`);

    if (part.trim() && /Example \d+/i.test(part)) {
      console.log(`  ✓ Adding as example section`);
      examples.push({
        type: 'example',
        content: part.trim()
      });
    }
  }

  return examples;
};

async function debugSplit() {
  console.log('\n🔍 DEBUGGING SECTION SPLIT FOR LESSON 3.5');
  console.log('='.repeat(80));

  // Read from HTML file directly
  const htmlPath = resolve(__dirname, '../docs/LESSON_3_5_INEQUALITIES.html');
  const fullContent = readFileSync(htmlPath, 'utf8');

  console.log(`\n📄 Full content length: ${fullContent.length} chars`);

  // Remove h2 tags
  let cleanContent = fullContent.trim();
  cleanContent = cleanContent.replace(/<h2[^>]*>.*?<\/h2>/gi, '');

  // Split by H3
  const h3Parts = cleanContent.split(/(?=<h3[^>]*>)/);
  console.log(`\n✂️  Split into ${h3Parts.length} H3 sections`);

  // Analyze section 3 (index 2) - "3. Graphing Inequalities"
  const section3Index = h3Parts.findIndex(part => part.includes('3. Graphing Inequalities'));

  if (section3Index >= 0) {
    const section3 = h3Parts[section3Index];
    console.log(`\n\n📍 ANALYZING SECTION 3: "3. Graphing Inequalities"`);
    console.log('='.repeat(80));
    console.log(`Length: ${section3.length} chars`);
    console.log(`Is example section: ${isExampleSection(section3)}`);

    // Count H4 tags
    const h4Count = (section3.match(/<h4/g) || []).length;
    console.log(`Number of H4 tags: ${h4Count}`);

    // List all H4 titles
    const h4Matches = section3.match(/<h4[^>]*>(.*?)<\/h4>/g) || [];
    console.log(`\nH4 titles found:`);
    h4Matches.forEach((match, idx) => {
      const title = match.replace(/<[^>]*>/g, '').trim();
      console.log(`  ${idx + 1}. ${title}`);
    });

    if (isExampleSection(section3)) {
      console.log(`\n🔬 EXTRACTING EXAMPLES:`);
      const examples = extractExamples(section3);

      console.log(`\n📝 INTRO TEXT BEFORE EXAMPLES:`);
      const firstExampleIndex = section3.search(/<h4[^>]*>Example/i);
      if (firstExampleIndex > 0) {
        const introText = section3.substring(0, firstExampleIndex).trim();
        const introPreview = introText.substring(0, 500).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
        console.log(`Length: ${introText.length} chars`);
        console.log(`Preview: ${introPreview}...`);

        // Check H4s in intro text
        const introH4s = introText.match(/<h4[^>]*>(.*?)<\/h4>/g) || [];
        console.log(`\nH4 subsections in intro text:`);
        introH4s.forEach((match, idx) => {
          const title = match.replace(/<[^>]*>/g, '').trim();
          console.log(`  ${idx + 1}. ${title}`);
        });
      }

      console.log(`\n📦 EXAMPLE SECTIONS:`);
      examples.forEach((ex, idx) => {
        const title = (ex.content.match(/<h4[^>]*>(.*?)<\/h4>/) || [])[1] || 'No title';
        console.log(`  Example ${idx + 1}: ${title}`);
        console.log(`  Length: ${ex.content.length} chars`);
      });
    }
  }

  console.log('\n' + '='.repeat(80));
}

debugSplit();
