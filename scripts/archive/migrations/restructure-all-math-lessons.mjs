import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Lesson-specific restructuring functions
function restructureFractionsLesson() {
  return `<div class="lesson-content">
<p class="lesson-intro">Fractions appear frequently on the ACT, and knowing how to add, subtract, multiply, and divide them efficiently is essential. Your calculator can help, but understanding the concepts will make you faster and more accurate. Let's learn fractions from the ground up!</p>

<h3>What is a Fraction?</h3>

<p>A fraction represents a part of a whole. It has two components: the <strong>numerator</strong> (top number) and the <strong>denominator</strong> (bottom number). Think of a fraction like 3/4 as "3 out of 4 parts." The numerator tells you how many parts you have, while the denominator tells you the total number of equal parts that make up the whole.</p>

<p>For example, if you cut a pizza into 4 equal slices and eat 3 of them, you've eaten 3/4 of the pizza. The 3 is the numerator (slices you ate) and the 4 is the denominator (total slices).</p>

<h3>Fraction Operations</h3>

<h4>Multiplication</h4>

<p>Multiplying fractions is the easiest operation! Just multiply straight across: multiply the numerators together, then multiply the denominators together. The formula is: a/b × c/d = (a × c)/(b × d)</p>

<p><strong>Example:</strong> 2/3 × 4/5 = (2 × 4)/(3 × 5) = 8/15</p>

<h4>Division</h4>

<p>Dividing fractions uses a simple trick: flip the second fraction (take its reciprocal) and then multiply! Remember: "Keep, Change, Flip" - keep the first fraction the same, change division to multiplication, and flip the second fraction. The formula is: a/b ÷ c/d = a/b × d/c</p>

<p><strong>Example:</strong> 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6 (simplified)</p>

<h4>Addition and Subtraction</h4>

<p>Adding and subtracting fractions requires a common denominator - the bottoms must match! You can't add fractions with different denominators directly. First, find a common denominator (usually the least common multiple of the two denominators), convert both fractions, then add or subtract the numerators.</p>

<p><strong>Example:</strong> 1/4 + 2/3 = 3/12 + 8/12 = 11/12</p>

<h3>Step-by-Step: Adding Fractions</h3>

<p>Let's walk through adding 1/4 + 2/3 together step by step.</p>

<p><strong>Step 1: Find a common denominator.</strong> We need a number that both 4 and 3 divide into evenly. The smallest common multiple is 12, since 4 × 3 = 12 and 3 × 4 = 12.</p>

<p><strong>Step 2: Convert both fractions.</strong> To convert 1/4 to twelfths, multiply both the top and bottom by 3: 1/4 = 3/12. To convert 2/3 to twelfths, multiply both the top and bottom by 4: 2/3 = 8/12.</p>

<p><strong>Step 3: Add the numerators.</strong> Now that both fractions have the same denominator, we can add: 3/12 + 8/12 = 11/12. The denominator stays the same!</p>

<h3>Calculator Tip</h3>

<p>Here's a time-saving trick for the ACT: you can convert fractions to decimals on your calculator! For a problem like 3/7 + 2/5, just type (3÷7) + (2÷5) and hit equals. You'll get a decimal answer that you can match to the answer choices. This is especially helpful when the fractions are complicated or when you're running short on time.</p>

<h3>Example Problem</h3>

<h4>Example 1</h4>

<p><strong>Problem:</strong> What is 5/8 × 4/15?</p>

<p>A. 1/6<br>B. 1/3<br>C. 2/3<br>D. 9/23</p>

<p><strong>Solution:</strong> Multiply the numerators together and the denominators together, then simplify.</p>

<p>5/8 × 4/15 = (5 × 4)/(8 × 15) = 20/120</p>

<p>Now simplify by dividing both the numerator and denominator by their greatest common factor, which is 20:</p>

<p>20/120 = 1/6</p>

<p><strong>Answer: A</strong></p>

<h3>Key Takeaway</h3>

<p>Remember the tricks: multiply straight across, divide by flipping the second fraction, and use common denominators for addition/subtraction. Your calculator is your friend—use it to convert fractions to decimals when you need to save time! With practice, these operations will become second nature.</p>

</div>`;
}

async function restructureAllMathLessons() {
  console.log('🔄 Restructuring all math lessons...\n');

  const { data: lessons, error } = await supabase
    .from('lessons')
    .select('*')
    .eq('subject', 'math')
    .order('order_index');

  if (error) {
    console.error('❌ Error fetching lessons:', error);
    return;
  }

  console.log(`Found ${lessons.length} math lessons\n`);

  // For now, only restructure fractions as a test
  const fractionsLesson = lessons.find(l => l.lesson_key === 'fractions');

  if (fractionsLesson) {
    const newContent = restructureFractionsLesson();

    const { error: updateError } = await supabase
      .from('lessons')
      .update({
        content: newContent,
        updated_at: new Date().toISOString()
      })
      .eq('id', fractionsLesson.id);

    if (updateError) {
      console.error('❌ Error updating fractions:', updateError);
    } else {
      console.log('✅ Successfully restructured fractions lesson');
      console.log('\nOld length:', fractionsLesson.content.length);
      console.log('New length:', newContent.length);
    }
  }
}

restructureAllMathLessons();
