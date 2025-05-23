import { FiltrarProducto } from "../../../producto/interface/FilterInterface"
import { Producto } from "../../../producto/Producto"


export default interface ProductoDriverPort{
    getAllProductos(): Promise<Producto[]>
    getProductosVitrina(vitrina:number):Promise<{ productos: Producto[]; total: number }>
    getProductoById(id: number):Promise<Producto>
    getProductoByName(nombre:string):Promise<Producto[]>
    getProductosByCategoria(categoria:string):Promise<Producto[]>
    getProductoByMarca(marca:string):Promise<Producto[]>
    getImgProducto(idProducto:string):Promise<string>
    addProducto(producto: Producto):Promise<boolean>
    updateProducto(id:number, producto: Producto):Promise<boolean>
    filterProductos(filters: FiltrarProducto): Promise<Producto[]>
    searchProductos(search:string):Promise<Producto[]>
}
