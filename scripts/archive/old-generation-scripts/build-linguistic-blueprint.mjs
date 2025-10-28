#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY
);

console.log('🔬 Building linguistic blueprint...\n');

const { data: engQ } = await supabase.from('act_english_questions').select('*');
const { data: engP } = await supabase.from('act_english_passages').select('*');
const { data: mathQ } = await supabase.from('act_math_questions').select('*');
const { data: readQ } = await supabase.from('act_reading_questions').select('*');
const { data: readP } = await supabase.from('act_reading_passages').select('*');
const { data: sciQ } = await supabase.from('act_science_questions').select('*');
const { data: sciP } = await supabase.from('act_science_passages').select('*');

console.log(`✓ ${engQ.length} English, ${mathQ.length} Math, ${readQ.length} Reading, ${sciQ.length} Science\n`);

// Linguistic analysis
function analyze(text) {
  if (!text) return { words: 0, sentences: 0, avgWord: 0, avgSent: 0 };
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  return {
    words: words.length,
    sentences: sentences.length,
    avgWord: (words.reduce((s, w) => s + w.length, 0) / words.length || 0).toFixed(1),
    avgSent: (words.length / sentences.length || 0).toFixed(1),
    unique: new Set(words.map(w => w.toLowerCase())).size,
    richness: ((new Set(words.map(w => w.toLowerCase())).size / words.length) * 100 || 0).toFixed(0)
  };
}

