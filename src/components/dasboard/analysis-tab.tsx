"use client";

import { useAnalysis } from "@/hooks/useAnalysis";
import { Calendar, Sparkles, RefreshCcw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableSkeleton } from "./skeleton";
import AnalysisResultsTable from "../fragments/dashboard/analysis/result-table";
import TimeChoice from "../fragments/dashboard/analysis/time-choice";
import QuickFilters from "../fragments/dashboard/analysis/quick-filter";

export default function AnalysisTab() {
  const {
    startDate, setStartDate,
    endDate, setEndDate,
    results, loading,
    periodType, setQuickRange,
    executeAnalysis
  } = useAnalysis();

  return (
    <div className="space-y-7 animate-fade-in">
      {/* --- SECTION 1: FILTER & FORM --- */}
      <Card className="glass border-none relative overflow-hidden">
        <div className="absolute -top-16 -left-16 w-52 h-52 bg-blue-500/15 blur-3xl rounded-full" />
        <CardContent className="p-7 relative">
          <TimeChoice />
          
          <QuickFilters activeType={periodType} onSelect={setQuickRange} />

          <div className="flex gap-3 items-end flex-col md:flex-row mt-6">
            <div className="w-full md:flex-1">
              <DateLabel>Dari Tanggal</DateLabel>
              <Input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-white/5 border-white/10 py-6"
              />
            </div>
            <div className="w-full md:flex-1">
              <DateLabel>Sampai Tanggal</DateLabel>
              <Input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-white/5 border-white/10 py-6"
              />
            </div>
            <Button 
              onClick={executeAnalysis} 
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 py-6 px-8 font-bold shadow-lg shadow-blue-600/30"
            >
              {loading ? <RefreshCcw className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
              MULAI ANALISIS
            </Button>
          </div>
        </CardContent>
      </Card>

      {(loading || results.length > 0) && (
        <AnalysisResultsTable loading={loading} results={results} />
      )}
    </div>
  );
}

function DateLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest block mb-1.5 ml-1">
      {children}
    </label>
  );
}