import { Component } from '@angular/core';
import { EnlaceExterno, Seccion } from '@core/model/enlace';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faBorderAll, faEnvelope, faHiking, faPaw, faUser } from '@fortawesome/free-solid-svg-icons';
import * as rutas from '@shared/rutas.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private estaLogueado: boolean = false;

  redes: EnlaceExterno[] = [
    { nombre: "Facebook", faIcon: faFacebookF, url: "https://facebook.com", target: "_blank" },
    { nombre: "Twitter", faIcon: faTwitter, url: "https://twitter.com", target: "_blank" },
    { nombre: "Instagram", faIcon: faInstagram, url: "https://instagram.com", target: "_blank" },
  ]

  recursos: EnlaceExterno[] = [
    { nombre: "Mi cuenta", faIcon: faUser, url: `/${rutas.RUTA_CUENTA}`, target: "_self" },
    { nombre: "Mis mascotas", faIcon: faPaw, url: `/${rutas.RUTA_MASCOTAS}`, target: "_self" },
    { nombre: "Mi tablero", faIcon: faBorderAll, url: `/${rutas.RUTA_DASHBOARD}`, target: "_self" },
    { nombre: "Paseadores", faIcon: faHiking, url: `/${rutas.RUTA_PASEADORES}`, target: "_self" },
    { nombre: "Paseos", faIcon: faHiking, url: `/${rutas.RUTA_PASEOS}`, target: "_self" },
  ];

  contactos: EnlaceExterno[] = [
    { nombre: "Whatsapp", faIcon: faWhatsapp, caption: "+57 3017777777", url: "https://api.whatsapp.com/send?phone=573015465076", target: "_blank" },
    { nombre: "Envía un correo", faIcon: faEnvelope, caption: "marioarb@gmail.com", url: "mailto:marioarb@gmail.com", target: "_blank" },
  ]

  constructor(private authService: AutenticacionService) {
    this.authService.estaAutenticado.subscribe(estado => { this.estaLogueado = estado });
    this.authService.verificarAutenticacion();
  }


  obtenerSecciones(): Seccion[] {
    return [
      { titulo: "Redes", enlaces: this.redes, requiereLogin: false },
      { titulo: "Recursos", enlaces: this.recursos, requiereLogin: true },
      { titulo: "Contáctenos", enlaces: this.contactos, requiereLogin: false },
    ]
  }

  trackByTitulo(index: number, seccion: Seccion): string { return seccion.titulo; }

  debeMostrarse(requiereLogin: boolean): boolean {
    return ((this.estaLogueado) || (!this.estaLogueado && !requiereLogin));
  }


}
