
import AuthRolPermisoServiceInterface from "../../domain/interfaces/AuthRolPermisoServiceInterface";
import AuthRolPermisoDriverPort from "../../domain/port/driver/auth/AuthRolPermisoDriverPort";
import NullPermiso from "../../domain/roles/NullTypes/NullPermiso";
import NullRol from "../../domain/roles/NullTypes/NullRol";
import { Permiso } from "../../domain/roles/Permiso";
import { Rol } from "../../domain/roles/Rol";




export default class AuthRolesPermisoUseCase implements AuthRolPermisoDriverPort {
    constructor(
        private readonly authRolPermisoService: AuthRolPermisoServiceInterface
    ) {}
    public async getRoles(): Promise<Rol[]> {
        const roles = await this.authRolPermisoService.getRoles();
        if (!roles) {
            return [new NullRol()]
        }
        return roles;
    }

    public async getPermisos(token: string): Promise<Permiso[]> {
        const permisos = await this.authRolPermisoService.getPermisos(token);
        if (!permisos) {
            return [new NullPermiso()];
        }
        return permisos;
    }

    public async addRol(rol: Rol): Promise<boolean> {
        const added = await this.authRolPermisoService.addRol(rol);
        return added;
    }

    public async addPermiso(permiso: Permiso): Promise<boolean> {
        const added = await this.authRolPermisoService.addPermiso(permiso);
        return added;
    }

    public async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const relationAdded = await this.authRolPermisoService.addNewRelationRolPermiso(idRol, namePermiso);
        return relationAdded;
    }

    public async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        const relationRemoved = await this.authRolPermisoService.removeRelationRolPermiso(idRol, namePermiso);
        return relationRemoved;
    }
}