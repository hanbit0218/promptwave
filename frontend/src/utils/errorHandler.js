// src/utils/errorHandler.js
/**
 * Parses API error responses
 * @param {Error} error - The error object from try/catch
 * @returns {string} - User-friendly error message
 */
export const parseApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const { status } = error.response;
    
    if (status === 401 || status === 403) {
      return 'Authentication error. Please try again later.';
    }
    
    if (status === 404) {
      return 'The requested resource was not found.';
    }
    
    if (status === 429) {
      return 'Too many requests. Please try again later.';
    }
    
    if (status >= 500) {
      return 'Server error. Please try again later.';
    }
    
    // Try to get error message from response
    const message = error.response.data?.error || error.response.data?.message;
    if (message) {
      return message;
    }
  } else if (error.request) {
    // The request was made but no response was received
    return 'No response from server. Please check your connection.';
  }
  
  // Something happened in setting up the request that triggered an Error
  return error.message || 'An unexpected error occurred. Please try again.';
};