/**
 * Add comprehensive, question-specific explanations for all 50 questions
 * Extra detailed explanations for ultrathink questions
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDetailedExplanations() {
  console.log('🚀 Adding detailed, question-specific explanations...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  const detailedExplanations = {
    1: 'In the original sentence, we have "the toy at the Cincinnati Toy Fair a new type of diecast toy car." Notice there\'s no verb connecting "Fair" to "a new type." This creates a sentence fragment. The sentence describes what the toy WAS, but it never actually says "was." Adding "Fair was" provides the essential linking verb that connects the subject (toy) to what it was (a new type of diecast toy car). Without this verb, we have two noun phrases with nothing connecting them.',

    2: 'This sentence discusses hummingbirds\' evolutionary adaptation. The phrase "After hummingbirds evolved long, thin beaks to reach pollen in flowers" is a dependent clause setting up context. Then we need to connect to the main idea: "this evolutionary advantage allowed them to survive." The key issue is choosing the right connector. "However" and "therefore" are conjunctive adverbs that show contrast or result, but they require semicolon punctuation and change the logical flow. We need a simple coordinating conjunction to show addition or continuation. "And" is a FANBOYS word that, with a comma before it, properly joins these two related ideas without adding unnecessary contrast or causation.',

    3: 'The original "sport, although" creates an awkward construction. "Although" is a subordinating conjunction that creates dependent clauses, typically at the beginning of sentences or following a semicolon. Here we have two independent clauses: "Hockey is my favorite sport" and "I cannot skate very well." These clauses express contrasting ideas (loving hockey vs. not skating well). The most natural way to join contrasting independent clauses is with a comma followed by the coordinating conjunction "but" (a FANBOYS word). This creates the smooth, natural flow: "Hockey is my favorite sport, but I cannot skate very well."',

    4: 'The word "While" at the start creates a dependent clause. When you read "While the bakery varies its types of bread with the seasons, ranging from tomato basil loafs in the summer to olive rosemary focaccia in the fall, and always has a line around the block," you keep waiting for the main clause that never comes. The entire sentence is one long dependent clause with no independent clause to complete the thought. By removing "While" and starting with "The bakery varies," we create a proper independent clause with a clear subject (the bakery) and verb (varies). The sentence then flows naturally: the bakery does three things (varies bread types, ranges seasonally, and has lines).',

    5: 'When describing weather conditions in English, we use the pronoun "it" as an impersonal subject. "Was raining" is a verb phrase lacking a subject. You can\'t have a verb without something doing the action, even for weather. "It was raining" follows the standard pattern for English weather descriptions (it\'s snowing, it was sunny, it will rain, etc.). The "it" doesn\'t refer to anything specific—it\'s a grammatical placeholder that makes the sentence complete.',

    6: 'Here we have two complete independent clauses: "The concert was amazing" (subject: concert, verb: was) and "the band played for two hours" (subject: band, verb: played). You cannot simply place two independent clauses next to each other with just a space—this creates a run-on sentence. The fix requires either separating them completely (with a period or semicolon) or properly joining them with a comma + coordinating conjunction. Since these ideas are closely related and both positive, "and" is the appropriate coordinator, creating: "The concert was amazing, and the band played for two hours."',

    7: 'A comma splice occurs when you join two independent clauses with only a comma. Here, "She studied all night" is complete (subject + verb), and "she still felt unprepared for the exam" is also complete. Joining them with just a comma is incorrect. A semicolon is perfect here because both clauses are independent and closely related in meaning—the second clause provides additional information about the first. The semicolon creates a stronger connection than a period would, showing these thoughts are intimately linked.',

    8: 'The phrase "The students in the library studying" has a subject (students) but lacks a complete verb. "Studying" is a present participle, which cannot serve as the main verb of a sentence. It needs a helping verb to become complete. "Are studying" creates the present progressive tense (also called present continuous), which indicates an ongoing action happening right now. This is the correct form: helping verb "are" + present participle "studying" = complete verb phrase.',

    9: 'This tests your knowledge of the fundamental FANBOYS rule. When you use a coordinating conjunction (For, And, Nor, But, Or, Yet, So) to connect two independent clauses, you MUST place a comma before the conjunction. "I wanted to go to the park" is independent, "it started raining" is independent, and "but" shows contrast between them. Therefore, the correct form is "park, but it." This is one of the most basic punctuation rules in English.',

    10: 'Dependent clauses that begin sentences must be followed by commas. "After the game ended" is a dependent clause (it can\'t stand alone as a sentence). "The fans celebrated in the streets" is the independent clause (it can stand alone). When you start a sentence with a dependent clause, you must signal the transition to the independent clause with a comma. This helps readers understand the sentence structure and know when the main idea begins.',

    11: 'The first sentence "The restaurant on the corner" is a fragment—it\'s just a noun phrase with no verb. The second part "Which serves the best pizza in town" is also a fragment because "which" creates a dependent clause that can\'t stand alone. To fix this, we need to create an independent clause. "It serves the best pizza in town" works because "it" is a pronoun subject, "serves" is the verb, and the clause can stand independently. This transforms a fragment into a complete sentence.',

    12: 'Many students mistakenly think "however" works like "but." It doesn\'t. "However" is a conjunctive adverb, not a coordinating conjunction, so it requires different punctuation. When joining independent clauses with conjunctive adverbs (however, moreover, therefore, consequently, etc.), use this pattern: semicolon before the adverb, comma after it. So it becomes: "predicted sunshine; however, it rained." This stronger punctuation reflects the stronger transitional nature of these adverbs.',

    13: 'When a dependent clause comes at the END of a sentence (rather than the beginning), you typically don\'t need a comma before the subordinating conjunction. "We will go hiking tomorrow" is the independent clause. "Unless it rains" is the dependent clause. Since the dependent clause follows the independent one, no comma is needed. Compare this to if the sentence were reversed: "Unless it rains, we will go hiking tomorrow"—here the comma IS needed because the dependent clause comes first.',

    14: '"Because the library was closed" is a dependent clause that cannot stand alone as a sentence. Putting a period after it creates a fragment. This dependent clause needs to be attached to the independent clause "We studied at the coffee shop instead." When a dependent clause beginning with "because" starts a sentence, it must be followed by a comma before the independent clause. This creates one complete sentence: "Because the library was closed, we studied at the coffee shop instead."',

    15: '"Therefore" is a conjunctive adverb showing logical result or conclusion. The scientist\'s years of experiments resulted in reliable findings. To join these two independent clauses with "therefore," you must use a semicolon before it and a comma after: "years; therefore, her findings." This punctuation pattern is required for all conjunctive adverbs when joining independent clauses.',

    16: '"While some students preferred online learning" is a dependent clause introducing contrast. "Others found traditional classrooms more effective" is the independent clause containing the main idea. When a dependent clause begins a sentence, it must be followed by a comma to separate it from the independent clause. The comma signals to readers: "The introductory context is done, now here comes the main point."',

    17: 'This is a simple list of three items: paintings from the Renaissance, sculptures from ancient Greece, and artifacts from Egypt. When list items don\'t contain internal commas, you use regular commas to separate them. Semicolons are only needed in lists when the items themselves contain commas (like "paintings from Paris, France; sculptures from Rome, Italy; artifacts from Cairo, Egypt"). Since these items are simple, commas suffice.',

    18: '"The team practiced diligently all season" is an independent clause. "They won the championship" is another independent clause. "Consequently" is a conjunctive adverb showing cause-and-effect. To properly join independent clauses with conjunctive adverbs, use: semicolon, adverb, comma. Result: "season; consequently, they won." This creates the correct logical flow: their diligent practice consequently led to winning.',

    19: 'This is tricky—the sentence is actually CORRECT as written. "Having won several awards" is a participial phrase modifying "documentary." The main clause is "The documentary...will air on television next month," which is complete and grammatically correct. The participial phrase provides additional information about the documentary. This sentence properly demonstrates how participial phrases can interrupt main clauses when set off by commas.',

    20: 'This relative clause is restrictive (essential to identifying which research paper). The clause "that the professor assigned" specifies exactly which paper is due—not just any paper, but the specific one the professor assigned. Restrictive clauses use "that" (not "which") and do not use commas. If it were non-restrictive (providing extra, non-essential information), it would use "which" with commas. The lack of commas here is correct because the information is essential.',

    21: '"Meanwhile" is a conjunctive adverb showing simultaneous occurrence. Global temperatures rising and polar ice caps melting are happening at the same time. When joining independent clauses with "meanwhile" or any conjunctive adverb, use semicolon before, comma after: "rise; meanwhile, polar ice caps." This punctuation pattern is consistent across all conjunctive adverbs.',

    22: 'The entire first sentence is a dependent clause—"Although the committee reviewed dozens of applications and interviewed many qualified candidates" cannot stand alone because "although" makes it dependent. Putting a period after it creates a fragment. This dependent clause must connect to the independent clause "They selected the most experienced person" with a comma, not a period. The comma creates one complete complex sentence instead of a fragment plus a sentence.',

    23: 'Semicolons have one primary function: joining two independent clauses. "To succeed in this course" is not an independent clause—it\'s an infinitive phrase functioning as a modifier. "You must attend all lectures..." is the independent clause. Since the first part isn\'t independent, a semicolon is wrong. An infinitive phrase at the beginning of a sentence needs a comma, not a semicolon. The comma signals the transition from the introductory phrase to the main clause.',

    24: 'This is a compound predicate, not two independent clauses. The subject "The chef" performs two actions: "prepared the meal" and "served it." Since both verbs share the same subject, this is NOT two independent clauses—it\'s one clause with two verbs (a compound predicate). When "and" joins two verbs in a compound predicate, NO comma is needed. Only use a comma before "and" when it joins two complete independent clauses (each with its own subject and verb).',

    25: 'The restrictive vs. non-restrictive distinction depends on context. If you have only one sister, "who lives in Boston" is non-restrictive (extra information) and needs commas: "My sister, who lives in Boston, is visiting." If you have multiple sisters, the clause is restrictive (it specifies which sister) and needs no commas: "My sister who lives in Boston is visiting" (as opposed to your other sister who lives elsewhere). Most contexts suggest the speaker has one sister, making the commas correct.',

    26: '"The company launched a new product line" is independent. "The marketing campaign was very successful" is independent. Without proper connection, this is a run-on sentence. You need either a period, semicolon, or comma + FANBOYS. Since these are related, positive ideas, comma + "and" creates nice flow: "product line, and the marketing campaign." The comma and conjunction properly join the two independent thoughts.',

    27: '"When the bell rang and students rushed out of the classroom" is entirely dependent because of "when." Even though "students rushed out" looks like it could be independent, the "when" at the beginning makes the whole thing dependent. Remove "when" or properly connect to an independent clause. "When the bell rang, students rushed out of the classroom" fixes it by making the first part dependent ("When the bell rang") and the second part independent ("students rushed out"), properly joined with a comma.',

    28: 'A colon introduces a list, explanation, or elaboration following a complete independent clause. "The recipe requires three main ingredients" is complete and sets up expectation for a list. The colon says "here they come," followed by the list of ingredients. A semicolon would be wrong because a semicolon joins two independent clauses, and "flour, sugar, and eggs" is not an independent clause—it\'s a list. The colon is the correct punctuation for introducing lists.',

    29: '"Moreover" is a conjunctive adverb meaning "in addition" or "furthermore." The experiment yielded surprising results, and moreover (additionally), it challenged existing theories. When joining independent clauses with conjunctive adverbs, use semicolon before and comma after: "results; moreover, it challenged." This pattern is consistent for all conjunctive adverbs: however, therefore, consequently, moreover, nevertheless, etc.',

    30: 'An appositive is a noun phrase that renames or describes another noun. "A renowned expert in marine biology" is an appositive that renames "Dr. Martinez." Appositives providing non-essential information are set off with commas on both sides. The sentence would be complete without the appositive ("Dr. Martinez will speak at the conference"), so the commas correctly mark this as additional, descriptive information.',

    31: 'This follows the dependent-clause-placement rule. When a dependent clause follows an independent clause at the end of a sentence, no comma is needed before the subordinating conjunction. "You can borrow my car" is independent. "If you promise to drive carefully" is dependent and comes after. No comma needed. If reversed ("If you promise to drive carefully, you can borrow my car"), the comma would be required.',

    32: 'Two independent clauses that are closely related in meaning can be elegantly joined with a semicolon. "The novel explores themes of identity and belonging" is complete. "It has received critical acclaim worldwide" is complete and directly relates to the first clause (the acclaim is because of those themes). A semicolon creates stronger connection than a period while maintaining the independence of each clause.',

    33: 'An infinitive phrase ("To understand the complex mathematical concepts") at the beginning of a sentence functions as a modifier and must be followed by a comma before the independent clause begins. Putting a period after "concepts" creates a fragment—infinitive phrases cannot stand alone as sentences. The comma connects the introductory infinitive phrase to the main clause: "To understand the complex mathematical concepts, students must review the fundamentals first."',

    34: 'When "not" introduces a contrasting element, it should be set off with a comma. The sentence emphasizes that the solution is simple, NOT complicated—these are opposite qualities being contrasted. The comma before "not" signals this contrast and helps the reader understand the emphasis. This is similar to how we set off other contrasting elements: "The answer is yes, not maybe."',

    35: 'This complex sentence has multiple punctuation needs. First, the dependent clause "Although the architect\'s initial design was innovative" must be followed by a comma. Second, the phrase "which consisted of experienced professionals" is a non-restrictive clause providing additional information about the committee, so it needs commas around it. The correct punctuation handles both: a comma after "innovative" (ending the dependent clause) and commas around "which consisted of experienced professionals" (marking the non-restrictive clause). This requires careful attention to multiple grammatical structures within one sentence.',

    36: 'The distinction between "that" and "which" is crucial. "That" introduces restrictive clauses (essential information, no commas). "Which" introduces non-restrictive clauses (additional information, with commas). Here, the fact that the medication "had been approved only recently" is additional context, not essential to identifying which medication. We already know which medication from context. Since it\'s non-restrictive information, use "which" with commas: "the medication, which had been approved only recently, was more effective."',

    37: 'When list items themselves contain commas, semicolons must separate the major items to prevent confusion. Each conference attendee is described with internal commas (Dr. Sarah Chen, a physicist from MIT). If we used only commas throughout, readers couldn\'t tell where one attendee ends and the next begins. Semicolons create clear separation: "Dr. Sarah Chen, a physicist from MIT; Professor James Wilson, who specializes in quantum mechanics; and Dr. Maria Rodriguez, an expert in theoretical physics." The semicolons act like super-commas.',

    38: 'Parallel structure requires grammatical consistency in series. This sentence lists three objects of the verb "examined": how students learn (noun clause), what motivates them (noun clause), and the factors that influence their performance (noun phrase functioning as noun clause). All three function as noun clauses—objects of "examined"—and maintain parallel structure. Changing any one would break the parallelism. The current structure maintains consistency: each item answers a question about the study\'s focus.',

    39: 'This sentence has TWO errors requiring TWO fixes. First, "Despite the fact that renewable energy sources are becoming more affordable" is a dependent clause requiring a comma after it. Second, "many countries still rely heavily on fossil fuels, this dependence has significant environmental consequences" is a comma splice—two independent clauses joined with just a comma. Fix both: add comma after "affordable" and change the comma before "this" to a period. The result properly separates the dependent clause from the independent clause AND properly separates two independent clauses.',

    40: 'Understanding restrictive vs. non-restrictive clauses is essential. This clause is restrictive because it specifies exactly which students received higher grades—not all students, only those who completed the extra credit. The clause is essential to the sentence\'s meaning. Restrictive clauses use "who" (or "that") without commas. If the sentence meant all students completed the assignment and we were just adding extra information, it would need commas. But since it\'s specifying which students, no commas are needed.',

    41: 'When a conjunctive adverb interrupts a clause (rather than joining two clauses), it should be set off with commas. Here, "however" interrupts the clause "its profits declined" to add emphasis or contrast. The commas signal: "pause here, there\'s an interrupting element, then continue." Compare to when "however" joins clauses: "The company invested heavily; however, its profits declined." Same word, different punctuation depending on function. When interrupting: commas around it. When joining: semicolon before, comma after.',

    42: 'This is a sophisticated fragment. The sentence has a subject ("The theory") and lots of modifying phrases ("which was developed over decades..."), but it never gets to a main verb. What did the theory DO? The sentence never tells us. Adding a verb phrase like "has been widely accepted" or "revolutionized the field" would complete the thought. As written, we keep waiting for the predicate that never comes. This demonstrates how complex modifiers can disguise the fact that a sentence lacks its core element: the main verb.',

    43: 'Colons can do more than introduce lists—they can also introduce independent clauses that explain or elaborate on the first clause. "The experiment revealed an unexpected finding" sets up expectation, and the colon says "here\'s what it was." What follows is an independent clause explaining the finding: "the control group performed better than the experimental group." The colon creates a cause-effect or general-specific relationship between two independent clauses. This is less common than using colons for lists, but it\'s a powerful rhetorical tool.',

    44: 'This sentence contains parallel noun clauses as the compound object of "announced." The director announced two things: (1) that filming would begin, and (2) that the cast should arrive early. Both clauses start with "that" and function as direct objects of "announced." No additional punctuation is needed between them because they\'re joined by "and," which is appropriate for compound objects. The structure is parallel and correct: that X and that Y. Adding commas would disrupt this clean parallel structure.',

    45: 'The construction "not only...but also" requires strict parallel structure. Whatever grammatical form follows "not only" must match what follows "but also." Here: "not only for its intricate plot development but also for its vivid characterization." Both are prepositional phrases starting with "for." The original "because of" breaks parallelism—"for" and "because of" are different structures. Maintaining "for its" in both positions creates perfect parallel structure. This is a common error with correlative conjunctions (not only/but also, either/or, neither/nor, both/and).',

    46: 'Em dashes (—) are used for emphatic interruptions or to set off appositives that contain internal commas. Here, the appositive "a masterpiece by Rembrandt that was discovered in an attic in Amsterdam and authenticated by leading experts" is long and contains internal commas. Using regular commas to set it off would create confusion about which commas are part of the appositive and which mark its boundaries. Em dashes provide clear visual markers: everything between the dashes is the appositive. This is especially useful for complex, lengthy appositives.',

    47: 'This sentence demonstrates nested clauses. The main structure is: "Although critics argue X, researchers have found Y." Within the argument is a non-restrictive clause: "modern technology, which has transformed how we communicate, has diminished face-to-face interactions." The "which" clause provides additional information about modern technology and correctly appears with commas because it\'s non-restrictive. The sentence thus contains: a dependent clause beginning with "although," a non-restrictive relative clause within that dependent clause, and finally an independent clause. The commas around "which has transformed how we communicate" are essential for clarity.',

    48: 'This sentence lists three parallel premises, and each must maintain the same grammatical structure. The pattern is: (1) that human nature is fundamentally rational; (2) that reason can guide ethical decisions; (3) that morality is universal. All three are noun clauses starting with "that." The original omits "that" before "morality," breaking the parallel structure. This is subtle but important—in formal writing, maintaining consistent parallel structure in lists shows attention to detail and helps clarity. Each premise should be introduced the same way: "that" + subject + verb.',

    49: 'This is a restrictive relative clause identifying which economists are being discussed. The sentence isn\'t talking about ALL economists, only those who study behavioral patterns in financial markets. This subset has identified cognitive biases. Because the clause restricts or limits which economists we\'re discussing, it\'s a restrictive clause and should not have commas. If the sentence were "Economists, who study many topics, have made discoveries," the clause would be non-restrictive (all economists study many topics) and would need commas. The lack of commas here correctly identifies this as restrictive.',

    50: 'This complex sentence has multiple issues requiring careful attention. First, the em dash opening the appositive "which included artifacts dating back millennia" must be closed with another em dash (not a comma). Second, the comma after "civilizations" creates a comma splice—it joins two independent clauses with just a comma. The solution: close the appositive with an em dash, then start a new sentence. The result: "The archaeological discovery—which included artifacts dating back millennia—provided new insights into ancient civilizations. These findings challenged long-held assumptions about early human societies." This properly handles both the appositive punctuation and the sentence boundary.'
  };

  try {
    // Get all questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('id, position, title')
      .eq('lesson_id', lessonId)
      .order('position');

    console.log(`📚 Updating ${questions.length} questions with detailed explanations\n`);

    for (const question of questions) {
      const explanation = detailedExplanations[question.position];

      if (!explanation) {
        console.log(`  ⚠️  No explanation for position ${question.position}`);
        continue;
      }

      const { error } = await supabase
        .from('lesson_examples')
        .update({ answer_explanation: explanation })
        .eq('id', question.id);

      if (error) {
        console.error(`  ❌ Error updating position ${question.position}:`, error.message);
      } else {
        const label = question.position >= 45 ? '🧠 ULTRATHINK' :
                     question.position >= 35 ? '🔥 HARD' :
                     question.position >= 15 ? '📘 MEDIUM' : '✅ EASY';
        console.log(`  ${label} - Position ${question.position}: ${question.title}`);
      }
    }

    console.log('\n✅ All detailed explanations updated successfully!');
    console.log('📊 Distribution:');
    console.log('   Easy (1-14): 14 questions');
    console.log('   Medium (15-34): 20 questions');
    console.log('   Hard (35-44): 10 questions');
    console.log('   Ultrathink (45-50): 6 questions');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

updateDetailedExplanations();
