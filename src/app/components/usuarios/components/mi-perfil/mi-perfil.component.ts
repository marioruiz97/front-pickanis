import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { UiService } from '@core/service/ui.service';
import { DIALOG_CONFIG } from '@shared/app.constants';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private currentUser: any;
  private idUsuario = 90;
  private cuentaService: any
  accountForm: FormGroup;
  habilitarCampos = false;

  constructor(
    private uiService: UiService,
    private matDialog: MatDialog
  ) {
    this.accountForm = this.initForm();
  }

  get _idUsuario() {
    return this.idUsuario;
  }

  ngOnInit(): void {
    // no debe estar vacío, ignorar alerta mientras
  }

  initForm() {
    return new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(40)]),
      apellido1: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]),
      direccion: new FormControl({ value: '', disabled: true }, [Validators.maxLength(30)]),
      telefono: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(12)]),
      username: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]),
      correo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email, Validators.maxLength(64)]),
      identificacion: new FormControl({ value: '', disabled: true }),
      tipoDocumento: new FormControl({ value: '', disabled: true })
    });
  }

  setForm(usuario: any) {
    /* const tipoDoc = usuario.tipoDocumento as TipoDocumento;
    this.accountForm.setValue({
      nombre: usuario.nombre,
      apellido1: usuario.apellido1,
      direccion: usuario.direccion,
      telefono: usuario.telefono,
      correo: usuario.correo,
      identificacion: usuario.identificacion,
      tipoDocumento: tipoDoc.nombreTipoDocumento,
    }); */
  }

  /*
 metodo usado para activar formulario de edición y para aparecer los botonoes de guardar y cancelar
 */
  toggleEdit() {
    this.habilitarCampos = !this.habilitarCampos;
    if (this.habilitarCampos) {
      this.enableControls();
    } else {
      this.disableControls();
    }
  }

  enableControls() {
    const controls = ['nombre', 'apellido1', 'direccion', 'telefono', 'correo'];
    controls.forEach(control => this.accountForm.controls[control].enable());
  }

  disableControls() {
    const controls = ['nombre', 'apellido1', 'direccion', 'telefono', 'correo'];
    controls.forEach(control => this.accountForm.controls[control].disable());
  }

  getMyInfo() {
    /* this.subs.push(this.cuentaService.myInfo.subscribe(res => {
      this.currentUser = res.body as Usuario;
      this.idUsuario = this.currentUser.idUsuario;
      this.setForm(this.currentUser);
    }, _ => {
      this.uiService.showConfirm({ title: 'Error', message: 'No se pudo obtener la información. Intenta nuevamente' })
        .afterClosed().subscribe(res => {
          if (res) {
            return this.cuentaService.myInfo;
          }
          this.authService.goToHome();
        });
    })); */
  }

  saveMyInfo() {
    const form = this.accountForm.value;
    const user = {
      idUsuario: this.idUsuario,
      nombre: form.nombre,
      apellido1: form.apellido1,
      direccion: form.direccion,
      telefono: form.telefono,
      correo: form.correo
    };
    this.toggleEdit();
    this.cuentaService.saveMyInfo(user).finally(() => this.getMyInfo());
  }

  onChangePass() {
    /* no code this.matDialog.open(ChangePasswordComponent, { data: { idUsuario: this.idUsuario } }); */
  }

  verificarCuenta() {
    alert('se enviará un correo electrónico para verificar la cuenta')
  }

  eliminarCuenta() {
    const data = {
      title: "Eliminar la cuenta",
      message: `¿Estás seguro de eliminar tu cuenta? <br/> <span class='caption itallic'>Esto no se puede deshacer</span>`,
      errors: [],
      confirm: "Sí, deseo eliminar la cuenta",
    }
    this.matDialog.open(ConfirmDialogComponent, { ...DIALOG_CONFIG, data });
  }



}
