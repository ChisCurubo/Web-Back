import AbstractProducto from '../../producto/AbstractTypes/AbstractProducto';
import NullProducto  from '../../producto/NullTypes/NullProducto';
import NullUsuario from '../../usuario/NullTypes/NullUsuario';
import AbstractFavoritos from '../AbstractTypes/AbstractFavoritos';


export default class NullFavorito extends AbstractFavoritos {

  constructor() {
    super({
      idProducto: [new NullProducto()],
    });
  }
  public override toString(): string {
    return `NullFavoritos {
        idProducto: []
    }`;
  }
  public override isNull(): boolean {
    return true;
  }

  public override setIdProducto(_productos: AbstractProducto[]): void {
      return
  }

}
