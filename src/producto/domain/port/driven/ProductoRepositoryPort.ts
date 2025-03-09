import RepositoryInterface from "../../../../repository/domain/RepositoryInterface";
import { Producto } from "../../producto/Producto";

export default interface ProductoRepository 
extends RepositoryInterface<number, Producto > {
    getProductoByName(nombre: string): Promise<Producto[]>;
    getProductosByCategoria(categoria: string): Promise<Producto[]>;
    getProductoByMarca(marca: string): Promise<Producto[]>;
    getImgProducto(idProducto: string): Promise<string>;
}
