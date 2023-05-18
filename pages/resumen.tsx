import { useQuery } from '@apollo/client';
import { DateFilters } from '@components/DateFilters';
import PrivateRoute from '@components/PrivateRoute';
import { useDateFiltersContext } from '@context/DateFiltersContext';
import ReactDataGrid from '@inovua/reactdatagrid-community';
import { TypeColumn } from '@inovua/reactdatagrid-community/types/TypeColumn';
import Layout from '@layouts/Layout';
import { GET_FILTERED_SHIPMENTS } from 'graphql/client/shipment';
import { Shipment } from '@prisma/client';
import _ from 'lodash';
import ActionButtons from '@components/ActionButtons';
import { ModalRecogidas } from '@components/modals/ModalRecogidas';
import { ModalDespachos } from '@components/modals/ModalDespachos';
import { RecogidasContextProvider } from '@context/recogidasContext';
import '@inovua/reactdatagrid-community/index.css';

const ResumenPage = () => (
  <PrivateRoute>
    <Layout>
      <RecogidasContextProvider>
        <div className='flex h-full w-full flex-col gap-5 p-10'>
          <div className='flex justify-center'>
            <h1>Resumen</h1>
          </div>
          <div className='flex flex-col items-center justify-center gap-2 md:flex-row md:justify-between'>
            <ActionButtons />
          </div>
          <DateFilters />
          <div className='flex w-full justify-center'>
            <ShipmentSummaryCards />
          </div>
          <div className='flex h-full w-full'>
            <ShipmentSummaryTable />
          </div>
        </div>
        <ModalRecogidas />
        <ModalDespachos />
      </RecogidasContextProvider>
    </Layout>
  </PrivateRoute>
);

const useGetShipmentData = () => {
  const { dateFilters } = useDateFiltersContext();

  const { data, loading } = useQuery<{ filterShipments: Shipment[] }>(
    GET_FILTERED_SHIPMENTS,
    {
      variables: {
        dateFilters,
      },
    }
  );

  // let totalBunches = 0;

  // data?.filterShipments.forEach((el) => {
  //   totalBunches += el.shippedBunches;
  // });

  // const totalBunches = data?.filterShipments.reduce((accumulator, el) => {
  //   return accumulator + el.shippedBunches;
  // }, 0);

  const totalBunches = _.sumBy(data?.filterShipments ?? [], 'shippedBunches');
  const totalWeight = _.sumBy(data?.filterShipments ?? [], 'deliveredWeight');
  const averageBunchWeight = totalWeight / totalBunches;

  return { data, loading, totalBunches, totalWeight, averageBunchWeight };
};

const ShipmentSummaryTable = () => {
  const { data, loading } = useGetShipmentData();

  if (loading) return <div>Loading...</div>;

  const columns: TypeColumn[] = [
    {
      name: 'shipmentNumber',
      header: 'Despacho',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'shipmentDate',
      header: 'Fecha del despacho',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'shippedBunches',
      header: 'Racimos despachados',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'bunchWeight',
      header: 'Peso por racimo',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
    {
      name: 'deliveredWeight',
      header: 'Peso entregado en planta',
      defaultFlex: 1,
      headerProps: {
        style: {
          backgroundColor: '#3730A3',
          color: 'white',
        },
      },
    },
  ];

  return (
    <ReactDataGrid
      columns={columns}
      dataSource={
        data?.filterShipments.map((el, index) => ({
          shipmentNumber: index + 1,
          ...el,
        })) ?? []
      }
      pagination
      pageSizes={[5, 10, 15]}
    />
  );
};

const ShipmentSummaryCards = () => {
  const { totalBunches, totalWeight, averageBunchWeight } =
    useGetShipmentData();
  return (
    <div className='flex gap-5'>
      <ShipmentIndicatorCard
        title='Total racimos recogidos'
        indicator={totalBunches}
      />
      <ShipmentIndicatorCard
        title='Peso por racimo'
        indicator={averageBunchWeight}
        isFloat
      />
      <ShipmentIndicatorCard title='Kilos entregados' indicator={totalWeight} />
    </div>
  );
};

interface ShipmentIndicatorCardProps {
  title: string;
  indicator: number;
  isFloat?: boolean;
}

const ShipmentIndicatorCard = ({
  title,
  indicator,
  isFloat = false,
}: ShipmentIndicatorCardProps) => {
  return (
    <div className='flex flex-col items-center gap-2 rounded-3xl bg-gray-800 p-5 shadow-xl'>
      <h2 className='text-2xl font-bold text-indigo-100'>{title}</h2>
      <span className='text-xl text-gray-100'>
        {isFloat ? indicator.toFixed(2) : indicator}
      </span>
    </div>
  );
};

export default ResumenPage;
