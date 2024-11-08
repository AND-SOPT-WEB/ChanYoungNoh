import axios from "axios";

// Axios 기본 인스턴스 생성
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_WEB_BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});