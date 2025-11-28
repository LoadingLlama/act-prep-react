/**
 * Shared configuration utility for scripts
 * Loads environment variables from .env file
 *
 * Usage:
 *   import { supabaseUrl, supabaseAnonKey, supabaseServiceKey } from './config.mjs';
 */

import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from project root
config({ path: resolve(__dirname, '../.env') });

// Validate required environment variables
const requiredVars = [
  'REACT_APP_SUPABASE_URL',
  'REACT_APP_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY'
];

for (const varName of requiredVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
}

export const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
export const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
export const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Log configuration loaded (without exposing keys)
console.log('✅ Configuration loaded successfully');
console.log(`   Supabase URL: ${supabaseUrl}`);
