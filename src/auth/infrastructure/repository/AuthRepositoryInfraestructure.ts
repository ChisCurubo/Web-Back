
import { Rol } from '../../domain/roles/Rol';
import { Usuario } from '../../../usuario/domain/usuario/Usuario';
import { Permiso } from '../../domain/roles/Permiso';


import AuthRepositoryInterface from '../../domain/port/driven/auth/AuthRepository';
import AuthRolPermisoRepositoryInterface from '../../domain/port/driven/auth/AuthRolPermisoRepository';
import AuthRepoInterface from '../../../mysql/domain/repository/AuthRepoInterface';
import MysqlUsuariosToUsuarios from '../../../usuario/infrastructure/repository/UsuarioToUsuario';
import MysqlRolesToRoles from './RolToRol';
import MysqlPermisosToPermisos from './PermisoToPermiso';

export default class AuthRepositoryInfraestructure implements AuthRepositoryInterface, AuthRolPermisoRepositoryInterface {

    constructor(
        private readonly mysqlUsuario: AuthRepoInterface,
        private readonly usuarioToUsuario: MysqlUsuariosToUsuarios,
        private readonly rolesToRoles : MysqlRolesToRoles,
        private readonly permisotopermiso : MysqlPermisosToPermisos
    ) {}
   
    async login(usuario: string, pwd: string): Promise<string> {
        return await this.mysqlUsuario.login(usuario, pwd);
    }

    async register(usuario: Usuario): Promise<boolean> {
      const user =  await this.usuarioToUsuario.teg(usuario)
      return await this.mysqlUsuario.register(user);
    }

    async logout(token: string): Promise<boolean> {
        return await this.mysqlUsuario.logout(token);
    }

    async detokenize(token: string): Promise<Usuario> {
        const usuario = await this.mysqlUsuario.detokenize(token);
        const user = await this.usuarioToUsuario.get(usuario)
        return user;
    }

    async verifyPermitions(token: string): Promise<boolean> {
        return await this.mysqlUsuario.verifyPermitions(token);
    }

    async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
        return await this.mysqlUsuario.changeUserRoles(token, email, nameRol);
    }

    async getRoles(): Promise<Rol[]> {
        const roles = await this.mysqlUsuario.getRoles();
        const rol = await this.rolesToRoles.getArray(roles)
        return rol;
    }

    async getPermiso(token: string): Promise<Permiso[]> {
        const permisos = await this.mysqlUsuario.getPermiso(token);
        const permi = await this.permisotopermiso.getArray(permisos)
        return permi
    }

    async addRol(rol: Rol): Promise<boolean> {
      const roli = await this.rolesToRoles.teg(rol)
        return await this.mysqlUsuario.addRol(roli);
    }

    async addPermiso(permiso: Permiso): Promise<boolean> {
      const permi = await this.permisotopermiso.teg(permiso)
        return await this.mysqlUsuario.addPermiso(permi);
    }

    async addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        return await this.mysqlUsuario.addNewRelationRolPermiso(idRol, namePermiso);
    }

    async removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean> {
        return await this.mysqlUsuario.removeRelationRolPermiso(idRol, namePermiso);
    }

}
