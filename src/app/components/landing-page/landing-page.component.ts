import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_CONFIG, customConfig } from '@shared/app.constants';
import { InicioSesionComponent } from '../usuarios/components/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from '../usuarios/components/registro/registro.component';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {
  }

  abrirRegistrarse(): void {
    this.matDialog.open(RegistroComponent, { ...DIALOG_CONFIG });
  }

  abrirInicioSesion(): void {
    this.matDialog.open(InicioSesionComponent, { ...customConfig('36vw') });
  }

}
