import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const importData = () => api.post('/analysis/import-excel');
export const predictProduct = (qty) => api.post('/analysis/predict', { input_quantity: qty });
export const getAccuracy = () => api.get('/analysis/evaluate');

export default api;