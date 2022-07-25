export interface Mascota {
  idMascota: number;
  nombre: string;
  fechaNacimiento: Date;
  peso: number;
  raza: string;
  observaciones: string;
  dueno: string;
  sexo: 'M' | 'H';
  foto?: string; //TODO: implementar foto
}
