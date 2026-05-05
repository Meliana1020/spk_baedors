import { Card, CardContent} from "@/components/ui/card";

function ClassificationLegend() {
  const items = [
    { label: "Laris", value: "> 100 Unit", color: "text-emerald-500", dot: "bg-emerald-500" },
    { label: "Kurang Laris", value: "20 - 100 Unit", color: "text-amber-500", dot: "bg-amber-500" },
    { label: "Tidak Laris", value: "< 20 Unit", color: "text-rose-500", dot: "bg-rose-500" },
  ];
  return (
    <Card className="lg:col-span-2 glass border-none">
      <CardContent className="p-7">
        <h2 className="text-lg font-bold mb-6 text-blue-500">Parameter Kelarisan</h2>
        <div className="space-y-3">
          {items.map((p) => (
            <div key={p.label} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-3">
                <span className={`w-2.5 h-2.5 rounded-full ${p.dot} animate-pulse`} />
                <span className="text-sm font-semibold">{p.label}</span>
              </div>
              <span className={`font-mono font-bold text-sm ${p.color}`}>{p.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default ClassificationLegend;