// components/fragments/theme-toggle.tsx
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  theme: string;
  onToggle: () => void;
  className?: string;
}

function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  return (
    <div className={cn("relative", className)}> 
      <button
        onClick={onToggle}
        type="button"
        className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl glass border border-border hover:bg-muted/50 transition-all active:scale-90 shadow-sm group"
      >
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-sidebar-accent/40 group-hover:bg-sidebar-accent transition">
          {theme === "dark" ? (
            <Sun size={18} className="text-amber-400" />
          ) : (
            <Moon size={18} className="text-blue-600" />
          )}
        </div>
        <span className="text-sm font-semibold">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </button>
    </div>
  );
}

export default ThemeToggle;