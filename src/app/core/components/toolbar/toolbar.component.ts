import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NavItem } from '@core/model/nav-item';
import { AutenticacionService } from '@core/service/autenticacion.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Input()
  menu!: NavItem[];
  ajustes: NavItem[] = [
    { name: 'Mi cuenta', url: '/cuenta', icon: 'account_circle' },
    { name: 'Acerca de', url: '/acerca', icon: 'account_tree' },
    /* { name: 'Contacto', url: '/contacto', icon: 'contacts' } */
  ];

  @Output() openMenu = new EventEmitter();

  constructor(private authService: AutenticacionService) {
    // void constructor
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
  }

}
