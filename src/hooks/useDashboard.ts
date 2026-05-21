import { useState, useEffect, useMemo } from "react";
import { predictProduct, getAnalysisHistory } from "@/lib/api";

export function useDashboardData() {
  const [inputQty, setInputQty] = useState<number>(0);
  const [prediction, setPrediction] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState<any[]>([]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res = await getAnalysisHistory({});
      setHistoryData(res.data || []);
    } catch (err) {
      console.error("Gagal mengambil riwayat:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputQty) return;
    setLoading(true);
    try {
      const res = await predictProduct(inputQty);
      setPrediction(res.data);
    } finally {
      setLoading(false);
    }
  };

  const fullAgregatedData = useMemo(() => {
    if (!historyData || historyData.length === 0) return [];

    const latestDate = historyData[0]?.date;

    const latestAnalysisResults = historyData.filter((item: any) => item.date === latestDate);

    return latestAnalysisResults.reduce((acc: any, item: any) => {
      const ex = acc.find((p: any) => p.name === item.product_name);
      if (ex) {

        ex.total += item.total_sold;
      } else {
        acc.push({ 
          name: item.product_name, 
          total: item.total_sold,
          category: item.category 
        });
      }
      return acc;
    }, []);
  }, [historyData]);

  const chartData = useMemo(() => {
    return [...fullAgregatedData]
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);
  }, [fullAgregatedData]);

  return {
    inputQty,
    setInputQty,
    prediction,
    loading,
    chartData,         
    fullAgregatedData,  
    handlePredict
  };
}