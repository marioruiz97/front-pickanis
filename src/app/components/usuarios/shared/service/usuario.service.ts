import { Injectable } from '@angular/core';
import { Respuesta } from '@core/model/respuesta.model';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { HttpService } from '@core/service/http.service';
import { UiService } from '@core/service/ui.service';
import { lastValueFrom } from 'rxjs';
import { AuthData } from '../model/auth-data.model';
import { RegistroUsuario } from '../model/registro-usuario.model';

@Injectable()
export class UsuarioService {

  private urlRegistro = "cuenta/registro?tipoRegistro=";

  constructor(private httpService: HttpService, private uiService: UiService, private authService: AutenticacionService) { }

  async registrar(usuario: RegistroUsuario, seleccionPaseador: boolean) {
    const tipoRegistro = seleccionPaseador ? "paseador" : "usuario";
    const respuesta = await lastValueFrom(this.httpService.postRequest<RegistroUsuario, Respuesta>(`${this.urlRegistro}${tipoRegistro}`, usuario));
    if (respuesta.exito) {
      this.uiService.mostrarSnackBar(respuesta.mensaje);
      const authData: AuthData = { login: usuario.correo, contrasena: usuario.contrasena, identificacion: usuario.identificacion };
      this.iniciarSesion(authData);
    }
  }

  async iniciarSesion(authData: AuthData) {
    await this.httpService.loginRequest(authData).then(respuesta => {
      this.authService.guardarSesion(respuesta);
    }).catch(err => {
      this.authService.inicioSesionFallo(err.error);
    });
  }
}
