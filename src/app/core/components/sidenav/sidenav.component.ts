import { NavItem } from '@core/model/nav-item';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent {
  @Output() closeSidenav = new EventEmitter();
  @Input() menu!: NavItem[];
  nombre: string;

  constructor() {
    this.nombre = 'Mario Ruiz' //TODO: agregar logica del nombre del usuario
  }

  onToggle(): void {
    this.closeSidenav.emit();
  }

  cerrarSesion() {
    console.log('cerrar sesion')
  }
}
