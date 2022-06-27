import { MatDialog } from '@angular/material/dialog';
import { MascotaService } from './../../shared/service/mascota.service';
import { Mascota } from './../../shared/model/mascota';
import {
  AfterViewInit, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { GuardarMascotaComponent } from '../guardar-mascota/guardar-mascota.component';
import { DIALOG_CONFIG } from '@shared/app.constants';

@Component({
  selector: 'app-listar-mascota',
  templateUrl: './listar-mascota.component.html',
  styleUrls: ['./listar-mascota.component.css'],
})
export class ListarMascotaComponent implements AfterViewInit, OnDestroy {
  displayedColumns = ['idMascota', 'nombre', 'fechaNacimiento', 'peso', 'rasgosCaracteristicos', 'acciones'];
  datasource = new MatTableDataSource<Mascota>();
  mostrarLista = false;
  private suscripciones: Subscription[] = [];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Output() ocultarLista = new EventEmitter();

  constructor(private service: MascotaService, private matDialog: MatDialog) { }

  ocultar(): void {
    this.ocultarLista.emit();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  doFilter($event: any): void {
    const filterString: string = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  crearMascota(): void {
    this.matDialog.open(GuardarMascotaComponent, { ...DIALOG_CONFIG });
  }

  editarMascota(mascota: Mascota): void {
    this.matDialog.open(GuardarMascotaComponent, { ...DIALOG_CONFIG, data: { ...mascota } });
  }

  ngOnDestroy(): void {
    if (this.suscripciones) {
      this.suscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
