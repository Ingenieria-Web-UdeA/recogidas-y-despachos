import { useNavigationContext } from '@context/NavigationContext';
import { signOut } from 'next-auth/react';
import React from 'react';
import { MdMenuOpen } from 'react-icons/md';
import PrivateComponent from './PrivateComponent';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const { open, setOpen } = useNavigationContext();
  return (
    <aside
      className={`sidebar-desktop sidebar-mobile ${
        open ? 'flex' : 'hidden'
      } flex-col justify-between bg-gray-800 md:flex`}
    >
      <div className='flex flex-col gap-4'>
        <div className='flex md:hidden'>
          <button onClick={() => setOpen(false)} className='icon-white'>
            <MdMenuOpen />
          </button>
        </div>
        <div className='debug flex items-center justify-center bg-gray-900'>
          <img src='' alt='logo' className='h-12 w-12' />
        </div>
        <nav>
          <ul className='flex flex-col gap-3'>
            <SidebarLink href='/resumen' title='Resumen' />
            <SidebarLink href='/recogidas' title='Recogidas' />

            <PrivateComponent role='ADMIN'>
              <SidebarLink href='/facturacion' title='Facturación' />
            </PrivateComponent>
            <PrivateComponent role='ADMIN'>
              <SidebarLink href='/indicadores' title='Indicadores' />
            </PrivateComponent>
          </ul>
        </nav>
      </div>
      <button type='button' onClick={() => signOut()}>
        Log out
      </button>
    </aside>
  );
};

interface SidebarLinkProps {
  href: string;
  title: string;
}

const SidebarLink = ({ href, title }: SidebarLinkProps) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <li className={isActive ? 'active' : ''}>{title}</li>
    </Link>
  );
};

export default Sidebar;
