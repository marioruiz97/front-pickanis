import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioService {

  constructor() { }

  registrar(usuario: any) {
    console.log("registro exitoso", usuario)
  }
}
