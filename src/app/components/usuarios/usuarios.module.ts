import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from './shared/service/usuario.service';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';
import { CoreModule } from '@core/core.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ContactoEmergenciaComponent } from './components/contacto-emergencia/contacto-emergencia.component';
import { CambiarContrasenaComponent } from './components/cambiar-contrasena/cambiar-contrasena.component';
import { PaseadoresModule } from '@feature/paseadores/paseadores.module';



@NgModule({
  declarations: [
    RegistroComponent,
    InicioSesionComponent,
    MiPerfilComponent,
    ContactoEmergenciaComponent,
    CambiarContrasenaComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    PaseadoresModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule { }
