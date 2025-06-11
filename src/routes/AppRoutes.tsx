import { Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Callback from '../pages/Callback';
import Main from '../pages/Main';
import Detail from '../pages/Detail';
import Layout from '../layouts/Layout';
import Error from '../components/common/Error';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} errorElement={<Error />} />
      <Route path='/callback' element={<Callback />} errorElement={<Error />} />

      <Route element={<Layout />}>
        <Route path='/main' element={<Main />} errorElement={<Error />} />
        <Route path='/detail/:type/:id' element={<Detail />} errorElement={<Error />} />
        
      </Route>

      <Route path='*' element={<Error />} />
    </Routes>
  );
};

export default AppRoutes;
