import { useUserData } from '@hooks/useUserData';
import Layout from '@layouts/Layout';
import { Enum_RoleName } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface PrivateRouteProps {
  role?: Enum_RoleName;
  children: React.ReactNode;
}

const PrivateRoute = ({ role, children }: PrivateRouteProps) => {
  const { status, loading, session, role: userRole } = useUserData();

  if (status === 'loading' || loading) return <div>Loading...</div>;

  if (!session)
    return (
      <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
        <h1 className='text-5xl text-red-500'>
          Esta ruta requiere autenticación. Por favor inicia sesión.
        </h1>
        <Link href='/' className='text-2xl text-blue-500'>
          Ir al home
        </Link>
      </div>
    );

  if (role && role !== userRole)
    return (
      <Layout>
        <div className='flex h-screen w-full flex-col items-center justify-center gap-4'>
          <h1 className='text-5xl text-red-500'>
            No tienes permisos para acceder a esta ruta.
          </h1>
          <Link href='/app' className='text-2xl text-blue-500'>
            Ir a la página principal.
          </Link>
        </div>
      </Layout>
    );

  return <>{children}</>;
};

export default PrivateRoute;
