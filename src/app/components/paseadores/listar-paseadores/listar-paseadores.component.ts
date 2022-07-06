import { Component } from '@angular/core';
import { Paseador } from '../shared/model/paseador';

@Component({
  selector: 'app-listar-paseadores',
  templateUrl: './listar-paseadores.component.html',
  styleUrls: ['./listar-paseadores.component.css']
})
export class ListarPaseadoresComponent {

  paseadores: Paseador[] = [
    { nombre: 'Fulanito Perez' },
    { nombre: 'Fulanito Sultano' },
    { nombre: 'Fulanito de tal' },
    { nombre: 'Fulanito 4' },
    { nombre: 'Fulanito 5' },
  ]
  constructor() { }


}
