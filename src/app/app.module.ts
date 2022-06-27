import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { PaginaPrincipalComponent } from './components/pagina-principal/pagina-principal.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { UsuariosModule } from './components/usuarios/usuarios.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MascotaModule } from './components/mascota/mascota.module';

@NgModule({
  declarations: [
    AppComponent,
    PaginaPrincipalComponent,
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    FontAwesomeModule,
    CoreModule,
    UsuariosModule,
    MascotaModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
