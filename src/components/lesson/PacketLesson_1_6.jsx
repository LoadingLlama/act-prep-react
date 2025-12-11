/**
 * Packet Lesson 1.6 - Modifier Placement
 * Custom packet-style layout for modifiers lesson
 * Flexible, page-based design matching PrepPros workbook format
 */

import React, { useRef } from 'react';
import {
  PacketHeader,
  TipBox,
  ConceptBox,
  ComparisonTable,
  RuleBox
} from './PacketComponents';
import { QuickCheck, IdentifyError, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_1_6 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'modifiers');

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
        chapterNum="1.6"
        title="Modifier Placement"
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
        <strong>Misplaced modifier questions make up about 5-7% of the ACT English Test—roughly 4-5 questions per test!</strong>{' '}
        These questions test whether descriptive words, phrases, or clauses are placed next to the nouns they're supposed to modify.
      </div>

      {/* Section 1: What is a Misplaced Modifier? */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. The "Next-Door Neighbor" Rule
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>A <Term>misplaced modifier</Term> is a word, phrase, or clause that is improperly separated from the noun it modifies.</strong>{' '}
        This leads to sentences with hilarious (or confusing) unintended meanings. Let's see quick examples:
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Consistently erupting, Jack loves taking pictures of the Old Faithful geyser.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Consistently erupting, the Old Faithful geyser is Jack's favorite thing to photograph.
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The rule is simple: Modifiers must be right "next-door" to what they're describing.</strong>{' '}
        When a sentence begins with a modifying phrase, it MUST modify the very first noun after the comma.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        How to Fix Misplaced Modifiers
      </h3>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Option 1: Consistently erupting, the Old Faithful geyser is one of Jack's favorite things to photograph.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Option 2: Since it is consistently erupting, Jack loves taking pictures of the Old Faithful geyser.
        </div>
      </div>

      <ConceptBox
        title="The Next-Door Neighbor Rule (Three Positions)"
        items={[
          'FRONT: If modifier is at the beginning → first noun after the comma must be described',
          'MIDDLE: If modifier is in the middle → noun directly before it must be described',
          'END: If modifier is at the end → noun directly before it must be described'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Front: Running from the police, <u>Eric</u> hopped the fence.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Middle: <u>Dr. Anderson</u>, a world-renowned surgeon, fixed my leg.
        </div>
      </div>

      <QuickCheck
        question="Which sentence has correct modifier placement?"
        choices={[
          "Walking through the park, the flowers were admired by Sarah.",
          "The flowers, walking through the park, were admired by Sarah.",
          "Walking through the park, Sarah admired the flowers.",
          "Sarah admired walking through the park the flowers."
        ]}
        correctAnswer={2}
        explanation="'Walking through the park' must describe the person walking. Only option C correctly places 'Sarah' immediately after the comma. Option A incorrectly suggests the flowers are walking. Option B is nonsensical, and option D has garbled word order."
      />

      {/* Section 2: Front Modifiers */}
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
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        2. Front-of-Sentence Modifiers (Most Common!)
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>On the ACT, most misplaced modifier questions have a modifier at the front separated by a comma.</strong>{' '}
        The trick? Make sure the first noun after the comma is the thing being described!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Not popular since the early 1980s, the documentary about mullets explored the hairstyle.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Not popular since the early 1980s, mullets were the topic of a recent documentary.
        </div>
      </div>

      <RuleBox
        number="1"
        title="Identify the modifying phrase before the comma"
        example={
          <div>
            "Not popular since the early 1980s, ..."
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title="Ask: Who or what is being described?"
        example={
          <div>
            What's "not popular since the 1980s"? → <strong>Mullets!</strong> (not documentaries)
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="3"
        title="Find the first noun after the comma"
        example={
          <div>
            "...the documentary..." ← Is this what should be described?
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="4"
        title="Make sure it matches—if not, it's misplaced!"
        example={
          <div>
            "Documentary" ≠ "Mullets" → <strong>Misplaced!</strong> Choose answer that puts "mullets" first.
          </div>
        }
        exampleLabels={[]}
      />

      <ComparisonTable
        columns={[
          {
            header: 'Misplaced Modifier',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Driving down the highway, the mountains looked beautiful to me."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✗ This says the mountains are driving!
                </div>
              </div>
            )
          },
          {
            header: 'Correctly Placed',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Driving down the highway, I thought the mountains looked beautiful."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ "I" (the driver) is first after the comma
                </div>
              </div>
            )
          }
        ]}
      />

      <IdentifyError
        sentence="Covered in chocolate frosting, my sister made the most delicious birthday cake I've ever tasted for the party last weekend."
        parts={[
          "Covered in chocolate frosting,",
          "my sister made the most delicious birthday cake",
          "I've ever tasted for the party last weekend."
        ]}
        correctPart={0}
        explanation="The modifier 'Covered in chocolate frosting' is at the beginning, so it should describe the first noun after the comma. But 'my sister' comes first, making it sound like she is covered in frosting! The cake (not the sister) is covered in frosting. Fix: 'My sister made the most delicious birthday cake, covered in chocolate frosting, that I've ever tasted.'"
      />

      {/* Section 3: Middle/End Modifiers */}
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
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        3. Middle & End Modifiers: The "Which/That" Trap
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Modifiers in the middle or end must be directly after what they're describing.</strong>{' '}
        These often use "which" or "that" and are set off by commas. The ACT loves to place them next to the WRONG noun!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The research team, which arrived early, tracked the blue storks.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: The research team tracked the blue storks, which arrived early.
        </div>
      </div>

      <TipBox title="TWO WAYS TO FIX MIDDLE/END MODIFIERS">
        <div style={{ marginBottom: '1rem' }}>
          <strong>Option 1: Move the modifier to be after what it describes</strong>
        </div>
        <div style={{ marginLeft: '1rem', marginBottom: '1.5rem', fontSize: '15px', color: '#1f2937' }}>
          ✓ "The team tracked the blue storks, which arrived early."
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Option 2: Change what the modifier describes</strong>
        </div>
        <div style={{ marginLeft: '1rem', fontSize: '15px', color: '#1f2937' }}>
          ✓ "The research team, which tracked the blue storks, noted they arrived early."
        </div>
        <div style={{ marginLeft: '1rem', fontSize: '15px', color: '#6b7280', fontStyle: 'italic' }}>
          Now the modifier correctly describes the team
        </div>
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Strategy for Middle/End Modifiers
      </h3>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Step 1: Identify the modifying phrase (look for "which," "that," or commas)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Step 2: Ask: What noun is the modifier describing?
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Step 3: Check the noun right BEFORE the modifier
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Step 4: Make sure they match—if not, it's misplaced!
        </div>
      </div>

      <TrueFalse
        statements={[
          { text: "Modifiers at the beginning of a sentence must describe the first noun after the comma.", correct: true },
          { text: "Modifiers in the middle or end of a sentence can describe any noun in the sentence.", correct: false },
          { text: "The phrase 'which arrived early' will describe whatever noun comes right before it.", correct: true },
          { text: "You can fix a misplaced modifier by adding more commas around it.", correct: false }
        ]}
        explanation="Statement 1 is TRUE—that's the front modifier rule. Statement 2 is FALSE—middle/end modifiers must describe the noun directly before them. Statement 3 is TRUE—'which' modifiers always describe what's right before them. Statement 4 is FALSE—you fix modifiers by moving them or changing the sentence structure, not by adding commas."
      />

      {/* Section 4: Modifiers without Commas */}
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
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        4. Modifiers Without Commas: The Sneaky Ones
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Some modifiers aren't separated by commas, making them harder to spot.</strong>{' '}
        But the "next-door neighbor" rule still applies! Watch for "that," "-ing," and "-ed" words.
      </div>

      <ConceptBox
        title="Three Common Patterns Without Commas"
        items={[
          '"that" clauses: "The book that I borrowed is overdue" (modifies "book")',
          '"-ing" words: "The dog chasing the cat ran away" (modifies "dog")',
          '"-ed" words: "The cake baked by grandma was delicious" (modifies "cake")'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The dog chasing the cat ran into the street.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Chasing the cat, the street was where the dog ran.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: The cake baked by my grandmother was delicious.
        </div>
      </div>

      <ComparisonTable
        columns={[
          {
            header: 'Misplaced (-ing word)',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Running late for work, the coffee spilled on my shirt."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✗ The coffee is running late for work?
                </div>
              </div>
            )
          },
          {
            header: 'Correctly Placed',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Running late for work, I spilled coffee on my shirt."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ "I" (the person) is running late
                </div>
              </div>
            )
          }
        ]}
      />

      <ApplyTheRule
        title="Apply the Next-Door Rule"
        question="What&apos;s wrong with this sentence? &quot;The laptop sitting on the desk belongs to my brother sitting in the library.&quot;"
        options={[
          "No error—both modifiers are correctly placed",
          "The first 'sitting' is misplaced (suggests brother sits on desk)",
          "The second 'sitting' is misplaced (laptop can't sit in library)",
          "Both 'sitting' phrases are misplaced"
        ]}
        correctAnswer={0}
        explanation="Actually, there&apos;s NO error! &apos;Sitting on the desk&apos; correctly modifies &apos;laptop&apos; (comes right after it), and &apos;sitting in the library&apos; correctly modifies &apos;brother&apos; (comes right after it). Both modifiers are next-door to what they describe."
      />

      <ConceptBox
        title="Master Strategy for All Modifier Questions"
        items={[
          'Find the modifying phrase (descriptive words/clauses)',
          'Ask: "What is this describing?"',
          'Check: Is it next-door to that noun?',
          'If NO → It\'s misplaced! Pick the answer that puts them together'
        ]}
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
          <span>A misplaced modifier is improperly separated from the noun it modifies. Use the "next-door neighbor" rule: modifiers must be right next to what they describe.</span>
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
          <span>For front-of-sentence modifiers separated by a comma, the first noun after the comma must be what's being described. This is the most common ACT pattern!</span>
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
          <span>For middle or end-of-sentence modifiers with commas (often using "which" or "that"), the modifier must be directly after the noun it describes.</span>
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
          <span>Modifiers without commas follow the same "next-door neighbor" rule. Watch for "that" clauses, "-ing" words (present participles), and "-ed" words (past participles).</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_6;
