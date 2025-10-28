#!/usr/bin/env node
/**
 * MANUAL PASSAGE UPDATE SCRIPT
 * Updates English passages with manually provided complete text
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function updatePassage(testNumber, passageNumber, passageText, passageTitle = null) {
  console.log(`\n📝 Updating Test ${testNumber}, Passage ${passageNumber}...`);

  // Calculate word count
  const wordCount = passageText.split(/\s+/).filter(w => w.length > 0).length;

  // Update the passage
  const updateData = {
    passage_text: passageText.trim(),
    word_count: wordCount
  };

  if (passageTitle) {
    updateData.passage_title = passageTitle;
  }

  const { data, error } = await supabase
    .from('practice_test_english_passages')
    .update(updateData)
    .eq('test_number', testNumber)
    .eq('passage_number', passageNumber)
    .select();

  if (error) {
    console.log(`  ❌ Error: ${error.message}`);
    return false;
  }

  if (data && data.length > 0) {
    console.log(`  ✅ Updated successfully!`);
    console.log(`  📊 Word count: ${wordCount}`);
    console.log(`  📄 Preview: ${passageText.substring(0, 100)}...`);
    return true;
  } else {
    console.log(`  ⚠️  No passage found for Test ${testNumber}, Passage ${passageNumber}`);
    return false;
  }
}

// Test 1, Passage 1: Double the Manta Rays (MANUALLY REVIEWED & CORRECTED)
const test1_passage1 = `<u id="q1">There are thousands of new animal species identified</u> each year, the vast majority are small or geographically isolated. So as graduate student Andrea Marshall studied manta rays, which are neither small nor isolated, she didn't expect to identify a new species. <u id="q2">Mantas, which are</u> plankton-eating relatives of stingrays that look like pairs of enormous black <u id="q3">wings—up to twenty-five feet wide—</u>flying slowly through the water. Encompassing wide swaths of both temperate and tropical oceans, the manta's range abuts every continent but Antarctica.

During Marshall's research off the coast of Mozambique, she observed intriguing physical <u id="q4">variations, in the mantas</u> she swam amongst. <u id="q5">Her beachside lodgings in Mozambique now house the Marine Megafauna Research Center.</u> She began to suspect that the one recognized species of manta might in fact be two species.

[1] To investigate, Marshall began collecting data. [2] <u id="q8">Some of the data were basic, such as manta coloration and size.</u> Other data required a closer look. [3] The skin of all mantas, for example, <u id="q6">is</u> embedded with tiny, toothlike "denticles." [4] Marshall found that denticles on some mantas were randomly spaced and occasionally overlapped, whereas denticles on other mantas were evenly spaced and never overlapped. [5] Another discovery <u id="q7">was: that</u> some mantas had egg-shaped masses at the base of their tail fins. [6] Each mass contained a bony spine about an inch long—the vestige of a stinging barb from the manta's ancestors.

In 2009, Marshall <u id="q9">announced, with two other scientists,</u> that indeed there are two manta species. The reef manta, Manta alfredi, <u id="q10">is</u> the smaller and more common of the two. Thriving in shallow water, it <u id="q11">kind of sticks around one area.</u> In contrast, the giant manta, Manta birostris, favors deep water and migrates thousands of miles a year. The fact that such large animals went undifferentiated for so long <u id="q12">highlights how little scientists know about</u> these gentle giants. <u id="q13">At the moment,</u> manta ray populations face an array of threats worldwide.`;

// Test 1, Passage 2: Origins of Aspirin (MANUALLY REVIEWED & CORRECTED)
const test1_passage2 = `When a plant is attacked by bacteria, fungi, or insects, it produces chemicals, called salicylates, that help the plant produce enzymes or toxins capable of destroying the plant's attackers. Salicylates may also play a role in the plant's ability to regulate its temperature<u id="q16">; in effect, helping</u> the plant tolerate heat and cold. Humans have used the salicylic acids found in <u id="q17">plants, particularly in the bark</u> of the willow tree, to fight disease and to reduce fevers.

The first known references to willow bark's medicinal use date from ancient Egypt and Sumeria. On a Sumerian stone tablet from 3000 BCE, <u id="q18">lists willow</u> among dozens of plants used to treat illnesses. An Egyptian papyrus from <u id="q19">approximately about</u> 1534 BCE refers to willow's use as an all-purpose medicine.

<u id="q20">Though willow trees are often found near water and have become religious symbols in many cultures,</u> its medicinal use gradually fell out of favor in Europe. Apothecaries increasingly <u id="q21">preferred</u> the imported bark of South American cinchona trees as a fever reducer, even though willow grew abundantly throughout Europe. The high cost of importing cinchona <u id="q22">bark however, was</u> expensive.

<u id="q23">Consequently,</u> in the mid-1700s, English minister Edward Stone <u id="q24">had began</u> to seek a substitute. He <u id="q25">noted</u> that the bitter taste of willow bark was reminiscent of the bitter taste of cinchona bark. <u id="q26">Known also for his interest in astronomy, Stone</u> pulverized some willow bark and <u id="q27">adds its</u> powder to a liquid. He <u id="q28">administered the medicine to</u> people suffering from <u id="q29">fevers, he then noted</u> that it worked.

As the field of medicine evolved, so did the use of willow bark. Searching for a way to make the salicylic acid in willow bark less abrasive to the stomach, in 1853 French chemist Charles von Gerhardt created a synthetic version. Decades later, German chemist Felix Hoffmann combined synthetic salicylic acid with acetic acid, inventing a consumer-friendly powdered formula that would come to be known as aspirin.`;

// Test 1, Passage 3: Good Vibrations (MANUALLY REVIEWED & CORRECTED)
const test1_passage3 = `In his studio in Dusseldorf, Germany, <u id="q31">paint is what photographer Martin Klimas</u> carefully pours onto a rubber membrane placed on top of an audio speaker. The paint collects in a puddle of <u id="q32">colors; rich oranges and powder blues,</u> hot pinks and electric yellows. Klimas attaches his camera to a <u id="q33">tripod and positions</u> the camera so it is <u id="q34">level with</u> the paint puddle. He then sets a sound trigger (a device that automatically snaps a photo when a given sound level is reached) on his camera. Finally, he inserts Daft Punk's Homework CD into a stereo, <u id="q35">cranks up the volume to ten,</u> and pushes Play.

The result is what Klimas calls a "sonic sculpture." The vibrations produced by Daft Punk's dance anthem "Around the World" <u id="q36">cause</u> the paint to rise and form <u id="q37">this image that Klimas's camera captures—sound</u> visually rendered by the effects of the vibrations on the paint. Although Klimas's photographs only capture an instant of the paint erupting in arcs of color, each of the photographs is unique to a given song. "I leave the creation of the picture to the sound itself," <u id="q38">Klimas says,</u>

Klimas's idea for his sonic sculptures <u id="q39">were sparked</u> by the <u id="q40">experiments, of Swiss scientist, Hans</u> Jenny. In the 1960s, <u id="q41">Jenny's study on</u> the effects of sound vibrations on various materials. For example, Jenny discovered that low sonic tones caused powdery substances to form into uniform lines, while deeper tones caused the same powder to form into more nuanced patterns. <u id="q42">[2]</u> Klimas relies on similar principles, only with a more compelling component: music. Klimas has photographed sonic sculptures of classical music by Wagner and Bach; jazz by Miles Davis, Charlie Parker, and John Coltrane; and psychedelic rock by Pink Floyd and Jimi Hendrix. While he acknowledges that all forms of music can generate sonic <u id="q43">sculptures. Klimas</u> says, "I typically select something dynamic and percussive."

<u id="q44">That would certainly impress Jenny.</u> After all, to create his art, Klimas needs his paint to get up and dance.`;

// Test 1, Passage 4: Building and Rebuilding "the King of Roads" (MANUALLY REVIEWED & CORRECTED)
const test1_passage4 = `Separating Oregon from Washington, the Columbia River Gorge is eighty-five miles of flowing <u id="q46">water, there are tree-covered bluffs, and</u> roaring waterfalls. These striking features <u id="q47">daunted</u> would-be road builders until 1913. That year, Samuel Hill and Samuel Lancaster, a businessman and an engineer, respectively, began constructing a road through the gorge to connect the towns along the river. [1] Their design went beyond <u id="q48">practicalities it</u> showcased the scenic grandeur of the <u id="q49">gorge where the Columbia River is located.</u>

[2] The Columbia River Highway was a marvel. [A] Roadside overlooks with benches <u id="q50">for sitting by the road</u> offered travelers the chance to take in a view <u id="q51">of</u> the river or a waterfall. Guardrails made of local rock lined the route and blurred the distinction between <u id="q52">that and</u> environment. [B] Engineers created <u id="q53">openings</u> in the side of one <u id="q54">tunnel; enabling</u> motorists surrounded by rock to glimpse the river below. [C] Completed in 1922, the highway earned the local nickname "the King of Roads."

[3] <u id="q55">Impressive as it was,</u> the highway was soon outmoded because of increased traffic and larger vehicles. In time, Oregon built a new road along the Columbia; much of the highway was destroyed to make room, while other stretches were abandoned. By 1954, only the western third of the <u id="q56">original road</u> was still in use, mainly by tourists seeking waterfalls. [D]

In the 1980s, however, local people's interest in the original highway <u id="q57">abounded.</u> In 1981, the National Park Service offered suggestions for restoring parts of the road and repurposing unused sections of it as a trail. Since then, crumbling stone guardrails along the roadside have been repaired. Damaged bridges and viaducts have been rebuilt. <u id="q58">Tunnels, now empty and strong. had</u> rubble removed from them. Today, hikers and bikers on the Historic Columbia River Highway Trail experience <u id="q59">a site that became a National Historic Landmark in 2000.</u>`;

// Test 1, Passage 5: Selling Hip-Hop (MANUALLY REVIEWED & CORRECTED)
const test1_passage5 = `One night in the late seventies, at a popular club in New York City, <u id="q61">singer and music producer Sylvia Robinson</u> had a revelation. At the time, hip-hop subculture—based on dance, visual art, and music art forms—<u id="q62">were emerging</u> as a phenomenon. Robinson watched as DJ Lovebug Starski spun records for the crowd and rapped over the instrumental breaks in the music. Every time the DJ chanted, "Throw your hands in the air," everyone <u id="q63">obeyed,</u> Robinson could hear the enthusiasm shared between the hip-hop performer and his audience. She knew she had to capture that excitement on record.

Robinson wasted no time in recruiting three aspiring <u id="q64">rappers: Big Bank Hank, Master Gee, and Wonder Mike—</u> to record on her label as the Sugarhill Gang. <u id="q65">[1]</u> Wanting to re-create the feel-good vibe of the music she'd heard, <u id="q66">an upbeat disco record provided the background that</u> the rappers rhymed over. The resulting track, "Rapper's <u id="q67">Delight.</u> sold fourteen million copies<u id="q68">; Robinson had</u> produced the first rap record to break into the charts.

<u id="q69">Nevertheless,</u> Robinson's musical instincts and business savvy had served her well with the Sugarhill Gang. <u id="q70">However,</u> there was more to hip-hop music than party-ready club anthems. She hoped to capitalize on her success by expanding the genre<u id="q71">;</u> Robinson signed Grandmaster Flash and the Furious Five, a group that already had a following, to her label.

Robinson allowed the group to record a track that studio musician Edward Fletcher had written. The track, titled "The Message," <u id="q72">broke</u> new commercial hip-hop ground by addressing harsh realities of inner-city life. It was a far cry from the more digestible singles the group had previously released, <u id="q73">because</u> the rappers were hesitant to record it. But Robinson believed it was a surefire hit. <u id="q74">Eventually,</u> Fletcher and Melle Mel (one of the Furious Five) recorded the track, which became the group's biggest hit.

<u id="q75">[4]</u> Its socially conscious rhymes helped usher in a new generation of artists and secured Robinson's legacy in the landscape of commercial hip-hop.`;

async function main() {
  console.log('🔧 MANUAL PASSAGE UPDATE - TEST 1 COMPLETE\n');
  console.log('='.repeat(80) + '\n');

  await updatePassage(1, 1, test1_passage1, 'Double the Manta Rays');
  await updatePassage(1, 2, test1_passage2, 'Origins of Aspirin');
  await updatePassage(1, 3, test1_passage3, 'Good Vibrations');
  await updatePassage(1, 4, test1_passage4, 'Building and Rebuilding "the King of Roads"');
  await updatePassage(1, 5, test1_passage5, 'Selling Hip-Hop');

  console.log('\n' + '='.repeat(80));
  console.log('\n✅ TEST 1 COMPLETE! All 5 passages updated with proper formatting!\n');
}

main().catch(console.error);
