import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// Official ACT Math Test Breakdown (2025)
const actMathTopics = {
  preparingForHigherMath: {
    weight: '57-60%',
    subcategories: {
      numberAndQuantity: {
        weight: '7-10%',
        topics: [
          'Real and complex number systems',
          'Integer and rational exponents',
          'Vectors and matrices',
          'Properties of integers (prime, composite, factors, multiples)',
          'Rational numbers, irrational numbers',
          'Absolute value',
          'Scientific notation'
        ]
      },
      algebra: {
        weight: '12-15%',
        topics: [
          'Linear equations and inequalities',
          'Systems of linear equations',
          'Quadratic equations (factoring, quadratic formula)',
          'Polynomial operations and factoring',
          'Rational and radical expressions',
          'Exponential expressions',
          'Absolute value equations and inequalities',
          'Linear inequalities and systems of inequalities'
        ]
      },
      functions: {
        weight: '12-15%',
        topics: [
          'Function definition, notation, and representation',
          'Function evaluation',
          'Domain and range',
          'Function operations (composition, inverse)',
          'Linear functions and their graphs',
          'Quadratic functions and parabolas',
          'Polynomial functions',
          'Exponential and logarithmic functions',
          'Function transformations (shifts, reflections, stretches)'
        ]
      },
      geometry: {
        weight: '12-15%',
        topics: [
          'Angles (complementary, supplementary, vertical)',
          'Properties of parallel and perpendicular lines',
          'Triangles (including special triangles: 30-60-90, 45-45-90)',
          'Pythagorean theorem',
          'Polygons (quadrilaterals, pentagons, etc.)',
          'Circles (area, circumference, arc length, sector area)',
          'Area and perimeter of 2D shapes',
          'Volume and surface area of 3D shapes (prisms, cylinders, pyramids, cones, spheres)',
          'Coordinate geometry (distance, midpoint, slope)',
          'Graphing lines and curves',
          'Transformations (translations, reflections, rotations)'
        ]
      },
      statisticsAndProbability: {
        weight: '8-12%',
        topics: [
          'Mean, median, mode, range',
          'Weighted average',
          'Probability of single and compound events',
          'Counting techniques and combinations',
          'Data interpretation (tables, charts, graphs)',
          'Scatter plots and trend lines',
          'Standard deviation (basic understanding)'
        ]
      }
    }
  },
  integratingEssentialSkills: {
    weight: '40-43%',
    description: 'Synthesizing and applying mathematical concepts in complex problems',
    topics: [
      'Rates and unit conversions',
      'Percentages and percent change',
      'Proportional relationships',
      'Area, volume, and surface area calculations',
      'Multi-step problem solving',
      'Word problems requiring multiple concepts'
    ]
  },
  modeling: {
    description: 'Cross-cutting category involving producing, interpreting, and evaluating models',
    topics: [
      'Creating mathematical models from word problems',
      'Interpreting graphs and tables',
      'Evaluating and improving mathematical models',
      'Real-world applications of math concepts'
    ]
  }
};

// Traditional topic breakdown (older categorization still useful)
const traditionalTopics = {
  preAlgebra: {
    weight: '~23%',
    topics: ['basic arithmetic', 'fractions', 'decimals', 'percentages', 'ratios', 'proportions', 'mean/median/mode']
  },
  elementaryAlgebra: {
    weight: '~17%',
    topics: ['linear equations', 'inequalities', 'substitution', 'factoring simple polynomials']
  },
  intermediateAlgebra: {
    weight: '~15%',
    topics: ['quadratic formula', 'rational expressions', 'radical expressions', 'systems of equations', 'exponents']
  },
  coordinateGeometry: {
    weight: '~15%',
    topics: ['graphing', 'slope', 'distance', 'midpoint', 'conic sections']
  },
  planeGeometry: {
    weight: '~23%',
    topics: ['angles', 'triangles', 'circles', 'polygons', 'area', 'volume', 'perimeter']
  },
  trigonometry: {
    weight: '~7%',
    topics: ['SOH-CAH-TOA', 'trig functions', 'trig identities', 'unit circle basics']
  }
};

