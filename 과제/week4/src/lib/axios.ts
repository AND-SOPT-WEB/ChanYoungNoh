import axios from "axios";

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_WEB_BASE_URL}`,
});

// 요청 인터셉터 설정
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
