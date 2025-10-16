import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { readFileSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Fetch term definitions for each lesson
async function getTermsForLesson(lessonKey) {
  const { data, error } = await supabase
    .from('term_definitions')
    .select('term')
    .eq('lesson_key', lessonKey);

  if (error) return [];
  return data.map(t => t.term.toLowerCase());
}

const styleTerm = (term) => `<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">${term}</strong>`;

// Smart highlighting: apply to paragraphs and list items, but NOT to headers or Key Takeaways
function highlightKeyTermsInHTML(html, terms) {
  if (!terms || terms.length === 0) return html;

  let result = html;

  // Highlight terms in <p> tags
  result = result.replace(/<p([^>]*)>(.*?)<\/p>/gs, (match, attrs, content) => {
    let highlightedContent = content;
    for (const term of terms) {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      highlightedContent = highlightedContent.replace(regex, (termMatch) => styleTerm(termMatch));
    }
    return `<p${attrs}>${highlightedContent}</p>`;
  });

  // Highlight terms in <li> tags
  result = result.replace(/<li([^>]*)>(.*?)<\/li>/gs, (match, attrs, content) => {
    const parts = content.split(/(<[^>]+>)/g);
    const highlightedParts = parts.map(part => {
      if (part.startsWith('<')) return part;

      let highlighted = part;
      for (const term of terms) {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        highlighted = highlighted.replace(regex, (termMatch) => styleTerm(termMatch));
      }
      return highlighted;
    });

    return `<li${attrs}>${highlightedParts.join('')}</li>`;
  });

  return result;
}

// Apply highlighting to main content but exclude Key Takeaways section
function applyTermHighlighting(html, terms) {
  const keyTakeawaysMarker = '<h3 style="color: #2e7d32';
  const keyTakeawaysIndex = html.indexOf(keyTakeawaysMarker);

  if (keyTakeawaysIndex !== -1) {
    const mainContent = html.substring(0, keyTakeawaysIndex);
    const keyTakeawaysSection = html.substring(keyTakeawaysIndex);
    const highlightedMainContent = highlightKeyTermsInHTML(mainContent, terms);
    return highlightedMainContent + keyTakeawaysSection;
  }

  return highlightKeyTermsInHTML(html, terms);
}

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
    .replace(/—/g, '-')
    .trim();
}

