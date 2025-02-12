import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://restfulcountries.com/api/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer 2175|T9xa5cKfUH9WfANclwceCG8iN5LgzHmtOaZpeRYg`,
  },
});

export default axiosInstance;
