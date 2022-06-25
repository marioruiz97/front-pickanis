import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@core/model/nav-item';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input()
  menu!: NavItem[];
  ajustes: NavItem[] = [
    { name: 'Mi Perfil', url: '/micuenta', icon: 'account_circle' },
    { name: 'Acerca de', url: '/acerca', icon: 'account_tree' },
    { name: 'Contacto', url: '/contacto', icon: 'contacts' }
  ];

  @Output() openMenu = new EventEmitter();

  constructor() {
    // void constructor
  }

  cerrarSesion() {
    console.log('cerrar sesion')
  }

}
