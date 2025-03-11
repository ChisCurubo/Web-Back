
import { Carrito } from "../../../carrito/Carrito"
import { ItemCarrito } from "../../../carrito/ItemCarrito"

export default interface CarritoDriverPort{
    getCarrito(token:string):Promise<ItemCarrito[]>
    getCarritoResumido(token:string):Promise<Carrito>
    addProductoCarrito(token:string, producto:number):Promise<boolean>
    deleteProductoCarrito(token:string, producto:number):Promise<boolean>
    changeStatusCarrito(token:string):Promise<boolean>
    getTotalCarrito(token:string):Promise<number>
    getCarritoProducto(idCarritoProducto:number):Promise<ItemCarrito>
    createCarrito: (token:string) => Promise<boolean>
    aumentaCanitadItemProductoCarrito: (token:string,producto: number) => Promise<boolean>
    disminuyeCantidadItemProductoCarrito: (token:string, producto: number) => Promise<boolean>
}
