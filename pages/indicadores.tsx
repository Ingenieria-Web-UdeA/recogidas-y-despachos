import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import React from 'react';

const Indicadores = () => {
  return (
    <PrivateRoute>
      <Layout>
        <div>Indicadores</div>
      </Layout>
    </PrivateRoute>
  );
};

export default Indicadores;
