import { MatDialog } from '@angular/material/dialog';
import { PaseoService } from './../../shared/service/paseo.service';
import { Paseo } from './../../shared/model/paseo';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GuardarPaseoComponent } from '../guardar-paseo/guardar-paseo.component';
import { DIALOG_CONFIG } from '@shared/app.constants';

@Component({
  selector: 'app-listar-paseo',
  templateUrl: './listar-paseo.component.html',
  styleUrls: ['./listar-paseo.component.css'],
})
export class ListarPaseoComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['Paseo', 'Publicador', 'Mascota', 'Fecha Publicación', 'descripcioón'];
  datasource = new MatTableDataSource<Paseo>();
  private suscripciones: Subscription[] = [];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: PaseoService, private matDialog: MatDialog) {
    this.datasource.data.push({
      idPaseo: 1, idPublicador: 1, idMascota : 1 ,fechaPublicacion: new Date(),fechaInicio: new Date(), fechaFinal: new Date(),estado: true, descripcion : 'Paseo completo',tipo:''
    })
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter($event: any): void {
    const filterString: string = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  crearPaseo(): void {
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG });
  }

  editarPaseo(paseo: Paseo): void {
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG, data: { ...paseo} });
  }

  ngOnDestroy(): void {
    if (this.suscripciones) {
      this.suscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
