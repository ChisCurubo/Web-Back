import { MysqlPermiso } from "../rol/MySQLPermiso";
import { MysqlRol } from "../rol/MySQLRol";
import { MysqlUsuario } from "../usuario/MySQLUsuario";



export default interface AuthRepoInterface {

    login(usuario: string, pwd: string): Promise<string>;
    register(usuario: MysqlUsuario): Promise<boolean>;
    logout(token: string): Promise<boolean>;
    detokenize(token: string): Promise<MysqlUsuario>;
    verifyPermitions(token: string): Promise<boolean>;
    changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean>;
    
    getRoles(): Promise<MysqlRol[]>;
    getPermiso(token: string): Promise<MysqlPermiso[]>;
    addRol(rol: MysqlRol): Promise<boolean>;
    addPermiso(permiso: MysqlPermiso): Promise<boolean>;
    addNewRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
    removeRelationRolPermiso(idRol: number, namePermiso: string): Promise<boolean>;
       
}