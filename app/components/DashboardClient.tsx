"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardTab from "./DashboardTab";
import InventoryTab from "./InventoryTab";
import AnalysisTab from "./AnalysisTab";
import HistoryTab from "./HistoryTab";
import { useAccuracy } from "../hooks/useAccuracy";

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { accuracyData } = useAccuracy();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 ml-64 p-10">
        <header className="mb-10 border-b border-gray-200 pb-6">
          <h1 className="text-3xl font-black text-gray-900">
            {activeTab === "dashboard" && "Dashboard"}
            {activeTab === "inventory" && "Manajemen Stok Harian"}
            {activeTab === "analysis" && "Analisis & Periode"}
            {activeTab === "history" && "Riwayat Analisis"}
          </h1>
          <p className="text-gray-500 font-medium italic">Sistem Pendukung Keputusan Penentuan Stok Barang</p>
        </header>

        {activeTab === "dashboard" && <DashboardTab accuracyData={accuracyData} />}
        {activeTab === "inventory" && <InventoryTab activeTab={activeTab} />}
        {activeTab === "analysis" && <AnalysisTab />}
        {activeTab === "history" && <HistoryTab />}
      </main>
    </div>
  );
}