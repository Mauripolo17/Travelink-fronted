import axios from "axios";

export interface Location {
  id: number;
  nombre: string;
}

const API_URL = "http://localhost:8080/reservas-vehiculos/v1/locacion"; // ajusta según tu backend

export const LocationService = {
  getAll: async (): Promise<Location[]> => {
    const response = await axios.get<Location[]>(API_URL);
    return response.data;
  }
};
