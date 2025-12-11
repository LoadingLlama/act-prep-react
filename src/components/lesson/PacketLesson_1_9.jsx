/**
 * Packet Lesson 1.9 - Complete Grammar Review
 * Custom packet-style layout with creative teaching components
 */

import React, { useRef } from 'react';
import { PacketHeader, TipBox, ConceptBox, ComparisonTable, RuleBox } from './PacketComponents';
import { QuickCheck, TrueFalse, ApplyTheRule } from './InlinePractice';
import { useTermTooltips } from '../../hooks/useTermTooltips';
import Term from './Term';

const PacketLesson_1_9 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'grammar-review');

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
        chapterNum="1.9"
        title="Complete Grammar Review"
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
        This <Term>comprehensive grammar review</Term> synthesizes all the major concepts tested on the <Term>ACT English Test</Term>. Now that you've studied individual topics, it's essential to develop <Term>integrated strategies</Term>, <Term>error recognition patterns</Term>, and <Term>efficient test-taking approaches</Term>. <strong>The ACT doesn't announce which grammar rule each question tests</strong>—you must quickly identify error types and apply the appropriate fix. This lesson provides a systematic framework for approaching any grammar question with confidence and speed.
      </div>

      <ConceptBox
        title="ACT English by the Numbers"
        items={[
          '75 total questions',
          '45 minutes total',
          '36 seconds per question'
        ]}
      />

      {/* Section 1: The Big 7 */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        1. The "Big 7" Hit List: Where Points Hide
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When you see an underlined portion, don't panic! 70-80% of all grammar questions fall into just seven categories. <strong>Master these, and you're mastering the test.</strong>
      </p>

      <ConceptBox
        title="The Big 7 Grammar Categories (70-80% of Questions!)"
        items={[
          '1. Punctuation (15-18 questions): Commas, semicolons, colons, dashes, apostrophes',
          '2. Sentence Structure (15-18 questions): Fragments, run-ons, comma splices, subordination',
          '3. Verbs (8-10 questions): Agreement, tense, form, voice',
          '4. Pronouns (5-7 questions): Agreement, case, clarity, reference',
          '5. Modifiers (4-6 questions): Misplaced, dangling, squinting modifiers',
          '6. Parallel Structure (3-5 questions): Lists, conjunctions, comparisons',
          '7. Word Choice & Idioms (3-5 questions): Commonly confused words, prepositional idioms'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        The Lightning-Fast Diagnostic Checklist
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When you see an underlined portion, ask yourself these questions <em>in order</em> (takes about 5 seconds total!):
      </p>

      <ConceptBox
        title="The 6-Question Speed Check"
        items={[
          '→ Is there PUNCTUATION? Check comma rules, semicolon/colon usage',
          '→ Is there a VERB? Check subject-verb agreement, tense, form',
          '→ Is there a PRONOUN? Check agreement, case, clear antecedent',
          '→ Does the sentence begin with a PHRASE? Check for dangling modifiers',
          '→ Is there a LIST or CONJUNCTION? Check parallel structure',
          '→ Can the sentence STAND ALONE? Check for fragments/run-ons'
        ]}
      />

      <TipBox type="important">
        <strong>Pro Tip:</strong> Most underlined portions have errors in the FIRST TWO categories (punctuation or verbs). Start there!
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Watch Out: Common Error Combinations
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        The ACT loves to test <strong>multiple concepts in one question.</strong> These "combo" questions are tricky but predictable:
      </p>

      <ConceptBox
        title="Common Error Combinations"
        items={[
          'Combo #1: Comma + Verb Agreement (prepositional phrase between subject and verb, plus comma placement)',
          'Combo #2: Modifier + Pronoun (dangling modifier where the pronoun reference is also ambiguous)',
          'Combo #3: Parallel + Verb Tense (list items with inconsistent verb forms)'
        ]}
      />

      <QuickCheck
        question="Which category does this error fall into? 'The students, along with their teacher, was excited for the field trip.'"
        choices={[
          "Punctuation error",
          "Verb agreement error",
          "Pronoun error",
          "Modifier error"
        ]}
        correctAnswer={1}
        explanation="This is a verb agreement error. The subject is 'students' (plural), but the verb 'was' is singular. The phrase 'along with their teacher' is a prepositional phrase that doesn't affect subject-verb agreement. The correct verb should be 'were.'"
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

      {/* Section 2: Systematic Error Recognition */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        2. Your 4-Step Attack Plan for Every Question
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Don't wing it! Having a <strong>consistent approach to every grammar question prevents errors and saves time under pressure.</strong> Follow these four steps religiously:
      </p>

      <ConceptBox
        title="Step 1: Read the COMPLETE Sentence (Context Is King!)"
        items={[
          'Why this matters: Most errors depend on parts of the sentence that AREN\'T underlined',
          'Subject-verb agreement → subject often not underlined',
          'Verb tense → need to check surrounding verbs',
          'Pronoun clarity → antecedent is outside underlined portion',
          'Never jump straight to the underlined portion without reading the full sentence'
        ]}
      />

      <RuleBox
        number="2"
        title="Trust Your Ear, BUT Verify with Rules"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              The Two-Part System: Ear + Rules = Accuracy
            </div>
            <div style={{ marginBottom: '0.75rem', padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
              If it sounds WRONG:<br />
              → Good! Identify which specific rule is violated<br />
              → Apply the fix and move on
            </div>
            <div style={{ padding: '0.75rem', backgroundColor: '#f8fafc', borderRadius: '4px' }}>
              If it sounds RIGHT:<br />
              → Don't assume it's correct! Some errors sound fine<br />
              → Still check the Big 7 categories systematically<br />
              → Example: "Everyone brought their book" (sounds ok, but wrong!)
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="3"
        title="Eliminate Obviously Wrong Answers First"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', color: '#1f2937' }}>
              Process of elimination is your secret weapon! Cross out choices that:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7' }}>
              ✗ Create a fragment or run-on<br />
              ✗ Use wrong verb tense for the context<br />
              ✗ Create pronoun agreement error<br />
              ✗ Break parallel structure in a list<br />
              ✗ Make it significantly more wordy without adding clarity
            </div>
            <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#f0fdf4', borderRadius: '4px' }}>
              Result: Often you can eliminate 2-3 answers immediately, leaving you to choose between just 1-2 options!
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="4"
        title="Look for Visual Cues in the Answer Choices"
        example={
          <div style={{ fontSize: '14px' }}>
            <div style={{ marginBottom: '1rem', fontWeight: '600', color: '#1f2937' }}>
              The answer choices TELL you what's being tested! Look for patterns:
            </div>
            <div style={{ fontSize: '13px', lineHeight: '1.7', marginLeft: '0.5rem' }}>
              <div style={{ marginBottom: '0.5rem' }}>
                Different punctuation marks? → Punctuation question
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                Different verb forms? → Verb agreement or tense
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                Different pronouns? → Pronoun agreement or case
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                Sentence restructured? → Modifier placement or structure
              </div>
              <div>
                Different word order in list? → Parallel structure
              </div>
            </div>
          </div>
        }
        exampleLabels={[]}
      />

      <TipBox type="tip">
        <strong>Master Strategy:</strong> After you identify what's being tested (Step 4), you know EXACTLY which rule to apply. This makes the question way easier!
      </TipBox>

      <TrueFalse
        statements={[
          { text: "You should read only the underlined portion to save time.", correct: false },
          { text: "If something sounds right, you should still check grammar rules.", correct: true },
          { text: "The answer choices can give you clues about what's being tested.", correct: true },
          { text: "Process of elimination is less effective than finding the right answer immediately.", correct: false }
        ]}
        explanation="Always read the complete sentence for context. Even if something sounds right, verify with rules (some errors sound natural in casual speech). The answer choices reveal what's being tested. Process of elimination is extremely effective—often you can eliminate 2-3 answers right away!"
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

      {/* Section 3: Time Management */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        3. The 9-Minute Magic: Beating the Clock
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        You have 45 minutes for 75 questions across 5 passages. That's 36 seconds per question, or 9 minutes per passage. <strong>Time management isn't optional—it's critical for finishing strong!</strong>
      </p>

      {/* Time Breakdown */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}>
        <h3 style={{
          fontSize: '17px',
          fontWeight: '700',
          marginBottom: '1.5rem',
          color: '#1f2937'
        }}>
          The 9-Minute Per Passage Breakdown
        </h3>

        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '4px' }}>
            Minutes 0-2: Read the passage naturally, answering inline grammar questions as you go
          </div>
          <div style={{ marginBottom: '1rem', padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '4px' }}>
            Minutes 2-7: Work through remaining grammar and style questions systematically
          </div>
          <div style={{ padding: '0.75rem', backgroundColor: '#ffffff', borderRadius: '4px' }}>
            Minutes 7-9: Handle rhetorical skills questions (organization, purpose, style)
          </div>
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Quick vs. Slow Questions: Know the Difference!
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Not all questions take equal time. Recognize which should be fast (15-20 seconds) and which require more thought (45-60 seconds):
      </p>

      <ComparisonTable
        columns={[
          {
            header: 'Quick Questions (15-20 sec)',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#166534', fontSize: '15px' }}>
                  Speed through these!
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ Obvious verb agreement errors
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ Clear punctuation rules
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    ✓ Obvious fragments or run-ons
                  </div>
                  <div>
                    ✓ Word choice errors (their/there)
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  These are "gimme" points. Answer fast and move on!
                </div>
              </div>
            )
          },
          {
            header: 'Slower Questions (45-60 sec)',
            content: (
              <div>
                <div style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
                  Take your time on these
                </div>
                <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
                  <div style={{ marginBottom: '0.5rem' }}>
                    → Rhetorical skills (transitions)
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    → Complex modifier questions
                  </div>
                  <div style={{ marginBottom: '0.5rem' }}>
                    → Pronoun clarity issues
                  </div>
                  <div>
                    → Organization questions
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '12px', color: '#6b7280', fontStyle: 'italic' }}>
                  These require careful reading and analysis. Worth the extra time!
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
        When to Skip and Return
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        If you're stuck after 45 seconds, mark your best guess, circle the question number, and move on. Return to it if you have time at the end.
      </p>

      <TipBox type="warning">
        <strong>CRITICAL STRATEGY:</strong> Never leave questions blank! Even if you're unsure, eliminate obviously wrong answers and make an educated guess. There's NO guessing penalty on the ACT—wrong answers don't hurt you!
      </TipBox>

      <ConceptBox
        title="Pacing Checkpoints: Are You On Track?"
        items={[
          '15 minutes → Should be finishing Passage 2 (question 30)',
          '30 minutes → Should be finishing Passage 4 (question 60)',
          '40 minutes → Should be on Passage 5 with 5 minutes to finish',
          'If you\'re behind: Speed up on "quick" questions, skip harder ones and return later'
        ]}
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

      {/* Section 4: Test Day Strategies */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        marginTop: '4rem',
        marginBottom: '1rem',
        color: '#1f2937'
      }}>
        4. Test Day Hacks: Small Tricks, Big Points
      </h2>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Beyond knowing grammar rules, test day success requires <strong>strategic thinking.</strong> These final hacks help you navigate the test efficiently and avoid common traps that cost students points!
      </p>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #1: "NO CHANGE" Is Your Friend
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Many students avoid "NO CHANGE" thinking it's a trap. Wrong! <strong>About 20-25% of questions have "NO CHANGE" as the correct answer. Don't fear it!</strong>
      </p>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        backgroundColor: '#f0fdf4',
        borderRadius: '8px',
        border: '2px solid #16a34a'
      }}>
        <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
          Choose NO CHANGE when:
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.7' }}>
          ✓ You've checked all grammar rules and found no violations<br />
          ✓ Other answer choices create new errors<br />
          ✓ Other choices are unnecessarily wordy<br />
          ✓ The original is clear, concise, and correct
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #2: Shorter Is Usually Better
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        When choosing between grammatically correct options, the ACT typically favors <strong>conciseness.</strong> If two answers are both correct, choose the shorter one.
      </p>

      {/* Visual Example */}
      <div style={{
        marginLeft: '2rem',
        marginTop: '1.5rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          ✗ Wordy: "due to the fact that"
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '1rem' }}>
          ✓ Concise: "because"
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          ✗ Wordy: "in spite of the fact that"
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '1rem' }}>
          ✓ Concise: "although"
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.5rem' }}>
          ✗ Wordy: "at this point in time"
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          ✓ Concise: "now"
        </div>
      </div>

      <TipBox type="warning">
        <strong>HOWEVER:</strong> Never sacrifice clarity or correctness for brevity! If the shorter version creates an error or changes meaning, choose the longer correct option.
      </TipBox>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #3: Avoid Extreme Language in Rhetorical Questions
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        On rhetorical questions (adding/deleting, main ideas), be wary of answer choices with extreme words like "always," "never," "only," "completely," "absolutely."
      </p>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.25rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '14px', lineHeight: '1.7' }}>
          <strong style={{ color: '#1f2937' }}>Why?</strong> The ACT favors balanced, moderate language. Extreme claims are rarely supported by the passage!
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #4: Read Answer Choices Like a Hawk
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        The ACT loves to include answer choices that look almost identical but differ in one tiny detail. <strong>Read every word of each choice!</strong>
      </p>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        backgroundColor: '#fef2f2',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}>
        <h4 style={{ fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontSize: '15px' }}>
          Common Trap Alert!
        </h4>
        <div style={{ fontSize: '14px', lineHeight: '1.7' }}>
          Three choices might be identical except:<br />
          • One uses "affects" and another uses "effects"<br />
          • One uses "their" and another uses "there"<br />
          • One uses "its" and another uses "it's"<br /><br />
          <strong>Missing this ONE LETTER costs you the point!</strong>
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #5: Grammar Doesn't Always "Sound" Wrong
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Some grammatically incorrect constructions sound natural in casual speech. <strong>Trust the rules over your ear in these cases:</strong>
      </p>

      <div style={{
        marginTop: '1.5rem',
        padding: '1.5rem',
        backgroundColor: '#f8fafc',
        borderRadius: '8px',
        border: '2px solid #e2e8f0'
      }}>
        <div style={{ fontSize: '14px', lineHeight: '1.8' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            ✗ "Everyone brought their book" (sounds fine, but grammatically wrong!)
            <div style={{ marginLeft: '1.5rem', fontSize: '13px', color: '#6b7280' }}>
              → "Everyone" is singular, needs "his or her"
            </div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            ✗ "Between you and I" (sounds formal, but wrong!)
            <div style={{ marginLeft: '1.5rem', fontSize: '13px', color: '#6b7280' }}>
              → Object of preposition needs "me"
            </div>
          </div>
          <div>
            ✗ "The team are winning" (sounds right to some, but wrong!)
            <div style={{ marginLeft: '1.5rem', fontSize: '13px', color: '#6b7280' }}>
              → "Team" is singular collective noun, needs "is"
            </div>
          </div>
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        marginTop: '2.5rem',
        marginBottom: '0.75rem',
        color: '#1f2937'
      }}>
        Hack #6: Final Mental Checklist Before Moving On
      </h3>

      <p style={{ margin: '1rem 0', lineHeight: '1.7' }}>
        Before clicking "next," take 2 seconds to verify:
      </p>

      <ConceptBox
        title="The Pre-Flight Check"
        items={[
          '✓ Your answer creates no new errors',
          '✓ The sentence is complete and logical',
          '✓ All subjects have verbs and all verbs have subjects',
          '✓ Pronouns have clear antecedents',
          '✓ Modifiers are placed next to what they describe'
        ]}
      />

      <ApplyTheRule
        title="Apply Your Test Day Strategies"
        question="You've checked all grammar rules for an underlined portion and found no errors. The three other answer choices either create new errors or make the sentence wordier. What should you do?"
        options={[
          "Choose NO CHANGE (the original is correct)",
          "Pick the shortest answer choice even if it has errors",
          "Choose one of the other answers because NO CHANGE is rarely right",
          "Skip the question and come back later"
        ]}
        correctAnswer={0}
        explanation="Choose NO CHANGE! About 20-25% of questions have NO CHANGE as the correct answer. If you've verified the original has no errors and other choices create problems or add unnecessary words, NO CHANGE is the right choice. Don't avoid it thinking it's a trap!"
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
          <span>The Big 7 categories account for 70-80% of questions: punctuation, sentence structure, verbs, pronouns, modifiers, parallel structure, and word choice</span>
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
          <span>Use the 4-Step Attack Plan: Read complete sentence → Trust ear but verify → Eliminate wrong answers → Look for visual cues</span>
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
          <span>Time management: 9 minutes per passage, quick questions (15-20 sec), slow questions (45-60 sec), check pacing at 15/30/40 min marks</span>
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
          <span>Test day hacks: NO CHANGE is right 20-25% of time, shorter is usually better, avoid extreme language, read choices carefully</span>
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
          <span>Final check: Verify no new errors, sentence is complete, all elements agree, modifiers correctly placed</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_9;
