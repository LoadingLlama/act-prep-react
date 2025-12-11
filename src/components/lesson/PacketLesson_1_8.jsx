/**
 * Packet Lesson 1.8 - Grammar Essentials & Common Errors
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, IdentifyError, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_1_8 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'misc-topics');

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
        chapterNum="1.8"
        title="Grammar Essentials & Common Errors"
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
        <strong>Miscellaneous grammar questions make up about 8-10% of the ACT English Test—roughly 6-8 questions per test!</strong>{' '}
        This chapter covers commonly confused words, active vs. passive voice, and other important grammar rules that don't fit into other categories. These are the "gotcha" questions that test your ear for English!
      </div>


      {/* Section 1: Affect vs Effect */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        1. The "Affect/Effect" Showdown: Action vs. Result
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        The ACT <strong>loves</strong> testing <Term>affect</Term> vs. <Term>effect</Term>. The good news? There's a simple memory trick that works every time!
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Sunshine and palm trees have a positive affect on my mood.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Sunshine and palm trees have a positive effect on my mood.
        </div>
      </div>

      <ConceptBox
        title="The A-E Rule: Remember the First Letters!"
        items={[
          'AFFECT = Action (both start with A) → It\'s a VERB that means "to influence"',
          'EFFECT = End result (both start with E) → It\'s a NOUN that means "the result"',
          'Quick Test: If you can put "an" or "the" before it → use EFFECT (it\'s a noun)',
          'If it\'s doing something TO another thing → use AFFECT (it\'s a verb)'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        More Examples: Affect (Verb) vs. Effect (Noun)
      </h3>

      <ComparisonTable
        columns={[
          {
            header: 'AFFECT (Verb = Action)',
            content: (
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "The weather <strong>affects</strong> my mood."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    The weather is doing something (influencing)
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "How will this <strong>affect</strong> our plans?"
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    It's performing an action (changing plans)
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'EFFECT (Noun = Result)',
            content: (
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "The weather has an <strong>effect</strong> on my mood."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    "Effect" is a thing (result) — note "an" before it!
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "What will the <strong>effect</strong> be?"
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    It's a thing (outcome) — note "the" before it!
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />

      <ConceptBox
        title="Other Commonly Confused Word Pairs"
        items={[
          'Accept (receive) vs. Except (exclude) → I accept all gifts except fruitcake',
          'Advice (noun) vs. Advise (verb) → I advise you to take my advice',
          'Lie (recline) vs. Lay (place) → I lie down; I lay the book down',
          'Lose (misplace) vs. Loose (not tight) → Don\'t lose your loose change',
          'Principal (school head/main) vs. Principle (rule) → The principal follows principles',
          'Their/There/They\'re → They\'re over there with their dog'
        ]}
      />

      <QuickCheck
        question="Which sentence uses 'affect' correctly?"
        choices={[
          "The medication had no affect on my headache.",
          "The medication did not affect my headache.",
          "The medication's affect was minimal.",
          "My headache was not affected by the medication's affect."
        ]}
        correctAnswer={1}
        explanation="'Affect' is a verb meaning to produce a change. In this sentence, we need a verb: 'did not affect.' The medication (subject) is performing the action of affecting (or not affecting) the headache."
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

      {/* Section 2: Than vs Then */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        2. Than vs. Then: The Comparison Test
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        This one's super simple: <Term>than</Term> is ONLY for comparisons. Everything else gets <Term>then</Term>!
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: I would rather study math then science.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: I would rather study math than science.
        </div>
      </div>

      <ConceptBox
        title="The One-Second Test for Than vs. Then"
        items={[
          'Ask yourself: "Am I comparing two things?"',
          'If YES → Use THAN',
          'If NO → Use THEN',
          'Example: "I like pizza more than pasta" (Comparison? YES!)',
          'Example: "First eat, then clean up" (Comparison? NO!)'
        ]}
      />

      <ConceptBox
        title="Three Uses of 'Then' (All Non-Comparisons)"
        items={[
          'TIME SEQUENCE: "First we eat, then we clean up." (one thing after another)',
          'IN ADDITION: "I need to call Mom, and then we can leave." (also, additionally)',
          'IF/THEN LOGIC: "If it rains, then we\'ll stay inside." (consequence)'
        ]}
      />

      <IdentifyError
        sentence="I think chocolate ice cream tastes better then vanilla, and then I prefer it more then any other flavor."
        parts={[
          "better then vanilla",
          "and then I prefer",
          "more then any"
        ]}
        correctPart={0}
        explanation="Both 'better then' and 'more then' are comparisons, so they should use 'than' not 'then'. The middle 'and then' is correct because it means 'in addition' (not a comparison)."
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

      {/* Section 3: Have vs Of */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        3. Have vs. Of: The "Could've" Trap
      </h2>

      <TipBox type="warning">
        <strong>CRITICAL RULE:</strong> "Could of," "would of," "should of," and "might of" are ALWAYS 100% WRONG! The correct forms are "could HAVE," "would HAVE," "should HAVE," and "might HAVE."
      </TipBox>

      <p style={{ margin: '1.5rem 0', lineHeight: '1.7' }}>
        Why do people make this mistake? Because the contraction "could've" (short for "could have") <em>sounds like</em> "could of" when spoken aloud. But in writing, it must always be "have"!
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: If we left earlier, we could of avoided the traffic.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: If we left earlier, we could have avoided the traffic.
        </div>
      </div>

      <ConceptBox
        title="Modal Verbs That Always Need 'Have' (Never 'Of')"
        items={[
          'Could HAVE (not could of) → "I could have won the race."',
          'Should HAVE (not should of) → "You should have called me."',
          'Would HAVE (not would of) → "They would have helped us."',
          'Might HAVE (not might of) → "She might have forgotten."'
        ]}
      />

      <TipBox type="tip">
        <strong>Why the Confusion?</strong> When you say "could've" out loud, it sounds exactly like "could of." But in writing, it must always be "could have" or "could've" (never "could of").
      </TipBox>

      <QuickCheck
        question="Which sentence is correct?"
        choices={[
          "I should of called you yesterday.",
          "They would of won if they practiced more.",
          "We might have missed the bus.",
          "You could of done better on the test."
        ]}
        correctAnswer={2}
        explanation="'Might have' is correct. All modal verbs (should, would, could, might) must be followed by 'have,' never 'of.' The contraction 'might've' sounds like 'might of,' which causes confusion."
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

      {/* Section 4: Countable vs Non-countable */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        4. Count It or Can't? The Many/Much Rule
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        The ACT tests whether you know which adjectives go with <Term>countable nouns</Term> (things you can count: 1, 2, 3...) versus <Term>non-countable nouns</Term> (things you can't count individually).
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: There are less students in class today.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: There are fewer students in class today.
        </div>
      </div>

      <ConceptBox
        title="The Counting Test: Can You Say 'One, Two, Three...'?"
        items={[
          'Ask: "Can I count this? One ___, two ___, three ___?"',
          'COUNTABLE: "One bottle, two bottles, three bottles" → Use many, fewer, number',
          'Examples of countable: students, calories, hours, trophies',
          'NON-COUNTABLE: Can\'t say "one milk, two milks, three milks" → Use much, less, amount',
          'Examples of non-countable: milk, time, air, significance'
        ]}
      />

      <ComparisonTable
        columns={[
          {
            header: 'COUNTABLE Nouns',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
                  Use: number, many, fewer, few
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ The <strong>number</strong> of ingredients
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ How <strong>many</strong> trophies
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ <strong>Fewer</strong> calories
                  </div>
                  <div>
                    ✓ A <strong>few</strong> minutes
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  These things can be counted: 1 ingredient, 2 trophies, 3 calories...
                </div>
              </div>
            )
          },
          {
            header: 'NON-COUNTABLE Nouns',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
                  Use: amount, much, less, little
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ The <strong>amount</strong> of time
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ How <strong>much</strong> significance
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ <strong>Less</strong> whole milk
                  </div>
                  <div>
                    ✓ A <strong>little</strong> time
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  These can't be counted individually (only measured or experienced)
                </div>
              </div>
            )
          }
        ]}
      />

      <TipBox type="important">
        <strong>Most Common Mistake:</strong> People say "10 items or less" at the grocery store, but it should be "10 items or fewer" because items are countable! This error is everywhere in real life, but the ACT will mark it wrong.
      </TipBox>

      <QuickCheck
        question="Which sentence uses the correct adjective?"
        choices={[
          "There are less students in class today.",
          "I have much friends in this school.",
          "She has fewer patience than her sister.",
          "We need a few more minutes to finish."
        ]}
        correctAnswer={3}
        explanation="'A few more minutes' is correct because minutes are countable. Choice A should be 'fewer students' (countable), choice B should be 'many friends' (countable), and choice C should be 'less patience' (non-countable)."
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

      {/* Section 5: Active vs Passive Voice */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        5. Active vs. Passive: Who's Doing What?
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        In <Term>active voice</Term>, the subject performs the action. In <Term>passive voice</Term>, the subject receives the action. The ACT has a simple rule: <strong>Active voice is ALWAYS better than passive voice!</strong>
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The book was written by the author in 2020.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: The author wrote the book in 2020.
        </div>
      </div>

      <ConceptBox
        title="Spotting Passive Voice: Look for 'Was/Were/Is + Verb-ed + By'"
        items={[
          'Passive voice formula: [Subject] + [was/were/is] + [past participle] + [by someone]',
          'Examples of passive: "The pencil was picked up by me" or "The suspects were announced by the police chief"',
          'Active versions: "I picked up the pencil" or "The police chief announced the suspects"',
          'Active voice is clearer, more direct, and always preferred on the ACT'
        ]}
      />

      <ConceptBox
        title="Why Active Voice is Better (ACT's Reasoning)"
        items={[
          'CLEARER: You immediately know who is doing what',
          'MORE DIRECT: Fewer words, stronger impact',
          'STRONGER: The subject is in control, performing the action',
          'ACT RULE: If one answer is active and one is passive, ALWAYS pick active!'
        ]}
      />

      <ComparisonTable
        columns={[
          {
            header: 'Passive Voice (Avoid!)',
            content: (
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "Mistakes were made by the team."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Wordy, unclear, weak
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "The trophy was won by Sarah."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Focus is on trophy, not Sarah
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'Active Voice (Choose This!)',
            content: (
              <div>
                <div style={{ marginBottom: '0.75rem' }}>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "The team made mistakes."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Clear, direct, strong!
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1f2937' }}>
                    "Sarah won the trophy."
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Sarah is the star, as she should be!
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />

      <TrueFalse
        statements={[
          { text: "Active voice means the subject performs the action.", correct: true },
          { text: "Passive voice is clearer and more direct than active voice.", correct: false },
          { text: "On the ACT, you should choose passive voice over active voice.", correct: false },
          { text: "The phrase 'was written by' signals passive voice.", correct: true }
        ]}
        explanation="Active voice has the subject performing the action and is always preferred on the ACT. Passive voice (with phrases like 'was written by') should be avoided because it's less clear and less direct."
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

      {/* Section 6: Prepositional Idioms */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        6. Prepositional Idioms: When Words Need Their Partners
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        <Term>Idioms</Term> are expressions that must be stated in a specific way because that's how English speakers have agreed to say them. Certain words MUST be paired with certain prepositions—there's no logic, just convention! Luckily, these questions are rare on the ACT.
      </p>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Bobby was afraid by the dark.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Bobby was afraid of the dark.
        </div>
      </div>

      <TipBox type="tip">
        <strong>ACT Strategy:</strong> When you see prepositional idiom questions, trust your ear! Read each choice aloud in your head and pick what "sounds right." Native English speakers usually get these correct by instinct.
      </TipBox>

      <ConceptBox
        title="Common Prepositional Idioms to Memorize"
        items={[
          'Afraid OF (not by) → "I\'m afraid of heights."',
          'Anxious ABOUT (not of) → "She\'s anxious about the test."',
          'Different FROM (not than) → "Cats are different from dogs."',
          'Responsible FOR (not of) → "He\'s responsible for the mistake."',
          'Capable OF (not to) → "I\'m capable of finishing this."',
          'Interested IN (not on) → "We\'re interested in learning French."',
          'Agree WITH a person (not to) → "I agree with you."',
          'Participate IN (not on) → "Let\'s participate in the event."'
        ]}
      />

      <ConceptBox
        title="The 'Sound Test' Strategy"
        items={[
          'Step 1: Read the sentence with each preposition option',
          'Step 2: Which one "sounds" most natural to your ear?',
          'Step 3: That\'s usually the right answer!',
          'Example: "I\'m interested ___ art" → "interested on"? (sounds weird) vs. "interested in"? (sounds natural)'
        ]}
      />

      <QuickCheck
        question="Which sentence uses the correct prepositional idiom?"
        choices={[
          "I am interested on learning French.",
          "She is capable to solving difficult problems.",
          "He is responsible for completing the project.",
          "They are different than us."
        ]}
        correctAnswer={2}
        explanation="'Responsible for' is the correct idiom. Choice A should be 'interested in,' choice B should be 'capable of,' and choice D should be 'different from.'"
      />

      <ApplyTheRule
        title="Apply the Idiom Test"
        question="Which prepositional idiom is INCORRECT in this sentence? 'I'm anxious of the presentation because I'm not capable to speaking in front of large crowds, and my topic is different than everyone else's.'"
        options={[
          "All three idioms are wrong ('anxious of,' 'capable to,' 'different than')",
          "Only 'anxious of' is wrong",
          "Only 'capable to' is wrong",
          "All three idioms are correct"
        ]}
        correctAnswer={0}
        explanation="All three idioms are incorrect! The correct versions are: 'anxious ABOUT the presentation,' 'capable OF speaking,' and 'different FROM everyone else's.' These are fixed expressions in English."
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
          <span><strong>Affect</strong> = Action (verb), <strong>Effect</strong> = End result (noun)</span>
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
          <span>Use <strong>than</strong> for comparisons, <strong>then</strong> for everything else</span>
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
          <span>Modal verbs (could, should, would, might) always need <strong>have</strong>, never "of"</span>
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
          <span>Countable nouns → <strong>number, many, fewer</strong>; Non-countable → <strong>amount, much, less</strong></span>
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
          <span><strong>Active voice</strong> is ALWAYS better than passive voice on the ACT</span>
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
          <span>Prepositional idioms: Trust your ear and use the "sound test"</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_8;
