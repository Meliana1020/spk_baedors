const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log("Request masuk ke /api/auth/login!");

  try {
    // Login ke Supabase Auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return res.status(401).json({ message: error.message });

    // Buat token JWT kita sendiri untuk Middleware
    const token = jwt.sign(
      { 
        id: data.user.id, 
        email: data.user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.json({ token, user: data.user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;