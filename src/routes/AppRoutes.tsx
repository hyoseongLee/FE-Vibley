import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Callback from '../pages/Callback';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Layout from '../layouts/Layout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/callback' element={<Callback />} />

      <Route element={<Layout />}>
        <Route path='/main' element={<Main />} />
        <Route path='/detail' element={<Detail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
