import { Usuario } from "./usuario.model";

export interface Perfil {
  usuario: Usuario;

  // datos de un paseador
  esPaseador: boolean;
  tiempoExperiencia: string;
  perfilExperiencia: string;
  estado: boolean;
}

export interface InformacionPersonal {
  nombre: string;
  apellido: string;
  direccion: string;
  telefonoFijo: string;
  celular: string;
  nombreUsuario: string;
  correo: string;
  identificacion: string;
  tipoDocumento: number;
}
