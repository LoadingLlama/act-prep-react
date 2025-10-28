#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log('🔬 DEEP ACT Analysis - Extracting EVERYTHING\n');

// Fetch EVERYTHING
const { data: engQ } = await supabase.from('act_english_questions').select('*');
const { data: engP } = await supabase.from('act_english_passages').select('*');
const { data: mathQ } = await supabase.from('act_math_questions').select('*');
const { data: readQ } = await supabase.from('act_reading_questions').select('*');
const { data: readP } = await supabase.from('act_reading_passages').select('*');
const { data: sciQ } = await supabase.from('act_science_questions').select('*');
const { data: sciP } = await supabase.from('act_science_passages').select('*');

console.log(`✓ Loaded all data\n`);

// Analyze wrong answer patterns
function analyzeChoices(questions, answerKey) {
  const patterns = {
    correctLengths: [],
    wrongLengths: [],
    noChangeCount: 0,
    deleteCount: 0,
    extremeLanguage: { correct: 0, wrong: 0 }
  };

  questions.forEach(q => {
    const correct = q.correct_answer;
    const choices = {
      A: q.choice_a,
      B: q.choice_b,
      C: q.choice_c,
      D: q.choice_d,
      E: q.choice_e
    };

    Object.entries(choices).forEach(([key, text]) => {
      if (!text) return;
      const len = text.length;
      if (key === correct) {
        patterns.correctLengths.push(len);
      } else {
        patterns.wrongLengths.push(len);
      }

      const lower = text.toLowerCase();
      if (lower.includes('no change')) patterns.noChangeCount++;
      if (lower.includes('delete') || lower === 'omit') patterns.deleteCount++;

      // Extreme language
      if (/\b(always|never|all|none|every|must|only)\b/i.test(text)) {
        if (key === correct) patterns.extremeLanguage.correct++;
        else patterns.extremeLanguage.wrong++;
      }
    });
  });

  const avg = arr => arr.reduce((a,b) => a+b, 0) / arr.length;
  return {
    avgCorrectLen: avg(patterns.correctLengths).toFixed(1),
    avgWrongLen: avg(patterns.wrongLengths).toFixed(1),
    noChangeCount: patterns.noChangeCount,
    deleteCount: patterns.deleteCount,
    extremeLanguage: patterns.extremeLanguage
  };
}

// Question wording patterns
function analyzeWordingPatterns(questions) {
  const patterns = {
    starts: {},
    contains: {},
    ends: {}
  };

  questions.forEach(q => {
    const stem = (q.question_stem || '').trim();
    if (!stem) return;

    // Starting patterns
    const start = stem.split(' ').slice(0, 3).join(' ');
    patterns.starts[start] = (patterns.starts[start] || 0) + 1;

    // Common phrases
    const phrases = [
      'according to',
      'which of the following',
      'the passage',
      'the author',
      'it can be inferred',
      'most likely',
      'best described',
      'primarily',
      'main idea'
    ];

    phrases.forEach(phrase => {
      if (stem.toLowerCase().includes(phrase)) {
        patterns.contains[phrase] = (patterns.contains[phrase] || 0) + 1;
      }
    });
  });

  return patterns;
}

// Math answer spacing analysis
function analyzeMathAnswerSpacing(questions) {
  const numericAnswers = [];
  
  questions.forEach(q => {
    const choices = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e]
      .filter(c => c)
      .map(c => parseFloat(c))
      .filter(n => !isNaN(n));
    
    if (choices.length >= 3) {
      choices.sort((a, b) => a - b);
      const diffs = [];
      for (let i = 1; i < choices.length; i++) {
        diffs.push(choices[i] - choices[i-1]);
      }
      numericAnswers.push({
        choices,
        minDiff: Math.min(...diffs),
        maxDiff: Math.max(...diffs),
        range: choices[choices.length-1] - choices[0]
      });
    }
  });

  return numericAnswers;
}

