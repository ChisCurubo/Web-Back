import ProductoServiceInterface from "../../domain/interfaces/ProductoServiceInterface";
import ProductoDriverPort from "../../domain/port/driver/producto/ProductoDriver";
import { Producto } from "../../domain/producto/Producto";



export default class ProductoUseCase implements ProductoDriverPort {
    constructor(
        private readonly productoService: ProductoServiceInterface
    ) {}
    public async addProducto(producto: Producto): Promise<boolean> {
        return await this.productoService.addProducto(producto);
    }

    public async updateProducto(id: number, producto: Producto): Promise<boolean> {
        return await this.productoService.updateProducto(id, producto);
    }

    public async getAllProductos(): Promise<Producto[]> {
        const productos = await this.productoService.getAllProductos();
        console.log(productos)
        return productos ;
    }

    public async getProductoById(id: number): Promise<Producto> {
        const producto = await this.productoService.getProductoById(id);
        return producto || ({} as Producto);
    }

    public async getProductoByName(nombre: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductoByName(nombre);
        return productos || [];
    }

    public async getProductosByCategoria(categoria: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductosByCategoria(categoria);
        return productos ;
    }

    public async getProductoByMarca(marca: string): Promise<Producto[]> {
        const productos = await this.productoService.getProductoByMarca(marca);
        return productos ;
    }

    public async getImgProducto(idProducto: string): Promise<string> {
        const imagen = await this.productoService.getImgProducto(idProducto);
        return imagen || "";
    }


}