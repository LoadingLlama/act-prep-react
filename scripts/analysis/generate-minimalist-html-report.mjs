#!/usr/bin/env node

/**
 * ULTRA-MINIMALIST HTML REPORT
 * Compact numbers-focused report
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('📊 GENERATING MINIMALIST REPORT');

const reportDir = join(__dirname, '../../reports');
if (!fs.existsSync(reportDir)) {
  fs.mkdirSync(reportDir, { recursive: true });
}

// Lesson distribution from our analysis
const lessonDistribution = {
  "English": {
    "Topic 1.4 - Verbs": 26,
    "Topic 1.2 - Essential Comma Rules": 21,
    "Topic 2.4 - Which Choice Questions": 15,
    "Topic 2.2 - Word Choice": 15,
    "Topic 1.3 - Advanced Punctuation": 13,
    "Topic 1.1 - Building Complete Sentences": 11,
    "Topic 2.1 - Redundancy & Wordiness": 11,
    "Topic 2.6 - Logical Placement": 10,
    "Topic 2.3 - Transitions": 10,
    "Topic 2.5 - Adding or Deleting Information": 8,
    "Topic 1.6 - Misplaced Modifiers": 4,
    "Topic 1.8 - Miscellaneous Topics": 3,
    "Topic 1.5 - Pronouns": 2,
    "Topic 1.7 - Parallel Structure": 1
  },
  "Math": {
    "Ratios and Proportions": 37,
    "Algebra Skills": 25,
    "Topic 2.1 - Understanding Angles & Lines": 23,
    "Probability": 7,
    "Topic 7.1 - Trigonometry": 6,
    "Topic 4.6 - Sequences": 5,
    "Topic 7.5 - Word Problems": 5,
    "Topic 4.3 - Functions": 4,
    "Topic 7.6 - Miscellaneous Topics": 1,
    "Topic 7.3 - Matrices": 1,
    "Topic 7.2 - Complex Numbers": 1,
    "Topic 7.4 - Vectors": 1,
    "Number Theory": 1,
    "Mean, Median, and Mode": 1,
    "Areas, Volumes & Triangles": 1,
    "Permutations and Combinations": 1
  },
  "Reading": {
    "Topic 2.1 - How to Spot and Approach the 7 Most Common Types of Questions": 68,
    "Topic 2.5 - Words in Context Questions": 7,
    "Topic 2.6 - Tips for Comparing Passages Questions": 5
  },
  "Science": {
    "Topic 2.1 - Specific Data Point Questions": 37,
    "Topic 2.2 - Trends Questions": 21,
    "Topic 4.2 - Experimental Setup": 8,
    "Topic 2.3 - Approximation Questions": 6,
    "Topic 3.1 - 2-Part Answers": 4,
    "Topic 4.4 - Conflicting Viewpoints": 3,
    "Topic 1.1 - How to Approach the Passages": 1
  }
};

const minimalistHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>ACT Analysis</title>
    <style>
        body { font-family: monospace; max-width: 800px; margin: 20px auto; background: #f8f9fa; }
        .box { background: white; margin: 10px 0; padding: 15px; border-radius: 5px; }
        .grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 15px 0; }
        .stat { background: #e9ecef; padding: 10px; text-align: center; border-radius: 3px; }
        .big { font-size: 1.8em; font-weight: bold; color: #495057; }
        .label { font-size: 0.8em; color: #6c757d; margin-top: 5px; }
        .choice-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 5px; margin: 10px 0; }
        .choice { background: #007bff; color: white; padding: 8px; text-align: center; font-weight: bold; }
        .choice.best { background: #dc3545; }
        .lessons { font-size: 0.85em; line-height: 1.3; }
        .lessons div { margin: 2px 0; }
        h1 { text-align: center; margin: 0 0 20px 0; font-size: 1.5em; }
        h2 { margin: 0 0 10px 0; font-size: 1.1em; color: #495057; }
    </style>
</head>
<body>
    <h1>🎯 ACT Test Analysis</h1>

    <div class="box">
        <div class="grid">
            <div class="stat"><div class="big">430</div><div class="label">Questions</div></div>
            <div class="stat"><div class="big">2</div><div class="label">Tests</div></div>
            <div class="stat"><div class="big">4</div><div class="label">Sections</div></div>
            <div class="stat"><div class="big">395</div><div class="label">Patterns</div></div>
        </div>
    </div>

    <div class="box">
        <h2>📝 English (75Q)</h2>
        <div class="choice-row">
            <div class="choice">A: 25%</div>
            <div class="choice">B: 21%</div>
            <div class="choice">C: 26%</div>
            <div class="choice best">D: 28%</div>
            <div class="choice" style="background: #6c757d;">E: 0%</div>
        </div>
        <div class="lessons">
${Object.entries(lessonDistribution.English).map(([lesson, count]) =>
    `            <div>${lesson.replace('Topic ', '')}: ${count}</div>`
).join('\n')}
        </div>
    </div>

    <div class="box">
        <h2>🔢 Math (60Q)</h2>
        <div class="choice-row">
            <div class="choice">A: 18%</div>
            <div class="choice">B: 22%</div>
            <div class="choice best">C: 27%</div>
            <div class="choice">D: 15%</div>
            <div class="choice">E: 18%</div>
        </div>
        <div class="lessons">
${Object.entries(lessonDistribution.Math).map(([lesson, count]) =>
    `            <div>${lesson.replace('Topic ', '')}: ${count}</div>`
).join('\n')}
        </div>
    </div>

    <div class="box">
        <h2>📖 Reading (40Q)</h2>
        <div class="choice-row">
            <div class="choice">A: 28%</div>
            <div class="choice best">B: 30%</div>
            <div class="choice">C: 20%</div>
            <div class="choice">D: 22%</div>
            <div class="choice" style="background: #6c757d;">E: 0%</div>
        </div>
        <div class="lessons">
${Object.entries(lessonDistribution.Reading).map(([lesson, count]) =>
    `            <div>${lesson.replace('Topic ', '')}: ${count}</div>`
).join('\n')}
        </div>
    </div>

    <div class="box">
        <h2>🔬 Science (40Q)</h2>
        <div class="choice-row">
            <div class="choice">A: 12%</div>
            <div class="choice best">B: 38%</div>
            <div class="choice">C: 20%</div>
            <div class="choice">D: 30%</div>
            <div class="choice" style="background: #6c757d;">E: 0%</div>
        </div>
        <div class="lessons">
${Object.entries(lessonDistribution.Science).map(([lesson, count]) =>
    `            <div>${lesson.replace('Topic ', '')}: ${count}</div>`
).join('\n')}
        </div>
    </div>

    <div class="box">
        <h2>🎯 Key Patterns</h2>
        <div style="font-size: 0.9em; line-height: 1.4;">
            <div><strong>Best Guesses:</strong> English=D, Math=C, Reading=B, Science=B</div>
            <div><strong>Science B-bias:</strong> 38% (strongest pattern)</div>
            <div><strong>Math progression:</strong> Easy→Medium→Hard (Q1-20→21-40→41-60)</div>
            <div><strong>Wrong answers:</strong> Often 2x correct, sign errors, unit mistakes</div>
        </div>
    </div>

    <div style="text-align: center; margin-top: 20px; color: #6c757d; font-size: 0.8em;">
        Generated: ${new Date().toLocaleString()}
    </div>
</body>
</html>`;

const reportPath = join(reportDir, 'minimalist-act-analysis.html');
fs.writeFileSync(reportPath, minimalistHtml);

console.log('✅ Minimalist report generated!');
console.log(`📂 Saved: ${reportPath}`);