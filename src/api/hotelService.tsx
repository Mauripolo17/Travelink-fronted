import axios from "axios";

export interface Client{
    id: number;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    licenciaConducir: string;
    direccion: string;
    fechaRegistro: Date;
}

export interface City{
    id: number;
    nombre: string;
}

export interface Factura{
    id: number;
    id_reserva: number;
    fecha: Date;
    monto: number;
    estado: string;
}

export interface Hotels{
    id: number;
    nombre: string;
    ciudad: City;
    telefono: string;
    email: string;
    estrellas: number;
    descripcion: string;
}

export interface Pago{
    id: number;
    id_factura: number;
    monto: number;
    fecha_Pago: Date;
    metodo_de_pago: string;
    estado_de_pago: string;
}

export interface Reservation{
    id: number;
    id_client: number;
    id_room: number;
    StartDate: Date;
    EndDate: Date;
    ReservationDate: Date;
    Status: string;
    Total: number;
}

export interface Room{
    id: number;
    hotelId: number;
    number: number;
    roomTypeId: number;
    available: boolean;
}

export interface Room_Type{
    id: number;
    nombre: string;
    precio_por_noche: number;
    capacidad: number;
    descripcion: string;
}

// Interfaces para crear reservas
export interface CreateReservationRequest {
    clientId: number;
    roomId: number;
    startDate: string;
    endDate: string;
}

export interface CreatePaymentRequest {
    facturaId: number;
    monto: number;
    fechaPago: string;
    metodoDePago: string;
    estadoDePago: string;
}

const baseUrl = "http://localhost:8080/api";

export const hotelService = {
    // Servicios existentes
    getAllRoom: async(): Promise<Room[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/rooms`);
            return response.data;
        } catch (error) {
            console.error('Error fetching rooms:', error);
            return undefined;
        }
    },

    getAllCity: async(): Promise<City[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/cities`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cities:', error);
            return undefined;
        }
    },

    // Nuevos servicios para cliente
    
    // Hoteles
    getAllHotels: async(): Promise<Hotels[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/hotels`);
            return response.data;
        } catch (error) {
            console.error('Error fetching hotels:', error);
            return undefined;
        }
    },

    getHotelById: async(id: number): Promise<Hotels | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/hotels/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching hotel:', error);
            return undefined;
        }
    },

    // Habitaciones
    getRoomById: async(id: number): Promise<Room | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/rooms/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching room:', error);
            return undefined;
        }
    },

    // Tipos de habitación
    getAllRoomTypes: async(): Promise<Room_Type[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/room-types`);
            return response.data;
        } catch (error) {
            console.error('Error fetching room types:', error);
            return undefined;
        }
    },

    getRoomTypeById: async(id: number): Promise<Room_Type | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/room-types/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching room type:', error);
            return undefined;
        }
    },

    // Ciudad por ID
    getCityById: async(id: number): Promise<City | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/cities/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching city:', error);
            return undefined;
        }
    },

    // Reservas
    createReservation: async(reservation: CreateReservationRequest): Promise<Reservation | undefined> => {
        try {
            const response = await axios.post(`${baseUrl}/reservations`, reservation);
            return response.data;
        } catch (error) {
            console.error('Error creating reservation:', error);
            return undefined;
        }
    },

    getReservationsByClient: async(clientId: number): Promise<Reservation[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/reservations/client/${clientId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching client reservations:', error);
            return undefined;
        }
    },

    getReservationById: async(id: number): Promise<Reservation | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/reservations/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching reservation:', error);
            return undefined;
        }
    },

    cancelReservation: async(id: number): Promise<boolean> => {
        try {
            await axios.put(`${baseUrl}/reservations/${id}/cancel`);
            return true;
        } catch (error) {
            console.error('Error canceling reservation:', error);
            return false;
        }
    },

    // Facturas
    getFacturaById: async(id: number): Promise<Factura | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/facturas/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching factura:', error);
            return undefined;
        }
    },

    generateFactura: async(reservaId: number): Promise<Factura | undefined> => {
        try {
            const response = await axios.post(`${baseUrl}/facturas/generar/${reservaId}`);
            return response.data;
        } catch (error) {
            console.error('Error generating factura:', error);
            return undefined;
        }
    },

    // Pagos
    createPayment: async(payment: CreatePaymentRequest): Promise<Pago | undefined> => {
        try {
            const response = await axios.post(`${baseUrl}/pagos`, payment);
            return response.data;
        } catch (error) {
            console.error('Error creating payment:', error);
            return undefined;
        }
    },

    getPaymentsByFactura: async(facturaId: number): Promise<Pago[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/pagos/factura/${facturaId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching payments:', error);
            return undefined;
        }
    },

    // Clientes
    getAllClients: async(): Promise<Client[] | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/clientes`);
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error);
            return undefined;
        }
    },

    getClientById: async(id: number): Promise<Client | undefined> => {
        try {
            const response = await axios.get(`${baseUrl}/clientes/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching client:', error);
            return undefined;
        }
    },

    // Funciones utilitarias para filtrar habitaciones disponibles
    getAvailableRooms: async(city?: string, startDate?: string, endDate?: string): Promise<Room[] | undefined> => {
        try {
            const rooms = await hotelService.getAllRoom();
            if (!rooms) return undefined;
            
            // Filtrar solo habitaciones disponibles
            return rooms.filter(room => room.available);
        } catch (error) {
            console.error('Error fetching available rooms:', error);
            return undefined;
        }
    },

    // Obtener hoteles por ciudad
    getHotelsByCity: async(cityName: string): Promise<Hotels[] | undefined> => {
        try {
            
            const hotels = await hotelService.getAllHotels();
            if (!hotels) return undefined;
            
            return hotels.filter(hotel => 
                hotel.ciudad.nombre.toLowerCase() === cityName.toLowerCase()
            );
        } catch (error) {
            console.error('Error fetching hotels by city:', error);
            return undefined;
        }
    }
};