import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Api-Key': import.meta.env.VITE_API_KEY
  }
});

export default apiClient;