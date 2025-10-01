import axios from 'axios';

const API_VERSION = process.env.REACT_APP_API_VERSION || 'v1';

const trimTrailingSlash = (value = '') => value.replace(/\/+$/, '');

const resolveBaseUrl = () => {
  const explicitBase = process.env.REACT_APP_API_BASE_URL;
  if (explicitBase) {
    return `${trimTrailingSlash(explicitBase)}/${API_VERSION}`;
  }

  if (process.env.NODE_ENV === 'development') {
    const devOrigin = process.env.REACT_APP_DEV_API_BASE_URL || 'http://localhost:5001';
    return `${trimTrailingSlash(devOrigin)}/api/${API_VERSION}`;
  }

  if (typeof window !== 'undefined' && window.location?.origin) {
    return `${trimTrailingSlash(window.location.origin)}/api/${API_VERSION}`;
  }

  return `/api/${API_VERSION}`;
};

const client = axios.create({
  baseURL: resolveBaseUrl(),
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

client.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('authToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (e) {
    // no-op
  }
  return config;
});

client.interceptors.response.use(
  (resp) => resp,
  (error) => {
    if (error?.response?.status === 401) {
      // Optionally handle global unauthorized
      // e.g., redirect to login or clear token
      // localStorage.removeItem('authToken');
    }
    return Promise.reject(error);
  }
);

export default client;
