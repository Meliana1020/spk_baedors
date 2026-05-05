import { Button } from "@/components/ui/button";

function QuickFilters({ activeType, onSelect }: any) {
  const options = [
    { id: "weekly", label: "MINGGUAN · 7 HARI" },
    { id: "monthly", label: "BULANAN · 30 HARI" },
  ];

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {options.map((opt) => (
        <Button
          key={opt.id}
          variant={activeType === opt.id ? "default" : "secondary"}
          onClick={() => onSelect(opt.id)}
          className={`text-xs font-bold tracking-wider rounded-xl ${
            activeType === opt.id ? "bg-blue-600" : "bg-white/5 text-muted-foreground"
          }`}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}

export default QuickFilters;