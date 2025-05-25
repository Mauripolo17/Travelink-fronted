import axios from "axios";
import { Pasajero } from "./pasajeroService";
import { VueloInfo } from "./vuelosService";

export interface Reserva{
  id?: number;
  fechaReserva: string;
  cliente: string;
  pasajeros?: Pasajero[];
  vuelos?: VueloInfo[];
}

export interface historyReserva{

    id: null,
    fechaReserva: string,
    cliente: string,
    pasajeros: null,
    vuelos: VueloInfo[]
}

const baseUrl = "http://localhost:8080/api/reservas";
export const reservaService = {
  getAll: async () => {
    const response = await fetch(baseUrl);
    return response.json();
  },

  // getById: async (id: string) => {
  //   const response =  await axios.post(`${baseUrl}/cliente/${id} `);
  //   return response;
  // },

  getByClientId: async (id: string) => {
    const response =  await axios.get(`${baseUrl}/cliente/${id} `);
    return response;
  },
  createReserva: async (reserva: Reserva): Promise<Reserva | undefined> => {
    try{
      console.log('datos de reserva',reserva);
        const response = await axios.post(baseUrl, reserva);
        console.log(response);
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
