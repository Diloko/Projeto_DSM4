import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '8bde01dd9413e23e4f16b774e6057f98'
  }
});

export default api;
