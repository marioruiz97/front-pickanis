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
import { UiService } from '@core/service/ui.service';
import { ConfirmDialogData } from '@core/model/confirm-dialog-data';
import { AutenticacionService } from '@core/service/autenticacion.service';

@Component({
  selector: 'app-listar-paseo',
  templateUrl: './listar-paseo.component.html',
  styleUrls: ['./listar-paseo.component.css'],
})
export class ListarPaseoComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['idPaseo', 'idPublicador', 'idMascota', 'fechaPublicacion', 'fechaIncial', 'fechaFinal', 'descripcion', 'acciones'];
  datasource = new MatTableDataSource<Paseo>();
  private suscripciones: Subscription[] = [];
  private idUsuarioEnSesion: string;

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: PaseoService, private matDialog: MatDialog, private uiService: UiService, private authService: AutenticacionService) {
    this.datasource.data.push(
      { idPaseo: 1, idPublicador: 1017251545, idMascota: "Nala", fechaPublicacion: new Date(), fechaInicio: new Date(), fechaFinal: new Date(), descripcion: 'Solo se necesita sacar 1 hora' },
      { idPaseo: 2, idPublicador: 1017214122, idMascota: "Lupita", fechaPublicacion: new Date('07-25-2022'), fechaInicio: new Date('07-28-2022'), fechaFinal: new Date('07-28-2022'), descripcion: 'Solo sale si tienes puesto una camisa amarilla' },
      { idPaseo: 3, idPublicador: 1017938765, idMascota: "Mia", fechaPublicacion: new Date('07-23-2022'), fechaInicio: new Date('07-29-2022'), fechaFinal: new Date('07-29-2022'), descripcion: 'Le gusta jugar con mas perros' },
      { idPaseo: 4, idPublicador: 1017214123, idMascota: "Zafira", fechaPublicacion: new Date('07-26-2022'), fechaInicio: new Date('08-01-2022'), fechaFinal: new Date('08-01-2022'), descripcion: 'Camina lento' }
    );
    this.idUsuarioEnSesion = authService.usuarioEnSesion ? authService.usuarioEnSesion.identificacion : "";
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter($event: any): void {
    const filterString: string = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  esElPublicador(paseo: Paseo): boolean {
    return paseo.idPublicador.toString() == this.idUsuarioEnSesion;
  }

  crearPaseo(): void {
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG }).afterClosed().subscribe(respuesta => { this.modificarLista(respuesta) });
  }

  editarPaseo(paseo: Paseo): void {
    this.matDialog.open(GuardarPaseoComponent, { ...DIALOG_CONFIG, data: { ...paseo } }).afterClosed().subscribe(respuesta => { this.modificarLista(respuesta) });
  }

  modificarLista(paseo: Paseo): void {
    console.log("respuesta", paseo)
    if (paseo && paseo.idMascota) {
      if (paseo.idPaseo) {
        let listaAux = this.datasource.data.slice();
        listaAux = listaAux.filter(p => p.idPaseo != paseo.idPaseo).slice();
        listaAux.push(paseo);
        this.datasource.data = listaAux;
      } else {
        const idPaseo = this.datasource.data.length + 1;
        const listaAux = this.datasource.data.slice();
        listaAux.push({ ...paseo, idPaseo });
        this.datasource.data = listaAux;
      }
    }
  }

  eliminarPaseo(paseo: Paseo) {
    const data: ConfirmDialogData = {
      title: "Eliminar paseo",
      message: "¿Seguro que deseas eliminar el paseo? <br/><span class='itallic caption'>Esta acción no se puede deshacer</span>",
      confirm: "Sí, deseo eliminarlo",
      showCancel: true
    };
    this.uiService.mostrarConfirmDialog(data).afterClosed().subscribe(respuesta => {
      if (respuesta) {
        let listaAux = this.datasource.data.slice();
        listaAux = listaAux.filter(p => p.idPaseo != paseo.idPaseo).slice();
        this.datasource.data = listaAux;
      }
    })
  }

  ngOnDestroy(): void {
    if (this.suscripciones) {
      this.suscripciones.forEach((sub) => sub.unsubscribe());
    }
  }

}
