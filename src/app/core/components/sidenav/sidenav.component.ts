import { NavItem } from '@core/model/nav-item';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AutenticacionService } from '@core/service/autenticacion.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter();
  @Input() menu!: NavItem[];
  nombre: string = "";

  constructor(private authService: AutenticacionService) { }

  ngOnInit(): void {
    this.authService.estaAutenticado.subscribe(cambio => {
      if (cambio) this.nombre = this.authService.obtenerNombreUsuario();
    });
    this.authService.verificarAutenticacion();
  }

  onToggle(): void {
    this.closeSidenav.emit();
  }

  cerrarSesion() {
    this.authService.cerrarSesion();
    this.onToggle();
  }
}
