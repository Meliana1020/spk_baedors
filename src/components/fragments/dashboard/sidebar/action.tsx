import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function SidebarAction({ icon: Icon, label, onClick, variant, iconClassName }: any) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        "w-full justify-start gap-3.5 px-4 py-6 rounded-xl text-muted-foreground hover:text-sidebar-foreground transition-all group",
        variant === "destructive" && "hover:text-destructive hover:bg-destructive/10"
      )}
    >
      <span className={cn(
        "flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-accent/40 group-hover:bg-sidebar-accent transition",
        variant === "destructive" && "group-hover:bg-destructive/20",
        iconClassName
      )}>
        <Icon size={18} />
      </span>
      <span className="text-sm font-semibold">{label}</span>
    </Button>
  );
}

export default SidebarAction;