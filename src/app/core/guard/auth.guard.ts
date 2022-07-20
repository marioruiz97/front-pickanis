import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AutenticacionService } from "@core/service/autenticacion.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AutenticacionService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.estaAutenticado.getValue()) {
      if (this.haExpiradoToken()) {
        this.authService.sesionExpirada();
        return false;
      }
      return true;
    }
    this.router.navigate(['/landing']);
    return false;
  }

  haExpiradoToken(): boolean {
    const token = this.authService.token;
    const payload = this.authService.obtenerDatosToken(token);
    const now = new Date().getTime() / 1000;
    return payload.exp < now ? true : false;
  }

}
