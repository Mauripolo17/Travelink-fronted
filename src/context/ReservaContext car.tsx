// import { createContext, ReactNode, useContext, useEffect, useState } from "react";
// import { ReservaVuelo } from "../api/reservasService";
// import { flighToSearch, VueloInfo } from "../api/vuelosService";

// interface ReservaContextType {
//   reserva: ReservaVuelo | null;
//   flightToSearch: flighToSearch;
//   searchMode: any;
//   setSearchMode: React.Dispatch<React.SetStateAction<any>>;
//   setFlightToSearch: React.Dispatch<React.SetStateAction<flighToSearch>>;
//   flightSelected: VueloInfo | null;
//   setFlightSelected: React.Dispatch<React.SetStateAction<VueloInfo | null>>;
// }

// const ReservaContext = createContext<ReservaContextType | undefined>(undefined);
// export const useReservaContext = () => {
//   const context = useContext(ReservaContext);
//   if (!context) {
//     throw new Error("useReservaContext debe estar dentro del proveedor ReservaProvider");
//   }else{
//     return context;
//   }
// };

// export const ReservaProvider = ({ children }: { children: ReactNode }) => {
//   const [reserva, setReserva] = useState<ReservaVuelo | null>(null);
//   const [flightSelected, setFlightSelected] = useState<VueloInfo |null>(JSON.parse(localStorage.getItem("flightSelected") || "null"));
//   const [flightToSearch, setFlightToSearch] = useState<flighToSearch>({
//     origen: "",
//     destino: "",
//     desde: '',
//     hasta: null,
//   });

//   useEffect(() => {
//     localStorage.setItem("flightSelected", JSON.stringify(flightSelected));
//   }, [flightSelected]);
  
//   const [searchMode, setSearchMode] = useState<boolean>(false);
//   return (
//     <ReservaContext.Provider value={{ reserva, flightToSearch, setFlightToSearch, searchMode, setSearchMode, flightSelected, setFlightSelected }}>
//       {children}
//     </ReservaContext.Provider>
//   );
// };
