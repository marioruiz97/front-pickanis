import { UiService } from '@core/service/ui.service';
import { PaseoService } from '../../shared/service/paseo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paseo } from '@feature/paseo/shared/model/paseo';


@Component({
  templateUrl: './guardar-paseo.component.html',
  styleUrls: ['./guardar-paseo.component.css']
})
export class GuardarPaseoComponent implements OnInit {

  paseoForm!: FormGroup;
  maxDate = new Date();
  isWaiting = false;
  private isUpdate = false;
  private publicador!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Paseo,
    public dialogRef: MatDialogRef<GuardarPaseoComponent>,
    private service: PaseoService,
    private uiService: UiService
  ) { }

  // TODO: obtener id responsable desde el authService
  ngOnInit(): void {
    this.iniciarFormulario();
    /* if (this.data.idResponsablePaseo) {
      this.idResponsable = this.data.idResponsablePaseo;
    } else if (this.data.responsablePaseo) {
      this.idResponsable = this.data.responsablePaseo?.idResponsable;
    } */
    if (this.data && this.data.idPaseo) {
      this.setForm(this.data);
    }
    this.uiService.loadingState.subscribe(state => this.isWaiting = state);
  }

  private iniciarFormulario(): void {
    this.paseoForm = new FormGroup({
      idPaseo: new FormControl({ value: '', disabled: true }),
      idPublicador: new FormControl('', [Validators.required]),
      idMascota: new FormControl('', [Validators.required]),
      fechaPublicacion: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFinal: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.maxLength(255)]),
    });
    this.paseoForm.markAsTouched();
  }

  private setForm(paseo: Paseo): void {
    this.isUpdate = true;
    this.paseoForm.setValue({
      idPaseo: paseo.idPaseo,
      idPublicador: paseo.idPublicador,
      idMascota: paseo.idMascota,
      fechaPublicacion: paseo.fechaPublicacion,
      fechaInicio: paseo.fechaInicio,
      fechaFinal: paseo.fechaFinal,
      descripcion: paseo.descripcion,
    });
  }

  onSubmit(): void {
    if (this.isUpdate) {
      this.service.modificar({ ...this.paseoForm.value, publicador: this.publicador }, this.data.idPaseo);
    } else {
      this.service.crear({ ...this.paseoForm.value, publicador: this.publicador });
    }
    this.dialogRef.close();
  }

}
