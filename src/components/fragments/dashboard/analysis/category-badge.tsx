export function CategoryBadge({ category }: { category: string }) {
  const cfg =
    category === "Laris"
      ? { bg: "bg-emerald-500/15", text: "text-emerald-500", dot: "bg-emerald-500" }
      : category === "Kurang Laris"
      ? { bg: "bg-amber-500/15", text: "text-amber-500", dot: "bg-amber-500" }
      : { bg: "bg-rose-500/15", text: "text-rose-500", dot: "bg-rose-500" };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border border-white/5 ${cfg.bg} ${cfg.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse shadow-[0_0_8px_currentColor]`} />
      {category}
    </span>
  );
}