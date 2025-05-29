export interface CarRequest {
    marca: string;
    modelo: string;
    placa: number;
    imagen: string;
    precio: number;
    locacion: number;
}

export interface CarResponse {
    id: number;
    marca: string;
    modelo: string;
    placa: number;
    imagen: string;
    precio: number;
    locacion: string;
}

export interface PropietarioAlquiler {
    nombrePropietarioAlquiler: string;
    apellidoPropietarioAlquiler: string;
    telefonoPropietarioAlquiler: string;
}

export interface Alquiler {
    fechaInicio: string; // formato ISO: YYYY-MM-DD
    fechaFin: string;    // formato ISO: YYYY-MM-DD
    valor: number;
    propietarioAlquiler: PropietarioAlquiler;
    carroId: number;
}

export interface Carro {
    id: number;
    marca: string;
    modelo: string;
    placa: string;
    imagen: string;
    precio: number;
    locacion: string;
}

export interface AlquilerResponse {
    id: number;
    fechaInicio: string; // formato ISO: YYYY-MM-DD
    fechaFin: string;    // formato ISO: YYYY-MM-DD
    valor: number;
    propietarioAlquiler: PropietarioAlquiler;
    locacion: string;
    carro: Carro;
}


export interface paymentCar {
    idReservation: number;
    idCar: number;
    idClient: string;
    reservationDate: string; 
    mouunt: number;
    status: string;
}