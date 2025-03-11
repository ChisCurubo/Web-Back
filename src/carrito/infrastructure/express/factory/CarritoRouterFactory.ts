import RouterExpressInterface from "../../../../express/domain/RouterExpressInterface"
import CarritoUseCase from "../../../application/usecase/CarritoUseCase"
import CarritoControllerExpress from "../controller/CarritoControllerExpress"
import CarritoRouterExpress from "../router/CarritoRouterExpress"
import CarritoRepository from "../repository/CarritoRepository"
import ItemCarritoToItemCarrito from "../repository/ItemCarritoToItemCarrito"
import CarritoService from "../../../application/service/CarritoService"
import ProductoRepository from "../../../../producto/infrastructure/repository/ProductoRepository"
import MysqlProductoRepository from "../../../../mysql/infrastructure/db/ProductoSQL/MysqlProducto"
import MysqlProductosToProductos from "../../../../producto/infrastructure/repository/ProductoToProducto"
import MysqlCategoriaRepository from "../../../../mysql/infrastructure/db/ProductoSQL/MysqlCategoria"
import MysqlDescuentoRepository from "../../../../mysql/infrastructure/db/ProductoSQL/MysqlDescuento"
import MysqlTipoProductoToTipoProducto from "../../../../producto/infrastructure/repository/TipoProdutoToTipoProducto"
import MysqlCategoriaToCategoria from "../../../../producto/infrastructure/repository/CategoriaToCategoria"
import MysqlDescuentoToDescuento from "../../../../producto/infrastructure/repository/DescuentoToDecuento"
import MysqlCarritoRepository from "../../../../mysql/infrastructure/db/CarritoSQL/MysqlCarrito"
import JwtRepo from "../../../../jwt/infrastructure/tokken/JwtokenRepo"




export default class CarritoRouterFactory {
  static create(): RouterExpressInterface {
    // Crear instancias de los repositorios

    const mysqlCategoriaRepository = new MysqlCategoriaRepository();
    const mysqlDescuentoRepository = new MysqlDescuentoRepository();

    // Instanciar conversores
    const tipoToTipo = new MysqlTipoProductoToTipoProducto()
    const categoriaToCategoria = new MysqlCategoriaToCategoria(tipoToTipo, mysqlCategoriaRepository)
    const descuentoToDescuento = new MysqlDescuentoToDescuento()
    const productoToProducto = new MysqlProductosToProductos(descuentoToDescuento, categoriaToCategoria, mysqlCategoriaRepository, mysqlDescuentoRepository);


    const mysqlProductoRepo = new MysqlProductoRepository();
    const productoRepository = new ProductoRepository(mysqlProductoRepo, productoToProducto);
    const itemCarritoConverter = new ItemCarritoToItemCarrito(productoRepository);

    const carritoMysql = new MysqlCarritoRepository()
    const carritoRepository = new CarritoRepository(carritoMysql, itemCarritoConverter);
    const jwt = new JwtRepo()

    // Crear instancia del servicio
    const carritoService = new CarritoService(carritoRepository, jwt);

    // Crear instancias de los casos de uso
    const carritoUseCase = new CarritoUseCase(carritoService);

    // Crear instancia del controlador
    const carritoController = new CarritoControllerExpress(carritoUseCase);

    // Crear y devolver el router
    return new CarritoRouterExpress(carritoController);
  }
}