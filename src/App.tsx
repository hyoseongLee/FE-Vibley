import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Callback from './pages/Callback'; // 위치에 맞게 경로 수정!
import Landing from './pages/Landing';
import Main from './pages/Main';
// ... 필요한 페이지 import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/callback' element={<Callback />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
