import { MascotaService } from './shared/service/mascota.service';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { ListarMascotaComponent } from './components/listar-mascota/listar-mascota.component';
import { GuardarMascotaComponent } from './components/guardar-mascota/guardar-mascota.component';



@NgModule({
  declarations: [ListarMascotaComponent, GuardarMascotaComponent],
  imports: [SharedModule
  ],
  exports: [ListarMascotaComponent, GuardarMascotaComponent],
  providers: [MascotaService]
})
export class MascotaModule { }
