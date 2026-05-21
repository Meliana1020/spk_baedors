"use client";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HistoryChartsProps {
  loading: boolean;
  chartData: {
    pie: any[];
    products: any[];
  };
}

export default function HistoryCharts({ loading, chartData }: HistoryChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass border-none">
        <CardHeader>
          <CardTitle className="text-base font-bold text-foreground">
            Distribusi Kelarisan
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[260px] bg-white/5 animate-pulse rounded-xl" />
          ) : chartData.pie.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={chartData.pie}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} className="outline-none" />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    background: "rgba(238, 238, 245, 0.95)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 12
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="Tidak ada data untuk periode ini" />
          )}
        </CardContent>
      </Card>

      <Card className="glass border-none">
        <CardHeader>
          <CardTitle className="text-base font-bold text-foreground">
            Top Produk (Total Penjualan)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="h-[260px] bg-white/5 animate-pulse rounded-xl" />
          ) : chartData.products.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={chartData.products}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={1} />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity={0.6} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" angle={-20} textAnchor="end" height={60} tick={{ fontSize: 10, fill: "gray" }} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "gray" }} axisLine={false} />
                <Tooltip
                  cursor={false}
                  contentStyle={{
                    background: "var(--popover)",
                    color: "var(--popover-foreground)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px"
                  }}
                  itemStyle={{ color: "var(--popover-foreground)" }}
                  labelStyle={{ color: "var(--popover-foreground)", fontWeight: "bold" }}
                />
                <Bar dataKey="total" fill="url(#barGradient)" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState message="Data statistik kosong" />
          )}
        </CardContent>
      </Card>
    </div>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="h-[260px] flex items-center justify-center text-muted-foreground text-sm italic">
      {message}
    </div>
  );
}