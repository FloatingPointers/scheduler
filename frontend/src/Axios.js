import axios from "axios";
const token = localStorage.getItem('token');
const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:8000', 
    timeout: 5000
  });   // 5 seconds
axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
export default axiosInstance;
