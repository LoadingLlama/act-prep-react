const verbQuestions = [
  // SUBJECT-VERB AGREEMENT (12 questions)
  {
    position: 1,
    title: 'Subject-Verb Agreement with Prepositional Phrase',
    problem_text: 'The collection of rare stamps <u>are</u> displayed in the museum\'s main gallery.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Are" is plural, but the subject "collection" is singular. The prepositional phrase "of rare stamps" does not affect the verb form.' },
      { letter: 'B', text: 'is', explanation: 'Correct. "Is" agrees with the singular subject "collection." Prepositional phrases like "of rare stamps" do not change subject-verb agreement.' },
      { letter: 'C', text: 'were', explanation: 'Incorrect. "Were" is plural and past tense, but the subject "collection" is singular and the sentence is in present tense.' },
      { letter: 'D', text: 'have been', explanation: 'Incorrect. "Have been" is plural, but the subject "collection" is singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Singular subjects require singular verbs. Prepositional phrases between the subject and verb do not affect agreement.'
  },
  {
    position: 2,
    title: 'Compound Subject with "And"',
    problem_text: 'Sarah and her brother <u>volunteers</u> at the local food bank every Saturday.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Volunteers" is singular, but compound subjects joined by "and" require a plural verb.' },
      { letter: 'B', text: 'volunteer', explanation: 'Correct. When two subjects are joined by "and," they take a plural verb. Both Sarah and her brother perform the action.' },
      { letter: 'C', text: 'has volunteered', explanation: 'Incorrect. "Has volunteered" is singular, but the compound subject requires a plural verb form.' },
      { letter: 'D', text: 'is volunteering', explanation: 'Incorrect. "Is volunteering" is singular, but compound subjects joined by "and" need plural verbs.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Compound subjects joined by "and" require plural verbs because they represent multiple actors.'
  },
  {
    position: 3,
    title: 'Indefinite Pronoun "Everyone"',
    problem_text: 'Everyone in the graduating class <u>have</u> submitted their college applications.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Have" is plural, but "everyone" is a singular indefinite pronoun that requires a singular verb.' },
      { letter: 'B', text: 'has', explanation: 'Correct. "Everyone" is singular, so it requires the singular verb "has." Indefinite pronouns ending in -one, -body, and -thing are always singular.' },
      { letter: 'C', text: 'were', explanation: 'Incorrect. "Were" is plural, but "everyone" is singular despite referring to multiple people.' },
      { letter: 'D', text: 'are', explanation: 'Incorrect. "Are" is plural, but indefinite pronouns like "everyone" are grammatically singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Indefinite pronouns like "everyone," "someone," and "anyone" are singular and require singular verbs.'
  },
  {
    position: 4,
    title: 'Subject-Verb Agreement with Inverted Order',
    problem_text: 'Behind the old barn <u>stands</u> three towering oak trees that provide shade.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Stands" is singular, but the subject "three towering oak trees" is plural. Inverted word order doesn\'t change agreement rules.' },
      { letter: 'B', text: 'stand', explanation: 'Correct. The plural subject "three towering oak trees" requires the plural verb "stand," even when the subject follows the verb.' },
      { letter: 'C', text: 'is standing', explanation: 'Incorrect. "Is standing" is singular, but the subject "trees" is plural.' },
      { letter: 'D', text: 'has stood', explanation: 'Incorrect. "Has stood" is singular, but the subject requires a plural verb form.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In inverted sentences, identify the true subject and ensure the verb agrees with it in number.'
  },
  {
    position: 5,
    title: 'Either/Or Construction',
    problem_text: 'Either the teachers or the principal <u>are</u> responsible for organizing the assembly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. When using "either...or," the verb should agree with the nearest subject. "Principal" is singular, so the verb should be "is."' },
      { letter: 'B', text: 'is', explanation: 'Correct. With "either...or" constructions, the verb agrees with the nearest subject. "Principal" is singular, so "is" is correct.' },
      { letter: 'C', text: 'were', explanation: 'Incorrect. While "were" might seem to agree with "teachers," the verb must agree with the nearest subject, "principal," which is singular.' },
      { letter: 'D', text: 'have been', explanation: 'Incorrect. "Have been" is plural, but the verb should agree with the nearest subject "principal," which is singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In "either...or" constructions, the verb agrees with the subject nearest to it.'
  },
  {
    position: 6,
    title: 'Collective Noun Agreement',
    problem_text: 'The jury <u>were</u> unable to reach a unanimous decision after three days of deliberation.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. In American English, collective nouns acting as a single unit take singular verbs. The jury is acting as one body here.' },
      { letter: 'B', text: 'was', explanation: 'Correct. "Jury" is a collective noun acting as a single unit, so it takes the singular verb "was." The jury is functioning as one entity.' },
      { letter: 'C', text: 'are', explanation: 'Incorrect. While British English sometimes uses plural verbs with collective nouns, American English uses singular verbs when the group acts as one unit.' },
      { letter: 'D', text: 'have been', explanation: 'Incorrect. "Have been" is plural, but collective nouns acting as single units require singular verbs.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Collective nouns take singular verbs when the group acts as a single unit.'
  },
  {
    position: 7,
    title: 'Indefinite Pronoun "Each"',
    problem_text: 'Each of the students <u>have</u> prepared a presentation on environmental conservation.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Have" is plural, but "each" is a singular indefinite pronoun requiring a singular verb.' },
      { letter: 'B', text: 'has', explanation: 'Correct. "Each" is singular, regardless of the plural noun in the prepositional phrase "of the students." It requires the singular verb "has."' },
      { letter: 'C', text: 'are', explanation: 'Incorrect. Though "students" is plural, the subject "each" is singular and needs a singular verb.' },
      { letter: 'D', text: 'were', explanation: 'Incorrect. "Were" is plural, but "each" always takes a singular verb form.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The indefinite pronoun "each" is always singular and requires a singular verb.'
  },
  {
    position: 8,
    title: 'Subject After Relative Clause',
    problem_text: 'The athlete who won several medals <u>train</u> at the Olympic facility every morning.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Train" is plural, but the subject "athlete" is singular and requires a singular verb.' },
      { letter: 'B', text: 'trains', explanation: 'Correct. The subject "athlete" is singular, so it requires the singular verb "trains." The relative clause "who won several medals" does not affect agreement.' },
      { letter: 'C', text: 'are training', explanation: 'Incorrect. "Are training" is plural, but the singular subject "athlete" needs a singular verb.' },
      { letter: 'D', text: 'were training', explanation: 'Incorrect. "Were training" is plural, but the subject "athlete" is singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The verb must agree with the main subject, not with nouns in subordinate clauses.'
  },
  {
    position: 9,
    title: 'Neither/Nor Agreement',
    problem_text: 'Neither the manager nor the employees <u>wants</u> to work overtime during the holidays.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. With "neither...nor," the verb agrees with the nearest subject. "Employees" is plural, so the verb should be "want."' },
      { letter: 'B', text: 'want', explanation: 'Correct. In "neither...nor" constructions, the verb agrees with the nearest subject. "Employees" is plural, requiring "want."' },
      { letter: 'C', text: 'is wanting', explanation: 'Incorrect. "Is wanting" is singular, but the nearest subject "employees" is plural.' },
      { letter: 'D', text: 'has wanted', explanation: 'Incorrect. "Has wanted" is singular, but it must agree with the plural "employees."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'With "neither...nor," the verb agrees with the subject closest to it.'
  },
  {
    position: 10,
    title: 'Indefinite Pronoun "None"',
    problem_text: 'None of the evidence <u>were</u> sufficient to convince the skeptical judge.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. When "none" refers to a singular noun like "evidence," it takes a singular verb. "Were" is plural.' },
      { letter: 'B', text: 'was', explanation: 'Correct. "None" can be singular or plural depending on context. Here it refers to "evidence," which is uncountable and singular, so "was" is correct.' },
      { letter: 'C', text: 'are', explanation: 'Incorrect. "Are" is plural and present tense, but "none" refers to singular "evidence" and the sentence uses past tense.' },
      { letter: 'D', text: 'have been', explanation: 'Incorrect. "Have been" is plural, but "none of the evidence" is treated as singular.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'When "none" refers to a singular or uncountable noun, it takes a singular verb.'
  },
  {
    position: 11,
    title: 'There/Here Construction',
    problem_text: 'There <u>is</u> several compelling reasons to support renewable energy initiatives.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Is" is singular, but the subject "several compelling reasons" is plural and requires "are."' },
      { letter: 'B', text: 'are', explanation: 'Correct. In "there/here" constructions, the verb agrees with the subject that follows. "Several compelling reasons" is plural, requiring "are."' },
      { letter: 'C', text: 'was', explanation: 'Incorrect. "Was" is singular and past tense, but the subject is plural.' },
      { letter: 'D', text: 'has been', explanation: 'Incorrect. "Has been" is singular, but the subject "reasons" is plural.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'In sentences beginning with "there" or "here," the verb agrees with the subject that follows.'
  },
  {
    position: 12,
    title: 'Titles and Names Agreement',
    problem_text: 'The Adventures of Huckleberry Finn <u>remain</u> one of the most studied novels in American literature.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Remain" is plural, but titles of books, movies, and other works are treated as singular, even when they appear plural.' },
      { letter: 'B', text: 'remains', explanation: 'Correct. Titles of works are treated as singular entities, even if they contain plural words. "The Adventures of Huckleberry Finn" requires the singular "remains."' },
      { letter: 'C', text: 'were remaining', explanation: 'Incorrect. "Were remaining" is plural, but book titles are treated as singular.' },
      { letter: 'D', text: 'have remained', explanation: 'Incorrect. "Have remained" is plural, but the title is a singular entity.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Titles of books, movies, and other works are treated as singular, regardless of their internal grammar.'
  },

  // VERB TENSES (12 questions)
  {
    position: 13,
    title: 'Simple Past vs. Present Perfect',
    problem_text: 'Dr. Martinez <u>worked</u> at this hospital for fifteen years and has no plans to retire.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple past "worked" suggests the action is complete. Since Dr. Martinez still works there, present perfect is needed.' },
      { letter: 'B', text: 'has worked', explanation: 'Correct. Present perfect "has worked" indicates an action that began in the past and continues to the present, which matches the context.' },
      { letter: 'C', text: 'is working', explanation: 'Incorrect. Present progressive suggests temporary action, but the fifteen-year duration indicates an ongoing, long-term situation better expressed with present perfect.' },
      { letter: 'D', text: 'works', explanation: 'Incorrect. Simple present doesn\'t effectively convey the fifteen-year duration that continues to the present.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use present perfect for actions that started in the past and continue to the present.'
  },
  {
    position: 14,
    title: 'Past Perfect for Earlier Action',
    problem_text: 'By the time the firefighters arrived, the blaze <u>destroyed</u> most of the building.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple past doesn\'t show that the destruction was completed before the firefighters arrived. Past perfect is needed.' },
      { letter: 'B', text: 'had destroyed', explanation: 'Correct. Past perfect "had destroyed" shows that the destruction was completed before the firefighters arrived (another past action).' },
      { letter: 'C', text: 'was destroying', explanation: 'Incorrect. Past progressive suggests ongoing action, but the context indicates the destruction was complete before arrival.' },
      { letter: 'D', text: 'has destroyed', explanation: 'Incorrect. Present perfect connects to the present, but this sentence describes two completed past events.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use past perfect to show that one past action was completed before another past action.'
  },
  {
    position: 15,
    title: 'Future Tense Consistency',
    problem_text: 'Next semester, students <u>had</u> the opportunity to study abroad in five different countries.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Had" is past tense, but "next semester" indicates future time, requiring a future tense verb.' },
      { letter: 'B', text: 'will have', explanation: 'Correct. "Will have" is future tense, matching the time marker "next semester." This shows an upcoming opportunity.' },
      { letter: 'C', text: 'have', explanation: 'Incorrect. Simple present "have" doesn\'t clearly indicate the future time referenced by "next semester."' },
      { letter: 'D', text: 'are having', explanation: 'Incorrect. Present progressive typically refers to current or immediate future actions, not a clearly future event like next semester.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use future tense with future time markers like "next semester," "tomorrow," or "next year."'
  },
  {
    position: 16,
    title: 'Present Perfect vs. Simple Past',
    problem_text: 'Scientists <u>discovered</u> more than 400 new species in the Amazon rainforest since 2010.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple past suggests a completed action disconnected from the present. "Since 2010" indicates an ongoing timeframe requiring present perfect.' },
      { letter: 'B', text: 'have discovered', explanation: 'Correct. Present perfect "have discovered" is used with "since 2010" to show discoveries from the past continuing to the present.' },
      { letter: 'C', text: 'are discovering', explanation: 'Incorrect. Present progressive focuses on current action but doesn\'t capture the timeframe "since 2010" as effectively as present perfect.' },
      { letter: 'D', text: 'had discovered', explanation: 'Incorrect. Past perfect is used when one past action precedes another, which is not the case here.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use present perfect with "since" or "for" to show actions from the past continuing to the present.'
  },
  {
    position: 17,
    title: 'Narrative Past Consistency',
    problem_text: 'The explorers set up camp, <u>gather</u> firewood, and prepared for the cold night ahead.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Gather" is present tense, but the other verbs "set" and "prepared" are past tense. Consistency requires all past tense.' },
      { letter: 'B', text: 'gathered', explanation: 'Correct. "Gathered" matches the past tense of "set up" and "prepared," maintaining consistent verb tense in the series.' },
      { letter: 'C', text: 'are gathering', explanation: 'Incorrect. Present progressive doesn\'t match the past tense established by "set up" and "prepared."' },
      { letter: 'D', text: 'will gather', explanation: 'Incorrect. Future tense doesn\'t fit with the past tense context of the sentence.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Maintain consistent verb tense when describing a series of actions in the same timeframe.'
  },
  {
    position: 18,
    title: 'Present Progressive for Ongoing Action',
    problem_text: 'The company <u>develops</u> a new software platform right now to meet customer demands.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple present "develops" describes habitual actions. "Right now" indicates an ongoing action requiring present progressive.' },
      { letter: 'B', text: 'is developing', explanation: 'Correct. Present progressive "is developing" shows an action happening currently, which matches "right now."' },
      { letter: 'C', text: 'developed', explanation: 'Incorrect. Past tense doesn\'t match "right now," which indicates present time.' },
      { letter: 'D', text: 'has developed', explanation: 'Incorrect. Present perfect emphasizes completion up to now, but "right now" suggests the action is still in progress.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use present progressive for actions happening at the current moment.'
  },
  {
    position: 19,
    title: 'Future Perfect Tense',
    problem_text: 'By the end of this year, the construction team <u>will complete</u> all renovations on the historic building.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple future "will complete" doesn\'t emphasize that the action will be finished by a specific future time. Future perfect is more precise.' },
      { letter: 'B', text: 'will have completed', explanation: 'Correct. Future perfect "will have completed" shows that the action will be finished before a specific future time ("by the end of this year").' },
      { letter: 'C', text: 'completes', explanation: 'Incorrect. Simple present doesn\'t convey the future timeframe indicated by "by the end of this year."' },
      { letter: 'D', text: 'has completed', explanation: 'Incorrect. Present perfect refers to the present, not a future deadline.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use future perfect to show that an action will be completed before a specific time in the future.'
  },
  {
    position: 20,
    title: 'Past Progressive for Interrupted Action',
    problem_text: 'While the orchestra <u>performed</u>, a fire alarm suddenly disrupted the concert.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple past "performed" doesn\'t emphasize the ongoing nature of the performance that was interrupted. Past progressive is better.' },
      { letter: 'B', text: 'was performing', explanation: 'Correct. Past progressive "was performing" shows an ongoing action in the past that was interrupted by another action (the fire alarm).' },
      { letter: 'C', text: 'has performed', explanation: 'Incorrect. Present perfect connects to the present, but this describes a completed past event.' },
      { letter: 'D', text: 'had performed', explanation: 'Incorrect. Past perfect suggests the performance was completed before the alarm, but the alarm interrupted the performance.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use past progressive to show an ongoing past action that was interrupted by another action.'
  },
  {
    position: 21,
    title: 'Historical Present vs. Simple Past',
    problem_text: 'In 1969, Neil Armstrong <u>becomes</u> the first person to walk on the moon.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While historical present can create immediacy, standard formal writing about historical events uses simple past tense.' },
      { letter: 'B', text: 'became', explanation: 'Correct. Simple past "became" is standard for describing completed historical events. The year 1969 clearly indicates past time.' },
      { letter: 'C', text: 'has become', explanation: 'Incorrect. Present perfect suggests relevance to the present moment, but this describes a specific completed historical event.' },
      { letter: 'D', text: 'is becoming', explanation: 'Incorrect. Present progressive doesn\'t match the completed historical event from 1969.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use simple past tense for completed historical events with specific past time markers.'
  },
  {
    position: 22,
    title: 'Present Perfect Progressive',
    problem_text: 'The researchers <u>study</u> climate patterns in the Arctic for the past decade.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple present doesn\'t capture the duration "for the past decade" or show that the action continues to the present.' },
      { letter: 'B', text: 'have been studying', explanation: 'Correct. Present perfect progressive "have been studying" shows an ongoing action that started in the past and continues, emphasizing duration.' },
      { letter: 'C', text: 'studied', explanation: 'Incorrect. Simple past suggests the studying is finished, but the context implies it continues.' },
      { letter: 'D', text: 'will study', explanation: 'Incorrect. Future tense doesn\'t match "for the past decade," which indicates past to present time.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use present perfect progressive to emphasize the duration of an ongoing action from past to present.'
  },
  {
    position: 23,
    title: 'Conditional Perfect Tense',
    problem_text: 'If the team had practiced more consistently, they <u>won</u> the championship.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Simple past "won" doesn\'t match the past perfect "had practiced" in the if-clause. This requires conditional perfect.' },
      { letter: 'B', text: 'would have won', explanation: 'Correct. Conditional perfect "would have won" is used with past perfect in the if-clause to describe a hypothetical past situation.' },
      { letter: 'C', text: 'will win', explanation: 'Incorrect. Future tense doesn\'t work with past perfect in the if-clause or the hypothetical past context.' },
      { letter: 'D', text: 'would win', explanation: 'Incorrect. This form is used for hypothetical present/future situations, not past situations.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "would have" + past participle to describe hypothetical results of past conditions.'
  },
  {
    position: 24,
    title: 'Time Marker Alignment',
    problem_text: 'Every morning, the baker <u>has prepared</u> fresh bread before the shop opens.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Present perfect suggests a completed action up to now, but "every morning" indicates a habitual action requiring simple present.' },
      { letter: 'B', text: 'prepares', explanation: 'Correct. Simple present "prepares" is used for habitual, repeated actions, which matches "every morning."' },
      { letter: 'C', text: 'prepared', explanation: 'Incorrect. Simple past would describe past habits, but the context suggests this is an ongoing routine.' },
      { letter: 'D', text: 'is preparing', explanation: 'Incorrect. Present progressive describes current action, not the habitual routine indicated by "every morning."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use simple present tense for habitual or repeated actions.'
  },

  // IRREGULAR VERBS (6 questions)
  {
    position: 25,
    title: 'Irregular Past: "Begin"',
    problem_text: 'The ceremony <u>begun</u> promptly at noon with the national anthem.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Begun" is the past participle, which requires a helping verb like "has" or "had." The simple past form is "began."' },
      { letter: 'B', text: 'began', explanation: 'Correct. "Began" is the simple past form of "begin," used without a helping verb for completed past actions.' },
      { letter: 'C', text: 'has begun', explanation: 'Incorrect. Present perfect suggests connection to the present, but the context indicates a completed past event ("at noon").' },
      { letter: 'D', text: 'beginning', explanation: 'Incorrect. "Beginning" is a present participle and cannot function as the main verb without a helping verb.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The simple past of "begin" is "began"; "begun" is the past participle used with helping verbs.'
  },
  {
    position: 26,
    title: 'Irregular Past Participle: "Swim"',
    problem_text: 'The athlete had <u>swam</u> across the English Channel twice before her retirement.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Swam" is the simple past form. With the helping verb "had," the past participle "swum" is required.' },
      { letter: 'B', text: 'swum', explanation: 'Correct. "Swum" is the past participle of "swim," used with helping verbs like "had" in past perfect tense.' },
      { letter: 'C', text: 'swim', explanation: 'Incorrect. The base form "swim" cannot be used with "had" in past perfect tense.' },
      { letter: 'D', text: 'swimming', explanation: 'Incorrect. "Swimming" is the present participle and doesn\'t form past perfect with "had."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use the past participle "swum" (not "swam") with helping verbs in perfect tenses.'
  },
  {
    position: 27,
    title: 'Irregular Past: "Lay" vs. "Lie"',
    problem_text: 'After the long hike, the exhausted travelers <u>laid</u> down to rest in the shade.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Laid" is the past tense of "lay," which requires a direct object. Here, the travelers are reclining themselves, requiring "lay" (past of "lie").' },
      { letter: 'B', text: 'lay', explanation: 'Correct. "Lay" is the past tense of "lie" (to recline). The travelers are reclining, not placing an object, so "lie/lay" is correct.' },
      { letter: 'C', text: 'lied', explanation: 'Incorrect. "Lied" is the past tense of "lie" meaning to tell an untruth, not to recline.' },
      { letter: 'D', text: 'have laid', explanation: 'Incorrect. This uses "laid" from "lay" (to place something), but the sentence needs "lie" (to recline).' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "lie/lay/lain" for reclining without an object; "lay/laid/laid" for placing an object.'
  },
  {
    position: 28,
    title: 'Irregular Past Participle: "Drink"',
    problem_text: 'The hikers should have <u>drank</u> more water before attempting the challenging trail.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Drank" is the simple past form. With "should have," the past participle "drunk" is required.' },
      { letter: 'B', text: 'drunk', explanation: 'Correct. "Drunk" is the past participle of "drink," used with helping verbs like "have" in perfect constructions.' },
      { letter: 'C', text: 'drink', explanation: 'Incorrect. The base form "drink" cannot follow "should have" in this construction.' },
      { letter: 'D', text: 'drinking', explanation: 'Incorrect. "Drinking" is the present participle and doesn\'t form the perfect construction needed here.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use the past participle "drunk" (not "drank") with helping verbs like "have."'
  },
  {
    position: 29,
    title: 'Irregular Past: "Bring" vs. "Take"',
    problem_text: 'Yesterday, I <u>taken</u> my laptop to the repair shop for service.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Taken" is the past participle and requires a helping verb. Also, without a helping verb, the simple past "took" is needed.' },
      { letter: 'B', text: 'took', explanation: 'Correct. "Took" is the simple past tense of "take," used for completed actions. "Take" is appropriate for movement away from the speaker.' },
      { letter: 'C', text: 'have taken', explanation: 'Incorrect. Present perfect doesn\'t match the specific past time marker "yesterday," which requires simple past.' },
      { letter: 'D', text: 'had taken', explanation: 'Incorrect. Past perfect is used when one past action precedes another, which isn\'t the case here.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The simple past of "take" is "took"; "taken" is the past participle requiring a helping verb.'
  },
  {
    position: 30,
    title: 'Irregular Past Participle: "Write"',
    problem_text: 'The novelist has <u>wrote</u> fifteen bestselling books over her impressive career.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Wrote" is the simple past form. With the helping verb "has," the past participle "written" is required.' },
      { letter: 'B', text: 'written', explanation: 'Correct. "Written" is the past participle of "write," used with helping verbs like "has" in present perfect tense.' },
      { letter: 'C', text: 'write', explanation: 'Incorrect. The base form "write" cannot follow "has" in present perfect tense.' },
      { letter: 'D', text: 'writing', explanation: 'Incorrect. "Writing" is the present participle and doesn\'t form present perfect with "has" alone.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use the past participle "written" (not "wrote") with helping verbs in perfect tenses.'
  },

  // VERB CONSISTENCY/PARALLELISM (6 questions)
  {
    position: 31,
    title: 'Parallel Structure in List',
    problem_text: 'The conference will include presenting research findings, <u>to network</u> with colleagues, and attending workshops.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "To network" uses infinitive form while the other items use gerunds ("presenting," "attending"). All items in a list must have parallel structure.' },
      { letter: 'B', text: 'networking', explanation: 'Correct. "Networking" is a gerund that matches the parallel structure of "presenting" and "attending."' },
      { letter: 'C', text: 'network', explanation: 'Incorrect. The base form "network" doesn\'t match the gerund forms used in the rest of the list.' },
      { letter: 'D', text: 'networked', explanation: 'Incorrect. Past tense doesn\'t match the gerund structure or the future context "will include."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Maintain parallel structure by using the same verb form for all items in a series.'
  },
  {
    position: 32,
    title: 'Tense Shift Within Paragraph',
    problem_text: 'The experiment produced surprising results. The scientists recorded their observations carefully and <u>analyze</u> the data thoroughly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Analyze" is present tense, but "produced" and "recorded" are past tense. Consistency requires past tense throughout.' },
      { letter: 'B', text: 'analyzed', explanation: 'Correct. "Analyzed" is past tense, matching "produced" and "recorded." Verb tense should remain consistent when describing events in the same timeframe.' },
      { letter: 'C', text: 'will analyze', explanation: 'Incorrect. Future tense doesn\'t match the past tense established by the other verbs.' },
      { letter: 'D', text: 'are analyzing', explanation: 'Incorrect. Present progressive doesn\'t align with the simple past tense of the other actions.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Maintain consistent verb tense when describing actions in the same time period.'
  },
  {
    position: 33,
    title: 'Parallel Infinitives',
    problem_text: 'The company\'s goals are to increase profits, <u>expanding</u> market share, and to improve customer satisfaction.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Expanding" is a gerund, while "to increase" and "to improve" are infinitives. Parallel structure requires all items to use the same form.' },
      { letter: 'B', text: 'to expand', explanation: 'Correct. "To expand" is an infinitive that matches the parallel structure of "to increase" and "to improve."' },
      { letter: 'C', text: 'expand', explanation: 'Incorrect. While grammatically possible, this breaks the parallel structure established by "to increase" and "to improve."' },
      { letter: 'D', text: 'expanded', explanation: 'Incorrect. Past tense doesn\'t match the infinitive forms or the future-oriented context of goals.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use parallel infinitive forms (to + verb) throughout a series for consistency.'
  },
  {
    position: 34,
    title: 'Consistency in Narrative Time',
    problem_text: 'As the detective examined the evidence, she notices several inconsistencies and <u>decides</u> to investigate further.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Decides" is present tense, but "examined" is past tense. The sentence mixes tenses inappropriately.' },
      { letter: 'B', text: 'decided', explanation: 'Correct. "Decided" is past tense, matching "examined." However, "notices" should also be "noticed" for full consistency (not tested here).' },
      { letter: 'C', text: 'will decide', explanation: 'Incorrect. Future tense doesn\'t fit with the past tense narrative.' },
      { letter: 'D', text: 'is deciding', explanation: 'Incorrect. Present progressive doesn\'t match the past tense context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Keep verb tenses consistent within a narrative describing events in the same time period.'
  },
  {
    position: 35,
    title: 'Parallel Gerunds in Series',
    problem_text: 'Effective studying involves reading the material carefully, <u>to take</u> detailed notes, and reviewing regularly.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "To take" is an infinitive, while "reading" and "reviewing" are gerunds. Parallel structure requires consistent forms.' },
      { letter: 'B', text: 'taking', explanation: 'Correct. "Taking" is a gerund that matches the parallel structure of "reading" and "reviewing."' },
      { letter: 'C', text: 'took', explanation: 'Incorrect. Past tense doesn\'t match the gerund forms or the general truth expressed in the sentence.' },
      { letter: 'D', text: 'take', explanation: 'Incorrect. The base form doesn\'t match the gerund structure of the other items.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use parallel gerund forms (-ing) throughout a series for consistency.'
  },
  {
    position: 36,
    title: 'Correlative Conjunction Parallelism',
    problem_text: 'The program not only teaches technical skills but also <u>fostering</u> creative thinking.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Fostering" is a gerund, but "teaches" is a simple verb. After "not only...but also," both verbs should have the same form.' },
      { letter: 'B', text: 'fosters', explanation: 'Correct. "Fosters" is a simple present verb matching "teaches." Correlative conjunctions require parallel structures.' },
      { letter: 'C', text: 'to foster', explanation: 'Incorrect. Infinitive form doesn\'t match the simple verb "teaches."' },
      { letter: 'D', text: 'fostered', explanation: 'Incorrect. Past tense doesn\'t match the present tense "teaches" or the general truth context.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'With correlative conjunctions like "not only...but also," use parallel verb forms.'
  },

  // ACTIVE VS PASSIVE VOICE (4 questions)
  {
    position: 37,
    title: 'Passive to Active Voice',
    problem_text: 'The groundbreaking discovery <u>was made by</u> Dr. Chen after years of dedicated research.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Passive voice ("was made by") is unnecessarily wordy when the actor (Dr. Chen) is known and important to the sentence.' },
      { letter: 'B', text: 'Dr. Chen made', explanation: 'Correct. Active voice is more direct and concise. "Dr. Chen made" clearly identifies the subject performing the action.' },
      { letter: 'C', text: 'has been made by', explanation: 'Incorrect. This remains passive voice and is still wordier than necessary.' },
      { letter: 'D', text: 'had been made by', explanation: 'Incorrect. Past perfect passive is even more awkward and doesn\'t improve clarity.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use active voice when the actor is known and important; it creates clearer, more concise sentences.'
  },
  {
    position: 38,
    title: 'Appropriate Passive Voice',
    problem_text: 'The ancient ruins <u>archaeologists discovered</u> during the excavation last summer.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. This creates an incomplete sentence. The ruins are receiving the action, so passive voice is appropriate here.' },
      { letter: 'B', text: 'were discovered by archaeologists', explanation: 'Correct. Passive voice is appropriate when the focus is on what was discovered (the ruins) rather than who discovered it.' },
      { letter: 'C', text: 'archaeologists had discovered', explanation: 'Incorrect. This doesn\'t properly connect to "the ancient ruins" as the subject of the sentence.' },
      { letter: 'D', text: 'discovering by archaeologists', explanation: 'Incorrect. This is grammatically incorrect and doesn\'t create a complete sentence.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Passive voice is acceptable when the focus is on the receiver of the action rather than the actor.'
  },
  {
    position: 39,
    title: 'Active Voice Preference',
    problem_text: 'Significant improvements in patient care <u>were implemented by the hospital staff</u> following the new guidelines.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. Passive voice is unnecessarily wordy here. Active voice would be more direct and engaging.' },
      { letter: 'B', text: 'the hospital staff implemented', explanation: 'Correct. Active voice ("the hospital staff implemented") is clearer and more concise than the passive construction.' },
      { letter: 'C', text: 'are being implemented by the hospital staff', explanation: 'Incorrect. This remains passive and creates a tense inconsistency with "following."' },
      { letter: 'D', text: 'had been implemented by the hospital staff', explanation: 'Incorrect. Past perfect passive is unnecessarily complex and remains passive.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Prefer active voice for clearer, more direct communication when the actor is important.'
  },
  {
    position: 40,
    title: 'Scientific Passive Voice',
    problem_text: 'In the experiment, <u>we heated</u> the solution to 100 degrees Celsius and recorded the results.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. In formal scientific writing, passive voice is often preferred to maintain objectivity and focus on the process rather than the researcher.' },
      { letter: 'B', text: 'the solution was heated', explanation: 'Correct. Passive voice is appropriate in scientific contexts to emphasize the experimental procedure rather than the experimenter.' },
      { letter: 'C', text: 'the heating of the solution occurred', explanation: 'Incorrect. While this avoids "we," it\'s awkward and less clear than simple passive voice.' },
      { letter: 'D', text: 'one heated the solution', explanation: 'Incorrect. Using "one" is overly formal and less common in scientific writing than passive voice.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Passive voice is acceptable and often preferred in scientific writing to emphasize procedures over researchers.'
  },

  // SUBJUNCTIVE MOOD (3 questions)
  {
    position: 41,
    title: 'Subjunctive with "Recommend"',
    problem_text: 'The committee recommends that each student <u>submits</u> their project proposal by Friday.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. After verbs like "recommend," "suggest," and "request," use the subjunctive mood, which requires the base form "submit" without the -s.' },
      { letter: 'B', text: 'submit', explanation: 'Correct. The subjunctive mood uses the base form "submit" after verbs of recommendation, suggestion, or requirement.' },
      { letter: 'C', text: 'submitted', explanation: 'Incorrect. Past tense is not appropriate here; the subjunctive requires the base form.' },
      { letter: 'D', text: 'will submit', explanation: 'Incorrect. Future tense is unnecessary; the subjunctive uses the base form to express the recommendation.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After verbs like "recommend," "suggest," or "require," use the subjunctive mood (base form of the verb).'
  },
  {
    position: 42,
    title: 'Subjunctive in "If" Clause',
    problem_text: 'If the scholarship <u>was</u> available to all students, more people would apply for financial aid.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. For hypothetical or contrary-to-fact conditions, the subjunctive "were" should be used instead of "was."' },
      { letter: 'B', text: 'were', explanation: 'Correct. The subjunctive "were" is used in hypothetical or contrary-to-fact conditions, regardless of the subject being singular or plural.' },
      { letter: 'C', text: 'is', explanation: 'Incorrect. Present tense doesn\'t express the hypothetical nature of the condition.' },
      { letter: 'D', text: 'will be', explanation: 'Incorrect. Future tense doesn\'t work with the conditional "would apply" in the main clause.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use "were" (not "was") in hypothetical or contrary-to-fact conditions, even with singular subjects.'
  },
  {
    position: 43,
    title: 'Subjunctive with "Insist"',
    problem_text: 'The coach insists that every player <u>arrives</u> at practice thirty minutes early.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. After "insist," use the subjunctive mood with the base form "arrive" (without -s), not the indicative "arrives."' },
      { letter: 'B', text: 'arrive', explanation: 'Correct. The subjunctive mood requires the base form "arrive" after verbs like "insist," even with singular subjects.' },
      { letter: 'C', text: 'arrived', explanation: 'Incorrect. Past tense is not appropriate; the subjunctive requires the base form.' },
      { letter: 'D', text: 'should arrive', explanation: 'Incorrect. While "should arrive" conveys similar meaning, the proper subjunctive form is simply "arrive."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'After verbs like "insist," "demand," or "require," use the subjunctive (base form without -s).'
  },

  // MIXED REVIEW (3 questions)
  {
    position: 44,
    title: 'Mixed: Agreement and Tense',
    problem_text: 'Each of the musicians <u>have practiced</u> their parts diligently since the beginning of the semester.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Have" is plural, but "each" is singular. Additionally, with "since," present perfect is correct, but needs singular "has."' },
      { letter: 'B', text: 'has practiced', explanation: 'Correct. "Has practiced" provides both singular agreement with "each" and appropriate present perfect tense with "since."' },
      { letter: 'C', text: 'practiced', explanation: 'Incorrect. Simple past doesn\'t work with "since," which requires present perfect. Also needs singular form.' },
      { letter: 'D', text: 'are practicing', explanation: 'Incorrect. Present progressive is plural and doesn\'t effectively express the timeframe "since the beginning."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Ensure both subject-verb agreement (singular "each") and appropriate tense (present perfect with "since").'
  },
  {
    position: 45,
    title: 'Mixed: Irregular Verb and Voice',
    problem_text: 'The championship trophy <u>was brought by</u> the team to their hometown parade.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. While "brought" is the correct past participle of "bring," passive voice is unnecessarily wordy here.' },
      { letter: 'B', text: 'the team brought', explanation: 'Correct. Active voice is clearer and more concise. "Brought" is the correct past tense of the irregular verb "bring."' },
      { letter: 'C', text: 'was brung by', explanation: 'Incorrect. "Brung" is nonstandard. The past tense and past participle of "bring" is "brought."' },
      { letter: 'D', text: 'the team had brung', explanation: 'Incorrect. "Brung" is nonstandard, and past perfect is unnecessary here.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Use active voice for clarity and the correct irregular form "brought" (not "brung").'
  },
  {
    position: 46,
    title: 'Mixed: Parallelism and Subjunctive',
    problem_text: 'The professor requires that students complete the readings, <u>participating</u> in discussions, and submit assignments on time.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: 'Incorrect. "Participating" breaks parallel structure with "complete" and "submit." Also, after "requires that," subjunctive mood uses base forms.' },
      { letter: 'B', text: 'participate', explanation: 'Correct. "Participate" maintains parallel structure with "complete" and "submit," and uses proper subjunctive mood (base form) after "requires that."' },
      { letter: 'C', text: 'participates', explanation: 'Incorrect. While this might seem correct, subjunctive mood after "requires that" uses the base form without -s.' },
      { letter: 'D', text: 'to participate', explanation: 'Incorrect. Infinitive form breaks parallel structure with "complete" and "submit."' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Maintain parallel structure using base forms, which also satisfies the subjunctive mood after "requires that."'
  }
];

module.exports = verbQuestions;
