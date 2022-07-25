import { MatDialog } from '@angular/material/dialog';
import { MascotaService } from './../../shared/service/mascota.service';
import { Mascota } from './../../shared/model/mascota';
import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
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
  displayedColumns = ['nombre', 'raza', 'sexo', 'fechaNacimiento', 'peso', 'observaciones', 'acciones'];
  datasource = new MatTableDataSource<Mascota>();
  private suscripciones: Subscription[] = [];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private service: MascotaService, private matDialog: MatDialog) {
    this.cargarMisMascotas();
  }

  ngAfterViewInit(): void {
    this.datasource.sort = this.sort;
    this.datasource.paginator = this.paginator;
  }

  private cargarMisMascotas() {
    this.service.consultar().subscribe(respuesta => this.datasource.data = respuesta);
  }

  doFilter($event: any): void {
    const filterString: string = $event.target.value;
    this.datasource.filter = filterString.trim().toLocaleLowerCase();
  }

  crearMascota(): void {
    this.matDialog.open(GuardarMascotaComponent, { ...DIALOG_CONFIG }).afterClosed().subscribe(respuesta => { if (respuesta) this.cargarMisMascotas() });
  }

  editarMascota(mascota: Mascota): void {
    this.matDialog.open(GuardarMascotaComponent, { ...DIALOG_CONFIG, data: { ...mascota } }).afterClosed().subscribe(respuesta => { if (respuesta) this.cargarMisMascotas() });
  }

  eliminarMascota(mascota: Mascota): void {
    this.service.eliminarMascota(mascota);
    this.cargarMisMascotas();
  }

  ngOnDestroy(): void {
    if (this.suscripciones) {
      this.suscripciones.forEach((sub) => sub.unsubscribe());
    }
  }
}
