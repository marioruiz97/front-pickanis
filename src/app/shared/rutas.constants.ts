import { TerminoRuta } from "@core/model/termino-ruta";

export const RUTA_HOME: string = "home";
export const RUTA_LANDING: string = "landing";
export const RUTA_CUENTA: string = "cuenta";
export const RUTA_DASHBOARD: string = "dashboard";
export const RUTA_NOTIFICACIONES: string = "notificaciones";
export const RUTA_PASEOS: string = "paseos";
export const RUTA_PASEADORES: string = "paseadores";
export const RUTA_MASCOTAS: string = "mascotas";


export const RUTAS_DICCIONARIO: TerminoRuta[] = [
  { termino: RUTA_HOME, definicion: { clave: RUTA_HOME, nombre: "Menú principal" } },
  {
    termino: RUTA_CUENTA, definicion: {
      clave: RUTA_HOME, nombre: "Menú principal", siguiente:
        { clave: RUTA_CUENTA, nombre: "Mi cuenta" }
    }
  },
  {
    termino: RUTA_DASHBOARD, definicion: {
      clave: RUTA_HOME, nombre: "Menú principal", siguiente:
      {
        clave: RUTA_CUENTA, nombre: "Mi cuenta", siguiente:
          { clave: RUTA_DASHBOARD, nombre: "Tablero" }
      }
    }
  },
  {
    termino: RUTA_NOTIFICACIONES, definicion: {
      clave: RUTA_HOME, nombre: "Menú principal", siguiente:
      {
        clave: RUTA_CUENTA, nombre: "Mi cuenta", siguiente:
        {
          clave: RUTA_DASHBOARD, nombre: "Tablero", siguiente:
            { clave: RUTA_NOTIFICACIONES, nombre: "Mis notificaciones" }
        }
      }
    }
  },
  {
    termino: RUTA_MASCOTAS, definicion: {
      clave: RUTA_HOME, nombre: "Menú principal", siguiente:
      {
        clave: RUTA_CUENTA, nombre: "Mi cuenta", siguiente:
        {
          clave: RUTA_DASHBOARD, nombre: "Tablero", siguiente:
            { clave: RUTA_MASCOTAS, nombre: "Mis Mascotas" }
        }
      }
    }
  },
  { termino: RUTA_PASEOS, definicion: { clave: RUTA_HOME, nombre: "Menú principal" } },
  { termino: RUTA_PASEADORES, definicion: { clave: RUTA_HOME, nombre: "Menú principal" } },
]
