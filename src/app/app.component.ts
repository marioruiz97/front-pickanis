import { Component } from '@angular/core';
import { NavItem } from '@core/model/nav-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'front-pickanis';

  menu: NavItem[] = [
    { url: '/tipo-citas', name: 'Tipos de Cita', icon: 'next_week' },
    { url: '/veterinarios', name: 'Veterinarios', icon: 'assignment_ind' },
    { url: '/responsables', name: 'Clientes y Mascotas', icon: 'people' },
    { url: '/citas', name: 'Agendar Citas', icon: 'book_online' },
  ];

  /* TODO: necesito un breakpoint observer? o como vamos a manejar la responsividad de la aplicación en pantallas mas pequeñas */
}
