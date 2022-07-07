import { TipoDocumento } from "./tipo-documento.model";

export interface RegistroUsuario {
  tipoDocumento: TipoDocumento;
  identificacion: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  celular: string;
  correo: string;
  usuario: string;
  contrasena: string;
  tiempoExperiencia?: string;
  perfil?: string;
}
