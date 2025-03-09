import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface ProductoControllerExpressInterface
  extends ControllerExpressInterface {
  getProductos: (req: Request, res: Response) => void
  getProductosById: (req: Request, res: Response) => void
  getProductosByMarca: (req: Request, res: Response) => void
  getProductosByNombre: (req: Request, res: Response) => void
  getImageProducto: (req: Request, res: Response) => void
  addProducto: (req: Request, res: Response) => void
  updateProducto: (req: Request, res: Response) => void

}
