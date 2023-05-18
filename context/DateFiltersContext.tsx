import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface DateFilters {
  initMonth: number;
  finalMonth: number;
  initYear: number;
  finalYear: number;
}

interface DateFiltersContextProps {
  dateFilters: DateFilters;
  setDateFilters: Dispatch<SetStateAction<DateFilters>>;
}

const DateFiltersContext = createContext<DateFiltersContextProps>(
  {} as DateFiltersContextProps
);

export const useDateFiltersContext = () => useContext(DateFiltersContext);

interface DateFiltersContextProviderProps {
  children: JSX.Element | JSX.Element[];
}

const DateFiltersContextProvider = ({
  children,
}: DateFiltersContextProviderProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const [dateFilters, setDateFilters] = useState<DateFilters>({
    initMonth: currentMonth,
    finalMonth: currentMonth,
    initYear: currentYear,
    finalYear: currentYear,
  });

  return (
    <DateFiltersContext.Provider value={{ dateFilters, setDateFilters }}>
      {children}
    </DateFiltersContext.Provider>
  );
};

export { DateFiltersContextProvider };
