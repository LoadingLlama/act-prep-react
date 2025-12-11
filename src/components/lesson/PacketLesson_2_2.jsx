/**
 * Packet Lesson 2.2 - Precise Word Choice
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, IdentifyError, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_2 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'word-choice');

  return (
    <div ref={contentRef} style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '3rem 3rem',
      backgroundColor: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      fontSize: '15px',
      lineHeight: '1.7',
      color: '#1f2937'
    }}>
      <PacketHeader
        chapterNum="2.2"
        title="Precise Word Choice"
        readingTime="15 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <Term>Word choice</Term> questions appear on the ACT English Test and ask you to select the word that is <strong>clearest and most precise in context</strong>. These questions test your ability to read for context and choose the word that best conveys the intended meaning of the sentence. Good news: you probably already know the right answer—you just need to trust your instincts!
      </div>

      {/* Quick Recognition */}
      <ConceptBox
        title="How to Spot Word Choice Questions"
        items={[
          'All 4 answer choices are single words (or short phrases)',
          'All have the same punctuation (or no punctuation)',
          'The question asks: "Which choice is clearest and most precise in context?"',
          'All choices are grammatically correct—meaning matters, not grammar!'
        ]}
      />

      {/* Section 1: How to Approach */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        1. The 3-Step Word Choice Method
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Word choice questions are easier than they seem! Most of the time, <strong>you already know the right answer</strong> from everyday English. Follow this simple three-step process:
      </p>

      <RuleBox
        number="1"
        title="Read for Context (Look Beyond the Blank!)"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              <strong>Don't just read the sentence with the blank!</strong> Read at least one sentence before and after to understand:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
                What is the passage talking about?<br />
                What tone is being used (formal, casual, scientific)?<br />
                What meaning does the sentence need to convey?
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title="Plug Each Word In (Test Drive All 4!)"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              <strong>Read the sentence aloud in your mind with EACH option.</strong> One at a time:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#eff6ff', borderRadius: '4px' }}>
                "The museum will <strong>show</strong> rare artifacts..."<br />
                "The museum will <strong>exhibit</strong> rare artifacts..."<br />
                "The museum will <strong>display</strong> rare artifacts..."<br />
                "The museum will <strong>present</strong> rare artifacts..."<br /><br />
                Which one sounds most natural and precise for a museum? → "Exhibit" ✓
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="3"
        title="Pick What Makes the Most Sense"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Choose the word that:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                Has the right <strong>definition</strong> (what it means)
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                Has the right <strong>connotation</strong> (how formal/casual it sounds)
              </div>
              <div>
                Creates the right <strong>relationship</strong> between ideas
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="tip">
        <strong>Pro Tip:</strong> Trust your ear! If you're a native English speaker, you've heard thousands of sentences. Your instinct about what "sounds right" is usually correct.
      </TipBox>

      {/* Visual Example */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Example Walkthrough
      </h3>

      <div style={{
        marginLeft: '2rem',
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '14px', lineHeight: '1.7' }}>
          <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
            "Adding solar panels to your house can <u>emit</u> huge savings on energy bills."
          </div>

          <div style={{ marginBottom: '1rem', marginLeft: '1rem', fontSize: '13px' }}>
            A. emit<br />
            B. claim<br />
            C. gift<br />
            D. result in
          </div>

          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <strong>Step-by-step analysis:</strong>
            <div style={{ marginTop: '0.75rem', fontSize: '13px' }}>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                ✗ "Emit" = to send out or release (like smoke)—doesn't fit with "savings"
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                ✗ "Claim" = to assert or demand—doesn't make sense here
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                ✗ "Gift" = a noun, not a verb that works in this context
              </div>
              <div style={{ color: '#1f2937', fontWeight: '600' }}>
                ✓ "Result in" = to cause or produce—this fits perfectly! Solar panels CAUSE savings.
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickCheck
        question='In the sentence "The museum will _____ rare artifacts from ancient Egypt," which word is most precise?'
        choices={[
          "show",
          "exhibit",
          "display",
          "present"
        ]}
        correctAnswer={1}
        explanation='"Exhibit" is the most precise word for a museum formally presenting artifacts to the public. While all options mean showing something, "exhibit" specifically refers to displaying items in a museum or gallery setting.'
      />

      {/* Section Divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 2: Vocabulary Strategy */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        2. The "Fancy Word" Trap: Don't Be Fooled!
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Many students think: <em>"The hardest vocabulary word must be correct—it sounds smart!"</em><br />
        <strong>WRONG! Sometimes the ACT includes difficult words as wrong answers to trap you.</strong> Other times, the correct answer is a simple word you use every day.
      </p>

      <TipBox type="warning">
        <strong>CRITICAL RULE:</strong> The difficulty level of a word does NOT indicate if it's right or wrong. Don't assume fancy = correct!
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        What to Do When You Don't Know a Word
      </h3>

      <ConceptBox
        title="Vocabulary Survival Strategy"
        items={[
          'If you KNOW a word works → Pick it! Even if it seems "too easy"',
          'If you KNOW a word is wrong → Cross it out immediately',
          'If you DON\'T KNOW a word → Can\'t eliminate it, but don\'t assume it\'s right!',
          'If stuck after 30 seconds → Make your best guess and move on (don\'t waste time!)'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Trust What You Know!
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Your instinct about common words is usually correct. <strong>The ACT values precision and clarity, NOT complexity!</strong>
      </p>

      {/* Visual Example */}
      <div style={{
        marginLeft: '2rem',
        marginTop: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', marginBottom: '1rem', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '4px', border: '2px solid #e2e8f0' }}>
          <strong style={{ color: '#1f2937' }}>❌ WRONG THINKING:</strong><br />
          <div style={{ marginTop: '0.5rem', fontSize: '14px' }}>
            "The word 'obfuscate' sounds really smart and hard, so it must be correct!"
          </div>
        </div>

        <div style={{ fontSize: '15px', padding: '1rem', backgroundColor: '#f8fafc', borderRadius: '4px', border: '2px solid #e2e8f0' }}>
          <strong style={{ color: '#1f2937' }}>✓ RIGHT THINKING:</strong><br />
          <div style={{ marginTop: '0.5rem', fontSize: '14px' }}>
            "The simple word 'confuse' fits the context perfectly. I don't need a fancy word just to sound smart!"
          </div>
        </div>
      </div>

      <TipBox type="important">
        <strong>Remember:</strong> A simple word that fits perfectly beats a fancy word that doesn't fit at all!
      </TipBox>

      <QuickCheck
        question='Complete the sentence: "The scientist worked to _____ a cure for the disease." Which is most precise?'
        choices={[
          "fabricate",
          "develop",
          "manufacture",
          "construct"
        ]}
        correctAnswer={1}
        explanation='"Develop" is the most precise word for creating a medical cure through research. "Fabricate" can mean to lie, "manufacture" suggests mass production, and "construct" is for physical building. "Develop" best conveys scientific research and creation.'
      />

      {/* Section Divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 3: Common Patterns */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        3. The Usual Suspects: Common Word Choice Traps
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>The ACT loves testing certain word pairs over and over. Memorize these, and you'll earn easy points!</strong>
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Pattern #1: Similar-Sounding Words (Sound-Alikes)
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These word pairs sound almost the same but have completely different meanings. <strong>The ACT tests them constantly!</strong>
      </p>

      <ComparisonTable
        columns={[
          {
            header: 'AFFECT (verb)',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1e40af', fontSize: '15px' }}>
                  = to influence or impact
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    "The weather <strong>affects</strong> my mood."
                  </div>
                  <div>
                    "How will this decision <strong>affect</strong> us?"
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  Think: <strong>A</strong>ffect = <strong>A</strong>ction (verb)
                </div>
              </div>
            )
          },
          {
            header: 'EFFECT (noun)',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#92400e', fontSize: '15px' }}>
                  = result or outcome
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.75rem' }}>
                    "The <strong>effect</strong> of the storm was devastating."
                  </div>
                  <div>
                    "What was the <strong>effect</strong> on sales?"
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  Think: <strong>E</strong>ffect = <strong>E</strong>nd result (noun)
                </div>
              </div>
            )
          }
        ]}
      />

      <ConceptBox
        title="More Sound-Alike Traps the ACT Loves"
        items={[
          'ELICIT (to draw out) vs. ILLICIT (illegal) → "The question elicited an honest response."',
          'COMPLEMENT (to complete) vs. COMPLIMENT (to praise) → "The wine complements the meal."',
          'ACCEPT (receive) vs. EXCEPT (exclude) → I accept all gifts except fruitcake',
          'ALLUSION (indirect reference) vs. ILLUSION (false perception) → The poem makes an allusion to Shakespeare',
          'PRINCIPAL (main/school head) vs. PRINCIPLE (rule) → The principal enforces principles'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Pattern #2: Similar Meanings, Different Shades
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These words have <strong>similar definitions but slightly different connotations.</strong> Context determines which shade of meaning is correct!
      </p>

      <ConceptBox
        title="Words with Similar Meanings but Different Shades"
        items={[
          'DISPLAY vs. REVEAL vs. EXHIBIT: All mean "to show," but Display = show visually (neutral), Reveal = uncover something hidden (dramatic), Exhibit = demonstrate formally (official)',
          'DISPASSIONATE vs. DISINTERESTED vs. UNBIASED: Dispassionate = unemotional (no feelings), Disinterested = unbiased (no personal stake), Unbiased = neutral (not favoring sides)',
          'STUBBORN vs. DETERMINED vs. PERSISTENT: Stubborn = refuses to change (negative), Determined = firmly decided (positive), Persistent = continues despite obstacles (neutral/positive)'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Pattern #3: Phrasal Verbs & Preposition Choices
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>The preposition changes the meaning!</strong> Trust what sounds natural in standard English:
      </p>

      <ConceptBox
        title="Phrasal Verbs & Preposition Choices"
        items={[
          '"Improved upon" (made better than before) — NOT "improved over" or "improved above"',
          '"Resulted in" (caused something) or "Resulted from" (was caused by something) — NOT "resulted with"',
          '"Differ from" (be different from) — NOT "differ with" or "differ than"'
        ]}
      />

      <TrueFalse
        statements={[
          { text: "The hardest vocabulary word is usually the correct answer.", correct: false },
          { text: "Context includes both the word's definition and its formality level.", correct: true },
          { text: "If a simple word fits perfectly, you should pick a fancier synonym instead.", correct: false },
          { text: "'Affect' is usually a verb and 'effect' is usually a noun.", correct: true }
        ]}
        explanation="The hardest word is NOT always correct! Context includes both meaning and tone. Simple words that fit are better than fancy words that don't. And yes: affect = verb (action), effect = noun (result)."
      />

      {/* Section Divider */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      {/* Section 4: Practice Application */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        4. Putting It All Together
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Let's apply everything you've learned with a challenging example that combines multiple concepts!
      </p>

      <ApplyTheRule
        title="Apply Your Word Choice Skills"
        question='Complete the sentence: "The harsh criticism _____ her confidence, and the _____ was immediate—she withdrew from the competition." Which pair is correct?'
        options={[
          "affected / effect",
          "effected / affect",
          "affected / affect",
          "effected / effect"
        ]}
        correctAnswer={0}
        explanation="The correct answer is &quot;affected / effect.&quot; The first blank needs a VERB (criticism is doing something TO her confidence) → &quot;affected.&quot; The second blank needs a NOUN (we&apos;re talking about the result) → &quot;effect.&quot; Remember: Affect = Action (verb), Effect = End result (noun)!"
      />


      {/* Key Takeaways */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        margin: '4rem 0 1.5rem 0'
      }}>
        • • •
      </div>

      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#16a34a',
        marginBottom: '1rem'
      }}>
        Key Takeaways
      </h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#16a34a'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Word choice questions ask "Which choice is clearest and most precise?" All 4 options are single words with the same punctuation.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#16a34a'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Use the 3-step method: Read for context → Plug each word in → Pick what makes most sense</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#16a34a'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Don't assume fancy = correct! The ACT values precision and clarity, not complexity.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#16a34a'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Memorize common traps: affect (verb) vs. effect (noun), elicit vs. illicit, complement vs. compliment</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#16a34a'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Trust your ear for English—if a simple word sounds right, it probably is!</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_2;
