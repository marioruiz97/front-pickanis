import { PaseoService } from './shared/service/paseo.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { ListarPaseoComponent } from './components/listar-paseo/listar-paseo.component';
import { GuardarPaseoComponent } from './components/guardar-paseo/guardar-paseo.component';
import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [ListarPaseoComponent, GuardarPaseoComponent],
  imports: [
    SharedModule,
    CoreModule
  ],
  exports: [ListarPaseoComponent, GuardarPaseoComponent],
  providers: [PaseoService]
})
export class PaseoModule { }
