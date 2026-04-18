"use client";

import { useState, useEffect } from "react";
import { getDailyLogs, createDailyLog, updateDailyLog, deleteDailyLog } from "../../lib/api";
import { Pencil, Trash2, XCircle, ChevronDown } from "lucide-react";

interface InventoryTabProps {
  activeTab: string;
}

export default function InventoryTab({ activeTab }: InventoryTabProps) {
  const [dailyLogs, setDailyLogs] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newTrans, setNewTrans] = useState({
    name: "",
    qty: 0,
    date: new Date().toISOString().split('T')[0]
  });
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const getUniqueProducts = () => {
    const uniqueNames = Array.from(new Set(dailyLogs.map(log => log.product_name)));
    return uniqueNames.sort();
  };

  const handleProductNameChange = (value: string) => {
    setNewTrans({ ...newTrans, name: value });
    
    if (value.trim()) {
      const allProducts = getUniqueProducts();
      const filtered = allProducts.filter(product =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
      setFilteredProducts([]);
    }
  };

  const handleSelectSuggestion = (productName: string) => {
    setNewTrans({ ...newTrans, name: productName });
    setShowSuggestions(false);
    setFilteredProducts([]);
  };

  const fetchDailyLogs = async () => {
    try {
      const res = await getDailyLogs();
      setDailyLogs(res.data);
    } catch (err) {
      console.error("Gagal mengambil log harian");
    }
  };

  const handleSaveTransaction = async () => {
    if (!newTrans.name || newTrans.qty <= 0) {
      return alert("Harap isi nama produk dan jumlah yang valid!");
    }

    try {
      if (isEditing) {
        // MODE EDIT
        await updateDailyLog(isEditing, {
          product_name: newTrans.name,
          quantity_sold: newTrans.qty,
          transaction_date: newTrans.date
        });
        alert("Transaksi Berhasil Diperbarui!");
      } else {
        // MODE TAMBAH BARU
        await createDailyLog({
          product_name: newTrans.name,
          quantity_sold: newTrans.qty,
          transaction_date: newTrans.date
        });
        alert("Transaksi Berhasil Disimpan!");
      }

      // Reset State
      setNewTrans({
        name: "",
        qty: 0,
        date: new Date().toISOString().split('T')[0]
      });
      setIsEditing(null);
      fetchDailyLogs();
    } catch (err: any) {
      console.error("Gagal simpan:", err);
      alert("Error: " + (err.response?.data?.error || "Gagal memproses data"));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus transaksi ini?")) return;
    try {
      await deleteDailyLog(id);
      fetchDailyLogs();
      alert("Data dihapus");
    } catch (err) {
      alert("Gagal menghapus data");
    }
  };

  const startEdit = (log: any) => {
    setIsEditing(log.id);
    setNewTrans({
      name: log.product_name,
      qty: log.quantity_sold,
      date: log.transaction_date
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (activeTab === "inventory") fetchDailyLogs();
  }, [activeTab]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowSuggestions(false);
      setShowAllProducts(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuggestions(false);
        setShowAllProducts(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-800">
          {isEditing ? "Edit Transaksi" : "Input Barang Keluar"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-1" onClick={(e) => e.stopPropagation()}>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="Nama Produk" 
                  className="w-full p-3 border rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={newTrans.name} 
                  onChange={(e) => handleProductNameChange(e.target.value)}
                  onFocus={() => {
                    if (newTrans.name && filteredProducts.length > 0) {
                      setShowSuggestions(true);
                    }
                  }}
                />
                {showSuggestions && filteredProducts.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-48 overflow-y-auto">
                    {filteredProducts.map((product, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSelectSuggestion(product)}
                        className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition text-sm text-gray-700"
                      >
                        {product}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="px-3 py-3 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-xl transition"
                title="Lihat semua produk"
              >
                <ChevronDown size={20} className={`text-gray-600 transition ${showAllProducts ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {showAllProducts && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-xl shadow-lg z-10 max-h-64 overflow-y-auto md:col-span-1">
                {getUniqueProducts().length > 0 ? (
                  getUniqueProducts().map((product, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        handleSelectSuggestion(product);
                        setShowAllProducts(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-blue-50 border-b border-gray-100 last:border-b-0 transition text-sm text-gray-700 font-medium"
                    >
                      {product}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm italic">Belum ada produk</div>
                )}
              </div>
            )}
          </div>
          <input type="number" placeholder="Jumlah" className="p-3 border rounded-xl bg-gray-50"
            value={newTrans.qty} onChange={(e) => setNewTrans({ ...newTrans, qty: Number(e.target.value) })} />
          <input type="date" className="p-3 border rounded-xl bg-gray-50"
            value={newTrans.date} onChange={(e) => setNewTrans({ ...newTrans, date: e.target.value })} />

          <div className="flex gap-2">
            <button onClick={handleSaveTransaction} className={`flex-1 ${isEditing ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl font-bold transition`}>
              {isEditing ? "Update" : "Simpan"}
            </button>
            {isEditing && (
              <button onClick={() => { setIsEditing(null); setNewTrans({name:"", qty:0, date: new Date().toISOString().split('T')[0]}) }} className="p-3 bg-gray-200 rounded-xl hover:bg-gray-300 transition">
                <XCircle size={20} className="text-gray-600" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b bg-gray-50/50">
          <h3 className="font-bold text-gray-800">Daftar Transaksi Harian</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Tanggal</th>
              <th className="px-6 py-4">Produk</th>
              <th className="px-6 py-4">Jumlah</th>
              <th className="px-6 py-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {dailyLogs.length > 0 ? (
              dailyLogs.map((log, index) => (
                <tr key={index} className="hover:bg-blue-50/30 transition">
                  <td className="px-6 py-4 text-sm text-gray-500">{log.transaction_date}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{log.product_name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-blue-600">{log.quantity_sold} Unit</td>
                  <td className="px-6 py-4 flex gap-4">
                    <button onClick={() => startEdit(log)} className="text-amber-500 hover:text-amber-700 transition">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(log.id)} className="text-red-500 hover:text-red-700 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-gray-400 italic">Belum ada data transaksi harian.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}