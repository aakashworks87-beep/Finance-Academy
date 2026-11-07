/**
 * Backend API configuration
 * Prepared for cross-origin hosting (e.g. GitHub Pages) with Cloud Run backend.
 */
// When running in local dev or deployed on the same server, use relative path so local tests and dev server hit local endpoints.
// On GitHub Pages, use the live Cloud Run backend URL.
const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

export const BACKEND_BASE_URL = isLocal
  ? ''
  : 'https://ais-dev-go3g32rkwrmxlyvwgidedn-813067729840.asia-southeast1.run.app';

export const API_ENDPOINTS = {
  health: `${BACKEND_BASE_URL}/api/health`,
  chat: `${BACKEND_BASE_URL}/api/chat`,
  tts: `${BACKEND_BASE_URL}/api/tts`,
  regulatoryTopics: `${BACKEND_BASE_URL}/api/regulatory-topics`,
  rbiFeeds: `${BACKEND_BASE_URL}/api/feeds/rbi`,
  sebiFeeds: `${BACKEND_BASE_URL}/api/feeds/sebi`,
};
