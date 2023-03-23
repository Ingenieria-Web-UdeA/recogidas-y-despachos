import { useNavigationContext } from '@context/NavigationContext';
import { MdMenu, MdMenuOpen } from 'react-icons/md';

const Navbar = () => {
  const { open, setOpen } = useNavigationContext();
  return (
    <nav className='debug flex items-center justify-between gap-2 px-1 md:hidden'>
      <div className='flex items-center'>
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className='icon-dark'
        >
          {open ? <MdMenuOpen /> : <MdMenu />}
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
