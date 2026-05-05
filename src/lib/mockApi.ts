// Mock data layer untuk demo. Di project asli, ganti dengan import dari "../../lib/api".

const wait = (ms = 600) => new Promise((r) => setTimeout(r, ms));

let dailyLogs: any[] = [
  { id: "1", product_name: "Minyak Goreng", quantity_sold: 150, transaction_date: "2026-04-30" },
  { id: "2", product_name: "Gula Pasir", quantity_sold: 85, transaction_date: "2026-04-30" },
  { id: "3", product_name: "Beras Premium", quantity_sold: 180, transaction_date: "2026-04-29" },
  { id: "4", product_name: "Telur Ayam", quantity_sold: 95, transaction_date: "2026-04-29" },
  { id: "5", product_name: "Susu UHT", quantity_sold: 12, transaction_date: "2026-04-28" },
  { id: "6", product_name: "Kopi Sachet", quantity_sold: 220, transaction_date: "2026-04-28" },
];

const classify = (qty: number) =>
  qty > 100 ? "Laris" : qty >= 20 ? "Kurang Laris" : "Tidak Laris";

export async function predictProduct(qty: number) {
  await wait(800);
  return { data: { prediction: classify(qty) } };
}

export async function getAccuracy() {
  await wait(400);
  return { data: { total_data: dailyLogs.length, accuracy: "94.2%" } };
}

export async function getDailyLogs() {
  await wait(500);
  return { data: [...dailyLogs] };
}

export async function createDailyLog(payload: any) {
  await wait();
  dailyLogs.unshift({ id: crypto.randomUUID(), ...payload });
  return { data: { ok: true } };
}

export async function updateDailyLog(id: string, payload: any) {
  await wait();
  dailyLogs = dailyLogs.map((l) => (l.id === id ? { ...l, ...payload } : l));
  return { data: { ok: true } };
}

export async function deleteDailyLog(id: string) {
  await wait();
  dailyLogs = dailyLogs.filter((l) => l.id !== id);
  return { data: { ok: true } };
}

export async function getPeriodicClassification(_p: any) {
  await wait(900);
  const grouped: Record<string, number> = {};
  dailyLogs.forEach((l) => {
    grouped[l.product_name] = (grouped[l.product_name] || 0) + l.quantity_sold;
  });
  const results = Object.entries(grouped).map(([product_name, total_sold]) => ({
    product_name,
    total_sold,
    category: classify(total_sold as number),
  }));
  return { data: { results } };
}

export async function getHistory() {
  await wait(500);
  return {
    data: dailyLogs.map((l) => ({
      id: l.id,
      date: l.transaction_date,
      product_name: l.product_name,
      total_sold: l.quantity_sold,
      category: classify(l.quantity_sold) as "Laris" | "Kurang Laris" | "Tidak Laris",
    })),
  };
}
