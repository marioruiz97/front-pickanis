import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export interface Seccion {
  titulo: string;
  enlaces: EnlaceExterno[];
  requiereLogin: boolean;
}

export interface EnlaceExterno {
  faIcon: IconProp;
  nombre: string;
  caption?: string;
  url: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  private estaLogueado: boolean;

  redes: EnlaceExterno[] = [
    { nombre: "Facebook", faIcon: faFacebookF, url: "https://facebook.com" },
    { nombre: "Twitter", faIcon: faTwitter, url: "https://twitter.com" },
    { nombre: "Instagram", faIcon: faInstagram, url: "https://instagram.com" },
  ]

  contactos: EnlaceExterno[] = [
    { nombre: "Whatsapp", faIcon: faWhatsapp, caption: "+57 3015465076", url: "https://api.whatsapp.com/send?phone=573015465076" },
    { nombre: "Envía un correo", faIcon: faEnvelope, caption: "marioarb97@gmail.com", url: "mailto:marioarb97@gmail.com" },
  ]

  constructor() {
    this.estaLogueado = true; // TODO: agregar logica para obtener resultado del auth service
  }


  obtenerSecciones(): Seccion[] {
    return [
      { titulo: "Redes", enlaces: this.redes, requiereLogin: false },
      { titulo: "Recursos", enlaces: this.redes, requiereLogin: true },
      { titulo: "Contáctenos", enlaces: this.contactos, requiereLogin: false },
    ]
  }

  trackByTitulo(index: number, seccion: Seccion): string { return seccion.titulo; }

  debeMostrarse(requiereLogin: boolean): boolean {
    return ((this.estaLogueado) || (!this.estaLogueado && !requiereLogin));
  }


}
