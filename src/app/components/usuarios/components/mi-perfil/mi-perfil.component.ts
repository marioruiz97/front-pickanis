import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '@core/components/confirm-dialog/confirm-dialog.component';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { UiService } from '@core/service/ui.service';
import { ContactoEmergencia } from '@feature/usuarios/shared/model/contacto-usuario.model';
import { InformacionPersonal, Perfil } from '@feature/usuarios/shared/model/perfil-data.model';
import { obtenerIdTipoDocumento, obtenerTipoDocumento } from '@feature/usuarios/shared/model/tipo-documento.model';
import { DIALOG_CONFIG } from '@shared/app.constants';
import { UsuarioService } from '../../shared/service/usuario.service';
import { ContactoEmergenciaComponent } from '../contacto-emergencia/contacto-emergencia.component';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  private miPerfil: Perfil | null;
  private identificacion: string;
  private nombreUsuario: string;
  contactos: ContactoEmergencia[] = [];
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
    this.identificacion = "0000";
    this.nombreUsuario = "0000";
  }

  get _identificacion() {
    return this.identificacion;
  }

  ngOnInit(): void {
    this.cargarInformacionPersonal();
    this.cargarMisContactosEmergencia();
  }

  cargarMisContactosEmergencia() {
    this.service.cargarMisContactosEmergencia().subscribe({
      next: (respuesta: ContactoEmergencia[]) => {
        this.contactos = respuesta;
      }
    });
  }

  formatearTelefono(telefono: string) {
    return "+57 " + telefono.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3");
  }

  cargarInformacionPersonal() {
    this.service.cargarInformacionCuenta().subscribe({
      next: (perfil) => {
        this.miPerfil = perfil;
        this.identificacion = perfil.usuario.identificacion;
        this.nombreUsuario = perfil.usuario.nombreUsuario;
        this.setForm(this.miPerfil);
      },
      error: () => {
        this.uiService.mostrarConfirmDialog({ title: 'Error', message: 'No se pudo obtener la información. Intenta nuevamente', showCancel: true })
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
    const perfil: InformacionPersonal = {
      nombre: form.nombre,
      apellido: form.apellido,
      direccion: form.direccion,
      telefonoFijo: form.telefonoFijo,
      celular: form.celular,
      nombreUsuario: this.nombreUsuario,
      correo: form.correo,
      identificacion: this.identificacion,
      tipoDocumento: obtenerIdTipoDocumento(form.tipoDocumento)
    };
    this.toggleEdit();
    this.service.guardarDatosPerfil(perfil);
  }

  abrirModalContactos(data?: ContactoEmergencia | undefined) {
    this.matDialog.open(ContactoEmergenciaComponent, { data }).afterClosed().subscribe({
      next: (respuesta => {
        console.log(respuesta)
        if (this.contactos.length === 0) { this.contactos.push(respuesta); }
        else {
          this.contactos = this.contactos.map(contacto => {
            if (contacto.id === respuesta.id) {
              contacto = respuesta;
            }
            return contacto;
          });
        }
        if (respuesta && this.contactos.indexOf(respuesta) === -1) { this.contactos.push(respuesta); }
      })
    });
  }

  abrirModalContrasena() {
    /* no code this.matDialog.open(ChangePasswordComponent, { data: { identificacion: this.identificacion } }); */
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
