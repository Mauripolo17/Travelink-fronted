import axios from "axios";

const API_URL = "http://localhost:8080/reservas-vehiculos/v1/Reservar";

export interface ReservationRequest {
  fechaInicio: string | undefined;
  fechaFin: string | undefined;
  valor: number;
  propietarioAlquiler: {
    nombrePropietarioAlquiler: string;
    apellidoPropietarioAlquiler: string;
    telefonoPropietarioAlquiler: number;
  },
  carroId: number;
}

export interface ReservationResponse {
  id: number,
  fechaInicio: string;
  fechaFin: string;
  valor: number;
  propietarioAlquiler: {
    nombrePropietarioAlquiler: string;
    apellidoPropietarioAlquiler: string;
    telefonoPropietarioAlquiler: number;
  },
  carroId: number;
}


export const ReservationService = {
  reservarVehiculo: async (reserva: ReservationRequest) => {
    const response = await axios.post(API_URL, reserva);
    return response.data;
  },
};
