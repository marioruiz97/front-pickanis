import { Injectable } from '@angular/core';
import { HttpService } from '@core/service/http.service';
import { RegistroUsuario } from '../model/registro-usuario.model';

@Injectable()
export class UsuarioService {

  private urlRegistro = "cuenta/registro";

  constructor(private httpService: HttpService) { }

  registrar(usuario: RegistroUsuario) {
    console.log("usuario", usuario)
    this.httpService.postRequest<RegistroUsuario, any>(this.urlRegistro, usuario).subscribe({
      next(value) {
        console.log("exito", value)
      },
      error(err) {
        console.log("error", err)
      },
    });
  }

  iniciarSesion() {

  }
}
