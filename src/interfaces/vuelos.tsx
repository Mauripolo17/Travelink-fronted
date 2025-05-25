export interface Vuelo {
    id: number;
    origen: string;
    destino: string;
    fechaDeSalida: string;
    horaDeSalida: string;
    capacidad: number;
    precio: number;
    img: string;
    aerolinea: string;
    aeropuerto: string;
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
  // Define Nullable type alias
  type Nullable<T> = T | null;
  
  export interface flighToSearch {
      origen: string;
      destino: string;
      desde: Nullable<Date>;
      hasta: Nullable<Date>;
    }
  