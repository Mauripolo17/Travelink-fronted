import { createContext, ReactNode, useContext, useEffect, useState } from "react";


interface DashboardContextType {
  item: string | null;
  setItem: React.Dispatch<React.SetStateAction<string | null>>;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboardContext = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("DashboardContext debe estar dentro del proveedor DashboardProvider");
  }else{
    return context;
  }
};

export const DashboardProvider = ({ children }: { children: ReactNode }) => {

    const [item, setItem] = useState<string | null>('Mis vuelos');
  return (
    <DashboardContext.Provider value={{item, setItem}}>
      {children}
    </DashboardContext.Provider>
  );
};
