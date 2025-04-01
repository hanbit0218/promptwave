/**
 * Application constants
 */
module.exports = {
  // Default model settings
  DEFAULT_MODEL: 'anthropic.claude-v2',
  DEFAULT_MAX_TOKENS: 500,
  DEFAULT_TEMPERATURE: 0.7,
  DEFAULT_TOP_P: 0.95,
  
  // Rate limiting
  RATE_LIMIT_WINDOW_MS: 60 * 1000, // 1 minute
  RATE_LIMIT_MAX_REQUESTS: 20, // 20 requests per minute
  
  // Security
  CORS_ORIGINS: process.env.CORS_ORIGINS || '*',
  
  // Validation
  MAX_MESSAGE_LENGTH: 4000, // Maximum message length in characters
};