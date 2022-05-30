import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './components/registro/registro.component';
import { SharedModule } from '@shared/shared.module';
import { UsuarioService } from './shared/service/usuario.service';



@NgModule({
  declarations: [
    RegistroComponent
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
