import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Respuesta } from '@core/model/respuesta.model';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { HttpService } from '@core/service/http.service';
import { UiService } from '@core/service/ui.service';
import { RegistroComponent } from '@feature/usuarios/components/registro/registro.component';
import { lastValueFrom } from 'rxjs';
import { AuthData } from '../model/auth-data.model';
import { RegistroUsuario } from '../model/registro-usuario.model';

@Injectable()
export class UsuarioService {

  private urlRegistro = "cuenta/registro?tipoRegistro=";

  constructor(
    private httpService: HttpService,
    private uiService: UiService,
    private authService: AutenticacionService
  ) { }

  async registrar(usuario: RegistroUsuario, seleccionPaseador: boolean, ref: MatDialogRef<RegistroComponent>) {
    const tipoRegistro = seleccionPaseador ? "paseador" : "usuario";
    await lastValueFrom(this.httpService.postRequest<RegistroUsuario, Respuesta>(`${this.urlRegistro}${tipoRegistro}`, usuario)).then(respuesta => {
      if (respuesta.exito) {
        this.uiService.mostrarSnackBar(respuesta.mensaje);
        const authData: AuthData = { login: usuario.correo, contrasena: usuario.contrasena, identificacion: usuario.identificacion };
        this.iniciarSesion(authData, ref);
      }
    }).catch(err => {
      console.log("error en registro de usuarios", err);
      this.uiService.mostrarError({ title: "Ha fallado el registro", message: err.error.message, errors: err.error.errors ? err.error.errors : [], confirm: 'Ok' })
    });
  }

  async iniciarSesion(authData: AuthData, ref: MatDialogRef<any>) {
    await this.httpService.loginRequest(authData).then(respuesta => {
      ref.close();
      this.authService.guardarSesion(respuesta);
    }).catch(err => {
      this.authService.inicioSesionFallo(err.error);
    });
  }
}
