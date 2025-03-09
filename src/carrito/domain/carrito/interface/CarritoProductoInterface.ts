import AbstractProducto from "../../producto/AbstractTypes/AbstractProducto";


export default interface CarritoProducto {
    idCarritoProducto: number;
    idProducto: AbstractProducto [];
    horaCarritoProducto: Date[];
}