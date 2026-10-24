/**
 * Backend API configuration
 * Prepared for cross-origin hosting (e.g. GitHub Pages) with Cloud Run backend.
 */
export const BACKEND_BASE_URL = 'https://ais-pre-go3g32rkwrmxlyvwgidedn-813067729840.asia-southeast1.run.app';

export const API_ENDPOINTS = {
  health: `${BACKEND_BASE_URL}/api/health`,
  chat: `${BACKEND_BASE_URL}/api/chat`,
  regulatoryTopics: `${BACKEND_BASE_URL}/api/regulatory-topics`,
};
