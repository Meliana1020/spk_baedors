const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET: Ambil log harian
router.get('/daily', async (req, res) => {
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
router.post('/daily', async (req, res) => {
  // Pastikan nama variabel di sini cocok dengan yang dikirim frontend
  const { product_name, quantity_sold, transaction_date } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('daily_sales')
      .insert([
        { 
          product_name, 
          quantity_sold: Number(quantity_sold), // Pastikan masuk sebagai angka
          transaction_date 
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

router.put('/daily/:id', async (req, res) => {
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

module.exports = router;