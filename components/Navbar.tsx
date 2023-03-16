import { useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <nav className='debug flex items-center justify-between gap-2 px-1 md:hidden'>
      <div className='flex items-center'>
        <button
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className='text-2xl text-gray-900'
        >
          {isOpen ? <MdMenuOpen /> : <MdMenu />}
        </button>
      </div>
      <div>
        <span>Nombre de la app</span>
      </div>
      <div>Logo</div>
    </nav>
  );
};

export default Navbar;
