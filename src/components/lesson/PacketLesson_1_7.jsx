/**
 * Packet Lesson 1.7 - Mastering Parallel Structure
 * Custom packet-style layout
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

const PacketLesson_1_7 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'parallel-structure');

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
        chapterNum="1.7"
        title="Mastering Parallel Structure"
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
        <strong>Parallel structure questions make up about 7-9% of the ACT English Test—roughly 5-7 questions per test!</strong>{' '}
        These questions test whether items in a list or comparison are written with the same grammatical form.
      </div>

      {/* Section 1: What is Parallel Structure? */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. The Matching Rule: What is Parallel Structure?
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <Term>Parallel structure</Term> is simple: <strong>items in a list must match in grammatical form.</strong>{' '}
        All verbs, all nouns, all adjectives—they must be the same type. Let's see quick examples:
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: I like swimming, hiking, and reading.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: I like swimming, hiking, and to read.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: She is smart, funny, and creative.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: She is smart, funny, and has creativity.
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem'
      }}>
        <strong>Why does this matter?</strong> When lists use proper parallel structure, sentences flow smoothly.
        Many students can actually "hear" which answer is correct without realizing they're being tested on parallel structure!
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        How to Spot Parallel Structure Errors
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        Look for a list of items (connected by "and," "or," or commas). Then check: <strong>Do all items have the same grammatical form?</strong>
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Julia will not rake the leaves, wash the dishes, and has decided she will not take out the trash.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Julia will not rake the leaves, wash the dishes, or take out the trash.
        </div>
      </div>

      <ComparisonTable
        columns={[
          {
            header: 'Not Parallel',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  To protect her hands, Julia will not rake the leaves, wash the dishes, and has decided not to take out the trash.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✗ Mixes verb phrases with a clause
                </div>
              </div>
            )
          },
          {
            header: 'Parallel',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  To protect her hands, Julia will not rake the leaves, wash the dishes, or take out the trash.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ All three are verb phrases
                </div>
              </div>
            )
          }
        ]}
      />

      <QuickCheck
        question="Which sentence demonstrates correct parallel structure?"
        choices={[
          "My hobbies include swimming, hiking, and to read novels.",
          "My hobbies include swimming, hiking, and reading novels.",
          "My hobbies include to swim, hiking, and reading novels.",
          "My hobbies include swimming, to hike, and reading novels."
        ]}
        correctAnswer={1}
        explanation="All items must have the same form. Option B uses all gerunds (-ing words): 'swimming, hiking, and reading.' The other options mix gerunds with infinitives (to read, to swim, to hike), breaking parallel structure."
      />

      {/* Section 2: Lists and Parallel Structure */}
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
        2. Lists: No Matter How Complex, They Must Match
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Lists can contain nouns, verbs, adjectives, or entire clauses—but they must all match.</strong>{' '}
        Let's look at different types of lists:
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Lists of Nouns or Noun Phrases
      </h3>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Elon Musk is known for self-driving cars and pioneering the SpaceX program.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Elon Musk is known for self-driving cars and the SpaceX program.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Elon Musk is known for manufacturing self-driving cars and pioneering the SpaceX program.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Lists of Verb Phrases
      </h3>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Charlie hoped to get excused from class, receiving an extension, and spend the afternoon watching movies.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Charlie hoped to get excused from class, receive an extension, and spend the afternoon watching movies.
        </div>
      </div>

      <TipBox title="LISTS OF 2 vs. LISTS OF 3+">
        <div style={{ marginBottom: '1rem' }}>
          <strong>Lists of 3 or more items are easier to spot:</strong>
        </div>
        <div style={{ marginLeft: '1rem', marginBottom: '1.5rem', fontSize: '15px', color: '#374151' }}>
          You can clearly "hear" when one item doesn't match.<br/>
          Example: "She made her bed, cleaned the shelves, and swept the floor" (all past tense)
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <strong>Lists of 2 can trick you—they often sound okay even when they're not parallel:</strong>
        </div>
        <div style={{ marginLeft: '1rem', fontSize: '15px', color: '#374151' }}>
          ❌ "It's harder to lift the couch by myself than lifting it with friends."<br/>
          ✅ "It's harder to lift the couch by myself than to lift it with friends." (both "to lift")
        </div>
      </TipBox>

      <IdentifyError
        sentence="After calling in sick, Charlie hoped to get excused from class, receiving an extension on his homework, and spend the afternoon at home."
        parts={[
          "After calling in sick, Charlie hoped",
          "to get excused from class, receiving an extension on his homework,",
          "and spend the afternoon at home."
        ]}
        correctPart={1}
        explanation="The list items don't match: 'to get excused' (infinitive), 'receiving an extension' (gerund), and 'spend' (base verb). To fix it, all three should use the base verb form after 'hoped to': 'get excused,' 'receive an extension,' and 'spend.'"
      />

      {/* Section 3: Correlative Conjunctions */}
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
        3. Correlative Conjunctions: The ACT's Favorite Trick
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <Term>Correlative conjunctions</Term> are pairs of words that connect similar elements.
        <strong>Both parts of the pair must have the same grammatical structure.</strong> These are heavily tested on the ACT!
      </div>

      <ConceptBox
        title="The Four Correlative Conjunctions (Memorize These!)"
        items={[
          'neither ___ nor ___',
          'either ___ or ___',
          'not only ___ but also ___ (MOST TESTED!)',
          'both ___ and ___'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The report is neither accurate nor fair.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: You can either call me or text me.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Mom not only took away my keys but also locked them in the safe.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Both a scholar and an athlete, Sylvia got a scholarship.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The report is neither accurate nor showing fairness.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: She not only runs marathons but also to swim.
        </div>
      </div>

      <RuleBox
        number="1"
        title="Identify what comes AFTER the first part"
        example={
          <div>
            "She not only <strong>runs marathons</strong>..." ← What follows "not only"? A verb phrase!
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title="Make sure the same type follows the second part"
        example={
          <div>
            "...but also <strong>enjoys swimming</strong>." ← Must also be a verb phrase to match!
          </div>
        }
        exampleLabels={[]}
      />

      <ComparisonTable
        columns={[
          {
            header: 'Wrong Structure',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  She not only runs marathons but also to swim.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✗ "runs" (verb) doesn't match "to swim" (infinitive)
                </div>
              </div>
            )
          },
          {
            header: 'Parallel Structure',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  She not only runs marathons but also enjoys swimming.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ Both are verb phrases: "runs" and "enjoys"
                </div>
              </div>
            )
          }
        ]}
      />

      <TrueFalse
        statements={[
          { text: "In correlative conjunctions like 'not only...but also,' both parts must have the same grammatical form.", correct: true },
          { text: "Lists of 2 items are easier to spot for parallel structure errors than lists of 3+ items.", correct: false },
          { text: "The most commonly tested correlative conjunction on the ACT is 'not only...but also.'", correct: true },
          { text: "It's okay to mix gerunds and infinitives in a list as long as they're all verbs.", correct: false }
        ]}
        explanation="Statement 1 is TRUE—correlative conjunctions require matching forms. Statement 2 is FALSE—lists of 3+ are easier because errors are more obvious. Statement 3 is TRUE—'not only...but also' is the most tested. Statement 4 is FALSE—gerunds (-ing) and infinitives (to + verb) must NOT be mixed."
      />

      {/* Section 4: Test Strategy */}
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
        4. Your Step-by-Step Strategy
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Follow these steps every time you see a parallel structure question:</strong>
      </div>

      <ConceptBox
        title="4-Step Strategy for Parallel Structure"
        items={[
          'Step 1: Spot the list or comparison (look for "and," "or," "than," or correlative conjunctions)',
          'Step 2: Find all items in the list (underline each one)',
          'Step 3: Check the grammatical form of each item (noun? verb? adjective?)',
          'Step 4: Choose the answer that makes all items match'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Example: The coach wants us to practice daily, eating healthy, and getting enough sleep.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          This list mixes forms: "to practice" (infinitive), "eating" (gerund), "getting" (gerund). All should be infinitives: "to practice daily, to eat healthy, and to get enough sleep."
        </div>
      </div>

      <ApplyTheRule
        title="Apply the Strategy"
        question='Identify the error: "The museum is both impressive in size and has a collection that attracts visitors worldwide."'
        options={[
          "No error—this sentence is parallel",
          "Should be: 'both impressive in size and impressive in its collection'",
          "Should be: 'both has impressive size and has a worldwide collection'",
          "The word 'both' should be removed"
        ]}
        correctAnswer={1}
        explanation="The correlative conjunction 'both...and' requires matching forms. After 'both' we have an adjective phrase 'impressive in size,' so after 'and' we need another adjective phrase. Option B correctly matches the structure with two adjective phrases."
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
          <span>Parallel structure means all items in a list must have the same grammatical form—all nouns, all verbs, all adjectives, etc.</span>
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
          <span>Lists of 3+ items are easier to spot because you can clearly hear when one doesn't match. Lists of 2 items can be tricky—they might sound okay even when they're not parallel.</span>
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
          <span>Correlative conjunctions (neither/nor, either/or, not only/but also, both/and) must have matching forms on both sides. "Not only...but also" is the most commonly tested.</span>
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
          <span>Use the 4-step strategy: (1) spot the list, (2) find all items, (3) check if forms match, (4) choose the answer that makes them parallel.</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_7;
