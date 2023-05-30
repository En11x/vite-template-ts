import axios from 'axios';

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

//请求拦截
http.interceptors.request.use((config) => {
  config.headers.authorization = 'Bearer ';

  return config;
});

//响应拦截
http.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default http;
