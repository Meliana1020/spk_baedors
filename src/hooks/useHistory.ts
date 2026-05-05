import { useState, useEffect, useMemo } from "react";
import { getAnalysisHistory } from "@/lib/api";

export function useHistory() {
  const [historyData, setHistoryData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activeFilter, setActiveFilter] = useState<number | "all" | null>("all");
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getAnalysisHistory({ startDate, endDate });
      setHistoryData(res.data || []);
      setFilteredData(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil riwayat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchHistory(); }, []);

  // Client-side filtering untuk responsivitas
  useEffect(() => {
    let f = historyData;
    if (startDate) f = f.filter((i) => i.date >= startDate);
    if (endDate) f = f.filter((i) => i.date <= endDate);
    setFilteredData(f);
  }, [startDate, endDate, historyData]);

  const setQuickRange = (days: number) => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    start.setDate(start.getDate() - days);
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end);
    setActiveFilter(days);
  };

  const showAll = () => {
    setStartDate(""); setEndDate(""); setActiveFilter("all");
  };

  // Kalkulasi data chart menggunakan useMemo agar efisien
  const chartData = useMemo(() => {
    const stats = {
      Laris: filteredData.filter((d) => d.category === "Laris").length,
      "Kurang Laris": filteredData.filter((d) => d.category === "Kurang Laris").length,
      "Tidak Laris": filteredData.filter((d) => d.category === "Tidak Laris").length,
    };

    const products = filteredData.reduce((acc: any[], item) => {
      const ex = acc.find((p) => p.name === item.product_name);
      if (ex) ex.total += item.total_sold;
      else acc.push({ name: item.product_name, total: item.total_sold });
      return acc;
    }, []).slice(0, 5);

    const pie = [
      { name: "Laris", value: stats.Laris, fill: "oklch(0.72 0.18 155)" },
      { name: "Kurang Laris", value: stats["Kurang Laris"], valueRaw: stats["Kurang Laris"], fill: "oklch(0.8 0.16 85)" },
      { name: "Tidak Laris", value: stats["Tidak Laris"], fill: "oklch(0.65 0.22 25)" },
    ].filter(d => d.value > 0);

    return { stats, products, pie };
  }, [filteredData]);

  return {
    filteredData, loading, startDate, setStartDate, endDate, setEndDate,
    activeFilter, setActiveFilter, setQuickRange, showAll, chartData
  };
}