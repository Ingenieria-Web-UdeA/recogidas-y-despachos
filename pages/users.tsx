import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from 'graphql/client/users';
import { User } from '@prisma/client';
import PrivateRoute from '@components/PrivateRoute';

const UsersPage = () => {
  const { data, loading, error } = useQuery<{ users: User[] }>(GET_USERS, {
    fetchPolicy: 'cache-first',
  });

  if (error) return <p>Error</p>;

  if (loading) return <p>Loading...</p>;

  return (
    <PrivateRoute>
      <div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
            </tr>
          </thead>
          <tbody>
            {data?.users.map((user) => (
              <tr key={`user_${user.id}`}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PrivateRoute>
  );
};

export default UsersPage;
