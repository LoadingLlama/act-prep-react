const pronounQuestions = [
  // PRONOUN CASE (SUBJECT VS. OBJECT PRONOUNS) (12 questions)
  {
    position: 1,
    title: 'Subject Pronoun in Compound Subject',
    problem_text: 'My sister and <u>me</u> volunteered at the community center every weekend last summer.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Me" is an object pronoun, but this is part of the compound subject performing the action "volunteered," requiring the subject pronoun "I."' },
      { letter: 'B', text: 'I', explanation: 'Correct. "I" is the subject pronoun needed here. To test, remove "My sister and" - you would say "I volunteered," not "me volunteered."' },
      { letter: 'C', text: 'myself', explanation: 'Incorrect. "Myself" is a reflexive pronoun used for emphasis or when the subject and object are the same. It cannot replace a subject pronoun.' },
      { letter: 'D', text: 'us', explanation: 'Incorrect. "Us" is a plural object pronoun and cannot be part of a compound subject.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use subject pronouns (I, he, she, we, they) in compound subjects. Remove the other subject to test which pronoun sounds correct.'
  },
  {
    position: 2,
    title: 'Object Pronoun After Preposition',
    problem_text: 'The teacher distributed the assignments between Marcus and <u>I</u> before class started.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "I" is a subject pronoun, but after prepositions like "between," use object pronouns. The correct form is "me."' },
      { letter: 'B', text: 'me', explanation: 'Correct. Object pronouns (me, him, her, us, them) are used after prepositions. "Between" is a preposition requiring "me."' },
      { letter: 'C', text: 'myself', explanation: 'Incorrect. While reflexive pronouns can follow prepositions, "myself" is only used when the subject and object are the same person, which is not the case here.' },
      { letter: 'D', text: 'we', explanation: 'Incorrect. "We" is a subject pronoun and cannot follow a preposition. The object pronoun "us" would be needed if plural.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Always use object pronouns (me, him, her, us, them) after prepositions like "between," "for," "to," and "with."'
  },
  {
    position: 3,
    title: 'Subject Pronoun After "Than"',
    problem_text: 'My brother practices basketball more frequently than <u>me</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. After "than" in comparisons, the pronoun should match the case it would have in the complete clause: "than I [practice]." Use the subject pronoun "I."' },
      { letter: 'B', text: 'I', explanation: 'Correct. After "than" in comparisons, use the subject pronoun because the complete thought is "than I do" or "than I practice."' },
      { letter: 'C', text: 'myself', explanation: 'Incorrect. Reflexive pronouns are not appropriate in comparisons with "than."' },
      { letter: 'D', text: 'him', explanation: 'Incorrect. "Him" is an object pronoun for third person, not first person, and doesn\'t fit the context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After "than" or "as" in comparisons, use the pronoun case that would be correct if the clause were complete.'
  },
  {
    position: 4,
    title: 'Object Pronoun as Direct Object',
    problem_text: 'The guidance counselor called both Sarah and <u>he</u> to discuss college applications.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "He" is a subject pronoun, but here the pronoun is the direct object of "called," requiring the object pronoun "him."' },
      { letter: 'B', text: 'him', explanation: 'Correct. "Him" is the object pronoun needed as the direct object of "called." To test, remove "Sarah and" - you would say "called him," not "called he."' },
      { letter: 'C', text: 'himself', explanation: 'Incorrect. Reflexive pronouns are used when the subject and object are the same, but here the counselor (subject) called him (object).' },
      { letter: 'D', text: 'his', explanation: 'Incorrect. "His" is a possessive pronoun, not an object pronoun, and doesn\'t fit this context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use object pronouns (him, her, them) as direct objects of verbs. Remove the compound to test correctness.'
  },
  {
    position: 5,
    title: 'Subject Pronoun in Appositive',
    problem_text: 'The two finalists, Jessica and <u>him</u>, will compete in the championship debate next week.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Him" is an object pronoun, but the appositive "Jessica and him" renames the subject "finalists," requiring the subject pronoun "he."' },
      { letter: 'B', text: 'he', explanation: 'Correct. When an appositive renames the subject, use subject pronouns. "The two finalists" is the subject, so "he" is correct.' },
      { letter: 'C', text: 'himself', explanation: 'Incorrect. Reflexive pronouns are not used in appositives that rename subjects.' },
      { letter: 'D', text: 'they', explanation: 'Incorrect. "They" is plural, but a single pronoun is needed to pair with "Jessica."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When an appositive renames a subject, use subject pronouns; when it renames an object, use object pronouns.'
  },
  {
    position: 6,
    title: 'Object Pronoun After Verb',
    problem_text: 'The coach selected <u>she</u> and two other players to represent the school at the tournament.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "She" is a subject pronoun, but here the pronoun is the direct object of "selected," requiring the object pronoun "her."' },
      { letter: 'B', text: 'her', explanation: 'Correct. "Her" is the object pronoun needed as the direct object of "selected."' },
      { letter: 'C', text: 'herself', explanation: 'Incorrect. Reflexive pronouns are used when the subject and object are the same, but the coach (subject) selected her (object).' },
      { letter: 'D', text: 'hers', explanation: 'Incorrect. "Hers" is a possessive pronoun that stands alone and cannot function as a direct object in this context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use object pronouns (me, him, her, us, them) as direct objects of verbs.'
  },
  {
    position: 7,
    title: 'Subject Pronoun After "To Be"',
    problem_text: 'The person who answered the phone was <u>him</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. After linking verbs like "was" (forms of "to be"), use subject pronouns because they rename the subject. "He" is correct in formal English.' },
      { letter: 'B', text: 'he', explanation: 'Correct. After linking verbs (forms of "to be"), use subject pronouns. Though "him" sounds more natural in speech, "he" is formally correct.' },
      { letter: 'C', text: 'himself', explanation: 'Incorrect. Reflexive pronouns are not used after linking verbs to rename the subject.' },
      { letter: 'D', text: 'his', explanation: 'Incorrect. "His" is a possessive pronoun and doesn\'t fit the construction of renaming the subject after "was."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After linking verbs (forms of "to be"), use subject pronouns in formal writing, even if object pronouns sound more natural.'
  },
  {
    position: 8,
    title: 'Object Pronoun in Compound Object',
    problem_text: 'The librarian recommended the new biography to my friend and <u>I</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "I" is a subject pronoun, but here it is part of the object of the preposition "to," requiring the object pronoun "me."' },
      { letter: 'B', text: 'me', explanation: 'Correct. "Me" is the object pronoun needed after the preposition "to." To test, remove "my friend and" - you would say "to me," not "to I."' },
      { letter: 'C', text: 'myself', explanation: 'Incorrect. Reflexive pronouns are used when subject and object are the same, but here the librarian is the subject, not "I."' },
      { letter: 'D', text: 'we', explanation: 'Incorrect. "We" is a subject pronoun and cannot be used after the preposition "to."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In compound objects (after prepositions or verbs), use object pronouns. Test by removing the compound.'
  },
  {
    position: 9,
    title: 'Subject Pronoun Compound After Linking Verb',
    problem_text: 'The winners of the science fair were Roberto and <u>her</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Her" is an object pronoun, but after the linking verb "were," use subject pronouns to rename the subject "winners." Use "she."' },
      { letter: 'B', text: 'she', explanation: 'Correct. After linking verbs like "were," use subject pronouns. "She" is correct because it renames the subject "winners."' },
      { letter: 'C', text: 'herself', explanation: 'Incorrect. Reflexive pronouns are not appropriate after linking verbs when renaming the subject.' },
      { letter: 'D', text: 'hers', explanation: 'Incorrect. "Hers" is a possessive pronoun and cannot function to rename the subject after a linking verb.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After linking verbs, use subject pronouns to rename the subject, even in compound constructions.'
  },
  {
    position: 10,
    title: 'Object Pronoun After Action Verb',
    problem_text: 'The principal congratulated the captain and <u>I</u> after the successful fundraiser.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "I" is a subject pronoun, but here it is the direct object of "congratulated," requiring the object pronoun "me."' },
      { letter: 'B', text: 'me', explanation: 'Correct. "Me" is the object pronoun needed as the direct object. Remove "the captain and" to test: "congratulated me" is correct.' },
      { letter: 'C', text: 'myself', explanation: 'Incorrect. Use "myself" only when the subject and object are the same person, which is not the case here.' },
      { letter: 'D', text: 'mine', explanation: 'Incorrect. "Mine" is a possessive pronoun that stands alone and cannot function as a direct object in this context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use object pronouns as direct objects of action verbs, especially in compound objects.'
  },
  {
    position: 11,
    title: 'Subject Pronoun for Emphasis',
    problem_text: '<u>Us</u> students should have more input in scheduling decisions.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Us" is an object pronoun, but "students" is the subject of "should have," requiring the subject pronoun "we."' },
      { letter: 'B', text: 'We', explanation: 'Correct. "We" is the subject pronoun needed here. Remove "students" to test: "We should have" is correct, not "Us should have."' },
      { letter: 'C', text: 'Our', explanation: 'Incorrect. "Our" is a possessive pronoun and would change the meaning to "Our students" rather than "we who are students."' },
      { letter: 'D', text: 'Ourselves', explanation: 'Incorrect. Reflexive pronouns cannot function as the subject of a sentence.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When a pronoun and noun together form the subject, use subject pronouns (we/they). Test by removing the noun.'
  },
  {
    position: 12,
    title: 'Object Pronoun in Parallel Construction',
    problem_text: 'The scholarship committee will interview you, <u>he</u>, and several other candidates tomorrow.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "He" is a subject pronoun, but all items in this list are direct objects of "will interview," requiring the object pronoun "him."' },
      { letter: 'B', text: 'him', explanation: 'Correct. "Him" is the object pronoun needed as part of the compound direct object of "will interview."' },
      { letter: 'C', text: 'himself', explanation: 'Incorrect. Reflexive pronouns are used when subject and object are the same, but here the committee interviews him.' },
      { letter: 'D', text: 'his', explanation: 'Incorrect. "His" is a possessive pronoun and cannot function as a direct object in this parallel construction.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In parallel constructions with multiple objects, ensure all pronouns are in the object case.'
  },

  // WHO VS. WHOM (6 questions)
  {
    position: 13,
    title: 'Who as Subject of Clause',
    problem_text: 'The student <u>whom</u> won the essay contest will read her work at the assembly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Whom" is used for objects, but here the pronoun is the subject of "won," requiring "who."' },
      { letter: 'B', text: 'who', explanation: 'Correct. "Who" is the subject pronoun needed as the subject of the verb "won." To test: "she won" (subject), not "her won."' },
      { letter: 'C', text: 'which', explanation: 'Incorrect. "Which" is used for things or animals, not people. Use "who" for people.' },
      { letter: 'D', text: 'that', explanation: 'Incorrect. While "that" can refer to people informally, "who" is preferred and more formal for people as subjects.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "who" when the pronoun is the subject of its clause. Test by substituting he/she (who) or him/her (whom).'
  },
  {
    position: 14,
    title: 'Whom as Object of Verb',
    problem_text: 'The candidate <u>who</u> the voters elected has extensive legislative experience.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Who" is a subject pronoun, but here it functions as the direct object of "elected" (the voters elected whom?), requiring "whom."' },
      { letter: 'B', text: 'whom', explanation: 'Correct. "Whom" is the object pronoun needed as the direct object of "elected." Reorder to test: "the voters elected him" (object).' },
      { letter: 'C', text: 'which', explanation: 'Incorrect. "Which" refers to things or animals, not people. Use "whom" for people as objects.' },
      { letter: 'D', text: 'whose', explanation: 'Incorrect. "Whose" is a possessive pronoun, not appropriate for the object of "elected."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "whom" when the pronoun is the object of a verb. Test by reordering the clause to see if you would use him/her.'
  },
  {
    position: 15,
    title: 'Whom After Preposition',
    problem_text: 'The colleague with <u>who</u> I collaborated on the project received a promotion.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. After prepositions like "with," always use "whom," not "who."' },
      { letter: 'B', text: 'whom', explanation: 'Correct. "Whom" is always used after prepositions. "With whom" is the correct form, never "with who."' },
      { letter: 'C', text: 'that', explanation: 'Incorrect. While "that" can sometimes replace "who," it cannot follow a preposition. "With that" is incorrect.' },
      { letter: 'D', text: 'which', explanation: 'Incorrect. "Which" refers to things, not people. After prepositions referring to people, use "whom."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Always use "whom" after prepositions (to, for, with, from, by). Never use "who" after a preposition.'
  },
  {
    position: 16,
    title: 'Who in Question as Subject',
    problem_text: '<u>Whom</u> submitted the winning design for the new logo?',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Whom" is used for objects, but this question asks about the subject performing the action "submitted." Use "who."' },
      { letter: 'B', text: 'Who', explanation: 'Correct. "Who" is the subject pronoun needed as the subject of "submitted." Answer with "He submitted" (subject), not "Him submitted."' },
      { letter: 'C', text: 'Which', explanation: 'Incorrect. "Which" is used for things, not people. Use "who" when asking about people.' },
      { letter: 'D', text: 'Whose', explanation: 'Incorrect. "Whose" is possessive and would ask about ownership, not who performed the action.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In questions, use "who" for subjects (who does?) and "whom" for objects (you asked whom?).'
  },
  {
    position: 17,
    title: 'Whom in Question as Object',
    problem_text: '<u>Who</u> did the director choose for the lead role in the production?',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. In formal writing, "whom" should be used when asking about the object of a verb. The director chose whom?' },
      { letter: 'B', text: 'Whom', explanation: 'Correct. "Whom" is the object pronoun needed as the object of "choose." Reorder: "The director chose him" (object), so use "whom."' },
      { letter: 'C', text: 'Whose', explanation: 'Incorrect. "Whose" is possessive and asks about ownership, not about who was chosen.' },
      { letter: 'D', text: 'Which', explanation: 'Incorrect. "Which" refers to things or choices among things, not people. Use "whom" for people as objects.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In formal writing, use "whom" in questions when asking about the object. Reorder the sentence to test.'
  },
  {
    position: 18,
    title: 'Who as Subject in Clause',
    problem_text: 'The scientist <u>whom</u> discovered the new species received international recognition.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Whom" is for objects, but the pronoun is the subject of "discovered," requiring "who."' },
      { letter: 'B', text: 'who', explanation: 'Correct. "Who" is the subject of the verb "discovered." Substitute to test: "she discovered" (subject), not "her discovered."' },
      { letter: 'C', text: 'which', explanation: 'Incorrect. "Which" is used for things or animals, not people. Always use "who/whom" for people.' },
      { letter: 'D', text: 'whose', explanation: 'Incorrect. "Whose" is possessive and would change the meaning to refer to the scientist\'s possession, not their action.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "who" when the relative pronoun is the subject performing an action in its clause.'
  },

  // PRONOUN-ANTECEDENT AGREEMENT (12 questions)
  {
    position: 19,
    title: 'Singular Indefinite Pronoun Antecedent',
    problem_text: 'Everyone in the class must submit <u>their</u> final project by Friday.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While increasingly common in informal usage, "everyone" is grammatically singular and traditionally requires singular pronouns in formal writing.' },
      { letter: 'B', text: 'his or her', explanation: 'Correct. "Everyone" is a singular indefinite pronoun requiring singular pronouns. "His or her" is the formal singular option.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" is used for things, not people. "Everyone" refers to people and requires "his or her."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is a plural first-person pronoun that doesn\'t match the third-person singular "everyone."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Singular indefinite pronouns (everyone, someone, anyone, each) require singular pronouns (his or her) in formal writing.'
  },
  {
    position: 20,
    title: 'Collective Noun Agreement',
    problem_text: 'The committee announced <u>their</u> decision after hours of deliberation.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. In American English, collective nouns acting as a single unit take singular pronouns. "The committee" is one group, requiring "its."' },
      { letter: 'B', text: 'its', explanation: 'Correct. "Committee" is a collective noun acting as a single unit, so it takes the singular pronoun "its."' },
      { letter: 'C', text: 'our', explanation: 'Incorrect. "Our" is first person, but "committee" is third person and requires a third-person pronoun.' },
      { letter: 'D', text: 'his or her', explanation: 'Incorrect. "His or her" refers to individual people, but "committee" is a singular group requiring "its."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Collective nouns acting as single units take singular pronouns (its). Use plural pronouns only when emphasizing individual members.'
  },
  {
    position: 21,
    title: 'Compound Antecedent with "Or"',
    problem_text: 'Either the manager or the employees will present <u>his</u> concerns at the meeting.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. With "or," the pronoun should agree with the nearest antecedent. "Employees" is plural, requiring "their."' },
      { letter: 'B', text: 'their', explanation: 'Correct. When antecedents are joined by "or," the pronoun agrees with the nearest one. "Employees" is plural, so use "their."' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" is used for things or singular groups, not for the plural "employees."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is first person, but both antecedents are third person, requiring a third-person pronoun.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'With "or" or "nor," the pronoun agrees with the nearest antecedent in number and gender.'
  },
  {
    position: 22,
    title: 'Plural Antecedent Agreement',
    problem_text: 'The students completed <u>his or her</u> science experiments before the deadline.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "His or her" is singular, but "students" is plural and requires the plural pronoun "their."' },
      { letter: 'B', text: 'their', explanation: 'Correct. "Students" is plural, so it requires the plural possessive pronoun "their."' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" is singular and refers to things, not people. "Students" is plural and refers to people.' },
      { letter: 'D', text: 'one\'s', explanation: 'Incorrect. "One\'s" is indefinite and formal, creating an awkward mismatch with the specific plural "students."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Plural antecedents require plural pronouns. Match the number of the pronoun to its antecedent.'
  },
  {
    position: 23,
    title: 'Indefinite Pronoun "Each"',
    problem_text: 'Each of the participants must bring <u>their</u> own equipment to the workshop.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Each" is singular, even when followed by "of the participants" (plural). Formally, it requires singular pronouns.' },
      { letter: 'B', text: 'his or her', explanation: 'Correct. "Each" is a singular indefinite pronoun requiring singular pronouns. "His or her" maintains formal agreement.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" refers to things, not people. "Participants" are people requiring "his or her."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is first person, but "each" is third person and requires a third-person pronoun.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Indefinite pronouns like "each" are singular and require singular pronouns, regardless of prepositional phrases.'
  },
  {
    position: 24,
    title: 'Company/Organization Agreement',
    problem_text: 'The corporation announced that <u>they</u> would expand operations to three new cities.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. In American English, companies and organizations are treated as singular entities and take singular pronouns like "it."' },
      { letter: 'B', text: 'it', explanation: 'Correct. "Corporation" is a singular entity that takes the singular pronoun "it," even though it comprises many people.' },
      { letter: 'C', text: 'he or she', explanation: 'Incorrect. "He or she" refers to people, but "corporation" is an organization requiring "it."' },
      { letter: 'D', text: 'we', explanation: 'Incorrect. "We" is first person, but "corporation" is third person and requires a third-person pronoun.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Companies and organizations are singular entities taking singular pronouns (it) in American English.'
  },
  {
    position: 25,
    title: 'Compound Antecedent with "And"',
    problem_text: 'The coach and the captain presented <u>his</u> strategy for winning the championship.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "His" is singular, but "the coach and the captain" are two people joined by "and," requiring the plural "their."' },
      { letter: 'B', text: 'their', explanation: 'Correct. Compound antecedents joined by "and" are plural and require plural pronouns. Both people presented the strategy.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" refers to things or singular groups, not multiple people. Two people require "their."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is first person, but both antecedents are third person, requiring the third-person "their."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Compound antecedents joined by "and" are plural and require plural pronouns (their).'
  },
  {
    position: 26,
    title: 'Indefinite Pronoun "Nobody"',
    problem_text: 'Nobody wants to admit <u>their</u> mistakes in front of the entire class.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While common in speech, "nobody" is grammatically singular and requires singular pronouns in formal writing.' },
      { letter: 'B', text: 'his or her', explanation: 'Correct. "Nobody" is a singular indefinite pronoun requiring the singular "his or her" in formal writing.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" refers to things, not people. "Nobody" refers to people and requires "his or her."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is first person plural, but "nobody" is third person singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Indefinite pronouns ending in -body (nobody, somebody, anybody) are singular and require singular pronouns.'
  },
  {
    position: 27,
    title: 'Noun and Pronoun Number Agreement',
    problem_text: 'A teacher must be patient with <u>their</u> students, even during challenging times.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Their" is plural, but "a teacher" is singular and requires a singular pronoun in formal writing.' },
      { letter: 'B', text: 'his or her', explanation: 'Correct. "A teacher" is singular and requires the singular pronoun "his or her" for formal agreement.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" is used for things or animals, not people. "A teacher" is a person requiring "his or her."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" would change the sentence to refer to "our students," losing the general statement about teachers.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Singular antecedents (a teacher, a student, a person) require singular pronouns in formal writing.'
  },
  {
    position: 28,
    title: 'Neither/Nor Agreement',
    problem_text: 'Neither the director nor the actors were satisfied with <u>his</u> performance in rehearsal.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "His" is singular, but with "neither...nor," the pronoun should agree with the nearest antecedent "actors," which is plural.' },
      { letter: 'B', text: 'their', explanation: 'Correct. With "neither...nor," the pronoun agrees with the nearest antecedent. "Actors" is plural, requiring "their."' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" refers to things or singular groups, not people. "Actors" are people and plural.' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" is first person, but the sentence uses third person throughout.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'With "neither...nor," pronouns agree with the nearest antecedent in number.'
  },
  {
    position: 29,
    title: 'Plural Indefinite Pronoun "Both"',
    problem_text: 'Both of the researchers published <u>his or her</u> findings in prestigious journals.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "His or her" is singular, but "both" is a plural indefinite pronoun requiring the plural "their."' },
      { letter: 'B', text: 'their', explanation: 'Correct. "Both" is one of the few plural indefinite pronouns, always requiring plural pronouns like "their."' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" is singular and refers to things, not people. "Researchers" are people and plural.' },
      { letter: 'D', text: 'one\'s', explanation: 'Incorrect. "One\'s" is singular and indefinite, creating disagreement with the plural "both."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Plural indefinite pronouns (both, few, many, several) require plural pronouns (their).'
  },
  {
    position: 30,
    title: 'Singular Generic Noun',
    problem_text: 'An athlete must maintain <u>their</u> physical fitness year-round to compete successfully.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While increasingly accepted, "an athlete" is grammatically singular and traditionally requires singular pronouns in formal writing.' },
      { letter: 'B', text: 'his or her', explanation: 'Correct. "An athlete" is a singular generic noun requiring the singular "his or her" in formal writing.' },
      { letter: 'C', text: 'its', explanation: 'Incorrect. "Its" refers to things or animals, not people. "An athlete" is a person requiring "his or her."' },
      { letter: 'D', text: 'our', explanation: 'Incorrect. "Our" changes the general statement to specific first-person possession, altering the intended meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Singular generic nouns (an athlete, a doctor, a student) require singular pronouns in formal writing.'
  },

  // AMBIGUOUS PRONOUN REFERENCES (6 questions)
  {
    position: 31,
    title: 'Unclear Antecedent with Two Nouns',
    problem_text: 'When Maria told Jennifer about the scholarship, <u>she</u> was very excited.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "She" could refer to either Maria or Jennifer, creating ambiguity about who was excited.' },
      { letter: 'B', text: 'Jennifer', explanation: 'Correct. Using the specific noun "Jennifer" eliminates ambiguity and clarifies who was excited.' },
      { letter: 'C', text: 'her', explanation: 'Incorrect. "Her" is also ambiguous and could refer to either Maria or Jennifer.' },
      { letter: 'D', text: 'they', explanation: 'Incorrect. "They" is plural and doesn\'t match the singular context, and it creates different ambiguity.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When a pronoun could refer to multiple antecedents, repeat the specific noun for clarity.'
  },
  {
    position: 32,
    title: 'Vague Pronoun "It"',
    problem_text: 'The scientists discovered a new element and published their findings immediately. <u>It</u> was groundbreaking.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "It" is ambiguous—it could refer to the element, the discovery, or the publication, creating confusion.' },
      { letter: 'B', text: 'The discovery', explanation: 'Correct. Using the specific noun "the discovery" eliminates ambiguity and clearly identifies what was groundbreaking.' },
      { letter: 'C', text: 'This', explanation: 'Incorrect. "This" is still vague and could refer to multiple possible antecedents in the previous sentence.' },
      { letter: 'D', text: 'They', explanation: 'Incorrect. "They" is plural and would refer to the scientists or findings, not what was groundbreaking.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Replace vague pronouns (it, this, that) with specific nouns when the antecedent is unclear.'
  },
  {
    position: 33,
    title: 'Ambiguous "They"',
    problem_text: 'The students asked the teachers about the new policy, but <u>they</u> didn\'t have clear answers.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "They" could refer to either the students or the teachers, making it unclear who lacked answers.' },
      { letter: 'B', text: 'the teachers', explanation: 'Correct. Using the specific noun "the teachers" eliminates ambiguity and clarifies who didn\'t have answers.' },
      { letter: 'C', text: 'them', explanation: 'Incorrect. "Them" is also ambiguous and doesn\'t clarify whether it refers to students or teachers.' },
      { letter: 'D', text: 'everyone', explanation: 'Incorrect. "Everyone" changes the meaning to include both groups, which may not be the intended meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When "they" could refer to multiple plural antecedents, use the specific noun for clarity.'
  },
  {
    position: 34,
    title: 'Remote Antecedent',
    problem_text: 'The orchestra performed Beethoven\'s Ninth Symphony at the concert hall. The audience gave a standing ovation. <u>It</u> lasted for ten minutes.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "It" is ambiguous—it could refer to the symphony, the concert, or the ovation. The distance from the antecedent increases confusion.' },
      { letter: 'B', text: 'The ovation', explanation: 'Correct. Using the specific noun "the ovation" clarifies what lasted ten minutes, eliminating the ambiguous "it."' },
      { letter: 'C', text: 'This', explanation: 'Incorrect. "This" is still vague and doesn\'t clearly specify which element lasted ten minutes.' },
      { letter: 'D', text: 'That', explanation: 'Incorrect. "That" remains ambiguous and doesn\'t clearly identify what lasted ten minutes.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When antecedents are remote (far from the pronoun), replace pronouns with specific nouns for clarity.'
  },
  {
    position: 35,
    title: 'Ambiguous "This"',
    problem_text: 'The company increased salaries and expanded benefits. <u>This</u> improved employee morale significantly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "This" is vague—it could refer to the salary increase, the benefit expansion, or both actions combined.' },
      { letter: 'B', text: 'These changes', explanation: 'Correct. "These changes" specifically identifies both actions (salary increase and benefit expansion) as improving morale.' },
      { letter: 'C', text: 'It', explanation: 'Incorrect. "It" is equally ambiguous and doesn\'t clarify what improved morale.' },
      { letter: 'D', text: 'That', explanation: 'Incorrect. "That" remains vague and doesn\'t specify whether it refers to one action or both.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Replace vague "this" or "that" with specific nouns or noun phrases that clearly identify the antecedent.'
  },
  {
    position: 36,
    title: 'Unclear Reference Chain',
    problem_text: 'After the coach reviewed the game footage with the team, <u>he</u> felt more confident.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "He" is ambiguous because it could refer to the coach or to the team (if considered collectively as male).' },
      { letter: 'B', text: 'the coach', explanation: 'Correct. Using the specific noun "the coach" eliminates any ambiguity about who felt more confident.' },
      { letter: 'C', text: 'they', explanation: 'Incorrect. "They" would clarify it refers to the team, but this changes the meaning if only the coach felt confident.' },
      { letter: 'D', text: 'it', explanation: 'Incorrect. "It" cannot refer to a person and is grammatically incorrect in this context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When multiple possible antecedents exist, repeat the specific noun to eliminate confusion.'
  },

  // REFLEXIVE PRONOUNS (4 questions)
  {
    position: 37,
    title: 'Proper Reflexive Use',
    problem_text: 'The author <u>herself</u> attended the book signing to meet her fans.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Correct. "Herself" is used correctly for emphasis, adding stress to the fact that the author personally attended.' },
      { letter: 'B', text: 'she', explanation: 'Incorrect. "She" is a subject pronoun but doesn\'t add the emphasis that the sentence intends to convey.' },
      { letter: 'C', text: 'her', explanation: 'Incorrect. "Her" is an object pronoun and doesn\'t provide the emphatic meaning that "herself" conveys.' },
      { letter: 'D', text: 'hers', explanation: 'Incorrect. "Hers" is a possessive pronoun and doesn\'t fit the grammatical structure or meaning of emphasis.' }
    ],
    correct_answer: 'A',
    answer_explanation: 'Reflexive pronouns (myself, yourself, herself, etc.) can be used for emphasis to stress that someone personally did something.'
  },
  {
    position: 38,
    title: 'Incorrect Reflexive as Subject',
    problem_text: 'My colleague and <u>myself</u> will present the research findings at the conference.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Reflexive pronouns cannot be used as subjects. Use the subject pronoun "I" instead.' },
      { letter: 'B', text: 'I', explanation: 'Correct. "I" is the subject pronoun needed here. Reflexive pronouns like "myself" cannot function as subjects.' },
      { letter: 'C', text: 'me', explanation: 'Incorrect. "Me" is an object pronoun and cannot be part of the compound subject. The subject requires "I."' },
      { letter: 'D', text: 'mine', explanation: 'Incorrect. "Mine" is a possessive pronoun that stands alone and cannot function as a subject.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Never use reflexive pronouns (myself, yourself, etc.) as subjects. Use subject pronouns (I, you, he, she, etc.).'
  },
  {
    position: 39,
    title: 'Reflexive When Subject Equals Object',
    problem_text: 'The gymnast pushed <u>her</u> to achieve a perfect score on the balance beam.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. When the subject and object are the same person, use a reflexive pronoun. "Herself" is needed here.' },
      { letter: 'B', text: 'herself', explanation: 'Correct. "Herself" is the reflexive pronoun needed when the subject (gymnast) and object (who is pushed) are the same person.' },
      { letter: 'C', text: 'she', explanation: 'Incorrect. "She" is a subject pronoun and cannot function as the object of "pushed."' },
      { letter: 'D', text: 'hers', explanation: 'Incorrect. "Hers" is a possessive pronoun that stands alone and doesn\'t fit the object position.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use reflexive pronouns when the subject and object of a verb are the same person or thing.'
  },
  {
    position: 40,
    title: 'Incorrect Reflexive After Preposition',
    problem_text: 'The teacher distributed the materials to the students and <u>myself</u>.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Reflexive pronouns should only follow prepositions when the subject and object are the same. Here, use "me."' },
      { letter: 'B', text: 'me', explanation: 'Correct. "Me" is the object pronoun needed after the preposition "to." Use reflexive pronouns only when subject equals object.' },
      { letter: 'C', text: 'I', explanation: 'Incorrect. "I" is a subject pronoun and cannot follow a preposition. Object pronouns are required after prepositions.' },
      { letter: 'D', text: 'mine', explanation: 'Incorrect. "Mine" is a possessive pronoun and doesn\'t fit as the object of the preposition "to."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use reflexive pronouns after prepositions only when the subject and object are the same. Otherwise, use object pronouns.'
  },

  // POSSESSIVE PRONOUNS VS. CONTRACTIONS (3 questions)
  {
    position: 41,
    title: 'Its vs. It\'s',
    problem_text: 'The museum proudly displays <u>it\'s</u> collection of ancient artifacts.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "It\'s" is a contraction meaning "it is" or "it has." The sentence needs the possessive "its" without an apostrophe.' },
      { letter: 'B', text: 'its', explanation: 'Correct. "Its" (without apostrophe) is the possessive form showing that the collection belongs to the museum.' },
      { letter: 'C', text: 'it is', explanation: 'Incorrect. Writing out "it is" creates "displays it is collection," which is grammatically incorrect.' },
      { letter: 'D', text: 'its\'', explanation: 'Incorrect. Possessive pronouns never use apostrophes. "Its\'" is not a word.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "its" (no apostrophe) for possession, "it\'s" (with apostrophe) for "it is" or "it has."'
  },
  {
    position: 42,
    title: 'Your vs. You\'re',
    problem_text: '<u>Your</u> going to need more time to complete the research project thoroughly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Your" is possessive, but the sentence needs "you\'re" (you are) to form the future progressive tense.' },
      { letter: 'B', text: 'You\'re', explanation: 'Correct. "You\'re" is the contraction of "you are," which is needed to form "you are going to need."' },
      { letter: 'C', text: 'You are', explanation: 'Incorrect. While grammatically correct, the contraction "you\'re" is more natural and appropriate in this context.' },
      { letter: 'D', text: 'Your\'e', explanation: 'Incorrect. "Your\'e" is not a word. The correct contraction is "you\'re."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "your" (no apostrophe) for possession, "you\'re" (with apostrophe) for "you are."'
  },
  {
    position: 43,
    title: 'Their vs. They\'re vs. There',
    problem_text: '<u>Their</u> going to announce the winners of the competition tomorrow.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Their" is possessive, but the sentence needs "they\'re" (they are) to form the future progressive tense.' },
      { letter: 'B', text: 'They\'re', explanation: 'Correct. "They\'re" is the contraction of "they are," which is needed to form "they are going to announce."' },
      { letter: 'C', text: 'There', explanation: 'Incorrect. "There" refers to a place or is used in existential constructions, not as "they are."' },
      { letter: 'D', text: 'There\'re', explanation: 'Incorrect. While "there\'re" (there are) is technically a contraction, it doesn\'t fit this sentence\'s meaning.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "their" for possession, "they\'re" for "they are," and "there" for location or existential statements.'
  },

  // MIXED REVIEW (3 questions)
  {
    position: 44,
    title: 'Mixed: Case and Antecedent Agreement',
    problem_text: 'Each student must complete <u>their</u> assignment before <u>them</u> and their partner present.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Each" is singular requiring "his or her," and "them" should be "he or she" as part of the compound subject.' },
      { letter: 'B', text: 'his or her / he or she', explanation: 'Correct. "Each" requires singular "his or her," and the compound subject requires subject pronouns "he or she."' },
      { letter: 'C', text: 'their / they', explanation: 'Incorrect. While "they" is correct for the subject, "their" doesn\'t formally agree with singular "each."' },
      { letter: 'D', text: 'its / it', explanation: 'Incorrect. "Its" and "it" refer to things, not people. Students are people requiring "his or her" and "he or she."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Ensure both proper antecedent agreement (singular with "each") and correct pronoun case (subject pronouns in compound subjects).'
  },
  {
    position: 45,
    title: 'Mixed: Who/Whom and Reference Clarity',
    problem_text: 'The scientist <u>whom</u> made the discovery told reporters that <u>it</u> was unexpected.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Whom" is for objects, but here the pronoun is the subject of "made." Additionally, "it" is vague.' },
      { letter: 'B', text: 'who / the discovery', explanation: 'Correct. "Who" is the subject of "made," and replacing "it" with "the discovery" eliminates ambiguity.' },
      { letter: 'C', text: 'whom / the discovery', explanation: 'Incorrect. While "the discovery" clarifies the reference, "whom" is still incorrect as the subject of "made."' },
      { letter: 'D', text: 'who / it', explanation: 'Incorrect. While "who" is correct, "it" remains ambiguous—it could refer to the discovery or the act of telling.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "who" for subjects and eliminate ambiguous pronouns by using specific nouns.'
  },
  {
    position: 46,
    title: 'Mixed: Reflexive and Possessive',
    problem_text: 'The athletes prepared <u>themselves</u> for the competition by reviewing <u>it\'s</u> rules carefully.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While "themselves" is correct (subject equals object), "it\'s" should be "its" (possessive, no apostrophe).' },
      { letter: 'B', text: 'themselves / its', explanation: 'Correct. "Themselves" is the correct reflexive (athletes prepared athletes), and "its" is the possessive without apostrophe.' },
      { letter: 'C', text: 'them / its', explanation: 'Incorrect. When subject and object are the same, use reflexive pronouns. "Them" should be "themselves."' },
      { letter: 'D', text: 'theirselves / its', explanation: 'Incorrect. "Theirselves" is nonstandard. The correct reflexive form is "themselves."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use reflexive pronouns when subject equals object, and remember "its" (no apostrophe) is possessive.'
  }
];

module.exports = pronounQuestions;