// Build HTML with EVERYTHING
let html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>DEEP ACT Blueprint</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:10px 'Courier New',monospace;background:#000;color:#0f0;padding:20px;line-height:1.4}
.section{margin:40px 0;border:1px solid #0f0;padding:20px}
h1{font-size:16px;color:#0ff;margin-bottom:20px;border-bottom:1px solid #0f0;padding-bottom:10px}
h2{font-size:13px;color:#ff0;margin:20px 0 10px}
.q{margin:20px 0;padding:15px;background:#001a00;border-left:3px solid #0f0}
.stem{color:#fff;margin-bottom:10px;font-size:11px}
.choice{margin:5px 0 5px 20px;color:#aaa}
.choice.correct{color:#0f0;font-weight:bold}
.wrong{color:#f00}
.metric{display:inline-block;margin:5px 10px;padding:5px 10px;background:#003300;border:1px solid #0f0}
pre{background:#001100;padding:10px;overflow-x:auto;color:#0f0;font-size:9px;margin:10px 0}
.passage{background:#001a1a;padding:15px;margin:15px 0;color:#ccc;font-size:10px;max-height:400px;overflow-y:auto}
table{width:100%;border-collapse:collapse;margin:10px 0}
th,td{border:1px solid #0f0;padding:5px 8px;text-align:left}
th{background:#003300;color:#0ff}
.tab{display:inline-block;padding:8px 15px;margin:3px;background:#003300;cursor:pointer;border:1px solid #0f0;color:#0f0}
.tab.active{background:#006600;color:#fff}
.tab-content{display:none}
.tab-content.active{display:block}
</style>
</head><body>

<div style="text-align:center;margin-bottom:30px">
<h1 style="font-size:20px;border:none">🔬 DEEP ACT BLUEPRINT 🔬</h1>
<p style="color:#ff0">EVERY PATTERN • EVERY TRICK • EVERY DETAIL</p>
</div>

<div style="margin-bottom:20px">
  <span class="tab active" onclick="show('eng')">ENGLISH</span>
  <span class="tab" onclick="show('math')">MATH</span>
  <span class="tab" onclick="show('read')">READING</span>
  <span class="tab" onclick="show('sci')">SCIENCE</span>
  <span class="tab" onclick="show('patterns')">PATTERNS</span>
</div>

<div id="eng" class="tab-content active">
  <div class="section">
    <h1>ENGLISH FULL PASSAGES</h1>
    ${engP.slice(0, 5).map(p => `
      <h2>Test ${p.test_number}, Passage ${p.passage_number}: ${p.title || 'Untitled'}</h2>
      ${p.introduction ? `<p style="color:#ff0;margin-bottom:10px">INTRO: ${p.introduction}</p>` : ''}
      <div class="passage">${(p.passage_text || '').replace(/\n/g, '<br>')}</div>
      <div class="metric">Words: ${(p.passage_text || '').split(/\s+/).length}</div>
      <div class="metric">Sentences: ${(p.passage_text || '').split(/[.!?]+/).filter(s => s.trim()).length}</div>
    `).join('')}
  </div>

  <div class="section">
    <h1>ENGLISH QUESTIONS - FULL EXAMPLES (First 30)</h1>
    ${engQ.slice(0, 30).map(q => `
      <div class="q">
        <div style="color:#ff0;margin-bottom:5px">
          Test ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | 
          <span style="color:${q.difficulty_level === 'easy' ? '#0f0' : q.difficulty_level === 'hard' ? '#f00' : '#ff0'}">
            ${q.difficulty_level || 'medium'}
          </span>
        </div>
        
        ${q.context_before ? `<div style="color:#666;margin:5px 0">CONTEXT BEFORE: "${q.context_before}"</div>` : ''}
        ${q.underlined_text ? `<div style="color:#ccc;margin:5px 0">UNDERLINED: <u>${q.underlined_text}</u></div>` : ''}
        ${q.context_after ? `<div style="color:#666;margin:5px 0">CONTEXT AFTER: "${q.context_after}"</div>` : ''}
        
        <div class="stem">${q.question_stem || 'No stem'}</div>
        
        <div class="choice ${q.correct_answer === 'A' ? 'correct' : ''}">A. ${q.choice_a || 'N/A'}</div>
        <div class="choice ${q.correct_answer === 'B' ? 'correct' : ''}">B. ${q.choice_b || 'N/A'}</div>
        <div class="choice ${q.correct_answer === 'C' ? 'correct' : ''}">C. ${q.choice_c || 'N/A'}</div>
        <div class="choice ${q.correct_answer === 'D' ? 'correct' : ''}">D. ${q.choice_d || 'N/A'}</div>
        
        ${q.notes ? `<div style="color:#0ff;margin-top:10px;font-size:9px">NOTES: ${q.notes}</div>` : ''}
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h1>ENGLISH CHOICE ANALYSIS</h1>
    ${(() => {
      const analysis = analyzeChoices(engQ);
      return `
        <div class="metric">Avg Correct Length: ${analysis.avgCorrectLen} chars</div>
        <div class="metric">Avg Wrong Length: ${analysis.avgWrongLen} chars</div>
        <div class="metric">"NO CHANGE" appears: ${analysis.noChangeCount} times</div>
        <div class="metric">"DELETE" appears: ${analysis.deleteCount} times</div>
        <div class="metric">Extreme language in correct: ${analysis.extremeLanguage.correct}</div>
        <div class="metric">Extreme language in wrong: ${analysis.extremeLanguage.wrong}</div>
      `;
    })()}
  </div>
</div>

<div id="math" class="tab-content">
  <div class="section">
    <h1>MATH QUESTIONS - FULL EXAMPLES (First 30)</h1>
    ${mathQ.slice(0, 30).map(q => `
      <div class="q">
        <div style="color:#ff0;margin-bottom:5px">
          Test ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | 
          <span style="color:${q.difficulty_level === 'easy' ? '#0f0' : q.difficulty_level === 'hard' ? '#f00' : '#ff0'}">
            ${q.difficulty_level || 'medium'}
          </span>
          ${q.has_figure ? ' | 📊 HAS FIGURE' : ''}
        </div>
        
        <div class="stem">${q.question_stem || 'No stem'}</div>
        
        <div class="choice ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'correct' : ''}">
          ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'A/F' : 'A/F'}. ${q.choice_a || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'correct' : ''}">
          ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'B/G' : 'B/G'}. ${q.choice_b || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'correct' : ''}">
          ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'C/H' : 'C/H'}. ${q.choice_c || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'correct' : ''}">
          ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'D/J' : 'D/J'}. ${q.choice_d || 'N/A'}
        </div>
        ${q.choice_e ? `<div class="choice ${q.correct_answer === 'E' || q.correct_answer === 'K' ? 'correct' : ''}">
          ${q.correct_answer === 'E' || q.correct_answer === 'K' ? 'E/K' : 'E/K'}. ${q.choice_e}
        </div>` : ''}
        
        ${q.figure_data ? `<pre>FIGURE DATA: ${JSON.stringify(q.figure_data, null, 2)}</pre>` : ''}
        ${q.notes ? `<div style="color:#0ff;margin-top:10px;font-size:9px">NOTES: ${q.notes}</div>` : ''}
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h1>MATH ANSWER SPACING ANALYSIS</h1>
    ${(() => {
      const spacing = analyzeMathAnswerSpacing(mathQ).slice(0, 20);
      return `
        <p style="margin-bottom:10px">Sample of numeric answer patterns (showing first 20):</p>
        <table>
          <tr><th>Choices</th><th>Min Diff</th><th>Max Diff</th><th>Range</th></tr>
          ${spacing.map(s => `
            <tr>
              <td>${s.choices.join(', ')}</td>
              <td>${s.minDiff.toFixed(2)}</td>
              <td>${s.maxDiff.toFixed(2)}</td>
              <td>${s.range.toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
      `;
    })()}
  </div>
</div>

<div id="read" class="tab-content">
  <div class="section">
    <h1>READING FULL PASSAGES</h1>
    ${readP.slice(0, 4).map(p => `
      <h2>Test ${p.test_number}, Passage ${p.passage_number}: ${p.passage_type}</h2>
      <div style="color:#ff0;margin:5px 0">
        ${p.title ? `Title: ${p.title}` : ''}
        ${p.author ? ` | Author: ${p.author}` : ''}
        ${p.source ? ` | Source: ${p.source}` : ''}
      </div>
      ${p.introduction ? `<p style="color:#0ff;margin-bottom:10px">INTRO: ${p.introduction}</p>` : ''}
      <div class="passage">${(p.passage_text || '').replace(/\n/g, '<br>')}</div>
      <div class="metric">Words: ${(p.passage_text || '').split(/\s+/).length}</div>
    `).join('')}
  </div>

  <div class="section">
    <h1>READING QUESTIONS - FULL EXAMPLES (First 30)</h1>
    ${readQ.slice(0, 30).map(q => `
      <div class="q">
        <div style="color:#ff0;margin-bottom:5px">
          Test ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | 
          <span style="color:${q.difficulty_level === 'easy' ? '#0f0' : q.difficulty_level === 'hard' ? '#f00' : '#ff0'}">
            ${q.difficulty_level || 'medium'}
          </span>
        </div>
        
        <div class="stem">${q.question_stem || 'No stem'}</div>
        
        <div class="choice ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'correct' : ''}">
          ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'A/F' : 'A/F'}. ${q.choice_a || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'correct' : ''}">
          ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'B/G' : 'B/G'}. ${q.choice_b || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'correct' : ''}">
          ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'C/H' : 'C/H'}. ${q.choice_c || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'correct' : ''}">
          ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'D/J' : 'D/J'}. ${q.choice_d || 'N/A'}
        </div>
      </div>
    `).join('')}
  </div>

  <div class="section">
    <h1>READING QUESTION WORDING PATTERNS</h1>
    ${(() => {
      const patterns = analyzeWordingPatterns(readQ);
      return `
        <h2>Common Starting Phrases (Top 10):</h2>
        <table>
          <tr><th>Phrase</th><th>Count</th></tr>
          ${Object.entries(patterns.starts).sort((a,b) => b[1] - a[1]).slice(0,10).map(([phrase, count]) => `
            <tr><td>${phrase}</td><td>${count}</td></tr>
          `).join('')}
        </table>
        
        <h2>Common Phrases in Questions:</h2>
        <table>
          <tr><th>Phrase</th><th>Count</th></tr>
          ${Object.entries(patterns.contains).sort((a,b) => b[1] - a[1]).map(([phrase, count]) => `
            <tr><td>${phrase}</td><td>${count}</td></tr>
          `).join('')}
        </table>
      `;
    })()}
  </div>
</div>

<div id="sci" class="tab-content">
  <div class="section">
    <h1>SCIENCE PASSAGES</h1>
    ${sciP.slice(0, 6).map(p => `
      <h2>Test ${p.test_number}, Passage ${p.passage_number}: ${p.passage_type}</h2>
      <div style="color:#ff0">${p.title || 'Untitled'}</div>
      ${p.introduction ? `<p style="color:#0ff;margin:10px 0">INTRO: ${p.introduction}</p>` : ''}
      <div class="passage">${(p.passage_text || '').replace(/\n/g, '<br>')}</div>
      ${p.figures ? `<pre>FIGURES: ${JSON.stringify(p.figures, null, 2)}</pre>` : ''}
    `).join('')}
  </div>

  <div class="section">
    <h1>SCIENCE QUESTIONS - FULL EXAMPLES (First 30)</h1>
    ${sciQ.slice(0, 30).map(q => `
      <div class="q">
        <div style="color:#ff0;margin-bottom:5px">
          Test ${q.test_number} | Q${q.question_number} | ${q.question_type} | ${q.question_category} | 
          <span style="color:${q.difficulty_level === 'easy' ? '#0f0' : q.difficulty_level === 'hard' ? '#f00' : '#ff0'}">
            ${q.difficulty_level || 'medium'}
          </span>
          ${q.has_figure ? ' | 📊 HAS FIGURE' : ''}
        </div>
        
        <div class="stem">${q.question_stem || 'No stem'}</div>
        
        <div class="choice ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'correct' : ''}">
          ${q.correct_answer === 'A' || q.correct_answer === 'F' ? 'A/F' : 'A/F'}. ${q.choice_a || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'correct' : ''}">
          ${q.correct_answer === 'B' || q.correct_answer === 'G' ? 'B/G' : 'B/G'}. ${q.choice_b || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'correct' : ''}">
          ${q.correct_answer === 'C' || q.correct_answer === 'H' ? 'C/H' : 'C/H'}. ${q.choice_c || 'N/A'}
        </div>
        <div class="choice ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'correct' : ''}">
          ${q.correct_answer === 'D' || q.correct_answer === 'J' ? 'D/J' : 'D/J'}. ${q.choice_d || 'N/A'}
        </div>
      </div>
    `).join('')}
  </div>
</div>

<div id="patterns" class="tab-content">
  <div class="section">
    <h1>ACT TRICKS & TRAPS</h1>
    
    <h2>Common Math Traps:</h2>
    <ul style="margin-left:20px;color:#ccc">
      <li>Asks for 2x after solving for x</li>
      <li>Includes common arithmetic errors in wrong answers</li>
      <li>Answer choices are strategically spaced to catch mistakes</li>
      <li>Hard questions have figures ${((mathQ.filter(q => q.difficulty_level === 'hard' && q.has_figure).length / mathQ.filter(q => q.difficulty_level === 'hard').length) * 100).toFixed(1)}% of the time</li>
    </ul>

    <h2>Reading Trap Patterns:</h2>
    <ul style="margin-left:20px;color:#ccc">
      <li>Extreme language (always/never) usually wrong: ${(() => {
        const analysis = analyzeChoices(readQ);
        return `${analysis.extremeLanguage.wrong} wrong vs ${analysis.extremeLanguage.correct} correct`;
      })()}</li>
      <li>Detail questions test specific lines, inference needs reading between lines</li>
    </ul>

    <h2>English Patterns:</h2>
    <ul style="margin-left:20px;color:#ccc">
      <li>"NO CHANGE" appears ${analyzeChoices(engQ).noChangeCount} times total</li>
      <li>"DELETE" appears ${analyzeChoices(engQ).deleteCount} times</li>
      <li>Correct answers avg ${analyzeChoices(engQ).avgCorrectLen} chars, wrong ${analyzeChoices(engQ).avgWrongLen} chars</li>
    </ul>
  </div>
</div>

<script>
function show(tab) {
  document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.getElementById(tab).classList.add('active');
  event.target.classList.add('active');
}
</script>

</body></html>`;

fs.writeFileSync(path.join(__dirname, '../../reports/deep-act-blueprint.html'), html);
console.log('✅ Generated: reports/deep-act-blueprint.html');
console.log('📊 Includes:');
console.log('   - Full passage texts');
console.log('   - Complete question stems + all choices');
console.log('   - Figure data where available');
console.log('   - Answer construction patterns');
console.log('   - Question wording analysis');
console.log('   - ACT tricks and traps\n');
