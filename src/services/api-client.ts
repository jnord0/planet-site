import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.DEV 
    ? '/api' 
    : 'https://api.api-ninjas.com/v1',
  headers: {
    'X-Api-Key': import.meta.env.VITE_API_KEY
  }
});

export default apiClient;