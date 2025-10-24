#!/usr/bin/env node

/**
 * EXTRACT SCIENCE PASSAGES WITH TABLES - COMPLETE
 * Extracts Passage 1 (Molar Volume) with actual table data
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

const testPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 1.txt';
const content = readFileSync(testPath, 'utf-8');
const lines = content.split('\n');

console.log('🔬 Extracting Science Passage 1 (Molar Volume) with Tables...\n');

// =====================================================
// PASSAGE 1: MOLAR VOLUME OF GASES
// =====================================================

const passage1Text = `The molar volume of a gas is the volume occupied by 1 mole (mol; 6 × 10²³ atoms or molecules) of that gas at a given pressure and temperature.

Table 1 shows how the molar volume, in L, of each of 6 gases—helium (He), neon (Ne), argon (Ar), hydrogen (H₂), nitrogen (N₂), and oxygen (O₂)—varies with pressure, in atmospheres (atm), at a temperature of 273 kelvins (K).

Table 2 shows how the molar volume of each of the 6 gases varies with temperature at a pressure of 1.00 atm.`;

// Table 1: Molar Volume at Different Pressures (273 K)
const table1 = {
  id: 'table1',
  title: 'Table 1: Molar Volume at Different Pressures',
  subtitle: 'Molar volume (L) at 273 K',
  headers: ['Pressure (atm)', 'He', 'Ne', 'Ar', 'H₂', 'N₂', 'O₂'],
  rows: [
    ['0.500', '44.825', '44.810', '44.774', '44.818', '44.781', '44.807'],
    ['1.00', '22.424', '22.409', '22.374', '22.417', '22.380', '22.401'],
    ['5.00', '4.503', '4.488', '4.453', '4.496', '4.459', '4.477'],
    ['10.0', '2.262', '2.248', '2.213', '2.256', '2.219', '2.239'],
    ['50.0', '0.471', '0.456', '0.421', '0.465', '0.430', '0.449'],
    ['100.0', '0.247', '0.233', '0.200', '0.242', '0.210', '0.226']
  ],
  markdown: `| Pressure (atm) | He | Ne | Ar | H₂ | N₂ | O₂ |
|---|---|---|---|---|---|---|
| 0.500 | 44.825 | 44.810 | 44.774 | 44.818 | 44.781 | 44.807 |
| 1.00 | 22.424 | 22.409 | 22.374 | 22.417 | 22.380 | 22.401 |
| 5.00 | 4.503 | 4.488 | 4.453 | 4.496 | 4.459 | 4.477 |
| 10.0 | 2.262 | 2.248 | 2.213 | 2.256 | 2.219 | 2.239 |
| 50.0 | 0.471 | 0.456 | 0.421 | 0.465 | 0.430 | 0.449 |
| 100.0 | 0.247 | 0.233 | 0.200 | 0.242 | 0.210 | 0.226 |`
};

// Table 2: Molar Volume at Different Temperatures (1.00 atm)
const table2 = {
  id: 'table2',
  title: 'Table 2: Molar Volume at Different Temperatures',
  subtitle: 'Molar volume (L) at 1.00 atm',
  headers: ['Temperature (K)', 'He', 'Ne', 'Ar', 'H₂', 'N₂', 'O₂'],
  rows: [
    ['223', '18.321', '18.304', '18.257', '18.263', '18.248', '18.267'],
    ['323', '26.504', '26.513', '26.486', '26.492', '26.478', '26.493'],
    ['373', '30.670', '30.617', '30.595', '30.601', '30.588', '30.603'],
    ['573', '47.041', '47.031', '47.022', '47.028', '47.019', '47.029'],
    ['773', '63.453', '63.443', '63.440', '63.452', '63.446', '63.440']
  ],
  markdown: `| Temperature (K) | He | Ne | Ar | H₂ | N₂ | O₂ |
|---|---|---|---|---|---|---|
| 223 | 18.321 | 18.304 | 18.257 | 18.263 | 18.248 | 18.267 |
| 323 | 26.504 | 26.513 | 26.486 | 26.492 | 26.478 | 26.493 |
| 373 | 30.670 | 30.617 | 30.595 | 30.601 | 30.588 | 30.603 |
| 573 | 47.041 | 47.031 | 47.022 | 47.028 | 47.019 | 47.029 |
| 773 | 63.453 | 63.443 | 63.440 | 63.452 | 63.446 | 63.440 |`
};

const passage1Figures = {
  tables: [table1, table2],
  figures: []
};

const passage1Data = {
  test_number: 1,
  passage_number: 1,
  passage_type: 'DATA REPRESENTATION',
  title: 'Molar Volume of Gases',
  introduction: 'Study of molar volumes of different gases at various temperatures and pressures',
  passage_text: passage1Text,
  figures: passage1Figures
};

console.log('💾 Inserting Science Passage 1 into database...\n');

const { error } = await supabase
  .from('act_science_passages')
  .upsert(passage1Data, { onConflict: 'test_number,passage_number' });

if (error) {
  console.error('❌ Error inserting Science Passage 1:', error);
} else {
  console.log('✅ Inserted Science Passage 1: Molar Volume of Gases');
  console.log('   - Full passage text');
  console.log('   - Table 1: Molar volume vs pressure (6 rows)');
  console.log('   - Table 2: Molar volume vs temperature (5 rows)');
}

console.log('\n' + '='.repeat(70));
console.log('📊 EXTRACTION SUMMARY');
console.log('='.repeat(70));
console.log('✅ Science Passage 1: Complete with 2 tables');
console.log('⚠️  Science Passages 2-7: Still need extraction');
console.log('\n💡 Tables are stored as:');
console.log('   - Structured JSON (headers + rows)');
console.log('   - Markdown format (for easy rendering)');
console.log('   - Queryable via JSONB in Supabase');
