#!/usr/bin/env node

/**
 * TEST 2 - READING PASSAGES MANUALLY CURATED
 * Clean, artifact-free Reading passages for Test 2
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 2;

console.log('📝 MANUALLY CURATING TEST 2 READING PASSAGES\n');
console.log('='.repeat(70));

// =====================================================
// READING PASSAGES (4) - Manually Curated
// =====================================================

const readingPassages = [
  {
    test_number: TEST_NUMBER,
    passage_number: 1,
    passage_type: 'LITERARY NARRATIVE',
    title: 'Touring Home / Beyond the Narrow Gate',
    author: 'Passage A by Susan Power / Passage B by Leslie Chang',
    source: 'Passage A adapted from "Touring Home" by Susan Power (©1996), Passage B adapted from "Beyond the Narrow Gate: The Journey of Four Chinese Women from the Middle Kingdom to Middle America" by Leslie Chang (©1999)',
    introduction: 'Passage A is adapted from the essay "Touring Home" by Susan Power. Passage B is adapted from the memoir Beyond the Narrow Gate: The Journey of Four Chinese Women from the Middle Kingdom to Middle America by Leslie Chang.',
    passage_text: `Passage A by Susan Power

My mother tells me stories every day: while she cleans, while she cooks, on our way to the library, standing in the checkout line at the supermarket. I like to share her stories with other people and chatter away when I am able to command adult attention.

"She left the reservation when she was sixteen years old," I tell my audience. Sixteen sounds very old to me, but I always state the number because it seems integral to my recitation. "She had never been on a train before or used a telephone. She left Standing Rock to take a job in Chicago so she could help out the family during the War. She was so petrified of the new surroundings, she stayed in her seat all the way from McLaughlin, South Dakota, to Chicago, Illinois, and didn't move once."

I usually laugh after saying this because I cannot imagine my mother being afraid of anything. She is so tall, a true Dakota woman; she rises against the sun like a skyscraper, and when I draw her picture in my notebook, she takes up the entire page. She talks politics and attends sit-ins and says what's on her mind.

I am her small shadow and witness. I am the timid daughter who can rage only on paper.

We don't have much money, but Mom takes me from one end of the city to the other, on foot, on buses. I will grow up believing that Chicago belongs to me, because it was given to me by my mother.

Some days we haunt the Art Institute, and my mother pauses before a Picasso.

"He did this during his blue period," she tells me.

I squint at the blue man holding a blue guitar. "Was he very sad?" I ask.

"Yes, I think he was."

My mother takes my hand and looks away from the painting. I can see a story developing behind her eyes, and I tug on her arm to release the words. She will tell me why Picasso was blue, what his thoughts were as he painted this canvas. She relates anecdotes I will never find in books, never see footnoted in a biography of the master artist. I don't even bother to check these references, because I like my mother's version best.

Passage B by Leslie Chang

Water belongs to everyone and to no one. For this reason, I have always had a particular affinity for it, which may strike some as mysterious. Westerners ask me where my parents were born, as though the answer will enable them to glean some knowledge. The answer is Beijing and Luoyang. The truth is that this response signifies nothing. The meaningful question would be to ask where my ancestors lived. The answer to that is inland. My father's people came from Wuhan, birthplace of the Chinese republic and the capital of Hubei, that sweltering province sandwiched between Sichuan and Anhui. My mother's father was from Inner Mongolia, land of desert and grassy plains.

Yet water calls to me. I remain convinced that I would find peace if I could only have a house by the ocean. I insisted on being married near the sea. This bond, I know, comes from my mother.

She longs for a view more than anything else. Once, staying at a hotel in San Francisco, she insisted on seeing three different rooms before she found one with which she was satisfied. It was on a floor so high it made me dizzy, with a corner window overlooking the bay. Even so, my mother spent most of her time on the bridge linking the elevator bank to our wing. The bridge consisted almost entirely of windows. It offered a view in either direction that was brilliant and blinding. If there had been a chair, she could have sat forever, letting the gold sun and blue sea overwhelm her through the glass.

My mother may have descended from inland people, but they were also nomads. Her father once rode his horse practically the length of China, from Inner Mongolia to Guangzhou, a distance of some twelve hundred miles. My mother could only become a nomad by moving to America.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 2,
    passage_type: 'SOCIAL SCIENCE',
    title: 'The Frozen-Water Trade',
    author: 'Gavin Weightman',
    source: 'Adapted from The Frozen-Water Trade: A True Story by Gavin Weightman (©2003)',
    introduction: 'This passage is adapted from The Frozen-Water Trade: A True Story by Gavin Weightman.',
    passage_text: `When the first comprehensive report on the ice industry of the United States was commissioned in 1879 as part of a national census, it was estimated that about eight million tons were harvested annually, though the business was so extensive and production so poorly documented that this was, at best, a well-informed guess. The figures were put together by one Henry Hall, who signed himself "special agent" and gave an account of the great growth of the industry in the preceding ten years. Of the eight million tons of ice harvested, about five million reached the consumer—the rest melted during shipment and storage. By far the biggest market was in New York, and none of its ice was manufactured artificially: it was all cut in winter and stored in hundreds of timber warehouses that lined the lakes and rivers and had a capacity of up to fifty thousand tons each. Between New York and Albany, 150 miles up the Hudson River, there were 135 icehouses, but even this was not enough to supply the metropolis, which relied heavily on imports. In fact, in the year of the great ice census, New York and Philadelphia suffered one of their recurrent ice "famines," when unseasonably warm weather destroyed the harvest on the Hudson and local lakes, and the price of ice rose from $4 to $5 a ton.

That year the ice was fifteen to twenty inches thick in Maine, a top-quality crop, and it could be shipped down to New York at an estimated cost of $1.50 a ton. This produced a frenzy of harvesting on the Kennebec, Penobscot, and Sheepscot Rivers, and two thousand cargoes of ice packed in hay and sawdust were shipped south to New York, Philadelphia, and other more southern cities, where they were sold for a total of around $1.5 million.

Though the demand for ice rose annually, the New York suppliers did not explore the use of artificial refrigeration. Instead, they began to buy up sections of the Kennebec River shoreline and to erect great wooden warehouses there, transforming the landscape of the river for many miles. It was the same farther inland, where ice companies bought up shoreline along the lakes and put up storehouses to supply the meat industry of Chicago and the brewers of Milwaukee, as well as millions of domestic consumers.

The first real crisis in the natural-ice trade was caused not by competition from artificial manufacture, but by pollution. As the cities grew, they encroached on the rivers and lakes from which the ice was cut, and soon there were health scares. This produced a search for cleaner supplies away from towns, and stimulated the search for a means of manufacturing ice with pure water. The realization that the bacteria that cause diseases such as typhoid were not killed off in frozen water added to the urgency of finding safer forms of refrigeration.

The natural-ice trade began to decline from the early decades of the twentieth century, though in more remote areas of North America where electric power was not available but lake ice was abundant in winter, it survived as late as the 1950s. As ice harvesting died out, the evidence of its former vast scale rapidly disappeared. There was no alternative use for the great icehouses, many of which simply burned down, often set alight by a spark from a steam train—they were surprisingly flammable, as most were made of wood and kept as dry as possible to better preserve the blocks of ice they housed. But the majority were demolished or simply rotted away.

Over a wide area of the northern states, young diving enthusiasts with no knowledge of the former ice trade still emerge from lakes and rivers clutching an impressive variety of odd implements—plows and chisels and scrapers that fell through the ice during the harvesting. One or two museums keep small displays of these tools, and collectors have preserved manufacturers' catalogs that proudly present their versions of the ice plow, the ice saw, the grapple, the jack grapple, the breaking-off bar, the caulk bar, the packing chisel, the house bar, the fork bar, the float hook, the line marker, and many other specialist implements the use of which has long been forgotten.

The inner-city icehouses have also gone, and the ice wagon and the iceman are rapidly fading memories. All that is left in America of this once-great industry is the water itself, which provided a continuously renewable supply of ice each winter. There are few memorials on the banks of the rivers and lakes that once produced such a vital crop.`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 3,
    passage_type: 'HUMANITIES',
    title: 'Read My Lips: Film Dubbing in Italy',
    author: 'Chiara Barzini',
    source: 'Adapted from "Read My Lips" by Chiara Barzini (©2012 by Harper\'s Magazine)',
    introduction: 'This passage is adapted from the article "Read My Lips" by Chiara Barzini. In the passage, dubbing primarily refers to providing a film with a new sound track, especially dialogue, in a different language.',
    passage_text: `Filmmakers have debated the respective merits of subtitles and dubbing since the earliest sound films. In "The Impossible Life of Clark Costa," published in 1940 in the film journal Cinema, director Michelangelo Antonioni wrote that Romolo Costa, the person who dubbed all of actor Clark Gable's performances, was a "hybrid individual born out of a chemical combination." This "half Clark, half Costa" was unbearable to Antonioni, who considered dubbing to be a mere "acoustic surrogate" of acting. To him, dubbing compromised the intention of the director, leading to an artificial product that lacked artistic unity.

Director Pier Paolo Pasolini, who called both dubbing and subtitles "evils," said that, between the two, dubbing was the less harmful, since it allowed you to see the picture in full. Director Jean Renoir called dubbing a "monstrosity, a challenge to human and divine laws."

Director Federico Fellini didn't agree with any of them. Dubbing was an extension of his shoots, a technique he would use to retouch and rewrite. He mercilessly dubbed over his actors, changing dialogue in postproduction, sometimes having worked without a script. (He reportedly instructed his actors to count aloud in front of the camera so that he could insert new dialogue afterward.) Renato Cortesi, a veteran Fellini dubber, told me that, during the filming of Amarcord (1973), he witnessed Fellini ask an old Neapolitan lady to tell him a sad story. Over footage of this woman recounting a tragic tale about her grandson, Fellini added a new sound track about war and hunger recorded by an actor from Emilia-Romagna, combining the vivid expressiveness of the South with his favorite northern accent.

If you visit a dubbing studio, the over-the-top zest of the actors is evident in everything from their melodramatic speech to their movements; standing in front of the microphone, they coil and twitch. I asked Cortesi whether this was a consequence of having to focus one's lifelong talent into the few centimeters between mouth and microphone, a kind of bodily rebellion to the condition of being heard but not seen, and he laughed. "Of course it isn't easy to spend a life in the darkness, but this is hardly the reason why they twitch and turn! Dubbers are used to reciting while trying to re-create the bodily sensations of what they see on the screen before them. If there is running in the film, they will run on their feet. The moving," he explained, "is the result of re-creating large movements in small spaces."

There are still few options for those seeking to watch subtitled, original-language films at a movie house in Italy. The Metropolitan cinema on Via del Corso closed recently after a long battle involving intellectuals, show-business people, and American expats in Rome, to be replaced with a clothing store. Italians remain hooked on dubbing—perhaps because of simple affection. Familiar voices yield emotional attachment.

Francesco Vairano, a dubber and dubbing director known for adapting foreign films considered to be "undubbable," such as the French box office hit Bienvenue chez les Ch'tis ("Welcome to the Sticks," 2008), which relies on linguistic misunderstandings for much of its comedy, explained that actors become just as attached to their parts as audiences do. Vairano has been one of the few directors to break the habit of matching the same Italian dubber to a foreign actor for all his films, preferring instead to select the dubber according to the requirements of the role, and, he admits, he was hated by all the prima donna dubbers for this. "If you take that actor away from them," he told me, "they will insult you."

In 2007, I met dubber Luca Ward, who provided the voice of the narrator for a romantic comedy I co-wrote, Scusa ma Ti Chiamo Amore ("Sorry but I Love You"). What I didn't then know was that everyone Ward met wanted him to recite actor Samuel L. Jackson's Ezekiel 25:17 passage from the film Pulp Fiction, and that I should consider it an honor that he would offer a performance to a stranger. When he finally did recite the monologue, it was astonishing, every dramatic pause carefully timed and every word perfectly enunciated. I understood that, if anybody took Samuel L. Jackson away from Ward, it would have meant taking away a part of his soul; he was, as Antonioni would say, half Ward, half Jackson. Leaving the day's recording session, Ward told me he was off to have dinner with actress Meg Ryan, before raising an eyebrow and clarifying, "With Meg Ryan's dubber ... I am having dinner with Meg Ryan's voice."`
  },
  {
    test_number: TEST_NUMBER,
    passage_number: 4,
    passage_type: 'NATURAL SCIENCE',
    title: 'Making Stuff: From Bacon to Bakelite',
    author: 'Philip Ball',
    source: 'Adapted from the essay "Making Stuff: From Bacon to Bakelite" by Philip Ball (©2010)',
    introduction: 'This passage is adapted from the essay "Making Stuff: From Bacon to Bakelite" by Philip Ball.',
    passage_text: `During the Industrial Revolution, the high price of steel meant that many large engineering projects were carried out that used instead cast iron, which is brittle and prone to failure. This was why Henry Bessemer's new process for making steel was greeted with jubilation: the details, announced at a meeting of the British Association in 1856, were published in full in The Times. Bessemer himself was lauded not just as an engineer but as a scientist, being elected a Fellow of the Royal Society in 1879.

Bessemer's process controlled the amount of carbon mixed with iron to make steel. That the proportion of carbon governs the hardness was first noted in 1774 by the Swedish metallurgist Torbern Bergmann, who was by any standards a scientist, teaching chemistry, physics and mathematics at Uppsala. Bergmann made an extensive study of the propensity of different chemical elements to combine with one another—a property known as elective affinity, central to the eighteenth-century notion of chemical reactivity. He was a mentor and sponsor of Carl Wilhelm Scheele, the greatest Swedish chemist of the age and co-discoverer of oxygen.

Oxygen, as a component of air, was the key to the Bessemer process. It offered a way of removing impurities from pig iron and adjusting its carbon content during conversion to steel. A blast of air through the molten metal turned impurities such as silicon into light silica slag (a collection of compounds removed from metal in the smelting process), and removed carbon in the form of volatile carbon dioxide. Pig iron contains as much as 4 per cent carbon; steels have only around 0.3-2 per cent. Meanwhile, the heat produced in these reactions with oxygen kept the iron molten without the need for extra fuel.

It was long known that steel can be improved with a spice of other elements. A dash of the metal manganese helps to remove oxygen and sulphur from the iron, and most of the manganese currently produced globally is used for this purpose. Manganese also makes steel stronger, while nickel and chromium improve its hardness. And chromium is the key additive in stainless steel—in a proportion of more than about 11 per cent, it makes the metal rust-resistant. Most modern steels are therefore alloys blended to give the desired properties.

But is this science? Some of the early innovations in steel alloys were chance discoveries, often due to impurities incorporated by accident. In this respect, metallurgy has long retained the air of an artisan craft, akin to the trial-and-error explorations of dyers, glassmakers and potters. But the reason for this empiricism is not that the science of metallurgy is trivial; it is because it is so difficult. According to Rodney Cotterill, a remarkable British physicist whose expertise stretched from the sciences of materials to the brain, "metallurgy is one of our most ancient arts, but is often referred to as one of the youngest sciences."

One of the chief difficulties in understanding the behaviour of materials such as steel is that it depends on its structure over a wide range of length scales, from the packing of atoms to the size and shape of grains micrometres or even millimetres across. Scientists have trouble dealing with such a span of scales. One might regard this difficulty as akin to that in the social sciences, where social behaviour is governed by how individuals behave but also how we interact on the scale of families and neighbourhoods, within entire cities, and at a national level. (That's why the social sciences are arguably among the hardest of sciences too.)

The mechanical properties of metals depend on how flaws in the crystal structure, called defects, move and interact. These defects are produced by almost inevitable imperfections in the regular stacking of atoms in the crystalline material. The most common type of stacking fault is called a dislocation. Metals bend, rather than shattering like porcelain, because dislocations can shift around and accommodate the deformation. But if dislocations accumulate and get entangled, restricting their ability to move, the metal becomes brittle. This is what happens after repeated deformation, causing the cracking known as metal fatigue.

Dislocations can also get trapped at the boundaries between the fine, microscopic grains that divide a metal into mosaics of crystallites. The arrest of dislocations at grain edges means that metals may be made harder by reducing the size of their grains, a useful trick for modifying their mechanical behaviour.`
  }
];

// =====================================================
// UPDATE DATABASE
// =====================================================

console.log('\n💾 Updating Reading passages in database...\n');

for (const passage of readingPassages) {
  // First, get the passage_id for this passage
  const { data: existingPassage, error: fetchError } = await supabase
    .from('act_reading_passages')
    .select('id')
    .eq('test_number', TEST_NUMBER)
    .eq('passage_number', passage.passage_number)
    .single();

  if (fetchError) {
    console.error(`❌ Error fetching Reading Passage ${passage.passage_number}:`, fetchError.message);
    continue;
  }

  // Update the passage
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

console.log('\n✅ All Reading passages updated!');
console.log('\n📝 Next: Science passages need manual curation\n');
