import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../.env') });

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const log = {
  info: (msg) => console.log(`ℹ️  ${msg}`),
  success: (msg) => console.log(`✅ ${msg}`),
  error: (msg) => console.error(`❌ ${msg}`),
  progress: (current, total, item) => console.log(`📝 [${current}/${total}] ${item}`)
};

// Question bank for all English lessons
const quizQuestions = {
  'commas': [
    {
      text: "The restaurant <u>which has been open for 30 years</u> serves authentic Italian cuisine.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "which, has been open for 30 years", "which has been open for 30 years,", ", which has been open for 30 years,"],
      correct_answer: 3,
      explanations: [
        "Nonrestrictive clauses (providing extra information) require commas on both sides.",
        "This incorrectly places a comma after 'which' instead of before it.",
        "This only has one comma; nonrestrictive clauses need commas on both sides.",
        "Correct! Nonrestrictive clauses providing additional information require commas on both sides."
      ]
    },
    {
      text: "After studying for three hours<u>,</u> Maria decided to take a break.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "", "; Maria", ". Maria"],
      correct_answer: 0,
      explanations: [
        "Correct! Introductory phrases require a comma after them.",
        "Without a comma, the sentence is harder to read and violates comma rules for introductory elements.",
        "A semicolon is used between independent clauses, not after an introductory phrase.",
        "A period would create a fragment from the introductory phrase."
      ]
    },
    {
      text: "The students who<u> studied regularly,</u> performed better on the exam.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", " studied regularly", ", studied regularly", ", studied regularly,"],
      correct_answer: 1,
      explanations: [
        "The comma after 'regularly' is incorrect because this is a restrictive clause (essential to meaning).",
        "Correct! Restrictive clauses (essential to the meaning) do not use commas.",
        "Restrictive clauses should not be set off with commas at all.",
        "This unnecessarily sets off a restrictive clause with commas."
      ]
    },
    {
      text: "My best friend<u> Sarah</u> is coming to visit this weekend.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ", Sarah", ", Sarah,", "Sarah,"],
      correct_answer: 2,
      explanations: [
        "Appositives (renaming nouns) require commas on both sides.",
        "This only has one comma before 'Sarah'; appositives need commas on both sides.",
        "Correct! Appositives must be set off with commas on both sides.",
        "This is missing the comma before 'Sarah.'"
      ]
    },
    {
      text: "She bought apples<u> oranges</u> and bananas at the store.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ", oranges,", ", oranges", " oranges,"],
      correct_answer: 2,
      explanations: [
        "Items in a series need commas to separate them.",
        "A comma after 'oranges' is unnecessary since 'and' connects it to 'bananas.'",
        "Correct! Use commas to separate items in a series; the comma before 'and' is optional but this choice is correct.",
        "This is missing the comma before 'oranges.'"
      ]
    },
    {
      text: "Yes<u>,</u> I will attend the meeting tomorrow.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "", "; I", ". I"],
      correct_answer: 0,
      explanations: [
        "Correct! Introductory words like 'yes' require a comma after them.",
        "Without a comma, 'Yes' runs into 'I' and creates confusion.",
        "A semicolon is incorrect after a single introductory word.",
        "A period would separate 'Yes' as a fragment."
      ]
    },
    {
      text: "The conference scheduled for June 15<u> 2024</u> will feature keynote speakers.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ", 2024", ", 2024,", " 2024,"],
      correct_answer: 2,
      explanations: [
        "Dates with month, day, and year require commas around the year.",
        "This only has one comma; the year needs commas on both sides.",
        "Correct! When a date includes day and year, commas must surround the year.",
        "This is missing the comma before the year."
      ]
    },
    {
      text: "Although she was tired<u>,</u> she finished her homework before bed.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "", "; she", " she"],
      correct_answer: 0,
      explanations: [
        "Correct! Dependent clauses at the start of a sentence require a comma after them.",
        "Without a comma, the dependent clause runs into the independent clause.",
        "A semicolon is used between independent clauses, not after a dependent clause.",
        "Simply removing the comma creates a run-together sentence."
      ]
    },
    {
      text: "The scientist a Nobel Prize winner<u>,</u> presented her research at the symposium.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "", " presented", ", presented"],
      correct_answer: 0,
      explanations: [
        "Correct! The appositive 'a Nobel Prize winner' needs commas on both sides, and this comma comes after it.",
        "Removing this comma leaves the appositive without proper punctuation.",
        "This removes the comma but doesn't fix the missing comma before 'a Nobel Prize winner.'",
        "This creates awkward punctuation."
      ]
    },
    {
      text: "Dear Mr. Johnson<u>,</u><br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ":", ";", ""],
      correct_answer: 0,
      explanations: [
        "Correct! Salutations in formal letters require a comma (or colon for very formal business letters).",
        "A colon is acceptable for very formal business letters but comma is standard.",
        "A semicolon is never used after a salutation.",
        "Omitting punctuation after a salutation is incorrect."
      ]
    }
  ],

  'punctuation': [
    {
      text: "The museum has three main exhibits<u>:</u> ancient artifacts, modern art, and natural history.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ";", ",", "—"],
      correct_answer: 0,
      explanations: [
        "Correct! A colon introduces a list of items after an independent clause.",
        "A semicolon is used between independent clauses, not to introduce a list.",
        "A comma is too weak to introduce a formal list after an independent clause.",
        "A dash could work but a colon is more formal and appropriate for lists."
      ]
    },
    {
      text: "She couldn<u>t</u> believe her eyes when she saw the surprise.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "'t", "t'", "t"],
      correct_answer: 1,
      explanations: [
        "The apostrophe is missing; contractions require an apostrophe to show missing letters.",
        "Correct! 'Couldn't' is a contraction of 'could not' and needs an apostrophe.",
        "The apostrophe is in the wrong position.",
        "Without an apostrophe, this is not a valid contraction."
      ]
    },
    {
      text: "The student<u>s</u> books were left in the classroom.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "s'", "'s", "s's"],
      correct_answer: 1,
      explanations: [
        "Without an apostrophe, this appears to be plural rather than possessive.",
        "Correct! For plural nouns ending in 's,' add only an apostrophe to show possession.",
        "This would be correct for singular 'student' but not plural 'students.'",
        "This is never correct; 's's' is not a valid form."
      ]
    },
    {
      text: "My favorite novels are <u>Pride and Prejudice, 1984,</u> and To Kill a Mockingbird.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "\"Pride and Prejudice,\" \"1984,\"", "Pride and Prejudice; 1984;", "'Pride and Prejudice', '1984',"],
      correct_answer: 0,
      explanations: [
        "Correct! Book titles should be italicized (or underlined in handwriting), not put in quotes.",
        "Quotation marks are for short works like articles or poems, not full-length novels.",
        "Semicolons don't belong in a simple list of items.",
        "Single quotes are not standard for titles in American English."
      ]
    },
    {
      text: "The sign read<u>:</u> \"No Parking Between 8 AM and 6 PM.\"<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ",", ";", "—"],
      correct_answer: 0,
      explanations: [
        "Correct! A colon introduces a complete quotation when preceded by an independent clause.",
        "A comma can introduce a quotation but a colon is more formal and emphatic.",
        "A semicolon is not used to introduce quotations.",
        "A dash could work informally but a colon is more appropriate for formal quotations."
      ]
    },
    {
      text: "According to the article<u>,</u> \"The economy is showing signs of recovery.\"<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ":", ";", ""],
      correct_answer: 0,
      explanations: [
        "Correct! Use a comma after an introductory phrase that leads into a quotation.",
        "A colon is used when an independent clause introduces a quote, but 'According to the article' is not independent.",
        "A semicolon is not used to introduce quotations.",
        "Omitting punctuation creates a run-on connection between the intro and the quote."
      ]
    },
    {
      text: "She asked<u>,</u> \"Are you coming to the party?\"<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ":", ";", ""],
      correct_answer: 0,
      explanations: [
        "Correct! A comma introduces a direct quotation after a dialogue tag.",
        "A colon is too formal for dialogue tags introducing questions.",
        "A semicolon is never used to introduce quotations.",
        "Punctuation is required between a dialogue tag and quotation."
      ]
    },
    {
      text: "The recipe calls for the following ingredients<u>;</u> flour, sugar, eggs, and butter.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ":", ",", "—"],
      correct_answer: 1,
      explanations: [
        "A semicolon is used between independent clauses, not to introduce a list.",
        "Correct! A colon introduces a list after an independent clause.",
        "A comma is too weak to formally introduce a list.",
        "While a dash could work, a colon is more appropriate for formal lists."
      ]
    },
    {
      text: "The company<u>'s</u> headquarters are located in New York.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "s", "s'", "'"],
      correct_answer: 0,
      explanations: [
        "Correct! For singular nouns, add 's to show possession.",
        "Without an apostrophe, this appears plural rather than possessive.",
        "This would be for plural nouns ending in 's,' but 'company' is singular.",
        "An apostrophe alone is incomplete without the 's.'"
      ]
    },
    {
      text: "She said<u>, \"</u>I'll be there at noon.\"<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", ": \"", " \"", ",\""],
      correct_answer: 0,
      explanations: [
        "Correct! A comma and opening quotation mark properly introduce direct speech.",
        "A colon is too formal for simple dialogue introduction.",
        "A space without punctuation is incorrect.",
        "The space between comma and quote is standard formatting."
      ]
    }
  ],

  'verbs': [
    {
      text: "By next week, she <u>will complete</u> her thesis.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "will have completed", "completes", "completed"],
      correct_answer: 1,
      explanations: [
        "Simple future doesn't show that the action will be finished by a specific time.",
        "Correct! Future perfect tense ('will have completed') shows an action that will be finished by a specific future time.",
        "Present tense doesn't match the future time reference 'by next week.'",
        "Past tense doesn't fit the future time frame."
      ]
    },
    {
      text: "Every student <u>are</u> required to submit their assignments on time.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "is", "were", "have been"],
      correct_answer: 1,
      explanations: [
        "'Every student' is singular, so 'are' (plural) creates subject-verb disagreement.",
        "Correct! 'Every student' is singular and requires the singular verb 'is.'",
        "'Were' is past tense and plural; 'every student' is singular and present.",
        "'Have been' is plural and doesn't match the singular subject."
      ]
    },
    {
      text: "If I <u>was</u> you, I would accept the job offer.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "were", "am", "will be"],
      correct_answer: 1,
      explanations: [
        "'Was' is incorrect in contrary-to-fact conditional statements.",
        "Correct! The subjunctive mood uses 'were' (not 'was') for hypothetical or contrary-to-fact situations.",
        "'Am' is present tense and doesn't express the hypothetical condition.",
        "'Will be' is future and doesn't fit the hypothetical present structure."
      ]
    },
    {
      text: "The team <u>has practiced</u> every day this month.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "have practiced", "practiced", "are practicing"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Team' is a collective noun treated as singular, and present perfect shows continuing action into the present.",
        "'Have' is plural; collective nouns like 'team' take singular verbs.",
        "Simple past doesn't show the connection between past action and present time.",
        "Present continuous doesn't capture the repeated action over time."
      ]
    },
    {
      text: "She had already <u>ate</u> lunch when I arrived.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "eaten", "eats", "eating"],
      correct_answer: 1,
      explanations: [
        "'Ate' is the simple past form; past perfect requires the past participle.",
        "Correct! Past perfect tense requires 'had' + past participle ('eaten').",
        "Present tense doesn't fit with 'had already.'",
        "'Eating' is a participle but doesn't form past perfect without 'been.'"
      ]
    },
    {
      text: "Neither the teacher nor the students <u>was</u> aware of the schedule change.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "were", "is", "are"],
      correct_answer: 1,
      explanations: [
        "With 'neither...nor,' the verb agrees with the nearest subject; 'students' (plural) requires 'were.'",
        "Correct! In 'neither...nor' constructions, the verb agrees with the nearest subject ('students' = plural = 'were').",
        "'Is' is singular and doesn't match the plural 'students.'",
        "'Are' is present tense; the past context requires 'were.'"
      ]
    },
    {
      text: "The committee <u>have</u> reached a unanimous decision.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "has", "are", "were"],
      correct_answer: 1,
      explanations: [
        "'Have' is plural; collective nouns acting as a single unit take singular verbs.",
        "Correct! 'Committee' is a collective noun treated as singular when acting as one unit.",
        "'Are' is present tense linking verb; this needs 'has' for present perfect.",
        "'Were' is past tense and doesn't fit the present perfect structure."
      ]
    },
    {
      text: "I wish I <u>can</u> attend the concert tonight.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "could", "will", "am able to"],
      correct_answer: 1,
      explanations: [
        "'Can' doesn't express the hypothetical or wishful nature of the statement.",
        "Correct! 'Wish' triggers the subjunctive mood, requiring 'could' (not 'can') for hypothetical situations.",
        "'Will' is future tense and doesn't work with the present wish.",
        "'Am able to' is present indicative, not subjunctive as required after 'wish.'"
      ]
    },
    {
      text: "Each of the players <u>have</u> their own unique style.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "has", "are having", "were having"],
      correct_answer: 1,
      explanations: [
        "'Each' is singular, so 'have' (plural) creates subject-verb disagreement.",
        "Correct! 'Each' is always singular and requires the singular verb 'has.'",
        "'Are having' is plural and continuous; 'each' needs singular 'is having' (but 'has' is better).",
        "'Were having' is past and plural; 'each' needs present singular."
      ]
    },
    {
      text: "By the time you arrive, I <u>finished</u> the report.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "will have finished", "finish", "am finishing"],
      correct_answer: 1,
      explanations: [
        "Simple past doesn't show that the action will be complete before a future time.",
        "Correct! Future perfect ('will have finished') shows an action that will be complete before another future action.",
        "Present tense doesn't match the future time frame.",
        "Present continuous doesn't show completion before the future arrival."
      ]
    }
  ],

  'pronouns': [
    {
      text: "The teacher gave the award to Sarah and <u>I</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "me", "myself", "mine"],
      correct_answer: 1,
      explanations: [
        "'I' is a subject pronoun; object pronouns are needed after prepositions like 'to.'",
        "Correct! 'Me' is the object pronoun needed after the preposition 'to.'",
        "'Myself' is reflexive and should only be used when the subject and object are the same person.",
        "'Mine' is possessive and doesn't fit grammatically."
      ]
    },
    {
      text: "Each student must submit <u>their</u> assignment by Friday.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "his or her", "its", "our"],
      correct_answer: 1,
      explanations: [
        "'Their' is plural, but 'each student' is singular.",
        "Correct! 'Each student' is singular and requires singular pronouns 'his or her.'",
        "'Its' is for objects, not people.",
        "'Our' doesn't match the third-person subject 'each student.'"
      ]
    },
    {
      text: "Between you and <u>I</u>, this seems like a bad idea.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "me", "myself", "we"],
      correct_answer: 1,
      explanations: [
        "'I' is a subject pronoun; 'between' is a preposition requiring object pronouns.",
        "Correct! After prepositions like 'between,' use object pronouns like 'me.'",
        "'Myself' is reflexive and inappropriate here.",
        "'We' is a subject pronoun and grammatically incorrect after 'between.'"
      ]
    },
    {
      text: "The dog wagged <u>it's</u> tail excitedly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "its", "its'", "their"],
      correct_answer: 1,
      explanations: [
        "'It's' is a contraction of 'it is' or 'it has,' not the possessive form.",
        "Correct! 'Its' (without an apostrophe) is the possessive form of 'it.'",
        "'Its'' is never correct; possessive pronouns don't use apostrophes.",
        "'Their' is plural; 'dog' is singular."
      ]
    },
    {
      text: "The company updated <u>their</u> privacy policy.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "its", "it's", "his or her"],
      correct_answer: 1,
      explanations: [
        "'Their' is plural; 'company' is a collective noun treated as singular.",
        "Correct! 'Company' is singular and requires the singular possessive 'its.'",
        "'It's' is a contraction of 'it is,' not a possessive.",
        "'His or her' is for people, not companies."
      ]
    },
    {
      text: "<u>Who</u> did you give the package to?<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Whom", "Whoever", "Whomever"],
      correct_answer: 1,
      explanations: [
        "'Who' is a subject pronoun; this sentence needs an object pronoun.",
        "Correct! 'Whom' is the object pronoun needed here (object of preposition 'to').",
        "'Whoever' is a subject pronoun for clauses, not correct here.",
        "'Whomever' is an object pronoun but is for clauses, not this simple construction."
      ]
    },
    {
      text: "My sister is taller than <u>me</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "I", "myself", "I am"],
      correct_answer: 1,
      explanations: [
        "While commonly used, 'me' is technically incorrect; the comparison needs a subject pronoun.",
        "Correct! In formal comparisons, use subject pronouns: 'taller than I [am].'",
        "'Myself' is reflexive and doesn't fit here.",
        "'I am' is overly wordy though technically correct."
      ]
    },
    {
      text: "Everyone should bring <u>their</u> own lunch.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "his or her", "its", "our"],
      correct_answer: 1,
      explanations: [
        "While increasingly accepted, 'their' with singular 'everyone' is traditionally incorrect.",
        "Correct! 'Everyone' is traditionally singular and takes 'his or her.'",
        "'Its' is for objects, not people.",
        "'Our' doesn't match the third-person indefinite pronoun 'everyone.'"
      ]
    },
    {
      text: "This is a matter between she and <u>I</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "me", "myself", "her and I"],
      correct_answer: 1,
      explanations: [
        "'I' is a subject pronoun; 'between' requires object pronouns.",
        "Correct! After the preposition 'between,' use object pronouns: 'her and me.'",
        "'Myself' doesn't fit; both pronouns should be object form.",
        "This doesn't fix the problem; 'she' should be 'her.'"
      ]
    },
    {
      text: "The trophy belongs to <u>whoever</u> wins the championship.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "whomever", "who", "whom"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Whoever' is the subject of the clause 'whoever wins,' so it needs the subject form.",
        "'Whomever' is an object pronoun; the pronoun is the subject of 'wins.'",
        "'Who' doesn't work in this construction with 'to.'",
        "'Whom' is an object pronoun but doesn't fit the clause structure."
      ]
    }
  ],

  'modifiers': [
    {
      text: "<u>Running down the street,</u> the bus was missed by John.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Running down the street, John", "The bus was missed by John running down the street", "While running down the street, the bus"],
      correct_answer: 1,
      explanations: [
        "This creates a dangling modifier—the bus can't run down the street.",
        "Correct! The modifier should be next to what it modifies—John, not the bus.",
        "This places the modifier in the wrong position, suggesting the bus was running.",
        "This still has the modifier incorrectly modifying 'bus.'"
      ]
    },
    {
      text: "We <u>almost</u> drove 500 miles to reach the destination.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "drove almost", "nearly drove", "had almost driven"],
      correct_answer: 1,
      explanations: [
        "'Almost drove' suggests they nearly drove but didn't; the intended meaning is they drove nearly 500 miles.",
        "Correct! 'Drove almost 500 miles' correctly modifies the distance, not the action of driving.",
        "'Nearly drove' has the same problem as 'almost drove.'",
        "This changes the tense and doesn't fix the modifier placement."
      ]
    },
    {
      text: "<u>Excited about the trip,</u> her suitcase was packed quickly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Excited about the trip, she", "Her suitcase, excited about the trip,", "The suitcase was packed quickly, excited about the trip"],
      correct_answer: 1,
      explanations: [
        "The suitcase can't be excited—dangling modifier.",
        "Correct! The modifier should describe 'she,' not 'suitcase.'",
        "This nonsensically suggests the suitcase is excited.",
        "This still misplaces the modifier away from who is excited."
      ]
    },
    {
      text: "The team <u>only</u> won three games this season.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "won only", "had only won", "won just only"],
      correct_answer: 1,
      explanations: [
        "'Only won' could mean they won and did nothing else; 'won only three' is clearer.",
        "Correct! Placing 'only' before 'three' clarifies that three is the limited number.",
        "This changes tense unnecessarily and doesn't fix placement.",
        "'Just only' is redundant."
      ]
    },
    {
      text: "<u>While eating dinner,</u> the phone rang loudly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "While we were eating dinner,", "While eating dinner, we heard", "The phone, while eating dinner,"],
      correct_answer: 1,
      explanations: [
        "The phone can't eat dinner—dangling modifier.",
        "Correct! Adding 'we were' makes clear who was eating dinner.",
        "This restructures well but the question asks about the underlined phrase specifically.",
        "This nonsensically suggests the phone was eating."
      ]
    },
    {
      text: "She <u>just</u> told me yesterday about the meeting.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "told me just", "had just told", "told me"],
      correct_answer: 3,
      explanations: [
        "'Just' is misplaced and creates ambiguity about timing.",
        "'Just' still creates ambiguity; 'yesterday' already specifies the time.",
        "This changes the tense and doesn't eliminate redundancy.",
        "Correct! 'Yesterday' already indicates recent time, making 'just' redundant."
      ]
    },
    {
      text: "<u>To succeed in college,</u> good study habits are essential.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "To succeed in college, students must have", "Good study habits, to succeed in college,", "To succeed in college, it is essential to have"],
      correct_answer: 1,
      explanations: [
        "Study habits can't succeed—dangling modifier.",
        "Correct! The infinitive phrase should modify 'students,' not 'habits.'",
        "This awkwardly places the modifier and doesn't fix the logic.",
        "While grammatically acceptable, it's wordy compared to option B."
      ]
    },
    {
      text: "Covered in mud, I could barely recognize my <u>car</u>.<br><br>Is there a modifier error?",
      options: ["NO CHANGE - no error", "Change to: my car, covered in mud, was barely recognizable", "Change to: covered in mud, my car", "Change to: I, covered in mud, could barely recognize my car"],
      correct_answer: 0,
      explanations: [
        "Correct! The modifier 'Covered in mud' correctly describes the car, which is the object of 'recognize.'",
        "This changes the sentence structure unnecessarily when there's no error.",
        "This would make 'I' covered in mud instead of the car.",
        "This incorrectly suggests 'I' was covered in mud, not the car."
      ]
    },
    {
      text: "We <u>nearly</u> watched the entire movie before leaving.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "watched nearly", "had nearly watched", "watched the nearly entire"],
      correct_answer: 1,
      explanations: [
        "'Nearly watched' suggests they almost watched but didn't; the meaning is they watched almost all of it.",
        "Correct! 'Watched nearly the entire movie' correctly indicates they watched most of it.",
        "This changes tense unnecessarily.",
        "'Nearly entire' is awkward phrasing."
      ]
    },
    {
      text: "<u>Hoping to impress the judges,</u> the performance was flawless.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Hoping to impress the judges, the performer delivered a", "The performance, hoping to impress the judges,", "Hoping to impress, the judges saw a"],
      correct_answer: 1,
      explanations: [
        "The performance can't hope—dangling modifier.",
        "Correct! The modifier should describe the performer who is hoping.",
        "This illogically suggests the performance was hoping.",
        "This changes the meaning entirely—the judges aren't hoping."
      ]
    }
  ],

  'parallel-structure': [
    {
      text: "She enjoys hiking, swimming, and <u>to bike</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "biking", "to go biking", "rides her bike"],
      correct_answer: 1,
      explanations: [
        "Mixing infinitive 'to bike' with gerunds 'hiking' and 'swimming' violates parallel structure.",
        "Correct! 'Biking' matches the gerund form of 'hiking' and 'swimming.'",
        "'To go biking' is still an infinitive phrase, not parallel with the gerunds.",
        "'Rides' changes from gerund to present tense verb, breaking parallelism."
      ]
    },
    {
      text: "The professor is respected for his knowledge, dedication, and <u>being innovative</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "innovation", "that he is innovative", "innovating"],
      correct_answer: 1,
      explanations: [
        "'Being innovative' is a gerund phrase; 'knowledge' and 'dedication' are nouns.",
        "Correct! 'Innovation' is a noun that matches the form of 'knowledge' and 'dedication.'",
        "Adding a clause breaks the parallel structure of the noun series.",
        "'Innovating' is a gerund, not parallel with the nouns 'knowledge' and 'dedication.'"
      ]
    },
    {
      text: "The company values employees who are hardworking, creative, and <u>demonstrate reliability</u>.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "reliable", "who demonstrate reliability", "reliability is demonstrated"],
      correct_answer: 1,
      explanations: [
        "'Demonstrate reliability' is a verb phrase; 'hardworking' and 'creative' are adjectives.",
        "Correct! 'Reliable' is an adjective parallel with 'hardworking' and 'creative.'",
        "Adding 'who demonstrate' creates a clause that's not parallel with the adjectives.",
        "This passive construction doesn't match the adjective structure."
      ]
    },
    {
      text: "To succeed in this course, you must attend class, <u>completing assignments</u>, and participate in discussions.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "complete assignments", "you should complete assignments", "the completion of assignments"],
      correct_answer: 1,
      explanations: [
        "'Completing' is a gerund; the other items use base verb forms ('attend,' 'participate').",
        "Correct! 'Complete' matches the parallel structure of 'attend' and 'participate.'",
        "Adding a subject and modal verb breaks the parallel infinitive structure.",
        "Using a noun phrase breaks parallelism with the verb forms."
      ]
    },
    {
      text: "The new policy will reduce costs, <u>improves</u> efficiency, and increase customer satisfaction.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "improve", "improving", "it will improve"],
      correct_answer: 1,
      explanations: [
        "'Improves' is present tense; 'reduce' and 'increase' are base forms after 'will.'",
        "Correct! 'Improve' maintains parallel structure with 'reduce' and 'increase.'",
        "'Improving' breaks the parallel verb structure.",
        "Adding a subject and verb creates a clause that's not parallel."
      ]
    },
    {
      text: "She spends her weekends reading novels, <u>to watch movies</u>, and visiting friends.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "watching movies", "she watches movies", "movies are watched"],
      correct_answer: 1,
      explanations: [
        "The infinitive 'to watch' doesn't match the gerunds 'reading' and 'visiting.'",
        "Correct! 'Watching' is a gerund parallel with 'reading' and 'visiting.'",
        "Adding a subject and verb breaks the gerund structure.",
        "A passive construction doesn't match the active gerunds."
      ]
    },
    {
      text: "The requirements include submitting an application, <u>three letters of recommendation</u>, and to schedule an interview.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "providing three letters of recommendation", "three letters of recommendation must be provided", "that three letters of recommendation be submitted"],
      correct_answer: 1,
      explanations: [
        "A simple noun phrase isn't parallel with 'submitting' (gerund) and 'to schedule' (infinitive).",
        "Correct! 'Providing' is a gerund parallel with 'submitting' (and 'to schedule' should also be changed).",
        "Adding a clause with modal verb breaks parallel structure.",
        "A 'that' clause doesn't match the gerund structure."
      ]
    },
    {
      text: "His goals are to graduate with honors, <u>finding</u> a good job, and traveling abroad.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "to find", "he wants to find", "the finding of"],
      correct_answer: 1,
      explanations: [
        "'Finding' is a gerund; 'to graduate' is an infinitive.",
        "Correct! 'To find' is an infinitive parallel with 'to graduate' and should match 'traveling' too.",
        "Adding a subject and verb breaks the infinitive structure.",
        "A noun phrase doesn't match the infinitive 'to graduate.'"
      ]
    },
    {
      text: "The workshop teaches participants how to manage time, <u>setting priorities</u>, and achieving goals.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "to set priorities", "the setting of priorities", "priority setting"],
      correct_answer: 1,
      explanations: [
        "'Setting' is a gerund, but 'to manage' is an infinitive.",
        "Correct! 'To set' is an infinitive parallel with 'to manage' (note: 'achieving' should also be 'to achieve').",
        "A noun phrase with 'of' doesn't match the infinitive structure.",
        "A compound noun doesn't parallel 'to manage.'"
      ]
    },
    {
      text: "The committee will review applications, <u>interviews will be conducted with</u> finalists, and select the winner.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "interview", "conducting interviews with", "will conduct interviews with"],
      correct_answer: 1,
      explanations: [
        "A passive clause with subject doesn't parallel 'review' and 'select.'",
        "Correct! 'Interview' matches the parallel structure of 'review' and 'select.'",
        "'Conducting' (gerund) doesn't match the base verbs after 'will.'",
        "Repeating 'will' is redundant and breaks the elegant parallel structure."
      ]
    }
  ],

  'redundancy': [
    {
      text: "The <u>final outcome</u> of the election was decided by a narrow margin.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "outcome", "final result", "end outcome"],
      correct_answer: 1,
      explanations: [
        "'Final' is redundant; outcomes are inherently final.",
        "Correct! 'Outcome' alone conveys the meaning without redundancy.",
        "'Final result' has the same redundancy issue.",
        "'End outcome' is also redundant."
      ]
    },
    {
      text: "She will <u>continue to remain</u> in her current position for another year.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "remain", "continue to stay", "keep on remaining"],
      correct_answer: 1,
      explanations: [
        "'Continue to remain' is redundant; both words mean to stay.",
        "Correct! 'Remain' alone is sufficient and eliminates redundancy.",
        "'Continue to stay' has the same redundancy problem.",
        "'Keep on remaining' is even more redundant."
      ]
    },
    {
      text: "The report was <u>absolutely essential and necessary</u> for the project.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "essential", "absolutely essential", "necessary and essential"],
      correct_answer: 1,
      explanations: [
        "'Essential' and 'necessary' mean the same thing; both together is redundant.",
        "Correct! 'Essential' alone conveys the complete meaning.",
        "'Absolutely essential' is redundant; 'essential' is already absolute.",
        "Reversing the order doesn't fix the redundancy."
      ]
    },
    {
      text: "The students <u>gathered together</u> in the auditorium.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "gathered", "assembled together", "came together and gathered"],
      correct_answer: 1,
      explanations: [
        "'Gathered' already implies 'together'; adding it is redundant.",
        "Correct! 'Gathered' alone is sufficient and concise.",
        "'Assembled together' has the same redundancy.",
        "This is extremely redundant, using multiple synonyms."
      ]
    },
    {
      text: "Please <u>refer back</u> to page 15 for more information.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "refer", "look back", "return back"],
      correct_answer: 1,
      explanations: [
        "'Refer' already means to go back to something; 'back' is redundant.",
        "Correct! 'Refer' alone captures the intended meaning.",
        "'Look back' is acceptable but 'refer' is more precise.",
        "'Return back' is also redundant."
      ]
    },
    {
      text: "In <u>my personal opinion</u>, this is the best solution.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "my opinion", "my own personal opinion", "my personal view"],
      correct_answer: 1,
      explanations: [
        "Opinions are inherently personal; 'personal' is redundant.",
        "Correct! 'My opinion' is clear and concise.",
        "Adding 'own' makes it even more redundant.",
        "'Personal view' still contains the redundancy."
      ]
    },
    {
      text: "The <u>past history</u> of the company reveals several challenges.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "history", "past record", "historical past"],
      correct_answer: 1,
      explanations: [
        "History is inherently about the past; 'past' is redundant.",
        "Correct! 'History' alone is sufficient.",
        "'Past record' has similar redundancy.",
        "'Historical past' is extremely redundant."
      ]
    },
    {
      text: "They will <u>advance forward</u> with the proposal next week.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "advance", "move forward", "proceed forward"],
      correct_answer: 1,
      explanations: [
        "'Advance' already means to move forward; 'forward' is redundant.",
        "Correct! 'Advance' alone conveys the meaning clearly.",
        "'Move forward' is acceptable but less concise than 'advance.'",
        "'Proceed forward' is also redundant."
      ]
    },
    {
      text: "Each <u>individual person</u> must sign the form.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "person", "individual", "single individual person"],
      correct_answer: 1,
      explanations: [
        "'Individual person' is redundant; both words mean the same thing.",
        "Correct! 'Person' alone is clear and concise.",
        "'Individual' alone would also work, but 'person' is more common.",
        "This is extremely redundant with three synonymous terms."
      ]
    },
    {
      text: "The two candidates are <u>both alike</u> in their policy positions.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "alike", "both similar", "similar and alike"],
      correct_answer: 1,
      explanations: [
        "'Both' and 'alike' are redundant together.",
        "Correct! 'Alike' alone is sufficient to show similarity.",
        "'Both similar' has the same redundancy issue.",
        "This is even more redundant with two synonyms."
      ]
    }
  ],

  'word-choice': [
    {
      text: "The museum <u>effected</u> a new policy regarding photography.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "affected", "implemented", "created"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Effected' means 'brought about' or 'implemented,' which fits creating a new policy.",
        "'Affected' means 'influenced'; you can't influence a policy into existence.",
        "While 'implemented' works, 'effected' is the precise term for bringing something into being.",
        "'Created' works but 'effected' is more formal and precise for policies."
      ]
    },
    {
      text: "The new regulations will <u>effect</u> all employees starting next month.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "affect", "impact", "influence"],
      correct_answer: 1,
      explanations: [
        "'Effect' as a verb means 'to bring about'; here we need 'affect' meaning 'to influence.'",
        "Correct! 'Affect' (verb) means to influence or have an impact on.",
        "'Impact' works but is less precise than 'affect.'",
        "'Influence' works but 'affect' is more standard in this context."
      ]
    },
    {
      text: "The data <u>suggests</u> that sales have increased significantly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "suggest", "are suggesting", "has suggested"],
      correct_answer: 1,
      explanations: [
        "'Data' is plural in formal English; it needs the plural verb 'suggest.'",
        "Correct! 'Data' is the plural of 'datum' and takes a plural verb.",
        "Present continuous is unnecessary; simple present is better.",
        "This treats 'data' as singular, which is informal usage."
      ]
    },
    {
      text: "The principal <u>principle</u> of the school addressed the students.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "principal", "principale", "princible"],
      correct_answer: 1,
      explanations: [
        "'Principle' means a fundamental truth or rule, not a school leader.",
        "Correct! 'Principal' refers to the head of a school.",
        "'Principale' is not an English word.",
        "'Princible' is not a real word."
      ]
    },
    {
      text: "The novel's <u>climactic</u> scene takes place during a thunderstorm.<br><br>Is this the correct word choice?",
      options: ["NO CHANGE - correct", "climatic", "climatical", "climate"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Climactic' refers to the climax of a story or event.",
        "'Climatic' relates to climate/weather, not narrative climax.",
        "'Climatical' is not standard English.",
        "'Climate' is a noun, not an adjective."
      ]
    },
    {
      text: "She <u>complemented</u> her outfit with a silk scarf.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "complimented", "completed", "compiled"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Complemented' means to complete or enhance, which fits adding to an outfit.",
        "'Complimented' means to praise, which doesn't make sense with an outfit.",
        "'Completed' would mean finished, not enhanced.",
        "'Compiled' means to collect or assemble, which doesn't fit."
      ]
    },
    {
      text: "The chef <u>complimented</u> the server on excellent customer service.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "complemented", "completed", "compiled"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Complimented' means praised, which fits this context.",
        "'Complemented' means to complete or go well with, not to praise.",
        "'Completed' doesn't make sense in this context.",
        "'Compiled' means to assemble, not to praise."
      ]
    },
    {
      text: "The company's <u>moral</u> was high after the successful product launch.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "morale", "morality", "morals"],
      correct_answer: 1,
      explanations: [
        "'Moral' refers to ethics or a lesson, not team spirit.",
        "Correct! 'Morale' refers to confidence and spirits of a person or group.",
        "'Morality' refers to principles of right and wrong, not team spirit.",
        "'Morals' is the plural of 'moral' and still doesn't fit."
      ]
    },
    {
      text: "The protesters remained <u>stationary</u> in front of the building.<br><br>Is this the correct word choice?",
      options: ["NO CHANGE - correct", "stationery", "stationed", "static"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Stationary' means not moving, which fits the context.",
        "'Stationery' refers to writing paper and supplies.",
        "'Stationed' means assigned to a position, which changes the meaning.",
        "'Static' means unchanging or electrical interference, less precise than 'stationary.'"
      ]
    },
    {
      text: "The committee will <u>advice</u> the board on financial matters.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "advise", "adviser", "advisory"],
      correct_answer: 1,
      explanations: [
        "'Advice' is a noun; we need the verb form here.",
        "Correct! 'Advise' is the verb meaning to give advice.",
        "'Adviser' is a noun referring to a person who advises.",
        "'Advisory' is an adjective or noun, not a verb."
      ]
    }
  ],

  'transitions': [
    {
      text: "The experiment was carefully planned. <u>Therefore,</u> the results were inconclusive.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "However,", "Furthermore,", "Similarly,"],
      correct_answer: 1,
      explanations: [
        "'Therefore' indicates a logical result, but inconclusive results don't logically follow from careful planning.",
        "Correct! 'However' shows contrast between careful planning and inconclusive results.",
        "'Furthermore' adds information in the same direction, which doesn't fit the contrast.",
        "'Similarly' suggests likeness, which doesn't fit this context."
      ]
    },
    {
      text: "The company increased marketing efforts. <u>In contrast,</u> sales reached record highs.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "As a result,", "On the other hand,", "Nevertheless,"],
      correct_answer: 1,
      explanations: [
        "'In contrast' suggests opposition, but increased sales is a positive result of marketing.",
        "Correct! 'As a result' shows the cause-and-effect relationship.",
        "'On the other hand' suggests contrast, which doesn't fit.",
        "'Nevertheless' suggests spite of something, which doesn't match the logical flow."
      ]
    },
    {
      text: "She studied for months. <u>Moreover,</u> she failed the exam.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Unfortunately,", "Likewise,", "In addition,"],
      correct_answer: 1,
      explanations: [
        "'Moreover' adds supporting information, but failing contradicts the expectation from studying.",
        "Correct! 'Unfortunately' acknowledges the disappointing outcome that contrasts with the studying.",
        "'Likewise' suggests similarity, which doesn't fit.",
        "'In addition' would add more positive information, not a contrasting failure."
      ]
    },
    {
      text: "The first experiment succeeded. <u>However,</u> the second experiment also succeeded.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Similarly,", "On the contrary,", "Nevertheless,"],
      correct_answer: 1,
      explanations: [
        "'However' signals contrast, but both experiments succeeded (no contrast).",
        "Correct! 'Similarly' shows that the second result was like the first.",
        "'On the contrary' signals opposition, which doesn't exist here.",
        "'Nevertheless' suggests success despite something, which doesn't fit."
      ]
    },
    {
      text: "Regular exercise improves physical health. <u>For instance,</u> it also enhances mental wellbeing.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Additionally,", "For example,", "In contrast,"],
      correct_answer: 1,
      explanations: [
        "'For instance' introduces an example, but mental wellbeing isn't an example of physical health.",
        "Correct! 'Additionally' adds another benefit of exercise.",
        "'For example' introduces an example, but this is an additional benefit, not an example.",
        "'In contrast' signals opposition, which doesn't fit."
      ]
    },
    {
      text: "The project was over budget. <u>Consequently,</u> the team decided to continue anyway.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Nevertheless,", "Therefore,", "Similarly,"],
      correct_answer: 1,
      explanations: [
        "'Consequently' suggests a logical result, but continuing despite going over budget is not the expected result.",
        "Correct! 'Nevertheless' shows that they continued despite the problem.",
        "'Therefore' suggests logical result, which doesn't fit the contrast here.",
        "'Similarly' suggests likeness, which doesn't work."
      ]
    },
    {
      text: "Cats are independent animals. <u>In other words,</u> dogs tend to be more social.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "By contrast,", "That is to say,", "As a result,"],
      correct_answer: 1,
      explanations: [
        "'In other words' restates the same idea, but dogs being social is a different idea.",
        "Correct! 'By contrast' signals the difference between cats and dogs.",
        "'That is to say' also restates, which doesn't fit.",
        "'As a result' signals cause-effect, which doesn't apply here."
      ]
    },
    {
      text: "The restaurant received poor reviews. <u>Thus,</u> it attracted large crowds nightly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "Despite this,", "As expected,", "For this reason,"],
      correct_answer: 1,
      explanations: [
        "'Thus' signals a logical result, but large crowds don't logically follow from poor reviews.",
        "Correct! 'Despite this' shows the surprising contrast between poor reviews and large crowds.",
        "'As expected' suggests the outcome was predictable, which contradicts the surprising situation.",
        "'For this reason' also signals cause-effect, which doesn't fit."
      ]
    },
    {
      text: "The first method proved effective. <u>Subsequently,</u> we tried the same approach with different variables.<br><br>Is this transition correct?",
      options: ["NO CHANGE - correct", "In contrast,", "For example,", "On the other hand,"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Subsequently' properly indicates the time sequence of events.",
        "'In contrast' signals opposition, which doesn't exist here.",
        "'For example' introduces an example, but this is a sequential action.",
        "'On the other hand' signals contrast, which doesn't fit."
      ]
    },
    {
      text: "The medication has several benefits. <u>Nevertheless,</u> it can reduce inflammation and relieve pain.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "For example,", "On the contrary,", "Despite this,"],
      correct_answer: 1,
      explanations: [
        "'Nevertheless' signals contrast, but the examples are benefits (no contrast).",
        "Correct! 'For example' introduces specific instances of the benefits.",
        "'On the contrary' signals opposition, which doesn't exist.",
        "'Despite this' also signals contrast inappropriately."
      ]
    }
  ],

  'which-choice': [
    {
      text: "[1] The ancient Romans developed sophisticated aqueducts. [2] These structures transported water across great distances. [3] Modern cities still use similar engineering principles. [4] <u>Engineers today face different challenges.</u><br><br>Which sentence should be deleted?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 3,
      explanations: [
        "Sentence 1 introduces the main topic and is essential.",
        "Sentence 2 explains what aqueducts did, supporting the main idea.",
        "Sentence 3 connects ancient engineering to modern times, maintaining focus.",
        "Correct! Sentence 4 shifts focus to modern challenges without supporting the passage's focus on aqueducts."
      ]
    },
    {
      text: "[1] Solar panels convert sunlight into electricity. [2] This technology has become increasingly affordable. [3] <u>Wind turbines are another renewable energy source.</u> [4] Many homeowners now install solar systems.<br><br>Which sentence should be deleted?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 2,
      explanations: [
        "Sentence 1 introduces the main topic of solar panels.",
        "Sentence 2 develops the topic by discussing affordability.",
        "Correct! Sentence 3 shifts to wind turbines, breaking focus on solar panels.",
        "Sentence 4 provides a relevant example of solar panel adoption."
      ]
    },
    {
      text: "The scientist studied climate patterns for decades. <u>He documented significant changes in temperature.</u><br><br>Which provides the best transition?",
      options: ["NO CHANGE", "Over this time,", "In contrast,", "For instance,"],
      correct_answer: 1,
      explanations: [
        "Without a transition, the connection between sentences is abrupt.",
        "Correct! 'Over this time' links the decades of study to the documentation.",
        "'In contrast' signals opposition that doesn't exist here.",
        "'For instance' introduces an example, but this is a result of the studying."
      ]
    },
    {
      text: "[1] Libraries provide free access to information. [2] They offer computers and internet access. [3] Many libraries host community events. [4] <u>The author discusses the history of libraries in chapter 5.</u><br><br>Which sentence least belongs?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 3,
      explanations: [
        "Sentence 1 establishes the main idea about library services.",
        "Sentence 2 gives a specific example of access provided.",
        "Sentence 3 provides another service libraries offer.",
        "Correct! Sentence 4 is meta-commentary about the text itself, not about library services."
      ]
    },
    {
      text: "Studies show exercise improves mental health.<br><br>Which sentence most effectively emphasizes the importance of this finding?",
      options: ["This is interesting information.", "Regular physical activity should be a priority for everyone.", "Exercise has many benefits.", "People should know about this."],
      correct_answer: 1,
      explanations: [
        "This is vague and doesn't emphasize importance.",
        "Correct! This makes a clear, strong statement about prioritizing exercise.",
        "This is too general and doesn't emphasize mental health specifically.",
        "This is weak and doesn't convey the urgency or importance."
      ]
    },
    {
      text: "[1] Bees play a crucial role in pollinating crops. [2] Without bees, many plants cannot reproduce. [3] <u>Bees make honey by collecting nectar.</u> [4] Agricultural systems depend on bee populations.<br><br>Which sentence digresses from the main focus?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 2,
      explanations: [
        "Sentence 1 establishes the main idea about bees' importance.",
        "Sentence 2 explains why bees are crucial.",
        "Correct! Sentence 3 discusses honey-making, which doesn't relate to the passage's focus on pollination.",
        "Sentence 4 reinforces the importance of bees to agriculture."
      ]
    },
    {
      text: "The museum exhibit opens next month.<br><br>Which sentence best adds specific detail about what visitors will see?",
      options: ["It will be interesting.", "The exhibit features rare artifacts from ancient Egypt.", "Many people will probably attend.", "Museums are educational."],
      correct_answer: 1,
      explanations: [
        "This provides no specific detail about the exhibit.",
        "Correct! This gives specific, relevant information about the exhibit's content.",
        "This discusses attendance, not what the exhibit contains.",
        "This makes a general statement about museums, not this specific exhibit."
      ]
    },
    {
      text: "[1] The chef uses local ingredients. [2] She sources vegetables from nearby farms. [3] Her restaurant has won several awards. [4] <u>Many chefs train in culinary schools.</u><br><br>Which sentence least supports the paragraph?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 3,
      explanations: [
        "Sentence 1 introduces the chef's practice.",
        "Sentence 2 provides specific detail about the practice.",
        "Sentence 3 shows the success resulting from her approach.",
        "Correct! Sentence 4 makes a general statement about chefs, not supporting details about this chef."
      ]
    },
    {
      text: "The company announced record profits.<br><br>Which sentence best explains the cause of this success?",
      options: ["This is good news.", "Strong sales of their new product drove the increase.", "Companies like to make profits.", "The announcement was made yesterday."],
      correct_answer: 1,
      explanations: [
        "This doesn't explain the cause of the profits.",
        "Correct! This provides a specific cause-and-effect explanation.",
        "This makes an obvious, irrelevant statement.",
        "This discusses timing, not causation."
      ]
    },
    {
      text: "[1] Regular dental checkups prevent serious problems. [2] Dentists can detect cavities early. [3] Early detection saves money on treatments. [4] <u>Toothpaste comes in many flavors.</u><br><br>Which sentence should be removed?",
      options: ["Sentence 1", "Sentence 2", "Sentence 3", "Sentence 4"],
      correct_answer: 3,
      explanations: [
        "Sentence 1 states the main idea about checkups.",
        "Sentence 2 gives a specific benefit of checkups.",
        "Sentence 3 adds another advantage of early detection.",
        "Correct! Sentence 4 mentions toothpaste flavors, which is irrelevant to checkups and detection."
      ]
    }
  ],

  'adding-deleting': [
    {
      text: "The scientist discovered a new species of butterfly in the rainforest. <u>[Should we add: \"The rainforest is home to thousands of species.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it provides relevant context", "Yes, it explains biodiversity", "No, it shifts focus from the discovery", "No, readers know about rainforests"],
      correct_answer: 2,
      explanations: [
        "While true, this shifts attention away from the specific discovery.",
        "The biodiversity fact, though interesting, doesn't support the discovery itself.",
        "Correct! The focus should remain on the new butterfly discovery, not general rainforest facts.",
        "This reason is weak; the real issue is that it diverts from the main point."
      ]
    },
    {
      text: "The new policy will reduce costs significantly. <u>[Currently includes: \"The old policy was implemented in 2015.\"]</u><br><br>Should this sentence be kept?",
      options: ["Yes, it provides historical context", "Yes, dates are always important", "No, it doesn't explain cost reduction", "No, 2015 is too recent"],
      correct_answer: 2,
      explanations: [
        "The date doesn't help readers understand the cost reduction.",
        "Dates are only important when relevant to the main point.",
        "Correct! The old policy's date doesn't explain how the new policy reduces costs.",
        "The year itself isn't the issue; the irrelevance to cost reduction is."
      ]
    },
    {
      text: "Electric vehicles produce zero emissions while driving. <u>[Should we add: \"This helps reduce air pollution in cities.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it explains a benefit", "Yes, pollution is important", "No, it's obvious", "No, it changes the topic"],
      correct_answer: 0,
      explanations: [
        "Correct! This addition explains the significance of zero emissions for urban air quality.",
        "While pollution is important, this reason doesn't justify the specific addition.",
        "The benefit may not be obvious to all readers and is worth stating explicitly.",
        "This continues the topic of emissions by explaining their impact."
      ]
    },
    {
      text: "The museum's collection includes rare manuscripts. <u>[Currently includes: \"Museums are important cultural institutions.\"]</u><br><br>Should this sentence be kept?",
      options: ["Yes, it provides context about museums", "Yes, it's true", "No, it's too general", "No, it shifts to a broader topic"],
      correct_answer: 3,
      explanations: [
        "This context is too broad and doesn't relate to this museum's manuscripts.",
        "Being true doesn't make a sentence relevant or necessary.",
        "The problem isn't just generality but shift away from the specific collection.",
        "Correct! This shifts from specific details about the collection to a general statement about all museums."
      ]
    },
    {
      text: "The recipe requires fresh basil for the best flavor. <u>[Should we add: \"Basil is a member of the mint family.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it's educational", "Yes, it describes basil", "No, botanical classification is irrelevant here", "No, readers may not care"],
      correct_answer: 2,
      explanations: [
        "Educational value alone doesn't justify addition if irrelevant to the recipe.",
        "Description is only valuable when it serves the passage's purpose.",
        "Correct! The botanical family doesn't help with recipe preparation or flavor.",
        "The issue isn't reader interest but relevance to the recipe context."
      ]
    },
    {
      text: "The program helps students develop leadership skills. <u>[Should we add: \"Leadership skills include communication and decision-making.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it defines leadership skills", "Yes, examples help readers", "No, it's too general", "No, it's obvious what leadership skills are"],
      correct_answer: 0,
      explanations: [
        "Correct! Defining what leadership skills include helps readers understand what the program teaches.",
        "While true, the main value is in clarifying what 'leadership skills' means.",
        "The examples are specific enough to be helpful, not too general.",
        "Not all readers may know what leadership skills encompass; clarification helps."
      ]
    },
    {
      text: "The company launched its app in 2020. <u>[Currently includes: \"2020 was a challenging year globally.\"]</u><br><br>Should this sentence be kept?",
      options: ["Yes, it provides historical context", "Yes, it's true", "No, global events don't affect the app launch", "No, it doesn't relate to the app specifically"],
      correct_answer: 3,
      explanations: [
        "The context is too broad and doesn't specifically relate to this app.",
        "Truth doesn't equal relevance.",
        "We don't know if global events affected the launch; this assumption isn't justified.",
        "Correct! Without explaining how 2020's challenges relate to this app, the statement is irrelevant."
      ]
    },
    {
      text: "Proper sleep improves cognitive function. <u>[Should we add: \"Most adults need 7-9 hours of sleep per night.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it provides specific guidance", "Yes, sleep duration matters", "No, it shifts away from cognitive function", "No, sleep needs vary by person"],
      correct_answer: 0,
      explanations: [
        "Correct! After stating that sleep improves cognition, specific guidance on sleep duration is helpful.",
        "While true, the better reason is that it provides actionable information.",
        "Sleep duration directly relates to getting proper sleep mentioned in the first sentence.",
        "While individual variation exists, general guidelines are still useful information."
      ]
    },
    {
      text: "The author won the Pulitzer Prize for this novel. <u>[Currently includes: \"The Pulitzer Prize was established in 1917.\"]</u><br><br>Should this sentence be kept?",
      options: ["Yes, it provides background on the prize", "Yes, history is important", "No, the founding date doesn't affect this novel's achievement", "No, 1917 is too long ago"],
      correct_answer: 2,
      explanations: [
        "Background on the prize's founding doesn't illuminate this specific achievement.",
        "Historical information is only important when relevant to the point.",
        "Correct! When the prize was established doesn't explain why this novel won or the prize's significance.",
        "The issue isn't how long ago 1917 was, but that the date is irrelevant."
      ]
    },
    {
      text: "The documentary explores climate change impacts. <u>[Should we add: \"The film features interviews with leading scientists.\"]</u><br><br>Should this sentence be added?",
      options: ["Yes, it describes the documentary's credibility", "Yes, scientists are mentioned", "No, interview subjects don't matter", "No, it's obvious documentaries have interviews"],
      correct_answer: 0,
      explanations: [
        "Correct! Mentioning scientist interviews establishes the documentary's credibility and approach.",
        "The reason to include it isn't just that scientists are mentioned, but what their inclusion signifies.",
        "The expertise of interview subjects very much matters for a documentary's authority.",
        "Not all documentaries feature expert interviews; this is relevant information."
      ]
    }
  ],

  'logical-placement': [
    {
      text: "[1] The experiment required careful preparation. [2] Scientists gathered the necessary equipment. [3] <u>The results exceeded expectations.</u> [4] They sterilized all instruments.<br><br>Where should sentence 3 be placed?",
      options: ["Where it is now", "After sentence 4", "At the beginning", "Delete it"],
      correct_answer: 1,
      explanations: [
        "Results shouldn't appear before the preparation and sterilization are complete.",
        "Correct! Results should come after all preparation steps (sentences 2 and 4).",
        "Results can't come before the experiment is even set up.",
        "The sentence is relevant and should be kept, just moved."
      ]
    },
    {
      text: "[1] <u>The company announced record profits.</u> [2] Sales increased throughout the year. [3] The new product line proved successful. [4] Marketing efforts targeted younger consumers.<br><br>Where should sentence 1 be placed?",
      options: ["Where it is now", "After sentence 2", "After sentence 3", "After sentence 4"],
      correct_answer: 3,
      explanations: [
        "Starting with the conclusion doesn't make sense before explaining what led to it.",
        "This still comes before explaining the new product and marketing.",
        "The marketing explanation should also come before the profit announcement.",
        "Correct! After explaining all the factors (sales, product, marketing), the profit announcement makes sense."
      ]
    },
    {
      text: "[1] The chef prepared the ingredients. [2] <u>The dinner was served at 8 PM.</u> [3] She preheated the oven. [4] Each dish was carefully plated.<br><br>Where should sentence 2 be placed?",
      options: ["Where it is now", "After sentence 4", "Before sentence 1", "Delete it"],
      correct_answer: 1,
      explanations: [
        "Serving dinner shouldn't appear before cooking and plating.",
        "Correct! Dinner should be served after preparation, cooking, and plating are complete.",
        "Serving comes at the end of the process, not the beginning.",
        "The sentence is relevant as the culmination of the cooking process."
      ]
    },
    {
      text: "[1] Students submitted their applications. [2] The committee reviewed each one carefully. [3] <u>Accepted students received welcome packets.</u> [4] Interviews were conducted with finalists.<br><br>Where should sentence 3 be placed?",
      options: ["Where it is now", "After sentence 4", "Before sentence 1", "At the end (sentence 5)"],
      correct_answer: 3,
      explanations: [
        "Students can't be accepted before interviews with finalists happen.",
        "This works better but 'after sentence 4' doesn't specify the final position clearly.",
        "Students can't be accepted before even applying.",
        "Correct! Acceptance and welcome packets come after application, review, and interviews."
      ]
    },
    {
      text: "[1] The seeds began to sprout. [2] <u>Farmers harvested the mature wheat.</u> [3] Regular watering ensured healthy growth. [4] The plants developed strong roots.<br><br>Where should sentence 2 be placed?",
      options: ["Where it is now", "At the end", "Before sentence 1", "Delete it"],
      correct_answer: 1,
      explanations: [
        "Harvesting can't happen right after sprouting.",
        "Correct! Harvest comes after sprouting, growth, and root development.",
        "You can't harvest before seeds even sprout.",
        "Harvesting is the logical conclusion of the growing process."
      ]
    },
    {
      text: "[1] <u>The book became a bestseller.</u> [2] The author spent years researching. [3] She drafted multiple revisions. [4] Publishers initially rejected the manuscript.<br><br>Where should sentence 1 be placed?",
      options: ["Where it is now", "After sentence 2", "After sentence 3", "At the end"],
      correct_answer: 3,
      explanations: [
        "The outcome shouldn't appear before the process is described.",
        "The drafting and rejections still need to be mentioned first.",
        "The rejections are part of the journey and should come before success.",
        "Correct! Bestseller status comes after research, drafting, rejections, and eventual publication."
      ]
    },
    {
      text: "[1] The patient recovered fully. [2] Doctors diagnosed the condition. [3] <u>Physical therapy aided rehabilitation.</u> [4] Treatment began immediately.<br><br>Where should sentence 3 be placed?",
      options: ["Where it is now", "Before sentence 1", "After sentence 4", "Delete it"],
      correct_answer: 2,
      explanations: [
        "Rehabilitation comes after treatment, not before it.",
        "Physical therapy is part of the recovery process, not complete recovery itself.",
        "Correct! Physical therapy comes after diagnosis and initial treatment, leading to recovery.",
        "Physical therapy is an important part of the recovery process."
      ]
    },
    {
      text: "[1] The architect designed the building. [2] Construction began in May. [3] The site was cleared and prepared. [4] <u>The building opened to the public.</u><br><br>Where should sentence 4 be placed?",
      options: ["Where it is now - it's correct", "After sentence 1", "After sentence 2", "Before sentence 3"],
      correct_answer: 0,
      explanations: [
        "Correct! Opening comes after design, site prep, and construction—the current order is logical.",
        "The building can't open before construction even begins.",
        "The building can't open before construction is complete.",
        "Opening can't happen before the site is even prepared."
      ]
    },
    {
      text: "[1] <u>The concert received rave reviews.</u> [2] Musicians rehearsed for weeks. [3] The venue was carefully selected. [4] Tickets sold out within hours.<br><br>Where should sentence 1 be placed?",
      options: ["Where it is now", "After sentence 3", "After sentence 4", "At the end (sentence 5)"],
      correct_answer: 3,
      explanations: [
        "Reviews come after the concert, not before rehearsals.",
        "Reviews still come after ticket sales and the actual concert.",
        "Reviews typically come after the concert, not just after tickets sell.",
        "Correct! Reviews come after all preparation (rehearsal, venue selection, ticket sales, and the concert)."
      ]
    },
    {
      text: "[1] The legislation was signed into law. [2] <u>Citizens noticed improvements in services.</u> [3] The bill passed both houses of Congress. [4] Implementation began immediately.<br><br>Where should sentence 2 be placed?",
      options: ["Where it is now", "After sentence 3", "After sentence 4", "At the end"],
      correct_answer: 3,
      explanations: [
        "Citizens can't notice improvements before the bill even passes.",
        "This is still too early—improvements need time after implementation.",
        "Improvements need time to manifest after implementation begins.",
        "Correct! Citizens notice improvements after the bill passes, is signed, and implementation has time to take effect."
      ]
    }
  ],

  'misc-topics': [
    {
      text: "The results of the study <u>was</u> surprising to researchers.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "were", "is", "are"],
      correct_answer: 1,
      explanations: [
        "'Results' is plural and requires a plural verb, not 'was.'",
        "Correct! 'Results' is plural and requires the plural past tense verb 'were.'",
        "'Is' is present tense; the context indicates past tense is needed.",
        "'Are' is present tense; 'were' (past) fits the context better."
      ]
    },
    {
      text: "There are <u>less</u> students in the advanced class.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "fewer", "lesser", "not as many"],
      correct_answer: 1,
      explanations: [
        "'Less' is for uncountable nouns; students can be counted.",
        "Correct! 'Fewer' is used with countable nouns like students.",
        "'Lesser' refers to degree or quality, not quantity.",
        "While this works, 'fewer' is more concise."
      ]
    },
    {
      text: "The team <u>which</u> won the championship celebrated all night.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "that", "who", "whom"],
      correct_answer: 1,
      explanations: [
        "'Which' is technically correct but 'that' is preferred for restrictive clauses about groups.",
        "Correct! 'That' is preferred for restrictive clauses identifying which team.",
        "'Who' can be used for teams but 'that' is more standard for groups.",
        "'Whom' is an object pronoun and doesn't fit here."
      ]
    },
    {
      text: "The book was laying on the table.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE - was laying", "was lying", "was laid", "had laid"],
      correct_answer: 1,
      explanations: [
        "'Laying' requires a direct object (laying something down); the book is just resting.",
        "Correct! 'Lying' means resting or reclining and is intransitive (no object needed).",
        "'Was laid' is passive and suggests someone placed it, changing the meaning.",
        "'Had laid' is past perfect of 'lay' (to place), which requires an object."
      ]
    },
    {
      text: "She felt <u>badly</u> about missing the meeting.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "bad", "worse", "really badly"],
      correct_answer: 1,
      explanations: [
        "'Badly' is an adverb; after 'felt' we need the adjective 'bad.'",
        "Correct! 'Bad' is the adjective needed after the linking verb 'felt.'",
        "'Worse' is comparative but there's no comparison being made.",
        "'Really badly' still uses the incorrect adverb form."
      ]
    },
    {
      text: "The number of applicants <u>have</u> increased significantly.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "has", "are", "were"],
      correct_answer: 1,
      explanations: [
        "'The number' is singular, even though 'applicants' is plural.",
        "Correct! 'The number' takes a singular verb; don't be confused by the plural 'applicants.'",
        "'Are' is plural and present; 'the number' needs singular.",
        "'Were' is plural and past; 'the number' needs singular."
      ]
    },
    {
      text: "Please lay the book down and <u>set</u> quietly for a moment.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "sit", "seat", "rest"],
      correct_answer: 1,
      explanations: [
        "'Set' means to place something and requires an object; you can't 'set quietly.'",
        "Correct! 'Sit' means to be seated and is intransitive (no object needed).",
        "'Seat' requires an object (seat someone or something).",
        "While 'rest' works, 'sit' is the most precise opposite of 'lay' in this context."
      ]
    },
    {
      text: "The documentary <u>rises</u> important questions about privacy.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "raises", "arises", "risen"],
      correct_answer: 1,
      explanations: [
        "'Rises' is intransitive (no object); 'questions' is the object, so we need transitive 'raises.'",
        "Correct! 'Raises' is transitive (raises something) and takes the object 'questions.'",
        "'Arises' means to come up and is intransitive, not used with an object.",
        "'Risen' is the past participle and doesn't fit the present tense context."
      ]
    },
    {
      text: "There are <u>alot</u> of reasons to support this policy.<br><br>Which choice best corrects the underlined portion?",
      options: ["NO CHANGE", "a lot", "many", "allot"],
      correct_answer: 1,
      explanations: [
        "'Alot' is not a word; it's always two words.",
        "Correct! 'A lot' is always two words when meaning 'many.'",
        "'Many' is correct but the question asks about 'a lot' specifically.",
        "'Allot' means to distribute or allocate, which doesn't fit here."
      ]
    },
    {
      text: "The company is looking for someone <u>who</u> can manage the team well.<br><br>Is this correct?",
      options: ["NO CHANGE - correct", "whom", "that", "which"],
      correct_answer: 0,
      explanations: [
        "Correct! 'Who' is the subject pronoun needed (who can manage).",
        "'Whom' is the object form; we need the subject form here.",
        "'That' can work but 'who' is preferred for people.",
        "'Which' is for things, not people."
      ]
    }
  ]
};

