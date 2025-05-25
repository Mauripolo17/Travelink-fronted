
export interface loginRequest{
    username:string
    password:string
}

export interface signupRequest {
    username: string;
    email: string;
    password: string;
    nombre: string;
    apellido: string;
    numeroDocumento: number;
    direccion: string;
    telefono: number ;
    fechaDeNacimiento: string;
  }