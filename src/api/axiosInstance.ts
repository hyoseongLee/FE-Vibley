import axios from 'axios';

const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  return { accessToken };
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = getAuthHeaders();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('[API Error]', error.response.status, error.response.data);

      if (error.response.status === 401) {
        alert('세션이 만료되었어요. 다시 로그인해주세요.');
        localStorage.removeItem('accessToken');
        location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
