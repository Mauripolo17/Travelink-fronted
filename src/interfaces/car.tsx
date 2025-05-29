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