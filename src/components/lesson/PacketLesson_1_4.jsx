/**
 * Packet Lesson 1.4 - Verb Agreement & Tenses
 * Custom packet-style layout for verb rules lesson
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

const PacketLesson_1_4 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'verbs');

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
        chapterNum="1.4"
        title="Verb Agreement & Tenses"
        readingTime="25 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <strong>Verb questions make up about 11% of the ACT English Test—roughly 8 questions per test!</strong>{' '}
        These questions test you on two major topics: <Term>subject-verb agreement</Term> and <Term>verb tense</Term>.
      </div>

      {/* Section 1: Subject-Verb Agreement */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. Subject-Verb Agreement: The Core Rule
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The <Term>subject</Term> must agree with the verb in number.</strong>{' '}
        This is simple: singular subjects take singular verbs, plural subjects take plural verbs.
        Let's look at quick examples:
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The dog barks at every car.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The dogs bark at every car.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The dog bark at every car.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: The dogs barks at every car.
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Easy, right? But the ACT makes this harder by hiding the subject. <strong>Here's how:</strong>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        The ACT's Three Favorite Tricks
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>Trick #1: Prepositional Phrases (The Most Common Trick!)</strong>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <Term>Prepositional phrases</Term> NEVER contain the subject. The ACT puts them between the subject and verb to confuse you.
        The solution? Cross them out!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          The collection <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>of rare coins</span> was valued at ten thousand dollars.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '1.5rem' }}>
          Cross out "of rare coins" to find the subject "collection" (singular).
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          The students <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>in my chemistry class</span> study together every night.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Cross out "in my chemistry class" to find the subject "students" (plural).
        </div>
      </div>

      <ConceptBox
        title="Common Prepositional Phrases to Cross Out"
        columns={3}
        items={[
          'of the students',
          'in the park',
          'on the table',
          'with his friends',
          'from the store',
          'to the museum',
          'at the concert',
          'by the river',
          'under the bridge',
          'over the mountain',
          'between the trees',
          'among the flowers',
          'for the team',
          'during the game',
          'without the key'
        ]}
      />

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '1rem'
      }}>
        <strong>Trick #2: Group Nouns (Sound Plural, Actually Singular!)</strong>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <Term>Group nouns</Term> refer to groups of people or things, but they're SINGULAR.
        This is counterintuitive—memorize these:
      </div>

      <ConceptBox
        title="Group Nouns (All Singular!)"
        columns={4}
        items={[
          'team',
          'class',
          'committee',
          'jury',
          'group',
          'herd',
          'flock',
          'family',
          'audience',
          'crowd',
          'orchestra',
          'staff'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The team practices every day.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The jury agrees on the verdict.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: The team practice every day.
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginTop: '2rem',
        marginBottom: '1rem'
      }}>
        <strong>Trick #3: Unnecessary Information Phrases</strong>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        The ACT inserts descriptive phrases between commas. These NEVER contain the subject—cross them out too!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Tortoises, <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>known to live to over 150 years old</span>, are sold at the pet shop.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Cross out the phrase to find the subject "Tortoises" (plural).
        </div>
      </div>

      <ComparisonTable
        columns={[
          {
            header: 'With Distractors',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  The entire group of students, many of whom are under 30, prefer the proposal.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  Hard to see the error!
                </div>
              </div>
            )
          },
          {
            header: 'After Crossing Out',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  The entire group... prefers the proposal.
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  "group" (singular) → "prefers" ✓
                </div>
              </div>
            )
          }
        ]}
      />

      <TipBox title="THE PLUG-IN TRICK">
        When you're not sure if a subject is singular or plural:
        <div style={{ marginTop: '0.75rem' }}>
          • Replace singular subjects with "he," "she," or "it"<br/>
          • Replace plural subjects with "they"
        </div>
        <div style={{ marginTop: '0.75rem', fontStyle: 'italic', color: '#6b7280' }}>
          Example: "The percentage of voters <u>prefer</u> the candidate."<br/>
          → "The percentage" becomes "It"<br/>
          → "It prefer"? No! Should be "It prefers" → Answer: "prefers"
        </div>
      </TipBox>

      <IdentifyError
        sentence="The collection of vintage stamps, many from countries that no longer exist, were displayed at the museum during the special exhibition."
        parts={[
          "The collection of vintage stamps,",
          "many from countries that no longer exist,",
          "were displayed at the museum during the special exhibition."
        ]}
        correctPart={2}
        explanation="Cross out the prepositional phrase 'of vintage stamps' and the unnecessary information 'many from countries that no longer exist.' The subject is 'collection' (singular), so the verb should be 'was displayed,' not 'were displayed.'"
      />

      {/* Section 2: Verb Tense */}
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
        2. Verb Tense: Trust Your Ear & Read for Context
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Good news: For <Term>verb tense</Term>, your ear is usually right.</strong>{' '}
        As a native English speaker, you know what sounds correct. The key is to <strong>read for context</strong>—look at
        surrounding sentences and match the tense.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>The Golden Rule: Simple is better than complex.</strong>
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Last year, Margot designed a new clothing line.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Tomorrow, she will launch her new website.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        When to Use Perfect Tense (has/have/had + verb)
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        Use <Term>perfect tense</Term> when you have <strong>two different time periods</strong> in one sentence.
        The perfect tense shows which action happened first.
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Many surfers enjoy paddling out, but few <strong>have ridden</strong> waves over ten feet tall.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The bison <strong>had been eating</strong> when the lions began their attack.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Conditional Tense (would/could)
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <Term>Conditional tense</Term> describes hypothetical situations. The verb form depends on how likely the outcome is:
      </div>

      <div style={{
        marginBottom: '2rem',
        marginLeft: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Probable (likely to happen): If I make the free throw, we <strong>will win</strong> the game.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Improbable (unlikely): If I made the free throw, we <strong>would win</strong> the game.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Impossible (already didn't happen): If I had made the free throw, we <strong>would have won</strong> the game.
        </div>
      </div>

      <QuickCheck
        question="Which sentence uses the correct verb tense?"
        choices={[
          "Before the storm hit, the sailors have anchored their boats.",
          "By tomorrow, the painters will have finished the entire house.",
          "If she studied harder, she will pass the exam.",
          "The dog has ran around the park three times yesterday."
        ]}
        correctAnswer={1}
        explanation="'Will have finished' (future perfect) correctly shows an action that will be completed before a future time ('by tomorrow'). Option A needs 'had anchored' (past perfect), option C needs 'would pass' (conditional), and option D needs 'ran' without 'has.'"
      />

      {/* Section 3: Irregular Verbs */}
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
        3. Irregular Verbs: The "A" vs. "U" Pattern
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <Term>Irregular verbs</Term> don't follow normal patterns—you can't just add "-ed" for past tense.
        The ACT loves to test these! <strong>Here's the pattern to memorize:</strong>
      </div>

      <RuleBox
        number="1"
        title='Past tense (no "has/have/had") → Use the "A" version'
        example={
          <div>
            I <strong>swam</strong> laps this morning. | The show <strong>began</strong> at 8 PM. | She <strong>drank</strong> coffee.
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title='Perfect tense (with "has/have/had") → Use the "U" version'
        example={
          <div>
            I have <strong>swum</strong> laps. | The show has <strong>begun</strong>. | She had <strong>drunk</strong> coffee.
          </div>
        }
        exampleLabels={[]}
      />

      <ConceptBox
        title="Most Commonly Tested Irregular Verbs"
        items={[
          'begin → began → has/have/had begun',
          'drink → drank → has/have/had drunk',
          'sink → sank → has/have/had sunk',
          'swim → swam → has/have/had swum',
          'sing → sang → has/have/had sung',
          'ring → rang → has/have/had rung',
          'run → ran → has/have/had run (exception!)'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The choir sang beautifully last night.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The choir has sung at Carnegie Hall three times.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The choir had sang at Carnegie Hall.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: The choir sung at Carnegie Hall last night.
        </div>
      </div>

      <TrueFalse
        statements={[
          { text: "Group nouns like 'team' and 'jury' are always singular.", correct: true },
          { text: "Prepositional phrases can contain the subject of a sentence.", correct: false },
          { text: "With 'has/have/had,' irregular verbs use the 'u' version (swum, begun, drunk).", correct: true },
          { text: "The verb 'ran' should be used with 'has' in perfect tense.", correct: false }
        ]}
        explanation="Statement 1 is TRUE—group nouns are singular. Statement 2 is FALSE—prepositional phrases NEVER contain the subject. Statement 3 is TRUE—that's the 'a' vs 'u' rule. Statement 4 is FALSE—'has run' is correct, not 'has ran.'"
      />

      {/* Section 4: How to Identify Question Types */}
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
        4. How to Identify What's Being Tested
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The answer choices tell you what's being tested.</strong> Look at the pattern of differences:
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2rem',
        marginBottom: '1rem'
      }}>
        Pattern 1: Subject-Verb Agreement Questions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>If you see singular vs. plural forms, it's testing agreement:</strong>
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.5rem' }}>
          • "is" vs. "are"
        </div>
        <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.5rem' }}>
          • "has" vs. "have"
        </div>
        <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.5rem' }}>
          • "was" vs. "were"
        </div>
        <div style={{ fontSize: '15px', color: '#374151' }}>
          • "runs" vs. "run" (any singular vs. plural verb)
        </div>
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Example: The addition of solar panels to the roof <u>make/makes/have made/were making</u> the house more energy efficient.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          This tests agreement because you see "make" (plural) vs. "makes" (singular). Subject = "addition" (singular) → Answer: "makes"
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Pattern 2: Verb Tense Questions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>If you see different tenses (but NOT singular vs. plural), it's testing tense:</strong>
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Example: The scouts are hosting a bake sale tomorrow. To prepare, Adya <u>would need/was needing/needed/needs</u> to bake blondies.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          This tests tense because all choices are singular (no plural option). Previous sentence uses "are" (present) → Answer: "needs" (present)
        </div>
      </div>

      <ApplyTheRule
        title="Identify the Question Type"
        question='What is being tested? "The team of scientists (discovers/discover/have discovered/will discover) a new species every year."'
        options={[
          "Subject-verb agreement only",
          "Verb tense only",
          "Both subject-verb agreement and verb tense",
          "Neither—this is testing pronoun agreement"
        ]}
        correctAnswer={2}
        explanation="This tests BOTH! You see singular ('discovers') vs. plural ('discover'), which tests agreement. You also see different tenses (present, present perfect, future), which tests tense. First find the subject ('team' = singular), then choose the singular form that matches context ('discovers' for recurring action)."
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
          <span>Cross out prepositional phrases and unnecessary information to find the subject. The subject NEVER appears in these phrases.</span>
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
          <span>Group nouns (team, jury, class, herd) are ALWAYS singular, even though they refer to multiple people or things.</span>
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
          <span>For verb tense, trust your ear and read for context. Match the tense in surrounding sentences. Simple tenses are usually better than complex ones.</span>
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
          <span>Irregular verbs follow the "a" vs. "u" pattern: use "a" for simple past (swam, began, drank), use "u" for perfect tense with has/have/had (swum, begun, drunk).</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_4;
