import axios from "axios";
import { store } from "./redux/store";
import { logout } from "./redux/slices/authSlice";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors to inject JWT token from Redux store
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.accessToken;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch(logout());
      if (typeof window !== "undefined") {
        // Optional: window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;
