/**
 * Complete adding-deleting lesson with 30 questions
 * Positions: 5-7, 9-10, 13-16, 19-21, 23-24, 29, 33-36, 38-41, 43-44, 46-50
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const LESSON_ID = '784a146b-8809-4189-a1b4-4b2fdcaf8199'; // adding-deleting

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
    title: 'Basic Relevance: Supporting Main Idea',
    problem_text: 'Sarah began training for the marathon in January. She ran three miles every morning before work. <u>Her favorite running shoes were blue.</u> By March, she had increased her distance to ten miles.\n\nAt this point, the writer is considering adding the following sentence:\n\n"Her favorite running shoes were blue."\n\nShould the writer make this addition here?',
    choices: [
      {
        letter: 'A',
        text: 'Yes, because it provides specific details about Sarah\'s equipment.',
        explanation: 'While shoe color is a detail about equipment, it\'s irrelevant to the paragraph\'s focus on Sarah\'s training progression from three to ten miles—knowing the shoes are blue doesn\'t support the narrative about increasing distance.'
      },
      {
        letter: 'B',
        text: 'Yes, because readers need to visualize what Sarah wore.',
        explanation: 'Visualization of clothing/equipment is unnecessary for this paragraph focused on training progression—the color of shoes doesn\'t help readers understand her fitness development or marathon preparation.'
      },
      {
        letter: 'C',
        text: 'No, because the shoe color is irrelevant to Sarah\'s training progress.',
        explanation: 'The paragraph traces Sarah\'s progression (January to March, three miles to ten miles)—shoe color is a tangential detail that doesn\'t advance this narrative about increasing endurance and distance.'
      },
      {
        letter: 'D',
        text: 'No, because the sentence should appear earlier in the paragraph.',
        explanation: 'Placement isn\'t the issue—the sentence is irrelevant to training progression regardless of where it appears, so it shouldn\'t be included at all.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should not be added because shoe color doesn\'t support the paragraph\'s focus on Sarah\'s training progression over time.'
  },
  {
    position: 6,
    title: 'Simple Supporting Detail: Evidence for Claims',
    problem_text: 'The school library implemented a new reading program that has proven successful. <u>The library was built in 1995.</u> Student checkout rates have doubled, and reading test scores have improved by 15%.\n\nAt this point, the writer is considering deleting the underlined sentence. Should the sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides important historical context.',
        explanation: 'The building\'s construction date (1995) is historical background, but it doesn\'t explain why the new reading program is successful—the success is about the program, not the building\'s age.'
      },
      {
        letter: 'B',
        text: 'Kept, because readers need to know the library\'s age.',
        explanation: 'The library\'s age is irrelevant to evaluating the new reading program\'s success—the program\'s effectiveness (doubled checkouts, improved scores) has nothing to do with when the building was constructed.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the building date is irrelevant to the program\'s success.',
        explanation: 'The paragraph focuses on the new program\'s success (checkout rates, test scores)—when the library building was constructed doesn\'t support or explain the program\'s effectiveness, making it an irrelevant tangent.'
      },
      {
        letter: 'D',
        text: 'Deleted, because 1995 is factually incorrect.',
        explanation: 'The reasoning should focus on relevance, not accuracy—even if 1995 were correct, the building date still wouldn\'t support the paragraph\'s focus on program success.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because the library\'s construction date doesn\'t relate to the new reading program\'s effectiveness.'
  },
  {
    position: 7,
    title: 'Basic Detail Selection: Specificity vs. Irrelevance',
    problem_text: 'The museum\'s dinosaur exhibit attracts thousands of visitors each year. The collection includes a complete Tyrannosaurus rex skeleton discovered in Montana. <u>Montana became a state in 1889.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides context about Montana.',
        explanation: 'Montana\'s statehood date (1889) is completely unrelated to the dinosaur exhibit or skeleton discovery—the paragraph is about the museum exhibit, not state history, making this context irrelevant.'
      },
      {
        letter: 'B',
        text: 'Kept, because historical information strengthens the paragraph.',
        explanation: 'Not all historical information strengthens a paragraph—only relevant history does. Montana\'s statehood is political history irrelevant to paleontology or the museum exhibit being discussed.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the statehood date is irrelevant to the dinosaur exhibit.',
        explanation: 'The paragraph focuses on the museum\'s dinosaur exhibit and T. rex skeleton—when Montana achieved statehood has no connection to dinosaur fossils or the exhibit\'s appeal to visitors.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it contradicts earlier information.',
        explanation: 'The sentence doesn\'t contradict anything—it\'s simply irrelevant. The reason for deletion is lack of relevance to the museum exhibit, not logical contradiction.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because Montana\'s statehood date has no relevance to the museum\'s dinosaur exhibit or fossil discovery.'
  },
  {
    position: 9,
    title: 'Supporting Example: Illustrating Claims',
    problem_text: 'Community gardens provide multiple benefits to urban neighborhoods. <u>For instance, they give residents access to fresh vegetables while creating green spaces that improve air quality and provide opportunities for neighbors to connect.</u>\n\nAt this point, the writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides specific examples of the benefits mentioned.',
        explanation: 'The sentence directly supports "multiple benefits" by providing three concrete examples: fresh vegetables (nutritional), air quality improvement (environmental), and neighbor connections (social)—it illustrates the claim with specifics.'
      },
      {
        letter: 'B',
        text: 'Kept, because all paragraphs need examples.',
        explanation: 'While paragraphs often benefit from examples, the reasoning should focus on whether THIS example supports THIS specific paragraph—the better reason is that these examples directly illustrate the "multiple benefits" claim.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the benefits are already mentioned in the topic sentence.',
        explanation: 'The topic sentence mentions benefits exist but doesn\'t specify what they are—the underlined sentence provides the necessary specific examples (vegetables, air quality, community) that support the general claim.'
      },
      {
        letter: 'D',
        text: 'Deleted, because examples distract from the main idea.',
        explanation: 'Relevant examples strengthen rather than distract from main ideas—these specific benefits (vegetables, air, community) directly support and illustrate the claim about "multiple benefits."'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides specific examples that illustrate the "multiple benefits" claim in the topic sentence.'
  },
  {
    position: 10,
    title: 'Basic Focus Maintenance: Staying On Topic',
    problem_text: 'The documentary explores the impact of climate change on Arctic wildlife, particularly polar bears losing their hunting grounds as sea ice melts. <u>Antarctica, on the opposite pole, is also experiencing environmental changes.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it shows climate change is a global issue.',
        explanation: 'While climate change is global, this paragraph specifically focuses on Arctic wildlife and polar bears—introducing Antarctica shifts geographic focus and interrupts the detailed discussion of Arctic impacts.'
      },
      {
        letter: 'B',
        text: 'Kept, because comparing poles provides important context.',
        explanation: 'The paragraph isn\'t making a polar comparison—it\'s examining Arctic wildlife impacts specifically. Antarctica isn\'t being used for comparison; it\'s a topic shift that disrupts the Arctic focus.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it shifts focus away from Arctic wildlife to Antarctica.',
        explanation: 'The paragraph maintains focus on one specific topic: Arctic wildlife and polar bear habitat loss—introducing Antarctica as another affected region disrupts this focused discussion with an unrelated geographic area.'
      },
      {
        letter: 'D',
        text: 'Deleted, because Antarctica isn\'t experiencing climate change.',
        explanation: 'This reasoning is factually incorrect—Antarctica is experiencing climate change. The sentence should be deleted because it disrupts focus, not because the information is false.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because it shifts away from the paragraph\'s specific focus on Arctic wildlife to an unrelated geographic region.'
  },

  // MEDIUM: 13-16, 19-21, 23-24, 29 (10 questions)
  {
    position: 13,
    title: 'Evidence Evaluation: Assessing Support Quality',
    problem_text: 'Urban beekeeping has grown increasingly popular as city residents seek to support pollinator populations. <u>Bees play a crucial role in food production, pollinating approximately 75% of the world\'s flowering plants and 35% of global food crops.</u> Cities provide diverse flowering plants year-round, making them surprisingly hospitable for bee colonies.\n\nAt this point, the writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains why supporting pollinators matters to readers.',
        explanation: 'The sentence provides crucial context: it explains why urban beekeeping is significant by quantifying bees\' agricultural importance (75% of flowering plants, 35% of food crops), giving readers a concrete reason why supporting pollinators is valuable.'
      },
      {
        letter: 'B',
        text: 'Kept, because all science writing needs statistics.',
        explanation: 'Not all statistics are necessary—only relevant ones. The better reasoning is that these specific statistics explain why the beekeeping trend matters by showing bees\' importance to food production.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the paragraph is about urban beekeeping, not agriculture.',
        explanation: 'Urban beekeeping and agriculture are connected—the sentence explains WHY people do urban beekeeping (to support pollinators that are critical to food production), providing meaningful motivation for the trend.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it shifts focus from cities to global food production.',
        explanation: 'The sentence doesn\'t shift focus—it explains the underlying reason urban residents want to support pollinators, connecting the urban beekeeping trend to its larger ecological significance.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides important context explaining why urban beekeeping matters by quantifying bees\' role in food production.'
  },
  {
    position: 14,
    title: 'Transitional Information: Connecting Ideas',
    problem_text: 'Impressionist painters revolutionized art by depicting light and movement rather than precise detail. Claude Monet exemplified this approach in his series of paintings showing the same haystack at different times of day. <u>Monet was born in Paris in 1840 and showed artistic talent from a young age.</u> His technique of applying small brushstrokes of pure color created the impression of shimmering light.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because biographical information is always relevant.',
        explanation: 'Biographical details aren\'t automatically relevant—only when they connect to the topic. Monet\'s birthplace and childhood talent don\'t explain his revolutionary painting technique or approach to light and movement.'
      },
      {
        letter: 'B',
        text: 'Kept, because readers need background on Monet.',
        explanation: 'The paragraph focuses on Monet\'s impressionist technique, not his life story—birth year and early talent don\'t help readers understand his revolutionary approach to depicting light through brushstroke technique.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it interrupts the discussion of Monet\'s painting technique with biographical details.',
        explanation: 'The paragraph flows from impressionist principles → Monet\'s haystack example → his specific brushstroke technique. Inserting birthplace/childhood talent disrupts this logical progression about painting technique with irrelevant personal history.'
      },
      {
        letter: 'D',
        text: 'Deleted, because Monet wasn\'t actually born in Paris.',
        explanation: 'The issue is relevance, not factual accuracy—even if the biographical details were correct, they still wouldn\'t support the paragraph\'s focus on painting technique and impressionist methodology.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because biographical details interrupt the logical flow from impressionist principles to Monet\'s specific painting techniques.'
  },
  {
    position: 15,
    title: 'Contextual Necessity: Essential vs. Extraneous',
    problem_text: 'The research team developed a new water filtration system using graphene-based membranes. <u>Graphene, a single layer of carbon atoms arranged in a hexagonal lattice, is exceptionally strong yet allows water molecules to pass through while blocking contaminants.</u> This technology could provide clean drinking water in regions where traditional infrastructure is unavailable.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains the scientific basis for why the filtration system works.',
        explanation: 'The sentence explains the mechanism: graphene\'s structure (carbon lattice) gives it properties (strong but permeable) that enable filtration (water passes, contaminants blocked)—this helps readers understand why this technology works and why it\'s significant.'
      },
      {
        letter: 'B',
        text: 'Kept, because technical writing always needs definitions.',
        explanation: 'Not all technical terms need definition—only those essential to understanding. The better reasoning is that this specific explanation helps readers grasp how graphene enables the filtration breakthrough mentioned.'
      },
      {
        letter: 'C',
        text: 'Deleted, because graphene is too technical for general readers.',
        explanation: 'The sentence actually makes graphene accessible by explaining what it is and how it works—deleting it would leave readers confused about why this filtration system is novel or effective.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the paragraph is about water filtration, not chemistry.',
        explanation: 'Understanding the chemistry (graphene\'s structure) is necessary to understand why this water filtration approach works—the disciplines are connected in this context, not separate topics.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it explains the scientific mechanism that makes the new filtration technology effective and significant.'
  },
  {
    position: 16,
    title: 'Redundancy Assessment: Necessary vs. Repetitive',
    problem_text: 'The Grand Canyon reveals geological history spanning nearly two billion years through its exposed rock layers. <u>Each distinct stratum represents a different geological period, with deeper layers being progressively older.</u> Visitors can literally see time by observing how rock composition and color change from the canyon rim to the river below.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains how the rock layers relate to geological time.',
        explanation: 'While the first sentence mentions "geological history" through "exposed rock layers," it doesn\'t explain the relationship between layer position and age—the underlined sentence clarifies that deeper = older, helping readers understand how to "read" the canyon.'
      },
      {
        letter: 'B',
        text: 'Kept, because repetition helps readers remember.',
        explanation: 'This isn\'t repetition—it adds new information about the relationship between layer depth and age that wasn\'t stated before, clarifying how the visible layers represent temporal progression.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it repeats the information from the first sentence.',
        explanation: 'The first sentence states that layers show history but doesn\'t explain that layer position correlates with age—the underlined sentence adds the crucial spatial-temporal relationship (deeper = older) needed to understand the final sentence about "seeing time."'
      },
      {
        letter: 'D',
        text: 'Deleted, because the information is too obvious to state.',
        explanation: 'That deeper layers are older isn\'t necessarily obvious to general readers unfamiliar with geology—this key principle helps them understand how to interpret the visual evidence described in the paragraph.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it explains the crucial relationship between layer depth and age, helping readers understand how visible rock layers represent geological time.'
  },
  {
    position: 19,
    title: 'Purpose Alignment: Supporting Rhetorical Goals',
    problem_text: '[Essay arguing that high schools should require financial literacy courses]\n\nStudents graduate without basic knowledge of budgeting, credit, and investing. <u>Many high schools offer excellent sports programs and arts classes.</u> As a result, young adults often make costly financial mistakes that could have been avoided with proper education.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides context about current high school offerings.',
        explanation: 'While it mentions what schools currently offer, sports and arts programs are unrelated to the argument about financial literacy—this context doesn\'t support the claim that financial education is missing or needed.'
      },
      {
        letter: 'B',
        text: 'Kept, because it shows schools have resources for new programs.',
        explanation: 'The sentence doesn\'t establish that schools have available resources—it mentions existing programs, which if anything might suggest resources are already allocated elsewhere. It doesn\'t advance the financial literacy argument.'
      },
      {
        letter: 'C',
        text: 'Deleted, because sports and arts are irrelevant to the argument about financial literacy.',
        explanation: 'The argument flows: students lack financial knowledge → this leads to costly mistakes → therefore financial courses needed. Sports and arts programs are unrelated to this logical chain about financial education gaps and consequences.'
      },
      {
        letter: 'D',
        text: 'Deleted, because sports and arts programs are not actually excellent.',
        explanation: 'The quality assessment isn\'t the issue—even if sports and arts programs are excellent, their excellence doesn\'t relate to the argument about needing financial literacy courses, making the sentence irrelevant regardless of accuracy.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because sports and arts programs don\'t relate to the argument about the need for financial literacy education.'
  },
  {
    position: 20,
    title: 'Coherence Evaluation: Maintaining Logical Flow',
    problem_text: 'Coral reefs face multiple threats from climate change, including ocean acidification and rising water temperatures. <u>Many tourists visit coral reefs to observe colorful fish and marine life.</u> When water becomes too warm, corals expel the algae living in their tissues, causing bleaching that can lead to widespread reef death.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains why reefs are important.',
        explanation: 'While tourism demonstrates reefs have value, the sentence interrupts the logical explanation of climate threats: acidification/heat → bleaching mechanism → death. Tourism importance doesn\'t connect to this cause-effect chain about environmental threats.'
      },
      {
        letter: 'B',
        text: 'Kept, because readers need to know who visits reefs.',
        explanation: 'Who visits reefs (tourists) is irrelevant to understanding climate change threats and the bleaching process—the paragraph explains environmental mechanisms, not reef tourism or human visitors.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it disrupts the explanation of how climate change harms reefs.',
        explanation: 'The paragraph explains a specific threat mechanism: temperature rise → coral bleaching → death. Inserting tourism information between "threats" and "bleaching explanation" breaks this causal chain with unrelated information about human recreation.'
      },
      {
        letter: 'D',
        text: 'Deleted, because tourism actually harms rather than helps reefs.',
        explanation: 'Whether tourism helps or harms isn\'t the issue—the sentence disrupts logical flow regardless. It should be deleted because it interrupts the climate change threat explanation, not because tourism has negative impacts.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because tourism information interrupts the logical explanation of how climate change causes coral bleaching and reef death.'
  },
  {
    position: 21,
    title: 'Supporting Data: Quantifying Claims',
    problem_text: 'Solar panel efficiency has improved dramatically over the past decade, making renewable energy more economically competitive. <u>Modern panels convert approximately 22% of sunlight into electricity, compared to just 14% for panels manufactured ten years ago.</u>\n\nAt this point, the writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides specific data quantifying the improvement claim.',
        explanation: 'The topic sentence claims efficiency "improved dramatically"—the underlined sentence proves this with concrete numbers (14% to 22%), showing the magnitude of improvement and supporting "dramatically" with measurable evidence.'
      },
      {
        letter: 'B',
        text: 'Kept, because readers always need statistics.',
        explanation: 'Statistics aren\'t always necessary—they\'re valuable when they support claims. The better reasoning is that these specific numbers prove and quantify the "dramatic improvement" claim made in the topic sentence.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the efficiency improvement was already mentioned.',
        explanation: 'The topic sentence claims improvement occurred but doesn\'t prove how much—the statistics provide essential evidence showing the improvement was substantial (8 percentage points), supporting "dramatically" with data.'
      },
      {
        letter: 'D',
        text: 'Deleted, because 22% efficiency still seems low.',
        explanation: 'Personal assessment of whether 22% seems high or low is irrelevant—the sentence effectively demonstrates improvement by comparing past (14%) to present (22%), which is its purpose in supporting the topic sentence.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides specific numerical evidence that proves and quantifies the "dramatic improvement" claim.'
  },
  {
    position: 23,
    title: 'Tone Appropriateness: Matching Voice',
    problem_text: '[Formal academic paper about neuroscience]\n\nThe hippocampus plays a crucial role in memory consolidation. <u>It\'s totally awesome how this brain region can, like, take short-term memories and make them permanent!</u> Researchers have identified specific neural pathways involved in this process.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because enthusiasm engages readers.',
        explanation: 'While enthusiasm can engage readers, casual slang ("totally awesome," "like") is inappropriate for formal academic writing—the tone clash with surrounding formal language ("crucial role," "memory consolidation," "neural pathways") undermines credibility.'
      },
      {
        letter: 'B',
        text: 'Kept, because it explains what the hippocampus does.',
        explanation: 'Though it describes hippocampus function, the casual language ("totally awesome," "like") is completely inappropriate for an academic paper—the function could be explained in formal language that matches the paper\'s scholarly tone.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the casual tone clashes with the formal academic style.',
        explanation: 'The sentence uses colloquial slang ("totally awesome," "like") that completely contradicts the formal academic register of the surrounding text ("memory consolidation," "neural pathways"), creating an inappropriate and jarring tone shift.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the hippocampus isn\'t actually important.',
        explanation: 'The hippocampus IS important to memory—the problem isn\'t the content\'s accuracy but the inappropriate casual tone for academic writing. The sentence should be deleted for style reasons, not factual ones.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because its casual, colloquial tone is completely inappropriate for formal academic writing.'
  },
  {
    position: 24,
    title: 'Conclusion Effectiveness: Appropriate Endings',
    problem_text: 'The essay has discussed how ancient Roman aqueducts used gravity to transport water across vast distances, how their multi-arched design distributed weight efficiently, and how many still function today. <u>The Romans also built roads.</u>\n\nAt this point, the writer is considering adding the following sentence at the end of the essay:\n\n"The Romans also built roads."\n\nShould the writer make this addition?',
    choices: [
      {
        letter: 'A',
        text: 'Yes, because it provides additional information about Roman engineering.',
        explanation: 'While roads are another Roman engineering achievement, introducing a completely new topic (roads) at the essay\'s conclusion doesn\'t provide closure for the aqueduct discussion—it opens a new subject rather than concluding the established one.'
      },
      {
        letter: 'B',
        text: 'Yes, because conclusions should always introduce new ideas.',
        explanation: 'Conclusions should synthesize or reflect on discussed ideas, not introduce entirely new topics—bringing up roads when the entire essay focused on aqueducts creates confusion rather than closure.'
      },
      {
        letter: 'C',
        text: 'No, because it introduces an unrelated topic instead of concluding the aqueduct discussion.',
        explanation: 'The essay focused entirely on aqueducts (gravity transport, arch design, continued function)—introducing roads at the end is an abrupt topic shift that fails to provide closure on aqueducts, leaving readers without a sense of completion.'
      },
      {
        letter: 'D',
        text: 'No, because Roman roads weren\'t actually important.',
        explanation: 'Roman roads were important, but that\'s irrelevant—the sentence should be omitted because it shifts topics at the conclusion rather than providing closure for the aqueduct discussion, not because roads lacked significance.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should not be added because introducing a new topic (roads) at the conclusion fails to provide appropriate closure for the essay\'s aqueduct focus.'
  },
  {
    position: 29,
    title: 'Complex Relevance: Evaluating Multifaceted Details',
    problem_text: '[Paragraph about how smartphone apps help people track daily water intake]\n\nThese applications send reminders throughout the day and allow users to log each glass of water consumed. <u>The human body is approximately 60% water, and proper hydration is essential for cellular function, temperature regulation, and nutrient transport.</u> Users report that the visual feedback from tracking helps them develop better hydration habits.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains why hydration tracking matters.',
        explanation: 'The sentence provides crucial context: it explains why the apps being discussed are valuable by detailing why hydration matters (cellular function, temperature regulation, nutrient transport)—this gives readers motivation to understand why tracking water intake is worthwhile.'
      },
      {
        letter: 'B',
        text: 'Kept, because scientific facts always strengthen paragraphs.',
        explanation: 'Not all scientific facts strengthen paragraphs—only relevant ones. The better reasoning is that these specific facts about hydration\'s importance provide context that helps readers understand why the tracking apps serve a valuable purpose.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the paragraph is about apps, not human biology.',
        explanation: 'The biology information isn\'t a topic shift—it provides essential context for why the apps matter by explaining what hydration does for the body, helping readers understand the apps\' health value beyond just tracking numbers.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it interrupts the discussion of app features.',
        explanation: 'Rather than interrupting, the sentence bridges app features (reminders, logging) to outcomes (better habits) by explaining the underlying health importance—it connects the technology to its purpose.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it explains why hydration tracking is important, providing essential context for understanding the apps\' value.'
  },

  // HARD: 33-36, 38-41, 43-44, 46-50 (11 questions)
  {
    position: 33,
    title: 'Sophisticated Argument Support: Strengthening Claims',
    problem_text: '[Essay arguing for increased arts funding in schools]\n\nCritics claim that arts programs are less important than STEM subjects in preparing students for careers. <u>However, studies show that students who participate in music and visual arts programs demonstrate enhanced spatial reasoning, improved executive function, and stronger collaborative skills—all competencies highly valued in technical fields including engineering and computer science.</u>\n\nAt this point, the writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it acknowledges the opposing viewpoint.',
        explanation: 'The previous sentence already acknowledges the opposing view—the underlined sentence goes further by refuting it with evidence showing arts programs develop skills (spatial reasoning, executive function, collaboration) valuable for STEM careers, directly countering the criticism.'
      },
      {
        letter: 'B',
        text: 'Kept, because it refutes the critics\' claim by showing arts education develops skills valuable in STEM fields.',
        explanation: 'This effectively counters the argument that arts are "less important than STEM" by demonstrating that arts programs actually develop cognitive and social skills (spatial reasoning, executive function, collaboration) that benefit STEM careers, turning the criticism on its head.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it distracts from the main argument about arts funding.',
        explanation: 'The sentence doesn\'t distract—it directly supports arts funding by refuting a major counterargument (arts vs. STEM), showing that arts and STEM are complementary rather than competing priorities.'
      },
      {
        letter: 'D',
        text: 'Deleted, because STEM subjects are actually more important than arts.',
        explanation: 'This reasoning accepts the critics\' premise that the essay is arguing against—the whole point is to show arts programs provide valuable skills, making them worthy of funding alongside (not instead of) STEM.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'The sentence should be kept because it strengthens the argument by refuting the counterargument with evidence that arts education develops skills valuable for STEM careers.'
  },
  {
    position: 34,
    title: 'Nuanced Deletion: Assessing Subtle Relevance',
    problem_text: 'Marie Curie\'s groundbreaking research on radioactivity transformed physics and chemistry. <u>She conducted her early experiments in a converted shed with minimal equipment and poor ventilation.</u> Her discovery of polonium and radium earned her two Nobel Prizes—one in Physics and one in Chemistry—making her the first person to receive the prestigious award in two different sciences.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it emphasizes how remarkable Curie\'s achievements were given the difficult working conditions.',
        explanation: 'The primitive conditions (converted shed, minimal equipment, poor ventilation) contrast dramatically with the achievements (discovering elements, winning two Nobel Prizes), underscoring how extraordinary her accomplishments were despite severe resource limitations.'
      },
      {
        letter: 'B',
        text: 'Kept, because all biographical paragraphs need workplace descriptions.',
        explanation: 'Not all workplace descriptions are necessary—this one is valuable specifically because the harsh conditions contrast with extraordinary achievements, not because biographical paragraphs generically need workplace details.'
      },
      {
        letter: 'C',
        text: 'Deleted, because working conditions are irrelevant to scientific achievements.',
        explanation: 'The working conditions are relevant—they highlight that Curie achieved groundbreaking discoveries despite resource limitations, making her accomplishments more impressive and demonstrating scientific determination alongside brilliance.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it shifts focus from discoveries to laboratory facilities.',
        explanation: 'The sentence doesn\'t shift focus—it enhances appreciation of the discoveries by revealing they were made despite inadequate facilities, adding depth to the achievement narrative rather than changing the subject.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because the difficult working conditions emphasize how remarkable Curie\'s achievements were, adding meaningful context to her Nobel Prizes.'
  },
  {
    position: 35,
    title: 'Advanced Purpose Assessment: Multiple Functions',
    problem_text: 'Native American agricultural practices, developed over millennia, offer insights relevant to modern sustainable farming. <u>The "Three Sisters" method—intercropping corn, beans, and squash—demonstrates sophisticated understanding of symbiotic relationships: corn provides structure for beans to climb, beans fix nitrogen in the soil benefiting all three plants, and squash leaves shade the ground to retain moisture and suppress weeds.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides a concrete example with specific mechanisms explaining why the practice is sustainable.',
        explanation: 'The sentence does three things: provides specific example (Three Sisters), explains symbiotic mechanisms (structure, nitrogen fixing, moisture retention, weed suppression), and demonstrates the "sophisticated understanding" and "sustainability" mentioned in the topic sentence—it\'s multifunctional support.'
      },
      {
        letter: 'B',
        text: 'Kept, because examples always improve paragraphs.',
        explanation: 'While examples often help, the reasoning should be more specific—this particular example is valuable because it illustrates both the sophistication and sustainability claims with concrete mechanisms, not just because examples are generally good.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it provides too much detail about one farming method.',
        explanation: 'The detailed explanation of mechanisms (how each plant helps the others) is exactly what demonstrates the "sophisticated understanding" claimed in the topic sentence—the detail level is necessary to prove the sophistication, not excessive.'
      },
      {
        letter: 'D',
        text: 'Deleted, because modern farmers don\'t use this method.',
        explanation: 'Whether modern farmers currently use the method is irrelevant—the topic sentence says these practices "offer insights relevant to modern sustainable farming," meaning they can inform current approaches, not that they\'re currently widespread.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides a specific example with detailed mechanisms that demonstrate both the sophistication and sustainability mentioned in the topic sentence.'
  },
  {
    position: 36,
    title: 'Strategic Addition: Enhancing Transitions',
    problem_text: '[Previous paragraph discusses benefits of regular exercise for physical health]\n\n<u>[NEW SENTENCE]</u> Studies indicate that physical activity stimulates production of neurotransmitters like serotonin and dopamine, which regulate mood and reduce anxiety.\n\nThe writer is considering adding the following sentence at the beginning of this new paragraph:\n\n"Exercise also provides significant mental health benefits."\n\nShould the writer make this addition here?',
    choices: [
      {
        letter: 'A',
        text: 'Yes, because it creates a transition from physical health to mental health benefits.',
        explanation: 'The word "also" signals addition while "mental health benefits" clearly distinguishes this paragraph\'s focus from the previous paragraph\'s physical health focus—this creates a smooth bridge between related but distinct topics.'
      },
      {
        letter: 'B',
        text: 'Yes, because all paragraphs need topic sentences.',
        explanation: 'While paragraphs benefit from topic sentences, the specific value here is that "also" creates an effective transition from the previous paragraph\'s physical benefits, not just that paragraphs generically need topic sentences.'
      },
      {
        letter: 'C',
        text: 'No, because mental health benefits were already mentioned.',
        explanation: 'The previous paragraph focused on physical health—mental health benefits weren\'t discussed yet, making this sentence an appropriate introduction to new content rather than redundant repetition.'
      },
      {
        letter: 'D',
        text: 'No, because the neurotransmitter explanation is sufficient.',
        explanation: 'The neurotransmitter explanation is technical detail about mechanisms—without the topic sentence, readers would abruptly encounter biochemistry without knowing they\'ve shifted from physical to mental health benefits, losing contextual understanding.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be added because it creates an effective transition from physical to mental health benefits while introducing the new paragraph\'s focus.'
  },
  {
    position: 38,
    title: 'Complex Evidence Evaluation: Assessing Multiple Data Points',
    problem_text: '[Argument that reducing classroom size improves educational outcomes]\n\nSchools that reduced class sizes from 30 to 20 students showed measurable improvements. <u>In a Tennessee study spanning four years, students in smaller classes scored 5 percentile points higher on standardized tests than their peers in larger classes; these gains persisted through high school, and students from smaller classes were 10% more likely to graduate on time.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides specific data from a rigorous study showing both immediate and long-term benefits.',
        explanation: 'The sentence offers multiple layers of evidence: identifies a specific credible study (Tennessee, four years), quantifies immediate impact (5 percentile points), demonstrates persistence (gains continued through high school), and shows practical outcome (10% better graduation rate)—comprehensive support for the claim.'
      },
      {
        letter: 'B',
        text: 'Kept, because arguments always need statistics.',
        explanation: 'Not all statistics are necessary—these specific ones are valuable because they provide multiple measures (test scores, persistence, graduation) from a rigorous multi-year study, comprehensively supporting the claim about improved outcomes.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it provides too much detail about one study.',
        explanation: 'The multiple data points (test scores, longitudinal persistence, graduation rates) aren\'t excessive—they collectively demonstrate that benefits are both measurable and sustained, providing strong evidence that class size reduction produces meaningful, lasting improvement.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the improvements were already mentioned in the previous sentence.',
        explanation: 'The previous sentence claims improvements exist but provides no evidence—this sentence proves the claim with specific data showing how much improvement (5 points, 10% graduation boost) and that it lasts, which is essential support, not redundancy.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides comprehensive, specific evidence from a rigorous study showing both immediate and long-term benefits of reduced class sizes.'
  },
  {
    position: 39,
    title: 'Authorial Intrusion: Maintaining Objective Tone',
    problem_text: 'Tidal energy harnesses the predictable movement of ocean tides to generate electricity. <u>In my opinion, I personally think this is one of the most promising renewable energy sources we have available to us today.</u> Several pilot projects in Europe have demonstrated the technology\'s viability.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because the author\'s opinion adds personal perspective.',
        explanation: 'Personal opinion ("in my opinion, I personally think") undermines the objective, evidence-based tone established by factual statements about tidal energy and pilot projects—it shifts from information to subjective judgment.'
      },
      {
        letter: 'B',
        text: 'Kept, because enthusiasm engages readers.',
        explanation: 'While enthusiasm can be positive, the redundant first-person language ("in my opinion, I personally") is unnecessarily subjective—any enthusiasm should be conveyed through evidence and tone rather than explicit personal declarations.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the redundant first-person phrasing undermines the passage\'s objective tone.',
        explanation: 'The phrase "in my opinion, I personally think" is both redundant (saying the same thing twice) and unnecessarily subjective for factual writing about energy technology—it shifts from objective information to personal belief, weakening credibility.'
      },
      {
        letter: 'D',
        text: 'Deleted, because tidal energy isn\'t actually promising.',
        explanation: 'Whether tidal energy is promising isn\'t the issue—the sentence should be deleted because the subjective, redundant phrasing is inappropriate for objective informational writing, not because the assessment is incorrect.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because the redundant first-person language introduces inappropriate subjectivity into otherwise objective informational writing.'
  },
  {
    position: 40,
    title: 'Sophisticated Relevance: Contextual Dependencies',
    problem_text: '[Essay about how specific bird species adapt to urban environments]\n\nCrows have shown remarkable problem-solving abilities in cities, learning to drop nuts on crosswalks so cars will crack them open, then waiting for red lights to safely retrieve their food. <u>This behavior demonstrates cognitive flexibility—the ability to develop novel solutions to environmental challenges rather than relying solely on instinctive behaviors.</u> Urban environments may actually be accelerating cognitive evolution in some species.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it interprets the significance of the crow behavior, connecting it to the broader theme of adaptation.',
        explanation: 'The sentence transforms a specific observation (crows using cars and traffic lights) into broader significance: it defines what the behavior demonstrates (cognitive flexibility), explains why it matters (novel solutions vs. instinct), and bridges to the concluding claim about evolution—essential analytical connection.'
      },
      {
        letter: 'B',
        text: 'Kept, because all paragraphs need definitions of technical terms.',
        explanation: 'While defining technical terms can help, the sentence does more than just define—it explains why the crow behavior is significant as an example of adaptation, connecting the specific anecdote to the essay\'s broader theme.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the cognitive flexibility definition is too technical.',
        explanation: 'The sentence actually makes the behavior\'s significance accessible by explaining that cognitive flexibility means "novel solutions rather than instinct"—this clarifies why the crow example matters for understanding urban adaptation.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the crow example already demonstrates adaptation.',
        explanation: 'The example shows a behavior but doesn\'t interpret its significance—the sentence explains what type of adaptation it represents (cognitive flexibility) and why it matters (novel problem-solving), connecting the specific to the general theme.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it interprets the crow behavior\'s significance and connects the specific example to the broader theme of cognitive adaptation.'
  },
  {
    position: 41,
    title: 'Ultimate Addition Assessment: Multiple Rhetorical Functions',
    problem_text: '[Conclusion paragraph of essay about sustainable architecture]\n\nGreen building practices demonstrate that environmental responsibility and aesthetic achievement need not conflict. <u>From Beijing\'s zero-carbon office towers to Amsterdam\'s floating neighborhoods designed to adapt to rising sea levels, architects worldwide are proving that sustainable design can be both beautiful and functional, creating spaces that enhance rather than degrade their environments.</u>\n\nAt this point, the writer is considering deleting the underlined sentence. Should it be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides concrete examples that illustrate the claim while offering global scope and reinforcing the conclusion\'s main point.',
        explanation: 'The sentence performs multiple functions: provides specific examples (Beijing towers, Amsterdam neighborhoods), demonstrates global scope (China, Netherlands), shows variety (zero-carbon, climate-adaptive), and reinforces the main claim (sustainable can be beautiful/functional)—comprehensive conclusion support.'
      },
      {
        letter: 'B',
        text: 'Kept, because conclusions always need examples.',
        explanation: 'Not all conclusions need examples—these specific ones are valuable because they simultaneously demonstrate global reach, technological variety, and the unity of sustainability with aesthetics/function, not just because conclusions generically benefit from examples.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it introduces new information in the conclusion.',
        explanation: 'Introducing specific examples in conclusions is appropriate when they synthesize and illustrate the essay\'s themes—these buildings demonstrate the global scope and practical reality of claims made throughout the essay, providing powerful closure rather than inappropriate new content.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it mentions only two buildings.',
        explanation: 'Two well-chosen examples from different continents with different approaches (zero-carbon vs. climate-adaptive) effectively demonstrate global scope and technical variety—the number is less important than how the examples illustrate key themes comprehensively.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides diverse, global examples that illustrate and reinforce the conclusion\'s central claim about sustainable design.'
  },
  {
    position: 43,
    title: 'Advanced Counterargument Management',
    problem_text: '[Essay arguing that libraries remain essential in the digital age]\n\nSkeptics argue that internet access makes physical libraries obsolete. <u>Yet libraries have evolved beyond book repositories to become community hubs offering digital literacy training, career counseling, maker spaces with 3D printers, and free meeting rooms—services that no website can replicate.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it acknowledges the opposing viewpoint.',
        explanation: 'The previous sentence already acknowledges opposition—this sentence refutes it by listing specific modern library services (literacy training, career counseling, maker spaces, meeting rooms) that demonstrate libraries offer irreplaceable physical/social value beyond information access.'
      },
      {
        letter: 'B',
        text: 'Kept, because it refutes the obsolescence argument by showing libraries provide unique physical and social services.',
        explanation: 'This effectively counters the "internet makes libraries obsolete" claim by showing libraries have evolved to provide physical resources and in-person services (training, counseling, maker spaces) that cannot be delivered online, demonstrating continued essential function.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it distracts from the main argument about library importance.',
        explanation: 'The sentence doesn\'t distract—it directly supports library importance by refuting a major threat to the argument (obsolescence claim), showing that libraries provide vital services beyond book lending or information access.'
      },
      {
        letter: 'D',
        text: 'Deleted, because libraries are actually becoming obsolete.',
        explanation: 'This reasoning contradicts the essay\'s thesis—the whole argument is that libraries remain essential, and this sentence supports that by showing they\'ve evolved to meet modern needs, making them more relevant than the skeptics claim.'
      }
    ],
    correct_answer: 'B',
    answer_explanation: 'The sentence should be kept because it effectively refutes the obsolescence argument by demonstrating libraries provide unique services that online resources cannot replace.'
  },
  {
    position: 44,
    title: 'Subtle Purpose Analysis: Implicit Functions',
    problem_text: 'Jane Goodall revolutionized primatology through her unconventional research methods. <u>Unlike researchers who maintained clinical distance from their subjects, Goodall named the chimpanzees she studied and described their individual personalities, an approach initially criticized by the scientific establishment as anthropomorphism.</u> Her patient observations revealed complex social behaviors, tool use, and emotional depth previously unrecognized in non-human species.\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it explains what made Goodall\'s methods "unconventional" and provides context for her revolutionary impact.',
        explanation: 'The sentence does two important things: defines what was unconventional (naming, describing personalities vs. clinical distance) and shows she overcame resistance (criticism for anthropomorphism), which makes her ultimate success ("revealed complex social behaviors") more impressive and explains the "revolutionary" label.'
      },
      {
        letter: 'B',
        text: 'Kept, because biographical paragraphs need to mention criticism.',
        explanation: 'Not all criticism needs mentioning—this specific criticism (anthropomorphism) is valuable because it shows Goodall\'s methods were initially rejected by the establishment she ultimately revolutionized, adding dramatic tension to her achievement story.'
      },
      {
        letter: 'C',
        text: 'Deleted, because the criticism distracts from Goodall\'s discoveries.',
        explanation: 'The criticism doesn\'t distract—it enhances appreciation of her discoveries by showing she challenged scientific orthodoxy. The fact that initially-criticized methods led to major discoveries makes her contribution more significant, not less focused.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it makes the scientific establishment look bad.',
        explanation: 'How the establishment looks isn\'t the purpose—the sentence establishes that Goodall\'s approach was genuinely revolutionary by showing it contradicted prevailing methodology, which provides context for understanding her impact on the field.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it explains what made Goodall\'s methods unconventional and provides context showing she overcame establishment resistance, enhancing the "revolutionary" claim.'
  },
  {
    position: 46,
    title: 'Complex Contextual Addition: Balancing Detail Levels',
    problem_text: 'The James Webb Space Telescope has provided unprecedented views of the early universe. <u>[PROPOSED ADDITION]</u> These observations are helping astronomers understand how galaxies formed in the first billion years after the Big Bang.\n\nThe writer is considering adding the following sentence:\n\n"Operating at infrared wavelengths, the telescope can detect light from objects so distant that their visible light has been redshifted beyond the visible spectrum—a consequence of cosmic expansion that makes observing early universe objects impossible with traditional optical telescopes."\n\nShould the writer make this addition here?',
    choices: [
      {
        letter: 'A',
        text: 'Yes, because it explains the technical mechanism that makes the telescope\'s unprecedented views possible.',
        explanation: 'The sentence explains why Webb provides "unprecedented views": it operates at infrared (how), which can detect redshifted light (why that matters), which traditional optical telescopes cannot see (why it\'s unprecedented)—this technical explanation supports the significance claim without being overly complex.'
      },
      {
        letter: 'B',
        text: 'Yes, because all scientific writing needs technical explanations.',
        explanation: 'Not all technical details are necessary—this specific explanation is valuable because it answers the implicit question "why is Webb unprecedented?" by explaining the infrared/redshift mechanism that enables unique early universe observations.'
      },
      {
        letter: 'C',
        text: 'No, because the technical explanation is too complex for general readers.',
        explanation: 'The sentence actually makes the technology accessible: it explains infrared wavelengths are needed because cosmic expansion redshifts light beyond visibility—this demystifies the "unprecedented" claim rather than overwhelming readers with jargon.'
      },
      {
        letter: 'D',
        text: 'No, because the observations are already mentioned in the next sentence.',
        explanation: 'The next sentence mentions what the observations reveal (galaxy formation) but doesn\'t explain why Webb can make these observations when other telescopes cannot—the proposed sentence fills that explanatory gap about capability.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be added because it explains the technical mechanism behind Webb\'s unprecedented capability in accessible terms that support the significance claim.'
  },
  {
    position: 47,
    title: 'Ultimate Evidence Sophistication: Layered Support',
    problem_text: '[Argument that exposure to nature reduces stress]\n\n<u>In a controlled study, participants who walked for 30 minutes in a forest showed 16% lower cortisol levels than those who walked in an urban environment; additionally, the forest walkers exhibited decreased activity in the prefrontal cortex—a brain region associated with rumination and anxiety—and reported subjective improvements in mood that correlated with the physiological measurements.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides multiple converging lines of evidence—hormonal, neurological, and subjective—from a controlled study.',
        explanation: 'The sentence offers exceptional support by providing three types of evidence that reinforce each other: physiological (cortisol), neurological (prefrontal cortex activity), and subjective (mood reports), with the additional strength that subjective and objective measures correlated—this multi-layered evidence is far more convincing than any single measure.'
      },
      {
        letter: 'B',
        text: 'Kept, because research paragraphs always need study citations.',
        explanation: 'Not all studies need this much detail—this particular study is valuable because it provides multiple independent measures that corroborate each other (hormone levels, brain activity, self-reports all agree), making the evidence exceptionally strong.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it provides too much scientific detail.',
        explanation: 'The multiple types of evidence aren\'t excessive—they show stress reduction from different angles (chemistry, neurology, psychology) that support each other, with each measure addressing potential limitations of the others, creating comprehensive proof rather than overwhelming detail.'
      },
      {
        letter: 'D',
        text: 'Deleted, because the study only examined walking, not all nature exposure.',
        explanation: 'Walking in nature is a common, representative form of nature exposure—the specific protocol doesn\'t undermine the broader principle, and the multiple converging measures make this study particularly strong evidence for the general stress-reduction claim.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it provides multiple independent, corroborating measures from a controlled study, offering exceptionally strong evidence for the stress-reduction claim.'
  },
  {
    position: 48,
    title: 'Strategic Opening Assessment: Establishing Context',
    problem_text: '[Beginning of an essay about biomimicry in engineering]\n\nThe writer is considering beginning the essay with the following sentence:\n\n"Velcro, bullet trains, and self-cleaning paint share an unexpected common origin: all were designed by studying nature."\n\nShould the writer include this sentence as the essay\'s opening?',
    choices: [
      {
        letter: 'A',
        text: 'Yes, because it engages readers by presenting surprising familiar examples before introducing the technical concept.',
        explanation: 'The sentence hooks readers by naming recognizable technologies (Velcro, bullet trains, paint), creates intrigue with "unexpected common origin," then reveals they came from nature—this progression from familiar to surprising to explanatory is an effective opening strategy that makes biomimicry concrete before defining it.'
      },
      {
        letter: 'B',
        text: 'Yes, because essays should always begin with examples.',
        explanation: 'Not all essays should begin with examples—this particular opening is effective because these specific familiar examples create intrigue about their shared origin, which makes readers curious about biomimicry before encountering the technical concept.'
      },
      {
        letter: 'C',
        text: 'No, because it should begin with a definition of biomimicry.',
        explanation: 'Beginning with a technical definition would be less engaging—starting with familiar examples that illustrate biomimicry before formally defining it draws readers in with concrete, relatable cases rather than abstract terminology.'
      },
      {
        letter: 'D',
        text: 'No, because the examples are not actually related to nature.',
        explanation: 'This is factually incorrect—Velcro was inspired by burrs, bullet trains by kingfisher beaks, and self-cleaning paint by lotus leaves. The examples are accurately related to nature, making the opening both engaging and truthful.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be included because it effectively engages readers by presenting familiar examples with a surprising connection, creating interest before introducing technical concepts.'
  },
  {
    position: 49,
    title: 'Advanced Scope Management: Appropriate Boundaries',
    problem_text: '[Essay focused specifically on how Shakespeare\'s Globe Theatre influenced his dramatic writing]\n\nThe Globe\'s open-air design and thrust stage, which extended into the audience, shaped Shakespeare\'s theatrical techniques. <u>Shakespeare wrote 37 plays during his career and also composed 154 sonnets, establishing himself as England\'s greatest poet alongside his dramatic work.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it provides important context about Shakespeare\'s complete body of work.',
        explanation: 'While this information about Shakespeare\'s output is factually important, the essay focuses specifically on how the Globe Theatre influenced his dramatic technique—total play count and sonnets don\'t relate to the Globe\'s architectural influence on his writing.'
      },
      {
        letter: 'B',
        text: 'Kept, because readers need background on Shakespeare.',
        explanation: 'The essay isn\'t a general Shakespeare introduction—it has a specific thesis about the Globe\'s influence on dramatic technique. General biographical information (play count, sonnets) doesn\'t support analysis of how theater architecture shaped specific writing choices.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it broadens the scope beyond the essay\'s specific focus on the Globe Theatre\'s influence on dramatic writing.',
        explanation: 'The sentence shifts from how architecture shaped technique to Shakespeare\'s general output and poetic reputation—this is scope creep that distracts from the focused argument about the Globe-drama relationship, introducing irrelevant biographical breadth.'
      },
      {
        letter: 'D',
        text: 'Deleted, because Shakespeare wrote more than 37 plays.',
        explanation: 'The count\'s accuracy isn\'t the issue—even if the numbers were correct, the sentence should be deleted because it shifts from the specific Globe-influence thesis to general career summary, not because of factual errors.'
      }
    ],
    correct_answer: 'C',
    answer_explanation: 'The sentence should be deleted because it expands beyond the essay\'s specific focus on how the Globe Theatre influenced Shakespeare\'s dramatic writing techniques.'
  },
  {
    position: 50,
    title: 'Ultimate Deletion Decision: Maximum Complexity',
    problem_text: '[Conclusion of an essay arguing that diverse perspectives improve scientific research quality]\n\nThe evidence demonstrates that research teams with varied backgrounds produce more innovative solutions and identify flaws that homogeneous groups overlook. <u>When scientists from different cultures, disciplines, and experiences collaborate, they challenge each other\'s assumptions, spot blind spots in methodology, and generate creative approaches that advance their fields more effectively than isolated specialists—making diversity not just an ethical imperative but a practical necessity for scientific progress.</u>\n\nShould the underlined sentence be kept or deleted?',
    choices: [
      {
        letter: 'A',
        text: 'Kept, because it synthesizes the essay\'s argument while elevating diversity from moral principle to scientific methodology.',
        explanation: 'The sentence does sophisticated conclusion work: it synthesizes evidence (assumption-challenging, methodology oversight, creative approaches), shows mechanism (how diversity creates these benefits), and makes a powerful final point (diversity is scientific necessity, not just ethics)—this reframes the entire argument with a memorable closing insight.'
      },
      {
        letter: 'B',
        text: 'Kept, because conclusions always need summaries.',
        explanation: 'While conclusions often summarize, this sentence does more—it transforms the argument by positioning diversity as a scientific methodology issue rather than just an ethical one, providing a powerful reframing that elevates the conclusion beyond simple summary.'
      },
      {
        letter: 'C',
        text: 'Deleted, because it repeats points already made in the essay.',
        explanation: 'The sentence synthesizes previous points (innovation, flaw identification) but adds new insight—that diversity is a practical scientific necessity, not just ethical concern. This reframing provides the meaningful closure that strong conclusions need rather than mere repetition.'
      },
      {
        letter: 'D',
        text: 'Deleted, because it introduces new information about ethics.',
        explanation: 'The ethics mention isn\'t new information being developed—it\'s a familiar framing being contrasted with the "practical necessity" argument to highlight the essay\'s contribution. This contrast sharpens rather than distracts from the conclusion.'
      }
    ],
    correct_answer: 'A',
    answer_explanation: 'The sentence should be kept because it synthesizes the argument while providing a powerful reframing that elevates diversity from ethical principle to scientific methodology necessity.'
  }
];

async function main() {
  console.log('Creating ADDING-DELETING lesson questions...\n');
  console.log('='.repeat(70) + '\n');

  let added = 0;
  for (const q of questions) {
    if (await addQuestion(q)) {
      console.log(`  ✓ Position ${q.position}: ${q.title}`);
      added++;
    }
  }

  console.log('\n' + '='.repeat(70));
  console.log(`\n✅ ADDING-DELETING Complete! Added ${added}/${questions.length} questions.`);
}

main();
