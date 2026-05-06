"use client";

import { useHistory } from "@/hooks/useHistory";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CategoryBadge } from "@/components/fragments/dashboard/analysis/category-badge";
import { TableSkeleton, CardSkeleton } from "./skeleton";
import HistoryCharts from "../fragments/dashboard/history/charts"; // Modularisasi chart bre

export default function HistoryTab() {
  const {
    filteredData, loading, startDate, setStartDate, endDate, setEndDate,
    activeFilter, setActiveFilter, setQuickRange, showAll, chartData
  } = useHistory();

  return (
    <div className="space-y-7 animate-fade-in">
      {/* 1. FILTER SECTION */}
      <Card className="glass border-none relative overflow-hidden">
        <div className="absolute -top-16 -right-16 w-52 h-52 bg-blue-500/10 blur-3xl rounded-full" />
        <CardContent className="p-7 relative">
          <h2 className="text-lg font-bold mb-5 flex items-center gap-2">
            <Calendar size={18} className="text-blue-500" /> Filter Riwayat Analisis
          </h2>

          <div className="flex gap-2 mb-5 flex-wrap">
            {[7, 30, 90].map((days) => (
              <Button
                key={days}
                variant={activeFilter === days ? "default" : "secondary"}
                onClick={() => setQuickRange(days)}
                className={`rounded-xl text-xs font-bold ${activeFilter === days ? "bg-blue-600 shadow-blue-600/30 shadow-lg" : "bg-white/5"}`}
              >
                {days} HARI
              </Button>
            ))}
            <Button variant={activeFilter === "all" ? "default" : "secondary"} onClick={showAll} className={activeFilter === "all" ? "bg-blue-600 shadow-lg shadow-blue-600/30 rounded-xl" : "bg-white/5 rounded-xl"}>
              SEMUA
            </Button>
          </div>

          <div className="flex gap-3 flex-col sm:flex-row">
            <div className="flex-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block ml-1">Dari</label>
              <Input type="date" value={startDate} onChange={(e) => { setStartDate(e.target.value); setActiveFilter(null); }} className="bg-white/5 border-white/10 py-6" />
            </div>
            <div className="flex-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase mb-1.5 block ml-1">Sampai</label>
              <Input type="date" value={endDate} onChange={(e) => { setEndDate(e.target.value); setActiveFilter(null); }} className="bg-white/5 border-white/10 py-6" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 2. CHARTS SECTION (Modularized) */}
      <HistoryCharts loading={loading} chartData={chartData} />

      {/* 3. SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {loading ? <CardSkeleton /> : (
          <>
            <SummaryCard label="Produk Laris" value={chartData.stats.Laris} color="text-emerald-500" glow="bg-emerald-500/20" count={filteredData.length} />
            <SummaryCard label="Kurang Laris" value={chartData.stats["Kurang Laris"]} color="text-amber-500" glow="bg-amber-500/20" count={filteredData.length} />
            <SummaryCard label="Tidak Laris" value={chartData.stats["Tidak Laris"]} color="text-rose-500" glow="bg-rose-500/20" count={filteredData.length} />
          </>
        )}
      </div>

      {/* 4. HISTORY TABLE */}
      <Card className="glass border-none overflow-hidden">
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-bold flex items-center gap-2 italic text-sm">
            <Calendar size={16} className="text-blue-500" /> Riwayat Analisis Lengkap
          </h3>
        </div>
        {loading ? <TableSkeleton rows={5} /> : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5 uppercase tracking-widest text-[10px] font-bold">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="px-6 py-4">Tanggal</TableHead>
                  <TableHead className="px-6 py-4">Produk</TableHead>
                  <TableHead className="px-6 py-4">Penjualan</TableHead>
                  <TableHead className="px-6 py-4 text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.length > 0 ? (
                  filteredData.map((item:any) => (
                    <TableRow key={item.id} className="border-white/5 hover:bg-blue-500/5 group transition-colors">
                      <TableCell className="px-6 py-4 text-muted-foreground text-xs">{item.date}</TableCell>
                      <TableCell className="px-6 py-4 font-bold">{item.product_name}</TableCell>
                      <TableCell className="px-6 py-4">
                        <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-black text-[11px] border border-blue-500/20">
                          {item.total_sold} UNIT
                        </span>
                      </TableCell>
                      <TableCell className="px-6 py-4 text-center">
                        <CategoryBadge category={item.category} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="px-6 py-16 text-center text-muted-foreground italic text-sm">Tidak ada riwayat ditemukan.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}

function SummaryCard({ label, value, color, glow, count }: any) {
  return (
    <Card className="glass border-none relative overflow-hidden hover:scale-[1.02] transition-transform duration-300">
      <div className={`absolute -top-10 -right-10 w-32 h-32 ${glow} blur-3xl rounded-full`} />
      <CardContent className="p-6">
        <p className={`text-[10px] ${color} font-black uppercase tracking-[0.2em] mb-2`}>{label}</p>
        <p className={`text-5xl font-black ${color}`}>{value}</p>
        <p className="text-[10px] text-muted-foreground mt-2 font-bold italic">Berdasarkan {count} sampel data</p>
      </CardContent>
    </Card>
  );
}