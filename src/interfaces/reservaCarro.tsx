import { Nullable } from "primereact/ts-helpers";
export interface reservaCarro{
    lugar:string
    desde:Nullable<Date>
    hasta:Nullable<Date>
}

export interface reservaVuelo{
    origen: string;
    destino: string;
    fecha: Nullable<Date>
}

export interface reservaHoteles{
    ciudad:string
    inicio:Nullable<Date>
    hasta:Nullable<Date>
    adultos:number
    menores:number
}