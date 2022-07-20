import { IconProp } from "@fortawesome/fontawesome-svg-core";

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
  target: "_blank" | "_self";
}

export interface AccesoRapido {
  icono: string;
  nombre: string;
  url: string;
}
