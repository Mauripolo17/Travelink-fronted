import { createContext, ReactNode, useContext, useState } from "react";
import { CarResponse } from "@/interfaces/car";

interface CarReservaContextType {
  carSelected: CarResponse | null;
  setCarSelected: React.Dispatch<React.SetStateAction<CarResponse | null>>;

  rentalDates: { inicio: string; fin: string } | null;
  setRentalDates: React.Dispatch<React.SetStateAction<{ inicio: string; fin: string } | null>>;
}

const CarReservaContext = createContext<CarReservaContextType | undefined>(undefined);

export const useCarReservaContext = () => {
  const context = useContext(CarReservaContext);
  if (!context) {
    throw new Error("useCarReservaContext debe usarse dentro de un CarReservaProvider");
  }
  return context;
};

export const CarReservaProvider = ({ children }: { children: ReactNode }) => {
  const [carSelected, setCarSelected] = useState<CarResponse | null>(null);
  const [rentalDates, setRentalDates] = useState<{ inicio: string; fin: string } | null>(null);

  return (
    <CarReservaContext.Provider
      value={{
        carSelected,
        setCarSelected,
        rentalDates,
        setRentalDates,
      }}
    >
      {children}
    </CarReservaContext.Provider>
  );
};
