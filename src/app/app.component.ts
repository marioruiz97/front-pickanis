import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { NavItem } from '@core/model/nav-item';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  estaAutenticado = false;
  title = 'front-pickanis';
  $isHandset: Observable<boolean>;

  menu: NavItem[] = [
    { url: '/paseadores', name: 'Paseadores', icon: 'hiking' },
    { url: '/paseos', name: 'Paseos', icon: 'explore' },
    { url: '/dashboard', name: 'Mi tablero', icon: 'dashboard' },
    { url: '/mascotas', name: 'Mis mascotas', icon: 'pets' },
  ];

  constructor(
    private breakPointObserver: BreakpointObserver,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AutenticacionService
  ) {
    this.authService.estaAutenticado.subscribe(estado => this.estaAutenticado = estado);
    this.authService.verificarAutenticacion();
    this.$isHandset = this.breakPointObserver.observe([Breakpoints.Handset])
      .pipe(
        map(result => result.matches),
        tap(() => this.changeDetectorRef.detectChanges())
      );
  }

}
