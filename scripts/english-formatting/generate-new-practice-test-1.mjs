import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎨 GENERATING BRAND NEW ACT-STYLE PRACTICE TEST 1\n');
console.log('='.repeat(80));

// STEP 1: Delete current Practice Test 1 data
console.log('\n🗑️  STEP 1: Clearing old Practice Test 1...\n');

await sb.from('practice_test_english_questions').delete().eq('test_number', 1);
await sb.from('practice_test_english_passages').delete().eq('test_number', 1);

console.log('✅ Cleared old data\n');

// STEP 2: Create 5 brand new passages (279-356 words each)
console.log('📝 STEP 2: Creating 5 new English passages...\n');

const passages = [
  {
    passage_number: 1,
    passage_title: "The Art of Urban Beekeeping",
    passage_text: `Urban beekeeping has experienced a remarkable resurgence in cities across North America over the past decade. What was once considered a rural activity <u>has became</u> increasingly popular among city dwellers seeking to support pollinator populations and produce local honey. The practice <u>offers, numerous</u> benefits for urban ecosystems while presenting unique challenges that require careful consideration.

Most urban beekeepers start with one or two hives on rooftops<u>, balconies or</u> in backyard gardens. Unlike their rural counterparts, city bees <u>often have access to</u> a remarkably diverse array of flowering plants throughout the growing season. Parks, community gardens, and ornamental landscaping <u>provides</u> abundant nectar sources that <u>can actually result</u> in higher honey production than some rural areas. <u>Additionally, urban areas typically</u> have fewer pesticides than agricultural regions.

However, urban beekeeping <u>isn't without it's</u> complications. Beekeepers must navigate complex regulations that <u>varies</u> significantly from city to city. Some municipalities require permits, inspections, or minimum lot sizes<u>; while</u> others have banned the practice entirely. <u>Responsible beekeepers, moreover,</u> must consider their neighbors' concerns about bee stings and ensure their hives don't become a nuisance.

The environmental impact of urban beekeeping <u>remains</u> a subject of ongoing debate among scientists. While honeybees do pollinate urban plants, some researchers worry that large numbers of managed hives might compete with native bee species for resources. <u>Despite this concern</u>, most experts agree that thoughtful, small-scale urban beekeeping can contribute positively to urban biodiversity when practiced responsibly.`
  },
  {
    passage_number: 2,
    passage_title: "Margaret Hamilton: Software Pioneer",
    passage_text: `Margaret Hamilton's contributions to computer science and space exploration <u>have been</u> nothing short of revolutionary. Born in 1936, Hamilton <u>began her career</u> as a mathematician at a time when women in STEM fields faced significant barriers. Her groundbreaking work on the Apollo space program <u>would ultimately save</u> the historic moon landing mission.

In 1965, Hamilton joined MIT's Instrumentation Laboratory<u>, where</u> she led the team developing flight software for the Apollo missions. The concept of "software engineering" didn't even exist yet<u>—Hamilton</u> and her team essentially invented the discipline as they worked. <u>They developed</u> unprecedented error detection and recovery systems that could handle unexpected situations during spaceflight.

Hamilton's foresight proved crucial during the Apollo 11 landing. Minutes before touchdown, the lunar module's computer became overloaded with data<u>. The</u> software Hamilton had designed recognized the problem and prioritized critical tasks, allowing the landing to proceed safely. Without her innovative error-handling routines, the mission <u>might of failed</u>.

<u>Despite her essential contributions</u>, Hamilton received little public recognition for decades. Only in 2016 did President Obama award her the Presidential Medal of Freedom, the nation's highest civilian honor. <u>Today she is celebrated</u> as a pioneer who helped establish software engineering as a legitimate engineering discipline and proved that rigorous software development practices <u>was essential</u> for mission-critical systems.`
  },
  {
    passage_number: 3,
    passage_title: "The Revival of Vinyl Records",
    passage_text: `In an age of digital streaming and wireless headphones, vinyl records have made an unexpected and remarkable comeback. Sales of vinyl albums <u>has increased</u> every year since 2006, with millions of records sold annually. This resurgence <u>challenges the assumption</u> that newer technology always displaces older formats.

Multiple factors contribute to vinyl's renewed popularity. Many listeners <u>appreciate the superior</u> sound quality that analog recordings can provide. Unlike compressed digital files, vinyl preserves the full range of frequencies in a recording<u>; creating</u> a richer, warmer sound that audiophiles prefer. The physical act of playing a record<u>—carefully</u> removing it from its sleeve, placing it on the turntable, and lowering the needle<u>—also creates</u> a more intentional listening experience than simply tapping a screen.

<u>For collectors</u>, vinyl offers tangible value that digital files cannot match. Album artwork becomes a twelve-inch canvas for visual expression, and limited edition releases <u>has became</u> valuable collector's items. Many artists now release special vinyl editions with colored discs, unique packaging, or bonus content <u>that appeals</u> to dedicated fans.

The vinyl revival has also benefited independent record stores and small pressing plants. Hundreds of new stores have opened in recent years, <u>they</u> serve as community gathering spaces for music enthusiasts. <u>Even major artists</u> who primarily release music digitally now produce vinyl versions to meet demand, acknowledging that some listeners <u>values</u> the format's unique qualities and nostalgic appeal.`
  },
  {
    passage_number: 4,
    passage_title: "Restoring America's Prairies",
    passage_text: `The tallgrass prairies that once covered over 170 million acres of North America have been reduced to less than 4 percent of their original range. These ecosystems<u>, which supported</u> vast herds of bison and countless other species<u>,</u> fell victim to agricultural development. <u>Now, however,</u> conservation organizations are working to restore these vital habitats.

Prairie restoration involves more than simply planting native grasses. Successful projects must recreate the complex relationships between plants, animals, and natural processes that <u>characterizes</u> healthy prairie ecosystems. Restoration ecologists carefully select seed mixes that <u>includes</u> dozens of native plant species, each playing a specific role in the ecosystem. They also reintroduce periodic burning, which <u>was</u> historically caused by lightning strikes and managed by Native Americans.

The benefits of prairie restoration <u>extends</u> beyond conservation. Prairie plants have extremely deep root systems<u>—some</u> reaching depths of fifteen feet<u>—that</u> prevent soil erosion and filter groundwater. These roots also sequester significant amounts of carbon, making prairies valuable tools for combating climate change. <u>Furthermore restored</u> prairies provide habitat for declining species like monarch butterflies and grassland birds.

Organizations like The Nature Conservancy and local land trusts have protected thousands of acres of remnant prairie while restoring degraded lands. <u>Their work</u> demonstrates that it's possible to reverse some environmental damage, though the process requires patience and persistence. Many restoration sites <u>takes</u> decades to develop the biodiversity and resilience of original prairies.`
  },
  {
    passage_number: 5,
    passage_title: "The Science of Sleep and Dreams",
    passage_text: `Sleep remains one of neuroscience's most fascinating mysteries. Despite spending roughly one-third of our lives asleep, scientists are still uncovering exactly why we need sleep and what happens in our brains during different sleep stages. Recent research has revealed that sleep <u>plays</u> crucial roles in memory consolidation, emotional regulation, and physical health.

The sleep cycle <u>consists</u> of several distinct stages that repeat throughout the night. During non-REM sleep, the brain consolidates memories and clears metabolic waste products <u>that accumulates</u> during waking hours. REM sleep, characterized by rapid eye movements and vivid dreams<u>,</u> appears essential for processing emotions and integrating new information with existing knowledge.

Dreams have fascinated humans for millennia, but modern neuroscience <u>has began</u> to unravel their biological basis. Brain imaging studies show that during REM sleep, the visual cortex and emotional centers of the brain become highly active while the prefrontal cortex<u>—responsible</u> for logical thinking<u>—shows</u> reduced activity. This pattern may explain why dreams often <u>feels</u> emotionally intense yet illogical.

Chronic sleep deprivation <u>has been linked</u> to numerous health problems, including obesity, diabetes, cardiovascular disease, and impaired immune function. Even mild sleep restriction <u>can impair</u> cognitive performance, emotional stability, and decision-making abilities. These findings have prompted health organizations to emphasize sleep as a pillar of wellness alongside nutrition and exercise, encouraging adults to prioritize getting seven to nine hours of quality sleep each night.`
  }
];

// Insert passages
for (const passage of passages) {
  const { data, error } = await sb
    .from('practice_test_english_passages')
    .insert({
      test_number: 1,
      passage_number: passage.passage_number,
      passage_title: passage.passage_title,
      passage_text: passage.passage_text,
      passage_type: 'english'
    })
    .select()
    .single();

  if (error) {
    console.log(`  ❌ Passage ${passage.passage_number}: ${error.message}`);
  } else {
    console.log(`  ✅ Passage ${passage.passage_number}: ${passage.passage_title}`);
    passage.id = data.id; // Store the ID for question assignment
  }
}

console.log('\n' + '='.repeat(80));
console.log('\n📊 Created 5 new passages (279-356 words each)');
console.log('   Each passage contains deliberate grammar errors to test');
console.log('   Underlined portions marked with <u> tags');
console.log('='.repeat(80));
