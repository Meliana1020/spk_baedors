// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const supabase = require('./config/supabase');
// const analysisRoutes = require('./routes/analysis');
// const inventoryRoutes = require('./routes/inventory');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware agar backend bisa menerima JSON dan diakses Frontend
// app.use(cors());
// app.use(express.json());

// app.use('/api/analysis', analysisRoutes);
// app.use('/api/inventory', inventoryRoutes);

// // Route Dasar untuk cek status
// app.get('/', (req, res) => {
//     res.send('API SPK Toko LM Baedors Mart is Running! 🚀');
// });

// // Route Test Koneksi Database
// app.get('/check-db', async (req, res) => {
//     const { data, error } = await supabase.from('sales_data_raw').select('count');
//     if (error) return res.status(500).json({ error: error.message });
//     res.json({ message: "Koneksi ke Supabase Aman!", data });
// });

// app.listen(PORT, () => {
//     console.log(`Backend nyala di http://localhost:${PORT}`);
// });

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const supabase = require('./config/supabase');
const analysisRoutes = require('./routes/analysis');
const inventoryRoutes = require('./routes/inventory');

const app = express();
const PORT = process.env.PORT || 5000;

// const allowedOrigins = [
//     'http://localhost:3000', 
//     'https://spk-baedors.vercel.app' 
// ];

app.use(cors());

app.use(express.json());

app.use('/api/analysis', analysisRoutes);
app.use('/api/inventory', inventoryRoutes);

app.get('/', (req, res) => {
    res.send('API SPK Toko LM Baedors Mart is Running! 🚀');
});

app.get('/check-db', async (req, res) => {
    const { data, error } = await supabase.from('sales_data_raw').select('count', { count: 'exact', head: true });
    if (error) return res.status(500).json({ error: error.message });
    res.json({ message: "Koneksi ke Supabase Aman!", total_data: data });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Backend nyala di http://localhost:${PORT}`);
    });
}

module.exports = app;