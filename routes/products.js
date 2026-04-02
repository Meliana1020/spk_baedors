const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');
const nbService = require('../services/naiveBayes');

// GET: Semua Produk dengan Prediksi Terbaru
router.get('/', async (req, res) => {
  const { data: trainingData } = await supabase.from('sales_training_labeled').select('*');
  const { data: products, error } = await supabase.from('products').select('*');
  
  if (error) return res.status(500).json({ error: error.message });

  // Sinkronkan kategori secara real-time berdasarkan data training terbaru
  const updatedProducts = products.map(p => ({
    ...p,
    category: nbService.predict(p.total_quantity_sold, trainingData).category
  }));

  res.json(updatedProducts);
});

// POST: Tambah Produk Baru & Prediksi Langsung
router.post('/', async (req, res) => {
  const { name, stock, sold } = req.body;
  const { data: trainingData } = await supabase.from('sales_training_labeled').select('*');
  
  const prediction = nbService.predict(sold, trainingData);

  const { data, error } = await supabase.from('products').insert([{
    product_name: name,
    stock_quantity: stock,
    total_quantity_sold: sold,
    category: prediction.category
  }]).select();

  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

module.exports = router;