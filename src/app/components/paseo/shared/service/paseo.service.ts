import { Paseo } from '../model/paseo';
import { Observable, Subject } from 'rxjs';
import { UiService } from '@core/service/ui.service';
import { HttpService } from '@core/service/http.service';
import { Injectable } from '@angular/core';
import * as rutas from '@shared/rutas.constants'
import { MatTableDataSource } from '@angular/material/table';

@Injectable()
export class PaseoService {
  private comandoPath = 'operador/' + rutas.RUTA_PASEOS;
  private consultaPath = 'consulta/' + rutas.RUTA_PASEOS;

  public debeRecargarse = new Subject<boolean>();
  datasource = new MatTableDataSource<Paseo>();

  constructor(private httpService: HttpService, private uiService: UiService) { }

  consultar(): Observable<Paseo[]> {
    return this.httpService.getRequest<Paseo[]>(this.consultaPath);
  }

  consultarPorResponsable(responsable: number): Observable<Paseo[]> {
    return this.httpService.getRequest<Paseo[]>(`${this.consultaPath}/${responsable}`);
  }

  /*  consultarPorId(id: number): Promise<Paseo> {
     return this.httpService
       .getRequest<Paseo>(`${this.consultaPath}/${id}`)
       .toPromise();
   } */

  crear(data: Paseo): void {
    //this.uiService.configurarSnackBar()
    this.httpService.postRequest(this.comandoPath, data)
      .subscribe((exito) => {
        if (exito) {
          this.debeRecargarse.next(true);
        }
      });
  }

  modificar(paseo: Paseo): void {

    const filtro =this.datasource.data.map((p)=>p.idPaseo===paseo.idPaseo);
    //`${this.datasource.data}`, data);
    console.log(filtro)


  //  this.datasource.data
    //this.uiService.configurarSnackBar()
  /*  this.httpService.putRequest(`${this.comandoPath}/${idResponsable}`, data)
      .subscribe((exito) => {
        if (exito) {
          this.debeRecargarse.next(true);
        }
      });*/
  }


}
