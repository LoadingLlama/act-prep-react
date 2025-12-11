/**
 * Packet Lesson 1.5 - Pronouns
 * Custom packet-style layout for pronoun rules lesson
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

const PacketLesson_1_5 = () => {
  const contentRef = useRef(null);
  useTermTooltips(contentRef, 'pronouns');

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
        chapterNum="1.5"
        title="Pronouns"
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
        <strong>Pronoun questions make up about 9% of the ACT English Test—roughly 7 questions per test!</strong>{' '}
        You'll need to know how to select the proper <Term>pronoun</Term> based on case ("he" vs. "him" or "who" vs. "whom"), make sure that a pronoun agrees with the word it's replacing, and spot ambiguous pronouns.
      </div>

      {/* Section 1: Pronoun Case */}
      <h2 style={{
        fontSize: '22px',
        fontWeight: '700',
        color: '#1f2937',
        marginTop: '3rem',
        marginBottom: '0.75rem'
      }}>
        1. Pronoun Case: The Subject vs. Object Rule
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Pronouns come in two cases: <Term>subject pronouns</Term> and <Term>object pronouns</Term>.</strong>{' '}
        The pronoun's role in the sentence determines which type is correct. Let's see quick examples:
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: She went to the festival.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The man handed us some flyers.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Her went to the festival.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: The man handed we some flyers.
        </div>
      </div>

      <ConceptBox
        title="Subject vs. Object Pronouns (Memorize These!)"
        columns={2}
        items={[
          'SUBJECT (doing action): I, we, you, he, she, it, they, who',
          'OBJECT (receiving action): me, us, you, him, her, it, them, whom'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        The List Trick: Testing Pronouns in Lists
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>Pronouns in lists are tricky</strong> because we often say them incorrectly in conversation.
        The trick? <strong>Remove the other items in the list and test the pronoun alone.</strong>
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          The policeman asked to speak to my friends and <u>me</u>.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '1.5rem' }}>
          Test: Remove "my friends and" → "The policeman asked to speak to me."
        </div>

        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          His girlfriend and <u>he</u> went to the hockey game.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Test: Remove "His girlfriend and" → "He went to the hockey game."
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        The Prepositional Phrase Rule (Always Object!)
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>Pronouns in <Term>prepositional phrases</Term> are ALWAYS in the object case.</strong>{' '}
        This rule can be hard to hear by ear, so memorize it!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The bet between Joe and me was for five dollars.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: To whom was the award given?
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: A great rivalry exists among Tim, Scott, and him.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Who vs. Whom: The He/Him Replacement Trick
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>The difference between "who" and "whom" is tested on almost every ACT!</strong>{' '}
        Technically, "who" is the subject and "whom" is the object—but here's the trick you need to memorize:
      </div>

      <RuleBox
        number="1"
        title='If you can replace it with "he," "she," or "they" → use WHO'
        example={
          <div>
            "<strong>Who</strong> stole the apple?" → Test: "<strong>He</strong> stole the apple" ✓
          </div>
        }
        exampleLabels={[]}
      />

      <RuleBox
        number="2"
        title='If you can replace it with "him," "her," or "them" → use WHOM'
        example={
          <div>
            "To <strong>whom</strong> should I address this letter?" → Test: "Address it to <strong>him</strong>" ✓
          </div>
        }
        exampleLabels={[]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Tricky example: "Whom do you want to win the Bachelor?"
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Test: "You want him to win" → Use "whom"
        </div>
      </div>

      <TipBox title="QUICK TRICK FOR WHO/WHOM">
        Look at the word that comes RIGHT AFTER "who" or "whom":
        <div style={{ marginTop: '0.75rem' }}>
          • If it's a <strong>verb</strong> → use <strong>WHO</strong><br/>
          • If it's a <strong>noun</strong> → use <strong>WHOM</strong>
        </div>
        <div style={{ marginTop: '0.75rem', fontStyle: 'italic', color: '#6b7280' }}>
          Example: "The child <u>who</u> was running..." (verb after = "was")<br/>
          Example: "The child <u>whom</u> I invited..." (noun after = "I")
        </div>
      </TipBox>

      <ComparisonTable
        columns={[
          {
            header: 'Using WHO (subject)',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "The child who was running down the street was noisy."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ Test: "He was running" → WHO
                </div>
              </div>
            )
          },
          {
            header: 'Using WHOM (object)',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "The child whom I invited to the party was noisy."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ Test: "I invited him" → WHOM
                </div>
              </div>
            )
          }
        ]}
      />

      <IdentifyError
        sentence="My sister and me went to the store, where the manager, whom had recently been promoted, greeted us warmly."
        parts={[
          "My sister and me went to the store,",
          "where the manager, whom had recently been promoted,",
          "greeted us warmly."
        ]}
        correctPart={0}
        explanation="There are actually TWO errors here! 'My sister and me' should be 'My sister and I' (test: 'I went to the store'). Also, 'whom had recently been promoted' should be 'who had recently been promoted' (word after 'who/whom' is a verb 'had,' so use 'who'). The question highlights part 1."
      />

      {/* Section 2: Possessive Pronouns */}
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
        2. Possessive Pronouns: Ownership Rules
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong><Term>Possessive pronouns</Term> show ownership and must match the word they're replacing.</strong>{' '}
        They come in two forms: possessive nouns (stand alone) and possessive adjectives (come before a noun).
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: That book is mine.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: That is my book.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Incorrect: That is mine book.
        </div>
      </div>

      <ConceptBox
        title="Possessive Nouns vs. Possessive Adjectives"
        columns={2}
        items={[
          'POSSESSIVE NOUNS (stand alone): mine, ours, yours, his, hers, its, theirs',
          'POSSESSIVE ADJECTIVES (before noun): my, our, your, his, her, its, their'
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Matching Possessive Pronouns to the Antecedent
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>Possessive pronouns must match the <Term>antecedent</Term> (the word they're replacing) in number.</strong>{' '}
        Watch out for group nouns—remember from Lesson 1.4 that they're singular!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: The entire team went on stage to pick up <strong>their</strong> trophy.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: The entire team went on stage to pick up <strong>its</strong> trophy.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Emmanuel and James came back home after forgetting <strong>their</strong> phones.
        </div>
      </div>

      <QuickCheck
        question="Which sentence uses the correct possessive pronoun?"
        choices={[
          "The jury announced their verdict after three days.",
          "Each student should bring their calculator to class.",
          "The company increased its profits this quarter.",
          "Every player on the team improved their score."
        ]}
        correctAnswer={2}
        explanation="'The company increased its profits' is correct. 'Company' is a group noun (singular), so it needs the singular 'its.' Options A and D use plural 'their' with singular group nouns 'jury' and 'player.' Option B uses plural 'their' with singular 'each student.'"
      />

      {/* Section 3: Pronoun Agreement */}
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
        3. Pronoun Agreement: Pronouns Must Match
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>Pronouns must agree with their antecedent in both number (singular/plural) and gender (male/female).</strong>{' '}
        Whenever you see a pronoun on the ACT, find exactly who or what it's referring to—the antecedent can be anywhere!
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Each attendee at the party raised <strong>his or her</strong> drink for a toast.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Each attendee at the party raised <strong>their</strong> drink for a toast.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: The guests at the party raised <strong>their</strong> drinks for a toast.
        </div>
      </div>

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Watch Out for Singular Words That Seem Plural
      </h3>

      <ConceptBox
        title="Common Singular Words That Trick You"
        columns={3}
        items={[
          'each person',
          'every student',
          'anyone',
          'everyone',
          'someone',
          'no one',
          'each member',
          'every player',
          'a person',
          'any student',
          'either option',
          'neither choice'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Correct: Each member of the women's track team improved <strong>her</strong> time.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: A person who is committed to <strong>his or her</strong> dreams can achieve them.
        </div>
      </div>

      <TipBox title="CONSISTENCY IN PRONOUN STYLE">
        Keep the same pronoun style throughout a passage:
        <div style={{ marginTop: '0.75rem', fontStyle: 'italic', color: '#374151' }}>
          ✓ "If <strong>you</strong> plan to give a presentation, <strong>you</strong> should check <strong>your</strong> facts first."<br/>
          (Consistent: you...you...your)
        </div>
        <div style={{ marginTop: '0.5rem', fontStyle: 'italic', color: '#374151' }}>
          ✗ "If <strong>you</strong> plan to give a presentation, <strong>one</strong> should check <strong>one's</strong> facts first."<br/>
          (Inconsistent: switches from "you" to "one")
        </div>
      </TipBox>

      <TrueFalse
        statements={[
          { text: "Words like 'each,' 'every,' and 'anyone' are singular and require singular pronouns.", correct: true },
          { text: "Group nouns like 'team' and 'committee' can use either singular or plural pronouns.", correct: false },
          { text: "In prepositional phrases, pronouns are always in the object case.", correct: true },
          { text: "It's okay to switch between 'you' and 'one' in the same passage as long as both are used correctly.", correct: false }
        ]}
        explanation="Statement 1 is TRUE—these words are always singular. Statement 2 is FALSE—group nouns are ALWAYS singular and need singular pronouns. Statement 3 is TRUE—that's the prepositional phrase rule! Statement 4 is FALSE—you must maintain consistency in pronoun style throughout a passage."
      />

      {/* Section 4: Ambiguous Pronouns */}
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
        4. Ambiguous Pronouns: The Clarity Test
      </h2>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1.5rem'
      }}>
        <strong>For a pronoun to be correct, we must know EXACTLY who or what it's referring to.</strong>{' '}
        If we don't know exactly what a pronoun refers to, the pronoun is <Term>ambiguous</Term> and is <strong>always incorrect</strong>.
      </div>

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Incorrect: Stephen smiled at his father as <strong>he</strong> threw the ball.
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          Correct: Stephen smiled at his father as <strong>his father</strong> threw the ball.
        </div>
      </div>

      <ComparisonTable
        columns={[
          {
            header: 'Ambiguous (Wrong)',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Even though the order had not yet shown up, the librarian insisted that she had ordered some."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✗ What does "some" refer to? We have no idea!
                </div>
              </div>
            )
          },
          {
            header: 'Clear (Correct)',
            content: (
              <div>
                <div style={{ fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>
                  "Even though the order had not yet shown up, the librarian insisted that she had ordered four copies of the new book."
                </div>
                <div style={{ fontSize: '0.8125rem', color: '#6b7280', marginTop: '0.5rem' }}>
                  ✓ Now it's perfectly clear what she ordered!
                </div>
              </div>
            )
          }
        ]}
      />

      <h3 style={{
        fontSize: '17px',
        fontWeight: '600',
        color: '#1f2937',
        marginTop: '2.5rem',
        marginBottom: '1rem'
      }}>
        Spotting Ambiguous Pronoun Questions
      </h3>

      <div style={{
        fontSize: '15px',
        lineHeight: '1.7',
        color: '#374151',
        marginBottom: '1rem'
      }}>
        <strong>Anytime you see a pronoun in the answer choices, check if it's ambiguous.</strong>{' '}
        Look for answer choices that replace the pronoun with a specific noun.
      </div>

      <ConceptBox
        title="Pronouns to Watch For (Common Ambiguous Culprits)"
        columns={4}
        items={[
          'he, him, his',
          'she, her, hers',
          'they, them, their',
          'it, its',
          'this, that',
          'these, those',
          'some, none',
          'one, ones'
        ]}
      />

      <div style={{
        margin: '1.5rem 0 2rem 2rem'
      }}>
        <div style={{ fontSize: '15px', color: '#1f2937', marginBottom: '0.75rem' }}>
          Example: "Biggie and Tupac were both incredible rappers, but <u>he is</u> the most famous."
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937', marginLeft: '1rem', marginBottom: '0.5rem' }}>
          A. NO CHANGE (he is)<br />
          B. Tupac is<br />
          C. Biggie is<br />
          D. one is
        </div>
        <div style={{ fontSize: '15px', color: '#1f2937' }}>
          The answer must be B or C because "he" is ambiguous.
        </div>
      </div>

      <ApplyTheRule
        title="Identify the Error Type"
        question='What error does this sentence contain? "When Sarah met Jennifer at the coffee shop, she was already late for her meeting."'
        options={[
          "Subject-verb agreement error",
          "Ambiguous pronoun error (we don't know who was late)",
          "Wrong pronoun case (should be 'her' instead of 'she')",
          "No error—the sentence is correct"
        ]}
        correctAnswer={1}
        explanation="This is an ambiguous pronoun error! We don't know if 'she' refers to Sarah or Jennifer. The sentence should specify: 'When Sarah met Jennifer at the coffee shop, Sarah was already late for her meeting' (or 'Jennifer was already late...' depending on the intended meaning)."
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
          <span>Use subject pronouns (I, he, she, who) when doing the action; use object pronouns (me, him, her, whom) when receiving the action. Pronouns in prepositional phrases are ALWAYS object case.</span>
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
          <span>For who/whom questions, use the he/him trick: if you can replace with "he," use "who"; if you can replace with "him," use "whom." Quick shortcut: verb after = who, noun after = whom.</span>
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
          <span>Pronouns must agree with their antecedent in number and gender. Words like "each," "every," and "anyone" are singular. Group nouns (team, jury) are always singular and need singular pronouns like "its."</span>
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
          <span>Ambiguous pronouns are always incorrect. If you can't tell exactly who or what a pronoun refers to, it must be replaced with a specific noun.</span>
        </div>
      </div>
    </div>
  );
};

export default PacketLesson_1_5;
