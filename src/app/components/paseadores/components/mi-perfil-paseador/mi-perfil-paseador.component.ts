import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogData } from '@core/model/confirm-dialog-data';
import { Respuesta } from '@core/model/respuesta.model';
import { UiService } from '@core/service/ui.service';
import { PaseadorService } from '@feature/paseadores/shared/service/paseador.service';
import { DIALOG_CONFIG } from '@shared/app.constants';
import { PerfilPaseadorFormComponent } from '../perfil-paseador-form/perfil-paseador-form.component';

@Component({
  selector: 'app-mi-perfil-paseador',
  templateUrl: './mi-perfil-paseador.component.html',
  styleUrls: ['./mi-perfil-paseador.component.css']
})
export class MiPerfilPaseadorComponent implements OnInit {

  esPaseador: boolean = false;

  constructor(
    private matDialog: MatDialog,
    private service: PaseadorService,
    private uiService: UiService
  ) { }


  ngOnInit(): void {
    this.verificarEsPaseador();
  }

  private verificarEsPaseador() {
    this.service.esPaseador()
      .then(respuesta => this.esPaseador = respuesta)
      .catch(_ => this.esPaseador = false);
  }

  abrirFormularioPaseador() {
    this.matDialog.open(PerfilPaseadorFormComponent, { ...DIALOG_CONFIG, data: { esPaseador: this.esPaseador } })
      .afterClosed().subscribe((respuesta: Respuesta) => {
        if (respuesta.mensaje) {
          this.uiService.mostrarSnackBar(respuesta.mensaje);
          location.reload();
        }
      })
  }


  desactivarPaseador() {
    const data: ConfirmDialogData = {
      title: "Desactivar paseador",
      message: "¿Seguro que deseas desactivar tu perfil de paseador? <br/> <span>Tendrás que crearlo nuevamente si deseas tomar paseos</span>",
      showCancel: true,
      confirm: "Sí, deseo desactivar mi perfil"
    };
    this.uiService.mostrarConfirmDialog({ ...data }).afterClosed().subscribe(respuesta => {
      if (respuesta) this.service.desactivarPaseador().then(response => {
        this.uiService.mostrarConfirmDialog({
          title: response.exito ? "Éxito" : "Error",
          message: response.mensaje,
          showCancel: false
        });
        this.verificarEsPaseador();
        location.reload();
      });
    });
  }


}
