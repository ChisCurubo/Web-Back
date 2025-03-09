import { Request, Response } from 'express'

import ControllerExpressInterface from '../../../express/domain/ControllerExpressInterface'

export default interface AuthControllerExpressInterface
  extends ControllerExpressInterface {
  getRoles: (req: Request, res: Response) => void
  getPermisos: (req: Request, res: Response) => void
  login: (req: Request, res: Response) => void
  register: (req: Request, res: Response) => void
  detokenize: (req: Request, res: Response) => void
  logout: (req: Request, res: Response) => void
  verifyPermitions: (req: Request, res: Response) => void
  changeUserRoles: (req: Request, res: Response) => void; 
  addRol: (req: Request, res: Response) => void; 
  addPermiso: (req: Request, res: Response) => void; 
  addNewRelationRolPermiso: (req: Request, res: Response) => void; 
  removeRelationRolPermiso: (req: Request, res: Response) => void; 
}
