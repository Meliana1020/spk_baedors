const express = require('express');
const router = express.Router();
const xlsx = require('xlsx');
const supabase = require('../config/supabase');
const nbService = require('../services/naiveBayes');

router.post('/import-excel', async (req, res) => {
  try {
    const workbook = xlsx.readFile('data_penjualan_2025.xlsx'); 
    const sheetName = workbook.SheetNames[0];
    const rawData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    
    const validData = rawData.filter(item => item.status === 'Selesai');

    const processedData = validData.map(item => ({
      product_name: item.nama_produk,
      total_quantity_sold: parseInt(item.jumlah_terjual),
      category: nbService.getLabel(parseInt(item.jumlah_terjual))
    }));

    // --- LOGIKA PENTING: Hapus data lama agar tidak dobel ---
    await supabase.from('sales_training_labeled').delete().neq('id', '00000000-0000-0000-0000-000000000000'); 
    // atau gunakan .neq('product_name', '') jika ID kamu berupa UUID

    const { error } = await supabase.from('sales_training_labeled').insert(processedData);
    if (error) throw error;

    res.json({ message: "Berhasil! Data training sekarang bersih & berjumlah " + processedData.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/predict', async (req, res) => {
  try {
    const { input_quantity } = req.body; // Misal kita mau tes produk yang terjual 50 unit

    // Ambil semua data training dari Supabase
    const { data: trainingData, error } = await supabase
      .from('sales_training_labeled')
      .select('total_quantity_sold, category');

    if (error) throw error;

    // Jalankan Naive Bayes
    const result = nbService.predict(input_quantity, trainingData);

    res.json({
      input: input_quantity,
      prediction: result.category,
      confidence_score: result.score
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/evaluate', async (req, res) => {
  try {
    const { data: allData, error } = await supabase
      .from('sales_training_labeled')
      .select('total_quantity_sold, category');

    if (error) throw error;

    let correct = 0;
    const evaluationResults = allData.map(item => {
      // Jalankan prediksi untuk tiap data yang ada di DB
      const prediction = nbService.predict(item.total_quantity_sold, allData);
      
      const isCorrect = prediction.category === item.category;
      if (isCorrect) correct++;

      return {
        quantity: item.total_quantity_sold,
        actual: item.category,
        predicted: prediction.category,
        status: isCorrect ? 'Match' : 'Mismatch'
      };
    });

    const accuracy = (correct / allData.length) * 100;

    res.json({
      total_data: allData.length,
      correct_predictions: correct,
      accuracy: `${accuracy.toFixed(2)}%`, // Ini angka penting buat Bab 4 kamu!
      details: evaluationResults
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/periodic-classification', async (req, res) => {
  const { startDate, endDate, periodType } = req.query;

  try {
    const { data: trainingData } = await supabase.from('sales_training_labeled').select('*');

    // Ambil data berdasarkan range tanggal dari schema date
    const { data: dailyData, error } = await supabase
      .from('daily_sales')
      .select('product_name, quantity_sold')
      .gte('transaction_date', startDate) 
      .lte('transaction_date', endDate);

    if (error) throw error;

    // Jika data kosong di range tsb, kirim array kosong agar frontend tidak error
    if (!dailyData || dailyData.length === 0) {
      return res.json({ results: [] });
    }

    // Proses Agregasi
    const summary = dailyData.reduce((acc, curr) => {
      acc[curr.product_name] = (acc[curr.product_name] || 0) + curr.quantity_sold;
      return acc;
    }, {});

    const results = Object.keys(summary).map(name => {
      const totalSold = summary[name];
      const prediction = nbService.predict(totalSold, trainingData);
      
      return {
        product_name: name,
        total_sold: totalSold,
        category: prediction.category
      };
    });

    // Kirim dengan key 'results' agar dibaca Frontend
    res.json({ results }); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;