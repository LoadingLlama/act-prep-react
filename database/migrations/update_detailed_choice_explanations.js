/**
 * Update all choice explanations with more depth and detail
 * Extra comprehensive explanations for ultrathink questions (45-50)
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateDetailedChoiceExplanations() {
  console.log('🚀 Updating choice explanations with more depth...\n');

  const lessonId = 'a5fd241f-9832-4a5d-a7e9-90cb6232c4ac';

  // More detailed explanations for each choice
  const choiceExplanations = {
    1: {
      A: "This creates a sentence fragment. There's no verb connecting 'Fair' to 'a new type of diecast toy car.' Without a linking verb, we have two noun phrases (the toy at the Fair, and a new type) that aren't grammatically connected.",
      B: "Adding a comma doesn't solve the fundamental problem. The sentence still lacks a main verb. A comma alone cannot connect two noun phrases into a complete sentence - you need a verb to show the relationship between them.",
      C: "A semicolon is used to join two independent clauses, but this sentence doesn't have two independent clauses. More importantly, it still lacks the essential verb 'was' that would complete the predicate.",
      D: "✓ Correct. Adding 'was' provides the linking verb that connects the subject (toy) to its complement (a new type of diecast toy car). This completes the sentence structure: subject + linking verb + predicate nominative."
    },
    2: {
      A: "'However' is a conjunctive adverb, not a coordinating conjunction. When joining two independent clauses with a conjunctive adverb, you need a semicolon before it and a comma after. Using just a comma creates a comma splice.",
      B: "'Therefore' is also a conjunctive adverb (like however, moreover, consequently). It would require semicolon punctuation: 'flowers; therefore, this evolutionary advantage.' Plus, 'therefore' implies causation that doesn't fit the logical flow here.",
      C: "✓ Correct. 'And' is a coordinating conjunction from FANBOYS (For, And, Nor, But, Or, Yet, So). When preceded by a comma, it properly connects two independent clauses. It shows addition, which fits perfectly: first clause describes the adaptation, second describes the result.",
      D: "Deleting the portion would create: 'After hummingbirds evolved long, thin beaks to reach pollen in flowers evolutionary advantage allowed them to survive.' This creates an unclear, ungrammatical connection between the dependent clause and the main clause."
    },
    3: {
      A: "✓ Correct. This uses the comma + FANBOYS pattern to properly connect two independent clauses. 'But' is particularly appropriate here because it shows the contrast between loving hockey (positive) and not skating well (limitation). The comma before 'but' is required when joining two complete clauses.",
      B: "'Even though' is a subordinating conjunction that creates a dependent clause. When it appears mid-sentence like this, it needs a comma before it to set off the dependent clause it introduces. Without the comma, the sentence runs together awkwardly.",
      C: "'So' is a FANBOYS conjunction, but it implies that the second clause is a result of the first. This changes the meaning incorrectly - not skating well isn't a result of loving hockey. The relationship is contrast ('although'/'but'), not causation ('so')."
    },
    4: {
      A: "The subordinating conjunction 'while' at the beginning turns the entire sentence into one long dependent clause. A dependent clause cannot stand alone - it needs an independent clause to complete the thought. But this sentence never provides that independent clause, making it a fragment.",
      B: "'Having various types of bread' creates a participial phrase (a phrase beginning with a participle). Participial phrases cannot function as the main clause of a sentence. They need to modify something in an independent clause, which this sentence lacks.",
      C: "'With the bakery having varied bread types' creates a prepositional phrase. Like participial phrases, prepositional phrases cannot serve as independent clauses. This still leaves the sentence without a main clause containing a subject and finite verb.",
      D: "✓ Correct. Removing 'while' transforms the dependent clause into an independent clause. Now we have: 'The bakery varies its types of bread' as the main clause with a clear subject (bakery) and verb (varies). The remaining parts function as modifiers providing additional detail."
    },
    5: {
      A: "'Was raining' is a verb phrase, but it lacks a subject. In English, every clause needs a subject. You can't just have a verb floating without something performing the action. Even impersonal weather expressions need a grammatical subject.",
      B: "✓ Correct. English uses the impersonal pronoun 'it' as a placeholder subject for weather descriptions. This is a fixed pattern: 'it' + weather verb. The 'it' doesn't refer to anything specific - it's purely grammatical, making the sentence complete.",
      C: "The present participle 'raining' alone isn't a complete verb. It needs a helping verb (like 'is' or 'was') to form a complete verb phrase. Even with a helping verb, this would still need the subject 'it' to be grammatical.",
      D: "The infinitive 'to rain' is a non-finite verb form - it cannot serve as the main verb of a clause. Infinitives function as nouns, adjectives, or adverbs, but never as the predicate of a sentence."
    },
    6: {
      A: "This is a run-on sentence (also called a fused sentence). You have two independent clauses - 'The concert was amazing' and 'the band played for two hours' - placed directly next to each other with no punctuation or conjunction. This violates sentence structure rules.",
      B: "✓ Correct. The comma + FANBOYS conjunction 'and' is one of the standard ways to connect two independent clauses. The comma signals a pause, and 'and' shows that these are related, complementary ideas (both describe positive aspects of the event).",
      C: "A semicolon would work grammatically to connect these two independent clauses. However, 'and' creates a smoother flow and better emphasizes that both details contribute to the overall positive experience. Semicolons tend to emphasize equality or contrast.",
      D: "When you use a FANBOYS conjunction to connect two independent clauses, you must place a comma before the conjunction. Without the comma, you create an error similar to a run-on sentence. The comma is not optional in this construction."
    },
    7: {
      A: "This is a comma splice - using only a comma to join two independent clauses. 'She studied all night' is complete, and 'she still felt unprepared for the exam' is complete. A comma alone lacks the grammatical strength to connect them properly.",
      B: "✓ Correct. A semicolon is specifically designed to connect two closely related independent clauses. It's stronger than a comma but shows a closer relationship than a period would. Perfect for showing how these two contrasting ideas are intimately connected.",
      C: "Removing all punctuation creates a run-on sentence (fused sentence). The two independent clauses run together without any separation, making the sentence grammatically incorrect and harder to read.",
      D: "While adding a conjunction might seem logical, this option is incomplete. You would need 'but she' or ', but she' to properly connect the clauses. Just starting a new clause with 'she' after this punctuation creates confusion."
    },
    8: {
      A: "'Studying' is a present participle, which is a non-finite verb form. Non-finite verbs cannot serve as the main verb of a sentence. Think of it as an adjective or part of a verb phrase, not a complete verb on its own.",
      B: "✓ Correct. 'Are studying' is the present progressive (continuous) tense, formed by the helping verb 'are' plus the present participle 'studying.' This construction creates a complete finite verb that can serve as the predicate, indicating an ongoing action.",
      C: "Simple past tense 'studied' creates a complete verb, but the context suggests an ongoing action happening right now (students currently in the library). The progressive tense 'are studying' better captures this continuous, in-progress meaning.",
      D: "The infinitive 'to study' is another non-finite verb form. Infinitives function as nouns, adjectives, or adverbs in sentences, but they cannot be the main verb of a clause. They express potential or purpose, not active predication."
    },
    9: {
      A: "✓ Correct. This is a fundamental punctuation rule: when a coordinating conjunction (FANBOYS: For, And, Nor, But, Or, Yet, So) joins two independent clauses, you must place a comma before the conjunction. Both clauses here are independent, so the comma is required.",
      B: "Omitting the comma before 'but' when it joins two independent clauses is incorrect. The comma isn't just stylistic - it's grammatically necessary to signal the boundary between the two clauses and to indicate the shift from one complete thought to another.",
      C: "You can use either a semicolon OR a comma + conjunction to join independent clauses, but not both at once. Using both creates redundancy. If you use a semicolon, you don't need 'but.' If you use 'but,' you need a comma (not a semicolon) before it.",
      D: "This is the same as the original error (choice A already had this problem). When a FANBOYS word joins two independent clauses, the comma before it is mandatory, not optional."
    },
    10: {
      A: "When a dependent clause begins a sentence, it must be followed by a comma before the independent clause starts. Without the comma, readers can't easily distinguish where the introductory context ends and the main idea begins.",
      B: "✓ Correct. The comma after 'ended' properly separates the dependent clause ('After the game ended') from the independent clause ('the fans celebrated in the streets'). This follows the standard pattern for complex sentences starting with dependent clauses.",
      C: "The comma is in the wrong position. It should come after the entire dependent clause ('After the game ended'), not in the middle of it. Putting it after 'After' breaks up the subordinate clause illogically.",
      D: "Changing the word order to 'The game ended after' disrupts the intended meaning and creates confusion about when things happened. The original 'After the game ended' clearly establishes the time sequence that the rest of the sentence describes."
    },
    11: {
      A: "'Which serves the best pizza in town' is a relative clause beginning with 'which.' Relative clauses are dependent - they cannot stand alone as complete sentences. They need to be attached to an independent clause that contains the noun they modify.",
      B: "✓ Correct. Replacing 'which' with the pronoun 'it' creates a complete independent clause. 'It' becomes the subject, 'serves' is the verb, and 'the best pizza in town' is the object. This transformation turns a fragment into a complete sentence.",
      C: "Using just the verb 'serves' without a subject creates a different kind of fragment. Every clause needs both a subject and a verb. While imperative sentences can have implied subjects ('You'), this clearly isn't a command, so it needs an explicit subject.",
      D: "'That serves the best pizza in town' is still a relative clause, just like 'which serves.' Both 'that' and 'which' introduce dependent relative clauses. Neither can stand alone as a sentence - both need an independent clause to attach to."
    },
    12: {
      A: "Using only a comma before 'however' creates a comma splice. 'However' is a conjunctive adverb, not a coordinating conjunction like FANBOYS words. Conjunctive adverbs require stronger punctuation (semicolon) to join independent clauses.",
      B: "✓ Correct. This follows the required punctuation pattern for conjunctive adverbs: semicolon before, comma after. The pattern is: [independent clause]; however, [independent clause]. This applies to all conjunctive adverbs (therefore, moreover, consequently, nevertheless, etc.).",
      C: "'And however' is redundant and awkward. 'And' is a coordinating conjunction, while 'however' is a conjunctive adverb - they serve similar connecting functions, so using both together is unnecessary and creates clumsy phrasing.",
      D: "Removing all punctuation creates a run-on sentence. Two independent clauses cannot simply be placed next to each other without proper connection, whether that's a period, semicolon, or comma + coordinating conjunction."
    },
    13: {
      A: "✓ Correct. This follows the punctuation rule for dependent clauses that come at the END of sentences: no comma before the subordinating conjunction. The pattern is: [independent clause] [subordinating conjunction] [dependent clause] - no comma needed.",
      B: "Adding a comma before 'unless' is incorrect when the dependent clause follows the independent clause. Commas before subordinating conjunctions are only used when the dependent clause comes FIRST in the sentence.",
      C: "Semicolons join independent clauses. 'If you promise to drive carefully' is a dependent clause, not independent (it can't stand alone). Using a semicolon here incorrectly treats the dependent clause as if it were independent.",
      D: "Placing a comma after 'if' breaks up the subordinating conjunction from its clause illogically. The comma should come before the conjunction (if at all), not within the dependent clause it introduces."
    },
    14: {
      A: "A clause beginning with 'because' is a dependent clause - it cannot stand alone as a sentence. The period after 'closed' attempts to make this dependent clause into a complete sentence, creating a fragment.",
      B: "Removing the period helps, but without proper punctuation to connect it to the following clause, this still creates problems. The two clauses need to be clearly linked, not just placed next to each other.",
      C: "✓ Correct. The comma replaces the period, properly connecting the dependent clause ('Because the library was closed') to the independent clause ('We studied at the coffee shop instead'). This follows the rule: dependent clause + comma + independent clause.",
      D: "This removes 'because,' which fundamentally changes the meaning. The original shows causation (we studied at the coffee shop BECAUSE the library was closed). Removing 'because' eliminates this cause-and-effect relationship and just presents two facts."
    },
    15: {
      A: "'Therefore' is a conjunctive adverb. When conjunctive adverbs join two independent clauses, they require semicolon punctuation before them. Using only a comma creates a comma splice error.",
      B: "✓ Correct. The pattern for conjunctive adverbs is: [independent clause]; therefore, [independent clause]. The semicolon provides strong enough punctuation to separate the two complete thoughts, while 'therefore' shows the logical relationship (conclusion or result).",
      C: "'And therefore' combines a coordinating conjunction ('and') with a conjunctive adverb ('therefore'). This is redundant - both words serve to connect ideas, so using both together is wordy and creates awkward phrasing. Choose one or the other.",
      D: "Removing all punctuation creates a run-on sentence. Two independent clauses need proper separation. Without any punctuation or conjunction, the clauses improperly fuse together, making the sentence grammatically incorrect."
    },
    16: {
      A: "The dependent clause 'While some students preferred online learning' is not separated from the independent clause. When a dependent clause begins a sentence, it must be followed by a comma to signal where it ends and the main clause begins.",
      B: "✓ Correct. The comma after 'learning' properly separates the introductory dependent clause from the independent clause 'others found traditional classrooms more effective.' This follows the standard punctuation pattern for complex sentences beginning with subordinate clauses.",
      C: "Placing the comma after 'While' instead of after the entire dependent clause is incorrect. The comma should mark the boundary between the complete dependent clause and the independent clause, not split the dependent clause internally.",
      D: "Removing 'while' eliminates the contrast the sentence is trying to establish. 'While' signals that these are two different preferences being compared. Without it, the sentence just states two facts without showing they represent contrasting viewpoints."
    },
    17: {
      A: "Semicolons in lists are only necessary when the individual items contain internal commas. For example: 'paintings from Paris, France; sculptures from Rome, Italy.' These items are simple with no internal punctuation, so regular commas are correct.",
      B: "✓ Correct. In a simple list where items don't contain internal commas, use regular commas to separate items. This is the standard punctuation for basic lists: item, item, and item. Semicolons would be overkill here.",
      C: "This creates a run-on by removing necessary punctuation. List items need separation, whether by commas or semicolons. Without any punctuation, readers can't tell where one item ends and another begins.",
      D: "Colons introduce lists, but they come before the list begins, not in the middle of it. You might use a colon to introduce this list: 'The museum features: paintings from the Renaissance, sculptures from ancient Greece...' But you can't use a colon mid-list."
    },
    18: {
      A: "Two independent clauses placed directly next to each other with no punctuation or conjunction creates a run-on sentence (also called a fused sentence). This violates fundamental sentence structure rules.",
      B: "Using only a comma before the conjunctive adverb 'consequently' creates a comma splice. Conjunctive adverbs require stronger punctuation than regular coordinating conjunctions - they need a semicolon before them when joining clauses.",
      C: "✓ Correct. This follows the required pattern for conjunctive adverbs: [clause]; consequently, [clause]. The semicolon gives the grammatical strength needed to separate two independent clauses, while 'consequently' shows the logical relationship (cause and effect).",
      D: "'And consequently' uses both a coordinating conjunction and a conjunctive adverb together, which is redundant. Both serve connection functions, so using both creates wordy, awkward phrasing. Additionally, this doesn't fix the lack of proper punctuation before 'and.'"
    },
    19: {
      A: "✓ Correct. 'Having won several awards' is a participial phrase that modifies 'documentary.' The main clause 'The documentary...will air on television next month' is grammatically complete and correct. The participial phrase adds extra information without disrupting the core sentence structure.",
      B: "Changing the structure disrupts the natural flow. The original participial phrase elegantly provides background information about the documentary. Altering it makes the sentence more awkward without adding clarity or improving grammar.",
      C: "Changing the tense to 'had won' (past perfect) isn't wrong, but it unnecessarily complicates the time frame. The present perfect 'having won' effectively shows that the awards preceded the current situation, which is all we need to convey.",
      D: "Simple past 'won' changes the grammatical structure from a participial phrase to potentially a relative clause, but it creates ambiguity. It's unclear whether this is meant to modify 'documentary' or serve another function. The participial phrase is clearer."
    },
    20: {
      A: "✓ Correct. This is a restrictive relative clause - it's essential to identifying which research paper is due. The clause 'that the professor assigned' specifies exactly which paper we're talking about. Restrictive clauses don't use commas because removing them would change the essential meaning.",
      B: "Adding commas would make this a non-restrictive clause, implying the information is just additional detail. But 'that the professor assigned' isn't extra information - it's essential for identifying which specific paper is due. Commas would incorrectly suggest any research paper is due.",
      C: "'Whom' is used for objects of verbs or prepositions when referring to people. But the clause needs a subject (who/that did the assigning), and 'which' is for things, not the professor. Even if grammatically adjusted, the punctuation issue remains.",
      D: "Using only one comma treats the clause as if it has an opening but no closing boundary. If you're going to make it non-restrictive with commas, you need commas on both sides. But as explained, no commas is correct because this is restrictive."
    },
    21: {
      A: "Using only a comma before 'meanwhile' creates a comma splice. 'Meanwhile' is a conjunctive adverb that requires stronger punctuation than coordinating conjunctions. It needs a semicolon before it when connecting independent clauses.",
      B: "✓ Correct. The semicolon before 'meanwhile' and comma after it follows the standard pattern for conjunctive adverbs joining independent clauses. This pattern applies to all conjunctive adverbs: however, moreover, consequently, nevertheless, furthermore, meanwhile, etc.",
      C: "'And meanwhile' is redundant, using both a coordinating conjunction and a conjunctive adverb to do the same job. This creates wordy, awkward phrasing. Choose one connecting word or the other, not both together.",
      D: "Omitting all punctuation creates a run-on sentence. Two independent clauses must be separated by either (1) a period, (2) a semicolon, (3) a comma + coordinating conjunction, or (4) a semicolon + conjunctive adverb. They cannot simply run together."
    },
    22: {
      A: "The subordinating conjunction 'although' at the start makes everything that follows a dependent clause. But there's no independent clause to complete the sentence. The period cuts off the dependent clause before it can connect to a main clause, creating a fragment.",
      B: "✓ Correct. Replacing the period with a comma properly attaches the dependent clause to the independent clause that follows. The pattern becomes: [dependent clause], [independent clause]. This creates one complete complex sentence instead of a fragment plus a sentence.",
      C: "Removing 'although' would make it independent, but it changes the meaning significantly. 'Although' establishes a contrast: despite reviewing many applications, they selected one person. Without 'although,' you lose this contrastive relationship between the clauses.",
      D: "A participial phrase beginning with 'reviewing' would still create a fragment if separated by a period. Participial phrases need to attach to independent clauses that they modify. They can't stand alone as sentences."
    },
    23: {
      A: "Semicolons have one primary job: joining two independent clauses. 'To succeed in this course' is an infinitive phrase, not an independent clause (it lacks a subject and finite verb). Using a semicolon here misapplies this punctuation mark.",
      B: "Removing all punctuation creates unclear sentence structure. The introductory infinitive phrase needs some punctuation to mark its boundary and signal the transition to the main clause.",
      C: "✓ Correct. When an infinitive phrase introduces a sentence, follow it with a comma before the independent clause begins. The pattern is: [infinitive phrase], [independent clause]. This makes the sentence structure clear and easy to parse.",
      D: "Colons introduce lists, explanations, or elaborations after complete independent clauses. But 'To succeed in this course' isn't an independent clause - it's a phrase. Colons don't work after introductory phrases; they work after complete clauses."
    },
    24: {
      A: "This has a comma before 'and,' but no comma is needed here. This is a compound predicate (one subject with two verbs), not two independent clauses. The chef does two things: prepared AND served. Same subject, multiple verbs = no comma.",
      B: "✓ Correct. Compound predicates occur when one subject performs multiple actions. Pattern: [subject] [verb] and [verb]. Example: 'The chef prepared the meal carefully and served it with pride.' No comma is needed because there's only one subject.",
      C: "A semicolon is for joining two independent clauses. But this isn't two independent clauses - it's one clause with a compound predicate (two verbs sharing the same subject). Semicolons don't belong in compound predicates.",
      D: "This has the same error as choice A - using a comma when none is needed. The rule is: comma before 'and' only when joining two independent clauses (each with its own subject and verb), not for compound predicates."
    },
    25: {
      A: "If you have only one sister, information about where she lives is non-restrictive (extra detail, not essential for identification). Non-restrictive clauses need commas around them. Without commas, it incorrectly suggests you have multiple sisters and need to specify which one.",
      B: "✓ Correct (assuming you have one sister). Commas on both sides mark this as a non-restrictive clause providing additional information. If you have multiple sisters, this would be wrong - it would need no commas (restrictive). Context typically suggests one sister, making the commas correct.",
      C: "'Whom' is the object form of 'who,' but this clause needs a subject (who/that lives in Boston). 'Whom' would only work if the sister were the object: 'my sister whom I visited in Boston.' Here, the sister is doing the living, so 'who' is correct.",
      D: "Using only one comma (either opening or closing the clause) is incorrect. If the clause is non-restrictive and needs commas to set it off, you need both commas - one to open and one to close. Half-marking boundaries creates ambiguity."
    },
    26: {
      A: "Two independent clauses placed next to each other with no connection creates a run-on sentence. 'The company launched a new product line' is complete, and 'the marketing campaign was very successful' is complete. They need proper punctuation or conjunction.",
      B: "A comma alone between two independent clauses creates a comma splice. Commas aren't strong enough to join independent clauses by themselves - they need a coordinating conjunction (FANBOYS) to help them.",
      C: "Using 'and' without a comma creates an error. The rule is: comma + FANBOYS when joining independent clauses. The comma isn't optional - both parts (comma and conjunction) are required for correct punctuation.",
      D: "✓ Correct. Comma + coordinating conjunction 'and' is one of the three standard ways to join independent clauses (along with semicolon and period). The comma signals the boundary, and 'and' shows these related ideas both describe success."
    },
    27: {
      A: "'When the bell rang and students rushed out of the classroom' is entirely dependent because of 'when' at the start. Even though 'students rushed out' looks independent, the 'when' at the beginning makes the entire structure dependent, creating a fragment with no independent clause.",
      B: "✓ Correct. This properly divides the sentence: 'When the bell rang' is a dependent clause, followed by a comma, then 'students rushed out of the classroom' as the independent clause. Pattern: [dependent clause], [independent clause].",
      C: "Removing 'when' would make it independent: 'The bell rang and students rushed out.' This works grammatically but changes the time relationship. The original shows causation (students rushed out WHEN the bell rang), which this version loses.",
      D: "Adding 'and' after 'when' doesn't fix the dependent clause issue. The 'when' still makes everything that follows dependent. You can't have 'when' + two coordinated clauses and expect one to magically become independent."
    },
    28: {
      A: "Semicolons join independent clauses. 'Flour, sugar, and eggs' is a list (not an independent clause). The semicolon incorrectly suggests the list that follows is an independent clause, which it clearly isn't.",
      B: "✓ Correct. Colons introduce lists, explanations, or elaborations that follow complete independent clauses. 'The recipe requires three main ingredients' is complete, and the colon signals 'here's what they are.' This is a textbook use of the colon.",
      C: "This creates a run-on structure. Without punctuation between the clause and the list, the sentence lacks proper separation. Readers need a signal (the colon) to know the list is about to begin.",
      D: "Using just a comma before a list is too weak. Lists introduced after independent clauses need colons to clearly signal the introduction. Commas separate items within lists, but colons introduce the list itself."
    },
    29: {
      A: "A comma before 'moreover' creates a comma splice. 'Moreover' is a conjunctive adverb, which requires semicolon punctuation (not just a comma) when joining independent clauses.",
      B: "✓ Correct. The semicolon before 'moreover' and comma after it follows the required pattern for conjunctive adverbs. This pattern is consistent across all conjunctive adverbs when they join independent clauses.",
      C: "'And moreover' redundantly uses both a coordinating conjunction and a conjunctive adverb. Both perform the same connecting function, so using both together is wordy and unnecessary. Pick one or the other.",
      D: "Omitting punctuation entirely creates a run-on sentence. Two independent clauses must have proper separation: period, semicolon, comma + coordinating conjunction, or semicolon + conjunctive adverb."
    },
    30: {
      A: "✓ Correct. 'A renowned expert in marine biology' is an appositive phrase that renames Dr. Martinez. Appositives providing non-essential information are set off with commas on both sides. The sentence is complete without this phrase, so the commas correctly mark it as additional detail.",
      B: "Removing the commas would make the appositive restrictive, suggesting there are multiple Dr. Martinezes and we need this phrase to identify which one. But typically, a person's name is unique identification, making the descriptive phrase non-essential and requiring commas.",
      C: "Changing the appositive to a relative clause with 'who is' is grammatically acceptable but less concise. Appositives are more elegant and direct than relative clauses when simply renaming or describing a noun. The original is better writing.",
      D: "Using 'who is' without commas creates an error. If you're going to use a relative clause, and it's non-restrictive (which this clearly is), you need commas. But the appositive structure (choice A) is superior stylistically."
    },
    31: {
      A: "✓ Correct. When a dependent clause follows an independent clause at the end of a sentence, no comma precedes the subordinating conjunction. Pattern: [independent clause] [subordinating conjunction] [dependent clause]. This is the opposite of when the dependent clause comes first.",
      B: "Adding a comma before 'if' when the dependent clause comes last is incorrect. The rule: comma after a dependent clause when it starts the sentence, but no comma before it when it ends the sentence.",
      C: "Semicolons join independent clauses, not an independent clause to a dependent one. 'If you promise to drive carefully' is dependent (can't stand alone), so a semicolon misrepresents its grammatical status.",
      D: "The comma after 'if' breaks up the subordinating conjunction from its clause illogically. If any comma were used (which isn't needed here), it would go before 'if,' not after it."
    },
    32: {
      A: "Two independent clauses placed directly together with no punctuation creates a run-on sentence. Both 'The novel explores themes' and 'it has received acclaim' are complete thoughts requiring proper separation.",
      B: "Using only a comma between independent clauses creates a comma splice. Commas need help from coordinating conjunctions (FANBOYS) to join independent clauses properly.",
      C: "✓ Correct. A semicolon properly joins two closely related independent clauses. It's perfect here because the second clause directly relates to the first - the acclaim is presumably because of the themes it explores. The semicolon shows this close relationship.",
      D: "Comma + 'and' would work grammatically, but the semicolon better emphasizes the close relationship between these ideas. 'And' makes them more equal, while the semicolon shows the second flows directly from the first."
    },
    33: {
      A: "An infinitive phrase ('To understand...concepts') cannot stand alone as a sentence. Infinitive phrases function as modifiers or nouns, but they lack a subject and finite verb, making them unable to form independent clauses. The period creates a fragment.",
      B: "✓ Correct. The comma properly connects the introductory infinitive phrase to the independent clause. Pattern: [infinitive phrase], [independent clause]. The comma signals where the introductory element ends and the main clause begins.",
      C: "Changing 'to understand' to 'understanding' creates a different kind of phrase (participial instead of infinitive), but doesn't fix the fragment if separated by a period. It still needs to connect to the independent clause with a comma.",
      D: "This changes the preposition but doesn't address the fundamental issue. Whether it's 'to understand' or 'for understanding,' it's still an introductory phrase that needs a comma (not a period) before the main clause."
    },
    34: {
      A: "A contrasting element introduced by 'not' should be set off with a comma. Without the comma, the contrast isn't clearly marked, making it harder for readers to process the emphasis being placed on 'simple' as opposed to 'complicated.'",
      B: "✓ Correct. The comma before 'not' sets off the contrasting element, helping readers understand the emphasis: the solution is simple (not complicated). This pattern applies whenever 'not' introduces a contrasting element.",
      C: "A semicolon is far too strong for setting off a simple contrasting word or phrase. Semicolons join independent clauses or separate complex list items - they don't set off contrasting elements within a clause.",
      D: "Using 'and not' changes the structure slightly but doesn't improve it. The original with just 'not' and a comma is cleaner and more direct for expressing this contrast."
    },
    35: {
      A: "This is missing the comma after 'innovative.' The dependent clause 'Although the architect's initial design was innovative' needs to be separated from the independent clause. Additionally, the non-restrictive clause isn't properly set off.",
      B: "This adds the comma after the dependent clause ('innovative,') but fails to set off the non-restrictive clause 'which consisted of experienced professionals' with commas. Non-restrictive clauses need commas on both sides.",
      C: "✓ Correct. This has both required punctuation elements: (1) comma after the dependent clause 'Although...innovative,' and (2) commas around the non-restrictive clause 'which consisted of experienced professionals.' Both are essential for proper sentence structure.",
      D: "This lacks the comma after 'innovative,' leaving the dependent clause improperly connected to the independent clause. While it might set off the 'which' clause, the dependent clause issue remains."
    },
    36: {
      A: "'That' introduces restrictive clauses (essential information, no commas). But the information about when the medication was approved is additional context, not essential for identifying which medication. This calls for 'which' with commas.",
      B: "'Which' is correct for non-restrictive clauses, but without commas around it, the clause isn't properly set off. Non-restrictive clauses must have commas on both sides to mark them as parenthetical information.",
      C: "'That' never takes commas (it's for restrictive clauses), so having commas with 'that' violates the restrictive/non-restrictive distinction. If the information needs commas (non-restrictive), use 'which.' If not (restrictive), use 'that.'",
      D: "✓ Correct. 'Which' introduces a non-restrictive clause (additional information about the medication), and the commas on both sides properly set off this clause. The phrase adds context but isn't essential to identifying which medication is being discussed."
    },
    37: {
      A: "✓ Correct. When list items contain internal commas (like 'Dr. Sarah Chen, a physicist from MIT'), you must use semicolons to separate the major items. Otherwise, readers can't tell where one person ends and the next begins. Semicolons act as 'super-commas' in these situations.",
      B: "Using only commas creates confusion: 'Dr. Sarah Chen, a physicist from MIT, Professor James Wilson, who...' - readers can't easily distinguish the three people from each other because the commas within items blend with commas between items.",
      C: "Colons introduce lists but don't separate items within lists. You might use a colon before this list begins, but you can't use colons to separate the individual people from each other.",
      D: "Using 'and' without proper semicolon separation doesn't solve the confusion about where items begin and end. The semicolons are essential for clarity when items have internal punctuation."
    },
    38: {
      A: "✓ Correct. All three objects of 'examined' are parallel noun clauses: 'how students learn' (noun clause), 'what motivates them' (noun clause), and 'the factors that influence...' (noun phrase functioning as a noun clause). This maintains consistent grammatical structure.",
      B: "This breaks the parallel structure by changing one element to a different grammatical form. All items in a series should maintain the same structure for clarity and elegance.",
      C: "Changing to a simple noun phrase breaks parallelism with the other two noun clauses. While grammatically acceptable in isolation, it violates the principle that items in a series should match structurally.",
      D: "Awkward phrasing disrupts the parallel structure and makes the sentence harder to follow. The original maintains clean, parallel construction that's easier to process."
    },
    39: {
      A: "Missing the comma after 'affordable' leaves the dependent clause 'Despite the fact that...affordable' improperly connected to the independent clause. Additionally, the comma splice between 'fossil fuels' and 'this dependence' remains unfixed.",
      B: "This fixes the comma after the dependent clause but leaves the comma splice: 'many countries still rely heavily on fossil fuels, this dependence.' Two independent clauses cannot be joined with only a comma.",
      C: "This also fixes the dependent clause comma but still has the comma splice. The comma between 'fossil fuels' and 'this dependence' incorrectly joins two independent clauses.",
      D: "✓ Correct. This fixes both errors: (1) comma after the dependent clause 'affordable,' properly separating it from the independent clause, and (2) period instead of comma before 'this dependence,' correctly separating two independent clauses."
    },
    40: {
      A: "✓ Correct. This is a restrictive clause specifying exactly which students - only those who completed the extra credit. Restrictive clauses are essential to the sentence's meaning and don't use commas. Not all students got higher grades, only the specific subset who did the extra work.",
      B: "Commas make this non-restrictive, suggesting ALL students completed the assignment and we're just adding extra information. But the clause is essential - it specifies which students got higher grades. Commas change the meaning incorrectly.",
      C: "'Whom' is the object form, but this clause needs a subject (who completed the assignment). 'Whom' would work in 'students whom the teacher praised,' but here students are performing the action, requiring the subject form 'who.'",
      D: "One comma incorrectly half-marks the clause. If it were non-restrictive, it would need commas on both sides. But it's restrictive (no commas), so even one comma is wrong."
    },
    41: {
      A: "When 'however' interrupts a clause (rather than joining two clauses), it needs commas around it. Without commas, 'however' blends into the clause awkwardly. The commas show it's a parenthetical insertion adding emphasis.",
      B: "✓ Correct. The commas around 'however' properly set it off as an interrupting element within the clause. Compare this to joining clauses: 'invested heavily; however, profits declined' vs. interrupting: 'profits, however, declined.' Different functions, different punctuation.",
      C: "Just a semicolon doesn't work mid-clause. Semicolons join independent clauses or separate complex list items - they don't set off interrupting elements within a single clause. That's what commas do.",
      D: "One comma isn't enough. When a word or phrase interrupts mid-clause, it needs commas on both sides to mark the boundaries of the interruption: opening comma before it, closing comma after it."
    },
    42: {
      A: "This sentence has a subject ('The theory') and extensive modifying phrases, but it never provides a main verb. What did the theory DO? As written, we keep waiting for the predicate that never arrives, making this a fragment despite its length and complexity.",
      B: "This still lacks the main verb. Having a subject and modifiers isn't enough - every sentence needs a finite verb in its predicate. The modifying clauses don't contain the main verb, so the sentence remains incomplete.",
      C: "Simplifying the modifiers doesn't fix the missing verb problem. The core issue is that there's no predicate telling us what the theory did, is, or was.",
      D: "✓ Correct. Adding a verb phrase like 'has been widely accepted' or 'revolutionized the field' provides the missing predicate. Now the sentence is complete: subject (theory) + modifiers + verb (has been) + complement (accepted)."
    },
    43: {
      A: "✓ Correct. Colons can introduce independent clauses that explain or elaborate on the first clause. The pattern: [independent clause]: [independent clause explaining the first]. The colon says 'here's what the finding was,' and what follows explains the unexpected result.",
      B: "A comma between two independent clauses creates a comma splice. Commas aren't strong enough to join independent clauses without help from coordinating conjunctions.",
      C: "A semicolon works grammatically to join independent clauses, but the colon is better here because it shows the specific relationship: the second clause explains the finding mentioned in the first. The colon emphasizes this explanatory relationship.",
      D: "No punctuation creates a run-on sentence. Two independent clauses need separation - period, semicolon, comma + conjunction, or colon (when the second explains the first)."
    },
    44: {
      A: "✓ Correct. These are two parallel noun clauses functioning as the compound object of 'announced.' The pattern: announced [that X and that Y]. Both clauses are objects of the same verb, joined cleanly by 'and' with no additional punctuation needed.",
      B: "Adding a comma disrupts the parallel structure of the compound object. When two noun clauses serve as joint objects joined by 'and,' no comma is needed between them.",
      C: "This comma placement is awkward and breaks the natural flow of the parallel noun clauses. The 'and' alone is sufficient to join them.",
      D: "Extra punctuation interferes with the clean parallel structure. The two 'that' clauses are parallel objects of 'announced,' and 'and' is the only connector needed."
    },
    45: {
      A: "'Because of' is a prepositional phrase, while 'for its' (in 'for its intricate plot') is also a prepositional phrase. BUT 'because of the vivid' doesn't parallel 'for its intricate' - the structures differ. Parallel structure requires matching grammatical forms.",
      B: "✓ Correct. 'Not only for its intricate plot development but also for its vivid characterization' maintains perfect parallel structure. Both parts use the same construction: 'for its' + noun phrase. This creates elegant, balanced prose that's easy to follow.",
      C: "This breaks parallel structure by using a different grammatical construction after 'but also.' Whatever follows 'not only' must match what follows 'but also' in form and structure.",
      D: "Simply adding a comma doesn't fix the parallel structure issue. The problem is the grammatical construction 'because of' doesn't match 'for its,' not a punctuation problem."
    },
    46: {
      A: "✓ Correct. Em dashes (—) are perfect for setting off a lengthy appositive that contains internal commas. Using regular commas would create confusion: 'painting, a masterpiece by Rembrandt that was discovered in an attic in Amsterdam and authenticated by leading experts, will...' - readers can't easily tell which commas are internal and which mark boundaries.",
      B: "Regular commas setting off this appositive would create ambiguity because the appositive itself contains commas ('in Amsterdam'). Em dashes provide stronger, clearer boundaries than commas when the appositive has internal punctuation.",
      C: "Using only one em dash (opening but not closing the appositive) leaves the boundary unclear. If you use em dashes to set something off, you need both - one to open and one to close.",
      D: "Parentheses would work grammatically but are weaker and more timid than em dashes. Em dashes create emphasis and drama, while parentheses diminish importance. Em dashes better suit this vivid description of a valuable masterpiece."
    },
    47: {
      A: "✓ Correct. 'Which has transformed how we communicate' is a non-restrictive relative clause providing additional information about technology. Non-restrictive clauses use 'which' (not 'that') and require commas on both sides. This interrupts the main clause to add context without being essential to the sentence's core meaning.",
      B: "'That' introduces restrictive clauses (essential information, no commas). But the information about transformation isn't essential to the sentence's main point - it's additional context. Non-restrictive clauses require 'which' with commas.",
      C: "Using 'that' without commas treats this as restrictive, but the information is clearly non-essential. The main argument works without this clause; it just adds supporting detail. This calls for 'which' with commas.",
      D: "One comma suggests the clause opens but doesn't properly close. Non-restrictive clauses need commas on both sides to mark their boundaries clearly."
    },
    48: {
      A: "The first two premises use 'that' to introduce noun clauses: 'that human nature...' and 'that reason...' But the third premise lacks 'that': 'morality is universal.' This breaks the parallel structure - all three should match grammatically.",
      B: "Adding a comma doesn't fix the parallel structure issue. The problem isn't punctuation - it's that one item in the series doesn't match the others grammatically. All three need the same construction: 'that' + clause.",
      C: "Adding 'that' in the wrong position doesn't help. The structure should be: first, that X; second, that Y; third, that Z. Each item needs 'that' introducing its clause.",
      D: "✓ Correct. All three premises now start with 'that': 'that human nature is..., that reason can..., and that morality is...' This maintains perfect parallel structure, making the three-part argument clear and balanced."
    },
    49: {
      A: "✓ Correct. This restrictive clause specifies which economists - only those who study behavioral patterns, not all economists. Restrictive clauses are essential to meaning and don't use commas. The clause narrows down the subject to a specific subset.",
      B: "Commas make this non-restrictive, implying ALL economists study behavioral patterns and we're just adding extra information. But the clause is essential - it identifies a specific group of economists distinct from others.",
      C: "'That' works for restrictive clauses, but 'who' is preferred when referring to people. Both are grammatically acceptable for restrictive clauses, but 'who' is more natural and less mechanical sounding when the antecedent is human.",
      D: "Commas make it non-restrictive, which changes the meaning to suggest all economists study these patterns. The lack of commas correctly identifies this as restrictive, specifying a particular subset of economists."
    },
    50: {
      A: "This has two errors: (1) the em dash opening the appositive never closes (it needs a matching closing em dash), and (2) the comma between 'civilizations' and 'these findings' creates a comma splice between two independent clauses.",
      B: "This mixes an em dash with a comma, which is inconsistent. If you open with an em dash, close with an em dash. Also, the comma splice between the two independent clauses remains unfixed.",
      C: "✓ Correct. The closing em dash properly matches the opening em dash, clearly marking the boundaries of the appositive. The period after 'civilizations' correctly separates two independent clauses, fixing the comma splice. Both structural errors are resolved.",
      D: "While this might fix the comma splice by using a semicolon (though shown as a comma here), it doesn't properly close the em dash appositive. The opening em dash needs a matching closing em dash to mark the appositive's boundaries."
    }
  };

  try {
    // Get all questions
    const { data: questions } = await supabase
      .from('lesson_examples')
      .select('id, position, title, choices')
      .eq('lesson_id', lessonId)
      .order('position');

    console.log(`📚 Updating ${questions.length} questions with detailed choice explanations\n`);

    for (const question of questions) {
      const explanations = choiceExplanations[question.position];

      if (!explanations) {
        console.log(`  ⚠️  No explanations for position ${question.position}`);
        continue;
      }

      // Update the choices array to include detailed explanations
      const choices = question.choices;
      const updatedChoices = choices.map(choice => {
        const letter = choice.letter;
        return {
          ...choice,
          explanation: explanations[letter] || ''
        };
      });

      const { error } = await supabase
        .from('lesson_examples')
        .update({ choices: updatedChoices })
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

    console.log('\n✅ All detailed choice explanations updated!');

  } catch (error) {
    console.error('\n❌ Error:', error);
    process.exit(1);
  }
}

updateDetailedChoiceExplanations();
