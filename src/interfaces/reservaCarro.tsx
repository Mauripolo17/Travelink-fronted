import { Nullable } from "primereact/ts-helpers";
export interface reservaCarro{
    lugar:string
    desde:string
    hasta:string
}

export interface reservaVuelo{
    origen: string;
    destino: string;
    fecha: string
}

export interface reservaHoteles{
    ciudad:string
    inicio:string
    hasta:string
    adultos:number
    menores:number
}