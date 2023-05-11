import { useDateFiltersContext } from '@context/DateFiltersContext';

const months = [
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

const years = [2021, 2022, 2023];

interface DateFiltersProps {
  hideMonth?: boolean;
  hideYear?: boolean;
}

const DateFilters = ({ hideMonth, hideYear }: DateFiltersProps) => {
  const { selectedMonth, setSelectedMonth, selectedYear, setSelectedYear } =
    useDateFiltersContext();

  return (
    <div className='flex w-full justify-center gap-4'>
      {!hideMonth && (
        <label htmlFor='month'>
          <span>Mes</span>
          <select
            name='month'
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
          >
            <option value='' disabled>
              Seleccionar mes
            </option>
            {months.map((month) => (
              <option key={`month_${month.value}`} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </label>
      )}
      {!hideYear && (
        <label htmlFor='year'>
          <span>Año</span>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            name='year'
          >
            <option value=''>Seleccionar año</option>
            {years.map((year) => (
              <option key={`year_${year}`} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export { DateFilters };
