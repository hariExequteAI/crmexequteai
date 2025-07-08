import axios from 'axios';

const token = localStorage.getItem('token');

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this points to backend
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default API;
