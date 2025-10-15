/**
 * PROFESSIONAL ACT-STYLE DIAGRAMS for Geometry Angles Lesson
 *
 * Creating 3 high-quality diagrams:
 * 1. Angle Types (acute, right, obtuse, straight)
 * 2. Vertical Angles (intersecting lines showing equality)
 * 3. Parallel Lines with Transversal (corresponding angles)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Helper function for arc paths
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M", start.x, start.y,
    "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
  ].join(" ");
}

function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

// DIAGRAM 1: Angle Types - Professional 4-panel display
function createAngleTypesDiagram() {
  return `<svg width="800" height="200" viewBox="0 0 800 200" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#000"/>
    </marker>
  </defs>

  <!-- ACUTE ANGLE (45°) -->
  <g transform="translate(100, 100)">
    <line x1="0" y1="0" x2="80" y2="0" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="0" y1="0" x2="56.6" y2="-56.6" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="${describeArc(0, 0, 25, 0, 45)}" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="32" y="-8" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle">45°</text>
    <text x="0" y="40" font-family="Times New Roman, serif" font-size="16" fill="#000" text-anchor="middle" font-weight="600">Acute</text>
    <text x="0" y="58" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">&lt; 90°</text>
  </g>

  <!-- RIGHT ANGLE (90°) -->
  <g transform="translate(280, 100)">
    <line x1="0" y1="0" x2="80" y2="0" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="0" y1="0" x2="0" y2="-80" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <rect x="0" y="-15" width="15" height="15" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="25" y="-25" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle">90°</text>
    <text x="0" y="40" font-family="Times New Roman, serif" font-size="16" fill="#000" text-anchor="middle" font-weight="600">Right</text>
    <text x="0" y="58" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">= 90°</text>
  </g>

  <!-- OBTUSE ANGLE (120°) -->
  <g transform="translate(460, 100)">
    <line x1="0" y1="0" x2="80" y2="0" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <line x1="0" y1="0" x2="-40" y2="-69.3" stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"/>
    <path d="${describeArc(0, 0, 30, 0, 120)}" fill="none" stroke="#ef4444" stroke-width="2"/>
    <text x="10" y="-42" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle">120°</text>
    <text x="0" y="40" font-family="Times New Roman, serif" font-size="16" fill="#000" text-anchor="middle" font-weight="600">Obtuse</text>
    <text x="0" y="58" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">&gt; 90°</text>
  </g>

  <!-- STRAIGHT ANGLE (180°) -->
  <g transform="translate(680, 100)">
    <line x1="-60" y1="0" x2="60" y2="0" stroke="#000" stroke-width="2"/>
    <circle cx="-60" cy="0" r="3" fill="#000"/>
    <circle cx="60" cy="0" r="3" fill="#000"/>
    <path d="${describeArc(0, 0, 35, 0, 180)}" fill="none" stroke="#2563eb" stroke-width="2"/>
    <text x="0" y="-45" font-family="Times New Roman, serif" font-size="14" fill="#000" text-anchor="middle">180°</text>
    <text x="0" y="40" font-family="Times New Roman, serif" font-size="16" fill="#000" text-anchor="middle" font-weight="600">Straight</text>
    <text x="0" y="58" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle">= 180°</text>
  </g>
</svg>`;
}

// DIAGRAM 2: Vertical Angles - Clean intersecting lines
function createVerticalAnglesDiagram() {
  return `<svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <!-- Title -->
  <text x="250" y="30" font-family="Times New Roman, serif" font-size="18" fill="#000" text-anchor="middle" font-weight="600">Vertical Angles Are Equal</text>

  <!-- Intersecting lines -->
  <line x1="100" y1="250" x2="400" y2="150" stroke="#000" stroke-width="2.5"/>
  <line x1="100" y1="150" x2="400" y2="250" stroke="#000" stroke-width="2.5"/>

  <!-- Center point -->
  <circle cx="250" cy="200" r="4" fill="#000"/>

  <!-- Angle arcs -->
  <path d="${describeArc(250, 200, 35, 25, 65)}" fill="none" stroke="#2563eb" stroke-width="3"/>
  <path d="${describeArc(250, 200, 35, 205, 245)}" fill="none" stroke="#2563eb" stroke-width="3"/>
  <path d="${describeArc(250, 200, 45, 115, 155)}" fill="none" stroke="#ef4444" stroke-width="3"/>
  <path d="${describeArc(250, 200, 45, 295, 335)}" fill="none" stroke="#ef4444" stroke-width="3"/>

  <!-- Angle labels -->
  <text x="310" y="165" font-family="Times New Roman, serif" font-size="20" fill="#2563eb" text-anchor="middle" font-weight="700">70°</text>
  <text x="190" y="235" font-family="Times New Roman, serif" font-size="20" fill="#2563eb" text-anchor="middle" font-weight="700">70°</text>
  <text x="210" y="165" font-family="Times New Roman, serif" font-size="20" fill="#ef4444" text-anchor="middle" font-weight="700">110°</text>
  <text x="290" y="235" font-family="Times New Roman, serif" font-size="20" fill="#ef4444" text-anchor="middle" font-weight="700">110°</text>

  <!-- Labels -->
  <g transform="translate(250, 320)">
    <circle cx="-50" cy="0" r="8" fill="#2563eb"/>
    <text x="-30" y="5" font-family="Times New Roman, serif" font-size="16" fill="#000">Vertical angles (equal)</text>
  </g>
  <g transform="translate(250, 350)">
    <circle cx="-50" cy="0" r="8" fill="#ef4444"/>
    <text x="-30" y="5" font-family="Times New Roman, serif" font-size="16" fill="#000">Vertical angles (equal)</text>
  </g>

  <!-- Key fact -->
  <text x="250" y="385" font-family="Times New Roman, serif" font-size="14" fill="#666" text-anchor="middle" font-style="italic">Adjacent angles are supplementary: 70° + 110° = 180°</text>
</svg>`;
}

// DIAGRAM 3: Parallel Lines with Transversal - Professional with clear labels
function createParallelLinesDiagram() {
  return `<svg width="600" height="400" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg" style="background: white; max-width: 100%; height: auto;">
  <defs>
    <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <polygon points="0 0, 10 3, 0 6" fill="#000"/>
    </marker>
  </defs>

  <!-- Title -->
  <text x="300" y="30" font-family="Times New Roman, serif" font-size="18" fill="#000" text-anchor="middle" font-weight="600">Parallel Lines Cut by a Transversal</text>

  <!-- Parallel lines -->
  <line x1="50" y1="120" x2="550" y2="120" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow2)"/>
  <line x1="50" y1="280" x2="550" y2="280" stroke="#2563eb" stroke-width="3" marker-end="url(#arrow2)"/>

  <!-- Parallel symbols -->
  <g transform="translate(520, 120)">
    <line x1="-5" y1="-8" x2="-5" y2="8" stroke="#2563eb" stroke-width="2"/>
    <line x1="0" y1="-8" x2="0" y2="8" stroke="#2563eb" stroke-width="2"/>
  </g>
  <g transform="translate(520, 280)">
    <line x1="-5" y1="-8" x2="-5" y2="8" stroke="#2563eb" stroke-width="2"/>
    <line x1="0" y1="-8" x2="0" y2="8" stroke="#2563eb" stroke-width="2"/>
  </g>

  <!-- Transversal -->
  <line x1="200" y1="50" x2="400" y2="350" stroke="#000" stroke-width="2.5" marker-end="url(#arrow2)"/>

  <!-- Angle arcs and labels - Upper intersection -->
  <path d="${describeArc(280, 120, 30, 25, 70)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <text x="315" y="105" font-family="Times New Roman, serif" font-size="18" fill="#10b981" font-weight="700">70°</text>

  <path d="${describeArc(280, 120, 40, 115, 160)}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <text x="235" y="105" font-family="Times New Roman, serif" font-size="18" fill="#ef4444" font-weight="700">110°</text>

  <!-- Angle arcs and labels - Lower intersection -->
  <path d="${describeArc(340, 280, 30, 25, 70)}" fill="none" stroke="#10b981" stroke-width="2.5"/>
  <text x="375" y="265" font-family="Times New Roman, serif" font-size="18" fill="#10b981" font-weight="700">70°</text>

  <path d="${describeArc(340, 280, 40, 115, 160)}" fill="none" stroke="#ef4444" stroke-width="2.5"/>
  <text x="295" y="265" font-family="Times New Roman, serif" font-size="18" fill="#ef4444" font-weight="700">110°</text>

  <!-- Labels -->
  <text x="30" y="115" font-family="Times New Roman, serif" font-size="16" fill="#2563eb" font-weight="600">Line 1</text>
  <text x="30" y="275" font-family="Times New Roman, serif" font-size="16" fill="#2563eb" font-weight="600">Line 2</text>
  <text x="405" y="45" font-family="Times New Roman, serif" font-size="16" fill="#000" font-weight="600">Transversal</text>

  <!-- Key relationships -->
  <g transform="translate(50, 355)">
    <circle cx="0" cy="0" r="8" fill="#10b981"/>
    <text x="15" y="5" font-family="Times New Roman, serif" font-size="15" fill="#000">Corresponding angles are equal (70° = 70°)</text>
  </g>
  <g transform="translate(50, 380)">
    <circle cx="0" cy="0" r="8" fill="#ef4444"/>
    <text x="15" y="5" font-family="Times New Roman, serif" font-size="15" fill="#000">Corresponding angles are equal (110° = 110°)</text>
  </g>
</svg>`;
}

async function updateLesson() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║     REDESIGNING GEOMETRY-ANGLES DIAGRAMS                ║');
  console.log('║     Professional ACT-Style Visuals                      ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Fetch current lesson
  const { data: lesson } = await supabase
    .from('lessons')
    .select('content')
    .eq('lesson_key', 'geometry-angles')
    .single();

  let content = lesson.content;

  console.log('Creating 3 professional diagrams...\n');

  // Generate new diagrams
  const diagram1 = createAngleTypesDiagram();
  const diagram2 = createVerticalAnglesDiagram();
  const diagram3 = createParallelLinesDiagram();

  console.log('✓ Diagram 1: Angle Types (4-panel display)');
  console.log('  - Acute, Right, Obtuse, Straight angles');
  console.log('  - Professional arcs and labels');
  console.log('  - Times New Roman fonts');
  console.log('');

  console.log('✓ Diagram 2: Vertical Angles');
  console.log('  - Clean intersecting lines');
  console.log('  - Color-coded equal angles');
  console.log('  - Shows 70° = 70° and 110° = 110°');
  console.log('');

  console.log('✓ Diagram 3: Parallel Lines with Transversal');
  console.log('  - Professional parallel line markers');
  console.log('  - Corresponding angles clearly labeled');
  console.log('  - Key relationships shown');
  console.log('');

  // Replace SVGs in content
  const svgs = content.match(/<svg[\s\S]*?<\/svg>/g) || [];

  if (svgs.length >= 3) {
    content = content.replace(svgs[0], diagram1);
    content = content.replace(svgs[1], diagram2);
    content = content.replace(svgs[2], diagram3);

    console.log('Replacing old diagrams with new professional ones...');
  } else {
    console.error('❌ Could not find 3 SVG diagrams to replace');
    return false;
  }

  // Update database
  const { error } = await supabase
    .from('lessons')
    .update({
      content: content,
      updated_at: new Date().toISOString()
    })
    .eq('lesson_key', 'geometry-angles');

  if (error) {
    console.error('❌ Error:', error.message);
    return false;
  }

  console.log('\n✅ Successfully updated geometry-angles with professional diagrams!');
  console.log('\nNew diagram features:');
  console.log('  ✓ Clean, professional ACT-style design');
  console.log('  ✓ Times New Roman fonts (ACT authentic)');
  console.log('  ✓ Precise angle measurements with arcs');
  console.log('  ✓ Color-coded for clarity');
  console.log('  ✓ Clear labels and annotations');
  console.log('  ✓ Educational and visually appealing');

  return true;
}

updateLesson().catch(console.error);
