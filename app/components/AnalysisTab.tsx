"use client";

import { useState } from "react";
import { getPeriodicClassification } from "../../lib/api";

export default function AnalysisTab() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [periodicResults, setPeriodicResults] = useState<any[]>([]);
  const [periodType, setPeriodType] = useState("weekly");
  const [loading, setLoading] = useState(false);

  const setQuickDate = (type: "weekly" | "monthly") => {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date();
    if (type === "weekly") start.setDate(start.getDate() - 7);
    else start.setDate(start.getDate() - 30);
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end);
    setPeriodType(type);
  };

  const handleFetchPeriodic = async () => {
    setLoading(true);
    try {
      const res = await getPeriodicClassification({ startDate, endDate, periodType });
      setPeriodicResults(res.data.results || []);
    } catch (err) {
      alert("Gagal mengambil klasifikasi berjadwal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 border-l-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Klasifikasi Berdasarkan Waktu</h2>
        <div className="flex gap-2 mb-6">
          <button onClick={() => setQuickDate("weekly")} className={`px-4 py-2 rounded-lg text-xs font-bold ${periodType === 'weekly' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>MINGGUAN (7 HARI)</button>
          <button onClick={() => setQuickDate("monthly")} className={`px-4 py-2 rounded-lg text-xs font-bold ${periodType === 'monthly' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>BULANAN (30 HARI)</button>
        </div>
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-gray-400 block mb-1">DARI TANGGAL</label>
            <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-gray-400 block mb-1">SAMPAI TANGGAL</label>
            <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} className="w-full p-3 border rounded-xl bg-gray-50" />
          </div>
          <button onClick={handleFetchPeriodic} className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold">MULAI ANALISIS</button>
        </div>
      </div>
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
  );
}