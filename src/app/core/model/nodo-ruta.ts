export interface NodoRuta {
  clave: string;
  nombre: string;
  siguiente?: NodoRuta;
}
