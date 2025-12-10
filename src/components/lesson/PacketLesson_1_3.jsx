/**
 * Packet Lesson 1.3 - Advanced Punctuation
 * Custom packet-style layout for punctuation rules lesson
 * Flexible, page-based design matching PrepPros workbook format
 */

import React, { useRef } from 'react';
import {
  PacketHeader,
  TipBox,
  ConceptBox
} from './PacketComponents';
import { QuickCheck, TrueFalse, CommaCorrectness } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';

const PacketLesson_1_3 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'punctuation');

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
      {/* PAGE 1 - Introduction */}
      <PacketHeader
        chapterNum="1.3"
        title="Advanced Punctuation"
        readingTime="30 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        <strong>Punctuation questions account for about 13% of the ACT English Test—roughly 10 questions per test!</strong> To master these questions, you need to understand the specific rules for semicolons, colons, dashes, apostrophes, and quotation marks.
      </div>

      {/* Section 1: Semicolons */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. Semicolons
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The most important rule: A <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>semicolon</span> can replace a period.</strong>{' '}
        Both sides of the semicolon must be independent clauses (complete sentences). If you can replace the semicolon with a period and both halves make sense as separate sentences, the semicolon is correct.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          My boss called me; he asked that I pick up coffee for him.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          The students finished their exams; they celebrated with pizza.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          She loves reading mystery novels; her favorite author is Agatha Christie.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Common Semicolon Errors to Avoid
      </h3>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Error: Second half is not an independent clause</strong>
        </div>
        <div style={{ fontSize: '15px', color: '#991b1b', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
          ❌ Incorrect: My boss called me; asking that I pick up coffee for him.
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', marginLeft: '1.5rem', marginBottom: '1rem', fontStyle: 'italic' }}>
          "Asking that I pick up coffee for him" is not an independent clause
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Error: First half is not an independent clause</strong>
        </div>
        <div style={{ fontSize: '15px', color: '#991b1b', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
          ❌ Incorrect: After my boss called me; he asked that I pick up coffee for him.
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', marginLeft: '1.5rem', marginBottom: '1rem', fontStyle: 'italic' }}>
          "After my boss called me" is a dependent clause, not independent
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>Error: Using a comma instead (comma splice)</strong>
        </div>
        <div style={{ fontSize: '15px', color: '#991b1b', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
          ❌ Incorrect: My boss called me, he asked that I pick up coffee for him.
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', marginLeft: '1.5rem', fontStyle: 'italic' }}>
          This is a <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>comma splice</span> Cannot connect two independent clauses with just a comma
        </div>
      </div>

      <TipBox title="THE TEST">
        Replace the semicolon with a period. If both halves stand alone as complete sentences, the semicolon is correct. If either half cannot stand alone, the semicolon is wrong.
      </TipBox>

      <QuickCheck
        question="Which sentence uses a semicolon correctly?"
        choices={[
          "The concert was amazing; featuring my favorite band.",
          "Although it was raining; we decided to go hiking.",
          "She studied for hours; she was determined to pass the exam.",
          "The restaurant was closed; because of the holiday."
        ]}
        correctAnswer={2}
        explanation="Both 'She studied for hours' and 'she was determined to pass the exam' are independent clauses, so the semicolon is correct. Options A, B, and D all have dependent clauses that cannot stand alone as complete sentences."
      />

      {/* Section 2: Colons */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.1em',
        marginTop: '3rem',
        marginBottom: '0.5rem'
      }}>
        SECTION 2
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />

      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        2. Colons
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        A <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>colon</span> introduces a list, an example, an explanation, a clarification, or a definition.{' '}
        <strong>The part before the colon must always be an independent clause.</strong>
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          I went to the grocery store to pick up some items for dinner: chicken, cheese, and onions.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          He got what he deserved: a one-week suspension without pay.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Chocolate milk is a great recovery drink after a hard workout: it has the carbohydrates and proteins that muscles need to recover.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Three Critical Colon Rules
      </h3>

      <div style={{
        marginBottom: '1.5rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Rule 1: The part before the colon must be an independent clause
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.75rem' }}>
            The part before the colon must be a complete sentence by itself.
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: The slide showing the most popular car colors in 2018: white, gray, and black.
            </div>
            <div style={{ fontSize: '15px', color: '#166534', marginBottom: '0.5rem' }}>
              ✓ Correct: The slide shows the most popular car colors in 2018: white, gray, and black.
            </div>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: The hairstylist excelled in: cuts, coloring, and highlights.
            </div>
            <div style={{ fontSize: '15px', color: '#166534' }}>
              ✓ Correct: The hairstylist excelled in cuts, coloring, and highlights. (no colon needed)
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Rule 2: Everything after the colon must be only the list, example, explanation, clarification, or definition
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.75rem' }}>
            The sentence cannot continue to other topics after the colon.
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: Will brought his lunch to the beach: a roast beef sandwich, and he brought his friend Joey a turkey club.
            </div>
            <div style={{ fontSize: '15px', color: '#166534' }}>
              ✓ Correct: Will brought his lunch to the beach: a roast beef sandwich. He brought his friend Joey a turkey club.
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Rule 3: NEVER use colons with "including," "such as," or "for example"
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.75rem' }}>
            <strong>If you see a colon before OR after these phrases, it is always incorrect.</strong>
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: I went to the grocery store to pick up some items for dinner, including: chicken, cheese, and onions.
            </div>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: I went to the grocery store to pick up some items for dinner: including chicken, cheese, and onions.
            </div>
            <div style={{ fontSize: '15px', color: '#166534', marginBottom: '0.5rem' }}>
              ✓ Correct: I went to the grocery store to pick up some items for dinner, including chicken, cheese, and onions.
            </div>
            <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
              ❌ Incorrect: The study relied on techniques such as: direct observation and surveying.
            </div>
            <div style={{ fontSize: '15px', color: '#166534' }}>
              ✓ Correct: The study relied on techniques such as direct observation and surveying.
            </div>
          </div>
        </div>
      </div>

      <TipBox title="ADVANCED TIP">
        A colon can join two independent clauses if the second clause acts as a definition, example, explanation, or clarification of the first. Example: "Buddy got what he worked for: he really deserved that promotion." This is an advanced grammar rule that rarely appears on the ACT.
      </TipBox>

      <QuickCheck
        question="Which sentence uses a colon correctly?"
        choices={[
          "She needed: bread, milk, and eggs from the store.",
          "The ingredients include: flour, sugar, and butter.",
          "He had one goal: to finish the marathon under four hours.",
          "The meeting topics are: budget, hiring, and scheduling."
        ]}
        correctAnswer={2}
        explanation="The part before the colon ('He had one goal') is an independent clause, and what follows explains that goal. Options A, B, and D all fail because the part before the colon is not an independent clause."
      />

      {/* Section 3: Dashes */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.1em',
        marginTop: '3rem',
        marginBottom: '0.5rem'
      }}>
        SECTION 3
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />

      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        3. Dashes
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Dashes</span> can function like unnecessary information commas, parentheses, or colons.{' '}
        <strong>Most commonly, a pair of dashes sets apart unnecessary information in the middle of a sentence.</strong>{' '}
        Think of dashes as a stronger, more dramatic version of commas or parentheses.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Pair of Dashes for Unnecessary Information
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        Two dashes function exactly like unnecessary information commas. Use the crossing-out trick to verify the information is unnecessary.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Residents of Washington D.C. - the capital of the United States - are still trying to get representation in Congress.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Glazed donuts - even if they are unhealthy - are my favorite.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The concert - featuring artists from around the world - sold out in minutes.
        </div>
      </div>

      <TipBox title="CRITICAL RULE">
        You cannot mix punctuation! Must be a pair of commas, a pair of dashes, OR a pair of parentheses. Never mix them (like using one dash and one comma).
      </TipBox>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
          ❌ Incorrect: Deep-dish pizza - a famous meal in Chicago, does not exist in Italy. (mixing dash and comma)
        </div>
        <div style={{ fontSize: '15px', color: '#166534', marginBottom: '0.375rem' }}>
          ✓ Correct: Deep-dish pizza, a famous meal in Chicago, does not exist in Italy. (pair of commas)
        </div>
        <div style={{ fontSize: '15px', color: '#166534', marginBottom: '0.375rem' }}>
          ✓ Correct: Deep-dish pizza - a famous meal in Chicago - does not exist in Italy. (pair of dashes)
        </div>
        <div style={{ fontSize: '15px', color: '#166534' }}>
          ✓ Correct: Deep-dish pizza (a famous meal in Chicago) does not exist in Italy. (pair of parentheses)
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Single Dash Acting Like a Colon
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        A single dash can introduce a list, example, explanation, definition, or clarification. When acting as a colon, the dash must follow the same 3 colon rules.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          You will need the following ingredients - milk, butter, flour, and eggs.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          In order to establish his dominance, the male lion relied on one thing - his thunderous roar.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The study declared that the results were conclusive - mice will complete the maze faster if they are given soda instead of water.
        </div>
      </div>

      <TrueFalse
        statement="The following sentence is correct: 'The menu featured several appetizers - including spring rolls, dumplings, and samosas.'"
        correctAnswer={false}
        explanation="FALSE. Just like with colons, you should NEVER use a dash (or any punctuation) before or after 'including,' 'such as,' or 'for example.' The correct version is: 'The menu featured several appetizers, including spring rolls, dumplings, and samosas.'"
      />

      {/* Section 4: Apostrophes */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.1em',
        marginTop: '3rem',
        marginBottom: '0.5rem'
      }}>
        SECTION 4
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />

      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        4. Apostrophes
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Apostrophes</span> on the ACT have two functions: possession and contractions.{' '}
        <strong>Most apostrophe questions test whether you can identify the correct possessive form.</strong>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Possession Rules
      </h3>

      <div style={{
        marginBottom: '1.5rem'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            For singular nouns: Add apostrophe + "s"
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              Terrence's bike is much faster than my brother's roller blades.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              The dog's collar was covered in mud.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937' }}>
              Sarah's presentation impressed everyone at the meeting.
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            For plural nouns ending in "s": Add apostrophe after the "s"
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              The boys' jerseys were all covered in mud after the game.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              The students' projects are displayed in the hallway.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937' }}>
              All the teachers' desks were arranged in a circle.
            </div>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: '600', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            For plural nouns NOT ending in "s": Add apostrophe + "s"
          </div>
          <div style={{ marginLeft: '2rem' }}>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              Our women's basketball team won the championship last year.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.375rem' }}>
              The children's toys were scattered across the room.
            </div>
            <div style={{ fontSize: '15px', color: '#1f2937' }}>
              The mice's behavior changed after the experiment.
            </div>
          </div>
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Possessive Pronouns vs. Contractions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        <strong><span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Possessive pronouns</span> (its, hers, yours, ours, theirs) end in "s" but NEVER use an apostrophe.</strong>{' '}
        <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Contractions</span> use an apostrophe to show where letters are removed.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          <strong>Possessive pronouns (no apostrophe):</strong> its, hers, yours, ours, theirs, whose
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '1rem' }}>
          <strong>Contractions (with apostrophe):</strong> it's (it is), you're (you are), they're (they are), who's (who is)
        </div>

        <div style={{ fontSize: '15px', color: '#374151', marginBottom: '0.5rem', fontWeight: '600' }}>
          The plug-in test: Expand the contraction and see if it makes sense
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '0.375rem' }}>
          Example: "The cat loves playing with (its/it's) new toy."
        </div>
        <div style={{ fontSize: '15px', color: '#991b1b', marginLeft: '1.5rem', marginBottom: '0.375rem' }}>
          Test: "The cat loves playing with it is new toy." ❌ This doesn't work!
        </div>
        <div style={{ fontSize: '15px', color: '#166534', marginLeft: '1.5rem' }}>
          Answer: "The cat loves playing with its new toy." ✓ Correct (possessive pronoun)
        </div>
      </div>

      <QuickCheck
        question="Which sentence is correct?"
        choices={[
          "The company announced it's new product lineup.",
          "The students turned in their assignments on time.",
          "Whose going to the concert tonight?",
          "The dog wagged it's tail excitedly."
        ]}
        correctAnswer={1}
        explanation="'Their' is the correct possessive pronoun. In option A, it should be 'its' (possessive, not contraction). In option C, it should be 'Who's' (who is). In option D, it should be 'its' (possessive, not 'it's' which means 'it is')."
      />

      {/* Section 5: Quotation Marks */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.1em',
        marginTop: '3rem',
        marginBottom: '0.5rem'
      }}>
        SECTION 5
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />

      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '0.75rem'
      }}>
        5. Quotation Marks
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <span style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Quotation marks</span> are most commonly used for direct quotes. They can also be used to show a word is being used as a technical term, slang, or in an unusual way.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Direct Quotes That Are Spoken
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        <strong>Direct quotes that are spoken are offset by a comma.</strong> Anytime the quote is being spoken (said, yelled, whispered, exclaimed, etc.), use a comma before or after the quotation.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Abigail said, "I will not pay until the painting is completed."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          "The thunderstorm last night woke me up," Paul whispered.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The teacher announced, "All assignments are due by Friday afternoon."
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Direct Quotes That Are NOT Spoken
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        <strong>Direct quotes that are not spoken have NO commas.</strong> If the quote is just a phrase or part of the sentence (not being actively spoken), there is no punctuation before the quotation marks.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#991b1b', marginBottom: '0.375rem' }}>
          ❌ Incorrect: My grandfather described the shells as, "beautiful souvenirs from a past life."
        </div>
        <div style={{ fontSize: '15px', color: '#166534', marginBottom: '0.5rem' }}>
          ✓ Correct: My grandfather described the shells as "beautiful souvenirs from a past life."
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', fontStyle: 'italic' }}>
          The quotation marks show these are the grandfather's words, but he's not actively speaking them in the scene.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '0.375rem'
      }}>
        Technical Terms, Slang, or Unusual Usage
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '0.75rem'
      }}>
        Quotation marks can show a word is being used as a technical term, in an unusual way, or as slang.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Having defined the term "contact variance," Dr. Chen continued his lecture.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Sven refers to himself as a "professional" influencer.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Allie could smell the "fresh" fish from across the room.
        </div>
      </div>

      <TrueFalse
        statement="The following sentence needs a comma: The article described the findings as groundbreaking discoveries."
        correctAnswer={false}
        explanation="FALSE. Since 'groundbreaking discoveries' is not being actively spoken in the scene (no 'said,' 'announced,' etc.), no comma is needed. If quotation marks were added, it would be: The article described the findings as 'groundbreaking discoveries' (no comma)."
      />

      {/* Key Takeaways */}
      <div style={{
        textAlign: 'center',
        fontSize: '0.75rem',
        fontWeight: '600',
        color: '#9ca3af',
        letterSpacing: '0.1em',
        marginTop: '3rem',
        marginBottom: '0.5rem'
      }}>
        REVIEW
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />

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
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#166534'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
          <span>Semicolons can replace periods. Both sides must be independent clauses.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#166534'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
          <span>Colons introduce lists, examples, or explanations. The part before must be an independent clause.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#166534'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
          <span>Dashes function like unnecessary information commas when used in pairs. Never mix punctuation types.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#166534'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
          <span>Apostrophes show possession or contractions. Possessive pronouns (its, theirs, whose) never use apostrophes.</span>
        </div>

        <div style={{
          display: 'flex',
          gap: '0.75rem',
          fontSize: '15px',
          lineHeight: '1.7',
          color: '#166534'
        }}>
          <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
          <span>Quotation marks for spoken quotes need commas. Quotation marks for non-spoken phrases do not.</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_3;
