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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { accuracyData } = useAccuracy();

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <main className="w-full lg:ml-64 transition-all duration-300">
        {/* Header */}
      <header className="sticky top-0 bg-white border-b border-gray-200 shadow-sm z-20 p-4 md:p-6 lg:p-10 lg:pl-10 pl-18 md:pl-18">
            <div className="flex-1 min-w-0">
              <h1 className="text-xl md:text-2xl font-black text-gray-900 truncate">
                {activeTab === "dashboard" && "Dashboard"}
                {activeTab === "inventory" && "Manajemen Stok Harian"}
                {activeTab === "analysis" && "Analisis & Periode"}
                {activeTab === "history" && "Riwayat Analisis"}
              </h1>
              <p className="text-gray-500 font-medium italic text-sm md:text-base">
                Sistem Pendukung Keputusan Penentuan Stok Barang
              </p>
            </div>
        </header>

        {/* Content */}
        <div className="p-4 md:p-6 lg:p-10">
          {activeTab === "dashboard" && <DashboardTab accuracyData={accuracyData} />}
          {activeTab === "inventory" && <InventoryTab activeTab={activeTab} />}
          {activeTab === "analysis" && <AnalysisTab />}
          {activeTab === "history" && <HistoryTab />}
        </div>
      </main>
    </div>
  );
}