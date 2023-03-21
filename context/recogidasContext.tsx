import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from 'react';

interface RecogidasContextProps {
  openModalRecogidas: boolean;
  setOpenModalRecogidas: Dispatch<SetStateAction<boolean>>;
  openModalDespachos: boolean;
  setOpenModalDespachos: Dispatch<SetStateAction<boolean>>;
}

const RecogidasContext = createContext<RecogidasContextProps>(
  {} as RecogidasContextProps
);

export const useRecogidasContext = () => useContext(RecogidasContext);

interface RecogidasContextProviderProps {
  children: JSX.Element;
}

const RecogidasContextProvider = ({
  children,
}: RecogidasContextProviderProps) => {
  const [openModalRecogidas, setOpenModalRecogidas] = useState<boolean>(false);
  const [openModalDespachos, setOpenModalDespachos] = useState<boolean>(false);

  return (
    <RecogidasContext.Provider
      value={{
        openModalRecogidas,
        setOpenModalRecogidas,
        openModalDespachos,
        setOpenModalDespachos,
      }}
    >
      {children}
    </RecogidasContext.Provider>
  );
};

export { RecogidasContextProvider };
