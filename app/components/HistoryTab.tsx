"use client";

import { useState, useEffect } from "react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "lucide-react";

interface AnalysisHistory {
  id: string;
  date: string;
  product_name: string;
  total_sold: number;
  category: "Laris" | "Kurang Laris" | "Tidak Laris";
}

export default function HistoryTab() {
  const [historyData, setHistoryData] = useState<AnalysisHistory[]>([]);
  const [filteredData, setFilteredData] = useState<AnalysisHistory[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeFilter, setActiveFilter] = useState<number | "all" | null>(7);

  // Mock data - replace dengan API call sebenarnya
  const fetchHistory = async () => {
    try {
      // Simulasi data history
      const mockData: AnalysisHistory[] = [
        { id: "1", date: "2024-04-15", product_name: "Minyak Goreng", total_sold: 150, category: "Laris" },
        { id: "2", date: "2024-04-15", product_name: "Gula Pasir", total_sold: 85, category: "Kurang Laris" },
        { id: "3", date: "2024-04-15", product_name: "Beras Premium", total_sold: 180, category: "Laris" },
        { id: "4", date: "2024-04-14", product_name: "Telur Ayam", total_sold: 95, category: "Kurang Laris" },
        { id: "5", date: "2024-04-14", product_name: "Susu UHT", total_sold: 12, category: "Tidak Laris" },
        { id: "6", date: "2024-04-13", product_name: "Minyak Goreng", total_sold: 165, category: "Laris" },
      ];
      setHistoryData(mockData);
      setFilteredData(mockData);
    } catch (err) {
      console.error("Gagal mengambil history:", err);
    }
  };

  const handleFilter = () => {
    let filtered = historyData;

    if (startDate) {
      filtered = filtered.filter(item => item.date >= startDate);
    }
    if (endDate) {
      filtered = filtered.filter(item => item.date <= endDate);
    }

    setFilteredData(filtered);
  };

  const handleSetQuickDate = (days: number) => {
    const end = new Date().toISOString().split('T')[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end);
    setActiveFilter(days);
  };

  const handleShowAllData = () => {
    setStartDate("");
    setEndDate("");
    setFilteredData(historyData);
    setActiveFilter("all");
  };

  // Prepare data for charts
  const categoryStats = {
    Laris: filteredData.filter(d => d.category === "Laris").length,
    "Kurang Laris": filteredData.filter(d => d.category === "Kurang Laris").length,
    "Tidak Laris": filteredData.filter(d => d.category === "Tidak Laris").length,
  };

  const productStats = filteredData.reduce((acc: Array<{ name: string; total: number; count: number }>, item) => {
    const existing = acc.find((p) => p.name === item.product_name);
    if (existing) {
      existing.total += item.total_sold;
      existing.count += 1;
    } else {
      acc.push({ name: item.product_name, total: item.total_sold, count: 1 });
    }
    return acc;
  }, []);

  const categoryChartData = [
    { name: "Laris", value: categoryStats.Laris, fill: "#22c55e" },
    { name: "Kurang Laris", value: categoryStats["Kurang Laris"], fill: "#eab308" },
    { name: "Tidak Laris", value: categoryStats["Tidak Laris"], fill: "#ef4444" },
  ].filter(d => d.value > 0);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    handleFilter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Filter Section */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-blue-100 border-l-8">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Filter History Analisis</h2>
        
        {/* Quick Date Filters */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <button
            onClick={() => handleSetQuickDate(7)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeFilter === 7 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            7 HARI
          </button>
          <button
            onClick={() => handleSetQuickDate(30)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeFilter === 30 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            30 HARI
          </button>
          <button
            onClick={() => handleSetQuickDate(90)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeFilter === 90 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            90 HARI
          </button>
          <button
            onClick={handleShowAllData}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition ${
              activeFilter === "all" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            }`}
          >
            SEMUA
          </button>
        </div>

        {/* Date Range Inputs */}
        <div className="flex gap-4 items-end flex-wrap">
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-gray-400 block mb-1">DARI TANGGAL</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                setStartDate(e.target.value);
                setActiveFilter(null);
              }}
              className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 min-w-[150px]">
            <label className="text-[10px] font-bold text-gray-400 block mb-1">SAMPAI TANGGAL</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                setEndDate(e.target.value);
                setActiveFilter(null);
              }}
              className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart - Distribution by Category */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-50">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Distribusi Produk berdasarkan Kelarisan</h3>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">Tidak ada data untuk ditampilkan</div>
          )}
        </div>

        {/* Bar Chart - Top Products by Sales */}
        <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-50">
          <h3 className="text-lg font-bold mb-6 text-gray-800">Top Produk berdasarkan Penjualan</h3>
          {productStats.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={productStats.slice(0, 5)}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill="#3b82f6" name="Total Penjualan" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[300px] flex items-center justify-center text-gray-400">Tidak ada data untuk ditampilkan</div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
          <p className="text-sm text-green-700 font-semibold mb-2">Produk Laris</p>
          <p className="text-4xl font-black text-green-600">{categoryStats.Laris}</p>
          <p className="text-xs text-green-600 mt-2">dari {filteredData.length} data</p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
          <p className="text-sm text-yellow-700 font-semibold mb-2">Produk Kurang Laris</p>
          <p className="text-4xl font-black text-yellow-600">{categoryStats["Kurang Laris"]}</p>
          <p className="text-xs text-yellow-600 mt-2">dari {filteredData.length} data</p>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-2xl border border-red-200">
          <p className="text-sm text-red-700 font-semibold mb-2">Produk Tidak Laris</p>
          <p className="text-4xl font-black text-red-600">{categoryStats["Tidak Laris"]}</p>
          <p className="text-xs text-red-600 mt-2">dari {filteredData.length} data</p>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-900 p-4">
          <h3 className="text-white font-bold text-sm flex items-center gap-2">
            <Calendar size={18} /> Riwayat Analisis Lengkap
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 text-left border-b">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Tanggal</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Produk</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Total Penjualan</th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-600">{item.date}</td>
                    <td className="px-6 py-4 font-bold text-gray-800">{item.product_name}</td>
                    <td className="px-6 py-4 text-gray-600 font-semibold">{item.total_sold} Unit</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                        item.category === 'Laris' ? 'bg-green-100 text-green-700' :
                        item.category === 'Kurang Laris' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {item.category}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">
                    Tidak ada history untuk tanggal yang dipilih
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
