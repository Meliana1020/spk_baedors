import { Pencil, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TableSkeleton } from "@/components/dasboard/skeleton";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface InventoryTableProps {
  loading: boolean;
  logs: any[];
  onEdit: (log: any) => void;
  onDelete: (id: string | number) => void;
}

function InventoryTable({ loading, logs, onEdit, onDelete }: InventoryTableProps) {
  return (
    <Card className="glass border-none overflow-hidden transition-all duration-500">
      <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/5">
        <h3 className="font-bold text-foreground">Daftar Transaksi Harian</h3>
        <span className="text-[10px] text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
          {logs.length} Records Found
        </span>
      </div>

      {loading ? (
        <TableSkeleton />
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/10">
                <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Tanggal
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Produk
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">
                  Jumlah
                </TableHead>
                <TableHead className="px-6 py-4 text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] text-center">
                  Aksi
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.length > 0 ? (
                logs.map((log) => (
                  <TableRow 
                    key={log.id} 
                    className="border-white/5 hover:bg-blue-500/5 transition-colors group"
                  >
                    <TableCell className="px-6 py-4 text-muted-foreground text-xs font-medium">
                      {log.transaction_date}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-bold text-foreground">
                      {log.product_name}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 font-black text-[11px] border border-blue-500/20 whitespace-nowrap">
                        {log.quantity_sold} UNIT
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(log)}
                          className="bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-xl h-9 w-9 transition-all active:scale-90"
                        >
                          <Pencil size={15} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(log.id)}
                          className="bg-rose-500/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl h-9 w-9 transition-all active:scale-90"
                        >
                          <Trash2 size={15} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="px-6 py-16 text-center text-muted-foreground italic text-sm"
                  >
                    Belum ada data transaksi tersimpan di database.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </Card>
  );
}

export default InventoryTable;