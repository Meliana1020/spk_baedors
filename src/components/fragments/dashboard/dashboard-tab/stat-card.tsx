import { Card, CardContent } from "@/components/ui/card";

function StatCard({ label, value, icon: Icon, color, index }: any) {
  return (
    <Card className="glass border-none relative overflow-hidden group hover:scale-[1.02] transition-transform duration-500">
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl`} />
      <CardContent className="p-6 flex items-start justify-between relative">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">{label}</p>
          <p className="text-3xl font-black">{value}</p>
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon size={22} />
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;