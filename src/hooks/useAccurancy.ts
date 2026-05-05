import { useState, useEffect } from "react";
import { getAccuracy } from "@/lib/api";

export function useAccuracy() {
  const [accuracyData, setAccuracyData] = useState<any>(null);
  const [trainingTable, setTrainingTable] = useState<any[]>([]);

  const fetchAccuracy = async () => {
    try {
      const res = await getAccuracy();
      setAccuracyData(res.data);
      setTrainingTable(res.data.details || []);
    } catch (err) {
      console.error("Gagal ambil akurasi", err);
    }
  };

  useEffect(() => {
    fetchAccuracy();
  }, []);

  return { accuracyData, trainingTable, refetch: fetchAccuracy };
}