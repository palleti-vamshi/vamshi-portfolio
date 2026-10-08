/**
 * Frontend API Service Layer
 * Centralizes all HTTP interactions with the backend service.
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api';

/**
 * Generic request wrapper with JSON serialization and structured error handling
 */
async function request(endpoint, options = {}) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  let data;
  try {
    data = await response.json();
  } catch (error) {
    throw new Error(`Failed to parse response: ${error.message}`);
  }

  if (!response.ok) {
    const errorMessage = data?.message || `Request failed with status ${response.status}`;
    const error = new Error(errorMessage);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

/**
 * Health check endpoint service
 */
export async function checkHealth() {
  return request('/health');
}

export default {
  checkHealth
};
