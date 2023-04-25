import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') return <div>Loading...</div>;
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-5'>
      <h1 className='text-6xl'>Sistema de Recogidas y Despachos</h1>
      {session ? (
        <Link href='/app'>
          <button>Ir a la app</button>
        </Link>
      ) : (
        <>
          <h2 className='text-2xl'>Bienvenido. Por favor inicia sesión</h2>
          <div>
            <button onClick={() => signIn('auth0')}>Iniciar Sesión</button>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
