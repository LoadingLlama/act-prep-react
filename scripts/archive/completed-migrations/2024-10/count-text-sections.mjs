import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Simplified version of splitIntoTextSections
const isExampleSection = (content) => {
  return content.includes('<h4') &&
         /Example \d+/i.test(content) &&
         /Solution:/i.test(content);
};

const extractExamples = (content) => {
  const exampleParts = content.split(/(?=<h4[^>]*>\s*Example)/i);
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

const splitIntoTextSections = (content) => {
  if (!content || !content.trim()) {
    return [];
  }

  let cleanContent = content.trim();
  cleanContent = cleanContent.replace(/<h2[^>]*>.*?<\/h2>/gi, '');

  const sections = [];

  if (cleanContent.includes('<h3')) {
    const h3Parts = cleanContent.split(/(?=<h3[^>]*>)/);

    for (let part of h3Parts) {
      part = part.trim();
      if (!part || part.length < 50) continue;

      if (isExampleSection(part)) {
        const examples = extractExamples(part);
        const firstExampleIndex = part.search(/<h4[^>]*>\s*Example/i);

        if (firstExampleIndex > 0) {
          const introText = part.substring(0, firstExampleIndex).trim();
          if (introText.length > 50) {
            sections.push({
              type: 'text',
              content: introText
            });
          }
        }

        sections.push(...examples);
      } else {
        sections.push({
          type: 'text',
          content: part,
        });
      }
    }
  } else {
    sections.push({
      type: 'text',
      content: cleanContent,
    });
  }

  return sections.length > 0 ? sections : [{
    type: 'text',
    content: cleanContent,
  }];
};

async function countSections() {
  console.log('\n📊 COUNTING TEXT SECTIONS FOR LESSONS');
  console.log('='.repeat(80));

  const lessons = [
    { key: '3.4', file: 'LESSON_3_4_LOGARITHMS.html' },
    { key: '3.5', file: 'LESSON_3_5_INEQUALITIES.html' },
    { key: '3.6', file: 'LESSON_3_6_ABSOLUTE_VALUE.html' }
  ];

  for (const lesson of lessons) {
    const htmlPath = resolve(__dirname, `../docs/${lesson.file}`);
    const content = readFileSync(htmlPath, 'utf8');
    const sections = splitIntoTextSections(content);

    console.log(`\n📚 Lesson ${lesson.key}`);
    console.log(`  Total sections: ${sections.length}`);

    const textCount = sections.filter(s => s.type === 'text').length;
    const exampleCount = sections.filter(s => s.type === 'example').length;

    console.log(`  - Text sections: ${textCount}`);
    console.log(`  - Example sections: ${exampleCount}`);
    console.log(`  → Quiz should be at position: ${sections.length} (after all content)`);
  }

  console.log('\n' + '='.repeat(80));
}

countSections();
