import { Request, Response } from 'express'
import AuthControllerExpressInterface from '../../../domain/interfaces/AuthControllerExpressInterface'
import AuthUseCase from '../../../application/usecase/AuthUseCase';
import AuthRolesPermisoUseCase from '../../../application/usecase/AuthRolesPermisoUseCase';

export default class AuthControllerExpress
  implements AuthControllerExpressInterface {

    constructor(
      private readonly authUseCase: AuthUseCase,
      private readonly authRolPermisoUsecase: AuthRolesPermisoUseCase,
    ) {}

  
    public getRoles = async (_req: Request, res: Response): Promise<void> => {
      try {
        const roles = await this.authRolPermisoUsecase.getRoles();
       
  
        if (roles === null || roles === undefined) {
          res.status(404).json({ message: "Roles not found" });
          return Promise.resolve();
        }
  
        res.status(200).json({ roles: roles });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public getPermisos = async (req: Request, res: Response): Promise<void> => {
      try {
        let token = req.params['token'];
    
        if (!token) {
          token = "3"; 
        }
    
        const permisos = await this.authRolPermisoUsecase.getPermisos(token);
    
        if (!permisos || permisos.length === 0) {
          res.status(404).json({ message: "Permisos not found" });
          return;
        }
    
        res.status(200).json({ permisos });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
    

    public addRol = async (req: Request, res: Response): Promise<void> => {
      try {
        const rol = req.body;
        const success = await this.authRolPermisoUsecase.addRol(rol);
        if (!success) {
          res.status(400).json({ message: "Failed to add role" });
          return;
        }
        res.status(201).json({ message: "Role added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public addPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const permiso = req.body;
        const success = await this.authRolPermisoUsecase.addPermiso(permiso);
        if (!success) {
          res.status(400).json({ message: "Failed to add permission" });
          return;
        }
        res.status(201).json({ message: "Permission added successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public addNewRelationRolPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const { idRol, idPermiso } = req.body;
        const success = await this.authRolPermisoUsecase.addNewRelationRolPermiso(idRol, idPermiso);
        if (!success) {
          res.status(400).json({ message: "Failed to associate role with permission" });
          return;
        }
        res.status(201).json({ message: "Role and permission associated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public removeRelationRolPermiso = async (req: Request, res: Response): Promise<void> => {
      try {
        const { idRol, idPermiso } = req.body;
        const success = await this.authRolPermisoUsecase.removeRelationRolPermiso(idRol, idPermiso);
        if (!success) {
          res.status(400).json({ message: "Failed to remove role-permission association" });
          return;
        }
        res.status(200).json({ message: "Role-permission association removed successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };




  
    public login = async (req: Request, res: Response): Promise<void> => {
      try {
        const { email, password } = req.body;
        const token = await this.authUseCase.login(email, password);
  
        if (token === null || token === undefined) {
          res.status(401).json({ message: "Invalid credentials" });
          return Promise.resolve();;
        }
  
        res.status(200).json({ token });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public register = async (req: Request, res: Response): Promise<void> => {
      try {
        const userData = req.body;
        const user = await this.authUseCase.register(userData);
  
        if (user === null || user === undefined) {
          res.status(400).json({ message: "Registration failed" });
          return Promise.resolve();
        }
  
        res.status(201).json({ message: "User registered successfully", user });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public detokenize = async (req: Request, res: Response): Promise<void> => {
      try {
        const { token } = req.body;
        const userData = await this.authUseCase.detokenize(token);
  
        if (userData === null || userData === undefined) {
          res.status(401).json({ message: "Invalid token" });
          return Promise.resolve();
        }
  
        res.status(200).json({ userData });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  
    public logout = async (req: Request, res: Response): Promise<void> => {
      try {
        let token = req.params['token'];
    
        if (!token) {
          res.status(401).json({ message: "Invalid token" });
          return Promise.resolve();
        }
    
        const logout = await this.authUseCase.logout(token);
        res.status(200).json({ message: "Logged out successfully", logout });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
      
    public verifyPermitions = async (req: Request, res: Response): Promise<void> => {
      try {
        let token = req.params['token'];
    
        if (!token) {
          token = "3"; // Si no hay token, usa "3" como ID por defecto
        }
    
        const verify = await this.authUseCase.verifyPermitions(token);
        res.status(200).json({ message: "Permission verification successful", verify });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };

    public changeUserRoles = async (req: Request, res: Response): Promise<void> => {
      try {
        const { token, email, nameRol } = req.body;
        const success = await this.authUseCase.changeUserRoles(token, email, nameRol);
        if (!success) {
          res.status(400).json({ message: "Failed to change user role" });
          return;
        }
        res.status(200).json({ message: "User role updated successfully" });
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
      }
    };
  

  }
  
