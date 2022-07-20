export interface TipoDocumento {
  id: number;
  nombreTipoDocumento: string;
}

export const tiposDocumentos: TipoDocumento[] = [
  { id: 1, nombreTipoDocumento: "Cedula de ciudadania" },
  { id: 2, nombreTipoDocumento: "Pasaporte" },
  { id: 3, nombreTipoDocumento: "Tarjeta de identidad" },
]

export const obtenerTipoDocumento = (tipo: string | number): TipoDocumento => {
  if (tipo === 'CEDULA' || tipo === 1) { return { id: 1, nombreTipoDocumento: "Cedula de ciudadania" } }
  if (tipo === 'PASAPORTE' || tipo === 2) { return { id: 2, nombreTipoDocumento: "Pasaporte" } }
  if (tipo === 'TARJETA_IDENTIDAD' || tipo === 3) { return { id: 3, nombreTipoDocumento: "Tarjeta de identidad" } }
  return { id: 1, nombreTipoDocumento: "Cedula de ciudadania" };
}