async function analyzeMathLessons() {
  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('title');

  if (error) {
    console.error('Error fetching lessons:', error);
    return;
  }

  console.log('========================================');
  console.log('ACT MATH CONTENT ALIGNMENT ANALYSIS');
  console.log('========================================\n');

  console.log('📊 OFFICIAL ACT MATH BREAKDOWN (2025):');
  console.log('  PREPARING FOR HIGHER MATH (57-60%):');
  console.log('    • Number & Quantity: 7-10%');
  console.log('    • Algebra: 12-15%');
  console.log('    • Functions: 12-15%');
  console.log('    • Geometry: 12-15%');
  console.log('    • Statistics & Probability: 8-12%');
  console.log('  INTEGRATING ESSENTIAL SKILLS: 40-43%');
  console.log('  MODELING: Cross-cutting category\n');

  console.log('📚 CURRENT MATH LESSONS IN DATABASE:');
  console.log(`   Total: ${lessons.length} lessons\n`);

  // Analyze each lesson
  for (const lesson of lessons) {
    console.log(`📖 ${lesson.title}`);
    console.log(`   Key: ${lesson.lesson_key}`);
    console.log(`   Length: ${lesson.content.length} chars`);

    // Count sections
    const h3Count = (lesson.content.match(/<h3/g) || []).length;
    console.log(`   Structure: ${h3Count} H3 sections`);

    // Get quiz count
    const { data: quizzes } = await supabase
      .from('quizzes')
      .select('id, title, quiz_type')
      .eq('lesson_id', lesson.id);

    console.log(`   📝 Quizzes: ${quizzes?.length || 0} total`);

    if (quizzes && quizzes.length > 0) {
      const practiceQuizzes = quizzes.filter(q => q.quiz_type === 'practice').length;
      const finalQuizzes = quizzes.filter(q => q.quiz_type === 'final').length;
      if (practiceQuizzes > 0) console.log(`       • ${practiceQuizzes} practice`);
      if (finalQuizzes > 0) console.log(`       • ${finalQuizzes} final`);
    }

    // Check content for key topics
    const contentLower = lesson.content.toLowerCase();
    const titleLower = lesson.title.toLowerCase();
    const keyLower = lesson.lesson_key.toLowerCase();

    // Categorize by ACT topic areas
    let categories = [];

    // Number & Quantity
    if (contentLower.includes('exponent') || contentLower.includes('scientific notation') ||
        contentLower.includes('matrix') || contentLower.includes('vector') ||
        contentLower.includes('complex number') || contentLower.includes('prime') ||
        keyLower.includes('exponent') || keyLower.includes('number')) {
      categories.push('Number & Quantity (7-10%)');
    }

    // Algebra
    if (contentLower.includes('equation') || contentLower.includes('inequality') ||
        contentLower.includes('polynomial') || contentLower.includes('quadratic') ||
        contentLower.includes('linear') || contentLower.includes('factor') ||
        keyLower.includes('algebra') || keyLower.includes('equation')) {
      categories.push('Algebra (12-15%)');
    }

    // Functions
    if (contentLower.includes('function') || contentLower.includes('domain') ||
        contentLower.includes('range') || contentLower.includes('parabola') ||
        contentLower.includes('transformation') || keyLower.includes('function')) {
      categories.push('Functions (12-15%)');
    }

    // Geometry
    if (contentLower.includes('triangle') || contentLower.includes('circle') ||
        contentLower.includes('angle') || contentLower.includes('area') ||
        contentLower.includes('volume') || contentLower.includes('perimeter') ||
        contentLower.includes('polygon') || contentLower.includes('pythagorean') ||
        keyLower.includes('geometry') || keyLower.includes('circle') ||
        keyLower.includes('triangle')) {
      categories.push('Geometry (12-15%)');
    }

    // Statistics & Probability
    if (contentLower.includes('mean') || contentLower.includes('median') ||
        contentLower.includes('mode') || contentLower.includes('probability') ||
        contentLower.includes('average') || contentLower.includes('statistics') ||
        keyLower.includes('stat') || keyLower.includes('prob')) {
      categories.push('Statistics & Probability (8-12%)');
    }

    if (categories.length > 0) {
      console.log(`   ✓ Covers: ${categories.join(', ')}`);
    } else {
      console.log('   ⚠️  Category unclear - needs review');
    }

    console.log('   ---\n');
  }

  console.log('========================================');
  console.log('TOPIC COVERAGE ANALYSIS');
  console.log('========================================\n');

  // Count lessons by category
  const coverage = {
    numberQuantity: 0,
    algebra: 0,
    functions: 0,
    geometry: 0,
    statistics: 0,
    unclear: 0
  };

  for (const lesson of lessons) {
    const contentLower = lesson.content.toLowerCase();
    const keyLower = lesson.lesson_key.toLowerCase();
    let categorized = false;

    if (contentLower.includes('exponent') || contentLower.includes('matrix') ||
        keyLower.includes('exponent') || keyLower.includes('number')) {
      coverage.numberQuantity++;
      categorized = true;
    }

    if (contentLower.includes('equation') || contentLower.includes('inequality') ||
        contentLower.includes('polynomial') || keyLower.includes('algebra')) {
      coverage.algebra++;
      categorized = true;
    }

    if (contentLower.includes('function') || keyLower.includes('function')) {
      coverage.functions++;
      categorized = true;
    }

    if (contentLower.includes('triangle') || contentLower.includes('circle') ||
        contentLower.includes('angle') || contentLower.includes('area') ||
        keyLower.includes('geometry') || keyLower.includes('circle')) {
      coverage.geometry++;
      categorized = true;
    }

    if (contentLower.includes('mean') || contentLower.includes('probability') ||
        contentLower.includes('statistics') || keyLower.includes('stat')) {
      coverage.statistics++;
      categorized = true;
    }

    if (!categorized) {
      coverage.unclear++;
    }
  }

  console.log(`Number & Quantity: ${coverage.numberQuantity} lessons (ACT: 7-10%)`);
  console.log(`Algebra: ${coverage.algebra} lessons (ACT: 12-15%)`);
  console.log(`Functions: ${coverage.functions} lessons (ACT: 12-15%)`);
  console.log(`Geometry: ${coverage.geometry} lessons (ACT: 12-15%)`);
  console.log(`Statistics & Probability: ${coverage.statistics} lessons (ACT: 8-12%)`);
  console.log(`Unclear/Other: ${coverage.unclear} lessons\n`);

  console.log('========================================');
  console.log('KEY ACT MATH TOPICS CHECKLIST');
  console.log('========================================\n');

  // Check for specific high-priority topics
  const topicChecklist = {
    'Linear equations': lessons.some(l => l.content.toLowerCase().includes('linear equation')),
    'Quadratic equations': lessons.some(l => l.content.toLowerCase().includes('quadratic')),
    'Pythagorean theorem': lessons.some(l => l.content.toLowerCase().includes('pythagorean')),
    'Special triangles (30-60-90, 45-45-90)': lessons.some(l => l.content.toLowerCase().includes('45-45-90') || l.content.toLowerCase().includes('30-60-90')),
    'Circles (area, circumference)': lessons.some(l => l.content.toLowerCase().includes('circle') && l.content.toLowerCase().includes('circumference')),
    'Slope and graphing': lessons.some(l => l.content.toLowerCase().includes('slope')),
    'Functions and transformations': lessons.some(l => l.content.toLowerCase().includes('function') && l.content.toLowerCase().includes('transformation')),
    'Exponents and radicals': lessons.some(l => l.content.toLowerCase().includes('exponent') || l.content.toLowerCase().includes('radical')),
    'Mean, median, mode': lessons.some(l => l.content.toLowerCase().includes('mean') || l.content.toLowerCase().includes('median')),
    'Probability basics': lessons.some(l => l.content.toLowerCase().includes('probability')),
    'Trigonometry (SOH-CAH-TOA)': lessons.some(l => l.content.toLowerCase().includes('trigonometry') || l.content.toLowerCase().includes('soh-cah-toa') || l.content.toLowerCase().includes('sine')),
    'Systems of equations': lessons.some(l => l.content.toLowerCase().includes('system') && l.content.toLowerCase().includes('equation')),
    'Inequalities': lessons.some(l => l.content.toLowerCase().includes('inequality')),
    'Factoring': lessons.some(l => l.content.toLowerCase().includes('factor')),
    'Ratios and proportions': lessons.some(l => l.content.toLowerCase().includes('ratio') || l.content.toLowerCase().includes('proportion'))
  };

  for (const [topic, covered] of Object.entries(topicChecklist)) {
    console.log(`${covered ? '✓' : '✗'} ${topic}`);
  }

  console.log('\n========================================');
  console.log('RECOMMENDATIONS');
  console.log('========================================\n');

  const missing = Object.entries(topicChecklist).filter(([_, covered]) => !covered);

  if (missing.length > 0) {
    console.log('⚠️  MISSING TOPICS (High Priority):');
    missing.forEach(([topic]) => console.log(`   • ${topic}`));
    console.log('');
  }

  console.log('📌 Next Steps:');
  console.log('   1. Review all existing lessons for ACT alignment');
  console.log('   2. Add missing high-priority topics');
  console.log('   3. Ensure geometry lessons have visual diagrams');
  console.log('   4. Verify quiz questions match ACT format (4 answer choices)');
  console.log('   5. Add graph/coordinate plane visuals where needed');
}

analyzeMathLessons();
