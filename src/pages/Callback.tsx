import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from '../api/axiosInstance';

const Callback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const prevCode = sessionStorage.getItem('spotify_code_used');

    if (code && code !== prevCode) {
      // ✅ 같은 code로 중복 요청 막기
      sessionStorage.setItem('spotify_code_used', code);

      axios
        .get(`/api/auth/callback?code=${code}`)
        .then((res) => {
          const { accessToken, refreshToken, spotifyId } = res.data;

          // ✅ 토큰 및 사용자 정보 저장
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          localStorage.setItem('spotifyId', spotifyId);

          navigate('/');
        })
        .catch((err) => {
          console.error('로그인 실패:', err);
          alert('로그인에 실패했어요. 다시 시도해주세요!');
        });
    }
  }, [location.search]);

  return <p>로그인 처리 중입니다...</p>;
};

export default Callback;
