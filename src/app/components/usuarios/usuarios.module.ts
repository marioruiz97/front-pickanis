import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from './shared/service/usuario.service';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { MiPerfilComponent } from './components/mi-perfil/mi-perfil.component';



@NgModule({
  declarations: [
    RegistroComponent,
    InicioSesionComponent,
    MiPerfilComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  providers: [
    UsuarioService
  ]
})
export class UsuariosModule { }
