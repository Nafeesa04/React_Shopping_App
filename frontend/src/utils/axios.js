// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://onlineshop-backend04.azurewebsites.net', // Backend API base URL
});

export default instance;