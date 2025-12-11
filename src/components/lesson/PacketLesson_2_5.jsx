/**
 * Packet Lesson 2.5 - Adding & Deleting Information
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_5 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'adding-deleting');

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
        chapterNum="2.5"
        title="Adding & Deleting Information"
        readingTime="20 min"
        verified={true}
      />

      <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#374151', marginBottom: '3rem' }}>
        <Term>Adding or deleting information questions</Term> ask whether specific information should be included in a passage or not. These questions have a special format: <strong>Yes/No + Justification</strong>. For these questions, you must read for context—we recommend reading the entire paragraph where the question appears to determine if the information fits.
      </div>

      <TipBox type="important">
        <strong>The Two-Part Answer Strategy:</strong> Every answer has TWO parts — Part 1: Yes or No (should it be added/kept?), Part 2: Justification (why or why not?). You must get BOTH parts right to earn the point!
      </TipBox>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        1. The Critical Strategy: Read Twice
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        This single strategy makes these questions way easier. Ready?
      </p>

      <RuleBox
        number="1"
        title="The 'Read It Both Ways' Method"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Read the paragraph TWICE:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', borderRadius: '4px' }}>
                Reading #1: WITH the information included<br />
                How does it sound? Does it fit? Does it add value?
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '4px' }}>
                Reading #2: WITHOUT the information (skip over it)<br />
                Does the paragraph still make sense? Is anything missing?
              </div>
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '4px' }}>
              The Decision: If it flows better WITH the information → Add/Keep it!<br />
              If it flows better WITHOUT → Delete it!
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="tip">
        <strong>Pro Tip:</strong> Context is critical—you must understand what the paragraph is discussing. Sometimes you need to read more than just the one paragraph to get the full context!
      </TipBox>

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        2. Adding Information Questions: Should We Add This?
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These questions give you a sentence or phrase and ask: <em>"Should the writer add this sentence?"</em>
      </p>

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        The BIGGEST Mistake Students Make
      </h3>

      <TipBox type="warning">
        <strong>CRITICAL WARNING: Stick to What the Sentence Actually Says!</strong> Many students pick justifications that go WAY beyond what the sentence actually says. Example: Sentence says "Dr. Anderson graduated from Harvard." WRONG justification: "because it shows Dr. Anderson is highly intelligent" (the sentence doesn't say anything about intelligence!). RIGHT justification: "because it establishes Dr. Anderson's educational background" (accurately describes what the sentence provides).
      </TipBox>

      <TipBox type="important">
        <strong>The Justification Rule:</strong> Only consider what the sentence being added ACTUALLY states. Don't make logical leaps or assumptions!
      </TipBox>

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        The Yes/No Decision Framework
      </h3>

      <ConceptBox
        title="When to Say YES (add the information)"
        items={[
          'The information SUPPORTS or relates to the paragraph\'s main idea',
          'The information provides USEFUL context or detail',
          'The information CONNECTS ideas within the paragraph',
          'Removing it would leave a GAP in understanding'
        ]}
      />

      <ConceptBox
        title="When to Say NO (don\'t add it)"
        items={[
          'The information is IRRELEVANT to the paragraph\'s focus',
          'The information DISTRACTS from the main point',
          'The information is already stated elsewhere (REDUNDANT)',
          'The information doesn\'t ADD anything meaningful'
        ]}
      />

      <QuickCheck
        question='A passage about solar power discusses efficiency. Should the writer add: "Solar panels can last 25-30 years"?'
        choices={[
          "Yes, because it shows solar panels are durable",
          "Yes, because it proves solar is the best energy source",
          "No, because it does not relate to efficiency",
          "No, because it suggests solar panels need replacement"
        ]}
        correctAnswer={0}
        explanation='Choice A is correct. The sentence IS relevant to solar power discussion and provides specific, useful information about durability. While the passage focuses on efficiency, lifespan is related information that supports the overall discussion of solar power.'
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        3. Deleting Information Questions: Should We Remove This?
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        These ask if existing information should be removed. Same format: <strong>Yes/No + Justification</strong>. Consider whether the information is relevant and necessary.
      </p>

      <ComparisonTable
        columns={[
          {
            header: 'DELETE when the information:',
            content: (
              <div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.75rem', color: '#1f2937', fontWeight: '600' }}>
                    ✗ Is IRRELEVANT to the paragraph's main idea
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#1f2937', fontWeight: '600' }}>
                    ✗ REPEATS information already stated
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#1f2937', fontWeight: '600' }}>
                    ✗ DISTRACTS from the paragraph's focus
                  </div>
                  <div style={{ color: '#1f2937', fontWeight: '600' }}>
                    ✗ Doesn't ADD anything meaningful
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  If it doesn't help, it hurts! Get rid of it.
                </div>
              </div>
            )
          },
          {
            header: 'KEEP when the information:',
            content: (
              <div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                    ✓ SUPPORTS the main idea
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                    ✓ Provides NECESSARY detail or clarification
                  </div>
                  <div style={{ marginBottom: '0.75rem', color: '#16a34a', fontWeight: '600' }}>
                    ✓ CONNECTS ideas within the paragraph
                  </div>
                  <div style={{ color: '#16a34a', fontWeight: '600' }}>
                    ✓ Adds VALUABLE context
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  If it serves a purpose, keep it!
                </div>
              </div>
            )
          }
        ]}
      />

      <TrueFalse
        statements={[
          { text: "You only need to read the sentence being added/deleted, not the full paragraph.", correct: false },
          { text: "Answer choices have two parts: Yes/No and Justification.", correct: true },
          { text: "Justifications can include information that's implied but not explicitly stated in the sentence.", correct: false },
          { text: "You should delete information when it's irrelevant, even if it's factually true and interesting.", correct: true }
        ]}
        explanation="You MUST read the full paragraph for context! Answers do have two parts. Justifications should ONLY reference what the sentence actually states—no implications or leaps! Even true, interesting info should be deleted if it's irrelevant to the main idea."
      />

      <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: '600', color: '#9ca3af', letterSpacing: '0.05em', textTransform: 'uppercase', margin: '4rem 0 1.5rem 0' }}>
        • • •
      </div>

      <h2 style={{ fontSize: '22px', fontWeight: '700', marginTop: '4rem', marginBottom: '1rem', color: '#1f2937' }}>
        4. Picking the Right Justification (The Second Half!)
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        You've decided Yes or No—great! Now you need to pick the RIGHT justification. This is where students often lose points.
      </p>

      <RuleBox
        number="1"
        title="The 'Only What the Sentence Says' Test"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              <strong>For each justification, ask: Does the sentence being added/deleted ACTUALLY say this?</strong>
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', borderRadius: '4px' }}>
                GOOD justifications are SPECIFIC and ACCURATE:<br />
                → "provides specific detail about the location"<br />
                → "establishes the timeline of events"<br />
                → "describes the physical appearance"
              </div>
              <div style={{ padding: '0.75rem', borderRadius: '4px' }}>
                BAD justifications make LEAPS or reference the WRONG info:<br />
                → "proves that X is superior" (sentence doesn't PROVE anything)<br />
                → References info NOT in the sentence being added/deleted<br />
                → Uses absolute language ("always," "never") when sentence is less definitive
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <h3 style={{ fontSize: '17px', fontWeight: '600', marginTop: '2.5rem', marginBottom: '0.75rem', color: '#1f2937' }}>
        Watch Out for These Trap Justifications
      </h3>

      <ConceptBox
        title="Watch Out for These Trap Justifications"
        items={[
          'Trap #1: References information NOT in the sentence — e.g., "shows Dr. Paul\'s dedication" when the sentence is about Dr. Anderson',
          'Trap #2: Makes logical leaps beyond what\'s stated — e.g., "She studied 8 hours daily" doesn\'t prove she is brilliant, just study time',
          'Trap #3: Uses absolute language inappropriately — "proves," "always," "never," "only" when sentences rarely prove things absolutely'
        ]}
      />

      <ApplyTheRule
        title="Apply the Two-Part Strategy"
        question="Passage about renewable energy discusses wind power. Should the writer add this sentence about turbine lifespan: Wind turbines can generate electricity for 25 years or more."
        options={[
          "Yes, because it proves wind power is the most efficient energy source",
          "Yes, because it provides information about turbine lifespan",
          "No, because it does not explain how wind turbines work",
          "No, because the passage is about solar power, not wind"
        ]}
        correctAnswer={1}
        explanation="Choice B is correct. YES, it should be added because the passage IS about renewable energy including wind. The justification accurately describes what the sentence provides: lifespan information. Choice A makes a leap (doesn&apos;t prove superiority), Choice C is wrong because explaining how isn&apos;t required, and Choice D is wrong because the passage IS about wind power."
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
          <span>Read the paragraph twice—once WITH the information included and once WITHOUT it</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Answer choices have two parts: Yes/No and Justification. You must get BOTH right!</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Only consider what the sentence being added/deleted ACTUALLY says—don't make logical leaps!</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Delete information when it's irrelevant, repetitive, or distracting—even if it's true!</span>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '15px', lineHeight: '1.7', color: '#16a34a' }}>
          <span style={{ fontSize: '18px', marginTop: '2px', flexShrink: 0 }}>✓</span>
          <span>Watch out for trap justifications that reference wrong info, make leaps, or use absolute language inappropriately</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_5;
