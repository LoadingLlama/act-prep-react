#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 INSERTING READING SECTION\n');

function answerToIndex(letter) {
  return { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[letter];
}

async function insertReading() {
  try {
    // 4 READING PASSAGES (600-700 words each)
    const readingPassages = [
      {
        num: 1,
        type: "literary_narrative",
        text: `The summer I turned sixteen, my grandmother decided to teach me the art of traditional quilting, a craft she had practiced for over fifty years. Each quilt she made told a story, stitched together piece by piece with patience and skill that seemed almost magical to my teenage eyes. "A quilt," she would often say, adjusting her reading glasses as she examined a new fabric, "is more than just something to keep you warm. It's a story, a memory, a piece of your heart made visible."

Every morning that summer, I would ride my bicycle to her small cottage on Maple Street, a charming house with blue shutters and a garden bursting with roses and lavender. The living room had been transformed into a quilting workshop, with colorful fabrics spread across every available surface—the couch, the coffee table, even the windowsills. She showed me how to select complementary colors, how to cut precise squares with her heavy fabric scissors, and most importantly, how to sew each piece with care and attention to detail.

At first, my stitches were embarrassingly uneven and clumsy, nothing like her perfectly uniform rows. Grandmother would patiently unpick my work, her weathered hands moving with surprising dexterity, and guide my fingers through the proper technique. "Don't rush," she'd remind me gently, her voice carrying the wisdom of decades. "Each stitch matters. Each one contributes to the whole." I found this frustrating initially, wanting immediate results in an age of instant gratification.

As the weeks passed, however, something changed. My hands grew steadier, my stitches more consistent. I began to understand the meditative quality of the work, the way the repetitive motion could quiet my usually restless mind. By late July, I had completed my first quilt square—a simple pattern of blues and greens that reminded me of the ocean I had visited with my family the previous summer.

Grandmother was delighted. She held it up to the light streaming through the window, examining it from every angle with the critical eye of an expert. "This is good work," she finally declared, and I felt a surge of pride unlike anything I had experienced before. It wasn't the hollow praise adults sometimes give to be polite; it was genuine appreciation from someone whose opinion I valued deeply.

We continued working together throughout August, and I completed three more squares. Grandmother taught me increasingly complex patterns—the log cabin, the flying geese, the wedding ring. Each had its own story, its own significance in quilting tradition. She explained how quilts had once been essential items in pioneer households, how women would gather for quilting bees, sharing news and supporting each other while creating functional art.

That summer taught me more than quilting techniques. It taught me the value of patience, the importance of preserving traditional crafts, and the deep satisfaction that comes from creating something beautiful with your own hands. It showed me that my grandmother, whom I had always loved but perhaps taken for granted, possessed remarkable skills and knowledge worth learning.

Now, years later, I still have that first quilt square framed on my wall, a reminder of those precious mornings spent in her sunny living room. Grandmother passed away two years ago, but every time I see that square of blue and green fabric, I hear her voice: "Each stitch matters." It's a lesson I carry with me in everything I do.`
      },
      {
        num: 2,
        type: "social_science",
        text: `The concept of "food deserts"—urban areas where access to affordable, healthy food options is limited—has become a significant concern for public health officials and urban planners across the United States. These neighborhoods, typically found in low-income communities, lack supermarkets and grocery stores that sell fresh produce, lean meats, and other nutritious foods. Instead, residents often rely on convenience stores and fast-food restaurants, which predominantly offer processed foods high in sugar, salt, and unhealthy fats.

Research conducted by the U.S. Department of Agriculture has identified that approximately 23.5 million Americans live in food deserts, with a disproportionate impact on minority communities. These areas are defined as urban neighborhoods where at least 33% of the population lives more than one mile from a supermarket, or rural areas where the distance extends to more than ten miles. The consequences extend far beyond mere inconvenience.

Studies have demonstrated a strong correlation between living in food deserts and higher rates of diet-related health problems. Residents of these areas show significantly elevated rates of obesity, diabetes, and cardiovascular disease compared to those with better food access. The problem is particularly acute for families with limited transportation options, as they may struggle to travel to distant supermarkets even when public transit is available.

The causes of food deserts are complex and multifaceted. Economic factors play a primary role: major grocery chains often avoid low-income neighborhoods due to perceived lower profit margins and higher operating costs, including security concerns and the expense of operating in older buildings. When supermarkets do close in these areas, they create a vacuum that smaller, less healthy food retailers quickly fill.

However, innovative solutions are emerging. Some cities have implemented incentive programs to attract grocery stores to underserved areas, offering tax breaks and assistance with property acquisition. Mobile markets—essentially grocery stores on wheels—now serve some communities, bringing fresh produce directly to neighborhoods. Community gardens and urban farming initiatives provide residents with opportunities to grow their own healthy food while fostering social connections.

The role of technology has also proven significant. Some organizations have developed online ordering and delivery services specifically designed for food desert residents, partnering with existing stores to offer affordable access. Ride-sharing programs focused on grocery shopping help those without transportation reach distant supermarkets.

Policy interventions at the local and federal levels have shown promise as well. The Healthy Food Financing Initiative, a federal program launched in 2010, has provided financing to help grocery stores open or expand in underserved areas. Some cities have revised zoning laws to make it easier for markets to operate in residential neighborhoods, and restrictions on corner stores have been relaxed to allow them to stock fresh produce.

Critics argue, however, that simply increasing physical access to healthy food doesn't guarantee consumption. Cultural preferences, cooking knowledge, and time constraints also influence food choices. Education programs that teach nutrition and cooking skills must accompany infrastructure improvements to create lasting change.

The food desert phenomenon illustrates how urban development patterns, economic forces, and public health intersect. Addressing this issue requires coordinated efforts from government agencies, private businesses, community organizations, and residents themselves. While progress has been made, food deserts remain a persistent challenge in American cities, reminding us that access to nutritious food should be considered a fundamental necessity rather than a privilege.`
      },
      {
        num: 3,
        type: "humanities",
        text: `The Harlem Renaissance, a cultural movement that flourished in the 1920s and 1930s, represents one of the most significant periods in African American cultural history. Centered in the Harlem neighborhood of New York City, this artistic explosion produced an extraordinary outpouring of literature, music, visual art, and intellectual thought that challenged prevailing racial stereotypes and celebrated black cultural identity.

The movement emerged in a specific historical context. The Great Migration had brought hundreds of thousands of African Americans from the rural South to northern cities, seeking better economic opportunities and escape from Jim Crow segregation. Harlem became a destination of choice, transforming from a predominantly white neighborhood into a vibrant black cultural capital. This concentration of talent and energy created an environment where artistic innovation could thrive.

Writers formed the heart of the Renaissance. Langston Hughes, perhaps the movement's most famous poet, captured the rhythm and spirit of black life in accessible verse that spoke to both scholarly and popular audiences. His poem "The Negro Speaks of Rivers" connected African American identity to ancient civilizations, asserting a proud historical lineage. Zora Neale Hurston brought anthropological insight to her fiction, most notably in "Their Eyes Were Watching God," a novel that explored black female experience through rich dialect and folklore.

The movement extended far beyond literature. Jazz music, evolving in Harlem's numerous nightclubs and speakeasies, became the sonic signature of the era. Duke Ellington's sophisticated compositions at the Cotton Club elevated jazz from entertainment to serious art form. Louis Armstrong's innovative trumpet playing and Bessie Smith's powerful blues vocals demonstrated the range and emotional depth of African American musical tradition.

Visual artists contributed significantly as well. Aaron Douglas created striking murals and illustrations that blended African aesthetic elements with modernist techniques, developing a distinctive visual language for the movement. Sculptor Augusta Savage fought against racial barriers to create powerful works that celebrated black dignity and beauty, while also mentoring younger artists and advocating for greater opportunities.

The Harlem Renaissance also fostered important intellectual developments. W.E.B. Du Bois, through his magazine The Crisis, provided a platform for emerging voices while advancing arguments for civil rights and racial equality. Alain Locke's anthology "The New Negro" offered a manifesto for the movement, arguing that African Americans were redefining themselves through cultural production rather than accepting definitions imposed by white society.

The movement faced internal debates about artistic direction and purpose. Some artists believed black art should primarily serve political goals, advancing the cause of civil rights through explicit protest. Others argued that art should be valued for its own sake, without requiring political messaging. This tension between art and activism would continue to shape African American cultural production for decades.

Economic factors played a complex role. White patrons often provided crucial financial support, but their involvement sometimes came with expectations that artists produce "authentic" black culture, potentially limiting artistic freedom. Some Harlem nightclubs catered primarily to white audiences seeking exotic entertainment, raising questions about exploitation and appropriation.

The Great Depression of the 1930s effectively ended the Harlem Renaissance as an organized movement. Economic collapse eliminated patronage and publishing opportunities, and many artists struggled to survive. However, the movement's impact extended far beyond its relatively brief existence.

The Harlem Renaissance established African American cultural production as a vital force in American arts. It demonstrated that black artists could succeed in mainstream cultural institutions while maintaining distinctive voices rooted in their own experiences. The movement influenced subsequent generations, from the Black Arts Movement of the 1960s to contemporary hip-hop culture, establishing patterns of cultural expression and self-definition that continue to resonate.

Moreover, the Harlem Renaissance challenged fundamental assumptions about race and culture in American society. By producing work of undeniable quality and sophistication, artists demonstrated the fallacy of claims about black intellectual inferiority. They asserted the right to define themselves rather than accepting definitions imposed by others, a principle that would become central to later civil rights movements.`
      },
      {
        num: 4,
        type: "natural_science",
        text: `Coral reefs, often called the rainforests of the sea, represent some of the most biodiverse and productive ecosystems on Earth. Despite occupying less than one percent of the ocean floor, these underwater structures support approximately 25% of all marine species, providing habitat, breeding grounds, and protection for an extraordinary variety of life forms. Understanding the biology of coral reefs and the threats they face has become increasingly urgent as climate change and human activities threaten their survival.

Corals themselves are colonial animals belonging to the phylum Cnidaria, related to jellyfish and sea anemones. Each coral colony consists of thousands of tiny individual polyps, typically only a few millimeters in diameter. These polyps secrete calcium carbonate skeletons that accumulate over time, forming the massive reef structures that can be visible from space. The Great Barrier Reef off Australia's coast, for example, extends over 2,300 kilometers and represents thousands of years of continuous coral growth.

The relationship between corals and microscopic algae called zooxanthellae represents one of nature's most remarkable symbiotic partnerships. These photosynthetic algae live within coral tissues, using sunlight to produce sugars through photosynthesis. The corals receive up to 90% of their nutrition from these algae, while providing the algae with protection and access to sunlight. This relationship explains why reef-building corals only thrive in shallow, clear waters where light can penetrate.

Coral reefs provide crucial ecosystem services beyond supporting marine biodiversity. They protect coastlines from storm damage and erosion, acting as natural breakwaters that absorb wave energy. The economic value is substantial: reefs support fishing industries, provide income through tourism, and serve as sources for medical compounds. Scientists have discovered anti-cancer and anti-inflammatory chemicals in reef organisms, suggesting potential pharmaceutical applications.

However, coral reefs worldwide face unprecedented threats. Rising ocean temperatures caused by climate change trigger coral bleaching events, where stressed corals expel their zooxanthellae partners. Without these algae, corals lose their color and primary food source. While corals can recover from short-term bleaching if temperatures decrease, prolonged heat stress results in coral death. Mass bleaching events have become increasingly frequent and severe, with the Great Barrier Reef experiencing major bleaching in 2016, 2017, and 2020.

Ocean acidification presents another significant threat. As atmospheric carbon dioxide levels increase, oceans absorb more CO2, forming carbonic acid that lowers ocean pH. This acidification reduces the availability of carbonate ions that corals need to build their calcium carbonate skeletons, effectively making it harder for corals to grow and maintain their structures. Some projections suggest that if current trends continue, ocean chemistry could make it impossible for corals to build reefs by the end of this century.

Local human impacts compound these global challenges. Overfishing removes herbivorous fish that control algae growth, allowing algae to overgrow and smother corals. Destructive fishing practices, including dynamite and cyanide fishing, directly destroy reef structures. Pollution from agricultural runoff introduces excess nutrients that fuel harmful algae blooms, while sediment from coastal development blocks sunlight needed by zooxanthellae. Tourism, while economically valuable, can damage reefs through careless anchor placement, diver contact, and boat groundings.

Despite these challenges, scientists and conservationists are developing innovative strategies to protect and restore coral reefs. Coral nurseries cultivate resilient coral fragments that can be transplanted to damaged reefs. Researchers are identifying naturally heat-resistant coral varieties and studying ways to enhance coral resilience through selective breeding or assisted evolution. Marine protected areas restrict fishing and other harmful activities, allowing reef ecosystems to recover.

Some promising developments involve manipulating the coral-algae relationship. Scientists have successfully introduced more heat-tolerant zooxanthellae strains to corals, potentially helping them survive warmer waters. Other researchers are exploring probiotics that might enhance coral health and disease resistance.

The fate of coral reefs ultimately depends on addressing climate change, as local conservation efforts cannot overcome global temperature increases and acidification. However, reducing local stressors can improve reef resilience, potentially buying time while broader climate action is pursued. The loss of coral reefs would represent not only an ecological catastrophe but also a humanitarian crisis for the hundreds of millions of people who depend on reefs for food and livelihood.`
      }
    ];

    console.log('📖 Creating Reading passages and questions...\n');

    // Insert passages
    const passageInserts = readingPassages.map(p => ({
      test_number: 1,
      passage_number: p.num,
      passage_type: p.type,
      passage_text: p.text,
      word_count: p.text.split(/\s+/).length
    }));

    const { data: insertedRead, error: rpErr } = await supabase
      .from('practice_test_reading_passages')
      .insert(passageInserts)
      .select('id, passage_number');

    if (rpErr) throw rpErr;

    const readPassageMap = {};
    insertedRead.forEach(p => { readPassageMap[p.passage_number] = p.id; });

    console.log(`✅ Inserted 4 passages (${passageInserts.map(p => p.word_count).join(', ')} words)\n`);

    // CREATE 40 QUESTIONS (10 per passage)
    const readingQs = [
      // Passage 1 - Q1-10
      { pNum: 1, qNum: 1, stem: "The passage is best described as:", a: "a historical account of quilting", b: "a personal narrative about learning a craft", c: "an instructional guide to quilting", d: "a biography of the narrator's grandmother", correct: "B", exp: "First-person account of learning quilting from grandmother" },
      { pNum: 1, qNum: 2, stem: "According to the passage, the narrator initially found quilting:", a: "easy and natural", b: "frustrating because of slow progress", c: "boring and pointless", d: "too difficult to continue", correct: "B", exp: "Text states narrator wanted 'immediate results' and found slow progress frustrating" },
      { pNum: 1, qNum: 3, stem: "The grandmother's statement 'Each stitch matters' primarily emphasizes:", a: "the technical difficulty of quilting", b: "the commercial value of quilts", c: "the importance of attention to detail", d: "the speed required for quilting", correct: "C", exp: "The phrase teaches patience and care in craftsmanship" },
      { pNum: 1, qNum: 4, stem: "The narrator describes the grandmother's hands as 'weathered' to suggest:", a: "she was old and frail", b: "she had worked hard throughout her life", c: "she needed help with quilting", d: "she lived in harsh conditions", correct: "B", exp: "'Weathered' suggests age and hard work, yet hands moved 'with surprising dexterity'" },
      { pNum: 1, qNum: 5, stem: "By the end of the summer, the narrator had completed:", a: "one quilt square", b: "three quilt squares", c: "four quilt squares", d: "an entire quilt", correct: "C", exp: "First square in July, then 'three more' in August = 4 total" },
      { pNum: 1, qNum: 6, stem: "The passage suggests that the narrator's main achievement was:", a: "mastering complex quilting patterns", b: "learning patience and appreciating tradition", c: "earning her grandmother's approval", d: "creating a valuable art object", correct: "B", exp: "Last paragraphs emphasize lessons beyond technique" },
      { pNum: 1, qNum: 7, stem: "The grandmother's quilting workshop is described in detail to:", a: "show her dedication to the craft", b: "explain why the house was messy", c: "criticize her housekeeping", d: "demonstrate wealth", correct: "A", exp: "Room 'transformed' with fabrics 'on every surface' shows commitment" },
      { pNum: 1, qNum: 8, stem: "The first quilt square reminded the narrator of:", a: "her grandmother's garden", b: "the ocean from a family trip", c: "the cottage on Maple Street", d: "a childhood bedroom", correct: "B", exp: "Blues and greens 'reminded me of the ocean...the previous summer'" },
      { pNum: 1, qNum: 9, stem: "The narrator's tone when describing the quilting experience is:", a: "resentful and bitter", b: "objective and detached", c: "nostalgic and appreciative", d: "humorous and lighthearted", correct: "C", exp: "Reflective, warm memories; values lessons learned" },
      { pNum: 1, qNum: 10, stem: "The framed quilt square serves as:", a: "a reminder of lessons learned", b: "proof of the narrator's skill", c: "a valuable decoration", d: "a way to honor quilting tradition", correct: "A", exp: "Final paragraph: 'reminder of those precious mornings' and grandmother's lesson" },

      // Passage 2 - Q11-20
      { pNum: 2, qNum: 11, stem: "According to the passage, food deserts are primarily characterized by:", a: "lack of any food retailers", b: "limited access to healthy food options", c: "high food prices", d: "absence of restaurants", correct: "B", exp: "Defined as areas lacking 'affordable, healthy food options'" },
      { pNum: 2, qNum: 12, stem: "The passage indicates that approximately how many Americans live in food deserts?", a: "10 million", b: "23.5 million", c: "33 million", d: "50 million", correct: "B", exp: "USDA research: '23.5 million Americans'" },
      { pNum: 2, qNum: 13, stem: "Major grocery chains avoid low-income neighborhoods primarily due to:", a: "lack of consumer demand", b: "government regulations", c: "perceived lower profits and higher costs", d: "difficulty finding employees", correct: "C", exp: "'perceived lower profit margins and higher operating costs'" },
      { pNum: 2, qNum: 14, stem: "Which solution is NOT mentioned in the passage?", a: "Mobile markets", b: "Tax incentives for stores", c: "Government food stamps", d: "Community gardens", correct: "C", exp: "Passage doesn't mention food stamp programs" },
      { pNum: 2, qNum: 15, stem: "The author suggests that simply increasing food access:", a: "will completely solve the problem", b: "is the only solution needed", c: "must be combined with education", d: "is impossible to achieve", correct: "C", exp: "'Education programs...must accompany infrastructure improvements'" },
      { pNum: 2, qNum: 16, stem: "According to the passage, food deserts are most likely to impact:", a: "suburban families", b: "rural farming communities", c: "wealthy urban areas", d: "low-income minority communities", correct: "D", exp: "'disproportionate impact on minority communities' in low-income areas" },
      { pNum: 2, qNum: 17, stem: "The Healthy Food Financing Initiative is described as:", a: "a local community program", b: "a federal financing program", c: "a private charity", d: "a grocery store company", correct: "B", exp: "'federal program launched in 2010'" },
      { pNum: 2, qNum: 18, stem: "The passage's main purpose is to:", a: "criticize grocery store chains", b: "explain food deserts and potential solutions", c: "promote community gardens", d: "describe one city's success story", correct: "B", exp: "Comprehensive overview of problem, causes, and solutions" },
      { pNum: 2, qNum: 19, stem: "Technology's role in addressing food deserts includes:", a: "online ordering and delivery services", b: "growing food in laboratories", c: "automated grocery stores", d: "virtual cooking classes", correct: "A", exp: "'online ordering and delivery services' mentioned explicitly" },
      { pNum: 2, qNum: 20, stem: "The author's tone toward food deserts can best be described as:", a: "alarmed and pessimistic", b: "neutral and objective", c: "concerned but hopeful", d: "angry and accusatory", correct: "C", exp: "Presents problem seriously but discusses 'promising' solutions" },

      // Passage 3 - Q21-30
      { pNum: 3, qNum: 21, stem: "The Harlem Renaissance primarily occurred during:", a: "the 1900s-1910s", b: "the 1920s-1930s", c: "the 1940s-1950s", d: "the 1960s-1970s", correct: "B", exp: "First sentence: 'flourished in the 1920s and 1930s'" },
      { pNum: 3, qNum: 22, stem: "The Great Migration refers to:", a: "European immigration to America", b: "movement of African Americans to northern cities", c: "artists moving to Harlem", d: "people leaving cities for suburbs", correct: "B", exp: "'hundreds of thousands of African Americans from rural South to northern cities'" },
      { pNum: 3, qNum: 23, stem: "Langston Hughes' poem 'The Negro Speaks of Rivers' is described as:", a: "a protest against discrimination", b: "connecting black identity to ancient civilizations", c: "celebrating modern urban life", d: "describing the Mississippi River", correct: "B", exp: "'connected African American identity to ancient civilizations'" },
      { pNum: 3, qNum: 24, stem: "The Cotton Club was primarily associated with:", a: "Langston Hughes' poetry", b: "Zora Neale Hurston's writing", c: "Duke Ellington's jazz", d: "W.E.B. Du Bois' magazine", correct: "C", exp: "'Duke Ellington's sophisticated compositions at the Cotton Club'" },
      { pNum: 3, qNum: 25, stem: "According to the passage, artists debated whether:", a: "Harlem was the best location", b: "art should serve political goals", c: "white patrons should be allowed", d: "jazz was serious music", correct: "B", exp: "'tension between art and activism' - should art advance civil rights or be valued for its own sake" },
      { pNum: 3, qNum: 26, stem: "The passage suggests white patrons:", a: "were universally beneficial", b: "had no significant impact", c: "provided support but had limitations", d: "prevented artistic success", correct: "C", exp: "'crucial financial support' but 'sometimes came with expectations'" },
      { pNum: 3, qNum: 27, stem: "What ended the Harlem Renaissance as an organized movement?", a: "World War II", b: "The Great Depression", c: "Government censorship", d: "Loss of interest", correct: "B", exp: "'Great Depression...effectively ended the Harlem Renaissance'" },
      { pNum: 3, qNum: 28, stem: "The passage compares Aaron Douglas' work to:", a: "European impressionism", b: "African aesthetics with modernist techniques", c: "traditional American art", d: "abstract expressionism", correct: "B", exp: "'blended African aesthetic elements with modernist techniques'" },
      { pNum: 3, qNum: 29, stem: "The author's main argument is that the Harlem Renaissance:", a: "was brief and had little impact", b: "only affected literature", c: "had lasting influence beyond its era", d: "failed to achieve its goals", correct: "C", exp: "Concluding paragraphs emphasize ongoing impact and legacy" },
      { pNum: 3, qNum: 30, stem: "W.E.B. Du Bois contributed primarily through:", a: "writing poetry", b: "painting murals", c: "composing music", d: "publishing The Crisis magazine", correct: "D", exp: "'through his magazine The Crisis, provided platform'" },

      // Passage 4 - Q31-40
      { pNum: 4, qNum: 31, stem: "The passage states that coral reefs support approximately what percentage of marine species?", a: "1%", b: "10%", c: "25%", d: "50%", correct: "C", exp: "'support approximately 25% of all marine species'" },
      { pNum: 4, qNum: 32, stem: "Zooxanthellae are best described as:", a: "predators of coral", b: "photosynthetic algae living in coral", c: "coral larvae", d: "fish that protect coral", correct: "B", exp: "'microscopic algae called zooxanthellae...photosynthetic algae live within coral tissues'" },
      { pNum: 4, qNum: 33, stem: "Corals receive what percentage of nutrition from zooxanthellae?", a: "25%", b: "50%", c: "75%", d: "90%", correct: "D", exp: "'corals receive up to 90% of their nutrition from these algae'" },
      { pNum: 4, qNum: 34, stem: "Coral bleaching occurs when:", a: "corals die from disease", b: "corals expel their algae partners", c: "predators attack corals", d: "corals reproduce", correct: "B", exp: "'stressed corals expel their zooxanthellae partners'" },
      { pNum: 4, qNum: 35, stem: "Ocean acidification makes it harder for corals to:", a: "reproduce", b: "catch food", c: "build calcium carbonate skeletons", d: "host zooxanthellae", correct: "C", exp: "'reduces availability of carbonate ions that corals need to build...skeletons'" },
      { pNum: 4, qNum: 36, stem: "The Great Barrier Reef experienced major bleaching in all EXCEPT:", a: "2016", b: "2017", c: "2019", d: "2020", correct: "C", exp: "Passage lists 2016, 2017, and 2020, not 2019" },
      { pNum: 4, qNum: 37, stem: "Which is NOT mentioned as a local threat to reefs?", a: "Overfishing", b: "Oil spills", c: "Pollution from runoff", d: "Destructive fishing practices", correct: "B", exp: "Passage doesn't mention oil spills" },
      { pNum: 4, qNum: 38, stem: "Coral nurseries are used to:", a: "study coral reproduction", b: "cultivate coral for transplanting", c: "grow zooxanthellae", d: "attract tourists", correct: "B", exp: "'cultivate resilient coral fragments that can be transplanted'" },
      { pNum: 4, qNum: 39, stem: "The author suggests that coral reef survival ultimately depends on:", a: "local conservation only", b: "creating marine protected areas", c: "addressing climate change", d: "developing probiotics", correct: "C", exp: "'fate...ultimately depends on addressing climate change'" },
      { pNum: 4, qNum: 40, stem: "The passage's primary purpose is to:", a: "describe coral biology and conservation challenges", b: "criticize government policies", c: "promote tourism restrictions", d: "explain photosynthesis", correct: "A", exp: "Comprehensive overview of coral biology, threats, and solutions" }
    ];

    const questionInserts = readingQs.map(q => ({
      test_number: 1,
      question_number: q.qNum,
      passage_id: readPassageMap[q.pNum],
      question_text: q.stem,
      choices: JSON.stringify([
        `A. ${q.a}`,
        `B. ${q.b}`,
        `C. ${q.c}`,
        `D. ${q.d}`
      ]),
      correct_answer: answerToIndex(q.correct),
      explanation: q.exp,
      question_type: "general",
      difficulty: q.qNum % 10 <= 3 ? "easy" : (q.qNum % 10 <= 7 ? "medium" : "hard")
    }));

    const { error: rqErr } = await supabase
      .from('practice_test_reading_questions')
      .insert(questionInserts);

    if (rqErr) throw rqErr;

    console.log('✅ Inserted 40 questions (10 per passage)\n');

    console.log('═══════════════════════════════════════════════');
    console.log('✅ READING SECTION COMPLETE');
    console.log('═══════════════════════════════════════════════');
    console.log('   • 4 passages (600-700 words each)');
    console.log('   • 40 questions\n');

    console.log('✅ DATABASE STATUS:');
    console.log('   • English: 5 passages, 75 questions ✓');
    console.log('   • Math: 60 questions ✓');
    console.log('   • Reading: 4 passages, 40 questions ✓');
    console.log('   • Science: Pending\n');

  } catch (error) {
    console.error('❌ ERROR:', error.message);
    process.exit(1);
  }
}

insertReading();
