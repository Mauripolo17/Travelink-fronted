import axios from "axios";
import { Pasajero } from "./pasajeroService";
import { VueloInfo } from "./vuelosService";

export interface ReservaVuelo {
  id?: number;
  fechaReserva: string;
  cliente: number;
  pasajeros?: Pasajero[];
  vuelos?: VueloInfo[];
}

const baseUrl = "http://localhost:8080/api/reservas";
export const reservaService = {
  getAll: async () => {
    const response = await fetch(baseUrl);
    return response.json();
  },

  getById: async (id: number) => {
    const response = await fetch(`${baseUrl}/${id}`);
    return response.json();
  },
  createReserva: async (reserva: Reserva): Promise<Reserva | undefined> => {
    try{
        const response = await axios.post(baseUrl, reserva);
        return response.data;
    }catch(error){
      console.log(error);
    }
  },
  updateReserva: async (reserva: Reserva | undefined, id:number): Promise<Reserva | undefined> => {
    try{
        const response = await axios.put(`${baseUrl}/${id}`, reserva);
        return response.data;
    }catch(error){
      console.log(error);
    }
  }
};
