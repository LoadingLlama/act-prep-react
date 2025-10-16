import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Comprehensive definitions for lessons 3.4-3.6
const termDefinitions = [
  // Lesson 3.4: Logarithms
  {
    term: 'Logarithms',
    definition: 'The inverse operation of exponentiation. A logarithm answers the question: "To what power must we raise the base to get this number?" For example, log₂(8) = 3 because 2³ = 8.',
    lesson_key: '3.4'
  },
  {
    term: 'logarithm',
    definition: 'The inverse operation of exponentiation. Written as logₐ(x) = y, meaning "a raised to what power equals x?" Answer: y. For example, log₂(8) = 3 because 2³ = 8.',
    lesson_key: '3.4'
  },
  {
    term: 'inverse operation',
    definition: 'An operation that reverses the effect of another operation. For example, subtraction is the inverse of addition, division is the inverse of multiplication, and logarithms are the inverse of exponentiation.',
    lesson_key: '3.4'
  },
  {
    term: 'base',
    definition: 'In logarithms (logₐ(x)), the base is "a" - the number being raised to a power. In exponents (aⁿ), the base is "a" - the number being multiplied by itself. Common bases: 10 (common log), e (natural log), 2 (binary).',
    lesson_key: '3.4'
  },
  {
    term: 'argument',
    definition: 'In logarithms logₐ(x), the argument is "x" - the number you\'re taking the logarithm of. The argument must always be positive (x > 0) because you can\'t raise a positive base to any power and get a negative or zero result.',
    lesson_key: '3.4'
  },
  {
    term: 'result',
    definition: 'The output or answer to a mathematical operation. In logₐ(x) = y, the result is y. In 2³ = 8, the result is 8.',
    lesson_key: '3.4'
  },
  {
    term: 'exponent',
    definition: 'A notation that indicates how many times to multiply a number (the base) by itself. For example, 3⁴ means 3 × 3 × 3 × 3 = 81. In logarithms, the exponent is what you\'re solving for.',
    lesson_key: '3.4'
  },
  {
    term: 'common logarithm',
    definition: 'A logarithm with base 10, written as log(x) or log₁₀(x). For example, log(100) = 2 because 10² = 100. Common logs are useful for scientific notation and orders of magnitude.',
    lesson_key: '3.4'
  },
  {
    term: 'e',
    definition: 'Euler\'s number, approximately 2.71828... A fundamental mathematical constant that appears in exponential growth, compound interest, and calculus. The base of the natural logarithm.',
    lesson_key: '3.4'
  },
  {
    term: 'natural logarithm',
    definition: 'A logarithm with base e (Euler\'s number ≈ 2.718), written as ln(x) or logₑ(x). For example, ln(e²) = 2. Natural logs appear frequently in exponential growth/decay, compound interest, and higher mathematics.',
    lesson_key: '3.4'
  },
  {
    term: 'change of base formula',
    definition: 'A formula to convert logarithms between different bases: logₐ(x) = log(x)/log(a) or ln(x)/ln(a). Useful when your calculator only has log and ln buttons but you need a different base.',
    lesson_key: '3.4'
  },

  // Lesson 3.5: Inequalities
  {
    term: 'Inequalities',
    definition: 'Mathematical statements that compare two expressions using symbols: < (less than), > (greater than), ≤ (less than or equal to), ≥ (greater than or equal to). Unlike equations, inequalities have a range of solutions.',
    lesson_key: '3.5'
  },
  {
    term: 'inequality',
    definition: 'A mathematical statement comparing two expressions with <, >, ≤, or ≥. For example, x > 5 means "x is greater than 5." Solutions include all values that make the inequality true.',
    lesson_key: '3.5'
  },
  {
    term: 'range of solutions',
    definition: 'The set of all values that satisfy an inequality. For example, x > 3 has solutions {3.1, 4, 5, 100, ...}. Often represented on a number line or in interval notation.',
    lesson_key: '3.5'
  },
  {
    term: 'Compound inequalities',
    definition: 'Two or more inequalities combined with "and" or "or." Example: 2 < x < 5 means "x is greater than 2 AND less than 5." Example: x < 1 OR x > 3 means x is in one range or the other.',
    lesson_key: '3.5'
  },
  {
    term: 'system of inequalities',
    definition: 'Two or more inequalities that must all be satisfied simultaneously. Graphically represented as the overlapping shaded region where all inequalities are true. Common in linear programming and optimization.',
    lesson_key: '3.5'
  },
  {
    term: 'overlapping region',
    definition: 'In systems of inequalities, the area on a graph where all inequalities are satisfied simultaneously. This region represents all coordinate pairs (x, y) that make every inequality in the system true.',
    lesson_key: '3.5'
  },

  // Lesson 3.6: Absolute Value
  {
    term: 'Absolute value',
    definition: 'The distance of a number from zero on the number line, always positive or zero. Written as |x|. For example, |5| = 5 and |-5| = 5 because both are 5 units from zero.',
    lesson_key: '3.6'
  },
  {
    term: 'absolute value',
    definition: 'The distance of a number from zero, always non-negative. Denoted |x|. Examples: |3| = 3, |-7| = 7, |0| = 0. Geometrically represents distance, which cannot be negative.',
    lesson_key: '3.6'
  },
  {
    term: 'distance from zero',
    definition: 'How far a number is from 0 on the number line. Always measured as a positive value (or zero). This is exactly what absolute value represents: |x| = distance from x to 0.',
    lesson_key: '3.6'
  },
  {
    term: 'V-shaped graph',
    definition: 'The characteristic shape of an absolute value function y = |x|. The graph forms a "V" with the vertex at the origin (0,0), opening upward. The left side has slope -1, the right side has slope +1.',
    lesson_key: '3.6'
  }
];

async function addTermDefinitions() {
  console.log('\n📚 ADDING DEFINITIONS FOR LESSONS 3.4-3.6');
  console.log('='.repeat(80));
  console.log(`Adding ${termDefinitions.length} definitions\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const def of termDefinitions) {
    try {
      // Check if definition already exists
      const { data: existing } = await supabase
        .from('term_definitions')
        .select('term')
        .eq('term', def.term)
        .eq('lesson_key', def.lesson_key)
        .single();

      if (existing) {
        console.log(`⊘ ${def.term} (already exists)`);
        continue;
      }

      const { error } = await supabase
        .from('term_definitions')
        .insert({
          term: def.term,
          definition: def.definition,
          lesson_key: def.lesson_key
        });

      if (error) {
        console.error(`✗ ${def.term}: ${error.message}`);
        errorCount++;
      } else {
        console.log(`✓ ${def.term}`);
        successCount++;
      }
    } catch (error) {
      console.error(`✗ ${def.term}: ${error.message}`);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(80));
  console.log('📊 SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully added: ${successCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log('='.repeat(80) + '\n');
}

addTermDefinitions();
