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
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-xl text-blue-600 flex-shrink-0">
            <Database size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-gray-500">Data Training</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
              {accuracyData?.total_data || 0}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="p-3 bg-green-100 rounded-xl text-green-600 flex-shrink-0">
            <CheckCircle2 size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-gray-500">Akurasi SPK</p>
            <p className="text-2xl md:text-3xl font-bold text-gray-800 break-words">
              {accuracyData?.accuracy || "0%"}
            </p>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row sm:col-span-2 lg:col-span-1 items-start sm:items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-xl text-purple-600 flex-shrink-0">
            <BrainCircuit size={24} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs md:text-sm text-gray-500">Metode</p>
            <p className="text-lg md:text-xl font-semibold text-gray-800 break-words">Gaussian NB</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Prediction Form */}
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-md border border-gray-50">
          <h2 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2 underline decoration-blue-500 underline-offset-8 text-gray-800">
            Uji Prediksi Manual
          </h2>
          <form onSubmit={handlePredict} className="space-y-4">
            <label className="block text-sm font-bold text-gray-600">Input Jumlah Penjualan</label>
            <input
              type="number"
              value={inputQty}
              onChange={(e) => setInputQty(Number(e.target.value))}
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition text-base"
              placeholder="Misal: 150"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-xl font-black hover:bg-blue-700 transition flex justify-center items-center gap-2 text-sm md:text-base"
            >
              {loading ? <RefreshCcw className="animate-spin" size={20} /> : "HITUNG KLASIFIKASI"}
            </button>
          </form>
          {prediction && (
            <div className="mt-6 p-6 bg-gray-900 rounded-2xl text-center border-t-4 border-blue-500">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
                Status Produk:
              </p>
              <h3
                className={`text-3xl md:text-4xl font-black ${
                  prediction.prediction === "Laris"
                    ? "text-green-400"
                    : prediction.prediction === "Kurang Laris"
                    ? "text-yellow-400"
                    : "text-red-400"
                }`}
              >
                {prediction.prediction}
              </h3>
            </div>
          )}
        </div>

        {/* Parameter Info */}
        <div className="bg-gray-900 text-white p-6 md:p-8 rounded-3xl shadow-xl">
          <h2 className="text-lg md:text-xl font-bold mb-6 text-blue-400">Parameter Kelarisan</h2>
          <div className="space-y-4 md:space-y-5">
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="text-sm md:text-base">Laris</span>
              <span className="font-mono font-bold text-green-400 text-sm md:text-base">{"> "} 100 Unit</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="text-sm md:text-base">Kurang Laris</span>
              <span className="font-mono font-bold text-yellow-400 text-sm md:text-base">20 - 100 Unit</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-800 pb-4 flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="text-sm md:text-base">Tidak Laris</span>
              <span className="font-mono font-bold text-red-400 text-sm md:text-base">{"< "} 20 Unit</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}