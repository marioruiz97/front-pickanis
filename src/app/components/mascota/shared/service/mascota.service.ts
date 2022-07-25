import { Mascota } from './../model/mascota';
import { Observable } from 'rxjs';
import { UiService } from '@core/service/ui.service';
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';
import * as rutas from '@shared/rutas.constants'
import { Respuesta } from '@core/model/respuesta.model';
import { ConfirmDialogData } from '@core/model/confirm-dialog-data';

@Injectable()
export class MascotaService {

  private pathMascotas = rutas.RUTA_MASCOTAS;

  constructor(private httpService: HttpService, private uiService: UiService) { }

  consultar(): Observable<Mascota[]> {
    return this.httpService.getRequest<Mascota[]>(this.pathMascotas);
  }

  consultarPorResponsable(responsable: number): Observable<Mascota[]> {
    return this.httpService.getRequest<Mascota[]>(`${this.pathMascotas}/${responsable}`);
  }

  /*  consultarPorId(id: number): Promise<Mascota> {
     return this.httpService
       .getRequest<Mascota>(`${this.consultaPath}/${id}`)
       .toPromise();
   } */

  crear(data: Mascota): Observable<Mascota> {
    return this.httpService.postRequest<Mascota, Mascota>(this.pathMascotas, data);
  }

  modificar(data: Mascota, idResponsable: string): Observable<Mascota> {
    return this.httpService.putRequest(`${this.pathMascotas}/${idResponsable}`, data);
  }

  eliminarMascota(mascota: Mascota): void {
    const path = `${this.pathMascotas}/${mascota.idMascota}`;
    const data: ConfirmDialogData = {
      title: "Eliminar mascota",
      message: "¿Deseas eliminar esta mascota? <br/><span class='itallic'>Esto no se puede deshacer</span>", showCancel: true, confirm: "Sí, eliminar"
    };
    this.uiService.mostrarConfirmDialog(data).afterClosed().subscribe(decision => {
      if (decision) {
        this.httpService.deleteRequest<Respuesta>(path).subscribe({
          next: (respuesta) => this.uiService.mostrarSnackBar(respuesta.mensaje),
          error: (err) => {
            console.log("eliminar mascota", err)
            this.uiService.mostrarError({
              title: "Error",
              message: "No se pudo eliminar la mascota <br/><span class='itallic'>No se puede eliminar si tiene paseos asociados</span>",
              showCancel: false
            })
          }
        });
      }
    });
  }


}
