import { Button } from "@/components/ui/button"; 
import { cn } from "@/lib/utils";

function NavButton({ item, isActive, onClick }: { item: any; isActive: boolean; onClick: () => void }) {
  const Icon = item.icon;
  
  return (
    <Button
      variant="ghost" 
      onClick={onClick}
      className={cn(
        "group relative w-full justify-start gap-3.5 py-7 px-4 rounded-xl transition-all duration-300",
        isActive 
          ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-md hover:bg-sidebar-accent" 
          : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
      )}
    >
      <span className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
        isActive 
          ? "gradient-primary text-white shadow-blue-500/50" 
          : "bg-sidebar-accent/40 group-hover:bg-sidebar-accent"
      )}>
        <Icon size={18} />
      </span>
      <span className="text-sm font-semibold tracking-wide">{item.label}</span>
    </Button>
  );
}

export default NavButton;