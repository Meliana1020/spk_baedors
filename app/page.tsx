"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { 
  BrainCircuit, 
  Database, 
  CheckCircle2, 
  RefreshCcw, 
  LayoutDashboard, 
  Package, 
  BarChart3 
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface SalesData {
  product_name: string;
  total_quantity_sold: number;
  category: "Laris" | "Kurang Laris" | "Tidak Laris";
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [inputQty, setInputQty] = useState<number>(0);
  const [prediction, setPrediction] = useState<any>(null);
  const [accuracyData, setAccuracyData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [importedData, setImportedData] = useState<SalesData[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodicResults, setPeriodicResults] = useState<any[]>([]);

  // Ambil klasifikasi berdasarkan rentang waktu
  const handleFetchPeriodic = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/analysis/periodic-classification`, {
        params: { startDate, endDate }
      });
      setPeriodicResults(res.data);
    } catch (err) {
      alert("Gagal mengambil klasifikasi berjadwal");
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    try {
      const res = await axios.post(`${API_URL}/analysis/import-excel`);
      setImportedData(res.data.displayData);
      fetchAccuracy(); // Refresh stats setelah import
      alert(res.data.message);
    } catch (err) {
      console.error("Gagal import data", err);
    }
  };

  const fetchAccuracy = async () => {
    try {
      const res = await axios.get(`${API_URL}/analysis/evaluate`);
      setAccuracyData(res.data);
    } catch (err) {
      console.error("Gagal ambil akurasi", err);
    }
  };

  useEffect(() => {
    fetchAccuracy();
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/analysis/predict`, {
        input_quantity: inputQty,
      });
      setPrediction(res.data);
    } catch (err) {
      alert("Gagal melakukan prediksi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* SIDEBAR */}
      <aside className="w-64 bg-gray-900 text-white fixed h-full p-6 shadow-xl z-50">
        <div className="mb-10 text-center">
          <h2 className="text-xl font-bold text-blue-400 tracking-tighter">LM BAEDORS</h2>
          <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Smart Inventory</p>
        </div>

        <nav className="space-y-2">
          <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><LayoutDashboard size={18}/> Dashboard</button>
          <button onClick={() => setActiveTab("inventory")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "inventory" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><Package size={18}/> Stok & Transaksi</button>
          <button onClick={() => setActiveTab("analysis")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "analysis" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><BarChart3 size={18}/> Analisis Data</button>
        </nav>

        <div className="absolute bottom-10 left-6 right-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-widest">Sistem Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-xs text-gray-300">Ready to Process</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-black text-gray-900">
            {activeTab === "dashboard" && "Ringkasan Sistem"}
            {activeTab === "inventory" && "Manajemen Stok Harian"}
            {activeTab === "analysis" && "Analisis & Periode"}
          </h1>
          <p className="text-gray-500 font-medium italic">E-Commerce Gula Serbuk Desa Pagerandong</p>
        </header>

        {/* TAB 1: DASHBOARD */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl text-blue-600"><Database size={24} /></div>
                <div><p className="text-sm text-gray-500">Data Training</p><p className="text-2xl font-bold text-gray-800">{accuracyData?.total_data || 0}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-xl text-green-600"><CheckCircle2 size={24} /></div>
                <div><p className="text-sm text-gray-500">Akurasi SPK</p><p className="text-2xl font-bold text-gray-800">{accuracyData?.accuracy || "0%"}</p></div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-xl text-purple-600"><BrainCircuit size={24} /></div>
                <div><p className="text-sm text-gray-500">Metode</p><p className="text-lg font-semibold text-gray-800">Gaussian NB</p></div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-50">
                <h2 className="text-gray-800 text-xl font-bold mb-6 flex items-center gap-2 underline decoration-blue-500 underline-offset-8">Uji Prediksi Manual</h2>
                <form onSubmit={handlePredict} className="space-y-4">
                  <label className="block text-sm font-bold text-gray-600">Input Jumlah Penjualan</label>
                  <input type="number" value={inputQty} onChange={(e) => setInputQty(Number(e.target.value))} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="Misal: 150" />
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition flex justify-center items-center gap-2">
                    {loading ? <RefreshCcw className="animate-spin" /> : "HITUNG KLASIFIKASI"}
                  </button>
                </form>
                {prediction && (
                  <div className="mt-6 p-6 bg-gray-900 rounded-2xl text-center border-t-4 border-blue-500">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status Produk:</p>
                    <h3 className={`text-4xl font-black ${prediction.prediction === "Laris" ? "text-green-400" : prediction.prediction === "Kurang Laris" ? "text-yellow-400" : "text-red-400"}`}>{prediction.prediction}</h3>
                  </div>
                )}
              </div>

              <div className="bg-gray-900 text-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-xl font-bold mb-6 text-blue-400">Parameter Kelarisan</h2>
                <div className="space-y-5">
                  <div className="flex justify-between items-center border-b border-gray-800 pb-4"><span>Laris</span><span className="font-mono font-bold text-green-400">{">"} 100 Unit</span></div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-4"><span>Kurang Laris</span><span className="font-mono font-bold text-yellow-400">20 - 100 Unit</span></div>
                  <div className="flex justify-between items-center border-b border-gray-800 pb-4"><span>Tidak Laris</span><span className="font-mono font-bold text-red-400">{"<"} 20 Unit</span></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INVENTORY */}
        {activeTab === "inventory" && (
          <div className="bg-white p-8 rounded-2xl shadow-sm animate-in fade-in duration-500 border border-gray-100">
             <div className="flex justify-between items-center mb-10">
                <h2 className="text-2xl font-bold text-gray-800">Transaksi Penjualan Harian</h2>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-xl font-bold text-sm">+ Input Transaksi Baru</button>
             </div>
             <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <Package size={60} className="mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 font-medium">Belum ada transaksi harian terdaftar.</p>
                <p className="text-xs text-gray-400 mt-1">Data akan muncul setelah Anda melakukan input transaksi.</p>
             </div>
          </div>
        )}

        {/* TAB 3: ANALYSIS */}
        {activeTab === "analysis" && (
          <div className="space-y-8 animate-in fade-in duration-500">
            {/* Bagian Import Sekali Saja */}
            <div className="bg-white p-8 rounded-2xl shadow-sm flex justify-between items-center border border-gray-100">
              <div><h2 className="text-xl font-bold text-gray-800">Master Data (Import)</h2><p className="text-sm text-gray-500">Gunakan ini sekali saja untuk melatih model Naive Bayes awal.</p></div>
              <button onClick={handleImport} className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition"><Database size={18} /> Load Excel</button>
            </div>

            {/* Bagian Klasifikasi Berjadwal (Logika Baru) */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 border-l-8">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Klasifikasi Berdasarkan Waktu</h2>
              <div className="flex gap-4 items-end flex-wrap">
                <div className="flex-1 min-w-[150px]"><label className="text-[10px] font-bold text-gray-400 block mb-1">DARI TANGGAL</label><input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <div className="flex-1 min-w-[150px]"><label className="text-[10px] font-bold text-gray-400 block mb-1">SAMPAI TANGGAL</label><input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500" /></div>
                <button onClick={handleFetchPeriodic} disabled={loading} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition h-[50px] flex items-center gap-2">
                  {loading ? <RefreshCcw size={18} className="animate-spin"/> : "MULAI ANALISIS"}
                </button>
              </div>
            </div>

            {/* Hasil Analisis Berjadwal */}
            {periodicResults.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                <div className="bg-gray-900 p-4"><h3 className="text-white font-bold text-sm">Hasil Laporan Penjualan & Klasifikasi</h3></div>
                <table className="min-w-full">
                  <thead className="bg-gray-50 text-left border-b">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Produk</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Akumulasi Terjual</th>
                      <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Label Kelarisan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {periodicResults.map((item, i) => (
                      <tr key={i} className="hover:bg-blue-50 transition">
                        <td className="px-6 py-4 font-bold text-gray-800">{item.product_name}</td>
                        <td className="px-6 py-4 font-medium text-gray-600">{item.total_sold} Unit</td>
                        <td className="px-6 py-4">
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase ${item.category === 'Laris' ? 'bg-green-100 text-green-700' : item.category === 'Kurang Laris' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                            {item.category}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}