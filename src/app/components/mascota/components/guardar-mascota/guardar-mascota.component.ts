import { UiService } from '@core/service/ui.service';
import { MascotaService } from './../../shared/service/mascota.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Mascota } from '@feature/mascota/shared/model/mascota';
import { sexosMascota, SexoMascota } from '@feature/mascota/shared/model/sexo-mascota';

@Component({
  templateUrl: './guardar-mascota.component.html',
  styleUrls: ['./guardar-mascota.component.css']
})
export class GuardarMascotaComponent implements OnInit {

  mascotaForm!: FormGroup;
  maxDate = new Date();
  isWaiting = false;
  sexos: SexoMascota[] = sexosMascota;
  private isUpdate = false;
  private dueno!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Mascota,
    public dialogRef: MatDialogRef<GuardarMascotaComponent>,
    private service: MascotaService,
    private uiService: UiService
  ) { }

  // TODO: obtener id responsable desde el authService
  ngOnInit(): void {
    this.iniciarFormulario();
    /* if (this.data.idResponsableMascota) {
      this.idResponsable = this.data.idResponsableMascota;
    } else if (this.data.responsableMascota) {
      this.idResponsable = this.data.responsableMascota?.idResponsable;
    } */
    if (this.data && this.data.idMascota) {
      this.setForm(this.data);
    }
    this.uiService.loadingState.subscribe(state => this.isWaiting = state);
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
    this.isUpdate = true;
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
    if (this.isUpdate) {
      this.service.modificar({ ...this.mascotaForm.value, dueno: this.dueno }, this.data.idMascota);
    } else {
      this.service.crear({ ...this.mascotaForm.value, dueno: this.dueno });
    }
    this.dialogRef.close();
  }

}
