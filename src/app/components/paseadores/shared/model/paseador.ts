import { Usuario } from "@feature/usuarios/shared/model/usuario.model";

export interface Paseador {
  nombre: string;
}

export interface PerfilPaseador {
  usuario: Usuario;
  identificacion?: string;
  tiempoExperiencia: string;
  perfilExperiencia: string;
}
