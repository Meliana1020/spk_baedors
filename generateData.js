
const xlsx = require('xlsx');
const fs = require('fs');

const products = [
    { nama: 'Beras Premium 5kg', harga: 65000 },
    { nama: 'Minyak Goreng 2L', harga: 35000 },
    { nama: 'Gula Pasir 1kg', harga: 16000 },
    { nama: 'Telur Ayam 1kg', harga: 28000 },
    { nama: 'Mie Instan Dus', harga: 110000 },
    { nama: 'Sabun Cuci Piring', harga: 15000 },
    { nama: 'Kopi Sachet Pack', harga: 12000 },
    { nama: 'Susu UHT 1L', harga: 18000 }
];

const generateDummyData = () => {
    const data = [];
    for (let i = 1; i <= 150; i++) {
        const product = products[Math.floor(Math.random() * products.length)];
        const qty = Math.floor(Math.random() * 150) + 1; // 1 - 150 unit
        const discount = Math.random() > 0.7 ? 2000 : 0;
        
        data.push({
            id_transaksi: `TRX-${2025}${String(i).padStart(3, '0')}`,
            nama_produk: product.nama,
            jumlah_terjual: qty,
            harga_awal: product.harga,
            harga_setelah_diskon: product.harga - discount,
            total_pembayaran: (product.harga - discount) * qty,
            waktu_pemesanan: `2025-${Math.floor(Math.random() * 12) + 1}-${Math.floor(Math.random() * 28) + 1}`,
            status: Math.random() > 0.1 ? 'Selesai' : 'Dibatalkan' //
        });
    }

    const ws = xlsx.utils.json_to_sheet(data);
    const wb = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(wb, ws, "Penjualan 2025");

    xlsx.writeFile(wb, "data_penjualan_2025.xlsx");
    console.log("✅ File data_penjualan_2025.xlsx berhasil dibuat!");
};

generateDummyData();