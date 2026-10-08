/**
 * Client service for retrieving normalized coding profiles & public activity.
 * Incorporates client-side session caching and graceful fallback handling.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';
const STORAGE_KEY = 'vp_coding_profiles_cache';
const CLIENT_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

export async function fetchCodingProfiles() {
  // Check client sessionStorage cache
  try {
    const cachedItem = sessionStorage.getItem(STORAGE_KEY);
    if (cachedItem) {
      const parsed = JSON.parse(cachedItem);
      if (Date.now() - parsed.timestamp < CLIENT_CACHE_TTL_MS) {
        return parsed.data;
      }
    }
  } catch {
    // SessionStorage read failure ignored
  }

  // Fetch from backend API
  try {
    const response = await fetch(`${API_BASE_URL}/coding-profiles`, {
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profiles: ${response.status}`);
    }

    const json = await response.json();
    if (json.success && json.data) {
      try {
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            data: json.data,
            timestamp: Date.now()
          })
        );
      } catch {
        // Storage write failure ignored
      }
      return json.data;
    }
  } catch {
    // External service failure is non-blocking
  }

  return null;
}
