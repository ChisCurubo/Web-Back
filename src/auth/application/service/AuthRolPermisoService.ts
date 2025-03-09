import AuthRolPermisoServiceInterface from "../../domain/interfaces/AuthRolPermisoServiceInterface"
import AuthRolPermisoRepository from "../../domain/port/driven/auth/AuthRolPermisoRepository"
import { Permiso } from "../../domain/roles/Permiso"
import { Rol } from "../../domain/roles/Rol"


export default class AuthRolPermisoService implements AuthRolPermisoServiceInterface {
  constructor(
    private readonly authRolPermisoRepo: AuthRolPermisoRepository) {}
    async getRoles(): Promise<Rol[]> {
        return this.authRolPermisoRepo.getRoles()
    }
    async getPermisos(token: string): Promise<Permiso[]> {
        return this.authRolPermisoRepo.getPermiso(token)
    }
    async addRol(rol: Rol): Promise<boolean> {
        const role=  this.authRolPermisoRepo.addRol(rol)
        if(role === null || role  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    async addPermiso(permiso: Permiso): Promise<boolean> {
        const permi=  this.authRolPermisoRepo.addPermiso(permiso)
        if(permi === null || permi  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const addRolPer=  this.authRolPermisoRepo.addNewRelationRolPermiso(idRol,namePermiso)
        if(addRolPer === null || addRolPer  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }
    async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const removeRolPer=  this.authRolPermisoRepo.removeRelationRolPermiso(idRol,namePermiso)
        if(removeRolPer === null || removeRolPer  === undefined){
            return Promise.resolve(false)
        }
        return Promise.resolve(true)
    }


}
