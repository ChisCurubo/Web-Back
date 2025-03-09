import AbstractCarrito from "../../carrito/AbstractTypes/AbstractCarrito";
import AbstractFavoritos from "../../favorito/AbstractTypes/AbstractFavoritos";
import AbstractRol from "../../roles/AbstractTypes/AbstractRol";

export interface Usuario {
  ci: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoUsuario: string;
  contrasenaUsuario: string;
  estadoUsuario: boolean;
  rolUsuario: AbstractRol;
  carrito : AbstractCarrito[]
  favoritos: AbstractFavoritos []
}
