/**
 * Packet Lesson 2.1 - Eliminating Redundancy & Wordiness
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, IdentifyError, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_2_1 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'redundancy');

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
        chapterNum="2.1"
        title="Eliminating Redundancy & Wordiness"
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
        <Term>Redundancy</Term>, <Term>wordiness</Term>, and <Term>irrelevance</Term> questions appear frequently on the ACT English Test. Good news: these are some of the easiest points to earn! For these questions, <strong>the shortest and simplest answer choice that expresses the same idea is almost always correct</strong>—if anything is redundant, wordy, or irrelevant, eliminate it.
      </div>

      <TipBox type="important">
        <strong>The "Less Is More" Rule:</strong> When the ACT asks: "Which choice is least redundant?" or "Which choice best avoids wordiness?" → Pick the SHORTEST answer that's grammatically correct!
      </TipBox>

      {/* Section 1: Redundancy */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        1. Redundancy: When You're Saying the Same Thing Twice... Twice
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <Term>Redundancy</Term> occurs when information is <strong>unnecessarily repeated</strong>. It's like saying "free gift"—gifts are already free by definition! Redundancy wastes words and annoys readers (and the ACT test writers hate it).
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: "I returned back home after the party."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: "I <strong>returned</strong> home after the party."
        </div>
      </div>

      <ConceptBox
        title="The Redundancy Hit List: Most Common Offenders"
        items={[
          '"Returned back" → Just say "returned" (returning = coming back)',
          '"Past history" → Just say "history" (history is always in the past)',
          '"Free gift" → Just say "gift" (gifts are free by definition)',
          '"Each and every" → Pick ONE: "each" OR "every" (they mean the same)',
          '"Advance planning" → Just say "planning" (planning is always in advance)',
          '"Unexpected surprise" → Just say "surprise" (surprises are unexpected)',
          '"End result" → Just say "result" (results come at the end)'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Context-Based Redundancy: The Sneaky Kind
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Sometimes redundancy depends on <strong>context from earlier in the sentence or passage.</strong> This is trickier because you have to read beyond just the underlined portion!
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: "In Sweden, there are about 300,000 to 400,000 moose, many of which stand over seven feet tall, roaming freely in the Swedish forests."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: "In Sweden, there are about 300,000 to 400,000 moose, many of which stand over seven feet tall, roaming freely in the <strong>forests</strong>."
        </div>
      </div>

      <TipBox type="important">
        <strong>Pro Tip:</strong> Always read at least one sentence BEFORE and AFTER the underlined portion to check for context-based redundancy. Information mentioned earlier doesn't need to be repeated!
      </TipBox>

      <RuleBox
        number="1"
        title="The Two-Sentence Check for Redundancy"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              Before answering, ask yourself two questions:
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '4px', marginBottom: '0.75rem' }}>
              Question 1: Was this information already stated in the current sentence?<br />
              → If YES: Delete it!
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
              Question 2: Was this information already stated in the PREVIOUS sentence?<br />
              → If YES: Delete it!
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <QuickCheck
        question="Which sentence eliminates redundancy?"
        choices={[
          "The annual yearly report was published in March.",
          "The yearly report was published in March.",
          "The report that comes out every year was published in March.",
          "The report was published each and every March."
        ]}
        correctAnswer={1}
        explanation="'Yearly report' is concise and non-redundant. Choice A says 'annual yearly' (both mean the same), choice C is wordy, and choice D uses the redundant phrase 'each and every.'"
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

      {/* Section 2: Wordiness */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        2. Wordiness: The "Why Use 1 Word When 10 Will Do?" Trap
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <Term>Wordiness</Term> means using <strong>more words than necessary</strong> to express an idea. Sentences can be unnecessarily wordy without being redundant. <strong>The ACT loves concise, direct writing</strong>—flowery or overly complex language loses points!
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: "Due to the fact that it was raining, we stayed inside."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: "<strong>Because</strong> it was raining, we stayed inside."
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        The Wordiness Translation Guide
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <strong>Memorize these common wordy phrases and their concise alternatives. The ACT tests these constantly!</strong>
      </p>

      <ComparisonTable
        columns={[
          {
            header: 'WORDY (Don\'t Use!)',
            content: (
              <div>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ Due to the fact that
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ At this point in time
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ In the event that
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ For the purpose of
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ In order to
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ Has the ability to
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937' }}>
                    ✗ Is able to
                  </div>
                  <div style={{ color: '#1f2937' }}>
                    ✗ Despite the fact that
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'CONCISE (Use This!)',
            content: (
              <div>
                <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ Because
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ Now
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ If
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ To / For
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ To
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ Can
                  </div>
                  <div style={{ marginBottom: '0.5rem', color: '#1f2937', fontWeight: '600' }}>
                    ✓ Can
                  </div>
                  <div style={{ color: '#1f2937', fontWeight: '600' }}>
                    ✓ Although / Though
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Simplifying Complex Phrases
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Sometimes entire phrases can be replaced with simpler alternatives. <strong>Watch for overly academic or flowery language—the ACT always prefers clarity!</strong>
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: "The ancient Italian sculptures were donated to a cultural institution supporting intellectual endeavors related to renaissance art."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: "The ancient Italian sculptures were donated to <strong>a museum devoted to renaissance art</strong>."
        </div>
      </div>

      <TipBox type="tip">
        <strong>Strategy:</strong> If an answer choice sounds like someone trying to impress you with big words, it's probably wrong! The ACT favors straightforward, clear writing.
      </TipBox>

      <QuickCheck
        question="Which sentence best avoids wordiness?"
        choices={[
          "Due to the fact that it was raining, we stayed inside.",
          "Because it was raining, we stayed inside.",
          "On account of the fact that it was raining, we stayed inside.",
          "In light of the fact that it was raining, we stayed inside."
        ]}
        correctAnswer={1}
        explanation="'Because' is the most concise way to express causation. All other choices use wordy phrases that mean the same thing as 'because.'"
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

      {/* Section 3: Irrelevance */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        3. Irrelevance: Cool Story, But... Why Are You Telling Me This?
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <Term>Irrelevant information</Term> doesn't contribute to the passage's main idea or the current paragraph's focus. Even if it's interesting or factually true, <strong>if it doesn't help tell the story, it should be eliminated!</strong>
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: "To win the game, Ricky needed to make both free throws. Players are not allowed to step in the lane during a free throw attempt. He made the first one. The entire gym was quiet as he stepped to the line for the second."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: "To win the game, Ricky needed to make both free throws. He made the first one. The entire gym was quiet as he stepped to the line for the second."
        </div>
      </div>

      <RuleBox
        number="1"
        title="The Relevance Test: Ask These 3 Questions"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              Before including information, ask:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
                1. Does this help tell the story?<br />
                → If no, delete it!
              </div>
              <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                2. Does this support the paragraph's main idea?<br />
                → If no, delete it!
              </div>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                3. Would the reader be confused without this info?<br />
                → If no, delete it!
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="warning">
        <strong>Watch Out:</strong> Irrelevant information might be factually true and interesting, but <strong>if it doesn't contribute to the main point</strong>, it should be eliminated! The ACT doesn't care if it's a cool fact—it cares about coherent writing.
      </TipBox>

      <TrueFalse
        statements={[
          { text: "Information that is factually true should always be included in the passage.", correct: false },
          { text: "If information doesn't help tell the story or support the main idea, it's irrelevant.", correct: true },
          { text: "Long answer choices are usually the ones with irrelevant information.", correct: true },
          { text: "You should only check the current sentence for irrelevant details.", correct: false }
        ]}
        explanation="Factually true information can still be irrelevant if it doesn't support the main idea! Irrelevant information usually appears in longer answer choices and should be eliminated. Always check the paragraph's overall focus, not just the current sentence."
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

      {/* Section 4: How to Spot & Answer These Questions */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        4. The Golden Rule: "Shortest Is Correct" (But Only Sometimes!)
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        The ACT directly tells you when testing redundancy, wordiness, or irrelevance. <strong>When you see these specific questions, the shortest answer is almost always correct.</strong> But be careful—this rule ONLY applies when the question asks about these topics!
      </p>

      <ConceptBox
        title="Magic Phrases That Trigger 'Shortest Is Correct'"
        items={[
          '"Which choice is the LEAST REDUNDANT in context?"',
          '"Which choice best avoids WORDINESS AND REDUNDANCY in context?"',
          '"Which choice provides the most CONCISE wording?"',
          '"Which choice is most RELEVANT to this paragraph?"'
        ]}
      />

      <RuleBox
        number="1"
        title="The Golden Rule in Action"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              <strong>When the question says "least redundant" or "most concise":</strong>
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
                Step 1: Eliminate any answer that's grammatically wrong<br />
                Step 2: Of the remaining choices, pick the SHORTEST one<br />
                Step 3: You just earned an easy point!
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        CRITICAL WARNING: When NOT to Use "Shortest Is Correct"
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        ONLY use the "shortest is correct" strategy for questions specifically asking about redundancy or wordiness. <strong>On regular grammar questions (not asking about redundancy), the shortest answer may be wrong!</strong>
      </p>

      <TipBox type="warning">
        <strong>Common Traps: When Shortest Is WRONG</strong><br />
        Always apply grammar rules FIRST unless the question specifically asks about redundancy:
        <div style={{ marginTop: '0.75rem', marginLeft: '1rem' }}>
          • An ambiguous pronoun like "it" or "them" might be shortest but incorrect<br />
          • A sentence fragment might be shorter than a complete sentence but incorrect<br />
          • A grammatically wrong option might use fewer words but still be incorrect
        </div>
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Example: Ambiguous Pronouns Can Be Short But Wrong
      </h3>

      {/* Visual Example */}
      <div style={{
        marginLeft: '2rem',
        marginTop: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          ✗ "Freddie researched coral colonies and aquarium equipment. He ordered some."
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', fontStyle: 'italic', marginBottom: '1rem' }}>
          AMBIGUOUS: Some what? Coral colonies or equipment? We can't tell!
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          ✓ "Freddie researched coral colonies and aquarium equipment. He ordered <strong>some coral colonies</strong>."
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', fontStyle: 'italic' }}>
          Clear and specific! Yes, it's longer, but it's correct ✓
        </div>
      </div>

      <TipBox type="important">
        <strong>Remember:</strong> "Shortest is correct" ONLY works when the question EXPLICITLY asks about redundancy, wordiness, or conciseness. For all other grammar questions, apply grammar rules first!
      </TipBox>

      <ApplyTheRule
        title="Apply the Golden Rule"
        question='A passage about pizza describes its popularity in Italy and America, then asks: "Which choice is least redundant?" for the sentence: "Pizza, which originated in Italy, became popular in Italian restaurants."'
        options={[
          "NO CHANGE (keep 'which originated in Italy')",
          "Pizza became popular in Italian restaurants. (remove the phrase entirely)",
          "Pizza, from Italy, became popular in Italian restaurants.",
          "Pizza, an Italian food, became popular in Italian restaurants."
        ]}
        correctAnswer={1}
        explanation="Since the passage already mentioned pizza originated in Italy, repeating that information is redundant. Choice B eliminates the redundancy while keeping the sentence clear and grammatically correct. It's also the shortest option!"
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
          <span><strong>Redundancy</strong> = unnecessarily repeating information. Check the current sentence AND previous sentences for duplicate info.</span>
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
          <span><strong>Wordiness</strong> = using more words than necessary. Replace phrases like "due to the fact that" with "because."</span>
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
          <span><strong>Irrelevance</strong> = info that doesn't support the main idea. Even if it's true, delete it if it doesn't help tell the story!</span>
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
          <span>The ACT asks: "Which choice is the <strong>least redundant</strong>?" or "Which choice best avoids <strong>wordiness</strong>?" → For THESE questions, shortest is correct!</span>
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
          <span><strong>WARNING:</strong> Don't apply "shortest is correct" to regular grammar questions! Ambiguous pronouns and fragments might be short but are still wrong.</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_2_1;
