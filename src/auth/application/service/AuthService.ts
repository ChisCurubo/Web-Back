import { Usuario } from "../../../usuario/domain/usuario/Usuario"
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface"
import AuthRepositoryInterface from "../../domain/port/driven/auth/AuthRepository";


export default class AuthService implements AuthServiceInterface {
  constructor(
    private readonly authRepository: AuthRepositoryInterface) {}

    async login(usuario: string, pwd: string): Promise<string> {
    const token = await this.authRepository.login(usuario, pwd);
    if (!token) {
      throw new Error("Invalid credentials");
    }
    return token;
  }

  async register(usuario: Usuario): Promise<boolean> {
    const token = await this.authRepository.register(usuario);
    if (!token) {
      throw new Error("Registration failed");
    }
    return token;
  }

  async logout(token: string): Promise<boolean> {
    return this.authRepository.logout(token);
  }

  async detokenize(token: string): Promise<Usuario> {
    const usuario = await this.authRepository.detokenize(token);
    if (!usuario) {
      throw new Error("Invalid token");
    }
    return usuario;
  }

  async verifyPermitions(token: string): Promise<boolean> {
    return this.authRepository.verifyPermitions(token);
  }

  async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
    return this.authRepository.changeUserRoles(token, email, nameRol);
  }


}
