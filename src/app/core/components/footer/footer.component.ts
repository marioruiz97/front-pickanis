import { Component } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faFacebookF, faInstagram, faTwitter, faWhatsapp, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { fa0, faEnvelope } from '@fortawesome/free-solid-svg-icons';

export interface EnlaceExterno {
  faIcon: IconProp;
  nombre: string;
  caption?: string;
  url: string
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  redes: EnlaceExterno[] = [
    { nombre: "Facebook", faIcon: faFacebookF, url: "https://facebook.com" },
    { nombre: "Twitter", faIcon: faTwitter, url: "https://twitter.com" },
    { nombre: "Instagram", faIcon: faInstagram, url: "https://instagram.com" },
  ]

  contactos: EnlaceExterno[] = [
    { nombre: "Whatsapp", faIcon: faWhatsapp, caption: "+57 3015465076", url: "https://api.whatsapp.com/send?phone=573015465076" },
    { nombre: "Envía un correo", faIcon: faEnvelope, caption: "marioarb97@gmail.com", url: "mailto:marioarb97@gmail.com" },
  ]

  constructor() { }

}
