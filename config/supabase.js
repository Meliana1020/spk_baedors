require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Tambahkan pengecekan ini untuk debugging
if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Error: SUPABASE_URL atau SUPABASE_KEY tidak terbaca di .env!");
  console.log("Cek file .env kamu, pastikan tidak ada typo.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;