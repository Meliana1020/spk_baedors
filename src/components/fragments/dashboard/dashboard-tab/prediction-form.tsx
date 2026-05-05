import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCcw, Sparkles } from "lucide-react";
import { predictProduct } from "@/lib/mockApi";

function PredictionForm({ loading, inputQty, setInputQty, onPredict, prediction }: any) {
  return (
    <Card className="lg:col-span-3 glass border-none overflow-hidden relative">
      <CardContent className="p-7">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-blue-600 rounded-xl"><Sparkles className="text-white" size={20} /></div>
          <div><h2 className="text-lg font-bold">Uji Prediksi Manual</h2></div>
        </div>
        <form onSubmit={onPredict} className="space-y-4">
          <Input 
            type="number" 
            value={inputQty || ""} 
            onChange={(e) => setInputQty(Number(e.target.value))} 
            placeholder="Misal: 150"
            className="bg-white/5 border-white/10"
          />
          <Button disabled={loading} className="w-full bg-blue-600 py-6 font-black">
            {loading ? <RefreshCcw className="animate-spin mr-2" /> : <Sparkles className="mr-2" />}
            HITUNG KLASIFIKASI
          </Button>
        </form>
        {prediction && <PredictionResult result={prediction.prediction} />}
      </CardContent>
    </Card>
  );
}

function PredictionResult({ result }: { result: string }) {
  const colors = result === "Laris" ? "text-emerald-500 bg-emerald-500/20" : result === "Kurang Laris" ? "text-amber-500 bg-amber-500/20" : "text-rose-500 bg-rose-500/20";
  return (
    <div className={`mt-6 p-6 rounded-2xl ${colors} text-center animate-slide-up`}>
      <p className="text-[10px] font-bold uppercase mb-2">Status Produk</p>
      <h3 className="text-4xl font-black">{result}</h3>
    </div>
  );
}

export default PredictionForm;