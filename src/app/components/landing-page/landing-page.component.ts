import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DIALOG_CONFIG } from '@shared/app.constants';
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

  abrirRegistrarse():void {
    this.matDialog.open(RegistroComponent, {...DIALOG_CONFIG});
  }

}
