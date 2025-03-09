
import { Permiso } from '../../../roles/Permiso';
import { Rol } from '../../../roles/Rol';



export default interface AuthRolPermisoRepositoryInterface{
    getRoles: ()=> Promise<Rol[]> ;
    getPermiso: (token: string)=> Promise<Permiso[]>;
    addRol(rol: Rol): Promise<boolean> ;
    addPermiso(permiso: Permiso): Promise<boolean> ;
    addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
    removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
}
