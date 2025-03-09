import { Producto } from "../../../../../producto/domain/producto/Producto"
import { Favoritos } from "../../../favorito/interface/FavoritosInterface"




export default interface FavoritosDriverPort{
    getfavoritos(token:string ):Favoritos[]
    addProdcutoFavoritos(token:string , producto:number): boolean 
    deleteProductoFavoritos(token:string , producto:Producto):boolean
}
