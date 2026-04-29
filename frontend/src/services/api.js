import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create Axios instance with defaults
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Classify a message as spam or ham.
 * @param {string} message - The raw message text.
 * @returns {Promise<object>} Prediction response with confidence.
 */
export async function predictMessage(message) {
  const response = await api.post('/api/predict', { message });
  return response.data;
}

/**
 * Check API health status.
 * @returns {Promise<object>} Health check response.
 */
export async function checkHealth() {
  const response = await api.get('/api/health');
  return response.data;
}

export default api;
