export interface SexoMascota {
  valor: 'M' | 'H';
  descripcion: string;
}

export const sexosMascota: SexoMascota[] = [
  { valor: 'M', descripcion: 'Macho' },
  { valor: 'H', descripcion: 'Hembra' },
]
