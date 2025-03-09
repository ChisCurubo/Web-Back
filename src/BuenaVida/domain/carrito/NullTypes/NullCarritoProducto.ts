import AbstractCarritoProducto from "../AbstractTypes/AbstractCarritoProducto";
import NullProducto from "../../producto/NullTypes/NullProducto";
import AbstractProducto from "../../producto/AbstractTypes/AbstractProducto";

export default class NullCarritoProducto extends AbstractCarritoProducto {
    constructor() {
        super({
            idCarritoProducto: 0,
            idProducto: [new NullProducto()],
            horaCarritoProducto: [new Date()],
        });
    }

    public isNull(): boolean {
        return true; // Indica que este es un objeto nulo.
    }

    public override setIdCarritoProducto(_id: number): void {
        return
      }
    
    public override setIdProducto(_productos: AbstractProducto[]): void {
    return
    }

    public override setHoraCarritoProducto(_horas: Date[]): void {
    return
    }


    public override toString(): string {
    return `NullCarritoProducto {
        idCarritoProducto: ${this.idCarritoProducto},
        idProducto: [],
        horaCarritoProducto: []
    }`;
    }
}
