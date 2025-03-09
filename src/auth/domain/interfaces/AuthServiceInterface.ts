import { Usuario } from "../../../usuario/domain/usuario/Usuario";

export default interface AuthServiceInterface {
    login(usuario: string, pwd: string): Promise<string>;
    register(usuario: Usuario): Promise<boolean>;
    logout(token: string): Promise<boolean>;
    detokenize(token: string): Promise<Usuario>;
    verifyPermitions(token: string): Promise<boolean>;
    changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean>;
}