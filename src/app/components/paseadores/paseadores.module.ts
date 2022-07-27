import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';
import { ListarPaseadoresComponent } from './components/listar-paseadores/listar-paseadores.component';
import { MiPerfilPaseadorComponent } from './components/mi-perfil-paseador/mi-perfil-paseador.component';



@NgModule({
  declarations: [
    ListarPaseadoresComponent,
    MiPerfilPaseadorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class PaseadoresModule { }
