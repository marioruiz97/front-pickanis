import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenInfo } from '@core/model/token-info.model';
import * as rutas from '@shared/rutas.constants';
import { Subject } from 'rxjs';
import { UiService } from './ui.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  usuarioEnSesion: TokenInfo | null = null;
  token: string | null = null;
  estaAutenticado: Subject<boolean> = new Subject<boolean>();

  constructor(private router: Router, private uiService: UiService) { }

  verificarAutenticacion(): boolean {
    let payload = this.obtenerDatosToken(this.buscarToken);
    if (payload != null) {
      this.guardarDatosUsuario(payload);
      this.estaAutenticado.next(true);
      return true;
    }
    this.estaAutenticado.next(false);
    return false;
  }

  obtenerNombreUsuario(): string {
    if (this.usuarioEnSesion)
      return this.usuarioEnSesion.nombreCompleto;
    return "";
  }

  private irAlLogin() {
    this.router.navigate([rutas.RUTA_LANDING]);
  }

  irAlHome(): void {
    this.router.navigate([rutas.RUTA_HOME]);
  }

  sesionExpirada(): void {
    this.uiService.mostrarError({ title: 'La sesión ha expirado!', message: 'Ingresa al sistema nuevamente', confirm: 'Ok' });
    this.cerrarSesion();
    this.estaAutenticado.next(false);
  }


  cerrarSesion() {
    this.uiService.mostrarSnackBar('Se ha cerrado sesión');
    this.token = null;
    this.usuarioEnSesion = null;
    sessionStorage.clear();
    this.irAlLogin();
    this.estaAutenticado.next(false);
  }


  guardarSesion(respuesta: any) {
    const token = respuesta.access_token;
    const payload = this.obtenerDatosToken(token);
    this.guardarDatosUsuario(payload);
    this.guardarToken(token);
    this.irAlHome();
    this.estaAutenticado.next(true);
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

  private get buscarToken(): any {
    let token = null;
    if (this.token) token = this.token;
    else if (!this.token && sessionStorage.getItem('token') != null) token = sessionStorage.getItem('token');
    return token;
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
    this.usuarioEnSesion = { identificacion: payload.usuario_id, correo: payload.usuario_correo, username: payload.usuario_username, roles: payload.usuario_roles, nombreCompleto: payload.usuario_nombre }
  }

}
