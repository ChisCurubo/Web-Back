import AbstractRol from "../../../../auth/domain/roles/AbstractTypes/AbstractRol";

export interface Usuario {
  ci: string;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoUsuario: string;
  contrasenaUsuario: string;
  estadoUsuario: boolean;
  rolUsuario: number;
}
