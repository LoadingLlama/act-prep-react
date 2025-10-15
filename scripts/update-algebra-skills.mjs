import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Use service role key provided by user
const SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJhYmF2b2Jka2xud3Z3c2xkYml4Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTc2NTQ3OCwiZXhwIjoyMDc1MzQxNDc4fQ.81SeH703keXgF3IevQlRS7OYmn1J2GUVIkn3OJiviM4';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  SERVICE_ROLE_KEY
);

async function updateAlgebraSkills() {
  const updatedContent = `
            <p class="lesson-intro">Strong algebra skills are the foundation of ACT Math success. These fundamental techniques appear in many different types of problems throughout the test.</p>

            <h3>Order of Operations (PEMDAS)</h3>
            <div class="rules-box">
                <h4>Remember: Please Excuse My Dear Aunt Sally</h4>
                <ol>
                    <li><strong>P</strong>arentheses</li>
                    <li><strong>E</strong>xponents</li>
                    <li><strong>M</strong>ultiplication and <strong>D</strong>ivision (left to right)</li>
                    <li><strong>A</strong>ddition and <strong>S</strong>ubtraction (left to right)</li>
                </ol>
            </div>

            <h3>Distributive Property</h3>
            <div class="rules-box">
                <h4>Key Formula:</h4>
                <p><strong>a(b + c) = ab + ac</strong></p>
                <p>Multiply the term outside parentheses by each term inside</p>
                <p><strong>Example:</strong> 3(x + 4) = 3x + 12</p>
                <p><strong>Example:</strong> -2(5x - 3) = -10x + 6</p>
            </div>

            <h3>Expanding Expressions (FOIL)</h3>
            <div class="concept-box">
                <h4>For (a + b)(c + d):</h4>
                <p><strong>F</strong>irst: a × c</p>
                <p><strong>O</strong>uter: a × d</p>
                <p><strong>I</strong>nner: b × c</p>
                <p><strong>L</strong>ast: b × d</p>
                <p><strong>Example:</strong> (x + 3)(x + 2) = x² + 2x + 3x + 6 = x² + 5x + 6</p>
            </div>

            <h3>Factoring Expressions</h3>
            <div class="rules-box">
                <h4>Reverse of Distributing:</h4>
                <p>Find the greatest common factor (GCF) and factor it out</p>
                <p><strong>Example:</strong> 6x + 12 = 6(x + 2)</p>
                <p><strong>Example:</strong> 4x² - 8x = 4x(x - 2)</p>
            </div>

            <h3>Working with Negative Numbers</h3>
            <div class="concept-box">
                <h4>Key Rules:</h4>
                <ul>
                    <li><strong>(-) + (-) = (-)</strong></li>
                    <li><strong>(-) - (-) = (-) + (+)</strong></li>
                    <li><strong>(-) × (-) = (+)</strong></li>
                    <li><strong>(-) ÷ (-) = (+)</strong></li>
                </ul>
            </div>

            <h3>Combining Like Terms</h3>
            <div class="rules-box">
                <h4>Process:</h4>
                <p>Add or subtract coefficients of terms with the same variable part</p>
                <p><strong>Example:</strong> 3x + 5x - 2x = 6x</p>
                <p><strong>Example:</strong> 2x² + 3x - x² + 5x = x² + 8x</p>
            </div>

            <h3>Cross Multiplication</h3>
            <div class="concept-box">
                <h4>For equations like a/b = c/d:</h4>
                <p><strong>Cross multiply:</strong> ad = bc</p>
                <p><strong>Example:</strong> If x/3 = 5/2, then 2x = 15, so x = 7.5</p>
            </div>

            <h3>Inequalities</h3>
            <div class="rules-box">
                <h4>Critical Rule:</h4>
                <p><strong>When multiplying or dividing by a negative number, flip the inequality sign!</strong></p>
                <p><strong>Example:</strong> -2x > 6 becomes x < -3 (sign flipped!)</p>
            </div>

            <div class="example-box">
                <p><strong>Problem:</strong> Expand and simplify: 2(x + 3) + 3(x - 1)</p>
                <p><strong>Solution:</strong></p>
                <p>Step 1: Distribute: 2x + 6 + 3x - 3</p>
                <p>Step 2: Combine like terms: 5x + 3</p>
            </div>

            <div class="key-takeaway">
                <h4>Key Takeaway</h4>
                <p>These algebra fundamentals appear throughout the ACT Math test. Master the distributive property, FOIL, and factoring - they're essential for quadratics, polynomials, and word problems!</p>
            </div>
        `;

  console.log('Updating algebra-skills lesson in Supabase...\n');

  const { data, error } = await supabase
    .from('lessons')
    .update({ content: updatedContent })
    .eq('lesson_key', 'algebra-skills')
    .select();

  if (error) {
    console.error('❌ Error updating lesson:', error);
  } else {
    console.log('✅ Successfully updated algebra-skills lesson!');
    console.log(`   Updated lesson ID: ${data[0].id}`);
    console.log(`   New content length: ${updatedContent.length} chars`);
    console.log('\nAdded sections:');
    console.log('  ✓ Distributive Property');
    console.log('  ✓ Expanding Expressions (FOIL)');
    console.log('  ✓ Factoring Expressions');
    console.log('\nEnhanced sections:');
    console.log('  ✓ Combining Like Terms (added example)');
    console.log('  ✓ Cross Multiplication (added example)');
    console.log('  ✓ Inequalities (added example)');
    console.log('  ✓ Added comprehensive example problem');
  }
}

updateAlgebraSkills();
