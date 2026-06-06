const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase environment variables are required: SUPABASE_URL and SUPABASE_KEY');
}

const supabase = createClient(supabaseUrl || '', supabaseKey || '');

module.exports = supabase;
