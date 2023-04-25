import { useUserData } from '@hooks/useUserData';
import { Enum_RoleName } from '@prisma/client';
import React from 'react';

interface PrivateComponentProps {
  role: Enum_RoleName;
  children: React.ReactNode;
}

const PrivateComponent = ({ role, children }: PrivateComponentProps) => {
  const { role: userRole } = useUserData();

  if (!userRole) return <></>;

  if (userRole !== role) return <></>;

  return <>{children}</>;
};

export default PrivateComponent;