// Build comprehensive HTML
const html = `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>ACT Linguistic Blueprint</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font:11px monospace;background:#0a0a0a;color:#e0e0e0;padding:12px}
h1{font-size:14px;font-weight:700;margin:16px 0 8px;color:#fff;border-bottom:1px solid #333;padding-bottom:4px}
table{width:100%;border-collapse:collapse;margin:8px 0 16px;font-size:10px}
th{text-align:left;padding:4px 6px;background:#1a1a1a;border-bottom:1px solid #333;font-weight:600;color:#aaa}
td{padding:4px 6px;border-bottom:1px solid #1a1a1a}
tr:hover{background:#111}
.tab{display:inline-block;padding:6px 12px;margin:2px;background:#1a1a1a;cursor:pointer;border:1px solid #333}
.tab.active{background:#2a2a2a;border-color:#666}
.tab-content{display:none}
.tab-content.active{display:block}
.metric{display:inline-block;margin:4px 8px;padding:4px 8px;background:#1a1a1a;border-left:2px solid #666}
.num{color:#4af;font-weight:600}
.easy{color:#4f4}
.med{color:#fa4}
.hard{color:#f44}
</style>
</head><body>

<div style="margin-bottom:16px">
  <span class="tab active" onclick="show('eng')">ENGLISH</span>
  <span class="tab" onclick="show('math')">MATH</span>
  <span class="tab" onclick="show('read')">READING</span>
  <span class="tab" onclick="show('sci')">SCIENCE</span>
</div>

<div id="eng" class="tab-content active">
  <h1>ENGLISH PASSAGES (${engP.length} passages)</h1>
  <table>
    <tr><th>T</th><th>P</th><th>Title</th><th>Words</th><th>Sent</th><th>AvgW</th><th>AvgS</th><th>Unique</th><th>Rich%</th></tr>
    ${engP.map(p => {
      const a = analyze(p.passage_text);
      return `<tr><td>${p.test_number}</td><td>${p.passage_number}</td><td>${p.title || ''}</td><td class="num">${a.words}</td><td class="num">${a.sentences}</td><td>${a.avgWord}</td><td>${a.avgSent}</td><td>${a.unique}</td><td>${a.richness}%</td></tr>`;
    }).join('')}
  </table>

  <h1>ENGLISH QUESTIONS (${engQ.length} questions)</h1>
  <table>
    <tr><th>T</th><th>Q#</th><th>Type</th><th>Cat</th><th>Diff</th><th>StemL</th><th>UnderL</th><th>CtxL</th><th>ChoiceA</th><th>ChoiceB</th><th>ChoiceC</th><th>ChoiceD</th><th>Ans</th></tr>
    ${engQ.slice(0, 100).map(q => {
      const d = q.difficulty_level || 'med';
      return `<tr><td>${q.test_number}</td><td>${q.question_number}</td><td>${q.question_type}</td><td>${q.question_category}</td><td class="${d}">${d}</td><td class="num">${(q.question_stem || '').length}</td><td class="num">${(q.underlined_text || '').length}</td><td class="num">${((q.context_before || '') + (q.context_after || '')).length}</td><td>${(q.choice_a || '').substring(0,20)}</td><td>${(q.choice_b || '').substring(0,20)}</td><td>${(q.choice_c || '').substring(0,20)}</td><td>${(q.choice_d || '').substring(0,20)}</td><td class="num">${q.correct_answer}</td></tr>`;
    }).join('')}
    <tr><td colspan="13">... showing first 100 of ${engQ.length} questions</td></tr>
  </table>

  <h1>DIFFICULTY BREAKDOWN</h1>
  ${['easy','medium','hard'].map(diff => {
    const qs = engQ.filter(q => (q.difficulty_level || 'medium') === diff);
    const avgStem = (qs.reduce((s,q) => s + (q.question_stem || '').length, 0) / qs.length || 0).toFixed(0);
    const avgCtx = (qs.reduce((s,q) => s + ((q.context_before || '') + (q.context_after || '')).length, 0) / qs.length || 0).toFixed(0);
    const types = {};
    qs.forEach(q => types[q.question_type] = (types[q.question_type] || 0) + 1);
    const top3 = Object.entries(types).sort((a,b) => b[1] - a[1]).slice(0,3).map(([t,c]) => `${t}(${c})`).join(', ');
    return `<div class="metric ${diff}"><strong>${diff.toUpperCase()}</strong>: ${qs.length}q | AvgStem: ${avgStem}ch | AvgCtx: ${avgCtx}ch | Types: ${top3}</div>`;
  }).join('')}
</div>

<div id="math" class="tab-content">
  <h1>MATH QUESTIONS (${mathQ.length} questions)</h1>
  <table>
    <tr><th>T</th><th>Q#</th><th>Type</th><th>Cat</th><th>Diff</th><th>StemL</th><th>Fig?</th><th>ChoiceCount</th><th>Ans</th></tr>
    ${mathQ.slice(0, 100).map(q => {
      const d = q.difficulty_level || 'med';
      const choiceCount = [q.choice_a, q.choice_b, q.choice_c, q.choice_d, q.choice_e].filter(c => c).length;
      return `<tr><td>${q.test_number}</td><td>${q.question_number}</td><td>${q.question_type}</td><td>${q.question_category}</td><td class="${d}">${d}</td><td class="num">${(q.question_stem || '').length}</td><td>${q.has_figure ? '✓' : ''}</td><td>${choiceCount}</td><td class="num">${q.correct_answer}</td></tr>`;
    }).join('')}
    <tr><td colspan="9">... showing first 100 of ${mathQ.length} questions</td></tr>
  </table>

  <h1>DIFFICULTY BREAKDOWN</h1>
  ${['easy','medium','hard'].map(diff => {
    const qs = mathQ.filter(q => (q.difficulty_level || 'medium') === diff);
    const avgStem = (qs.reduce((s,q) => s + (q.question_stem || '').length, 0) / qs.length || 0).toFixed(0);
    const avgQNum = (qs.reduce((s,q) => s + q.question_number, 0) / qs.length || 0).toFixed(1);
    const figPct = ((qs.filter(q => q.has_figure).length / qs.length) * 100 || 0).toFixed(1);
    const types = {};
    qs.forEach(q => types[q.question_type] = (types[q.question_type] || 0) + 1);
    const top3 = Object.entries(types).sort((a,b) => b[1] - a[1]).slice(0,3).map(([t,c]) => `${t}(${c})`).join(', ');
    return `<div class="metric ${diff}"><strong>${diff.toUpperCase()}</strong>: ${qs.length}q | AvgQ#: ${avgQNum} | AvgStem: ${avgStem}ch | Figs: ${figPct}% | Types: ${top3}</div>`;
  }).join('')}
</div>

