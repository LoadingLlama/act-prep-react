#!/usr/bin/env node

/**
 * EXTRACT TEST 4 ENGLISH PASSAGES 4 & 5 - QUESTIONS 46-75
 * Passage 4: "Close Encounters of the Bird Kind" (Q46-60)
 * Passage 5: "Choreographing Change" (Q61-75)
 */

import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../../.env') });

const supabase = createClient(process.env.REACT_APP_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const TEST_NUMBER = 4;
const answerKeysPath = join(__dirname, '../../data/test4-answer-keys.json');
const answerKeys = JSON.parse(fs.readFileSync(answerKeysPath, 'utf8'));

console.log('📝 EXTRACTING TEST 4 ENGLISH PASSAGES 4 & 5 - QUESTIONS 46-75\n');
console.log('='.repeat(80));

// I'll extract these from the TXT file - let me read and get the content first
const txtPath = '/Users/cadenchiang/Desktop/actprep copy/actclass.org/practice acts/Practice ACT 4.txt';
const fullText = fs.readFileSync(txtPath, 'utf8');
const lines = fullText.split('\n');

// Extract passage texts from lines 839-1399 (English section continues)
// For now, I'll create placeholder structures and fill with actual content

console.log('\n⚠️ This script needs passage text extraction from TXT.');
console.log('Please run individual P4 and P5 extraction scripts.');
console.log('Exiting...\n');
process.exit(0);
