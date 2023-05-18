import { useQuery } from '@apollo/client';
import { DateFilters, months } from '@components/DateFilters';
import PrivateRoute from '@components/PrivateRoute';
import { useDateFiltersContext } from '@context/DateFiltersContext';
import Layout from '@layouts/Layout';
import { Lot } from '@prisma/client';
import {
  Chart,
  Series,
  ArgumentAxis,
  CommonSeriesSettings,
  Export,
  Legend,
  Margin,
  Title,
  Subtitle,
  Tooltip,
  Grid,
  Crosshair,
  Label,
  Font,
} from 'devextreme-react/chart';
import { ValueAxis } from 'devextreme-react/polar-chart';
import { GET_COLLECTIONS_BY_MONTH } from 'graphql/client/indicators';
import { GET_LOTS } from 'graphql/client/lots';
import _ from 'lodash';
import { CollectionByMonth } from 'types';

const Indicadores = () => (
  <PrivateRoute>
    <Layout>
      <Indicators />
    </Layout>
  </PrivateRoute>
);

const Indicators = () => (
  <div className='flex w-full flex-col p-10'>
    <DateFilters />
    <CollectionsChart />
  </div>
);

const CollectionsChart = () => {
  const { dateFilters } = useDateFiltersContext();
  const { data: lotData, loading: lotLoading } = useQuery<{ lots: Lot[] }>(
    GET_LOTS
  );

  const { data, loading } = useQuery<{
    getCollectionsByMonth: CollectionByMonth[];
  }>(GET_COLLECTIONS_BY_MONTH, {
    variables: {
      dateFilters,
    },
  });

  if (loading || lotLoading) return <p>Loading...</p>;

  const groupedData = _.groupBy(data?.getCollectionsByMonth, 'monthYear');

  const modifiedData = Object.keys(groupedData).map((monthYear) => {
    const [currentYear, currentMonth] = monthYear.split('-');

    const monthName = months.find(
      (m) => m.value === parseInt(currentMonth) - 1
    )?.label;

    const monthData: { [key: string]: string | number } = {
      monthYear: `${monthName} ${currentYear}`,
    };

    groupedData[monthYear].forEach((item) => {
      monthData[item.lot.name] = item.totalCollectedBunches;
    });

    return monthData;
  });

  return (
    <Chart palette='Violet' dataSource={modifiedData} height={500} width='100%'>
      <CommonSeriesSettings argumentField='monthYear' type='bar' />
      {lotData?.lots.map((item) => (
        <Series key={item.id} valueField={item.name} name={item.name} />
      ))}
      <Margin bottom={20} />
      <ArgumentAxis
        title='Meses'
        valueMarginsEnabled={false}
        discreteAxisDivisionMode='crossLabels'
      >
        <Grid visible={true} />
      </ArgumentAxis>
      <ValueAxis />
      <Legend
        verticalAlignment='bottom'
        horizontalAlignment='center'
        itemTextPosition='bottom'
      />
      <Export enabled={true} />
      <Title text='Cantidad de racimos recogidos por mes'>
        <Subtitle text='Por lote' />
      </Title>
      <Tooltip enabled={true} />
      <Crosshair enabled={true} color='#949494' width={3} dashStyle='dot'>
        <Label visible={true} backgroundColor='#949494'>
          <Font color='#fff' size={12} />
        </Label>
      </Crosshair>
    </Chart>
  );
};

export default Indicadores;
