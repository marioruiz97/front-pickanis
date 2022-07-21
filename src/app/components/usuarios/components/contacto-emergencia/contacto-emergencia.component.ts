import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UiService } from '@core/service/ui.service';
import { ContactoEmergencia } from '@feature/usuarios/shared/model/contacto-usuario.model';
import { UsuarioService } from '@feature/usuarios/shared/service/usuario.service';

@Component({
  selector: 'app-contacto-emergencia',
  templateUrl: './contacto-emergencia.component.html',
  styleUrls: ['./contacto-emergencia.component.css']
})
export class ContactoEmergenciaComponent implements OnInit {

  private _esAgregar: boolean;
  contactoForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ContactoEmergencia | undefined,
    private service: UsuarioService,
    private uiService: UiService,
    private dialogRef: MatDialogRef<ContactoEmergenciaComponent>
  ) {
    this.contactoForm = this.iniciarForm();
    this._esAgregar = true;
  }

  ngOnInit(): void {
    if (this.data !== undefined) {
      this._esAgregar = false;
      this.setForm(this.data);
    }
  }

  get esAgregar() {
    return this._esAgregar;
  }

  get form() {
    return this.contactoForm.value;
  }

  private iniciarForm() {
    return new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern('(^$|[0-9]*)')]),
      telefonoFijo: new FormControl('', [Validators.minLength(7), Validators.maxLength(12), Validators.pattern('(^$|[0-9]*)')]),
    });
  }

  private setForm(contacto: ContactoEmergencia) {
    this.contactoForm.setValue({
      nombre: contacto.nombre,
      celular: contacto.celular,
      telefonoFijo: contacto.telefonoFijo,
    });
  }

  guardarContacto() {
    const contacto: ContactoEmergencia = {
      id: this.data && this.data.id ? this.data.id : 0,
      ...this.contactoForm.value
    }

    if (this._esAgregar) {
      this.service.agregarContactoEmergencia(contacto).subscribe({
        next: (respuesta) => { this.contactoGuardadoConExito(respuesta); },
        error: (err) => { this.falloGuardarContacto(err); }
      });

    } else {
      this.service.editarContactoEmergencia(contacto).subscribe({
        next: (respuesta) => { this.contactoGuardadoConExito(respuesta); },
        error: (err) => { this.falloGuardarContacto(err); }
      });

    }
  }

  private contactoGuardadoConExito(respuesta: ContactoEmergencia): void {
    this.uiService.mostrarConfirmDialog({ title: "Éxito", message: "Se guardó el contacto de emergencia con éxito", showCancel: false, confirm: "Ok" })
      .afterClosed().subscribe(_ => this.dialogRef.close(respuesta));
  }

  private falloGuardarContacto(error: any) {
    console.log("error en contacto emergencia", error)
    this.uiService.mostrarError({ title: "Algo Falló", message: "No se pudo guardar el contacto de emergencia", confirm: "Intentar nuevamente", showCancel: true })
      .afterClosed().subscribe((intentar: boolean) => {
        if (intentar) {
          this.guardarContacto();
        }
      });
  }

}
