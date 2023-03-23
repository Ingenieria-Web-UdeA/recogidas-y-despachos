import { useState } from 'react';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
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
      {isOpen && (
        <aside className='fixed top-0 left-0 z-50 h-full w-1/2 bg-gray-800 text-white'>
          <button
            className='absolute top-0 right-0 mt-2 mr-2 text-gray-300 hover:text-white'
            onClick={() => setIsOpen(false)}
          >
            &times;
          </button>
        </aside>
      )}
    </>
  );
};

export default Navbar;
