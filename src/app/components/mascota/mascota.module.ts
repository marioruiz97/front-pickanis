import { MascotaService } from './shared/service/mascota.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { ListarMascotaComponent } from './components/listar-mascota/listar-mascota.component';
import { GuardarMascotaComponent } from './components/guardar-mascota/guardar-mascota.component';
import { CoreModule } from '@core/core.module';



@NgModule({
  declarations: [ListarMascotaComponent, GuardarMascotaComponent],
  imports: [
    SharedModule,
    CoreModule
  ],
  exports: [ListarMascotaComponent, GuardarMascotaComponent],
  providers: [MascotaService]
})
export class MascotaModule { }
