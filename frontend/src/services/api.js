import axios from 'axios';

//configuramos URL base de la API
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export default api;