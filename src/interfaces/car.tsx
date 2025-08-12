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
export function getDifferenceInDays(dateStr1: string, dateStr2: string): number {
    const parseDate = (str: string): Date => {
      const [year, month, day] = str.split('-').map(Number);
      return new Date(year, month - 1, day);
    };
  
    const date1 = parseDate(dateStr1);
    const date2 = parseDate(dateStr2);
  
    const diffInMs = Math.abs(date2.getTime() - date1.getTime());
    return Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  }
  

  