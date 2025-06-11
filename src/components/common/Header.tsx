import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';
import { RiUserLine } from 'react-icons/ri';

const Header: React.FC = () => {
  return (
    <header className='fixed top-0 left-0 w-full flex items-center justify-between px-[60px] py-3 bg-white shadow-sm z-50'>
      <Link to='/main' className='text-logo font-shrikhand text-black'>
        Vibely
      </Link>

      <Button className='px-2 py-2'>
        <RiUserLine size={20} />
      </Button>
    </header>
  );
};

export default Header;
