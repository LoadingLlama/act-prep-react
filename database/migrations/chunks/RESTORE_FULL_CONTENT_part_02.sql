-- ================================================================
-- RESTORE ALL LESSON CONTENT FROM BACKUP
-- ================================================================
-- Backup date: 2025-10-21T19:02:45.951Z
-- Total lessons: 84
-- Total examples: 231
-- ================================================================


      <li style="margin: 0.2rem 0;">r = number of items being selected</li>
      <li style="margin: 0.2rem 0;">nCr = number of ways to select r items from n items</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: How many ways can you select 3 books from a shelf of 5 books?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">n = 5 books, r = 3 books (order doesn''t matter)</li>
      <li style="margin: 0.2rem 0;">5C3 = 5!/(3! × 2!)</li>
      <li style="margin: 0.2rem 0;">5C3 = (5 × 4 × 3 × 2 × 1)/((3 × 2 × 1) × (2 × 1))</li>
      <li style="margin: 0.2rem 0;">5C3 = 120/(6 × 2) = 120/12 = 10</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key difference from permutations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Same problem with permutations gave 60 arrangements</li>
      <li style="margin: 0.2rem 0;">With combinations, we get 10 selections</li>
      <li style="margin: 0.2rem 0;">Combinations are ALWAYS smaller (or equal) to permutations</li>
      <li style="margin: 0.2rem 0;">We divide by r! to remove duplicate orderings</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. When to Use Each Method
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Use <strong>Fundamental Counting Principle</strong> when:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Making multiple independent choices</li>
      <li style="margin: 0.2rem 0;">Creating combinations of items (outfits, meals, codes)</li>
      <li style="margin: 0.2rem 0;">This is the FASTEST method—use it whenever possible!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Use <strong>Permutations</strong> when:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">ORDER MATTERS in the selection</li>
      <li style="margin: 0.2rem 0;">Words: "arrange," "order," "rank," "position"</li>
      <li style="margin: 0.2rem 0;">Examples: Race finish order, seating arrangements, passwords</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Use <strong>Combinations</strong> when:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">ORDER DOESN''T MATTER in the selection</li>
      <li style="margin: 0.2rem 0;">Words: "group," "committee," "team," "select," "choose"</li>
      <li style="margin: 0.2rem 0;">Examples: Choosing committee members, selecting toppings, forming groups</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Quick decision tree:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question asks "how many outfits/meals/codes?" → Fundamental Counting Principle (multiply choices)</li>
      <li style="margin: 0.2rem 0;">Question asks "arrange" or "order" → Permutation (order matters)</li>
      <li style="margin: 0.2rem 0;">Question asks "select" or "choose a group" → Combination (order doesn''t matter)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common ACT trick:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT will often make permutation and combination both answer choices</li>
      <li style="margin: 0.2rem 0;">Read carefully: does order matter?</li>
      <li style="margin: 0.2rem 0;">If you select people for a "committee," order doesn''t matter (combination)</li>
      <li style="margin: 0.2rem 0;">If you select people for "president, VP, secretary," order matters (permutation)</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Factorials: n! = n × (n-1) × ... × 1; most calculators have a "!" button for quick calculation
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Fundamental Counting Principle (MOST COMMON): multiply the number of choices for each decision—use whenever possible!
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Permutations (order matters): nPr = n!/(n-r)!; use for "arrange," "order," "rank," "position" questions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Combinations (order doesn''t matter): nCr = n!/(r!(n-r)!); use for "select," "choose," "group," "committee" questions
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('6.4', 'math', 'Permutations and Combinations', 'Permutations and Combinations...', 'intermediate', 30, 29, '<!-- Topic 6.4: Permutations and Combinations -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
On the ACT, you will encounter "how many" questions such as "how many outfits can a person create with 3 shirts, 4 shoes, and 5 pairs of pants?" or "if a lock code consists of 3 numbers and 2 letters, how many different lock codes are possible?" To successfully answer these questions, you must understand <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">factorials</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">permutations</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">combinations</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">organized counting</strong>. The most common type of counting question on the ACT uses organized counting, which is simpler than permutations and combinations.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Factorials
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">factorial</strong>, symbolized by "!", multiplies an integer by every integer below it
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">5! = 5 × 4 × 3 × 2 × 1 = 120</li>
      <li style="margin: 0.2rem 0;">3! = 3 × 2 × 1 = 6</li>
      <li style="margin: 0.2rem 0;">4! = 4 × 3 × 2 × 1 = 24</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Basic factorial questions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: Find 2! + 4!</li>
      <li style="margin: 0.2rem 0;">2! = 2 × 1 = 2</li>
      <li style="margin: 0.2rem 0;">4! = 4 × 3 × 2 × 1 = 24</li>
      <li style="margin: 0.2rem 0;">2! + 4! = 2 + 24 = 26</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Calculator tip:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Many calculators have a "!" button that can solve factorials for you</li>
      <li style="margin: 0.2rem 0;">Look it up online to see if your calculator has this feature</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Advanced factorial definition:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For a positive integer n: n! = n(n - 1)(n - 2)...(2)(1)</li>
      <li style="margin: 0.2rem 0;">This is the same rule written in mathematical notation</li>
      <li style="margin: 0.2rem 0;">Understanding this is important for advanced factorial questions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Advanced factorial simplification:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When factorials are in fractions, you can cancel common terms</li>
      <li style="margin: 0.2rem 0;">Example: (3!)(n!) / (n+1)!</li>
      <li style="margin: 0.2rem 0;">Expand: (3!)(n)(n-1)...(1) / [(n+1)(n)(n-1)...(1)]</li>
      <li style="margin: 0.2rem 0;">Cancel the n! parts, leaving: 3! / (n+1) = 6 / (n+1)</li>
      <li style="margin: 0.2rem 0;">Tip: Use substitution! Pick n = 2, calculate the numerical answer, then test answer choices</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Permutations (Order Matters)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">In <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">permutations</strong>, the order matters
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If the order in which objects are selected makes the outcome different, use a permutation</li>
      <li style="margin: 0.2rem 0;">Example: Selecting president, vice president, and party planner from 15 students</li>
      <li style="margin: 0.2rem 0;">Alice as president ≠ Bob as president (different outcomes!)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Permutation formula:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">nPr = n! / (n - r)!</li>
      <li style="margin: 0.2rem 0;">n = number of items to choose from</li>
      <li style="margin: 0.2rem 0;">r = number of items we actually choose</li>
      <li style="margin: 0.2rem 0;">Most calculators have nPr programmed in, so you likely don''t need to memorize this formula</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 15 students selecting 3 for president, VP, and party planner
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Order matters (president ≠ VP ≠ party planner)</li>
      <li style="margin: 0.2rem 0;">n = 15 (choosing from 15 students)</li>
      <li style="margin: 0.2rem 0;">r = 3 (choosing 3 students)</li>
      <li style="margin: 0.2rem 0;">15P3 = 15! / (15 - 3)! = 15! / 12! = 2,730</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to use permutations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Assigning people to different roles or positions</li>
      <li style="margin: 0.2rem 0;">Arranging objects in a specific order</li>
      <li style="margin: 0.2rem 0;">Any situation where changing the order changes the outcome</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Combinations (Order Doesn''t Matter)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">In <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">combinations</strong>, the order does NOT matter
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If the order you select objects does not affect the final outcome, use a combination</li>
      <li style="margin: 0.2rem 0;">Example: Andrew inviting 4 friends to a baseball game from 12 friends</li>
      <li style="margin: 0.2rem 0;">Inviting {Alice, Bob, Carol, Dan} = same as inviting {Dan, Alice, Carol, Bob}</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Combination formula:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">nCr = n! / [r!(n - r)!]</li>
      <li style="margin: 0.2rem 0;">n = number of items to choose from</li>
      <li style="margin: 0.2rem 0;">r = number of items we actually choose</li>
      <li style="margin: 0.2rem 0;">Most calculators have nCr programmed in</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Andrew has 12 friends, invites 4 to baseball game
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Order doesn''t matter (same group, different invite order = same outcome)</li>
      <li style="margin: 0.2rem 0;">n = 12 (choosing from 12 friends)</li>
      <li style="margin: 0.2rem 0;">r = 4 (choosing 4 friends)</li>
      <li style="margin: 0.2rem 0;">12C4 = 12! / [4!(12 - 4)!] = 12! / (4! × 8!) = 495</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to use combinations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Selecting a group of people (no specific roles)</li>
      <li style="margin: 0.2rem 0;">Choosing items where order doesn''t matter</li>
      <li style="margin: 0.2rem 0;">Counting pairs or groups</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key difference from permutations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Permutations have MORE outcomes (order matters)</li>
      <li style="margin: 0.2rem 0;">Combinations have FEWER outcomes (order doesn''t matter)</li>
      <li style="margin: 0.2rem 0;">Notice: nCr formula has an extra r! in denominator</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Organized Counting (Most Common!)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Most "how many" questions on the ACT use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">organized counting</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is simpler than permutations and combinations!</li>
      <li style="margin: 0.2rem 0;">Answer "how many choices do I have?" for each position</li>
      <li style="margin: 0.2rem 0;">Then multiply all the choices together</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The organized counting method:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Draw a diagram with positions for each item</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Fill in the number of choices for each position</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Multiply all the numbers together</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Eric''s outfit with 6 shirts, 5 pants, 7 ties, 3 shoes
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw: Shirt × Pants × Tie × Shoes = Total</li>
      <li style="margin: 0.2rem 0;">Fill in: 6 × 5 × 7 × 3 = Total</li>
      <li style="margin: 0.2rem 0;">Calculate: 6 × 5 × 7 × 3 = 630 different outfits</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 7-character code with 2 letters then 5 numbers (can repeat)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw: Letter × Letter × Number × Number × Number × Number × Number = Total</li>
      <li style="margin: 0.2rem 0;">First letter: 26 choices (A-Z)</li>
      <li style="margin: 0.2rem 0;">Second letter: 26 choices (letters can repeat!)</li>
      <li style="margin: 0.2rem 0;">Each number: 10 choices (0-9, numbers can repeat!)</li>
      <li style="margin: 0.2rem 0;">Fill in: 26 × 26 × 10 × 10 × 10 × 10 × 10</li>
      <li style="margin: 0.2rem 0;">Simplify: 26² × 10⁵ = 67,600,000 codes</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 6-character safe code with restrictions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rules: First and last are DIFFERENT letters, 2nd must be 0 or 1, middle spots are any numbers (can repeat)</li>
      <li style="margin: 0.2rem 0;">Draw: Letter × (0 or 1) × Number × Number × Number × Letter = Total</li>
      <li style="margin: 0.2rem 0;">First letter: 26 choices</li>
      <li style="margin: 0.2rem 0;">Second position: 2 choices (0 or 1)</li>
      <li style="margin: 0.2rem 0;">Middle numbers: 10 choices each (can repeat)</li>
      <li style="margin: 0.2rem 0;">Last letter: 25 choices (must be different from first!)</li>
      <li style="margin: 0.2rem 0;">Fill in: 26 × 2 × 10 × 10 × 10 × 25</li>
      <li style="margin: 0.2rem 0;">Calculate: 1,300,000 combinations</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key tips for organized counting:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">ALWAYS draw the diagram—don''t try to do it mentally</li>
      <li style="margin: 0.2rem 0;">Pay attention to "can repeat" vs "must be different"</li>
      <li style="margin: 0.2rem 0;">If items can repeat, use the same number for each position</li>
      <li style="margin: 0.2rem 0;">If items must be different, reduce the count for each subsequent position</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Advanced Counting Problems
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">High five problem (advanced combinations or organized counting)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Problem: 5 players and 1 coach all high five each other once. How many total high fives?</li>
      <li style="margin: 0.2rem 0;"><strong>Method 1 - Combinations:</strong> How many pairs from 6 people?
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">6C2 = 6! / (2! × 4!) = 15 high fives</li>
          <li style="margin: 0.15rem 0;">Order doesn''t matter (A high-fiving B = B high-fiving A)</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Method 2 - Organized Counting:</strong> Count systematically
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Player A high fives 5 others = 5</li>
          <li style="margin: 0.15rem 0;">Player B high fives 4 remaining (already did A) = 4</li>
          <li style="margin: 0.15rem 0;">Player C high fives 3 remaining = 3</li>
          <li style="margin: 0.15rem 0;">Player D high fives 2 remaining = 2</li>
          <li style="margin: 0.15rem 0;">Player E high fives 1 remaining (coach) = 1</li>
          <li style="margin: 0.15rem 0;">Total: 5 + 4 + 3 + 2 + 1 = 15</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Choosing which method to use:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you''re comfortable with combinations: use nCr</li>
      <li style="margin: 0.2rem 0;">If you prefer step-by-step logic: use organized counting</li>
      <li style="margin: 0.2rem 0;">Both methods work—use whichever makes more sense to you!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Advanced counting appears in last 15 questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These problems combine multiple concepts</li>
      <li style="margin: 0.2rem 0;">May involve restrictions, special conditions, or multiple cases</li>
      <li style="margin: 0.2rem 0;">Draw diagrams and work through them step by step</li>
      <li style="margin: 0.2rem 0;">If stuck, try both methods (combinations and organized counting) to see which works</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Key Takeaways
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Factorials multiply an integer by every integer below it (5! = 5 × 4 × 3 × 2 × 1); most calculators have a "!" button to calculate these automatically</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Use permutations (nPr = n!/(n-r)!) when order matters; use combinations (nCr = n!/[r!(n-r)!]) when order doesn''t matter</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">For most ACT counting questions, use organized counting: draw a diagram with positions, fill in the number of choices for each position, then multiply all the numbers together</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Pay close attention to whether items can repeat ("letters can repeat" means same number of choices each time) or must be different (reduce choices for each subsequent position)</li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('systems-equations', 'math', 'Topic 4.1 - Systems of Equations', 'Topic 4.1 - Systems of Equations...', 'intermediate', 30, 41, '<div style="max-width: 55rem; margin: 0 auto; padding: 1rem 1.5rem;">

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
A system of equations is a set of two equations with the same unknowns. The ACT frequently hides systems questions in word problems about tickets, prices, or quantities. This lesson covers elimination, substitution, and the powerful backsolve strategy for complex problems.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. The Elimination Method (When Neither Variable is Isolated)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Key Concept: Elimination works by canceling out one variable</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">We cannot solve an equation with two variables</li>
      <li style="margin: 0.2rem 0;">By making coefficients equal and opposite, one variable cancels when we add equations</li>
      <li style="margin: 0.2rem 0;">This leaves us with one equation and one unknown we can solve</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Step-by-Step Process:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Choose which variable to eliminate (usually the one that''s easiest)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Multiply one or both equations to make coefficients equal and opposite</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Add the equations together (one variable cancels out)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> Solve for the remaining variable</li>
      <li style="margin: 0.2rem 0;"><strong>Step 5:</strong> (If needed) Plug back into either original equation to find the other variable</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: 10x - 4y = 16 and 2x + 4y = 8, solve for y</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Eliminate x (easier because we need to solve for y)</li>
      <li style="margin: 0.2rem 0;">Step 2: Multiply second equation by -5:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 10x - 4y = 16</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• -10x - 20y = -40</li>
      <li style="margin: 0.2rem 0;">Step 3: Add equations (x cancels!):</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• -24y = -24</li>
      <li style="margin: 0.2rem 0;">Step 4: Solve: y = 1</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>When to use Elimination:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Neither variable is already isolated in either equation</li>
      <li style="margin: 0.2rem 0;">Both equations are in standard form (Ax + By = C)</li>
      <li style="margin: 0.2rem 0;">The coefficients are "nice" numbers that make elimination easy</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Pro Tip: Look for coefficients that already match or almost match</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">In the example above, the y-coefficients were already -4 and +4</li>
      <li style="margin: 0.2rem 0;">Sometimes you don''t need to multiply at all - just add or subtract!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. The Substitution Method (When One Variable is Already Isolated)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Key Concept: Substitution replaces a variable with its equivalent expression</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If one variable is already isolated (like y = something), use substitution</li>
      <li style="margin: 0.2rem 0;">Replace that variable in the other equation with the expression</li>
      <li style="margin: 0.2rem 0;">This gives you one equation with one unknown</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Step-by-Step Process:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Identify which variable is already isolated</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Substitute the expression into the other equation</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Solve for the remaining variable</li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> (If needed) Plug back to find the other variable</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: 12x + 8y = 8 and y = 6x - 14, solve for x</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: y is already isolated in the second equation</li>
      <li style="margin: 0.2rem 0;">Step 2: Substitute (6x - 14) for y in the first equation:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 12x + 8(6x - 14) = 8</li>
      <li style="margin: 0.2rem 0;">Step 3: Distribute and solve:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 12x + 48x - 112 = 8</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 60x - 112 = 8</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 60x = 120</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• x = 2</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>When to use Substitution:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">One variable is ALREADY isolated (y = ..., x = ..., etc.)</li>
      <li style="margin: 0.2rem 0;">One variable has a coefficient of 1 or -1 (easy to isolate)</li>
      <li style="margin: 0.2rem 0;">If you see "y = " or "x = " in the problem, use substitution!</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Common Mistake: Forgetting to distribute</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When substituting, make sure to distribute to ALL terms in parentheses</li>
      <li style="margin: 0.2rem 0;">Example: 8(6x - 14) = 48x - 112, NOT 48x - 14 ❌</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Word Problems: Setting Up Systems from Real Situations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Key Concept: The ACT loves to hide systems of equations in word problems</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The hardest part is translating words into equations</li>
      <li style="margin: 0.2rem 0;">Once you have the equations, just use elimination or substitution</li>
      <li style="margin: 0.2rem 0;">Look for TWO different relationships between the same variables</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Common Word Problem Patterns:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Pattern #1: Total + Cost</strong></li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• One equation for total number of items</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• One equation for total cost (price × quantity)</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Pattern #2: Tickets sold</strong></li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• One equation for total tickets</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• One equation for total revenue</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Pattern #3: Two rates</strong></li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Distance = rate × time (two different scenarios)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: Mary buys 42 plants for $108. Tomato plants cost $3, pepper plants cost $2. How many pepper plants?</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Define variables</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Let x = tomato plants, y = pepper plants</li>

      <li style="margin: 0.2rem 0;">Step 2: Write equation for TOTAL plants:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• x + y = 42</li>

      <li style="margin: 0.2rem 0;">Step 3: Write equation for TOTAL cost:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 3x + 2y = 108</li>

      <li style="margin: 0.2rem 0;">Step 4: Use elimination (multiply first equation by -3):</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• -3x - 3y = -126</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 3x + 2y = 108</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Add: -y = -18 → y = 18</li>

      <li style="margin: 0.2rem 0;">Answer: 18 pepper plants</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Pro Tip: Always check which variable the question asks for!</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">In the example above, we need y (pepper plants), not x (tomato plants)</li>
      <li style="margin: 0.2rem 0;">Eliminate the variable you DON''T need to find your answer faster</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Advanced Word Problems with 3+ Unknowns (The Backsolve Strategy)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Key Concept: Questions with 3+ unknowns are MUCH easier if you backsolve</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Setting up and solving 3 equations algebraically takes forever</li>
      <li style="margin: 0.2rem 0;">The answer choices give you the value to test - use them!</li>
      <li style="margin: 0.2rem 0;">This strategy is faster, easier, and less error-prone</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Backsolve Strategy:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Pick an answer choice (start with B or C - they''re usually in the middle)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Use the relationships in the problem to find the other unknowns</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Check if all conditions are satisfied</li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> If it works, you''re done! If not, try another answer</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: Malik has $738 in $1, $5, and $20 bills. He has 5 more $5 bills than $20 bills, and 6 more $1 bills than $5 bills. How many $1 bills?</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answer choices: A) 33  B) 38  C) 48  D) 53</li>

      <li style="margin: 0.2rem 0;">Step 1: Try B) 38 $1 bills</li>

      <li style="margin: 0.2rem 0;">Step 2: Use relationships to find other values:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• He has 6 more $1 bills than $5 bills</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• So $5 bills = 38 - 6 = 32 bills</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• He has 5 more $5 bills than $20 bills</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• So $20 bills = 32 - 5 = 27 bills</li>

      <li style="margin: 0.2rem 0;">Step 3: Check total money:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 38($1) + 32($5) + 27($20)</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• = 38 + 160 + 540</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• = $738 ✓</li>

      <li style="margin: 0.2rem 0;">It works! Answer is B) 38</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Why Backsolve Works Better:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Algebraic solution requires writing 3 equations and complex substitution</li>
      <li style="margin: 0.2rem 0;">Backsolve takes 30 seconds with a calculator</li>
      <li style="margin: 0.2rem 0;">Much less room for algebra errors</li>
      <li style="margin: 0.2rem 0;">The ACT expects you to use this strategy - don''t overcomplicate it!</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>When to Use Backsolve:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">3 or more unknowns</li>
      <li style="margin: 0.2rem 0;">The question asks "how many" and gives you numerical answer choices</li>
      <li style="margin: 0.2rem 0;">Word problems with multiple relationships between variables</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Test-Taking Tips for Systems of Equations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Tip #1: Choose your method based on what''s given</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">See "y = " or "x = "? → Use SUBSTITUTION</li>
      <li style="margin: 0.2rem 0;">Both equations in standard form? → Use ELIMINATION</li>
      <li style="margin: 0.2rem 0;">3+ unknowns with answer choices? → BACKSOLVE</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Tip #2: For word problems, always define your variables first</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Write "Let x = number of tomatoes" at the top</li>
      <li style="margin: 0.2rem 0;">This prevents confusion when writing equations</li>
      <li style="margin: 0.2rem 0;">Double-check which variable the question asks for!</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Tip #3: Look for "total" and "cost" keywords</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"Total items" → x + y = [number]</li>
      <li style="margin: 0.2rem 0;">"Total cost" → [price₁]x + [price₂]y = [total]</li>
      <li style="margin: 0.2rem 0;">These two equations together = classic systems problem</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Tip #4: When backsolving, start with choice B or C</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answer choices are usually in numerical order</li>
      <li style="margin: 0.2rem 0;">If B is too small, try C or D</li>
      <li style="margin: 0.2rem 0;">If B is too large, try A</li>
      <li style="margin: 0.2rem 0;">This narrows down options faster</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Tip #5: Check your answer makes sense</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If Mary bought 42 plants total, pepper plants can''t be 50!</li>
      <li style="margin: 0.2rem 0;">Use logic to eliminate obviously wrong answers</li>
      <li style="margin: 0.2rem 0;">This catches careless errors</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use elimination when neither variable is isolated; use substitution when one variable is already isolated (y = ...)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Word problems require TWO relationships: typically one for "total" and one for "cost" or another constraint
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For problems with 3+ unknowns, BACKSOLVE using answer choices—it''s faster and less error-prone than algebra
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always check which variable the question asks for and make sure to eliminate the right variable to save time
  </li>
</ul>

