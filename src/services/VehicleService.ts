import axios from "axios";
import { Alquiler, AlquilerResponse, CarResponse } from "@/interfaces/car";
import { reservaCarro } from "@/interfaces/reservaCarro";
import { create } from "domain";
import { get } from "http";

const API_URL = "http://localhost:8081/reservas-vehiculos/v1/";

export const VehicleService = {
  getAvailableCars: async (car: reservaCarro): Promise<CarResponse[]> => {
    const response = await axios.get<CarResponse[]>(
      `${API_URL}${car.lugar}?inicio=${car.desde?.slice(0, 10)}&fin=${car.hasta?.slice(0, 10)}`
    );
    return response.data;
  },

  createReservation: async (reservation: Alquiler): Promise<AlquilerResponse> => {
    const response = await axios.post<AlquilerResponse>(
      `${API_URL}Reservar`,
      reservation
    );
    return response.data;
  },

  getByClientId: async (clientId: string): Promise<AlquilerResponse[]> => {
    const response = await axios.get<AlquilerResponse[]>(
      `${API_URL}Reservar/${clientId}`
    );
    return response.data;
  }
};