// Format Substitution lesson
function formatSubstitution(rawText) {
  let html = '';

  // Introduction
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Do you prefer working with numbers or variables? Most students find working with numbers much easier! On the ACT, some questions have many unknown variables and few or no numbers at all. Students often find these questions more difficult. With substitution, we can substitute simple numbers for variables and solve the question using numbers instead of relying on complex algebra with variables.</p>\n\n`;

  // Section 1: What is Substitution?
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. What Is Substitution?</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Substitution is a strategy where you pick simple numbers to replace variables in a problem, making it easier to work through the math. Instead of solving with abstract algebra, you test with concrete numbers.</p>\n\n`;

  // Section 2: The Substitution Process
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. The Substitution Process</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Follow these four steps to use substitution effectively:</p>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 1: Pick a Number for the Variable(s)</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Pick easy numbers - avoid using 0 and 1. Use 2, 3, 4 or other easy numbers. Use 10 for percent problems, 10 or 20 for group size, etc.</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Select different numbers for each variable. For example, if a question has an x and a y, pick x = 2 and y = 3.</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Follow any rules in the question. For example, if a question says x is a number that is negative and even, pick x = -2.</li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 2: Write Down Your Numbers</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Write down the number(s) that you have picked - this helps avoid confusion later</li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 3: Solve With Your Numbers</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Use your number(s) to work your way through the question and find your answer</li>\n`;
  html += `</ul>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">Step 4: Test the Answer Choices</h4>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Plug your number(s) into the answer choices. The correct answer will be the one that matches your answer</li>\n`;
  html += `</ul>\n\n`;

  // Section 3: Examples
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Substitution in Action</h3>\n\n`;

  // Example 1
  html += `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 1: Percent Problem</h4>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Jeremy has n boxes of candy bars. Each box contains m bars of candy. Jeremy has to sell 70% of his candy bars to make enough money for rent. Which of the following expresses the number of candy bars Jeremy must sell in terms of m and n?</p>\n\n`;
  html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 0.7(m + n)</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 70nm</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. nm + m</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 0.7nm</span>\n`;
  html += `</p>\n\n`;
  html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Let's plug in numbers. We can say that Jeremy has 2 boxes of candy, so n = 2, and that each box contains 5 bars of candy, so m = 5</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">With our numbers, Jeremy has a total of 10 candy bars. He needs to sell 70% to make enough money for rent</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">0.7(10) = 7 candy bars must be sold</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Now plug n = 2 and m = 5 into the answer choices to see which equals 7</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Choice D: 0.7nm = 0.7(2)(5) = 7 ✓</li>\n`;
  html += `</ul>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: D</p>\n\n`;

  // Example 2
  html += `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 2: Trigonometry</h4>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If cos(2x°) = a, which of the following must be true for all values of x, in degrees?</p>\n\n`;
  html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. sin(2x°) = a</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. sin(x° + 90°) = a</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. cos(90° - 2x°) = a</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. sin(90° - 2x°) = a</span>\n`;
  html += `</p>\n\n`;
  html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">The easiest way to solve this is to pick a value for x and use your calculator. Let's pick x = 10°</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">First, find what a equals: cos(20°) = 0.9397</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Now plug in x = 10° for the x-values in the answer choices to see which equals 0.9397</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Choice D: sin(90° - 20°) = sin(70°) = 0.9397 ✓</li>\n`;
  html += `</ul>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: D (Note: Make sure your calculator is in degree mode!)</p>\n\n`;

  // Example 3
  html += `<h4 style="margin: 0 0 1rem 0; padding-left: 0.75rem; border-left: 4px solid #b91c1c; color: #000000; font-weight: 700;">Example 3: Area Problem</h4>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If the length of a rectangle is tripled and the width is halved, how many times larger is the area of the new rectangle than the area of the original rectangle?</p>\n\n`;
  html += `<p style="margin: 0.3rem 0 0.5rem 0;">\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">A. 1.5</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">B. 2</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">C. 3</span><br>\n`;
  html += `<span style="font-family: 'Times New Roman', Times, Georgia, serif;">D. 4</span>\n`;
  html += `</p>\n\n`;
  html += `<p style="margin: 1.5rem 0 0.75rem 0;"><strong>Solution:</strong></p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Pick values for the length and width. Let's make the length 3 and the width 2</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Original rectangle: length = 3, width = 2, area = 6</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The length is tripled: 3(3) = 9</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The width is halved: 2(1/2) = 1</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">New rectangle: length = 9, width = 1, area = 9</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Compare: 9 ÷ 6 = 1.5</li>\n`;
  html += `</ul>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Answer: A</p>\n\n`;

  // Section 4: When to Use Substitution
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. When to Use Substitution</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Substitution works best when:</p>\n\n`;
  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">The problem has many variables and few or no numbers</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The answer choices are expressions with variables (not numbers)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">You're asked to express one thing "in terms of" another</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">The algebra looks confusing or time-consuming</li>\n`;
  html += `</ul>\n\n`;

  // Key Takeaways
  html += `<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Substitution means picking simple numbers to replace variables instead of using algebra\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Choose easy numbers (2, 3, 4) and avoid 0 and 1 which can give misleading results\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use different numbers for different variables to avoid confusion\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always follow any constraints given in the problem (even, odd, positive, etc.)\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Test your numbers through the answer choices to find which one matches your result\n`;
  html += `  </li>\n`;
  html += `</ul>`;

  return html;
}

// Format Geometry Angles lesson
function formatGeometryAngles(rawText) {
  let html = '';

  // Introduction
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">In this chapter, we will cover all the rules you need to know for angles questions on the ACT. For angles questions, put your pencil to work by finding and labeling unknown angles. The more angles you label, the easier it will be to find the angle you need to know to answer the question.</p>\n\n`;

  // Section 1: Intersecting Lines
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">1. Intersecting Lines</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If two lines intersect, what do we know about the relationships between the angles?</p>\n\n`;

  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Vertical angles are equal</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Adjacent angles are supplementary (x and y add to 180°)</li>\n`;
  html += `</ul>\n\n`;

  // Section 2: Parallel Lines
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">2. Parallel Lines</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Given two parallel lines intersected by another line, we know the following are true:</p>\n\n`;

  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Vertical angles are equal (example: angle 1 = angle 4)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Alternate interior angles are equal (example: angle 3 = angle 6)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Opposite interior angles are supplementary (example: angle 3 + angle 5 = 180°)</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Corresponding angles are equal (example: angle 2 = angle 6)</li>\n`;
  html += `</ul>\n\n`;

  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">All those rules and fancy terms are nice, but all you really need to know is that whenever two parallel lines are intersected by another line, there are two sets of identical angles. Any angle from the first set will be supplementary with any angle from the second set.</p>\n\n`;

  html += `<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;">TIP - Extend Parallel Lines</h4>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Sometimes questions with parallel lines will not always look like the standard diagram (for example, the corner of a parallelogram). If the lines just hit and stop, take your pencil and extend the lines yourself to make the question look like a standard parallel lines diagram. Then, it will be much easier to tell which angles are identical.</p>\n\n`;

  // Section 3: Interior Angles in Polygons
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">3. Interior Angles in Polygons</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">You need to know the sum of the interior angles of common polygons:</p>\n\n`;

  html += `<ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;">\n`;
  html += `  <li style="margin: 0.15rem 0;">Triangle: 180°</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Quadrilateral: 360°</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Pentagon: 540°</li>\n`;
  html += `  <li style="margin: 0.15rem 0;">Hexagon: 720°</li>\n`;
  html += `</ul>\n\n`;

  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">For any polygon, the sum of interior angles = 180°(n - 2) where n is the number of sides. It does not matter what the shape looks like - all that matters for the sum of the interior angles is the number of sides.</p>\n\n`;

  // Section 4: Figures Drawn to Scale
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">4. Figures Drawn to Scale Trick</h3>\n\n`;
  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">All figures on the ACT are drawn to scale! You can trust the angles and side lengths in the figure.</p>\n\n`;

  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">If you are given a figure and do not know how to solve the question, look at the answer choices to see if you can make an educated guess on which answer looks correct. Quite often, you can rule out certain answer choices that clearly do not match the figure.</p>\n\n`;

  html += `<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The only exception is if you see "Note: Figure not drawn to scale." This rarely occurs on the ACT, but in case you do see it, do not trust the figure.</p>\n\n`;

  // Key Takeaways
  html += `<p style="height: 1px; margin: 0; padding: 0;"></p>\n\n`;
  html += `<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3>\n\n`;
  html += `<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">Key Takeaways</h3>\n\n`;
  html += `<ul style="list-style: none; padding: 0; margin: 0;">\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Label unknown angles on the diagram as you find them to make problems easier\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Vertical angles are equal; adjacent angles are supplementary (add to 180°)\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>When parallel lines are cut by a transversal, there are two sets of identical angles\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Sum of interior angles in a polygon = 180°(n - 2) where n is the number of sides\n`;
  html += `  </li>\n`;
  html += `  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">\n`;
  html += `    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>All ACT figures are drawn to scale unless noted otherwise - use this to eliminate wrong answers\n`;
  html += `  </li>\n`;
  html += `</ul>`;

  return html;
}

