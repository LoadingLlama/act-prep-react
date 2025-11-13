module.exports = [
  // Lists with mixed verb forms (gerunds, infinitives, base forms) - 12 questions
  {
    position: 1,
    title: "Gerund Consistency in List",
    problem_text: "Sarah enjoys <u>reading novels, to watch movies, and listening to podcasts</u> in her free time.",
    choices: [
      {
        letter: "A",
        text: "reading novels, to watch movies, and listening to podcasts",
        explanation: "Incorrect. This mixes gerunds ('reading,' 'listening') with an infinitive ('to watch'), creating a parallel structure error."
      },
      {
        letter: "B",
        text: "reading novels, watching movies, and listening to podcasts",
        explanation: "Correct. All three items use gerunds ('reading,' 'watching,' 'listening'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "to read novels, watching movies, and listening to podcasts",
        explanation: "Incorrect. This mixes an infinitive ('to read') with gerunds ('watching,' 'listening'), breaking parallel structure."
      },
      {
        letter: "D",
        text: "reading novels, watching movies, and to listen to podcasts",
        explanation: "Incorrect. This mixes gerunds ('reading,' 'watching') with an infinitive ('to listen'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Items in a list must use the same grammatical form. Since 'enjoys' is followed by gerunds, all activities should be in gerund form."
  },
  {
    position: 2,
    title: "Infinitive Consistency in Series",
    problem_text: "The committee plans <u>to review the proposal, discussing the budget, and to vote on the issue</u> tomorrow.",
    choices: [
      {
        letter: "A",
        text: "to review the proposal, discussing the budget, and to vote on the issue",
        explanation: "Incorrect. This mixes infinitives ('to review,' 'to vote') with a gerund ('discussing'), creating a parallel structure error."
      },
      {
        letter: "B",
        text: "to review the proposal, to discuss the budget, and to vote on the issue",
        explanation: "Correct. All three items use infinitives ('to review,' 'to discuss,' 'to vote'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "reviewing the proposal, to discuss the budget, and voting on the issue",
        explanation: "Incorrect. This mixes gerunds ('reviewing,' 'voting') with an infinitive ('to discuss'), breaking parallel structure."
      },
      {
        letter: "D",
        text: "review the proposal, to discuss the budget, and vote on the issue",
        explanation: "Incorrect. This mixes base forms ('review,' 'vote') with an infinitive ('to discuss'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "After 'plans,' infinitives are appropriate. All items in the list must maintain the same infinitive form for parallelism."
  },
  {
    position: 3,
    title: "Base Form Verb Consistency",
    problem_text: "Good teachers <u>explain concepts clearly, encourage student participation, and are patient</u> with learners.",
    choices: [
      {
        letter: "A",
        text: "explain concepts clearly, encourage student participation, and are patient",
        explanation: "Incorrect. This mixes base verb forms ('explain,' 'encourage') with a linking verb phrase ('are patient'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "explain concepts clearly, encourage student participation, and demonstrate patience",
        explanation: "Correct. All three items use base verb forms ('explain,' 'encourage,' 'demonstrate'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "explaining concepts clearly, encourage student participation, and demonstrate patience",
        explanation: "Incorrect. This mixes a gerund ('explaining') with base verbs ('encourage,' 'demonstrate'), violating parallel structure."
      },
      {
        letter: "D",
        text: "explain concepts clearly, encouraging student participation, and demonstrate patience",
        explanation: "Incorrect. This mixes base verbs ('explain,' 'demonstrate') with a gerund ('encouraging'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "In a list describing what teachers do, all verbs should be in the same base form to maintain parallelism."
  },
  {
    position: 4,
    title: "Gerund List After Preposition",
    problem_text: "The job description emphasizes <u>writing reports, to communicate with clients, and managing projects</u> effectively.",
    choices: [
      {
        letter: "A",
        text: "writing reports, to communicate with clients, and managing projects",
        explanation: "Incorrect. This mixes gerunds ('writing,' 'managing') with an infinitive ('to communicate'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "to write reports, communicating with clients, and managing projects",
        explanation: "Incorrect. This mixes an infinitive ('to write') with gerunds ('communicating,' 'managing'), violating parallel structure."
      },
      {
        letter: "C",
        text: "writing reports, communicating with clients, and managing projects",
        explanation: "Correct. All three items use gerunds ('writing,' 'communicating,' 'managing'), maintaining parallel structure."
      },
      {
        letter: "D",
        text: "write reports, communicate with clients, and managing projects",
        explanation: "Incorrect. This mixes base verbs ('write,' 'communicate') with a gerund ('managing'), creating a parallel structure error."
      }
    ],
    correct_answer: "C",
    answer_explanation: "After 'emphasizes,' gerunds are the appropriate form. All items in the list must use gerunds for parallelism."
  },
  {
    position: 5,
    title: "Infinitive Form After Modal Verb",
    problem_text: "To succeed in college, students must <u>attend classes regularly, completing assignments on time, and to participate actively</u> in discussions.",
    choices: [
      {
        letter: "A",
        text: "attend classes regularly, completing assignments on time, and to participate actively",
        explanation: "Incorrect. This mixes base forms ('attend') with a gerund ('completing') and an infinitive ('to participate'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "attend classes regularly, complete assignments on time, and participate actively",
        explanation: "Correct. All three items use base verb forms ('attend,' 'complete,' 'participate'), which is correct after the modal 'must.'"
      },
      {
        letter: "C",
        text: "attending classes regularly, complete assignments on time, and participate actively",
        explanation: "Incorrect. This mixes a gerund ('attending') with base verbs ('complete,' 'participate'), violating parallel structure."
      },
      {
        letter: "D",
        text: "to attend classes regularly, completing assignments on time, and participate actively",
        explanation: "Incorrect. This mixes an infinitive ('to attend'), a gerund ('completing'), and a base verb ('participate'), creating multiple parallel structure errors."
      }
    ],
    correct_answer: "B",
    answer_explanation: "After a modal verb like 'must,' base forms (without 'to') are required. All verbs in the series must be in base form."
  },
  {
    position: 6,
    title: "Gerund Consistency After Verb",
    problem_text: "Marcus recommends <u>stretching before exercise, to drink plenty of water, and getting adequate rest</u> for optimal performance.",
    choices: [
      {
        letter: "A",
        text: "stretching before exercise, to drink plenty of water, and getting adequate rest",
        explanation: "Incorrect. This mixes gerunds ('stretching,' 'getting') with an infinitive ('to drink'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "to stretch before exercise, drinking plenty of water, and getting adequate rest",
        explanation: "Incorrect. This mixes an infinitive ('to stretch') with gerunds ('drinking,' 'getting'), violating parallel structure."
      },
      {
        letter: "C",
        text: "stretching before exercise, drinking plenty of water, and getting adequate rest",
        explanation: "Correct. All three items use gerunds ('stretching,' 'drinking,' 'getting'), maintaining parallel structure."
      },
      {
        letter: "D",
        text: "stretch before exercise, drink plenty of water, and getting adequate rest",
        explanation: "Incorrect. This mixes base verbs ('stretch,' 'drink') with a gerund ('getting'), creating a parallel structure error."
      }
    ],
    correct_answer: "C",
    answer_explanation: "The verb 'recommends' is followed by gerunds. All items in the list must use the gerund form for parallelism."
  },
  {
    position: 7,
    title: "Mixed Verb Forms in Hobbies",
    problem_text: "Emma's hobbies include <u>painting landscapes, to photograph wildlife, and sculpting with clay</u>.",
    choices: [
      {
        letter: "A",
        text: "painting landscapes, to photograph wildlife, and sculpting with clay",
        explanation: "Incorrect. This mixes gerunds ('painting,' 'sculpting') with an infinitive ('to photograph'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "painting landscapes, photographing wildlife, and sculpting with clay",
        explanation: "Correct. All three items use gerunds ('painting,' 'photographing,' 'sculpting'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "to paint landscapes, photographing wildlife, and sculpting with clay",
        explanation: "Incorrect. This mixes an infinitive ('to paint') with gerunds ('photographing,' 'sculpting'), violating parallel structure."
      },
      {
        letter: "D",
        text: "painting landscapes, photographing wildlife, and to sculpt with clay",
        explanation: "Incorrect. This mixes gerunds ('painting,' 'photographing') with an infinitive ('to sculpt'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "After 'include,' gerunds are appropriate. All hobbies listed must be in gerund form to maintain parallelism."
  },
  {
    position: 8,
    title: "Infinitive List After Adjective",
    problem_text: "The new software is easy <u>to install, learning, and to use</u> for beginners.",
    choices: [
      {
        letter: "A",
        text: "to install, learning, and to use",
        explanation: "Incorrect. This mixes infinitives ('to install,' 'to use') with a gerund ('learning'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "to install, to learn, and to use",
        explanation: "Correct. All three items use infinitives ('to install,' 'to learn,' 'to use'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "installing, to learn, and using",
        explanation: "Incorrect. This mixes gerunds ('installing,' 'using') with an infinitive ('to learn'), violating parallel structure."
      },
      {
        letter: "D",
        text: "to install, learn, and to use",
        explanation: "Incorrect. This mixes infinitives ('to install,' 'to use') with a base verb ('learn'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "After 'easy,' infinitives are the standard form. All items in the series must use infinitives for parallelism."
  },
  {
    position: 9,
    title: "Gerund Consistency in Activities",
    problem_text: "The workshop focuses on <u>developing leadership skills, to build team cohesion, and improving communication</u>.",
    choices: [
      {
        letter: "A",
        text: "developing leadership skills, to build team cohesion, and improving communication",
        explanation: "Incorrect. This mixes gerunds ('developing,' 'improving') with an infinitive ('to build'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "developing leadership skills, building team cohesion, and improving communication",
        explanation: "Correct. All three items use gerunds ('developing,' 'building,' 'improving'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "to develop leadership skills, building team cohesion, and improving communication",
        explanation: "Incorrect. This mixes an infinitive ('to develop') with gerunds ('building,' 'improving'), violating parallel structure."
      },
      {
        letter: "D",
        text: "develop leadership skills, build team cohesion, and improving communication",
        explanation: "Incorrect. This mixes base verbs ('develop,' 'build') with a gerund ('improving'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "The preposition 'on' is followed by gerunds. All items in the list must use gerund form for parallelism."
  },
  {
    position: 10,
    title: "Base Verb Forms After Auxiliary",
    problem_text: "The athlete will <u>train daily, eating a balanced diet, and to get sufficient sleep</u> before the competition.",
    choices: [
      {
        letter: "A",
        text: "train daily, eating a balanced diet, and to get sufficient sleep",
        explanation: "Incorrect. This mixes a base verb ('train'), a gerund ('eating'), and an infinitive ('to get'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "train daily, eat a balanced diet, and get sufficient sleep",
        explanation: "Correct. All three items use base verb forms ('train,' 'eat,' 'get'), which is correct after the auxiliary 'will.'"
      },
      {
        letter: "C",
        text: "training daily, eat a balanced diet, and get sufficient sleep",
        explanation: "Incorrect. This mixes a gerund ('training') with base verbs ('eat,' 'get'), violating parallel structure."
      },
      {
        letter: "D",
        text: "train daily, eat a balanced diet, and to get sufficient sleep",
        explanation: "Incorrect. This mixes base verbs ('train,' 'eat') with an infinitive ('to get'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "After the auxiliary verb 'will,' base forms (without 'to') are required. All verbs must be in base form for parallelism."
  },
  {
    position: 11,
    title: "Infinitive Series After Main Verb",
    problem_text: "The organization aims <u>to reduce waste, promoting sustainability, and to educate the public</u> about environmental issues.",
    choices: [
      {
        letter: "A",
        text: "to reduce waste, promoting sustainability, and to educate the public",
        explanation: "Incorrect. This mixes infinitives ('to reduce,' 'to educate') with a gerund ('promoting'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "to reduce waste, to promote sustainability, and to educate the public",
        explanation: "Correct. All three items use infinitives ('to reduce,' 'to promote,' 'to educate'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "reducing waste, to promote sustainability, and educating the public",
        explanation: "Incorrect. This mixes gerunds ('reducing,' 'educating') with an infinitive ('to promote'), violating parallel structure."
      },
      {
        letter: "D",
        text: "to reduce waste, promote sustainability, and to educate the public",
        explanation: "Incorrect. This mixes infinitives ('to reduce,' 'to educate') with a base verb ('promote'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "The verb 'aims' is followed by infinitives. All items in the series must use infinitive form for parallelism."
  },
  {
    position: 12,
    title: "Gerund List After Possessive",
    problem_text: "The manager's responsibilities involve <u>scheduling meetings, to review performance reports, and coordinating team activities</u>.",
    choices: [
      {
        letter: "A",
        text: "scheduling meetings, to review performance reports, and coordinating team activities",
        explanation: "Incorrect. This mixes gerunds ('scheduling,' 'coordinating') with an infinitive ('to review'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "to schedule meetings, reviewing performance reports, and coordinating team activities",
        explanation: "Incorrect. This mixes an infinitive ('to schedule') with gerunds ('reviewing,' 'coordinating'), violating parallel structure."
      },
      {
        letter: "C",
        text: "scheduling meetings, reviewing performance reports, and coordinating team activities",
        explanation: "Correct. All three items use gerunds ('scheduling,' 'reviewing,' 'coordinating'), maintaining parallel structure."
      },
      {
        letter: "D",
        text: "schedule meetings, review performance reports, and coordinating team activities",
        explanation: "Incorrect. This mixes base verbs ('schedule,' 'review') with a gerund ('coordinating'), creating a parallel structure error."
      }
    ],
    correct_answer: "C",
    answer_explanation: "The verb 'involve' is followed by gerunds. All items in the list must use gerund form for parallelism."
  },

  // Lists with mixed parts of speech (nouns, adjectives, phrases) - 8 questions
  {
    position: 13,
    title: "Adjective Consistency in Description",
    problem_text: "The restaurant is known for its <u>delicious food, friendly service, and an atmosphere that is cozy</u>.",
    choices: [
      {
        letter: "A",
        text: "delicious food, friendly service, and an atmosphere that is cozy",
        explanation: "Incorrect. This mixes adjective-noun pairs ('delicious food,' 'friendly service') with a noun clause ('an atmosphere that is cozy'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "delicious food, friendly service, and cozy atmosphere",
        explanation: "Correct. All three items use the same adjective-noun structure, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "food that is delicious, friendly service, and cozy atmosphere",
        explanation: "Incorrect. This mixes a noun clause ('food that is delicious') with adjective-noun pairs ('friendly service,' 'cozy atmosphere'), violating parallel structure."
      },
      {
        letter: "D",
        text: "delicious food, service that is friendly, and cozy atmosphere",
        explanation: "Incorrect. This mixes adjective-noun pairs with a noun clause, creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "All items in a list should follow the same grammatical pattern. Here, adjective-noun pairs create parallelism."
  },
  {
    position: 14,
    title: "Noun Phrase Parallelism",
    problem_text: "The course covers <u>the history of art, analyzing contemporary works, and techniques used in sculpture</u>.",
    choices: [
      {
        letter: "A",
        text: "the history of art, analyzing contemporary works, and techniques used in sculpture",
        explanation: "Incorrect. This mixes noun phrases ('the history of art,' 'techniques used in sculpture') with a gerund phrase ('analyzing contemporary works'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "the history of art, the analysis of contemporary works, and the techniques used in sculpture",
        explanation: "Correct. All three items are noun phrases beginning with 'the,' maintaining parallel structure."
      },
      {
        letter: "C",
        text: "art history, analyzing contemporary works, and sculptural techniques",
        explanation: "Incorrect. This mixes compound nouns ('art history,' 'sculptural techniques') with a gerund phrase ('analyzing contemporary works'), violating parallel structure."
      },
      {
        letter: "D",
        text: "the history of art, contemporary work analysis, and techniques used in sculpture",
        explanation: "Incorrect. While all are noun phrases, the middle item has a different structure than the others, weakening parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Items in a list should have matching structures. Noun phrases with parallel constructions maintain consistency."
  },
  {
    position: 15,
    title: "Adjective Series Consistency",
    problem_text: "The ideal candidate should be <u>reliable, having creativity, and organized</u> in their work habits.",
    choices: [
      {
        letter: "A",
        text: "reliable, having creativity, and organized",
        explanation: "Incorrect. This mixes adjectives ('reliable,' 'organized') with a participial phrase ('having creativity'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "reliable, creative, and organized",
        explanation: "Correct. All three items are adjectives ('reliable,' 'creative,' 'organized'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "having reliability, creative, and organized",
        explanation: "Incorrect. This mixes a participial phrase ('having reliability') with adjectives ('creative,' 'organized'), violating parallel structure."
      },
      {
        letter: "D",
        text: "reliable, creative, and showing organization",
        explanation: "Incorrect. This mixes adjectives ('reliable,' 'creative') with a participial phrase ('showing organization'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "When listing qualities, all items should be in the same grammatical form—in this case, adjectives."
  },
  {
    position: 16,
    title: "Noun List Parallelism",
    problem_text: "The museum's collection includes <u>paintings from the Renaissance, sculptures that are classical, and modern photography</u>.",
    choices: [
      {
        letter: "A",
        text: "paintings from the Renaissance, sculptures that are classical, and modern photography",
        explanation: "Incorrect. This mixes noun phrases with prepositional phrases ('paintings from the Renaissance') and adjective-noun structures ('modern photography') with a noun clause ('sculptures that are classical'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "Renaissance paintings, classical sculptures, and modern photography",
        explanation: "Correct. All three items follow the same adjective-noun structure, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "paintings from the Renaissance, classical sculptures, and photography that is modern",
        explanation: "Incorrect. This mixes different noun phrase structures, violating parallel structure."
      },
      {
        letter: "D",
        text: "Renaissance paintings, sculptures that are classical, and modern photography",
        explanation: "Incorrect. This mixes adjective-noun pairs with a noun clause, creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Parallel structure requires consistent grammatical patterns. Adjective-noun pairs create the clearest parallelism here."
  },
  {
    position: 17,
    title: "Mixed Descriptive Elements",
    problem_text: "The presentation was <u>informative, engaging the audience, and with good organization</u>.",
    choices: [
      {
        letter: "A",
        text: "informative, engaging the audience, and with good organization",
        explanation: "Incorrect. This mixes an adjective ('informative'), a participial phrase ('engaging the audience'), and a prepositional phrase ('with good organization'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "informative, engaging, and well-organized",
        explanation: "Correct. All three items are adjectives, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "informative, it engaged the audience, and well-organized",
        explanation: "Incorrect. This mixes adjectives ('informative,' 'well-organized') with an independent clause ('it engaged the audience'), violating parallel structure."
      },
      {
        letter: "D",
        text: "providing information, engaging, and well-organized",
        explanation: "Incorrect. This mixes a participial phrase ('providing information') with adjectives ('engaging,' 'well-organized'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "When describing characteristics, all items should be in the same form. Adjectives create the most effective parallel structure."
  },
  {
    position: 18,
    title: "Prepositional Phrase Parallelism",
    problem_text: "The company succeeded through <u>innovation in technology, their dedication to quality, and by focusing on customers</u>.",
    choices: [
      {
        letter: "A",
        text: "innovation in technology, their dedication to quality, and by focusing on customers",
        explanation: "Incorrect. This mixes noun phrases ('innovation in technology,' 'their dedication to quality') with a prepositional phrase ('by focusing on customers'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "innovation in technology, dedication to quality, and focus on customers",
        explanation: "Correct. All three items are noun phrases with prepositional phrases, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "innovating in technology, dedication to quality, and focus on customers",
        explanation: "Incorrect. This mixes a gerund phrase ('innovating in technology') with noun phrases ('dedication to quality,' 'focus on customers'), violating parallel structure."
      },
      {
        letter: "D",
        text: "innovation in technology, being dedicated to quality, and focus on customers",
        explanation: "Incorrect. This mixes noun phrases with a participial phrase ('being dedicated to quality'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "All items should follow the same pattern. Noun phrases with parallel prepositional phrases maintain consistency."
  },
  {
    position: 19,
    title: "Attribute List Consistency",
    problem_text: "The new policy is <u>comprehensive, it is fair, and practical</u> for all employees.",
    choices: [
      {
        letter: "A",
        text: "comprehensive, it is fair, and practical",
        explanation: "Incorrect. This mixes adjectives ('comprehensive,' 'practical') with an independent clause ('it is fair'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "comprehensive, fair, and practical",
        explanation: "Correct. All three items are adjectives, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "being comprehensive, fair, and practical",
        explanation: "Incorrect. While this maintains parallelism among the adjectives, adding 'being' creates an awkward construction that differs from standard usage."
      },
      {
        letter: "D",
        text: "comprehensive, having fairness, and practical",
        explanation: "Incorrect. This mixes adjectives ('comprehensive,' 'practical') with a participial phrase ('having fairness'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Predicate adjectives following a linking verb should all be in simple adjective form for parallelism."
  },
  {
    position: 20,
    title: "Noun Phrase Structure Matching",
    problem_text: "Success requires <u>hard work, being persistent, and having a positive attitude</u>.",
    choices: [
      {
        letter: "A",
        text: "hard work, being persistent, and having a positive attitude",
        explanation: "Incorrect. This mixes a noun phrase ('hard work') with participial phrases ('being persistent,' 'having a positive attitude'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "hard work, persistence, and a positive attitude",
        explanation: "Correct. All three items are noun phrases, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "working hard, persistence, and a positive attitude",
        explanation: "Incorrect. This mixes a gerund phrase ('working hard') with noun phrases ('persistence,' 'a positive attitude'), violating parallel structure."
      },
      {
        letter: "D",
        text: "hard work, persistence, and being positive in attitude",
        explanation: "Incorrect. This mixes noun phrases ('hard work,' 'persistence') with a participial phrase ('being positive in attitude'), creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Items in a list should have the same grammatical structure. Simple noun phrases create effective parallelism."
  },

  // Correlative conjunctions (either...or, neither...nor, not only...but also, both...and) - 10 questions
  {
    position: 21,
    title: "Either...Or with Verb Forms",
    problem_text: "Students can <u>either complete the essay or to give a presentation</u> for their final project.",
    choices: [
      {
        letter: "A",
        text: "either complete the essay or to give a presentation",
        explanation: "Incorrect. This mixes a base verb ('complete') with an infinitive ('to give') after the correlative conjunction, breaking parallel structure."
      },
      {
        letter: "B",
        text: "either complete the essay or give a presentation",
        explanation: "Correct. Both options use base verb forms ('complete,' 'give'), maintaining parallel structure with the correlative conjunction 'either...or.'"
      },
      {
        letter: "C",
        text: "either completing the essay or give a presentation",
        explanation: "Incorrect. This mixes a gerund ('completing') with a base verb ('give'), violating parallel structure."
      },
      {
        letter: "D",
        text: "complete either the essay or to give a presentation",
        explanation: "Incorrect. This misplaces 'either' and mixes a noun phrase ('the essay') with an infinitive phrase ('to give a presentation'), creating parallel structure errors."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Correlative conjunctions require parallel elements. Both parts of 'either...or' must have the same grammatical form."
  },
  {
    position: 22,
    title: "Neither...Nor with Adjectives",
    problem_text: "The solution was <u>neither efficient nor was it cost-effective</u> for the company.",
    choices: [
      {
        letter: "A",
        text: "neither efficient nor was it cost-effective",
        explanation: "Incorrect. This mixes an adjective ('efficient') with a clause ('was it cost-effective'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "neither efficient nor cost-effective",
        explanation: "Correct. Both elements are adjectives ('efficient,' 'cost-effective'), maintaining parallel structure with 'neither...nor.'"
      },
      {
        letter: "C",
        text: "not efficient nor cost-effective",
        explanation: "Incorrect. While parallel in form, 'not...nor' is not the correct correlative conjunction; 'neither...nor' is required."
      },
      {
        letter: "D",
        text: "neither showing efficiency nor cost-effective",
        explanation: "Incorrect. This mixes a participial phrase ('showing efficiency') with an adjective ('cost-effective'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "With 'neither...nor,' both elements must have identical grammatical structure—in this case, both should be adjectives."
  },
  {
    position: 23,
    title: "Not Only...But Also with Phrases",
    problem_text: "The program <u>not only teaches technical skills but also how to work in teams</u>.",
    choices: [
      {
        letter: "A",
        text: "not only teaches technical skills but also how to work in teams",
        explanation: "Incorrect. This mixes a verb phrase ('teaches technical skills') with a noun clause ('how to work in teams'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "not only teaches technical skills but also teaches teamwork",
        explanation: "Correct. Both elements use the same verb structure ('teaches technical skills,' 'teaches teamwork'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "teaches not only technical skills but also how to work in teams",
        explanation: "Incorrect. This mixes a noun phrase ('technical skills') with a noun clause ('how to work in teams'), violating parallel structure."
      },
      {
        letter: "D",
        text: "not only is teaching technical skills but also teamwork",
        explanation: "Incorrect. This creates an awkward progressive construction and mixes structures, breaking parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "The correlative conjunction 'not only...but also' requires parallel grammatical structures following each element."
  },
  {
    position: 24,
    title: "Both...And with Noun Phrases",
    problem_text: "The research examined <u>both the effects of pollution and how climate change impacts ecosystems</u>.",
    choices: [
      {
        letter: "A",
        text: "both the effects of pollution and how climate change impacts ecosystems",
        explanation: "Incorrect. This mixes a noun phrase ('the effects of pollution') with a noun clause ('how climate change impacts ecosystems'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "both the effects of pollution and the impacts of climate change on ecosystems",
        explanation: "Correct. Both elements are noun phrases with parallel structure ('the effects of pollution,' 'the impacts of climate change on ecosystems')."
      },
      {
        letter: "C",
        text: "the effects of both pollution and how climate change impacts ecosystems",
        explanation: "Incorrect. Misplacing 'both' creates a structure that mixes a noun ('pollution') with a clause ('how climate change impacts ecosystems')."
      },
      {
        letter: "D",
        text: "both pollution's effects and how climate change impacts ecosystems",
        explanation: "Incorrect. This mixes a possessive noun phrase with a noun clause, violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "With 'both...and,' the elements following each conjunction must have matching grammatical structures."
  },
  {
    position: 25,
    title: "Either...Or with Prepositional Phrases",
    problem_text: "You can submit your application <u>either by email or faxing it</u> to our office.",
    choices: [
      {
        letter: "A",
        text: "either by email or faxing it",
        explanation: "Incorrect. This mixes a prepositional phrase ('by email') with a gerund phrase ('faxing it'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "either by email or by fax",
        explanation: "Correct. Both elements are prepositional phrases with the same structure ('by email,' 'by fax'), maintaining parallelism."
      },
      {
        letter: "C",
        text: "by either email or faxing it",
        explanation: "Incorrect. Misplacing 'either' and mixing a noun ('email') with a gerund phrase ('faxing it') creates parallel structure errors."
      },
      {
        letter: "D",
        text: "either by sending an email or fax",
        explanation: "Incorrect. This mixes a prepositional phrase with a gerund ('by sending an email') with a simple noun ('fax'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Correlative conjunctions require parallel elements. Both parts of 'either...or' should use matching prepositional phrases."
  },
  {
    position: 26,
    title: "Not Only...But Also with Clauses",
    problem_text: "The new policy <u>not only reduces costs but also it improves efficiency</u> throughout the organization.",
    choices: [
      {
        letter: "A",
        text: "not only reduces costs but also it improves efficiency",
        explanation: "Incorrect. Adding the pronoun 'it' after 'but also' creates an imbalance; the first part has just the verb while the second has a subject and verb."
      },
      {
        letter: "B",
        text: "not only reduces costs but also improves efficiency",
        explanation: "Correct. Both elements use the same verb structure without redundant subjects, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "reduces not only costs but also it improves efficiency",
        explanation: "Incorrect. Misplacing 'not only' and adding 'it' creates structural imbalance and breaks parallelism."
      },
      {
        letter: "D",
        text: "not only is reducing costs but also improves efficiency",
        explanation: "Incorrect. This mixes a progressive verb form ('is reducing') with a simple present verb ('improves'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "With 'not only...but also,' both elements must have identical structure. Avoid adding unnecessary subjects or pronouns."
  },
  {
    position: 27,
    title: "Neither...Nor with Verb Phrases",
    problem_text: "The committee will <u>neither approve the budget nor are they going to discuss it further</u>.",
    choices: [
      {
        letter: "A",
        text: "neither approve the budget nor are they going to discuss it further",
        explanation: "Incorrect. This mixes a simple verb phrase ('approve the budget') with a future progressive construction ('are they going to discuss it'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "neither approve the budget nor discuss it further",
        explanation: "Correct. Both elements use simple verb phrases ('approve the budget,' 'discuss it further'), maintaining parallelism."
      },
      {
        letter: "C",
        text: "approve neither the budget nor discuss it further",
        explanation: "Incorrect. Misplacing 'neither' disrupts the correlative conjunction structure and creates confusion."
      },
      {
        letter: "D",
        text: "neither be approving the budget nor discuss it further",
        explanation: "Incorrect. This mixes a progressive form ('be approving') with a simple form ('discuss'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "The correlative conjunction 'neither...nor' requires both elements to have matching verb structures."
  },
  {
    position: 28,
    title: "Both...And with Infinitive Phrases",
    problem_text: "The course helps students <u>both to improve their writing skills and developing critical thinking</u>.",
    choices: [
      {
        letter: "A",
        text: "both to improve their writing skills and developing critical thinking",
        explanation: "Incorrect. This mixes an infinitive phrase ('to improve their writing skills') with a gerund phrase ('developing critical thinking'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "both to improve their writing skills and to develop critical thinking",
        explanation: "Correct. Both elements use infinitive phrases ('to improve,' 'to develop'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "to both improve their writing skills and develop critical thinking",
        explanation: "Incorrect. While the verbs are parallel, misplacing 'both' before a shared 'to' is less clear than the standard construction."
      },
      {
        letter: "D",
        text: "both improve their writing skills and to develop critical thinking",
        explanation: "Incorrect. This mixes a base verb phrase with an infinitive phrase, violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "With 'both...and,' elements must match grammatically. Infinitive phrases require 'to' with both verbs for clarity."
  },
  {
    position: 29,
    title: "Either...Or with Gerund Phrases",
    problem_text: "The manager prefers <u>either delegating tasks to team members or to handle them himself</u>.",
    choices: [
      {
        letter: "A",
        text: "either delegating tasks to team members or to handle them himself",
        explanation: "Incorrect. This mixes a gerund phrase ('delegating tasks') with an infinitive phrase ('to handle them'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "either delegating tasks to team members or handling them himself",
        explanation: "Correct. Both elements use gerund phrases ('delegating tasks,' 'handling them'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "delegating either tasks to team members or to handle them himself",
        explanation: "Incorrect. Misplacing 'either' and mixing a noun phrase with an infinitive creates structural errors."
      },
      {
        letter: "D",
        text: "either to delegate tasks to team members or handling them himself",
        explanation: "Incorrect. This mixes an infinitive phrase ('to delegate') with a gerund phrase ('handling'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "The verb 'prefers' takes gerunds, so both elements after 'either...or' should be gerund phrases."
  },
  {
    position: 30,
    title: "Not Only...But Also with Objects",
    problem_text: "The scholarship supports <u>not only tuition expenses but also students receive living allowances</u>.",
    choices: [
      {
        letter: "A",
        text: "not only tuition expenses but also students receive living allowances",
        explanation: "Incorrect. This mixes a noun phrase ('tuition expenses') with a complete clause ('students receive living allowances'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "not only tuition expenses but also living allowances",
        explanation: "Correct. Both elements are noun phrases ('tuition expenses,' 'living allowances'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "tuition expenses not only but also living allowances",
        explanation: "Incorrect. The placement of 'not only' disrupts the natural sentence structure and sounds awkward."
      },
      {
        letter: "D",
        text: "not only tuition expenses but also it provides living allowances",
        explanation: "Incorrect. This mixes a noun phrase with a clause, violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "With 'not only...but also,' both elements should be direct objects with matching noun phrase structure."
  },

  // Comparisons using "than" or "as" - 6 questions
  {
    position: 31,
    title: "Comparison with 'Than' and Infinitives",
    problem_text: "It is better <u>to plan ahead than making decisions at the last minute</u>.",
    choices: [
      {
        letter: "A",
        text: "to plan ahead than making decisions at the last minute",
        explanation: "Incorrect. This mixes an infinitive ('to plan ahead') with a gerund phrase ('making decisions'), breaking parallel structure in the comparison."
      },
      {
        letter: "B",
        text: "to plan ahead than to make decisions at the last minute",
        explanation: "Correct. Both elements use infinitive phrases ('to plan ahead,' 'to make decisions'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "planning ahead than to make decisions at the last minute",
        explanation: "Incorrect. This mixes a gerund phrase ('planning ahead') with an infinitive phrase ('to make decisions'), violating parallel structure."
      },
      {
        letter: "D",
        text: "to plan ahead than decisions at the last minute",
        explanation: "Incorrect. This mixes an infinitive phrase with a noun phrase, creating a parallel structure error."
      }
    ],
    correct_answer: "B",
    answer_explanation: "In comparisons using 'than,' both elements must have the same grammatical form. Infinitives should be compared with infinitives."
  },
  {
    position: 32,
    title: "Comparison with 'As' in Equality",
    problem_text: "Writing a novel is <u>as challenging as to compose a symphony</u>.",
    choices: [
      {
        letter: "A",
        text: "as challenging as to compose a symphony",
        explanation: "Incorrect. This compares a gerund phrase (the subject 'Writing a novel') with an infinitive phrase ('to compose a symphony'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "as challenging as composing a symphony",
        explanation: "Correct. Both elements are gerund phrases ('Writing a novel,' 'composing a symphony'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "as challenging as if you compose a symphony",
        explanation: "Incorrect. This compares a gerund phrase with a clause, violating parallel structure."
      },
      {
        letter: "D",
        text: "as challenging as the composition of a symphony",
        explanation: "Incorrect. While grammatically acceptable, this compares a gerund phrase with a noun phrase, weakening the parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "In 'as...as' comparisons, both elements should match in form. Gerund phrases should be compared with gerund phrases."
  },
  {
    position: 33,
    title: "Than Comparison with Clauses",
    problem_text: "Reading the book was more interesting <u>than to watch the movie adaptation</u>.",
    choices: [
      {
        letter: "A",
        text: "than to watch the movie adaptation",
        explanation: "Incorrect. This compares a gerund phrase (the subject 'Reading the book') with an infinitive phrase ('to watch the movie'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "than watching the movie adaptation",
        explanation: "Correct. Both elements are gerund phrases ('Reading the book,' 'watching the movie'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "than the movie adaptation",
        explanation: "Incorrect. This compares an action ('Reading the book') with a thing ('the movie adaptation'), creating an illogical comparison."
      },
      {
        letter: "D",
        text: "than when you watch the movie adaptation",
        explanation: "Incorrect. This compares a gerund phrase with a clause, violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Comparisons must match in form. Since the subject is a gerund phrase, the comparison should also use a gerund phrase."
  },
  {
    position: 34,
    title: "As Comparison with Noun Phrases",
    problem_text: "The new model has <u>as many features as the previous version had them</u>.",
    choices: [
      {
        letter: "A",
        text: "as many features as the previous version had them",
        explanation: "Incorrect. The pronoun 'them' is redundant and creates an awkward, non-parallel structure."
      },
      {
        letter: "B",
        text: "as many features as the previous version",
        explanation: "Correct. Both elements have parallel structure without redundant elements, creating a clean comparison."
      },
      {
        letter: "C",
        text: "as many features as what the previous version had",
        explanation: "Incorrect. Adding 'what' creates an unnecessarily complex and non-parallel structure."
      },
      {
        letter: "D",
        text: "features as many as the previous version",
        explanation: "Incorrect. This disrupts the standard 'as...as' construction and sounds awkward."
      }
    ],
    correct_answer: "B",
    answer_explanation: "In 'as...as' comparisons, avoid redundant pronouns or words. Keep the structure clean and parallel."
  },
  {
    position: 35,
    title: "Than Comparison with Actions",
    problem_text: "She prefers <u>working independently than to collaborate with others</u>.",
    choices: [
      {
        letter: "A",
        text: "working independently than to collaborate with others",
        explanation: "Incorrect. This mixes a gerund phrase ('working independently') with an infinitive phrase ('to collaborate'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "working independently to collaborating with others",
        explanation: "Incorrect. While both are gerunds, using 'to' instead of 'than' is grammatically incorrect in this comparison structure."
      },
      {
        letter: "C",
        text: "to work independently than to collaborate with others",
        explanation: "Correct. Both elements use infinitive phrases ('to work independently,' 'to collaborate with others'), maintaining parallel structure. Note: 'prefers...to' is also acceptable, but when 'than' is used, infinitives should match."
      },
      {
        letter: "D",
        text: "working independently than collaboration with others",
        explanation: "Incorrect. This mixes a gerund phrase with a noun phrase, violating parallel structure."
      }
    ],
    correct_answer: "C",
    answer_explanation: "When using 'than' in comparisons with 'prefers,' both elements must have matching form—both infinitives or both gerunds."
  },
  {
    position: 36,
    title: "As Comparison with Adjectives",
    problem_text: "The final exam was <u>as difficult as when we took the midterm</u>.",
    choices: [
      {
        letter: "A",
        text: "as difficult as when we took the midterm",
        explanation: "Incorrect. This compares an adjective ('difficult') describing the exam with a clause about taking the midterm, breaking parallel structure."
      },
      {
        letter: "B",
        text: "as difficult as the midterm",
        explanation: "Correct. Both elements are noun phrases being compared ('the final exam,' 'the midterm'), maintaining parallel structure."
      },
      {
        letter: "C",
        text: "as difficult as how the midterm was",
        explanation: "Incorrect. This creates an awkward, non-parallel comparison using an unnecessary clause."
      },
      {
        letter: "D",
        text: "difficult as much as the midterm",
        explanation: "Incorrect. This disrupts the standard 'as...as' construction and creates a non-parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "In 'as...as' comparisons, compare like elements. Here, two exams are being compared, so noun phrases work best."
  },

  // Series of clauses - 4 questions
  {
    position: 37,
    title: "Parallel Independent Clauses",
    problem_text: "The storm approached quickly, <u>the wind increased in intensity, and there was flooding in the streets</u>.",
    choices: [
      {
        letter: "A",
        text: "the wind increased in intensity, and there was flooding in the streets",
        explanation: "Incorrect. While both are independent clauses, the second clause uses a weaker 'there was' construction instead of an active verb, breaking the parallel pattern."
      },
      {
        letter: "B",
        text: "the wind increased in intensity, and the streets flooded",
        explanation: "Correct. All three clauses follow the same subject-verb-complement pattern with active verbs, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "the wind was increasing in intensity, and the streets flooded",
        explanation: "Incorrect. This mixes a progressive verb form ('was increasing') with a simple past verb ('flooded'), breaking parallel structure."
      },
      {
        letter: "D",
        text: "increasing wind intensity occurred, and the streets flooded",
        explanation: "Incorrect. This changes the subject-verb structure of the second clause to differ from the first and third, violating parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Series of independent clauses should follow similar grammatical patterns with consistent verb forms and structures."
  },
  {
    position: 38,
    title: "Dependent Clause Consistency",
    problem_text: "The study revealed that <u>exercise improves health, that diet affects longevity, and stress can be harmful</u>.",
    choices: [
      {
        letter: "A",
        text: "exercise improves health, that diet affects longevity, and stress can be harmful",
        explanation: "Incorrect. This omits 'that' before the third clause while including it in the second, breaking parallel structure."
      },
      {
        letter: "B",
        text: "exercise improves health, that diet affects longevity, and that stress can be harmful",
        explanation: "Incorrect. While the second and third clauses are parallel, the first clause lacks 'that,' creating inconsistency."
      },
      {
        letter: "C",
        text: "exercise improves health, diet affects longevity, and stress can be harmful",
        explanation: "Correct. All three dependent clauses follow the same pattern without 'that' (acceptable when the first 'that' introduces all), maintaining parallel structure."
      },
      {
        letter: "D",
        text: "exercise improves health, diet affects longevity, and that stress can be harmful",
        explanation: "Incorrect. Adding 'that' only to the last clause while omitting it from the others breaks parallel structure."
      }
    ],
    correct_answer: "C",
    answer_explanation: "In a series of dependent clauses, either use 'that' consistently with each clause or omit it consistently from all but the first."
  },
  {
    position: 39,
    title: "Relative Clause Parallelism",
    problem_text: "We need someone <u>who has experience, who is reliable, and with strong communication skills</u>.",
    choices: [
      {
        letter: "A",
        text: "who has experience, who is reliable, and with strong communication skills",
        explanation: "Incorrect. This mixes relative clauses ('who has,' 'who is') with a prepositional phrase ('with strong communication skills'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "who has experience, who is reliable, and who has strong communication skills",
        explanation: "Correct. All three elements are relative clauses with the same 'who + verb' structure, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "who has experience, is reliable, and has strong communication skills",
        explanation: "Incorrect. While the verbs are parallel, omitting 'who' from the second and third clauses creates a different structure from the first."
      },
      {
        letter: "D",
        text: "with experience, who is reliable, and who has strong communication skills",
        explanation: "Incorrect. This mixes a prepositional phrase with relative clauses, violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "When listing relative clauses, repeat the relative pronoun ('who') and maintain consistent verb structures for parallelism."
  },
  {
    position: 40,
    title: "Conditional Clause Series",
    problem_text: "If you study regularly, <u>if you attend all classes, and completing assignments on time</u>, you will succeed.",
    choices: [
      {
        letter: "A",
        text: "if you attend all classes, and completing assignments on time",
        explanation: "Incorrect. This mixes conditional clauses ('if you study,' 'if you attend') with a gerund phrase ('completing assignments'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "if you attend all classes, and if you complete assignments on time",
        explanation: "Correct. All three elements are conditional clauses with the same 'if + subject + verb' structure, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "attending all classes, and if you complete assignments on time",
        explanation: "Incorrect. This mixes a gerund phrase with a conditional clause, violating parallel structure."
      },
      {
        letter: "D",
        text: "if you attend all classes, and you complete assignments on time",
        explanation: "Incorrect. Omitting 'if' from the third clause while including it in the others breaks the parallel pattern."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Series of conditional clauses should consistently use 'if' with each clause and maintain the same subject-verb structure."
  },

  // Parallel prepositional phrases - 3 questions
  {
    position: 41,
    title: "Prepositional Phrase Series",
    problem_text: "The message spread <u>through social media, by word of mouth, and people used email</u>.",
    choices: [
      {
        letter: "A",
        text: "through social media, by word of mouth, and people used email",
        explanation: "Incorrect. This mixes prepositional phrases ('through social media,' 'by word of mouth') with an independent clause ('people used email'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "through social media, by word of mouth, and via email",
        explanation: "Correct. All three elements are prepositional phrases with the same structure, maintaining parallelism."
      },
      {
        letter: "C",
        text: "through social media, by word of mouth, and emailing",
        explanation: "Incorrect. This mixes prepositional phrases with a gerund, violating parallel structure."
      },
      {
        letter: "D",
        text: "through social media, word of mouth, and via email",
        explanation: "Incorrect. Omitting the preposition 'by' from the second element while including prepositions in the others breaks parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Series of prepositional phrases should all begin with prepositions and follow the same structural pattern."
  },
  {
    position: 42,
    title: "Location Prepositional Phrases",
    problem_text: "The documents can be found <u>in the cabinet, on the desk, or you can look in the drawer</u>.",
    choices: [
      {
        letter: "A",
        text: "in the cabinet, on the desk, or you can look in the drawer",
        explanation: "Incorrect. This mixes prepositional phrases ('in the cabinet,' 'on the desk') with a clause ('you can look in the drawer'), breaking parallel structure."
      },
      {
        letter: "B",
        text: "in the cabinet, on the desk, or in the drawer",
        explanation: "Correct. All three elements are prepositional phrases indicating location, maintaining parallel structure."
      },
      {
        letter: "C",
        text: "in the cabinet, on the desk, or the drawer",
        explanation: "Incorrect. Omitting the preposition from the third element while including prepositions in the others breaks parallelism."
      },
      {
        letter: "D",
        text: "in the cabinet, the desk, or in the drawer",
        explanation: "Incorrect. Omitting the preposition from the second element creates inconsistency and breaks parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "When listing locations, all elements should be prepositional phrases with consistent structure."
  },
  {
    position: 43,
    title: "Time Prepositional Phrases",
    problem_text: "The medication should be taken <u>in the morning, at noon, and before you go to bed</u>.",
    choices: [
      {
        letter: "A",
        text: "in the morning, at noon, and before you go to bed",
        explanation: "Incorrect. While all begin with prepositions, the third element contains a full clause ('you go to bed') rather than a simple noun phrase, weakening parallelism."
      },
      {
        letter: "B",
        text: "in the morning, at noon, and at bedtime",
        explanation: "Correct. All three elements are prepositional phrases with simple objects, maintaining strong parallel structure."
      },
      {
        letter: "C",
        text: "in the morning, at noon, and when going to bed",
        explanation: "Incorrect. This mixes prepositional phrases with a clause, violating parallel structure."
      },
      {
        letter: "D",
        text: "in the morning, noon, and at bedtime",
        explanation: "Incorrect. Omitting the preposition from the second element while including prepositions in the others breaks parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "Prepositional phrases indicating time should maintain consistent structure with preposition + simple noun or noun phrase."
  },

  // Mixed review combining multiple concepts - 3 questions
  {
    position: 44,
    title: "Mixed Concepts: Verbs and Conjunctions",
    problem_text: "To maintain a healthy lifestyle, you should <u>either exercise regularly, eating nutritious foods, or get adequate sleep</u>.",
    choices: [
      {
        letter: "A",
        text: "either exercise regularly, eating nutritious foods, or get adequate sleep",
        explanation: "Incorrect. This has multiple errors: mixing base verbs with a gerund, and incorrectly using 'either...or' with three items instead of two."
      },
      {
        letter: "B",
        text: "exercise regularly, eat nutritious foods, and get adequate sleep",
        explanation: "Correct. All three items use base verb forms (appropriate after 'should'), and the structure correctly uses a three-item list without correlative conjunctions."
      },
      {
        letter: "C",
        text: "either exercise regularly or eat nutritious foods and get adequate sleep",
        explanation: "Incorrect. While 'either...or' is correctly used with two items, the second item awkwardly contains two elements, creating confusion."
      },
      {
        letter: "D",
        text: "exercise regularly, eating nutritious foods, and getting adequate sleep",
        explanation: "Incorrect. This mixes a base verb ('exercise') with gerunds ('eating,' 'getting'), breaking parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "This combines verb form parallelism (base forms after 'should') with proper list structure (avoiding incorrect use of correlative conjunctions)."
  },
  {
    position: 45,
    title: "Mixed Concepts: Comparisons and Parts of Speech",
    problem_text: "Online learning is <u>more flexible than traditional classrooms, more convenient than to attend in person, and costs less</u>.",
    choices: [
      {
        letter: "A",
        text: "more flexible than traditional classrooms, more convenient than to attend in person, and costs less",
        explanation: "Incorrect. This has multiple errors: comparing an adjective to a noun ('flexible' vs 'classrooms'), mixing comparison structures, and breaking parallel structure with 'costs less.'"
      },
      {
        letter: "B",
        text: "more flexible than traditional classroom learning, more convenient than attending in person, and less expensive",
        explanation: "Correct. All three elements are adjectives in comparative form with parallel 'than' phrases, maintaining consistent parallel structure."
      },
      {
        letter: "C",
        text: "more flexible, more convenient than attending in person, and less expensive",
        explanation: "Incorrect. The first comparison lacks a 'than' phrase while the second includes one, breaking parallel structure."
      },
      {
        letter: "D",
        text: "more flexible than traditional classrooms, more convenient, and it costs less",
        explanation: "Incorrect. This mixes adjectives with a clause ('it costs less') and has inconsistent 'than' phrases, violating parallelism."
      }
    ],
    correct_answer: "B",
    answer_explanation: "This combines parallel comparisons (all using 'more...than'), consistent parts of speech (all adjectives), and logical comparison structures."
  },
  {
    position: 46,
    title: "Mixed Concepts: Multiple Structures",
    problem_text: "The program not only <u>teaches valuable skills but also provides networking opportunities and it helps with job placement</u>.",
    choices: [
      {
        letter: "A",
        text: "teaches valuable skills but also provides networking opportunities and it helps with job placement",
        explanation: "Incorrect. While the first two verbs are parallel, adding 'it' before the third verb breaks the parallel structure of the series."
      },
      {
        letter: "B",
        text: "teaches valuable skills but also provides networking opportunities and helps with job placement",
        explanation: "Correct. All three verb phrases maintain parallel structure ('teaches,' 'provides,' 'helps'), and 'not only...but also' correctly connects to a three-item series."
      },
      {
        letter: "C",
        text: "teaches valuable skills but also providing networking opportunities and helps with job placement",
        explanation: "Incorrect. This mixes a present tense verb ('teaches'), a gerund ('providing'), and another present tense verb ('helps'), breaking parallel structure."
      },
      {
        letter: "D",
        text: "is teaching valuable skills but also provides networking opportunities and helps with job placement",
        explanation: "Incorrect. This mixes a progressive verb form ('is teaching') with simple present verbs ('provides,' 'helps'), violating parallel structure."
      }
    ],
    correct_answer: "B",
    answer_explanation: "This combines correlative conjunctions ('not only...but also'), series of verb phrases, and consistent verb forms for complete parallelism."
  }
];
