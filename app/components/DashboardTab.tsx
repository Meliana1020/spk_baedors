"use client";

import { useState } from "react";
import { predictProduct } from "../../lib/api";
import { BrainCircuit, Database, CheckCircle2, RefreshCcw } from "lucide-react";

interface DashboardTabProps {
  accuracyData: any;
}

export default function DashboardTab({ accuracyData }: DashboardTabProps) {
  const [inputQty, setInputQty] = useState<number>(0);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await predictProduct(inputQty);
      setPrediction(res.data);
    } catch (err) {
      alert("Gagal melakukan prediksi");
    } finally {
      setLoading(false);
    }
  };

  return (
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
  );
}