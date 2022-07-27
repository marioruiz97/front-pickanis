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
  displayedColumns = ['idPaseo', 'idPublicador', 'idMascota', 'fechaPublicacion', 'fechaIncial', 'fechaFinal', 'descripcion', 'acciones'];
  datasource = new MatTableDataSource<Paseo>();
  private suscripciones: Subscription[] = [];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: PaseoService, private matDialog: MatDialog) {
    this.datasource.data.push(
      {idPaseo: 1, idPublicador: 103598856201, idMascota: "Firulais", fechaPublicacion: new Date(), fechaInicio: new Date(), fechaFinal: new Date(), estado: true, descripcion: 'Solo se necesita sacar 1 hora', tipo: ' '},
      {idPaseo: 2, idPublicador: 436885921, idMascota: "Lupita", fechaPublicacion: new Date('07-25-2022'), fechaInicio: new Date('07-28-2022'), fechaFinal: new Date('07-28-2022'), estado: true, descripcion: 'Solo sale si tienes puesto una camisa amarilla', tipo: ' '},
      {idPaseo: 3, idPublicador: 11526984501, idMascota: "Mia", fechaPublicacion: new Date('07-23-2022'), fechaInicio: new Date('07-29-2022'), fechaFinal: new Date('07-29-2022'), estado: true, descripcion: 'Le gusta jugar con mas perros', tipo: ' '},
      {idPaseo: 4, idPublicador: 116982035, idMascota: "Zafira", fechaPublicacion: new Date('07-26-2022'), fechaInicio: new Date('08-01-2022'), fechaFinal: new Date('08-01-2022'), estado: true, descripcion: 'Camina lento', tipo: ' '}
      )
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
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG }).afterClosed().subscribe(respuesta=>{this.modificarLista(respuesta)});
  }

  editarPaseo(paseo: Paseo): void {
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG, data: { ...paseo } }).afterClosed().subscribe(respuesta=>{this.modificarLista(respuesta)});
  }
  modificarLista(paseo: Paseo):void{
    if(paseo && paseo.idMascota){
      if (paseo.idPaseo) {

      }else{
        const idPaseo=this.datasource.data.length
        this.datasource.data.push({...paseo,idPaseo})
      }
    }
  }

  ngOnDestroy(): void {
    if (this.suscripciones) {
      this.suscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
