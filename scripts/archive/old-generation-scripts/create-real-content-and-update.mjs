#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

console.log('🎯 CREATING REAL CONTENT FOR PRACTICE TEST 1\n');

// Load existing English content
const existing = JSON.parse(fs.readFileSync('test-8-english-complete.json', 'utf8'));

// EXPANDED ENGLISH PASSAGES (280-350 words each)
const expandedPassages = {
  1: {
    title: "The Rise of Urban Farming",
    text: `In recent years, urban farming has transformed from a niche hobby into a significant movement reshaping city landscapes across America. Community gardens now dot neighborhoods from Brooklyn to San Francisco, converting vacant lots into productive green spaces that benefit entire communities. These gardens serve multiple purposes: they provide fresh produce to food deserts, create gathering places for neighbors to connect, and offer valuable educational opportunities for children who might otherwise never see how vegetables actually grow from seed to harvest.

Maya Rodriguez, a dedicated coordinator for the Detroit Urban Farming Initiative, has witnessed this remarkable transformation firsthand over nearly two decades. She recalls when the organization started in 2005 with just three modest raised beds in an abandoned lot that nobody wanted. Today, the initiative manages over forty thriving community gardens across the city, employing twenty full-time staff members and mobilizing hundreds of enthusiastic volunteers. The gardens produce thousands of pounds of fresh vegetables annually, distributing them free to residents who need them most, particularly elderly residents and families struggling with food insecurity.

The environmental benefits extend far beyond simple food production. Urban gardens absorb rainwater that would otherwise overwhelm aging storm drains, reduce the urban heat island effect that makes cities uncomfortably warm in summer, and provide essential habitat for pollinators like bees and butterflies. Recent studies have shown that neighborhoods with active community gardens experience measurably lower crime rates and increased property values. Residents consistently report feeling more connected to their communities and more invested in neighborhood improvement initiatives.

However, significant challenges remain for urban farmers. Access to suitable land continues to be the primary obstacle, as property owners and city governments often prioritize commercial development over green space. Funding for essential tools, quality seeds, and basic infrastructure requires constant fundraising efforts and grant writing. Volunteer coordination and training demand considerable time and organizational energy. Despite these persistent hurdles, the urban farming movement continues to grow steadily, demonstrating convincingly that cities can be places not just of consumption, but of cultivation and genuine community building.`
  },
  2: {
    title: "The Legacy of Katherine Johnson",
    text: `Katherine Johnson's precise mathematical calculations helped send American astronauts safely to the moon, yet for decades her groundbreaking contributions remained largely unknown outside NASA's inner circles. Born in 1918 in White Sulphur Springs, West Virginia, Johnson displayed exceptional mathematical ability from an early age that amazed her teachers. She graduated from high school at the remarkably young age of fourteen and completed college at eighteen, earning prestigious degrees in both mathematics and French.

In 1953, Johnson joined the National Advisory Committee for Aeronautics, the organization which later became NASA. As an African American woman working in the 1950s and 1960s, she faced significant barriers in a highly technical field dominated almost exclusively by white men. Despite these formidable obstacles and the discrimination she encountered, her extraordinary computational skills proved absolutely indispensable to the space program. Before electronic computers became commonplace in scientific work, human "computers"—mostly women working in teams—performed complex calculations entirely by hand using only mechanical calculators. Johnson excelled at this demanding work, calculating precise trajectories for Project Mercury and later for the historic Apollo missions to the moon.

Her most famous contribution came in 1962 when astronaut John Glenn prepared to become the first American to orbit Earth. Glenn, understanding the stakes, refused to fly until Johnson personally verified the electronic computer's orbital calculations. "If she says they're good, then I'm ready to go," he declared with complete confidence. Her meticulous verification gave Glenn the assurance he needed to complete his historic three-orbit mission.

In 2015, President Barack Obama awarded Johnson the Presidential Medal of Freedom, the nation's highest civilian honor. The 2016 film Hidden Figures brought her inspiring story to millions of viewers worldwide, motivating a new generation of students to pursue careers in science, technology, and mathematics. Johnson passed away peacefully in 2020 at age 101, having witnessed the profound impact of her groundbreaking work on space exploration and having inspired countless young people to reach for the stars.`
  }
};

console.log('📝 Expanded English passages created');
console.log(`   Passage 1: ${expandedPassages[1].text.split(/\s+/).length} words`);
console.log(`   Passage 2: ${expandedPassages[2].text.split(/\s+/).length} words\n`);

// Export for verification
fs.writeFileSync('expanded-passages-preview.json', JSON.stringify(expandedPassages, null, 2));
console.log('💾 Saved preview to expanded-passages-preview.json\n');
console.log('✅ English content ready (2 of 5 passages expanded)');
console.log('⏳ Continue with remaining 3 passages...\n');
