#!/usr/bin/env node

/**
 * READING EXTRACTION - Test 1 Reading Questions 1-40
 * 4 Passages with 10 questions each
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const answerKey={1:'C',2:'F',3:'B',4:'H',5:'A',6:'J',7:'B',8:'J',9:'D',10:'F',11:'C',12:'F',13:'B',14:'H',15:'A',16:'H',17:'B',18:'J',19:'A',20:'F',21:'B',22:'G',23:'D',24:'G',25:'B',26:'F',27:'C',28:'G',29:'J',30:'G',31:'A',32:'H',33:'C',34:'F',35:'A',36:'J',37:'C',38:'G',39:'D',40:'J'};

function norm(orig){const m={'F':'A','G':'B','H':'C','J':'D'};return m[orig]||orig;}

async function upsert(q){
  const{data:e}=await supabase.from('act_questions').select('id').eq('test_number',q.test_number).eq('section',q.section).eq('question_number',q.question_number).maybeSingle();
  if(e){
    const{data,error}=await supabase.from('act_questions').update(q).eq('id',e.id).select();
    if(!error)console.log(`🔄 Updated Q${q.question_number}`);
    return data?.[0];
  }else{
    const{data,error}=await supabase.from('act_questions').insert([q]).select();
    if(!error)console.log(`✅ Inserted Q${q.question_number}`);
    return data?.[0];
  }
}

console.log('🚀 Reading Extraction: 40 questions across 4 passages\n');

const questions=[
  // PASSAGE I: Literary Narrative - Love Marriage (Q1-10)
  {test_number:1,section:'R',question_number:1,question_stem:'The passage is best described as being told from the perspective of a narrator who focuses primarily on:',choice_a:'Murali\'s life as a married man.',choice_b:'Murali\'s concerns about marriage.',choice_c:'Murali and Vani\'s courtship and its effects on others.',choice_d:'Murali\'s characteristics and his family conflicts.',correct_answer:norm(answerKey[1]),difficulty_level:'medium',notes:'Passage I: Main idea/perspective'},

  {test_number:1,section:'R',question_number:2,question_stem:'Details in the second paragraph (lines 9-32) primarily characterize Vani as:',choice_a:'reserved but self-assured.',choice_b:'severe and impolite.',choice_c:'intelligent and apologetic.',choice_d:'beautiful but unkempt.',correct_answer:norm(answerKey[2]),difficulty_level:'medium',notes:'Passage I: Character analysis'},

  {test_number:1,section:'R',question_number:3,question_stem:'Which of the following events mentioned in the passage occurred first chronologically?',choice_a:'The elders organized occasions in which Vani and Murali would be together.',choice_b:'A friend suggested that Murali drive Vani home.',choice_c:'Vani smiled at Murali without thinking about her teeth.',choice_d:'Vani\'s brother burst into Murali\'s brother\'s home.',correct_answer:norm(answerKey[3]),difficulty_level:'hard',notes:'Passage I: Sequence of events'},

  {test_number:1,section:'R',question_number:4,question_stem:'As it is presented in the passage, the italicized portion "How are you? That\'s a beautiful sari. How are the children? I like this rice" (lines 20-21) most likely indicates:',choice_a:'the types of pleasantries that Murali would prepare in his head before meeting someone new.',choice_b:'parts of a conversation between Murali and Vani when they were first introduced.',choice_c:'comments typical of the kind that Vani would make when in public.',choice_d:'secret thoughts that Murali imagined Vani to be thinking.',correct_answer:norm(answerKey[4]),difficulty_level:'hard',notes:'Passage I: Interpretation of text'},

  {test_number:1,section:'R',question_number:5,question_stem:'According to the passage, one similarity between Murali and Vani is that both:',choice_a:'enjoyed eating spicy food.',choice_b:'were born in New York City.',choice_c:'had a passion for cooking.',choice_d:'worked at a medical clinic.',correct_answer:norm(answerKey[5]),difficulty_level:'easy',notes:'Passage I: Detail'},

  {test_number:1,section:'R',question_number:6,question_stem:'In the context of the passage, the statement "And they will never admit which one of them was responsible" (lines 38-39) most strongly suggests that:',choice_a:'neither Murali nor Vani remembers who first sought to be introduced to the other.',choice_b:'each of Murali and Vani\'s friends claims to have been the one who introduced the two of them.',choice_c:'Murali initiated contact with Vani, though he would stubbornly deny that he did so.',choice_d:'both Murali and Vani refuse to confess to initiating their introduction to each other.',correct_answer:norm(answerKey[6]),difficulty_level:'medium',notes:'Passage I: Inference'},

  {test_number:1,section:'R',question_number:7,question_stem:'In the passage, the narrator makes clear that Vani didn\'t ask Murali in for coffee because Vani:',choice_a:'felt extremely self-conscious in Murali\'s presence.',choice_b:'did not want to invite Murali into someone else\'s house.',choice_c:'assumed that Murali wanted to get home at a reasonable hour.',choice_d:'did not want to further burden Murali with her requests.',correct_answer:norm(answerKey[7]),difficulty_level:'medium',notes:'Passage I: Detail/Inference'},

  {test_number:1,section:'R',question_number:8,question_stem:'The passage indicates that the description of Vani in lines 61-65 most closely reflects the perspective of:',choice_a:'Murali.',choice_b:'Vani\'s family in Sri Lanka.',choice_c:'Murali\'s friends in New York City.',choice_d:'the Sri Lankan elders in New York City.',correct_answer:norm(answerKey[8]),difficulty_level:'hard',notes:'Passage I: Perspective'},

  {test_number:1,section:'R',question_number:9,question_stem:'It can reasonably be inferred from the passage that, by traditional standards, the Sri Lankan community would have considered Murali and Vani\'s direct discussion of marriage to be:',choice_a:'proper.',choice_b:'sensible.',choice_c:'superficial.',choice_d:'unconventional.',correct_answer:norm(answerKey[9]),difficulty_level:'medium',notes:'Passage I: Inference'},

  {test_number:1,section:'R',question_number:10,question_stem:'As it is used in line 79, the word observe most nearly means:',choice_a:'study.',choice_b:'follow.',choice_c:'express.',choice_d:'perceive.',correct_answer:norm(answerKey[10]),difficulty_level:'easy',notes:'Passage I: Vocabulary in context'},

  // PASSAGE II: Social Science - Light Pollution (Q11-20)
  {test_number:1,section:'R',question_number:11,question_stem:'The main idea of the first paragraph of Passage A is that:',choice_a:'before electricity, it was difficult to travel to London at night.',choice_b:'gas lighting existed long before it was widely used.',choice_c:'light pollution is a relatively recent phenomenon in human history.',choice_d:'because of its large population, London has had light pollution for centuries.',correct_answer:norm(answerKey[11]),difficulty_level:'medium',notes:'Passage II-A: Main idea'},

  {test_number:1,section:'R',question_number:12,question_stem:'In the third paragraph of Passage A (lines 21-30), the author makes a contrast between the:',choice_a:'hazy night sky over cities today and the bright stars and planets that exist above it.',choice_b:'gray night sky over cities and the various colors of the stars.',choice_c:'brightness of the planet Venus on an unlit night and the comparative dimness of the stars.',choice_d:'appreciation that people once had for stars and the apathy that is pervasive today.',correct_answer:norm(answerKey[12]),difficulty_level:'hard',notes:'Passage II-A: Contrast'},

  {test_number:1,section:'R',question_number:13,question_stem:'It can reasonably be inferred from Passage A that an animal "captured" by light is most nearly one that:',choice_a:'has lost the ability to search for food in dark areas.',choice_b:'is irresistibly drawn to artificial light at night.',choice_c:'is confined to limited dark areas at night.',choice_d:'has lost its natural habitat to urban expansion.',correct_answer:norm(answerKey[13]),difficulty_level:'medium',notes:'Passage II-A: Inference/vocabulary'},

  {test_number:1,section:'R',question_number:14,question_stem:'Compared to what Joseph appreciates about The Starry Night, the author of Passage B is more appreciative of the:',choice_a:'painting\'s vivid colors.',choice_b:'beauty of the painting.',choice_c:'story the painting tells.',choice_d:'technique used in the painting.',correct_answer:norm(answerKey[14]),difficulty_level:'medium',notes:'Passage II-B: Comparison'},

  {test_number:1,section:'R',question_number:15,question_stem:'The main purpose of the first paragraph of Passage B (lines 42-53) is to introduce the passage by:',choice_a:'describing The Starry Night and providing an idea of the painting\'s popularity.',choice_b:'conveying the passage author\'s excitement when he first saw The Starry Night.',choice_c:'showing examples of people\'s expectations about The Starry Night and their reactions to it.',choice_d:'establishing when and why Van Gogh painted The Starry Night.',correct_answer:norm(answerKey[15]),difficulty_level:'medium',notes:'Passage II-B: Purpose'},

  {test_number:1,section:'R',question_number:16,question_stem:'Based on Passage B, which of the following statements best summarizes the passage author\'s point about Van Gogh\'s use of imagination while painting The Starry Night?',choice_a:'Van Gogh had to rely heavily on his imagination because he usually painted during the daytime.',choice_b:'Van Gogh\'s work is almost entirely imagined because the painting\'s stars have colors that are unlike actual stars.',choice_c:'Van Gogh used his imagination in part, but his painting was also inspired by the real night sky he observed.',choice_d:'Van Gogh barely used his imagination at all; he tried to depict the vivid night sky exactly as it was.',correct_answer:norm(answerKey[16]),difficulty_level:'hard',notes:'Passage II-B: Main idea'},

  {test_number:1,section:'R',question_number:17,question_stem:'As it is used in line 90, the phrase remotely close to most nearly means:',choice_a:'exactly similar to.',choice_b:'anything like.',choice_c:'anywhere nearby.',choice_d:'somewhat adjacent to.',correct_answer:norm(answerKey[17]),difficulty_level:'easy',notes:'Passage II-B: Vocabulary'},

  {test_number:1,section:'R',question_number:18,question_stem:'Which of the following statements best captures the main difference in the information presented in the two passages?',choice_a:'Passage A summarizes the process by which light at night became common, whereas Passage B explores one person\'s reaction to Van Gogh\'s The Starry Night.',choice_b:'Passage A offers suggestions for restoring darkness to today\'s night, whereas Passage B compares the night skies of several Van Gogh paintings.',choice_c:'Passage A discusses the problems of today\'s bright night sky, whereas Passage B explains how people in Van Gogh\'s time used light at night.',choice_d:'Passage A gives an overview of the issue of light at night, whereas Passage B examines the matter of light at night through a discussion of Van Gogh\'s The Starry Night.',correct_answer:norm(answerKey[18]),difficulty_level:'hard',notes:'Passage II: Dual passage comparison'},

  {test_number:1,section:'R',question_number:19,question_stem:'One similarity between the passages is that, in order to make a point about light at night, both authors discuss:',choice_a:'how dark large cities once were.',choice_b:'the opinions of scientific researchers.',choice_c:'well-known works of art.',choice_d:'personal memories of when night was darker.',correct_answer:norm(answerKey[19]),difficulty_level:'medium',notes:'Passage II: Dual passage similarity'},

  {test_number:1,section:'R',question_number:20,question_stem:'Compared to Passage B, Passage A offers more information about the:',choice_a:'effects lighting up the night sky can have on animals.',choice_b:'colorful appearance stars had prior to electric lights.',choice_c:'interaction between nature and the imagination.',choice_d:'places where night\'s original darkness remains.',correct_answer:norm(answerKey[20]),difficulty_level:'medium',notes:'Passage II: Dual passage comparison'},

  // PASSAGE III: Humanities - Photographs & Memory (Q21-30)
  {test_number:1,section:'R',question_number:21,question_stem:'The passage as a whole can best be described as:',choice_a:'a summary of a childhood incident followed by reflections on how the memory of that incident has changed.',choice_b:'a description of an experience followed by consideration of a topic raised by that experience.',choice_c:'an account of the author\'s lifelong interest in a hobby.',choice_d:'an explanation of why the author\'s opinions on a topic have changed.',correct_answer:norm(answerKey[21]),difficulty_level:'medium',notes:'Passage III: Structure'},

  {test_number:1,section:'R',question_number:22,question_stem:'Which of the following statements best represents the passage\'s central claim?',choice_a:'The accuracy of most memories is improved by viewing photographs related to the memories.',choice_b:'Revisiting a place evokes clearer and more accurate memories than conversations or photographs.',choice_c:'The truth represented by a photograph is only as accurate as your memory of the event in the photograph.',choice_d:'Memories are sustained over time only through a combination of conversations, photographs, and visits to places.',correct_answer:norm(answerKey[22]),difficulty_level:'hard',notes:'Passage III: Main idea'},

  {test_number:1,section:'R',question_number:23,question_stem:'The author\'s tone when recounting his visit to the waterfall can best be described as:',choice_a:'joking.',choice_b:'gloomy.',choice_c:'pleading.',choice_d:'reverent.',correct_answer:norm(answerKey[23]),difficulty_level:'medium',notes:'Passage III: Tone'},

  {test_number:1,section:'R',question_number:24,question_stem:'The main idea of the second paragraph (lines 20-33) is that:',choice_a:'places preserve memories better than people do.',choice_b:'conversations about past events can be enjoyable.',choice_c:'family members often have differing recollections of shared experiences.',choice_d:'people\'s memories change as they themselves change.',correct_answer:norm(answerKey[24]),difficulty_level:'medium',notes:'Passage III: Main idea of paragraph'},

  {test_number:1,section:'R',question_number:25,question_stem:'The passage most strongly suggests that the author considers photographs to be:',choice_a:'useful in helping us remember details we might otherwise forget.',choice_b:'problematic in that they replace rather than preserve our memories.',choice_c:'more effective at preserving memories when combined with visits to places.',choice_d:'technically accurate but emotionally misleading.',correct_answer:norm(answerKey[25]),difficulty_level:'hard',notes:'Passage III: Author\'s view'},

  {test_number:1,section:'R',question_number:26,question_stem:'The author claims that when people take photographs during events, they:',choice_a:'capture the essence of the experience they are having.',choice_b:'preserve memories that would otherwise be lost.',choice_c:'experience the act of taking photographs rather than the event itself.',choice_d:'distract themselves from unpleasant aspects of the event.',correct_answer:norm(answerKey[26]),difficulty_level:'medium',notes:'Passage III: Author\'s claim'},

  {test_number:1,section:'R',question_number:27,question_stem:'Which of the following details does the author use to support his claim that photographs don\'t accurately reflect experiences?',choice_a:'Photographs are three-dimensional representations of two-dimensional experiences.',choice_b:'Photographs capture only visual information about an experience.',choice_c:'Photographs eliminate spatial dimensions, time, and sensory information like smell and sound.',choice_d:'Photographs are abstractions that can never match the vividness of returning to a place.',correct_answer:norm(answerKey[27]),difficulty_level:'hard',notes:'Passage III: Supporting detail'},

  {test_number:1,section:'R',question_number:28,question_stem:'According to the passage, photographs are "a dangerously compelling abstraction" (lines 60-61) because they:',choice_a:'seem more trustworthy than fragile human memories.',choice_b:'capture moments that would otherwise be forgotten.',choice_c:'prevent people from revisiting places from their past.',choice_d:'replace sensory experiences with visual representations.',correct_answer:norm(answerKey[28]),difficulty_level:'hard',notes:'Passage III: Interpretation'},

  {test_number:1,section:'R',question_number:29,question_stem:'In the passage, the author indicates that photography\'s limitations with respect to memory give the medium:',choice_a:'little value compared to revisiting places.',choice_b:'greater value as an artistic medium.',choice_c:'limited usefulness in preserving family histories.',choice_d:'a unique ability to explore the nature of memory.',correct_answer:norm(answerKey[29]),difficulty_level:'hard',notes:'Passage III: Interpretation'},

  {test_number:1,section:'R',question_number:30,question_stem:'It can most reasonably be inferred from the passage that the author believes that compared to photographs, places:',choice_a:'are less reliable because they change over time.',choice_b:'are more effective at evoking memories because they engage multiple senses.',choice_c:'provide memories that are less vivid but more accurate.',choice_d:'preserve fewer details but create stronger emotional connections.',correct_answer:norm(answerKey[30]),difficulty_level:'medium',notes:'Passage III: Inference'},

  // PASSAGE IV: Natural Science - Glaciers (Q31-40)
  {test_number:1,section:'R',question_number:31,question_stem:'The main purpose of the passage is to:',choice_a:'describe how glaciers form, move, and affect landscapes.',choice_b:'explain why glaciers are important to study.',choice_c:'compare different types of glaciers.',choice_d:'argue for increased glacier conservation.',correct_answer:norm(answerKey[31]),difficulty_level:'medium',notes:'Passage IV: Main purpose'},

  {test_number:1,section:'R',question_number:32,question_stem:'According to the passage, a glacier begins to flow when:',choice_a:'snow accumulates to a depth of about 50 feet.',choice_b:'the temperature drops below freezing.',choice_c:'ice accumulates to a thickness of about 100 feet.',choice_d:'annual snowfall exceeds annual melting.',correct_answer:norm(answerKey[32]),difficulty_level:'medium',notes:'Passage IV: Detail'},

  {test_number:1,section:'R',question_number:33,question_stem:'The passage indicates that a glacier\'s zone of accumulation is an area where:',choice_a:'ice flows most rapidly.',choice_b:'crevasses form most frequently.',choice_c:'snowfall exceeds melting.',choice_d:'the glacier is thickest.',correct_answer:norm(answerKey[33]),difficulty_level:'easy',notes:'Passage IV: Detail'},

  {test_number:1,section:'R',question_number:34,question_stem:'As it is used in line 45, the word plastic most nearly means:',choice_a:'malleable.',choice_b:'artificial.',choice_c:'elastic.',choice_d:'synthetic.',correct_answer:norm(answerKey[34]),difficulty_level:'medium',notes:'Passage IV: Vocabulary'},

  {test_number:1,section:'R',question_number:35,question_stem:'According to the passage, crevasses form in glaciers because:',choice_a:'the upper layer of ice is brittle and cracks as the glacier moves.',choice_b:'rocks embedded in the ice create weak points.',choice_c:'melting water carves channels in the ice.',choice_d:'the glacier flows over uneven terrain.',correct_answer:norm(answerKey[35]),difficulty_level:'hard',notes:'Passage IV: Cause and effect'},

  {test_number:1,section:'R',question_number:36,question_stem:'The passage most strongly suggests that if a glacier\'s zone of accumulation and zone of ablation are balanced, the glacier will:',choice_a:'advance.',choice_b:'retreat.',choice_c:'remain stable in size.',choice_d:'flow more rapidly.',correct_answer:norm(answerKey[36]),difficulty_level:'hard',notes:'Passage IV: Inference'},

  {test_number:1,section:'R',question_number:37,question_stem:'According to the passage, moraines are:',choice_a:'cracks that form in glacial ice.',choice_b:'areas where glaciers accumulate snow.',choice_c:'deposits of rock and debris left by glaciers.',choice_d:'valleys carved by glacial movement.',correct_answer:norm(answerKey[37]),difficulty_level:'easy',notes:'Passage IV: Detail'},

  {test_number:1,section:'R',question_number:38,question_stem:'The passage indicates that compared to valley glaciers, continental glaciers:',choice_a:'flow more rapidly.',choice_b:'cover much larger areas.',choice_c:'form at higher elevations.',choice_d:'create deeper valleys.',correct_answer:norm(answerKey[38]),difficulty_level:'medium',notes:'Passage IV: Comparison'},

  {test_number:1,section:'R',question_number:39,question_stem:'It can reasonably be inferred from the passage that the rate at which a glacier moves is influenced by:',choice_a:'the steepness of the slope and the thickness of the ice.',choice_b:'the temperature of the surrounding air.',choice_c:'the amount of debris embedded in the ice.',choice_d:'the time of year.',correct_answer:norm(answerKey[39]),difficulty_level:'hard',notes:'Passage IV: Inference'},

  {test_number:1,section:'R',question_number:40,question_stem:'The passage indicates that U-shaped valleys are formed by:',choice_a:'erosion from rivers.',choice_b:'volcanic activity.',choice_c:'tectonic plate movement.',choice_d:'glacial erosion.',correct_answer:norm(answerKey[40]),difficulty_level:'easy',notes:'Passage IV: Detail'}
];

console.log('📚 Inserting all 40 Reading questions...\n');

let count=0;
for(const q of questions){
  await upsert(q);
  count++;
}

console.log(`\n🎉 ${count}/40 READING QUESTIONS COMPLETE!`);
console.log('📊 Progress: 175/215 questions (81% of Test 1)');
console.log('   ✅ English: 75/75');
console.log('   ✅ Math: 60/60');
console.log('   ✅ Reading: 40/40');
console.log('   ⏳ Science: 0/40');
console.log('\n📌 Next: Extract Science section (40 questions)');
