import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Respuesta } from '@core/model/respuesta.model';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { HttpService } from '@core/service/http.service';
import { UiService } from '@core/service/ui.service';
import { RegistroComponent } from '@feature/usuarios/components/registro/registro.component';
import { lastValueFrom, Observable } from 'rxjs';
import { AuthData } from '../model/auth-data.model';
import { ContactoEmergencia } from '../model/contacto-usuario.model';
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

  cambiarContrasena(form: any, identificacion: string): Observable<Respuesta> {
    const path = `${this.pathMiCuenta}/${identificacion}/cambiar-contrasena`;
    return this.httpService.putRequest(path, form);
  }

  cargarMisContactosEmergencia(): Observable<ContactoEmergencia[]> {
    const path = `${this.pathMiCuenta}/contactos`;
    return this.httpService.getRequest(path);
  }

  editarContactoEmergencia(contacto: ContactoEmergencia): Observable<ContactoEmergencia> {
    const path = `${this.pathMiCuenta}/contactos/${contacto.id}`;
    return this.httpService.putRequest<ContactoEmergencia, ContactoEmergencia>(path, contacto);
  }

  agregarContactoEmergencia(contacto: ContactoEmergencia): Observable<ContactoEmergencia> {
    const path = `${this.pathMiCuenta}/contactos`;
    return this.httpService.postRequest<ContactoEmergencia, ContactoEmergencia>(path, contacto);
  }

  async eliminarContactoEmergencia(contacto: ContactoEmergencia): Promise<Respuesta> {
    console.log("contacto a eliminar", contacto.id)
    const path = `${this.pathMiCuenta}/contactos/${contacto.id}`;
    return lastValueFrom(this.httpService.deleteRequest<Respuesta>(path));
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

  desactivarCuenta(identificacion: string) {
    const path = `${this.pathMiCuenta}/${identificacion}`;
    this.httpService.deleteRequest<Respuesta>(path).subscribe({
      next: (respuesta: Respuesta) => {
        this.authService.cerrarSesion();
        this.uiService.mostrarSnackBar(respuesta.mensaje);
      },
      error: (err) => {
        this.uiService.mostrarError({ title: "Hubo un error desactivando el usuario", message: "No se pudo desactivar el usuario", showCancel: false });
      }
    })
  }
}
