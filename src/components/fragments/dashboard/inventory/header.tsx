import { Package2 } from "lucide-react";

function InventoryFormHeader({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/40">
        <Package2 className="text-white" size={20} />
      </div>
      <div>
        <h2 className="text-lg font-bold">{isEditing ? "Edit Transaksi" : "Input Barang Keluar"}</h2>
        <p className="text-xs text-muted-foreground">Catat penjualan harian Mart</p>
      </div>
    </div>
  );
}

export default InventoryFormHeader;