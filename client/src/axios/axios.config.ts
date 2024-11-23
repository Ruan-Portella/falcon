import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosConfig;
