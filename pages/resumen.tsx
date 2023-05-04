import PrivateRoute from '@components/PrivateRoute';
import Layout from '@layouts/Layout';

const ResumenPage = () => {
  return (
    <PrivateRoute>
      <Layout>
        <div>ResumenPage</div>
      </Layout>
    </PrivateRoute>
  );
};

export default ResumenPage;
