export const quizData = {
  1: {
    title: "Interactive Quiz: Clause Identification",
    intro: "Test your understanding of clauses and phrases. Choose the correct answer for each question.",
    questions: [
      {
        text: "Identify the type: <strong>When the storm arrived</strong>",
        options: [
          { text: "Independent clause", isCorrect: false, explanation: "This has a subject and verb but starts with 'when,' making it dependent." },
          { text: "Dependent clause", isCorrect: true, explanation: "Correct! 'When' makes this clause dependent on another clause to complete the thought." },
          { text: "Phrase", isCorrect: false, explanation: "This has both a subject (storm) and a verb (arrived), so it's a clause, not a phrase." }
        ]
      },
      {
        text: "Identify the type: <strong>Running through the park</strong>",
        options: [
          { text: "Independent clause", isCorrect: false, explanation: "This lacks a subject and finite verb, so it cannot stand alone." },
          { text: "Dependent clause", isCorrect: false, explanation: "This doesn't have a subject and finite verb - it's not a clause at all." },
          { text: "Phrase", isCorrect: true, explanation: "Correct! This is a participial phrase with no subject or finite verb." }
        ]
      },
      {
        text: "Identify the type: <strong>The cat sat on the mat</strong>",
        options: [
          { text: "Independent clause", isCorrect: true, explanation: "Perfect! This has a subject (cat), verb (sat), and expresses a complete thought." },
          { text: "Dependent clause", isCorrect: false, explanation: "This clause can stand alone - there's no subordinating word making it dependent." },
          { text: "Phrase", isCorrect: false, explanation: "This has both a subject and verb, making it a clause, not a phrase." }
        ]
      },
      {
        text: "Identify the type: <strong>Because she studied hard</strong>",
        options: [
          { text: "Independent clause", isCorrect: false, explanation: "'Because' creates a dependent relationship - this cannot stand alone." },
          { text: "Dependent clause", isCorrect: true, explanation: "Exactly! 'Because' is a subordinating conjunction that makes this clause dependent." },
          { text: "Phrase", isCorrect: false, explanation: "This has a subject (she) and verb (studied), so it's a clause." }
        ]
      },
      {
        text: "Identify the type: <strong>In the garden</strong>",
        options: [
          { text: "Independent clause", isCorrect: false, explanation: "This has no subject or verb - it cannot be a clause." },
          { text: "Dependent clause", isCorrect: false, explanation: "This is not a clause at all since it lacks both a subject and a finite verb." },
          { text: "Phrase", isCorrect: true, explanation: "Perfect! This is a prepositional phrase with no subject or verb." }
        ]
      }
    ]
  },
  2: {
    title: "Final Assessment: FANBOYS & Compound Sentences",
    intro: "Apply your knowledge of FANBOYS and compound sentence construction. This is your final test!",
    questions: [
      {
        text: "Which FANBOYS conjunction best connects these ideas:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'I want to go swimming' + 'it's raining outside'</div>",
        options: [
          { text: "and", isCorrect: false, explanation: "'And' shows addition, but these ideas contrast with each other." },
          { text: "but", isCorrect: true, explanation: "Perfect! 'But' shows the contrast between wanting to swim and the rain preventing it." },
          { text: "or", isCorrect: false, explanation: "'Or' shows alternatives, but we're contrasting two situations here." },
          { text: "so", isCorrect: false, explanation: "'So' shows cause and effect, but we're showing contrast, not causation." }
        ]
      },
      {
        text: "Identify the error:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'I studied hard for the test, I still failed.'</div>",
        options: [
          { text: "Missing conjunction", isCorrect: true, explanation: "Correct! This is a comma splice. You need a FANBOYS conjunction: 'I studied hard for the test, but I still failed.'" },
          { text: "Wrong punctuation", isCorrect: false, explanation: "The comma placement is correct for a compound sentence, but you need a conjunction." },
          { text: "No error", isCorrect: false, explanation: "This is a comma splice - two independent clauses joined by only a comma." }
        ]
      },
      {
        text: "Which sentence correctly uses a FANBOYS conjunction?",
        options: [
          { text: "I was tired, so I went to bed early.", isCorrect: true, explanation: "Excellent! This correctly shows cause (tired) and effect (went to bed) with proper comma + conjunction." },
          { text: "I was tired so I went to bed early.", isCorrect: false, explanation: "Missing the comma before 'so' in this compound sentence." },
          { text: "I was tired, I went to bed early.", isCorrect: false, explanation: "This is a comma splice - needs a conjunction after the comma." }
        ]
      },
      {
        text: "What's the best way to fix this comma splice:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The movie was long, it was boring.'</div>",
        options: [
          { text: "The movie was long it was boring.", isCorrect: false, explanation: "This creates a run-on sentence - you still need proper punctuation." },
          { text: "The movie was long, and it was boring.", isCorrect: true, explanation: "Perfect! Adding 'and' creates a proper compound sentence showing both qualities." },
          { text: "The movie was long; it was boring.", isCorrect: false, explanation: "While grammatically correct with a semicolon, the question asks for FANBOYS usage." }
        ]
      },
      {
        text: "In compound sentences, FANBOYS conjunctions must be:",
        options: [
          { text: "Preceded by a comma", isCorrect: true, explanation: "Exactly right! In compound sentences, always use comma + FANBOYS to join independent clauses." },
          { text: "Followed by a semicolon", isCorrect: false, explanation: "Semicolons replace FANBOYS conjunctions; they don't follow them." },
          { text: "Used without commas", isCorrect: false, explanation: "You always need a comma before FANBOYS in compound sentences." }
        ]
      }
    ]
  },
  3: {
    title: "Practice Quiz: Comma Splices & Fragments",
    intro: "Test your ability to identify and fix common sentence errors.",
    questions: [
      {
        text: "Which sentence correctly fixes this comma splice:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The storm was approaching, we decided to head home.'</div>",
        options: [
          { text: "The storm was approaching we decided to head home.", isCorrect: false, explanation: "This creates a run-on sentence. You need proper punctuation or conjunction." },
          { text: "The storm was approaching, so we decided to head home.", isCorrect: true, explanation: "Perfect! 'So' shows cause and effect with proper comma + FANBOYS structure." },
          { text: "The storm was approaching; and we decided to head home.", isCorrect: false, explanation: "Don't use semicolon + conjunction together. Choose one or the other." }
        ]
      },
      {
        text: "Identify the sentence fragment: Which needs to be corrected?",
        options: [
          { text: "After the game ended.", isCorrect: true, explanation: "Correct! This dependent clause needs an independent clause to complete the thought." },
          { text: "The team celebrated their victory.", isCorrect: false, explanation: "This is a complete sentence with subject (team) and verb (celebrated)." },
          { text: "Everyone went home happy.", isCorrect: false, explanation: "This is a complete sentence with subject (everyone) and verb (went)." }
        ]
      },
      {
        text: "Which sentence uses correct punctuation between independent clauses?",
        options: [
          { text: "I love reading books, my sister prefers movies.", isCorrect: false, explanation: "This is a comma splice. Two independent clauses need more than just a comma." },
          { text: "I love reading books; my sister prefers movies.", isCorrect: true, explanation: "Excellent! Semicolon correctly separates two independent clauses." },
          { text: "I love reading books my sister prefers movies.", isCorrect: false, explanation: "This is a run-on sentence. Independent clauses need separation." }
        ]
      },
      {
        text: "What's the difference between these two sentences?<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>Sentence A: 'While studying for the test.'<br/>Sentence B: 'While I was studying for the test.'</div>",
        options: [
          { text: "Both are complete sentences", isCorrect: false, explanation: "Sentence A is missing a subject - 'while studying' has no clear subject performing the action." },
          { text: "A is a phrase, B is a dependent clause", isCorrect: true, explanation: "Excellent! A lacks a clear subject (phrase), while B has 'I' as subject + 'was studying' as verb (dependent clause)." },
          { text: "Both are dependent clauses", isCorrect: false, explanation: "Sentence A is actually a phrase because it doesn't have a clear subject and finite verb." }
        ]
      },
      {
        text: "Advanced Challenge: Identify the error pattern in this sentence:<br/><br/><div style='text-align: center; font-style: italic; background: rgba(26, 115, 232, 0.05); padding: 0.75rem; border-radius: 8px; margin: 0.5rem 0;'>'The students working on the project, they finished early.'</div>",
        options: [
          { text: "Run-on sentence", isCorrect: false, explanation: "This isn't a run-on - there's actually a comma separating the parts." },
          { text: "Comma splice with unclear structure", isCorrect: true, explanation: "Perfect analysis! 'The students working on the project' is unclear (phrase?), and 'they finished early' creates a comma splice pattern." },
          { text: "Missing conjunction only", isCorrect: false, explanation: "The bigger issue is the unclear structure of the first part - it's not a clear independent clause." }
        ]
      }
    ]
  },
  // Due to size constraints, I'll create a separate file for quizzes 4-26
  // This maintains the structure while keeping files under 300 lines
};

export const getQuizData = (quizId) => {
  return quizData[quizId] || null;
};
