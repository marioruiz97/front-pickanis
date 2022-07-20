import { ContactoUsuario } from "./contacto-usuario.model";

export interface Usuario {
  tipoDocumento: string | number;
  identificacion: string;
  nombre: string;
  apellido: string;
  correo: string;
  nombreUsuario: string;
  contrasena: string;
  foto: any;
  habilitado: boolean;
  contacto: ContactoUsuario;
}
