"use client";

import { useTheme } from "@/lib/theme";
import { 
  LayoutDashboard, Package, BarChart3, Clock, 
  Menu, X, LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area"; 
import { cn } from "@/lib/utils";
import NavButton from "../fragments/dashboard/sidebar/nav-button";
import SidebarAction from "../fragments/dashboard/sidebar/action";
import SidebarHeader from "../fragments/dashboard/sidebar/header";
import ThemeToggle from "@/components/fragments/theme-toggle";

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "inventory", label: "Stok & Transaksi", icon: Package },
  { id: "analysis", label: "Analisis Data", icon: BarChart3 },
  { id: "history", label: "Riwayat Analisis", icon: Clock },
];

export default function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: SidebarProps) {
  const { theme, toggle } = useTheme();

  const handleLogout = () => {
    if (confirm("Apakah Anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 lg:hidden z-50 gradient-primary text-white rounded-2xl shadow-lg"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-background/70 lg:hidden z-[60] backdrop-blur-md animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-sidebar text-sidebar-foreground z-[70] border-r border-sidebar-border transition-transform duration-500 ease-out lg:translate-x-0 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >

        <SidebarHeader />

        <ScrollArea className="flex-1 px-4 mt-2">
          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => (
              <NavButton
                key={item.id}
                item={item}
                isActive={activeTab === item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  if (window.innerWidth < 1024) setIsOpen(false);
                }}
              />
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 mt-auto space-y-2 border-t border-sidebar-border">
          <ThemeToggle theme={theme} onToggle={toggle} />
          <SidebarAction 
            icon={LogOut} 
            label="Keluar Sistem" 
            onClick={handleLogout}
            variant="destructive"
          />
        </div>
      </aside>
    </>
  );
}