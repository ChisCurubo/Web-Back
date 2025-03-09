import { Usuario } from "../../../../../usuario/domain/usuario/Usuario"



export default interface AuthDriverPort{
  login(usuario:string, pwd: string): Promise<string> // devolvera token logeo
  register(usuario: Usuario): Promise<boolean> //devolvera el token
  logout(token:string): Promise<boolean>
  detokenize(token:string ):Promise<Usuario>
  verifyPermitions(token:string): Promise<boolean>
  changeUserRoles(token:string, email:string, nameRol: string): Promise<boolean>

}
