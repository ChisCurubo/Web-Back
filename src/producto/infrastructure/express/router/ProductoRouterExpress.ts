import { Router } from 'express';
import ProductoRouterExpressInterface from '../../../domain/interfaces/ProductoRouterExpressInterface';
import ProductoControllerExpressInterface from '../../../domain/interfaces/ProductoControllerExpressInterface';
import DescuentoControllerExpressInterface from '../../../domain/interfaces/DescuentoControllerExpressInterface';
import CategoriaControllerExpressInterface from '../../../domain/interfaces/CategoriaControllerExpressInterface';

export default class ProductoRouterExpress implements ProductoRouterExpressInterface {
  router: Router;
  path: string;

  constructor(
    private readonly productoController: ProductoControllerExpressInterface,
    private readonly descuentoContoller: DescuentoControllerExpressInterface,
    private readonly categoriaController: CategoriaControllerExpressInterface
  ) {
    this.router = Router();
    this.path = '/productos/v1.0';
    this.routes();
  }

  public routes = (): void => {
    this.configureProducto();
    this.configureProductosById();
    this.configureProductosByMarca();
    this.configureProductosByNombre();
    this.configureImageProducto();
    this.configureCategoria();
    this.configureCategoriasById();
    this.configureCategoriasByNombre();
    this.configureAddCategoria();
    this.configureAddTipoProducto();
    this.configureDescuento();
    this.configureDescuentoById();
    this.configureDescuentoByNombre();
    this.configureAddDescuento();
    this.configureUpdateDescuento();
    this.configureTipoProductos();
    this.configureTipoProductoById();
    this.configureAddProducto();
    this.configureUpdateProducto();
    this.configureBusqueda();
    this.configureFilter();
  };

  public configureProducto = (): void => {
    this.router.get('/productos', this.productoController.getProductos.bind(this.productoController));
  };

  public configureProductosById = (): void => {
    this.router.get('/producto/:id', this.productoController.getProductosById.bind(this.productoController));
  };

  public configureProductosByMarca = (): void => {
    this.router.get('/productos/marca/:marca', this.productoController.getProductosByMarca.bind(this.productoController));
  };

  public configureProductosByNombre = (): void => {
    this.router.get('/productos/nombre/:nombre', this.productoController.getProductosByNombre.bind(this.productoController));
  };

  public configureImageProducto = (): void => {
    this.router.get('/producto/imagen/:id', this.productoController.getImageProducto.bind(this.productoController));
  };

  public configureCategoria = (): void => {
    this.router.get('/categorias', this.categoriaController.getCategorias.bind(this.productoController));
  };

  public configureCategoriasById = (): void => {
    this.router.get('/categoria/:id', this.categoriaController.getCategoriasById.bind(this.productoController));
  };

  public configureCategoriasByNombre = (): void => {
    this.router.get('/categorias/nombre/:nombre', this.categoriaController.getCategoriasByNombre.bind(this.productoController));
  };

  public configureAddCategoria = (): void => {
    this.router.post('/categoria', this.categoriaController.addCategoria.bind(this.productoController));
  };

  public configureAddTipoProducto = (): void => {
    this.router.post('/tipo-producto', this.categoriaController.addTipoProducto.bind(this.productoController));
  };

  public configureDescuento = (): void => {
    this.router.get('/descuentos', this.descuentoContoller.getDescuentos.bind(this.productoController));
  };

  public configureDescuentoById = (): void => {
    this.router.get('/descuento/:id', this.descuentoContoller.getDescuentoById.bind(this.productoController));
  };

  public configureDescuentoByNombre = (): void => {
    this.router.get('/descuentos/nombre/:nombre', this.descuentoContoller.getDescuentoByNombre.bind(this.productoController));
  };

  public configureAddDescuento = (): void => {
    this.router.post('/descuento', this.descuentoContoller.addDescuento.bind(this.productoController));
  };

  public configureUpdateDescuento = (): void => {
    this.router.put('/descuento', this.descuentoContoller.updateDescuento.bind(this.productoController));
  };

  public configureTipoProductos = (): void => {
    this.router.get('/tipo-productos', this.categoriaController.getTipoProductos.bind(this.productoController));
  };

  public configureTipoProductoById = (): void => {
    this.router.get('/tipo-producto/:id', this.categoriaController.getTipoProductoById.bind(this.productoController));
  };

  public configureAddProducto = (): void => {
    this.router.post('/producto', this.productoController.addProducto.bind(this.productoController));
  };

  public configureUpdateProducto = (): void => {
    this.router.put('/producto/:id', this.productoController.updateProducto.bind(this.productoController));
  };
    /**
   * Configures the route for searching products by name or brand.
   */
    public configureBusqueda = (): void => {
      this.router.get('/productos/busqueda/:busqueda', this.productoController.BusquedaProductos.bind(this.productoController));
    };
  
    /**
     * Configures the route for filtering products based on criteria.
     */
    public configureFilter = (): void => {
      this.router.post('/productos/filtrar', this.productoController.filtrateProducts.bind(this.productoController));
    };
}
