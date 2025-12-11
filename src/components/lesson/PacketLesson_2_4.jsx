/**
 * Packet Lesson 2.4 - Answering Which Choice Questions
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, RuleBox } from './PacketComponents';
import { QuickCheck, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_4 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'which-choice');

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
        chapterNum="2.4"
        title="Answering Which Choice Questions"
        readingTime="20 min"
        verified={true}
      />

      <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151', marginBottom: '3rem' }}>
        <Term>"Which choice" questions</Term> ask you to make specific changes to a sentence, and the question itself tells you exactly what to do. These questions are <strong>easy to spot</strong>—they always include the words "which choice" or "which one" in the question. Good news: if you just answer what they're asking, these are straightforward points!
      </div>

      <TipBox type="important">
        <strong>The Golden Rule: Give Them EXACTLY What They Ask For.</strong> Unlike most ACT questions, grammar rules don't matter here! Don't worry about conciseness (shorter ≠ better), don't worry about style or tone, just answer the specific question they're asking!
      </TipBox>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        1. How to Spot These Questions (It's Easy!)
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        "Which choice" questions are the easiest to identify on the entire ACT English Test. Just look for these magic words:
      </p>

      <ConceptBox
        title="Magic Phrases That Signal 'Which Choice' Questions"
        items={[
          '"Which choice..." (the most obvious one!)',
          '"Which one..." (same type of question)',
          '"What choice..." (rare but same idea)',
          'All answer choices are usually grammatically CORRECT'
        ]}
      />

      <TipBox type="tip">
        <strong>Pro Tip:</strong> The question will explicitly tell you what it's testing. Read the question first, THEN look at the passage!
      </TipBox>

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        2. Type 1: Specific Detail Questions ("most specifically describes...")
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These ask you to provide or emphasize a <strong>specific detail</strong>. The question will ask for something very particular!
      </p>

      <RuleBox
        number="1"
        title="The 'Answer the Question' Strategy"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Example question: "Which choice most specifically describes what was used to build iceboxes?"
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                ✗ "which required ice to be bought and placed into the box each week"<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>→ Describes how they WORKED, not what they were BUILT from</span>
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                ✗ "which were only cold enough to keep food cool but not freeze anything"<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>→ Describes TEMPERATURE, not building materials</span>
              </div>
              <div style={{ color: '#1f2937', fontWeight: '600' }}>
                ✓ "wooden boxes with tin and insulated with cork and sawdust"<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>→ <strong>THIS answers what they were BUILT from!</strong> Wood, tin, cork, sawdust.</span>
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="important">
        <strong>CRITICAL:</strong> The other choices might be TRUE or even INTERESTING, but if they don't answer the specific question being asked, they're wrong!
      </TipBox>

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Common Phrasings for Specific Detail Questions
      </h3>

      <ConceptBox
        title="Common Phrasings for Specific Detail Questions"
        items={[
          'Which choice most specifically describes... → Be SUPER specific!',
          'Which choice provides the most relevant detail about... → Must relate to the topic mentioned',
          'Which choice best supports the claim that... → Provide evidence for a claim',
          'Which choice best illustrates... → Give a concrete example'
        ]}
      />

      <QuickCheck
        question='Which choice best supports the claim that the museum is world-class?'
        choices={[
          "houses many artifacts",
          "attracts visitors from around the globe",
          "is open daily",
          "has several exhibits"
        ]}
        correctAnswer={1}
        explanation="&quot;Attracts visitors from around the globe&quot; best supports that it's world-class. The other choices describe features but don't emphasize the global, world-class nature of the museum."
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        3. Type 2: Emphasis & Tone Questions ("most clearly emphasizes...")
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These ask you to <strong>emphasize a particular aspect</strong> or create a certain feeling/tone. You're choosing which word or phrase makes something stand out most!
      </p>

      <RuleBox
        number="1"
        title="The 'Emphasis Test'"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              "Which choice most clearly emphasizes how the dinosaurs INCREASE IN SIZE?"
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7', marginLeft: '1rem' }}>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                sprawl → Doesn't emphasize size increase
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937' }}>
                change in size → Generic, doesn't emphasize INCREASE
              </div>
              <div style={{ marginBottom: '0.75rem', color: '#1f2937', fontWeight: '600' }}>
                <strong>expand</strong> → Perfect! Emphasizes growing BIGGER ✓
              </div>
              <div style={{ color: '#1f2937' }}>
                soak → About water, not size
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Common Phrasings for Emphasis Questions
      </h3>

      <ConceptBox
        title="Common Phrasings for Emphasis Questions"
        items={[
          '"Which choice most clearly emphasizes..." → Make something stand out!',
          '"Which choice best conveys..." → Express a specific feeling/idea',
          '"Which choice creates the most vivid image of..." → Use descriptive, visual language',
          '"Which choice most effectively establishes..." → Set up a particular tone or mood'
        ]}
      />

      <TrueFalse
        statements={[
          { text: "On 'which choice' questions, grammar rules are the most important factor.", correct: false },
          { text: "The shortest answer is usually correct on 'which choice' questions.", correct: false },
          { text: "You should give the question exactly what it asks for, nothing more or less.", correct: true },
          { text: "'Which choice' questions always have grammatically incorrect answer choices.", correct: false }
        ]}
        explanation="Grammar rules DON'T matter on 'which choice' questions—all answers are usually grammatically correct! Short ≠ better here. Just answer the specific question being asked. All choices are typically grammatically correct; you're choosing based on CONTENT, not grammar."
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        4. The Master Strategy: Read the Question FIRST!
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Unlike most ACT questions, for "which choice" questions you should <strong>read the QUESTION before the answer choices</strong>. Why? Because the question tells you exactly what to look for!
      </p>

      <ConceptBox
        title="The 4-Step Process for EVERY 'Which Choice' Question"
        items={[
          'Step 1: Read the QUESTION carefully to understand what it\'s asking for',
          'Step 2: Read the sentence/passage to understand the context',
          'Step 3: Read each answer choice and ask: "Does this answer the question?"',
          'Step 4: Pick the choice that BEST answers the specific question asked'
        ]}
      />

      <ApplyTheRule
        title="Apply the 'Which Choice' Strategy"
        question='"Which choice most specifically describes the climate conditions?" Given these choices about a desert, which answers the question?'
        options={[
          '"where temperatures fluctuate greatly"',
          '"with sandy terrain covering thousands of miles"',
          '"with average daily highs exceeding 110°F and less than 2 inches of annual rainfall"',
          '"that supports unique plant and animal life"'
        ]}
        correctAnswer={2}
        explanation='Choice C is correct because it provides SPECIFIC climate conditions (temperature and rainfall numbers). Choice A is vague, Choice B describes terrain not climate, and Choice D describes life not climate. The question asked for CLIMATE CONDITIONS specifically, and only C delivers exact climate data!'
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
          <span>"Which choice" questions are easy to spot—they always say "which choice" or "which one"</span>
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
          <span>All answer choices are usually grammatically correct—you're choosing based on CONTENT not grammar</span>
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
          <span>Type 1 (specific detail): Provide the exact information the question asks for</span>
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
          <span>Type 2 (emphasis/tone): Choose the option that best emphasizes or conveys what the question asks</span>
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
          <span>The golden rule: Give them EXACTLY what they asked for—nothing more, nothing less!</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_4;
