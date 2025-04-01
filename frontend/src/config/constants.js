// src/config/constants.js
// API URLs
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Chat settings
export const DEFAULT_MAX_TOKENS = 500;
export const DEFAULT_TEMPERATURE = 0.7;
export const MAX_MESSAGE_LENGTH = 4000;

// UI settings
export const MESSAGE_ANIMATION_DURATION = 300; // ms
export const MAX_INPUT_ROWS = 5;