import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { UiService } from '@core/service/ui.service';
import { Perfil } from '@feature/usuarios/shared/model/perfil-data.model';
import { obtenerTipoDocumento } from '@feature/usuarios/shared/model/tipo-documento.model';
import { DIALOG_CONFIG } from '@shared/app.constants';
import { UsuarioService } from '../../shared/service/usuario.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private miPerfil: Perfil | null;
  private idUsuario: string | null;
  accountForm: FormGroup;
  habilitarCampos = false;

  constructor(
    private uiService: UiService,
    private matDialog: MatDialog,
    private service: UsuarioService,
    private authService: AutenticacionService
  ) {
    this.accountForm = this.initForm();
    this.miPerfil = null;
    this.idUsuario = null;
  }

  get _idUsuario() {
    return this.idUsuario;
  }

  ngOnInit(): void {
    this.cargarInformacionPersonal();
  }

  cargarInformacionPersonal() {
    this.service.cargarInformacionCuenta().subscribe({
      next: (perfil) => {
        this.miPerfil = perfil;
        this.idUsuario = perfil.usuario.identificacion;
        this.setForm(this.miPerfil);
      },
      error: () => {
        this.uiService.mostrarConfirmDialog({ title: 'Error', message: 'No se pudo obtener la información. Intenta nuevamente' })
          .afterClosed().subscribe(res => {
            if (res) {
              return this.cargarInformacionPersonal();
            }
            this.authService.irAlHome();
          });
      }
    });
  }

  initForm() {
    return new FormGroup({
      nombre: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(40)]),
      apellido: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(30)]),
      direccion: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]),
      telefonoFijo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(12), Validators.pattern('(^$|[0-9]*)')]),
      celular: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(12), Validators.pattern('(^$|[0-9]*)')]),
      nombreUsuario: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.maxLength(64)]),
      correo: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.email, Validators.maxLength(64)]),
      identificacion: new FormControl({ value: '', disabled: true }),
      tipoDocumento: new FormControl({ value: '', disabled: true })
    });
  }

  setForm(perfil: Perfil) {
    const usuario = perfil.usuario;
    const contacto = usuario.contacto;
    const tipoDoc = obtenerTipoDocumento(usuario.tipoDocumento);
    this.accountForm.setValue({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      direccion: contacto.direccion,
      telefonoFijo: contacto.telefonoFijo,
      celular: contacto.celular,
      nombreUsuario: usuario.nombreUsuario,
      correo: usuario.correo,
      identificacion: usuario.identificacion,
      tipoDocumento: tipoDoc.nombreTipoDocumento,
    });
  }

  /*
 metodo usado para activar formulario de edición y para aparecer los botonoes de guardar y cancelar
 */
  toggleEdit() {
    this.habilitarCampos = !this.habilitarCampos;
    if (this.habilitarCampos) {
      this.habilitarCamposFormulario();
    } else {
      this.deshabilitarCamposFormulario();
    }
  }

  habilitarCamposFormulario() {
    const controls = ['nombre', 'apellido', 'direccion', 'telefonoFijo', 'celular', 'correo'];
    controls.forEach(control => this.accountForm.controls[control].enable());
  }

  deshabilitarCamposFormulario() {
    const controls = ['nombre', 'apellido', 'direccion', 'telefonoFijo', 'celular', 'correo'];
    controls.forEach(control => this.accountForm.controls[control].disable());
  }


  guardarDatosPersonales() {
    const form = this.accountForm.value;
    const perfil = {
      idUsuario: this.idUsuario,
      nombre: form.nombre,
      apellido: form.apellido,
      direccion: form.direccion,
      telefonoFijo: form.telefonoFijo,
      correo: form.correo
    };
    this.toggleEdit();
    //this.service.guardarDatosPerfil(perfil);
  }

  abrirModalContrasena() {
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
