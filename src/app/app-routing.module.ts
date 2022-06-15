import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { MiPerfilComponent } from './components/usuarios/components/mi-perfil/mi-perfil.component';
import * as rutas from './shared/rutas.constants'

const routes: Routes = [
  { path: '', redirectTo: `/${rutas.RUTA_HOME}`, pathMatch: 'full' }, // TODO: redirigir a landing si no ha iniciado sesion, sino a /home
  { path: rutas.RUTA_LANDING, component: LandingPageComponent },
  { path: rutas.RUTA_CUENTA, component: MiPerfilComponent },
  { path: rutas.RUTA_HOME, component: PaginaPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
