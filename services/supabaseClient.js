const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are required: SUPABASE_URL and SUPABASE_KEY');
}

const ws = require('ws');
const supabase = createClient(supabaseUrl, supabaseKey, {
    realtime: {
        transport: ws
    }
});

module.exports = supabase;
