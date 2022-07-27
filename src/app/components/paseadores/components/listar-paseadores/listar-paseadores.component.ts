import { Component, OnInit } from '@angular/core';
import { PaseadorService } from '@feature/paseadores/shared/service/paseador.service';
import { Paseador } from '../../shared/model/paseador';

@Component({
  selector: 'app-listar-paseadores',
  templateUrl: './listar-paseadores.component.html',
  styleUrls: ['./listar-paseadores.component.css']
})
export class ListarPaseadoresComponent implements OnInit {

  paseadores: Paseador[] = [];

  constructor(private service: PaseadorService) { }

  ngOnInit(): void {
    this.cargarPaseadores();
  }

  private cargarPaseadores() {
    this.service.cargarPaseadores().subscribe(lista => this.paseadores = lista);
  }


}
