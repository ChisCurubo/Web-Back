
import { Usuario } from "../../../usuario/domain/usuario/Usuario";
import AuthServiceInterface from "../../domain/interfaces/AuthServiceInterface";
import AuthDriverPort from "../../domain/port/driver/auth/AuthUsuario";



export default class AuthUseCase implements AuthDriverPort {
    constructor(
        private readonly authService: AuthServiceInterface
    ) {}
    public async login(usuario: string, pwd: string): Promise<string> {
        const token = await this.authService.login(usuario, pwd);
        if (!token) {
            throw new Error("Invalid credentials");
        }
        return token;
    }

    public async register(usuario: Usuario): Promise<boolean> {
        const token = await this.authService.register(usuario);
        return token;
    }

    public async logout(token: string): Promise<boolean> {
        const isLoggedOut = await this.authService.logout(token);
        return isLoggedOut;
    }

    public async detokenize(token: string): Promise<Usuario> {
        const usuario = await this.authService.detokenize(token);
        if (!usuario) {
            throw new Error("Invalid token");
        }
        return usuario;
    }

    public async verifyPermitions(token: string): Promise<boolean> {
        const hasPermission = await this.authService.verifyPermitions(token);
        return hasPermission;
    }

    public async changeUserRoles(token: string, email: string, nameRol: string): Promise<boolean> {
        const roleChanged = await this.authService.changeUserRoles(token, email, nameRol);
        return roleChanged;
    }

}