export interface Paseo {
  idPaseo: number;
  idPublicador : number;
  idMascota: string;
  fechaPublicacion: Date;
  fechaInicio: Date;
  fechaFinal: Date;
  estado: boolean;
  tipo: string;
  descripcion: string;
  foto?: string; //TODO: implementar foto
}
