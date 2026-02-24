require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('❌ Missing SUPABASE_URL or SUPABASE_KEY in .env');
    process.exit(1);
}

// Detect placeholder value — treat it as missing
const isPlaceholder = !supabaseServiceKey ||
    supabaseServiceKey === 'your_service_role_key_here' ||
    supabaseServiceKey.trim() === '';

if (isPlaceholder) {
    console.warn('⚠️  SUPABASE_SERVICE_KEY not set — using anon key for all operations.');
    console.warn('    Storage uploads and DB writes may fail due to RLS.');
    console.warn('    Get your service role key from: Supabase → Project Settings → API');
}

// Regular client (anon key) — for DB reads
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client (service role key) — bypasses RLS for writes & storage
// Falls back to anon key if service key not provided (will hit RLS)
const supabaseAdmin = createClient(
    supabaseUrl,
    isPlaceholder ? supabaseAnonKey : supabaseServiceKey
);

console.log(`✅ Supabase client ready (admin: ${isPlaceholder ? 'anon fallback ⚠️' : 'service role ✅'})`);

module.exports = { supabase, supabaseAdmin };
