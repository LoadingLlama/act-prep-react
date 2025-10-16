import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Helper to style key terms
const styleTerm = (term) => `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}</strong>`;

// Generate formatted content for a lesson
function generateContent(lessonData) {
  const { title, definitions, sections } = lessonData;

  let html = `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${sections.intro}</p>\n\n`;

  // Add each section
  sections.content.forEach((section, idx) => {
    html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">${idx + 1}. ${section.heading}</h3>\n\n`;

    section.paragraphs.forEach(p => {
      html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">${p}</p>\n\n`;
    });

    if (section.bullets) {
      html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
      section.bullets.forEach(bullet => {
        html += `  <li style="margin: 0.15rem 0;">${bullet}</li>\n`;
      });
      html += `</ul>\n\n`;
    }
  });

  // Add Key Takeaways
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">Key Takeaways</h3>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  definitions.slice(0, 5).forEach(def => {
    html += `  <li style="margin: 0.15rem 0;"><strong>${def.term}:</strong> ${def.definition}</li>\n`;
  });
  html += `</ul>`;

  return html;
}

// Format Exponents and Roots lesson
async function formatExponents() {
  const lessonKey = 'exponents-roots';

  const { data: defs } = await supabase.from('term_definitions').select('*').eq('lesson_key', lessonKey);

  const content = generateContent({
    title: 'Exponents and Roots',
    definitions: defs,
    sections: {
      intro: `Exponents and roots are fundamental operations in algebra that appear frequently on the ACT. Understanding the rules for manipulating ${styleTerm('exponents')} and working with ${styleTerm('radicals')} will help you solve a wide variety of problems quickly and accurately.`,
      content: [
        {
          heading: 'Understanding Exponents',
          paragraphs: [
            `An ${styleTerm('exponent')} indicates how many times a ${styleTerm('base')} is multiplied by itself. In the expression x<sup>n</sup>, x is the base and n is the exponent.`,
            `For example, 2<sup>3</sup> means 2 × 2 × 2 = 8.`
          ],
          bullets: [
            `${styleTerm('Base')}: The number being multiplied`,
            `${styleTerm('Exponent')}: The power to which the base is raised`,
            `${styleTerm('Zero exponent')}: Any non-zero number to the power of 0 equals 1 (x<sup>0</sup> = 1)`
          ]
        },
        {
          heading: 'Exponent Rules',
          paragraphs: [
            `There are several key rules for working with exponents that you must memorize:`
          ],
          bullets: [
            `${styleTerm('Product rule')}: x<sup>a</sup> × x<sup>b</sup> = x<sup>(a+b)</sup> — Add exponents when multiplying same bases`,
            `${styleTerm('Quotient rule')}: x<sup>a</sup> ÷ x<sup>b</sup> = x<sup>(a-b)</sup> — Subtract exponents when dividing same bases`,
            `${styleTerm('Power rule')}: (x<sup>a</sup>)<sup>b</sup> = x<sup>(ab)</sup> — Multiply exponents when raising a power to a power`,
            `${styleTerm('Negative exponent')}: x<sup>-n</sup> = 1/x<sup>n</sup> — Negative exponent means reciprocal`
          ]
        },
        {
          heading: 'Roots and Radicals',
          paragraphs: [
            `A ${styleTerm('square root')} asks: what number, when squared, gives this value? The ${styleTerm('radical')} symbol (√) represents a root.`,
            `For example, √64 = 8 because 8 × 8 = 64.`
          ],
          bullets: [
            `${styleTerm('Square root')}: √x = x<sup>1/2</sup>`,
            `${styleTerm('Cube root')}: ∛x = x<sup>1/3</sup>`,
            `${styleTerm('Simplifying radicals')}: √(ab) = √a × √b`
          ]
        },
        {
          heading: 'Common ACT Problems',
          paragraphs: [
            `On the ACT, you'll typically need to:`,
          ],
          bullets: [
            `Simplify expressions using exponent rules`,
            `Calculate specific values like 3<sup>4</sup> or √81`,
            `Solve equations involving exponents`,
            `Simplify radical expressions`
          ]
        }
      ]
    }
  });

  await supabase.from('lessons').update({ content }).eq('lesson_key', lessonKey);
  console.log('✅ Formatted: Exponents and Roots');
}

formatExponents();
