import { UiService } from '@core/service/ui.service';
import { MascotaService } from './../../shared/service/mascota.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from '@feature/mascota/shared/model/mascota';
import { sexosMascota, SexoMascota } from '@feature/mascota/shared/model/sexo-mascota';
import { AutenticacionService } from '@core/service/autenticacion.service';

@Component({
  templateUrl: './guardar-mascota.component.html',
  styleUrls: ['./guardar-mascota.component.css']
})
export class GuardarMascotaComponent implements OnInit {

  mascotaForm!: FormGroup;
  maxDate = new Date('06/01/2022');
  sexos: SexoMascota[] = sexosMascota;
  private _esEditar = false;
  private dueno!: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
    public dialogRef: MatDialogRef<GuardarMascotaComponent>,
    private service: MascotaService,
    private uiService: UiService,
    private authService: AutenticacionService
  ) { }

  get esEditar() {
    return this._esEditar;
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    if (this.data && this.data.dueno) {
      this.dueno = this.data.dueno;
    } else if (this.authService.usuarioEnSesion) {
      this.dueno = this.authService.usuarioEnSesion.identificacion;
    }
    if (this.data && this.data.idMascota) {
      this.setForm(this.data);
    }
  }

  private iniciarFormulario(): void {
    this.mascotaForm = new FormGroup({
      idMascota: new FormControl({ value: '', disabled: true }),
      nombre: new FormControl('', [Validators.required]),
      raza: new FormControl('', [Validators.required]),
      sexo: new FormControl('', [Validators.required]),
      fechaNacimiento: new FormControl('', [Validators.required]),
      peso: new FormControl('', [Validators.required, Validators.min(0.2)]),
      observaciones: new FormControl('', [Validators.maxLength(255)]),
    });
    this.mascotaForm.markAsTouched();
  }

  private setForm(mascota: Mascota): void {
    this._esEditar = true;
    this.mascotaForm.setValue({
      idMascota: mascota.idMascota,
      nombre: mascota.nombre,
      raza: mascota.raza,
      sexo: mascota.sexo,
      fechaNacimiento: mascota.fechaNacimiento,
      peso: mascota.peso,
      observaciones: mascota.observaciones,
    });
  }

  onSubmit(): void {
    if (this._esEditar) {
      this.service.modificar({ ...this.mascotaForm.value, dueno: this.dueno, idMascota: this.data.idMascota }, this.data.dueno)
        .subscribe({
          next: (respuesta) => this.resolverPeticion(respuesta),
          error: (err) => {
            console.log("Error editando una mascota: ", err)
            this.uiService.mostrarConfirmDialog({ title: "Error", message: "No se pudo guardar la mascota, intenta más tarde", showCancel: false });
          }
        });
    } else {
      this.service.crear({ ...this.mascotaForm.value, dueno: this.dueno })
        .subscribe({
          next: (respuesta) => this.resolverPeticion(respuesta),
          error: (err) => {
            console.log("Error creando una mascota: ", err)
            this.uiService.mostrarConfirmDialog({ title: "Error", message: "No se pudo guardar la mascota, intenta más tarde", showCancel: false });
          }
        });
    }
  }

  private resolverPeticion(respuesta: Mascota) {
    if (respuesta && respuesta.idMascota) {
      this.uiService.mostrarSnackBar("Se ha guardado la mascota con éxito");
      this.dialogRef.close(true);
    }
  }

}
