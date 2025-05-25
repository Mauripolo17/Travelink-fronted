import axios from "axios";
import { Nullable } from "primereact/ts-helpers";

const url_base = "http://localhost:8080/api";

export interface Vuelo {
  id: number;
  origen: string;
  destino: string;
  fechaDeSalida: string;
  horaDeSalida: string;
  capacidad: number;
  precio: number;
  img: string;
  aerolinea: number;
  aeropuerto: number;
  duracion: number;
}

export interface Aerolinea {
  id: number;
  nombre: string;
  codigoAerolinea: number;
  paisOrigen: string;
}
export interface Aeropuerto {
    id: number;
    nombre: string;
    ciudad: string;
    pais: string;
}
export interface VueloInfo {
  id: number;
  origen: string;
  destino: string;
  fechaDeSalida: string;
  horaDeSalida: string;
  capacidad: number;
  precio: number;
  img: string;
  aerolinea: Aerolinea;
  aeropuerto: Aeropuerto;
  duracion: number;
}
export interface flighToSearch {
  origen: string;
  destino: string;
  desde: string;
  hasta: Nullable<Date>;
}

export const vueloService = {
  getVuelos: async (): Promise<Vuelo[]> => {
    try {
      const response = axios.get(`${url_base}/vuelos/getVuelos`);
      return (await response).data;
    } catch (error) {
      throw new Error("Error al obtener los vuelos");
    }
  },

  getVuelosByDestino: async (destino: string): Promise<Vuelo[]> => {
    try {
      const response = axios.get(`${url_base}/vuelos/${destino}`);
      return (await response).data;
    } catch (error) {
      throw new Error("Error al obtener los vuelos");
    }
  },

  getCiudades: async (): Promise<string[]> => {
    try {
      const response = await axios.get(`${url_base}/vuelos/ciudades`);
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener las ciudades");
    }
  },
  buscarVuelos: async (flightToSearch: flighToSearch): Promise<VueloInfo[]> => {
    try {
      const fecha = flightToSearch.desde?.slice(0, 10);
      const response = await axios.get(
        `http://localhost:8080/api/vuelos/buscarVuelos/${fecha}/${flightToSearch.destino}/${flightToSearch.origen}`
      );
      return response.data;
    } catch (error) {
      throw new Error("Error al obtener los vuelos");
    }
  },
};
