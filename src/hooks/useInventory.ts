import { useState, useEffect, useMemo } from "react";
import { getDailyLogs, createDailyLog, updateDailyLog, deleteDailyLog } from "@/lib/api";

export function useInventory() {
  const [dailyLogs, setDailyLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState<string | number | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<string[]>([]);
  
  const [form, setForm] = useState({
    name: "",
    qty: 0,
    date: new Date().toISOString().split("T")[0],
  });

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const res = await getDailyLogs();
      setDailyLogs(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil data inventory:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLogs(); }, []);

  // Autocomplete Logic
  const uniqueProducts = useMemo(() => 
    Array.from(new Set(dailyLogs.map((l) => l.product_name))).sort()
  , [dailyLogs]);

  const handleNameChange = (value: string) => {
    setForm(prev => ({ ...prev, name: value }));
    if (value.trim()) {
      const filtered = uniqueProducts.filter(p => 
        p.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
      setShowSuggestions(filtered.length > 0);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSave = async () => {
    if (!form.name || form.qty <= 0) return alert("Data tidak valid!");
    try {
      if (isEditing) {
        await updateDailyLog(isEditing, {
          product_name: form.name,
          quantity_sold: form.qty,
          transaction_date: form.date,
        });
      } else {
        await createDailyLog({
          product_name: form.name,
          quantity_sold: form.qty,
          transaction_date: form.date,
        });
      }
      resetForm();
      fetchLogs();
    } catch (err) {
      alert("Gagal memproses data");
    }
  };

  const handleDelete = async (id: string | number) => {
    if (!confirm("Hapus transaksi ini?")) return;
    try {
      await deleteDailyLog(id);
      fetchLogs();
    } catch (err) {
      alert("Gagal menghapus");
    }
  };

  const resetForm = () => {
    setIsEditing(null);
    setForm({ name: "", qty: 0, date: new Date().toISOString().split("T")[0] });
  };

  const startEdit = (log: any) => {
    setIsEditing(log.id);
    setForm({ name: log.product_name, qty: log.quantity_sold, date: log.transaction_date });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return {
    dailyLogs, loading, isEditing, form, setForm,
    showSuggestions, setShowSuggestions, filteredProducts,
    handleNameChange, handleSave, handleDelete, startEdit, resetForm
  };
}