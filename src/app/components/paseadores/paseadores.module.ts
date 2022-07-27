import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { ListarPaseadoresComponent } from './components/listar-paseadores/listar-paseadores.component';
import { MiPerfilPaseadorComponent } from './components/mi-perfil-paseador/mi-perfil-paseador.component';
import { SharedModule } from '@shared/shared.module';
import { PerfilPaseadorFormComponent } from './components/perfil-paseador-form/perfil-paseador-form.component';
import { PaseadorService } from './shared/service/paseador.service';



@NgModule({
  declarations: [
    ListarPaseadoresComponent,
    MiPerfilPaseadorComponent,
    PerfilPaseadorFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ],
  exports: [
    MiPerfilPaseadorComponent
  ],
  providers: [
    PaseadorService
  ]
})
export class PaseadoresModule { }
