import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { AutenticacionService } from "@core/service/autenticacion.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AutenticacionService) { }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.estaAutenticado.getValue()) {
      if (this.haExpiradoToken()) {
        this.authService.sesionExpirada();
        return false;
      }
      if (state.url === '/landing') { this.authService.irAlHome(); }
      return true;
    }
    this.authService.irAlLogin();
    return false;
  }

  haExpiradoToken(): boolean {
    const token = this.authService.token;
    const payload = this.authService.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    return payload === null || payload.exp < now ? true : false;
  }

}
