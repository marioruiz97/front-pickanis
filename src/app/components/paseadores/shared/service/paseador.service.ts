import { Injectable } from '@angular/core';
import { Respuesta } from '@core/model/respuesta.model';
import { HttpService } from '@core/service/http.service';
import { RUTA_PASEADORES } from '@shared/rutas.constants';
import { lastValueFrom, Observable } from 'rxjs';
import { PerfilPaseador } from '../model/paseador';

@Injectable()
export class PaseadorService {

  private paseadorPath = RUTA_PASEADORES;

  constructor(private httpService: HttpService) { }

  esPaseador(): Promise<boolean> {
    const path = `${this.paseadorPath}/es-paseador`;
    return lastValueFrom(this.httpService.getRequest(path));
  }

  obtenerMiPerfilPaseador(): Promise<any> {
    const path = `${this.paseadorPath}/mi-info`;
    return lastValueFrom(this.httpService.getRequest(path));
  }

  editarPaseador(paseador: PerfilPaseador): Observable<Respuesta> {
    const path = this.paseadorPath;
    return this.httpService.putRequest(path, paseador);
  }

  registrarPaseador(paseador: PerfilPaseador): Observable<Respuesta> {
    const path = this.paseadorPath;
    return this.httpService.postRequest(path, paseador);
  }

  desactivarPaseador(): Promise<Respuesta> {
    const path = `${this.paseadorPath}/desactivar`;
    return lastValueFrom(this.httpService.deleteRequest(path));
  }

}
