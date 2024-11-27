// axiosInstance.js
import axios from 'axios';
// import applyTokenRefreshInterceptor from './axiosRefreshTokenInterceptor';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken"); // Implement this method to retrieve the current access token
    if (accessToken) {
      config.headers['auth0jwt'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Initialize the interceptor for token refresh logic
// applyTokenRefreshInterceptor(axiosInstance);

export default axiosInstance;