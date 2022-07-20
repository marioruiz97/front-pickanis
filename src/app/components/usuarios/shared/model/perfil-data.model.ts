import { Usuario } from "./usuario.model";

export interface Perfil {
  usuario: Usuario;

  // datos de un paseador
  esPaseador: boolean;
  tiempoExperiencia: string;
  perfilExperiencia: string;
  estado: boolean;
}
