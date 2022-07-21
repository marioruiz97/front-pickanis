import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Respuesta } from '@core/model/respuesta.model';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { HttpService } from '@core/service/http.service';
import { UiService } from '@core/service/ui.service';
import { RegistroComponent } from '@feature/usuarios/components/registro/registro.component';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthData } from '../model/auth-data.model';
import { InformacionPersonal, Perfil } from '../model/perfil-data.model';
import { RegistroUsuario } from '../model/registro-usuario.model';

@Injectable()
export class UsuarioService {

  private pathMiCuenta = "mi-cuenta";
  private urlRegistro = "cuenta/registro?tipoRegistro=";

  constructor(
    private httpService: HttpService,
    private uiService: UiService,
    private authService: AutenticacionService
  ) { }

  cargarInformacionCuenta(): Observable<Perfil> {
    return this.httpService.getRequest(this.pathMiCuenta);
  }

  guardarDatosPerfil(perfil: InformacionPersonal) {
    const path = `${this.pathMiCuenta}/info-personal/${perfil.identificacion}`
    this.httpService.postRequest<InformacionPersonal, any>(path, perfil).subscribe({
      next: () => {
        this.uiService.mostrarConfirmDialog({
          title: "Se guardó la información personal con éxito",
          message: "los datos en el menú lateral no se recargarán hasta tu próximo inicio de sesión",
          confirm: "Ok",
          showCancel: false
        });
      },
      error: () => {
        this.uiService.mostrarError({ title: "Error actualizando informacion personal", message: "Intenta nuevamente", confirm: "Ok", showCancel: false });
      }
    })
  }

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
      this.uiService.mostrarError({
        title: "Ha fallado el registro",
        message: err.error.message,
        errors: err.error.errors ? err.error.errors : [],
        confirm: 'Ok',
        showCancel: false
      })
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
