/**
 * Packet Lesson 1.2 - Essential Comma Rules
 * Custom packet-style layout for comma rules lesson
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

const PacketLesson_1_2 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'commas');

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
      {/* PAGE 1 - Introduction & Four Types */}
      <PacketHeader
        chapterNum="1.2"
        title="Essential Comma Rules"
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
        Commas are the most common punctuation on the ACT English Test, appearing in 15-20 questions per test.
        To master comma questions, you need to understand the 4 types of commas and when each one should be used.
      </div>

      {/* Section 1: The Four Types */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '2rem'
      }}>
        1. The Four Types of Commas
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        The ACT tests exactly 4 comma rules—master these and you'll handle every comma question.
        Each type has a specific purpose and can't be substituted with another. Understanding when to use
        each type is critical for avoiding comma errors.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Type 1: Comma + FANBOYS
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Use a comma and a <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>FANBOYS</strong> word to join two independent clauses.
        Remember from the previous lesson: FANBOYS = For, And, Nor, But, Or, Yet, So.
        Both sides of the FANBOYS word must be independent clauses (complete sentences).
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          My alarm clock did not go off this morning, so I arrived late at school.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Type 2: Dependent Clause Followed by Independent Clause
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        When a dependent clause comes before an independent clause, use a comma to separate them.
        The dependent clause starts with subordinating conjunctions like while, although, because, if.
        This is Rule #4 from the previous lesson on compound sentences.
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          While electronic music has become very popular, many people still prefer classic rock.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Type 3: Unnecessary Information
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Commas separate <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>unnecessary information</strong> from the rest of the sentence.
        Information is unnecessary if you can remove it without fundamentally changing the sentence's meaning.
        Unnecessary information can be as short as one word or as long as a lengthy phrase.
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Mrs. Ellison, who is known for giving pop quizzes, is my least favorite teacher.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The basketball team, though, did not mount a comeback this week.
        </div>
      </div>

      <TipBox title="TIP">
        This is the most common comma type on the ACT. You'll see 5-8 questions testing unnecessary information commas on every test.
      </TipBox>

      <TrueFalse
        statement="A comma is needed in this sentence: 'The book that I borrowed from the library was fascinating.'"
        correctAnswer={false}
        explanation="FALSE. The phrase 'that I borrowed from the library' is necessary information specifying which book. Necessary information (using 'that') does NOT get commas. If it said 'The book, which I borrowed from the library, was fascinating' then commas would be needed because 'which' phrases are always unnecessary information."
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Type 4: Listing
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Use commas when listing more than two items or with multiple adjectives modifying the same noun.
        Always use commas between all items in a series, including before the final "and" or "or".
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          List example: The group ordered coconut shrimp, hot wings, and onion rings.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Adjectives example: The old, limping dog still managed to complete the 3-mile hike.
        </div>
      </div>

      {/* SECTION 2 */}
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
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.25rem'
      }}>
        2. Unnecessary Information Commas
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        The most common comma type on the ACT separates unnecessary information. Information is unnecessary
        if removing it doesn't fundamentally change the sentence's meaning. Unnecessary information can appear
        before a comma, after a comma, or between two commas. After removing unnecessary information, what
        remains must still be a complete sentence.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        The "Crossing-Out" Trick
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        To test if information is unnecessary, cross it out and read what remains. If the sentence is still
        complete and makes sense, the information is unnecessary. If the sentence becomes incomplete or loses
        critical meaning, the information is necessary (no commas).
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          The wooden beam, <span style={{ textDecoration: 'line-through', color: '#9ca3af' }}>set at an angle</span>, created an optical illusion.
        </div>
        <div style={{ fontSize: '15px', color: '#6b7280', marginLeft: '1rem', fontStyle: 'italic' }}>
          → "The wooden beam created an optical illusion" (still complete!)
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        The Names Rule
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        The ACT loves testing comma usage with names—you'll see at least one question on this every test.
        The rule depends on whether the identifier is specific to one person or not.
      </div>

      <ComparisonTable
        columns={[
          {
            header: 'General Identifier (NO commas)',
            content: (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Rule:</div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    If the identifier is NOT specific to one person (friend, teacher, physicist), the name is necessary—no commas.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Example:</div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    "My friend Kelly recently moved to London"
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    (I have multiple friends, so Kelly is necessary)
                  </div>
                </div>
              </div>
            )
          },
          {
            header: 'Specific Identifier (USE commas)',
            content: (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Rule:</div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    If the identifier IS specific to one person (best friend, youngest sister, CEO), the name is unnecessary—use commas.
                  </div>
                </div>
                <div>
                  <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Example:</div>
                  <div style={{ fontSize: '0.875rem', lineHeight: '1.6' }}>
                    "My best friend, Andrew, is a certified scuba diver"
                  </div>
                  <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    (I have only one best friend)
                  </div>
                </div>
              </div>
            )
          }
        ]}
      />

      <ApplyTheRule
        title="Names Rule Practice"
        question="Which sentence is correctly punctuated?"
        options={[
          "My sister, Emma, is studying engineering at MIT.",
          "My sister Emma is studying engineering at MIT.",
          "Both are correct depending on context",
          "Neither is correct"
        ]}
        correctAnswer={2}
        explanation="Both can be correct! If you have only one sister, use commas: 'My sister, Emma, is studying...' (Emma is unnecessary because 'my sister' is specific to one person). If you have multiple sisters, don't use commas: 'My sister Emma is studying...' (Emma is necessary to specify which sister). The Names Rule depends on whether the identifier is specific to one person or not."
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        "That" vs. "Which" Phrases
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Phrases starting with <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>that</strong> never get commas—phrases starting with <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>which</strong> always get commas.
        This is one of the easiest rules to apply on the ACT.
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>"That"</strong> phrases are always necessary (no commas):
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '1rem' }}>
          The dogs that live down the street are always barking.
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>"Which"</strong> phrases are always unnecessary (use commas):
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
          My neighbor's dogs, which are always barking, love to play fetch.
        </div>
      </div>

      <TipBox title="EXCEPTION">
        Prepositional phrases like "on which," "in which," or "of which" don't use commas before them.
      </TipBox>

      <QuickCheck
        question="Which sentence correctly uses 'that' or 'which'?"
        choices={[
          "The documents, that need signatures, are on the desk.",
          "The documents which need signatures are on the desk.",
          "The documents that need signatures are on the desk.",
          "The documents, which need signatures are on the desk."
        ]}
        correctAnswer={2}
        explanation="'That' phrases never get commas and indicate necessary information. Since we need to know WHICH documents (the ones needing signatures), this is necessary information. Answer C is correct. If we were adding extra information about all the documents, we'd say: 'The documents, which need signatures, are on the desk' (both commas required)."
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        "ing" and "ed" Phrases
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Participle phrases</strong> starting with "ing" or "ed" may or may not need commas.
        On the ACT, "ing" and "ed" phrases most commonly appear with commas as unnecessary information.
        If the phrase helps specify which noun, it's necessary (no commas).
      </div>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Unnecessary (use commas):
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
          Excited for the car ride, Jane's bulldog started to jump up and down.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '1rem' }}>
          Marcus applied for the internship, hoping that he would get the position.
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Necessary (no commas):
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem' }}>
          The politician waving to the crowd is predicted to win the election.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Prepositional Phrases
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Prepositional phrases</strong> consist of a preposition and its object.
        The comma rule depends on where the phrase appears in the sentence.
      </div>

      <ConceptBox
        title="Common Prepositions"
        columns={4}
        items={[
          'in', 'of', 'to', 'for', 'with', 'on', 'at', 'from',
          'by', 'about', 'as', 'into', 'like', 'through', 'after', 'over',
          'between', 'during', 'before', 'among', 'around'
        ]}
      />

      <div style={{
        marginLeft: '2rem',
        marginBottom: '1rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>At the FRONT:</strong> Always followed by a comma
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem', marginBottom: '1rem' }}>
          On my way to work, I listened to my new favorite podcast.
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          <strong>In the MIDDLE or END:</strong> Almost never have commas (99% of the time)
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1.5rem' }}>
          The clothing on the bed is for vacation.
        </div>
      </div>

      {/* SECTION 3 */}
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
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.25rem'
      }}>
        3. Transitional Words Like "However"
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>Transitional words</strong> (also called conjunctive adverbs) require specific punctuation.
        These are NOT FANBOYS—they require different punctuation rules.
      </div>

      <ConceptBox
        title="Common Transitional Words"
        columns={3}
        items={[
          'however', 'though', 'therefore', 'instead', 'likewise', 'nevertheless',
          'regardless', 'moreover', 'subsequently', 'furthermore', 'in addition',
          'as a result', 'of course', 'otherwise', 'for example'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Three Ways to Punctuate Transitional Words
      </h3>

      <div style={{
        marginLeft: '2rem',
        marginBottom: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Position 1: At the front of the sentence followed by a comma
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
            However, the truth would not be revealed until next week.
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem' }}>
            As a result, the student was sent to the principal's office.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Position 2: Separated by commas in the middle of a sentence
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
            The truth, however, would not be revealed until next week.
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem' }}>
            The student, as a result, was sent to the principal's office.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            Position 3: Semicolon before + comma after (between two independent clauses)
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', marginBottom: '0.5rem' }}>
            I expected to pay over $100 for my new hiking boots; however, I found a sale and got them for half price.
          </div>
          <div style={{ fontSize: '13px', color: '#6b7280', marginLeft: '1.5rem', fontStyle: 'italic' }}>
            Structure: Independent clause + semicolon + transitional word + comma + Independent clause
          </div>
        </div>
      </div>

      <TipBox title="CRITICAL">
        For Position 3, you need BOTH the semicolon (before) AND the comma (after) the transitional word. Missing either one makes the sentence incorrect.
      </TipBox>

      <IdentifyError
        sentence="The team practiced every day however they still lost the championship game."
        parts={[
          "The team practiced every day",
          "however",
          "they still lost the championship game."
        ]}
        correctPart={1}
        explanation="The error is missing punctuation around 'however'. Since 'however' appears between two independent clauses, you need: semicolon BEFORE + comma AFTER. Correct version: 'The team practiced every day; however, they still lost the championship game.' You could also write: 'The team, however, practiced every day...' (Position 2) or 'However, the team practiced every day...' (Position 1)."
      />

      {/* SECTION 4 */}
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
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.25rem'
      }}>
        4. Spotting and Solving Comma Questions
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        Now that you understand the four comma types, let's learn how to identify and solve comma questions on the ACT.
        Most comma questions test unnecessary information, so recognizing this pattern quickly is essential.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2rem',
        marginBottom: '0.75rem'
      }}>
        How to Identify Unnecessary Information Questions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginLeft: '1rem',
        marginBottom: '1.5rem'
      }}>
        Unnecessary information comma questions have two defining characteristics:
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginLeft: '1rem'
      }}>
        <ul style={{ paddingLeft: '2rem' }}>
          <li style={{ marginBottom: '0.75rem' }}>
            The words in all 4 answer choices are exactly the same
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            The only difference is where commas are located
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            When you see this pattern, immediately use the "crossing-out" trick
          </li>
        </ul>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2rem',
        marginBottom: '1rem'
      }}>
        Step-by-Step Approach
      </h3>

      <div style={{
        marginLeft: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            1. Read the entire sentence carefully
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', lineHeight: '1.7' }}>
            Pay attention to any commas NOT in the underlined portion. These fixed commas are often important
            clues for finding the correct answer. Look out for sentence structure rules from Chapter 1 that may also apply.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            2. Use the crossing-out trick systematically
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', lineHeight: '1.7' }}>
            Test each answer choice by crossing out what the comma(s) would separate. The correct answer
            leaves a complete, grammatical sentence after crossing out.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            3. Apply the specific rules you've learned
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem', lineHeight: '1.7' }}>
            Use the Names Rule, that/which rule, prepositional phrase rules, or transitional word rules as needed.
          </div>
        </div>
      </div>

      <TipBox title="BACKUP METHOD">
        Read the sentence out loud (or "out loud" in your head on test day). If you need to take a short pause for
        a breath, you likely need a comma. This is a backup method—always verify with the crossing-out trick first.
        Natural pauses often correspond to where unnecessary information appears.
      </TipBox>

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
        SUMMARY
      </div>
      <div style={{
        height: '2px',
        backgroundColor: '#d1d5db',
        marginBottom: '2rem'
      }} />
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '1.25rem'
      }}>
        Key Takeaways
      </h2>

      <div style={{
        backgroundColor: '#f0fdf4',
        border: '3px solid #86efac',
        borderRadius: '8px',
        padding: '1.5rem 2rem',
        marginLeft: '1rem'
      }}>
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
            <span>The ACT tests exactly 4 comma types: (1) comma + FANBOYS joining independent clauses, (2) dependent clause before independent clause, (3) unnecessary information, and (4) listing items or adjectives.</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>Use the "crossing-out" trick for unnecessary information commas—if you can remove the information and still have a complete sentence, it's unnecessary and needs commas to separate it.</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>"That" phrases never get commas while "which" phrases always get commas—for names, use commas only when the identifier is specific to one person (best friend, CEO) but not for general identifiers (friend, teacher).</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>Transitional words like "however" require specific punctuation: at the front with a comma after, in the middle between two commas, or between independent clauses with a semicolon before and comma after.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_2;
