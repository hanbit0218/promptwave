/**
 * Custom error class for API errors
 */
class ApiError extends Error {
  constructor(message, statusCode, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = 'ApiError';
  }
}

/**
 * Handle API errors and send appropriate response
 * @param {Error} err - Error object
 * @param {Object} res - Express response object
 */
const handleApiError = (err, res) => {
  // If it's our custom API error, use its status code and message
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details
    });
  }
  
  // For AWS SDK errors, try to extract useful information
  if (err.name === 'AccessDeniedException') {
    return res.status(403).json({
      error: 'AWS access denied. Check your credentials and permissions.'
    });
  }
  
  if (err.name === 'ValidationException') {
    return res.status(400).json({
      error: 'Invalid request parameters',
      details: err.message
    });
  }
  
  if (err.name === 'ThrottlingException') {
    return res.status(429).json({
      error: 'Request throttled. Please try again later.'
    });
  }
  
  // Default to 500 internal server error
  return res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'production' ? undefined : err.message
  });
};

module.exports = {
  ApiError,
  handleApiError
};