async function main() {
  console.log('🚀 PARSING REMAINING LESSONS\n');

  // Get terms for each lesson
  console.log('📚 Fetching term definitions...');
  const substitutionTerms = await getTermsForLesson('substitution');
  const geometryTerms = await getTermsForLesson('geometry-angles');

  console.log(`  - Substitution: ${substitutionTerms.length} terms`);
  console.log(`  - Geometry Angles: ${geometryTerms.length} terms\n`);

  // Format lessons
  console.log('✍️  Formatting lessons...');

  let substitutionHTML = formatSubstitution('');
  substitutionHTML = applyTermHighlighting(substitutionHTML, substitutionTerms);
  console.log(`  ✓ Substitution: ${substitutionHTML.length} characters`);

  let geometryHTML = formatGeometryAngles('');
  geometryHTML = applyTermHighlighting(geometryHTML, geometryTerms);
  console.log(`  ✓ Geometry Angles: ${geometryHTML.length} characters\n`);

  // Upload to Supabase
  console.log('📤 Uploading to Supabase...\n');

  const { error: subError } = await supabase
    .from('lessons')
    .update({ content: substitutionHTML })
    .eq('lesson_key', 'substitution');

  if (subError) {
    console.log(`  ❌ Substitution upload error: ${subError.message}`);
  } else {
    console.log('  ✅ Substitution uploaded successfully!');
  }

  const { error: geoError } = await supabase
    .from('lessons')
    .update({ content: geometryHTML })
    .eq('lesson_key', 'geometry-angles');

  if (geoError) {
    console.log(`  ❌ Geometry Angles upload error: ${geoError.message}`);
  } else {
    console.log('  ✅ Geometry Angles uploaded successfully!');
  }

  // Verify all lessons now have gold standard formatting
  console.log('\n🔍 VERIFICATION:\n');

  const { data: allLessons } = await supabase
    .from('lessons')
    .select('lesson_key, subject, content')
    .order('subject')
    .order('lesson_key');

  let goldStandardCount = 0;
  let totalLessons = allLessons.length;

  allLessons.forEach(lesson => {
    const content = lesson.content || '';
    const hasH3_5rem = content.includes('<h3 style="margin-top: 5rem');
    const hasKeyTakeaways = content.includes('Key Takeaways');
    const hasProperParagraphs = content.includes('<p style="font-size: 16px; line-height: 1.7');
    const isGoldStandard = hasH3_5rem && hasKeyTakeaways && hasProperParagraphs && content.length > 1000;

    if (isGoldStandard) goldStandardCount++;
  });

  console.log(`✨ RESULTS:`);
  console.log(`  Total lessons in database: ${totalLessons}`);
  console.log(`  Lessons with gold standard format: ${goldStandardCount}`);
  console.log(`  Completion rate: ${((goldStandardCount/totalLessons)*100).toFixed(1)}%\n`);

  if (goldStandardCount === totalLessons) {
    console.log('🎉 SUCCESS! All lessons now have proper gold standard formatting!\n');
  } else {
    console.log(`⚠️  ${totalLessons - goldStandardCount} lesson(s) still need formatting\n`);
  }

  // Show sample HTML
  console.log('📄 SAMPLE HTML (Substitution, first 500 chars):\n');
  console.log(substitutionHTML.substring(0, 500) + '...\n');
}

main();
