export const sentenceStructureQuizzes = {
  quiz1: {
    title: '🧩 Interactive Quiz: Clause Identification',
    intro: 'Test your understanding! Identify each example as an Independent Clause, Dependent Clause, or Phrase.',
    questions: [
      {
        text: '"Sarah studied for three hours last night."',
        options: [
          {
            text: 'Independent Clause',
            isCorrect: true,
            explanation: '✅ Correct! This has a subject (Sarah) and verb (studied) and expresses a complete thought.'
          },
          {
            text: 'Dependent Clause',
            isCorrect: false,
            explanation: '❌ Incorrect. This sentence has both a subject and verb and can stand alone.'
          },
          {
            text: 'Phrase',
            isCorrect: false,
            explanation: '❌ Incorrect. This has both a subject (Sarah) and verb (studied).'
          }
        ]
      },
      {
        text: '"Although the weather was perfect for hiking."',
        options: [
          {
            text: 'Independent Clause',
            isCorrect: false,
            explanation: '❌ Incorrect. The word "Although" makes this dependent—it cannot stand alone.'
          },
          {
            text: 'Dependent Clause',
            isCorrect: true,
            explanation: '✅ Correct! "Although" is a subordinating conjunction that makes this clause dependent.'
          },
          {
            text: 'Phrase',
            isCorrect: false,
            explanation: '❌ Incorrect. This has both subject (weather) and verb (was).'
          }
        ]
      },
      {
        text: '"Running through the park every morning."',
        options: [
          {
            text: 'Independent Clause',
            isCorrect: false,
            explanation: '❌ Incorrect. This lacks a subject—who is running?'
          },
          {
            text: 'Dependent Clause',
            isCorrect: false,
            explanation: '❌ Incorrect. This is missing a subject and cannot be a clause.'
          },
          {
            text: 'Phrase',
            isCorrect: true,
            explanation: '✅ Correct! This is missing a subject and cannot stand alone as a sentence.'
          }
        ]
      },
      {
        text: '"When the bell rings at 3 PM."',
        options: [
          {
            text: 'Independent Clause',
            isCorrect: false,
            explanation: '❌ Incorrect. "When" makes this dependent—try the cover test!'
          },
          {
            text: 'Dependent Clause',
            isCorrect: true,
            explanation: '✅ Correct! Use the cover test: cover "When" and you get "the bell rings at 3 PM"—a complete sentence, so this is dependent.'
          },
          {
            text: 'Phrase',
            isCorrect: false,
            explanation: '❌ Incorrect. This has subject (bell) and verb (rings).'
          }
        ]
      }
    ]
  },

  quiz2: {
    title: '🎲 Interactive Quiz: FANBOYS & Compound Sentences',
    intro: 'Apply the 5 Golden Rules! Choose the best way to combine these sentences.',
    questions: [
      {
        text: '<strong>Combine:</strong> "I love chocolate ice cream. My sister prefers vanilla."',
        options: [
          {
            text: 'I love chocolate ice cream, my sister prefers vanilla.',
            isCorrect: false,
            explanation: '❌ Comma splice! You cannot join two independent clauses with just a comma.'
          },
          {
            text: 'I love chocolate ice cream, but my sister prefers vanilla.',
            isCorrect: true,
            explanation: '✅ Perfect! Using comma + FANBOYS (Rule #2) correctly joins two independent clauses.'
          },
          {
            text: 'I love chocolate ice cream; my sister prefers vanilla.',
            isCorrect: true,
            explanation: '✅ Excellent! Using a semicolon (Rule #3) correctly separates two independent clauses.'
          }
        ]
      },
      {
        text: '<strong>Fix this comma splice:</strong> "The movie was amazing, everyone should watch it."',
        options: [
          {
            text: 'The movie was amazing, so everyone should watch it.',
            isCorrect: true,
            explanation: '✅ Great! Adding "so" (a FANBOYS word) fixes the comma splice using Rule #2.'
          },
          {
            text: 'The movie was amazing, therefore everyone should watch it.',
            isCorrect: false,
            explanation: '❌ Still a comma splice! "Therefore" is not one of the FANBOYS words.'
          },
          {
            text: 'The movie was amazing. Everyone should watch it.',
            isCorrect: true,
            explanation: '✅ Perfect! A period (Rule #1) correctly separates two independent clauses.'
          }
        ]
      },
      {
        text: '<strong>Which follows Rule #4 (Dependent → Independent)?</strong>',
        options: [
          {
            text: 'The students celebrated they passed the test.',
            isCorrect: false,
            explanation: '❌ This is Independent → Dependent (Rule #5), and it\'s missing the comma it would need.'
          },
          {
            text: 'Since the students passed the test, they celebrated.',
            isCorrect: true,
            explanation: '✅ Perfect! "Since" makes the first clause dependent, and there\'s a comma before the independent clause.'
          },
          {
            text: 'The students passed the test, and they celebrated.',
            isCorrect: false,
            explanation: '❌ This is Rule #2 (comma + FANBOYS), not Rule #4.'
          }
        ]
      },
      {
        text: '<strong>Which FANBOYS word best fits:</strong> "I studied hard, ___ I still failed the exam."',
        options: [
          {
            text: 'and',
            isCorrect: false,
            explanation: '❌ "And" suggests addition, but failing despite studying shows contrast.'
          },
          {
            text: 'yet',
            isCorrect: true,
            explanation: '✅ Perfect! "Yet" shows contrast—despite studying hard, the result was unexpected.'
          },
          {
            text: 'so',
            isCorrect: false,
            explanation: '❌ "So" suggests cause and effect, but failing isn\'t caused by studying hard.'
          }
        ]
      },
      {
        text: '<strong>Which sentence correctly follows Rule #5 (Independent → Dependent)?</strong>',
        options: [
          {
            text: 'Although it was raining we went hiking.',
            isCorrect: false,
            explanation: '❌ This needs a comma because it\'s Dependent → Independent (Rule #4).'
          },
          {
            text: 'We went hiking although it was raining.',
            isCorrect: true,
            explanation: '✅ Excellent! Independent clause followed by dependent clause with no comma (Rule #5).'
          },
          {
            text: 'We went hiking, but it was raining.',
            isCorrect: false,
            explanation: '❌ This is Rule #2 (comma + FANBOYS), not Rule #5.'
          }
        ]
      }
    ]
  },

  quiz3: {
    title: '🕵️ Interactive Quiz: Comma Splice Detective',
    intro: 'Spot the comma splices and choose the best fixes!',
    questions: [
      {
        text: '<strong>Is this a comma splice?</strong> "The concert was loud, I could barely hear myself think."',
        options: [
          {
            text: 'Yes, this is a comma splice',
            isCorrect: true,
            explanation: '✅ Yes! Two independent clauses joined by only a comma = comma splice.'
          },
          {
            text: 'No, this is correct',
            isCorrect: false,
            explanation: '❌ This is definitely a comma splice. Both parts can stand alone as sentences.'
          }
        ]
      },
      {
        text: '<strong>Which fix is INCORRECT?</strong> "My phone died, I couldn\'t call for help."',
        options: [
          {
            text: 'My phone died. I couldn\'t call for help.',
            isCorrect: false,
            explanation: '✅ This correctly uses Rule #1 (period separation).'
          },
          {
            text: 'My phone died, so I couldn\'t call for help.',
            isCorrect: false,
            explanation: '✅ This correctly uses Rule #2 (comma + FANBOYS).'
          },
          {
            text: 'My phone died, however I couldn\'t call for help.',
            isCorrect: true,
            explanation: '❌ INCORRECT! "However" is not a FANBOYS word. This is still a comma splice.'
          }
        ]
      },
      {
        text: '<strong>Is this sentence correct?</strong> "Although the restaurant was crowded, we found a table."',
        options: [
          {
            text: 'Yes, this is correct',
            isCorrect: true,
            explanation: '✅ Correct! This follows Rule #4: Dependent → Independent with a comma.'
          },
          {
            text: 'No, this is a comma splice',
            isCorrect: false,
            explanation: '❌ This is actually correct. "Although" makes the first part dependent.'
          }
        ]
      },
      {
        text: '<strong>Best way to fix:</strong> "She loves to read, she visits the library every week."',
        options: [
          {
            text: 'Because she loves to read, she visits the library every week.',
            isCorrect: true,
            explanation: '✅ Perfect! This uses Rule #4 correctly with "because" creating a dependent clause.'
          },
          {
            text: 'She loves to read, also she visits the library every week.',
            isCorrect: false,
            explanation: '❌ "Also" is not a FANBOYS word, so this is still a comma splice.'
          },
          {
            text: 'She loves to read; she visits the library every week.',
            isCorrect: true,
            explanation: '✅ Great! Rule #3 using a semicolon works perfectly here.'
          }
        ]
      },
      {
        text: '<strong>Tricky one!</strong> "The team practiced hard all season, their efforts paid off in the championship."',
        options: [
          {
            text: 'This sentence is correct',
            isCorrect: false,
            explanation: '❌ This is a comma splice! Both parts are independent clauses.'
          },
          {
            text: 'This is a comma splice',
            isCorrect: true,
            explanation: '✅ Exactly! This is a comma splice that needs fixing with one of the 5 rules.'
          }
        ]
      }
    ]
  },

  quiz4: {
    title: '🏆 Final Mastery Test: Sentence Structure',
    intro: 'Put it all together! This comprehensive quiz covers everything from Lesson 1.',
    questions: [
      {
        text: '<strong>ACT-Style Question:</strong> Which choice creates the most grammatically correct sentence?<br><em>"The new restaurant downtown serves amazing tacos, it\'s always packed with customers."</em>',
        options: [
          {
            text: 'tacos and it\'s',
            isCorrect: false,
            explanation: '❌ This is still a comma splice—"and" alone doesn\'t fix it without the comma.'
          },
          {
            text: 'tacos, and it\'s',
            isCorrect: true,
            explanation: '✅ Perfect! Comma + FANBOYS (Rule #2) correctly joins the independent clauses.'
          },
          {
            text: 'tacos, which is',
            isCorrect: false,
            explanation: '❌ This creates a sentence fragment—the second part needs to be independent.'
          },
          {
            text: 'tacos; it\'s',
            isCorrect: true,
            explanation: '✅ Excellent! A semicolon (Rule #3) properly separates two independent clauses.'
          }
        ]
      },
      {
        text: '<strong>Identify the error:</strong> "Running through the forest quickly. The deer disappeared from sight."',
        options: [
          {
            text: 'The first sentence is a fragment',
            isCorrect: true,
            explanation: '✅ Correct! The first sentence is a fragment—it\'s missing a subject (who was running?).'
          },
          {
            text: 'This is a comma splice',
            isCorrect: false,
            explanation: '❌ There\'s no comma splice here—these are separate sentences.'
          },
          {
            text: 'Both sentences are correct',
            isCorrect: false,
            explanation: '❌ Both sentences are correctly punctuated; the issue is the fragment.'
          }
        ]
      },
      {
        text: '<strong>Choose the correct combination:</strong> Two sentences: "The storm was approaching." "We decided to head home."',
        options: [
          {
            text: 'The storm was approaching, we decided to head home.',
            isCorrect: false,
            explanation: '❌ Comma splice! You cannot join independent clauses with just a comma.'
          },
          {
            text: 'Since the storm was approaching, we decided to head home.',
            isCorrect: true,
            explanation: '✅ Perfect! "Since" creates a dependent clause, correctly using Rule #4.'
          },
          {
            text: 'The storm was approaching, so we decided to head home.',
            isCorrect: true,
            explanation: '✅ Great! This correctly uses Rule #2 with comma + FANBOYS.'
          }
        ]
      },
      {
        text: '<strong>Which sentence correctly follows Rule #5?</strong>',
        options: [
          {
            text: 'When the bell rings students rush to lunch.',
            isCorrect: false,
            explanation: '❌ This violates Rule #4—it needs a comma after the dependent clause.'
          },
          {
            text: 'Students rush to lunch when the bell rings.',
            isCorrect: true,
            explanation: '✅ Perfect! Independent clause + dependent clause with no comma (Rule #5).'
          },
          {
            text: 'Students rush to lunch, and the bell rings.',
            isCorrect: false,
            explanation: '❌ This is Rule #2 (comma + FANBOYS), not Rule #5.'
          }
        ]
      },
      {
        text: '<strong>Advanced:</strong> "My favorite author, who writes mystery novels, just published a new book."',
        options: [
          {
            text: 'This is a comma splice',
            isCorrect: false,
            explanation: '❌ This is not a comma splice. The commas set off unnecessary information.'
          },
          {
            text: 'This is a sentence fragment',
            isCorrect: false,
            explanation: '❌ This is a complete sentence with proper comma usage.'
          },
          {
            text: 'This sentence is correct',
            isCorrect: true,
            explanation: '✅ Correct! This sentence properly uses commas to set off unnecessary information ("who writes mystery novels").'
          }
        ]
      },
      {
        text: '<strong>Spot the error type:</strong> "Although I studied all night, I feel confident about the exam, I think I\'ll do well."',
        options: [
          {
            text: 'Incorrect dependent clause',
            isCorrect: false,
            explanation: '❌ The first part is fine—"Although" correctly creates a dependent clause.'
          },
          {
            text: 'Comma splice at the end',
            isCorrect: true,
            explanation: '✅ Exactly! The last two independent clauses are incorrectly joined with just a comma.'
          },
          {
            text: 'Sentence fragment',
            isCorrect: false,
            explanation: '❌ This sentence has proper subjects and verbs throughout.'
          }
        ]
      },
      {
        text: '<strong>Final Challenge:</strong> Which sentence demonstrates perfect mastery of compound sentence rules?',
        options: [
          {
            text: 'The movie was long, however it was entertaining.',
            isCorrect: false,
            explanation: '❌ "However" is not a FANBOYS word, making this a comma splice.'
          },
          {
            text: 'Although the movie was long, it was entertaining.',
            isCorrect: true,
            explanation: '✅ Masterful! Rule #4 perfectly executed: dependent clause + comma + independent clause.'
          },
          {
            text: 'The movie was entertaining because it was long.',
            isCorrect: false,
            explanation: '❌ This creates an incomplete thought—"Because" makes it dependent with no independent clause.'
          }
        ]
      }
    ]
  }
};