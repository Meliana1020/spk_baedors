import { useState } from "react";
import { getPeriodicClassification } from "@/lib/api";

export function useAnalysis() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [periodType, setPeriodType] = useState("weekly");
  const [loading, setLoading] = useState(false);

  const setQuickRange = (type: "weekly" | "monthly") => {
    const end = new Date().toISOString().split("T")[0];
    const start = new Date();
    if (type === "weekly") start.setDate(start.getDate() - 7);
    else start.setDate(start.getDate() - 30);
    
    setStartDate(start.toISOString().split("T")[0]);
    setEndDate(end);
    setPeriodType(type);
  };

  const executeAnalysis = async () => {
    if (!startDate || !endDate) {
      alert("Harap pilih rentang tanggal terlebih dahulu!");
      return;
    }

    setLoading(true);
    try {
      const res = await getPeriodicClassification({ startDate, endDate, periodType });
      setResults(res.data.results || []);
    } catch (err) {
      console.error("Gagal melakukan analisis periode:", err);
      alert("Gagal mengambil data klasifikasi.");
    } finally {
      setLoading(false);
    }
  };

  return {
    startDate, setStartDate,
    endDate, setEndDate,
    results, loading,
    periodType, setQuickRange,
    executeAnalysis
  };
}