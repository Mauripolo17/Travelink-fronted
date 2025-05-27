import axios from "axios";
import { CarResponse } from "@/interfaces/car";

const API_URL = "http://localhost:8080/reservas-vehiculos/v1/";

export const VehicleService = {
  getAvailableCars: async (locacionId: number, inicio: string, fin: string): Promise<CarResponse[]> => {
    const response = await axios.get<CarResponse[]>(
      `${API_URL}${locacionId}?inicio=${inicio}&fin=${fin}`
    );
    return response.data;
  }
};
