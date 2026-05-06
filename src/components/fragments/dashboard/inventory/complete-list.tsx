import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AutocompleteListProps {
  show: boolean;
  items: string[];
  onSelect: (item: string) => void;
}

function AutocompleteList({ show, items, onSelect }: AutocompleteListProps) {
 if (!show || items.length === 0) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-2 glass rounded-xl shadow-2xl z-50 max-h-48 overflow-y-auto animate-in fade-in slide-in-from-top-2">
      {items.map((p: string, i: number) => (
        <Button
          key={i}
          variant="ghost"
          onMouseDown={() => onSelect(p)}
          className={cn(
            "w-full justify-start px-4 py-6 text-sm font-medium transition-all",
            "hover:bg-blue-500/20 text-foreground rounded-none",
            "border-b border-white/5 last:border-0"
          )}
        >
          {p}
        </Button>
      ))}
    </div>
  );
}

export default AutocompleteList;