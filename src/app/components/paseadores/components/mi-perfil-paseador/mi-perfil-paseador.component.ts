import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-mi-perfil-paseador',
  templateUrl: './mi-perfil-paseador.component.html',
  styleUrls: ['./mi-perfil-paseador.component.css']
})
export class MiPerfilPaseadorComponent implements OnInit {


  esPaseador: boolean = false;



  constructor() {

  }


  ngOnInit(): void {
    console.log("ignorar")
  }

  cambiar() {

  }




}
