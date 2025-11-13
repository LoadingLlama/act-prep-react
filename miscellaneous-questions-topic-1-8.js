/**
 * Topic 1.8 - Grammar Essentials & Common Errors
 * 44 ACT-style practice questions covering miscellaneous grammar topics
 *
 * Distribution:
 * - Commonly confused words: 14 questions (1-14)
 * - Active vs. passive voice: 8 questions (15-22)
 * - Prepositional idioms: 10 questions (23-32)
 * - Word choice and diction: 6 questions (33-38)
 * - Redundancy and wordiness: 3 questions (39-41)
 * - Mixed review: 3 questions (42-44)
 */

module.exports = [
  // COMMONLY CONFUSED WORDS (Questions 1-14)
  {
    position: 1,
    title: "Their vs. There vs. They're",
    problem_text: "The students left <u>there</u> backpacks in the classroom after the bell rang.",
    choices: [
      {
        letter: "A",
        text: "there",
        explanation: "Incorrect. 'There' refers to a place or location, not possession. The sentence requires a possessive pronoun."
      },
      {
        letter: "B",
        text: "their",
        explanation: "Correct. 'Their' is the possessive form showing that the backpacks belong to the students."
      },
      {
        letter: "C",
        text: "they're",
        explanation: "Incorrect. 'They're' is a contraction of 'they are,' which does not make sense in this context about possession."
      },
      {
        letter: "D",
        text: "they are",
        explanation: "Incorrect. This creates the phrase 'they are backpacks,' which is grammatically incorrect and changes the meaning."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'their' to show possession, 'there' for location, and 'they're' as a contraction of 'they are.'"
  },
  {
    position: 2,
    title: "Its vs. It's",
    problem_text: "The committee will announce <u>its</u> decision tomorrow morning at the town hall meeting.",
    choices: [
      {
        letter: "A",
        text: "its",
        explanation: "Correct. 'Its' is the possessive form showing that the decision belongs to the committee."
      },
      {
        letter: "B",
        text: "it's",
        explanation: "Incorrect. 'It's' is a contraction of 'it is' or 'it has,' which would create the awkward phrase 'it is decision.'"
      },
      {
        letter: "C",
        text: "its'",
        explanation: "Incorrect. This form does not exist in English. Possessive pronouns like 'its' never use apostrophes."
      },
      {
        letter: "D",
        text: "it is",
        explanation: "Incorrect. This would create 'it is decision,' which is grammatically incorrect."
      }
    ],
    correct_answer: "A",
    answer_explanation: "Use 'its' for possession and 'it's' as a contraction of 'it is' or 'it has.'"
  },
  {
    position: 3,
    title: "Your vs. You're",
    problem_text: "If <u>your</u> planning to attend the conference, please register by Friday.",
    choices: [
      {
        letter: "A",
        text: "your",
        explanation: "Incorrect. 'Your' is possessive, but the sentence needs a subject and verb ('you are') to introduce the conditional clause."
      },
      {
        letter: "B",
        text: "you're",
        explanation: "Correct. 'You're' is a contraction of 'you are,' which fits the meaning: 'If you are planning to attend.'"
      },
      {
        letter: "C",
        text: "you were",
        explanation: "Incorrect. This creates incorrect verb tense. The present continuous 'are planning' is needed, not the past 'were.'"
      },
      {
        letter: "D",
        text: "youre",
        explanation: "Incorrect. This is a misspelling; the contraction requires an apostrophe."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'you're' as a contraction of 'you are' and 'your' to show possession."
  },
  {
    position: 4,
    title: "Affect vs. Effect (Verb Usage)",
    problem_text: "The new policies will <u>affect</u> all employees starting next month.",
    choices: [
      {
        letter: "A",
        text: "affect",
        explanation: "Correct. 'Affect' is the verb meaning to influence or have an impact on something."
      },
      {
        letter: "B",
        text: "effect",
        explanation: "Incorrect. As a verb, 'effect' means to bring about or cause something to happen, which doesn't fit the context of influencing employees."
      },
      {
        letter: "C",
        text: "have an affect on",
        explanation: "Incorrect. 'Affect' as a noun is rare and typically used only in psychology. The phrase should use 'effect' as the noun."
      },
      {
        letter: "D",
        text: "have effected",
        explanation: "Incorrect. 'Effected' means 'brought about' or 'caused to happen,' which changes the intended meaning of the sentence."
      }
    ],
    correct_answer: "A",
    answer_explanation: "Use 'affect' as a verb meaning to influence, and 'effect' as a noun meaning result."
  },
  {
    position: 5,
    title: "Then vs. Than (Comparison)",
    problem_text: "Maria performed better on the exam <u>then</u> she had expected.",
    choices: [
      {
        letter: "A",
        text: "then",
        explanation: "Incorrect. 'Then' refers to time or sequence, not comparison. The sentence is comparing performance to expectation."
      },
      {
        letter: "B",
        text: "than",
        explanation: "Correct. 'Than' is used for comparisons, comparing her actual performance to her expected performance."
      },
      {
        letter: "C",
        text: "rather then",
        explanation: "Incorrect. This also incorrectly uses 'then' instead of 'than,' and 'rather than' would change the meaning."
      },
      {
        letter: "D",
        text: "that",
        explanation: "Incorrect. 'That' does not establish the comparison relationship needed in this sentence."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'than' for comparisons and 'then' to indicate time or sequence."
  },
  {
    position: 6,
    title: "Who's vs. Whose",
    problem_text: "<u>Whose</u> responsibility is it to lock the doors at the end of the day?",
    choices: [
      {
        letter: "A",
        text: "Whose",
        explanation: "Correct. 'Whose' is the possessive form, asking about ownership or responsibility."
      },
      {
        letter: "B",
        text: "Who's",
        explanation: "Incorrect. 'Who's' is a contraction of 'who is,' which would create the awkward phrase 'Who is responsibility.'"
      },
      {
        letter: "C",
        text: "Who is",
        explanation: "Incorrect. While 'Who is responsible' would work, 'Who is responsibility' is grammatically incorrect."
      },
      {
        letter: "D",
        text: "Whom's",
        explanation: "Incorrect. This form does not exist in English. 'Whom' is the object form of 'who' and doesn't take a possessive apostrophe."
      }
    ],
    correct_answer: "A",
    answer_explanation: "Use 'whose' to show possession and 'who's' as a contraction of 'who is' or 'who has.'"
  },
  {
    position: 7,
    title: "To vs. Too vs. Two",
    problem_text: "The assignment was <u>to</u> difficult for most students to complete in one night.",
    choices: [
      {
        letter: "A",
        text: "to",
        explanation: "Incorrect. 'To' is a preposition or infinitive marker, not an adverb meaning 'excessively.'"
      },
      {
        letter: "B",
        text: "too",
        explanation: "Correct. 'Too' means 'excessively' or 'also,' fitting the context of being excessively difficult."
      },
      {
        letter: "C",
        text: "two",
        explanation: "Incorrect. 'Two' is the number 2, which makes no sense in this context."
      },
      {
        letter: "D",
        text: "so",
        explanation: "Incorrect. While 'so' could work in some contexts, it changes the meaning and structure of the sentence."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'too' to mean 'excessively' or 'also,' 'to' as a preposition or infinitive marker, and 'two' for the number."
  },
  {
    position: 8,
    title: "There vs. Their vs. They're (Context)",
    problem_text: "<u>Their</u> is no evidence to support the theory that was proposed yesterday.",
    choices: [
      {
        letter: "A",
        text: "Their",
        explanation: "Incorrect. 'Their' is possessive and requires a noun to possess. The sentence needs an existential 'there.'"
      },
      {
        letter: "B",
        text: "There",
        explanation: "Correct. 'There' is used in existential constructions like 'there is' or 'there are' to indicate existence."
      },
      {
        letter: "C",
        text: "They're",
        explanation: "Incorrect. 'They're' means 'they are,' which would create 'They are is no evidence,' which is ungrammatical."
      },
      {
        letter: "D",
        text: "There's",
        explanation: "Incorrect. While 'There's' (there is) would be grammatically correct, the original uses 'is' separately, making this redundant."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'there' in existential constructions (there is/are) to indicate the existence of something."
  },
  {
    position: 9,
    title: "Effect vs. Affect (Noun Usage)",
    problem_text: "The <u>affect</u> of climate change on coastal communities has been devastating.",
    choices: [
      {
        letter: "A",
        text: "affect",
        explanation: "Incorrect. 'Affect' as a noun is rare and used mainly in psychology. The common noun meaning 'result' is 'effect.'"
      },
      {
        letter: "B",
        text: "effect",
        explanation: "Correct. 'Effect' is the noun meaning result or consequence, which fits this context."
      },
      {
        letter: "C",
        text: "affects",
        explanation: "Incorrect. This is the verb form (third person singular), but the sentence requires a noun after the article 'the.'"
      },
      {
        letter: "D",
        text: "effects",
        explanation: "Incorrect. While 'effects' is a valid plural noun, the singular 'effect' is more appropriate here as it refers to the overall impact as a single phenomenon."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'effect' as a noun meaning result or consequence, and 'affect' as a verb meaning to influence."
  },
  {
    position: 10,
    title: "Then vs. Than (Sequence)",
    problem_text: "First, preheat the oven to 350 degrees, and <u>than</u> prepare the baking sheet.",
    choices: [
      {
        letter: "A",
        text: "than",
        explanation: "Incorrect. 'Than' is used for comparisons, not for indicating sequence or time."
      },
      {
        letter: "B",
        text: "then",
        explanation: "Correct. 'Then' indicates sequence or time, showing what comes next in the instructions."
      },
      {
        letter: "C",
        text: "after",
        explanation: "Incorrect. While 'after' could work, it would require restructuring the sentence and changes the coordinating conjunction."
      },
      {
        letter: "D",
        text: "next",
        explanation: "Incorrect. 'Next' could work, but the sentence structure requires a conjunction after 'and,' making 'then' the better choice."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'then' to indicate sequence or time, and 'than' for comparisons."
  },
  {
    position: 11,
    title: "Its vs. It's (Contraction)",
    problem_text: "The museum announced that <u>its</u> opening a new exhibit on ancient civilizations.",
    choices: [
      {
        letter: "A",
        text: "its",
        explanation: "Incorrect. 'Its' is possessive, but the sentence needs 'it is' (it's) to create a grammatically correct clause."
      },
      {
        letter: "B",
        text: "it's",
        explanation: "Correct. 'It's' is the contraction of 'it is,' creating 'that it is opening a new exhibit.'"
      },
      {
        letter: "C",
        text: "its'",
        explanation: "Incorrect. This form does not exist in English grammar."
      },
      {
        letter: "D",
        text: "it was",
        explanation: "Incorrect. This changes the tense to past, but the context suggests the opening is current or future."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'it's' as a contraction of 'it is' or 'it has,' and 'its' to show possession."
  },
  {
    position: 12,
    title: "Your vs. You're (Possessive)",
    problem_text: "Please bring <u>you're</u> identification card to the registration desk.",
    choices: [
      {
        letter: "A",
        text: "you're",
        explanation: "Incorrect. 'You're' means 'you are,' which would create the nonsensical phrase 'bring you are identification card.'"
      },
      {
        letter: "B",
        text: "your",
        explanation: "Correct. 'Your' is the possessive form, showing that the identification card belongs to you."
      },
      {
        letter: "C",
        text: "you are",
        explanation: "Incorrect. This would create the same grammatical error as 'you're,' since it means the same thing."
      },
      {
        letter: "D",
        text: "the",
        explanation: "Incorrect. While grammatically possible, 'the' lacks the necessary possessive relationship between you and your ID card."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'your' to show possession and 'you're' as a contraction of 'you are.'"
  },
  {
    position: 13,
    title: "Who's vs. Whose (Contraction)",
    problem_text: "The teacher wants to know <u>whose</u> been completing the extra credit assignments.",
    choices: [
      {
        letter: "A",
        text: "whose",
        explanation: "Incorrect. 'Whose' is possessive, but the sentence needs 'who has' (who's) to work with 'been completing.'"
      },
      {
        letter: "B",
        text: "who's",
        explanation: "Correct. 'Who's' is a contraction of 'who has,' creating the present perfect 'who has been completing.'"
      },
      {
        letter: "C",
        text: "whom",
        explanation: "Incorrect. 'Whom' is the object form and doesn't fit as the subject of 'has been completing.'"
      },
      {
        letter: "D",
        text: "who",
        explanation: "Incorrect. 'Who' alone doesn't work with 'been,' which requires the auxiliary verb 'has.'"
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'who's' as a contraction of 'who is' or 'who has,' and 'whose' to show possession."
  },
  {
    position: 14,
    title: "To vs. Too vs. Two (Multiple Errors)",
    problem_text: "I would like to go <u>to</u> the concert, but the tickets are to expensive.",
    choices: [
      {
        letter: "A",
        text: "to the concert, but the tickets are to",
        explanation: "Incorrect. While the first 'to' is correct, the second 'to' should be 'too' (meaning excessively)."
      },
      {
        letter: "B",
        text: "to the concert, but the tickets are too",
        explanation: "Correct. The first 'to' is a preposition (to the concert), and the second should be 'too' (excessively expensive)."
      },
      {
        letter: "C",
        text: "too the concert, but the tickets are too",
        explanation: "Incorrect. The first 'too' should be 'to' (preposition), though the second 'too' is correct."
      },
      {
        letter: "D",
        text: "two the concert, but the tickets are to",
        explanation: "Incorrect. Both uses are wrong; 'two' is a number and 'to' should be 'too' (excessively)."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'to' as a preposition or infinitive marker, 'too' for 'excessively' or 'also,' and 'two' for the number."
  },

  // ACTIVE VS. PASSIVE VOICE (Questions 15-22)
  {
    position: 15,
    title: "Active Voice Preferred",
    problem_text: "The award <u>was received by</u> Dr. Martinez for her groundbreaking research in neuroscience.",
    choices: [
      {
        letter: "A",
        text: "was received by",
        explanation: "Incorrect. This passive construction is wordy and less direct than the active voice."
      },
      {
        letter: "B",
        text: "was being received by",
        explanation: "Incorrect. This passive progressive form is even more awkward and wordy than the simple passive."
      },
      {
        letter: "C",
        text: "went to",
        explanation: "Correct. This active construction is more concise and direct, making Dr. Martinez the subject who receives the award."
      },
      {
        letter: "D",
        text: "had been received by",
        explanation: "Incorrect. The past perfect passive is unnecessarily complex and doesn't improve clarity."
      }
    ],
    correct_answer: "C",
    answer_explanation: "Active voice is generally preferred because it is more direct and concise than passive voice."
  },
  {
    position: 16,
    title: "Passive Voice Appropriate",
    problem_text: "The experiments <u>were conducted carefully</u> to ensure accurate results.",
    choices: [
      {
        letter: "A",
        text: "were conducted carefully",
        explanation: "Correct. Passive voice is appropriate here because the focus is on the experiments, not who conducted them."
      },
      {
        letter: "B",
        text: "carefully conducted themselves",
        explanation: "Incorrect. Experiments cannot conduct themselves; this creates a logical error."
      },
      {
        letter: "C",
        text: "we conducted carefully",
        explanation: "Incorrect. This shifts focus to 'we' unnecessarily when the emphasis should remain on the experiments."
      },
      {
        letter: "D",
        text: "conducted carefully by researchers",
        explanation: "Incorrect. While grammatically correct, this adds unnecessary information and wordiness."
      }
    ],
    correct_answer: "A",
    answer_explanation: "Passive voice is acceptable when the actor is unknown, unimportant, or when the focus should be on the action or recipient."
  },
  {
    position: 17,
    title: "Converting Passive to Active",
    problem_text: "The final decision <u>will be made by the board of directors</u> next Tuesday.",
    choices: [
      {
        letter: "A",
        text: "will be made by the board of directors",
        explanation: "Incorrect. This passive construction is unnecessarily wordy when the actor is known and important."
      },
      {
        letter: "B",
        text: "will be decided on by the board of directors",
        explanation: "Incorrect. This is still passive and adds the unnecessary phrase 'decided on.'"
      },
      {
        letter: "C",
        text: "the board of directors will make",
        explanation: "Correct. This active construction is more direct and concise, making the board the clear subject."
      },
      {
        letter: "D",
        text: "is going to be made by the board of directors",
        explanation: "Incorrect. This passive construction is wordy and changes the tone from formal to informal."
      }
    ],
    correct_answer: "C",
    answer_explanation: "When the actor is known and important, active voice is generally clearer and more concise."
  },
  {
    position: 18,
    title: "Maintaining Passive Voice",
    problem_text: "The manuscript <u>has been lost</u> for over a century before its recent discovery.",
    choices: [
      {
        letter: "A",
        text: "has been lost",
        explanation: "Incorrect. The present perfect doesn't fit the timeframe; the manuscript was lost before the recent discovery."
      },
      {
        letter: "B",
        text: "had been lost",
        explanation: "Correct. The past perfect passive correctly indicates that the loss occurred before the past discovery."
      },
      {
        letter: "C",
        text: "was lost",
        explanation: "Incorrect. The simple past doesn't clearly show that the loss preceded the discovery by a century."
      },
      {
        letter: "D",
        text: "lost itself",
        explanation: "Incorrect. Manuscripts cannot lose themselves; this creates a logical error and awkward phrasing."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Passive voice with appropriate tense (past perfect) is correct when showing the sequence of past events."
  },
  {
    position: 19,
    title: "Active Voice for Clarity",
    problem_text: "Mistakes <u>were made by several team members</u> during the project, leading to delays.",
    choices: [
      {
        letter: "A",
        text: "were made by several team members",
        explanation: "Incorrect. This passive construction is wordy and less direct than active voice."
      },
      {
        letter: "B",
        text: "several team members made",
        explanation: "Correct. This active construction is more direct and clearly assigns responsibility."
      },
      {
        letter: "C",
        text: "had been made by several team members",
        explanation: "Incorrect. The past perfect passive is unnecessarily complex and doesn't improve clarity."
      },
      {
        letter: "D",
        text: "were being made by several team members",
        explanation: "Incorrect. The passive progressive is awkward and doesn't improve on the original."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Active voice is preferred when assigning clear responsibility for actions."
  },
  {
    position: 20,
    title: "Unnecessary Passive Construction",
    problem_text: "A speech <u>was given by the mayor</u> addressing the community's concerns about the new development.",
    choices: [
      {
        letter: "A",
        text: "was given by the mayor",
        explanation: "Incorrect. This passive construction is unnecessarily wordy when the actor is specified."
      },
      {
        letter: "B",
        text: "the mayor gave",
        explanation: "Correct. This active construction is more concise and makes the mayor the clear subject of the sentence."
      },
      {
        letter: "C",
        text: "was delivered by the mayor",
        explanation: "Incorrect. While 'delivered' is a good verb choice, the passive construction is still unnecessarily wordy."
      },
      {
        letter: "D",
        text: "had been given by the mayor",
        explanation: "Incorrect. The past perfect passive adds unnecessary complexity and doesn't improve clarity."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Active voice is more concise and direct when the actor is known and relevant."
  },
  {
    position: 21,
    title: "Passive Voice for Focus",
    problem_text: "The ancient artifacts <u>archaeologists carefully excavated</u> last summer.",
    choices: [
      {
        letter: "A",
        text: "archaeologists carefully excavated",
        explanation: "Incorrect. This creates a fragment; the sentence lacks a main verb for 'artifacts' as the subject."
      },
      {
        letter: "B",
        text: "were carefully excavated by archaeologists",
        explanation: "Correct. This passive construction makes 'artifacts' the subject and creates a complete sentence."
      },
      {
        letter: "C",
        text: "carefully excavated themselves",
        explanation: "Incorrect. Artifacts cannot excavate themselves; this is illogical."
      },
      {
        letter: "D",
        text: "excavated by archaeologists carefully",
        explanation: "Incorrect. This is incomplete and awkwardly places the adverb at the end."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Passive voice is appropriate when the focus should be on the object (artifacts) rather than the actor."
  },
  {
    position: 22,
    title: "Active Voice for Directness",
    problem_text: "The novel's themes <u>are explored by the author</u> through complex character development.",
    choices: [
      {
        letter: "A",
        text: "are explored by the author",
        explanation: "Incorrect. This passive construction is unnecessarily wordy when the actor (author) is relevant."
      },
      {
        letter: "B",
        text: "the author explores",
        explanation: "Correct. This active construction is more direct and emphasizes the author's active role."
      },
      {
        letter: "C",
        text: "are being explored by the author",
        explanation: "Incorrect. The progressive passive is awkward and suggests ongoing action rather than a completed work."
      },
      {
        letter: "D",
        text: "have been explored by the author",
        explanation: "Incorrect. While grammatically acceptable, the present perfect passive is less direct than the active voice."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Active voice is preferred when emphasizing the actor's deliberate choices or actions."
  },

  // PREPOSITIONAL IDIOMS (Questions 23-32)
  {
    position: 23,
    title: "Different From vs. Different Than",
    problem_text: "The results of the study were different <u>than</u> what researchers had predicted.",
    choices: [
      {
        letter: "A",
        text: "than",
        explanation: "Incorrect. While 'different than' is sometimes used informally, 'different from' is the preferred standard form."
      },
      {
        letter: "B",
        text: "from",
        explanation: "Correct. 'Different from' is the standard prepositional idiom in formal writing."
      },
      {
        letter: "C",
        text: "to",
        explanation: "Incorrect. 'Different to' is primarily British usage and less common in American English."
      },
      {
        letter: "D",
        text: "with",
        explanation: "Incorrect. 'Different with' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'different from' in formal writing, as it is the standard prepositional idiom."
  },
  {
    position: 24,
    title: "Worried About",
    problem_text: "Students are increasingly worried <u>for</u> their future job prospects in the current economy.",
    choices: [
      {
        letter: "A",
        text: "for",
        explanation: "Incorrect. 'Worried for' means concerned for someone else's wellbeing, not about a situation."
      },
      {
        letter: "B",
        text: "about",
        explanation: "Correct. 'Worried about' is the correct idiom when expressing concern about a situation or outcome."
      },
      {
        letter: "C",
        text: "of",
        explanation: "Incorrect. 'Worried of' is not a standard prepositional idiom in English."
      },
      {
        letter: "D",
        text: "over",
        explanation: "Incorrect. While 'worried over' is sometimes used, 'worried about' is the standard idiom."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'worried about' when expressing concern about a situation, and 'worried for' when concerned for someone."
  },
  {
    position: 25,
    title: "Interested In",
    problem_text: "The company is interested <u>on</u> expanding its operations into international markets.",
    choices: [
      {
        letter: "A",
        text: "on",
        explanation: "Incorrect. 'Interested on' is not a standard prepositional idiom in English."
      },
      {
        letter: "B",
        text: "in",
        explanation: "Correct. 'Interested in' is the correct prepositional idiom for expressing interest."
      },
      {
        letter: "C",
        text: "about",
        explanation: "Incorrect. 'Interested about' is not standard; use 'interested in' or 'curious about.'"
      },
      {
        letter: "D",
        text: "for",
        explanation: "Incorrect. 'Interested for' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'interested in' to express interest or desire to pursue something."
  },
  {
    position: 26,
    title: "Responsible For",
    problem_text: "The manager is responsible <u>of</u> overseeing all daily operations and staff training.",
    choices: [
      {
        letter: "A",
        text: "of",
        explanation: "Incorrect. 'Responsible of' is not a standard prepositional idiom in English."
      },
      {
        letter: "B",
        text: "for",
        explanation: "Correct. 'Responsible for' is the correct idiom indicating duty or accountability."
      },
      {
        letter: "C",
        text: "to",
        explanation: "Incorrect. While 'responsible to' can indicate accountability to a person, 'responsible for' is needed for tasks."
      },
      {
        letter: "D",
        text: "with",
        explanation: "Incorrect. 'Responsible with' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'responsible for' when indicating duty or accountability for tasks or outcomes."
  },
  {
    position: 27,
    title: "Prevent From",
    problem_text: "Safety regulations prevent workers <u>to</u> enter hazardous areas without proper equipment.",
    choices: [
      {
        letter: "A",
        text: "to",
        explanation: "Incorrect. 'Prevent to' is not correct; the idiom is 'prevent from' followed by a gerund."
      },
      {
        letter: "B",
        text: "from entering",
        explanation: "Correct. 'Prevent from' is the correct prepositional idiom, followed by a gerund (-ing form)."
      },
      {
        letter: "C",
        text: "against entering",
        explanation: "Incorrect. 'Prevent against' is not standard; use 'protect against' or 'prevent from.'"
      },
      {
        letter: "D",
        text: "of entering",
        explanation: "Incorrect. 'Prevent of' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'prevent from' followed by a gerund to indicate stopping someone from doing something."
  },
  {
    position: 28,
    title: "Agree With vs. Agree To",
    problem_text: "The board members agreed <u>with</u> the proposal to renovate the building.",
    choices: [
      {
        letter: "A",
        text: "with",
        explanation: "Incorrect. Use 'agree with' for people or opinions, but 'agree to' for proposals or plans."
      },
      {
        letter: "B",
        text: "to",
        explanation: "Correct. 'Agree to' is the correct idiom when accepting a proposal, plan, or terms."
      },
      {
        letter: "C",
        text: "on",
        explanation: "Incorrect. While 'agree on' is valid (reaching consensus), 'agree to' better fits accepting a proposal."
      },
      {
        letter: "D",
        text: "about",
        explanation: "Incorrect. 'Agree about' is not standard; use 'agree with,' 'agree to,' or 'agree on.'"
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'agree to' for proposals or plans, 'agree with' for people or opinions, and 'agree on' for reaching consensus."
  },
  {
    position: 29,
    title: "Comply With",
    problem_text: "All employees must comply <u>to</u> the company's code of conduct and safety protocols.",
    choices: [
      {
        letter: "A",
        text: "to",
        explanation: "Incorrect. 'Comply to' is not standard; the correct idiom is 'comply with.'"
      },
      {
        letter: "B",
        text: "with",
        explanation: "Correct. 'Comply with' is the standard prepositional idiom for following rules or regulations."
      },
      {
        letter: "C",
        text: "by",
        explanation: "Incorrect. 'Comply by' is not standard; use 'abide by' or 'comply with.'"
      },
      {
        letter: "D",
        text: "on",
        explanation: "Incorrect. 'Comply on' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'comply with' when following rules, regulations, or standards."
  },
  {
    position: 30,
    title: "Independent Of",
    problem_text: "The research findings should be independent <u>from</u> any commercial interests or funding sources.",
    choices: [
      {
        letter: "A",
        text: "from",
        explanation: "Incorrect. While sometimes used, 'independent of' is the more precise and formal prepositional idiom."
      },
      {
        letter: "B",
        text: "of",
        explanation: "Correct. 'Independent of' is the standard prepositional idiom in formal writing."
      },
      {
        letter: "C",
        text: "to",
        explanation: "Incorrect. 'Independent to' is not a standard prepositional idiom in English."
      },
      {
        letter: "D",
        text: "with",
        explanation: "Incorrect. 'Independent with' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'independent of' to indicate freedom from external control or influence."
  },
  {
    position: 31,
    title: "Superior To",
    problem_text: "The new manufacturing process is superior <u>than</u> the traditional method in both efficiency and cost.",
    choices: [
      {
        letter: "A",
        text: "than",
        explanation: "Incorrect. 'Superior than' is not correct; 'superior to' is the standard idiom."
      },
      {
        letter: "B",
        text: "to",
        explanation: "Correct. 'Superior to' is the correct prepositional idiom for indicating something is better."
      },
      {
        letter: "C",
        text: "over",
        explanation: "Incorrect. 'Superior over' is not standard; use 'superior to.'"
      },
      {
        letter: "D",
        text: "from",
        explanation: "Incorrect. 'Superior from' is not a standard prepositional idiom in English."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'superior to' (not 'superior than') when comparing quality or rank."
  },
  {
    position: 32,
    title: "Prohibit From",
    problem_text: "School policy prohibits students <u>to use</u> their phones during class time.",
    choices: [
      {
        letter: "A",
        text: "to use",
        explanation: "Incorrect. 'Prohibit to' is not correct; the idiom requires 'from' followed by a gerund."
      },
      {
        letter: "B",
        text: "from using",
        explanation: "Correct. 'Prohibit from' is the correct prepositional idiom, followed by a gerund (-ing form)."
      },
      {
        letter: "C",
        text: "of using",
        explanation: "Incorrect. 'Prohibit of' is not a standard prepositional idiom in English."
      },
      {
        letter: "D",
        text: "against using",
        explanation: "Incorrect. 'Prohibit against' is not standard; use 'protect against' or 'prohibit from.'"
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use 'prohibit from' followed by a gerund to indicate forbidding someone from doing something."
  },

  // WORD CHOICE AND DICTION (Questions 33-38)
  {
    position: 33,
    title: "Formal vs. Informal Diction",
    problem_text: "The research team <u>messed up</u> the experiment by using contaminated samples.",
    choices: [
      {
        letter: "A",
        text: "messed up",
        explanation: "Incorrect. 'Messed up' is informal slang inappropriate for academic or formal writing."
      },
      {
        letter: "B",
        text: "compromised",
        explanation: "Correct. 'Compromised' is formal and precise, appropriate for academic or professional contexts."
      },
      {
        letter: "C",
        text: "goofed",
        explanation: "Incorrect. 'Goofed' is informal and too casual for formal writing."
      },
      {
        letter: "D",
        text: "screwed up",
        explanation: "Incorrect. 'Screwed up' is slang and inappropriate for formal academic writing."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Choose formal, precise diction in academic writing; avoid informal expressions or slang."
  },
  {
    position: 34,
    title: "Precise Word Choice",
    problem_text: "The author <u>uses</u> symbolism throughout the novel to convey deeper themes about identity.",
    choices: [
      {
        letter: "A",
        text: "uses",
        explanation: "Incorrect. While not wrong, 'uses' is generic. More precise verbs better convey literary analysis."
      },
      {
        letter: "B",
        text: "employs",
        explanation: "Correct. 'Employs' is more precise and sophisticated, appropriate for literary analysis."
      },
      {
        letter: "C",
        text: "does",
        explanation: "Incorrect. 'Does' is vague and lacks the precision needed for formal writing."
      },
      {
        letter: "D",
        text: "has",
        explanation: "Incorrect. 'Has' changes the meaning and is less precise than 'employs.'"
      }
    ],
    correct_answer: "B",
    answer_explanation: "Choose precise, sophisticated verbs over generic ones to strengthen formal writing."
  },
  {
    position: 35,
    title: "Avoiding Vague Language",
    problem_text: "The new policy will <u>have a lot of</u> benefits for employees working remotely.",
    choices: [
      {
        letter: "A",
        text: "have a lot of",
        explanation: "Incorrect. 'A lot of' is vague and informal; use specific, formal expressions instead."
      },
      {
        letter: "B",
        text: "provide numerous",
        explanation: "Correct. 'Provide numerous' is more formal and precise than the vague 'a lot of.'"
      },
      {
        letter: "C",
        text: "have tons of",
        explanation: "Incorrect. 'Tons of' is even more informal and colloquial than 'a lot of.'"
      },
      {
        letter: "D",
        text: "give lots of",
        explanation: "Incorrect. 'Lots of' is informal and should be avoided in formal writing."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Avoid vague, informal expressions like 'a lot of'; use precise, formal alternatives."
  },
  {
    position: 36,
    title: "Appropriate Academic Tone",
    problem_text: "The scientist <u>figured out</u> how proteins fold by conducting thousands of simulations.",
    choices: [
      {
        letter: "A",
        text: "figured out",
        explanation: "Incorrect. 'Figured out' is informal and conversational, inappropriate for academic writing."
      },
      {
        letter: "B",
        text: "determined",
        explanation: "Correct. 'Determined' is formal and precise, appropriate for academic or scientific contexts."
      },
      {
        letter: "C",
        text: "got",
        explanation: "Incorrect. 'Got' is too informal and vague for academic writing."
      },
      {
        letter: "D",
        text: "came up with",
        explanation: "Incorrect. 'Came up with' is informal and lacks the precision needed for scientific writing."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use formal, precise verbs in academic writing; avoid casual, conversational expressions."
  },
  {
    position: 37,
    title: "Eliminating Colloquialisms",
    problem_text: "The debate team <u>totally crushed</u> their opponents in the final round of competition.",
    choices: [
      {
        letter: "A",
        text: "totally crushed",
        explanation: "Incorrect. This is slang and overly informal, inappropriate for formal writing."
      },
      {
        letter: "B",
        text: "decisively defeated",
        explanation: "Correct. This formal expression appropriately conveys a strong victory without slang."
      },
      {
        letter: "C",
        text: "really beat",
        explanation: "Incorrect. While less slangy, this is still too informal and lacks precision."
      },
      {
        letter: "D",
        text: "destroyed",
        explanation: "Incorrect. While more formal than 'crushed,' 'destroyed' is hyperbolic for a debate context."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Avoid colloquialisms and slang in formal writing; use precise, appropriate language."
  },
  {
    position: 38,
    title: "Connotation and Register",
    problem_text: "The politician <u>talked about</u> the economic implications of the proposed legislation during the press conference.",
    choices: [
      {
        letter: "A",
        text: "talked about",
        explanation: "Incorrect. 'Talked about' is too casual and imprecise for formal contexts."
      },
      {
        letter: "B",
        text: "discussed",
        explanation: "Correct. 'Discussed' is formal and precise, appropriate for describing political discourse."
      },
      {
        letter: "C",
        text: "chatted about",
        explanation: "Incorrect. 'Chatted about' is far too informal and suggests casual conversation, not formal discourse."
      },
      {
        letter: "D",
        text: "went over",
        explanation: "Incorrect. 'Went over' is informal and lacks the appropriate register for political contexts."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Choose words with appropriate connotations and register for the context and audience."
  },

  // REDUNDANCY AND WORDINESS (Questions 39-41)
  {
    position: 39,
    title: "Eliminating Redundancy",
    problem_text: "The final <u>end result</u> of the investigation revealed significant safety violations.",
    choices: [
      {
        letter: "A",
        text: "end result",
        explanation: "Incorrect. 'End result' is redundant because 'result' already implies the end or conclusion."
      },
      {
        letter: "B",
        text: "result",
        explanation: "Correct. 'Result' alone conveys the complete meaning without redundancy."
      },
      {
        letter: "C",
        text: "final outcome",
        explanation: "Incorrect. While less redundant than 'end result,' 'outcome' alone would be sufficient."
      },
      {
        letter: "D",
        text: "ultimate end result",
        explanation: "Incorrect. This is even more redundant, adding 'ultimate' to the already redundant 'end result.'"
      }
    ],
    correct_answer: "B",
    answer_explanation: "Eliminate redundant phrases where one word conveys the complete meaning."
  },
  {
    position: 40,
    title: "Concise Expression",
    problem_text: "The committee will meet <u>at this point in time</u> to discuss the budget proposal.",
    choices: [
      {
        letter: "A",
        text: "at this point in time",
        explanation: "Incorrect. This wordy phrase can be replaced with a single word without losing meaning."
      },
      {
        letter: "B",
        text: "now",
        explanation: "Correct. 'Now' conveys the same meaning as 'at this point in time' but is concise."
      },
      {
        letter: "C",
        text: "at the present time",
        explanation: "Incorrect. This is still wordy and can be replaced with 'now' or 'currently.'"
      },
      {
        letter: "D",
        text: "in the immediate future",
        explanation: "Incorrect. This changes the meaning and is also unnecessarily wordy."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Replace wordy phrases with concise alternatives that convey the same meaning."
  },
  {
    position: 41,
    title: "Removing Unnecessary Words",
    problem_text: "In my personal opinion, I believe <u>that</u> the proposed changes will improve efficiency.",
    choices: [
      {
        letter: "A",
        text: "In my personal opinion, I believe that",
        explanation: "Incorrect. This is redundant; 'I believe' already indicates personal opinion, and 'that' is often unnecessary."
      },
      {
        letter: "B",
        text: "DELETE the underlined portion",
        explanation: "Correct. Removing these redundant words makes the sentence more concise: 'The proposed changes will improve efficiency.'"
      },
      {
        letter: "C",
        text: "I think that",
        explanation: "Incorrect. While less wordy, this still adds unnecessary subjective framing to an assertive statement."
      },
      {
        letter: "D",
        text: "In my opinion,",
        explanation: "Incorrect. This is better than the original but still adds unnecessary words to what can be a direct statement."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Remove redundant phrases that weaken or clutter direct statements."
  },

  // MIXED REVIEW (Questions 42-44)
  {
    position: 42,
    title: "Mixed: Confused Words and Active Voice",
    problem_text: "<u>There</u> going to announce the winner, who's achievement has been recognized by experts worldwide.",
    choices: [
      {
        letter: "A",
        text: "There going to announce the winner, who's achievement",
        explanation: "Incorrect. 'There' should be 'They're' (they are), and 'who's' (who is) should be 'whose' (possessive)."
      },
      {
        letter: "B",
        text: "They're going to announce the winner, whose achievement",
        explanation: "Correct. 'They're' (they are) and 'whose' (possessive) are the correct forms for this context."
      },
      {
        letter: "C",
        text: "Their going to announce the winner, whose achievement",
        explanation: "Incorrect. 'Their' is possessive, not the contraction 'they're' (they are) needed here."
      },
      {
        letter: "D",
        text: "They're going to announce the winner, who's achievement",
        explanation: "Incorrect. While 'They're' is correct, 'who's' means 'who is' and should be 'whose' (possessive)."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Correctly distinguish between they're/their/there and who's/whose based on context."
  },
  {
    position: 43,
    title: "Mixed: Prepositional Idiom and Word Choice",
    problem_text: "The students were really interested <u>on figuring out</u> the solution to the complex math problem.",
    choices: [
      {
        letter: "A",
        text: "on figuring out",
        explanation: "Incorrect. 'Interested on' is wrong (should be 'in'), and 'figuring out' is too informal."
      },
      {
        letter: "B",
        text: "in determining",
        explanation: "Correct. 'Interested in' is the correct idiom, and 'determining' is more formal than 'figuring out.'"
      },
      {
        letter: "C",
        text: "about figuring out",
        explanation: "Incorrect. 'Interested about' is not standard, and 'figuring out' is too informal for academic writing."
      },
      {
        letter: "D",
        text: "in figuring out",
        explanation: "Incorrect. While 'interested in' is correct, 'figuring out' is too informal; 'determining' or 'solving' is better."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use correct prepositional idioms (interested in) and appropriate formal diction in academic contexts."
  },
  {
    position: 44,
    title: "Mixed: Passive Voice, Redundancy, and Comparison",
    problem_text: "The final results <u>were announced by officials, and they were more better then</u> what anyone expected.",
    choices: [
      {
        letter: "A",
        text: "were announced by officials, and they were more better then",
        explanation: "Incorrect. Passive voice is wordy, 'more better' is a double comparative error, and 'then' should be 'than.'"
      },
      {
        letter: "B",
        text: "officials announced, and they were better than",
        explanation: "Correct. Active voice ('officials announced') is concise, 'better' is correct (not 'more better'), and 'than' is used for comparison."
      },
      {
        letter: "C",
        text: "were announced by officials, and they were better than",
        explanation: "Incorrect. While 'better than' is correct, the passive voice 'were announced by officials' is unnecessarily wordy."
      },
      {
        letter: "D",
        text: "officials announced, and they were more better than",
        explanation: "Incorrect. While active voice is good and 'than' is correct, 'more better' is a double comparative error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Use active voice for conciseness, avoid double comparatives ('more better'), and use 'than' for comparisons."
  }
];
