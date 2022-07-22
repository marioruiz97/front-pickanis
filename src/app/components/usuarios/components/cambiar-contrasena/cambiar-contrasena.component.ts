import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Respuesta } from '@core/model/respuesta.model';
import { UiService } from '@core/service/ui.service';
import { UsuarioService } from '@feature/usuarios/shared/service/usuario.service';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.component.html',
  styleUrls: ['./cambiar-contrasena.component.css']
})
export class CambiarContrasenaComponent implements OnInit {

  formulario: FormGroup;
  private identificacion: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { identificacion: string },
    private usuarioService: UsuarioService,
    private uiService: UiService,
    private dialogRef: MatDialogRef<CambiarContrasenaComponent>
  ) {
    this.identificacion = this.data.identificacion;
    this.formulario = new FormGroup({
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      confirmar: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
    });
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
  }

  cerrarModal() {
    this.dialogRef.close();
  }

  cambiarContrasena() {
    const form = this.formulario.value;
    if (form.password === form.confirm) {
      this.usuarioService.cambiarContrasena({ ...form, identificacion: this.identificacion }, this.identificacion).subscribe((respuesta: Respuesta) => {
        if (respuesta.exito) {
          this.uiService.mostrarConfirmDialog({ title: "Cambio de contraseña", message: respuesta.mensaje, confirm: "Aceptar", showCancel: false });
          this.cerrarModal();
        }
      });
    } else {
      this.uiService.mostrarSnackBar('Las contraseñas no coinciden');
    }
  }
}
