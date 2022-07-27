import { Usuario } from "@feature/usuarios/shared/model/usuario.model";

export interface Paseador {
  nombre: string;
  usuario: Usuario;
  tiempoExperiencia: string;
  perfilExperiencia: string;
  estado: boolean;
}

export interface PerfilPaseador {
  usuario: Usuario;
  identificacion?: string;
  tiempoExperiencia: string;
  perfilExperiencia: string;
}
