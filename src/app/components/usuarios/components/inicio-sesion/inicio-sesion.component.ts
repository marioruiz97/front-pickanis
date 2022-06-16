import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  constructor(private uiService: UiService, private service: UsuarioService) {
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
    console.log('inicio sesion ')
    this.service.iniciarSesion();
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
    if (this.iniciarConCorreo && this.loginForm.value.correo && this.loginForm.value.correo.contains('@')) esValido = true;
    if (!this.iniciarConCorreo && this.loginForm.value.username && this.loginForm.value.username.length >= 6) esValido = true;
    return esValido;
  }

}
