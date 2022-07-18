import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
import { UiService } from '@core/service/ui.service';
import { UsuarioService } from '../../shared/service/usuario.service';

@Component({
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {

  loginForm: FormGroup;
  iniciarConCorreo: boolean = true;
  hide: boolean = true;

  constructor(private uiService: UiService, private service: UsuarioService, private dialogLoginRef: MatDialogRef<InicioSesionComponent>) {
    this.loginForm = this.iniciarFormGroup();
  }


  cambiarModo(e: MatRadioChange): void {
    this.iniciarConCorreo = e.value;
    if (this.iniciarConCorreo) {
      this.loginForm.controls['username'].setValue('');
    }
    if (!this.iniciarConCorreo) {
      this.loginForm.controls['correo'].setValue('');
    }
  }

  iniciarSesion(): void {
    const esValido = this.validarModoInicio();
    if (!esValido) {
      this.uiService.mostrarSnackBar('No ingreso nombre de usuario o correo', 'Ok');
      return;
    }
    let login: string;
    if (this.iniciarConCorreo)
      login = this.loginForm.value.correo;
    else
      login = this.loginForm.value.username
    this.service.iniciarSesion({ login, contrasena: this.loginForm.value.contrasena }, this.dialogLoginRef);
  }

  private iniciarFormGroup() {
    return new FormGroup({
      correo: new FormControl('', [Validators.email]),
      username: new FormControl('', [Validators.minLength(6)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    })
  }

  private validarModoInicio(): boolean {
    let esValido = false;
    if (this.iniciarConCorreo && this.loginForm.value.correo && this.loginForm.value.correo.includes('@')) esValido = true;
    if (!this.iniciarConCorreo && this.loginForm.value.username && this.loginForm.value.username.length >= 6) esValido = true;
    return esValido;
  }

}
