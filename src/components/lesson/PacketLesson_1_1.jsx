/**
 * Packet Lesson 1.1 - Building Complete Sentences
 * Custom packet-style layout for sentence structure lesson
 * Flexible, page-based design matching PrepPros workbook format
 */

import React, { useRef, useEffect } from 'react';
import {
  PacketHeader,
  TipBox,
  ConceptBox,
  ComparisonTable,
  RuleBox
} from './PacketComponents';
import { QuickCheck, IdentifyError, TrueFalse, ApplyTheRule } from './InlinePractice';
import ExampleCard from '../ExampleCard';
import { useTermTooltips } from '../../hooks/useTermTooltips';

const PacketLesson_1_1 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'sentence-structure');

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
      {/* PAGE 1 - Introduction & Clauses */}
      <PacketHeader
        chapterNum="1.1"
        title="Building Complete Sentences"
        readingTime="15 min"
        verified={true}
      />

      {/* Opening Context */}
      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '3rem'
      }}>
        Sentence structure questions make up 15-20% of the ACT English Test—that's 11-15 questions per test!
        To master these questions, you must understand how to identify and properly combine clauses, fix fragments, and avoid comma splices.
      </div>

      {/* Section 1: Understanding Clauses */}
      <h2 style={{
        fontSize: '20px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '2rem'
      }}>
        1. Clauses, Phrases, and Fragments
      </h2>

      <p style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        To succeed on the ACT English, you need to understand the three building blocks of sentences.
        Let's start by learning how to identify each type.
      </p>

      {/* Independent Clauses */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Independent Clauses
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        The first building block is the <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>independent clause</strong>. An independent clause can stand as a sentence by itself
        because it has both a subject and a verb, and it expresses a complete thought.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        How to identify: Read the clause out loud. If you can stop talking at the end and it feels complete, it's an independent clause.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Here are some examples of independent clauses:
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          The dog chased its tail.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          He picked it up.
        </div>
      </div>

      {/* Dependent Clauses */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Dependent Clauses
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        Unlike independent clauses, a <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>dependent clause</strong> cannot stand alone as a complete sentence.
        Dependent clauses are most often created by adding a <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>subordinating conjunction</strong> to the front of an independent clause.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        How to identify: Read the clause out loud. If you feel like you need to keep talking after reading it—like something is missing—it's a dependent clause.
      </div>

      <ConceptBox
        title="Common Subordinating Conjunctions"
        columns={3}
        items={[
          'after',
          'although',
          'as',
          'because',
          'before',
          'even though',
          'if',
          'in order to',
          'once',
          'since',
          'that',
          'though',
          'unless',
          'until',
          'when',
          'whenever',
          'where',
          'whether',
          'while',
          'whatever'
        ]}
      />

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem',
        marginTop: '1.5rem'
      }}>
        Here are some examples of dependent clauses. Notice how each one begins with a subordinating conjunction and leaves you waiting for more information:
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          While the dog chased its tail...
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Because he picked it up...
        </div>
      </div>

      {/* PAGE 2 - Phrases & Fragments + Comparison */}

      {/* Phrases */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Phrases
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        The third building block is a <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>phrase</strong>. Unlike clauses, a phrase lacks a subject or verb (or both).
        Phrases cannot express a complete thought and can never stand alone as sentences.
        Instead, they provide additional descriptive information within a sentence.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Here are some examples of phrases:
      </div>

      <div style={{
        marginLeft: '3rem',
        marginBottom: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Chasing its tail...
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Excited to open up his present...
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        Let's compare all three building blocks side by side to see the key differences:
      </div>

      {/* Comparison Table */}
      <ComparisonTable
        columns={[
          {
            header: 'Independent Clause',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>The dog chased its tail.</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✓ Can stand alone</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✓ Has subject + verb</div>
              </div>
            )
          },
          {
            header: 'Dependent Clause',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>While the dog chased its tail...</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✗ Cannot stand alone</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✓ Has subject + verb</div>
              </div>
            )
          },
          {
            header: 'Phrase',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Chasing its tail...</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✗ Cannot stand alone</div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280' }}>✗ Missing subject</div>
              </div>
            )
          }
        ]}
      />

      {/* Sentence Fragments */}
      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Sentence Fragments
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        Now that you understand the difference between clauses and phrases, let's look at a common error on the ACT:
        the <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>sentence fragment</strong>. A sentence fragment occurs when a phrase or dependent clause is incorrectly
        punctuated as if it were a complete sentence. Fragments are missing a subject or verb (or both) and cannot stand alone.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Here's an example of how to fix a sentence fragment:
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The student running to get to class on time.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: The student running to get to class on time <strong>dropped her water bottle</strong>.
        </div>
      </div>

      {/* PAGE 3 - Five Types of Compound Sentences */}
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
        2. Five Types of Compound Sentences
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        Now that you can identify independent clauses, dependent clauses, and phrases, you need to learn how to combine them correctly.
        On the ACT, there are <strong>exactly 5 ways</strong> to combine multiple clauses to form grammatically correct sentences.
        These five patterns appear repeatedly on every ACT English test. Memorize all 5—answer choices that "sound good"
        but break these rules are always wrong.
      </div>

      <RuleBox
        number="1"
        title="Two separate independent clauses with periods."
        example={
          <div>
            <span style={{ textDecoration: 'underline' }}>Mary loves dogs</span>. <span style={{ textDecoration: 'underline' }}>Andrew loves cats</span>.
          </div>
        }
        exampleLabels={['Independent', 'Independent']}
      />

      <RuleBox
        number="2"
        title="Comma + FANBOYS joining 2 independent clauses."
        example={
          <div>
            <span style={{ textDecoration: 'underline' }}>Mary loves dogs</span>, and <span style={{ textDecoration: 'underline' }}>Andrew loves cats</span>.
          </div>
        }
        exampleLabels={['Independent', 'Independent']}
      />

      <TipBox title="TIP - FANBOYS">
        Memorize these 7 special words!
        <div style={{ marginTop: '0.75rem', lineHeight: '1.9' }}>
          <strong>F</strong> or<br/>
          <strong>A</strong> nd<br/>
          <strong>N</strong> or<br/>
          <strong>B</strong> ut<br/>
          <strong>O</strong> r<br/>
          <strong>Y</strong> et<br/>
          <strong>S</strong> o
        </div>
      </TipBox>

      <RuleBox
        number="3"
        title="Semicolon between 2 independent clauses."
        example={
          <div>
            <span style={{ textDecoration: 'underline' }}>Mary loves dogs</span>; <span style={{ textDecoration: 'underline' }}>Andrew loves cats</span>.
          </div>
        }
        exampleLabels={['Independent', 'Independent']}
      />

      <div style={{
        fontSize: '14px',
        color: '#374151',
        marginLeft: '3.5rem',
        marginTop: '0.5rem',
        marginBottom: '1.5rem',
        fontStyle: 'italic'
      }}>
        * A semicolon is the same as a period on the ACT.
      </div>

      <RuleBox
        number="4"
        title="Dependent clause followed by independent clause (comma)."
        example={
          <div>
            <span style={{ textDecoration: 'underline' }}>While Mary loves dogs</span>, <span style={{ textDecoration: 'underline' }}>Andrew loves cats</span>.
          </div>
        }
        exampleLabels={['Dependent', 'Independent']}
      />

      <RuleBox
        number="5"
        title="Independent clause straight into dependent clause (no comma)."
        example={
          <div>
            <span style={{ textDecoration: 'underline' }}>Mary loves dogs</span> while <span style={{ textDecoration: 'underline' }}>Andrew loves cats</span>.
          </div>
        }
        exampleLabels={['Independent', 'Dependent']}
      />

      <TipBox title="TIP">
        When the dependent clause comes <strong>before</strong> the independent clause, use a comma.
        When the independent clause comes <strong>before</strong> the dependent clause, do NOT use a comma.
      </TipBox>

      <QuickCheck
        question="Which of the following sentences is correctly punctuated?"
        choices={[
          "The movie was excellent, I would recommend it to anyone.",
          "The movie was excellent; I would recommend it to anyone.",
          "The movie was excellent I would recommend it to anyone.",
          "The movie was excellent, and I would recommend it to anyone."
        ]}
        correctAnswer={3}
        explanation="This sentence joins two independent clauses using comma + FANBOYS (Rule #2). Answer A is a comma splice (incorrect). Answer B uses a semicolon (correct but not the only option). Answer C has no punctuation (run-on). Answer D uses comma + 'and' which follows Rule #2 perfectly."
      />

      {/* PAGE 4 - Comma Splices */}
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
        3. Comma Splices
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem',
        marginLeft: '1rem'
      }}>
        Now that you know the 5 correct ways to combine clauses, let's look at the most common <strong>incorrect</strong> way:
        the <strong style={{ color: '#2563eb', fontWeight: '600', textDecoration: 'underline' }}>comma splice</strong>. A comma splice occurs when two independent clauses are joined with only a comma.
        This violates the five rules above and is ALWAYS incorrect on the ACT. This is the most common sentence structure
        error students make.
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem',
        marginLeft: '1rem'
      }}>
        Here are two examples of comma splices. Notice how each sentence incorrectly joins two independent clauses with only a comma:
      </div>

      {/* Example of comma splice */}
      <div style={{
        marginBottom: '1.5rem',
        marginLeft: '2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          Incorrect: It is believed that bulls are enraged by the color red, they are actually colorblind.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: I cannot believe you did not get the flowers, I left them at your front door.
        </div>
      </div>

      <div style={{
        fontSize: '15px',
        color: '#374151',
        marginLeft: '1rem',
        marginTop: '1.5rem',
        marginBottom: '1rem'
      }}>
        To fix a comma splice, apply any of the 5 correct sentence patterns you learned. Below, we've corrected the first
        sentence using all 5 methods to show you the different options:
      </div>


      <div style={{
        marginTop: '1.25rem',
        marginLeft: '2.5rem'
      }}>
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '15px', color: '#1f2937' }}>
            Rule #1: It is believed that bulls are enraged by the color red. They are actually colorblind.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '15px', color: '#1f2937' }}>
            Rule #2: It is believed that bulls are enraged by the color red, but they are actually colorblind.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '15px', color: '#1f2937' }}>
            Rule #3: It is believed that bulls are enraged by the color red; they are actually colorblind.
          </div>
        </div>

        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '15px', color: '#1f2937' }}>
            Rule #4: While it is believed that bulls are enraged by the color red, they are actually colorblind.
          </div>
        </div>

        <div>
          <div style={{ fontSize: '15px', color: '#1f2937' }}>
            Rule #5: It is believed that bulls are enraged by the color red though they are actually colorblind.
          </div>
        </div>
      </div>

      <IdentifyError
        sentence="The students studied hard for the exam, they all passed with flying colors, it was a proud moment for the teacher."
        parts={[
          "The students studied hard for the exam,",
          "they all passed with flying colors,",
          "it was a proud moment for the teacher."
        ]}
        correctPart={1}
        explanation="This is a comma splice. The sentence incorrectly uses commas to join three independent clauses. To fix it, you could use: (1) periods between clauses, (2) semicolons, or (3) comma + FANBOYS. For example: 'The students studied hard for the exam, and they all passed with flying colors. It was a proud moment for the teacher.'"
      />

      {/* PAGE 5 - Solving Sentence Structure Questions */}
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
        4. Spotting and Solving Sentence Structure Questions
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '2rem',
        marginLeft: '1rem'
      }}>
        You now understand the building blocks of sentences and the rules for combining them. The final step is learning
        how to apply this knowledge on the actual ACT. Let's look at how to identify sentence structure questions and
        solve them systematically.
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2rem',
        marginBottom: '0.75rem'
      }}>
        How to Identify These Questions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginLeft: '1rem',
        marginBottom: '1.5rem'
      }}>
        Sentence structure questions have specific patterns in their answer choices:
      </div>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginLeft: '1rem'
      }}>
        <ul style={{ paddingLeft: '2rem' }}>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Punctuation variations in answer choices</strong> - Periods, semicolons, commas, and FANBOYS appear in different positions
          </li>
          <li style={{ marginBottom: '0.75rem' }}>
            <strong>Subject or verb forms vary between choices</strong> - One choice says "drove" while another says "driving," or some choices have subjects/verbs while others don't
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
        Three-Step Approach
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginLeft: '1rem',
        marginBottom: '1.5rem'
      }}>
        Once you've identified a sentence structure question, follow these three steps to solve it:
      </div>

      <div style={{
        marginLeft: '2rem'
      }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            1. Find where the sentence is being "split"
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem' }}>
            Look for the punctuation point in the underlined portion
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            2. Look left and right of the split point
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem' }}>
            Identify whether each side is independent, dependent, or a phrase. Read each side separately to test if it can stand alone.
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontWeight: '700', fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
            3. Apply the sentence structure rules
          </div>
          <div style={{ fontSize: '15px', color: '#374151', marginLeft: '1.5rem' }}>
            Use the 5 compound sentence types to determine the correct answer. Eliminate choices that break the rules.
          </div>
        </div>
      </div>

      <ApplyTheRule
        title="Three-Step Approach Practice"
        question="Identify the clause types: 'Although the concert was sold out we managed to get tickets.'"
        options={[
          "Both clauses are independent (missing comma)",
          "Dependent clause → Independent clause (missing comma after 'out')",
          "Independent clause → Dependent clause (comma not needed)",
          "This is a sentence fragment"
        ]}
        correctAnswer={1}
        explanation="'Although the concert was sold out' is a dependent clause (starts with 'although'), and 'we managed to get tickets' is an independent clause. When a dependent clause comes before an independent clause, you need a comma between them (Rule #4). The correct punctuation is: 'Although the concert was sold out, we managed to get tickets.'"
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
            <span>Independent clauses can stand alone as complete sentences, while dependent clauses (starting with subordinating conjunctions) cannot.</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>There are exactly 5 ways to combine clauses correctly: period, comma + FANBOYS, semicolon, dependent → independent (comma), and independent → dependent (no comma).</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>A comma by itself CANNOT join two independent clauses—this creates a comma splice, which is always incorrect.</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '0.75rem',
            fontSize: '15px',
            lineHeight: '1.7',
            color: '#166534'
          }}>
            <span style={{ fontSize: '18px', marginTop: '2px' }}>✓</span>
            <span>To solve sentence structure questions: find the split point, identify clause types on each side, and apply the 5 compound sentence rules.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_1;
