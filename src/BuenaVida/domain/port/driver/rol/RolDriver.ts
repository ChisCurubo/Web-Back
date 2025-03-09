import { Permiso } from "../../../roles/interface/PermisoInterface"
import { Rol } from "../../../roles/interface/RolInterface"


export default interface RolDriverPort{
    getRolPermiso(idRol:number): boolean
    getRoles():Rol
    getRolesPermisoCompleate(idRol:number): Permiso[]
    getPermiso():Permiso[]
}
