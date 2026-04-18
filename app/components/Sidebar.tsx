"use client";

import { LayoutDashboard, Package, BarChart3, Clock } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 bg-gray-900 text-white fixed h-full p-6 shadow-xl z-50">
      <div className="mb-10 text-center">
        <h2 className="text-xl font-bold text-blue-400 tracking-tighter">LM BAEDORS MART</h2>
        <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Sistem Pendukung Keputusan</p>
      </div>
      <nav className="space-y-2">
        <button onClick={() => setActiveTab("dashboard")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "dashboard" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><LayoutDashboard size={18}/> Dashboard</button>
        <button onClick={() => setActiveTab("inventory")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "inventory" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><Package size={18}/> Stok & Transaksi</button>
        <button onClick={() => setActiveTab("analysis")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "analysis" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><BarChart3 size={18}/> Analisis Data</button>
        <button onClick={() => setActiveTab("history")} className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${activeTab === "history" ? "bg-blue-600 shadow-lg shadow-blue-900" : "hover:bg-gray-800 text-gray-400"}`}><Clock size={18}/> Riwayat Analisis</button>
      </nav>
    </aside>
  );
}