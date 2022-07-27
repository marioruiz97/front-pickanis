import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PerfilPaseador } from '@feature/paseadores/shared/model/paseador';
import { PaseadorService } from '@feature/paseadores/shared/service/paseador.service';

@Component({
  templateUrl: './perfil-paseador-form.component.html',
  styleUrls: ['./perfil-paseador-form.component.css']
})
export class PerfilPaseadorFormComponent implements OnInit {

  esRegistrar = true;
  paseadorForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { esPaseador: boolean },
    private matDialogRef: MatDialogRef<PerfilPaseadorFormComponent>,
    private service: PaseadorService
  ) {
    this.paseadorForm = this.iniciarFormulario();
    this.esRegistrar = !data.esPaseador;
  }

  ngOnInit(): void {
    if (this.data.esPaseador) this.obtenerPerfilActual();
  }

  obtenerPerfilActual() {
    this.service.obtenerMiPerfilPaseador().then(respuesta => this.setFormulario(respuesta));
  }

  private iniciarFormulario() {
    return new FormGroup({
      tiempoExperiencia: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      perfil: new FormControl('', [Validators.required, Validators.maxLength(255)]),
    });
  }

  private setFormulario(paseador: PerfilPaseador): void {
    this.paseadorForm.setValue({
      tiempoExperiencia: paseador.tiempoExperiencia,
      perfil: paseador.perfilExperiencia,
    })
  }

  guardarPerfilPaseador() {
    if (this.esRegistrar) {
      this.service.registrarPaseador({ ...this.paseadorForm.value }).subscribe({
        next: respuesta => this.matDialogRef.close(respuesta),
        error: _ => this.matDialogRef.close({ exito: false, mensaje: "Falló el registrar paseador, intenta nuevamente" })
      });
    } else {
      this.service.editarPaseador({ ...this.paseadorForm.value }).subscribe({
        next: respuesta => this.matDialogRef.close(respuesta),
        error: _ => this.matDialogRef.close({ exito: false, mensaje: "Falló el editar el perfil de paseador, intenta nuevamente" })
      });
    }
  }

}
