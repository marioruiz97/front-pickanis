import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPaseadoresComponent } from './listar-paseadores/listar-paseadores.component';
import { SharedModule } from '@shared/shared.module';
import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [
    ListarPaseadoresComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule
  ]
})
export class PaseadoresModule { }
