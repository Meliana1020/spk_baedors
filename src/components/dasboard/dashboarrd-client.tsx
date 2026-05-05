import { useState } from "react";
import Sidebar from "./sidebar";
import DashboardTab from "./dashboard-tab";
import InventoryTab from "./inventory-tab";
import AnalysisTab from "./analysis-tab";
import HistoryTab from "./history-tab";
import { useAccuracy } from "@/hooks/useAccurancy";

const titles: Record<string, { title: string; subtitle: string }> = {
  dashboard: { title: "Dashboard", subtitle: "Ringkasan performa & prediksi" },
  inventory: { title: "Manajemen Stok Harian", subtitle: "Catat & kelola transaksi" },
  analysis: { title: "Analisis & Periode", subtitle: "Klasifikasi berbasis waktu" },
  history: { title: "Riwayat Analisis", subtitle: "Insight historis penjualan" },
};

export default function DashboardClient() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const meta = titles[activeTab];
  const { accuracyData } = useAccuracy();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="w-full lg:ml-72 transition-all duration-300 bg-background">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-background/70 border-b border-border px-4 md:px-8 lg:px-10 py-5 pl-20 lg:pl-10">
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-black tracking-tight text-foreground truncate">
                {meta.title}
              </h1>
              <p className="text-sm text-muted-foreground font-medium mt-0.5">{meta.subtitle}</p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full glass">
              <span className="w-2 h-2 rounded-full bg-success animate-glow-pulse" />
              <span className="text-xs font-bold text-foreground">SPK Aktif</span>
            </div>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-10">
          {activeTab === "dashboard" && (
            <DashboardTab accuracyData={accuracyData} />
          )}
          
          {activeTab === "inventory" && (
            <InventoryTab />
          )}
          
          {activeTab === "analysis" && (
            <AnalysisTab />
          )}
          
          {activeTab === "history" && (
            <HistoryTab />
          )}
        </div>
      </main>
    </div>
  );
}
