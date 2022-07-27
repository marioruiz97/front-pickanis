import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-perfil-paseador-form',
  templateUrl: './perfil-paseador-form.component.html',
  styleUrls: ['./perfil-paseador-form.component.css']
})
export class PerfilPaseadorFormComponent implements OnInit {

  habilitarCampos: boolean = false;
  paseadorForm: FormGroup;

  constructor() {
    this.paseadorForm = this.iniciarFormulario();
  }

  ngOnInit(): void {
    console.log("ignorar")
  }

  private iniciarFormulario() {
    return new FormGroup({});
  }

  guardarPerfilPaseador() {

  }

  toggleEditar() {
    this.habilitarCampos = !this.habilitarCampos;
    if (this.habilitarCampos) {
      this.habilitarCamposFormulario();
    } else {
      this.deshabilitarCamposFormulario();
    }
  }

  private habilitarCamposFormulario() {
    const controls = ['nombre', 'apellido', 'direccion', 'telefonoFijo', 'celular', 'correo'];
    controls.forEach(control => this.paseadorForm.controls[control].enable());
  }

  private deshabilitarCamposFormulario() {
    const controls = ['nombre', 'apellido', 'direccion', 'telefonoFijo', 'celular', 'correo'];
    controls.forEach(control => this.paseadorForm.controls[control].disable());
  }
}
