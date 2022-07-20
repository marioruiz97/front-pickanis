import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AutenticacionService } from "@core/service/autenticacion.service";
import { UiService } from "@core/service/ui.service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AutenticacionService, private uiService: UiService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Get the auth token from the service.
    const authToken = this.authService.buscarToken;
    let authReq = req;

    if (authToken) {
      authReq = req.clone({
        setHeaders: { Authorization: 'Bearer ' + authToken }
      });
    }

    return next.handle(authReq).pipe(
      catchError(err => {
        if (err.status === 401 && this.authService.verificarAutenticacion()) {
          this.authService.sesionExpirada();
        }
        if (err.status === 403) {
          this.uiService.mostrarError({ title: 'Acceso Denegado', message: 'No tienes acceso a este recurso', confirm: 'Ok' });
          this.authService.irAlHome();
        }
        return throwError(() => new Error(err));
      })
    );
  }
}
