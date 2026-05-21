"use client";

import { useDashboardData } from "@/hooks/useDashboard";
import { BrainCircuit, Database, CheckCircle2, TrendingUp} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import StatCard from "../fragments/dashboard/dashboard-tab/stat-card";
import PredictionForm from "../fragments/dashboard/dashboard-tab/prediction-form";
import ClassificationLegend from "../fragments/dashboard/dashboard-tab/clasification-legend";
import AiInsights from "../fragments/dashboard/dashboard-tab/ai-insight";

export default function DashboardTab({ accuracyData }: { accuracyData: any }) {
  const { inputQty, setInputQty, prediction, loading, chartData, handlePredict } = useDashboardData();

  const stats = [
    { label: "Data Training", value: accuracyData?.total_data || 0, icon: Database, color: "from-blue-500 to-cyan-500" },
    { label: "Akurasi SPK", value: accuracyData?.accuracy || "0%", icon: CheckCircle2, color: "from-emerald-500 to-teal-500" },
    { label: "Metode", value: "Gaussian NB", icon: BrainCircuit, color: "from-violet-500 to-fuchsia-500" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} index={i} />
        ))}
      </div>

      <Card className="glass border-none">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-400" /> Top Produk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
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
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <AiInsights chartData={accuracyData?.raw_sales_data || chartData} />
        <PredictionForm 
          loading={loading} 
          inputQty={inputQty} 
          setInputQty={setInputQty} 
          onPredict={handlePredict} 
          prediction={prediction} 
        />
        <ClassificationLegend />
      </div>
    </div>
  );
}