<div id="read" class="tab-content">
  <h1>READING PASSAGES (${readP.length} passages)</h1>
  <table>
    <tr><th>T</th><th>P</th><th>Type</th><th>Title</th><th>Author</th><th>Words</th><th>Sent</th><th>AvgW</th><th>AvgS</th><th>Rich%</th></tr>
    ${readP.map(p => {
      const a = analyze(p.passage_text);
      return `<tr><td>${p.test_number}</td><td>${p.passage_number}</td><td>${p.passage_type}</td><td>${p.title || ''}</td><td>${p.author || ''}</td><td class="num">${a.words}</td><td class="num">${a.sentences}</td><td>${a.avgWord}</td><td>${a.avgSent}</td><td>${a.richness}%</td></tr>`;
    }).join('')}
  </table>

  <h1>READING QUESTIONS (${readQ.length} questions)</h1>
  <table>
    <tr><th>T</th><th>Q#</th><th>Type</th><th>Cat</th><th>Diff</th><th>StemL</th><th>Ans</th></tr>
    ${readQ.slice(0, 100).map(q => {
      const d = q.difficulty_level || 'med';
      return `<tr><td>${q.test_number}</td><td>${q.question_number}</td><td>${q.question_type}</td><td>${q.question_category}</td><td class="${d}">${d}</td><td class="num">${(q.question_stem || '').length}</td><td class="num">${q.correct_answer}</td></tr>`;
    }).join('')}
    <tr><td colspan="7">... showing first 100 of ${readQ.length} questions</td></tr>
  </table>

  <h1>DIFFICULTY BREAKDOWN</h1>
  ${['easy','medium','hard'].map(diff => {
    const qs = readQ.filter(q => (q.difficulty_level || 'medium') === diff);
    const avgStem = (qs.reduce((s,q) => s + (q.question_stem || '').length, 0) / qs.length || 0).toFixed(0);
    const types = {};
    qs.forEach(q => types[q.question_type] = (types[q.question_type] || 0) + 1);
    const top3 = Object.entries(types).sort((a,b) => b[1] - a[1]).slice(0,3).map(([t,c]) => `${t}(${c})`).join(', ');
    return `<div class="metric ${diff}"><strong>${diff.toUpperCase()}</strong>: ${qs.length}q | AvgStem: ${avgStem}ch | Types: ${top3}</div>`;
  }).join('')}
</div>

<div id="sci" class="tab-content">
  <h1>SCIENCE PASSAGES (${sciP.length} passages)</h1>
  <table>
    <tr><th>T</th><th>P</th><th>Type</th><th>Title</th><th>TextWords</th></tr>
    ${sciP.map(p => {
      const a = analyze(p.passage_text);
      return `<tr><td>${p.test_number}</td><td>${p.passage_number}</td><td>${p.passage_type}</td><td>${p.title || ''}</td><td class="num">${a.words}</td></tr>`;
    }).join('')}
  </table>

  <h1>SCIENCE QUESTIONS (${sciQ.length} questions)</h1>
  <table>
    <tr><th>T</th><th>Q#</th><th>Type</th><th>Cat</th><th>Diff</th><th>StemL</th><th>Fig?</th><th>Ans</th></tr>
    ${sciQ.slice(0, 100).map(q => {
      const d = q.difficulty_level || 'med';
      return `<tr><td>${q.test_number}</td><td>${q.question_number}</td><td>${q.question_type}</td><td>${q.question_category}</td><td class="${d}">${d}</td><td class="num">${(q.question_stem || '').length}</td><td>${q.has_figure ? '✓' : ''}</td><td class="num">${q.correct_answer}</td></tr>`;
    }).join('')}
    <tr><td colspan="8">... showing first 100 of ${sciQ.length} questions</td></tr>
  </table>

  <h1>DIFFICULTY BREAKDOWN</h1>
  ${['easy','medium','hard'].map(diff => {
    const qs = sciQ.filter(q => (q.difficulty_level || 'medium') === diff);
    const avgStem = (qs.reduce((s,q) => s + (q.question_stem || '').length, 0) / qs.length || 0).toFixed(0);
    const types = {};
    qs.forEach(q => types[q.question_type] = (types[q.question_type] || 0) + 1);
    const top3 = Object.entries(types).sort((a,b) => b[1] - a[1]).slice(0,3).map(([t,c]) => `${t}(${c})`).join(', ');
    return `<div class="metric ${diff}"><strong>${diff.toUpperCase()}</strong>: ${qs.length}q | AvgStem: ${avgStem}ch | Types: ${top3}</div>`;
  }).join('')}
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

fs.writeFileSync(path.join(__dirname, '../../reports/linguistic-blueprint.html'), html);
console.log('✅ Generated: reports/linguistic-blueprint.html');
