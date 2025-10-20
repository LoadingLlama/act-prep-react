#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import * as cheerio from 'cheerio';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function analyzeLessonStructure() {
  console.log('\n╔═══════════════════════════════════════════════════╗');
  console.log('║    Analyzing Current Lesson Structure            ║');
  console.log('╚═══════════════════════════════════════════════════╝\n');

  // Get a few sample lessons from different subjects
  const { data: lessons } = await supabase
    .from('lesson_metadata')
    .select('id, lesson_key, title, subject')
    .in('subject', ['math', 'english', 'science', 'reading'])
    .limit(8);

  console.log(`Analyzing ${lessons.length} sample lessons:\n`);

  for (const lesson of lessons.slice(0, 4)) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📚 ${lesson.subject.toUpperCase()}: ${lesson.title}`);
    console.log(`   Lesson Key: ${lesson.lesson_key}`);
    console.log('='.repeat(60));

    // Get sections
    const { data: sections } = await supabase
      .from('lesson_sections')
      .select('id, title')
      .eq('lesson_id', lesson.id);

    if (sections && sections.length > 0) {
      // Get content
      const { data: content } = await supabase
        .from('lesson_section_content')
        .select('content')
        .eq('section_id', sections[0].id)
        .limit(1);

      if (content && content.length > 0) {
        const html = content[0].content;
        const $ = cheerio.load(html);

        // Analyze structure
        const analysis = {
          totalLength: html.length,
          h3Count: $('h3').length,
          h4Count: $('h4').length,
          paragraphCount: $('p').length,
          listCount: $('ul').length,
          exampleCount: $('h4').filter((i, el) => $(el).text().toLowerCase().includes('example')).length,
          hasKeyTakeaways: $('h3').filter((i, el) => $(el).text().toLowerCase().includes('key takeaway')).length > 0,
          hasNumberedSections: $('h3').first().text().match(/^\d+\./) !== null
        };

        console.log('\n📊 Structure Analysis:');
        console.log(`   Total length: ${analysis.totalLength} chars`);
        console.log(`   H3 sections: ${analysis.h3Count}`);
        console.log(`   H4 subsections: ${analysis.h4Count}`);
        console.log(`   Paragraphs: ${analysis.paragraphCount}`);
        console.log(`   Lists: ${analysis.listCount}`);
        console.log(`   Examples: ${analysis.exampleCount}`);
        console.log(`   Has Key Takeaways: ${analysis.hasKeyTakeaways ? 'YES' : 'NO'}`);
        console.log(`   Has numbered sections: ${analysis.hasNumberedSections ? 'YES' : 'NO'}`);

        // Show first H3 section
        const firstH3 = $('h3').first();
        console.log(`\n📝 First H3: "${firstH3.text()}"`);

        // Check opening paragraph
        const firstP = $('p').first();
        const hasBlueTerms = firstP.html()?.includes('color: #2563eb') || false;
        console.log(`   Opening has blue key terms: ${hasBlueTerms ? 'YES' : 'NO'}`);

        // Save sample for review
        const samplePath = path.join(__dirname, `../samples/lesson-${lesson.lesson_key}.html`);
        if (!fs.existsSync(path.dirname(samplePath))) {
          fs.mkdirSync(path.dirname(samplePath), { recursive: true });
        }
        fs.writeFileSync(samplePath, html);
        console.log(`   Saved to: samples/lesson-${lesson.lesson_key}.html`);
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('\n✅ Analysis complete! Check samples/ folder for HTML files.\n');
}

analyzeLessonStructure();
