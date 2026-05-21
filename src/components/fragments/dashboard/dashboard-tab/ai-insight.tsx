"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, ArrowUpRight, AlertCircle, AlertTriangle } from "lucide-react";

interface ChartDataItem {
  name: string;
  total: number;
}

export default function AiInsights({ chartData }: { chartData: ChartDataItem[] }) {
  if (!chartData || chartData.length === 0) return null;

  const laris = chartData.filter((item) => item.total > 100);
  const kurangLaris = chartData.filter((item) => item.total >= 20 && item.total <= 100);
  const tidakLaris = chartData.filter((item) => item.total < 20);

  return (
    <Card className="overflow-hidden relative col-span-1 lg:col-span-5 border border-slate-200 dark:border-none shadow-md dark:backdrop-blur-md">
      <div className="absolute -top-10 -left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl pointer-events-none hidden dark:block" />
      
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-fuchsia-600 dark:from-blue-400 dark:to-fuchsia-400 font-extrabold">
          <Sparkles size={18} className="text-blue-600 dark:text-blue-400 animate-pulse" /> AI Assistant Analytics
        </CardTitle>
        <p className="text-xs text-slate-500 dark:text-muted-foreground font-medium">
          Analisis otomatis performa penjualan minggu ini beserta rekomendasi aksi rantai pasok.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4 pt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          <div className="p-4 rounded-xl bg-emerald-50/80 dark:bg-emerald-500/[0.03] border border-emerald-200/60 dark:border-emerald-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-500 tracking-wider">Rekomendasi: Restock</span>
              <ArrowUpRight size={16} className="text-emerald-600 dark:text-emerald-500" />
            </div>
            <h3 className="text-sm font-bold">Produk Laris (&gt; 100 unit)</h3>
            {laris.length > 0 ? (
              <ul className="text-xs space-y-1.5 list-disc pl-4 max-h-[150px] overflow-y-auto text-slate-700 dark:text-slate-300">
                {laris.map((p, idx) => (
                  <li key={idx}>
                    <span className="font-bold">{p.name}</span> ({p.total} unit)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 dark:text-muted-foreground italic">Tidak ada produk di kategori ini minggu ini.</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-500/[0.03] border border-amber-200/60 dark:border-amber-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-600 dark:text-amber-500 tracking-wider">Rekomendasi: Pending</span>
              <AlertTriangle size={16} className="text-amber-600 dark:text-amber-500" />
            </div>
            <h3 className="text-sm font-bold ">Kurang Laris (20 - 100 unit)</h3>
            {kurangLaris.length > 0 ? (
              <ul className="text-xs space-y-1.5 list-disc pl-4 max-h-[150px] overflow-y-auto text-slate-700 dark:text-slate-300">
                {kurangLaris.map((p, idx) => (
                  <li key={idx}>
                    <span className="font-bold">{p.name}</span> ({p.total} unit)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 dark:text-muted-foreground italic">Tidak ada produk di kategori ini minggu ini.</p>
            )}
          </div>

          <div className="p-4 rounded-xl bg-rose-50/80 dark:bg-rose-500/[0.03] border border-rose-200/60 dark:border-rose-500/10 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-500 tracking-wider">Jangan Restock</span>
              <AlertCircle size={16} className="text-rose-600 dark:text-rose-500" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-rose-200">Tidak Laris (&lt; 20 unit)</h3>
            {tidakLaris.length > 0 ? (
              <ul className="text-xs space-y-1.5 list-disc pl-4 max-h-[150px] overflow-y-auto text-slate-700 dark:text-slate-300">
                {tidakLaris.map((p, idx) => (
                  <li key={idx}>
                    <span className="font-bold text-slate-900 dark:text-white">{p.name}</span> ({p.total} unit)
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-slate-500 dark:text-muted-foreground italic">Tidak ada produk di kategori ini minggu ini.</p>
            )}
          </div>

        </div>

        <div className="p-3 bg-slate-100/80 dark:bg-white/5 rounded-lg text-xs text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 shadow-inner">
          <strong >Kesimpulan AI:</strong> Fokuskan alokasi modal inventaris minggu depan untuk memperbanyak stok komponen/produk <span className="text-emerald-600 dark:text-emerald-400 font-bold">Laris</span>. Untuk item yang <span className="text-rose-600 dark:text-rose-400 font-bold">Tidak Laris</span>, jalankan strategi promosi bundle untuk menghabiskan sisa stok di gudang agar tidak mengendap menjadi <i>dead stock</i>.
        </div>
      </CardContent>
    </Card>
  );
}