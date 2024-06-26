import axios from 'axios';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'X-Api-Key': 'o3DypUsg/xYdjRLyLpOiqA==h9aWfdlGu1InTVUt'
  }
});

export default apiClient;