import axios from 'axios';

// 🔐 토큰, spotifyId 가져오는 함수
const getAuthHeaders = () => {
  const accessToken = localStorage.getItem('accessToken');
  const spotifyId = localStorage.getItem('spotifyId');
  return { accessToken, spotifyId };
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken, spotifyId } = getAuthHeaders();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (spotifyId) {
      config.headers.spotifyid = spotifyId; // Express는 소문자 key만 인식
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
        // location.href = '/'; // 자동 리다이렉션 가능
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
