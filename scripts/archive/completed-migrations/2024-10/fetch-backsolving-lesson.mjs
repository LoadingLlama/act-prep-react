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

async function fetchBacksolvingLesson() {
  console.log('Fetching Topic 1.1 - Working Backwards Strategy (backsolving)...\n');

  // Get lesson metadata
  const { data: metadata, error: metaError } = await supabase
    .from('lesson_metadata')
    .select('*')
    .eq('lesson_key', 'backsolving')
    .single();

  if (metaError || !metadata) {
    console.error('Error fetching metadata:', metaError);
    return;
  }

  console.log('='.repeat(100));
  console.log('LESSON METADATA');
  console.log('='.repeat(100));
  console.log(JSON.stringify(metadata, null, 2));
  console.log('\n');

  const lessonId = metadata.id;

  // Get lesson sections
  const { data: sections, error: sectionsError } = await supabase
    .from('lesson_sections')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('order_index');

  if (sectionsError) {
    console.error('Error fetching sections:', sectionsError);
    return;
  }

  console.log('='.repeat(100));
  console.log(`LESSON SECTIONS (${sections?.length || 0} sections)`);
  console.log('='.repeat(100));

  const fullLesson = {
    metadata,
    sections: []
  };

  // For each section, get its content
  for (const section of sections || []) {
    console.log(`\n${'═'.repeat(100)}`);
    console.log(`SECTION ${section.order_index}: ${section.section_key}`);
    console.log(`Title: ${section.title || 'N/A'}`);
    console.log(`${'═'.repeat(100)}`);

    const { data: content, error: contentError } = await supabase
      .from('section_content')
      .select('*')
      .eq('section_id', section.id)
      .order('order_index');

    if (contentError) {
      console.error('Error fetching content:', contentError);
      continue;
    }

    console.log(`Content blocks: ${content?.length || 0}\n`);

    fullLesson.sections.push({
      ...section,
      content: content || []
    });

    // Show each content block in full
    for (const block of content || []) {
      console.log(`${'─'.repeat(100)}`);
      console.log(`Block ${block.order_index} (${block.content_type}) - ${block.content.length} chars`);
      console.log(`${'─'.repeat(100)}`);
      console.log(block.content);
      console.log('\n');
    }
  }

  // Get additional lesson data
  const [examples, concepts, tips] = await Promise.all([
    supabase.from('lesson_examples').select('*').eq('lesson_id', lessonId).order('order_index'),
    supabase.from('lesson_concepts').select('*').eq('lesson_id', lessonId).order('order_index'),
    supabase.from('lesson_tips').select('*').eq('lesson_id', lessonId).order('order_index')
  ]);

  if (examples.data?.length) {
    console.log('\n' + '='.repeat(100));
    console.log(`EXAMPLES (${examples.data.length})`);
    console.log('='.repeat(100));
    fullLesson.examples = examples.data;
    examples.data.forEach((ex, i) => {
      console.log(`\nExample ${i + 1}:`);
      console.log(JSON.stringify(ex, null, 2));
    });
  }

  if (concepts.data?.length) {
    console.log('\n' + '='.repeat(100));
    console.log(`KEY CONCEPTS (${concepts.data.length})`);
    console.log('='.repeat(100));
    fullLesson.concepts = concepts.data;
    concepts.data.forEach((c, i) => {
      console.log(`\n${i + 1}. ${c.concept_name || 'N/A'}`);
      console.log(JSON.stringify(c, null, 2));
    });
  }

  if (tips.data?.length) {
    console.log('\n' + '='.repeat(100));
    console.log(`TIPS (${tips.data.length})`);
    console.log('='.repeat(100));
    fullLesson.tips = tips.data;
    tips.data.forEach((t, i) => {
      console.log(`\n${i + 1}. ${t.tip_type}:`);
      console.log(JSON.stringify(t, null, 2));
    });
  }

  // Save to file
  const outputPath = resolve(__dirname, '../docs/LESSON_1_1_BACKSOLVING_FULL.json');
  fs.writeFileSync(outputPath, JSON.stringify(fullLesson, null, 2));

  console.log('\n' + '='.repeat(100));
  console.log(`Full lesson saved to: ${outputPath}`);
  console.log('='.repeat(100));

  // Also save HTML version
  const htmlOutputPath = resolve(__dirname, '../docs/LESSON_1_1_BACKSOLVING.html');
  let htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${metadata.title}</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 1000px; margin: 40px auto; padding: 20px; }
    h1 { color: #2c3e50; }
    h2 { color: #34495e; margin-top: 30px; }
    .section { margin: 30px 0; }
    .content-block { margin: 15px 0; padding: 15px; background: #f9f9f9; border-left: 4px solid #3498db; }
    .metadata { background: #ecf0f1; padding: 15px; border-radius: 5px; margin-bottom: 30px; }
  </style>
</head>
<body>
  <div class="metadata">
    <h1>${metadata.title}</h1>
    <p><strong>Lesson Key:</strong> ${metadata.lesson_key}</p>
    <p><strong>Category:</strong> ${metadata.category}</p>
    <p><strong>Difficulty:</strong> ${metadata.difficulty_level}/5</p>
    <p><strong>Duration:</strong> ${metadata.duration_minutes} minutes</p>
  </div>
`;

  for (const section of fullLesson.sections) {
    htmlContent += `\n  <div class="section">
    <h2>${section.title || section.section_key}</h2>\n`;

    for (const block of section.content) {
      htmlContent += `    <div class="content-block">
      ${block.content}
    </div>\n`;
    }

    htmlContent += `  </div>\n`;
  }

  htmlContent += `</body>
</html>`;

  fs.writeFileSync(htmlOutputPath, htmlContent);

  console.log(`HTML version saved to: ${htmlOutputPath}`);
  console.log('='.repeat(100));

  return fullLesson;
}

fetchBacksolvingLesson().catch(console.error);
