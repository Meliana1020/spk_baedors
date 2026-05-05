import { Calendar } from "lucide-react";

function TimeChoice() {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-blue-600 rounded-xl shadow-blue-500/40 shadow-lg">
        <Calendar className="text-white" size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold">Klasifikasi Berdasarkan Waktu</h2>
        <p className="text-xs text-muted-foreground">Pilih rentang waktu analisis SPK</p>
      </div>
    </div>
  );
}

export default TimeChoice;