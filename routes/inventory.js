const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const protect = require('../middleware/authMiddleware');

// GET: Ambil log harian
router.get('/daily', protect, async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('daily_sales')
      .select('*')
      .order('transaction_date', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST: Simpan transaksi (DISINKRONKAN)
router.post('/daily', protect, async (req, res) => {
  const { product_name, quantity_sold, transaction_date } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('daily_sales')
      .insert([
        { 
          product_name, 
          quantity_sold: Number(quantity_sold), 
          transaction_date,
          user_id: req.user.id 
        }
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error("Error Backend:", err.message);
    res.status(500).json({ error: err.message });
  }
});

router.put('/daily/:id', protect, async (req, res) => {
  const { id } = req.params;
  const { product_name, quantity_sold, transaction_date } = req.body;
  try {
    const { data, error } = await supabase
      .from('daily_sales')
      .update({ 
        product_name, 
        quantity_sold: Number(quantity_sold), 
        transaction_date 
      })
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE: Hapus transaksi berdasarkan ID
router.delete('/daily/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const { error } = await supabase
      .from('daily_sales')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: "Transaksi berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
