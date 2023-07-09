import axios from "axios";

const axiosInstance = axios.create(
  {
    baseURL: 'http://localhost:8000', 
    timeout: 5000
  });   // 5 seconds

export default axiosInstance;
