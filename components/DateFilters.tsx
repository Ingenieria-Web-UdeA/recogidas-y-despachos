import { useDateFiltersContext } from '@context/DateFiltersContext';
import {
  RangeSelector,
  Scale,
  MinorTick,
  SliderMarker,
} from 'devextreme-react/range-selector';

export const months = [
  { value: 0, label: 'Enero' },
  { value: 1, label: 'Febrero' },
  { value: 2, label: 'Marzo' },
  { value: 3, label: 'Abril' },
  { value: 4, label: 'Mayo' },
  { value: 5, label: 'Junio' },
  { value: 6, label: 'Julio' },
  { value: 7, label: 'Agosto' },
  { value: 8, label: 'Septiembre' },
  { value: 9, label: 'Octubre' },
  { value: 10, label: 'Noviembre' },
  { value: 11, label: 'Diciembre' },
];

const DateFilters = () => {
  const { dateFilters, setDateFilters } = useDateFiltersContext();

  const startValue = new Date(2021, 0, 1);
  const endValue = new Date();
  const range = [
    new Date(dateFilters.initYear, dateFilters.initMonth, 1),
    new Date(dateFilters.finalYear, dateFilters.finalMonth + 1, 1),
  ];

  return (
    <div className='flex w-full justify-center gap-4'>
      <RangeSelector
        id='range-selector'
        title='Rango de fechas'
        defaultValue={range}
        width='100%'
        onValueChanged={(e) => {
          setDateFilters({
            initMonth: new Date(e.value[0]).getMonth(),
            initYear: new Date(e.value[0]).getFullYear(),
            finalMonth: new Date(e.value[1]).getMonth(),
            finalYear: new Date(e.value[1]).getFullYear(),
          });
        }}
      >
        <Scale
          startValue={startValue}
          endValue={endValue}
          minorTickInterval='month'
          tickInterval='month'
          minRange='month'
        >
          <MinorTick visible={false} />
        </Scale>
        <SliderMarker format='monthAndDay' />
      </RangeSelector>
    </div>
  );
};

export { DateFilters };
