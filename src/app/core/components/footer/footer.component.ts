import { Component } from '@angular/core';
import { EnlaceExterno, Seccion } from '@core/model/enlace';
import { AutenticacionService } from '@core/service/autenticacion.service';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private estaLogueado: boolean = false;

  redes: EnlaceExterno[] = [
    { nombre: "Facebook", faIcon: faFacebookF, url: "https://facebook.com" },
    { nombre: "Twitter", faIcon: faTwitter, url: "https://twitter.com" },
    { nombre: "Instagram", faIcon: faInstagram, url: "https://instagram.com" },
  ]

  contactos: EnlaceExterno[] = [
    { nombre: "Whatsapp", faIcon: faWhatsapp, caption: "+57 3017777777", url: "https://api.whatsapp.com/send?phone=573015465076" },
    { nombre: "Envía un correo", faIcon: faEnvelope, caption: "marioarb@gmail.com", url: "mailto:marioarb@gmail.com" },
  ]

  constructor(private authService: AutenticacionService) {
    this.authService.estaAutenticado.subscribe(estado => { this.estaLogueado = estado });
    this.authService.verificarAutenticacion();
  }


  obtenerSecciones(): Seccion[] {
    return [
      { titulo: "Redes", enlaces: this.redes, requiereLogin: false },
      { titulo: "Recursos", enlaces: this.redes, requiereLogin: true }, // TODO: cambiar por recursos dentro del sistema
      { titulo: "Contáctenos", enlaces: this.contactos, requiereLogin: false },
    ]
  }

  trackByTitulo(index: number, seccion: Seccion): string { return seccion.titulo; }

  debeMostrarse(requiereLogin: boolean): boolean {
    return ((this.estaLogueado) || (!this.estaLogueado && !requiereLogin));
  }


}
