import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Reserva } from "../api/reservasService";
import { flighToSearch, VueloInfo } from "../api/vuelosService";
import firebaseApp from "../firebase/credenciales.tsx";

import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { getFirestore, doc, collection, setDoc, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext.tsx";
import { reservaCarro } from "@/interfaces/reservaCarro.tsx";
import { CarResponse, paymentCar } from "@/interfaces/car.tsx";
const auth = getAuth(firebaseApp);

interface ReservaContextType {
  reserva: Reserva | null;
  flightToSearch: flighToSearch;
  carToSearch: reservaCarro;
  setCarToSearch: React.Dispatch<React.SetStateAction<reservaCarro>>;
  carToRent: CarResponse
  setCarToRent: React.Dispatch<React.SetStateAction<CarResponse>>;
  searchMode: any;
  setSearchMode: React.Dispatch<React.SetStateAction<any>>;
  setFlightToSearch: React.Dispatch<React.SetStateAction<flighToSearch>>;
  flightSelected: VueloInfo | null;
  setFlightSelected: React.Dispatch<React.SetStateAction<VueloInfo | null>>;
  managePayment: (reserva: Reserva) => void;
  managePaymentCar: (alquiler: paymentCar) => void;
  paymentSuccess?: boolean;
  setPaymentSuccess?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReservaContext = createContext<ReservaContextType | undefined>(undefined);
export const useReservaContext = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    throw new Error("useReservaContext debe estar dentro del proveedor ReservaProvider");
  } else {
    return context;
  }
};

export const ReservaProvider = ({ children }: { children: ReactNode }) => {
  const [reserva, setReserva] = useState<Reserva | null>(null);
  const [flightSelected, setFlightSelected] = useState<VueloInfo | null>(JSON.parse(localStorage.getItem("flightSelected") || "null"));
  const [flightToSearch, setFlightToSearch] = useState<flighToSearch>({
    origen: "",
    destino: "",
    desde: '',
    hasta: null,
  });
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const firestore = getFirestore(firebaseApp);
  const [carToSearch, setCarToSearch] = useState<reservaCarro>(JSON.parse(localStorage.getItem("carToSearch") || "null"));
  const [carToRent, setCarToRent] = useState<CarResponse>(JSON.parse(localStorage.getItem("carToRent") || "null"));
  const { user } = useAuth();

  const managePayment = async (reserva: Reserva) => {
    const paymentData = {
      id: reserva.id,
      vueloId: reserva.id,
      clienteId: user?.id,
      fechaReserva: reserva.fechaReserva,
      estado: "pagado",
    }
    const docRef = doc(firestore, `payments/${reserva.id}`);
    await setDoc(docRef, paymentData);
  };

  const managePaymentCar = async (alquiler: paymentCar) => {
    const paymentCarData = {
      idReservation: alquiler.idReservation,
      idCar: alquiler.idCar,
      idClient: alquiler.idClient,
      reservationDate: alquiler.reservationDate,
      mouunt: alquiler.mouunt,
      status: alquiler.status,
    }
    const docRef = doc(firestore, `paymentsCar/${alquiler.idReservation}`);
    await setDoc(docRef, paymentCarData);
  };

  useEffect(() => {
    localStorage.setItem("flightSelected", JSON.stringify(flightSelected));
  }, [flightSelected]);

  const [searchMode, setSearchMode] = useState<boolean>(false);
  return (
    <ReservaContext.Provider value={{ reserva, flightToSearch, setFlightToSearch, searchMode, setSearchMode, flightSelected, setFlightSelected, managePayment, paymentSuccess, setPaymentSuccess, managePaymentCar ,carToSearch, setCarToSearch, carToRent, setCarToRent }}>
      {children}
    </ReservaContext.Provider>
  );
};
