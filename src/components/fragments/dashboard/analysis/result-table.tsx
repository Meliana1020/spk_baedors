import { Card } from "@/components/ui/card";
import { TableSkeleton } from "@/components/dasboard/skeleton";
import { cn } from "@/lib/utils";

function AnalysisResultsTable({ loading, results }: { loading: boolean; results: any[] }) {
  return (
    <Card className="glass border-none overflow-hidden">
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-bold">Hasil Laporan & Klasifikasi</h3>
        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          {results.length} Produk Terdeteksi
        </span>
      </div>
      
      {loading ? <TableSkeleton /> : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-white/5 text-left">
              <tr>
                <TableTh>Produk</TableTh>
                <TableTh>Akumulasi</TableTh>
                <TableTh>Kelarisan</TableTh>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {results.map((item, i) => (
                <tr key={i} className="hover:bg-blue-500/5 transition animate-slide-up">
                  <td className="px-6 py-4 font-bold">{item.product_name}</td>
                  <td className="px-6 py-4 font-medium text-muted-foreground">{item.total_sold} Unit</td>
                  <td className="px-6 py-4"><CategoryBadge category={item.category} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
}

function TableTh({ children }: { children: React.ReactNode }) {
  return (
    <th className="px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-[0.2em]">
      {children}
    </th>
  );
}

function CategoryBadge({ category }: { category: string }) {
  const cfg =
    category === "Laris"
      ? { bg: "bg-emerald-500/15", text: "text-emerald-500", dot: "bg-emerald-500" }
      : category === "Kurang Laris"
      ? { bg: "bg-amber-500/15", text: "text-amber-500", dot: "bg-amber-500" }
      : { bg: "bg-rose-500/15", text: "text-rose-500", dot: "bg-rose-500" };

  return (
    <span className={cn(
      "inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/5",
      cfg.bg, cfg.text
    )}>
      <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse shadow-[0_0_8px_currentColor]", cfg.dot)} />
      {category}
    </span>
  );
}

export default AnalysisResultsTable;