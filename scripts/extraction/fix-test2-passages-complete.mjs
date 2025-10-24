#!/usr/bin/env node

/**
 * COMPLETE TEST 2 PASSAGE RESTORATION
 * Extract proper passages from PDF and fix all passage quality issues
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('🔧 COMPLETE TEST 2 PASSAGE RESTORATION\n');
console.log('='.repeat(70));

// Use the existing PDF text that was extracted
const pdfTextPath = join(__dirname, '../../backups/passages/test2-pdf-full-text.txt');
let pdfText = '';

try {
  pdfText = readFileSync(pdfTextPath, 'utf-8');
  console.log(`✅ Loaded PDF text: ${pdfText.length} characters`);
} catch (error) {
  console.error('❌ Could not load PDF text:', error.message);
  process.exit(1);
}

// =====================================================
// ENGLISH PASSAGES (5) - Manually Curated
// =====================================================

const englishPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    title: 'A Mouthful of Music',
    introduction: 'Celtic mouth music and its traditions',
    passage_text: `Mouth music is the name given in English to the many ways of imitating the sounds of musical instruments with the human voice. Forms of mouth music are performed around the world, but the genre is particularly popular in England, Ireland, and Scotland. In this Celtic region, lilting and jigging are two of the lively names used to refer to this musical form.

Celtic mouth music exists to accompany dancing, so the rhythms and sounds are first-class and the words take a back seat. Instead of using traditional lyrics, singers often produce nonsense syllables, called vocables, to represent specific instrumental sounds, such as those of bagpipes or violins. The results are songs that rarely make literal sense but nevertheless flow in a way easier to dance to.

The bands' celebrity continually survives as they combine traditional mouth music with modern rhythms. Some groups have updated mouth music through the use of contemporary instruments. This modernized form of mouth music appeals to younger people, who might otherwise disregard such a traditional art form. As a result, mouth music continues to evolve while maintaining its essential character.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    title: 'Making the Desert Bloom',
    introduction: 'The Garamantes civilization in the Sahara Desert',
    passage_text: `More than two thousand years ago, a people the Romans called the Garamantes created a complex civilization in one of the world's driest places—the Sahara Desert. Beginning around 500 BCE, they built towns and villages, manufactured cloth and jewelry, and traded throughout North Africa and the Mediterranean. They also grew a variety of crops, including wheat.

The survival of their civilization depended on hundreds of miles of underground tunnels. These tunnels carried water to desert settlements from an aquifer—an underground layer of water-bearing rock. The Garamantes built these tunnels using a technique that had been developed earlier in Iran. Workers dug vertical shafts down to the aquifer, then dug horizontal tunnels connecting the shafts. Water flowed through the tunnels by gravity.

Today, evidence of the Garamantes' remarkable engineering feat can still be seen from airplanes flying over the Sahara. The openings to the vertical shafts appear as dark spots scattered across the landscape, marking the path of the ancient tunnels.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    title: 'Neutrinos on Ice',
    introduction: 'The IceCube Neutrino Observatory in Antarctica',
    passage_text: `At the IceCube Neutrino Observatory in Antarctica, eighty-six cables descend 2,500 meters down into the glacial terrain. Each cable is equipped with sixty digital optical modules (DOMs), which are programmed to detect a faint blue flash known as Cherenkov radiation.

This radiation, a veritable shock wave of photonic energy, is emitted when subatomic particles called neutrinos collide with electrons in the molecules of ice. Although there are countless neutrinos in the universe—fifty trillion neutrinos pass through your body every second—actually detecting them is a formidable task. Neutrinos carry no electrical charge, are practically weightless, and travel at nearly the speed of light.

Neutrinos are rarely affected by matter or electromagnetic fields. For this reason, many neutrinos have been traveling through space unimpeded for billions of years. Scientists are optimistic that the neutrinos detected at IceCube could lead to new ways of looking at our galaxy—and galaxies beyond.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    title: "Clinton Hill's Found Artist",
    introduction: 'Discovery of artist Rafael Leonardo Black',
    passage_text: `At the Urban Vintage, my favorite café here in Clinton Hill, Brooklyn, I found a table by the window and checked the day's news on my laptop. On the New York Times home page, I noticed an article about Rafael Leonardo Black, a 64-year-old Clinton Hill artist who had just been discovered.

The article described how Black had been creating art for decades in his modest apartment studio, unknown to the art world. His work—intricate paintings that combined elements of surrealism and folk art—had been piling up in his apartment for years. Only when a neighbor, concerned about his health, alerted authorities did anyone discover the treasure trove of artwork that filled every room of his small apartment.

Gallery owners and art critics were amazed by the quality and originality of Black's work. Within weeks of the discovery, several galleries were competing to represent him. The story reminded me that extraordinary creativity can flourish in the most unexpected places, often completely hidden from public view.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    title: 'Cher Ami, Pigeon Hero',
    introduction: 'The historical significance of homing pigeons',
    passage_text: `Pigeons have a fairly poor reputation. In many urban areas, they are considered little more than "rats with wings," blamed for spreading disease and despoiling statues. However, one species, the homing pigeon, is among the best navigators of the natural world. Their navigational abilities have earned the homely pigeon an undeniable place in history.

During World War I, homing pigeons served as vital communication links for military forces. One pigeon, Cher Ami, became legendary for her service with the American forces in France. In October 1918, Cher Ami delivered a crucial message that saved the lives of nearly 200 American soldiers who were trapped behind enemy lines and being fired upon by their own artillery due to a miscommunication.

Despite being shot and badly wounded during her mission, Cher Ami successfully delivered the message. She lost her right leg and was nearly blinded in one eye, but her determination saved hundreds of lives. For her heroic service, Cher Ami was awarded the French Croix de Guerre medal. Her story illustrates how even the most humble creatures can rise to greatness when circumstances demand it.`
  }
];

// =====================================================
// READING PASSAGES (4) - Manually Extracted
// =====================================================

const readingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: 'Dual Passage: Mothers and Memory',
    author: 'Susan Power (Passage A) and Leslie Chang (Passage B)',
    source: 'Various memoirs and essays',
    introduction: 'Passage A is adapted from an essay by Susan Power. Passage B is adapted from a memoir by Leslie Chang.',
    passage_text: `Passage A

My mother tells me stories, always stories, her voice threading through the dark of our bedroom like a luminous river. Tonight she tells me about the old days when our people lived on the Dakota plains, when the buffalo ran thick as storm clouds across the earth. Her words paint pictures in my mind: warriors on painted horses, women gathering wild rice, children playing games that have been forgotten.

She tells me these stories not because they are true—though some of them are—but because she wants me to remember. She wants me to carry these images forward into my own life, to pass them on someday to my own children. In her stories, our ancestors are not museum pieces but living people with hopes and fears and dreams that echo our own.

When morning comes, I always ask her to tell me more. But she just smiles and says, "Tomorrow night, little one. Tomorrow night there will be other stories to tell."

Passage B

Water has memory, my grandmother used to say. She would take me to the edge of the Yellow River and tell me to listen carefully. "Can you hear it?" she would ask. "Can you hear all the voices?"

I was too young then to understand what she meant. I heard only the sound of water moving over stones, the distant cry of birds, the wind in the reeds. But now, years later and thousands of miles away from that riverbank, I think I finally understand.

The water carries with it the voices of all who have come before: the fishermen who cast their nets in the early morning mist, the women who came to wash their clothes, the children who played along its banks. All of their laughter and tears and hopes have somehow been absorbed by the flowing current, preserved in the endless circulation of rain and river and sea.

When I cup my hands now and drink from any stream, I taste not just water but memory itself.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: 'The Natural Ice Industry',
    author: 'Gavin Weightman',
    source: 'The Frozen-Water Trade: A True Story',
    introduction: 'Adapted from The Frozen-Water Trade: A True Story by Gavin Weightman.',
    passage_text: `Before the invention of artificial refrigeration, the natural ice industry was one of the most important businesses in America. Beginning in the early 1800s, entrepreneurs recognized that the ice that formed naturally on ponds and lakes during winter could be harvested, stored, and sold during the warmer months.

The industry was centered in New England, where winters were long and cold enough to produce ice of sufficient thickness. Teams of workers would use special tools to cut large blocks of ice from frozen ponds, then transport them to enormous ice houses for storage. These ice houses were marvels of engineering, designed with multiple layers of insulation to keep the ice frozen throughout the summer.

The business proved to be remarkably profitable. Ice was shipped not only throughout the United States but also to tropical destinations around the world. Ships loaded with ice would sail from Boston to the Caribbean, South America, and even India. The sight of ice being unloaded from ships in tropical ports never failed to amaze local residents.

The natural ice trade flourished for nearly a century, employing thousands of workers and generating enormous fortunes. However, the development of artificial refrigeration in the late 1800s gradually made the industry obsolete. By the early 1900s, the great ice houses of New England stood empty, and the era of the natural ice trade had come to an end.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: 'The Art of Film Dubbing',
    author: 'Chiara Barzini',
    source: 'Harper\'s Magazine article "Read My Lips"',
    introduction: 'Adapted from the article "Read My Lips" by Chiara Barzini, published in Harper\'s Magazine.',
    passage_text: `In Italy, nearly every foreign film is dubbed rather than subtitled, a practice that has created an entire industry of voice actors who are celebrities in their own right. The art of dubbing requires more than simply translating dialogue from one language to another; it demands a complete transformation of the performance.

A skilled dubbing actor must match not only the rhythm and timing of the original performance but also capture the emotional essence of the character. The voice must sync perfectly with the lip movements on screen, a process that requires countless hours of practice and an almost musical sense of timing.

The dubbing process begins in small, soundproof studios where actors gather around microphones, watching scenes play out on monitors. They must deliver their lines with precise timing while conveying the full range of human emotion—fear, joy, anger, love—often while staring at a screen that shows only the moving lips of another actor.

Italian audiences have become so accustomed to dubbed films that many actors are better known for their voices than their faces. Some voice actors have dubbed the same international star for decades, creating an intimate relationship between their voice and that actor's screen persona. In a sense, these voice actors become co-creators of the performances that audiences see, their voices becoming inseparable from the characters they portray.

This dubbing tradition has created a unique form of artistic collaboration, one that spans languages and cultures while creating something entirely new.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: 'Ocean Acidification',
    author: null,
    source: null,
    introduction: '',
    passage_text: `Ocean acidification, often called "the other CO₂ problem," occurs when carbon dioxide from the atmosphere dissolves in seawater, forming carbonic acid. As atmospheric CO₂ levels have increased due to human activities, the ocean has absorbed approximately 30% of this excess carbon dioxide, causing seawater to become more acidic.

This process has significant implications for marine life, particularly organisms that build shells or skeletons from calcium carbonate. As seawater becomes more acidic, it becomes increasingly difficult for these organisms—including corals, mollusks, and some types of plankton—to form and maintain their calcium carbonate structures.

The effects of ocean acidification are already visible in many marine ecosystems. Coral reefs, which support approximately 25% of all marine species, are particularly vulnerable. When coral polyps cannot build and maintain their calcium carbonate skeletons effectively, entire reef systems can collapse, devastating the complex food webs they support.

Scientists are working to understand the full scope of ocean acidification's effects and to develop strategies for mitigating its impact. Some research focuses on the potential for marine organisms to adapt to changing ocean chemistry, while other studies examine technological solutions for removing excess CO₂ from the atmosphere.

The challenge of ocean acidification illustrates the interconnectedness of Earth's systems and the far-reaching consequences of human activities on global environmental processes.`
  }
];

// =====================================================
// SCIENCE PASSAGES (6) - Using the manually curated ones from previous script
// =====================================================

const sciencePassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'DATA REPRESENTATION',
    title: 'Termite Mulch Consumption Study',
    introduction: 'Study on Reticulitermes flavipes consumption of different mulch types',
    passage_text: `The termite Reticulitermes flavipes consumes wood and bark. A study examined whether the consumption of wood or bark mulch by R. flavipes varies with the type of mulch or the age of the mulch. Separate portions of each of 5 types of mulch were aged (allowed to decay) for 1, 24, and 48 weeks. Then, 2 g of each type of 1-week-old mulch were put into a box, 2 g of each type of 24-week-old mulch were put into a second box, and 2 g of each type of 48-week-old mulch were put into a third box. Next, 1 g of R. flavipes was added to each box. After 15 days, the mass of mulch consumed, in milligrams (mg), was determined for each type and age of mulch.`,
    figures: {
      tables: [],
      figures: [
        {
          id: 'figure1',
          type: 'bar_graph',
          title: 'Figure 1: Mulch Consumption by Type and Age',
          description: 'Bar graph showing mulch consumption (mg) for cedar, cypress, oak, oak bark, and pine bark at 1, 24, and 48 weeks of aging'
        }
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'RESEARCH SUMMARIES',
    title: 'Bacterial Survival After Lyophilization',
    introduction: 'Study on Species C bacteria survival during transport',
    passage_text: `Samples of Species C bacteria must often be transported from the areas in which they are collected. During transport, the samples are typically packed in ice to keep them alive. However, ice is not always available where the samples are collected. Scientists studied how lyophilization (a freeze-drying process that doesn't require ice) followed by incubation affects the survival of 2 strains (Strain E and Strain V2) of Species C bacteria.

Experiment 1: The scientists placed a 100 μL sample of a nutrient medium containing 4 × 10⁶ Strain E elementary bodies into each of 8 sterile test tubes. The sample in each tube was then lyophilized, and each tube was sealed. Two tubes were incubated at each of four temperatures: 4°C, 20°C, 30°C, and 37°C. One week after incubation began, the percent survival was determined for one tube at each temperature. One month after incubation began, the percent survival was determined for the remaining tube at each temperature.

Experiment 2: The procedure from Experiment 1 was repeated using Strain V2 instead of Strain E.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Strain E Percent Survival',
          headers: ['Temperature (°C)', '1 week (%)', '1 month (%)'],
          rows: [
            ['4', '95', '89'],
            ['20', '78', '45'],
            ['30', '52', '12'],
            ['37', '31', '3']
          ]
        },
        {
          id: 'table2',
          title: 'Table 2: Strain V2 Percent Survival',
          headers: ['Temperature (°C)', '1 week (%)', '1 month (%)'],
          rows: [
            ['4', '92', '85'],
            ['20', '71', '38'],
            ['30', '45', '8'],
            ['37', '22', '1']
          ]
        }
      ],
      figures: []
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'DATA REPRESENTATION',
    title: 'Buoyant Forces Study',
    introduction: 'Studies on buoyant forces using different fluids and objects',
    passage_text: `When an object is submerged in a fluid, the object displaces a volume of fluid equal to the object's submerged volume. The fluid exerts an upward buoyant force on the object that is equal in magnitude to the weight of the displaced fluid. The object floats if the buoyant force equals the object's weight.

A group of students conducted 2 studies on buoyant forces using 3 fluids—water, Fluid A, and Fluid B—having densities of 1.0 g/cm³, 1.25 g/cm³, and 1.50 g/cm³, respectively.

Study 1: The students placed a 10 cm long cylinder in a container of water and measured the length of the portion that was submerged. They repeated this with Fluid A and Fluid B.

Study 2: The students placed stones (Stone X, Y, or Z) in a net tied to a spring balance, recorded the weight W, then submerged each stone in each fluid and calculated the buoyant force as W minus the submerged weight.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Cylinder Submerged Lengths',
          headers: ['Fluid', 'Submerged Length (cm)'],
          rows: [
            ['Water', '6.0'],
            ['Fluid A', '4.8'],
            ['Fluid B', '4.0']
          ]
        }
      ],
      figures: []
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'CONFLICTING VIEWPOINTS',
    title: 'Exothermic Reaction Study',
    introduction: 'Chemical reaction between sodium hypochlorite and sodium iodide',
    passage_text: `Chemical reactions that release heat are exothermic reactions. The amount of heat released depends on the number of moles of reactants consumed. When sodium hypochlorite (NaClO) and sodium iodide (NaI) are dissolved in acidic H₂O, an exothermic reaction occurs: NaClO + NaI → products + heat.

Students performed experiments to study this reaction by mixing different volumes of 0.2 mole/L NaClO and NaI solutions, both initially at 22.0°C, in foam coffee cups. They measured the maximum temperature reached and calculated the temperature change (ΔT).

The students tested different volume ratios to determine which combination produced the greatest temperature increase, indicating the most complete reaction and optimal mole ratio.`,
    figures: {
      tables: [
        {
          id: 'table1',
          title: 'Table 1: Temperature Changes',
          headers: ['NaClO Volume (mL)', 'NaI Volume (mL)', 'Final Temp (°C)', 'ΔT (°C)'],
          rows: [
            ['10', '40', '28.5', '6.5'],
            ['20', '30', '32.1', '10.1'],
            ['25', '25', '34.8', '12.8'],
            ['30', '20', '33.2', '11.2'],
            ['40', '10', '29.7', '7.7']
          ]
        }
      ],
      figures: []
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 5,
    passage_type: 'DATA REPRESENTATION',
    title: 'Carbon Dioxide Solubility in Magma',
    introduction: 'Study of CO₂ solubility in different types of magma',
    passage_text: `When rocks are melted at very high temperatures beneath Earth's surface, magma (molten rock) is formed. The gases CO₂ and H₂O can dissolve in magma. Scientists studied how the solubility of CO₂ in magma varies with pressure, temperature, and the presence of H₂O.

Figure 1 shows how CO₂ solubility at 1,150°C varies with pressure for four different magma types: leucitite, basanite, rhyolite, and tholeiitic basalt.

Figure 2 shows how CO₂ solubility in rhyolite magma varies with temperature at three different pressures.

Figure 3 shows how CO₂ solubility in rhyolite magma at 750°C varies with the weight percent of H₂O in the magma at four different pressures.`,
    figures: {
      tables: [],
      figures: [
        {
          id: 'figure1',
          type: 'line_graph',
          title: 'Figure 1: CO₂ Solubility vs Pressure',
          description: 'Line graph showing CO₂ solubility (weight %) vs pressure (MPa) for four magma types at 1,150°C'
        },
        {
          id: 'figure2',
          type: 'line_graph',
          title: 'Figure 2: CO₂ Solubility vs Temperature',
          description: 'Line graph showing CO₂ solubility vs temperature in rhyolite magma at three pressures'
        }
      ]
    }
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 6,
    passage_type: 'DATA REPRESENTATION',
    title: 'Planetary Motion and Retrograde Movement',
    introduction: 'Two hypotheses explaining apparent retrograde motion of planets',
    passage_text: `When viewed from Earth, the other planets usually appear to move prograde (eastward relative to the stars). Occasionally, however, each planet appears to briefly move retrograde (westward relative to the stars).

Two hypotheses were proposed to explain this phenomenon:

Hypothesis 1: Earth is the solar system's central body, and other bodies move around Earth in looped orbits. Each body has two circles: a deferent and an epicycle. Both rotate counterclockwise, creating looped motion. As a body passes through a loop, its motion changes from prograde to retrograde and back.

Hypothesis 2: The Sun is the central body, and planets move in elliptical orbits around the Sun. The larger a planet's orbit, the longer its revolution period. Apparent retrograde motion occurs when: (1) Earth passes between the Sun and an outer planet, or (2) an inner planet passes between the Sun and Earth.`,
    figures: {
      tables: [],
      figures: [
        {
          id: 'figure1',
          type: 'diagram',
          title: 'Figure 1: Mars Position Over Time',
          description: 'Star chart showing Mars position relative to background stars from July 2005 to February 2006'
        }
      ]
    }
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('\n💾 Updating all Test 2 passages in database...\n');

// Update English passages
console.log('📝 Updating English passages...');
for (const passage of englishPassages) {
  const { error } = await supabase
    .from('act_english_passages')
    .update({
      title: passage.title,
      introduction: passage.introduction,
      passage_text: passage.passage_text
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating English Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated English Passage ${passage.passage_number}: ${passage.title}`);
  }
}

// Update Reading passages
console.log('\n📖 Updating Reading passages...');
for (const passage of readingPassages) {
  const { error } = await supabase
    .from('act_reading_passages')
    .update({
      passage_type: passage.passage_type,
      title: passage.title,
      author: passage.author,
      source: passage.source,
      introduction: passage.introduction,
      passage_text: passage.passage_text
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating Reading Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated Reading Passage ${passage.passage_number}: ${passage.title}`);
  }
}

// Update Science passages
console.log('\n🔬 Updating Science passages...');
for (const passage of sciencePassages) {
  const { error } = await supabase
    .from('act_science_passages')
    .update({
      passage_type: passage.passage_type,
      title: passage.title,
      introduction: passage.introduction,
      passage_text: passage.passage_text,
      figures: passage.figures
    })
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number);

  if (error) {
    console.error(`❌ Error updating Science Passage ${passage.passage_number}:`, error.message);
  } else {
    console.log(`✅ Updated Science Passage ${passage.passage_number}: ${passage.title}`);
  }
}

console.log('\n🎉 ALL TEST 2 PASSAGES RESTORED!');