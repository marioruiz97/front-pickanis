import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { MiPerfilComponent } from './components/usuarios/components/mi-perfil/mi-perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // TODO: redirigir a landing si no ha iniciado sesion, sino a /home
  { path: 'landing', component: LandingPageComponent },
  { path: 'cuenta', component: MiPerfilComponent },
  { path: 'home', component: PaginaPrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
