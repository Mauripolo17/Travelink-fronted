import axios from "axios";

export interface Pasajero {
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDocumento: number;
    fechaDeNacimiento: string;
    sexo: string;
    reserva: number;
}

const baseUrl = "http://localhost:8080/api/pasajeros";

export const pasajeroService = {
    getAll: async () => {
        const response = await fetch(baseUrl);
        return response.json();
    },
    savePasajeros: async (pasajeros: Pasajero[]): Promise<Pasajero[]| undefined> => {
        try {
            const response = await axios.post(`${baseUrl}/saveAll`, pasajeros);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    } 
}