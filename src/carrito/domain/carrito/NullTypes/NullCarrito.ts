import AbstractCarrito from "../AbstractTypes/AbstractCarrito";
import AbstractCarritoProducto from "../AbstractTypes/AbstraItemCarrito";
import NullCarritoProducto from "./NullItemCarrito";

export default class NullCarrito extends AbstractCarrito {
  constructor() {
    super({
      idCarrito: 0,
      carritoProducto: new NullCarritoProducto(),
      totalCarrito: 0,
      statusCarrito: false,
      fechaCarrito: new Date(),
    });
  }

  public isNull = (): boolean => {
    return true; // Este objeto representa un carrito nulo.
  };

  public override toString(): string {
    return "NullCarrito";
  }

  public override setIdCarrito = (_id: number): void => {
    return;
  };

  public override setStatusCarrito = (_estado: boolean): void => {
    return;
  };

  public override setTotalCarrito = (_total: number): void => {
    return;
  };

  public override setFechaCarrito = (_hora: Date): void => {
    return;
  };

  public override setCarritoProducto(_carritoProducto: AbstractCarritoProducto): void {
      return
  }

}
