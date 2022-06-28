export interface Mascota {
  idMascota: number;
  nombre: string;
  fechaNacimiento: Date;
  peso: number;
  raza:string;
  observaciones: string;
  dueno: number;
  sexo: 'M' | 'F';
  foto?: string; //TODO: implementar foto
}
