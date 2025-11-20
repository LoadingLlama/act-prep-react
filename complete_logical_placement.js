/**
 * Complete logical-placement lesson with 30 questions
 * Positions: 5-7, 9-10, 13-16, 19-21, 23-24, 29, 33-36, 38-41, 43-44, 46-50
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '7dd5f9a2-c597-4d33-a0a0-e98d58075eb4'; // logical-placement

async function addQuestion(question) {
  const { error } = await supabase.from('lesson_examples').insert({
    lesson_id: LESSON_ID,
    position: question.position,
    title: question.title,
    problem_text: question.problem_text,
    choices: question.choices,
    correct_answer: question.correct_answer,
    solution_steps: [],
    answer_explanation: question.answer_explanation,
    is_worked_example: false
  });

  if (error) {
    console.error(`  ✗ Error at position ${question.position}:`, error.message);
    return false;
  }
  return true;
}

const questions = [
  // EASY: 5-7, 9-10 (5 questions)
  {
    position: 5,
    title: 'Basic Chronological Order',
    problem_text: '[1] Maria graduated from college in June. [2] She started her new job in September. [3] <u>She received a job offer in July.</u> [4] By December, she had been promoted to team lead.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'July (job offer) occurring after September (started job) violates chronological order—you can\'t start a job in September if you don\'t receive the offer until July.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'This creates proper chronological sequence: graduated June → received offer July → started job September → promoted December. The job offer logically comes between graduation and starting work.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Placing the job offer after the promotion (December) completely disrupts chronological order—the offer must come before starting the job, not after being promoted in it.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Receiving a job offer before graduating is illogical for this sequence—the narrative shows she graduated first, then got the offer, not vice versa.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 1 to maintain chronological order: graduation → job offer → starting job → promotion.'
  },
  {
    position: 6,
    title: 'Simple Cause-Effect Sequence',
    problem_text: '[1] The temperature dropped below freezing overnight. [2] <u>The city deployed salt trucks to prevent accidents.</u> [3] Roads became covered with ice. [4] Morning commuters faced hazardous driving conditions.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Deploying salt trucks (response) before roads ice over (problem) reverses cause and effect—cities respond to icy roads, they don\'t deploy salt before ice forms in this sequence.'
      },
      {
        letter: 'B',
        text: 'before Sentence 1.',
        explanation: 'Deploying salt trucks before the temperature drops makes no sense in this narrative sequence, which describes what happened as events unfolded, not preventive measures taken in advance.'
      },
      {
        letter: 'C',
        text: 'after Sentence 3.',
        explanation: 'This creates logical cause-effect: freezing temps → ice forms → city responds with salt trucks → commuters face hazards. The city\'s response comes after the problem (ice) develops but as hazards are emerging.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Deploying salt trucks after commuters already faced hazards places the response after the consequence, when logically the city would respond once ice formed but while trying to prevent the worst hazards.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Sentence 2 should be placed after Sentence 3 so the city\'s response follows the problem (icy roads) it addresses.'
  },
  {
    position: 7,
    title: 'Basic Topic Introduction',
    problem_text: '[1] <u>This variety includes roses, tulips, and sunflowers.</u> [2] The community garden features plants from many different species. [3] Each flower attracts specific pollinators. [4] Gardeners carefully plan which species to place together.\n\nFor the sake of logic and coherence, Sentence 1 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Beginning with specific examples (roses, tulips, sunflowers) before establishing what "this variety" refers to is confusing—readers don\'t know what variety is being discussed until Sentence 2.'
      },
      {
        letter: 'B',
        text: 'after Sentence 2.',
        explanation: 'This creates logical flow: first establish that the garden has variety (Sentence 2), then specify what that variety includes (roses, tulips, sunflowers), then discuss how different flowers function (pollinators, planning).'
      },
      {
        letter: 'C',
        text: 'after Sentence 3.',
        explanation: 'Placing specific flower examples after discussing how flowers attract pollinators disrupts the logical progression from general variety → specific examples → functional relationships.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Listing specific flowers at the end, after discussing planting strategies, reverses the logical order from general to specific and from what exists to how it\'s managed.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 1 should be placed after Sentence 2 so the specific examples follow the general statement about variety they illustrate.'
  },
  {
    position: 9,
    title: 'Simple Supporting Detail Placement',
    problem_text: '[1] Ancient Egyptian pyramids demonstrate remarkable engineering skills. [2] The Great Pyramid contains over 2 million stone blocks. [3] Workers transported these massive stones without modern machinery. [4] <u>Each block weighs an average of 2.5 tons.</u>\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Specifying block weight after mentioning how they were transported is acceptable but not optimal—the weight detail would better support the statement about millions of blocks before discussing the transportation challenge.'
      },
      {
        letter: 'B',
        text: 'before Sentence 1.',
        explanation: 'Beginning with the specific detail about block weight before introducing the pyramids themselves is illogical—readers need the context (pyramids, engineering) before encountering specific measurements.'
      },
      {
        letter: 'C',
        text: 'after Sentence 2.',
        explanation: 'This creates the most logical flow: mentions millions of blocks → specifies how heavy each block is → explains they were moved without modern machinery. Weight information clarifies the scale before discussing the transportation feat.'
      },
      {
        letter: 'D',
        text: 'before Sentence 2.',
        explanation: 'Stating block weight before mentioning how many blocks exist is slightly awkward—it\'s more logical to establish quantity first, then specify the weight of each block.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'Sentence 4 should be placed after Sentence 2 to specify the blocks\' weight immediately after introducing their quantity, before discussing transportation challenges.'
  },
  {
    position: 10,
    title: 'Basic Process Steps',
    problem_text: '[1] Making bread requires several steps. [2] Mix the dough ingredients together. [3] <u>Let the dough rise for one hour.</u> [4] Knead the dough for ten minutes. [5] Bake at 375 degrees.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Letting dough rise before kneading it reverses the standard bread-making process—dough must be kneaded to develop gluten structure before it can rise properly.'
      },
      {
        letter: 'B',
        text: 'after Sentence 4.',
        explanation: 'This creates proper process order: mix ingredients → knead to develop structure → let rise → bake. Kneading must come before rising for the dough to develop the gluten network that enables rising.'
      },
      {
        letter: 'C',
        text: 'before Sentence 2.',
        explanation: 'Letting dough rise before mixing ingredients is impossible—you can\'t let something rise before you\'ve created it. This completely violates the logical sequence of bread-making.'
      },
      {
        letter: 'D',
        text: 'after Sentence 5.',
        explanation: 'Letting dough rise after baking makes no sense—the rising step is part of preparation before baking, not something that happens after the bread is already in the oven.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 4 to follow the correct bread-making sequence: mix → knead → rise → bake.'
  },

  // MEDIUM: 13-16, 19-21, 23-24, 29 (10 questions)
  {
    position: 13,
    title: 'Transitional Logic Flow',
    problem_text: '[1] Renewable energy sources offer significant environmental benefits. [2] Solar and wind power produce no greenhouse gas emissions during operation. [3] <u>However, transitioning to renewable energy also presents economic opportunities.</u> [4] The renewable energy sector has created millions of new jobs worldwide. [5] These positions range from manufacturing solar panels to installing wind turbines.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: '"However" signals contrast, but transitioning from environmental benefits (emissions) to economic benefits (jobs) is addition, not contrast—"however" is the wrong transition, and the placement interrupts the environmental benefit discussion.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Placing the economic transition right after the opening would interrupt the development of environmental benefits before they\'re fully explained—the emissions point (Sentence 2) would be orphaned without clear connection.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Beginning with "However" and economic opportunities makes no sense—"however" requires something to contrast with, but there\'s nothing before it, and starting with economics before establishing environmental benefits is illogical.'
      },
      {
        letter: 'D',
        text: 'after Sentence 2.',
        explanation: 'This creates better flow but "However" is still wrong—the sentence should signal addition ("Additionally" or "Moreover") not contrast when moving from environmental to economic benefits, both of which are positive arguments for renewables.'
      }
    ],
    correct_answer: 'D',
    answer_explanation: 'While the transition word should be "Additionally" rather than "However," Sentence 3 works best after Sentence 2, allowing environmental benefits to be established before introducing economic benefits.'
  },
  {
    position: 14,
    title: 'Example Supporting General Claim',
    problem_text: '[1] Social media has transformed how news spreads globally. [2] <u>When the 2011 earthquake struck Japan, Twitter users shared real-time updates faster than traditional news outlets.</u> [3] Information now travels instantaneously across continents. [4] This speed has both benefits and drawbacks for public discourse.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Placing a specific example (2011 Japan earthquake) before the general principle it illustrates (instantaneous global spread) is backwards—readers need the general claim before the specific supporting example.'
      },
      {
        letter: 'B',
        text: 'after Sentence 3.',
        explanation: 'This creates proper general-to-specific flow: establishes transformation (S1) → states principle about speed (S3) → provides concrete example (S2 Japan earthquake) → discusses implications (S4). The example supports the speed claim.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Beginning with a specific 2011 earthquake example before establishing the topic (social media news transformation) is disorienting—readers need context before encountering detailed examples.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Placing the specific example after the conclusion about "benefits and drawbacks" is too late—the example should support the claims about speed before the evaluative conclusion.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 2 should be placed after Sentence 3 so the specific example (Japan earthquake) follows and supports the general claim about instantaneous information spread.'
  },
  {
    position: 15,
    title: 'Clarifying Detail Position',
    problem_text: '[1] The new telescope can detect exoplanets orbiting distant stars. [2] <u>Exoplanets are planets that exist outside our solar system.</u> [3] It uses the transit method, measuring slight dips in starlight when planets pass in front of their host stars. [4] This technique has identified thousands of potential Earth-like worlds.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Defining "exoplanets" after already using the term works, but placing the definition immediately after first mention (Sentence 1) would be clearer for readers encountering the technical term.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'This creates clearest flow: introduce exoplanets → immediately define the term → explain detection method → state results. Defining technical terms right after first use prevents reader confusion.'
      },
      {
        letter: 'C',
        text: 'after Sentence 3.',
        explanation: 'Defining "exoplanets" after explaining the detection method leaves readers confused about what\'s being detected while reading about the transit method—the definition comes too late.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Defining "exoplanets" at the very end, after discussing discoveries and methods, is far too late—readers need the definition when the term is first introduced, not as an afterthought.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 2 should be placed after Sentence 1 to define "exoplanets" immediately after the term is first introduced, preventing reader confusion.'
  },
  {
    position: 16,
    title: 'Connecting Related Ideas',
    problem_text: '[1] Jazz music originated in New Orleans in the early 1900s. [2] African rhythms blended with European harmonies to create this unique sound. [3] The genre quickly spread to Chicago and New York. [4] <u>Louis Armstrong emerged as one of jazz\'s most influential figures during this expansion.</u> [5] By the 1930s, jazz had become America\'s most popular music.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Mentioning Armstrong\'s emergence "during this expansion" after discussing the spread to Chicago/New York creates clear temporal connection—the placement logically connects his rise to the geographic expansion just described.'
      },
      {
        letter: 'B',
        text: 'before Sentence 1.',
        explanation: 'Introducing Armstrong before establishing what jazz is or where it originated is illogical—readers need context (jazz origins, definition) before encountering information about individual musicians.'
      },
      {
        letter: 'C',
        text: 'after Sentence 1.',
        explanation: 'Placing Armstrong right after the origin statement interrupts the explanation of jazz\'s musical characteristics (African/European blend) and geographic spread—his emergence fits better after the expansion is described.'
      },
      {
        letter: 'D',
        text: 'after Sentence 5.',
        explanation: 'Mentioning Armstrong after jazz became "America\'s most popular music" (1930s) is too late—his influential emergence happened during the earlier expansion to Chicago/New York, so chronologically it fits before the popularity peak.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 4 is correctly placed where it is, connecting Armstrong\'s emergence to the geographic expansion just described before moving to jazz\'s popularity peak.'
  },
  {
    position: 19,
    title: 'Problem-Solution Sequence',
    problem_text: '[1] Urban heat islands occur when cities become significantly warmer than surrounding rural areas. [2] <u>Planting trees and creating green roofs can reduce urban temperatures by up to 5 degrees Fahrenheit.</u> [3] Dark pavement and buildings absorb heat throughout the day. [4] This absorbed heat radiates back into the air at night, preventing cities from cooling down.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Presenting the solution (trees, green roofs) before fully explaining the problem (heat absorption and radiation) is premature—readers need to understand the complete problem mechanism before solutions make sense.'
      },
      {
        letter: 'B',
        text: 'after Sentence 4.',
        explanation: 'This creates proper problem-solution flow: define urban heat islands → explain cause (pavement/buildings absorb heat) → explain consequence (radiates at night) → present solution (trees/green roofs). The solution logically follows complete problem explanation.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Proposing solutions (trees, green roofs) before defining the problem (urban heat islands) is backwards—readers don\'t know what issue is being solved, making the solutions meaningless without context.'
      },
      {
        letter: 'D',
        text: 'after Sentence 3.',
        explanation: 'While this is better than the current placement, it still introduces solutions before the full problem is explained—the nighttime heat radiation (Sentence 4) is part of the problem that green solutions address.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 2 should be placed after Sentence 4 so the solution follows the complete explanation of the problem it addresses.'
  },
  {
    position: 20,
    title: 'Effective Paragraph Transitions',
    problem_text: '[Paragraph 1 ends:] ...These changes in ocean chemistry threaten marine ecosystems worldwide.\n\n[Paragraph 2:] [1] Coral reefs face particularly severe impacts from ocean acidification. [2] <u>Ocean acidification results from increased CO2 absorption by seawater.</u> [3] The lower pH makes it difficult for corals to build their calcium carbonate skeletons. [4] Without intervention, many reefs may disappear within decades.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Defining ocean acidification after stating corals face impacts from it is backwards—readers need to know what acidification is before understanding how it impacts corals specifically.'
      },
      {
        letter: 'B',
        text: 'before Sentence 1.',
        explanation: 'Placing the definition before Sentence 1 creates better flow: define acidification → explain coral impacts → describe mechanism (pH, calcium carbonate) → state consequences. The definition should come first as it transitions from the previous paragraph about "ocean chemistry."'
      },
      {
        letter: 'C',
        text: 'after Sentence 3.',
        explanation: 'Defining acidification after explaining its effects on coral skeletons is too late—readers need the definition upfront to understand both that corals are impacted and how the pH mechanism works.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Defining acidification at the paragraph\'s end, after discussing impacts and potential reef loss, makes the definition an afterthought—it should establish what acidification is before explaining consequences.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 2 should be placed before Sentence 1 to define ocean acidification before discussing its specific impacts on coral reefs.'
  },
  {
    position: 21,
    title: 'Comparison Structure Logic',
    problem_text: '[1] Traditional publishing requires authors to find literary agents and convince publishers to invest in their work. [2] The process can take years from manuscript completion to bookstore shelves. [3] <u>Self-publishing has revolutionized how authors bring books to market.</u> [4] Authors maintain creative control and keep larger royalty percentages. [5] Digital platforms allow books to reach readers within days of completion.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Introducing self-publishing (the alternative) in the middle of explaining traditional publishing\'s process disrupts the description—better to complete the traditional publishing explanation before contrasting it with self-publishing.'
      },
      {
        letter: 'B',
        text: 'after Sentence 2.',
        explanation: 'This creates effective comparison structure: fully explain traditional publishing (agents, publishers, years-long process) → introduce contrasting alternative (self-publishing revolution) → explain self-publishing benefits (control, royalties, speed). The contrast is clear when traditional is complete.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Starting with self-publishing before describing traditional publishing loses the comparison\'s impact—the "revolution" framing only makes sense when readers understand what\'s being revolutionized (traditional process).'
      },
      {
        letter: 'D',
        text: 'after Sentence 5.',
        explanation: 'Placing the topic sentence (self-publishing revolution) after all the supporting details (creative control, royalties, speed) is backwards—the general claim should introduce before specific benefits are listed.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 2 to introduce self-publishing after the traditional publishing process is fully explained, creating clear contrast.'
  },
  {
    position: 23,
    title: 'Establishing Context for Technical Details',
    problem_text: '[1] <u>The hippocampus processes spatial information and consolidates short-term memories into long-term storage.</u> [2] Memory formation involves complex brain structures working together. [3] The amygdala adds emotional significance to memories. [4] The prefrontal cortex organizes and retrieves stored information.\n\nFor the sake of logic and coherence, Sentence 1 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Beginning with specific hippocampus functions before establishing that multiple brain structures work together is backwards—readers need the general framework before specific structure details.'
      },
      {
        letter: 'B',
        text: 'after Sentence 2.',
        explanation: 'This creates proper general-to-specific flow: establish that memory involves multiple structures working together → then detail what each structure does (hippocampus for spatial/consolidation, amygdala for emotion, prefrontal for organization/retrieval).'
      },
      {
        letter: 'C',
        text: 'after Sentence 3.',
        explanation: 'Placing hippocampus information after the amygdala discussion disrupts the logical presentation of brain structures—better to introduce the general concept first, then systematically describe each structure\'s role.'
      },
      {
        letter: 'D',
        text: 'after Sentence 4.',
        explanation: 'Placing hippocampus details at the end, after discussing other structures, is arbitrary—the hippocampus information should follow the general statement about multiple structures, not come last as an afterthought.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 1 should be placed after Sentence 2 so the general statement about multiple brain structures precedes specific details about each structure\'s function.'
  },
  {
    position: 24,
    title: 'Logical Evidence Sequencing',
    problem_text: '[1] Regular exercise provides numerous cardiovascular benefits. [2] Studies show that moderate activity reduces heart disease risk by 30%. [3] <u>Exercise also lowers blood pressure and improves cholesterol levels.</u> [4] Even walking 30 minutes daily produces measurable improvements. [5] These benefits appear within weeks of starting a routine.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This placement works well—it adds additional cardiovascular benefits (blood pressure, cholesterol) after the primary benefit (heart disease reduction), before discussing the minimal exercise needed (walking) and timeline (weeks).'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'While placing it here would also work, the current position is slightly better because it allows the most dramatic benefit (30% disease risk reduction) to be stated first, then adds supporting benefits.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Placing additional benefits (blood pressure, cholesterol) after discussing minimal exercise requirements disrupts the logical flow from major benefits → supporting benefits → accessibility → timeline.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Beginning with specific benefits (blood pressure, cholesterol) before the general claim about "numerous cardiovascular benefits" is backwards—the general statement should introduce before specific benefits.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 3 is correctly placed where it is, adding supporting cardiovascular benefits after the primary heart disease reduction claim before discussing exercise requirements.'
  },
  {
    position: 29,
    title: 'Complex Causal Chain Organization',
    problem_text: '[1] Deforestation in the Amazon has global climate implications. [2] Trees absorb CO2 from the atmosphere during photosynthesis. [3] <u>When forests are cleared, this stored carbon is released back into the atmosphere.</u> [4] Additionally, fewer trees remain to absorb future emissions. [5] This double effect accelerates atmospheric CO2 accumulation.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This creates proper causal chain: trees absorb CO2 (mechanism) → clearing releases stored carbon (consequence 1) → fewer trees to absorb future emissions (consequence 2) → double effect accelerates accumulation (synthesis). The logical flow is clear.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Explaining that clearing releases stored carbon before establishing that trees absorb/store carbon (Sentence 2) is backwards—readers need to understand the storage mechanism before understanding its release.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Discussing carbon release after mentioning the reduction in absorption capacity disrupts the logical build: better to explain both consequences in order (release stored + lose future absorption) before synthesizing the "double effect."'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Beginning with forest clearing releasing carbon before establishing the context (Amazon deforestation, global climate) or mechanism (trees absorbing CO2) leaves readers without necessary framework for understanding the claim.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 3 is correctly placed where it is, explaining carbon release after establishing the absorption mechanism and before discussing reduced future absorption.'
  },

  // HARD: 33-36, 38-41, 43-44, 46-50 (11 questions)
  {
    position: 33,
    title: 'Multi-Layer Logical Structure',
    problem_text: '[1] The Industrial Revolution transformed manufacturing through mechanization. [2] Steam power enabled factories to operate independently of water sources. [3] <u>This geographic freedom led to rapid urban growth as factories concentrated near transportation hubs.</u> [4] New factory locations attracted workers from rural areas. [5] Textile production shifted from homes to centralized mills. [6] Within decades, factory systems had replaced traditional craft production.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This placement works but creates a slight disconnect—Sentence 3 discusses geographic consequences of steam power, but it comes before explaining what moved to new locations (Sentence 5 textile mills) and who moved there (Sentence 4 workers).'
      },
      {
        letter: 'B',
        text: 'after Sentence 5.',
        explanation: 'This creates strongest logical flow: mechanization intro → steam independence from water → textile production shifted to mills → this geographic freedom led to urban growth near transport hubs → workers migrated → craft production replaced. The urbanization claim follows the specific relocation example.'
      },
      {
        letter: 'C',
        text: 'before Sentence 2.',
        explanation: 'Mentioning "geographic freedom" before explaining what enabled it (steam power independence from water sources) reverses cause and effect—readers need to understand the freedom\'s source before its consequences.'
      },
      {
        letter: 'D',
        text: 'after Sentence 6.',
        explanation: 'Placing the urbanization explanation at the very end, after discussing the complete transformation to factory systems, makes it an afterthought when it\'s actually a major consequence that deserves earlier, integrated discussion.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 5 so the urbanization consequence follows the specific example of textile relocation, creating clearer causal progression.'
  },
  {
    position: 34,
    title: 'Sophisticated Comparison Organization',
    problem_text: '[1] Classical and operant conditioning both shape behavior through association, but they differ fundamentally in mechanism. [2] In classical conditioning, a neutral stimulus becomes associated with an automatic response. [3] Pavlov demonstrated this when dogs learned to salivate at the sound of a bell. [4] <u>In operant conditioning, behaviors are strengthened or weakened by their consequences.</u> [5] Skinner showed how rats learned to press levers when lever-pressing produced food rewards. [6] These distinct processes work together in complex learning.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Defining operant conditioning after classical conditioning\'s example (Pavlov\'s dogs) is acceptable, but the structure would be clearer if both definitions preceded both examples, creating parallel structure: classical definition → operant definition → classical example → operant example.'
      },
      {
        letter: 'B',
        text: 'after Sentence 2.',
        explanation: 'This creates the clearest comparison structure: introduce both types → define classical → define operant → illustrate classical (Pavlov) → illustrate operant (Skinner) → conclude with interaction. Parallel structure makes the contrast easier to follow.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Defining operant conditioning before introducing that there are two types being compared is illogical—the opening sentence establishes the comparison framework that definitions and examples then develop.'
      },
      {
        letter: 'D',
        text: 'after Sentence 5.',
        explanation: 'Defining operant conditioning after its example (Skinner\'s rats) reverses the logical order—definitions should precede examples that illustrate them, not follow them.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 4 should be placed after Sentence 2 to define both conditioning types before providing examples, creating parallel structure that clarifies the comparison.'
  },
  {
    position: 35,
    title: 'Advanced Narrative Arc Management',
    problem_text: '[1] Rachel Carson\'s Silent Spring emerged from a series of personal observations and scientific investigations. [2] In 1958, a friend wrote to Carson about songbirds dying after DDT spraying. [3] This letter prompted Carson to investigate pesticide effects on ecosystems. [4] <u>Carson had already established her reputation as a nature writer with The Sea Around Us, which gave her credibility to challenge the chemical industry.</u> [5] She spent four years researching chemical impacts on food chains. [6] When Silent Spring appeared in 1962, it revolutionized environmental thinking.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Mentioning Carson\'s prior reputation after discussing her investigation initiation is acceptable but slightly interrupts the chronological flow from 1958 letter → investigation → research → 1962 publication.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'This creates the strongest narrative arc: introduce that Silent Spring emerged from observations → establish Carson\'s pre-existing credentials → present the triggering event (1958 letter) → trace the investigation → research → publication. Her reputation provides context for why she could undertake this challenge.'
      },
      {
        letter: 'C',
        text: 'before Sentence 1.',
        explanation: 'Beginning with Carson\'s earlier reputation before introducing Silent Spring (the paragraph\'s focus) is backwards—the opening should establish what will be discussed before providing background credentials.'
      },
      {
        letter: 'D',
        text: 'after Sentence 6.',
        explanation: 'Mentioning Carson\'s prior credentials after discussing Silent Spring\'s revolution is too late—her reputation as a nature writer is relevant for understanding why she could take on the chemical industry, which should come earlier.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 4 should be placed after Sentence 1 to establish Carson\'s credentials before narrating the sequence of events that led to Silent Spring.'
  },
  {
    position: 36,
    title: 'Nuanced Definitional Sequencing',
    problem_text: '[1] CRISPR gene editing has transformed biotechnology by allowing precise DNA modifications. [2] The technique uses molecular "scissors" to cut DNA at specific locations. [3] <u>Scientists can then remove, add, or replace genetic sequences with unprecedented accuracy.</u> [4] The CRISPR system evolved naturally in bacteria as a defense against viruses. [5] Researchers adapted this bacterial immune mechanism for use in human and plant cells.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This creates logical flow: intro CRISPR\'s transformation → explain mechanism (cutting) → explain what cutting enables (remove/add/replace) → provide origin (bacterial defense) → explain adaptation. The capability follows the mechanism that enables it.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Explaining what can be done (remove/add/replace) before explaining how it\'s done (molecular scissors cutting) is slightly backwards—the mechanism should precede the capabilities it enables for clearest understanding.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Discussing capabilities (remove/add/replace sequences) after explaining bacterial origins disrupts the logical flow—better to complete the functional explanation (how it works and what it does) before providing evolutionary backstory.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Beginning with specific capabilities (removing/adding sequences) before introducing what CRISPR is or how it works provides details without context—the introduction should come first.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 3 is correctly placed where it is, explaining editing capabilities after the cutting mechanism and before the evolutionary origin story.'
  },
  {
    position: 38,
    title: 'Complex Argumentative Structure',
    problem_text: '[1] Critics argue that social media reduces attention spans and encourages superficial thinking. [2] <u>However, research suggests a more nuanced reality where different platforms serve different cognitive functions.</u> [3] Twitter\'s brevity may limit complex discussion. [4] Yet the same constraint can force clear, concise communication that eliminates unnecessary verbal padding. [5] Meanwhile, long-form platforms like Medium support in-depth analysis comparable to traditional essays. [6] The impact depends less on the medium itself than on how users choose to engage with it.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This creates strong argumentative structure: present criticism → counter with nuanced alternative → provide negative example (Twitter limits discussion) → acknowledge positive aspect (forces concision) → provide contrasting example (Medium depth) → conclude with synthesis. The rebuttal logically follows the criticism.'
      },
      {
        letter: 'B',
        text: 'after Sentence 3.',
        explanation: 'Presenting the nuanced counter-argument after a specific criticism (Twitter brevity) would weaken the structure—better to establish the general counter-framework first, then provide specific platform examples that illustrate the nuance.'
      },
      {
        letter: 'C',
        text: 'after Sentence 5.',
        explanation: 'Placing the counter-argument after all the specific examples (Twitter, Medium) makes it feel like an afterthought—the general rebuttal should frame the examples, not follow them.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Presenting the counter-argument before the criticism it counters is illogical—readers need to understand the claim being refuted ("reduces attention, encourages superficiality") before encountering the rebuttal.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 2 is correctly placed where it is, immediately countering the criticism before providing specific platform examples that illustrate the nuanced reality.'
  },
  {
    position: 39,
    title: 'Sophisticated Evidence Layering',
    problem_text: '[1] Archaeological evidence suggests that Neanderthals engaged in symbolic behavior previously attributed only to modern humans. [2] Cave paintings in Spain date to Neanderthal occupation periods. [3] Shell beads show signs of deliberate perforation and wear patterns indicating use as personal ornaments. [4] <u>Perhaps most significantly, intentional burial sites include grave goods like flowers and tools, suggesting belief in an afterlife.</u> [5] These findings challenge the assumption that symbolic thinking emerged uniquely in Homo sapiens.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This creates effective evidence progression: cave art → personal ornaments → intentional burial with grave goods. The sequence moves from aesthetic expression to personal decoration to complex ritual behavior, building to the most significant evidence ("perhaps most significantly") last.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Presenting the most significant evidence (burials suggesting afterlife belief) immediately after the general claim would frontload the strongest point but lose the building progression from simpler symbolic acts to complex ritual behavior.'
      },
      {
        letter: 'C',
        text: 'after Sentence 2.',
        explanation: 'Placing burial evidence between cave paintings and shell beads disrupts the logical progression from aesthetic expression → personal decoration → ritual behavior, which naturally builds in complexity and significance.'
      },
      {
        letter: 'D',
        text: 'after Sentence 5.',
        explanation: 'Presenting the strongest evidence after the conclusion that synthesizes all evidence is backwards—the conclusion should follow from and be supported by the evidence, not precede it.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 4 is correctly placed where it is, presenting the most significant evidence last to create building progression before the conclusion.'
  },
  {
    position: 40,
    title: 'Advanced Contextual Dependencies',
    problem_text: '[1] The Harlem Renaissance transformed African American cultural expression in the 1920s. [2] Writers like Langston Hughes and Zora Neale Hurston gained national recognition. [3] <u>This artistic flowering emerged partly from the Great Migration, when millions of Black Americans moved from the rural South to Northern cities seeking economic opportunities and escaping Jim Crow oppression.</u> [4] Jazz clubs became cultural centers where musicians like Duke Ellington pioneered new sounds. [5] The movement established Black artistic achievement as central to American culture.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Explaining the Great Migration context after mentioning specific writers is acceptable but slightly interrupts the flow of artistic achievements—the migration context would work better before listing specific cultural achievements it enabled.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'This creates superior logical flow: introduce the Renaissance transformation → explain the demographic/social context that enabled it (Great Migration) → list specific achievements in literature (Hughes, Hurston) → music (Ellington) → conclude with cultural impact. The context frames the achievements.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Explaining the contextual migration after discussing both literary and musical achievements makes the important context feel like an afterthought—it should frame the achievements, not follow them.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Beginning with the Great Migration before introducing the Harlem Renaissance itself is backwards—the opening should establish the main topic before providing the contextual background.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 1 to provide demographic and social context before listing the specific cultural achievements that context enabled.'
  },
  {
    position: 41,
    title: 'Ultimate Chronological Complexity',
    problem_text: '[1] The development of the polio vaccine required decades of research building on multiple scientific breakthroughs. [2] In the 1930s, scientists first successfully grew poliovirus in laboratory cultures. [3] This achievement enabled researchers to study the virus\'s behavior and test potential vaccines. [4] <u>By 1952, Jonas Salk had developed a killed-virus vaccine that proved safe and effective in trials.</u> [5] The 1940s saw advancement in cell culture techniques that made mass vaccine production feasible. [6] When Salk announced his success in 1955, it marked the culmination of two decades of intensive research.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Placing Salk\'s 1952 vaccine development before mentioning 1940s cell culture techniques violates chronological order and disrupts the logical progression of scientific breakthroughs that enabled vaccine development.'
      },
      {
        letter: 'B',
        text: 'after Sentence 5.',
        explanation: 'This creates proper chronological and causal flow: 1930s virus culturing → enabled research/testing → 1940s cell culture techniques → made mass production feasible → 1952 Salk vaccine → 1955 announcement. Each advance enables the next in logical sequence.'
      },
      {
        letter: 'C',
        text: 'before Sentence 2.',
        explanation: 'Placing Salk\'s 1952 success before describing the 1930s foundational work reverses chronology and causation—the vaccine development depended on earlier breakthroughs that should be presented first.'
      },
      {
        letter: 'D',
        text: 'after Sentence 6.',
        explanation: 'Mentioning Salk\'s 1952 vaccine development after the 1955 announcement is slightly backwards—better to present the development before the announcement that publicized it, maintaining chronological flow.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 4 should be placed after Sentence 5 to maintain chronological order: 1930s culturing → 1940s cell culture advances → 1952 Salk vaccine → 1955 announcement.'
  },
  {
    position: 43,
    title: 'Complex Process Integration',
    problem_text: '[1] Photosynthesis converts light energy into chemical energy through two interdependent stages. [2] In the light-dependent reactions, chlorophyll absorbs photons and splits water molecules. [3] This process generates ATP and NADPH, energy-carrying molecules needed for the next stage. [4] <u>The Calvin cycle uses these energy carriers to fix carbon dioxide into glucose.</u> [5] Oxygen is released as a byproduct when water molecules split. [6] The glucose produced stores energy that powers plant growth and, ultimately, most life on Earth.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Describing the Calvin cycle (stage 2) after explaining energy carrier production works well, but placing the oxygen byproduct detail (Sentence 5) after the Calvin cycle discussion slightly disrupts flow—oxygen is released during stage 1, not stage 2.'
      },
      {
        letter: 'B',
        text: 'after Sentence 5.',
        explanation: 'This creates clearer process flow: light reactions → water splitting produces ATP/NADPH → oxygen released (still in stage 1) → Calvin cycle uses the energy carriers for glucose production (stage 2) → glucose powers life. Each stage is complete before moving to the next.'
      },
      {
        letter: 'C',
        text: 'before Sentence 2.',
        explanation: 'Describing the Calvin cycle before explaining the light-dependent reactions reverses the process order—the Calvin cycle depends on products from light reactions, so light reactions must be explained first.'
      },
      {
        letter: 'D',
        text: 'after Sentence 6.',
        explanation: 'Explaining the Calvin cycle after discussing glucose\'s role in powering life is backwards—the cycle needs to be presented before its product (glucose) and that product\'s significance.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 4 should be placed after Sentence 5 to keep all light-reaction details together before moving to the Calvin cycle, creating clearer stage separation.'
  },
  {
    position: 44,
    title: 'Sophisticated Thematic Connections',
    problem_text: '[1] Virginia Woolf pioneered stream-of-consciousness narrative technique in early 20th-century literature. [2] Her novel Mrs. Dalloway follows a single day in the protagonist\'s life. [3] Rather than describing events chronologically, Woolf moves fluidly between present moments and past memories. [4] <u>This technique mirrors how human consciousness actually works—thoughts triggered by present experiences send the mind wandering through memories and associations.</u> [5] The narrative structure reflects the character\'s inner reality more authentically than traditional linear storytelling.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Explaining why the technique works (mirrors actual consciousness) after describing how it works (moves between present and past) creates strong logical flow—readers understand the method before learning its psychological basis and rationale.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Explaining why stream-of-consciousness mirrors human thought before providing a specific example (Mrs. Dalloway) or describing how it functions would be premature—the justification is more meaningful after readers see the technique in practice.'
      },
      {
        letter: 'C',
        text: 'after Sentence 5.',
        explanation: 'Placing the explanation of why the technique works after the conclusion about "authentic inner reality" makes it feel redundant—the psychological basis should support the conclusion, not follow it.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Explaining how consciousness works before introducing Woolf or stream-of-consciousness technique lacks context—readers need to know what technique is being discussed before understanding its psychological justification.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 4 is correctly placed where it is, explaining the psychological basis for the technique after describing how it functions but before the concluding evaluation.'
  },
  {
    position: 46,
    title: 'Advanced Multi-Strand Integration',
    problem_text: '[1] The 1929 stock market crash resulted from multiple converging factors rather than a single cause. [2] Widespread speculation had driven stock prices far above companies\' actual values. [3] <u>When nervous investors began selling, falling prices triggered panic that accelerated the decline.</u> [4] Many investors had bought stocks on margin, borrowing money to purchase shares. [5] As prices fell, lenders demanded repayment, forcing more selling that drove prices even lower. [6] This downward spiral devastated not just wealthy speculators but also banks and ordinary workers.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Describing the panic-driven selling before explaining margin buying (Sentence 4) works but creates slight confusion—the panic\'s severity is better understood after readers know about margin buying, which intensified the downward spiral.'
      },
      {
        letter: 'B',
        text: 'after Sentence 5.',
        explanation: 'This creates superior causal flow: overvaluation → margin buying explained → margin calls forced selling → this selling triggered panic → panic accelerated decline → spiral devastated economy. The margin mechanism is explained before describing the panic it intensified.'
      },
      {
        letter: 'C',
        text: 'before Sentence 2.',
        explanation: 'Describing panic selling before explaining overvaluation (the initial condition that made the market vulnerable) reverses the causal sequence—the conditions must be established before the triggering event.'
      },
      {
        letter: 'D',
        text: 'after Sentence 6.',
        explanation: 'Describing the panic selling after discussing the crash\'s ultimate economic devastation is backwards—the panic should be presented as part of the causal chain leading to devastation, not after it.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 3 should be placed after Sentence 5 so the panic-driven selling is described after the margin mechanism that intensified it, creating clearer causal progression.'
  },
  {
    position: 47,
    title: 'Ultimate Definitional Dependency',
    problem_text: '[1] Epigenetics has revolutionized understanding of how environmental factors influence gene expression without altering DNA sequences. [2] <u>These chemical modifications act like dimmer switches, increasing or decreasing gene activity in response to environmental signals like diet, stress, or toxin exposure.</u> [3] Methyl groups can attach to DNA and affect whether specific genes are active. [4] Unlike genetic mutations, epigenetic changes are potentially reversible and can sometimes be passed to offspring. [5] This mechanism explains how identical twins with the same DNA can develop different diseases.\n\nFor the sake of logic and coherence, Sentence 2 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Explaining how modifications work (dimmer switches responding to environment) before identifying what the modifications are (methyl groups) uses a helpful analogy but creates slight confusion—readers don\'t yet know what\'s acting as a dimmer switch.'
      },
      {
        letter: 'B',
        text: 'after Sentence 3.',
        explanation: 'This creates clearest explanatory flow: introduce epigenetics concept → identify specific mechanism (methyl groups attach) → explain how mechanism functions (dimmer switch analogy) → note reversibility → provide practical example (twins). The "what" precedes the "how."'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Explaining the dimmer switch mechanism after discussing reversibility and inheritance is too late—the functional explanation should come earlier to help readers understand both the basic mechanism and its reversible nature.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Using the dimmer switch analogy before introducing epigenetics itself lacks context—readers need to know the general concept (environmental factors affecting gene expression) before encountering the mechanism analogy.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'Sentence 2 should be placed after Sentence 3 so the functional analogy (dimmer switches) follows the identification of what performs that function (methyl groups).'
  },
  {
    position: 48,
    title: 'Sophisticated Parallel Structure Sequencing',
    problem_text: '[1] The treaty addressed both immediate humanitarian concerns and long-term political restructuring. [2] Relief provisions included food aid distribution, medical support for refugees, and temporary housing construction. [3] <u>Political reforms required establishing independent courts, holding free elections within two years, and guaranteeing minority rights.</u> [4] International monitors would verify compliance with both categories of obligations. [5] The humanitarian measures needed immediate implementation, while political changes would unfold gradually.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This placement creates effective parallel structure: intro both concerns → detail humanitarian provisions → detail political reforms → explain oversight → note different timelines. The two categories are developed systematically before discussing implementation.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Listing political reforms immediately after the introduction, before detailing humanitarian provisions, would work but breaks the pattern established by discussing humanitarian first (mentioned first in Sentence 1)—better to maintain the order introduced.'
      },
      {
        letter: 'C',
        text: 'after Sentence 4.',
        explanation: 'Describing political reforms after the monitoring mechanism disrupts the logical presentation—both types of obligations should be detailed before explaining how compliance will be verified.'
      },
      {
        letter: 'D',
        text: 'before Sentence 1.',
        explanation: 'Beginning with specific political reform requirements before introducing that the treaty addresses two distinct categories lacks necessary context—the framework should be established before details.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 3 is correctly placed where it is, detailing political reforms after humanitarian provisions to create parallel structure matching the order introduced in Sentence 1.'
  },
  {
    position: 49,
    title: 'Advanced Interpretive Sequencing',
    problem_text: '[1] Pablo Picasso\'s Guernica depicts the 1937 bombing of a Spanish town during the Civil War. [2] The massive canvas, rendered in stark black, white, and gray tones, presents fragmented human and animal figures in anguished poses. [3] A fallen warrior clutches a broken sword while a screaming woman holds her dead child. [4] <u>Picasso\'s cubist fragmentation mirrors the physical and psychological destruction of war—bodies and buildings shattered into angular pieces, traditional perspective abandoned to convey chaos.</u> [5] The painting became an enduring anti-war statement, transcending its specific historical moment.\n\nFor the sake of logic and coherence, Sentence 4 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'Providing interpretation (fragmentation mirrors destruction) after describing specific visual elements (warrior, screaming woman, child) creates strong analytical flow—readers see the concrete details before understanding their symbolic meaning and artistic purpose.'
      },
      {
        letter: 'B',
        text: 'after Sentence 1.',
        explanation: 'Explaining the fragmentation\'s symbolic meaning before describing what the painting actually shows is premature—readers need visual details (monochrome, figures, poses) before interpretive claims about how style conveys meaning.'
      },
      {
        letter: 'C',
        text: 'after Sentence 5.',
        explanation: 'Placing the interpretation of cubist fragmentation after the conclusion about the painting\'s enduring impact makes the key analytical insight feel like an afterthought—it should support the conclusion, not follow it.'
      },
      {
        letter: 'D',
        text: 'after Sentence 2.',
        explanation: 'While this would work, placing interpretation before specific visual examples (warrior, woman, child) is slightly less effective than letting those concrete details accumulate before explaining how the fragmentation conveys meaning.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 4 is correctly placed where it is, providing interpretation after specific visual details but before the concluding statement about enduring impact.'
  },
  {
    position: 50,
    title: 'Ultimate Placement Complexity: Maximum Integration',
    problem_text: '[1] The development of antibiotics transformed medicine, but overuse has created a crisis of drug-resistant bacteria. [2] When patients fail to complete antibiotic courses, some bacteria survive exposure and develop resistance. [3] <u>Agricultural use of antibiotics in livestock feed accelerates resistance by exposing bacterial populations to constant low-level doses—conditions ideal for selecting resistant strains.</u> [4] These resistant bacteria spread through multiple pathways. [5] Hospital environments create additional pressure favoring resistant strains. [6] Direct contact, contaminated food, and environmental reservoirs all contribute to transmission. [7] Addressing resistance requires simultaneous action in medical practice, agriculture, and public health policy.\n\nFor the sake of logic and coherence, Sentence 3 should be placed:',
    choices: [
      {
        letter: 'A',
        text: 'where it is now.',
        explanation: 'This placement works well, presenting agricultural use as the second cause of resistance (after incomplete treatment) before discussing spread mechanisms (Sentences 4, 6) and other contributing environments (hospitals), creating logical flow from causes to transmission to solutions.'
      },
      {
        letter: 'B',
        text: 'after Sentence 4.',
        explanation: 'Describing agricultural antibiotic use (a cause of resistance) after the general statement about spread "pathways" disrupts the logical structure—better to group all causes together (medical misuse, agricultural use, hospital environments) before discussing transmission mechanisms.'
      },
      {
        letter: 'C',
        text: 'after Sentence 5.',
        explanation: 'Placing agricultural use after hospital environments works but slightly weakens the flow—the current placement groups two major external causes (incomplete courses, agricultural use) before discussing spread and additional pressure, creating clearer thematic organization.'
      },
      {
        letter: 'D',
        text: 'after Sentence 7.',
        explanation: 'Describing agricultural antibiotic use after the conclusion about needing action in multiple spheres is backwards—the agricultural contribution should be presented as part of the problem analysis before the solution statement.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'Sentence 3 is correctly placed where it is, presenting agricultural antibiotic use as a major cause after medical misuse and before discussing transmission mechanisms and hospital pressures, creating logical problem-to-solution flow.'
  }
];

async function main() {
  console.log('Creating LOGICAL-PLACEMENT lesson questions...\n');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ LOGICAL-PLACEMENT Complete! Added ${added}/${questions.length} questions.`);
}

main();
