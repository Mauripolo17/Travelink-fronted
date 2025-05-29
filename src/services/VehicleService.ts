import axios from "axios";
import { CarResponse } from "@/interfaces/car";

const API_URL = "http://localhost:8080/reservas-vehiculos/v1/";

export const VehicleService = {
  getAvailableCars: async (locacionId: number, inicio: string, fin: string): Promise<CarResponse[]> => {
    const response = await axios.get<CarResponse[]>(
      `${API_URL}?inicio=${inicio}&fin=${fin}&locacionId=${locacionId}`
    );
    return response.data;
  },

  getVehicleById: async (id: number): Promise<CarResponse> => {
    const response = await axios.get<CarResponse>(`${API_URL}${id}`);
    return response.data;
  },
  addCarro: async (car: CarResponse): Promise<CarResponse> => {
    const response = await axios.post<CarResponse>(API_URL, car);
    return response.data;
  }
};
