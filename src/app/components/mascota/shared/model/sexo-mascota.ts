export interface SexoMascota {
  valor: 'M' | 'F';
  descripcion: string;
}

export const sexosMascota: SexoMascota[] = [
  { valor: 'M', descripcion: 'Macho' },
  { valor: 'F', descripcion: 'Hembra' },
]
