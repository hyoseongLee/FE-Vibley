import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      const prevCode = sessionStorage.getItem('spotify_code_used');

      if (!code || code === prevCode) return;
      sessionStorage.setItem('spotify_code_used', code);

      try {
        const res = await axios.get(`/api/auth/callback?code=${code}`);
        const { accessToken } = res.data;

        localStorage.setItem('accessToken', accessToken);

        navigate('/main');
      } catch (err) {
        console.error('로그인 실패:', err);
        alert('로그인에 실패했어요. 다시 시도해주세요!');
      }
    };

    handleAuth();
  }, [location.search, navigate]);

  return <p>로그인 처리 중입니다...</p>;
};

export default Callback;
