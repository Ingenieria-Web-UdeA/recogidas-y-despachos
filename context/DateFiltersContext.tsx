import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

interface DateFiltersContextProps {
  selectedMonth: number;
  setSelectedMonth: Dispatch<SetStateAction<number>>;
  selectedYear: number;
  setSelectedYear: Dispatch<SetStateAction<number>>;
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
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(2021);
  return (
    <DateFiltersContext.Provider
      value={{ selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }}
    >
      {children}
    </DateFiltersContext.Provider>
  );
};

export { DateFiltersContextProvider };
