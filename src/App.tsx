import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './pages/Callback'; // 위치에 맞게 경로 수정!
import Main from './pages/Main'; // 예시
// ... 필요한 페이지 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/callback' element={<Callback />} />
        {/* 다른 라우트들 추가 */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
