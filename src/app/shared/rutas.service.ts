import { Injectable } from '@angular/core';
import { NodoRuta } from '@core/model/nodo-ruta';
import { TerminoRuta } from '@core/model/termino-ruta';
import { RUTAS_DICCIONARIO } from './rutas.constants';


@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor() {
    // void constructor
  }

  obtenerRuta(termino: string): TerminoRuta {
    const rutas = RUTAS_DICCIONARIO.filter(entrada => entrada.termino === termino);
    return rutas.length > 0 ? rutas[0] : RUTAS_DICCIONARIO[0];
  }

  construirSpan(terminoRuta: TerminoRuta): NodoRuta[] {
    let span = [];
    let nodoActual = terminoRuta.definicion;
    span.push(nodoActual);
    while (nodoActual.siguiente) {
      span.push(nodoActual.siguiente);
      if (nodoActual.siguiente) nodoActual = nodoActual.siguiente
      else break;
    }
    return span;
  }
}
