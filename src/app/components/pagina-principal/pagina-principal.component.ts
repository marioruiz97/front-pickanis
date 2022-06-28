import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccesoRapido } from '@core/model/enlace';
import * as ruta from '@shared/rutas.constants';

@Component({
  selector: 'app-pagina-principal',
  templateUrl: './pagina-principal.component.html',
  styleUrls: ['./pagina-principal.component.css']
})
export class PaginaPrincipalComponent {

  accesos: AccesoRapido[] = [
    { nombre: "Mi tablero", icono: 'dashboard', url: ruta.RUTA_DASHBOARD },
    { nombre: "Mi cuenta", icono: 'account_circle', url: ruta.RUTA_CUENTA },
    { nombre: "Mis mascotas", icono: 'pets', url: ruta.RUTA_MASCOTAS },
    { nombre: "Paseadores", icono: 'hiking', url: ruta.RUTA_PASEADORES },
    { nombre: "Paseos", icono: 'explore', url: ruta.RUTA_PASEOS },
  ]

  constructor(private router: Router) { }

  trackByTitulo(index: number, enlace: AccesoRapido): string { return enlace.nombre; }

  test(url: string) {
    this.router.navigate([`/${url}`])
  }

}
