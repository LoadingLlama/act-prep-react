import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Copy the extraction logic from splitIntoTextSections.js
const isExampleSection = (content) => {
  return content.includes('<h4') &&
         /Example \d+/i.test(content) &&
         /Solution:/i.test(content);
};

const extractExamples = (content) => {
  const exampleParts = content.split(/(?=<h4[^>]*>Example)/i);
  const examples = [];

  for (const part of exampleParts) {
    if (part.trim() && /Example \d+/i.test(part)) {
      examples.push({
        type: 'example',
        content: part.trim()
      });
    }
  }

  return examples;
};

async function testExtraction() {
  console.log('Testing example extraction from lesson 1.2...\n');

  const { data: lesson } = await supabase
    .from('lesson_metadata')
    .select('id')
    .eq('lesson_key', 'substitution')
    .single();

  const { data: section } = await supabase
    .from('lesson_sections')
    .select('id')
    .eq('lesson_id', lesson.id)
    .single();

  const { data: content } = await supabase
    .from('section_content')
    .select('content')
    .eq('section_id', section.id)
    .single();

  const fullContent = content.content;

  console.log('Full content length:', fullContent.length, 'chars\n');

  // Test if examples are detected
  const hasH3 = fullContent.includes('<h3');
  console.log('Has H3 sections:', hasH3);

  if (hasH3) {
    const h3Parts = fullContent.split(/(?=<h3[^>]*>)/);
    console.log('Number of H3 sections:', h3Parts.length, '\n');

    for (let i = 0; i < h3Parts.length; i++) {
      const part = h3Parts[i].trim();
      if (!part || part.length < 50) continue;

      const hasExamples = isExampleSection(part);
      console.log(`H3 Section ${i}:`);
      console.log(`  Length: ${part.length} chars`);
      console.log(`  Has examples: ${hasExamples}`);
      console.log(`  Preview: ${part.substring(0, 100).replace(/\n/g, ' ')}`);

      if (hasExamples) {
        const examples = extractExamples(part);
        console.log(`  Extracted ${examples.length} examples`);

        examples.forEach((ex, idx) => {
          console.log(`\n  Example ${idx + 1}:`);
          console.log(`    Length: ${ex.content.length} chars`);
          console.log(`    Preview: ${ex.content.substring(0, 200).replace(/\n/g, ' ')}`);

          // Save to file
          fs.writeFileSync(
            resolve(__dirname, `../docs/EXTRACTED_EXAMPLE_${idx + 1}.html`),
            ex.content
          );
        });
      }
      console.log('');
    }
  }
}

testExtraction().catch(console.error);
