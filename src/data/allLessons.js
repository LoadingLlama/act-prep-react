// This file will contain ALL lesson content from all 4 JS files
// I need to manually extract and compile all lessons with their complete content

export const allLessons = {
  // English lessons
  'getting-started': {
    title: 'Getting Started with the ACT',
    content: `
      <h3>Welcome to ACT Prep!</h3>
      <p>The ACT is a standardized test that measures your knowledge and skills in English, Mathematics, Reading, and Science. Understanding the test format and developing effective strategies are crucial for success.</p>

      <h3>Test Structure</h3>
      <p>The ACT consists of four main sections:</p>
      <ul>
          <li><strong>English (45 minutes, 75 questions):</strong> Tests grammar, usage, punctuation, and rhetorical skills</li>
          <li><strong>Mathematics (60 minutes, 60 questions):</strong> Covers algebra, geometry, and trigonometry</li>
          <li><strong>Reading (35 minutes, 40 questions):</strong> Tests reading comprehension across various subjects</li>
          <li><strong>Science (35 minutes, 40 questions):</strong> Evaluates interpretation and analysis of scientific data</li>
      </ul>

      <h3>Scoring</h3>
      <p>Each section is scored from 1-36, and your composite score is the average of all four sections. Most colleges consider a score of 20+ competitive, while top universities typically look for scores of 30+.</p>

      <h3>Study Strategy</h3>
      <p>Effective ACT preparation involves:</p>
      <ul>
          <li>Taking a diagnostic test to identify strengths and weaknesses</li>
          <li>Focusing study time on areas that need the most improvement</li>
          <li>Learning test-specific strategies and time management techniques</li>
          <li>Taking multiple practice tests to build stamina and familiarity</li>
          <li>Reviewing mistakes and understanding why correct answers are right</li>
      </ul>

      <p>Remember: consistent, focused practice is more effective than cramming. Start with your weakest areas and gradually build confidence across all sections.</p>
    `
  },

  'sentence-structure': {
    title: 'Chapter 1: Sentence Structure',
    content: `
      <p class="lesson-intro">To conquer the ACT English Test, we first need to identify the different parts of a sentence and know the rules for how they can and cannot be combined.</p>

      <h3>Clauses and Phrases</h3>
      <p>A <strong>clause</strong> is a group of words that contains both a subject and a verb. There are two types of clauses: independent clauses and dependent clauses.</p>

      <div class="concept-box">
          <h4>Independent Clauses</h4>
          <p>An <strong>independent clause</strong> can stand as a sentence by itself. It always has a subject and a verb. The best way to identify an independent clause is to read the sentence and see if you can stop talking at the end. If you can stop, it is a complete sentence and an independent clause.</p>
          <p><strong>Examples of independent clauses:</strong></p>
          <ul>
              <li>The dog chased its tail.</li>
              <li>Monique made some homemade peach scones for breakfast.</li>
              <li>He picked it up.</li>
              <li>The excited child opened up his present.</li>
          </ul>
      </div>

      <div class="concept-box">
          <h4>Dependent Clauses</h4>
          <p>A <strong>dependent clause</strong> cannot stand alone as a complete sentence. Most often, clauses become dependent by adding a subordinating conjunction to the front of the clause.</p>
          <p><strong>Common subordinating conjunctions:</strong> after, although, as, because, before, even though, if, in order to, once, since, though, that, unless, until, whatever, when, whenever, whether, where, while</p>
          <p><strong>Examples of dependent clauses:</strong></p>
          <ul>
              <li>While the dog chased its tail...</li>
              <li>Although Monique made some homemade peach scones for breakfast...</li>
              <li>Since he picked it up...</li>
              <li>When the excited child opened up his present...</li>
          </ul>
      </div>
    `
  },

  'commas': {
    title: 'Chapter 2: Commas - 4 Types',
    content: `
      <p class="lesson-intro">Commas are the most common type of punctuation on the English Test. In order to successfully handle comma questions, we need to become familiar with the 4 types of commas that appear on the ACT.</p>

      <h3>The Four Types of Commas on the ACT</h3>
      <p>So far, we have already discussed the first two types of commas from Chapter 1:</p>

      <div class="concept-box">
          <h4>1. Comma + FANBOYS</h4>
          <p><strong>Correct:</strong> My alarm clock did not go off this morning, so I arrived late at school.</p>
          <p>Use a comma and a FANBOYS (for, and, nor, but, or, yet, so) to join two independent clauses.</p>
      </div>

      <div class="concept-box">
          <h4>2. Dependent clause followed by independent clause</h4>
          <p><strong>Correct:</strong> While electronic music has become very popular, many people still prefer classic rock.</p>
          <p>If a sentence has a dependent clause followed by an independent clause, you must link these with a comma.</p>
      </div>

      <p>Next, we will learn the other 2 types of commas in English and on the ACT:</p>

      <div class="concept-box">
          <h4>3. Unnecessary Information</h4>
          <p>Commas are used to separate unnecessary information from the rest of the sentence. Information is unnecessary if we can remove it without fundamentally changing the meaning of the sentence. Unnecessary information can be as short as a single word or as long as a lengthy phrase.</p>
          <p><strong>Example:</strong> Mrs. Ellison, who is known for giving pop quizzes, is my least favorite teacher.</p>
          <p><strong>Example:</strong> The snowboard in the closet, the one with no stickers on it, needs to be waxed.</p>
          <p><strong>Example:</strong> The basketball team, though, did not mount a comeback this week.</p>
      </div>

      <div class="concept-box">
          <h4>4. Listing</h4>
          <p>Commas are used when listing more than two items and with lists of multiple adjectives modifying the same noun.</p>
          <p><strong>Example:</strong> The group at the picnic table ordered coconut shrimp, hot wings, and onion rings.</p>
          <p><strong>Example:</strong> The old, limping dog still managed to complete the 3-mile hike.</p>
      </div>

      <div class="tip-box">
          <h4>TIP – The "Crossing-Out" Trick</h4>
          <p>For unnecessary information commas, you must be able to completely remove the unnecessary information from the sentence. After removing the unnecessary information, what remains must still be a complete sentence that can stand by itself.</p>
          <p><strong>To test if information is unnecessary:</strong> cross out the information and read the sentence without it. If you can cross out the information and the sentence still reads as a complete sentence, the information is unnecessary and needs to be set apart by a comma or commas.</p>
          <p>Let's test with this sentence: <em>The wooden beam, set at an angle, created an optical illusion.</em></p>
          <p>Crossing out "set at an angle": <em>The wooden beam created an optical illusion.</em> ✓ This works!</p>
      </div>
    `
  },

  // I need to add ALL the other lessons here...
  // This is just a start - I need to extract content from all 4 JS files

  // Placeholder for remaining lessons
  'punctuation': {
    title: 'Chapter 3: Other Punctuation',
    content: `<p>This lesson will cover semicolons, colons, dashes, apostrophes, and quotation marks.</p>`
  },

  // Math lessons placeholders
  'backsolving': {
    title: 'Chapter 1: Backsolving',
    content: `<p>Powerful test-taking trick for working backwards from answer choices.</p>`
  },

  // Reading lessons placeholders
  'reading-intro': {
    title: 'Introduction to the Reading Test',
    content: `<p>What is on the ACT Reading Test and what you'll learn in this course.</p>`
  },

  // Science lessons placeholders
  'science-introduction': {
    title: 'Introduction to Science Test',
    content: `<p>Test format, timing, and question types overview.</p>`
  }
};

