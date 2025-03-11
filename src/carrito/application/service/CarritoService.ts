import { ItemCarrito } from "../../domain/carrito/ItemCarrito";
import CarritoRepositoryInterface from "../../domain/port/driven/CarritoRepositoryInterface";
import CarritoServiceInterface from "../../domain/interfaces/CarritoServiceInterface";
import JwtInterface from "../../../jwt/domain/interfaces/JwtokenInterface";

export default class CarritoService implements CarritoServiceInterface {
    constructor(
        private readonly carritoRepositoryInterface: CarritoRepositoryInterface,
        private readonly jwtToken : JwtInterface
    ) {}

    async getCarrito(token: string): Promise<ItemCarrito[]> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.getCarrito(idUser.ci);
        } catch (error) {
            console.error(`Error al obtener el carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo obtener el carrito: ${err.message}`);
        }
    }


    async addProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.addProductoCarrito(idUser.ci, producto);
        } catch (error) {
            console.error(`Error al añadir producto al carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo añadir el producto al carrito: ${err.message}`);
        }
    }

    async deleteProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.deleteProductoCarrito(idUser.ci, producto);
        } catch (error) {
            console.error(`Error al eliminar producto del carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo eliminar el producto del carrito: ${err.message}`);
        }
    }

    async changeStatusCarrito(token: string): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.changeStatusCarrito(idUser.ci);
        } catch (error) {
            console.error(`Error al cambiar el estado del carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo cambiar el estado del carrito: ${err.message}`);
        }
    }

    async getTotalCarrito(token: string): Promise<number> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.getTotalCarrito(idUser.ci);
        } catch (error) {
            console.error(`Error al obtener el total del carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo obtener el total del carrito: ${err.message}`);
        }
    }

    async getCarritoProdcuto(idCarritoProducto: number): Promise<ItemCarrito> {
        try {
            return await this.carritoRepositoryInterface.getCarritoProducto(idCarritoProducto);
        } catch (error) {
            console.error(`Error al obtener el producto del carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo obtener el producto del carrito: ${err.message}`);
        }
    }

    async createCarrito(token: string): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.createCarrito(idUser.ci);
        } catch (error) {
            console.error(`Error al crear el carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo crear el carrito: ${err.message}`);
        }
    }

    async aumentaCanitadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.aumentaCanitadItemProductoCarrito(idUser.ci, producto);
        } catch (error) {
            console.error(`Error al aumentar la cantidad del producto en el carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo aumentar la cantidad del producto en el carrito: ${err.message}`);
        }
    }

    async disminuyeCantidadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        try {
            const idUser = this.jwtToken.decodeToken(token)
            return await this.carritoRepositoryInterface.disminuyeCantidadItemProductoCarrito(idUser.ci,producto);
        } catch (error) {
            console.error(`Error al disminuir la cantidad del producto en el carrito: ${error}`);
            const err = error as Error;
            throw new Error(`No se pudo disminuir la cantidad del producto en el carrito: ${err.message}`);
        }
    }
}