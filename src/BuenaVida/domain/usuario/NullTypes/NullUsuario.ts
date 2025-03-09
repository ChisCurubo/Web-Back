import NullCarrito from '../../carrito/NullTypes/NullCarrito';
import NullFavorito from '../../favorito/NullTypes/NullFavoritos';
import NullRol from '../../roles/NullTypes/NullRol';
import AbstractCarrito from '../../carrito/AbstractTypes/AbstractCarrito';
import AbstractFavoritos from '../../favorito/AbstractTypes/AbstractFavoritos';
import AbstractRol from '../../roles/AbstractTypes/AbstractRol';
import AbstractUsuario from '../AbstractTypes/AbstractUsuario';

export default class NullUsuario extends AbstractUsuario {
  public override isNull(): boolean {
    return true;
  }
  constructor() {
    super({
      ci: '',
      nombreUsuario: '',
      apellidoUsuario: '',
      correoUsuario: '',
      contrasenaUsuario: '',
      estadoUsuario: false,
      rolUsuario: new NullRol(),
      carrito: [new NullCarrito()],
      favoritos: [new NullFavorito()]
    });
  }


    public override setCi(_ci: string): void { return }
    public override setNombreUsuario(_nombre: string): void { return }
    public override setApellidoUsuario(_apellido: string): void { return }
    public override setCorreoUsuario(_correo: string): void { return }
    public override setContrasenaUsuario(_contrasena: string): void { return }
    public override setEstadoUsuario(_estado: boolean): void { return }
    public override setRolUsuario(_rol: AbstractRol): void { return }
    public override setCarrito(_carrito: AbstractCarrito[]): void { return }
    public override setFavoritos(_favoritos: AbstractFavoritos[]): void { return }

    public toString(): string {
        return `NullUsuario {
            ci: "0000000000",
            nombreUsuario: "N/A",
            apellidoUsuario: "N/A",
            correoUsuario: "N/A",
            estadoUsuario: false,
            rolUsuario: ${this.rolUsuario.toString()},
            carrito: [],
            favoritos: []
        }`;
    }
}


