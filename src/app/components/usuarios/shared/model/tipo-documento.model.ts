export interface TipoDocumento {
  id: number;
  nombreTipoDocumento: string;
}

export const tiposDocumentos: TipoDocumento[] = [
  { id: 1, nombreTipoDocumento: "Cedula de ciudadania" },
  { id: 2, nombreTipoDocumento: "Pasaporte" },
  { id: 3, nombreTipoDocumento: "Tarjeta de identidad" },
]
