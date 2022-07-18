import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UiService } from '@core/service/ui.service';
import { TipoDocumento, tiposDocumentos } from '../../shared/model/tipo-documento.model';
import { UsuarioService } from '../../shared/service/usuario.service';

@Component({
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  registroForm: FormGroup;
  tiposDoc: TipoDocumento[] = tiposDocumentos;
  seleccionPaseador: boolean = false;

  constructor(private uiService: UiService, private service: UsuarioService, private dialogLoginRef: MatDialogRef<RegistroComponent>) {
    this.registroForm = this.iniciarFormGroup();
  }

  registrarUsuario() {
    // validar si password y confirm son iguales
    const coinciden = this.validarContrasenas(this.registroForm.value.contrasena, this.registroForm.value.matchContrasena);
    if (!coinciden) {
      return;
    }
    const form = this.registroForm.value;
    this.service.registrar(form, this.seleccionPaseador, this.dialogLoginRef);
  }

  private iniciarFormGroup(): FormGroup {
    return new FormGroup({
      tipoDocumento: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required, Validators.min(1), Validators.maxLength(10), Validators.minLength(6)]),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(80)]),
      apellidos: new FormControl('', [Validators.required, Validators.maxLength(70)]),
      telefono: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('(^$|[0-9]*)')]),
      celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('(^$|[0-9]*)')]),
      correo: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(64)]),
      usuario: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      contrasena: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      matchContrasena: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(14)]),
      tiempoExperiencia: new FormControl('', [Validators.maxLength(255)]),
      perfil: new FormControl('', [Validators.maxLength(255)]),
    })
  }

  private validarContrasenas(password: string, confirm: string): boolean {
    const coinciden = password === confirm ? true : false;
    if (!coinciden) {
      this.uiService.mostrarSnackBar('Las contraseñas no coinciden', 'Ok');
    }
    return coinciden;
  }

}
