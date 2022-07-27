import { UiService } from '@core/service/ui.service';
import { PaseoService } from '../../shared/service/paseo.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paseo } from '@feature/paseo/shared/model/paseo';
import { AutenticacionService } from '@core/service/autenticacion.service';


@Component({
  templateUrl: './guardar-paseo.component.html',
  styleUrls: ['./guardar-paseo.component.css']
})
export class GuardarPaseoComponent implements OnInit {

  paseoForm: FormGroup;
  maxDate = new Date();
  isWaiting = false;
  private isUpdate = false;
  private publicador: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Paseo,
    public dialogRef: MatDialogRef<GuardarPaseoComponent>,
    private service: PaseoService,
    private uiService: UiService,
    private authService: AutenticacionService
  ) {
    this.publicador = authService.usuarioEnSesion ? authService.usuarioEnSesion.identificacion : "";
    this.paseoForm = this.iniciarFormulario();
    this.paseoForm.markAsTouched();
    if (this.publicador) { this.paseoForm.controls['idPublicador'].disable(); }
  }

  // TODO: obtener id responsable desde el authService
  ngOnInit(): void {
    if (this.data && this.data.idPaseo) {
      this.setForm(this.data);
    }
    this.uiService.loadingState.subscribe(state => this.isWaiting = state);
  }

  private iniciarFormulario() {
    return new FormGroup({
      idPaseo: new FormControl({ value: '', disabled: true }),
      idPublicador: new FormControl(this.publicador, [Validators.required]),
      idMascota: new FormControl('', [Validators.required]),
      fechaPublicacion: new FormControl('', [Validators.required]),
      fechaInicio: new FormControl('', [Validators.required]),
      fechaFinal: new FormControl('', [Validators.required]),
      descripcion: new FormControl('', [Validators.maxLength(255)]),
    });
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
      this.dialogRef.close({ ...this.paseoForm.value, idPaseo: this.data.idPaseo, idPublicador: this.publicador });
    } else {
      this.dialogRef.close({ ...this.paseoForm.value, idPublicador: this.publicador });
    }
  }

}
