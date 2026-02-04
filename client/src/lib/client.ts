import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.PROD
    ? import.meta.env.VITE_API_URL || '/api'
    : 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
