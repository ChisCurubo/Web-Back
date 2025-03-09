
import AbstractCarritoProducto from './AbstractTypes/AbstractCarritoProducto';


export class CarritoProducto extends AbstractCarritoProducto {
  public isNull = (): boolean => {
    return false; // Este objeto no es nulo.
  };
  public toString(): string {
    return `CarritoProducto {
        idCarritoProducto: ${this.idCarritoProducto},
        idProducto: [${this.idProducto.map(p => p.toString()).join(", ")}],
        horaCarritoProducto: [${this.horaCarritoProducto.map(date => date.toISOString()).join(", ")}]
      }`;
  }

}