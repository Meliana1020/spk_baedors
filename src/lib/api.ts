import axios from 'axios';

// 1. Definisikan Interface untuk struktur data kamu
export interface DailyLog {
  id?: string | number;
  product_name: string;
  quantity_sold: number;
  transaction_date: string;
}

export interface PredictionResult {
  input_quantity: number;
  prediction: string;
  confidence: number;
}

export interface AnalysisParams {
  startDate?: string;
  endDate?: string;
  category?: string;
  periodType ?: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data: any) => api.post('/auth/login', data);

export const importData = () => 
  api.post('/analysis/import-excel');

export const predictProduct = (qty: number) => 
  api.post<PredictionResult>('/analysis/predict', { input_quantity: qty });

export const getAccuracy = () => 
  api.get('/analysis/evaluate');

export const getDailyLogs = () => 
  api.get<DailyLog[]>('/inventory/daily');

export const createDailyLog = (data: DailyLog) => 
  api.post<DailyLog>('/inventory/daily', data);

export const updateDailyLog = (id: string | number, data: Partial<DailyLog>) => 
  api.put<DailyLog>(`/inventory/daily/${id}`, data);

export const deleteDailyLog = (id: string | number) => 
  api.delete(`/inventory/daily/${id}`);

export const getPeriodicClassification = (params: AnalysisParams) => 
  api.get('/analysis/periodic-classification', { params });

export const getAnalysisHistory = (params: AnalysisParams) => 
  api.get('/analysis/history', { params });

export default api;