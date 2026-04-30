"use client";

import { LayoutDashboard, Package, BarChart3, Clock, Menu, X } from "lucide-react";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setIsOpen(false);
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "inventory", label: "Stok & Transaksi", icon: Package },
    { id: "analysis", label: "Analisis Data", icon: BarChart3 },
    { id: "history", label: "Riwayat Analisis", icon: Clock },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 lg:hidden z-40 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`rounded-tr-4xl fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>

          <div className="mb-10 text-center mt-2">
            <h2 className="text-xl font-bold text-blue-400 tracking-tighter">LM BAEDORS MART</h2>
            <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">
              Sistem Pendukung Keputusan
            </p>
          </div>

          <nav className="space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => handleTabClick(id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg transition ${
                  activeTab === id
                    ? "bg-blue-600 shadow-lg shadow-blue-900 text-white"
                    : "hover:bg-gray-800 text-gray-400 hover:text-gray-200"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}