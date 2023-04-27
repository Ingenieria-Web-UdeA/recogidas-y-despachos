import { useQuery } from '@apollo/client';
import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';
import { GET_INVOICES } from 'graphql/client/invoices';
import React from 'react';

interface Invoice {
  id: string;
  date: string;
  value: number;
}

const WrapperFacturacion = () => (
  <PrivateRoute role='ADMIN'>
    <Layout>
      <Facturacion />
    </Layout>
  </PrivateRoute>
);

const Facturacion = () => {
  const { data, loading } = useQuery<{ invoices: Invoice[] }>(GET_INVOICES);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col gap-4 p-10'>
      <h1>Facturación</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Fecha</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          {data?.invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>{invoice.date}</td>
              <td>{invoice.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WrapperFacturacion;
