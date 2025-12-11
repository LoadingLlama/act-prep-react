/**
 * Packet Lesson 2.6 - Sentence & Paragraph Placement
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_6 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'logical-placement');

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
        chapterNum="2.6"
        title="Sentence & Paragraph Placement"
        readingTime="20 min"
        verified={true}
      />

      <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151', marginBottom: '3rem' }}>
        <Term>Logical placement questions</Term> ask you to figure out WHERE a sentence should go in a paragraph. These questions test whether you can follow the <strong>logical flow</strong> of ideas. The good news? They're easy to spot and straightforward to solve if you use the right strategy!
      </div>

      <TipBox type="important">
        <strong>The Critical Rule: Read BEFORE AND AFTER!</strong> The #1 mistake students make is only reading the sentence BEFORE the placement. You MUST read the sentence(s) before AND after each spot. The correct placement flows smoothly in BOTH directions. Think of it like a puzzle piece—it has to fit on all sides!
      </TipBox>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        1. How to Spot the Brackets: Your Placement Radar
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>Logical placement questions are the easiest to identify on the entire ACT English Test.</strong> Just look for bracketed numbers!
      </p>

      <ConceptBox
        title="Magic Signals for Placement Questions"
        items={[
          'Look for bracketed numbers: [1] [2] [3] [4] at the beginning of sentences',
          'These brackets ONLY appear when there\'s a placement question coming',
          'The question will ask: "Where should this sentence be placed?"',
          'Warning: The paragraph might currently be OUT OF ORDER and seem confusing'
        ]}
      />

      <TipBox type="tip">
        <strong>Pro Tip:</strong> When you see those brackets, READ THE PARAGRAPH EXTRA CAREFULLY. It might currently be scrambled, so don't panic if it seems weird at first!
      </TipBox>

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        2. The 'Plug and Read' Power Move
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        This is your foolproof strategy for placement questions. <strong>Don't just guess based on "vibes"—systematically test each spot!</strong>
      </p>

      <RuleBox
        number="1"
        title="The 3-Step 'Plug and Read' Method"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Follow these steps for EVERY placement question:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '1rem', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid #e2e8f0' }}>
                Step 1: Read the whole paragraph first<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  Get the overall context and main idea. Even if it seems confusing (because it's out of order), understand what the paragraph is ABOUT.
                </span>
              </div>
              <div style={{ marginBottom: '1rem', padding: '1rem', borderRadius: '4px', borderLeft: '3px solid #e2e8f0' }}>
                Step 2: Identify what the sentence is ABOUT<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  What specific information does it contain? Does it introduce something new, give an example, provide a result, make a contrast?
                </span>
              </div>
              <div style={{ padding: '1rem', borderRadius: '4px', borderLeft: '3px solid #e2e8f0' }}>
                Step 3: Test EACH spot by reading before AND after<br />
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  Plug the sentence into each bracketed position and read: [sentence before] → [placed sentence] → [sentence after]. Does it flow smoothly in BOTH directions?
                </span>
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="important">
        <strong>CRITICAL:</strong> Don't skip Step 3! You MUST read the sentence after each placement spot, not just the sentence before. This is where most students go wrong!
      </TipBox>

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        3. The 4 Clue Categories: Your Placement Detective Kit
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When you're testing placements, look for these four types of clues that tell you whether a sentence fits in a particular spot. <strong>These are your "placement detectives"!</strong>
      </p>

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Clue Type #1: Pronouns & References (The "What Are You Talking About?" Test)
      </h3>

      <ConceptBox
        title="Clue Type #1: Pronouns & References"
        items={[
          'Words like "this," "that," "these," "those," "he," "she," "it," "they" refer BACK to something already mentioned',
          '"This ultimately resulted in..." → Must come AFTER what caused the result',
          '"These findings surprised..." → Must come AFTER the findings are presented',
          '"She then decided..." → Must come AFTER the person is introduced',
          '"However, it failed..." → Must come AFTER what "it" refers to is mentioned'
        ]}
      />

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Clue Type #2: Chronological Order (The "What Happened When?" Test)
      </h3>

      <ConceptBox
        title="Clue Type #2: Chronological Order"
        items={[
          'Time markers tell you the sequence of events',
          '"First," "then," "next," "after," "finally" → Follow time order!',
          '"Before starting..." → Comes BEFORE the main action',
          '"Three years later..." → Comes AFTER earlier events are mentioned',
          '"Eventually,..." → Near the END of a sequence'
        ]}
      />

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Clue Type #3: Topic Continuity (The "Stay on Topic!" Test)
      </h3>

      <ConceptBox
        title="Clue Type #3: Topic Continuity"
        items={[
          'Sentences about the same subtopic should be grouped together',
          'Don\'t interrupt a discussion about Topic A with a sentence about Topic B',
          'Keep sentences about the same person, place, or thing together',
          'If the sentence introduces a NEW topic, it should come at a natural transition point'
        ]}
      />

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Clue Type #4: Transition Words (The "How Does It Connect?" Test)
      </h3>

      <ConceptBox
        title="Clue Type #4: Transition Words"
        items={[
          'Transition words signal how the sentence relates to what\'s around it',
          '"However," "in contrast," "on the other hand" → Signals a SHIFT or contrast',
          '"For example," "such as," "to illustrate" → Provides an EXAMPLE of previous point',
          '"Furthermore," "additionally," "moreover" → ADDS to previous points',
          '"Therefore," "thus," "as a result" → Shows a CONCLUSION or consequence'
        ]}
      />

      <QuickCheck
        question='A sentence says: "These unexpected results challenged the team&apos;s initial hypothesis." Where should it be placed?'
        choices={[
          "Before the hypothesis is mentioned",
          "After the results are presented",
          "Before the experiment begins",
          "At the very start of the paragraph"
        ]}
        correctAnswer={1}
        explanation='"These unexpected results" is a pronoun phrase that refers back to specific findings. The results must be presented FIRST, then the sentence can refer to them. The word &quot;these&quot; signals that it must come AFTER something already mentioned!'
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        4. Good Placement vs. Bad Placement: See the Difference
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Let's look at what makes a placement work (or NOT work) with a concrete example!
      </p>

      <ComparisonTable
        columns={[
          {
            header: 'BAD Placement ✗',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
                  Interrupts the logical flow
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', padding: '1rem', borderRadius: '4px' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    [1] The scientists prepared their equipment. <strong style={{ color: '#1f2937' }}>[Sentence: "This discovery shocked the world."]</strong> They began the experiment at dawn.
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                    ✗ Problem: What discovery? Nothing has been discovered yet! "This discovery" refers to something that hasn't been mentioned.
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'GOOD Placement ✓',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
                  Flows smoothly in both directions
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6', padding: '1rem', borderRadius: '4px' }}>
                  <div style={{ marginBottom: '1rem' }}>
                    They observed a new chemical reaction. <strong style={{ color: '#1f2937' }}>[Sentence: "This discovery shocked the world."]</strong> Scientists immediately began studying it further.
                  </div>
                  <div style={{ fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                    ✓ Perfect! "This discovery" clearly refers to the "new chemical reaction" mentioned right before. The flow works in both directions!
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />

      <TipBox type="tip">
        <strong>The Flow Test:</strong> Read it like a story. Does it make sense? Can you follow what's happening? If you have to re-read it multiple times to understand, it's probably the WRONG placement!
      </TipBox>

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        5. Don't Fall for These Traps!
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>These are the most common mistakes students make on placement questions. Avoid them and you'll get these points every time!</strong>
      </p>

      <ConceptBox
        title="Common Traps to Avoid"
        items={[
          'Trap #1: Only Reading the Sentence BEFORE — The #1 mistake! Always read [before] → [placed sentence] → [after]',
          'Trap #2: Not Reading the Whole Paragraph First — Read the entire paragraph to get the big picture before placing anything',
          'Trap #3: Choosing Based on Topic Similarity Alone — Check the logical sequence (pronouns, chronology, cause/effect)',
          'Trap #4: Rushing Through the Answer Choices — Take time to plug in and read the sentence at each spot'
        ]}
      />

      <TrueFalse
        statements={[
          { text: "On placement questions, you only need to read the sentence BEFORE the placement spot.", correct: false },
          { text: "Bracketed numbers [1] [2] [3] only appear when there's a placement question.", correct: true },
          { text: "Sentences with pronouns like 'this' or 'these' must come after what they refer to.", correct: true },
          { text: "Topic similarity alone is enough to determine the correct placement.", correct: false }
        ]}
        explanation="You MUST read the sentence before AND after each placement spot! Bracketed numbers only appear for placement questions. Pronouns like 'this' and 'these' refer back to previously mentioned concepts. Topic similarity is necessary but you also need to check logical sequence, pronouns, and chronology!"
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        6. Your Complete Placement Strategy
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Put it all together with this systematic approach!
      </p>

      <ConceptBox
        title="The Complete 5-Step Placement System"
        items={[
          'Step 1: Spot the brackets [1] [2] [3] and know a placement question is coming',
          'Step 2: Read the ENTIRE paragraph to understand the overall context and flow',
          'Step 3: Identify what the sentence is about and look for clue words (pronouns, time markers, transitions)',
          'Step 4: Test EACH placement by plugging the sentence in and reading [before] → [sentence] → [after]',
          'Step 5: Choose the placement that flows smoothly in BOTH directions with NO confusion'
        ]}
      />

      <ApplyTheRule
        title="Apply the Placement Strategy"
        question='Paragraph: The team collected water samples. Laboratory analysis revealed unusual microorganisms. Further study confirmed they were a new species. Where should this sentence go: "These findings prompted additional research funding."'
        options={[
          'Position [1] - at the very beginning',
          'Position [2] - after collecting samples',
          'Position [3] - after lab analysis',
          'After the entire paragraph (position [4])'
        ]}
        correctAnswer={3}
        explanation='The sentence says "These findings"—a pronoun phrase that refers back to something specific. What are "the findings"? The discovery of a new species! The sentence must come AFTER the new species is confirmed. Position [4] allows "these findings" to refer to the entire discovery process. Reading it there: "Further study confirmed they were a new species. These findings prompted additional research funding." Perfect flow in both directions!'
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>
      <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#16a34a', marginBottom: '1rem' }}>
        Key Takeaways
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Bracketed numbers [1] [2] [3] ONLY appear when there's a placement question—they're your signal!</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>The critical strategy: "Plug and Read" by testing [before] → [sentence] → [after] for EVERY position</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Use the 4 detective clues: pronouns, chronological order, topic continuity, and transition words</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>The #1 mistake: only reading the sentence BEFORE the placement (you MUST read the sentence AFTER too!)</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>If it flows like natural storytelling with no confusion → you've found the right spot!</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_6;
