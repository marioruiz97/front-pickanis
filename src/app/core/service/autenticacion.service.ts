import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthData } from '@feature/usuarios/shared/model/auth-data.model';
import * as rutas from '@shared/rutas.constants';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  usuarioEnSesion: AuthData | null = null;
  token: string | null = "";

  constructor(private router: Router, private uiService: UiService) { }

  estaAutenticado(): boolean {
    return true; // TODO : implementar
  }

  irAlLogin() {
    this.router.navigate([rutas.RUTA_LANDING]);
  }

  irAlHome(): void {
    this.router.navigate([rutas.RUTA_HOME]);
  }

  sesionExpirada(): void {
    this.uiService.mostrarError({ title: 'La sesión ha expirado!', message: 'Ingresa al sistema nuevamente', confirm: 'Ok' });
    this.cerrarSesion();
  }


  cerrarSesion() {
    this.uiService.mostrarSnackBar('Se ha cerrado sesión');
    this.token = null;
    this.usuarioEnSesion = null;
    sessionStorage.clear();
    this.irAlLogin();
  }


  guardarSesion(respuesta: any) {
    const token = respuesta.access_token;
    const payload = this.obtenerDatosToken(token);
    this.guardarDatosUsuario(payload);
    this.guardarToken(token);
    this.irAlHome();
  }

  inicioSesionFallo(error: any): void {
    const errors: string[] = [];
    const message: string = error.error_description ? error.error_description : "";
    if (message === 'User is disabled') {
      errors.push('Usuario Inactivo, primero debe activarse');
    } else if (message === 'User account is locked') {
      errors.push('Debes validar tu correo electrónico antes de iniciar sesión');
    } else {
      errors.push('Usuario o contraseña incorrectas, intenta nuevamente');
    }
    this.uiService.mostrarError({ title: "Ha fallado el inicio de sesión", message: "Por favor verifique los datos ingresados", errors })
  }

  private obtenerDatosToken(accessToken: any) {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  private guardarToken(accessToken: any) {
    this.token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  private guardarDatosUsuario(payload: any) {
    console.log(payload)
    this.usuarioEnSesion = { identificacion: payload.usuario_id, login: payload.usuario_correo, contrasena: "" }
  }

}
