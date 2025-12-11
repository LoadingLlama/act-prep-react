/**
 * Packet Lesson 2.3 - Logical Transitions
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_3 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'transitions');

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
        chapterNum="2.3"
        title="Logical Transitions"
        readingTime="20 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <Term>Transition questions</Term> test your reading comprehension by asking you to select the word or phrase that best connects ideas between sentences. Here's the catch: <strong>all answer choices will be grammatically correct</strong>, so you must read for context to determine which transition logically relates the ideas. Think of transitions as bridges—pick the right bridge to connect the ideas!
      </div>

      {/* Quick Recognition */}
      <TipBox type="important">
        <strong>The Golden Rule for Transitions:</strong> Context is EVERYTHING! You cannot determine the correct transition by reading only one sentence. Always read the sentence BEFORE, the sentence AFTER, then ask: What's the relationship between these ideas?
      </TipBox>

      {/* Section 1: How to Approach */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        1. The 3-Step Transition Strategy
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Follow this simple three-step process for EVERY transition question. It works 100% of the time!
      </p>

      <RuleBox
        number="1"
        title="Cover It Up (Ignore the Given Transition)"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              <strong>Literally cover up the underlined transition with your finger.</strong> Why? The transition they give you is often WRONG! If you read it first, your brain will try to justify it even when it's incorrect. Cover it up and think for yourself!
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title="Read Before & After (Understand the Relationship)"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Ask yourself: What's the relationship between these two ideas?
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7', color: '#1f2937' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                Contrast? → Ideas are opposite or contradictory<br />
                Example: "I studied hard. I still failed."
              </div>
              <div style={{ marginBottom: '0.75rem' }}>
                Cause & Effect? → One thing causes another<br />
                Example: "I studied hard. I passed the test."
              </div>
              <div>
                Example? → Second sentence illustrates the first<br />
                Example: "I love fruit. Apples are my favorite."
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="3"
        title="Match the Transition to the Relationship"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              Once you know the relationship, pick the transition that matches it:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              Contrast → "However," "Nevertheless," "On the other hand"<br />
              Cause/Effect → "Therefore," "Consequently," "As a result"<br />
              Example → "For example," "For instance," "Specifically"<br />
              Addition → "Furthermore," "Moreover," "Additionally"
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="important">
        <strong>Pro Tip:</strong> Don't overthink it! Once you identify the relationship, picking the right transition is usually obvious.
      </TipBox>

      <QuickCheck
        question='Choose the best transition: "The experiment failed multiple times. ____, the team refused to give up."'
        choices={[
          "For example",
          "However",
          "Similarly",
          "Therefore"
        ]}
        correctAnswer={1}
        explanation="&quot;However&quot; is correct because it shows contrast between the failure and the team's refusal to give up. &quot;For example&quot; provides an example, &quot;Similarly&quot; shows similarity, and &quot;Therefore&quot; shows cause-effect, none of which fit this context."
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

      {/* Section 2: Type 1 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        2. Type 1: "Pick the Best Transition" (All 4 Are Transitions)
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When <strong>all 4 answer choices are transition words or phrases</strong>, the ACT is simply asking: <em>"Which transition best connects these ideas?"</em> This is the easier type—just match the transition to the relationship!
      </p>

      {/* Visual Example */}
      <div style={{
        marginTop: '2rem',
        marginLeft: '2rem'
      }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: '700',
          marginBottom: '1rem',
          color: '#1f2937'
        }}>
          Example Walkthrough
        </h3>

        <div style={{ fontSize: '14px', lineHeight: '1.7' }}>
          <div style={{ marginBottom: '1rem' }}>
            Passage:<br />
            From a distance, the ocean looked pretty calm today even though a storm had arrived last night. <u style={{ color: '#1f2937' }}>Under the circumstances,</u> the scene was much more chaotic with big waves and strong riptides.
          </div>

          <div style={{ marginLeft: '1rem', marginBottom: '1.5rem', fontSize: '13px' }}>
            A. NO CHANGE (Under the circumstances)<br />
            B. For instance<br />
            C. Up close<br />
            D. For example
          </div>

          <div style={{ paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <strong>Step-by-step analysis:</strong>
            <div style={{ marginTop: '0.75rem', fontSize: '13px' }}>
              <div style={{ marginBottom: '0.75rem', color: '#6b7280' }}>
                Step 1: Cover up "Under the circumstances"
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#6b7280' }}>
                Step 2: Read the relationship<br />
                → Sentence 1: "From a distance" it looked calm<br />
                → Sentence 2: The scene was chaotic<br />
                → Relationship: <span style={{ color: '#1f2937', fontWeight: '600' }}>CONTRAST between distance views</span>
              </div>
              <div style={{ color: '#1f2937', fontWeight: '600' }}>
                Step 3: Match the transition<br />
                ✓ Answer: C. "Up close" creates the perfect contrast with "from a distance"!
              </div>
            </div>
          </div>
        </div>
      </div>

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

      {/* Section 3: Type 2 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        3. Type 2: "To Transition or Not to Transition?" (3 Transitions + 1 "Delete")
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When one choice has NO transition (like "DELETE the underlined portion" or just a period), the ACT is asking a different question: <em>"Do we even NEED a transition here?"</em>
      </p>

      <TipBox type="warning">
        <strong>CRITICAL INSIGHT:</strong> Most often, the correct answer is the one that <strong>REMOVES the transition entirely</strong>! The ACT loves testing whether you can recognize when a transition is unnecessary.
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        When to DELETE the Transition
      </h3>

      <ConceptBox
        title="3 Signs You Should Remove the Transition"
        items={[
          'The sentences are simply CONTINUING the same idea (no shift needed)',
          'The relationship is already CLEAR without a transition word',
          'Adding a transition makes the connection AWKWARD or incorrect'
        ]}
      />

      {/* Visual Example */}
      <div style={{
        marginTop: '2rem',
        marginLeft: '2rem'
      }}>
        <div style={{ fontSize: '15px', marginBottom: '1rem' }}>
          <strong style={{ color: '#1f2937' }}>Incorrect:</strong> Sarah loves to read. <u style={{ color: '#1f2937' }}>Furthermore,</u> she reads three books every week.
          <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '0.5rem' }}>
            The second sentence just continues the idea of Sarah reading. "Furthermore" is unnecessary!
          </div>
        </div>

        <div style={{ fontSize: '15px' }}>
          <strong style={{ color: '#1f2937' }}>Correct:</strong> Sarah loves to read. She reads three books every week.
          <div style={{ fontSize: '13px', color: '#6b7280', fontStyle: 'italic', marginTop: '0.5rem' }}>
            Clean and clear! The ideas flow naturally without a transition.
          </div>
        </div>
      </div>

      <TipBox type="tip">
        <strong>Quick Test:</strong> If removing the transition makes the sentences flow MORE naturally, delete it! Less is often more.
      </TipBox>

      <TrueFalse
        statements={[
          { text: "You should always include a transition between every two sentences.", correct: false },
          { text: "When one answer choice deletes the transition, that's usually the right answer.", correct: true },
          { text: "You can determine the correct transition by reading only the sentence with the blank.", correct: false },
          { text: "All transition questions have four different transition words to choose from.", correct: false }
        ]}
        explanation="NOT every sentence pair needs a transition! When 'delete' is an option, it's often correct because sentences can flow naturally without transitions. You MUST read before and after the blank for context. Some questions offer a 'no transition' option alongside transition choices."
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

      {/* Section 4: Categories */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        4. The 6 Transition Categories: Your Cheat Sheet
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>Memorize these six categories and you'll ace every transition question.</strong> Each category creates a different relationship between ideas!
      </p>

      <div style={{
        marginTop: '2rem',
        marginLeft: '2rem'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            1. CONTRAST / OPPOSITION
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: Ideas are opposite or contradictory<br />
            Transitions: However, Nevertheless, On the other hand, In contrast, Despite this, Yet, Still<br />
            Example: "I studied hard. <u>However,</u> I still failed the test."
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            2. EXAMPLE / ILLUSTRATION
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: Second sentence provides a specific example of the first<br />
            Transitions: For example, For instance, Specifically, In particular, To illustrate<br />
            Example: "Many students struggle with math. <u>For instance,</u> calculus is challenging."
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            3. CAUSE / EFFECT
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: One thing causes another; result or consequence<br />
            Transitions: Therefore, Consequently, As a result, Thus, Hence, So<br />
            Example: "It rained heavily last night. <u>Consequently,</u> the game was canceled."
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            4. ADDITION / CONTINUATION
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: Adding more information in the same direction<br />
            Transitions: Furthermore, Moreover, Additionally, In addition, Also, Besides<br />
            Example: "The movie was exciting. <u>Furthermore,</u> the acting was superb."
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            5. TIME SEQUENCE
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: Showing when things happened relative to each other<br />
            Transitions: Meanwhile, Subsequently, Previously, Ultimately, Finally, Then, Next<br />
            Example: "First, we gathered supplies. <u>Then,</u> we began the experiment."
          </div>
        </div>

        <div>
          <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '0.75rem', color: '#1f2937' }}>
            6. EMPHASIS / CLARIFICATION
          </h3>
          <div style={{ marginLeft: '1rem', fontSize: '14px', lineHeight: '1.7' }}>
            When to use: Emphasizing or clarifying the previous point<br />
            Transitions: Indeed, In fact, Certainly, Undoubtedly, Of course<br />
            Example: "The test was difficult. <u>In fact,</u> it was the hardest all year."
          </div>
        </div>
      </div>

      <ApplyTheRule
        title="Apply Your Transition Knowledge"
        question='Choose the best transition: "The new policy reduced traffic accidents by 40%. ____, city officials decided to expand the program to other neighborhoods."'
        options={[
          "However",
          "For example",
          "Therefore",
          "Similarly"
        ]}
        correctAnswer={2}
        explanation="&quot;Therefore&quot; is correct because it shows cause and effect. The policy&apos;s success (cause) led to the decision to expand it (effect). &quot;However&quot; shows contrast, &quot;For example&quot; gives an example, and &quot;Similarly&quot; shows similarity—none of which fit this relationship."
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

      {/* Key Takeaways */}
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
          <span>Use the 3-step approach: Cover up the given transition → Read before & after → Match the transition to the relationship</span>
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
          <span>Type 1 (all transitions): Pick which transition best connects the ideas</span>
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
          <span>Type 2 (includes "delete" option): Usually correct to remove the transition if ideas flow naturally without it</span>
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
          <span>The 6 categories: Contrast, Example, Cause/Effect, Addition, Time Sequence, Emphasis</span>
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
          <span>Context is EVERYTHING—you must read both surrounding sentences to understand the relationship!</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_3;
