// API utility functions for making HTTP requests

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// Generic API request function
export const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_URL}${endpoint}`;

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  login: async (credentials) => {
    return apiRequest("/api/user/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  signup: async (userInfo) => {
    return apiRequest("/api/user/signup", {
      method: "POST",
      body: JSON.stringify(userInfo),
    });
  },
};

export default { apiRequest, authAPI };