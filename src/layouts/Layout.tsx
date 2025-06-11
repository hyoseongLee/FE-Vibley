import Header from '../components/common/Header';
import PlayerBar from '../components/common/PlayerBar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <Header />
      <main className='pt-[66px] pb-[70px]'>
        <Outlet />
      </main>
      <PlayerBar />
    </>
  );
}