// Complete list of all lessons from actcourse.html structure
export const lessonStructure = [
  // Introduction
  { id: 'getting-started', section: 'all', title: 'Getting Started with the ACT', desc: 'Test format, timing, and scoring overview', status: 'completed' },

  // English Section
  { id: 'sentence-structure', section: 'english', title: 'Chapter 1: Sentence Structure', desc: 'Independent clauses, dependent clauses, compound sentences, and comma splices', status: 'completed' },
  { id: 'commas', section: 'english', title: 'Chapter 2: Commas - 4 Types', desc: 'Unnecessary information, names rule, listing commas, and adjective lists', status: 'completed' },
  { id: 'punctuation', section: 'english', title: 'Chapter 3: Other Punctuation', desc: 'Semicolons, colons, dashes, apostrophes, and quotation marks', status: 'in-progress' },
  { id: 'verbs', section: 'english', title: 'Chapter 4: Verbs', desc: 'Subject-verb agreement, verb tense, and irregular verbs', status: 'not-started' },
  { id: 'pronouns', section: 'english', title: 'Chapter 5: Pronouns', desc: 'Pronoun case, who vs. whom, pronoun agreement, and ambiguous pronouns', status: 'not-started' },
  { id: 'modifiers', section: 'english', title: 'Chapter 6: Misplaced Modifiers', desc: 'Identifying and correcting misplaced modifiers in sentences', status: 'not-started' },
  { id: 'parallel-structure', section: 'english', title: 'Chapter 7: Parallel Structure', desc: 'Parallel structure in lists and comparisons', status: 'not-started' },
  { id: 'misc-topics', section: 'english', title: 'Chapter 8: Miscellaneous Topics', desc: 'Commonly confused words, active vs. passive voice, and prepositional idioms', status: 'not-started' },
  { id: 'grammar-review', section: 'english', title: 'Chapter 9: Grammar Review', desc: 'Comprehensive review of all grammar concepts', status: 'not-started' },
  { id: 'redundancy', section: 'english', title: 'Chapter 10: Redundancy & Wordiness', desc: 'Identifying and eliminating redundant and wordy expressions', status: 'not-started' },
  { id: 'word-choice', section: 'english', title: 'Chapter 11: Word Choice', desc: 'Selecting the clearest and most precise words in context', status: 'not-started' },
  { id: 'transitions', section: 'english', title: 'Chapter 12: Transitions', desc: 'Choosing logical transitions between sentences and paragraphs', status: 'not-started' },
  { id: 'which-choice', section: 'english', title: 'Chapter 13: Which Choice Questions', desc: 'Answering specific "which choice" questions about content', status: 'not-started' },
  { id: 'adding-deleting', section: 'english', title: 'Chapter 14: Adding or Deleting Information', desc: 'Determining when to add or delete information from passages', status: 'not-started' },
  { id: 'logical-placement', section: 'english', title: 'Chapter 15: Logical Placement', desc: 'Placing sentences in the most logical order within paragraphs', status: 'not-started' },

  // Math Section - Most Common Topics
  { id: 'backsolving', section: 'math', title: 'Chapter 1: Backsolving', desc: 'Powerful test-taking trick for working backwards from answer choices', status: 'not-started' },
  { id: 'substitution', section: 'math', title: 'Chapter 2: Substitution', desc: 'Test-taking strategy for plugging in values', status: 'not-started' },
  { id: 'geometry-angles', section: 'math', title: 'Chapter 3: Geometry Part 1 - Angles', desc: 'Intersecting lines, parallel lines, interior angles', status: 'not-started' },
  { id: 'geometry-shapes', section: 'math', title: 'Chapter 4: Geometry Part 2 - Shapes', desc: 'Area, volume, right triangles, special triangles', status: 'not-started' },
  { id: 'lines', section: 'math', title: 'Chapter 5: Lines', desc: 'Slope, equations of lines, midpoint, distance formulas', status: 'not-started' },
  { id: 'fractions', section: 'math', title: 'Chapter 6: Fractions', desc: 'Operations with fractions and calculator techniques', status: 'not-started' },
  { id: 'algebra-skills', section: 'math', title: 'Chapter 7: Algebra Skills', desc: 'PEMDAS, negative numbers, combining terms', status: 'not-started' },
  { id: 'number-theory', section: 'math', title: 'Chapter 8: Number Theory', desc: 'Types of numbers, GCD, LCM, solution types', status: 'not-started' },
  { id: 'percentages', section: 'math', title: 'Chapter 9: Percentages', desc: 'Percentage calculations, increase/decrease', status: 'not-started' },
  { id: 'ratios-proportions', section: 'math', title: 'Chapter 10: Ratios and Proportions', desc: 'Ratio problems, proportions, direct/indirect variation', status: 'not-started' },
  { id: 'functions', section: 'math', title: 'Chapter 11: Functions', desc: 'Function notation, composition, domain, range', status: 'not-started' },
  { id: 'statistics-basics', section: 'math', title: 'Chapter 12: Mean, Median, Mode, and Range', desc: 'Basic statistics and weighted averages', status: 'not-started' },
  { id: 'exponents-roots', section: 'math', title: 'Chapter 13: Exponents and Roots', desc: 'Exponent rules and simplifying radicals', status: 'not-started' },

  // Math Section - Common Topics
  { id: 'logarithms', section: 'math', title: 'Chapter 14: Logarithms', desc: 'Logarithm basics and change of base rule', status: 'not-started' },
  { id: 'systems-equations', section: 'math', title: 'Chapter 15: Systems of Equations', desc: 'Elimination, substitution, word problems', status: 'not-started' },
  { id: 'quadratics', section: 'math', title: 'Chapter 16: Quadratics', desc: 'Factoring, quadratic formula, vertex form', status: 'not-started' },
  { id: 'trigonometry', section: 'math', title: 'Chapter 17: Trigonometry', desc: 'SOH-CAH-TOA, unit circle, trig functions', status: 'not-started' },

  // Continue with all other math, reading, and science lessons...
  // (I'll need to add all 50+ lessons here)
];