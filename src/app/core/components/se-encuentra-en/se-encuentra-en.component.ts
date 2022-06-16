import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NodoRuta } from '@core/model/nodo-ruta';
import { TerminoRuta } from '@core/model/termino-ruta';
import { RutasService } from '@core/service/rutas.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'se-encuentra-en',
  templateUrl: './se-encuentra-en.component.html',
  styleUrls: ['./se-encuentra-en.component.css']
})
export class SeEncuentraEnComponent {

  private terminoRuta: TerminoRuta;
  rutas: NodoRuta[];

  constructor(private rutaService: RutasService, private router: Router) {
    this.terminoRuta = rutaService.obtenerRuta(router.url.substring(1));
    this.rutas = this.rutaService.construirSpan(this.terminoRuta);
    console.log("construyendo arbol de rutas para ", this.terminoRuta.termino)
  }

  trackByRutas(index: number, ruta: NodoRuta): string { return ruta.clave; }


}