</div>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('quadratics', 'math', 'Topic 4.2 - Quadratics', 'Topic 4.2 - Quadratics...', 'intermediate', 30, 42, '<div style="max-width: 55rem; margin: 0 auto; padding: 1rem 1.5rem;">

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Quadratics are mathematical expressions containing a term to the second degree, with standard form y = ax² + bx + c. On the ACT, you''ll need to master FOIL, factoring, finding solutions, the quadratic formula, and interpreting graphs. This lesson covers all essential quadratic skills from basic multiplication to advanced discriminant analysis.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Multiplying Binomials and FOIL
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Standard Form of a Quadratic: y = ax² + bx + c</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Quadratics contain a term to the second degree (x²)</li>
      <li style="margin: 0.2rem 0;">You need to be able to multiply, factor, graph, and solve quadratics</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>FOIL: First, Outer, Inner, Last</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is the method for multiplying two binomials</li>
      <li style="margin: 0.2rem 0;"><strong>Example: (2x + 3)(x + 6)</strong></li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• First: 2x · x = 2x²</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Outer: 2x · 6 = 12x</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Inner: 3 · x = 3x</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Last: 3 · 6 = 18</li>
      <li style="margin: 0.2rem 0;">Combine: 2x² + 12x + 3x + 18 = 2x² + 15x + 18</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>CRITICAL: Don''t Forget to FOIL Perfect Squares!</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Common Mistake:</strong> (x + 5)² ≠ x² + 25 ❌</li>
      <li style="margin: 0.2rem 0;"><strong>Correct:</strong> (x + 5)² = (x + 5)(x + 5) = x² + 10x + 25 ✓</li>
      <li style="margin: 0.2rem 0;">You MUST FOIL - don''t just square each term!</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>"Easy to Factor" Quadratics - Memorize These Patterns!</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Perfect Square (Addition):</strong> (x + y)² = x² + 2xy + y²</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: (x + 2)² = x² + 4x + 4</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Perfect Square (Subtraction):</strong> (x - y)² = x² - 2xy + y²</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: (x - 3)² = x² - 6x + 9</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Difference of Squares:</strong> (x + y)(x - y) = x² - y²</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: (x + 6)(x - 6) = x² - 36</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Recognize this pattern! x² - 36 factors to (x + 6)(x - 6)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Backsolve Strategy for Multiplication Problems:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Instead of expanding algebraically, pick a value for x (like x = 2)</li>
      <li style="margin: 0.2rem 0;">Plug it into the original expression to get a number</li>
      <li style="margin: 0.2rem 0;">Then plug x = 2 into each answer choice - whichever matches is correct!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Factoring Quadratics
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Why Factor? To simplify expressions and find solutions/roots</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Factoring is the reverse of FOIL</li>
      <li style="margin: 0.2rem 0;">It lets you find where a quadratic crosses the x-axis</li>
      <li style="margin: 0.2rem 0;">It helps simplify complex fractions with quadratics</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>The "Box" Method for Factoring:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: Factor 3x² - x - 2</li>
      <li style="margin: 0.2rem 0;">Step 1: Place x² term (3x²) in top left, constant (-2) in bottom right</li>
      <li style="margin: 0.2rem 0;">Step 2: Write factors of x² term outside box (3x and x)</li>
      <li style="margin: 0.2rem 0;">Step 3: Find numbers that multiply to -2 (try 2 and -1, or 1 and -2)</li>
      <li style="margin: 0.2rem 0;">Step 4: Place numbers outside box so middle terms add to -x</li>
      <li style="margin: 0.2rem 0;">Step 5: Read factors from outside: (3x + 2)(x - 1)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Recognize "Easy to Factor" patterns FIRST:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">x² - 36 → difference of squares → (x + 6)(x - 6)</li>
      <li style="margin: 0.2rem 0;">x² + 4x + 4 → perfect square → (x + 2)²</li>
      <li style="margin: 0.2rem 0;">x² - 6x + 9 → perfect square → (x - 3)²</li>
      <li style="margin: 0.2rem 0;">These factor instantly if you recognize the pattern!</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Using Factoring to Simplify Fractions:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Factor the numerator and denominator</li>
      <li style="margin: 0.2rem 0;">Cancel common factors</li>
      <li style="margin: 0.2rem 0;">Example: (x² - 7x + 12)/(x - 3) = (x - 3)(x - 4)/(x - 3) = x - 4</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Finding Solutions, Roots, x-intercepts, and Zeros
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>CRITICAL: All these terms mean THE SAME THING!</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Solutions = Roots = x-intercepts = Zeros</li>
      <li style="margin: 0.2rem 0;">They all refer to values of x where f(x) = 0</li>
      <li style="margin: 0.2rem 0;">They are the x-coordinates where the parabola crosses the x-axis</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>How to Find Solutions:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Set the quadratic equal to zero</li>
      <li style="margin: 0.2rem 0;">Step 2: Factor the quadratic</li>
      <li style="margin: 0.2rem 0;">Step 3: Set each factor equal to zero</li>
      <li style="margin: 0.2rem 0;">Step 4: Solve for x in each equation</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: Find roots of f(x) = x² - 11x + 18</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Set equal to zero: x² - 11x + 18 = 0</li>
      <li style="margin: 0.2rem 0;">Step 2: Factor: (x - 2)(x - 9) = 0</li>
      <li style="margin: 0.2rem 0;">Step 3: Set each factor to zero:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• x - 2 = 0  →  x = 2</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• x - 9 = 0  →  x = 9</li>
      <li style="margin: 0.2rem 0;">Solutions: x = 2 and x = 9</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>If You Know One Solution, Find the Other Factor:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If x = 3 is a solution to x² - bx + 12 = 0...</li>
      <li style="margin: 0.2rem 0;">Then (x - 3) is a factor</li>
      <li style="margin: 0.2rem 0;">The other factor must multiply with (x - 3) to give +12 at the end</li>
      <li style="margin: 0.2rem 0;">So: (x - 3)(x - 4) = x² - bx + 12</li>
      <li style="margin: 0.2rem 0;">Other factor is (x - 4)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Graphing Calculator Shortcut:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Graph the quadratic on your calculator</li>
      <li style="margin: 0.2rem 0;">Use "zero" or "root" function to find x-intercepts</li>
      <li style="margin: 0.2rem 0;">This guarantees the correct answer without factoring!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Quadratic Formula and the Discriminant
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>The Quadratic Formula - MEMORIZE THIS!</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For ax² + bx + c = 0:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;"><strong>x = (-b ± √(b² - 4ac)) / (2a)</strong></li>
      <li style="margin: 0.2rem 0;">Use this when the quadratic is NOT easily factorable</li>
      <li style="margin: 0.2rem 0;">Most common on harder questions (30-45)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Step-by-Step with Quadratic Formula:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: Find zeros of f(x) = x² - 8x + 4</li>
      <li style="margin: 0.2rem 0;">Step 1: Identify a = 1, b = -8, c = 4</li>
      <li style="margin: 0.2rem 0;">Step 2: Plug into formula: x = (8 ± √(64 - 16)) / 2</li>
      <li style="margin: 0.2rem 0;">Step 3: Simplify under radical: x = (8 ± √48) / 2</li>
      <li style="margin: 0.2rem 0;">Step 4: Simplify radical: x = (8 ± 4√3) / 2</li>
      <li style="margin: 0.2rem 0;">Step 5: Divide all terms: x = 4 ± 2√3</li>
      <li style="margin: 0.2rem 0;">Solutions: x = 4 + 2√3 and x = 4 - 2√3</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>The Discriminant: b² - 4ac</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is the part UNDER the square root in the quadratic formula</li>
      <li style="margin: 0.2rem 0;">It tells you HOW MANY solutions there are (without solving!)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Discriminant Rules - MEMORIZE THESE:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>b² - 4ac > 0</strong> (positive) → 2 real solutions</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Parabola crosses x-axis at 2 points</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>b² - 4ac = 0</strong> (zero) → 1 real solution</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Parabola touches x-axis at exactly 1 point (vertex on x-axis)</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>b² - 4ac < 0</strong> (negative) → 0 real solutions (2 complex)</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Parabola never crosses x-axis</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Example: How many real roots for 2x² - 7x + 9 = 0?</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Calculate discriminant: b² - 4ac = (-7)² - 4(2)(9)</li>
      <li style="margin: 0.2rem 0;">= 49 - 72 = -23</li>
      <li style="margin: 0.2rem 0;">Since -23 < 0, there are 0 real roots</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Graphing Quadratics and Multiplicity
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Solutions Appear as x-intercepts on the Graph</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When you have a factored form, you can immediately see the x-intercepts</li>
      <li style="margin: 0.2rem 0;">Example: y = (x + 2)(x - 4) has x-intercepts at x = -2 and x = 4</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Multiplicity: The Power of Each Factor</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiplicity tells you HOW the graph behaves at each x-intercept</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Multiplicity = 1:</strong> Graph passes straight through x-axis</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: y = (x + 2)(x - 4)</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 2 solutions at x = -2 and x = 4</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Multiplicity = 2:</strong> Graph bounces at x-axis (touches but doesn''t cross)</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: y = (x - 1)²</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 1 solution at x = 1 (vertex touches x-axis)</li>

      <li style="margin: 0.2rem 0; margin-top: 0.5rem;"><strong>Multiplicity = 3:</strong> Graph flattens and passes through x-axis</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Example: y = (x + 3)³</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• 1 solution at x = -3 (flattens then continues)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Reading Equations from Graphs:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Identify all x-intercepts</li>
      <li style="margin: 0.2rem 0;">Step 2: For each x-intercept, look at the behavior:</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Passes straight through? → Multiplicity 1</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Bounces? → Multiplicity 2 (squared)</li>
      <li style="margin: 0.2rem 0; padding-left: 1rem;">• Flattens? → Multiplicity 3 (cubed)</li>
      <li style="margin: 0.2rem 0;">Step 3: Write the equation with correct powers</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Graphing Calculator Strategy:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If answer choices give you different equations, graph each one!</li>
      <li style="margin: 0.2rem 0;">Whichever graph matches the given graph is the answer</li>
      <li style="margin: 0.2rem 0;">This guarantees correctness (but takes time)</li>
    </ul>
  </li>

  <li style="margin: 0.3rem 0;"><strong>Functions With No Real Solutions:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If parabola never crosses x-axis → no real solutions</li>
      <li style="margin: 0.2rem 0;">Example: f(x) = x² - 2x + 2 (opens up, vertex above x-axis)</li>
      <li style="margin: 0.2rem 0;">Solutions would be complex numbers (imaginary)</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Don''t forget to FOIL perfect squares: (x + 5)² = x² + 10x + 25, NOT x² + 25
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Memorize the three "easy to factor" patterns: perfect square (+ and -) and difference of squares
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Solutions = Roots = x-intercepts = Zeros—they all mean the same thing! Find them by setting f(x) = 0 and factoring
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The discriminant (b² - 4ac) tells you the number of solutions: positive = 2 real, zero = 1 real, negative = 0 real
  </li>
</ul>

</div>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('functions', 'math', 'Topic 4.3 - Functions', 'Topic 4.3 - Functions...', 'intermediate', 30, 43, '<!-- Topic 4.3: Functions -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
A function is a mathematical relationship where each input produces exactly one output. Functions appear frequently on the ACT—you need to know how to evaluate them, combine them using <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">composite functions</strong>, and interpret various function notations.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Function Basics and Evaluation
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The fundamental definition of a function:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For every value of x (the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">input</strong>), there is exactly one value of f(x) (the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">output</strong>)</li>
      <li style="margin: 0.2rem 0;">The input appears inside the parentheses: f(3), f(x), f(a-11)</li>
      <li style="margin: 0.2rem 0;">The output is what f(x) equals after you plug in the input</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to evaluate a function—plug in the input for x:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x) = 5x - 2, then:</li>
      <li style="margin: 0.2rem 0;">f(3) = 5(3) - 2 = 13</li>
      <li style="margin: 0.2rem 0;">f(-2x) = 5(-2x) - 2 = -10x - 2</li>
      <li style="margin: 0.2rem 0;">f(a - 11) = 5(a - 11) - 2 = 5a - 57</li>
      <li style="margin: 0.2rem 0;">The input can be a number, variable, or entire expression—always plug it in for x!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: If f(x) = 3√x + 11, what is f(25)?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Plug 25 in for x: f(25) = 3√25 + 11</li>
      <li style="margin: 0.2rem 0;">Evaluate: 3(5) + 11 = 15 + 11 = 26</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Functions with two variables:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x,y) = 4x - y², what is f(5, 2)?</li>
      <li style="margin: 0.2rem 0;">Plug in 5 for x and 2 for y: f(5,2) = 4(5) - 2² = 20 - 4 = 16</li>
      <li style="margin: 0.2rem 0;">Same concept—just plug each value into its corresponding variable</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Working backwards—finding x when given f(x):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x) = 10x/(x+4) and f(x) = 5, what is x?</li>
      <li style="margin: 0.2rem 0;">Set up equation: 5 = 10x/(x+4)</li>
      <li style="margin: 0.2rem 0;">Cross multiply: 5(x+4) = 10x</li>
      <li style="margin: 0.2rem 0;">Solve: 5x + 20 = 10x → 20 = 5x → x = 4</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Composite Functions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">composite function</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A function written inside another function</li>
      <li style="margin: 0.2rem 0;">Example: f(g(8)) means "plug g(8) into the function f"</li>
      <li style="margin: 0.2rem 0;">The ACT frequently tests these—you need TWO methods to solve</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Method #1: Solve for the composite function first
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x) = 3x + 10 and g(x) = x - 5, find f(g(8))</li>
      <li style="margin: 0.2rem 0;">Step 1: Find f(g(x)) by plugging ALL of g(x) into f</li>
      <li style="margin: 0.2rem 0;">f(g(x)) = 3(x - 5) + 10 = 3x - 15 + 10 = 3x - 5</li>
      <li style="margin: 0.2rem 0;">Step 2: Now plug in 8: f(g(8)) = 3(8) - 5 = 19</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Method #2: Work inside out
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Same problem: If f(x) = 3x + 10 and g(x) = x - 5, find f(g(8))</li>
      <li style="margin: 0.2rem 0;">Step 1: Solve the inside function first: g(8) = 8 - 5 = 3</li>
      <li style="margin: 0.2rem 0;">Step 2: Now f(g(8)) = f(3)</li>
      <li style="margin: 0.2rem 0;">Step 3: Evaluate f(3): f(3) = 3(3) + 10 = 19</li>
      <li style="margin: 0.2rem 0;">Both methods work—use whichever feels more natural!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL: Remember to FOIL when squaring binomials
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x) = 2x² - 7 and g(x) = x + 3, find f(g(x-1))</li>
      <li style="margin: 0.2rem 0;">Step 1: Find g(x-1): g(x-1) = (x-1) + 3 = x + 2</li>
      <li style="margin: 0.2rem 0;">Step 2: Find f(x+2): f(x+2) = 2(x+2)² - 7</li>
      <li style="margin: 0.2rem 0;">Step 3: FOIL the binomial: 2(x² + 4x + 4) - 7</li>
      <li style="margin: 0.2rem 0;">Step 4: Distribute and simplify: 2x² + 8x + 8 - 7 = 2x² + 8x + 1</li>
      <li style="margin: 0.2rem 0;"><strong>Common mistake:</strong> (x+2)² ≠ x² + 4. You MUST multiply it out!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Other Function Notations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT uses different notation styles—memorize these operations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Composite:</strong> (f ∘ g)(x) = f(g(x))</li>
      <li style="margin: 0.2rem 0;"><strong>Sum:</strong> (f + g)(x) = f(x) + g(x)</li>
      <li style="margin: 0.2rem 0;"><strong>Difference:</strong> (f - g)(x) = f(x) - g(x)</li>
      <li style="margin: 0.2rem 0;"><strong>Product:</strong> (fg)(x) = f(x) × g(x)</li>
      <li style="margin: 0.2rem 0;"><strong>Quotient:</strong> (f/g)(x) = f(x) ÷ g(x)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example with product notation:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If f(x) = 2x² + 1 and g(x) = x² - 1, find (fg)(x)</li>
      <li style="margin: 0.2rem 0;">(fg)(x) = f(x) × g(x) = (2x² + 1)(x² - 1)</li>
      <li style="margin: 0.2rem 0;">FOIL: 2x⁴ - 2x² + x² - 1 = 2x⁴ - x² - 1</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Don''t confuse operations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(f ∘ g)(x) means COMPOSITE (plug g into f)</li>
      <li style="margin: 0.2rem 0;">(fg)(x) means MULTIPLY f times g</li>
      <li style="margin: 0.2rem 0;">The little circle "∘" specifically means composite!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Functions on Graphs
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Reading function values from a graph:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">To find f(a), look at x = a on the graph and find the y-value</li>
      <li style="margin: 0.2rem 0;">The point (a, b) means f(a) = b</li>
      <li style="margin: 0.2rem 0;">Example: If the point (3, 7) is on the graph of f, then f(3) = 7</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">vertical line test</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A graph represents a function ONLY if every vertical line crosses it at most once</li>
      <li style="margin: 0.2rem 0;">If a vertical line crosses twice, that x-value has two outputs—NOT a function!</li>
      <li style="margin: 0.2rem 0;">Remember: Each input must have exactly ONE output</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Domain and Range
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Definitions you must know:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Domain:</strong> All possible input values (x-values)</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Range:</strong> All possible output values (y-values or f(x)-values)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Finding domain—what x-values are NOT allowed:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Cannot divide by zero: If f(x) = 1/(x-3), then x ≠ 3</li>
      <li style="margin: 0.2rem 0;">Cannot take square root of negative: If f(x) = √(x+5), then x ≥ -5</li>
      <li style="margin: 0.2rem 0;">The domain is all real numbers EXCEPT these restrictions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Find the domain of f(x) = 1/(x² - 5x + 6)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The function is undefined when the denominator equals zero</li>
      <li style="margin: 0.2rem 0;">Set denominator to zero: x² - 5x + 6 = 0</li>
      <li style="margin: 0.2rem 0;">Factor: (x - 2)(x - 3) = 0</li>
      <li style="margin: 0.2rem 0;">Solutions: x = 2 and x = 3</li>
      <li style="margin: 0.2rem 0;">Domain: All real numbers EXCEPT x = 2 and x = 3</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For composite functions f(g(x)), you can either solve for the composite function first OR work inside out—both methods work!
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Remember to FOIL when squaring binomials: (x+2)² = x² + 4x + 4, NOT x² + 4
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Know your function notations: (f ∘ g)(x) = composite, (fg)(x) = multiply, (f+g)(x) = add, (f-g)(x) = subtract, (f/g)(x) = divide
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Domain is all x-values that work (watch for division by zero and square roots of negatives); range is all possible y-values
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('transforming-functions', 'math', 'Topic 4.4 - Shifting and Transforming Functions', 'Topic 4.4 - Shifting and Transforming Functions...', 'intermediate', 30, 44, '<!-- Topic 4.4: Shifting and Transforming Functions -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Function transformations describe how graphs shift, stretch, compress, or flip in the coordinate plane. All functions—lines, parabolas, cubics—follow the same four transformation rules.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. The Four Transformation Rules
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Rule 1: Numbers inside parentheses shift horizontally</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Adding a number shifts the function LEFT</li>
      <li style="margin: 0.2rem 0;">Subtracting a number shifts the function RIGHT</li>
      <li style="margin: 0.2rem 0;">f(x + 2) shifts 2 units left</li>
      <li style="margin: 0.2rem 0;">f(x - 3) shifts 3 units right</li>
      <li style="margin: 0.2rem 0;"><strong>Warning:</strong> The direction is OPPOSITE the sign!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Rule 2: Numbers outside parentheses shift vertically</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Adding a number shifts the function UP</li>
      <li style="margin: 0.2rem 0;">Subtracting a number shifts the function DOWN</li>
      <li style="margin: 0.2rem 0;">f(x) + 4 shifts 4 units up</li>
      <li style="margin: 0.2rem 0;">f(x) - 5 shifts 5 units down</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Rule 3: Negative sign in front flips vertically</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">-f(x) reflects the function over the x-axis</li>
      <li style="margin: 0.2rem 0;">Every y-value becomes its opposite</li>
      <li style="margin: 0.2rem 0;">If point (3, 5) is on f(x), then (3, -5) is on -f(x)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Rule 4: Coefficients cause vertical stretch or compression</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Coefficient > 1 causes vertical STRETCH</li>
      <li style="margin: 0.2rem 0;">Coefficient < 1 causes vertical COMPRESSION</li>
      <li style="margin: 0.2rem 0;">3f(x) stretches vertically by factor of 3</li>
      <li style="margin: 0.2rem 0;">(1/2)f(x) compresses vertically to half height</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL: These rules work for ALL functions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Memorize the four rules once</li>
      <li style="margin: 0.2rem 0;">Apply them to lines, parabolas, cubics, or any function</li>
      <li style="margin: 0.2rem 0;">The ACT expects you to know these rules cold!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Transforming Lines
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Lines follow all four transformation rules:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For f(x) = x (the basic linear function):</li>
      <li style="margin: 0.2rem 0;">f(x - 1) shifts right 1 unit</li>
      <li style="margin: 0.2rem 0;">f(x) + 3 shifts up 3 units</li>
      <li style="margin: 0.2rem 0;">3f(x) = 3x stretches vertically</li>
      <li style="margin: 0.2rem 0;">-f(x) = -x flips over x-axis</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: The graph of 4x + 2y = 26 is shifted up 4 units. What is the y-coordinate of the new y-intercept?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Convert to slope-intercept form</li>
      <li style="margin: 0.2rem 0;">2y = -4x + 26 → y = -2x + 13</li>
      <li style="margin: 0.2rem 0;">Step 2: Find original y-intercept: (0, 13)</li>
      <li style="margin: 0.2rem 0;">Step 3: Shift up 4 units: 13 + 4 = 17</li>
      <li style="margin: 0.2rem 0;">New y-intercept: (0, 17)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Transforming Parabolas
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Parabolas like f(x) = x² follow the same rules:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Horizontal shifts:</strong></li>
      <li style="margin: 0.2rem 0;">f(x) = (x + 2)² shifts 2 units LEFT (remember: opposite sign!)</li>
      <li style="margin: 0.2rem 0;">f(x) = (x - 3)² shifts 3 units RIGHT</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical shifts:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">f(x) = x² + 1 shifts 1 unit UP</li>
      <li style="margin: 0.2rem 0;">f(x) = x² - 4 shifts 4 units DOWN</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical stretch/compression:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">f(x) = 3x² stretches by factor of 3 (narrower parabola)</li>
      <li style="margin: 0.2rem 0;">f(x) = (1/2)x² compresses to half height (wider parabola)</li>
      <li style="margin: 0.2rem 0;">Stretch makes parabola steeper; compression makes it flatter</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Vertical flip:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">f(x) = -x² flips upside down</li>
      <li style="margin: 0.2rem 0;">Opens downward instead of upward</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Transforming Cubics and Other Functions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Cubic functions like f(x) = x³ follow the same rules:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">f(x) = (x + 2)³ shifts 2 units left</li>
      <li style="margin: 0.2rem 0;">f(x) = x³ + 1 shifts 1 unit up</li>
      <li style="margin: 0.2rem 0;">f(x) = 4x³ stretches vertically by factor of 4</li>
      <li style="margin: 0.2rem 0;">f(x) = -x³ flips over x-axis</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">ANY function follows these rules:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Even if you see an unfamiliar function on the ACT</li>
      <li style="margin: 0.2rem 0;">Apply the same four transformation rules</li>
      <li style="margin: 0.2rem 0;">Inside parentheses → horizontal (opposite sign)</li>
      <li style="margin: 0.2rem 0;">Outside parentheses → vertical (same sign)</li>
      <li style="margin: 0.2rem 0;">Negative in front → flip</li>
      <li style="margin: 0.2rem 0;">Coefficient → stretch or compress</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Combining Multiple Transformations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT often tests multiple transformations at once:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: If f(x) = x², what is g(x) = -2(x + 3)² - 1?</li>
      <li style="margin: 0.2rem 0;">Step 1: Identify each transformation</li>
      <li style="margin: 0.2rem 0;">(x + 3) → shift 3 units left</li>
      <li style="margin: 0.2rem 0;">-2 coefficient → flip AND stretch by factor of 2</li>
      <li style="margin: 0.2rem 0;">- 1 outside → shift 1 unit down</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Combined effect on the graph:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Start with basic parabola f(x) = x²</li>
      <li style="margin: 0.2rem 0;">Shift 3 units left</li>
      <li style="margin: 0.2rem 0;">Flip upside down</li>
      <li style="margin: 0.2rem 0;">Stretch vertically by factor of 2</li>
      <li style="margin: 0.2rem 0;">Shift 1 unit down</li>
      <li style="margin: 0.2rem 0;">Vertex moves from (0, 0) to (-3, -1) and opens downward</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Order of operations matters:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Apply horizontal shifts first (inside parentheses)</li>
      <li style="margin: 0.2rem 0;">Then apply flips and stretches (coefficients)</li>
      <li style="margin: 0.2rem 0;">Finally apply vertical shifts (outside additions/subtractions)</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Numbers inside parentheses shift horizontally with OPPOSITE sign: f(x+2) shifts LEFT 2, f(x-3) shifts RIGHT 3
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Numbers outside parentheses shift vertically with SAME sign: f(x)+4 shifts UP 4, f(x)-5 shifts DOWN 5
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Negative in front flips over x-axis; coefficient >1 stretches vertically; coefficient <1 compresses vertically
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>ALL functions follow these four rules—lines, parabolas, cubics, or any weird function you see on the ACT!
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('exponential-growth', 'math', 'Topic 4.5 - Exponential Growth and Decay', 'Topic 4.5 - Exponential Growth and Decay...', 'intermediate', 30, 45, '<!-- Topic 4.5: Exponential Growth and Decay -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Exponential growth and decay describe quantities that change at a fixed percentage rate over time. Common examples include compound interest, population growth, and depreciation. Understanding the basic formulas is key to solving these questions on the ACT.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Basic Exponential Formulas
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The two standard forms for exponential equations:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Growth:</strong> A = P(1 + r)^t</li>
      <li style="margin: 0.2rem 0;"><strong>Decay:</strong> A = P(1 - r)^t</li>
      <li style="margin: 0.2rem 0;">Where P = <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">initial value</strong> (starting amount)</li>
      <li style="margin: 0.2rem 0;">A = current value (amount after time t)</li>
      <li style="margin: 0.2rem 0;">r = rate of growth or decay (as a decimal)</li>
      <li style="margin: 0.2rem 0;">t = time interval (years, months, etc.)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key difference between growth and decay:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Growth uses (1 + r) → value in parentheses is GREATER than 1</li>
      <li style="margin: 0.2rem 0;">Decay uses (1 - r) → value in parentheses is LESS than 1</li>
      <li style="margin: 0.2rem 0;">This makes the graph curve upward (growth) or downward (decay)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL: Always add or subtract from 1:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For 30% growth rate: Use (1 + 0.30) = 1.30, NOT just 0.30</li>
      <li style="margin: 0.2rem 0;">The "1" represents the original 100% you started with</li>
      <li style="margin: 0.2rem 0;">You''re adding or subtracting the percentage change to/from that 100%</li>
      <li style="margin: 0.2rem 0;">This is the most common mistake students make!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Exponential Growth
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exponential growth</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A quantity increases by a fixed percentage rate over time</li>
      <li style="margin: 0.2rem 0;">The actual numerical increase gets LARGER each time period</li>
      <li style="margin: 0.2rem 0;">Examples: compound interest, population growth, viral spread</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Bank account with $100 earning 8% annual interest
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Formula: A = 100(1 + 0.08)^t = 100(1.08)^t</li>
      <li style="margin: 0.2rem 0;">After 1 year: A = 100(1.08)^1 = $108</li>
      <li style="margin: 0.2rem 0;">After 2 years: A = 100(1.08)^2 = $116.64</li>
      <li style="margin: 0.2rem 0;">Year 1 gain: $8 (8% of $100)</li>
      <li style="margin: 0.2rem 0;">Year 2 gain: $8.64 (8% of $108)</li>
      <li style="margin: 0.2rem 0;">The dollar amount increases even though the rate stays 8%</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Why exponential growth is NOT linear:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The percentage rate is constant, but the dollar amount changes</li>
      <li style="margin: 0.2rem 0;">You earn interest on your interest (compounding)</li>
      <li style="margin: 0.2rem 0;">Graph has upward curve, gets steeper over time</li>
      <li style="margin: 0.2rem 0;">Y-intercept shows the initial value</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example problem: Julia''s bee hive increases by 30% every month. Starting with 50 bees, which equation models the population after m months?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Initial value P = 50 bees</li>
      <li style="margin: 0.2rem 0;">Growth rate r = 30% = 0.30</li>
      <li style="margin: 0.2rem 0;">Time = m months</li>
      <li style="margin: 0.2rem 0;">Formula: B = 50(1 + 0.30)^m = 50(1.3)^m</li>
      <li style="margin: 0.2rem 0;">NOT 50(0.3)^m — must include the "1" for the original 100%!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Exponential Decay
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">exponential decay</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A quantity decreases by a fixed percentage rate over time</li>
      <li style="margin: 0.2rem 0;">The actual numerical decrease gets SMALLER each time period</li>
      <li style="margin: 0.2rem 0;">Examples: depreciation, radioactive decay, population decline</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Car purchased for $20,000 loses 10% of its value each year
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Formula: A = 20,000(1 - 0.10)^t = 20,000(0.90)^t</li>
      <li style="margin: 0.2rem 0;">After 1 year: A = 20,000(0.90)^1 = $18,000</li>
      <li style="margin: 0.2rem 0;">After 2 years: A = 20,000(0.90)^2 = $16,200</li>
      <li style="margin: 0.2rem 0;">Year 1 loss: $2,000 (10% of $20,000)</li>
      <li style="margin: 0.2rem 0;">Year 2 loss: $1,800 (10% of $18,000)</li>
      <li style="margin: 0.2rem 0;">The dollar loss decreases even though the rate stays 10%</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Graph characteristics for decay:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Downward curve, gets flatter over time</li>
      <li style="margin: 0.2rem 0;">Approaches zero but never reaches it</li>
      <li style="margin: 0.2rem 0;">Y-intercept shows initial value</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example problem: A newspaper has 24,000 subscribers and loses 12% per year. How many after 2 years?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Initial value P = 24,000</li>
      <li style="margin: 0.2rem 0;">Decay rate r = 12% = 0.12</li>
      <li style="margin: 0.2rem 0;">Time t = 2 years</li>
      <li style="margin: 0.2rem 0;">Formula: A = 24,000(1 - 0.12)^2</li>
      <li style="margin: 0.2rem 0;">A = 24,000(0.88)^2 = 24,000(0.7744) = 18,585.6</li>
      <li style="margin: 0.2rem 0;">Approximately 18,590 subscribers</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. General Exponential Form
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT sometimes uses <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">general exponential form</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>y = ab^x</strong> where a ≠ 0 and b is positive and b ≠ 1</li>
      <li style="margin: 0.2rem 0;">a = y-intercept (initial value when x = 0)</li>
      <li style="margin: 0.2rem 0;">b = rate of change (growth or decay factor)</li>
      <li style="margin: 0.2rem 0;">x = time interval</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to identify growth vs. decay from the equation:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If <strong>b > 1</strong> → exponential GROWTH (curve goes UP)</li>
      <li style="margin: 0.2rem 0;">If <strong>0 < b < 1</strong> → exponential DECAY (curve goes DOWN)</li>
      <li style="margin: 0.2rem 0;">Just look at the base b to determine the type!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example 1 (Growth): Population of 150 rhinos doubles every year
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Initial value a = 150</li>
      <li style="margin: 0.2rem 0;">Doubles means multiply by 2, so b = 2</li>
      <li style="margin: 0.2rem 0;">Equation: P(x) = 150(2)^x</li>
      <li style="margin: 0.2rem 0;">Since b = 2 > 1, this is GROWTH</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example 2 (Decay): After pollution, one-third of fish survive each month. Initial population 12,000.
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Initial value a = 12,000</li>
      <li style="margin: 0.2rem 0;">One-third survive means b = 1/3</li>
      <li style="margin: 0.2rem 0;">Equation: F(x) = 12,000(1/3)^x</li>
      <li style="margin: 0.2rem 0;">Since b = 1/3 < 1, this is DECAY</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Common ACT Question Types
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question Type 1: Write the equation
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Given a scenario, identify the correct formula</li>
      <li style="margin: 0.2rem 0;">Step 1: Identify initial value P</li>
      <li style="margin: 0.2rem 0;">Step 2: Convert percentage to decimal for rate r</li>
      <li style="margin: 0.2rem 0;">Step 3: Determine if growth (1 + r) or decay (1 - r)</li>
      <li style="margin: 0.2rem 0;">Step 4: Write A = P(1 ± r)^t</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Question Type 2: Calculate final value
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Given initial value, rate, and time</li>
      <li style="margin: 0.2rem 0;">Plug values into formula</li>
      <li style="margin: 0.2rem 0;">Use calculator to evaluate</li>
      <li style="margin: 0.2rem 0;">Watch for "closest to" language—round appropriately</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Question Type 3: Interpret the graph
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Upward curve = growth</li>
      <li style="margin: 0.2rem 0;">Downward curve = decay</li>
      <li style="margin: 0.2rem 0;">Y-intercept = initial value</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Question Type 4: Distinguish exponential from linear
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Linear: "increases by 30 every month" → constant amount</li>
      <li style="margin: 0.2rem 0;">Exponential: "increases by 30% every month" → constant percentage</li>
      <li style="margin: 0.2rem 0;">Watch for the % symbol!</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Growth uses A = P(1+r)^t with (1+r) > 1; decay uses A = P(1-r)^t with (1-r) < 1—always include the "1" for original 100%!
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For 30% growth, use (1 + 0.30) = 1.30 NOT 0.30 alone—this is the most common mistake on exponential questions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>In general form y = ab^x, check b to identify type: b > 1 means growth (upward curve), 0 < b < 1 means decay (downward curve)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Exponential is NOT linear—constant percentage rate produces changing dollar amounts; y-intercept always shows initial value
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('sequences', 'math', 'Topic 4.6 - Sequences', 'Topic 4.6 - Sequences...', 'intermediate', 30, 46, '<!-- Topic 4.6: Sequences -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Sequences are ordered lists of numbers following specific patterns. The ACT tests three types: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">arithmetic sequences</strong> (add/subtract a constant), <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">geometric sequences</strong> (multiply/divide by a constant), and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">recursive sequences</strong> (each term defined by previous terms).
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Arithmetic Sequences
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is an <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">arithmetic sequence</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Uses addition or subtraction between consecutive terms</li>
      <li style="margin: 0.2rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">common difference</strong> (d) is constant</li>
      <li style="margin: 0.2rem 0;">Example: 4, 8, 12, 16, 20, 24...</li>
      <li style="margin: 0.2rem 0;">Common difference d = +4 (add 4 each time)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Finding later terms—the visual method:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">ALWAYS draw out the sequence first</li>
      <li style="margin: 0.2rem 0;">Fill in the values you know</li>
      <li style="margin: 0.2rem 0;">Count how many "jumps" between known terms</li>
      <li style="margin: 0.2rem 0;">Divide total difference by number of jumps to find d</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 1st term is 3, 4th term is 24. Find the 5th term.
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw: 3 → ? → ? → 24 → ?</li>
      <li style="margin: 0.2rem 0;">From 1st to 4th term = 3 jumps</li>
      <li style="margin: 0.2rem 0;">Total difference: 24 - 3 = 21</li>
      <li style="margin: 0.2rem 0;">Common difference: d = 21 ÷ 3 = 7</li>
      <li style="margin: 0.2rem 0;">5th term: 24 + 7 = 31</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The arithmetic sequence formula (for far-away terms):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>t_n = t_1 + d(n - 1)</strong></li>
      <li style="margin: 0.2rem 0;">Where t_1 = first term</li>
      <li style="margin: 0.2rem 0;">d = common difference</li>
      <li style="margin: 0.2rem 0;">n = term number you want</li>
      <li style="margin: 0.2rem 0;">t_n = the nth term</li>
      <li style="margin: 0.2rem 0;">MEMORIZE this formula for test day!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example using the formula: Find the 88th term if t_1 = 3 and d = 7
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">t_88 = 3 + 7(88 - 1)</li>
      <li style="margin: 0.2rem 0;">t_88 = 3 + 7(87)</li>
      <li style="margin: 0.2rem 0;">t_88 = 3 + 609 = 612</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Geometric Sequences
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">geometric sequence</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Uses multiplication or division between consecutive terms</li>
      <li style="margin: 0.2rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">common ratio</strong> (r) is constant</li>
      <li style="margin: 0.2rem 0;">Example: 3, 6, 12, 24, 48, 96...</li>
      <li style="margin: 0.2rem 0;">Common ratio r = ×2 (multiply by 2 each time)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Finding the common ratio:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Divide any term by the previous term</li>
      <li style="margin: 0.2rem 0;">r = (2nd term) ÷ (1st term)</li>
      <li style="margin: 0.2rem 0;">Example: If t_1 = 560 and t_2 = -280</li>
      <li style="margin: 0.2rem 0;">r = -280 ÷ 560 = -1/2</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Finding later terms—multiply repeatedly:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Given t_1 = 560 and r = -1/2, find t_5</li>
      <li style="margin: 0.2rem 0;">t_1 = 560</li>
      <li style="margin: 0.2rem 0;">t_2 = 560 × (-1/2) = -280</li>
      <li style="margin: 0.2rem 0;">t_3 = -280 × (-1/2) = 140</li>
      <li style="margin: 0.2rem 0;">t_4 = 140 × (-1/2) = -70</li>
      <li style="margin: 0.2rem 0;">t_5 = -70 × (-1/2) = 35</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The geometric sequence formula (for far-away terms):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>t_n = t_1 × r^(n-1)</strong></li>
      <li style="margin: 0.2rem 0;">Where t_1 = first term</li>
      <li style="margin: 0.2rem 0;">r = common ratio</li>
      <li style="margin: 0.2rem 0;">n = term number you want</li>
      <li style="margin: 0.2rem 0;">t_n = the nth term</li>
      <li style="margin: 0.2rem 0;">MEMORIZE this formula too!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example using the formula: Find t_5 if t_1 = 560 and r = -1/2
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">t_5 = 560 × (-1/2)^(5-1)</li>
      <li style="margin: 0.2rem 0;">t_5 = 560 × (-1/2)^4</li>
      <li style="margin: 0.2rem 0;">t_5 = 560 × (1/16) = 35</li>
      <li style="margin: 0.2rem 0;">Note: (-1/2)^4 is positive because even exponent!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Recursive Sequences
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">recursive sequence</strong>?
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Each term is defined using one or more previous terms</li>
      <li style="margin: 0.2rem 0;">The rule tells you how to get the next term</li>
      <li style="margin: 0.2rem 0;">You MUST work forward term by term—no shortcuts!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common recursive notation:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">s_n = the nth term</li>
      <li style="margin: 0.2rem 0;">s_(n-1) = the previous term (one before s_n)</li>
      <li style="margin: 0.2rem 0;">s_(n-2) = two terms before s_n</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example 1: s_n = 3s_(n-1) + 2, with s_1 = 4. Find s_3.
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Find s_2 using s_1</li>
      <li style="margin: 0.2rem 0;">s_2 = 3s_1 + 2 = 3(4) + 2 = 14</li>
      <li style="margin: 0.2rem 0;">Step 2: Find s_3 using s_2</li>
      <li style="margin: 0.2rem 0;">s_3 = 3s_2 + 2 = 3(14) + 2 = 44</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example 2 (Fibonacci-style): s_n = s_(n-1) + s_(n-2), with s_1 = 1 and s_2 = 1. Find s_5.
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">s_1 = 1 (given)</li>
      <li style="margin: 0.2rem 0;">s_2 = 1 (given)</li>
      <li style="margin: 0.2rem 0;">s_3 = s_2 + s_1 = 1 + 1 = 2</li>
      <li style="margin: 0.2rem 0;">s_4 = s_3 + s_2 = 2 + 1 = 3</li>
      <li style="margin: 0.2rem 0;">s_5 = s_4 + s_3 = 3 + 2 = 5</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL: You cannot skip ahead with recursive sequences
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Must calculate each term in order</li>
      <li style="margin: 0.2rem 0;">Work forward from the given initial term(s)</li>
      <li style="margin: 0.2rem 0;">No formula to jump directly to term 88!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Identifying Sequence Types
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategy 1: Check the differences
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Subtract consecutive terms: t_2 - t_1, t_3 - t_2, etc.</li>
      <li style="margin: 0.2rem 0;">If differences are constant → arithmetic sequence</li>
      <li style="margin: 0.2rem 0;">Example: 5, 9, 13, 17 → differences are 4, 4, 4 → arithmetic with d = 4</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Strategy 2: Check the ratios
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Divide consecutive terms: t_2 ÷ t_1, t_3 ÷ t_2, etc.</li>
      <li style="margin: 0.2rem 0;">If ratios are constant → geometric sequence</li>
      <li style="margin: 0.2rem 0;">Example: 2, 6, 18, 54 → ratios are 3, 3, 3 → geometric with r = 3</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Strategy 3: Look for a recursive formula
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you see notation like s_n = f(s_(n-1)) → recursive</li>
      <li style="margin: 0.2rem 0;">Build the sequence term by term from initial value(s)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Test-Taking Tips for Sequences
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For arithmetic sequences:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw the sequence and fill in known values</li>
      <li style="margin: 0.2rem 0;">Count jumps between terms to find common difference</li>
      <li style="margin: 0.2rem 0;">Use formula t_n = t_1 + d(n-1) only for far-away terms</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For geometric sequences:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find common ratio by dividing consecutive terms</li>
      <li style="margin: 0.2rem 0;">For nearby terms, multiply repeatedly</li>
      <li style="margin: 0.2rem 0;">Use formula t_n = t_1 × r^(n-1) for far-away terms</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For recursive sequences:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Work forward term by term from initial value</li>
      <li style="margin: 0.2rem 0;">Write out each term as you calculate it</li>
      <li style="margin: 0.2rem 0;">Cannot skip ahead—must do every step!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Memorize both formulas:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Arithmetic: t_n = t_1 + d(n-1)</li>
      <li style="margin: 0.2rem 0;">Geometric: t_n = t_1 × r^(n-1)</li>
      <li style="margin: 0.2rem 0;">Both have (n-1) because you start from first term!</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Arithmetic sequences add/subtract constant d; use formula t_n = t_1 + d(n-1) for far-away terms
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Geometric sequences multiply/divide by constant r; use formula t_n = t_1 × r^(n-1) for far-away terms
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Recursive sequences define each term using previous terms (like s_n = 3s_(n-1) + 2)—must work forward term by term, no shortcuts
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>To identify type, check differences first (constant → arithmetic), then ratios (constant → geometric), otherwise recursive
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('trigonometry', 'math', 'Topic 7.1 - Trigonometry', 'Topic 7.1 - Trigonometry...', 'intermediate', 30, 71, '<!-- Topic 7.1: Trigonometry -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Trigonometry appears 4-6 times on the ACT Math test. Most questions test basic <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">SOH-CAH-TOA</strong> relationships, using trig to find side lengths, inverse trig functions, the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pythagorean identity</strong>, and graphing sine/cosine functions.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Basic Trigonometry (SOH-CAH-TOA)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">SOH-CAH-TOA</strong> - Memorize this acronym:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>SOH:</strong> Sine = Opposite / Hypotenuse</li>
      <li style="margin: 0.2rem 0;"><strong>CAH:</strong> Cosine = Adjacent / Hypotenuse</li>
      <li style="margin: 0.2rem 0;"><strong>TOA:</strong> Tangent = Opposite / Adjacent</li>
      <li style="margin: 0.2rem 0;">ONLY works for right triangles!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Triangle with sides 9, 12, 15 (hypotenuse)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If opposite = 9 and adjacent = 12:</li>
      <li style="margin: 0.2rem 0;">sin(x) = 9/15</li>
      <li style="margin: 0.2rem 0;">cos(x) = 12/15</li>
      <li style="margin: 0.2rem 0;">tan(x) = 9/12</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Finding trig values when third side is unknown:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pythagorean theorem</strong>: a² + b² = c²</li>
      <li style="margin: 0.2rem 0;">Example: If hypotenuse = 7, one leg = 4, find other leg</li>
      <li style="margin: 0.2rem 0;">4² + b² = 7²</li>
      <li style="margin: 0.2rem 0;">16 + b² = 49</li>
      <li style="margin: 0.2rem 0;">b² = 33 → b = √33</li>
      <li style="margin: 0.2rem 0;">Then: tan(A) = 4/√33</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Drawing your own right triangle:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If no triangle given, sketch one!</li>
      <li style="margin: 0.2rem 0;">Example: If sin(q) = 9/15 and tan(q) = 9/12</li>
      <li style="margin: 0.2rem 0;">Label opposite = 9, hypotenuse = 15 (from sine)</li>
      <li style="margin: 0.2rem 0;">Label adjacent = 12 (from tangent)</li>
      <li style="margin: 0.2rem 0;">Then find cos(q) = 12/15</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Reciprocal Trig Functions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Three reciprocal functions (flip the fraction):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Cosecant (csc):</strong> Reciprocal of sine</li>
      <li style="margin: 0.2rem 0;">csc(x) = Hypotenuse / Opposite</li>
      <li style="margin: 0.2rem 0;"><strong>Secant (sec):</strong> Reciprocal of cosine</li>
      <li style="margin: 0.2rem 0;">sec(x) = Hypotenuse / Adjacent</li>
      <li style="margin: 0.2rem 0;"><strong>Cotangent (cot):</strong> Reciprocal of tangent</li>
      <li style="margin: 0.2rem 0;">cot(x) = Adjacent / Opposite</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Find sec(q) if tan(q) = 15/13
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw triangle: opposite = 15, adjacent = 13</li>
      <li style="margin: 0.2rem 0;">Find hypotenuse: 13² + 15² = c²</li>
      <li style="margin: 0.2rem 0;">169 + 225 = c² → c² = 394 → c = √394</li>
      <li style="margin: 0.2rem 0;">sec(q) = Hypotenuse / Adjacent = √394 / 13</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Shortcut for secant and cosecant:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find cos(q) first, then flip to get sec(q)</li>
      <li style="margin: 0.2rem 0;">Find sin(q) first, then flip to get csc(q)</li>
      <li style="margin: 0.2rem 0;">Often faster than finding hypotenuse</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Using Trig to Find Side Lengths
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Setting up equations to solve for unknown sides:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Identify which trig function relates given info to unknown</li>
      <li style="margin: 0.2rem 0;">Set up equation using SOH-CAH-TOA</li>
      <li style="margin: 0.2rem 0;">Solve algebraically for the unknown</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Triangle with angle 67°, hypotenuse = 9, find opposite side x
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use sine (opposite and hypotenuse)</li>
      <li style="margin: 0.2rem 0;">sin(67°) = x / 9</li>
      <li style="margin: 0.2rem 0;">Multiply both sides by 9: x = 9 sin(67°)</li>
      <li style="margin: 0.2rem 0;">To find numerical value: x ≈ 8.28</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL: Calculator mode matters!
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Angles in degrees → use DEGREE mode</li>
      <li style="margin: 0.2rem 0;">Angles in radians → use RADIAN mode</li>
      <li style="margin: 0.2rem 0;">Wrong mode gives completely wrong answer!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When given trig value instead of angle:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: cos(B) = 2/3 and AB = 6, find AC</li>
      <li style="margin: 0.2rem 0;">cos(B) = Adjacent / Hypotenuse = BC / 6</li>
      <li style="margin: 0.2rem 0;">Set equal: BC / 6 = 2/3</li>
      <li style="margin: 0.2rem 0;">Solve: BC = 4</li>
      <li style="margin: 0.2rem 0;">Use Pythagorean theorem for other side</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Inverse Trigonometric Functions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">inverse trig functions</strong> do:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find an unknown angle when side lengths are known</li>
      <li style="margin: 0.2rem 0;">SOH-CAH-TOA flipped: angle is on one side, ratio on other</li>
      <li style="margin: 0.2rem 0;">Written as: sin⁻¹, cos⁻¹, tan⁻¹ (or arcsin, arccos, arctan)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The three inverse functions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">sin⁻¹(Opposite / Hypotenuse) = angle</li>
      <li style="margin: 0.2rem 0;">cos⁻¹(Adjacent / Hypotenuse) = angle</li>
      <li style="margin: 0.2rem 0;">tan⁻¹(Opposite / Adjacent) = angle</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Triangle with opposite = 30, hypotenuse = 55, find angle A
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use sine (opposite and hypotenuse)</li>
      <li style="margin: 0.2rem 0;">sin(A) = 30 / 55</li>
      <li style="margin: 0.2rem 0;">Angle A = sin⁻¹(30/55)</li>
      <li style="margin: 0.2rem 0;">ACT usually gives answer choices with inverse trig notation</li>
      <li style="margin: 0.2rem 0;">If needed numerically: A ≈ 33.1°</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key difference from regular trig:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Regular: sin(67°) = 0.92 (angle → ratio)</li>
      <li style="margin: 0.2rem 0;">Inverse: sin⁻¹(0.92) = 67° (ratio → angle)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. The Pythagorean Identity
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Pythagorean identity</strong> (MUST memorize):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">sin²(θ) + cos²(θ) = 1</li>
      <li style="margin: 0.2rem 0;">True for ALL angles θ</li>
      <li style="margin: 0.2rem 0;">Whenever you see sin² or cos², use this identity</li>
      <li style="margin: 0.2rem 0;">Do NOT think of SOH-CAH-TOA for these problems</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: If 3sin²(θ) + 3cos²(θ) = a, find a
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Factor out 3: 3(sin²(θ) + cos²(θ)) = a</li>
      <li style="margin: 0.2rem 0;">Use identity: sin²(θ) + cos²(θ) = 1</li>
      <li style="margin: 0.2rem 0;">Substitute: 3(1) = a</li>
      <li style="margin: 0.2rem 0;">Therefore: a = 3</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Alternative: Substitution method
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Pick any value for θ (like 30° or 45°)</li>
      <li style="margin: 0.2rem 0;">Plug into calculator: 3sin²(30°) + 3cos²(30°)</li>
      <li style="margin: 0.2rem 0;">Will always equal 3, no matter what angle!</li>
      <li style="margin: 0.2rem 0;">This verifies the identity</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Graphing Sine and Cosine Functions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Sine and cosine are <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">periodic functions</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">They repeat over and over again infinitely</li>
      <li style="margin: 0.2rem 0;">X-axis usually labeled in radians (π radians = 180°)</li>
      <li style="margin: 0.2rem 0;">Common to see: 0, π/2, π, 3π/2, 2π</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Basic cosine function: f(x) = cos(x)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Starts at maximum when x = 0 (point (0, 1))</li>
      <li style="margin: 0.2rem 0;">Decreases to minimum at x = π (point (π, -1))</li>
      <li style="margin: 0.2rem 0;">Returns to maximum at x = 2π (point (2π, 1))</li>
      <li style="margin: 0.2rem 0;">Pattern repeats every 2π</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Basic sine function: f(x) = sin(x)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Starts at midline when x = 0 (point (0, 0))</li>
      <li style="margin: 0.2rem 0;">Increases to maximum at x = π/2 (point (π/2, 1))</li>
      <li style="margin: 0.2rem 0;">Returns to 0 at x = π</li>
      <li style="margin: 0.2rem 0;">Decreases to minimum at x = 3π/2 (point (3π/2, -1))</li>
      <li style="margin: 0.2rem 0;">Returns to 0 at x = 2π, pattern repeats</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Amplitude</strong> - height of the function:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Defined by |A| where A is the coefficient</li>
      <li style="margin: 0.2rem 0;">f(x) = A cos(x) or f(x) = A sin(x)</li>
      <li style="margin: 0.2rem 0;">Example: f(x) = 4cos(x) has amplitude 4</li>
      <li style="margin: 0.2rem 0;">Graph goes from -4 to +4 instead of -1 to +1</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Period</strong> - how long before pattern repeats:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Standard period for sin and cos is 2π</li>
      <li style="margin: 0.2rem 0;">Period = 2π / |B| where B is inside the function</li>
      <li style="margin: 0.2rem 0;">f(x) = cos(Bx) or f(x) = sin(Bx)</li>
      <li style="margin: 0.2rem 0;">Example: f(x) = sin(2x) has period 2π/2 = π</li>
      <li style="margin: 0.2rem 0;">Completes full cycle twice as fast (shorter period)</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Memorize SOH-CAH-TOA: sin = Opposite/Hypotenuse, cos = Adjacent/Hypotenuse, tan = Opposite/Adjacent (right triangles only)
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Reciprocal functions: csc = 1/sin, sec = 1/cos, cot = 1/tan; find original function first, then flip
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Pythagorean identity: sin²(θ) + cos²(θ) = 1 for all angles; use whenever you see sin² or cos² terms
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Graphing: cos starts at max, sin starts at 0; amplitude = |A|, period = 2π/|B|; check calculator mode (degree vs radian)
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('complex-numbers', 'math', 'Topic 7.2 - Complex Numbers', 'Topic 7.2 - Complex Numbers...', 'intermediate', 30, 72, '<!-- Topic 7.2: Complex Numbers -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Complex numbers combine real and imaginary components in the form a + bi, where i = √(-1). The ACT tests adding, subtracting, multiplying complex numbers, using <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">complex conjugates</strong>, powers of i, and occasionally the complex plane.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Understanding Complex Numbers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Basic form and definition:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Complex number: a + bi</li>
      <li style="margin: 0.2rem 0;">a = real part (real number)</li>
      <li style="margin: 0.2rem 0;">b = imaginary part (coefficient of i)</li>
      <li style="margin: 0.2rem 0;">i = imaginary unit, defined as i = √(-1)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Critical property to memorize:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">i² = -1</li>
      <li style="margin: 0.2rem 0;">This is used constantly when multiplying complex numbers</li>
      <li style="margin: 0.2rem 0;">Example: 3i² = 3(-1) = -3</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Examples of complex numbers:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">2 + 3i (real part = 2, imaginary part = 3)</li>
      <li style="margin: 0.2rem 0;">-5 + 7i (real part = -5, imaginary part = 7)</li>
      <li style="margin: 0.2rem 0;">4i (real part = 0, imaginary part = 4)</li>
      <li style="margin: 0.2rem 0;">6 (real part = 6, imaginary part = 0)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Adding and Subtracting Complex Numbers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Process: Combine like terms
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Combine real parts together</li>
      <li style="margin: 0.2rem 0;">Combine imaginary parts together</li>
      <li style="margin: 0.2rem 0;">Keep them separate in final answer</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Addition
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(8 + 5i) + (5 - 2i)</li>
      <li style="margin: 0.2rem 0;">Real parts: 8 + 5 = 13</li>
      <li style="margin: 0.2rem 0;">Imaginary parts: 5i + (-2i) = 3i</li>
      <li style="margin: 0.2rem 0;">Answer: 13 + 3i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Subtraction
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(2 - 3i) - (5 - 7i)</li>
      <li style="margin: 0.2rem 0;">CRITICAL: Distribute negative sign to BOTH terms!</li>
      <li style="margin: 0.2rem 0;">= 2 - 3i - 5 + 7i</li>
      <li style="margin: 0.2rem 0;">Real parts: 2 - 5 = -3</li>
      <li style="margin: 0.2rem 0;">Imaginary parts: -3i + 7i = 4i</li>
      <li style="margin: 0.2rem 0;">Answer: -3 + 4i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common mistake:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Forgetting to distribute negative on subtraction</li>
      <li style="margin: 0.2rem 0;">Wrong: (2 - 3i) - (5 - 7i) = -3 - 10i ✗</li>
      <li style="margin: 0.2rem 0;">Correct: (2 - 3i) - (5 - 7i) = -3 + 4i ✓</li>
      <li style="margin: 0.2rem 0;">ACT often includes the mistake as a wrong answer choice!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Multiplying Complex Numbers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Process: Use FOIL (First, Outer, Inner, Last)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiply just like binomials</li>
      <li style="margin: 0.2rem 0;">Simplify using i² = -1</li>
      <li style="margin: 0.2rem 0;">Combine like terms</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: (3 - 5i)(2 - 2i)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">First: 3 × 2 = 6</li>
      <li style="margin: 0.2rem 0;">Outer: 3 × (-2i) = -6i</li>
      <li style="margin: 0.2rem 0;">Inner: (-5i) × 2 = -10i</li>
      <li style="margin: 0.2rem 0;">Last: (-5i) × (-2i) = 10i²</li>
      <li style="margin: 0.2rem 0;">Combine: 6 - 6i - 10i + 10i²</li>
      <li style="margin: 0.2rem 0;">= 6 - 16i + 10i²</li>
      <li style="margin: 0.2rem 0;">Substitute i² = -1: 6 - 16i + 10(-1)</li>
      <li style="margin: 0.2rem 0;">= 6 - 16i - 10</li>
      <li style="margin: 0.2rem 0;">= -4 - 16i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: (1 - 3i)(11 + 2i)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">FOIL: 11 + 2i - 33i - 6i²</li>
      <li style="margin: 0.2rem 0;">Combine like terms: 11 - 31i - 6i²</li>
      <li style="margin: 0.2rem 0;">Replace i²: 11 - 31i - 6(-1)</li>
      <li style="margin: 0.2rem 0;">= 11 - 31i + 6</li>
      <li style="margin: 0.2rem 0;">= 17 - 31i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Calculator shortcut:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most TI-83, TI-84, TI-Nspire, and Casio calculators have an i button</li>
      <li style="margin: 0.2rem 0;">Can type complex numbers directly and get answer!</li>
      <li style="margin: 0.2rem 0;">No manual calculation needed</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Complex Conjugates
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complex conjugate</strong> definition:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Same real part, opposite sign on imaginary part</li>
      <li style="margin: 0.2rem 0;">General form: a + bi and a - bi are conjugates</li>
      <li style="margin: 0.2rem 0;">Example: 2 + 3i and 2 - 3i are conjugates</li>
      <li style="margin: 0.2rem 0;">To find conjugate: switch the sign of imaginary part</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">CRITICAL property:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Product of complex conjugates is always a REAL number</li>
      <li style="margin: 0.2rem 0;">(a + bi)(a - bi) = a² + b²</li>
      <li style="margin: 0.2rem 0;">Imaginary terms cancel out!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: (2 + 3i)(2 - 3i)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">FOIL: 4 - 6i + 6i - 9i²</li>
      <li style="margin: 0.2rem 0;">= 4 - 9i²</li>
      <li style="margin: 0.2rem 0;">= 4 - 9(-1)</li>
      <li style="margin: 0.2rem 0;">= 4 + 9 = 13</li>
      <li style="margin: 0.2rem 0;">Shortcut: 2² + 3² = 4 + 9 = 13 (much faster!)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Using conjugates to simplify fractions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Cannot have i in the denominator!</li>
      <li style="margin: 0.2rem 0;">Multiply top and bottom by conjugate of denominator</li>
      <li style="margin: 0.2rem 0;">Example: Simplify 10/(1 - 2i)</li>
      <li style="margin: 0.2rem 0;">Conjugate of (1 - 2i) is (1 + 2i)</li>
      <li style="margin: 0.2rem 0;">Multiply: [10/(1 - 2i)] × [(1 + 2i)/(1 + 2i)]</li>
      <li style="margin: 0.2rem 0;">= (10 + 20i) / (1² + 2²)</li>
      <li style="margin: 0.2rem 0;">= (10 + 20i) / 5</li>
      <li style="margin: 0.2rem 0;">= 2 + 4i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Simplify 5/(3 + 4i)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Conjugate of (3 + 4i) is (3 - 4i)</li>
      <li style="margin: 0.2rem 0;">Multiply: [5/(3 + 4i)] × [(3 - 4i)/(3 - 4i)]</li>
      <li style="margin: 0.2rem 0;">= (15 - 20i) / (9 + 16)</li>
      <li style="margin: 0.2rem 0;">= (15 - 20i) / 25</li>
      <li style="margin: 0.2rem 0;">= 15/25 - 20i/25</li>
      <li style="margin: 0.2rem 0;">= 3/5 - 4i/5</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Powers of i
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Repeating pattern (MUST memorize):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">i¹ = i</li>
      <li style="margin: 0.2rem 0;">i² = -1</li>
      <li style="margin: 0.2rem 0;">i³ = -i</li>
      <li style="margin: 0.2rem 0;">i⁴ = 1</li>
      <li style="margin: 0.2rem 0;">Then pattern repeats: i⁵ = i, i⁶ = -1, i⁷ = -i, i⁸ = 1...</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For higher powers (like i¹⁰²):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Pattern repeats every 4 terms</li>
      <li style="margin: 0.2rem 0;">Find remainder when dividing exponent by 4</li>
      <li style="margin: 0.2rem 0;">Use repeating pattern method from Topic 5.6</li>
      <li style="margin: 0.2rem 0;">Every 4th power equals 1 (i⁴, i⁸, i¹², ...)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">See Topic 5.6 (Repeating Patterns) for detailed method:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find nearest multiple of 4</li>
      <li style="margin: 0.2rem 0;">Count forward or backward in pattern</li>
      <li style="margin: 0.2rem 0;">Example: i⁴⁷ = -i (see Topic 5.6)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. The Complex Plane (Advanced, Rarely Tested)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">How the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">complex plane</strong> works:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Like standard (x, y) coordinate plane</li>
      <li style="margin: 0.2rem 0;">X-axis = "real axis"</li>
      <li style="margin: 0.2rem 0;">Y-axis = "imaginary axis"</li>
      <li style="margin: 0.2rem 0;">Complex number a + bi graphed at point (a, b)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Examples:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">3 + 4i → point (3, 4)</li>
      <li style="margin: 0.2rem 0;">1 - 3i → point (1, -3)</li>
      <li style="margin: 0.2rem 0;">-1 + 2i → point (-1, 2)</li>
      <li style="margin: 0.2rem 0;">5 (no imaginary part) → point (5, 0)</li>
      <li style="margin: 0.2rem 0;">4i (no real part) → point (0, 4)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Note on importance:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">VERY rarely tested on ACT</li>
      <li style="margin: 0.2rem 0;">Usually appears in questions 35-45 if at all</li>
      <li style="margin: 0.2rem 0;">Can skip if time-crunched</li>
      <li style="margin: 0.2rem 0;">Focus on other topics first</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Add/subtract: combine like terms (real with real, imaginary with imaginary); on subtraction, distribute negative to BOTH terms
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Multiply: use FOIL, then simplify using i² = -1; combine like terms for final answer
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Complex conjugates: flip sign of imaginary part; product is real number (a² + b²); use to simplify fractions with i in denominator
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Powers of i: pattern is i, -1, -i, 1 (repeats every 4); see Topic 5.6 for finding higher powers
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('matrices', 'math', 'Topic 7.3 - Matrices', 'Topic 7.3 - Matrices...', 'intermediate', 30, 73, '<!-- Topic 7.3: Matrices -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Matrices are rectangular arrays of numbers used to organize data. The ACT tests <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">matrix dimensions</strong>, basic operations (addition, subtraction, scalar multiplication), determinants, and matrix multiplication. Understanding dimensions is critical for success.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Matrix Basics and Dimensions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is a matrix:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rectangular array of numbers arranged in rows and columns</li>
      <li style="margin: 0.2rem 0;">Numbers inside are called elements or entries</li>
      <li style="margin: 0.2rem 0;">Written with brackets: [elements]</li>
      <li style="margin: 0.2rem 0;">Used to organize data compactly</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Matrix dimensions</strong> (rows × columns):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Always written as (rows × columns)</li>
      <li style="margin: 0.2rem 0;">Read horizontally = rows (left to right)</li>
      <li style="margin: 0.2rem 0;">Read vertically = columns (top to bottom)</li>
      <li style="margin: 0.2rem 0;">Example: [2  3  4] is a (1 × 3) matrix (1 row, 3 columns)</li>
      <li style="margin: 0.2rem 0;">Example: [[2], [5], [7]] is a (3 × 1) matrix (3 rows, 1 column)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common matrix sizes:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(2 × 2) matrix: 2 rows, 2 columns (4 total elements)</li>
      <li style="margin: 0.2rem 0;">(3 × 2) matrix: 3 rows, 2 columns (6 total elements)</li>
      <li style="margin: 0.2rem 0;">(1 × 4) matrix: 1 row, 4 columns (row matrix)</li>
      <li style="margin: 0.2rem 0;">(4 × 1) matrix: 4 rows, 1 column (column matrix)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Square matrices:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Number of rows = number of columns</li>
      <li style="margin: 0.2rem 0;">Examples: (2 × 2), (3 × 3), (4 × 4)</li>
      <li style="margin: 0.2rem 0;">Only square matrices have determinants</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Matrix Addition and Subtraction
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Requirements for addition/subtraction:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Matrices MUST have the SAME dimensions</li>
      <li style="margin: 0.2rem 0;">Cannot add (2 × 3) matrix to (3 × 2) matrix</li>
      <li style="margin: 0.2rem 0;">If dimensions don''t match, operation is undefined</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Process: Add or subtract corresponding elements
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Add/subtract element in position (1,1) with element in position (1,1)</li>
      <li style="margin: 0.2rem 0;">Add/subtract element in position (1,2) with element in position (1,2)</li>
      <li style="margin: 0.2rem 0;">Continue for all positions</li>
      <li style="margin: 0.2rem 0;">Result has same dimensions as originals</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Addition
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">[[1, 2], [3, 4]] + [[5, 6], [7, 8]]</li>
      <li style="margin: 0.2rem 0;">= [[1+5, 2+6], [3+7, 4+8]]</li>
      <li style="margin: 0.2rem 0;">= [[6, 8], [10, 12]]</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Subtraction
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">[[10, 8], [6, 4]] - [[2, 3], [1, 2]]</li>
      <li style="margin: 0.2rem 0;">= [[10-2, 8-3], [6-1, 4-2]]</li>
      <li style="margin: 0.2rem 0;">= [[8, 5], [5, 2]]</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Scalar Multiplication
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">scalar multiplication</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiplying entire matrix by a single number (the scalar)</li>
      <li style="margin: 0.2rem 0;">Multiply EVERY element in the matrix by that number</li>
      <li style="margin: 0.2rem 0;">Result has same dimensions as original</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 3 × [[2, 4], [6, 8]]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiply each element by 3:</li>
      <li style="margin: 0.2rem 0;">= [[3×2, 3×4], [3×6, 3×8]]</li>
      <li style="margin: 0.2rem 0;">= [[6, 12], [18, 24]]</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: -2 × [[1, -3], [5, 0]]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">= [[-2×1, -2×(-3)], [-2×5, -2×0]]</li>
      <li style="margin: 0.2rem 0;">= [[-2, 6], [-10, 0]]</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common on ACT:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Often combined with addition/subtraction</li>
      <li style="margin: 0.2rem 0;">Example: 2A + 3B (multiply A by 2, B by 3, then add)</li>
      <li style="margin: 0.2rem 0;">Do scalar multiplication first, then add/subtract</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Determinants of 2×2 Matrices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">What is a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">determinant</strong>:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Single number calculated from a square matrix</li>
      <li style="margin: 0.2rem 0;">Only exists for square matrices (2×2, 3×3, etc.)</li>
      <li style="margin: 0.2rem 0;">Written as det(A) or |A|</li>
      <li style="margin: 0.2rem 0;">ACT mostly tests 2×2 determinants</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Formula for 2×2 determinant:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Matrix: [[a, b], [c, d]]</li>
      <li style="margin: 0.2rem 0;">Determinant = ad - bc</li>
      <li style="margin: 0.2rem 0;">Multiply diagonally (↘), then subtract other diagonal (↙)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Find det([[3, 5], [2, 4]])
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">a = 3, b = 5, c = 2, d = 4</li>
      <li style="margin: 0.2rem 0;">det = ad - bc</li>
      <li style="margin: 0.2rem 0;">= (3)(4) - (5)(2)</li>
      <li style="margin: 0.2rem 0;">= 12 - 10</li>
      <li style="margin: 0.2rem 0;">= 2</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example with variables: det([[-4, 6], [1, x]]) = 10, find x
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use formula: ad - bc = 10</li>
      <li style="margin: 0.2rem 0;">(-4)(x) - (6)(1) = 10</li>
      <li style="margin: 0.2rem 0;">-4x - 6 = 10</li>
      <li style="margin: 0.2rem 0;">-4x = 16</li>
      <li style="margin: 0.2rem 0;">x = -4</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Matrix Multiplication - Determining if Defined
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">CRITICAL concept: Matrix multiplication is different from addition!
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Matrices do NOT need same dimensions to multiply</li>
      <li style="margin: 0.2rem 0;">Instead, follow the "middle numbers must match" rule</li>
      <li style="margin: 0.2rem 0;">Order matters: AB ≠ BA (usually)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 1: Write dimensions of both matrices
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: Multiply (1 × 2) matrix by (2 × 3) matrix</li>
      <li style="margin: 0.2rem 0;">Write: (1 × 2) × (2 × 3)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 2: Box the middle two numbers
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(1 × [2) × (2] × 3)</li>
      <li style="margin: 0.2rem 0;">Check if middle numbers match</li>
      <li style="margin: 0.2rem 0;">If they match → multiplication is DEFINED</li>
      <li style="margin: 0.2rem 0;">If they don''t match → multiplication is UNDEFINED</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Step 3: If defined, find result dimensions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Bring down first and last numbers (outside the box)</li>
      <li style="margin: 0.2rem 0;">(1 × [2) × (2] × 3) → result is (1 × 3)</li>
      <li style="margin: 0.2rem 0;">The result matrix will be (1 × 3)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Key rule to remember:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Number of COLUMNS in first matrix</li>
      <li style="margin: 0.2rem 0;">must equal</li>
      <li style="margin: 0.2rem 0;">Number of ROWS in second matrix</li>
      <li style="margin: 0.2rem 0;">For multiplication to be defined</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Examples:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">(2 × [3) × (3] × 1) → DEFINED, result is (2 × 1)</li>
      <li style="margin: 0.2rem 0;">(2 × [1) × (2] × 2) → UNDEFINED (1 ≠ 2)</li>
      <li style="margin: 0.2rem 0;">(2 × [2) × (2] × 2) → DEFINED, result is (2 × 2)</li>
      <li style="margin: 0.2rem 0;">(2 × [3) × (2] × 2) → UNDEFINED (3 ≠ 2)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Matrix Multiplication - Finding Values
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Process: Work ACROSS rows in first matrix, DOWN columns in second
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Multiply corresponding elements</li>
      <li style="margin: 0.2rem 0;">Add all products together</li>
      <li style="margin: 0.2rem 0;">Result goes in corresponding position</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: [[2, -4], [-6, 1]] × [[3, 1], [-2, 9]]
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Check if defined</li>
      <li style="margin: 0.2rem 0;">(2 × 2) × (2 × 2) → defined, result is (2 × 2)</li>
      <li style="margin: 0.2rem 0;">Step 2: Find top-left element</li>
      <li style="margin: 0.2rem 0;">Use top row of first [2, -4] and left column of second [3, -2]</li>
      <li style="margin: 0.2rem 0;">= (2)(3) + (-4)(-2) = 6 + 8 = 14</li>
      <li style="margin: 0.2rem 0;">Step 3: Find top-right element</li>
      <li style="margin: 0.2rem 0;">Use top row of first [2, -4] and right column of second [1, 9]</li>
      <li style="margin: 0.2rem 0;">= (2)(1) + (-4)(9) = 2 - 36 = -34</li>
      <li style="margin: 0.2rem 0;">Step 4: Find bottom-left element</li>
      <li style="margin: 0.2rem 0;">Use bottom row of first [-6, 1] and left column of second [3, -2]</li>
      <li style="margin: 0.2rem 0;">= (-6)(3) + (1)(-2) = -18 - 2 = -20</li>
      <li style="margin: 0.2rem 0;">Step 5: Find bottom-right element</li>
      <li style="margin: 0.2rem 0;">Use bottom row of first [-6, 1] and right column of second [1, 9]</li>
      <li style="margin: 0.2rem 0;">= (-6)(1) + (1)(9) = -6 + 9 = 3</li>
      <li style="margin: 0.2rem 0;">Result: [[14, -34], [-20, 3]]</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Test-taking tip:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Check answer choices after finding just ONE element!</li>
      <li style="margin: 0.2rem 0;">Often only one answer choice has that value</li>
      <li style="margin: 0.2rem 0;">Can save time by not calculating all elements</li>
      <li style="margin: 0.2rem 0;">If multiple answers have same value, calculate another element</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example with different dimensions: (3 × 2) × (2 × 3)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Result will be (3 × 3) - bigger than either original!</li>
      <li style="margin: 0.2rem 0;">Process is exactly the same</li>
      <li style="margin: 0.2rem 0;">Just more elements to calculate</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Dimensions are (rows × columns); for add/subtract, dimensions must match exactly; result has same dimensions
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Determinant (2×2): ad - bc; only for square matrices; often involves solving for variable
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Matrix multiplication: middle numbers must match for defined; result dimensions = outer numbers
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>To multiply: work across rows in first, down columns in second; multiply pairs, sum products; check answers early!
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('vectors', 'math', 'Topic 7.4 - Vectors', 'Topic 7.4 - Vectors...', 'intermediate', 30, 74, '<!-- Topic 7.4: Vectors -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">vector</strong> is a quantity that has both magnitude (length) and direction. Vectors commonly are used to show motion, such as velocity and acceleration. Since vectors are not commonly taught in math class, many students are stumped when vectors appear on the ACT. The good news is that vector questions on the ACT primarily test vector addition and subtraction, which involves simple arithmetic with like terms.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Understanding Vectors
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">A vector shows the magnitude and direction of a motion
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Vectors are drawn as arrows on the coordinate plane</li>
      <li style="margin: 0.2rem 0;">The <strong>magnitude</strong> is the length of the vector (represents speed, distance, or strength)</li>
      <li style="margin: 0.2rem 0;">The <strong>direction</strong> is shown by which way the arrow points</li>
      <li style="margin: 0.2rem 0;">Example: A car driving at 30° east of north at 10 mph would have magnitude 10 and direction 30° from north</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Vectors on the ACT are most commonly written in two forms:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Standard form:</strong> v = Ai + Bj
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Ai shows the x-component (horizontal movement)</li>
          <li style="margin: 0.15rem 0;">Bj shows the y-component (vertical movement)</li>
          <li style="margin: 0.15rem 0;">Example: 3i + 4j means 3 units right, 4 units up</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Component form:</strong> v = (A, B)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">A shows the x-component</li>
          <li style="margin: 0.15rem 0;">B shows the y-component</li>
          <li style="margin: 0.15rem 0;">Example: (3, 4) means 3 units right, 4 units up</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When starting at the origin, a vector written in Ai + Bj or (A, B) notation ends at point (A, B)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Vector (3, 4) starts at origin and ends at point (3, 4)</li>
      <li style="margin: 0.2rem 0;">Vector (-4, -2) starts at origin and ends at point (-4, -2)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Vector Addition and Subtraction
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Vector addition and subtraction is the most common vector question on the ACT
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The good news: it''s simple arithmetic!</li>
      <li style="margin: 0.2rem 0;">All you do is combine like terms</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For component form (A, B):
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Add or subtract the A values (x-components) together</li>
      <li style="margin: 0.2rem 0;">Add or subtract the B values (y-components) together</li>
      <li style="margin: 0.2rem 0;">Example: (2, 5) + (-6, 8) = (2 + (-6), 5 + 8) = (-4, 13)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For standard form Ai + Bj:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Combine the i terms (x-components)</li>
      <li style="margin: 0.2rem 0;">Combine the j terms (y-components)</li>
      <li style="margin: 0.2rem 0;">Example: (4i + 5j) + (-2i + 6j) = 2i + 11j</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When there''s a coefficient in front of a vector, distribute it first
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If A = 5i - j and we want 2A, distribute: 2A = 2(5i - j) = 10i - 2j</li>
      <li style="margin: 0.2rem 0;">Example: If A = 5i - j and B = 12i - 4j, then 2A - B = (10i - 2j) - (12i - 4j) = -2i + 2j</li>
      <li style="margin: 0.2rem 0;">Remember to distribute the negative sign when subtracting!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common mistake: Forgetting to distribute the negative sign
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">WRONG: (3i + 4j) - (2i + j) = 3i + 4j - 2i + j = i + 5j ✗</li>
      <li style="margin: 0.2rem 0;">RIGHT: (3i + 4j) - (2i + j) = 3i + 4j - 2i - j = i + 3j ✓</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. The Tip-to-Tail Method for Graphing
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For more advanced vector questions, you may need to visualize vector addition on a graph
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This uses the <strong>tip-to-tail method</strong></li>
      <li style="margin: 0.2rem 0;">The "tip" is where the arrow points (the head of the arrow)</li>
      <li style="margin: 0.2rem 0;">The "tail" is the straight end (where the arrow starts)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Steps for tip-to-tail method:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Start at the origin and draw the first vector
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">If solving A + B + C, draw vector A first</li>
          <li style="margin: 0.15rem 0;">Where the tip (arrow head) lands is your new starting point</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Start at the tip of the first vector and draw the second vector
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">The tail of the second vector starts where the tip of the first ended</li>
          <li style="margin: 0.15rem 0;">This is why it''s called "tip-to-tail"</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Repeat for any additional vectors
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Keep connecting tail to tip</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> Draw a vector from the origin to the final tip
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">This new vector represents your answer</li>
          <li style="margin: 0.15rem 0;">It shows the combined effect of all the vectors</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When subtracting vectors on a graph:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw the vector in the opposite direction</li>
      <li style="margin: 0.2rem 0;">If +C goes 3 units right and 1 unit down, then -C goes 3 units left and 1 unit up</li>
      <li style="margin: 0.2rem 0;">Flip both the horizontal and vertical components</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: To find A + B - C graphically
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw A starting at origin</li>
      <li style="margin: 0.2rem 0;">Draw B starting at tip of A</li>
      <li style="margin: 0.2rem 0;">Draw -C (opposite direction of C) starting at tip of B</li>
      <li style="margin: 0.2rem 0;">Draw final vector from origin to tip of -C</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Magnitude of a Vector
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The magnitude of a vector is the length of the vector
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Magnitude represents the speed, distance, or strength</li>
      <li style="margin: 0.2rem 0;">Example: A ball traveling at 40 feet per second has magnitude 40</li>
      <li style="margin: 0.2rem 0;">Magnitude is rarely tested on the ACT, but you should know the formula</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Formula for magnitude:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For vector Ai + Bj or (A, B): magnitude = √(A² + B²)</li>
      <li style="margin: 0.2rem 0;">This is the same as the Pythagorean theorem!</li>
      <li style="margin: 0.2rem 0;">Example: Magnitude of (3, 4) = √(3² + 4²) = √(9 + 16) = √25 = 5</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">If you forget the formula on test day:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Draw the vector on the coordinate plane</li>
      <li style="margin: 0.2rem 0;">Create a right triangle using the vector as the hypotenuse</li>
      <li style="margin: 0.2rem 0;">Use Pythagorean theorem: a² + b² = c²</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Vectors in Context: Direction and Motion
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT often presents vectors in real-world contexts
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Common scenarios: driving, flying, jogging, sailing</li>
      <li style="margin: 0.2rem 0;">The vector i represents 1 unit east (or right)</li>
      <li style="margin: 0.2rem 0;">The vector j represents 1 unit north (or up)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Translating directions to vectors:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>East:</strong> positive i direction (example: 5 mph east = 5i)</li>
      <li style="margin: 0.2rem 0;"><strong>West:</strong> negative i direction (example: 9 mph west = -9i)</li>
      <li style="margin: 0.2rem 0;"><strong>North:</strong> positive j direction (example: 3 mph north = 3j)</li>
      <li style="margin: 0.2rem 0;"><strong>South:</strong> negative j direction (example: 7 mph south = -7j)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Sarah is jogging west at 9 miles per hour
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">West means negative i direction</li>
      <li style="margin: 0.2rem 0;">9 miles per hour is the magnitude</li>
      <li style="margin: 0.2rem 0;">Vector: -9i</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Tia drives 5 miles south and 5√3 miles west
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">South = -5j</li>
      <li style="margin: 0.2rem 0;">West = -5√3i</li>
      <li style="margin: 0.2rem 0;">Combined vector: -5√3i - 5j</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Angles and directions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Questions may specify "30° north of east" or "45° east of north"</li>
      <li style="margin: 0.2rem 0;">These typically require trigonometry to find exact components</li>
      <li style="margin: 0.2rem 0;">But on the ACT, these questions usually just ask for magnitude or general direction</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Key Takeaways
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Vectors have two forms: standard form Ai + Bj and component form (A, B), where A is the x-component and B is the y-component</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">To add or subtract vectors, simply combine like terms: add the x-components together and add the y-components together (remember to distribute coefficients and negative signs!)</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Use the tip-to-tail method for graphing vector addition: draw each vector starting at the tip of the previous one, then draw the result from origin to the final tip</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Magnitude of vector (A, B) is √(A² + B²), which is the same as the Pythagorean theorem</li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('word-problems', 'math', 'Topic 7.5 - Word Problems', 'Topic 7.5 - Word Problems...', 'intermediate', 30, 75, '<!-- Topic 7.5: Word Problems -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Word problems are one of the most challenging aspects of the ACT Math Test. Word problems can cover any math topic—from algebra to geometry to probability—and are often written in confusing ways that make it difficult to figure out exactly what is being asked. The good news is that word problems at their core are no more difficult than any other ACT Math questions. This lesson will teach you powerful strategies to tackle word problems more effectively and efficiently.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Don''t Be Intimidated
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Word problems look scary, but they don''t have to be
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Many students see a big paragraph and think "no way, I can''t solve that"</li>
      <li style="margin: 0.2rem 0;">They feel intimidated before even trying to solve the question</li>
      <li style="margin: 0.2rem 0;">Don''t let this be you!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Word problems are just regular math problems dressed up in words
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">At their core, they test the same skills as any other ACT Math question</li>
      <li style="margin: 0.2rem 0;">The challenge is translating words into math</li>
      <li style="margin: 0.2rem 0;">Once you do that, the problem becomes much simpler</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Mindset matters
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When you see a big paragraph on test day, take a deep breath</li>
      <li style="margin: 0.2rem 0;">Solve it one step at a time</li>
      <li style="margin: 0.2rem 0;">Breaking it down makes it manageable</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Turn Words into Equations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">This is the most powerful strategy for word problems
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read through the question one sentence at a time</li>
      <li style="margin: 0.2rem 0;">Identify each piece of key information</li>
      <li style="margin: 0.2rem 0;">Write it down as an equation or mathematical expression</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">If you can convert the word problem into equations, it becomes much easier to solve
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "The price of Matt''s meal was $6 more than John''s meal" → M = J + 6</li>
      <li style="margin: 0.2rem 0;">Example: "They split the cost evenly" → Each pays (J + M) / 2</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common translations from words to math:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>"More than"</strong> → Addition (+)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"5 more than x" → x + 5</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>"Less than"</strong> → Subtraction (-)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"3 less than y" → y - 3</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>"Times" or "product of"</strong> → Multiplication (×)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"6 times as many" → 6x</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>"Per" or "divided by"</strong> → Division (÷)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"200 cubic inches per minute" → 200/min</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>"Is" or "equals"</strong> → Equals sign (=)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"The total is 100" → Total = 100</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">System of equations word problems
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">One of the most common types of word problems</li>
      <li style="margin: 0.2rem 0;">You''ll need to turn the word problem into two equations</li>
      <li style="margin: 0.2rem 0;">Once you have the equations, solve using substitution or elimination</li>
      <li style="margin: 0.2rem 0;">Example: "10 bagels and 3 tubs of cream cheese cost $24.40. 16 bagels cost $22.72"
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Equation 1: 10b + 3c = 24.40</li>
          <li style="margin: 0.15rem 0;">Equation 2: 16b = 22.72</li>
          <li style="margin: 0.15rem 0;">Solve for b first, then find c</li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Backsolve with the Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Sometimes writing your own equations is difficult or time-consuming
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">In these cases, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">backsolving</strong> can be faster and easier</li>
      <li style="margin: 0.2rem 0;">Take the answer choices and work backwards through the problem</li>
      <li style="margin: 0.2rem 0;">See which answer choice satisfies all the conditions in the problem</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to backsolve effectively:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Start with answer choice C (the middle value)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Answer choices are usually listed in order</li>
          <li style="margin: 0.15rem 0;">If C doesn''t work, you can often tell if you need a larger or smaller value</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Plug the answer choice into the problem
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Go through each step described in the word problem</li>
          <li style="margin: 0.15rem 0;">See if the numbers work out correctly</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Check if it satisfies all conditions
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">If yes, you found the answer!</li>
          <li style="margin: 0.15rem 0;">If no, try the next logical answer choice</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When backsolving is especially useful:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When setting up equations seems complicated</li>
      <li style="margin: 0.2rem 0;">When you''re not confident your equation is correct</li>
      <li style="margin: 0.2rem 0;">When the problem involves multiple steps that are easier to check than to set up</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Benefits of backsolving:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Even if you can''t find the right answer, you can often eliminate wrong answers</li>
      <li style="margin: 0.2rem 0;">This allows you to make a better guess</li>
      <li style="margin: 0.2rem 0;">It''s a safety net when algebraic approaches fail</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Organize Your Information
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Create a visual representation of the problem
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Drawing a picture, table, or diagram can clarify what''s happening</li>
      <li style="margin: 0.2rem 0;">This is especially helpful for geometry word problems</li>
      <li style="margin: 0.2rem 0;">Example: Rate problems (distance = rate × time) benefit from a table</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Label what you know and what you need to find
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Write down all given information clearly</li>
      <li style="margin: 0.2rem 0;">Circle or underline what the question is asking for</li>
      <li style="margin: 0.2rem 0;">This prevents you from solving for the wrong thing</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Assign variables strategically
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use letters that make sense (b for bagels, c for cream cheese)</li>
      <li style="margin: 0.2rem 0;">Write down what each variable represents</li>
      <li style="margin: 0.2rem 0;">This prevents confusion when you have multiple variables</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Break complex problems into smaller steps
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Don''t try to solve everything at once</li>
      <li style="margin: 0.2rem 0;">Find one piece of information at a time</li>
      <li style="margin: 0.2rem 0;">Build up to the final answer step by step</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Time Management and Strategic Guessing
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Don''t waste too much time on a single word problem
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">It''s easy to waste minutes reading and rereading confusing word problems</li>
      <li style="margin: 0.2rem 0;">Students who do this often run out of time on the ACT Math test</li>
      <li style="margin: 0.2rem 0;">Time spent on one hard problem could be better used answering several easier ones</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Know when to guess and move on
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you''ve tried the strategies and still have no idea, it''s time to guess</li>
      <li style="margin: 0.2rem 0;">Circle the question in your test booklet so you can find it later</li>
      <li style="margin: 0.2rem 0;">Bubble in your best guess</li>
      <li style="margin: 0.2rem 0;">Move on to questions you know how to solve</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Giving up quickly might actually improve your score
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This sounds backwards, but it''s true!</li>
      <li style="margin: 0.2rem 0;">Saving those precious minutes for other questions is strategic</li>
      <li style="margin: 0.2rem 0;">You can always come back if you have time remaining</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Coming back to problems with fresh eyes
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you complete the rest of the section and have time, return to circled questions</li>
      <li style="margin: 0.2rem 0;">Sometimes when re-reading, you''ll suddenly see how to solve it</li>
      <li style="margin: 0.2rem 0;">It''s easier to think clearly when you''re not worried about finishing</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Eliminate obviously wrong answers
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Even if you can''t solve the problem, you can often rule out some choices</li>
      <li style="margin: 0.2rem 0;">Is the answer clearly too big or too small?</li>
      <li style="margin: 0.2rem 0;">Does it have the wrong units?</li>
      <li style="margin: 0.2rem 0;">Eliminating even one answer choice increases your guessing odds</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Key Takeaways
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Don''t be intimidated by word problems—they test the same math skills as other questions, just dressed up in words; take a deep breath and solve one step at a time</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Turn words into equations by reading one sentence at a time and translating key information into mathematical expressions; this makes complex problems much easier to solve</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Use backsolving when setting up equations is difficult: start with answer choice C, plug it into the problem, and check if it satisfies all conditions</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Manage your time wisely—if you''re stuck after trying the strategies, guess and move on to save time for questions you can solve; you can always come back later with fresh eyes</li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('miscellaneous-topics', 'math', 'Topic 7.6 - Miscellaneous Topics', 'Topic 7.6 - Miscellaneous Topics...', 'intermediate', 30, 76, '<!-- Topic 7.6: Miscellaneous Topics -->
<!-- Restructured using Golden Template v5.2 -->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The ACT tests a wide variety of math topics from algebra, geometry, precalculus, and more. This lesson covers all the miscellaneous topics that don''t fit neatly into other categories but have appeared on the ACT before. While none of these topics are commonly tested, they do show up occasionally—especially in the more difficult questions toward the end of the Math test. You should focus on this lesson only after you have mastered the other more commonly tested topics. The topics in this lesson progress from easier and more commonly tested to more difficult and less commonly tested.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Venn Diagrams
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Venn diagram</strong> is a diagram of overlapping circles that helps visualize the logical relationship between sets and their elements
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Each circle represents a group or category</li>
      <li style="margin: 0.2rem 0;">The overlapping region represents elements that belong to both groups</li>
      <li style="margin: 0.2rem 0;">The area outside the circles (but inside a rectangle) represents elements in neither group</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to solve Venn diagram problems:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Draw the Venn diagram with two overlapping circles
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Always draw your own diagram—don''t try to solve it mentally</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Start with the overlapping region (the "both" category)
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">This is given directly in most problems</li>
          <li style="margin: 0.15rem 0;">Label this region first</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Find the "only" regions by subtracting
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">"Only A" = Total A - Both</li>
          <li style="margin: 0.15rem 0;">"Only B" = Total B - Both</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> Find "neither" by subtracting from the total
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Neither = Total - (Only A + Both + Only B)</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: 23 students total, 14 play tennis, 10 play soccer, 4 play both
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Both = 4 (given directly)</li>
      <li style="margin: 0.2rem 0;">Only tennis = 14 - 4 = 10</li>
      <li style="margin: 0.2rem 0;">Only soccer = 10 - 4 = 6</li>
      <li style="margin: 0.2rem 0;">Neither = 23 - (10 + 4 + 6) = 23 - 20 = 3</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Made-Up Math and Function Notation
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT sometimes includes terms or symbols that are entirely made-up
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These questions confuse students because they''ve never seen the symbol before</li>
      <li style="margin: 0.2rem 0;">But they''re just function questions in disguise!</li>
      <li style="margin: 0.2rem 0;">Don''t freak out—stay calm and read carefully</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to solve made-up math problems:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Read the definition of the made-up symbol
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">The problem will always define what the symbol means</li>
          <li style="margin: 0.15rem 0;">Example: a⊗b = 3a² - 4b</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Identify what you''re being asked to find
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Example: Find 5⊗9</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Substitute the given values into the definition
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">a = 5, b = 9</li>
          <li style="margin: 0.15rem 0;">5⊗9 = 3(5)² - 4(9)</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> Simplify
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">= 3(25) - 36</li>
          <li style="margin: 0.15rem 0;">= 75 - 36 = 39</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common made-up symbols: ⊗, ⊕, *, #, ◊, △
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">None of these have standard meanings in math</li>
      <li style="margin: 0.2rem 0;">The ACT will always define them in the problem</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Logic and Contrapositive Statements
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Logic questions ask you to determine which statement must be true based on a given statement
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These seem confusing at first</li>
      <li style="margin: 0.2rem 0;">But there''s a simple trick: look for the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">contrapositive</strong></li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">The contrapositive rule:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Original statement:</strong> If A, then B</li>
      <li style="margin: 0.2rem 0;"><strong>Contrapositive:</strong> If not B, then not A</li>
      <li style="margin: 0.2rem 0;">The contrapositive MUST ALWAYS be true when the original is true</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to create the contrapositive:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Switch the order (B and A swap positions)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Negate both (add "not" to both parts)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: "If it is Monday, there is bad traffic"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A = Monday, B = bad traffic</li>
      <li style="margin: 0.2rem 0;">Contrapositive: If there is NOT bad traffic, it is NOT Monday</li>
      <li style="margin: 0.2rem 0;">This must be true!</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Common wrong answers to avoid:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">WRONG: "If not A, then B" (negating only one part)</li>
      <li style="margin: 0.2rem 0;">WRONG: "If B, then A" (switching order without negating)</li>
      <li style="margin: 0.2rem 0;">RIGHT: "If not B, then not A" (switch AND negate both)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Pattern Spotting and Sequences
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Pattern spotting questions present problems that seem overwhelming until you spot the pattern
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Once you spot the pattern, solving is easy</li>
      <li style="margin: 0.2rem 0;">The challenge is finding the pattern in the first place</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to approach pattern problems:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Look at what changes from one element to the next
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Does the size increase? By how much?</li>
          <li style="margin: 0.15rem 0;">Does the number of elements change? By what factor?</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Extend the pattern to the requested term
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Don''t try to jump directly to the answer</li>
          <li style="margin: 0.15rem 0;">Work step by step if needed</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Calculate what the question asks for
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Often asks for perimeter, area, or number of elements</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Example: Square patterns growing by 1 on each side
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Element 1: 1×1 square</li>
      <li style="margin: 0.2rem 0;">Element 2: 2×2 square</li>
      <li style="margin: 0.2rem 0;">Element 3: 3×3 square</li>
      <li style="margin: 0.2rem 0;">Pattern: Element n is an n×n square</li>
      <li style="margin: 0.2rem 0;">Element 5: 5×5 square, so if each small square has side 14 inches, then perimeter = 4(5 × 14) = 280 inches</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Mapping and Distance Problems
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Mapping questions ask students to track movements and make conclusions about final position
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These involve following directions like "drive 2 miles north, then 5 miles east"</li>
      <li style="margin: 0.2rem 0;">The key strategy: ALWAYS draw your own map</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">How to solve mapping problems:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Draw a simple coordinate system or map
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Mark the starting point</li>
          <li style="margin: 0.15rem 0;">Use arrows to show directions (N, S, E, W)</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Trace each movement on your map
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Draw lines for each leg of the journey</li>
          <li style="margin: 0.15rem 0;">Label distances on each line</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Calculate net displacement or total distance
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Net displacement: How far from start to finish "as the crow flies"</li>
          <li style="margin: 0.15rem 0;">Total distance: Sum of all individual movements</li>
        </ul>
      </li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Tips for tracking movements:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Track net east/west movement separately from net north/south</li>
      <li style="margin: 0.2rem 0;">Example: "8 miles east then 2 miles west" = net 6 miles east</li>
      <li style="margin: 0.2rem 0;">Drawing the map makes these calculations much clearer</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Advanced Topics: Puzzles and Binomial Theorem
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Puzzle questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Require more problem-solving skills than traditional math skills</li>
      <li style="margin: 0.2rem 0;">Often some of the most difficult to prepare for</li>
      <li style="margin: 0.2rem 0;">Most commonly appear in the last 15 questions of the test</li>
      <li style="margin: 0.2rem 0;">Can be very time-consuming</li>
      <li style="margin: 0.2rem 0;"><strong>Strategy:</strong> Skip these if you don''t immediately know how to solve, and save them for last</li>
      <li style="margin: 0.2rem 0;">Example: Optimization problems like "maximize the number of items that fit in a space"</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Pascal''s Triangle and Binomial Theorem (rarely tested)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Used to expand binomials like (a + b)ⁿ where n is large</li>
      <li style="margin: 0.2rem 0;"><strong>Pascal''s Triangle:</strong> Each row gives coefficients for (a + b)ⁿ
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Row 0: 1 → (a + b)⁰ = 1</li>
          <li style="margin: 0.15rem 0;">Row 1: 1, 1 → (a + b)¹ = 1a + 1b</li>
          <li style="margin: 0.15rem 0;">Row 2: 1, 2, 1 → (a + b)² = 1a² + 2ab + 1b²</li>
          <li style="margin: 0.15rem 0;">Row 3: 1, 3, 3, 1 → (a + b)³ = 1a³ + 3a²b + 3ab² + 1b³</li>
          <li style="margin: 0.15rem 0;">Row 4: 1, 4, 6, 4, 1</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;">Pattern: Outside numbers are always 1, inside numbers are sum of two numbers above</li>
      <li style="margin: 0.2rem 0;">To expand (a + b)ⁿ:
        <ul style="margin: 0.2rem 0; padding-left: 1.5rem;">
          <li style="margin: 0.15rem 0;">Use row n of Pascal''s Triangle for coefficients</li>
          <li style="margin: 0.15rem 0;">Powers of a count down from n to 0</li>
          <li style="margin: 0.15rem 0;">Powers of b count up from 0 to n</li>
          <li style="margin: 0.15rem 0;">Example: (2x + 3)⁴ = 1(2x)⁴ + 4(2x)³(3) + 6(2x)²(3)² + 4(2x)(3)³ + 1(3)⁴</li>
        </ul>
      </li>
      <li style="margin: 0.2rem 0;">This is very rarely tested—focus on other topics first!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
7. Key Takeaways
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">For Venn diagrams, always draw your own diagram and start by labeling the overlapping "both" region first, then find the "only" regions by subtracting, and finally find "neither" by subtracting from the total</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">Made-up math symbols are just functions in disguise—read the definition carefully, substitute the given values, and simplify</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">For logic problems, find the contrapositive: if the original statement is "If A, then B," the contrapositive is "If not B, then not A" (switch order AND negate both parts)</li>
  <li style="margin: 0.3rem 0; color: #16a34a; font-weight: 600;">These miscellaneous topics are rarely tested, so master the more common topics first; when you encounter puzzles or very difficult questions, skip them and save them for last to manage your time effectively</li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('reading-intro', 'reading', 'Reading Section Fundamentals', 'Reading Section Fundamentals...', 'intermediate', 30, 51, '<html><head></head><body><p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT Reading section presents unique challenges that require mastering passage comprehension, time management strategies, critical analysis skills, and evidence-based reasoning. With only 35 minutes to read four passages and answer 40 questions, you must develop efficient reading techniques that balance speed with accuracy.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This lesson provides a comprehensive overview of the Reading section structure, explains what skills are tested, introduces the four passage types you''ll encounter, and outlines proven strategies for maximizing your score on this fast-paced section.</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 1. Understanding the Reading Section Format </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT Reading section is the third section of the test and consists of four passages with ten questions each. You have exactly 35 minutes to complete all 40 questions, which means approximately 8 minutes and 45 seconds per passage including both reading time and question-answering time.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding the structure and format of this section is essential for developing an effective test-taking strategy.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Section Timing and Question Distribution </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">40 questions: . Each passage is approximately 750-900 words long and accompanied by exactly 10 questions. Unlike some standardized tests where passages vary in difficulty, all four ACT Reading passages are designed to be roughly equivalent in challenge level</li><li style="margin: 0.15rem 0;">However, individual students may find certain passage types easier based on their interests and background knowledge. The strict time constraint—just over 8.5 minutes per passage—makes the Reading section one of the most time-pressured parts of the ACT. Most students report that finishing all four passages is their biggest challenge.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Passage Order and Organization </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Humanities:</strong> (third), and</li><li style="margin: 0.15rem 0;">Natural Science: (fourth). However, you are NOT required to complete the passages in this order. Strategic test-takers often rearrange the order to tackle their strongest passage types first, building confidence and banking time for more challenging passages later. Each passage is clearly labeled with its type, author information</li><li style="margin: 0.15rem 0;">sometimes a brief italicized introduction that provides context. Questions are numbered consecutively from 1-40 across all four passages (not 1-10 for each passage), so passage one has questions 1-10, passage two has questions 11-20, and so on.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Question Format and Answer Choices </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">four answer options: (A, B, C, D). Unlike the ACT English section which has three-choice questions</li><li style="margin: 0.15rem 0;">Reading questions always have four choices. Each question has exactly one correct answer, and there is</li><li style="margin: 0.15rem 0;">no penalty for guessing: —wrong answers do not subtract from your score. Questions appear to the right of the passage (or below it in the online format)</li><li style="margin: 0.15rem 0;">you can refer back to the passage as many times as needed. Most questions are passage-based, meaning you must find evidence in the text to support your answer. A few questions may ask about vocabulary in context or require you to make reasonable inferences based on textual clues.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Scoring and Raw-to-Scale Conversion </h4> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Your Reading section score is based on the number of questions you answer correctly, called your raw score. This raw score (0-40) is then converted to a scaled score from 1-36 using a conversion table that varies slightly from test to test to account for minor difficulty differences.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Generally, missing 2-3 questions still allows you to achieve a score in the 33-35 range, while missing 6-8 questions typically results in a score around 28-30. The conversion is designed so that a scaled score of 36 requires a perfect or near-perfect raw score (39-40 correct), while a scaled score of 20 (roughly average) corresponds to answering about 23-26 questions correctly.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Because the scoring curve is relatively generous at the top end, even high-achieving students can afford to miss a few questions and still receive excellent scores.</p> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"> <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Example: Section Breakdown</strong><br><br> Passage 1 (Prose Fiction): Questions 1-10 | ~8:45 minutes<br> Passage 2 (Social Science): Questions 11-20 | ~8:45 minutes<br> Passage 3 (Humanities): Questions 21-30 | ~8:45 minutes<br> Passage 4 (Natural Science): Questions 31-40 | ~8:45 minutes<br><br> Total: 40 questions in 35 minutes = approximately 52.5 seconds per question, but you must account for reading time as well, which is why the per-passage timing works better as a guide. </p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 2. The Four Passage Types Explained </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Each ACT Reading section contains exactly four passages, each representing a different content area. Understanding the characteristics of each passage type helps you know what to expect and allows you to develop specialized strategies for each category.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">While the question types remain similar across all passages, the content, writing style, and focus differ significantly.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Prose Fiction and Literary Narrative </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Prose Fiction/Literary Narrative:</strong> passage is always the first passage and features excerpts from short stories, novels, memoirs, or personal essays. These passages focus on</li><li style="margin: 0.15rem 0;">literary devices: . You''ll need to understand character motivations, identify tone and mood, track plot developments, and interpret figurative language. Questions often ask about a character''s emotions, the narrator''s perspective, or the significance of specific events. Literary passages can be challenging because they require careful attention to nuance, subtext</li><li style="margin: 0.15rem 0;">implied meanings rather than just explicit facts. To succeed with fiction passages, pay attention to dialogue, character interactions, descriptive details, and shifts in tone or perspective.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Social Science </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Social Science:</strong> passage appears second and covers topics from anthropology, archaeology, biography, business, economics, education, geography, history, political science, psychology, and sociology. These passages present</li><li style="margin: 0.15rem 0;">theories: in an informative, expository style. Questions typically test your ability to identify main ideas, understand supporting details, recognize cause-and-effect relationships, and follow the author''s argument or analysis</li><li style="margin: 0.15rem 0;">Social Science passages tend to be more straightforward than fiction because they explicitly state facts and conclusions rather than implying them. However, they may contain dense information that requires careful tracking of multiple concepts, names, dates, or statistics. Strong annotation and note-taking strategies are particularly useful for these passages.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Humanities </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Humanities:</strong> passage is third and includes content related to architecture, art, dance, ethics, film, language, literary criticism, music, philosophy, radio, television, and theater. These passages often discuss</li><li style="margin: 0.15rem 0;">critical analysis of creative works: . The writing style falls somewhere between Literary Narrative and Social Science—more personal and opinion-based than pure exposition but more analytical than storytelling</li><li style="margin: 0.15rem 0;">Questions may ask you to identify the author''s perspective on an artist or movement, understand historical context, or recognize how the author supports their claims about cultural significance. Humanities passages sometimes include the author''s personal reflections or evaluative judgments, so pay attention to distinguishing between objective facts and subjective opinions.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Natural Science </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Natural Science:</strong> passage appears fourth and covers topics from anatomy, astronomy, biology, botany, chemistry, ecology, geology, medicine, meteorology, microbiology, natural history, physiology, physics, technology, and zoology. These passages explain</li><li style="margin: 0.15rem 0;">technological innovations: . The writing is typically expository and informative, similar to what you''d find in a science textbook or popular science magazine. Questions test whether you understand scientific processes, can identify cause-and-effect relationships, comprehend technical vocabulary in context</li><li style="margin: 0.15rem 0;">follow the logic of scientific explanations. Don''t worry if you''re not familiar with the specific scientific topic—all necessary information is provided in the passage. However, Natural Science passages can be challenging due to complex terminology, detailed descriptions of processes, and abstract concepts that require visualization.</li></ul> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Passage Type Characteristics Prose Fiction: Focus on character emotions, narrative perspective, and literary themes. Look for "The narrator feels..." or "The passage suggests that the character..." Social Science: Focus on factual information, historical context, and analytical arguments</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Look for "According to the passage..." or "The author indicates that..." Humanities: Focus on artistic significance, cultural analysis, and the author''s perspective. Look for "The author believes..." or "The passage describes the artist''s work as..." Natural Science: Focus on scientific processes, technical explanations, and cause-effect relationships</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Look for "The passage explains that..." or "According to the research described..."</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 3. Core Skills Tested in the Reading Section </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"> The ACT Reading section assesses three main categories of reading comprehension skills: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Key Ideas and Details</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Craft and Structure</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Integration of Knowledge and Ideas</strong>. Understanding which skills are being tested helps you approach questions more strategically and develop targeted improvement strategies. </p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Key Ideas and Details (55-60% of questions) </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">identify cause-effect relationships: . Questions might ask: "What is the main idea of the passage?", "According to the passage, what caused X to happen?", "The author indicates that...", or "Which of the following statements about X is supported by the passage?" These questions require close reading and the ability to distinguish between major themes and supporting details</li><li style="margin: 0.15rem 0;">When answering Key Ideas questions, always refer back to the passage—don''t rely on memory or outside knowledge. The correct answer will have direct textual support, even if the question requires you to paraphrase or synthesize information from multiple sentences.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Craft and Structure (25-30% of questions) </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">rhetorical strategies: . You might encounter questions like: "As it is used in line 42, the word ''revolutionary'' most nearly means...", "The author''s tone in the third paragraph can best be described as...", "The primary purpose of the first paragraph is to...", or "From whose perspective is the passage told?" To answer these questions successfully, pay attention not just to what the author says but how they say it</li><li style="margin: 0.15rem 0;">Consider the connotations of specific word choices, the emotional effect of descriptive language, the organizational structure of paragraphs, and the overall rhetorical approach the author takes to convey their message.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Integration of Knowledge and Ideas (13-18% of questions) </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">draw conclusions: . Questions might ask: "Which of the following claims is best supported by evidence in the passage?", "The passage suggests that...", "It can reasonably be inferred that...", or "The author would most likely agree with which statement?" These questions require you to go beyond literal comprehension and think critically about implications, assumptions</li><li style="margin: 0.15rem 0;">logical connections. When the passage presents two texts (which happens occasionally), Integration questions may ask you to compare and contrast the authors'' perspectives or synthesize information from both passages. Strong critical thinking skills and the ability to distinguish between what the passage explicitly states versus what it implies are essential for these questions.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Reading Comprehension vs. Reading Speed </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">reading efficiency: . Unlike untimed reading assignments where you can reread multiple times and think deeply about every sentence</li><li style="margin: 0.15rem 0;">the ACT requires you to balance thorough understanding with time constraints. The most successful students develop</li><li style="margin: 0.15rem 0;">active reading strategies: that allow them to extract essential information quickly while still retaining enough detail to answer questions accurately. This means learning to identify what''s important (main ideas, key supporting details, author''s purpose) versus what''s less critical (minor examples, tangential descriptions) during your first read-through</li><li style="margin: 0.15rem 0;">With practice, you can improve both your reading speed and comprehension simultaneously by training yourself to recognize patterns in passage structure and question types.</li></ul> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"> <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Example: Question Type Distribution</strong><br><br> In a typical Reading section:<br> - 22-24 questions test Key Ideas and Details (main ideas, supporting details, sequences, cause-effect)<br> - 10-12 questions test Craft and Structure (vocabulary, author''s purpose, tone, point of view)<br> - 5-7 questions test Integration of Knowledge and Ideas (inferences, arguments, conclusions)<br><br> Knowing this distribution helps you anticipate what skills you''ll need to apply most frequently and where to focus your practice efforts. </p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 4. Building a Foundation for Success </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;"> Mastering the ACT Reading section requires more than just understanding the format and question types—you need to develop <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">systematic strategies</strong>, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">efficient reading habits</strong>, and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">test-taking discipline</strong>. This section introduces foundational concepts that will support your development as a strategic ACT reader. </p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Developing Active Reading Techniques </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Active reading:</strong> means engaging with the text purposefully rather than passively absorbing words. On the ACT, this involves</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">annotation:</strong> (underlining key phrases, circling important names or dates, making brief margin notes)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">prediction:</strong> (anticipating what information might be tested), and</li><li style="margin: 0.15rem 0;">summarization: (mentally paraphrasing each paragraph''s main point as you read). Active reading keeps your mind focused and helps you retain information better than passive reading</li><li style="margin: 0.15rem 0;">Even simple techniques like underlining topic sentences or putting brackets around important examples can significantly improve your ability to locate information when answering questions. However, avoid over-annotating—excessive marking can be just as ineffective as no annotation at all. Focus on highlighting only the most essential information.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Understanding the Relationship Between Passages and Questions </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">passage-based comprehension:</strong> which means every correct answer must be supported by evidence in the text. Questions generally follow the</li><li style="margin: 0.15rem 0;">chronological order: of the passage—questions 1-3 relate to the beginning, questions 4-7 to the middle, and questions 8-10 to the end. However, some questions (particularly main idea or author''s purpose questions) require you to consider the entire passage</li><li style="margin: 0.15rem 0;">Understanding this relationship helps you work more efficiently: when you see a question about a specific detail, you know approximately where in the passage to look based on the question number. Questions also frequently include</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">line references:</strong> (e.g., "In lines 45-48...") or</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">paragraph references:</strong> (e.g., "The third paragraph primarily serves to...") to guide you to the relevant section.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Recognizing Wrong Answer Patterns </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">wrong answer traps:</strong> is just as important as identifying correct answers. The ACT frequently uses several types of incorrect answer choices:</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">too extreme:</strong> (using absolute language like "always" or "never" when the passage is more nuanced)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">distortion:</strong> (twisting information from the passage in a way that changes its meaning)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">out of scope:</strong> (bringing in outside information or addressing topics not discussed in the passage)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">opposite:</strong> (stating the reverse of what the passage says), and</li><li style="margin: 0.15rem 0;">partially correct: (including some accurate information but also containing a critical error)</li><li style="margin: 0.15rem 0;">Learning to identify these patterns allows you to  wrong answers more quickly and confidently, even when you''re not 100% certain which answer is correct.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Creating a Personal Strategy and Improving Through Practice </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">personalized approaches: based on their strengths, weaknesses, and natural reading preferences. Some students prefer to skim the passage quickly first, then read questions and return to find answers</li><li style="margin: 0.15rem 0;">Others read carefully the first time, annotating heavily, then answer questions from memory before checking the passage. Still others read questions first to know what to look for, then read the passage with those questions in mind. The key is to experiment with different strategies during practice and identify what allows you to maximize both</li><li style="margin: 0.15rem 0;">speed: . Improvement comes from consistent practice with official ACT materials, timed practice to build stamina and pacing skills</li><li style="margin: 0.15rem 0;">careful review of both correct and incorrect answers to understand the reasoning behind each question. Track your progress by passage type to identify patterns in your performance.</li></ul> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Step 1::</strong> Take a diagnostic practice test to establish your baseline score and identify which passage types or question types are most challenging.</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Step 2::</strong> Experiment with different reading approaches (skim-first, read-carefully, questions-first) on individual passages to see which feels most natural and effective.</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Step 3::</strong> Practice your chosen strategy on timed passages, gradually building speed while maintaining accuracy.</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Step 4::</strong> Review every practice question—both ones you got right and wrong—to understand the reasoning and reinforce patterns.</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Step 5::</strong> Take periodic full-length practice tests to monitor improvement and ensure your strategy works under realistic testing conditions.</li></ul> <p style="height: 1px; margin: 0; padding: 0;"></p><h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3><h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;"> Key Takeaways </h3> <ul style="list-style: none; padding: 0; margin: 0;"> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The Reading section has 35 minutes for 4 passages and 40 questions—approximately 8:45 per passage including reading time</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The four passage types always appear in the same order: Prose Fiction, Social Science, Humanities, Natural Science</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Each passage contains exactly 10 questions, all multiple-choice with four answer options</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>There is no penalty for wrong answers—always guess if you''re running out of time</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Most questions (55-60%) test Key Ideas and Details like main ideas and supporting details</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Craft and Structure questions (25-30%) test vocabulary in context, author''s purpose, and tone</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Integration questions (13-18%) require making inferences and drawing conclusions from the passage</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Active reading strategies (annotation, prediction, summarization) improve comprehension and retention</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Questions generally follow the chronological order of the passage, making it easier to locate relevant information</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Every correct answer must be directly supported by evidence in the passage—never rely on outside knowledge</li> </ul></body></html>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('core-principles', 'reading', 'Topic 1.1 - 7 Core Principles for ACT Reading', 'Topic 1.1 - 7 Core Principles for ACT Reading...', 'intermediate', 30, 1, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 1.1
Topic: 7 Core Principles for ACT Reading
Lesson Key: core-principles
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Students who struggle on the ACT Reading Test typically face two main challenges: time management and difficulty distinguishing between correct and incorrect answer choices. These seven core principles will help you understand how the Reading Test works and guide you toward more accurate answer selection throughout this course.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Evidence-Based Answers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The correct answer must be <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">supported by evidence in the passage</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT must be able to point to specific text and say "here is why this answer choice is correct"</li>
      <li style="margin: 0.2rem 0;">There is ALWAYS evidence in the passage for the correct answer</li>
      <li style="margin: 0.2rem 0;">Once you find the correct evidence, the right answer choice becomes obvious</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Why This Matters
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Your goal is to find the evidence, not to guess or make assumptions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Think of it as "Find Your Waldo" - the evidence exists, you just need to locate it</li>
      <li style="margin: 0.2rem 0;">Most incorrect answers happen because students don''t find the right evidence, not because they can''t comprehend it</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. 100% Correctness Requirement
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The correct answer must be <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">100% correct</strong> - every single word must be accurate
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read every single word in each answer choice carefully</li>
      <li style="margin: 0.2rem 0;">Watch for strong or specific statements that may not be fully supported by the passage</li>
      <li style="margin: 0.2rem 0;">Even small differences between the answer choice and passage text make it incorrect</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example of Why Every Word Matters
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Answer choice: "Sea turtles eat a diet consisting <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">mostly of fish</strong> during migration"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Passage says: "Sea turtles eat fish, crabs, and seagrass during their annual migration"</li>
      <li style="margin: 0.2rem 0;">This answer is INCORRECT because "mostly fish" is not the same as "fish, crabs, and seagrass"</li>
      <li style="margin: 0.2rem 0;">The word "mostly" makes the entire answer choice wrong, even though turtles do eat fish</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Single Word Invalidation
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">A <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">single word can make the entire answer choice incorrect</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Even if 90% of an answer choice matches the passage perfectly, one wrong word makes it incorrect</li>
      <li style="margin: 0.2rem 0;">Be very picky and consider every single word as you assess each answer choice</li>
      <li style="margin: 0.2rem 0;">Anything wrong with an answer choice makes the entire choice incorrect</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Common Words That Invalidate Answers
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Watch for extreme or absolute language
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Words like "always," "never," "only," "exclusively," "primarily," "mostly"</li>
      <li style="margin: 0.2rem 0;">These words make very specific claims that must be fully supported by the passage</li>
      <li style="margin: 0.2rem 0;">If the passage doesn''t explicitly support the extreme language, the answer is wrong</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Avoiding Keyword Matching Traps
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Do not just match words from the passage - <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">match the entire answer choice</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT often includes incorrect answer choices that use exact words or phrases from the passage</li>
      <li style="margin: 0.2rem 0;">Having exact wording doesn''t make an answer correct if the overall meaning doesn''t match</li>
      <li style="margin: 0.2rem 0;">Sometimes the correct answer choice uses different words but captures the same meaning</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Avoid This Trap
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategy for keyword matching
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Don''t get excited when you see exact words from the passage - read the full answer choice</li>
      <li style="margin: 0.2rem 0;">Use Principles #2 and #3: verify that the ENTIRE answer choice is 100% correct</li>
      <li style="margin: 0.2rem 0;">Compare the meaning and context, not just individual words</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Find Your Waldo Strategy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Finding the right evidence is like playing <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">"Where''s Waldo"</strong> - it''s there, you just need to locate it
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The challenge isn''t comprehension - it''s finding the evidence quickly</li>
      <li style="margin: 0.2rem 0;">Once you find the right evidence, the correct answer becomes obvious</li>
      <li style="margin: 0.2rem 0;">You should always be able to point to specific lines and say "this is why my answer is correct"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
No Storytelling Allowed
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">If you''re creating a long justification for why an answer "could" be correct, it''s probably wrong
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">There is always clear evidence in the passage to support the correct answer</li>
      <li style="margin: 0.2rem 0;">You should never need to go through mental gymnastics to justify an answer</li>
      <li style="margin: 0.2rem 0;">Put your finger on the evidence and let it speak for itself</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Speed Over Comprehension
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The ACT Reading Test is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">more about speed than deep comprehension</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">40 minutes for 4 passages with 9 questions each = significant time pressure</li>
      <li style="margin: 0.2rem 0;">Most students don''t find the passages themselves difficult - the challenge is time management</li>
      <li style="margin: 0.2rem 0;">With an extra 5 minutes, the test would be much easier for most students</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Read for Speed
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Adjust your reading approach
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Don''t read for depth - the questions won''t require deep analysis</li>
      <li style="margin: 0.2rem 0;">Focus on remembering where specific details are located throughout the passage</li>
      <li style="margin: 0.2rem 0;">Read slightly faster than you normally would for other texts requiring deeper understanding</li>
      <li style="margin: 0.2rem 0;">You can always return to specific sections when answering questions</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The correct answer must be 100% correct with evidence in the passage - every single word matters. A single incorrect word invalidates the entire answer choice, even if 90% of it matches the passage. Your job is to find the evidence (Find Your Waldo!) and verify that the complete answer choice is fully supported.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Don''t fall for keyword matching traps - match the entire answer choice to the passage, not just individual words. The ACT deliberately includes incorrect answers with exact phrases from the passage to mislead you. Focus on whether the complete meaning and context match, not just whether specific words appear.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>No storytelling allowed - if you''re creating a long justification for why an answer "could" be correct, it''s probably wrong. There is always clear evidence in the passage, so you should be able to point to specific text and say "this is why my answer is correct" without mental gymnastics.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The ACT Reading Test is more about speed than deep comprehension - you have just 40 minutes for 4 passages and 36 questions. Don''t read for depth; instead, focus on remembering where details are located so you can find evidence quickly. The challenge is time management, not understanding the passages themselves.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('finding-correct-answer', 'reading', 'Topic 1.2 - 3 Strategies for Finding the Correct Answer', 'Topic 1.2 - 3 Strategies for Finding the Correct Answer...', 'intermediate', 30, 2, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 1.2
Topic: 3 Strategies for Finding the Correct Answer
Lesson Key: finding-correct-answer
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Now that you understand the core principles distinguishing correct from incorrect answer choices, you need three essential strategies to find the right answer consistently and efficiently. You should apply these three strategies to every single question on the ACT Reading Test for maximum accuracy and speed.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Put Your Finger on the Evidence
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">There is <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">always evidence for the correct answer</strong> in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Remember: ACT Reading is like "Where''s Waldo" - the challenge is finding the evidence quickly enough</li>
      <li style="margin: 0.2rem 0;">If you can put your finger on evidence that matches the answer choice, you know you found the correct answer</li>
      <li style="margin: 0.2rem 0;">Doing this for every question will result in a fantastic ACT Reading score</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
When to Use This Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Balance between thoroughness and time management
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Finding evidence for every single question can be difficult and time-consuming</li>
      <li style="margin: 0.2rem 0;">Do not rely only on this strategy - sometimes you can''t find the evidence and need to move on</li>
      <li style="margin: 0.2rem 0;">This is an important time management consideration we''ll discuss more later in the course</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Apply This Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Concrete steps for finding evidence
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the question and identify what specific information it''s asking for</li>
      <li style="margin: 0.2rem 0;">Locate the relevant section of the passage (use line numbers if provided)</li>
      <li style="margin: 0.2rem 0;">Literally put your finger on the text that supports your answer</li>
      <li style="margin: 0.2rem 0;">Match that evidence to the answer choice that says the same thing</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Read Like a Lawyer
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Read and consider <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">every single word carefully</strong> in both questions and answer choices
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When reading the question, make sure you understand exactly what it''s asking</li>
      <li style="margin: 0.2rem 0;">When reading answer choices, read critically and look for any specific details that could make it incorrect</li>
      <li style="margin: 0.2rem 0;">Remember: the correct answer must be 100% correct</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
What "Reading Like a Lawyer" Means
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Critical reading skills to apply
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question every word - don''t skim or assume you know what it says</li>
      <li style="margin: 0.2rem 0;">Look for qualifiers like "mostly," "primarily," "only," "always," "never"</li>
      <li style="margin: 0.2rem 0;">Verify that each part of the answer choice matches the passage</li>
      <li style="margin: 0.2rem 0;">Don''t pick an answer that "seems correct" - verify it''s 100% correct</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Why This Strategy Matters
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Prevents common mistakes
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Many wrong answers are designed to "seem correct" at first glance</li>
      <li style="margin: 0.2rem 0;">Reading carefully helps you spot the subtle differences that make answers wrong</li>
      <li style="margin: 0.2rem 0;">This is especially important for eliminating trap answers</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Eliminate Incorrect Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The instant you spot anything wrong with an answer choice, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">cross it off and never read it again</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Physically cross off incorrect answers in your test booklet</li>
      <li style="margin: 0.2rem 0;">This saves time because you won''t waste effort re-reading choices you already eliminated</li>
      <li style="margin: 0.2rem 0;">If you return to the question later, you''ll know which choices you''ve already ruled out</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Eliminate Effectively
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Process of elimination technique
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read each answer choice one at a time</li>
      <li style="margin: 0.2rem 0;">As soon as you find something wrong, cross it out immediately</li>
      <li style="margin: 0.2rem 0;">Don''t finish reading an answer choice once you''ve found an error in it</li>
      <li style="margin: 0.2rem 0;">Move to the next choice and repeat</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Benefits of Physical Elimination
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Why crossing out matters
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Saves time on time-pressured test - you won''t re-read wrong answers</li>
      <li style="margin: 0.2rem 0;">Reduces mental load - you don''t have to remember which ones you eliminated</li>
      <li style="margin: 0.2rem 0;">Helps when you''re not confident - narrowing to 2-3 choices makes guessing more effective</li>
      <li style="margin: 0.2rem 0;">Provides clarity when you return to flagged questions</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Using All Three Strategies Together
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">These three strategies work best when <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">combined systematically</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use Strategy #2 (Read Like a Lawyer) when reading the question to understand what''s being asked</li>
      <li style="margin: 0.2rem 0;">Use Strategy #1 (Put Your Finger on Evidence) to locate the relevant passage section</li>
      <li style="margin: 0.2rem 0;">Use Strategy #2 again when evaluating each answer choice word-by-word</li>
      <li style="margin: 0.2rem 0;">Use Strategy #3 (Eliminate) to cross out wrong answers as soon as you spot errors</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Workflow
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Step-by-step application
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Read the question carefully (Strategy #2)</li>
      <li style="margin: 0.2rem 0;">Step 2: Find the evidence in the passage (Strategy #1)</li>
      <li style="margin: 0.2rem 0;">Step 3: Read answer A word-by-word (Strategy #2)</li>
      <li style="margin: 0.2rem 0;">Step 4: If wrong, cross it out and move to B (Strategy #3)</li>
      <li style="margin: 0.2rem 0;">Step 5: Repeat until you find the 100% correct answer</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Put your finger on the evidence - there is always evidence in the passage supporting the correct answer. If you can literally point to text that matches your answer choice, you know you found the right answer. However, balance this with time management; sometimes you can''t find the evidence and need to move on.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Read like a lawyer - consider every single word carefully in both questions and answer choices. Make sure you understand exactly what the question asks, then read answer choices critically looking for any specific details that could make them incorrect. The correct answer must be 100% correct, not just "seem correct."
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Eliminate incorrect answer choices immediately - the instant you spot anything wrong, physically cross it off and never read it again. This saves time, reduces mental load, and helps when you return to flagged questions. Don''t finish reading a choice once you''ve found an error in it.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use all three strategies together systematically: Read the question like a lawyer, find your evidence in the passage, read each answer choice word-by-word, and eliminate wrong answers as soon as you spot errors. This combined approach maximizes both accuracy and efficiency on every question.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('reading-approaches', 'reading', 'Topic 1.3 - How to Approach the Reading Test', 'Topic 1.3 - How to Approach the Reading Test...', 'intermediate', 30, 3, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 1.3
Topic: How to Approach the Reading Test
Lesson Key: reading-approaches
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
There is no single best approach to the ACT Reading Test, but there is a best approach for you based on your reading speed, comprehension level, and personal preferences. This lesson presents six proven approaches—try different methods on practice tests to discover which one maximizes your score and confidence on test day.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Approach #1 — The Big Read
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The simplest approach: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">read the entire passage at once</strong>, then work through the questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the entire passage including the short intro above it</li>
      <li style="margin: 0.2rem 0;">Read to understand the passage—don''t skim</li>
      <li style="margin: 0.2rem 0;">Take 2-4 minutes (3-6 minutes for extended time) at a medium pace</li>
      <li style="margin: 0.2rem 0;">Be an active reader: move your finger/pencil along as you read, consider annotating</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
After Reading: Answering Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategic question approach
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Skip broad passage questions (main idea, best summarizes) and save for last</li>
      <li style="margin: 0.2rem 0;">Go back to the passage to find evidence for each question</li>
      <li style="margin: 0.2rem 0;">Follow the 30-second rule: if you can''t find evidence in 30 seconds, guess and move on</li>
      <li style="margin: 0.2rem 0;">You don''t need to answer questions in order—skip difficult ones and return later</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Have strong reading comprehension</li>
      <li style="margin: 0.2rem 0;">Can read and retain information well</li>
      <li style="margin: 0.2rem 0;">Prefer understanding the big picture before diving into details</li>
      <li style="margin: 0.2rem 0;">Can finish passages with time to spare</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Approach #2 — The Big Read with Notes
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Same as Approach #1, but with <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">systematic note-taking</strong> while reading
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Take brief notes in the margin summarizing each paragraph''s main idea</li>
      <li style="margin: 0.2rem 0;">Keep notes short—just 2-5 words per paragraph</li>
      <li style="margin: 0.2rem 0;">Focus on what the paragraph is about, not every detail</li>
      <li style="margin: 0.2rem 0;">Notes help you quickly locate information when answering questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Take Effective Notes
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Note-taking strategy
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: For a paragraph about sea turtle migration, write "migration patterns"</li>
      <li style="margin: 0.2rem 0;">Don''t write full sentences—waste of time</li>
      <li style="margin: 0.2rem 0;">Focus on the topic, not specific facts</li>
      <li style="margin: 0.2rem 0;">Your notes create a roadmap for finding evidence later</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Benefit from active reading through writing</li>
      <li style="margin: 0.2rem 0;">Have trouble remembering where specific information appeared</li>
      <li style="margin: 0.2rem 0;">Want a quick reference map of the passage</li>
      <li style="margin: 0.2rem 0;">Can take notes quickly without losing too much time</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Approach #3 — Label Then Read
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skim questions first</strong> to know what to look for, then read the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Quickly skim all 9 questions (don''t read answer choices yet)</li>
      <li style="margin: 0.2rem 0;">Label questions with line numbers in the margin next to relevant passage text</li>
      <li style="margin: 0.2rem 0;">Then read the passage normally, already knowing what questions will ask</li>
      <li style="margin: 0.2rem 0;">When you encounter a labeled section, you know a question relates to it</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Label Effectively
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Labeling process
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If question #3 references lines 15-20, write "Q3" next to those lines in the passage</li>
      <li style="margin: 0.2rem 0;">Don''t spend time understanding the question deeply—just note where it points</li>
      <li style="margin: 0.2rem 0;">This takes 30-60 seconds but saves time finding evidence later</li>
      <li style="margin: 0.2rem 0;">You''ll know which parts of the passage are most important for questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Like knowing what to focus on before reading</li>
      <li style="margin: 0.2rem 0;">Struggle to find evidence quickly</li>
      <li style="margin: 0.2rem 0;">Want to read with purpose and direction</li>
      <li style="margin: 0.2rem 0;">Can skim questions quickly without getting bogged down</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Approach #4 — The Speed Reader
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Read very quickly for general understanding</strong>, then use questions to guide detail-finding
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the passage in 1-2 minutes (2-3 minutes for extended time)</li>
      <li style="margin: 0.2rem 0;">Focus on understanding the main idea and passage structure</li>
      <li style="margin: 0.2rem 0;">Don''t worry about remembering every detail</li>
      <li style="margin: 0.2rem 0;">When answering questions, return to the passage to find specific evidence</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Key Strategy Points
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">How to speed read effectively
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the first and last sentence of each paragraph carefully</li>
      <li style="margin: 0.2rem 0;">Skim the middle sentences for the general idea</li>
      <li style="margin: 0.2rem 0;">Note where different topics are discussed (mental map of passage)</li>
      <li style="margin: 0.2rem 0;">Expect to reread sections carefully when answering questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Are naturally fast readers</li>
      <li style="margin: 0.2rem 0;">Can quickly locate information in text</li>
      <li style="margin: 0.2rem 0;">Struggle with time management on Reading</li>
      <li style="margin: 0.2rem 0;">Don''t need to read every word to understand main ideas</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Approach #5 — First and Last
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Read <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">only the first and last sentence</strong> of each paragraph, then answer questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">First sentence usually introduces the paragraph''s topic</li>
      <li style="margin: 0.2rem 0;">Last sentence often concludes or transitions to the next idea</li>
      <li style="margin: 0.2rem 0;">This gives you the passage structure in 1-2 minutes</li>
      <li style="margin: 0.2rem 0;">When answering questions, read the full relevant paragraph(s) for evidence</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How This Approach Works
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategic reading process
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You''ll understand the general flow and main topics</li>
      <li style="margin: 0.2rem 0;">You won''t know specific details until you read for questions</li>
      <li style="margin: 0.2rem 0;">This approach is fastest but requires strong detail-finding skills</li>
      <li style="margin: 0.2rem 0;">Plan to read full paragraphs when answering detail questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Are extremely short on time</li>
      <li style="margin: 0.2rem 0;">Struggle to finish all passages</li>
      <li style="margin: 0.2rem 0;">Can quickly find and understand details when needed</li>
      <li style="margin: 0.2rem 0;">Are comfortable with minimal initial passage understanding</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Approach #6 — Working Backwards
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Don''t read the passage first</strong>—go straight to questions and find answers in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Start with Question 1 (or any question with line numbers)</li>
      <li style="margin: 0.2rem 0;">Read only the relevant passage section to answer that question</li>
      <li style="margin: 0.2rem 0;">Move to the next question and repeat</li>
      <li style="margin: 0.2rem 0;">Build your understanding of the passage as you answer questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy Details
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">How to work backwards effectively
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answer questions with line numbers first (easiest to locate)</li>
      <li style="margin: 0.2rem 0;">Skip broad passage questions until last</li>
      <li style="margin: 0.2rem 0;">By the time you answer specific questions, you''ll understand enough for broad questions</li>
      <li style="margin: 0.2rem 0;">This is covered in much greater depth in a dedicated later chapter</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Who Should Use This Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Best for students who:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Have severe time management issues</li>
      <li style="margin: 0.2rem 0;">Can''t finish all passages with traditional reading</li>
      <li style="margin: 0.2rem 0;">Are strong at finding specific information quickly</li>
      <li style="margin: 0.2rem 0;">Don''t need full passage context to answer most questions</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>There is no single best approach for everyone—the right method depends on your reading speed, comprehension level, and personal preferences. Try different approaches on practice tests to discover which one works best for you, then stick with it consistently to build confidence for test day.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The Big Read (#1 and #2) works best for strong readers who can retain information: read the entire passage in 2-4 minutes, skip broad questions initially, and find evidence for each answer. Add note-taking (Approach #2) if you want a roadmap of where information appears.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Label Then Read (#3) and Speed Reader (#4) balance speed with comprehension: either skim questions first to know what to focus on, or read very quickly (1-2 minutes) for main ideas, then return to find detailed evidence when answering questions. Both require strong passage navigation skills.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First and Last (#5) and Working Backwards (#6) are for students with severe time constraints: either read only first/last sentences of paragraphs, or skip reading entirely and answer questions by finding evidence as you go. These approaches sacrifice initial comprehension for speed but can help you finish all passages.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('pacing-time-management', 'reading', 'Topic 1.4 - Pacing and 10 Time Management Skills', 'Topic 1.4 - Pacing and 10 Time Management Skills...', 'intermediate', 30, 4, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 1.4
Topic: Pacing and 10 Time Management Skills
Lesson Key: pacing-time-management
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The Reading Test is the section students most commonly struggle to finish—you have just 40 minutes for 4 passages and 36 questions (60 minutes with extended time). Mastering pacing and learning effective time management skills is critical to ensuring you finish all passages and maximize your score.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Understanding Your Pacing
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">You have <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">10 minutes per passage on average</strong> (15 minutes for extended time)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Standard time: Passage 1 at 10 min, Passage 2 at 20 min, Passage 3 at 30 min, Passage 4 at 40 min</li>
      <li style="margin: 0.2rem 0;">Extended time: Passage 1 at 15 min, Passage 2 at 30 min, Passage 3 at 45 min, Passage 4 at 60 min</li>
      <li style="margin: 0.2rem 0;">These are general estimates—not every passage will take exactly the same time</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Staying on Pace
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Monitoring your timing
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Some passages will take longer, others will go faster—this is normal</li>
      <li style="margin: 0.2rem 0;">You should never get more than 1-2 minutes behind the pace breakdown</li>
      <li style="margin: 0.2rem 0;">Check your watch at the end of each passage to assess if you''re on pace</li>
      <li style="margin: 0.2rem 0;">If on pace or ahead, keep working as you have been; if behind, pick up the pace slightly</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Skills 1-3: Foundational Time Strategies
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #1 - Know Your Order:</strong> Complete passages in your preferred order, not the test''s order
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Do your favorite/easiest passage type first, save the hardest for last</li>
      <li style="margin: 0.2rem 0;">If you run out of time, better to rush on a passage you find challenging</li>
      <li style="margin: 0.2rem 0;">Typical order: Literary Narrative, then 3 Informational passages (Social Science, Humanities, Natural Science)</li>
      <li style="margin: 0.2rem 0;">With practice, discover which passage types you prefer</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #2 - Skip Broad Passage Questions:</strong> Save main idea questions for last
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The first question (sometimes first 2) often asks about the passage as a whole</li>
      <li style="margin: 0.2rem 0;">Answer these last—after answering other questions, you''ll understand the passage better</li>
      <li style="margin: 0.2rem 0;">This saves time because you won''t need to reread/skim the entire passage</li>
      <li style="margin: 0.2rem 0;">You''re also more likely to get these questions correct when you answer them last</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #3 - Get to Know the Pace:</strong> Internalize timing so you don''t constantly check your watch
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">With practice, you''ll develop an internal sense of when you''re on/off pace</li>
      <li style="margin: 0.2rem 0;">You''ll know when you have time to dig deeper vs. when you need to move on</li>
      <li style="margin: 0.2rem 0;">Only way to achieve this: practice, practice, practice!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Skills 4-6: Avoiding Getting Stuck
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #4 - The 30-Second Rule:</strong> Don''t spend more than 30 seconds stuck on a question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you can''t find evidence after 30 seconds, bubble in your best guess and move on</li>
      <li style="margin: 0.2rem 0;">Better to guess on tough questions and finish the test than run out of time</li>
      <li style="margin: 0.2rem 0;">You can return to the question later if you have time or find evidence while answering others</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #5 - Circle Guesses, Box Non-Confident Answers:</strong> Mark questions to revisit
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you completely guess on a question, circle the question number</li>
      <li style="margin: 0.2rem 0;">If you answer but aren''t 100% confident, box the question number</li>
      <li style="margin: 0.2rem 0;">If you finish early, go back to circled questions first, then boxed questions</li>
      <li style="margin: 0.2rem 0;">Better to make educated guesses and finish than get stuck and not finish</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #6 - Answer Questions Out of Order:</strong> Be flexible with question sequence
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You don''t need to answer questions in the order presented</li>
      <li style="margin: 0.2rem 0;">Start with questions that have line references—easier to find quickly</li>
      <li style="margin: 0.2rem 0;">Skip questions where you can''t quickly find the relevant passage section</li>
      <li style="margin: 0.2rem 0;">As you answer other questions, you may stumble upon evidence for skipped questions</li>
      <li style="margin: 0.2rem 0;">Questions are NOT strictly chronological in the passage</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Skill 7: Finding Evidence Efficiently
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Know Where Waldo Is Likely Based on Question Number:</strong> Rough location patterns
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Questions 1-3: Start of passage, most likely in the first third (not counting broad passage questions)</li>
      <li style="margin: 0.2rem 0;">Questions 4-7: Could be anywhere, but start looking in the middle of the passage</li>
      <li style="margin: 0.2rem 0;">Questions 8-9: End of passage, most likely in the last 2 paragraphs</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Important Caveat
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">These are guidelines, NOT rules
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Sometimes question 8 evidence is in the middle; sometimes question 6 is in the first sentence</li>
      <li style="margin: 0.2rem 0;">If you don''t find evidence in the expected location, keep looking elsewhere</li>
      <li style="margin: 0.2rem 0;">This is just a method to save time by starting your search in the most likely place</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Skills 8-10: Managing Pressure and Instincts
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #8 - Wear a Watch:</strong> Monitor timing without relying on room clocks
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Wear a watch on test day (not a smart watch; no noise)</li>
      <li style="margin: 0.2rem 0;">Check your watch at the end of each passage</li>
      <li style="margin: 0.2rem 0;">Combined with memorized pacing, you''ll know if you''re ahead, on pace, or behind</li>
      <li style="margin: 0.2rem 0;">Adjust accordingly to ensure you finish all 4 passages</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #9 - Don''t Freak Out If Behind Pace:</strong> Manage stress when running late
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If behind pace, DON''T panic, rush excessively, or lose focus</li>
      <li style="margin: 0.2rem 0;">Make minor adjustments: read slightly faster (but maintain comprehension)</li>
      <li style="margin: 0.2rem 0;">Make quicker decisions on questions—answer from memory if confident</li>
      <li style="margin: 0.2rem 0;">It''s okay to be 50-75% sure and finish, rather than guess on many questions at the end</li>
      <li style="margin: 0.2rem 0;">Panicking leads to careless mistakes and worse performance</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Skill #10 - Know When to Trust Your Gut:</strong> Balance instinct with verification
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you know the answer immediately, bubble it in and move on without checking the passage</li>
      <li style="margin: 0.2rem 0;">If you think you know but aren''t 100% confident, go back to verify</li>
      <li style="margin: 0.2rem 0;">If you don''t remember the details, either find evidence or skip and return later</li>
      <li style="margin: 0.2rem 0;">Students with strong recall can rely on memory more; know your own abilities</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Common Test Day Mistake to Avoid
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Warning about over-verification
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Many students who normally finish practice tests suddenly have timing issues on the real ACT</li>
      <li style="margin: 0.2rem 0;">This happens because they stop trusting their gut on test day</li>
      <li style="margin: 0.2rem 0;">They start finding evidence for every single question instead of answering from memory when confident</li>
      <li style="margin: 0.2rem 0;">Build the skill of knowing when to trust yourself vs. when to verify</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>You have 10 minutes per passage on average (15 for extended time)—check your watch after each passage to stay on track. Never get more than 1-2 minutes behind pace. Do your favorite passage type first and save the hardest for last, so if you run out of time, you''re rushing on a passage you find challenging anyway.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Skip broad passage questions (main idea) and answer them last after you understand the passage better. Follow the 30-second rule: if you can''t find evidence in 30 seconds, guess and move on. Circle complete guesses, box non-confident answers, and return to them if you have time.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Answer questions out of order—start with line-reference questions that are easier to locate. Questions 1-3 usually reference the first third of the passage, 4-7 the middle, and 8-9 the end (these are guidelines, not rules). Use this pattern to start your evidence search in the most likely location.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>If you fall behind pace, don''t panic—make minor adjustments by reading slightly faster and making quicker decisions on questions. Know when to trust your gut vs. verify with the passage: answer from memory if confident, verify if unsure, skip if you don''t remember. Many students who normally finish suddenly have timing issues on the real ACT because they stop trusting their instincts.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('question-types', 'reading', 'Topic 2.1 - How to Spot and Approach the 7 Most Common Types of Questions', 'Topic 2.1 - How to Spot and Approach the 7 Most Common Types of Questions...', 'intermediate', 30, 5, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.1
Topic: How to Spot and Approach the 7 Most Common Types of Questions
Lesson Key: question-types
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Knowing which type of question you''re answering is critical to maximizing your Reading score—each question type requires a slightly different approach. This lesson teaches you the 7 most common question types (covering 95%+ of ACT Reading questions), how to identify each type by its keywords, and the best strategy for approaching it.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Broad Passage Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Broad passage questions</strong> ask about the passage as a whole, not specific details
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Often the first question (sometimes first 2) in a passage</li>
      <li style="margin: 0.2rem 0;">Ask about overall themes, structure, purpose, or narrator/author''s perspective</li>
      <li style="margin: 0.2rem 0;">Generally easy to identify as broad questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Common Phrasings
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Look for these question stems:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"The passage can be best described as..."</li>
      <li style="margin: 0.2rem 0;">"The main idea of the passage is..."</li>
      <li style="margin: 0.2rem 0;">"The main purpose of the passage is to..."</li>
      <li style="margin: 0.2rem 0;">"The author''s central claim is..."</li>
      <li style="margin: 0.2rem 0;">"A central theme of the passage is..."</li>
      <li style="margin: 0.2rem 0;">"Which choice best describes the narrator?"</li>
      <li style="margin: 0.2rem 0;">"Which choice best describes the overall structure of the passage?"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategy for broad passage questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Skip these questions and answer them LAST</li>
      <li style="margin: 0.2rem 0;">After completing other questions, you''ll understand the passage better</li>
      <li style="margin: 0.2rem 0;">This saves time—you won''t need to reread/skim the entire passage</li>
      <li style="margin: 0.2rem 0;">You''re more likely to answer correctly when you have full passage context</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Clear Evidence Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Clear evidence questions:</strong> the correct answer is a restatement or rephrasing of evidence directly stated in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Once you find your Waldo, the answer is "slap-you-in-the-face" obvious</li>
      <li style="margin: 0.2rem 0;">The answer uses exact words from the passage or simple rephrasing</li>
      <li style="margin: 0.2rem 0;">Usually easier than inference questions, but can be challenging if evidence is well-hidden</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Keywords to Identify These Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Almost always contains one of these keywords:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Indicates, States, Argues, Describes, Claims</li>
      <li style="margin: 0.2rem 0;">"According to the passage/author/narrator"</li>
      <li style="margin: 0.2rem 0;">"Based on the passage"</li>
      <li style="margin: 0.2rem 0;">"In the passage"</li>
      <li style="margin: 0.2rem 0;">Less common: Characterizes, Clarifies, "As presented in the passage"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategy for clear evidence questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for clear, direct evidence in the passage</li>
      <li style="margin: 0.2rem 0;">Do NOT make any inferences—this is the most common mistake!</li>
      <li style="margin: 0.2rem 0;">The evidence should directly match or simply rephrase the correct answer</li>
      <li style="margin: 0.2rem 0;">If you can''t find evidence after 30 seconds, guess and move on</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Inference Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Inference questions:</strong> the correct answer is not directly stated but is demonstrated in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">There''s still strong evidence, but it won''t directly match the answer choice</li>
      <li style="margin: 0.2rem 0;">Once you find your Waldo, the answer is clear but not as obvious as clear evidence questions</li>
      <li style="margin: 0.2rem 0;">You must read between the lines slightly</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Keywords to Identify These Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Always contains at least one of these keywords:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Inferred, Implies, Suggests, Assumed</li>
      <li style="margin: 0.2rem 0;">"Most reasonably," "Most likely," "Most clearly"</li>
      <li style="margin: 0.2rem 0;">"Most nearly," "Most strongly," "Best supports"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Strategy for inference questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for evidence that demonstrates or shows the answer, not states it directly</li>
      <li style="margin: 0.2rem 0;">The answer must still be supported by the passage—don''t make wild leaps</li>
      <li style="margin: 0.2rem 0;">Read for context around the relevant section</li>
      <li style="margin: 0.2rem 0;">The correct answer logically follows from what the passage shows</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Purpose and Main Idea Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Purpose questions:</strong> ask WHY a sentence, quotation, or paragraph is included
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Keywords: Purpose, "Serve(s) to," "In order to," "Mainly to," Function, "Primarily to"</li>
      <li style="margin: 0.2rem 0;">Must read for context—reading just the referenced lines won''t give you enough information</li>
      <li style="margin: 0.2rem 0;">Think about WHY the information is included in the passage</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Main idea questions:</strong> ask WHAT a portion of the passage is saying
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Keywords: "Main idea," "Best summarizes," "Central claim," Paraphrases</li>
      <li style="margin: 0.2rem 0;">The correct answer summarizes the referenced section</li>
      <li style="margin: 0.2rem 0;">Focus on the specific part the question asks about</li>
      <li style="margin: 0.2rem 0;">Context is less critical than for purpose questions, but still helpful</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Phrasings
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Purpose: "The author includes the quotation in the third paragraph in order to..."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Purpose: "The references to the Hulk and Ironman primarily serve to..."</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Main Idea: "Which of the following best summarizes the author''s justification for..."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Main Idea: "The main idea of the fifth paragraph (lines 60-73) is..."</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Words in Context Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Words in context questions:</strong> ask what a word or phrase "most nearly means" in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Usually testing a word/phrase used in an uncommon way</li>
      <li style="margin: 0.2rem 0;">The correct answer is often NOT the actual definition—it''s an alternate meaning based on context</li>
      <li style="margin: 0.2rem 0;">Always contains the phrase "most nearly means"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Read for context to find the meaning
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the sentence before, the sentence with the word, and the sentence after</li>
      <li style="margin: 0.2rem 0;">If still unclear, read more of the paragraph for additional context</li>
      <li style="margin: 0.2rem 0;">Don''t just pick the standard dictionary definition of the word</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Two Effective Methods
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Method #1 - Pick Your Own Word: Read context, choose your own word for what it means, then find the answer choice closest to your word
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Method #2 - Substitute Each Answer: Plug each answer choice into the sentence and see which makes the most sense</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Comparing Passages Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Comparing passages questions:</strong> appear at the end of dual text passages (3 questions total)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Ask you to compare the two passages in various ways</li>
      <li style="margin: 0.2rem 0;">May use any of the question types already covered (inference, purpose, main idea, etc.)</li>
      <li style="margin: 0.2rem 0;">Easy to spot—question clearly references both passages or both authors</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Phrasings
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Look for questions like:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"Which choice best describes the relationship between the two passages?"</li>
      <li style="margin: 0.2rem 0;">"One similarity between passage A and passage B is that both passages argue..."</li>
      <li style="margin: 0.2rem 0;">Any question that explicitly mentions both passages or both authors</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Use the same methods as regular passage questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Identify the question type (inference, purpose, etc.) and apply that strategy</li>
      <li style="margin: 0.2rem 0;">Just remember to consider evidence from BOTH passages</li>
      <li style="margin: 0.2rem 0;">Advanced tips for comparing passages covered in a later chapter</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Broad passage questions ask about the passage as a whole and should be answered LAST after you''ve completed other questions and understand the full passage. Clear evidence questions (keywords: indicates, states, argues, based on) have answers that directly restate passage text—don''t make inferences on these!
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Inference questions (keywords: inferred, implies, suggests, most reasonably/likely/clearly) require you to read between the lines—the answer is demonstrated but not directly stated. The evidence still strongly supports the answer, but you must make a logical connection rather than find an exact match.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Purpose questions ask WHY information is included (keywords: purpose, serve to, in order to, function) and require reading for context beyond just the referenced lines. Main idea questions ask WHAT a section is saying (keywords: main idea, best summarizes, central claim) and focus on summarizing the specific part mentioned.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Words in context questions always say "most nearly means" and test uncommon word usage—read the sentences before, during, and after for context; the answer is often not the standard definition. Comparing passages questions (3 at end of dual text) ask you to compare both passages and can use any question type already covered.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('breaking-down-questions', 'reading', 'Topic 2.2 - Breaking Down Questions', 'Topic 2.2 - Breaking Down Questions...', 'intermediate', 30, 6, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.2
Topic: Breaking Down Questions
Lesson Key: breaking-down-questions
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The most important skill for ACT Reading success is effectively breaking down each question to identify exactly what you''re being asked. Most students believe they already do this, but they''re not doing it effectively enough—if you can''t articulate exactly what you''re looking for before going back to the passage, you don''t know what the ACT is asking and you''re wasting time.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Skill #1 — Identify the Type of Question
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">When you read a question, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">first identify the question type</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You should memorize all keywords and approaches from Chapter 5 (7 question types)</li>
      <li style="margin: 0.2rem 0;">Knowing the type is critical to knowing how to approach the question</li>
      <li style="margin: 0.2rem 0;">Different question types require different types of evidence in the passage</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Question Type Identification
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Practice identifying types:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"The passage indicates that Austin had what reaction..." → Clear Evidence (keyword: indicates)</li>
      <li style="margin: 0.2rem 0;">"The author discusses dual insulation in order to..." → Purpose (keyword: in order to)</li>
      <li style="margin: 0.2rem 0;">"It can be inferred that the first attempt failed because..." → Inference (keyword: inferred)</li>
      <li style="margin: 0.2rem 0;">"According to the passage, Terry would occasionally..." → Clear Evidence (keyword: according to)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Why This Matters
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Understanding the question type determines your strategy
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Clear evidence questions: Look for exact text that matches the answer</li>
      <li style="margin: 0.2rem 0;">Inference questions: Look for evidence that demonstrates or shows the answer</li>
      <li style="margin: 0.2rem 0;">Purpose questions: Read for context to understand WHY information is included</li>
      <li style="margin: 0.2rem 0;">Main idea questions: Focus on summarizing WHAT a section says</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Skill #2 — Identify the Keywords
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">To find evidence quickly, identify the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">keywords</strong> in the question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Keywords are words/phrases you can skim for in the passage</li>
      <li style="margin: 0.2rem 0;">On the ACT, keywords from the question are almost always right near the evidence</li>
      <li style="margin: 0.2rem 0;">Keywords are like little flags saying "Look over here for the evidence!"</li>
      <li style="margin: 0.2rem 0;">After finding the keyword, use the 2-sentence rule: read 2 sentences before and 2 after</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Identify Keywords
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Underline important keywords as you read the question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Once underlined, you''ll know what words/phrases to skim for in the passage</li>
      <li style="margin: 0.2rem 0;">Keywords help you locate the right section of the passage quickly</li>
      <li style="margin: 0.2rem 0;">The evidence is almost always near the keywords</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Examples of Keyword Identification
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Example 1: "In the passage, the narrator describes a brick wall of an abandoned restaurant as:"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Keywords: "brick wall" and "abandoned restaurant"</li>
      <li style="margin: 0.2rem 0;">This is a clear evidence question (keyword: "in the passage")</li>
      <li style="margin: 0.2rem 0;">If you find where the passage discusses the brick wall of the abandoned restaurant, the answer should be right nearby and clearly match one answer choice</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Example 2: "The passage suggests that one difference between a white dwarf and a red giant is that a red giant:"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Keywords: "white dwarf" and "red giant"</li>
      <li style="margin: 0.2rem 0;">This is an inference question (keyword: "suggests")</li>
      <li style="margin: 0.2rem 0;">Look for where the passage discusses both terms and find a difference between them</li>
      <li style="margin: 0.2rem 0;">The answer won''t be as clearly stated as a clear evidence question</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Primary vs. Secondary Keywords
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Understanding keyword hierarchy
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Primary keywords: The main words/phrases that will help you locate the evidence section</li>
      <li style="margin: 0.2rem 0;">Secondary keywords: Additional words that confirm you''re in the right place</li>
      <li style="margin: 0.2rem 0;">Example: "According to the passage, compared to the temperature of a volcano undergoing an eruption, the temperature of a blue flame is:"</li>
      <li style="margin: 0.2rem 0;">Primary keywords: "volcano," "eruption," "blue flame," "temperature"</li>
      <li style="margin: 0.2rem 0;">You need to find where the passage compares these two temperatures</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Skill #3 — Rephrase the Question (If Necessary)
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For many questions, keywords alone are enough—<strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">no need to rephrase</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Simple/short questions are usually clear enough as written</li>
      <li style="margin: 0.2rem 0;">Example: "According to the passage, the Egyptians invented addition at the same time as:"</li>
      <li style="margin: 0.2rem 0;">This question makes it very clear what you''re looking for</li>
      <li style="margin: 0.2rem 0;">Skim for "Egyptians inventing addition," find the date, check which answer choice matches</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
When to Rephrase the Question
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For more complicated questions, rephrasing helps you know exactly what to look for
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use this skill when questions are complex or challenging to break down</li>
      <li style="margin: 0.2rem 0;">If you can rephrase it in your own words, you know exactly what you need from the passage</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example of When to Rephrase
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Complex question: "The narrator indicates that which of the following potential risks that doctors face while at work is a concern to her father?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rephrase: "What risk that doctors face is a concern for her father?"</li>
      <li style="margin: 0.2rem 0;">There''s no clear primary keyword to easily skim for</li>
      <li style="margin: 0.2rem 0;">Best primary keyword is probably "father"</li>
      <li style="margin: 0.2rem 0;">But if you just skim for "father" without clarity on what you''re looking for, you''ll have trouble finding the answer</li>
      <li style="margin: 0.2rem 0;">By rephrasing, you know you need: risks + doctors + father''s concern</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Putting It All Together
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Use all three skills systematically for <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">every question</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Identify the question type (clear evidence, inference, purpose, etc.)</li>
      <li style="margin: 0.2rem 0;">Step 2: Identify and underline the keywords</li>
      <li style="margin: 0.2rem 0;">Step 3: If needed, rephrase the question in your own words</li>
      <li style="margin: 0.2rem 0;">Only then should you go back to the passage to find evidence</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The Test: Can You Articulate What You''re Looking For?
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Before going to the passage, ask yourself:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"What EXACTLY am I looking for?"</li>
      <li style="margin: 0.2rem 0;">If you can''t answer this precisely, you haven''t broken down the question well enough</li>
      <li style="margin: 0.2rem 0;">Go back and apply these three skills until you can articulate exactly what you need</li>
      <li style="margin: 0.2rem 0;">This prevents wasted time wandering through the passage aimlessly</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Benefits of Effective Question Breakdown
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Why mastering these skills matters:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Find evidence faster = better time management</li>
      <li style="margin: 0.2rem 0;">Know exactly what you''re looking for = higher accuracy</li>
      <li style="margin: 0.2rem 0;">Understand question types = use the right approach for each</li>
      <li style="margin: 0.2rem 0;">The better you get at breaking down questions, the easier Reading becomes</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>First identify the question type using keywords from Chapter 5—this determines your approach and what type of evidence to look for. Clear evidence questions need exact text, inference questions need demonstrated evidence, purpose questions need context, and main idea questions need summaries.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Identify and underline keywords in the question—these are the words/phrases you''ll skim for in the passage. Keywords are like flags saying "evidence is here!" Use the 2-sentence rule: read 2 sentences before and 2 after the keyword location to find your evidence.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For simple questions, keywords alone are enough—no need to rephrase. For complex questions that are challenging to break down, rephrase in your own words to clarify exactly what you''re looking for. This prevents wasting time wandering through the passage aimlessly.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Before going to the passage, ask yourself "What EXACTLY am I looking for?" If you can''t articulate this precisely, you haven''t broken down the question well enough. Apply all three skills (identify type, find keywords, rephrase if needed) to every question—the better you break down questions, the easier Reading becomes and the better your time management.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('answer-choices', 'reading', 'Topic 2.3 - How to Approach the Answer Choices', 'Topic 2.3 - How to Approach the Answer Choices...', 'intermediate', 30, 7, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.3
Topic: How to Approach the Answer Choices
Lesson Key: answer-choices
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Knowing when and how to use the answer choices effectively is crucial for Reading success. This chapter teaches you strategic approaches for reading answer choices and how to work both forwards (finding evidence) and backwards (eliminating incorrect answers) simultaneously to find the correct answer as quickly and consistently as possible.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. When to Read the Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">After reading the question, you can either read the answer choices right away or go back to the passage first
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The answer depends on the question type, your reading comprehension skills, and your recall of the passage</li>
      <li style="margin: 0.2rem 0;">There is no 100% right or wrong time to read the answer choices—it''s about finding what works for you</li>
      <li style="margin: 0.2rem 0;">Try different methods on practice passages and practice tests to discover your optimal approach</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 1: Read Answer Choices Right Away for "Which of the Following" Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For "which of the following" questions, always read the answer choices before going to the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Without reading the answer choices, it''s impossible to know what you''re looking for</li>
      <li style="margin: 0.2rem 0;">Example: "Which of the following best describes the author''s view of Grier''s theory?"</li>
      <li style="margin: 0.2rem 0;">The question is too broad without seeing the four specific options</li>
      <li style="margin: 0.2rem 0;">Knowing the 4 options makes it easier to find the correct answer and usually saves time</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 2: Come Up With Your Own Answer First for Purpose Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For purpose questions, go back to the passage first and come up with your own answer
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read for context and determine WHY the information is included</li>
      <li style="margin: 0.2rem 0;">Once you have your answer, look at the answer choices to see which one matches your reasoning</li>
      <li style="margin: 0.2rem 0;">If none match, you may have misunderstood—reread with the answer choices in mind</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 3: Try Your Own Answer First for Broad Passage Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">After reading the entire passage and answering all other questions, come up with your own answer
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You''ll understand the passage well by this point, so you can answer questions about the passage as a whole</li>
      <li style="margin: 0.2rem 0;">Once you have your answer, look at the choices to see which one matches</li>
      <li style="margin: 0.2rem 0;">If you found the passage difficult and can''t come up with your own answer, read the choices right away</li>
      <li style="margin: 0.2rem 0;">Knowing the 4 options can make it easier to find the answer or eliminate incorrect choices</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 4: Try Both Methods for Clear Evidence and Inference Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Method #1: Read answer choices right away</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You know the 4 options before going back to the passage</li>
      <li style="margin: 0.2rem 0;">As you read, you may recognize evidence that matches an answer choice you just read</li>
      <li style="margin: 0.2rem 0;">Helps you recognize the correct answer more quickly and can save time if you remember the answer</li>
      <li style="margin: 0.2rem 0;">WARNING: This doesn''t work if reading the choices distracts you from knowing EXACTLY what the question asks</li>
      <li style="margin: 0.2rem 0;">Some students reread the question after reading all 4 choices to ensure they know what they''re looking for</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Method #2: Go back to the passage first</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If reading answer choices distracts you, go to the passage first and look for evidence</li>
      <li style="margin: 0.2rem 0;">Clear evidence and inference questions are usually specific, so you''ll know where to read</li>
      <li style="margin: 0.2rem 0;">By reading before looking at choices, you''re 100% focused on answering the question</li>
      <li style="margin: 0.2rem 0;">Once you find potential evidence, read the answer choices and eliminate incorrect ones</li>
      <li style="margin: 0.2rem 0;">If you can''t find evidence in 20-30 seconds, read the answer choices—they may trigger your memory</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 5: Read Answer Choices When You Don''t Have Primary Keywords
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For vague questions without primary keywords, read the answer choices right away
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The answer choices may help identify where to go or trigger your memory</li>
      <li style="margin: 0.2rem 0;">Example: "How did the narrator''s personality affect her research?" has no clear keywords to skim for</li>
      <li style="margin: 0.2rem 0;">Reading the 4 options makes it easier to eliminate incorrect choices and know what to look for</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Strategy 6: Use Answer Choices to Help on Difficult Passages
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For passages you have trouble understanding, read the answer choices more quickly
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you read a passage and don''t understand what''s going on, let the answer choices help you</li>
      <li style="margin: 0.2rem 0;">For any questions in a difficult passage, read the answer choices right away</li>
      <li style="margin: 0.2rem 0;">Example: If asked about a paragraph''s main idea but you don''t understand it, read the 4 options then reread the paragraph</li>
      <li style="margin: 0.2rem 0;">Knowing the 4 options may help you recognize what the paragraph is saying</li>
      <li style="margin: 0.2rem 0;">The more you use the answer choices to help, the more you''ll understand and answer correctly</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. How to Read Answer Choices Most Effectively
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The recommended approach: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Work both forwards and backwards simultaneously</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Working forwards = looking for evidence in the passage that matches the correct answer</li>
      <li style="margin: 0.2rem 0;">Working backwards = eliminating incorrect answer choices</li>
      <li style="margin: 0.2rem 0;">In an ideal world, you''d find Waldo every time by working forwards, but that''s difficult</li>
      <li style="margin: 0.2rem 0;">For some questions, it''s easier to eliminate three incorrect answers than find evidence for the correct one</li>
      <li style="margin: 0.2rem 0;">If you can eliminate 3 answer choices as incorrect, you''ve found the correct answer—even without evidence</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Working Forwards — Look for Evidence in the Passage
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Put your finger on the evidence (the Waldo!) and match it to the correct answer choice
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is the ideal approach when you can clearly identify the supporting evidence</li>
      <li style="margin: 0.2rem 0;">Finding evidence that supports the correct answer for every question is difficult</li>
      <li style="margin: 0.2rem 0;">Don''t rely solely on working forwards—combine it with working backwards</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Working Backwards — Eliminate Incorrect Answer Choices
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Anytime you see an answer choice that is incorrect for any reason, cross it off
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You''ll learn the 5 types of incorrect answer choices in Chapter 2.4</li>
      <li style="margin: 0.2rem 0;">For some questions, eliminating three incorrect choices is easier than finding the evidence</li>
      <li style="margin: 0.2rem 0;">Even without finding evidence in the passage, if you eliminate 3 choices, you''ve found the correct answer</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Working Forwards and Backwards Simultaneously
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">As you read each answer choice, ask yourself two questions:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Question 1 (Working Forwards):</strong> "Is there evidence in the passage that matches what this answer choice says?"</li>
      <li style="margin: 0.2rem 0;"><strong>Question 2 (Working Backwards):</strong> "Is there any specific detail or strong statement in this answer choice that could make it incorrect?"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Evaluating Answer Choices
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Working forwards requires going back to the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you find Waldo, you''ll know the correct answer</li>
      <li style="margin: 0.2rem 0;">If there''s no evidence to support the answer choice, it''s incorrect—cross it off</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Working backwards means looking for words that could make the answer incorrect
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Be cautious about specific details or strong statements in answer choices</li>
      <li style="margin: 0.2rem 0;">Stronger and more specific answer choices are usually incorrect because they can''t be supported by the passage</li>
      <li style="margin: 0.2rem 0;">More boring answer choices are more commonly correct</li>
      <li style="margin: 0.2rem 0;">The ACT knows students prefer to pick specific choices when struggling (easier to justify), so they use this as a trap</li>
      <li style="margin: 0.2rem 0;">Nobody wants to pick boring answers, but boring is usually better on ACT Reading!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Key Strategy When Stuck Between Two Answers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">If you''re stuck between two answer choices and cannot find evidence to support either one:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Always pick the less detailed answer choice</strong></li>
      <li style="margin: 0.2rem 0;">Boring is usually better on the ACT Reading Test</li>
      <li style="margin: 0.2rem 0;">More specific answer choices tend to include details that go beyond what the passage supports</li>
      <li style="margin: 0.2rem 0;">More general (boring) answer choices are safer because they''re less likely to contradict the passage</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>When to read answer choices depends on question type: always read them first for "which of the following" questions and questions without clear keywords, but try coming up with your own answer first for purpose and broad passage questions. For clear evidence and inference questions, experiment with both methods to find what works best for you.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Work both forwards and backwards simultaneously—look for evidence in the passage that matches an answer choice (forwards) while also looking for specific details or strong statements that could make a choice incorrect (backwards). For some questions, it''s easier to eliminate three incorrect answers than to find evidence for the correct one.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Be cautious of specific details and strong statements in answer choices—stronger and more specific choices are usually incorrect because they can''t be supported by the passage. More boring, general answer choices are more commonly correct, even though students tend to prefer specific choices because they''re easier to justify when struggling.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>If stuck between two answer choices and you cannot find evidence to support either one, always pick the less detailed (more boring) answer choice. Remember: boring is usually better on the ACT Reading Test because specific answer choices tend to include details that go beyond what the passage actually supports.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('correct-vs-incorrect', 'reading', 'Topic 2.4 - Correct vs. Incorrect Answer Choices', 'Topic 2.4 - Correct vs. Incorrect Answer Choices...', 'intermediate', 30, 8, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.4
Topic: Correct vs. Incorrect Answer Choices
Lesson Key: correct-vs-incorrect
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Understanding what makes an answer choice correct or incorrect is one of the most important skills for Reading success. Many students feel like they''re looking for the "best" answer, but this is wrong—there is always 1 correct and 3 incorrect answer choices, and the challenge is knowing what makes the correct answer right and the incorrect answers wrong.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. The 5 Common Types of Incorrect Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For success on the Reading Test, you must be able to explain what makes an answer choice incorrect
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For an answer choice to be correct, it must be supported by evidence in the passage AND answer the question being asked</li>
      <li style="margin: 0.2rem 0;">If you understand not only what makes an answer correct but also what makes the others incorrect, finding the right answer becomes much easier</li>
      <li style="margin: 0.2rem 0;">The 5 most common types of incorrect answers on the ACT Reading Test are: Not in the Passage, Too Specific, Too Broad, Opposite or Slant of the Passage, and In the Passage but Not Answering the Question</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Type #1 — Not in the Passage
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Many incorrect answer choices include information that is not in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If the answer choice includes details that are not in the passage, the answer is incorrect</li>
      <li style="margin: 0.2rem 0;">Could you picture the detail being true? Maybe. Could it be possible? Sure. But we don''t know it for sure from the passage.</li>
      <li style="margin: 0.2rem 0;">If we cannot point to evidence in the passage that supports an answer choice, we can only tell a story of why we think it could be true</li>
      <li style="margin: 0.2rem 0;">As learned in Chapter 1: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">There is no storytelling!</strong></li>
      <li style="margin: 0.2rem 0;">If an answer choice is not clearly supported by evidence in the passage, then it is always wrong</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example: Adam''s Clothing
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Passage excerpt: "Adam rolled up the tattered sleeves of his sweater, exposing the winding snake tattoos on both of his forearms... Despite now living in upstate New York, he still wore his Army boots every day, the tops of which were hidden below his faded black jeans, the only pair that he owns..."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question: "Which of the following can be assumed about Adam''s clothing?"</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "He only wears the most comfortable clothing" (not stated—we cannot point to evidence for this)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "The army provided him with free clothes" (not stated—this is storytelling)</li>
      <li style="margin: 0.2rem 0;">CORRECT: "His clothes are old and worn out" (supported by "tattered sleeves" and "faded black jeans")</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "He only owns one sweater" (not stated—the passage only mentions one pair of jeans)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Type #2 — Too Specific
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Incorrect answer choices are very commonly too specific
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Often, a single word or short phrase in an answer choice makes the entire answer incorrect</li>
      <li style="margin: 0.2rem 0;">If the answer choice is too specific and goes beyond what the passage says, it is always incorrect</li>
      <li style="margin: 0.2rem 0;">As you read each answer choice, look for specific details and strong statements that could make it incorrect</li>
      <li style="margin: 0.2rem 0;">Ask yourself: "Does the passage really say that?"</li>
      <li style="margin: 0.2rem 0;">Remember: The more specific and stronger an answer choice is, the more likely it will be incorrect</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example: Pelicans'' Fishing Habits
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Passage excerpt: "Pelicans'' diets include fish, amphibians, small turtles, crabs, and even other small birds... The groups of birds will form a line to drive schools of smaller fish into the shallower waters... and then scooping up their favorite prey."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question: "Which of the following statements can be inferred from the passage?"</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Pelicans prey predominantly on fish during the summer months" (too specific—"summer months" not mentioned)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Great White pelicans are the only species that hunt for turtles" (too specific—species not mentioned)</li>
      <li style="margin: 0.2rem 0;">CORRECT: "Small ocean fish are the main prey for pelicans" (supported by "favorite prey" referring to smaller fish)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Pelicans do the majority of their hunting in shallow waters" (too specific—"majority" goes beyond what''s stated)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Type #3 — Too Broad
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Sometimes an answer choice is incorrect because it is too broad
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">More common: The answer choice does not specifically answer the question being asked</li>
      <li style="margin: 0.2rem 0;">Less common: The answer does not match a more specific statement made in the passage</li>
      <li style="margin: 0.2rem 0;">While broad answer choices are better in general, make sure your choice is always specific enough to answer the exact question asked</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example: Darwin''s Finches and Evolution
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Passage excerpt: "Dr. Anders Robert became fascinated with evolution... But he was never fully satisfied with Darwin''s explanation... Dr. Robert will travel to the Galapagos Islands to study changes in the beaks of some of the same species of finches that Darwin studied..."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question: "The main idea of the passage is to:"</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Research the theory of evolution using Darwin''s finches" (too broad—doesn''t answer what the passage is about)</li>
      <li style="margin: 0.2rem 0;">CORRECT: "Test a new idea about evolution by studying finches'' beaks" (specific enough and captures the main idea)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Highlight Dr. Robert''s lifelong fascination with evolution" (too broad and "lifelong" not supported)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Recreate Darwin''s research" (word "recreate" doesn''t match—he''s testing his own new theory)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Type #4 — Opposite or Slant of the Passage
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Many incorrect answers on the ACT are the opposite or a slant of what the passage states
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These answer choices often look correct because they include exact words or phrases from the passage</li>
      <li style="margin: 0.2rem 0;">However, they are incorrect because the answer choice is the opposite or a slant of what is in the passage</li>
      <li style="margin: 0.2rem 0;">Do not pick an answer choice just because you find a word or phrase that is directly in the passage</li>
      <li style="margin: 0.2rem 0;">Always make sure the answer choice is 100% correct—exact words from the passage are often in incorrect choices</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example: Ocean Currents
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Passage excerpt: "As water freezes in the North and South Poles, the water surrounding the ice becomes saltier and colder... The cold, salty water sinks due to its increased density... it travels southward to spread across the submerged surface of the earth... Warm water replaces it on the surface and moves to the north."
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question: "Which statement about the global conveyor belt is best supported by the passage?"</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Cold, salty water comes to the surface" (opposite—passage says it sinks)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "The currents change with the seasons" (not in the passage)</li>
      <li style="margin: 0.2rem 0;">INCORRECT: "Melting ice is the first step" (opposite—passage says freezing water, not melting ice)</li>
      <li style="margin: 0.2rem 0;">CORRECT: "Cold, salty water travels south on the ocean floor and warm water moves north on the surface" (matches passage)</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Type #5 — In the Passage but Not Answering the Question
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">This final type of incorrect answer is often the most difficult to avoid
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These are answer choices that are directly stated in the passage but do not answer the question being asked</li>
      <li style="margin: 0.2rem 0;">You will be able to go to the passage, find the information, and match it with the answer choice</li>
      <li style="margin: 0.2rem 0;">However, it will still be incorrect because it doesn''t answer what the question is asking!</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Two Critical Reminders
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Reminder #1:</strong> Do not select an answer choice because it has a word or phrase that matches the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Make sure the answer choice is 100% correct</li>
      <li style="margin: 0.2rem 0;">The ACT will often put exact words or phrases from the passage in incorrect answer choices to try to trick you</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Reminder #2:</strong> Finding evidence for an answer choice in the passage does not mean you found the correct answer
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You still need to make sure you are answering the question the ACT is asking</li>
      <li style="margin: 0.2rem 0;">Evidence in the passage + answering the question = correct answer</li>
      <li style="margin: 0.2rem 0;">Evidence in the passage alone ≠ correct answer (if it doesn''t answer the question)</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Type #1 (Not in the Passage): If an answer choice includes details not in the passage, it''s incorrect—no matter how possible or logical it seems. There is no storytelling! If you can''t point to evidence in the passage that clearly supports an answer choice, it''s always wrong.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Type #2 (Too Specific) and Type #3 (Too Broad): Look for specific details and strong statements that could make an answer incorrect—often a single word makes the entire choice wrong. The more specific and stronger an answer is, the more likely it''s incorrect. However, make sure your answer choice is still specific enough to answer the exact question being asked.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Type #4 (Opposite or Slant): Don''t pick an answer just because it contains exact words or phrases from the passage—the ACT often puts passage words in incorrect choices. These answers are the opposite or a slant of what the passage actually says. Always verify the answer choice is 100% correct, not just that it contains familiar words.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Type #5 (In the Passage but Not Answering the Question): The most difficult type to avoid—these answers are directly stated in the passage and you can find evidence for them, but they still don''t answer the question being asked. Finding evidence in the passage doesn''t mean you found the correct answer; you must also answer the exact question the ACT is asking.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('words-in-context', 'reading', 'Topic 2.5 - Words in Context Questions', 'Topic 2.5 - Words in Context Questions...', 'intermediate', 30, 9, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.5
Topic: Words in Context Questions
Lesson Key: words-in-context
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Words in context questions ask you to select what a word or phrase "most nearly means" in the context of the passage. Usually, you''re determining the meaning of a word or phrase used in an unusual or uncommon way, and the correct answer is not the actual definition of the word but instead an alternate meaning based on the context.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Identify Words in Context Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Words in context questions always have the phrase <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">"most nearly means"</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "As used in line 9, ''critical'' most nearly means:"</li>
      <li style="margin: 0.2rem 0;">The question will specify the exact line number where the word or phrase appears</li>
      <li style="margin: 0.2rem 0;">Answer choices typically provide 4 different possible meanings of the word</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Finding the Correct Answer
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">To find the correct answer, you must read for context
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read the sentence before, the sentence the word or phrase is in, and the following sentence</li>
      <li style="margin: 0.2rem 0;">If you''re still not clear on what the word or phrase means, read for more context—as much as you need</li>
      <li style="margin: 0.2rem 0;">The surrounding text will help you understand how the word is being used in this specific instance</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Method #1 — Pick Your Own Word
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 1:</strong> Read for context
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read at least 1 sentence before and after the word or phrase in the question</li>
      <li style="margin: 0.2rem 0;">Read more if necessary to understand the context</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 2:</strong> Pick your own word(s) to replace the word or phrase in the question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Write your word(s) down to keep track of your thinking</li>
      <li style="margin: 0.2rem 0;">If you''re having trouble picking a specific word, try to pick a tone instead</li>
      <li style="margin: 0.2rem 0;">Decide if the tone of the word or phrase is positive, negative, or neutral based on the surrounding text</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 3:</strong> Look at the answer choices and pick the one that best matches
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Compare each answer choice to your word(s) or tone</li>
      <li style="margin: 0.2rem 0;">Select the answer that most closely matches what you came up with</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Method #2 — Read the Answer Choices Back in the Passage
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 1:</strong> Read each answer choice back in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Substitute each answer choice in place of the word in the passage</li>
      <li style="margin: 0.2rem 0;">Make sure to still read for context when you plug in each answer choice</li>
      <li style="margin: 0.2rem 0;">Don''t just read the single sentence—read the surrounding sentences too</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 2:</strong> Pick the answer choice that best replaces the word in the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The correct answer will fit naturally in the context of the passage</li>
      <li style="margin: 0.2rem 0;">Both approaches are equally effective, so which one you use is a matter of preference</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Tip #1 — Do Not Assume the Hard Vocabulary Word is Correct
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Words in context questions are one place the ACT commonly tests vocabulary knowledge
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you see any word(s) that you do not know, do not assume the hard word is correct</li>
      <li style="margin: 0.2rem 0;">Many students mistakenly think: "Oh, this is the ACT...it must be the hard word since they''re testing my vocabulary"</li>
      <li style="margin: 0.2rem 0;">Wrong! Sometimes the ACT is testing your vocabulary and the hard word is correct</li>
      <li style="margin: 0.2rem 0;">Other times, the hard word is just a decoy and a simpler word that you know fits correctly</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Tip #2 — Do Not Pick the Answer Choice That Defines the Word
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The correct answer is rarely the definition of the word
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most commonly, the word or phrase in the passage is used in an uncommon or unusual way that differs from the definition</li>
      <li style="margin: 0.2rem 0;">The ACT is testing whether you can understand the word based on context, not just whether you know the definition</li>
      <li style="margin: 0.2rem 0;">However, this is not always the case—sometimes the correct answer is the definition</li>
      <li style="margin: 0.2rem 0;">This occurs most commonly for hard vocabulary words where the ACT is genuinely testing if you know the word</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Tip #3 — Do the Best You Can With the Words You Know
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">On words in context questions, do the best you can with the words you know
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If there is a word you know and it works, pick that word</li>
      <li style="margin: 0.2rem 0;">If you know a word and it does not work, cross it off</li>
      <li style="margin: 0.2rem 0;">If you''re stuck between two words that you do not know, bubble in your best guess and move on</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Do Not Waste Time on Unknown Words
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Do not waste time trying to figure out the definitions of words that you do not know
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You either know what a word means, or you don''t</li>
      <li style="margin: 0.2rem 0;">No amount of time thinking about what the word means will help you</li>
      <li style="margin: 0.2rem 0;">Move on and use your time answering other questions where you can make progress</li>
      <li style="margin: 0.2rem 0;">It''s better to guess and spend your time on questions you can answer confidently</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Words in context questions always have the phrase "most nearly means" and ask you to determine what a word or phrase means based on how it''s used in the passage. The correct answer is usually not the actual definition but an alternate meaning based on context, so you must read the sentence before, the sentence with the word, and the sentence after (or more if needed).
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Two effective methods: Method #1 is to read for context, pick your own word (or tone: positive/negative/neutral), then find the answer choice that best matches. Method #2 is to read each answer choice back into the passage with context and pick the one that fits best. Both approaches are equally effective—use whichever you prefer.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Do not assume the hard vocabulary word is correct—sometimes it is, but other times it''s just a decoy and a simpler word fits better. Also, do not automatically pick the answer choice that defines the word, since the ACT usually tests uncommon uses of words rather than standard definitions (though definitions are correct for hard vocabulary words).
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Do the best you can with words you know: pick words that work, eliminate words that don''t, and guess between unknown words. Do not waste time trying to figure out definitions of words you don''t know—you either know a word or you don''t, and no amount of thinking will help. Move on and use your time on questions you can answer confidently.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('comparing-passages', 'reading', 'Topic 2.6 - Tips for Comparing Passages Questions', 'Topic 2.6 - Tips for Comparing Passages Questions...', 'intermediate', 30, 10, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 2.6
Topic: Tips for Comparing Passages Questions
Lesson Key: comparing-passages
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Each ACT has 1 dual text passage with two short passages (Passage A and Passage B) that discuss similar topics and are somehow related. At the end, there are always 3 comparing passages questions that ask about both passages—this chapter teaches you how to approach these questions effectively.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Understanding Dual Text Passages
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Dual text passages include two short passages labeled as Passage A and Passage B
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The two passages discuss similar topics and are somehow related</li>
      <li style="margin: 0.2rem 0;">Example: Two scientists offering differing opinions on a recent discovery</li>
      <li style="margin: 0.2rem 0;">Questions always go in this order: Passage A Questions → Passage B Questions → Comparing Passages Questions (3 questions)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Approach Dual Text Passages
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Recommended approach:</strong> Read each passage separately—do not read both passages before starting the questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Step 1: Read Passage A and answer questions for Passage A</li>
      <li style="margin: 0.2rem 0;">Step 2: Read Passage B and answer questions for Passage B</li>
      <li style="margin: 0.2rem 0;">Step 3: Answer Comparing Passages Questions</li>
      <li style="margin: 0.2rem 0;">Since the passages are shorter, most students find it easier to read the entire passage</li>
      <li style="margin: 0.2rem 0;">Still apply whatever method you prefer from the ones discussed in Chapter 1.3</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">If you work backwards:</strong> Answer questions for Passage A, then Passage B, then Comparing Passages Questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Use the questions to guide your reading of each passage</li>
      <li style="margin: 0.2rem 0;">Still save the Comparing Passages Questions for last</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Identifying Comparing Passages Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Comparing passages questions are always the last 3 questions in the dual text passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "Which of the following statements best captures the main difference in the purposes of the two passages?"</li>
      <li style="margin: 0.2rem 0;">Example: "Which of the following statements about instruments is most strongly supported by details provided in Passage A and Passage B?"</li>
      <li style="margin: 0.2rem 0;">The ACT will have a box telling you that the question asks about both passages</li>
      <li style="margin: 0.2rem 0;">To answer correctly, you must use information from both passages</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Tip #1 — Read the Answer Choices Right Away
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Comparing passages questions are generally quite broad, so you should always read the answer choices right away
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Once you''ve read the answer choices and know what the 4 options are, it''s much easier to accomplish two things:</li>
      <li style="margin: 0.2rem 0;">(1) Eliminate any answer choices that are clearly incorrect</li>
      <li style="margin: 0.2rem 0;">(2) Know what to look for in Passage A and Passage B</li>
      <li style="margin: 0.2rem 0;">Without reading the answer choices first, you may waste time searching aimlessly through both passages</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Tip #2 — Work Backwards More Actively with the Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Comparing passages questions generally have longer answer choices because the answer choice must refer to information in both passages
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When you see longer answer choices, work backwards more actively</li>
      <li style="margin: 0.2rem 0;">Look for specific details that do not match the passage</li>
      <li style="margin: 0.2rem 0;">Often, multiple answer choices are partly correct</li>
      <li style="margin: 0.2rem 0;">It''s easier to look for what is incorrect about each answer choice rather than focusing on which seems most correct</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question: "The primary purpose of both passages is to:"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A. resolve a long-standing debate on the evolution of vampire bats</li>
      <li style="margin: 0.2rem 0;">B. celebrate the findings of recent research by Brazilian scientists</li>
      <li style="margin: 0.2rem 0;">C. present two competing theories on the development of echolocation in vampire bats</li>
      <li style="margin: 0.2rem 0;">D. catalog evidence from multiple studies that supports a finding about vampire bats</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">We need to pick an answer that matches both passages
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Rather than looking for the correct answer, it''s easier to eliminate choices that don''t match one passage</li>
      <li style="margin: 0.2rem 0;">If Passage A only presents one theory about echolocation, C is incorrect</li>
      <li style="margin: 0.2rem 0;">If Passage B discusses a debate but doesn''t resolve it, A is incorrect</li>
      <li style="margin: 0.2rem 0;">Working backwards with this thinking makes finding the correct answer easier</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Tip #3 — Beware of Half-Right Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For comparing passages questions, the ACT loves writing answer choices that are halfway correct
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Part of the answer choice perfectly answers the question</li>
      <li style="margin: 0.2rem 0;">However, there is something wrong with the remaining portion of the answer choice</li>
      <li style="margin: 0.2rem 0;">Students often pick these incorrect choices because they get excited over the part that''s correct</li>
      <li style="margin: 0.2rem 0;">They don''t read the rest of the answer choice carefully enough</li>
      <li style="margin: 0.2rem 0;">As always, we need to be very picky when assessing each answer choice—especially for comparing passages questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example of Half-Right Answer Choices
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question: "Which choice best states the relationship between the two passages?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A. Passage A provides an overview of a scientific discovery, while Passage B summarizes the experiments that led to that discovery</li>
      <li style="margin: 0.2rem 0;">B. Passage A summarizes a scientific finding, while Passage B focuses on the potential applications of that finding</li>
      <li style="margin: 0.2rem 0;">C. Passage A presents conflicting points of view on an issue, while Passage B presents evidence supporting a single view on that issue</li>
      <li style="margin: 0.2rem 0;">D. Passage A considers how to best test two hypotheses, while Passage B argues that only one of the hypotheses is valid</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Notice how the first half of A and B are both very similar
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">These could both accurately describe Passage A, but only one can be correct</li>
      <li style="margin: 0.2rem 0;">This means one of these answer choices must be half-right</li>
      <li style="margin: 0.2rem 0;">It''s important to focus on the second half of the answer choices to determine which is correct</li>
      <li style="margin: 0.2rem 0;">As always, the correct answer must be 100% correct!</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Tip #4 — Do Not Focus on the Identical Parts of the Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Many comparing passages questions have portions of multiple answer choices that are identical
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When you see identical parts in the answer choices, do not focus on the similarities</li>
      <li style="margin: 0.2rem 0;">Instead, <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">focus on the differences</strong></li>
      <li style="margin: 0.2rem 0;">Students make the mistake of trying to figure out which identical part is more correct, which is often impossible</li>
      <li style="margin: 0.2rem 0;">You should focus on the differences in the rest of the answer choice—this is what actually determines which is correct</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example of Identical Parts
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question: "How do the two passages differ in the attitudes of each author towards women serving in the army?"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A. Smith implies that women should be prevented from serving in the army, whereas Jones supports women serving in the army in non-combat roles</li>
      <li style="margin: 0.2rem 0;">B. Smith believes that women with certain physical abilities can be considered for service in the army, whereas Jones assumes that physical ability is unrelated to any person''s ability to serve</li>
      <li style="margin: 0.2rem 0;">C. Smith argues that service should be a personal choice regardless of gender, whereas Jones contends that women are unsuitable to serve due to emotional instability</li>
      <li style="margin: 0.2rem 0;">D. Smith asserts that anyone who can serve in the army should be able to do so, whereas Jones argues that men and women should serve in gender-specific roles</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The first half of C and D are both saying the same thing: anyone should be able to serve
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If Smith argues that in Passage A, there''s no way to tell if C or D is correct by focusing on the first half alone</li>
      <li style="margin: 0.2rem 0;">Instead, we need to look at the rest of the answer choices and focus on the differences</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Similarly, the second half of A and D are making almost identical statements
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Both say men and women should have separate roles in the army</li>
      <li style="margin: 0.2rem 0;">If Jones argued that in Passage B, don''t focus on determining which is more correct</li>
      <li style="margin: 0.2rem 0;">Instead, look at the first half of those answer choices and focus on the differences to find which is correct</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For dual text passages, read each passage separately and answer questions in order: Passage A questions, Passage B questions, then the 3 Comparing Passages Questions at the end. Since the passages are shorter, most students find it easier to read the entire passage, but still apply your preferred method from Chapter 1.3.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always read the answer choices right away for comparing passages questions since they''re generally quite broad. This makes it easier to eliminate clearly incorrect choices and know what to look for in both passages. Work backwards more actively with these longer answer choices—look for specific details that don''t match rather than focusing on which seems most correct.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Beware of half-right answer choices—the ACT loves to write choices where part perfectly answers the question but something is wrong with the remaining portion. Students often pick these because they get excited over the correct part and don''t read the rest carefully. Remember: the correct answer must be 100% correct!
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>When multiple answer choices have identical parts, do not focus on the similarities—focus on the differences. Trying to figure out which identical part is "more correct" is often impossible and wastes time. The differences in the rest of the answer choice are what actually determine which answer is correct.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('working-backwards', 'reading', 'Topic 3.1 - Working Backwards', 'Topic 3.1 - Working Backwards...', 'intermediate', 30, 11, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 3.1
Topic: Working Backwards
Lesson Key: working-backwards
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Working backwards means going straight to the questions without reading the entire passage first—it''s not recommended for all students, but it may help you improve your score if you struggle with time management or recall. All students should know how to work backwards in case you mess up pacing and need to use it on the final passage on test day.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. When Should You Work Backwards?
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Work backwards if:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You cannot finish the passages in time with any method that involves reading the passage first</li>
      <li style="margin: 0.2rem 0;">You find yourself not recalling what you read at the end of the passage—you''re probably wasting time reading</li>
      <li style="margin: 0.2rem 0;">You can finish but are tight on time, and timing (not comprehension) is your biggest issue—try it and see if it helps</li>
      <li style="margin: 0.2rem 0;">You mismanage time and have less than 4 minutes for the final passage—reading will use up most of your time, so go straight to questions</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Do NOT work backwards if:</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You can finish in time with the Big Read, Big Read with Notes, or Label then Read—reading the entire passage will likely help you score higher</li>
      <li style="margin: 0.2rem 0;">You''re aiming for 32-36 (can only miss 0-3 questions)—if you never read the passage, you''re more likely to get questions wrong because you didn''t find the correct evidence (though some students have scored perfectly working backwards, so it depends on you)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
How to Tell If Working Backwards Is for You
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The best way to see if working backwards helps you is to try it on practice passages and practice tests
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If it sounds like it might help you, try it out—you may find it improves your score, or you may hate it</li>
      <li style="margin: 0.2rem 0;">Working backwards takes lots of practice to master since it''s somewhat chaotic and requires thinking on the fly</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. General Steps for Working Backwards
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Working backwards requires answering questions out of order, making quick decisions, knowing when to give up and move on, and thinking on the fly
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This is a general recommendation, not an exact order—don''t feel you must stick to the exact sequence</li>
      <li style="margin: 0.2rem 0;">The approach will vary based on the question types and your own reading/skimming skills</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 1: Go Straight to the Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Go straight to the questions before reading the passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You will never read the entire passage when working backwards</li>
      <li style="margin: 0.2rem 0;">Instead, you''ll read only the parts of the passage needed to answer specific questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 2: Skip Broad Passage Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Skip any broad passage questions that ask about the entire passage—save those for last
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You need to understand the whole passage to answer these, which you won''t have yet</li>
      <li style="margin: 0.2rem 0;">Answer these at the very end after you''ve read parts of the passage for other questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 3: Skip Questions Requiring Multiple Parts of the Passage
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Skip questions that require reading various parts of the passage—save those for later
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Chronological order questions: "Which of the following events occurs in the passage first chronologically?"</li>
      <li style="margin: 0.2rem 0;">Questions requiring various details: "The author would most likely agree with which of the following statements?"</li>
      <li style="margin: 0.2rem 0;">Vague questions with no good keywords to skim for: "As summarized in the passage, the study focuses primarily on:"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 4: Start with Line Reference and Paragraph Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Start with line reference questions or questions that reference a specific paragraph
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Example: "The main idea of the third paragraph..."</li>
      <li style="margin: 0.2rem 0;">Other easy questions: words in context questions</li>
      <li style="margin: 0.2rem 0;">Use the 2-sentence rule for these questions and read for more context if necessary</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 5: Answer Clear Evidence Questions with Strong Keywords
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Next, look for clear evidence questions with strong primary keywords
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Look for capitalized words, numbers, other unique keywords that are easier to find in the passage</li>
      <li style="margin: 0.2rem 0;">Look for clear evidence questions with shorter answer choices, as these are often easier to find and faster to answer</li>
      <li style="margin: 0.2rem 0;">Skip clear evidence questions with weak keywords and save those for later (unless you already know where to find the evidence)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 6: Answer Inference Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Next, answer inference questions—start with those with strong primary keywords
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Skip inference questions with weak keywords and save for later (unless you already know where to go)</li>
      <li style="margin: 0.2rem 0;">Use the answer choices more actively—for inference questions the Waldo won''t be as clear</li>
      <li style="margin: 0.2rem 0;">Knowing the 4 options makes it easier and faster to find evidence, eliminate incorrect choices, and answer correctly</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 7: Handle Purpose Questions Based on Keywords
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Purpose questions are generally best saved for later, but it depends on the keywords
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If a purpose question has line references, you can usually answer right away—read for enough context</li>
      <li style="margin: 0.2rem 0;">If a purpose question has strong primary keyword, go look for it, read for context, and answer (if you can''t find keyword in 30 seconds, move on)</li>
      <li style="margin: 0.2rem 0;">If a purpose question is vague and/or you don''t have strong keyword(s), skip and save for later</li>
      <li style="margin: 0.2rem 0;">Regardless of keywords, if you know where to go in the passage, answer it (as long as you have enough context)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Step 8: Answer Skipped Questions Last
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Answer the broad passage questions or any other questions you''ve skipped last
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you''re running out of time, answer the broad passage questions using the information you know about the passage</li>
      <li style="margin: 0.2rem 0;">Answer broad passage questions before other skipped questions if time is limited</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Answer Right Away vs. Save for Later?
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">One essential skill for working backwards is learning when to answer a question right away vs. skip and save for later
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Learning this skill takes lots of practice—there''s no simple set of rules to follow</li>
      <li style="margin: 0.2rem 0;">Every question is a judgment call that depends on: the wording, the keywords (or lack thereof), the parts of the passage you''ve read so far, and the answer choices</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Line Reference Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Always answer line reference questions right away
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Since these questions tell you where to go, you never need to search</li>
      <li style="margin: 0.2rem 0;">Read for context and answer the question</li>
      <li style="margin: 0.2rem 0;">Take time to read for enough context to answer correctly—you can (and often should) read more than 2 sentences before and after</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Clear Evidence Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Usually easier to answer right away, but it depends on keyword strength and answer choices
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Answer right away: Clear evidence questions with strong primary keyword(s) (like "Jupiter," "Amsterdam," specific names/places)</li>
      <li style="margin: 0.2rem 0;">Save for later: Questions without strong primary keywords or with answer choices that may be scattered throughout the passage</li>
      <li style="margin: 0.2rem 0;">Use your best judgment based on what you''ve read—if you have good keywords or already know where to go, answer right away</li>
      <li style="margin: 0.2rem 0;">Always follow the 30-second rule—don''t get stuck on these for too long</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Inference Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Inference questions are usually saved for later, but it depends on keyword strength and answer choices
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">In general, you should almost always look at the answer choices for inference questions right away</li>
      <li style="margin: 0.2rem 0;">Answer right away: Inference questions with very strong, specific keywords that are easy to find</li>
      <li style="margin: 0.2rem 0;">Save for later: Inference questions without strong keywords or that require broader passage understanding</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Work backwards if you can''t finish in time, don''t recall what you read, or timing (not comprehension) is your biggest issue. Don''t work backwards if you can finish with other methods or are aiming for 32-36 (though some students score perfectly working backwards). All students should know how to work backwards in case you mess up pacing and have less than 4 minutes for the final passage.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Go straight to questions, skip broad passage questions and questions requiring multiple parts of the passage (save for last). Start with line reference/paragraph questions and words in context questions, then clear evidence questions with strong keywords, then inference questions, then handle purpose questions based on keywords. This is a general guide—don''t feel you must stick to the exact order.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Always answer line reference questions right away since they tell you where to go. For clear evidence questions: answer right away if you have strong keywords (capitalized words, numbers, unique keywords), save for later if keywords are weak or answer choices may be scattered. For inference questions: usually save for later, but always read the answer choices right away.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Learning when to answer right away vs. save for later takes lots of practice—there''s no simple set of rules. Every question is a judgment call based on the wording, keywords, parts of the passage you''ve read so far, and answer choices. Always follow the 30-second rule and don''t get stuck on questions for too long. Working backwards requires thinking on the fly and is somewhat chaotic, so it takes practice to master.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('maximizing-score', 'reading', 'Topic 3.2 - 7 Tips to Maximize Your Reading Score', 'Topic 3.2 - 7 Tips to Maximize Your Reading Score...', 'intermediate', 30, 12, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 3.2
Topic: 7 Tips to Maximize Your Reading Score
Lesson Key: maximizing-score
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
These 7 tips will help you maximize your Reading score—some are review from earlier in the course while others are brand new skills. Try to use these tips on practice passages and practice ACTs to prepare for your best ACT Reading score ever!
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Tip #1 — Keep it Moving
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Time management is critical for success on the Reading Test
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You have 9 minutes per passage for normal time and 15 minutes per passage for extended time</li>
      <li style="margin: 0.2rem 0;">To finish all 4 passages consistently, it''s important to know when to guess and move on to the next question</li>
      <li style="margin: 0.2rem 0;">In general, never spend more than 1 minute on any single question (1.5 minutes for extended time)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Developing Time Management
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">At first, it may be hard to manage time and know when to move on
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You''ll get a better sense of time management as you complete practice ACTs</li>
      <li style="margin: 0.2rem 0;">With practice, you''ll develop a voice in your head saying "It''s time to bubble in your best guess and move on"</li>
      <li style="margin: 0.2rem 0;">This is especially true on the first 4-6 questions of each passage—follow the 30-second rule!</li>
      <li style="margin: 0.2rem 0;">If you can''t find the correct part of the passage quickly, circle the question number and move on</li>
      <li style="margin: 0.2rem 0;">You may come across the evidence as you answer questions in the rest of the passage</li>
      <li style="margin: 0.2rem 0;">You can always go back and change your answer if you find the evidence later</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Knowing when to move on will increase your score
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">We know it feels weird moving on without being confident in your answer choice</li>
      <li style="margin: 0.2rem 0;">But moving on allows you to answer more questions and avoid guessing as time runs out</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Tip #2 — Circle Guesses; Box Non-Confident Answers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Circle guesses:</strong> Whenever you guess on a question, circle the question number on your test
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you finish with time left, go back to the circled questions you guessed on</li>
      <li style="margin: 0.2rem 0;">Spend more time looking for the Waldo</li>
      <li style="margin: 0.2rem 0;">The question may also seem easier when you come back to it a second time</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Box non-confident answers:</strong> If you''re not confident in your answer, box the question number on your test
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you have time left after going back to circled questions, you can look over these boxed questions again</li>
      <li style="margin: 0.2rem 0;">Only change your answer if you have a very good reason—you''re usually correct on your first attempt</li>
      <li style="margin: 0.2rem 0;">However, if you realize you misread the question, didn''t notice a detail in the passage, or notice something that makes your answer choice incorrect, change your answer</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Tip #3 — Never Worry About Patterns in the Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">"I bubbled in A and F for the last 4 questions. There is no way this one can be A again, right??" WRONG!
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">When answering a question, only focus on that question</li>
      <li style="margin: 0.2rem 0;">Never let any pattern in the answer choices affect which answer choice you pick</li>
      <li style="margin: 0.2rem 0;">Sometimes, the same spot on the scantron sheet is correct 4 or even 5 times in a row on the ACT</li>
      <li style="margin: 0.2rem 0;">It''s also possible that you answered one of the previous questions incorrectly, and there aren''t supposed to be 4 or 5 in a row</li>
      <li style="margin: 0.2rem 0;">There''s no way for you to know on test day, so just focus on selecting what you think is correct for each question</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Tip #4 — Boring is Better
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Boring answer choices are usually better on the ACT
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you''re ever between two answer choices, always pick the more boring answer choice</li>
      <li style="margin: 0.2rem 0;">The more specific an answer choice is, the more likely something in that answer choice is incorrect</li>
      <li style="margin: 0.2rem 0;">Remember: An answer choice must be 100% correct to be correct</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Why We Pick Specific Answer Choices (and Why We Shouldn''t)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The challenge is that we don''t like to pick boring answer choices, especially on challenging questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">An answer choice with more details is much easier to come up with a story as to why the answer could be correct</li>
      <li style="margin: 0.2rem 0;">This makes you feel better bubbling it in</li>
      <li style="margin: 0.2rem 0;">Your job is to pick the answer choice that is supported by the passage, not the one that feels best to you</li>
      <li style="margin: 0.2rem 0;">So again, when you''re between two answer choices, pick the boring one with fewer details</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Tip #5 — Beware of Keyword Matching
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Anytime you see words in an answer choice that directly match words from the passage, proceed with caution
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Make sure the entire answer choice is correct</li>
      <li style="margin: 0.2rem 0;">Matching keywords may be in the correct answer choice, but they can also be in incorrect answer choices</li>
      <li style="margin: 0.2rem 0;">These incorrect choices are often half-truths, where part of the answer choice perfectly matches the passage but another part is incorrect</li>
      <li style="margin: 0.2rem 0;">Students often mistakenly pick these incorrect answer choices because the keywords match</li>
      <li style="margin: 0.2rem 0;">Never just match keywords—always make sure the answer choice you select is 100% correct</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Tip #6 — Do Not Over-Annotate
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Some students annotate a lot. Others make no annotations at all. There is no right or wrong way to annotate.
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You need to find what works best for you</li>
      <li style="margin: 0.2rem 0;">What''s most important is to make sure that annotating is helping you better understand the passage and work through the questions more efficiently</li>
      <li style="margin: 0.2rem 0;">If you''re underlining 50% of the passage, those are not helpful annotations</li>
      <li style="margin: 0.2rem 0;">If you''re writing down notes after each paragraph but never use those notes, you''re wasting time</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
What Good Annotations Should Do
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Proper annotations should help you:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Maintain focus as you read</li>
      <li style="margin: 0.2rem 0;">Increase your comprehension of what you read</li>
      <li style="margin: 0.2rem 0;">Know where in the passage to go when working through the questions</li>
      <li style="margin: 0.2rem 0;">There is no best way to annotate for everyone—how much you annotate and what types of annotations you use varies from student to student</li>
      <li style="margin: 0.2rem 0;">On practice ACTs, try different methods for annotation and find what works best for you</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
7. Tip #7 — Make the Most of Practice ACTs
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Practice ACTs are the best way to improve on the Reading Test...if you''re using and reviewing them properly
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Here are some tips for how to make the most of your practice ACTs</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Always Time Practice ACTs Strictly
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Never give yourself extra time to finish the section and see how you would have scored
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">It will give you false confidence for how much you''re improving</li>
      <li style="margin: 0.2rem 0;">Strict timing is essential to building the time management skills you need on test day</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Review Your Mistakes Thoroughly
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Whenever you answer a question incorrectly, go back to the passage and find the evidence for the correct answer
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Make sure you identify why your answer choice was incorrect</li>
      <li style="margin: 0.2rem 0;">It is critical to learn from every single mistake you make to continuously improve</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Be Obsessive About Improving
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Students who improve the most on the Reading Test are the ones who are most obsessive about learning from their mistakes
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">After each question, try to figure out why you missed the question</li>
      <li style="margin: 0.2rem 0;">Did you not read the question carefully enough?</li>
      <li style="margin: 0.2rem 0;">Were you answering your own question and not exactly what the ACT was asking you?</li>
      <li style="margin: 0.2rem 0;">Did you not recognize the type of question?</li>
      <li style="margin: 0.2rem 0;">Once you figure out why you made the mistake, think about how you can avoid the mistake in the future</li>
      <li style="margin: 0.2rem 0;">If necessary, go review any topic(s) from the chapters we have already covered</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Keep it moving—never spend more than 1 minute on any single question (1.5 for extended time). Follow the 30-second rule on the first 4-6 questions, and if you can''t find the right part of the passage quickly, circle the question number and move on. Knowing when to move on increases your score by allowing you to answer more questions and avoid guessing as time runs out.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Circle guesses and box non-confident answers—if you finish with time, go back to circled questions first, then boxed questions. Never worry about patterns in answer choices (the same letter can be correct 4-5 times in a row). Only change answers if you have a very good reason—you''re usually correct on your first attempt.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Boring is better—when stuck between two answer choices, always pick the more boring one with fewer details. The more specific an answer choice is, the more likely something in it is incorrect. Beware of keyword matching—just because an answer choice has matching keywords doesn''t mean it''s correct; these are often half-truths where part matches but another part is incorrect.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Don''t over-annotate—proper annotations should help you maintain focus, increase comprehension, and know where to go when working through questions. If you''re underlining 50% of the passage or writing notes you never use, you''re wasting time. Make the most of practice ACTs by always timing strictly, reviewing mistakes thoroughly, and being obsessive about learning from every error to continuously improve.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('practice-passages', 'reading', 'Topic 3.3 - Practice Passages', 'Topic 3.3 - Practice Passages...', 'intermediate', 30, 13, '<!--
LESSON TEMPLATE v4.0
Subject: Reading
Topic Number: 3.3
Topic: Practice Passages
Lesson Key: practice-passages
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Now that you''ve learned everything you need to know about the ACT Reading Test, it''s time to put it all together in full practice passages. Practice passages will test you on all the skills and question types covered in this course.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Use Practice Passages Effectively
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Complete passages one at a time and review immediately</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Complete these passages 1 at a time and watch the video explanation right after you complete each passage</li>
      <li style="margin: 0.2rem 0;">Right after you complete the passage, you''ll remember exactly what you were thinking as you answered each question</li>
      <li style="margin: 0.2rem 0;">As you watch the video explanation, you can identify exactly what you did correctly, where you made mistakes in your thinking, and how you can improve on the next passage</li>
      <li style="margin: 0.2rem 0;">If you complete a bunch of passages in a row or watch the video explanation much later, you will not learn as effectively</li>
    </ul>
  </li>
</ul>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Try different approaches to find the one that works for you</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A variety of approaches were discussed in Chapter 1.3 (now is a good time to review that chapter if you don''t remember the details!)</li>
      <li style="margin: 0.2rem 0;">If you''re not sure what approach is best for you, try different approaches on different passages</li>
      <li style="margin: 0.2rem 0;">Once you find your favorite approach, stick with that approach for the rest of your practice passages and practice ACTs to perfect it</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. First 4 Practice Passages — Focus on Accuracy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Do not worry about strictly timing the first 4 practice passages
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You have 10 minutes per passage (15 minutes with extended time), but you can take more time on these passages</li>
      <li style="margin: 0.2rem 0;">Your goal on these passages is to try your best to answer all the questions correctly</li>
      <li style="margin: 0.2rem 0;">Focus on applying what you''ve learned</li>
      <li style="margin: 0.2rem 0;">If you need to take a bit more time to do so at first, that''s fine! Don''t worry about pacing yet</li>
      <li style="margin: 0.2rem 0;">You will learn to work more quickly as you improve your Reading skills</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Last 4 Practice Passages — Add Timing
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Set a timer for the last 4 practice passages and work on your pacing skills
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Try to apply the pacing skills discussed in Chapter 1.4 and the time management tips from Chapter 3.2</li>
      <li style="margin: 0.2rem 0;">Set a timer according to the times below:</li>
      <li style="margin: 0.2rem 0;">Regular Time = 10 minutes</li>
      <li style="margin: 0.2rem 0;">Extended Time = 15 minutes</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
What to Do If You Don''t Finish in Time
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Do your best to complete the passage in time
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you don''t finish in time, complete the rest of the questions for practice</li>
      <li style="margin: 0.2rem 0;">Think about how you could have better managed your time</li>
      <li style="margin: 0.2rem 0;">Make notes of what you can do to improve on the next passage</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Learn from Your Mistakes
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Review any topic(s) that you need to before going to the next practice passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Students who improve the most are the ones who are the most obsessive about learning from their mistakes</li>
      <li style="margin: 0.2rem 0;">After each passage, try to identify why you missed the questions that you answered incorrectly</li>
      <li style="margin: 0.2rem 0;">If there are any topics from the course that you need to review, go back and review before working on the next practice passage</li>
      <li style="margin: 0.2rem 0;">For example, if you notice you''re struggling on spotting the different question types, go back to Chapter 2.1</li>
      <li style="margin: 0.2rem 0;">This course has covered tons of information in a short period of time, so a quick review can be effective to help you continue to improve</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
5. Be Patient!
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">ACT Reading is a very difficult section for some students, and it''s easy to get discouraged if you''re missing a lot of questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Do your best and use the video explanations to learn how to improve your skills</li>
      <li style="margin: 0.2rem 0;">You will not immediately start answering all questions correctly</li>
      <li style="margin: 0.2rem 0;">It''s a journey to get to the score you want</li>
      <li style="margin: 0.2rem 0;">Your goal is to get a little bit better with each passage</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
6. Individual Recorded Answer Explanations
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For each practice passage, there are recorded answer explanations for every single question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">After you complete each practice passage, use the answer key in the back to check your answers</li>
      <li style="margin: 0.2rem 0;">For any questions that you answer incorrectly, found challenging, or weren''t confident you were approaching in the best way possible, watch the video answer explanations</li>
      <li style="margin: 0.2rem 0;">The explanations teach you how to use all the skills learned in the class</li>
      <li style="margin: 0.2rem 0;">Even for questions you answer correctly, watching the answer explanations can help you further improve your skills</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
7. Full Passage Explanations Using the 6 Approaches
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Each passage also has a full passage explanation using the 6 approaches discussed in Chapter 1.3
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The full passage explanations will show you how to use the 6 approaches in practice</li>
      <li style="margin: 0.2rem 0;">You should watch the full passage explanations for any approaches that you''re trying to learn</li>
      <li style="margin: 0.2rem 0;">The full passage explanations help teach you critical skills such as answering questions out of order, how to use the answer choices to your advantage, what to do when you can''t find the Waldo, and much more</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Approaches Used for Each Practice Passage
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The approaches used for the full passage explanation for each practice passage are:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Passage #1: The Big Read with Elimination for Comparing Passages Questions (Dual Text Passage)</li>
      <li style="margin: 0.2rem 0;">Passage #2: The Big Read with Notes</li>
      <li style="margin: 0.2rem 0;">Passage #3: The Speed Reader</li>
      <li style="margin: 0.2rem 0;">Passage #4: Label Then Read</li>
      <li style="margin: 0.2rem 0;">Passage #5: Working Backwards</li>
      <li style="margin: 0.2rem 0;">Passage #6: First and Last</li>
      <li style="margin: 0.2rem 0;">Passage #7: Big Read with Notes and Traditional Comparing Passages Approach (Dual Text Passage)</li>
      <li style="margin: 0.2rem 0;">Passage #8: Speed Reader</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Complete practice passages one at a time and watch video explanations immediately after each passage while you still remember your thinking. Try different approaches from Chapter 1.3 on different passages to find which works best for you, then stick with your favorite approach to perfect it.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For the first 4 practice passages, don''t worry about timing—take extra time if needed and focus on accuracy and applying what you''ve learned. For the last 4 practice passages, set a timer (10 minutes regular time, 15 minutes extended time) and work on pacing skills. If you don''t finish in time, complete the rest for practice and think about how to better manage time on the next passage.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Students who improve the most are the most obsessive about learning from their mistakes. After each passage, identify why you missed questions and review any topics you need to from earlier chapters. Watch video answer explanations for any questions you answered incorrectly, found challenging, or weren''t confident about—even for questions you answered correctly, the explanations can help you improve.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Be patient—ACT Reading is very difficult for some students and you won''t immediately start answering all questions correctly. It''s a journey to get to the score you want, and your goal is to get a little bit better with each passage. Watch the full passage explanations to learn critical skills like answering questions out of order, using answer choices to your advantage, and what to do when you can''t find the Waldo.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('science-introduction', 'science', 'Science Section Basics', 'Science Section Basics...', 'intermediate', 30, 65, '<html><head></head><body><p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT Science section tests your ability to analyze scientific data, interpret graphs and tables, understand experimental design, evaluate competing hypotheses, and draw evidence-based conclusions. Unlike traditional science tests that assess memorized content knowledge, the ACT Science section primarily measures your scientific reasoning and data interpretation skills.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">With only 35 minutes to answer 40 questions across 6-7 passages, you must work quickly and efficiently while maintaining accuracy. This lesson introduces the fundamental structure of the Science section, explains what skills are actually being tested, and provides a roadmap for approaching this challenging but highly manageable section of the ACT.</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 1. Understanding the Science Section Format </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT Science section is the fourth and final section of the test, consisting of 6-7 passages with 40 total questions. You have exactly 35 minutes to complete all questions, which translates to approximately 5 minutes per passage.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding the structure, passage types, and time constraints is essential for developing an effective strategy that maximizes your score.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Section Timing and Passage Distribution </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">40 questions:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">. The number of questions per passage varies depending on the passage type</li><li style="margin: 0.15rem 0;">most passages have 5-6 questions, but the Conflicting Viewpoints passage typically has 7 questions. This means you have approximately 52.5 seconds per question, but in practice, you need to account for the time required to read and understand passages, study figures</li></ul></li><li style="margin: 0.15rem 0;">analyze data. The strict time limit makes the Science section one of the most time-pressured parts of the ACT. Many students report that their biggest challenge is finishing all passages within the allotted time, which is why developing efficient reading and data analysis strategies is crucial.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> The Three Passage Types </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Data Representation:</strong> (2-3 passages with 5 questions each)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Research Summaries:</strong> (3-4 passages with 6 questions each), and</li><li style="margin: 0.15rem 0;">Conflicting Viewpoints:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">(1 passage with 7 questions). Data Representation passages present scientific information through graphs</li><li style="margin: 0.15rem 0;">and diagrams with minimal text</li><li style="margin: 0.15rem 0;">testing your ability to extract and analyze data. Research Summaries passages describe one or more experiments</li><li style="margin: 0.15rem 0;">testing your understanding of experimental design</li></ul></li><li style="margin: 0.15rem 0;">results. Conflicting Viewpoints passages present two or more scientists or students discussing different hypotheses or theories about the same phenomenon, testing your ability to compare and contrast scientific perspectives. Recognizing these passage types immediately helps you adjust your reading strategy and know what to expect.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Content Areas Covered </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">Earth/space sciences:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">. Topics might include genetics, ecology, chemical reactions, atomic structure, motion and forces, electricity, geology, meteorology, astronomy, and more. However, the ACT does not expect you to have memorized extensive science content</li><li style="margin: 0.15rem 0;">nearly all information needed to answer questions is provided in the passage itself. The section primarily tests your ability to interpret data, understand experimental methods</li></ul></li><li style="margin: 0.15rem 0;">apply basic scientific reasoning rather than recall specific facts. That said, having a general familiarity with basic science concepts (like understanding what pH measures, knowing that temperature affects reaction rates, or recognizing common scientific units) can help you work more efficiently.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Scoring and Performance Expectations </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">raw score:</strong> (0-40), which is then converted to a</li><li style="margin: 0.15rem 0;">scaled score: from 1-36. The conversion table varies slightly from test to test to account for difficulty differences</li><li style="margin: 0.15rem 0;">generally, missing 2-3 questions can still yield a score in the 33-35 range, while missing 6-8 questions typically results in a score around 28-30. There is</li><li style="margin: 0.15rem 0;">no penalty for wrong answers: so you should always guess if you''re running out of time. The Science section is often considered one of the most improvable sections of the ACT because success depends more on test-taking strategies and data interpretation skills than on extensive content knowledge</li><li style="margin: 0.15rem 0;">Students who initially struggle with timing often see significant score improvements after learning efficient passage navigation techniques and question-answering strategies.</li></ul> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Section Breakdown Typical Science section structure: - Data Representation passages: 2-3 passages × 5 questions = 10-15 questions - Research Summaries passages: 3-4 passages × 6 questions = 18-24 questions - Conflicting Viewpoints passage: 1 passage × 7 questions = 7 questions Total: 6-7 passages with 40 questions in 35 minutes. Recommended pacing: 5 minutes per passage, with flexibility to spend more time on complex passages and less on straightforward ones.</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 2. What the Science Section Actually Tests </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Despite its name, the ACT Science section is better understood as a scientific reasoning test rather than a traditional science knowledge test. The section assesses three main skill categories: Interpretation of Data, Scientific Investigation, and Evaluation of Models, Inferences, and Experimental Results.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Understanding these skill categories helps you recognize what each question is asking and how to approach it strategically.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Interpretation of Data (40-50% of questions) </h4> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Interpretation of Data questions test your ability to read graphs and tables, identify trends, extract specific values, and interpolate or extrapolate data. You might be asked to determine what temperature corresponds to a specific pressure value from a graph, identify whether two variables have a positive or inverse relationship, or predict what would happen if an experiment continued beyond the data shown.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">These questions require careful attention to axis labels, units, scales, and legends. Common question stems include:.</p><ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">"According to Figure 1, what was the pH when temperature was 40°C?", "Based on Table 2, as concentration increased</li><li style="margin: 0.15rem 0;">reaction rate:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">or "If the experiment had continued</li><li style="margin: 0.15rem 0;">the mass at 60 seconds would most likely have been:"</li></ul></li><li style="margin: 0.15rem 0;">Success on these questions comes from methodically reading data representations and avoiding careless errors like misreading scales or confusing which variable is which</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Scientific Investigation (20-30% of questions) </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Scientific Investigation:</strong> questions test your understanding of</li><li style="margin: 0.15rem 0;">scientific methodology:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">. You need to identify which variables were manipulated (independent variables)</li><li style="margin: 0.15rem 0;">which were measured (dependent variables)</li><li style="margin: 0.15rem 0;">which were held constant (control variables)</li><li style="margin: 0.15rem 0;">and what the purpose of specific experimental procedures was. Questions might ask: "Which variable was directly manipulated by the researchers?"</li></ul></li><li style="margin: 0.15rem 0;">"What was the purpose of Trial 1?", "Which of the following would be the best way to extend this experiment?", or "What hypothesis was being tested in Experiment 2?" These questions assess whether you understand how scientific experiments are structured and how scientists test hypotheses systematically. Strong performance requires understanding the logic behind experimental design and recognizing the difference between correlation and causation.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Evaluation of Models, Inferences, and Experimental Results (30-40% of questions) </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Evaluation:</strong> questions test your ability to</li><li style="margin: 0.15rem 0;">evaluate whether evidence supports a hypothesis:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">. These questions require higher-order thinking and often involve synthesizing information from multiple sources within a passage. You might be asked: "Based on the results of Experiments 1 and 2</li><li style="margin: 0.15rem 0;">which conclusion is best supported?"</li><li style="margin: 0.15rem 0;">"Which hypothesis is consistent with the data in Table 3?"</li><li style="margin: 0.15rem 0;">"Student 1 would most likely agree with which statement?"</li></ul></li><li style="margin: 0.15rem 0;">or "What additional information would help determine which theory is correct?" These questions are typically more challenging because they require you to go beyond simply reading data and instead think critically about what the data means, what assumptions underlie different viewpoints, and what logical conclusions can be drawn. Success requires careful reasoning and avoiding common pitfalls like choosing answers that sound plausible but aren''t actually supported by the passage.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> The Minimal Role of Outside Knowledge </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">One of the most important things to understand about the ACT Science section is that it requires minimal outside content knowledge.</li><li style="margin: 0.15rem 0;">The vast majority of questions can be answered using only the information provided in the passage, figures, and tables. You might encounter 1-3 questions per test that require basic scientific knowledge (such as knowing that water boils at 100°C at standard pressure, understanding that photosynthesis produces oxygen, or recognizing common lab equipment), but these represent a very small percentage of total questions.</li><li style="margin: 0.15rem 0;">In fact, trying to apply outside knowledge can sometimes lead you astray if you make assumptions that contradict the passage''s specific setup.</li><li style="margin: 0.15rem 0;">The best approach is to trust the passage and base your answers on what is explicitly stated or clearly implied by the data.</li><li style="margin: 0.15rem 0;">Students with limited science coursework can still achieve excellent scores by focusing on data interpretation and reasoning skills rather than worrying about content gaps..</li></ul> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Skill Category Breakdown In a typical 40-question Science section: - 16-20 questions test Interpretation of Data (reading graphs, identifying trends, extracting values) - 8-12 questions test Scientific Investigation (experimental design, variables, controls) - 12-16 questions test Evaluation (drawing conclusions, analyzing viewpoints, making inferences) Knowing this distribution helps you understand where to focus your practice and what skills matter most for a high score. The majority of questions test data interpretation and evaluation skills rather than memorized science facts.</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 3. Common Misconceptions About the Science Section </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Many students approach the Science section with incorrect assumptions that hinder their performance. Understanding and correcting these misconceptions is crucial for developing an effective strategy and avoiding common pitfalls that prevent students from reaching their scoring potential.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Misconception #1: You Need Extensive Science Knowledge </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">scientific reasoning and data interpretation skills:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">not memorized content. Students who have taken Advanced Placement science courses don''t necessarily score higher than students with basic science coursework if they haven''t developed strong graph-reading and analytical skills. The passage provides all necessary context</li><li style="margin: 0.15rem 0;">definitions</li><li style="margin: 0.15rem 0;">and background information. Your job is to</li></ul></li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">apply logical reasoning:</strong> not recall obscure scientific facts. In fact, overthinking questions by trying to apply outside knowledge often leads students to incorrect answers when they should simply trust what the passage explicitly states. Focus on developing strong data analysis skills rather than cramming science content.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Misconception #2: You Must Read Every Word of Text </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">strategic skimming approach:</strong> quickly reading the introduction to understand the general topic, focusing primarily on</li><li style="margin: 0.15rem 0;">figures and tables: and only reading detailed text when needed to answer specific questions. The figures often contain the most important information</li><li style="margin: 0.15rem 0;">paragraphs of text frequently just explain procedures in more detail than necessary. Learning to</li><li style="margin: 0.15rem 0;">prioritize visual data:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">over lengthy descriptions can save significant time. However, this doesn''t mean ignoring text entirely</li><li style="margin: 0.15rem 0;">you need to read enough to understand what was studied and what the variables represent, but you don''t need to memorize every procedural detail</li></ul></li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Misconception #3: Harder Science Topics Mean Harder Questions </h4> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Students often feel intimidated when they see passages about unfamiliar or complex-sounding topics like "polymerase chain reaction" or "superconductivity." However, passage topic complexity does not correlate with question difficulty. A passage about a sophisticated physics concept might have straightforward questions that simply ask you to read values from a graph, while a passage about a simple experiment with plants might have challenging questions that require synthesizing information from multiple trials.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The ACT deliberately uses technical-sounding topics to test whether you can stay focused and confident when faced with unfamiliar material. Don''t let intimidating vocabulary or advanced-sounding topics psyche you out.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">The questions are designed to be answerable regardless of your prior knowledge of the specific topic. Stay calm, focus on the data, and trust that all necessary information is provided.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Misconception #4: The Passages Must Be Completed in Order </h4> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Many students assume they must work through Science passages in the order they appear, but this is not a requirement. In fact, strategic passage selection can improve both your score and confidence.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Some students find Data Representation passages faster and easier because they focus primarily on graphs with minimal text, so they tackle those first to bank time for more complex passages. Others prefer starting with Research Summaries because they find the experimental format more intuitive.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Still others save the Conflicting Viewpoints passage for last because it has the most text and different question types. You can also preview passages quickly and identify which ones look most straightforward based on figure complexity and text length.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Experiment during practice to find an order that maximizes your efficiency. Just be careful to bubble answers in the correct spots on your answer sheet when you skip around.</p> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Correcting Misconceptions in Practice Before: "I need to read every word carefully and I''m worried because I haven''t taken AP Chemistry yet." After: "I''ll focus primarily on the figures and tables, skim the text for context, and trust that all information I need is in the passage. My score depends on data interpretation skills, not memorized content." This mindset shift alone can lead to significant time savings and reduced anxiety, allowing you to work more efficiently and confidently through Science passages.</p> <h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> 4. Building Your Science Section Foundation </h3> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Success on the ACT Science section requires developing a systematic approach that combines efficient passage navigation, strong data interpretation skills, strategic time management, and focused practice. This section introduces foundational concepts and habits that will support your improvement across all Science question types.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Developing a Passage Attack Strategy </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">quickly reading the introduction to understand what phenomenon or question is being studied</li><li style="margin: 0.15rem 0;">examining all figures and tables to understand what variables are being measured and what trends are visible</li><li style="margin: 0.15rem 0;">skimming any experimental descriptions to identify how trials differ from each other, and</li><li style="margin: 0.15rem 0;">moving to the questions, referring back to specific parts of the passage as needed.</li></ul>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This approach prioritizes the most important information (the data itself) while avoiding getting bogged down in procedural details. However, you should experiment with variations during practice to find what works best for your reading style and strengths.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Some students prefer reading questions first to know what to look for, while others find this disruptive. Find your optimal approach through deliberate practice.</p> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Mastering Figure and Table Analysis </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">graphs, tables, and diagrams:</strong> developing strong figure-reading skills is essential. When you look at any figure, immediately identify: (1) what</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">variables:</strong> are being shown (check axis labels and table headers), (2) what</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">units:</strong> are being used (meters, seconds, grams, etc.), (3) what</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">scale:</strong> is being used (does the axis start at zero or some other value?), (4) what</li><li style="margin: 0.15rem 0;">relationships or trends:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">are visible (do values increase</li><li style="margin: 0.15rem 0;">or stay constant?)</li><li style="margin: 0.15rem 0;">and (5) what different</li></ul></li><li style="margin: 0.15rem 0;">lines or symbols: represent (check the legend). Practice reading figures actively by asking yourself these questions for every graph or table you encounter</li><li style="margin: 0.15rem 0;">Also train yourself to spot common pitfalls like logarithmic scales, multiple y-axes, or unusual units that could cause misinterpretation.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Understanding Variables and Experimental Design Basics </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">independent variables:</strong> (what the researcher changes)</li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">dependent variables:</strong> (what the researcher measures), and</li><li style="margin: 0.15rem 0;">control variables:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">(what the researcher keeps the same). For example</li><li style="margin: 0.15rem 0;">if an experiment tests how different fertilizers affect plant growth</li><li style="margin: 0.15rem 0;">the fertilizer type is the independent variable</li><li style="margin: 0.15rem 0;">plant height is the dependent variable</li></ul></li><li style="margin: 0.15rem 0;">factors like water amount, sunlight, and temperature should be control variables. You should also understand why scientists run</li><li style="margin: 0.15rem 0;">control groups:<ul style="margin: 0.15rem 0 0.15rem 0; padding-left: 1.5rem;"><li style="margin: 0.15rem 0;">(to provide a baseline for comparison)</li><li style="margin: 0.15rem 0;">why they repeat trials multiple times (to ensure results are reliable and not due to chance)</li><li style="margin: 0.15rem 0;">and how to distinguish between</li></ul></li><li style="margin: 0.15rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">correlation and causation:</strong> . These fundamental concepts appear repeatedly across Science passages.</li></ul> <h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 400;"> Time Management and Practice Strategies </h4> <ul style="margin: 0.3rem 0 0.5rem 0; padding-left: 1.5rem; line-height: 1.5;"><li style="margin: 0.15rem 0;">Improving your Science score requires deliberate practice with a focus on both accuracy and speed</li><li style="margin: 0.15rem 0;">Start by working on individual passages untimed to ensure you understand how to analyze data and answer questions correctly.</li><li style="margin: 0.15rem 0;">Once your accuracy is consistently high (80%+ correct), begin adding time pressure by setting a 5-minute timer per passage</li><li style="margin: 0.15rem 0;">Track which passage types and question types give you the most trouble, and dedicate extra practice to those areas.</li><li style="margin: 0.15rem 0;">When reviewing practice questions, don''t just check whether you got them right or wrong—carefully review the reasoning behind each answer</li><li style="margin: 0.15rem 0;">figure out why wrong answers are incorrect, and identify what clues in the passage you should have noticed.</li><li style="margin: 0.15rem 0;">Also practice on full-length Science sections to build stamina and ensure your strategy works under realistic testing conditions</li><li style="margin: 0.15rem 0;">Many students find that their Science score improves more rapidly than other sections once they understand the underlying skills being tested and develop efficient strategies..</li></ul> <p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Example: Building Your Science Practice Plan Week 1-2: Master individual passage types untimed. Focus on Data Representation passages first (simplest), then Research Summaries, then Conflicting Viewpoints.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Week 3-4: Practice full Science sections with timing (35 minutes). Identify your weak passage types and question types.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Week 5-6: Target your weaknesses with focused practice. Review every question you miss to understand the reasoning.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">Week 7-8: Take full-length practice ACTs to build stamina and refine your pacing strategy. Adjust your approach based on results.</p>
<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">This structured progression builds skills systematically while maintaining motivation through visible progress.</p> <p style="height: 1px; margin: 0; padding: 0;"></p><h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700; visibility: hidden; height: 0; margin: 0; padding: 0; overflow: hidden;">.</h3><h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;"> Key Takeaways </h3> <ul style="list-style: none; padding: 0; margin: 0;"> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The Science section has 35 minutes for 6-7 passages and 40 questions—approximately 5 minutes per passage</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The section tests scientific reasoning and data interpretation skills, not memorized science content</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Three passage types appear: Data Representation (2-3), Research Summaries (3-4), and Conflicting Viewpoints (1)</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Focus primarily on figures and tables—they contain most of the important information for answering questions</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Questions test three skills: Interpretation of Data (40-50%), Scientific Investigation (20-30%), and Evaluation (30-40%)</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Nearly all questions can be answered using only information provided in the passage—outside knowledge is rarely needed</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>You don''t need to read every word—strategic skimming focused on data and key concepts is more efficient</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Passages don''t have to be completed in order—identify and tackle your strongest passage types first</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Master figure analysis by identifying variables, units, scales, trends, and what different symbols represent</li> <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;"><span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The Science section is highly improvable through strategic practice focused on data interpretation and time management</li> </ul></body></html>')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('passage-approach', 'science', 'Topic 1.1 - How to Approach the Passages', 'Topic 1.1 - How to Approach the Passages...', 'intermediate', 30, 1, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 1.1
Topic: How to Approach the Passages
Lesson Key: passage-approach
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
At first glance, Science passages often look intimidating with unfamiliar topics like the migratory patterns of monarch butterflies or the crystallization of magma, but success comes from understanding that you don''t need to be a science expert—you need to be skilled at quickly locating and analyzing data in charts, graphs, and tables. Mastering an efficient approach strategy is critical because you have only 35 minutes to handle 6 passages (approximately 5-6 minutes per passage), making time management and strategic passage navigation essential for maximizing your score.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. Charts and Graphs Passages: The 30-Second Preview Strategy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Of the 6 passages on the Science Test, 5 will consist of mostly graphs, charts, tables, and figures
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The other passage will be the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Conflicting Viewpoints</strong> passage, which we''ll discuss separately</li>
      <li style="margin: 0.2rem 0;">For the 5 Charts and Graphs passages, use the Figure-First approach described below</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Most of the information in Charts and Graphs passages is extra and unnecessary
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The majority of questions can be answered by just using the charts and graphs, not the text</li>
      <li style="margin: 0.2rem 0;">Don''t spend time trying to read and understand the entire passage—it''s not necessary and you will run out of time!</li>
      <li style="margin: 0.2rem 0;">Instead, spend around 30 seconds before starting the questions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
What to Do in Your 30-Second Preview
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Focus on the charts and graphs, paying special attention to:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The labels of the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">axes</strong> (what variables are being measured)</li>
      <li style="margin: 0.2rem 0;">What is being measured in each chart</li>
      <li style="margin: 0.2rem 0;">Where information is located</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">For the text, just read the first sentence of the passage and of the experiment(s)
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This gives you the basics of what the passage is about</li>
      <li style="margin: 0.2rem 0;">Example: "Scientists studied how temperature affects enzyme activity"</li>
      <li style="margin: 0.2rem 0;">You don''t need detailed understanding—just the general topic</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">After these 30 seconds, you will not fully understand the passage, but that is okay
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You now know where the information is located</li>
      <li style="margin: 0.2rem 0;">You can proceed to the questions and find specific information as needed</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Question Difficulty Progression and Time Management
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Within each passage, questions go from easy to hard
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The first two or three questions are generally very straightforward, often just asking you to spot a trend or find a data point</li>
      <li style="margin: 0.2rem 0;">As you continue to later questions, they get more difficult by asking you to use experimental thinking, use multiple charts or graphs, or consider changes to the experiment</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Since each question is worth the same amount, be sure to get the easy ones correct
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If you cannot figure out one of the last two questions in a passage, bubble in your best guess, circle the question, and move on</li>
      <li style="margin: 0.2rem 0;">You can always come back to it at the end if you still have time</li>
      <li style="margin: 0.2rem 0;">It is better to take your best guess and keep moving onto the next passage rather than spend a bunch of time on the most difficult questions and run out of time at the end of the section</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The 5-6 Minute Per Passage Rule
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Time management is crucial in this section, as it is often the hardest one for students to finish
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">You should be spending between 5-6 minutes on each passage</li>
      <li style="margin: 0.2rem 0;">If you find yourself spending more than 30 seconds on a problem, bubble in your best guess, circle the number, and move on</li>
      <li style="margin: 0.2rem 0;">You can always come back if you have time at the end</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Using Questions to Guide You to Answers
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Find the easiest and fastest way to get the correct answers by trusting the questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If a question begins with "Based on Figure 2," it means that the answer is in Figure 2</li>
      <li style="margin: 0.2rem 0;">Go to Figure 2 and find it! The ACT is not trying to trick you</li>
      <li style="margin: 0.2rem 0;">Let the questions help guide you to the right part of the passage</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">If the question does not direct you where to go, use keywords to help you
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Finding the variables discussed or units of the answer choices can quickly direct you to the right part of the passage</li>
      <li style="margin: 0.2rem 0;">Example: If answer choices are in "°C," look for the figure with temperature on an axis</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Remember that you do not need to understand the experiment as a whole
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">As long as you can find the answer in the passage, just bubble it in and move on</li>
      <li style="margin: 0.2rem 0;">It''s okay to answer questions before fully understanding the passage</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
When to Go Back to the Text
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">If you read a question and see a term or word you do not know or cannot find in the charts or graphs, go back to the text
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most questions on the Science Test do not require you to know definitions of variables</li>
      <li style="margin: 0.2rem 0;">However, if you do need the definition, it will be in <em>italics</em>, making it easy to scan the passage and find them quickly</li>
      <li style="margin: 0.2rem 0;">Read the definition and then answer the question</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Conflicting Viewpoints Passages: A Different Approach
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">At some point in the Science Test, you will find the one <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Conflicting Viewpoints</strong> passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">This passage is easy to spot by looking for headings like "Scientist 1," "Scientist 2" or "Student 1," "Student 2"</li>
      <li style="margin: 0.2rem 0;">This passage generally has more text and sometimes has no charts or graphs at all</li>
      <li style="margin: 0.2rem 0;">It is important to spot this passage quickly, as you must approach it differently</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Read and Annotate Strategy
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Rather than skimming, treat this more like a Reading passage
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read and annotate the entire thing</li>
      <li style="margin: 0.2rem 0;">As you read, underline or write down the key differences between the viewpoints</li>
      <li style="margin: 0.2rem 0;">Having these notes will help you work more quickly on the questions rather than re-reading the text over and over again</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Most students save this passage for last
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">It is the most time-consuming passage because reading text takes longer than skimming charts, graphs, tables, and diagrams</li>
      <li style="margin: 0.2rem 0;">The Conflicting Viewpoints passage is often more difficult than others</li>
      <li style="margin: 0.2rem 0;">If you may run out of time, it is best to run out of time on the most time-consuming passage</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For the 5 Charts and Graphs passages, spend only 30 seconds on your initial preview: focus on chart/graph axes and labels, read just the first sentence of the passage and experiments to get the general topic, then move directly to questions—most information in the text is unnecessary and you''ll run out of time if you try to read everything.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Questions within each passage progress from easy to hard, so prioritize getting the straightforward first questions correct, and if you''re stuck on difficult later questions for more than 30 seconds, guess and move on—each question is worth the same points, so spending 3 minutes on one hard question while missing 3 easy ones is a losing strategy.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Trust the questions to guide you: when a question says "Based on Figure 2," the answer is in Figure 2—the ACT isn''t trying to trick you—and use keywords, variables, and answer choice units to quickly locate the right chart or graph without wasting time reading unnecessary text.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>The Conflicting Viewpoints passage (identifiable by "Scientist 1/Scientist 2" headings) requires a different approach: read and annotate the entire passage like a Reading section passage, note key differences between viewpoints, and save this passage for last since it''s the most time-consuming—better to run out of time on the hardest passage than on easier Charts and Graphs passages.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('question-diagnosis', 'science', 'Topic 1.2 - Question Diagnosis', 'Topic 1.2 - Question Diagnosis...', 'intermediate', 30, 2, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 1.2
Topic: Question Diagnosis
Lesson Key: question-diagnosis
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
The most important skill for success on the Science Test is knowing where to look for information in the passage—a skill called <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">question diagnosis</strong>. When you read a question and its answer choices, both provide crucial clues that direct you to the specific part of the passage containing your answer.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. The Four Places to Look in a Science Passage
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Every Science passage contains four distinct information sources
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Figures and Tables (most common, 60-70% of questions)</li>
      <li style="margin: 0.2rem 0;">Experimental Text (procedures and descriptions)</li>
      <li style="margin: 0.2rem 0;">Introductory Text (definitions and background)</li>
      <li style="margin: 0.2rem 0;">Not in the Passage (basic science knowledge & experimental thinking)</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Place 1: Figures and Tables
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The most frequently used source—approximately 60-70% of all questions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Most figure/table questions can be answered without reading any passage text</li>
      <li style="margin: 0.2rem 0;">The ACT typically makes it easy by explicitly directing you ("According to Figure 2...")</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to look at Figures and Tables:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The question explicitly references a figure or table</li>
      <li style="margin: 0.2rem 0;">Answer choices are numbers with units (25 m/s, 1.5 kg, 300°C)</li>
      <li style="margin: 0.2rem 0;">The question asks about trends, relationships, or comparisons between variables</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Place 2: Experimental Text
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Paragraphs that describe how experiments were conducted, what materials were used, and what variables were controlled
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Usually appears near the figures, often labeled "Experiment 1," "Trial 2," etc.</li>
      <li style="margin: 0.2rem 0;">Provides essential context that explains what the data represents</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to look at Experimental Text:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Questions about experimental setup, procedures, or methods</li>
      <li style="margin: 0.2rem 0;">Questions about differences between experiments/trials</li>
      <li style="margin: 0.2rem 0;">Questions about variables or conditions not shown in figures</li>
      <li style="margin: 0.2rem 0;">Answer choices contain units or values not appearing in any figures</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Place 3: Introductory Text
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Appears at the beginning and provides background information, context, and definitions
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Important defined terms appear in <em>italics</em> for easy scanning</li>
      <li style="margin: 0.2rem 0;">Most questions don''t require using this section</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to look at Introductory Text:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Question contains terms, abbreviations, or words you don''t recognize</li>
      <li style="margin: 0.2rem 0;">You need general background or context</li>
      <li style="margin: 0.2rem 0;">You''ve checked figures and experimental text but still can''t find what you need</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Place 4: Not in the Passage
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Some questions require basic scientific knowledge or experimental reasoning
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Scientific Knowledge: Fundamental concepts from biology, chemistry, or physics</li>
      <li style="margin: 0.2rem 0;">Experimental Thinking: How to design experiments, set up controls, test hypotheses</li>
      <li style="margin: 0.2rem 0;">These are relatively uncommon (2-4 times per test)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When to use Outside Knowledge/Reasoning:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Questions about general scientific principles or facts</li>
      <li style="margin: 0.2rem 0;">Questions about how to improve experiments or what should be controlled</li>
      <li style="margin: 0.2rem 0;">Answer choices don''t match any information in the passage</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Diagnostic Signals in Question Stems
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Question stems contain powerful signals that tell you where to look
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Learning to recognize these instantly improves efficiency</li>
      <li style="margin: 0.2rem 0;">You''ll know exactly where to go without hesitation or random searching</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Explicit References (Strongest Signal)
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">When you see these, trust them completely:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"According to Figure 2..." → Go directly to Figure 2</li>
      <li style="margin: 0.2rem 0;">"Based on Table 1..." → Go directly to Table 1</li>
      <li style="margin: 0.2rem 0;">"In Experiment 3..." → Go to Experiment 3 description</li>
      <li style="margin: 0.2rem 0;">"In the passage..." → Information is in the text</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Variable-Based Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Use mentioned variables as search terms:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"As temperature increased..." → Find figure with temperature on an axis</li>
      <li style="margin: 0.2rem 0;">"When pH was 7..." → Find figure or table showing pH values</li>
      <li style="margin: 0.2rem 0;">Scanning axis labels is faster than reading paragraphs</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Procedure and Setup Questions
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">These phrases indicate experimental text:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">"How did scientists measure..." → Experimental text describes methods</li>
      <li style="margin: 0.2rem 0;">"Which variable was held constant..." → Experimental text states controlled variables</li>
      <li style="margin: 0.2rem 0;">"What was the difference between Trial 1 and Trial 2..." → Experimental text explains changes</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Diagnostic Signals in Answer Choices
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Answer choices provide equally important diagnostic information
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Always read answer choices before searching for information</li>
      <li style="margin: 0.2rem 0;">The format and units tell you what type of information to look for</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Numerical Answers with Units
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">All choices are numbers with units → You''re looking for data in a figure or table
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Units act as a "search key"—scan figures for those exact units</li>
      <li style="margin: 0.2rem 0;">Example: Choices show "g/mL" → Look for density data labeled "g/mL"</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Categorical or Descriptive Answers
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Words or phrases rather than numbers → Looking for trends or concepts
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Trend descriptions (Increased, Decreased, Remained constant) → Look at figure for pattern</li>
      <li style="margin: 0.2rem 0;">Comparison terms (Greater than, Less than, Equal to) → Compare values in figures</li>
      <li style="margin: 0.2rem 0;">Experimental conditions (Temperature, pH, Concentration) → Check experimental text</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. The Question Diagnosis Workflow
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Follow this systematic sequence for every question:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1:</strong> Read the complete question stem (identify references, variables, what''s being asked)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2:</strong> Read all answer choices (determine format, units, eliminate impossibilities)</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3:</strong> Diagnose the source based on signals</li>
      <li style="margin: 0.2rem 0;"><strong>Step 4:</strong> Go to that source and find/verify the answer</li>
      <li style="margin: 0.2rem 0;"><strong>Step 5:</strong> Eliminate wrong choices and select the correct answer</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">If stuck after 45-60 seconds:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Check if you''re in the correct figure/section</li>
      <li style="margin: 0.2rem 0;">Try the next most likely source</li>
      <li style="margin: 0.2rem 0;">Make your best guess and move on—don''t waste time</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Every Science passage contains four information sources: Figures/Tables (most common, 60-70% of questions), Experimental Text (procedures and setup), Introductory Text (definitions and background), and Outside Knowledge/Scientific Reasoning (general principles)—knowing which source each question type requires is the key to working efficiently.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Look at Figures and Tables when questions explicitly reference them, when answer choices are numbers with units, or when questions ask about trends—most questions can be answered from visual data alone without reading passage text.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Question stems provide diagnostic signals: explicit references ("According to Figure 2") tell you exactly where to look, variable names help identify relevant figures, procedure language indicates experimental text, and general knowledge phrasing signals outside knowledge questions—trust these signals and don''t waste time searching randomly.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Answer choices act as powerful diagnostic tools: numerical answers with units indicate figure/table data (use the units as a search key), categorical/descriptive answers suggest trend or concept questions, and impossible values can be eliminated immediately—always read all answer choices before searching the passage.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('specific-data-point', 'science', 'Topic 2.1 - Specific Data Point Questions', 'Topic 2.1 - Specific Data Point Questions...', 'intermediate', 30, 3, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.1
Topic: Specific Data Point Questions
Lesson Key: specific-data-point
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Specific data point questions are the most straightforward question type on the ACT Science Test, asking you to locate and extract a single piece of data from a figure, table, graph, or chart. These questions represent approximately 30-40% of all Science Test questions, making them essential for building your score quickly and efficiently.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Identify Specific Data Point Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Two distinctive characteristics make these questions instantly recognizable:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Direct figure or table references ("According to Figure 2...", "Based on Table 1...")</li>
      <li style="margin: 0.2rem 0;">All four answer choices are numbers with units (5 cm, 8 cm, 12 cm, 18 cm)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">When you see both characteristics together, you have absolute certainty
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">The ACT is directly telling you where the answer is—trust it completely</li>
      <li style="margin: 0.2rem 0;">Don''t waste time checking other figures or reading text descriptions</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Why Answer Choice Units Matter
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Units serve as a powerful search tool
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If answer choices show "g/mL," immediately look for density data labeled with "g/mL"</li>
      <li style="margin: 0.2rem 0;">If choices show "°C," scan for temperature data</li>
      <li style="margin: 0.2rem 0;">Don''t waste time examining figures with different units</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Reading Data from a Line Graph" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. The Systematic 5-Step Approach
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Step 1: Locate the Correct Figure or Table</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Go immediately to the referenced figure—don''t look elsewhere first</li>
      <li style="margin: 0.2rem 0;">Verify you''re looking at the correct numbered figure if multiple are shown</li>
      <li style="margin: 0.2rem 0;">Always verify by checking the passage, even if you think you remember</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Step 2: Identify What You''re Looking For</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Determine what variable you need (temperature? pressure? concentration? growth?)</li>
      <li style="margin: 0.2rem 0;">Note what conditions are specified ("at 17 days," "at 40°C," "in Trial 2")</li>
      <li style="margin: 0.2rem 0;">Check the units in answer choices to confirm what measurement you''re finding</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Step 3: Locate the Correct Axes, Row, or Column</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For graphs: Identify which axis shows which variable (x-axis vs. y-axis)</li>
      <li style="margin: 0.2rem 0;">For tables: Find the correct row and column headers</li>
      <li style="margin: 0.2rem 0;">Check legends/keys if multiple data series are shown</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Step 4: Find the Intersection or Data Value</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">For graphs: Find the value on one axis, trace to the data line, then trace to the other axis</li>
      <li style="margin: 0.2rem 0;">For tables: Find where the relevant row and column intersect</li>
      <li style="margin: 0.2rem 0;">Use your finger or pencil to trace accurately if needed</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Step 5: Match to Answer Choices</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Select the closest answer if exact value isn''t listed</li>
      <li style="margin: 0.2rem 0;">Verify units match between your data and the answer choice</li>
      <li style="margin: 0.2rem 0;">If your value doesn''t match any choice, double-check your figure, axis, scale, and data line</li>
    </ul>
  </li>
</ul>

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Reading Data from a Table" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Common Mistakes and How to Avoid Them
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Mistake #1: Confusing X-Axis and Y-Axis</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Always verify which variable and units are on which axis before finding data</li>
      <li style="margin: 0.2rem 0;">Don''t assume temperature is always on x-axis—check the labels!</li>
      <li style="margin: 0.2rem 0;">This is the #1 most common error on specific data point questions</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Mistake #2: Misreading the Scale</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Check what each labeled mark represents—don''t assume consistent intervals</li>
      <li style="margin: 0.2rem 0;">Count unlabeled grid lines to determine interval size</li>
      <li style="margin: 0.2rem 0;">Pay attention when axes don''t start at zero</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Mistake #3: Ignoring Units</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Always read units on axis labels or table headers</li>
      <li style="margin: 0.2rem 0;">Verify answer choice units match figure units</li>
      <li style="margin: 0.2rem 0;">Don''t select based on number alone—check units too</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Mistake #4: Using the Wrong Figure or Data Series</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Verify figure number before reading any data</li>
      <li style="margin: 0.2rem 0;">Check legend/key to identify correct line/curve/symbol</li>
      <li style="margin: 0.2rem 0;">Pay attention to line styles (solid vs. dashed) and symbols (circles vs. squares)</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;"><strong>Mistake #5: Rushing and Misreading Questions</strong>
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Read carefully: "how much lower" ≠ "how high"</li>
      <li style="margin: 0.2rem 0;">Note exact values: "at 4 seconds" ≠ "at 40 seconds"</li>
      <li style="margin: 0.2rem 0;">Taking 3 extra seconds to read carefully prevents careless errors</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Tips for Speed and Accuracy
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Use answer choices to eliminate impossible values
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">If figure shows values 10-50, eliminate choices with 5 or 75</li>
      <li style="margin: 0.2rem 0;">If graph clearly shows increasing trend, eliminate "decreased" answers</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">These questions should be fast—30-45 seconds per question
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">They''re designed to be straightforward if you follow the systematic approach</li>
      <li style="margin: 0.2rem 0;">Bank time here for more difficult questions later</li>
      <li style="margin: 0.2rem 0;">But don''t rush so fast that you make careless errors</li>
    </ul>
  </li>
  <li style="margin: 0.3rem 0;">Always verify by checking the passage, not relying on memory
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">Even if you think you remember the data, take 3-5 seconds to confirm</li>
      <li style="margin: 0.2rem 0;">This prevents errors from misremembering or confusing similar data</li>
    </ul>
  </li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Specific data point questions represent 30-40% of all Science questions and are the fastest to answer—identify them by explicit figure references ("According to Figure 2") plus numerical answer choices with units (5 cm, 8 cm, 12 cm, 18 cm).
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Follow the systematic 5-step approach every time: locate the correct figure/table, identify what you''re looking for, locate correct axes/rows/columns, find the intersection or data value, then match to answer choices—this prevents errors and builds speed through consistency.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Never confuse x-axis and y-axis (the #1 mistake), always check the scale carefully, pay attention to units, verify you''re using the correct figure and data series, and read questions carefully—taking 3 extra seconds for accuracy prevents careless errors that cost points.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>These questions should take 30-45 seconds each when using the systematic approach—bank time on easy specific data point questions to spend on harder inference or experimental design questions later, but never rush so fast that you make careless mistakes.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('trends', 'science', 'Topic 2.2 - Trends Questions', 'Topic 2.2 - Trends Questions...', 'intermediate', 30, 4, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.2
Topic: Trends
Lesson Key: trends
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Trend questions ask you to identify patterns in how variables change rather than reading specific numerical values, and they can range from simple questions that track how numbers change across a graph to challenging questions that require identifying non-obvious trends within complex data tables. The key to mastering trend questions is recognizing them quickly by their answer choices (which typically include phrases like "increased only," "decreased then increased," or "remained constant") and focusing on the pattern of change rather than exact values.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Identify Trend Questions
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">The easiest way to spot trend questions is by examining the answer choices, which typically describe patterns of change:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Increased only</strong> — The variable continuously goes up throughout the range</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Decreased only</strong> — The variable continuously goes down throughout the range</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Increased then decreased</strong> — The variable rises first, then falls (or vice versa)</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Remained constant</strong> — The variable stays the same throughout</li>
      <li style="margin: 0.2rem 0;"><strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">Varied with no general trend</strong> — The variable changes randomly without a clear pattern</li>
    </ul>
  </li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Example Question Stem
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">"As the temperature decreases, the angle of the rose bush stems:"
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;">A. Increased only</li>
      <li style="margin: 0.2rem 0;">B. Increased then decreased</li>
      <li style="margin: 0.2rem 0;">C. Decreased only</li>
      <li style="margin: 0.2rem 0;">D. Remained constant</li>
      <li style="margin: 0.2rem 0; font-style: italic; color: #6b7280;">When you see answer choices formatted like this, you know immediately that you''re dealing with a trend question</li>
    </ul>
  </li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Analyzing Trends in Charts and Graphs
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">For trend questions using charts and graphs, follow this systematic approach:
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Identify the correct data series</strong> — Bar graphs often show multiple categories (different forests, different fertilizers, etc.). Make sure you''re tracking the right bars or lines</li>
      <li style="margin: 0.2rem 0;"><strong>Follow the pattern left to right (or along the specified axis)</strong> — Trace how the values change as you move across the graph</li>
      <li style="margin: 0.2rem 0;"><strong>Don''t worry about exact numbers</strong> — You only need to determine if values are going up, down, or staying the same</li>
      <li style="margin: 0.2rem 0;"><strong>Watch for direction changes</strong> — Look for peaks or valleys that indicate "increased then decreased" patterns</li>
    </ul>
  </li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Identifying Trends in a Bar Graph" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Analyzing Trends in Tables
</h3>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">Trend questions in tables are often more challenging because you must identify which trials or rows to compare. The key is understanding experimental design</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
The One-Variable Rule
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;">To identify a valid trend, you must compare trials where <strong>only one independent variable changes</strong> while all other variables remain constant. This isolates the effect of that single variable
    <ul style="margin: 0.3rem 0; padding-left: 1.5rem;">
      <li style="margin: 0.2rem 0;"><strong>Step 1: Read the question carefully</strong> — Identify which variable(s) should be changing and which should remain constant</li>
      <li style="margin: 0.2rem 0;"><strong>Step 2: Scan the table for matching trials</strong> — Find rows where only your variable of interest changes</li>
      <li style="margin: 0.2rem 0;"><strong>Step 3: Trace the pattern</strong> — Follow how the dependent variable changes as the independent variable changes</li>
      <li style="margin: 0.2rem 0;"><strong>Step 4: Match to answer choices</strong> — Describe the pattern using the trend terminology</li>
    </ul>
  </li>
</ul>

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Finding Trends in Complex Tables" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Common Mistakes and Pro Tips
</h3>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Common Mistakes to Avoid
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Tracking the wrong data series</strong> — In multi-category graphs, students often follow the wrong bars or lines. Always double-check which category the question asks about</li>
  <li style="margin: 0.3rem 0;"><strong>Comparing trials with multiple changing variables</strong> — If more than one variable changes between trials, you cannot determine which variable caused the trend</li>
  <li style="margin: 0.3rem 0;"><strong>Confusing "increased then decreased" with "decreased then increased"</strong> — Pay attention to the order of the trend</li>
  <li style="margin: 0.3rem 0;"><strong>Getting distracted by exact values</strong> — Trend questions test pattern recognition, not precise data reading. Focus on the direction of change</li>
</ul>

<h4 style="margin-top: 2rem; margin-bottom: 0.3rem; font-weight: 600;">
Speed Tips
</h4>

<ul style="margin: 0.5rem 0 1rem 0; padding-left: 1.5rem; line-height: 1.7;">
  <li style="margin: 0.3rem 0;"><strong>Use your pencil as a visual guide</strong> — Trace along bars or lines to track the trend more clearly</li>
  <li style="margin: 0.3rem 0;"><strong>Eliminate obvious wrong answers first</strong> — If a variable clearly goes up, immediately eliminate "decreased only" and "remained constant"</li>
  <li style="margin: 0.3rem 0;"><strong>For tables, circle the relevant trials</strong> — Physically mark which rows you need to compare to avoid confusion</li>
  <li style="margin: 0.3rem 0;"><strong>Watch for symmetry</strong> — Some experiments show the same trend across multiple conditions, which can help you verify your answer</li>
</ul>

<h3 style="visibility: hidden; margin: 0; padding: 0; line-height: 0; height: 0;">
Hidden Separator
</h3>

<h3 style="color: #2e7d32; font-size: 1.4rem; font-weight: 700; margin: 3rem 0 1.5rem 0;">
Key Takeaways
</h3>

<ul style="list-style: none; padding: 0; margin: 0;">
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Identify trend questions instantly by looking for answer choices with phrases like "increased only," "decreased then increased," or "remained constant"—these descriptive answer patterns immediately signal a trend question, allowing you to shift your focus from finding exact numerical values to tracking directional patterns in the data.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Focus on patterns, not precise values—you only need to determine whether values are going up, down, staying constant, or changing direction (like increasing then decreasing), so don''t waste time calculating exact numbers or worrying about specific data points.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>For tables, apply the one-variable rule—only compare trials where a single independent variable changes while all other variables remain constant, because comparing trials with multiple changing variables makes it impossible to determine which variable caused the observed trend.
  </li>
  <li style="margin-bottom: 0.8rem; color: #2e7d32; font-size: 16px; line-height: 1.6;">
    <span style="color: #4caf50; font-weight: bold; margin-right: 0.5rem;">✓</span>Use visual aids to avoid errors—trace graphs with your pencil to clearly see the trend direction and circle the relevant table rows you''re comparing, since the most common mistake on trend questions is accidentally tracking the wrong data series or mixing up which trials to compare.
  </li>
</ul>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('approximation', 'science', 'Topic 2.3 - Approximation Questions', 'Topic 2.3 - Approximation Questions...', 'intermediate', 30, 5, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.3
Topic: Approximation
Lesson Key: approximation
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
Approximation questions ask you to estimate the value of a data point that is not explicitly shown in the figures or tables, requiring you to use the given values to determine where the missing data point would logically fall. These questions are instantly recognizable by their distinctive answer choices, which provide ranges like "less than 100 m," "between 100 m and 150 m," or "greater than 250 m" rather than single numerical values.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Identify Approximation Questions
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Approximation questions are the easiest question type to identify on the entire Science Test because the answer choices immediately give them away:
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Typical Answer Choice Formats
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Less than [value]</strong> — e.g., "Less than 100 m"</li>
  <li style="margin-bottom: 0.75rem;"><strong>Between [value 1] and [value 2]</strong> — e.g., "Between 100 m and 150 m"</li>
  <li style="margin-bottom: 0.75rem;"><strong>Greater than [value]</strong> — e.g., "Greater than 250 m"</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem; font-style: italic; color: #6b7280;">
Every time you see answer choices formatted with ranges like this, you know you''re dealing with an approximation question. This means the question is asking about a value that is NOT directly shown in the figures or tables.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
What Makes These Questions Unique
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;">The question asks for a value at a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">condition that wasn''t tested</strong> (e.g., "at 45°F" when only 40°F and 50°F were tested)</li>
  <li style="margin-bottom: 0.75rem;">You must <strong>estimate or interpolate</strong> between given data points</li>
  <li style="margin-bottom: 0.75rem;">Sometimes you must <strong>extrapolate beyond</strong> the range of the graph</li>
</ul>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. Approximation on Graphs: Two Types
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Approximation questions on graphs fall into two categories: <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">bracketing</strong> and <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">extending</strong>.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Type 1: Bracketing (Interpolation)
</h4>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
<strong>Bracketing questions</strong> ask you to find a data point that falls <strong>between</strong> two given data points on the graph.
</p>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Step 1:</strong> Identify which two data points the requested value falls between</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 2:</strong> Locate these two points on the graph</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 3:</strong> Estimate where the missing value would fall on the curve or line between them</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 4:</strong> Match your estimate to the answer choice ranges</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem; font-style: italic; color: #6b7280;">
<strong>Example:</strong> If the graph shows Pine growth at 40°F (10 cm) and 50°F (20 cm), and the question asks about 45°F, you''d estimate the value falls between 10 and 20 cm—likely around 15 cm.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Type 2: Extending (Extrapolation)
</h4>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
<strong>Extending questions</strong> ask you about a data point that falls <strong>outside</strong> the range of the graph.
</p>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Step 1:</strong> Identify the trend or pattern of the curve/line</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 2:</strong> Use your pencil to extend the trend line beyond the graph</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 3:</strong> Estimate where the extended line would intersect the requested value</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 4:</strong> Match to the answer choice ranges</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem; font-style: italic; color: #6b7280;">
<strong>Example:</strong> If the graph shows Palm growth increasing from 50°F to 60°F, and the question asks about 70°F (beyond the graph), you''d extend the upward trend to estimate the growth would be even higher.
</p>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Bracketing: Interpolating Between Data Points" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. Approximation in Tables
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Approximation questions in tables require you to locate the correct trials to compare, just like trend questions. The key difference is that you''re estimating a value that falls between the given data points.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Strategy for Table Approximation
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Step 1: Identify the variable being questioned</strong> — Determine what value you need to approximate</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 2: Find trials with constant control variables</strong> — Look for rows where only the independent variable of interest changes (apply the one-variable rule)</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 3: Locate bracketing trials</strong> — Find the two trials that bracket the requested value</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 4: Estimate the dependent variable</strong> — Determine where the answer falls based on the pattern</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 5: Match to answer ranges</strong> — Select the answer choice that includes your estimate</li>
</ul>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Common Table Challenges
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Easy questions:</strong> Follow trends across the entire table when all other variables remain constant</li>
  <li style="margin-bottom: 0.75rem;"><strong>Difficult questions:</strong> Identify specific trials where only one variable changes; ignore trials with multiple changing variables</li>
  <li style="margin-bottom: 0.75rem;"><strong>Critical mistake:</strong> Comparing trials where multiple variables change—this makes approximation impossible</li>
</ul>

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Approximating Values in Complex Tables" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Pro Tips and Common Mistakes
</h3>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Pro Tips for Speed and Accuracy
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Use your test booklet!</strong> — Draw on graphs to extend trend lines or mark interpolation points with your pencil</li>
  <li style="margin-bottom: 0.75rem;"><strong>Don''t overthink precision</strong> — You only need a rough estimate to eliminate wrong answer ranges</li>
  <li style="margin-bottom: 0.75rem;"><strong>Look for obvious eliminations</strong> — If a value must be higher than 100, immediately cross out "less than 100"</li>
  <li style="margin-bottom: 0.75rem;"><strong>Check curve direction</strong> — Make sure your approximation follows the direction of the trend (increasing, decreasing, or leveling off)</li>
  <li style="margin-bottom: 0.75rem;"><strong>For tables, circle relevant trials</strong> — Physically mark the trials you''re using to avoid confusion</li>
</ul>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Common Mistakes to Avoid
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Extrapolating incorrectly</strong> — When extending beyond the graph, some students assume linear trends when the curve is actually leveling off or changing direction</li>
  <li style="margin-bottom: 0.75rem;"><strong>Using the wrong data series</strong> — On multi-line graphs, make sure you''re looking at the correct line (Pine vs. Fir vs. Palm, etc.)</li>
  <li style="margin-bottom: 0.75rem;"><strong>Ignoring units</strong> — Pay attention to whether the question asks for temperature, height, time, etc.</li>
  <li style="margin-bottom: 0.75rem;"><strong>Reading exact values</strong> — These questions specifically ask about values NOT in the data, so if you find an exact match, you''re looking at the wrong part of the figure</li>
  <li style="margin-bottom: 0.75rem;"><strong>Comparing incompatible trials</strong> — In tables, only compare trials where control variables match</li>
</ul>

<div style="background: linear-gradient(to right, #10b981, #059669); padding: 1.5rem; border-radius: 8px; margin: 3rem 0 2rem 0;">
  <h4 style="color: white; margin: 0 0 1rem 0; font-size: 18px; font-weight: 700;">Key Takeaways</h4>
  <ul style="color: white; margin: 0; padding-left: 1.5rem; font-size: 15px; line-height: 1.8;">
    <li style="margin-bottom: 0.75rem;"><strong>Identify approximation questions instantly</strong> by looking for answer choices with ranges like "less than," "between," or "greater than"</li>
    <li style="margin-bottom: 0.75rem;"><strong>Use bracketing for interpolation</strong> (estimating between two data points) and extending for extrapolation (estimating beyond the graph''s range)</li>
    <li style="margin-bottom: 0.75rem;"><strong>For tables, apply the one-variable rule</strong> — only compare trials where control variables remain constant</li>
    <li style="margin-bottom: 0;"><strong>Don''t overthink precision</strong> — rough estimates are sufficient to select the correct answer range</li>
  </ul>
</div>
')
ON CONFLICT (id) DO UPDATE SET
  section = EXCLUDED.section,
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  content = EXCLUDED.content,
  estimated_minutes = EXCLUDED.estimated_minutes,
  order_index = EXCLUDED.order_index;

INSERT INTO lessons (id, section, title, description, difficulty, estimated_minutes, order_index, content) VALUES
('multiple-figures', 'science', 'Topic 2.4 - Multiple Figures Questions', 'Topic 2.4 - Multiple Figures Questions...', 'intermediate', 30, 6, '<!--
LESSON TEMPLATE v4.0
Subject: Science
Topic Number: 2.4
Topic: Multiple Figures
Lesson Key: multiple-figures
-->

<p style="font-size: 16px; line-height: 1.7; margin: 0.5rem 0 1rem 0;">
More challenging questions on the ACT Science Test require you to use information from multiple tables or figures to find the correct answer, demanding that you understand how different data representations relate to each other and can chain information from one source to another. The key to mastering these questions is recognizing the connection between the figures—typically, you find a data point in the first figure, use that value to locate information in the second figure, and finally use that second piece of information to determine your answer.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
1. How to Identify Multiple Figures Questions
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Multiple figures questions are easy to spot because the question stem explicitly directs you to consider more than one data source:
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Easy Multiple Figures Questions (Explicit Direction)
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>"Based on Figures 1 and 2, ..."</strong> — Directly tells you to use both figures</li>
  <li style="margin-bottom: 0.75rem;"><strong>"According to Table 1 and Figure 3, ..."</strong> — Explicitly names both data sources</li>
  <li style="margin-bottom: 0.75rem;"><strong>"Using information from both graphs, ..."</strong> — Clear signal to combine data</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem; font-style: italic; color: #6b7280;">
These easier questions remove the guesswork by telling you exactly which figures or tables to consult.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Harder Multiple Figures Questions (Implicit Direction)
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>"Based on Experiments 1 and 2, ..."</strong> — References experimental setups that each have their own figures</li>
  <li style="margin-bottom: 0.75rem;"><strong>"The data in Studies 2 and 3 shows ..."</strong> — Refers to studies without naming specific figures</li>
  <li style="margin-bottom: 0.75rem;"><strong>"According to the results of the studies, ..."</strong> — Requires you to identify which figures contain relevant data</li>
  <li style="margin-bottom: 0.75rem;"><strong>"The experiments indicate ..."</strong> — Very general; you must determine which data sources to use</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
For these harder questions, carefully identify <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">key words</strong> in the question stem that indicate which experiments, studies, or trials to focus on.
</p>

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
2. The Chain Strategy: Connecting Multiple Figures
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Most multiple figures questions follow a <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">chain pattern</strong>: information flows from one figure to the next in a sequence.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
The Three-Step Chain Process
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Step 1: Find the starting data point in Figure 1</strong> — Read a specific value from the first figure or table</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 2: Use that value to locate information in Figure 2</strong> — The data point from Figure 1 becomes your search criterion in Figure 2</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 3: Extract your final answer from Figure 2</strong> — Read the corresponding value that answers the question</li>
</ul>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem; font-style: italic; color: #6b7280;">
<strong>Example chain:</strong> "At L = 3 kg in Sample 2 (Figure 1), what is H? → Find H = 12 → Now look at Figure 2: when H = 12 for Sample 2, what is B? → Answer: B = 25"
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Pay Attention to Axis Labels
</h4>

<p style="margin-left: 3rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
The axes and column headers are critical for chaining information correctly:
</p>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;">The <strong>output variable</strong> from Figure 1 often becomes the <strong>input variable</strong> for Figure 2</li>
  <li style="margin-bottom: 0.75rem;">Check units carefully—make sure you''re matching the same measurement</li>
  <li style="margin-bottom: 0.75rem;">Verify you''re tracking the same sample, trial, or experimental condition across both figures</li>
</ul>

<!-- Example 1 will be inserted here by ExampleCard component -->
<!-- Database: position=1, lesson_id=[UUID], title="Chaining Data Across Two Figures" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
3. When to Use Experimental Text
</h3>

<p style="margin-left: 1.5rem; font-size: 15px; line-height: 1.65; margin-top: 1rem;">
Sometimes multiple figures questions ask about information that isn''t directly shown in any figure or table. In these cases, you must consult the <strong style="color: #2563eb; font-weight: 600; text-decoration: underline;">experimental text</strong> above the figures.
</p>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
When to Check the Experimental Text
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>The question asks about variables not shown in the figures</strong> — e.g., "How many trials were run without electricity?" when electricity isn''t listed in any chart</li>
  <li style="margin-bottom: 0.75rem;"><strong>You need to understand experimental setup</strong> — e.g., "What was held constant across all samples?"</li>
  <li style="margin-bottom: 0.75rem;"><strong>The question references experimental conditions</strong> — e.g., "In which experiment was temperature controlled?"</li>
  <li style="margin-bottom: 0.75rem;"><strong>You need definitions</strong> — e.g., understanding what "Sample 1" represents</li>
</ul>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">
Strategy for Using Text + Figures Together
</h4>

<ul style="margin-left: 3rem; font-size: 15px; line-height: 1.75; margin-top: 0.75rem;">
  <li style="margin-bottom: 0.75rem;"><strong>Step 1:</strong> Read the question and identify what information you need</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 2:</strong> Check the figures first—if the data is there, use it</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 3:</strong> If the figures don''t have the needed information, scan the experimental text</li>
  <li style="margin-bottom: 0.75rem;"><strong>Step 4:</strong> Combine information from text and figures as needed</li>
</ul>

<!-- Example 2 will be inserted here by ExampleCard component -->
<!-- Database: position=2, lesson_id=[UUID], title="Combining Experimental Text with Multiple Figures" -->

<h3 style="margin-top: 5rem; margin-bottom: 0.75rem; font-weight: 700;">
4. Common Mistakes and Pro Tips
</h3>

<h4 style="margin-left: 1.5rem; margin-top: 2.5rem; margin-bottom: 0.75rem; font-weight: 600;">