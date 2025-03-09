import { Request, Response } from 'express';
import ProductoControllerExpressInterface from '../../../domain/interfaces/ProductoControllerExpressInterface';
import DescuentoControllerExpressInterface from '../../../domain/interfaces/DescuentoControllerExpressInterface';
import CategoriaControllerExpressInterface from '../../../domain/interfaces/CategoriaControllerExpressInterface';
import ProductoUseCasePort from '../../../domain/port/driver/producto/ProductoDriver';
import DescuentoUseCasePort from '../../../domain/port/driver/producto/DescuentoDriverPort';
import CategoriaUseCasePort from '../../../domain/port/driver/producto/CategoriaDriverPort';


export default class ProductoControllerExpress
  implements ProductoControllerExpressInterface, DescuentoControllerExpressInterface, CategoriaControllerExpressInterface {
  constructor(
    private readonly productoUseCase: ProductoUseCasePort,
    private readonly descuentoUseCase: DescuentoUseCasePort,
    private readonly categoriaUseCase: CategoriaUseCasePort
  ) {}

  public  getProductos = async(_req: Request, res: Response): Promise<void> => {
    const productos =  await this.productoUseCase.getAllProductos();
    res.status(200).json({ productos });
  };

  public getProductosById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id)  res.status(400).json({ message: 'Invalid ID' });
    
    const producto = await this.productoUseCase.getProductoById(id);
    if (!producto)  res.status(404).json({ message: 'Producto not found' });
    
    res.status(200).json({ producto });
  };

  public getProductosByMarca = async (req: Request, res: Response): Promise<void>=> {
    const marca = req.params['marca'];
    if (!marca) {
      res.status(400).json({ message: 'Invalid marca' });
      return;
    }
    
    const productos = await this.productoUseCase.getProductoByMarca(marca);
    res.status(200).json({ productos });
  };

  public getProductosByNombre = async(req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre)  res.status(400).json({ message: 'Invalid nombre' });
    
    if (!nombre) {
      res.status(400).json({ message: 'Invalid nombre' });
      return;
    }
    const productos = await this.productoUseCase.getProductoByName(nombre);
    res.status(200).json({ productos });
  };

  public getImageProducto = async(req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id)  res.status(400).json({ message: 'Invalid ID' });
    
    const imagen = await this.productoUseCase.getImgProducto(id.toString());
    res.status(200).json({ imagen });
  };

  public getDescuentos =  async(_req: Request, res: Response): Promise<void> => {
    const descuentos = await this.descuentoUseCase.getDescuentos();
    res.status(200).json({ descuentos });
  };

  public getDescuentoById = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id)  res.status(400).json({ message: 'Invalid ID' });
    
    const descuento = await this.descuentoUseCase.getDescuentoById(id);
    res.status(200).json({ descuento });
  };

  public getDescuentoByNombre = async (req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre)  res.status(400).json({ message: 'Invalid nombre' });
    
    const descuento = await this.descuentoUseCase.getDescuentoByNombre(nombre as string);
    res.status(200).json({ descuento });
  };

  public addDescuento = async(req: Request, res: Response): Promise<void> => {
    const descuento = req.body;
    this.descuentoUseCase.addDescuento(descuento);
    res.status(201).json({ message: 'Descuento added' });
  };

  public updateDescuento = async (req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id)  res.status(400).json({ message: 'Invalid ID' });
    
    const descuento = req.body;
    const boDescuento= await this.descuentoUseCase.updateDescuento(id, descuento);
    if(boDescuento=== false){
      res.status(400).json({ message: 'Descuento not updated' });
    }
    res.status(200).json({ message: 'Descuento updated' });
  };

  public getCategorias = async(_req: Request, res: Response): Promise<void> => {
    const categorias = await this.categoriaUseCase.getCategorias();
    res.status(200).json({ categorias });
  };

  public getCategoriasById = async(req: Request, res: Response): Promise<void> => {
    const id = Number(req.params['id']);
    if (!id)  res.status(400).json({ message: 'Invalid ID' });
    
    const categoria = await this.categoriaUseCase.getCategoriasById(id);
    res.status(200).json({ categoria });
  };

  public getCategoriasByNombre = async(req: Request, res: Response): Promise<void> => {
    const nombre = req.params['nombre'];
    if (!nombre)  res.status(400).json({ message: 'Invalid nombre' });
    
    const categoria = await this.categoriaUseCase.getCategoriasByNombre(nombre as string);
    res.status(200).json({ categoria });
  };

  public addCategoria = async(req: Request, res: Response): Promise<void> => {
    const categoria = req.body;
    await this.categoriaUseCase.addCategoria(categoria);
    res.status(201).json({ message: 'Categoria added' });
  };

  public addTipoProducto = async(req: Request, res: Response): Promise<void> => {
    const tipoProducto = req.body;
    await this.categoriaUseCase.addTipoProducto(tipoProducto);
    res.status(201).json({ message: 'Tipo de producto added' });
  };

  public getTipoProductos = async(_req: Request, res: Response): Promise<void> => {
    const tiposProductos = await this.categoriaUseCase.getTipoProductos();
    res.status(200).json({ tiposProductos });
  };


  public getTipoProductoById = async(req: Request, res: Response): Promise<void> => {
    const id = req.params['id'];
    const tipoProducto = await this.categoriaUseCase.getTipoProductoById(Number(id));
    res.status(200).json({ tipoProducto });
  };

  public addProducto = async (req: Request, res: Response): Promise<void> => {
    try {
      const producto = req.body;
      const success = await this.productoUseCase.addProducto(producto);
      res.status(success ? 201 : 400).json({ message: success ? 'Producto agregado' : 'Error al agregar producto' });
    } catch (error) {
      res.status(500).json({ error: 'error del servidor'});
    }
  };

  public updateProducto = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params['id']);
      if (!id) {
        res.status(400).json({ message: 'Invalid ID' });
        return;
      }

      const producto = req.body;
      const success = await this.productoUseCase.updateProducto(id, producto);
      res.status(success ? 200 : 400).json({ message: success ? 'Producto actualizado' : 'Error al actualizar producto' });
    } catch (error) {
      res.status(500).json({ error: 'error del servidor'});
    }
  };
}
