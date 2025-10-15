import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import * as cheerio from 'cheerio';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

function analyzeContentQuality(html, lessonTitle) {
  const $ = cheerio.load(html, { xmlMode: false, decodeEntities: false });
  const quality = {
    hasIntro: false,
    hasExamples: false,
    hasKeyTakeaway: false,
    h3Count: 0,
    h4Count: 0,
    exampleCount: 0,
    paragraphCount: 0,
    listCount: 0,
    svgCount: 0,
    tableCount: 0,
    wordCount: 0,
    sections: []
  };

  // Check for lesson-intro
  quality.hasIntro = $('.lesson-intro').length > 0;

  // Count elements
  quality.h3Count = $('h3').length;
  quality.h4Count = $('h4').length;
  quality.paragraphCount = $('p').length;
  quality.listCount = $('ul, ol').length;
  quality.svgCount = $('svg').length;
  quality.tableCount = $('table').length;

  // Count words
  quality.wordCount = $('.lesson-content').text().trim().split(/\s+/).length;

  // Check for examples
  $('h4').each(function() {
    const text = $(this).text().trim();
    if (text.match(/Example/i)) {
      quality.exampleCount++;
      quality.hasExamples = true;
    }
    if (text.toLowerCase().includes('key takeaway')) {
      quality.hasKeyTakeaway = true;
    }
  });

  // Collect section headings
  $('h3').each(function() {
    quality.sections.push($(this).text().trim());
  });

  return quality;
}

async function deepQualityAnalysis() {
  console.log('📖 DEEP QUALITY ANALYSIS - Reading Every Lesson Line by Line...\n');
  console.log('='.repeat(70));

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`\nAnalyzing ${lessons.length} math lessons for content quality...\n`);

  let totalWords = 0;
  let totalExamples = 0;
  let totalVisuals = 0;
  let lessonsWithoutIntro = [];
  let lessonsWithoutExamples = [];
  let lessonsWithoutKeyTakeaway = [];

  for (let i = 0; i < lessons.length; i++) {
    const lesson = lessons[i];
    const quality = analyzeContentQuality(lesson.content, lesson.title);

    console.log(`[${i + 1}/35] ${lesson.title}`);
    console.log(`   📝 ${quality.wordCount} words | ${quality.exampleCount} examples | ${quality.svgCount} visuals`);
    console.log(`   Structure: ${quality.h3Count} sections, ${quality.h4Count} subsections`);

    if (quality.sections.length > 0) {
      console.log(`   Sections: ${quality.sections.join(', ')}`);
    }

    // Check for missing elements
    const missing = [];
    if (!quality.hasIntro) {
      missing.push('intro');
      lessonsWithoutIntro.push(lesson.title);
    }
    if (!quality.hasExamples) {
      missing.push('examples');
      lessonsWithoutExamples.push(lesson.title);
    }
    if (!quality.hasKeyTakeaway) {
      missing.push('key takeaway');
      lessonsWithoutKeyTakeaway.push(lesson.title);
    }

    if (missing.length > 0) {
      console.log(`   ⚠️  Missing: ${missing.join(', ')}`);
    } else {
      console.log(`   ✅ Complete structure`);
    }

    // Quality indicators
    if (quality.wordCount < 200) {
      console.log(`   ⚠️  Low word count (< 200 words)`);
    }

    totalWords += quality.wordCount;
    totalExamples += quality.exampleCount;
    totalVisuals += quality.svgCount;

    console.log('');
  }

  console.log('='.repeat(70));
  console.log('\n📊 OVERALL QUALITY METRICS:\n');
  console.log(`   Total word count: ${totalWords.toLocaleString()} words`);
  console.log(`   Average per lesson: ${Math.round(totalWords / lessons.length)} words`);
  console.log(`   Total examples: ${totalExamples}`);
  console.log(`   Average examples per lesson: ${(totalExamples / lessons.length).toFixed(1)}`);
  console.log(`   Total visuals (SVG): ${totalVisuals}`);
  console.log(`   Lessons with visuals: ${lessons.filter((_, i) => analyzeContentQuality(lessons[i].content).svgCount > 0).length}/35`);

  console.log('\n🎯 COMPLETENESS ASSESSMENT:\n');
  console.log(`   Lessons with intro: ${35 - lessonsWithoutIntro.length}/35`);
  console.log(`   Lessons with examples: ${35 - lessonsWithoutExamples.length}/35`);
  console.log(`   Lessons with key takeaway: ${35 - lessonsWithoutKeyTakeaway.length}/35`);

  if (lessonsWithoutIntro.length > 0) {
    console.log('\n   ⚠️  Lessons missing intro:');
    lessonsWithoutIntro.forEach(title => console.log(`      - ${title}`));
  }

  if (lessonsWithoutExamples.length > 0) {
    console.log('\n   ⚠️  Lessons missing examples:');
    lessonsWithoutExamples.forEach(title => console.log(`      - ${title}`));
  }

  if (lessonsWithoutKeyTakeaway.length > 0) {
    console.log('\n   ⚠️  Lessons missing key takeaway:');
    lessonsWithoutKeyTakeaway.forEach(title => console.log(`      - ${title}`));
  }

  console.log('\n' + '='.repeat(70));

  if (lessonsWithoutIntro.length === 0 &&
      lessonsWithoutExamples.length === 0 &&
      lessonsWithoutKeyTakeaway.length === 0) {
    console.log('✅ ALL 35 LESSONS HAVE COMPLETE STRUCTURE!');
  } else {
    const totalIssues = lessonsWithoutIntro.length + lessonsWithoutExamples.length + lessonsWithoutKeyTakeaway.length;
    console.log(`⚠️  ${totalIssues} structural completeness issue(s) found`);
  }

  console.log('='.repeat(70));
}

deepQualityAnalysis();
