import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const importData = () => api.post('/analysis/import-excel');
export const predictProduct = (qty) => api.post('/analysis/predict', { input_quantity: qty });
export const getAccuracy = () => api.get('/analysis/evaluate');

// Inventory API
export const getDailyLogs = () => api.get('/inventory/daily');
export const createDailyLog = (data) => api.post('/inventory/daily', data);
export const updateDailyLog = (id, data) => api.put(`/inventory/daily/${id}`, data);
export const deleteDailyLog = (id) => api.delete(`/inventory/daily/${id}`);

// Analysis API
export const getPeriodicClassification = (params) => api.get('/analysis/periodic-classification', { params });
export const getAnalysisHistory = (params) => api.get('/analysis/history', { params });

export default api;