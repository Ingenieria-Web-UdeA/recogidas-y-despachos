import Navbar from '@components/Navbar';
import Sidebar from '@components/Sidebar';
import { NavigationContextProvider } from '@context/NavigationContext';
import React from 'react';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <main className='flex h-screen w-full flex-col md:flex-row'>
    <NavigationContextProvider>
      <Navbar />
      <Sidebar />
    </NavigationContextProvider>
    <section className='flex h-full w-full'>{children}</section>
  </main>
);

export default Layout;
