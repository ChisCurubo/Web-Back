import CarritoRepoInterface from "../../../../mysql/domain/repository/CarritoRepoInterface";
import { ItemCarrito } from "../../../domain/carrito/ItemCarrito";
import CarritoRepositoryInterface from "../../../domain/port/driven/CarritoRepositoryInterface";


export default class CarritoRepository implements CarritoRepositoryInterface {
    constructor(private readonly mysqlCarritoRepo: CarritoRepoInterface) {}

    async getCarrito(token: string): Promise<ItemCarrito[]> {
        return await this.mysqlCarritoRepo.getCarrito(token);
    }



    async addProductoCarrito(token: string, producto: number): Promise<boolean> {
        return await this.mysqlCarritoRepo.addProductoCarrito(token, producto);
    }

    async deleteProductoCarrito(token: string, producto: number): Promise<boolean> {
        return await this.mysqlCarritoRepo.deleteProductoCarrito(token, producto);
    }

    async changeStatusCarrito(token: string): Promise<boolean> {
        return await this.mysqlCarritoRepo.changeStatusCarrito(token);
    }

    async getTotalCarrito(token: string): Promise<number> {
        return await this.mysqlCarritoRepo.getTotalCarrito(token);
    }

    async getCarritoProducto(idCarritoProducto: number): Promise<ItemCarrito> {
        return await this.mysqlCarritoRepo.getCarritoProducto(idCarritoProducto);
    }

    async createCarrito(token: string): Promise<boolean> {
        return await this.mysqlCarritoRepo.createCarrito(token);
    }

    async aumentaCanitadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        return await this.mysqlCarritoRepo.aumentaCanitadItemProductoCarrito(token, producto);
    }

    async disminuyeCantidadItemProductoCarrito(token: string, producto: number): Promise<boolean> {
        return await this.mysqlCarritoRepo.disminuyeCantidadItemProductoCarrito(token, producto);
    }
}
