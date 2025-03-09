import AbstractProducto from './AbstractTypes/AbstractUsuario';


export class Usuario extends AbstractProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };

  public override toString(): string {
    return `Usuario {
        ci: "${this.ci}",
        nombreUsuario: "${this.nombreUsuario}",
        apellidoUsuario: "${this.apellidoUsuario}",
        correoUsuario: "${this.correoUsuario}",
        estadoUsuario: ${this.estadoUsuario},
        rolUsuario: ${this.rolUsuario.toString()},
        carrito: [${this.carrito.map(c => c.toString()).join(", ")}],
        favoritos: [${this.favoritos.map(f => f.toString()).join(", ")}]
    }`;
}

}
