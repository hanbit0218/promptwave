import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import { parseApiError } from '../utils/errorHandler';

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds
});

/**
 * Send message to backend
 * @param {string} message - User message
 * @param {Object} options - Additional options (temperature, maxTokens, etc.)
 * @returns {Promise<Object>} - Response data
 */
export const sendMessage = async (message, options = {}) => {
  try {
    const response = await apiClient.post('/chat', { message, options });
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw new Error(parseApiError(error));
  }
};

/**
 * Check API health
 * @returns {Promise<Object>} - Health status
 */
export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check error:', error);
    throw new Error(parseApiError(error));
  }
};