async function createQuizForLesson(lessonKey, questions) {
  try {
    // Get lesson from lesson_metadata
    const { data: lesson, error: lessonError } = await supabase
      .from('lesson_metadata')
      .select('id, lesson_key, title')
      .eq('lesson_key', lessonKey)
      .single();

    if (lessonError) throw lessonError;
    log.info(`Processing: ${lesson.title}`);

    // Check for existing quiz
    const { data: existingQuiz, error: quizFetchError } = await supabase
      .from('quizzes')
      .select('id, title')
      .eq('lesson_id', lesson.id)
      .eq('quiz_type', 'mastery')
      .maybeSingle();

    if (quizFetchError) throw quizFetchError;

    let quizId;

    if (existingQuiz) {
      quizId = existingQuiz.id;

      // Update position to ensure it's at the bottom
      await supabase
        .from('quizzes')
        .update({ position: 9999 })
        .eq('id', quizId);

      // Delete existing questions
      await supabase
        .from('quiz_questions')
        .delete()
        .eq('quiz_id', quizId);

    } else {
      // Create new quiz
      const { data: newQuiz, error: createError } = await supabase
        .from('quizzes')
        .insert({
          lesson_id: lesson.id,
          title: `${lesson.title} - Mastery Quiz`,
          intro: 'Test your understanding with these 10 ACT-style questions.',
          quiz_type: 'mastery',
          position: 9999,
          is_required: true
        })
        .select()
        .single();

      if (createError) throw createError;
      quizId = newQuiz.id;
    }

    // Insert questions
    const quizQuestions = questions.map((q, idx) => ({
      quiz_id: quizId,
      question_text: q.text,
      question_order: idx
    }));

    const { data: questionsData, error: qError } = await supabase
      .from('quiz_questions')
      .insert(quizQuestions)
      .select();

    if (qError) throw qError;

    // Insert options
    const quizOptions = [];
    questionsData.forEach((dbQuestion, qIdx) => {
      const originalQuestion = questions[qIdx];
      originalQuestion.options.forEach((optionText, optIdx) => {
        quizOptions.push({
          question_id: dbQuestion.id,
          option_text: optionText,
          option_order: optIdx,
          is_correct: optIdx === originalQuestion.correct_answer,
          explanation: originalQuestion.explanations[optIdx]
        });
      });
    });

    const { error: optionsError } = await supabase
      .from('quiz_options')
      .insert(quizOptions);

    if (optionsError) throw optionsError;

    log.success(`${lessonKey}: Created ${questions.length} questions with ${quizOptions.length} options`);
    return true;

  } catch (error) {
    log.error(`${lessonKey}: ${error.message}`);
    return false;
  }
}

async function generateAllQuizzes() {
  log.info('🚀 Generating All English Mastery Quizzes\n');

  const lessonKeys = Object.keys(quizQuestions);
  let successCount = 0;

  for (let i = 0; i < lessonKeys.length; i++) {
    const lessonKey = lessonKeys[i];
    log.progress(i + 1, lessonKeys.length, lessonKey);

    const success = await createQuizForLesson(lessonKey, quizQuestions[lessonKey]);
    if (success) successCount++;
  }

  log.info('\n📊 Summary:');
  log.success(`Successfully created ${successCount}/${lessonKeys.length} quizzes`);
}

generateAllQuizzes();
