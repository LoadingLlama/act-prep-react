/**
 * Complete TRANSITIONS lesson (30 questions)
 * Each choice has SPECIFIC explanation about what logical relationship it signals
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
const LESSON_ID = '7aae3763-017b-4762-ad5a-346aac1f027b';

async function addQuestion(q) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: LESSON_ID, position: q.position, title: q.title,
    problem_text: q.problem_text, choices: q.choices,
    correct_answer: q.correct_answer, solution_steps: [],
    answer_explanation: q.answer_explanation || '', is_worked_example: false
  });
  if (error) { console.error(`  ✗ Position ${q.position}:`, error.message); return false; }
  return true;
}

const questions = [
  {
    position: 5,
    title: 'Basic Contrast Transition',
    problem_text: 'The forecast predicted rain. <u>Therefore,</u> the outdoor concert proceeded as planned.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Therefore" signals cause-effect, suggesting rain caused the concert to proceed. This is illogical—rain would prevent outdoor events.' },
      { letter: 'B', text: 'However,', explanation: '"However" signals contrast, correctly showing that despite the rain prediction, the concert went forward anyway. This logical opposition fits the context.' },
      { letter: 'C', text: 'Furthermore,', explanation: '"Furthermore" signals addition of similar ideas, implying rain prediction and concert proceeding are aligned. They\'re actually opposite situations.' },
      { letter: 'D', text: 'Consequently,', explanation: '"Consequently" signals result/effect, suggesting the concert happened because of rain. This reverses the logical relationship—rain would cancel concerts.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Transitions must match logical relationships. "However" signals the contrast between rain prediction and concert proceeding.'
  },
  {
    position: 6,
    title: 'Addition vs. Contrast',
    problem_text: 'The museum features Renaissance paintings. <u>In contrast,</u> it houses an extensive collection of modern sculpture.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals opposition, suggesting Renaissance and modern works oppose each other. Museums commonly display multiple periods; this isn\'t a contrast.' },
      { letter: 'B', text: 'Additionally,', explanation: '"Additionally" signals adding another item to a list, correctly showing the museum has both Renaissance paintings AND modern sculpture—two holdings, not opposing ones.' },
      { letter: 'C', text: 'On the other hand,', explanation: '"On the other hand" signals alternatives or opposition, implying you must choose one period. Museums display multiple periods simultaneously.' },
      { letter: 'D', text: 'Nevertheless,', explanation: '"Nevertheless" signals concession/contrast, suggesting modern sculpture exists despite Renaissance paintings. Both can coexist normally in museums.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Museums displaying multiple art periods are adding to collections, not creating contrasts. "Additionally" signals this additive relationship.'
  },
  {
    position: 7,
    title: 'Cause-Effect Recognition',
    problem_text: 'The company invested heavily in employee training. <u>However,</u> productivity increased by 40%.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"However" signals contrast, implying training investment opposes productivity increase. Training causing productivity gains is expected, not contradictory.' },
      { letter: 'B', text: 'As a result,', explanation: '"As a result" signals cause-effect, correctly showing that training investment caused the productivity increase. This is the expected logical relationship.' },
      { letter: 'C', text: 'On the contrary,', explanation: '"On the contrary" signals strong opposition, suggesting productivity increase contradicts training investment. These are logically connected, not opposed.' },
      { letter: 'D', text: 'For instance,', explanation: '"For instance" signals example, implying 40% increase exemplifies training investment. The increase is a result, not an example.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Training investment logically causes productivity increases. "As a result" correctly signals this cause-effect relationship.'
  },
  {
    position: 9,
    title: 'Sequence vs. Contrast',
    problem_text: 'First, mix the dry ingredients. <u>In contrast,</u> add the wet ingredients gradually.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals opposition between dry and wet ingredients. Recipe steps are sequential, not opposing—both are necessary steps.' },
      { letter: 'B', text: 'Next,', explanation: '"Next" signals the following step in a sequence, correctly showing this is the second step after mixing dry ingredients.' },
      { letter: 'C', text: 'Alternatively,', explanation: '"Alternatively" signals a different option instead of the first. Both steps are required, not alternative choices.' },
      { letter: 'D', text: 'Nevertheless,', explanation: '"Nevertheless" signals concession, implying wet ingredients are added despite dry ingredients. Both are standard required steps.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Recipe instructions are sequential steps. "Next" correctly signals the following step in the procedure.'
  },
  {
    position: 10,
    title: 'Example Introduction',
    problem_text: 'Many animals adapt to extreme environments. <u>As a result,</u> Arctic foxes develop thick winter coats.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"As a result" signals that Arctic foxes are a consequence of adaptation. Foxes are an example of adaptation, not a result of the general concept.' },
      { letter: 'B', text: 'For example,', explanation: '"For example" correctly signals that Arctic foxes illustrate the general statement about animals adapting to extreme environments.' },
      { letter: 'C', text: 'On the other hand,', explanation: '"On the other hand" signals contrast, implying Arctic foxes contradict animal adaptation. Foxes exemplify adaptation, not oppose it.' },
      { letter: 'D', text: 'In addition,', explanation: '"In addition" signals adding another main idea equal to the first. Arctic foxes are a specific example, not an additional general statement.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Arctic foxes illustrate the general principle. "For example" correctly signals this example relationship.'
  },
  {
    position: 13,
    title: 'Emphasis Transition',
    problem_text: 'The medication reduces symptoms. <u>For instance,</u> it completely eliminates severe pain in most patients.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For instance" signals examples, but eliminating severe pain isn\'t just an example of reduction—it\'s a dramatic extent of it.' },
      { letter: 'B', text: 'Indeed,', explanation: '"Indeed" signals emphasis/confirmation, correctly highlighting that complete elimination is a strong confirmation of symptom reduction.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals contrast, implying complete elimination opposes symptom reduction. Complete elimination is an extreme form of reduction, not opposition.' },
      { letter: 'D', text: 'Meanwhile,', explanation: '"Meanwhile" signals simultaneous action, implying pain elimination happens at the same time as something else. This emphasizes the result, not timing.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Complete elimination emphasizes and confirms symptom reduction. "Indeed" correctly signals this emphatic confirmation.'
  },
  {
    position: 14,
    title: 'Concession Pattern',
    problem_text: 'The proposal had several flaws. <u>Therefore,</u> the committee approved it for its innovative approach.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Therefore" signals that approval resulted from flaws. Approval happened despite flaws, not because of them.' },
      { letter: 'B', text: 'Nevertheless,', explanation: '"Nevertheless" signals concession, correctly showing approval happened despite the flaws—acknowledging the obstacle but indicating it was overcome.' },
      { letter: 'C', text: 'Similarly,', explanation: '"Similarly" signals likeness, implying flaws and approval are similar ideas. They\'re opposing circumstances—flaws vs. approval.' },
      { letter: 'D', text: 'Additionally,', explanation: '"Additionally" signals adding ideas, suggesting approval adds to flaws. Approval opposes/overcomes flaws rather than adding to them.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Approval despite flaws requires a concession transition. "Nevertheless" correctly signals this relationship.'
  },
  {
    position: 15,
    title: 'Time Sequence',
    problem_text: 'The research team collected data for six months. <u>In contrast,</u> they analyzed the results.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals opposition between collection and analysis. These are sequential research phases, not opposing activities.' },
      { letter: 'B', text: 'Subsequently,', explanation: '"Subsequently" signals that analysis occurred after collection, correctly showing the temporal sequence of research phases.' },
      { letter: 'C', text: 'For example,', explanation: '"For example" signals that analysis exemplifies data collection. Analysis is a separate subsequent phase, not an example of collection.' },
      { letter: 'D', text: 'Alternatively,', explanation: '"Alternatively" signals a different choice instead of collection. Research requires both collection and analysis, not one or the other.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Analysis follows data collection chronologically. "Subsequently" correctly signals this time sequence.'
  },
  {
    position: 16,
    title: 'Clarification Transition',
    problem_text: 'The policy aims to reduce emissions. <u>For instance,</u> it targets a 50% reduction in carbon output.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For instance" works but 50% reduction isn\'t one example among many—it\'s the specific target clarifying the general goal.' },
      { letter: 'B', text: 'Specifically,', explanation: '"Specifically" correctly signals that 50% reduction is the precise detail clarifying what "reduce emissions" means.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals contrast, implying 50% reduction opposes emission reduction. The target specifies the goal, not opposes it.' },
      { letter: 'D', text: 'Meanwhile,', explanation: '"Meanwhile" signals simultaneous action, implying 50% target happens during reduction. The target specifies the reduction, doesn\'t happen alongside it.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The 50% target specifies the vague "reduce emissions." "Specifically" correctly signals this clarifying relationship.'
  },
  {
    position: 19,
    title: 'Comparison Transition',
    problem_text: 'Urban areas show high pollution levels. <u>As a result,</u> rural regions maintain cleaner air quality.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"As a result" signals urban pollution causes rural cleanliness. These are independent conditions being compared, not cause-effect.' },
      { letter: 'B', text: 'In contrast,', explanation: '"In contrast" correctly signals comparison between urban pollution and rural cleanliness—two different conditions being juxtaposed.' },
      { letter: 'C', text: 'Similarly,', explanation: '"Similarly" signals likeness, implying urban and rural air quality are alike. They\'re opposite conditions, not similar.' },
      { letter: 'D', text: 'Therefore,', explanation: '"Therefore" signals rural cleanliness results from urban pollution. These are separate conditions being compared, not causally linked.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Urban and rural air quality are being compared as opposites. "In contrast" correctly signals this comparison.'
  },
  {
    position: 20,
    title: 'Summary Transition',
    problem_text: 'The study examined diet, exercise, and sleep patterns. <u>For example,</u> lifestyle factors significantly affect health outcomes.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For example" signals that lifestyle factors exemplify diet/exercise/sleep. Actually, diet/exercise/sleep are examples OF lifestyle factors.' },
      { letter: 'B', text: 'In summary,', explanation: '"In summary" correctly signals that "lifestyle factors affect health" summarizes the specific factors (diet, exercise, sleep) just mentioned.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals contrast between specific factors and general conclusion. The conclusion summarizes the factors, not opposes them.' },
      { letter: 'D', text: 'Meanwhile,', explanation: '"Meanwhile" signals simultaneous action, implying general conclusion happens during specific factors. The conclusion summarizes them.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The second sentence summarizes the specific factors listed. "In summary" correctly signals this summarizing relationship.'
  },
  {
    position: 21,
    title: 'Condition-Consequence',
    problem_text: 'Students must complete the prerequisite course. <u>Similarly,</u> they cannot enroll in advanced classes.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Similarly" signals likeness between prerequisite requirement and inability to enroll. The second is a consequence of not meeting the first, not a similar requirement.' },
      { letter: 'B', text: 'Otherwise,', explanation: '"Otherwise" correctly signals that failure to complete prerequisites results in inability to enroll—showing the negative consequence of not meeting the condition.' },
      { letter: 'C', text: 'Furthermore,', explanation: '"Furthermore" signals adding information, implying non-enrollment adds to prerequisites. Non-enrollment is a consequence, not an additional requirement.' },
      { letter: 'D', text: 'For instance,', explanation: '"For instance" signals that non-enrollment exemplifies prerequisites. Non-enrollment is the consequence of lacking prerequisites, not an example of them.' }
    ],
    correct_answer: 'B',
    answer_explanation: '"Otherwise" correctly signals the negative consequence of not meeting the prerequisite requirement.'
  },
  {
    position: 23,
    title: 'Elaboration Pattern',
    problem_text: 'The novel explores identity. <u>In contrast,</u> the protagonist struggles with cultural heritage and personal ambition.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals cultural/personal struggles oppose identity exploration. These struggles are the specific way identity is explored, not opposition.' },
      { letter: 'B', text: 'Specifically,', explanation: '"Specifically" correctly signals that cultural heritage and personal ambition are the precise ways identity exploration manifests in the novel.' },
      { letter: 'C', text: 'Nevertheless,', explanation: '"Nevertheless" signals struggles happen despite identity exploration. The struggles ARE the identity exploration, not opposed to it.' },
      { letter: 'D', text: 'Consequently,', explanation: '"Consequently" signals struggles result from identity exploration. The struggles are how identity is explored, not a result of exploring it.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The second sentence elaborates specifically how identity is explored. "Specifically" correctly signals this elaboration.'
  },
  {
    position: 24,
    title: 'Alternative Presentation',
    problem_text: 'The committee could increase funding. <u>As a result,</u> they might reallocate existing resources.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"As a result" signals reallocation results from increasing funding. These are two alternative solutions, not cause-effect.' },
      { letter: 'B', text: 'Alternatively,', explanation: '"Alternatively" correctly signals that reallocation is a different option instead of increasing funding—two possible solutions.' },
      { letter: 'C', text: 'Furthermore,', explanation: '"Furthermore" signals reallocation adds to increasing funding. These are alternative options, not cumulative actions.' },
      { letter: 'D', text: 'Therefore,', explanation: '"Therefore" signals reallocation results from funding increase. These are separate alternative strategies, not sequential steps.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The sentences present two different options for solving the problem. "Alternatively" correctly signals this alternative relationship.'
  },
  {
    position: 29,
    title: 'Continuation vs. Shift',
    problem_text: 'The first experiment confirmed the hypothesis. <u>On the contrary,</u> the second experiment provided additional supporting evidence.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"On the contrary" signals strong opposition, implying the second experiment contradicts the first. Both experiments support the hypothesis.' },
      { letter: 'B', text: 'Moreover,', explanation: '"Moreover" correctly signals that the second experiment adds more support—continuing and strengthening the same trend.' },
      { letter: 'C', text: 'In contrast,', explanation: '"In contrast" signals opposition between the experiments. Both support the hypothesis; they\'re aligned, not opposed.' },
      { letter: 'D', text: 'Otherwise,', explanation: '"Otherwise" signals an alternative if the first didn\'t happen. The second experiment actually happened and added to the first.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Both experiments support the hypothesis. "Moreover" correctly signals the second adds to the first\'s support.'
  },
  {
    position: 33,
    title: 'Intensity Escalation',
    problem_text: 'The storm caused property damage. <u>Similarly,</u> several buildings were completely destroyed.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Similarly" signals complete destruction is like general damage. Complete destruction is extreme damage, not similar—it escalates the severity.' },
      { letter: 'B', text: 'In fact,', explanation: '"In fact" correctly signals that complete destruction is a more severe/specific reality than general "property damage"—escalating the intensity.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals complete destruction contrasts with damage. Destruction is severe damage, not opposition to damage.' },
      { letter: 'D', text: 'For instance,', explanation: '"For instance" works but doesn\'t capture that complete destruction represents the most severe form of damage.' }
    ],
    correct_answer: 'B',
    answer_explanation: '"In fact" correctly signals that complete destruction intensifies/escalates the general damage mentioned.'
  },
  {
    position: 34,
    title: 'Logical Consequence',
    problem_text: 'The species lost its natural habitat. <u>For example,</u> population numbers declined dramatically.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For example" signals population decline illustrates habitat loss. Decline is a consequence of habitat loss, not an example of it.' },
      { letter: 'B', text: 'Consequently,', explanation: '"Consequently" correctly signals that population decline resulted from habitat loss—showing the logical environmental cause-effect.' },
      { letter: 'C', text: 'Likewise,', explanation: '"Likewise" signals population decline is similar to habitat loss. Decline results from loss; they\'re not parallel situations.' },
      { letter: 'D', text: 'In contrast,', explanation: '"In contrast" signals decline opposes habitat loss. Decline is the expected result of habitat loss, not opposition.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Habitat loss logically causes population decline. "Consequently" correctly signals this cause-effect relationship.'
  },
  {
    position: 35,
    title: 'Supporting Detail',
    problem_text: 'The evidence supports climate change. <u>However,</u> global temperatures have risen 1.5°C since pre-industrial times.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"However" signals temperature rise contrasts with evidence supporting climate change. Temperature rise IS the evidence, not opposition.' },
      { letter: 'B', text: 'Indeed,', explanation: '"Indeed" correctly emphasizes that the temperature data confirms/supports the climate change evidence claim.' },
      { letter: 'C', text: 'Otherwise,', explanation: '"Otherwise" signals temperature rise would happen if evidence didn\'t exist. Temperature data IS the evidence being referenced.' },
      { letter: 'D', text: 'Alternatively,', explanation: '"Alternatively" signals temperature rise is a different option from evidence. Temperature data is the evidence itself, not an alternative.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Temperature data confirms the evidence claim. "Indeed" correctly signals this confirmatory relationship.'
  },
  {
    position: 36,
    title: 'Problem-Solution Signal',
    problem_text: 'Traffic congestion worsened significantly. <u>Similarly,</u> the city implemented express bus lanes.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Similarly" signals bus lanes are like congestion. Bus lanes are a solution to congestion, not a similar problem.' },
      { letter: 'B', text: 'In response,', explanation: '"In response" correctly signals that bus lanes were implemented as a solution addressing the congestion problem.' },
      { letter: 'C', text: 'For example,', explanation: '"For example" signals bus lanes exemplify congestion. Bus lanes solve congestion; they\'re not an example of it.' },
      { letter: 'D', text: 'Nevertheless,', explanation: '"Nevertheless" signals bus lanes happened despite congestion. Bus lanes were implemented because of congestion, as a response.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Bus lanes were implemented to solve congestion. "In response" correctly signals this problem-solution relationship.'
  },
  {
    position: 38,
    title: 'Unexpected Outcome',
    problem_text: 'The medication showed promise in trials. <u>Therefore,</u> regulators rejected it for safety concerns.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Therefore" signals rejection resulted from promise. Rejection happened despite promise, not because of it—it\'s an unexpected reversal.' },
      { letter: 'B', text: 'However,', explanation: '"However" correctly signals that rejection contrasts with the expected approval based on trial promise—showing the unexpected turn.' },
      { letter: 'C', text: 'Furthermore,', explanation: '"Furthermore" signals rejection adds to promise. Rejection opposes/reverses the promise, not adds to it.' },
      { letter: 'D', text: 'Similarly,', explanation: '"Similarly" signals rejection is like promise. These are opposite outcomes—promise vs. rejection.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Rejection despite promising trials is unexpected. "However" correctly signals this contrasting outcome.'
  },
  {
    position: 39,
    title: 'Parallel Structure Signal',
    problem_text: 'The program benefits students academically. <u>In contrast,</u> it enhances their social development.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals social development opposes academic benefit. Both are positive program outcomes being listed, not opposed.' },
      { letter: 'B', text: 'Likewise,', explanation: '"Likewise" correctly signals that social enhancement parallels academic benefit—two similar positive outcomes.' },
      { letter: 'C', text: 'Nevertheless,', explanation: '"Nevertheless" signals social development happens despite academic benefit. Both are intended program outcomes, not concessions.' },
      { letter: 'D', text: 'Otherwise,', explanation: '"Otherwise" signals social development is an alternative to academic benefit. The program provides both simultaneously.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Both sentences describe parallel positive program outcomes. "Likewise" correctly signals this parallel relationship.'
  },
  {
    position: 40,
    title: 'Restatement for Emphasis',
    problem_text: 'The discovery could revolutionize medicine. <u>Nevertheless,</u> it represents a fundamental breakthrough in treatment.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Nevertheless" signals breakthrough opposes revolutionizing medicine. These statements say the same thing—"revolutionize" and "fundamental breakthrough" are equivalent.' },
      { letter: 'B', text: 'In other words,', explanation: '"In other words" correctly signals that "fundamental breakthrough" restates "revolutionize medicine" using different language for emphasis.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals breakthrough contrasts with revolution. Both statements express the same significant impact, not opposition.' },
      { letter: 'D', text: 'Alternatively,', explanation: '"Alternatively" signals breakthrough is different from revolution. These are the same idea expressed differently, not alternatives.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The second sentence restates the first\'s meaning. "In other words" correctly signals this restatement.'
  },
  {
    position: 41,
    title: 'Generalization Pattern',
    problem_text: 'The team won five championships, broke attendance records, and increased revenue. <u>For instance,</u> the program achieved unprecedented success.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For instance" signals success is an example of achievements. The specific achievements (championships, records, revenue) are examples OF success, not vice versa.' },
      { letter: 'B', text: 'Overall,', explanation: '"Overall" correctly signals that "unprecedented success" is a general conclusion summarizing the specific achievements listed.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals success contrasts with achievements. Success is the general term encompassing the achievements, not opposing them.' },
      { letter: 'D', text: 'Similarly,', explanation: '"Similarly" signals success is like the specific achievements. Success is the general category; it doesn\'t parallel the specifics.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The second sentence generalizes the specific achievements. "Overall" correctly signals this generalization.'
  },
  {
    position: 43,
    title: 'Qualification Transition',
    problem_text: 'The theory explains most observations. <u>Therefore,</u> it cannot account for certain anomalies.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Therefore" signals inability results from explanation power. Inability to explain anomalies limits the theory, not results from its success.' },
      { letter: 'B', text: 'However,', explanation: '"However" correctly signals that anomalies are a limitation qualifying the theory\'s general explanatory success.' },
      { letter: 'C', text: 'Furthermore,', explanation: '"Furthermore" signals anomalies add to explanatory success. Anomalies are limitations that qualify the success, not additions to it.' },
      { letter: 'D', text: 'Likewise,', explanation: '"Likewise" signals anomalies are similar to explanation. Anomalies are exceptions/limits to explanation, not parallel points.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Anomalies are limitations qualifying the theory\'s success. "However" correctly signals this qualification.'
  },
  {
    position: 44,
    title: 'Implied Causation',
    problem_text: 'The soil lacks essential nutrients. <u>For example,</u> crops fail to thrive in this region.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"For example" signals crop failure exemplifies nutrient deficiency. Crop failure is caused by nutrient deficiency, not an example of it.' },
      { letter: 'B', text: 'As a result,', explanation: '"As a result" correctly signals that crop failure is the consequence of nutrient-deficient soil—showing agricultural cause-effect.' },
      { letter: 'C', text: 'In contrast,', explanation: '"In contrast" signals crop failure opposes nutrient deficiency. Crop failure results from deficiency; they\'re causally linked, not opposed.' },
      { letter: 'D', text: 'Similarly,', explanation: '"Similarly" signals crop failure is like nutrient deficiency. These are cause and effect, not similar parallel conditions.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Nutrient deficiency causes crop failure. "As a result" correctly signals this agricultural cause-effect.'
  },
  {
    position: 46,
    title: 'Concession with Reversal',
    problem_text: 'Critics questioned the methodology. <u>As a result,</u> the findings gained widespread acceptance.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"As a result" signals acceptance resulted from criticism. Acceptance happened despite criticism, showing the findings overcame the challenge.' },
      { letter: 'B', text: 'Nevertheless,', explanation: '"Nevertheless" correctly signals that acceptance occurred despite methodological criticism—acknowledging the obstacle while showing it was overcome.' },
      { letter: 'C', text: 'Similarly,', explanation: '"Similarly" signals acceptance is like criticism. These are opposing responses—criticism vs. acceptance.' },
      { letter: 'D', text: 'For instance,', explanation: '"For instance" signals acceptance exemplifies criticism. Acceptance opposes criticism; it doesn\'t exemplify it.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'Acceptance despite criticism requires concession. "Nevertheless" correctly signals findings overcame the criticism.'
  },
  {
    position: 47,
    title: 'Sequential Addition',
    problem_text: 'The museum acquired Renaissance paintings. <u>In contrast,</u> it purchased Baroque sculptures and commissioned contemporary installations.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"In contrast" signals Baroque/contemporary oppose Renaissance. All are art acquisitions for the collection, not opposing actions.' },
      { letter: 'B', text: 'Additionally,', explanation: '"Additionally" correctly signals that Baroque and contemporary works are being added to the collection alongside Renaissance paintings.' },
      { letter: 'C', text: 'Nevertheless,', explanation: '"Nevertheless" signals other acquisitions happened despite Renaissance purchase. All acquisitions are normal collection-building, not concessions.' },
      { letter: 'D', text: 'Otherwise,', explanation: '"Otherwise" signals Baroque/contemporary replace Renaissance. The museum acquired all of them, not one instead of others.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The museum is adding multiple items to its collection. "Additionally" correctly signals this additive accumulation.'
  },
  {
    position: 48,
    title: 'Contrast in Degree',
    problem_text: 'Some participants showed improvement. <u>Similarly,</u> the majority demonstrated remarkable recovery.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"Similarly" signals remarkable recovery is like "some" improvement. "Majority" with "remarkable" is more extensive/positive than "some" improvement.' },
      { letter: 'B', text: 'Indeed,', explanation: '"Indeed" correctly signals that majority\'s remarkable recovery confirms and intensifies the initial observation of improvement—same direction but stronger.' },
      { letter: 'C', text: 'However,', explanation: '"However" signals recovery opposes improvement. Both are positive outcomes; majority\'s recovery intensifies rather than opposes the trend.' },
      { letter: 'D', text: 'Otherwise,', explanation: '"Otherwise" signals recovery is an alternative to improvement. Recovery is intense improvement, not an alternative to it.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The majority\'s remarkable recovery confirms and intensifies the improvement trend. "Indeed" correctly signals this intensification.'
  },
  {
    position: 49,
    title: 'Sophisticated Contrast',
    problem_text: 'Conventional methods prioritize efficiency. <u>As a result,</u> the alternative approach emphasizes sustainability over speed.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"As a result" signals the alternative resulted from conventional methods. The alternative opposes conventional priorities, not results from them.' },
      { letter: 'B', text: 'In contrast,', explanation: '"In contrast" correctly signals that sustainability-over-speed opposes the efficiency priority of conventional methods.' },
      { letter: 'C', text: 'Similarly,', explanation: '"Similarly" signals sustainability priority is like efficiency priority. These are different value priorities being compared.' },
      { letter: 'D', text: 'Furthermore,', explanation: '"Furthermore" signals sustainability adds to efficiency. Sustainability-over-speed represents a different priority, not an addition.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The approaches have opposing priorities (efficiency vs. sustainability). "In contrast" correctly signals this opposition.'
  },
  {
    position: 50,
    title: 'Complex Culmination',
    problem_text: 'The expedition faced equipment failures, extreme weather, and supply shortages. <u>However,</u> these challenges tested the team\'s resilience and determination.',
    choices: [
      { letter: 'A', text: 'NO CHANGE', explanation: '"However" signals challenges testing resilience opposes the difficulties. Testing resilience is a reframing that finds meaning in hardship, not opposition to it.' },
      { letter: 'B', text: 'Ultimately,', explanation: '"Ultimately" correctly signals that resilience-testing is the final significance/outcome of the challenges—the culminating meaning of the difficulties.' },
      { letter: 'C', text: 'For example,', explanation: '"For example" signals resilience-testing exemplifies specific challenges. It\'s the overall significance of all challenges, not an example of one.' },
      { letter: 'D', text: 'Similarly,', explanation: '"Similarly" signals testing resilience is like the challenges. Testing is the meaning derived from challenges, not a similar event.' }
    ],
    correct_answer: 'B',
    answer_explanation: 'The second sentence reveals the ultimate significance of all the challenges. "Ultimately" correctly signals this culminating meaning.'
  }
];

async function main() {
  console.log('Completing TRANSITIONS (30 questions with specific per-choice explanations)...\n');
  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }
  console.log(`\n✅ TRANSITIONS Complete! Added ${added}/30 questions.`);
}
main();
