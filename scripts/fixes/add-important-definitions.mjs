import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://rabavobdklnwvwsldbix.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4'
);

console.log('📚 Adding important missing term definitions...\n');

// Important terms to add definitions for
const importantDefinitions = [
  {
    term: 'FANBOYS',
    definition: 'Acronym for coordinating conjunctions: For, And, Nor, But, Or, Yet, So',
    lesson_key: 'sentence-structure'
  },
  {
    term: 'factorials',
    definition: 'The product of an integer and all the integers below it, denoted by n! (e.g., 5! = 5 × 4 × 3 × 2 × 1 = 120)',
    lesson_key: '6.4'
  },
  {
    term: 'permutations',
    definition: 'Arrangements of items where order matters, calculated using nPr = n!/(n-r)!',
    lesson_key: '6.3'
  },
  {
    term: 'combinations',
    definition: 'Selections of items where order does not matter, calculated using nCr = n!/[r!(n-r)!]',
    lesson_key: '6.3'
  },
  {
    term: 'logarithmic form',
    definition: 'Expression written as log_b(x) = y, which is equivalent to the exponential form b^y = x',
    lesson_key: '3.4'
  },
  {
    term: 'exponential form',
    definition: 'Expression written as b^y = x, which is equivalent to the logarithmic form log_b(x) = y',
    lesson_key: '3.4'
  },
  {
    term: 'Density',
    definition: 'Mass per unit volume of a substance, calculated as density = mass/volume',
    lesson_key: 'water-knowledge'
  },
  {
    term: 'axes',
    definition: 'The reference lines (x-axis horizontal, y-axis vertical) used to plot points and data on a graph',
    lesson_key: 'passage-approach'
  },
  {
    term: 'x-axis',
    definition: 'The horizontal reference line on a graph, typically representing the independent variable',
    lesson_key: 'scatter-plots'
  },
  {
    term: 'y-axis',
    definition: 'The vertical reference line on a graph, typically representing the dependent variable',
    lesson_key: 'scatter-plots'
  },
  {
    term: 'Independent variable',
    definition: 'The variable that is deliberately changed or controlled in an experiment',
    lesson_key: 'experimental-setup'
  },
  {
    term: 'Dependent variable',
    definition: 'The variable that is measured or observed in response to changes in the independent variable',
    lesson_key: 'experimental-setup'
  },
  {
    term: 'Controlled variables',
    definition: 'Variables that are kept constant throughout an experiment to ensure a fair test',
    lesson_key: 'experimental-setup'
  },
  {
    term: 'Control group',
    definition: 'The group in an experiment that does not receive the treatment, used as a baseline for comparison',
    lesson_key: 'experimental-setup'
  },
  {
    term: 'radicals',
    definition: 'Expressions containing roots, such as square roots (√) or cube roots (∛)',
    lesson_key: '3.3'
  },
  {
    term: 'prime numbers',
    definition: 'Whole numbers greater than 1 that have exactly two factors: 1 and themselves (e.g., 2, 3, 5, 7, 11)',
    lesson_key: '5.1'
  },
  {
    term: 'irrational numbers',
    definition: 'Numbers that cannot be expressed as a fraction of two integers, with non-repeating, non-terminating decimals (e.g., π, √2)',
    lesson_key: '5.1'
  },
  {
    term: 'proportions',
    definition: 'Equations stating that two ratios are equal (e.g., a/b = c/d)',
    lesson_key: '5.3'
  },
  {
    term: 'repeating decimal',
    definition: 'A decimal number where one or more digits repeat infinitely (e.g., 0.333... or 0.142857142857...)',
    lesson_key: '5.6'
  },
  {
    term: 'composite functions',
    definition: 'The combination of two functions where the output of one function becomes the input of another, written as f(g(x))',
    lesson_key: 'functions'
  },
  {
    term: 'arithmetic sequences',
    definition: 'Sequences where each term is found by adding a constant difference to the previous term',
    lesson_key: 'sequences'
  },
  {
    term: 'geometric sequences',
    definition: 'Sequences where each term is found by multiplying the previous term by a constant ratio',
    lesson_key: 'sequences'
  },
  {
    term: 'complex conjugates',
    definition: 'Pairs of complex numbers of the form (a + bi) and (a - bi), which differ only in the sign of the imaginary part',
    lesson_key: 'complex-numbers'
  },
  {
    term: 'determinant',
    definition: 'A scalar value computed from a square matrix that provides information about the matrix properties',
    lesson_key: 'matrices'
  },
  {
    term: 'outliers',
    definition: 'Data points that lie significantly outside the overall pattern of a dataset',
    lesson_key: 'scatter-plots'
  },
  {
    term: 'correlation',
    definition: 'A statistical relationship between two variables; can be positive, negative, or no correlation',
    lesson_key: 'scatter-plots'
  },
  {
    term: 'Prepositional phrases',
    definition: 'Phrases beginning with a preposition (e.g., "in the house", "on the table") that modify nouns or verbs',
    lesson_key: 'commas'
  },
  {
    term: 'Possessive pronouns',
    definition: 'Pronouns that show ownership (e.g., my, your, his, her, its, our, their)',
    lesson_key: 'pronouns'
  },
  {
    term: 'correlative conjunctions',
    definition: 'Pairs of conjunctions that work together (e.g., either...or, neither...nor, not only...but also)',
    lesson_key: 'parallel-structure'
  },
  {
    term: 'ambiguous',
    definition: 'Unclear or having multiple possible interpretations',
    lesson_key: 'pronouns'
  },
  {
    term: 'Pronouns',
    definition: 'Words that take the place of nouns (e.g., he, she, it, they, who)',
    lesson_key: 'pronouns'
  },
  {
    term: 'Apostrophes',
    definition: 'Punctuation marks (\') used to show possession or form contractions',
    lesson_key: 'punctuation'
  },
  {
    term: 'Contractions',
    definition: 'Shortened forms of words created by combining two words and replacing missing letters with an apostrophe (e.g., don\'t, it\'s)',
    lesson_key: 'punctuation'
  },
  {
    term: 'Idioms',
    definition: 'Fixed expressions whose meaning cannot be deduced from the individual words (e.g., "piece of cake", "break a leg")',
    lesson_key: 'misc-topics'
  }
];

let addedCount = 0;
let errorCount = 0;

for (const def of importantDefinitions) {
  try {
    const { error } = await supabase
      .from('lesson_term_definitions')
      .insert({
        term: def.term,
        definition: def.definition,
        lesson_key: def.lesson_key,
        context: null,
        related_terms: null
      });

    if (error) {
      // Check if it's a duplicate
      if (error.code === '23505') {
        console.log(`  ⊘ "${def.term}" already exists`);
      } else {
        console.log(`  ❌ Error adding "${def.term}": ${error.message}`);
        errorCount++;
      }
    } else {
      console.log(`  ✅ Added "${def.term}"`);
      addedCount++;
    }
  } catch (err) {
    console.log(`  ❌ Exception adding "${def.term}": ${err.message}`);
    errorCount++;
  }
}

console.log('\n' + '='.repeat(60));
console.log('✅ Important Definitions Added');
console.log('='.repeat(60));
console.log(`Added: ${addedCount} definitions`);
console.log(`Errors: ${errorCount}`);
