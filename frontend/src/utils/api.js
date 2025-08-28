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
  // check if email exists and send OTP
  checkandsendotp: async (userData) => {
    return apiRequest("/auth/check-and-send-otp", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  // verify OTP
  verifyOTP: async (data, otp) => {
    return apiRequest("/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ data, otp }),
    });
  },

  // resend OTP
  resendOTP: async (email) => {
    return apiRequest("/auth/resend-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  login: async (credentials) => {
    return apiRequest("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  // Step 1: send OTP for password reset
  sendResetOtp: async (email) => {
    return apiRequest("/auth/send-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  // Step 2: verify OTP and change password
  verifyResetOtpAndChangePassword: async (email, otp, newPassword) => {
    return apiRequest("/auth/verify-reset-otp", {
      method: "POST",
      body: JSON.stringify({ email, otp, newPassword }),
    });
  },
};

export default { apiRequest, authAPI };