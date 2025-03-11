
import { Usuario } from '../../../../../usuario/domain/usuario/Usuario';




export default interface AuthRepositoryInterface{
    login(usuario: string, pwd: string): Promise<string> 
    register(usuario: Usuario): Promise<boolean> 
    logout(token: string): Promise<boolean> 
    detokenize(token: string): Promise<Usuario>
    verifyPermitions(token: string): Promise<boolean> 
    changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean>
    comparePasswords(password: string, hashedPassword: string): Promise<boolean>; 
}
